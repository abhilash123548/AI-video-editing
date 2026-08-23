"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LinkButton } from "@/components/Button";

export function PublicNavbar() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-40 border-b border-navy/8 bg-ivory/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-serif-display text-lg font-semibold tracking-tight text-navy">
          MedGuide <span className="text-teal">AI</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link href="/login" className="hidden text-sm font-medium text-navy/70 hover:text-navy sm:block">
            {t("nav.login")}
          </Link>
          <LinkButton href="/demo" variant="primary" className="px-5 py-2 text-sm">
            {t("common.tryDemo")}
          </LinkButton>
        </div>
      </nav>
    </header>
  );
}
