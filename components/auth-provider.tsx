"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/lib/data"
import { findUser, createUser } from "@/lib/data"
import { storage, STORAGE_KEYS } from "@/lib/storage"

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user from storage on mount
  useEffect(() => {
    const storedUser = storage.get(STORAGE_KEYS.USER)
    if (storedUser) {
      setUser(storedUser)
    }
    setLoading(false)
  }, [])

  // Save user to storage whenever user changes
  useEffect(() => {
    if (user) {
      storage.set(STORAGE_KEYS.USER, user)
    } else {
      storage.remove(STORAGE_KEYS.USER)
    }
  }, [user])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = findUser(email)
    if (foundUser) {
      setUser(foundUser)
      setLoading(false)
      return true
    }

    setLoading(false)
    return false
  }

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = findUser(email)
    if (existingUser) {
      setLoading(false)
      return false
    }

    const newUser = createUser(email, name)
    setUser(newUser)
    setLoading(false)
    return true
  }

  const signOut = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}
