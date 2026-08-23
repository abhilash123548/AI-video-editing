import { DOCUMENTS, DOCUMENT_TYPE_LABELS, localize, type Lang } from "../demoData";
import type { UserRecord } from "./types";

export interface DisplayRecord {
  id: string;
  title: string;
  typeLabel: string;
  date: string;
  provider?: string;
  doctor?: string;
  isSample: boolean;
  href: string;
}

/**
 * Merges the sample records that ship with MedGuide and the records the
 * user has added themselves into one list, sorted most-recent-first, for
 * places that just need to list/link to records (dashboard, timeline).
 * Full detail rendering still branches by source — see DocumentDetail vs.
 * UserRecordDetail — since only sample records carry a plain-language
 * explanation, glossary terms, and discussion questions today.
 */
export function combineRecords(userRecords: UserRecord[], lang: Lang): DisplayRecord[] {
  const sample: DisplayRecord[] = DOCUMENTS.map((doc) => ({
    id: doc.id,
    title: localize(doc.title, lang),
    typeLabel: localize(doc.typeLabel, lang),
    date: doc.date,
    provider: doc.provider,
    doctor: doc.doctor,
    isSample: true,
    href: `/demo/documents/${doc.id}`,
  }));

  const user: DisplayRecord[] = userRecords.map((rec) => ({
    id: rec.id,
    title: rec.title,
    typeLabel: localize(DOCUMENT_TYPE_LABELS[rec.type], lang),
    date: rec.date,
    provider: rec.provider,
    doctor: rec.doctor,
    isSample: false,
    href: `/demo/documents/${rec.id}`,
  }));

  return [...sample, ...user].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
