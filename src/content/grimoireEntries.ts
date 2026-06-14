export interface GrimoireEntry {
  id: string
  title: string
  concept: string
  syntax: string      // código de ejemplo (texto plano)
  description: string
  isWisdom: boolean   // true para tips de hidden quests
}

export const GRIMOIRE_ENTRIES: GrimoireEntry[] = [
  {
    id: 'variables-y-fstrings',
    title: 'Variables y f-strings',
    concept: 'Variables',
    syntax: 'nombre = "Ada"\nnivel = 5\nprint(f"Soy {nombre}, nivel {nivel}")',
    description: 'Las variables guardan valores. Los f-strings permiten incluir variables dentro de un texto usando llaves {}.',
    isWisdom: false,
  },
  {
    id: 'print-avanzado',
    title: 'print() con sep y end',
    concept: 'print()',
    syntax: 'print("A", "B", "C", sep="-")   # A-B-C\nprint("Hola", end=" ")            # sin salto de línea',
    description: 'print() acepta múltiples argumentos. sep define el separador (default: espacio). end define qué poner al final (default: salto de línea).',
    isWisdom: true,
  },
  {
    id: 'swap-pythonico',
    title: 'Intercambio elegante',
    concept: 'Asignación múltiple',
    syntax: 'a, b = 1, 2\na, b = b, a   # intercambia en una línea',
    description: 'Python permite asignación múltiple. Para intercambiar dos variables no necesitás una variable temporal.',
    isWisdom: true,
  },
]

export function getGrimoireEntry(id: string): GrimoireEntry | undefined {
  return GRIMOIRE_ENTRIES.find((e) => e.id === id)
}
