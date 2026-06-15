import type { PlayerState } from '../game/types'

const STORAGE_KEY = 'pyquest:v1:progress'

export function saveProgress(state: PlayerState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage puede fallar en modo privado o con storage lleno
  }
}

export function loadProgress(): PlayerState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PlayerState
  } catch {
    return null
  }
}

export function clearProgress(): void {
  localStorage.removeItem(STORAGE_KEY)
}
