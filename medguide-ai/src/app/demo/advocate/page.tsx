"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useActive } from "@/context/ActiveContext";
import { ChatPanel } from "@/components/ChatPanel";

export default function AdvocatePage() {
  const { t } = useLanguage();
  const { activeDocumentId, activeAppointmentId } = useActive();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-serif-display text-2xl font-semibold text-navy">{t("advocate.headingNew")}</h1>
        <p className="mt-1 text-ink/70">{t("advocate.descNew")}</p>
      </div>
      <div className="flex h-[calc(100vh-17rem)] min-h-[26rem] flex-col overflow-hidden rounded-xl2 border border-navy/8 bg-white shadow-soft">
        <div className="border-b border-navy/8 bg-navy px-6 py-4 text-ivory">
          <p className="font-serif-display text-lg font-semibold">{t("advocate.name")}</p>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatPanel documentId={activeDocumentId} appointmentId={activeAppointmentId} />
        </div>
      </div>
    </div>
  );
}
