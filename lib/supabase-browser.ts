import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

/**
 * Centralised client for all browser-side Supabase calls.
 * Falls back to harmless demo values so the preview sandbox can run
 * even if env vars aren’t set.  For production just define the real
 * `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://demo.supabase.co"
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "public-anon-key"

export const supabase = createClientComponentClient({
  supabaseUrl: SUPABASE_URL,
  supabaseKey: SUPABASE_ANON_KEY,
})
