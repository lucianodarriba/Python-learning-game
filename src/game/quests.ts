import type { PlayerState } from './types'

export interface HiddenQuestDefinition {
  id: string
  revealWhen: string  // ej: "completed:z1-sq-02"
}

export function shouldRevealHiddenQuest(quest: HiddenQuestDefinition, state: PlayerState): boolean {
  const { revealWhen } = quest

  if (revealWhen.startsWith('completed:')) {
    const requiredQuestId = revealWhen.slice('completed:'.length)
    return state.completedQuests.includes(requiredQuestId)
  }

  return false
}

export function revealHiddenQuests(
  hiddenQuests: HiddenQuestDefinition[],
  state: PlayerState
): string[] {
  return hiddenQuests
    .filter((q) => shouldRevealHiddenQuest(q, state))
    .map((q) => q.id)
}
