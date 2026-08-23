import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  const hasCustomBg = /\bbg-/.test(className);
  return (
    <div
      className={`rounded-xl2 border border-navy/8 p-6 shadow-soft ${hasCustomBg ? "" : "bg-white"} ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-serif-display text-3xl font-semibold text-navy">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </Card>
  );
}
