import { describe, it, expect } from 'vitest'
import { isBossUnlocked, isZoneUnlocked, getAvailableZones } from './zones'
import { createInitialPlayer } from './player'
import type { ZoneDefinition } from './zones'

const z0: ZoneDefinition = {
  id: 'z0', title: 'El Despertar', concept: 'print',
  requires: [], minSideQuestsForBoss: 2,
}
const z1: ZoneDefinition = {
  id: 'z1', title: 'Variables', concept: 'variables',
  requires: ['z0'], minSideQuestsForBoss: 3,
}

describe('isZoneUnlocked', () => {
  it('z0 está desbloqueada para el jugador inicial', () => {
    expect(isZoneUnlocked(z0, createInitialPlayer())).toBe(true)
  })

  it('z1 está bloqueada para el jugador inicial', () => {
    expect(isZoneUnlocked(z1, createInitialPlayer())).toBe(false)
  })
})

describe('isBossUnlocked', () => {
  it('el jefe no está disponible sin side quests completas', () => {
    const p = createInitialPlayer()
    expect(isBossUnlocked(z0, p)).toBe(false)
  })

  it('el jefe se habilita al completar las side quests mínimas', () => {
    const p = {
      ...createInitialPlayer(),
      completedQuests: ['z0-sq-01', 'z0-sq-02'],
    }
    expect(isBossUnlocked(z0, p)).toBe(true)
  })

  it('el jefe no se habilita con solo 1 side quest (mínimo es 2)', () => {
    const p = { ...createInitialPlayer(), completedQuests: ['z0-sq-01'] }
    expect(isBossUnlocked(z0, p)).toBe(false)
  })

  it('el jefe de z1 no se habilita si z1 no está desbloqueada', () => {
    const p = { ...createInitialPlayer(), completedQuests: ['z1-sq-01', 'z1-sq-02', 'z1-sq-03'] }
    expect(isBossUnlocked(z1, p)).toBe(false)
  })
})

describe('getAvailableZones', () => {
  it('devuelve solo z0 para el jugador inicial', () => {
    const available = getAvailableZones([z0, z1], createInitialPlayer())
    expect(available).toHaveLength(1)
    expect(available[0].id).toBe('z0')
  })

  it('devuelve z0 y z1 cuando z1 está desbloqueada', () => {
    const p = { ...createInitialPlayer(), unlockedZones: ['z0', 'z1'] }
    const available = getAvailableZones([z0, z1], p)
    expect(available).toHaveLength(2)
  })
})
