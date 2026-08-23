"use client";

import { useEffect } from "react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Footer } from "@/components/Footer";
import { LinkButton } from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";
import { track } from "@/lib/analytics";
import { DASHBOARD_STATS, DEMO_PATIENT, DOCUMENTS, FAMILY_MEMBERS, localize } from "@/lib/demoData";

const WHAT_CARDS = [
  { kicker: "landing.card1Kicker", title: "landing.card1Title", body: "landing.card1Body" },
  { kicker: "landing.card2Kicker", title: "landing.card2Title", body: "landing.card2Body" },
  { kicker: "landing.card3Kicker", title: "landing.card3Title", body: "landing.card3Body" },
  { kicker: "landing.card4Kicker", title: "landing.card4Title", body: "landing.card4Body" },
] as const;

const BENEFITS = [
  { title: "landing.benefit1Title", body: "landing.benefit1Body" },
  { title: "landing.benefit2Title", body: "landing.benefit2Body" },
  { title: "landing.benefit3Title", body: "landing.benefit3Body" },
  { title: "landing.benefit4Title", body: "landing.benefit4Body" },
] as const;

const STORY_EVENTS = [
  { date: "2026-08-14", docIndex: 2 },
  { date: "2026-08-20", docIndex: 3 },
  { date: "2026-08-21", docIndex: 4 },
  { date: "2026-08-25", docIndex: null },
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
            <h1 className="font-serif-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
              {t("landing.heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">{t("landing.heroSubheadline")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LinkButton href="/demo/records/new" onClick={() => track("app_entry_clicked", { source: "hero" })}>
                {t("landing.primaryCta")}
              </LinkButton>
              <LinkButton href="#how-it-works" variant="secondary">
                {t("landing.secondaryCta")}
              </LinkButton>
            </div>
            <p className="mt-3 text-xs text-muted">{t("landing.heroSupport")}</p>
          </div>

          {/* Dashboard preview mockup (no stock imagery, hand-built) */}
          <div className="relative">
            <div className="rounded-xl2 border border-navy/10 bg-white p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">{t("dashboard.greeting", { name: DEMO_PATIENT.name.split(" ")[0] })}</p>
                  <p className="font-serif-display text-lg font-semibold text-navy">{t("dashboard.heroTitle")}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-sage/40 p-3">
                  <p className="text-[11px] text-muted">{t("dashboard.statDocuments")}</p>
                  <p className="text-xl font-semibold text-navy">{DASHBOARD_STATS.documents}</p>
                </div>
                <div className="rounded-lg bg-sage/40 p-3">
                  <p className="text-[11px] text-muted">{t("dashboard.statUpcomingAppointments")}</p>
                  <p className="text-xl font-semibold text-navy">{DASHBOARD_STATS.upcomingAppointments}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-navy/70">{t("dashboard.recentHealthRecords")}</p>
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
              <p className="mt-1 max-w-[14rem] text-xs leading-relaxed text-ink/80">&ldquo;{t("landing.exampleQ2")}&rdquo;</p>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className="border-t border-navy/8 bg-sage/30 py-20">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="font-serif-display text-3xl font-semibold text-navy">{t("landing.problemHeading")}</h2>
              <div className="mt-6 space-y-1.5 text-ink/75">
                <p>{t("landing.problemLine1")}</p>
                <p>{t("landing.problemLine2")}</p>
                <p>{t("landing.problemLine3")}</p>
                <p>{t("landing.problemLine4")}</p>
              </div>
              <p className="mt-4 text-ink/75">{t("landing.problemLine5")}</p>
              <p className="mt-6 font-serif-display text-xl font-semibold text-navy">{t("landing.problemResolution")}</p>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center gap-3">
                {["landing.flowReports", "landing.flowPrescriptions", "landing.flowConsultations", "landing.flowAppointments"].map(
                  (key) => (
                    <span
                      key={key}
                      className="rounded-full border border-navy/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy/70"
                    >
                      {t(key as Parameters<typeof t>[0])}
                    </span>
                  ),
                )}
              </div>
              <span className="text-2xl text-teal" aria-hidden>
                ↓
              </span>
              <span className="rounded-full bg-navy px-6 py-2.5 font-serif-display text-lg font-semibold text-ivory">
                {t("landing.flowMedguide")}
              </span>
              <span className="text-2xl text-teal" aria-hidden>
                ↓
              </span>
              <span className="rounded-full border border-teal/40 bg-teal/10 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-teal">
                {t("landing.flowResult")}
              </span>
            </div>
          </div>
        </section>

        {/* What MedGuide does */}
        <section id="how-it-works" className="py-20">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="font-serif-display text-3xl font-semibold text-navy">{t("landing.howTitle")}</h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHAT_CARDS.map((card) => (
                <div key={card.title} className="rounded-xl2 border border-navy/8 bg-white p-6 shadow-soft">
                  <span className="text-xs font-semibold uppercase tracking-wide text-teal">{t(card.kicker)}</span>
                  <h3 className="mt-3 font-serif-display text-lg font-semibold text-navy">{t(card.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{t(card.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-life story */}
        <section className="border-t border-navy/8 bg-sage/30 py-20">
          <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-serif-display text-3xl font-semibold text-navy">{t("landing.storyTitle")}</h2>
              <p className="mt-4 text-ink/75">{t("landing.storyBody")}</p>
              <LinkButton
                href="/demo/records/new"
                className="mt-8"
                onClick={() => track("app_entry_clicked", { source: "story" })}
              >
                {t("landing.storyCta")}
              </LinkButton>
            </div>
            <div className="space-y-3 border-l-2 border-teal/30 pl-6">
              {STORY_EVENTS.map((event) => {
                const doc = event.docIndex !== null ? DOCUMENTS[event.docIndex] : null;
                return (
                  <div key={event.date} className="rounded-xl2 border border-navy/8 bg-white p-4 shadow-soft">
                    <p className="text-xs text-muted">{event.date}</p>
                    <p className="mt-0.5 font-medium text-ink">
                      {doc ? localize(doc.title, lang) : localize({ en: "Doctor Appointment", te: "డాక్టర్ అపాయింట్‌మెంట్", hi: "डॉक्टर अपॉइंटमेंट" }, lang)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* For families */}
        <section className="py-20">
          <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-serif-display text-3xl font-semibold text-navy">{t("landing.familiesTitle")}</h2>
              <p className="mt-4 text-ink/75">{t("landing.familiesBody1")}</p>
              <p className="mt-3 text-ink/75">{t("landing.familiesBody2")}</p>
              <LinkButton href="/demo/family" variant="secondary" className="mt-8">
                {t("landing.familiesCta")}
              </LinkButton>
            </div>
            <div className="flex flex-wrap gap-4">
              {FAMILY_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="flex min-w-[9rem] flex-1 flex-col items-center gap-2 rounded-xl2 border border-navy/8 bg-white p-6 text-center shadow-soft"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/60 font-serif-display text-lg font-semibold text-navy">
                    {localize(member.name, lang).charAt(0)}
                  </div>
                  <p className="text-sm font-medium text-ink">{localize(member.name, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Advocate */}
        <section className="border-t border-navy/8 bg-navy py-20 text-ivory">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="font-serif-display text-3xl font-semibold">{t("landing.advocateSectionTitle")}</h2>
              <p className="mt-4 text-ivory/80">{t("landing.advocateSectionBody")}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["landing.exampleQ1", "landing.exampleQ2", "landing.exampleQ3", "landing.exampleQ4"].map((key) => (
                <span key={key} className="rounded-full border border-ivory/25 bg-ivory/5 px-4 py-2 text-sm text-ivory/90">
                  &ldquo;{t(key as Parameters<typeof t>[0])}&rdquo;
                </span>
              ))}
            </div>
            <p className="mt-8 max-w-2xl text-xs text-ivory/55">{t("landing.advocateSectionDisclaimer")}</p>
          </div>
        </section>

        {/* Why MedGuide */}
        <section className="py-20">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="font-serif-display text-3xl font-semibold text-navy">{t("landing.whyTitle")}</h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} className="rounded-xl2 border border-navy/8 bg-white p-6 shadow-soft">
                  <h3 className="font-serif-display text-lg font-semibold text-navy">{t(benefit.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{t(benefit.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-navy/8 py-20">
          <div className="container-page flex flex-col items-center rounded-xl2 border border-navy/8 bg-navy px-8 py-14 text-center text-ivory">
            <h2 className="font-serif-display text-3xl font-semibold">{t("landing.finalCtaTitle")}</h2>
            <p className="mt-3 max-w-lg text-ivory/80">{t("landing.finalCtaBody")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <LinkButton
                href="/demo/records/new"
                variant="inverse"
                onClick={() => track("app_entry_clicked", { source: "final_cta" })}
              >
                {t("landing.finalCtaPrimary")}
              </LinkButton>
              <LinkButton
                href="/demo"
                variant="outline-inverse"
                onClick={() => track("app_entry_clicked", { source: "final_cta_secondary" })}
              >
                {t("landing.finalCtaSecondary")}
              </LinkButton>
            </div>
            <p className="mx-auto mt-8 max-w-xl text-xs text-ivory/50">{t("landing.footerDisclaimer")}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
