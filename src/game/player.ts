import { xpForNextLevel, QUEST_XP, WISDOM_PER_HIDDEN } from './config'
import type { PlayerState, QuestType, QuestReward } from './types'

export function createInitialPlayer(): PlayerState {
  return {
    level: 1,
    xp: 0,
    wisdom: 0,
    completedQuests: [],
    unlockedZones: ['z0'],
    grimoire: [],
  }
}

export function applyXP(state: PlayerState, xpGained: number): PlayerState {
  let { level, xp } = state
  xp += xpGained

  // Subir tantos niveles como corresponda
  while (xp >= xpForNextLevel(level)) {
    xp -= xpForNextLevel(level)
    level += 1
  }

  return { ...state, level, xp }
}

export function applyQuestReward(state: PlayerState, questId: string, reward: QuestReward): PlayerState {
  if (state.completedQuests.includes(questId)) {
    return state // Quest ya completada, no dar recompensa doble
  }

  let next = applyXP(state, reward.xp)

  next = {
    ...next,
    completedQuests: [...next.completedQuests, questId],
    wisdom: next.wisdom + (reward.wisdom ?? 0),
  }

  if (reward.unlocks && !next.unlockedZones.includes(reward.unlocks)) {
    next = { ...next, unlockedZones: [...next.unlockedZones, reward.unlocks] }
  }

  if (reward.grimoire && !next.grimoire.includes(reward.grimoire)) {
    next = { ...next, grimoire: [...next.grimoire, reward.grimoire] }
  }

  return next
}

export function buildQuestReward(
  questType: QuestType,
  _questId: string,
  options?: { unlocks?: string; grimoire?: string }
): QuestReward {
  const xp = QUEST_XP[questType]
  const wisdom = questType === 'hidden' ? WISDOM_PER_HIDDEN : undefined
  return { xp, wisdom, ...options }
}
