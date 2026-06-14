import type { ZoneDefinition } from '../game/zones'

// Tipos para el contenido de challenges
export type QuestType = 'side' | 'integration' | 'main' | 'hidden'
export type ExerciseMode = 'output' | 'function' | 'freeform'

export interface FunctionTestCase {
  name: string
  call: string
  expected: unknown
}

export interface Challenge {
  id: string
  type: QuestType
  mode: ExerciseMode
  title: string
  npc: string
  prompt: string
  starterCode: string
  hints: string[]
  xp: number
  // modo output
  expectedOutput?: string
  // modo function
  tests?: FunctionTestCase[]
  // modo freeform
  checkCode?: string
  // extras
  revealWhen?: string
  unlocks?: string
  grimoire?: string
  wisdom?: number
}

export interface ModuleData {
  module: number
  title: string
  zones: ZoneDefinition[]
}

export interface ZoneContent {
  zone: ZoneDefinition
  theory: string        // contenido del theory.md (raw markdown)
  challenges: Challenge[]
}

// Importaciones estáticas de Vite — los JSON se incluyen en el bundle
import zonesData from './module-01/zones.json'
import z0Challenges from './module-01/zone-00/challenges.json'
import z1Challenges from './module-01/zone-01/challenges.json'
import z0Theory from './module-01/zone-00/theory.md?raw'
import z1Theory from './module-01/zone-01/theory.md?raw'

// ZoneDefinition tiene un campo "description" adicional en el JSON
// que no está en el tipo base — lo extendemos localmente
interface ZoneDefinitionWithDescription extends ZoneDefinition {
  description: string
}

const moduleData = zonesData as { module: number; title: string; zones: ZoneDefinitionWithDescription[] }

export function getModuleData(): ModuleData {
  return {
    module: moduleData.module,
    title: moduleData.title,
    zones: moduleData.zones,
  }
}

const ZONE_CONTENT: Record<string, { theory: string; challenges: unknown[] }> = {
  z0: { theory: z0Theory, challenges: z0Challenges },
  z1: { theory: z1Theory, challenges: z1Challenges },
}

export function getZoneContent(zoneId: string): ZoneContent | null {
  const zone = moduleData.zones.find((z) => z.id === zoneId)
  if (!zone) return null

  const content = ZONE_CONTENT[zoneId]
  if (!content) return null

  return {
    zone,
    theory: content.theory,
    challenges: content.challenges as Challenge[],
  }
}

export function getAllZones(): ZoneDefinitionWithDescription[] {
  return moduleData.zones
}
