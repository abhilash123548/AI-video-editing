"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useActive } from "@/context/ActiveContext";
import { Card } from "@/components/Card";
import { ActionButton } from "@/components/Button";
import { APPOINTMENTS, getDocument, localize } from "@/lib/demoData";
import { computeAppointmentBrief, type AppointmentBriefResult } from "@/lib/ai/aiService";
import { track } from "@/lib/analytics";

export default function AppointmentsPage() {
  const { t, lang } = useLanguage();
  const { setActiveAppointmentId } = useActive();
  const [selectedId, setSelectedId] = useState(APPOINTMENTS[0].id);
  const [brief, setBrief] = useState<AppointmentBriefResult | null>(null);

  const appointment = APPOINTMENTS.find((a) => a.id === selectedId) ?? APPOINTMENTS[0];
  const relevantDocs = appointment.relevantDocumentIds.map((id) => getDocument(id)).filter(Boolean);

  useEffect(() => {
    setActiveAppointmentId(appointment.id);
    setBrief(null);
    return () => setActiveAppointmentId(undefined);
  }, [appointment.id, setActiveAppointmentId]);

  function handleGenerateBrief() {
    const result = computeAppointmentBrief(appointment.id, lang);
    setBrief(result);
    track("appointment_brief_generated", { appointment_id: appointment.id });
  }

  const otherAppointments = APPOINTMENTS.filter((a) => a.id !== appointment.id);

  return (
    <div className="space-y-8">
      <div className="no-print">
        <h1 className="font-serif-display text-3xl font-semibold text-navy">{t("appointments.title")}</h1>
      </div>

      {otherAppointments.length > 0 && (
        <div className="no-print flex flex-wrap gap-2">
          {APPOINTMENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setSelectedId(a.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                a.id === appointment.id ? "bg-navy text-ivory" : "border border-navy/15 text-navy/70 hover:border-navy/30"
              }`}
            >
              {localize(a.title, lang)}
            </button>
          ))}
        </div>
      )}

      <Card>
        <span className="rounded-full bg-sage/60 px-2.5 py-1 text-[11px] font-medium text-navy">
          {t("appointments.upcoming")}
        </span>
        <h2 className="mt-3 font-serif-display text-2xl font-semibold text-navy">{localize(appointment.title, lang)}</h2>
        <p className="mt-1 text-sm text-muted">
          {appointment.date} · {appointment.time}
        </p>
        <p className="text-sm text-ink/70">{localize(appointment.location, lang)}</p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("appointments.relevantDocuments")}</h2>
          <ul className="mt-3 space-y-2">
            {relevantDocs.map(
              (doc) =>
                doc && (
                  <li key={doc.id}>
                    <Link
                      href={`/demo/documents/${doc.id}`}
                      className="flex items-center justify-between rounded-lg border border-navy/8 px-3 py-2.5 text-sm hover:bg-sage/20"
                    >
                      <span className="text-ink">{localize(doc.title, lang)}</span>
                      <span className="text-xs text-muted">{doc.date}</span>
                    </Link>
                  </li>
                ),
            )}
          </ul>
        </Card>

        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("appointments.whatToRemember")}</h2>
          <ul className="mt-3 space-y-2.5">
            {appointment.whatToRemember.map((entry, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                <span className="text-teal">•</span>
                <span>{localize(entry, lang)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("appointments.documentsToBring")}</h2>
          <ul className="mt-3 space-y-2">
            {appointment.documentsToBring.map((entry, i) => (
              <li key={i} className="text-sm leading-relaxed text-ink/80">
                📄 {localize(entry, lang)}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-serif-display text-lg font-semibold text-navy">{t("appointments.personalNotes")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            {localize(appointment.personalNotes, lang) || t("appointments.noNotes")}
          </p>
        </Card>
      </div>

      <div className="no-print flex flex-wrap gap-3">
        <ActionButton onClick={handleGenerateBrief}>{t("appointments.generateBrief")}</ActionButton>
        {brief && (
          <ActionButton variant="secondary" onClick={() => window.print()}>
            {t("common.download")}
          </ActionButton>
        )}
      </div>

      {brief && (
        <Card className="border-teal/30 bg-teal/5">
          <h2 className="font-serif-display text-xl font-semibold text-navy">{t("appointments.briefTitle")}</h2>
          <p className="mt-1 text-xs text-muted">
            {t("appointments.briefGenerated")}: {new Date().toLocaleDateString()}
          </p>

          <h3 className="mt-5 text-sm font-semibold text-navy">{t("appointments.briefDocumentsToReview")}</h3>
          <ul className="mt-2 space-y-1.5">
            {brief.documentsToReview.map((d, i) => (
              <li key={i} className="text-sm text-ink/80">
                • {d}
              </li>
            ))}
          </ul>

          <h3 className="mt-5 text-sm font-semibold text-navy">{t("appointments.briefQuestions")}</h3>
          <ol className="mt-2 space-y-1.5">
            {brief.questionsToDiscuss.map((q, i) => (
              <li key={i} className="text-sm text-ink/80">
                {i + 1}. {q}
              </li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  );
}
