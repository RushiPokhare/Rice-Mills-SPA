"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  pincode: string
  registeredDate: string
}

interface UserStore {
  user: UserProfile | null
  isLoggedIn: boolean
  login: (user: UserProfile) => void
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
}

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (user: UserProfile) => {
        set({ user, isLoggedIn: true })
      },

      logout: () => {
        set({ user: null, isLoggedIn: false })
      },

      updateProfile: (updates: Partial<UserProfile>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }))
      },
    }),
    {
      name: "user-storage",
    },
  ),
)
