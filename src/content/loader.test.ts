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
