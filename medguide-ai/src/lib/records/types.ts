import type { DocumentType } from "../db/types";

export interface AnalyzedKeyInfo {
  label: string;
  value: string;
}

export interface AnalyzedTerm {
  term: string;
  explanation: string;
}

/**
 * A health record the user has added themselves, as opposed to the sample
 * records MedGuide ships with (see src/lib/demoData.ts). User records are
 * stored client-side (see RecordsContext) since this V1 has no backend —
 * the shape here matches what a real `documents` row would eventually hold.
 *
 * `analyzed` and the fields below it are only ever populated by a real call
 * to src/lib/ai/documentAnalysis.ts (gated on LLM_API_KEY being configured)
 * — never fabricated client-side. When `analyzed` is false, the UI must
 * show the honest "not analyzed yet" state instead of these fields.
 */
export interface UserRecord {
  id: string;
  title: string;
  type: DocumentType;
  date: string; // ISO yyyy-mm-dd, user-entered
  provider?: string;
  doctor?: string;
  notes?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  addedAt: string; // ISO timestamp
  isSample: false;
  analyzed: boolean;
  summary?: string;
  keyInformation?: AnalyzedKeyInfo[];
  termsExplained?: AnalyzedTerm[];
  questionsToDiscuss?: string[];
}

export interface AddRecordInput {
  title: string;
  type: DocumentType;
  date: string;
  provider?: string;
  doctor?: string;
  notes?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  analyzed?: boolean;
  summary?: string;
  keyInformation?: AnalyzedKeyInfo[];
  termsExplained?: AnalyzedTerm[];
  questionsToDiscuss?: string[];
}
