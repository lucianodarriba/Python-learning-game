import { describe, it, expect } from 'vitest'
import { xpForNextLevel, QUEST_XP } from './config'

describe('xpForNextLevel', () => {
  it('nivel 1 requiere 100 XP', () => {
    expect(xpForNextLevel(1)).toBe(100)
  })
  it('nivel 2 requiere 200 XP', () => {
    expect(xpForNextLevel(2)).toBe(200)
  })
  it('nivel 5 requiere 500 XP', () => {
    expect(xpForNextLevel(5)).toBe(500)
  })
})

describe('QUEST_XP', () => {
  it('side quest da 15 XP', () => {
    expect(QUEST_XP.side).toBe(15)
  })
  it('main quest da 90 XP', () => {
    expect(QUEST_XP.main).toBe(90)
  })
})
