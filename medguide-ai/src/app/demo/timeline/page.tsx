"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRecords } from "@/context/RecordsContext";
import { Card } from "@/components/Card";
import { DOCUMENT_TYPE_LABELS, TIMELINE, localize } from "@/lib/demoData";
import { track } from "@/lib/analytics";

interface TimelineRow {
  id: string;
  year: string;
  date: string;
  title: string;
  typeLabel: string;
  documentId?: string;
}

export default function TimelinePage() {
  const { t, lang } = useLanguage();
  const { records } = useRecords();

  useEffect(() => {
    track("timeline_viewed");
  }, []);

  const grouped = useMemo(() => {
    const sampleRows: TimelineRow[] = TIMELINE.map((item) => ({
      id: item.id,
      year: item.year,
      date: item.date,
      title: localize(item.title, lang),
      typeLabel: localize(item.typeLabel, lang),
      documentId: item.documentId,
    }));
    const userRows: TimelineRow[] = records.map((r) => ({
      id: r.id,
      year: r.date.slice(0, 4),
      date: r.date,
      title: r.title,
      typeLabel: localize(DOCUMENT_TYPE_LABELS[r.type], lang),
      documentId: r.id,
    }));

    const byYear = new Map<string, TimelineRow[]>();
    for (const item of [...sampleRows, ...userRows]) {
      const list = byYear.get(item.year) ?? [];
      list.push(item);
      byYear.set(item.year, list);
    }
    return Array.from(byYear.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [records, lang]);

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
                      <p className="mt-1 font-medium text-ink">{item.title}</p>
                      <p className="text-xs text-muted">{item.typeLabel}</p>
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
