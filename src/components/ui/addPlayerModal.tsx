'use client'

import { useState } from 'react'
import { api } from '@/lib/api'
import { getToken } from '@/lib/auth'

const ROLE_OPTIONS = ['WL', 'SINGER', 'BASS', 'KEYS', 'DRUM', 'GUITAR']

type Props = {
    open: boolean
    onClose: () => void
    onSuccess: () => void
}

export default function AddPlayerModal({ open, onClose, onSuccess }: Props) {
    const [name, setName] = useState('')
    const [mainRole, setMainRole] = useState('')
    const [additionalRoles, setAdditionalRoles] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    if (!open) return null

    const toggleAdditionalRole = (role: string) => {
        if (additionalRoles.includes(role)) {
            setAdditionalRoles(additionalRoles.filter(r => r !== role))
        } else {
            if (additionalRoles.length >= 2) return
            setAdditionalRoles([...additionalRoles, role])
        }
    }

    const handleSubmit = async () => {
        setError('')

        if (!name || !mainRole) {
            setError('Name and Main Role are required')
            return
        }

        setLoading(true)
        try {
            const token = getToken()
            await api.post('/api/players', {
                name,
                main_role: mainRole,
                additional_roles: additionalRoles
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            // reset
            setName('')
            setMainRole('')
            setAdditionalRoles([])

            onSuccess()
            onClose()
        } catch (err: any) {
            setError('Failed to create player')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6">

                <h2 className="text-xl font-bold text-white mb-1">Add Player</h2>
                <p className="text-slate-400 text-sm mb-5">Create new ministry member</p>

                {/* Name */}
                <div className="mb-3">
                    <label className="text-sm text-slate-400">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mt-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                        placeholder="Player name"
                    />
                </div>

                {/* Main Role */}
                <div className="mb-3">
                    <label className="text-sm text-slate-400">Main Role</label>
                    <select
                        value={mainRole}
                        onChange={(e) => setMainRole(e.target.value)}
                        className="w-full mt-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                    >
                        <option value="">Select main role</option>
                        {ROLE_OPTIONS.map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                {/* Additional Roles */}
                <div className="mb-3">
                    <label className="text-sm text-slate-400">
                        Additional Roles <span className="text-xs">(max 2)</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {ROLE_OPTIONS.map(role => {
                            const active = additionalRoles.includes(role)
                            const disabled = !active && additionalRoles.length >= 2

                            return (
                                <button
                                    key={role}
                                    onClick={() => toggleAdditionalRole(role)}
                                    disabled={disabled}
                                    className={`px-3 py-1.5 rounded-lg text-xs border transition
                    ${active
                                            ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/40'
                                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'}
                    ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
                  `}
                                >
                                    {role}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>

            </div>
        </div>
    )
}
