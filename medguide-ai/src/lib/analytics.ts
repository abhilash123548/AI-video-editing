/**
 * Analytics abstraction.
 *
 * V1 logs to the console (client) so the event contract is exercised end to
 * end. Swap the body of `track()` for a PostHog client call later — call
 * sites never need to change.
 */

export type AnalyticsEvent =
  | "landing_view"
  | "demo_clicked"
  | "demo_started"
  | "document_opened"
  | "document_explained"
  | "comparison_started"
  | "timeline_viewed"
  | "appointment_brief_generated"
  | "ai_question_asked"
  | "language_changed"
  | "signup_started"
  | "signup_completed"
  | "pricing_viewed"
  | "checkout_started"
  | "payment_completed";

export type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

export function track(event: AnalyticsEvent, properties: AnalyticsProperties = {}): void {
  const payload = {
    event,
    properties,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    console.log("[analytics]", payload);
  }

  // Future: PostHog integration.
  // if (typeof window !== "undefined" && window.posthog) {
  //   window.posthog.capture(event, properties);
  // }
}
