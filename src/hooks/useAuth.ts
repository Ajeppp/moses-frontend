'use client'

import { useEffect, useState } from "react"
import { getUser, getToken } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    const storedUser = getUser()

    if (token && storedUser) {
      setUser(storedUser)
    } else {
      setUser(null)
    }

    // 🔥 ini penting buat hindari race condition
    setTimeout(() => {
      setLoading(false)
    }, 50)
  }, [])

  return {
    user,
    isAuth: !!user,
    loading
  }
}
