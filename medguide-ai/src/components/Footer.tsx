"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-navy/8 bg-ivory">
      <div className="container-page flex flex-col gap-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif-display text-base font-semibold text-navy">MedGuide AI</p>
          <p className="mt-1 max-w-md">{t("footer.disclaimer")}</p>
        </div>
        <div className="flex gap-6">
          <Link href="/demo" className="hover:text-navy">
            {t("common.tryDemo")}
          </Link>
          <Link href="/login" className="hover:text-navy">
            {t("nav.login")}
          </Link>
          <Link href="/signup" className="hover:text-navy">
            {t("nav.signup")}
          </Link>
        </div>
      </div>
      <div className="border-t border-navy/8 py-4 text-center text-xs text-muted">{t("footer.rights")}</div>
    </footer>
  );
}
