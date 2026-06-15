import { describe, it, expect } from 'vitest'
import { getModuleData, getZoneContent, getAllZones } from './loader'

describe('getModuleData', () => {
  it('devuelve módulo 1', () => {
    const data = getModuleData()
    expect(data.module).toBe(1)
    expect(data.title).toBe('Fundamentos')
  })

  it('tiene 8 zonas', () => {
    const data = getModuleData()
    expect(data.zones).toHaveLength(8)
  })

  it('la primera zona es z0', () => {
    const data = getModuleData()
    expect(data.zones[0].id).toBe('z0')
  })
})

describe('getZoneContent', () => {
  it('devuelve null para zona inexistente', () => {
    expect(getZoneContent('z99')).toBeNull()
  })

  it('devuelve contenido de z0', () => {
    const content = getZoneContent('z0')
    expect(content).not.toBeNull()
    expect(content!.zone.id).toBe('z0')
    expect(content!.challenges.length).toBeGreaterThan(0)
    expect(content!.theory).toContain('print')
  })

  it('z0 tiene al menos 4 challenges (2 side + 1 main + 1 hidden)', () => {
    const content = getZoneContent('z0')!
    expect(content.challenges.length).toBeGreaterThanOrEqual(4)
  })

  it('z0 tiene una main quest', () => {
    const content = getZoneContent('z0')!
    const main = content.challenges.find(c => c.type === 'main')
    expect(main).toBeDefined()
    expect(main!.unlocks).toBe('z1')
  })

  it('devuelve contenido de z1', () => {
    const content = getZoneContent('z1')
    expect(content).not.toBeNull()
    expect(content!.zone.id).toBe('z1')
    expect(content!.theory).toContain('variable')
  })

  it('z1 tiene una main quest que desbloquea z2', () => {
    const content = getZoneContent('z1')!
    const main = content.challenges.find(c => c.type === 'main')
    expect(main).toBeDefined()
    expect(main!.unlocks).toBe('z2')
  })
})

describe('getAllZones', () => {
  it('devuelve las 8 zonas en orden', () => {
    const zones = getAllZones()
    expect(zones.map(z => z.id)).toEqual(['z0','z1','z2','z3','z4','z5','z6','z7'])
  })
})

describe('contenido completo del Módulo 1', () => {
  const zoneIds = ['z0', 'z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7']

  it('todas las zonas tienen contenido cargable', () => {
    for (const id of zoneIds) {
      const content = getZoneContent(id)
      expect(content, `zona ${id} debería tener contenido`).not.toBeNull()
      expect(content!.theory.length, `teoría de ${id} no debería estar vacía`).toBeGreaterThan(0)
      expect(content!.challenges.length, `${id} debería tener challenges`).toBeGreaterThan(0)
    }
  })

  it('cada zona tiene side quests, una main quest y una hidden quest', () => {
    for (const id of zoneIds) {
      const { challenges } = getZoneContent(id)!
      const sides = challenges.filter(c => c.type === 'side')
      const main = challenges.filter(c => c.type === 'main')
      const hidden = challenges.filter(c => c.type === 'hidden')
      expect(sides.length, `${id} debería tener al menos 2 side quests`).toBeGreaterThanOrEqual(2)
      expect(main.length, `${id} debería tener exactamente 1 main quest`).toBe(1)
      expect(hidden.length, `${id} debería tener al menos 1 hidden quest`).toBeGreaterThanOrEqual(1)
    }
  })

  it('cada main quest desbloquea la zona siguiente', () => {
    const expectedUnlock: Record<string, string> = {
      z0: 'z1', z1: 'z2', z2: 'z3', z3: 'z4', z4: 'z5', z5: 'z6', z6: 'z7', z7: 'z8',
    }
    for (const id of zoneIds) {
      const main = getZoneContent(id)!.challenges.find(c => c.type === 'main')!
      expect(main.unlocks, `main de ${id} debería desbloquear ${expectedUnlock[id]}`).toBe(expectedUnlock[id])
    }
  })

  it('cada hidden quest define una condición de revelación válida', () => {
    for (const id of zoneIds) {
      const hidden = getZoneContent(id)!.challenges.filter(c => c.type === 'hidden')
      for (const h of hidden) {
        expect(h.revealWhen, `hidden ${h.id} debería tener revealWhen`).toMatch(/^completed:/)
      }
    }
  })

  it('todos los ids de challenge son únicos en todo el módulo', () => {
    const allIds = zoneIds.flatMap(id => getZoneContent(id)!.challenges.map(c => c.id))
    const uniqueIds = new Set(allIds)
    expect(uniqueIds.size).toBe(allIds.length)
  })

  it('los challenges en modo function tienen casos de test', () => {
    for (const id of zoneIds) {
      const fnChallenges = getZoneContent(id)!.challenges.filter(c => c.mode === 'function')
      for (const c of fnChallenges) {
        expect(c.tests, `${c.id} (function) debería tener tests`).toBeDefined()
        expect(c.tests!.length, `${c.id} debería tener al menos 1 caso`).toBeGreaterThan(0)
      }
    }
  })
})
