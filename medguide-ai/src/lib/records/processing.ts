import type { DocumentType } from "../db/types";

/**
 * Whether real document processing (OCR + AI extraction) is wired up is no
 * longer a build-time flag: the upload flow (src/components/AddRecordFlow.tsx)
 * calls POST /api/analyze-document, and that route checks LLM_API_KEY on
 * the server per request (see src/lib/ai/anthropicClient.ts) — the only
 * place that actually knows whether a provider is configured. When it
 * isn't, or the analysis fails, the flow asks the user to confirm a few
 * details manually instead of pretending an AI looked at the file: never
 * fake a successful analysis.
 */

export const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];
export const ACCEPTED_FILE_ACCEPT = "application/pdf,image/jpeg,image/png";

export const RECORD_TYPE_OPTIONS: DocumentType[] = [
  "blood_test",
  "lab_report",
  "mri_report",
  "ct_scan",
  "xray",
  "ultrasound",
  "ecg",
  "pathology_report",
  "consultation_note",
  "prescription",
  "discharge_summary",
  "hospital_record",
  "medical_bill",
  "other",
];

export function guessTitleFromFileName(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^./\\]+$/, "");
  const spaced = withoutExtension.replace(/[_-]+/g, " ").trim();
  if (!spaced) return "";
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
