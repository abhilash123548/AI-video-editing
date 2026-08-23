"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useActive } from "@/context/ActiveContext";
import { ChatPanel } from "@/components/ChatPanel";

export function ChatWidget() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { chatOpen, setChatOpen, activeDocumentId, activeAppointmentId } = useActive();

  // The /demo/advocate page already renders a full-page ChatPanel — avoid
  // stacking a second chat surface on top of it.
  if (pathname === "/demo/advocate") return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {chatOpen && (
        <div className="mb-3 flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-xl2 border border-navy/10 bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-navy/8 bg-navy px-4 py-3 text-ivory">
            <span className="text-sm font-medium">{t("advocate.name")}</span>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              aria-label="Close"
              className="text-ivory/70 hover:text-ivory"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatPanel compact documentId={activeDocumentId} appointmentId={activeAppointmentId} />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setChatOpen(!chatOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-ivory shadow-soft transition-transform hover:scale-105"
        aria-label={t("advocate.name")}
      >
        {chatOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}
