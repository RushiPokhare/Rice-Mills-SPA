"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface AdminProfile {
  id: string
  name: string
  email: string
  role: "admin" | "super_admin"
  lastLogin: string
}

interface AdminStore {
  admin: AdminProfile | null
  isLoggedIn: boolean
  login: (admin: AdminProfile) => void
  logout: () => void
}

export const useAdmin = create<AdminStore>()(
  persist(
    (set) => ({
      admin: null,
      isLoggedIn: false,

      login: (admin: AdminProfile) => {
        set({ admin, isLoggedIn: true })
      },

      logout: () => {
        set({ admin: null, isLoggedIn: false })
      },
    }),
    {
      name: "admin-storage",
    },
  ),
)
