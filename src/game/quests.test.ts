import { describe, it, expect } from 'vitest'
import { shouldRevealHiddenQuest, revealHiddenQuests } from './quests'
import { createInitialPlayer } from './player'

describe('shouldRevealHiddenQuest', () => {
  it('no revela si la quest requerida no está completada', () => {
    const p = createInitialPlayer()
    expect(shouldRevealHiddenQuest({ id: 'z0-hidden-01', revealWhen: 'completed:z0-sq-01' }, p)).toBe(false)
  })

  it('revela cuando la quest requerida está completada', () => {
    const p = { ...createInitialPlayer(), completedQuests: ['z0-sq-01'] }
    expect(shouldRevealHiddenQuest({ id: 'z0-hidden-01', revealWhen: 'completed:z0-sq-01' }, p)).toBe(true)
  })
})

describe('revealHiddenQuests', () => {
  const hidden = [
    { id: 'z0-hidden-01', revealWhen: 'completed:z0-sq-01' },
    { id: 'z0-hidden-02', revealWhen: 'completed:z0-sq-02' },
  ]

  it('devuelve array vacío si no hay condiciones cumplidas', () => {
    expect(revealHiddenQuests(hidden, createInitialPlayer())).toEqual([])
  })

  it('devuelve solo las hidden quests cuya condición se cumplió', () => {
    const p = { ...createInitialPlayer(), completedQuests: ['z0-sq-01'] }
    const revealed = revealHiddenQuests(hidden, p)
    expect(revealed).toEqual(['z0-hidden-01'])
  })

  it('devuelve todas las hidden quests cuando todas las condiciones se cumplen', () => {
    const p = { ...createInitialPlayer(), completedQuests: ['z0-sq-01', 'z0-sq-02'] }
    const revealed = revealHiddenQuests(hidden, p)
    expect(revealed).toHaveLength(2)
  })
})
