'use client'

import { useEffect, useState } from "react"
import { getPlayers } from "@/services/playerService"
import { Player } from "@/types/player"
import { Card } from "@/components/ui/Card"

export default function DashboardPage() {
    const [players, setPlayers] = useState<Player[]>([])
    const [loading, setLoading] = useState<boolean>(true)


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
        return <div>Loading players...</div>
    }
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Moses Dashboard</h1>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <h3>Total Players</h3>
                        <p className="text-2xl font-bold">{players.length}</p>
                    </Card>
                    <div className="card">
                        <h3>Services</h3>
                        <p className="text-2xl font-bold">Auto</p>
                    </div>

                    <div className="card">
                        <h3>Roles</h3>
                        <p className="text-2xl font-bold">6</p>
                    </div>

                    <div className="card">
                        <h3>Status</h3>
                        <p className="text-2xl font-bold text-green-500">Active</p>
                    </div>
                </div>
            )}
        </div>
    )
}