"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/Card";
import { DOCUMENTS, localize } from "@/lib/demoData";
import { computeComparison } from "@/lib/ai/aiService";
import { track } from "@/lib/analytics";

function CompareContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const queryCurrent = searchParams.get("current") ?? undefined;
  const queryPrevious = searchParams.get("previous") ?? undefined;

  const [previousId, setPreviousId] = useState(queryPrevious ?? "doc-2024-blood");
  const [currentId, setCurrentId] = useState(queryCurrent ?? "doc-2026-blood");

  useEffect(() => {
    track("comparison_started", { previous: previousId, current: currentId });
    // Only fire once on mount / when the query-driven selection changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const result = useMemo(
    () => (previousId !== currentId ? computeComparison(previousId, currentId, lang) : null),
    [previousId, currentId, lang],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif-display text-3xl font-semibold text-navy">{t("compare.title")}</h1>
        <p className="mt-1 text-ink/70">{t("compare.subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-navy">{t("compare.previousReport")}</span>
          <select
            value={previousId}
            onChange={(e) => setPreviousId(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
          >
            {DOCUMENTS.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {localize(doc.title, lang)} — {doc.date}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-navy">{t("compare.currentReport")}</span>
          <select
            value={currentId}
            onChange={(e) => setCurrentId(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
          >
            {DOCUMENTS.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {localize(doc.title, lang)} — {doc.date}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!result || previousId === currentId ? (
        <Card>
          <p className="text-sm text-muted">{t("compare.selectPrompt")}</p>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h2 className="font-serif-display text-base font-semibold text-navy">{t("compare.newInformation")}</h2>
            <ul className="mt-3 space-y-2.5">
              {result.newInformation.length ? (
                result.newInformation.map((line, i) => (
                  <li key={i} className="rounded-lg bg-teal/5 p-3 text-sm leading-relaxed text-ink/80">
                    {line}
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted">—</li>
              )}
            </ul>
          </Card>
          <Card>
            <h2 className="font-serif-display text-base font-semibold text-navy">{t("compare.changedInformation")}</h2>
            <ul className="mt-3 space-y-2.5">
              {result.changedInformation.length ? (
                result.changedInformation.map((line, i) => (
                  <li key={i} className="rounded-lg bg-sage/40 p-3 text-sm leading-relaxed text-ink/80">
                    {line}
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted">—</li>
              )}
            </ul>
          </Card>
          <Card>
            <h2 className="font-serif-display text-base font-semibold text-navy">{t("compare.unchangedInformation")}</h2>
            <ul className="mt-3 space-y-2.5">
              {result.unchangedInformation.length ? (
                result.unchangedInformation.map((line, i) => (
                  <li key={i} className="rounded-lg bg-navy/5 p-3 text-sm leading-relaxed text-ink/80">
                    {line}
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted">—</li>
              )}
            </ul>
          </Card>
        </div>
      )}

      {result && previousId !== currentId && result.changedInformation.length > 0 && (
        <p className="text-sm text-muted">{t("compare.considerDiscussing")}</p>
      )}

      {result && previousId !== currentId && !result.hasMetrics && (
        <Card>
          <p className="text-sm text-muted">{t("compare.noMetrics")}</p>
        </Card>
      )}

      {result && previousId !== currentId && (
        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("compare.questionsToDiscuss")}</h2>
          <ol className="mt-3 space-y-2">
            {result.questions.map((q, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                <span className="font-semibold text-teal">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={null}>
      <CompareContent />
    </Suspense>
  );
}
