"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AddRecordInput, UserRecord } from "@/lib/records/types";

const STORAGE_KEY = "medguide-user-records";

function loadRecords(): UserRecord[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRecords(records: UserRecord[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Storage unavailable (private browsing, quota, etc.) — records stay
    // in memory for this session instead of failing the add flow.
  }
}

interface RecordsContextValue {
  records: UserRecord[];
  addRecord: (input: AddRecordInput) => UserRecord;
  getRecord: (id: string) => UserRecord | undefined;
  hasHydrated: boolean;
}

const RecordsContext = createContext<RecordsContextValue | null>(null);

export function RecordsProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<UserRecord[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setRecords(loadRecords());
    setHasHydrated(true);
  }, []);

  const addRecord = useCallback((input: AddRecordInput): UserRecord => {
    const record: UserRecord = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      addedAt: new Date().toISOString(),
      isSample: false,
      ...input,
    };
    setRecords((prev) => {
      const next = [...prev, record];
      saveRecords(next);
      return next;
    });
    return record;
  }, []);

  const getRecord = useCallback(
    (id: string) => records.find((r) => r.id === id),
    [records],
  );

  const value = useMemo(
    () => ({ records, addRecord, getRecord, hasHydrated }),
    [records, addRecord, getRecord, hasHydrated],
  );

  return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
}

export function useRecords(): RecordsContextValue {
  const ctx = useContext(RecordsContext);
  if (!ctx) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return ctx;
}
