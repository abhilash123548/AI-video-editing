"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Card, StatCard } from "@/components/Card";
import { LinkButton } from "@/components/Button";
import {
  APPOINTMENTS,
  DASHBOARD_STATS,
  DEMO_PATIENT,
  DOCUMENTS,
  localize,
} from "@/lib/demoData";
import { track } from "@/lib/analytics";

export default function DashboardPage() {
  const { t, lang } = useLanguage();
  const recentDocs = [...DOCUMENTS].reverse().slice(0, 4);
  const nextAppointment = APPOINTMENTS[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif-display text-3xl font-semibold text-navy">
          {t("dashboard.greeting", { name: DEMO_PATIENT.name.split(" ")[0] })}
        </h1>
        <p className="mt-1 text-ink/70">{t("dashboard.subheading")}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label={t("dashboard.statDocuments")} value={DASHBOARD_STATS.documents} />
        <StatCard label={t("dashboard.statTimelineEvents")} value={DASHBOARD_STATS.timelineEvents} />
        <StatCard label={t("dashboard.statUpcomingAppointments")} value={DASHBOARD_STATS.upcomingAppointments} />
        <StatCard label={t("dashboard.statReadiness")} value={`${DASHBOARD_STATS.appointmentReadiness}%`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif-display text-lg font-semibold text-navy">{t("dashboard.recentDocuments")}</h2>
            <Link href="/demo/timeline" className="text-sm font-medium text-teal hover:underline">
              {t("common.viewAll")}
            </Link>
          </div>
          <ul className="divide-y divide-navy/8">
            {recentDocs.map((doc) => (
              <li key={doc.id}>
                <Link
                  href={`/demo/documents/${doc.id}`}
                  onClick={() => track("document_opened", { document_id: doc.id })}
                  className="flex items-center justify-between gap-4 py-3.5 transition-colors hover:bg-sage/20"
                >
                  <div>
                    <p className="font-medium text-ink">{localize(doc.title, lang)}</p>
                    <p className="text-xs text-muted">
                      {localize(doc.typeLabel, lang)} · {doc.date}
                    </p>
                  </div>
                  <span className="rounded-full bg-sage/60 px-2.5 py-1 text-[11px] font-medium text-navy">
                    {t("common.processed")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="font-serif-display text-lg font-semibold text-navy">{t("dashboard.upcomingAppointment")}</h2>
            <p className="mt-2 font-medium text-ink">{localize(nextAppointment.title, lang)}</p>
            <p className="text-sm text-muted">
              {nextAppointment.date} · {nextAppointment.time}
            </p>
            <p className="mt-1 text-sm text-ink/70">{localize(nextAppointment.location, lang)}</p>
            <LinkButton href="/demo/appointments" variant="secondary" className="mt-4 w-full py-2 text-sm">
              {t("dashboard.viewAppointment")}
            </LinkButton>
          </Card>

          <Card className="bg-navy text-ivory">
            <h2 className="font-serif-display text-lg font-semibold">{t("dashboard.aiAdvocate")}</h2>
            <p className="mt-2 text-sm text-ivory/80">{t("dashboard.aiAdvocateTeaser")}</p>
            <LinkButton href="/demo/advocate" variant="inverse" className="mt-4 w-full py-2 text-sm">
              {t("dashboard.openAdvocate")}
            </LinkButton>
          </Card>
        </div>
      </div>
    </div>
  );
}
