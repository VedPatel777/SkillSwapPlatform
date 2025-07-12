"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { signUp, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    const success = await signUp(email, password, name)

    if (success) {
      toast({
        title: "Account created successfully!",
        description: "Welcome to the Skill Swap Platform. Let's get started!",
      })
      router.push("/profile")
    } else {
      toast({
        title: "Registration failed",
        description: "An account with this email already exists.",
        variant: "destructive",
      })
    }
  }

  const passwordStrength = password.length >= 6 ? "strong" : password.length >= 3 ? "medium" : "weak"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>

        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join Skill Swap
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Create your account and start learning today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Create a password"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white/50 pr-12"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {password && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div
                      className={`h-2 w-full rounded-full ${
                        passwordStrength === "strong"
                          ? "bg-green-500"
                          : passwordStrength === "medium"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <span
                      className={`text-xs ${
                        passwordStrength === "strong"
                          ? "text-green-600"
                          : passwordStrength === "medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {passwordStrength === "strong" ? "Strong" : passwordStrength === "medium" ? "Medium" : "Weak"}
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">What you'll get:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Access to 500+ skilled professionals</li>
                      <li>• Personalized skill matching</li>
                      <li>• Secure messaging and scheduling</li>
                      <li>• Community ratings and reviews</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
