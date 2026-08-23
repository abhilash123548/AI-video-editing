"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/Card";
import { TIMELINE, localize } from "@/lib/demoData";
import { track } from "@/lib/analytics";

export default function TimelinePage() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    track("timeline_viewed");
  }, []);

  const grouped = useMemo(() => {
    const byYear = new Map<string, typeof TIMELINE>();
    for (const item of TIMELINE) {
      const list = byYear.get(item.year) ?? [];
      list.push(item);
      byYear.set(item.year, list);
    }
    return Array.from(byYear.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif-display text-3xl font-semibold text-navy">{t("timeline.title")}</h1>
        <p className="mt-1 text-ink/70">{t("timeline.subtitle")}</p>
      </div>

      <div className="space-y-10">
        {grouped.map(([year, items]) => (
          <div key={year} className="grid gap-4 sm:grid-cols-[5rem_1fr]">
            <div className="font-serif-display text-2xl font-semibold text-teal">{year}</div>
            <div className="space-y-3 border-l-2 border-sage pl-6">
              {items
                .slice()
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((item) => {
                  const content = (
                    <Card className="relative p-4 transition-shadow hover:shadow-md">
                      <span className="absolute -left-[1.95rem] top-5 h-3 w-3 rounded-full border-2 border-white bg-teal" />
                      <p className="text-xs text-muted">{item.date}</p>
                      <p className="mt-1 font-medium text-ink">{localize(item.title, lang)}</p>
                      <p className="text-xs text-muted">{localize(item.typeLabel, lang)}</p>
                    </Card>
                  );
                  return (
                    <div key={item.id}>
                      {item.documentId ? (
                        <Link
                          href={`/demo/documents/${item.documentId}`}
                          onClick={() => track("document_opened", { document_id: item.documentId, source: "timeline" })}
                        >
                          {content}
                        </Link>
                      ) : (
                        <Link href="/demo/appointments">{content}</Link>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
