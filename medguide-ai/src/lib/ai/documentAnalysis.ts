import "server-only";
import type { DocumentType } from "../db/types";
import { getAnthropicClient, LLM_MODEL } from "./anthropicClient";

export interface AnalyzedKeyInfo {
  label: string;
  value: string;
}

export interface AnalyzedTerm {
  term: string;
  explanation: string;
}

export interface DocumentAnalysisResult {
  suggestedTitle: string;
  documentType: DocumentType;
  summary: string;
  keyInformation: AnalyzedKeyInfo[];
  termsExplained: AnalyzedTerm[];
  questionsToDiscuss: string[];
}

const VALID_DOCUMENT_TYPES: DocumentType[] = [
  "blood_test",
  "mri_report",
  "ct_scan",
  "xray",
  "ultrasound",
  "ecg",
  "pathology_report",
  "lab_report",
  "consultation_note",
  "prescription",
  "discharge_summary",
  "hospital_record",
  "medical_bill",
  "other",
];

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  te: "Telugu",
  hi: "Hindi",
};

const SYSTEM_PROMPT = `You are a document-reading assistant inside MedGuide, a personal health-record app. You are given one uploaded healthcare document (a lab report, prescription, scan report, consultation note, bill, etc.) as an image or PDF.

Your only job is to describe what the document says, in plain language a patient can understand. You are NOT a doctor and must never:
- state or imply a diagnosis
- say whether a finding is "serious," "dangerous," "normal," or "abnormal" in a clinical sense
- recommend starting, stopping, or changing any medication or dosage
- recommend a specific treatment

You may:
- summarize what the document describes, factually
- list the concrete values/fields it contains (e.g. test names and their reported values, medicines and their listed dosage, dates, provider names)
- explain unfamiliar medical terms that appear in the document, in plain language
- suggest neutral, open-ended questions the patient could bring to their own healthcare professional

Respond with ONLY a single JSON object, no markdown fences, no other text, matching exactly this shape:
{
  "suggestedTitle": string,             // short human title, e.g. "Complete Blood Count" or "Cardiology Prescription"
  "documentType": string,               // one of: blood_test, mri_report, ct_scan, xray, ultrasound, ecg, pathology_report, lab_report, consultation_note, prescription, discharge_summary, hospital_record, medical_bill, other
  "summary": string,                    // 2-4 sentences, plain language, describing what the document contains
  "keyInformation": [{"label": string, "value": string}],   // up to 8 concrete fields/values found in the document
  "termsExplained": [{"term": string, "explanation": string}], // up to 6 medical terms that appear in the document, explained simply
  "questionsToDiscuss": [string]        // up to 4 neutral questions the patient could ask their healthcare professional
}

If the file isn't a legible healthcare document, still return valid JSON with your best-effort summary explaining what you can see, and empty arrays where nothing applies. Write every string value in {{LANGUAGE}}.`;

function stripCodeFences(text: string): string {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced ? fenced[1] : trimmed;
}

function coerceResult(raw: unknown): DocumentAnalysisResult | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  const documentType = VALID_DOCUMENT_TYPES.includes(obj.documentType as DocumentType)
    ? (obj.documentType as DocumentType)
    : "other";

  const suggestedTitle = typeof obj.suggestedTitle === "string" ? obj.suggestedTitle.trim().slice(0, 120) : "";
  const summary = typeof obj.summary === "string" ? obj.summary.trim() : "";
  if (!summary) return null;

  const keyInformation: AnalyzedKeyInfo[] = Array.isArray(obj.keyInformation)
    ? obj.keyInformation
        .filter((it): it is { label: unknown; value: unknown } => Boolean(it) && typeof it === "object")
        .map((it) => ({ label: String((it as { label: unknown }).label ?? "").slice(0, 80), value: String((it as { value: unknown }).value ?? "").slice(0, 160) }))
        .filter((it) => it.label && it.value)
        .slice(0, 8)
    : [];

  const termsExplained: AnalyzedTerm[] = Array.isArray(obj.termsExplained)
    ? obj.termsExplained
        .filter((it): it is { term: unknown; explanation: unknown } => Boolean(it) && typeof it === "object")
        .map((it) => ({ term: String((it as { term: unknown }).term ?? "").slice(0, 80), explanation: String((it as { explanation: unknown }).explanation ?? "").slice(0, 320) }))
        .filter((it) => it.term && it.explanation)
        .slice(0, 6)
    : [];

  const questionsToDiscuss: string[] = Array.isArray(obj.questionsToDiscuss)
    ? obj.questionsToDiscuss.map((q) => String(q).slice(0, 220)).filter(Boolean).slice(0, 4)
    : [];

  return { suggestedTitle, documentType, summary, keyInformation, termsExplained, questionsToDiscuss };
}

/**
 * Sends an uploaded file to Claude for real document analysis. Returns null
 * when no LLM_API_KEY is configured, or when the call/parse fails — callers
 * must treat null exactly like "not analyzed" and fall back to honest
 * manual entry, never fabricate a result of their own.
 */
export async function analyzeUploadedDocument(
  fileBuffer: Buffer,
  mimeType: string,
  lang: "en" | "te" | "hi",
): Promise<DocumentAnalysisResult | null> {
  const client = getAnthropicClient();
  if (!client) return null;

  const base64 = fileBuffer.toString("base64");
  const languageName = LANGUAGE_NAMES[lang] ?? "English";
  const system = SYSTEM_PROMPT.replace("{{LANGUAGE}}", languageName);

  const documentBlock =
    mimeType === "application/pdf"
      ? ({ type: "document" as const, source: { type: "base64" as const, media_type: "application/pdf" as const, data: base64 } })
      : ({
          type: "image" as const,
          source: {
            type: "base64" as const,
            media_type: (mimeType === "image/png" ? "image/png" : mimeType === "image/webp" ? "image/webp" : "image/jpeg") as
              | "image/jpeg"
              | "image/png"
              | "image/webp",
            data: base64,
          },
        });

  try {
    const response = await client.messages.create({
      model: LLM_MODEL,
      max_tokens: 1500,
      system,
      messages: [
        {
          role: "user",
          content: [documentBlock, { type: "text", text: "Analyze this healthcare document and respond with the JSON object described in your instructions." }],
        },
      ],
    });

    const text = response.content
      .filter((block): block is Extract<typeof block, { type: "text" }> => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    const parsed = JSON.parse(stripCodeFences(text));
    return coerceResult(parsed);
  } catch {
    return null;
  }
}
