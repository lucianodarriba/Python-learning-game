import { create } from 'zustand'
import { createInitialPlayer, applyQuestReward, buildQuestReward } from '../game/player'
import { isBossUnlocked } from '../game/zones'
import { revealHiddenQuests } from '../game/quests'
import type { PlayerState } from '../game/types'
import type { Challenge } from '../content/loader'
import type { ZoneDefinition } from '../game/zones'

interface GameState {
  player: PlayerState
  activeZoneId: string | null
  activeChallengeId: string | null
  zones: ZoneDefinition[]
  // Actions
  setActiveZone: (zoneId: string) => void
  setActiveChallenge: (challengeId: string | null) => void
  completeQuest: (challenge: Challenge) => void
  setZones: (zones: ZoneDefinition[]) => void
  getRevealedHiddenQuests: (allHidden: { id: string; revealWhen: string }[]) => string[]
  checkBossUnlocked: (zone: ZoneDefinition) => boolean
}

export const useGameStore = create<GameState>((set, get) => ({
  player: createInitialPlayer(),
  activeZoneId: null,
  activeChallengeId: null,
  zones: [],

  setZones: (zones) => set({ zones }),

  setActiveZone: (zoneId) => set({ activeZoneId: zoneId, activeChallengeId: null }),

  setActiveChallenge: (challengeId) => set({ activeChallengeId: challengeId }),

  completeQuest: (challenge) => {
    const { player } = get()
    const reward = buildQuestReward(
      challenge.type,
      challenge.id,
      {
        unlocks: challenge.unlocks,
        grimoire: challenge.grimoire,
      }
    )
    const nextPlayer = applyQuestReward(player, challenge.id, reward)
    set({ player: nextPlayer })
  },

  getRevealedHiddenQuests: (allHidden) => {
    return revealHiddenQuests(allHidden, get().player)
  },

  checkBossUnlocked: (zone) => {
    return isBossUnlocked(zone, get().player)
  },
}))
