"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

/**
 * Tracks which document/appointment the user is currently focused on within
 * /demo, so the floating AI Advocate widget can answer "explain this
 * report" style questions with the right context even though the widget
 * itself lives in the shared demo layout, above individual pages.
 */
interface ActiveContextValue {
  activeDocumentId?: string;
  setActiveDocumentId: (id: string | undefined) => void;
  activeAppointmentId?: string;
  setActiveAppointmentId: (id: string | undefined) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
}

const ActiveContext = createContext<ActiveContextValue | null>(null);

export function ActiveProvider({ children }: { children: ReactNode }) {
  const [activeDocumentId, setActiveDocumentId] = useState<string | undefined>();
  const [activeAppointmentId, setActiveAppointmentId] = useState<string | undefined>();
  const [chatOpen, setChatOpen] = useState(false);

  const value = useMemo(
    () => ({
      activeDocumentId,
      setActiveDocumentId,
      activeAppointmentId,
      setActiveAppointmentId,
      chatOpen,
      setChatOpen,
    }),
    [activeDocumentId, activeAppointmentId, chatOpen],
  );

  return <ActiveContext.Provider value={value}>{children}</ActiveContext.Provider>;
}

export function useActive(): ActiveContextValue {
  const ctx = useContext(ActiveContext);
  if (!ctx) {
    throw new Error("useActive must be used within an ActiveProvider");
  }
  return ctx;
}
