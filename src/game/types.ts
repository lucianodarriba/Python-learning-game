export interface PlayerState {
  level: number
  xp: number
  wisdom: number
  completedQuests: string[]
  unlockedZones: string[]
  grimoire: string[]
}

export type QuestType = 'side' | 'integration' | 'main' | 'hidden'

export interface QuestReward {
  xp: number
  wisdom?: number
  unlocks?: string      // id de zona a desbloquear
  grimoire?: string     // entrada al grimorio a agregar
}
