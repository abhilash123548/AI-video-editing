import {
  APPOINTMENTS,
  DOCUMENTS,
  getAppointment,
  getDocument,
  getQuestion,
  getTerm,
  localize,
  type Lang,
} from "../demoData";
import { translate } from "../i18n";
import { checkSafety } from "./safety";

/**
 * AI service abstraction.
 *
 * `getAIProvider()` is the single seam between the UI and "an AI". Today it
 * always returns `DemoAIProvider`, a deterministic engine built entirely
 * from the fictional demo data in src/lib/demoData.ts — no network call, no
 * API key, and it never breaks in a browser with no backend configured.
 *
 * To plug in a real LLM later: implement `AIProvider` with a class that
 * calls the provider (reading its key from a server-only env var, e.g.
 * LLM_API_KEY), and switch the return value of `getAIProvider()` when that
 * key is present. No calling code needs to change — every call site already
 * goes through this interface.
 */

export interface AIContext {
  lang: Lang;
  /** The document currently open, if the user asked from a document page. */
  documentId?: string;
  /** The appointment currently open, if the user asked from an appointment page. */
  appointmentId?: string;
}

export interface ComparisonResult {
  newInformation: string[];
  changedInformation: string[];
  unchangedInformation: string[];
  questions: string[];
  hasMetrics: boolean;
}

export interface AppointmentBriefResult {
  documentsToReview: string[];
  whatToRemember: string[];
  questionsToDiscuss: string[];
  documentsToBring: string[];
}

export interface AIProvider {
  generateResponse(message: string, ctx: AIContext): Promise<string>;
  explainDocument(documentId: string, lang: Lang): Promise<string>;
  compareDocuments(previousId: string, currentId: string, lang: Lang): Promise<ComparisonResult>;
  prepareAppointment(appointmentId: string, lang: Lang): Promise<AppointmentBriefResult>;
  translateExplanation(documentId: string, lang: Lang): Promise<string>;
}

const LATEST_REPORT_ID = "doc-2026-consult";
const DEFAULT_APPOINTMENT_ID = "appt-cardiology";
const DEFAULT_COMPARISON: [string, string] = ["doc-2024-blood", "doc-2026-blood"];

function formatExplanation(documentId: string, lang: Lang): string {
  const doc = getDocument(documentId);
  if (!doc) {
    return translate(lang, "compare.selectPrompt");
  }

  const lines: string[] = [];
  lines.push(`${localize(doc.title, lang)} — ${doc.date}`);
  lines.push("");
  lines.push(`${translate(lang, "document.whatThisContains")}:`);
  lines.push(localize(doc.summary, lang));

  if (doc.termKeys.length > 0) {
    lines.push("");
    lines.push(`${translate(lang, "document.importantTerminology")}:`);
    for (const key of doc.termKeys) {
      const term = getTerm(key);
      if (term) {
        lines.push(`• ${localize(term.term, lang)} — ${localize(term.explanation, lang)}`);
      }
    }
  }

  if (doc.questionKeys.length > 0) {
    lines.push("");
    lines.push(`${translate(lang, "document.discussionQuestions")}:`);
    doc.questionKeys.forEach((key, index) => {
      const question = getQuestion(key);
      if (question) {
        lines.push(`${index + 1}. ${localize(question, lang)}`);
      }
    });
  }

  return lines.join("\n");
}

function computeComparison(previousId: string, currentId: string, lang: Lang): ComparisonResult {
  const previous = getDocument(previousId);
  const current = getDocument(currentId);

  if (!previous || !current) {
    return { newInformation: [], changedInformation: [], unchangedInformation: [], questions: [], hasMetrics: false };
  }

  const newInformation: string[] = [];
  const changedInformation: string[] = [];
  const unchangedInformation: string[] = [];

  if (current.metrics && current.metrics.length > 0) {
    for (const metric of current.metrics) {
      const label = localize(metric.label, lang);
      const unit = metric.unit ? ` ${metric.unit}` : "";
      const prevMetric = previous.metrics?.find((m) => m.label.en === metric.label.en);

      if (!prevMetric) {
        newInformation.push(translate(lang, "compare.newItem", { label, value: metric.value, unit }));
      } else if (prevMetric.value !== metric.value) {
        changedInformation.push(
          translate(lang, "compare.changedItem", {
            label,
            value: metric.value,
            oldValue: prevMetric.value,
            unit,
          }),
        );
      } else {
        unchangedInformation.push(
          translate(lang, "compare.unchangedItem", { label, value: metric.value, unit }),
        );
      }
    }
  }

  const questionKeySet = new Set<string>([
    "q_compare",
    ...previous.questionKeys,
    ...current.questionKeys,
  ]);
  const questions = Array.from(questionKeySet)
    .map((key) => getQuestion(key))
    .filter((q): q is NonNullable<typeof q> => Boolean(q))
    .map((q) => localize(q, lang))
    .slice(0, 4);

  return {
    newInformation,
    changedInformation,
    unchangedInformation,
    questions,
    hasMetrics: Boolean(current.metrics && current.metrics.length > 0),
  };
}

function computeAppointmentBrief(appointmentId: string, lang: Lang): AppointmentBriefResult {
  const appointment = getAppointment(appointmentId);
  if (!appointment) {
    return { documentsToReview: [], whatToRemember: [], questionsToDiscuss: [], documentsToBring: [] };
  }

  const relevantDocs = appointment.relevantDocumentIds
    .map((id) => getDocument(id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const documentsToReview = relevantDocs.map((d) => `${localize(d.title, lang)} — ${d.date}`);

  const questionKeySet = new Set<string>();
  relevantDocs.forEach((d) => d.questionKeys.forEach((k) => questionKeySet.add(k)));
  const questionsToDiscuss = Array.from(questionKeySet)
    .map((key) => getQuestion(key))
    .filter((q): q is NonNullable<typeof q> => Boolean(q))
    .map((q) => localize(q, lang))
    .slice(0, 5);

  return {
    documentsToReview,
    whatToRemember: appointment.whatToRemember.map((entry) => localize(entry, lang)),
    questionsToDiscuss,
    documentsToBring: appointment.documentsToBring.map((entry) => localize(entry, lang)),
  };
}

function formatComparisonAsText(result: ComparisonResult, lang: Lang): string {
  const lines: string[] = [];
  lines.push(`${translate(lang, "compare.newInformation")}:`);
  lines.push(...(result.newInformation.length ? result.newInformation.map((l) => `• ${l}`) : ["—"]));
  lines.push("");
  lines.push(`${translate(lang, "compare.changedInformation")}:`);
  lines.push(...(result.changedInformation.length ? result.changedInformation.map((l) => `• ${l}`) : ["—"]));
  lines.push("");
  lines.push(`${translate(lang, "compare.unchangedInformation")}:`);
  lines.push(...(result.unchangedInformation.length ? result.unchangedInformation.map((l) => `• ${l}`) : ["—"]));
  lines.push("");
  lines.push(`${translate(lang, "compare.questionsToDiscuss")}:`);
  result.questions.forEach((q, i) => lines.push(`${i + 1}. ${q}`));
  return lines.join("\n");
}

function formatBriefAsText(brief: AppointmentBriefResult, lang: Lang): string {
  const lines: string[] = [];
  lines.push(translate(lang, "appointments.briefTitle"));
  lines.push("");
  lines.push(`${translate(lang, "appointments.briefDocumentsToReview")}:`);
  brief.documentsToReview.forEach((d) => lines.push(`• ${d}`));
  lines.push("");
  lines.push(`${translate(lang, "appointments.briefQuestions")}:`);
  brief.questionsToDiscuss.forEach((q, i) => lines.push(`${i + 1}. ${q}`));
  return lines.join("\n");
}

class DemoAIProvider implements AIProvider {
  async explainDocument(documentId: string, lang: Lang): Promise<string> {
    return formatExplanation(documentId, lang);
  }

  async translateExplanation(documentId: string, lang: Lang): Promise<string> {
    return formatExplanation(documentId, lang);
  }

  async compareDocuments(previousId: string, currentId: string, lang: Lang): Promise<ComparisonResult> {
    return computeComparison(previousId, currentId, lang);
  }

  async prepareAppointment(appointmentId: string, lang: Lang): Promise<AppointmentBriefResult> {
    return computeAppointmentBrief(appointmentId, lang);
  }

  async generateResponse(message: string, ctx: AIContext): Promise<string> {
    const { lang } = ctx;
    const safety = checkSafety(message, lang);
    if (safety.triggered && safety.response) {
      return safety.response;
    }

    const lower = message.toLowerCase();
    const contextDocId = ctx.documentId ?? LATEST_REPORT_ID;

    const wantsTelugu = /telugu/i.test(message);
    const wantsHindi = /hindi/i.test(message);
    if (wantsTelugu || wantsHindi) {
      return formatExplanation(contextDocId, wantsTelugu ? "te" : "hi");
    }

    if (/compar/i.test(lower)) {
      const [prev, curr] = DEFAULT_COMPARISON;
      const result = computeComparison(prev, curr, lang);
      return formatComparisonAsText(result, lang);
    }

    if (/prepar|appointment|visit/i.test(lower)) {
      const appointmentId = ctx.appointmentId ?? DEFAULT_APPOINTMENT_ID;
      const brief = computeAppointmentBrief(appointmentId, lang);
      return formatBriefAsText(brief, lang);
    }

    if (/explain|report|latest|summary|what does/i.test(lower)) {
      return formatExplanation(contextDocId, lang);
    }

    if (/hi|hello|hey|namaste|namaskar/i.test(lower) && lower.trim().length < 20) {
      return translate(lang, "advocate.opening");
    }

    // Generic fallback: point back to what MedGuide can help with.
    const doc = getDocument(contextDocId) ?? DOCUMENTS[DOCUMENTS.length - 1];
    const fallbackLines = [
      translate(lang, "advocate.disclaimer"),
      "",
      lang === "en"
        ? `You can ask me to explain a report (like "${localize(doc.title, lang)}"), compare two reports, prepare you for your next appointment, or explain something in Telugu or Hindi.`
        : lang === "te"
          ? `మీరు నన్ను ఒక రిపోర్ట్‌ను వివరించమని ("${localize(doc.title, lang)}" వంటిది), రెండు రిపోర్ట్‌లను పోల్చమని, మీ తదుపరి అపాయింట్‌మెంట్ కోసం సిద్ధం చేయమని, లేదా తెలుగు లేదా హిందీలో ఏదైనా వివరించమని అడగవచ్చు.`
          : `आप मुझसे कोई रिपोर्ट समझाने ("${localize(doc.title, lang)}" जैसी), दो रिपोर्ट की तुलना करने, अपनी अगली अपॉइंटमेंट के लिए तैयार करने, या तेलुगु या हिंदी में कुछ समझाने के लिए कह सकते हैं।`,
    ];
    return fallbackLines.join("\n");
  }
}

const demoProvider = new DemoAIProvider();

export function getAIProvider(): AIProvider {
  // Future: if (process.env.LLM_API_KEY) return new RealAIProvider();
  return demoProvider;
}

export {
  LATEST_REPORT_ID,
  DEFAULT_APPOINTMENT_ID,
  DEFAULT_COMPARISON,
  APPOINTMENTS,
  computeComparison,
  computeAppointmentBrief,
};
