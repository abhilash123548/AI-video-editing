"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRecords } from "@/context/RecordsContext";
import { Card, StatCard } from "@/components/Card";
import { LinkButton } from "@/components/Button";
import { APPOINTMENTS, DASHBOARD_STATS, DEMO_PATIENT, localize } from "@/lib/demoData";
import { combineRecords } from "@/lib/records/combine";
import { track } from "@/lib/analytics";

export default function DashboardPage() {
  const { t, lang } = useLanguage();
  const { records } = useRecords();
  const combined = combineRecords(records, lang);
  const recentRecords = combined.slice(0, 5);
  const nextAppointment = APPOINTMENTS[0];
  const timelinePreview = [
    ...combined.map((r) => ({ id: r.id, date: r.date, title: r.title })),
    ...(nextAppointment
      ? [{ id: nextAppointment.id, date: nextAppointment.date, title: localize(nextAppointment.title, lang) }]
      : []),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="rounded-xl2 border border-navy/8 bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm text-muted">{t("dashboard.greeting", { name: DEMO_PATIENT.name.split(" ")[0] })}</p>
        <h1 className="mt-2 font-serif-display text-3xl font-semibold text-navy">{t("dashboard.heroTitle")}</h1>
        <p className="mt-3 max-w-2xl text-ink/75">{t("dashboard.heroBody")}</p>
        <p className="mt-3 max-w-2xl text-sm text-ink/60">{t("dashboard.heroExplain")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="/demo/records/new" onClick={() => track("add_record_started", { source: "dashboard_hero" })}>
            {t("records.addHealthRecord")}
          </LinkButton>
          <LinkButton href="/demo/advocate" variant="secondary">
            {t("dashboard.askMedGuide")}
          </LinkButton>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label={t("dashboard.statDocuments")} value={DASHBOARD_STATS.documents} />
        <StatCard label={t("dashboard.statUpcomingAppointments")} value={DASHBOARD_STATS.upcomingAppointments} />
        <StatCard label={t("dashboard.statTimelineEvents")} value={DASHBOARD_STATS.timelineEvents} />
        <StatCard label={t("dashboard.statRecordsAdded")} value={records.length} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Health Records */}
        <Card className="min-w-0 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif-display text-lg font-semibold text-navy">{t("dashboard.recentHealthRecords")}</h2>
            <Link href="/demo/timeline" className="text-sm font-medium text-teal hover:underline">
              {t("common.viewAll")}
            </Link>
          </div>
          <div className="min-w-0 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-navy/8 text-xs text-muted">
                  <th className="pb-2 font-medium">{t("dashboard.tableDocument")}</th>
                  <th className="pb-2 font-medium">{t("dashboard.tableType")}</th>
                  <th className="pb-2 font-medium">{t("dashboard.tableDate")}</th>
                  <th className="pb-2 font-medium">{t("dashboard.tableProvider")}</th>
                  <th className="pb-2 font-medium">{t("dashboard.tableStatus")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8">
                {recentRecords.map((rec) => (
                  <tr
                    key={rec.id}
                    className="cursor-pointer hover:bg-sage/20"
                    onClick={() => track("document_opened", { document_id: rec.id })}
                  >
                    <td className="py-3 pr-3 font-medium text-ink">
                      <Link href={rec.href} className="hover:underline">
                        {rec.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-3 text-ink/70">{rec.typeLabel}</td>
                    <td className="py-3 pr-3 text-ink/70">{rec.date}</td>
                    <td className="py-3 pr-3 text-ink/70">{rec.doctor ?? rec.provider ?? "—"}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-sage/60 px-2.5 py-1 text-[11px] font-medium text-navy">
                        {rec.isSample ? t("common.processed") : t("records.added")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          {/* Add Health Record */}
          <Card className="border-teal/30 bg-teal/5">
            <h2 className="font-serif-display text-lg font-semibold text-navy">{t("records.addHealthRecord")}</h2>
            <p className="mt-2 text-sm text-ink/70">{t("records.addSubheading")}</p>
            <LinkButton href="/demo/records/new" className="mt-4 w-full py-2 text-sm">
              {t("records.addHealthRecord")}
            </LinkButton>
          </Card>

          {/* Upcoming appointment */}
          <Card>
            <h2 className="font-serif-display text-lg font-semibold text-navy">{t("dashboard.upcomingAppointment")}</h2>
            {nextAppointment ? (
              <>
                <p className="mt-2 font-medium text-ink">{localize(nextAppointment.title, lang)}</p>
                <p className="text-sm text-muted">
                  {nextAppointment.date} · {nextAppointment.time}
                </p>
                <p className="mt-1 text-sm text-ink/70">{localize(nextAppointment.location, lang)}</p>
                <LinkButton href="/demo/appointments" variant="secondary" className="mt-4 w-full py-2 text-sm">
                  {t("dashboard.prepareForAppointment")}
                </LinkButton>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted">{t("dashboard.noUpcoming")}</p>
            )}
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timeline preview */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif-display text-lg font-semibold text-navy">{t("dashboard.yourTimeline")}</h2>
            <Link href="/demo/timeline" className="text-sm font-medium text-teal hover:underline">
              {t("dashboard.viewFullTimeline")}
            </Link>
          </div>
          <ol className="space-y-3 border-l-2 border-sage pl-5">
            {timelinePreview.map((item) => (
              <li key={item.id} className="relative text-sm">
                <span className="absolute -left-[1.45rem] top-1.5 h-2.5 w-2.5 rounded-full bg-teal" />
                <span className="text-xs text-muted">{item.date}</span>
                <p className="font-medium text-ink">{item.title}</p>
              </li>
            ))}
          </ol>
        </Card>

        {/* AI Advocate */}
        <Card className="bg-navy text-ivory">
          <h2 className="font-serif-display text-lg font-semibold">{t("dashboard.advocateHeading")}</h2>
          <p className="mt-2 text-sm text-ivory/80">{t("dashboard.advocateCopy")}</p>
          <LinkButton href="/demo/advocate" variant="inverse" className="mt-4 w-full py-2 text-sm">
            {t("dashboard.askMedGuide")}
          </LinkButton>
        </Card>
      </div>
    </div>
  );
}
