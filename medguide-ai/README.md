# MedGuide AI

**Your AI Patient Advocate.** Understand. Prepare. Feel in control.

MedGuide helps people understand medical information, organize their health
history, and prepare for conversations with their healthcare professional.
It is an informational and organizational assistant — it does not diagnose,
prescribe, recommend treatment, or replace a doctor.

This is a working MVP, not a mockup: `/demo` is a fully functional product
walkthrough on a fictional patient (Ananya Rao), with no signup required.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Try
MedGuide**. No environment variables are required for the demo to work.

## The demo journey

Landing page → `/demo` (dashboard) → open a document → get a plain-language
explanation → `/demo/compare` two reports → `/demo/timeline` →
`/demo/appointments` → generate an appointment brief → ask the **AI Patient
Advocate** anything → switch English / Telugu / Hindi.

## Architecture

- **Next.js (App Router) + TypeScript + React + Tailwind CSS.**
- `src/lib/demoData.ts` — the fictional patient, documents, glossary,
  appointments, family, and timeline. All content is invented; nothing here
  is or represents a real patient record.
- `src/lib/ai/aiService.ts` — the AI abstraction. `getAIProvider()` returns
  an `AIProvider` (`generateResponse`, `explainDocument`,
  `compareDocuments`, `prepareAppointment`, `translateExplanation`). Today
  it always returns `DemoAIProvider`, a deterministic engine built from
  `demoData.ts` — no network call, no API key, never breaks with nothing
  configured. Swapping in a real LLM later means implementing `AIProvider`
  with a class that calls the provider server-side and switching what
  `getAIProvider()` returns — no call site changes.
- `src/lib/ai/safety.ts` — the reusable safety layer every AI response runs
  through first. Refuses diagnosis, prescribing, and medication-change
  requests with a fixed, honest redirect back to "talk to your doctor."
- `src/lib/i18n/` — UI dictionaries for English, Telugu, and Hindi, plus a
  `translate()` helper. Add a language by adding its code to
  `SupportedLanguage`, a dictionary matching `Dictionary`'s shape, and an
  entry in `LANGUAGES`.
- `src/context/LanguageContext.tsx` — client-side language state
  (persisted to `localStorage`).
- `src/lib/db/types.ts` — Supabase-ready Postgres models (users,
  family_members, documents, document_insights, comparisons,
  timeline_events, appointments, appointment_briefs, conversations,
  messages, subscriptions, payments, audit_logs) for the real-user backend
  that isn't built yet. `src/lib/db/client.ts` is a stub client that
  activates once `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`
  are set.
- `src/lib/analytics.ts` — event tracking abstraction (`track()`), logs to
  the console today, swappable for PostHog without touching call sites.
- `src/app/api/ai/route.ts` — the only network hop the chat UI makes. Keeps
  any future real LLM API key server-side only, never in frontend code.

## Environment variables

See `.env.example`. None are required to run or deploy the demo. They exist
so real user accounts (Supabase), a real LLM, payments (Razorpay), and
automation (n8n, PostHog, WhatsApp) can be wired in later without changing
the demo's code paths.

## Deploying

This is a standard Next.js app — deploy the `medguide-ai/` directory (e.g.
on Vercel, set the project root to `medguide-ai`). `npm run build` produces
a production build with no required configuration.
