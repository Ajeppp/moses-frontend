import { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
    return (
        <div
            className="rounded-2xl p-5 shadow-lg backdrop-blur-xl bg-linear-to-br from-white/20 to-white/5 border border-white/20 text-white transition-all hover:bg-white/20 hover:shadow-xl
            "
        >
            {children}
        </div>
    )
}
