"use client";

import { useEffect } from "react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Footer } from "@/components/Footer";
import { LinkButton } from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";
import { track } from "@/lib/analytics";
import { DASHBOARD_STATS, DEMO_PATIENT, DOCUMENTS, localize } from "@/lib/demoData";

const STEP_KEYS = [
  { title: "landing.step1Title", body: "landing.step1Body", icon: "01" },
  { title: "landing.step2Title", body: "landing.step2Body", icon: "02" },
  { title: "landing.step3Title", body: "landing.step3Body", icon: "03" },
  { title: "landing.step4Title", body: "landing.step4Body", icon: "04" },
] as const;

export default function LandingPage() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    track("landing_view");
  }, []);

  const recentDocs = [...DOCUMENTS].reverse().slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <PublicNavbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="container-page grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <span className="inline-block rounded-full border border-teal/30 bg-teal/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal">
              {t("landing.badge")}
            </span>
            <h1 className="mt-6 font-serif-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
              {t("landing.heroTitle1")}
              <br />
              {t("landing.heroTitle2")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">{t("landing.heroSubheadline")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LinkButton href="/demo" onClick={() => track("demo_clicked", { source: "hero" })}>
                {t("landing.primaryCta")}
              </LinkButton>
              <LinkButton href="#how-it-works" variant="secondary">
                {t("landing.secondaryCta")}
              </LinkButton>
            </div>
            <p className="mt-3 text-xs text-muted">{t("common.noSignupRequired")}</p>
          </div>

          {/* Dashboard preview mockup (no stock imagery, hand-built) */}
          <div className="relative">
            <div className="rounded-xl2 border border-navy/10 bg-white p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">{t("dashboard.greeting", { name: DEMO_PATIENT.name.split(" ")[0] })}</p>
                  <p className="font-serif-display text-lg font-semibold text-navy">
                    {t("dashboard.subheading")}
                  </p>
                </div>
                <span className="rounded-full bg-teal/10 px-2 py-1 text-[10px] font-semibold uppercase text-teal">
                  {t("common.demoMode")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-sage/40 p-3">
                  <p className="text-[11px] text-muted">{t("dashboard.statDocuments")}</p>
                  <p className="text-xl font-semibold text-navy">{DASHBOARD_STATS.documents}</p>
                </div>
                <div className="rounded-lg bg-sage/40 p-3">
                  <p className="text-[11px] text-muted">{t("dashboard.statReadiness")}</p>
                  <p className="text-xl font-semibold text-navy">{DASHBOARD_STATS.appointmentReadiness}%</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-navy/70">{t("dashboard.recentDocuments")}</p>
                {recentDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-lg border border-navy/8 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium text-ink">{localize(doc.title, lang)}</p>
                      <p className="text-[11px] text-muted">{localize(doc.typeLabel, lang)}</p>
                    </div>
                    <span className="text-[11px] text-muted">{doc.date}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl2 border border-navy/10 bg-white p-4 shadow-soft sm:block">
              <p className="text-xs text-muted">{t("advocate.name")}</p>
              <p className="mt-1 max-w-[14rem] text-xs leading-relaxed text-ink/80">
                &ldquo;{t("advocate.suggested3")}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-navy/8 bg-sage/30 py-20">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="font-serif-display text-3xl font-semibold text-navy">{t("landing.howItWorksTitle")}</h2>
              <p className="mt-3 text-ink/70">{t("landing.howItWorksSubtitle")}</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEP_KEYS.map((step) => (
                <div key={step.icon} className="rounded-xl2 border border-navy/8 bg-white p-6 shadow-soft">
                  <span className="font-serif-display text-2xl text-teal/60">{step.icon}</span>
                  <h3 className="mt-3 font-serif-display text-lg font-semibold text-navy">{t(step.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{t(step.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-navy/8 py-20">
          <div className="container-page flex flex-col items-center rounded-xl2 border border-navy/8 bg-navy px-8 py-14 text-center text-ivory">
            <h2 className="font-serif-display text-3xl font-semibold">{t("landing.finalCtaTitle")}</h2>
            <p className="mt-3 max-w-lg text-ivory/80">{t("landing.finalCtaSubtitle")}</p>
            <div className="mt-8">
              <LinkButton
                href="/demo"
                variant="inverse"
                onClick={() => track("demo_clicked", { source: "final_cta" })}
              >
                {t("landing.primaryCta")}
              </LinkButton>
            </div>
            <p className="mt-3 text-xs text-ivory/60">{t("common.noSignupRequired")}</p>
            <p className="mx-auto mt-8 max-w-xl text-xs text-ivory/50">{t("landing.footerDisclaimer")}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
