import type { DocumentType } from "../db/types";

/**
 * Whether real document processing (OCR + AI extraction) is wired up.
 *
 * This is intentionally always false until a real provider is connected —
 * see .env.example (DOCUMENT_AI_PROVIDER / equivalent). The upload flow
 * (src/components/AddRecordFlow.tsx) checks this before ever claiming a
 * document was "read" or "analyzed." When it's false, the flow asks the
 * user to confirm a few details manually instead of pretending an AI
 * looked at the file — see section 4/18 of the product spec this
 * implements: never fake a successful analysis.
 *
 * NEXT_PUBLIC_ prefix so the client-rendered upload flow can read it
 * without a round trip; it only ever reveals whether a provider is
 * configured, never the key itself.
 */
export function isDocumentProcessingConfigured(): boolean {
  return process.env.NEXT_PUBLIC_DOCUMENT_AI_CONFIGURED === "true";
}

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
