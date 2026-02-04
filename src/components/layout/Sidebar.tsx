'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menu = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Players', path: '/players' },
    { name: 'Unavailability', path: '/unavailability' },
    { name: 'Generate', path: '/generate' },
    { name: 'Schedule', path: '/schedule' },
]

export default function AppleBottomBar() {
    const pathname = usePathname()

    return (
        <aside
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl rounded-2xl overflow-hidden z-50">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)]" />

            {/* === Soft light reflection layer === */}
            <div className="absolute inset-0 bg-linear-to-r from-white/40 via-white/10 to-transparent pointer-events-none" />

            {/* === Content === */}
            <nav className="relative z-10 flex justify-between items-center px-5 py-3">
                {menu.map((item) => {
                    const active = pathname === item.path
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={` relative px-4 py-2 rounded-xl text-sm font-medium transition-all${active ? 'text-black' : 'text-black/70 hover:text-black'}`}>
                            {/* Active pill (Apple style highlight) */}
                            {active && (
                                <span
                                    className="absolute inset-0 rounded-xl bg-white/60 backdrop-blur-md shadow-sm -z-10" />
                            )}
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
