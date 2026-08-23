"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useActive } from "@/context/ActiveContext";
import { ChatPanel } from "@/components/ChatPanel";

export default function AdvocatePage() {
  const { t } = useLanguage();
  const { activeDocumentId, activeAppointmentId } = useActive();

  return (
    <div className="mx-auto flex h-[calc(100vh-11rem)] max-w-2xl flex-col overflow-hidden rounded-xl2 border border-navy/8 bg-white shadow-soft">
      <div className="border-b border-navy/8 bg-navy px-6 py-4 text-ivory">
        <h1 className="font-serif-display text-lg font-semibold">{t("advocate.name")}</h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatPanel documentId={activeDocumentId} appointmentId={activeAppointmentId} />
      </div>
    </div>
  );
}
