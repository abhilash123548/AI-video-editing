"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useActive } from "@/context/ActiveContext";
import { useRecords } from "@/context/RecordsContext";
import { Card } from "@/components/Card";
import { ActionButton } from "@/components/Button";
import { track } from "@/lib/analytics";
import { DOCUMENT_TYPE_LABELS, localize } from "@/lib/demoData";

export function UserRecordDetail({ id }: { id: string }) {
  const { t, lang } = useLanguage();
  const { setActiveDocumentId, setChatOpen } = useActive();
  const { getRecord, hasHydrated } = useRecords();
  const record = getRecord(id);

  useEffect(() => {
    if (!record) return;
    setActiveDocumentId(record.id);
    return () => setActiveDocumentId(undefined);
  }, [record, setActiveDocumentId]);

  if (!hasHydrated) {
    return null;
  }

  if (!record) {
    return (
      <div className="space-y-6">
        <Link href="/demo" className="text-sm font-medium text-teal hover:underline">
          &larr; {t("common.back")}
        </Link>
        <Card>
          <h1 className="font-serif-display text-xl font-semibold text-navy">{t("records.notFoundTitle")}</h1>
          <p className="mt-2 text-sm text-ink/70">{t("records.notFoundBody")}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/demo" className="text-sm font-medium text-teal hover:underline">
        &larr; {t("common.back")}
      </Link>

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sage/60 px-2.5 py-1 text-[11px] font-medium text-navy">
                {localize(DOCUMENT_TYPE_LABELS[record.type], lang)}
              </span>
              <span className="rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-medium text-teal">
                {t("records.yourRecordTag")}
              </span>
            </div>
            <h1 className="mt-3 font-serif-display text-2xl font-semibold text-navy">{record.title}</h1>
          </div>
          <span className="rounded-full bg-sage/60 px-3 py-1.5 text-xs font-semibold text-navy">
            {t("records.added")}
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-navy/8 pt-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted">{t("document.date")}</dt>
            <dd className="mt-0.5 text-ink">{record.date}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t("document.provider")}</dt>
            <dd className="mt-0.5 text-ink">{record.provider || t("records.notIdentified")}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t("document.doctor")}</dt>
            <dd className="mt-0.5 text-ink">{record.doctor || t("records.notIdentified")}</dd>
          </div>
        </dl>
      </Card>

      <Card>
        <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.whatThisSays")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          {record.analyzed && record.summary ? record.summary : t("records.notAnalyzedYet")}
        </p>
        {record.notes && (
          <div className="mt-4 rounded-lg bg-sage/30 p-3">
            <p className="text-xs font-semibold text-navy">{t("records.formNotes")}</p>
            <p className="mt-1 text-sm text-ink/80">{record.notes}</p>
          </div>
        )}
      </Card>

      {record.analyzed && record.keyInformation && record.keyInformation.length > 0 && (
        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.keyInformation")}</h2>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {record.keyInformation.map((item, i) => (
              <div key={i} className="rounded-lg border border-navy/8 px-3 py-2.5">
                <dt className="text-[11px] text-muted">{item.label}</dt>
                <dd className="text-sm font-semibold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}

      {record.analyzed && record.termsExplained && record.termsExplained.length > 0 && (
        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.importantTerminology")}</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {record.termsExplained.map((term, i) => (
              <div key={i} className="rounded-lg bg-sage/30 p-3">
                <p className="text-sm font-semibold text-ink">{term.term}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">{term.explanation}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {record.analyzed && record.questionsToDiscuss && record.questionsToDiscuss.length > 0 && (
        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.discussionQuestions")}</h2>
          <ol className="mt-4 space-y-2 text-sm text-ink/80">
            {record.questionsToDiscuss.map((q, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-semibold text-teal">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </Card>
      )}

      <Card>
        <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.source")}</h2>
        {record.fileName ? (
          <>
            <p className="mt-2 text-sm text-ink">📄 {record.fileName}</p>
            <p className="mt-2 text-sm text-ink/60">{t("document.noOriginal")}</p>
          </>
        ) : (
          <p className="mt-2 text-sm text-ink/60">{t("document.noOriginal")}</p>
        )}
      </Card>

      <Card className="border-navy/15 bg-navy/[0.03]">
        <h2 className="text-sm font-semibold text-navy">{t("document.important")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{t("document.importantText")}</p>
      </Card>

      <div className="flex flex-wrap gap-3">
        <ActionButton
          onClick={() => {
            track("document_explained", { document_id: record.id });
            setActiveDocumentId(record.id);
            setChatOpen(true);
          }}
        >
          {t("document.askAdvocate")}
        </ActionButton>
      </div>
    </div>
  );
}
