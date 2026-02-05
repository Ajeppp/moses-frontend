'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuth, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isAuth) {
            router.replace('/login')
        }
    }, [loading, isAuth])

    if (loading) return null
    if (!isAuth) return null

    return <>{children}</>
}
