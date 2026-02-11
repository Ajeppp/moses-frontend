'use client'

import { useEffect, useMemo, useState } from "react"
import AuthGuard from "@/components/layout/AuthGuard"
import UnavailabilityCard from "@/components/ui/unavailabilityCard"
import { api } from "@/lib/api"
import { getToken } from "@/lib/auth"

type Unavailability = {
    ID: number
    PlayerID: number
    ServiceDate: string
    Month: number
    Year: number
    Reason: string
    Player: {
        ID: number
        Name: string
        MainRole?: {
            Code: string
        }
    }
}

export default function UnavailabilityPage() {
    const [month] = useState(new Date().getMonth() + 1)
    const [year] = useState(new Date().getFullYear())
    const [data, setData] = useState<Unavailability[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getToken()
                const res = await api.get('/api/unavailable', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        month,
                        year
                    }
                })
                setData(res.data.data)
            } catch (err) {
                console.error("Failed fetch unavailability:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // 🔍 filter by player name
    const filtered = useMemo(() => {
        return data.filter(d =>
            d.Player?.Name?.toLowerCase().includes(search.toLowerCase())
        )
    }, [data, search])

    // 📅 group by date
    const grouped = useMemo(() => {
        const map: Record<string, Unavailability[]> = {}

        filtered.forEach(item => {
            const date = new Date(item.ServiceDate).toDateString()
            if (!map[date]) map[date] = []
            map[date].push(item)
        })

        return map
    }, [filtered])

    return (
        <AuthGuard>
            <div className="p-6 space-y-6 text-white">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Unavailability</h1>
                        <p className="text-white/60 text-sm">
                            Manage player availability for service scheduling
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="
                            px-4 py-2 rounded-xl 
                            bg-linear-to-br from-white/20 to-white/5
                            border border-white/20 backdrop-blur-xl text-sm
                        ">
                            {month}/{year}
                        </div>

                        <button className="
                            px-4 py-2 rounded-xl 
                            bg-linear-to-br from-emerald-400/80 to-emerald-500/80
                            text-black font-semibold
                        ">
                            + Add
                        </button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="
                    flex gap-4 items-center p-4 rounded-2xl
                    bg-linear-to-br from-white/20 to-white/5
                    border border-white/20 backdrop-blur-xl
                ">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search player..."
                        className="flex-1 bg-transparent outline-none text-white placeholder-white/50"
                    />

                    <input
                        type="date"
                        className="bg-transparent outline-none text-white"
                    />
                </div>

                {/* Content */}
                <div className="space-y-8">
                    {loading && (
                        <div className="text-white/60">Loading unavailability...</div>
                    )}

                    {!loading && Object.keys(grouped).length === 0 && (
                        <div className="text-white/50">No unavailability data</div>
                    )}

                    {!loading && Object.entries(grouped).map(([date, items]) => (
                        <div key={date}>
                            <div className="text-sm text-white/60 mb-3">
                                {date}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {items.map(item => (
                                    <UnavailabilityCard
                                        key={item.ID}
                                        item={item}
                                        onRemove={(id) => {
                                            console.log("remove id:", id)
                                            // nanti:
                                            // fetch(`http://localhost:8080/api/unavailable/${id}`, { method: "DELETE" })
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </AuthGuard>
    )
}
