"use client";

import { useLanguage } from "@/context/LanguageContext";

export function DemoModeBanner() {
  const { t } = useLanguage();
  return (
    <div className="w-full border-b border-teal/20 bg-sage/60 py-2 text-center text-xs font-medium tracking-wide text-navy">
      <span className="rounded-full bg-teal/15 px-2 py-0.5 font-semibold uppercase text-teal">
        {t("common.demoMode")}
      </span>
      <span className="ml-2 text-navy/80">{t("common.demoModeNotice")}</span>
    </div>
  );
}
