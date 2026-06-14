export const QUEST_XP = {
  side: 15,
  integration: 40,
  main: 90,
  hidden: 30,
} as const

export const WISDOM_PER_HIDDEN = 1

export const TIMEOUT_MS = 5000

export function xpForNextLevel(level: number): number {
  return 100 * level
}
