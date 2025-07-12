import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

/**
 * Central client for all browser-side Supabase calls.
 * Make sure the two env vars are set in `.env.local` or
 * Vercel → Project Settings → Environment Variables.
 */
export const supabase = createClientComponentClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
})

/* ---------- Shared App Types ---------- */
export type Profile = {
  id: string
  name: string
  location?: string
  profile_photo?: string
  skills_offered: string[]
  skills_wanted: string[]
  availability: string
  is_public: boolean
  rating: number
  rating_count: number
  created_at: string
  updated_at: string
}

export type SwapRequest = {
  id: string
  requester_id: string
  requested_id: string
  offered_skill: string
  wanted_skill: string
  message: string
  status: "pending" | "accepted" | "rejected"
  created_at: string
  updated_at: string
  requester?: Profile
  requested?: Profile
}

export type Feedback = {
  id: string
  swap_request_id: string
  from_user_id: string
  to_user_id: string
  rating: number
  comment: string
  created_at: string
}
