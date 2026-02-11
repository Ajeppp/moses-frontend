'use client'

import { useEffect, useMemo, useState } from 'react'
import { api } from '@/lib/api'
import { getToken } from '@/lib/auth'
import AddPlayerModal from '@/components/ui/addPlayerModal'


type Player = {
    id: number
    name: string
    roles: {
        main: string
        additional: string[]
    }
}

const ROLE_OPTIONS = ['WL', 'SINGER', 'BASS', 'KEYS', 'DRUM', 'GUITAR']

export default function PlayersPage() {
    const [players, setPlayers] = useState<Player[]>([])
    const [loading, setLoading] = useState(true)
    const [openAdd, setOpenAdd] = useState(false)

    // filters
    const [search, setSearch] = useState('')
    const [mainRole, setMainRole] = useState('')
    const [additionalRole, setAdditionalRole] = useState('')


    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const token = getToken()
                const res = await api.get('/api/players', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setPlayers(res.data)
            } catch (err) {
                console.error('Failed to fetch players', err)
            } finally {
                setLoading(false)
            }
        }

        fetchPlayers()
    }, [])

    // 🔥 filtered data
    const filteredPlayers = useMemo(() => {
        return players.filter((p) => {
            const matchName = p.name.toLowerCase().includes(search.toLowerCase())
            const matchMain =
                !mainRole || p.roles.main === mainRole
            const matchAdditional =
                !additionalRole || p.roles.additional.includes(additionalRole)

            return matchName && matchMain && matchAdditional
        })
    }, [players, search, mainRole, additionalRole])

    if (loading) {
        return <div className="p-8 text-slate-400">Loading players...</div>
    }

    return (
        <div className="p-8 max-w-7xl mx-auto pb-34">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Players</h1>
                    <p className="text-slate-400 text-sm">Ministry team management</p>
                </div>

                <button onClick={() => setOpenAdd(true)} className="px-4 py-2 rounded-xl bg-linear-to-br from-white/20 to-white/5 border border-white/20 hover:bg-white/30 text-white text-sm font-semibold">
                    + Add Player
                </button>
            </div>

            {/* Filters */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Search */}
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name..."
                    className="px-4 py-2 rounded-xl bg-linear-to-br from-white/20 to-white/5 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Main Role Filter */}
                <select
                    value={mainRole}
                    onChange={(e) => setMainRole(e.target.value)}
                    className="px-4 py-2 rounded-xl  bg-linear-to-br from-white/20 to-white/5 border border-white/20 text-white focus:outline-none"
                >
                    <option value="">All Main Roles</option>
                    {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>

                {/* Additional Role Filter */}
                <select
                    value={additionalRole}
                    onChange={(e) => setAdditionalRole(e.target.value)}
                    className="px-4 py-2 rounded-xl  bg-linear-to-br from-white/20 to-white/5 border border-white/20 text-white focus:outline-none "
                >
                    <option value="">All Additional Roles</option>
                    {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>

                {/* Reset */}
                <button
                    onClick={() => {
                        setSearch('')
                        setMainRole('')
                        setAdditionalRole('')
                    }}
                    className="px-4 py-2 rounded-xl  bg-linear-to-br from-white/20 to-white/5 border border-white/20 text-slate-300 text-sm hover:bg-white/5"
                >
                    Reset
                </button>
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPlayers.map((p) => (
                    <div
                        key={p.id}
                        className="group flex items-center justify-between p-4 rounded-2xl backdrop-blur-xl bg-linear-to-br from-white/20 to-white/5 border border-white/20 hover:border-slate-600 hover:bg-white/10 hover:shadow-xl transition-all"
                    >
                        {/* Left */}
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                {p.name.charAt(0).toUpperCase()}
                            </div>

                            {/* Info */}
                            <div>
                                <p className="text-white font-semibold">{p.name}</p>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    {/* Main role */}
                                    <span className="px-2 py-0.5 rounded-lg text-xs bg-blue-600 text-white border border-indigo-500/30">
                                        {p.roles.main}
                                    </span>

                                    {/* Additional roles */}
                                    {p.roles.additional.map((r, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-0.5 rounded-lg text-xs bg-slate-700/40 text-slate-300 border border-slate-600/40"
                                        >
                                            {r}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs">
                                Edit
                            </button>
                            <button className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs">
                                Delete
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400">
                                ⋮
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filteredPlayers.length === 0 && (
                <div className="mt-10 text-center text-slate-500">
                    No players found 😔
                </div>
            )}

            <AddPlayerModal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onSuccess={() => {
                    // refetch players
                    window.location.reload()
                }}
            />
        </div>
    )
}
