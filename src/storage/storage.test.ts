import { describe, it, expect, beforeEach } from 'vitest'
import { saveProgress, loadProgress, clearProgress } from './index'
import { createInitialPlayer } from '../game/player'

beforeEach(() => {
  localStorage.clear()
})

describe('saveProgress / loadProgress', () => {
  it('persiste y recupera el estado del jugador', () => {
    const player = createInitialPlayer()
    saveProgress(player)
    const loaded = loadProgress()
    expect(loaded).toEqual(player)
  })

  it('devuelve null si no hay datos guardados', () => {
    expect(loadProgress()).toBeNull()
  })

  it('persiste estado con XP y quests completadas', () => {
    const player = {
      ...createInitialPlayer(),
      level: 3,
      xp: 50,
      completedQuests: ['z0-sq-01', 'z0-main'],
      unlockedZones: ['z0', 'z1'],
    }
    saveProgress(player)
    const loaded = loadProgress()
    expect(loaded?.level).toBe(3)
    expect(loaded?.completedQuests).toContain('z0-main')
    expect(loaded?.unlockedZones).toContain('z1')
  })

  it('sobrescribe el estado anterior al guardar', () => {
    const v1 = createInitialPlayer()
    saveProgress(v1)
    const v2 = { ...v1, level: 5, xp: 75 }
    saveProgress(v2)
    const loaded = loadProgress()
    expect(loaded?.level).toBe(5)
  })
})

describe('clearProgress', () => {
  it('elimina el progreso guardado', () => {
    saveProgress(createInitialPlayer())
    clearProgress()
    expect(loadProgress()).toBeNull()
  })
})
