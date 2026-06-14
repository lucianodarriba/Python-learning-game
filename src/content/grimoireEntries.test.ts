import { describe, it, expect } from 'vitest'
import { GRIMOIRE_ENTRIES, getGrimoireEntry } from './grimoireEntries'

describe('GRIMOIRE_ENTRIES', () => {
  it('tiene al menos 3 entradas', () => {
    expect(GRIMOIRE_ENTRIES.length).toBeGreaterThanOrEqual(3)
  })

  it('cada entrada tiene los campos requeridos', () => {
    for (const entry of GRIMOIRE_ENTRIES) {
      expect(entry.id).toBeTruthy()
      expect(entry.title).toBeTruthy()
      expect(entry.syntax).toBeTruthy()
      expect(typeof entry.isWisdom).toBe('boolean')
    }
  })
})

describe('getGrimoireEntry', () => {
  it('devuelve la entrada correcta por id', () => {
    const entry = getGrimoireEntry('variables-y-fstrings')
    expect(entry).toBeDefined()
    expect(entry!.title).toBe('Variables y f-strings')
  })

  it('devuelve undefined para id inexistente', () => {
    expect(getGrimoireEntry('no-existe')).toBeUndefined()
  })

  it('las entradas de wisdom tienen isWisdom = true', () => {
    const wisdom = GRIMOIRE_ENTRIES.filter((e) => e.isWisdom)
    expect(wisdom.length).toBeGreaterThan(0)
    for (const e of wisdom) {
      expect(e.isWisdom).toBe(true)
    }
  })
})
