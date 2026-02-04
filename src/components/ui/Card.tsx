import { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-xl border p-4 shadow-sm bg-white text-[#0F2E2E]">
            {children}
        </div>
    )
}
