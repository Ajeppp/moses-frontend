import { apiFetch } from "./api";
import { Player } from "../types/player";

export async function getPlayers(): Promise<Player[]> {
    return apiFetch<Player[]>("/api/players", {
        method: "GET",
    });
}

export function createPlayer(player: Omit<Player, "id">): Promise<Player> {
    return apiFetch<Player>("/api/players", {
        method: "POST",
        body: JSON.stringify(player),
    });
}