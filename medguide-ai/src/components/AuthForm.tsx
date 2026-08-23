"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/PublicNavbar";
import { Footer } from "@/components/Footer";
import { ActionButton, LinkButton } from "@/components/Button";
import { Card } from "@/components/Card";
import { useLanguage } from "@/context/LanguageContext";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import type { TranslationKey } from "@/lib/i18n";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const titleKey: TranslationKey = mode === "login" ? "auth.loginTitle" : "auth.signupTitle";
  const subtitleKey: TranslationKey = mode === "login" ? "auth.loginSubtitle" : "auth.signupSubtitle";
  const buttonKey: TranslationKey = mode === "login" ? "auth.loginButton" : "auth.signupButton";
  const switchTextKey: TranslationKey = mode === "login" ? "auth.noAccount" : "auth.haveAccount";
  const switchHref = mode === "login" ? "/signup" : "/login";
  const switchLabelKey: TranslationKey = mode === "login" ? "nav.signup" : "nav.login";
  const startEvent: AnalyticsEvent = "signup_started";

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <PublicNavbar />
      <main className="container-page flex flex-1 items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <h1 className="font-serif-display text-2xl font-semibold text-navy">{t(titleKey)}</h1>
          <p className="mt-2 text-sm text-ink/70">{t(subtitleKey)}</p>

          {submitted ? (
            <div className="mt-6 rounded-lg border border-teal/30 bg-teal/5 p-4 text-sm text-ink/80">
              {t("auth.comingSoon")}
            </div>
          ) : (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (mode === "signup") track(startEvent);
                setSubmitted(true);
              }}
            >
              {mode === "signup" && (
                <label className="block">
                  <span className="text-sm font-medium text-navy">{t("auth.name")}</span>
                  <input
                    type="text"
                    required
                    className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
                  />
                </label>
              )}
              <label className="block">
                <span className="text-sm font-medium text-navy">{t("auth.email")}</span>
                <input
                  type="email"
                  required
                  className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-navy">{t("auth.password")}</span>
                <input
                  type="password"
                  required
                  className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal"
                />
              </label>
              <ActionButton type="submit" className="w-full">
                {t(buttonKey)}
              </ActionButton>
            </form>
          )}

          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-muted">
              {t(switchTextKey)}{" "}
              <Link href={switchHref} className="font-medium text-teal hover:underline">
                {t(switchLabelKey)}
              </Link>
            </span>
          </div>

          <div className="mt-6 border-t border-navy/8 pt-6 text-center">
            <LinkButton href="/demo" variant="secondary" className="w-full">
              {t("common.tryDemo")}
            </LinkButton>
            <p className="mt-2 text-xs text-muted">{t("auth.orTryDemo")}</p>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
