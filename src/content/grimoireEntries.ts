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
  {
    id: 'operadores-aritmeticos',
    title: 'Operadores aritméticos',
    concept: 'Operadores',
    syntax: '10 + 3   # 13\n10 / 3   # 3.333... (siempre float)\n10 // 3  # 3 (división entera)\n10 % 3   # 1 (resto)\n2 ** 10  # 1024 (potencia)',
    description: 'Los operadores hacen cálculos. Ojo: / siempre da float, // da división entera, % da el resto y ** eleva a una potencia.',
    isWisdom: false,
  },
  {
    id: 'strings-metodos',
    title: 'Métodos de strings',
    concept: 'Strings',
    syntax: 's = "  Hola Mundo  "\ns.strip()        # "Hola Mundo"\ns.upper()        # "  HOLA MUNDO  "\ns.lower()        # "  hola mundo  "\ns.replace("Hola", "Chau")\n"a,b,c".split(",")  # ["a", "b", "c"]',
    description: 'Los strings tienen métodos para transformarlos: strip() limpia espacios, upper()/lower() cambian mayúsculas, replace() reemplaza y split() separa en una lista.',
    isWisdom: false,
  },
  {
    id: 'if-elif-else',
    title: 'Decisiones con if / elif / else',
    concept: 'Condicionales',
    syntax: 'if nivel >= 10:\n    print("Maestro")\nelif nivel >= 5:\n    print("Aprendiz")\nelse:\n    print("Novato")',
    description: 'if evalúa una condición; elif agrega alternativas; else cubre el resto. Solo se ejecuta el primer bloque cuya condición sea verdadera.',
    isWisdom: false,
  },
  {
    id: 'bucles-for-while',
    title: 'Bucles for y while',
    concept: 'Bucles',
    syntax: 'for i in range(5):\n    print(i)        # 0 1 2 3 4\n\ntotal = 0\nwhile total < 10:\n    total += 1',
    description: 'for repite una cantidad conocida de veces (ideal con range()). while repite mientras una condición sea verdadera. Usá el patrón acumulador para ir sumando.',
    isWisdom: false,
  },
  {
    id: 'listas-metodos',
    title: 'Métodos de listas',
    concept: 'Listas',
    syntax: 'items = ["a", "b"]\nitems.append("c")   # agrega al final\nitems.pop()         # quita el último\nitems.remove("a")   # quita por valor\nitems.sort()        # ordena in-place\n"b" in items        # True/False',
    description: 'Las listas guardan colecciones ordenadas. append() agrega, pop()/remove() quitan, sort() ordena y el operador in verifica pertenencia.',
    isWisdom: false,
  },
  {
    id: 'diccionarios-get',
    title: 'Diccionarios y .get()',
    concept: 'Diccionarios',
    syntax: 'd = {"vida": 100}\nd["mana"] = 50      # agrega clave\nd.get("xp", 0)      # 0 si no existe\nfor k, v in d.items():\n    print(k, v)',
    description: 'Los diccionarios guardan pares clave-valor. .get(clave, default) evita el KeyError devolviendo un default cuando la clave no existe. .items() recorre clave y valor a la vez.',
    isWisdom: false,
  },
]

export function getGrimoireEntry(id: string): GrimoireEntry | undefined {
  return GRIMOIRE_ENTRIES.find((e) => e.id === id)
}
