import type { PlayerState } from './types'

export interface ZoneDefinition {
  id: string
  title: string
  concept: string
  requires: string[]
  minSideQuestsForBoss: number
}

export function isZoneUnlocked(zone: ZoneDefinition, state: PlayerState): boolean {
  return state.unlockedZones.includes(zone.id)
}

export function isBossUnlocked(zone: ZoneDefinition, state: PlayerState): boolean {
  if (!isZoneUnlocked(zone, state)) return false

  // Contar side quests completadas en esta zona
  const sideQuestsCompleted = state.completedQuests.filter(
    (id) => id.startsWith(`${zone.id}-sq-`) || id.startsWith(`${zone.id}-side-`)
  ).length

  return sideQuestsCompleted >= zone.minSideQuestsForBoss
}

export function getAvailableZones(zones: ZoneDefinition[], state: PlayerState): ZoneDefinition[] {
  return zones.filter((z) => isZoneUnlocked(z, state))
}
