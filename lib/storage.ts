// Local storage utilities for persistent data
export const STORAGE_KEYS = {
  USER: "skill_swap_user",
  PROFILES: "skill_swap_profiles",
  REQUESTS: "skill_swap_requests",
  FEEDBACK: "skill_swap_feedback",
}

export const storage = {
  get: (key: string) => {
    if (typeof window === "undefined") return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set: (key: string, value: any) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Storage error:", error)
    }
  },

  remove: (key: string) => {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },
}
