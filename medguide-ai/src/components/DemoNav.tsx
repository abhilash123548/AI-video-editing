"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { TranslationKey } from "@/lib/i18n";

const LINKS: { href: string; key: TranslationKey }[] = [
  { href: "/demo", key: "nav.dashboard" },
  { href: "/demo/timeline", key: "nav.timeline" },
  { href: "/demo/compare", key: "nav.compare" },
  { href: "/demo/appointments", key: "nav.appointments" },
  { href: "/demo/family", key: "nav.family" },
  { href: "/demo/advocate", key: "nav.advocate" },
];

export function DemoNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-navy/8 bg-ivory/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/demo" className="font-serif-display shrink-0 text-lg font-semibold tracking-tight text-navy">
          MedGuide <span className="text-teal">AI</span>
        </Link>
        <nav className="hidden flex-1 items-center gap-1 overflow-x-auto md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active ? "bg-navy text-ivory" : "text-navy/70 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="container-page flex items-center gap-1 overflow-x-auto pb-2 md:hidden">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${
                active ? "bg-navy text-ivory" : "text-navy/70 hover:bg-navy/5"
              }`}
            >
              {t(link.key)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
