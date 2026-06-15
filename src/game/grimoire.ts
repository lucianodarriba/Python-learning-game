import type { PlayerState } from './types'

export interface GrimoireEntry {
  id: string
  title: string
  content: string  // Markdown
  isWisdom: boolean  // true para entradas de hidden quests
}

export function addGrimoireEntry(state: PlayerState, entryId: string): PlayerState {
  if (state.grimoire.includes(entryId)) return state
  return { ...state, grimoire: [...state.grimoire, entryId] }
}

export function hasGrimoireEntry(state: PlayerState, entryId: string): boolean {
  return state.grimoire.includes(entryId)
}
