'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#0F2E2E] text-white">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}
