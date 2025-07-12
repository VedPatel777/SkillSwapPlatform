"use client"

import { useAuth } from "@/components/auth-provider"
import { LandingPage } from "@/components/landing-page"
import { HomePage } from "@/components/home-page"
import { ArrowRight } from "lucide-react"

export default function Page() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
            Loading&nbsp;
            <ArrowRight className="h-5 w-5 animate-pulse" />
          </p>
        </div>
      </div>
    )
  }

  // Visitor → show marketing landing
  if (!user) {
    return <LandingPage />
  }

  // Signed-in user → show the interactive home dashboard
  return <HomePage />
}
