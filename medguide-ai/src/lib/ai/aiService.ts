import {
  APPOINTMENTS,
  getAppointment,
  getDocument,
  getQuestion,
  getTerm,
  localize,
  type Lang,
} from "../demoData";
import { translate } from "../i18n";
import type { AnalyzedKeyInfo, AnalyzedTerm } from "../records/types";

/**
 * Shared AI data layer: pure, deterministic, and safe to import from client
 * components (src/app/demo/compare, src/app/demo/appointments) as well as
 * from the server (src/lib/ai/provider.ts, used only by /api/ai/route.ts).
 * It must never import anything server-only (like the Anthropic client) —
 * that lives in provider.ts instead, which is the actual seam between the
 * chat UI and "an AI."
 */

/** Snapshot of a user-added record, sent by the client alongside a chat
 * request when `documentId` points at one — user records live only in the
 * browser's localStorage (see RecordsContext), so the server has no other
 * way to see them. Only the record actively open is ever sent. */
export interface ActiveRecordSnapshot {
  id: string;
  title: string;
  date: string;
  provider?: string;
  doctor?: string;
  notes?: string;
  analyzed: boolean;
  summary?: string;
  keyInformation?: AnalyzedKeyInfo[];
  termsExplained?: AnalyzedTerm[];
  questionsToDiscuss?: string[];
}

export interface AIContext {
  lang: Lang;
  /** The document currently open, if the user asked from a document page. */
  documentId?: string;
  /** The appointment currently open, if the user asked from an appointment page. */
  appointmentId?: string;
  /** Populated when `documentId` refers to a user's own uploaded record rather than a sample document. */
  activeRecord?: ActiveRecordSnapshot;
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

export const LATEST_REPORT_ID = "doc-2026-consult";
export const DEFAULT_APPOINTMENT_ID = "appt-cardiology";
export const DEFAULT_COMPARISON: [string, string] = ["doc-2024-blood", "doc-2026-blood"];

function formatUserRecordExplanation(record: ActiveRecordSnapshot, lang: Lang): string {
  const lines: string[] = [`${record.title} — ${record.date}`];

  if (!record.analyzed || !record.summary) {
    lines.push("", translate(lang, "records.notAnalyzedYet"));
    return lines.join("\n");
  }

  lines.push("", `${translate(lang, "document.whatThisSays")}:`, record.summary);

  if (record.keyInformation && record.keyInformation.length > 0) {
    lines.push("", `${translate(lang, "document.keyInformation")}:`);
    record.keyInformation.forEach((item) => lines.push(`• ${item.label}: ${item.value}`));
  }

  if (record.termsExplained && record.termsExplained.length > 0) {
    lines.push("", `${translate(lang, "document.importantTerminology")}:`);
    record.termsExplained.forEach((t) => lines.push(`• ${t.term} — ${t.explanation}`));
  }

  if (record.questionsToDiscuss && record.questionsToDiscuss.length > 0) {
    lines.push("", `${translate(lang, "document.discussionQuestions")}:`);
    record.questionsToDiscuss.forEach((q, i) => lines.push(`${i + 1}. ${q}`));
  }

  return lines.join("\n");
}

export function formatExplanation(documentId: string, lang: Lang, activeRecord?: ActiveRecordSnapshot): string {
  const doc = getDocument(documentId);
  if (!doc) {
    if (activeRecord && activeRecord.id === documentId) {
      return formatUserRecordExplanation(activeRecord, lang);
    }
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

export function computeComparison(previousId: string, currentId: string, lang: Lang): ComparisonResult {
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

export function computeAppointmentBrief(appointmentId: string, lang: Lang): AppointmentBriefResult {
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

export function formatComparisonAsText(result: ComparisonResult, lang: Lang): string {
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

export function formatBriefAsText(brief: AppointmentBriefResult, lang: Lang): string {
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

export { APPOINTMENTS };
