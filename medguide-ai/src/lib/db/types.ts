/**
 * Supabase-ready data models for MedGuide AI.
 *
 * These types describe the Postgres schema MedGuide will use once real user
 * accounts, document uploads, and AI processing are wired up. Nothing in
 * /demo touches this file or a live database — the demo runs entirely on
 * fictional in-memory data (see src/lib/demoData.ts). Keeping the schema
 * here, decoupled from UI code, means the real backend can be implemented
 * without reshaping any component.
 *
 * Suggested primary keys: uuid (Supabase default `gen_random_uuid()`).
 * Suggested timestamps: `timestamptz`, defaulting to `now()`.
 */

export type SupportedLanguage = "en" | "te" | "hi";

export type DocumentType =
  | "blood_test"
  | "mri_report"
  | "consultation_note"
  | "prescription"
  | "other";

export type ProcessingStatus = "pending" | "processing" | "processed" | "failed";

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  preferred_language: SupportedLanguage;
  created_at: string;
  updated_at: string;
}

export interface FamilyMember {
  id: string;
  owner_user_id: string;
  display_name: string;
  relationship: string;
  can_view: string[]; // user ids granted permission to view this member's records
  created_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  family_member_id: string | null;
  title: string;
  document_type: DocumentType;
  document_date: string;
  source: "upload" | "email" | "whatsapp" | "manual";
  file_url: string | null;
  processing_status: ProcessingStatus;
  created_at: string;
  updated_at: string;
}

export interface DocumentInsight {
  id: string;
  document_id: string;
  plain_language_summary: string;
  key_terms: { term: string; explanation: string }[];
  discussion_questions: string[];
  extracted_metrics: Record<string, string | number> | null;
  language: SupportedLanguage;
  created_at: string;
}

export interface Comparison {
  id: string;
  user_id: string;
  previous_document_id: string;
  current_document_id: string;
  new_information: string[];
  changed_information: string[];
  unchanged_information: string[];
  discussion_questions: string[];
  created_at: string;
}

export interface TimelineEvent {
  id: string;
  user_id: string;
  family_member_id: string | null;
  document_id: string | null;
  appointment_id: string | null;
  event_date: string;
  title: string;
  category: DocumentType | "appointment";
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  family_member_id: string | null;
  title: string;
  specialty: string | null;
  scheduled_at: string;
  location: string | null;
  status: "upcoming" | "completed" | "cancelled";
  personal_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppointmentBrief {
  id: string;
  appointment_id: string;
  documents_to_review: string[];
  what_to_remember: string[];
  questions_to_discuss: string[];
  documents_to_bring: string[];
  generated_at: string;
  language: SupportedLanguage;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  language: SupportedLanguage;
  created_at: string;
}

export type SubscriptionPlan = "free" | "individual" | "family";
export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled";

export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_end: string | null;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  subscription_id: string | null;
  amount_minor_units: number;
  currency: string;
  provider: "razorpay" | "stripe" | "other";
  provider_payment_id: string | null;
  status: "created" | "authorized" | "captured" | "failed" | "refunded";
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}
