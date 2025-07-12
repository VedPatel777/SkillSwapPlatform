"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Star, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating skill cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-float">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
            <div className="text-sm font-medium text-gray-700">React</div>
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 animate-float-delayed">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
            <div className="text-sm font-medium text-gray-700">Design</div>
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 translate-y-1/2 animate-float-slow">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
            <div className="text-sm font-medium text-gray-700">Python</div>
          </div>
        </div>
        <div className="absolute top-2/3 right-1/3 transform translate-x-1/2 translate-y-1/2 animate-float">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
            <div className="text-sm font-medium text-gray-700">Marketing</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Swap Skills,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Grow Together
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with talented individuals in your community. Exchange knowledge, learn new skills, and build
              meaningful professional relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Swapping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/auth/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-full border-2 hover:bg-white/50 backdrop-blur-sm bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center animate-fade-in-up animation-delay-200">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-600">Active Members</div>
                </div>
              </div>

              <div className="text-center animate-fade-in-up animation-delay-400">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">1,200+</div>
                  <div className="text-gray-600">Skills Swapped</div>
                </div>
              </div>

              <div className="text-center animate-fade-in-up animation-delay-600">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
