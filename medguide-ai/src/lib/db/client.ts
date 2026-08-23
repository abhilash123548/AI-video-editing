/**
 * Supabase client stub.
 *
 * Not used by /demo (which is fully static/deterministic and requires no
 * backend). Real user mode will initialize the Supabase client here once
 * NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are configured.
 *
 * Kept as a thin, swappable module so UI code never imports "@supabase/supabase-js"
 * directly — only this file needs to change when the real integration lands.
 */

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function getSupabaseClient(): null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  // Real implementation (once @supabase/supabase-js is installed):
  //
  // import { createClient } from "@supabase/supabase-js";
  // return createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  // );
  return null;
}
