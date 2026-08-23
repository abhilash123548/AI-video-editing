import type { DocumentType } from "../db/types";

/**
 * A health record the user has added themselves, as opposed to the sample
 * records MedGuide ships with (see src/lib/demoData.ts). User records are
 * stored client-side (see RecordsContext) since this V1 has no backend —
 * the shape here matches what a real `documents` row would eventually hold.
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
}
