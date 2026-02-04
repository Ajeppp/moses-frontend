import { apiFetch } from "./api";
import { Player } from "../types/player";

import { API_URL } from '@/lib/api'

export async function getPlayers() {
    const res = await fetch(`${API_URL}/players`, {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch players')
    }

    return res.json()
}

export function createPlayer(player: Omit<Player, "id">): Promise<Player> {
    return apiFetch<Player>("players", {
        method: "POST",
        body: JSON.stringify(player),
    });
}