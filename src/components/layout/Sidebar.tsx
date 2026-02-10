'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const menu = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Players', path: '/players' },
    { name: 'Unavailability', path: '/unavailability' },
    { name: 'Generate', path: '/generate' },
    { name: 'Schedule', path: '/schedule' },
]

export default function AppleBottomBar() {
    const pathname = usePathname()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const logout = () => {
        // hapus token
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        router.push('/login')
    }

    return (
        <aside className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl rounded-2xl overflow-visible z-50">

            <div
                className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl rounded-2xl px-4 py-2 flex items-center justify-between backdrop-blur-xl bg-linear-to-br from-white/20 to-white/5 border border-white/20 shadow-xl text-white
            ">

                {/* Content */}
                <nav className="relative z-10 grid grid-cols-6 items-center px-5 py-3 w-full">

                    {/* Menu */}
                    {menu.map((item) => {
                        const active = pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`relative flex justify-center px-3 py-2 rounded-xl text-sm font-medium transition-all ${active ? 'text-black' : 'text-white hover:text-black'
                                    }`}
                            >
                                {active && (
                                    <span className="absolute inset-0 rounded-xl bg-white/60 backdrop-blur-md shadow-sm -z-10" />
                                )}
                                {item.name}
                            </Link>
                        )
                    })}

                    {/* Avatar */}
                    <div className="relative flex justify-center">
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-9 h-9 rounded-full bg-[#003B44] flex items-center justify-center text-white font-semibold shadow-md hover:scale-105 transition"
                        >
                            <span className="text-sm">A</span>
                        </button>

                        {/* Dropdown */}
                        {open && (
                            <div className="absolute bottom-12 right-1/2 translate-x-1/2 rounded-xl bg-[#003B44]/95 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden">
                                <button
                                    onClick={logout}
                                    className="px-4 py-3 text-sm text-white hover:bg-white/10 transition w-full text-left"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </aside>
    )
}
