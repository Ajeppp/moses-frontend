'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-linear-to-tr from-[#003B44] from-20% to-transparent text-white">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}
