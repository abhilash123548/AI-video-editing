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
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sage/60 px-2.5 py-1 text-[11px] font-medium text-navy">
                {localize(doc.typeLabel, lang)}
              </span>
              <span className="rounded-full bg-navy/5 px-2.5 py-1 text-[11px] font-medium text-navy/60">
                {t("records.sampleTag")}
              </span>
            </div>
            <h1 className="mt-3 font-serif-display text-2xl font-semibold text-navy">{localize(doc.title, lang)}</h1>
          </div>
          <span className="rounded-full bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal">
            {t("common.processed")}
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-navy/8 pt-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted">{t("document.date")}</dt>
            <dd className="mt-0.5 text-ink">{doc.date}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t("document.provider")}</dt>
            <dd className="mt-0.5 text-ink">{doc.provider ?? t("records.notIdentified")}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t("document.doctor")}</dt>
            <dd className="mt-0.5 text-ink">{doc.doctor ?? t("records.notIdentified")}</dd>
          </div>
        </dl>
      </Card>

      <Card>
        <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.whatThisSays")}</h2>
        <p className="mt-3 leading-relaxed text-ink/80">{localize(doc.summary, lang)}</p>
      </Card>

      {doc.metrics && doc.metrics.length > 0 && (
        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.keyInformation")}</h2>
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

      <Card>
        <h2 className="font-serif-display text-lg font-semibold text-navy">{t("document.source")}</h2>
        <p className="mt-2 text-sm text-ink/70">
          {lang === "en"
            ? "This is a sample document included with MedGuide to show how a record looks once it's organized — there's no original file to view."
            : lang === "te"
              ? "ఇది ఒక రికార్డు వ్యవస్థీకృతమైన తర్వాత ఎలా కనిపిస్తుందో చూపించడానికి మెడ్‌గైడ్‌తో చేర్చిన నమూనా పత్రం — చూడటానికి అసలు ఫైల్ లేదు."
              : "यह मेडगाइड के साथ शामिल एक नमूना दस्तावेज़ है, यह दिखाने के लिए कि व्यवस्थित होने के बाद एक रिकॉर्ड कैसा दिखता है — देखने के लिए कोई मूल फ़ाइल नहीं है।"}
        </p>
      </Card>

      <Card className="border-navy/15 bg-navy/[0.03]">
        <h2 className="text-sm font-semibold text-navy">{t("document.important")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{t("document.importantText")}</p>
      </Card>

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
