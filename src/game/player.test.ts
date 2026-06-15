import { describe, it, expect } from 'vitest'
import { createInitialPlayer, applyXP, applyQuestReward, buildQuestReward } from './player'
import type { PlayerState } from './types'

describe('createInitialPlayer', () => {
  it('empieza en nivel 1, 0 XP', () => {
    const p = createInitialPlayer()
    expect(p.level).toBe(1)
    expect(p.xp).toBe(0)
    expect(p.wisdom).toBe(0)
  })

  it('zona 0 desbloqueada por defecto', () => {
    const p = createInitialPlayer()
    expect(p.unlockedZones).toContain('z0')
  })
})

describe('applyXP', () => {
  it('acumula XP sin subir de nivel', () => {
    const p = createInitialPlayer()
    const next = applyXP(p, 50)
    expect(next.xp).toBe(50)
    expect(next.level).toBe(1)
  })

  it('sube de nivel al llegar a 100 XP desde nivel 1', () => {
    const p = createInitialPlayer()
    const next = applyXP(p, 100)
    expect(next.level).toBe(2)
    expect(next.xp).toBe(0)
  })

  it('sube de nivel y deja el XP restante', () => {
    const p = createInitialPlayer()
    const next = applyXP(p, 150)
    expect(next.level).toBe(2)
    expect(next.xp).toBe(50)
  })

  it('sube múltiples niveles de una vez', () => {
    const p = createInitialPlayer()
    // 100 (lv1→2) + 200 (lv2→3) = 300 XP para pasar dos niveles
    const next = applyXP(p, 300)
    expect(next.level).toBe(3)
    expect(next.xp).toBe(0)
  })

  it('no modifica el estado original (inmutabilidad)', () => {
    const p = createInitialPlayer()
    applyXP(p, 100)
    expect(p.level).toBe(1)
    expect(p.xp).toBe(0)
  })
})

describe('applyQuestReward', () => {
  it('agrega quest a completedQuests', () => {
    const p = createInitialPlayer()
    const reward = { xp: 15 }
    const next = applyQuestReward(p, 'z0-sq-01', reward)
    expect(next.completedQuests).toContain('z0-sq-01')
  })

  it('no da recompensa doble si la quest ya está completada', () => {
    const p: PlayerState = { ...createInitialPlayer(), completedQuests: ['z0-sq-01'], xp: 50 }
    const next = applyQuestReward(p, 'z0-sq-01', { xp: 15 })
    expect(next.xp).toBe(50) // no cambió
  })

  it('desbloquea zona al aprobar main quest', () => {
    const p = createInitialPlayer()
    const reward = { xp: 90, unlocks: 'z1' }
    const next = applyQuestReward(p, 'z0-main', reward)
    expect(next.unlockedZones).toContain('z1')
  })

  it('no duplica zonas desbloqueadas', () => {
    const p: PlayerState = { ...createInitialPlayer(), unlockedZones: ['z0', 'z1'] }
    const next = applyQuestReward(p, 'z0-main', { xp: 90, unlocks: 'z1' })
    expect(next.unlockedZones.filter(z => z === 'z1')).toHaveLength(1)
  })

  it('agrega wisdom en hidden quests', () => {
    const p = createInitialPlayer()
    const next = applyQuestReward(p, 'z0-hidden-01', { xp: 30, wisdom: 1 })
    expect(next.wisdom).toBe(1)
  })

  it('agrega entrada al grimorio', () => {
    const p = createInitialPlayer()
    const next = applyQuestReward(p, 'z0-int-01', { xp: 40, grimoire: 'print-avanzado' })
    expect(next.grimoire).toContain('print-avanzado')
  })
})

describe('buildQuestReward', () => {
  it('side quest: 15 XP, sin wisdom', () => {
    const r = buildQuestReward('side', 'z0-sq-01')
    expect(r.xp).toBe(15)
    expect(r.wisdom).toBeUndefined()
  })

  it('hidden quest: 30 XP + 1 wisdom', () => {
    const r = buildQuestReward('hidden', 'z0-hidden-01')
    expect(r.xp).toBe(30)
    expect(r.wisdom).toBe(1)
  })

  it('main quest con unlocks: incluye la zona', () => {
    const r = buildQuestReward('main', 'z0-main', { unlocks: 'z1' })
    expect(r.xp).toBe(90)
    expect(r.unlocks).toBe('z1')
  })
})
