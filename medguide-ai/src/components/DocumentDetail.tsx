"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useActive } from "@/context/ActiveContext";
import { Card } from "@/components/Card";
import { TermCard } from "@/components/TermCard";
import { ActionButton, LinkButton } from "@/components/Button";
import { track } from "@/lib/analytics";
import { getQuestion, getTerm, localize, type DemoDocument } from "@/lib/demoData";

export function DocumentDetail({ doc }: { doc: DemoDocument }) {
  const { t, lang } = useLanguage();
  const { setActiveDocumentId, setChatOpen } = useActive();

  useEffect(() => {
    setActiveDocumentId(doc.id);
    return () => setActiveDocumentId(undefined);
  }, [doc.id, setActiveDocumentId]);

  const terms = doc.termKeys.map((key) => getTerm(key)).filter(Boolean);
  const questions = doc.questionKeys.map((key) => getQuestion(key)).filter(Boolean);

  return (
    <div className="space-y-6">
      <Link href="/demo" className="text-sm font-medium text-teal hover:underline">
        &larr; {t("common.back")}
      </Link>

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-sage/60 px-2.5 py-1 text-[11px] font-medium text-navy">
              {localize(doc.typeLabel, lang)}
            </span>
            <h1 className="mt-3 font-serif-display text-2xl font-semibold text-navy">{localize(doc.title, lang)}</h1>
            <p className="mt-1 text-sm text-muted">
              {t("document.date")}: {doc.date}
            </p>
          </div>
          <span className="rounded-full bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal">
            {t("common.processed")}
          </span>
        </div>
      </Card>

      <Card>
        <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.whatThisContains")}</h2>
        <p className="mt-3 leading-relaxed text-ink/80">{localize(doc.summary, lang)}</p>
      </Card>

      {doc.metrics && doc.metrics.length > 0 && (
        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{localize(doc.typeLabel, lang)}</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {doc.metrics.map((metric) => (
              <div key={metric.label.en} className="rounded-lg border border-navy/8 p-3">
                <p className="text-[11px] text-muted">{localize(metric.label, lang)}</p>
                <p className="text-base font-semibold text-navy">
                  {metric.value}
                  {metric.unit ? <span className="ml-1 text-xs font-normal text-muted">{metric.unit}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {terms.length > 0 && (
        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.importantTerminology")}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {terms.map((term) => term && <TermCard key={term.key} term={term} lang={lang} />)}
          </div>
        </Card>
      )}

      {questions.length > 0 && (
        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.discussionQuestions")}</h2>
          <ol className="mt-3 space-y-2">
            {questions.map(
              (q, i) =>
                q && (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    <span className="font-semibold text-teal">{i + 1}.</span>
                    <span>{localize(q, lang)}</span>
                  </li>
                ),
            )}
          </ol>
        </Card>
      )}

      <div className="flex flex-wrap gap-3">
        <ActionButton
          onClick={() => {
            track("document_explained", { document_id: doc.id });
            setActiveDocumentId(doc.id);
            setChatOpen(true);
          }}
        >
          {t("document.askAdvocate")}
        </ActionButton>
        <LinkButton
          href={`/demo/compare?current=${doc.id}`}
          variant="secondary"
          onClick={() => track("comparison_started", { document_id: doc.id })}
        >
          {t("document.compareThis")}
        </LinkButton>
      </div>
    </div>
  );
}
