'use client'

import { useEffect, useState } from "react"
import { getPlayers } from "@/services/playerService"
import { Player } from "@/types/player"
import { Card } from "@/components/ui/Card"
import AuthGuard from "@/components/layout/AuthGuard"
import { Users, Calendar, Layers, Activity } from "lucide-react"

export default function DashboardPage() {
    const [players, setPlayers] = useState<Player[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const data = await getPlayers()
                setPlayers(data)
            } catch (error) {
                console.error("Failed to fetch players:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPlayers()
    }, [])

    if (loading) {
        return <div className="p-8 text-slate-400">Loading players...</div>
    }

    return (
        <AuthGuard>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Moses Dashboard</h1>
                        <p className="text-slate-400 text-sm">{date}</p>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                        System Active
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                    <Card>
                        <div>
                            <p className="text-sm text-white">Total Players</p>
                            <p className="text-3xl font-bold">{players.length}</p>
                        </div>
                        <Users className="w-8 h-8 text-slate-500" />
                    </Card>

                    <Card>
                        <div>
                            <p className="text-sm text-slate-400">Services</p>
                            <p className="text-3xl font-bold">Auto</p>
                        </div>
                        <Calendar className="w-8 h-8 text-slate-500" />
                    </Card>

                    <Card>
                        <div>
                            <p className="text-sm text-slate-400">Roles</p>
                            <p className="text-3xl font-bold">6</p>
                        </div>
                        <Layers className="w-8 h-8 text-slate-500" />
                    </Card>

                    <Card>
                        <div>
                            <p className="text-sm text-slate-400">Status</p>
                            <p className="text-3xl font-bold text-green-400">Active</p>
                        </div>
                        <Activity className="w-8 h-8 text-green-500" />
                    </Card>
                </div>

                {/* Section Placeholder */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <Card>
                        <h3 className="font-semibold mb-2">System Overview</h3>
                        <p className="text-sm text-slate-400">
                            Player management, role distribution, scheduling engine, and service automation
                            are running normally.
                        </p>
                    </Card>

                    <Card>
                        <h3 className="font-semibold mb-2">Quick Actions</h3>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 rounded-lg bg-linear-to-br from-white/20 to-white/5 border border-white/20 hover:bg-white/30 text-sm transition">Add Player</button>
                            <button className="px-4 py-2 rounded-lg bg-linear-to-br from-white/20 to-white/5 border border-white/20 hover:bg-white/30 text-sm transition">Generate Schedule</button>
                            <button className="px-4 py-2 rounded-lg bg-linear-to-br from-white/20 to-white/5 border border-white/20 hover:bg-white/30 text-sm transition">Manage Roles</button>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthGuard>
    )
}
