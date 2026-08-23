import "server-only";
import { DOCUMENTS, getDocument, localize, type Lang } from "../demoData";
import { checkSafety } from "./safety";
import { getAnthropicClient, LLM_MODEL } from "./anthropicClient";
import {
  type AIContext,
  type AIProvider,
  type AppointmentBriefResult,
  type ComparisonResult,
  DEFAULT_APPOINTMENT_ID,
  DEFAULT_COMPARISON,
  LATEST_REPORT_ID,
  computeAppointmentBrief,
  computeComparison,
  formatBriefAsText,
  formatComparisonAsText,
  formatExplanation,
} from "./aiService";
import { translate } from "../i18n";

/**
 * `getAIProvider()` is the single seam between the chat API route
 * (src/app/api/ai/route.ts) and "an AI." It's server-only (imports the
 * Anthropic client) — client components must never import this file
 * directly; they use the pure helpers in aiService.ts instead.
 *
 * With no LLM_API_KEY it returns DemoAIProvider, a fully deterministic
 * engine built from src/lib/demoData.ts plus whatever real analysis the
 * user's own uploaded records carry — no network call, nothing fabricated.
 * With a key configured it returns RealAIProvider, which still answers
 * known intents (explain/compare/prepare/translate) deterministically for
 * speed and reliability, and only calls the real model for open-ended
 * questions that don't match those patterns.
 */

/**
 * Handles the well-known intents (explain/compare/prepare/translate/greet)
 * deterministically from the demo data + any active user record — shared
 * by both providers so structured requests stay instant and free even when
 * a real LLM is configured. Returns null when the message doesn't match a
 * known intent, so the caller can decide how to handle open-ended questions.
 */
function tryDeterministicResponse(message: string, ctx: AIContext): string | null {
  const { lang } = ctx;
  const lower = message.toLowerCase();
  const contextDocId = ctx.documentId ?? LATEST_REPORT_ID;

  const wantsTelugu = /telugu/i.test(message);
  const wantsHindi = /hindi/i.test(message);
  if (wantsTelugu || wantsHindi) {
    return formatExplanation(contextDocId, wantsTelugu ? "te" : "hi", ctx.activeRecord);
  }

  if (/compar|what changed|changed since/i.test(lower)) {
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
    return formatExplanation(contextDocId, lang, ctx.activeRecord);
  }

  if (/^(hi|hello|hey|namaste|namaskar)\b/i.test(lower.trim()) && lower.trim().length < 20) {
    return translate(lang, "advocate.opening");
  }

  return null;
}

function genericFallback(ctx: AIContext): string {
  const { lang } = ctx;
  const contextDocId = ctx.documentId ?? LATEST_REPORT_ID;
  const doc = getDocument(contextDocId) ?? DOCUMENTS[DOCUMENTS.length - 1];
  const title = ctx.activeRecord && ctx.activeRecord.id === contextDocId ? ctx.activeRecord.title : localize(doc.title, lang);
  const lines = [
    translate(lang, "advocate.disclaimer"),
    "",
    lang === "en"
      ? `You can ask me to explain a report (like "${title}"), compare two reports, prepare you for your next appointment, or explain something in Telugu or Hindi.`
      : lang === "te"
        ? `మీరు నన్ను ఒక రిపోర్ట్‌ను వివరించమని ("${title}" వంటిది), రెండు రిపోర్ట్‌లను పోల్చమని, మీ తదుపరి అపాయింట్‌మెంట్ కోసం సిద్ధం చేయమని, లేదా తెలుగు లేదా హిందీలో ఏదైనా వివరించమని అడగవచ్చు.`
        : `आप मुझसे कोई रिपोर्ट समझाने ("${title}" जैसी), दो रिपोर्ट की तुलना करने, अपनी अगली अपॉइंटमेंट के लिए तैयार करने, या तेलुगु या हिंदी में कुछ समझाने के लिए कह सकते हैं।`,
  ];
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
    const safety = checkSafety(message, ctx.lang);
    if (safety.triggered && safety.response) {
      return safety.response;
    }

    const deterministic = tryDeterministicResponse(message, ctx);
    if (deterministic !== null) return deterministic;

    return genericFallback(ctx);
  }
}

const LANGUAGE_NAMES: Record<Lang, string> = { en: "English", te: "Telugu", hi: "Hindi" };

const CHAT_SYSTEM_PROMPT = `You are the MedGuide Patient Advocate, a chat assistant embedded in a personal health-record app. You help the patient understand their own uploaded health records and prepare for conversations with their healthcare professionals.

You must never:
- state or imply a diagnosis, or say whether something is "serious," "dangerous," "normal," or "abnormal" in a clinical sense
- recommend starting, stopping, or changing any medication or dosage
- recommend a specific treatment

You may:
- explain what a document says and what medical terms mean, in plain language
- point out what changed between records, factually
- suggest neutral questions the patient could bring to their own healthcare professional
- have an ordinary, friendly conversation about their records

If you don't have information to answer something (no document is open, or the question is outside what's in the provided context), say so honestly rather than guessing. Keep replies concise — a few sentences or a short list, not an essay. Reply in {{LANGUAGE}}.`;

function buildGroundingText(ctx: AIContext): string {
  const contextDocId = ctx.documentId;
  if (!contextDocId) return "No document is currently open.";

  if (ctx.activeRecord && ctx.activeRecord.id === contextDocId) {
    const r = ctx.activeRecord;
    if (!r.analyzed || !r.summary) {
      return `The patient has a record open titled "${r.title}" (${r.date}), but MedGuide has not analyzed its contents — you only know its title and date, nothing about what it contains. Say so if asked what it says.`;
    }
    const parts = [`Open record: "${r.title}" (${r.date}).`, `Summary: ${r.summary}`];
    if (r.keyInformation?.length) parts.push(`Key information: ${r.keyInformation.map((k) => `${k.label}: ${k.value}`).join("; ")}`);
    if (r.termsExplained?.length) parts.push(`Terms explained: ${r.termsExplained.map((t) => `${t.term} — ${t.explanation}`).join("; ")}`);
    if (r.notes) parts.push(`Patient's own notes: ${r.notes}`);
    return parts.join("\n");
  }

  const doc = getDocument(contextDocId);
  if (!doc) return "No document is currently open.";
  const parts = [`Open document: "${localize(doc.title, ctx.lang)}" (${doc.date}), type: ${localize(doc.typeLabel, ctx.lang)}.`, `Summary: ${localize(doc.summary, ctx.lang)}`];
  if (doc.metrics?.length) parts.push(`Values: ${doc.metrics.map((m) => `${localize(m.label, ctx.lang)}: ${m.value}${m.unit ? ` ${m.unit}` : ""}`).join("; ")}`);
  return parts.join("\n");
}

class RealAIProvider implements AIProvider {
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
    const safety = checkSafety(message, ctx.lang);
    if (safety.triggered && safety.response) {
      return safety.response;
    }

    const deterministic = tryDeterministicResponse(message, ctx);
    if (deterministic !== null) return deterministic;

    const client = getAnthropicClient();
    if (!client) return genericFallback(ctx);

    try {
      const system = CHAT_SYSTEM_PROMPT.replace("{{LANGUAGE}}", LANGUAGE_NAMES[ctx.lang]);
      const grounding = buildGroundingText(ctx);
      const response = await client.messages.create({
        model: LLM_MODEL,
        max_tokens: 500,
        system: `${system}\n\nContext:\n${grounding}`,
        messages: [{ role: "user", content: message }],
      });
      const text = response.content
        .filter((block): block is Extract<typeof block, { type: "text" }> => block.type === "text")
        .map((block) => block.text)
        .join("\n")
        .trim();
      return text || genericFallback(ctx);
    } catch {
      return genericFallback(ctx);
    }
  }
}

const demoProvider = new DemoAIProvider();
const realProvider = new RealAIProvider();

export function getAIProvider(): AIProvider {
  return process.env.LLM_API_KEY ? realProvider : demoProvider;
}
