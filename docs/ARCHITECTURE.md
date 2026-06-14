# ARCHITECTURE.md — Arquitectura técnica

## 1. Decisiones clave (y por qué)

| Decisión | Elección | Razón |
|---|---|---|
| Ejecutar Python del alumno | **Pyodide** (CPython → WASM) | Python *real*, client-side, sin backend, sandbox del navegador |
| Dónde corre Pyodide | **Web Worker** | No congela la UI; permite **matar bucles infinitos** |
| UI / motor | React + TypeScript + Vite | Velocidad de desarrollo y ecosistema |
| Editor | CodeMirror 6 + `@codemirror/lang-python` | Liviano, buen soporte de Python |
| Estado | Zustand | Simple, sin boilerplate |
| Persistencia (MVP) | localStorage tras capa `storage/` | Migrable a backend sin tocar UI |
| Contenido | Markdown + JSON | Autoría de quests sin tocar código |

## 2. Ejecución de código del alumno

### 2.1 Por qué un Web Worker es obligatorio

Si Pyodide corre en el hilo principal, un `while True:` del alumno **congela toda la
pestaña** y no se puede recuperar. En un Worker:

1. El hilo principal envía `{ code, tests }` al worker.
2. El worker ejecuta con Pyodide.
3. Si tarda más que `TIMEOUT_MS` (ej. 5000 ms) → el hilo principal hace
   `worker.terminate()` y crea uno nuevo (Pyodide se reinicializa).
4. El worker devuelve `{ stdout, error, testResults }`.

> Nota: Pyodide tarda en cargar (varios MB). Cargalo de forma diferida con una pantalla
> de "preparando tu grimorio…" y cacheá la instancia entre ejercicios.

### 2.2 Contrato del worker (tipos)

```ts
// python/types.ts
export interface RunRequest {
  code: string;            // código del alumno
  testCode?: string;       // harness de tests en Python (opcional)
  stdin?: string;          // para ejercicios con input()
}

export interface TestResult {
  name: string;
  passed: boolean;
  message?: string;        // explicación human-friendly si falló
}

export interface RunResult {
  stdout: string;
  error?: { type: string; message: string; friendly: string };
  tests?: TestResult[];
  timedOut?: boolean;
}
```

## 3. Cómo se corrigen los ejercicios (el harness en Python)

La validación se escribe **en Python** y corre en Pyodide. Hay 3 modos de ejercicio:

- **`output`**: se compara `stdout` del alumno contra el esperado (con normalización de
  espacios/saltos). Ideal para Zona 0–2.
- **`function`**: el ejercicio pide definir una función; el harness la llama con varios
  casos y compara el `return`. Ideal para la mayoría.
- **`freeform`**: assertions arbitrarias sobre el estado final / variables.

Esquema del harness para modo `function` (lo genera el runner combinando el código del
alumno + los casos del ejercicio):

```python
# Se ejecuta DESPUÉS del código del alumno en el mismo namespace.
import json
_resultados = []
def _check(nombre, esperado, obtenido):
    ok = esperado == obtenido
    _resultados.append({
        "name": nombre,
        "passed": ok,
        "message": "" if ok else f"esperaba {esperado!r} y obtuve {obtenido!r}",
    })

# casos inyectados desde challenges.json:
_check("suma(2, 3) == 5", 5, suma(2, 3))
_check("suma(-1, 1) == 0", 0, suma(-1, 1))

print("__PYQUEST_RESULTS__" + json.dumps(_resultados))
```

El cliente parsea la línea marcada con `__PYQUEST_RESULTS__` para obtener los
`TestResult[]`. (Para modo `output` no hace falta harness: se compara stdout.)

### Traducción de errores a lenguaje humano

Mapear los tracebacks más comunes a mensajes amables:

| Error de Python | Mensaje friendly |
|---|---|
| `NameError: name 'x'` | "Usaste `x` pero todavía no la creaste (¿un typo?)." |
| `IndentationError` | "Revisá la sangría: Python usa los espacios para entender bloques." |
| `SyntaxError` | "Hay un error de escritura. Revisá `:` , paréntesis y comillas." |
| `TypeError` ...str/int | "Estás mezclando texto y números. Quizá falta `int()` o un f-string." |
| `IndexError` | "Pediste una posición que no existe en la lista." |
| `KeyError` | "Buscaste una clave que no está en el diccionario (mirá `.get()`)." |

## 4. El contenido como data

### 4.1 `zones.json` (índice de zonas del módulo)

```json
{
  "module": 1,
  "title": "Fundamentos",
  "zones": [
    { "id": "z0", "title": "El Despertar", "concept": "print y ejecución",
      "requires": [], "minSideQuestsForBoss": 2 },
    { "id": "z1", "title": "Variables y Tipos", "concept": "variables",
      "requires": ["z0"], "minSideQuestsForBoss": 3 }
  ]
}
```

### 4.2 `challenges.json` (quests de una zona)

```json
[
  {
    "id": "z1-sq-01",
    "type": "side",
    "mode": "function",
    "title": "El hechizo de la suma",
    "npc": "Maga Ada",
    "prompt": "Definí una función `suma(a, b)` que devuelva la suma de a y b.",
    "starterCode": "def suma(a, b):\n    # tu código acá\n    pass\n",
    "tests": [
      { "name": "suma(2, 3) == 5", "call": "suma(2, 3)", "expected": 5 },
      { "name": "suma(-1, 1) == 0", "call": "suma(-1, 1)", "expected": 0 }
    ],
    "hints": [
      "Una función devuelve valores con `return`.",
      "`return a + b` resuelve el caso."
    ],
    "xp": 15
  },
  {
    "id": "z1-main",
    "type": "main",
    "mode": "output",
    "title": "Jefe: La Ficha del Aventurero",
    "prompt": "Imprimí nombre y nivel usando los valores dados.",
    "starterCode": "nombre = \"Ada\"\nnivel = 3\n# imprimí: Ada (Nivel 3)\n",
    "expectedOutput": "Ada (Nivel 3)\n",
    "hints": ["Probá un f-string: f\"{nombre} (Nivel {nivel})\""],
    "xp": 90,
    "unlocks": "z2"
  },
  {
    "id": "z1-hidden-swap",
    "type": "hidden",
    "mode": "freeform",
    "revealWhen": "completed:z1-sq-02",
    "title": "Magia oculta: el intercambio elegante",
    "prompt": "En Python podés intercambiar dos variables en una línea: a, b = b, a",
    "checkCode": "assert (a, b) == (2, 1)",
    "hints": [],
    "xp": 30,
    "wisdom": 1
  }
]
```

### 4.3 `theory.md`

Markdown con la teoría de la zona. Puede incluir bloques de código marcados como
"ejecutables" (un fence ```python con un atributo) que la UI renderiza con botón
"probar". Mantener la teoría **corta**: explicar lo justo para resolver las quests.

## 5. Modelo de dominio (en `game/`, funciones puras y testeables)

```ts
interface PlayerState {
  level: number;
  xp: number;
  wisdom: number;
  completedQuests: string[];   // ids
  unlockedZones: string[];     // ids
  grimoire: string[];          // conceptos/tips desbloqueados
}

xpForNextLevel(level: number): number       // 100 * level
applyQuestReward(state, quest): PlayerState  // suma xp, sube nivel, desbloquea
isBossUnlocked(zone, state): boolean         // según minSideQuestsForBoss
revealHiddenQuests(state): string[]          // según revealWhen
```

Todo esto se testea con Vitest **sin** React ni Pyodide.

## 6. Persistencia

`storage/` expone `loadProgress()` / `saveProgress(state)`. Implementación MVP con
localStorage (clave `pyquest:v1:progress`). El resto de la app **no sabe** que es
localStorage; mañana se reemplaza por llamadas a una API sin tocar UI ni dominio.

## 7. Orden de construcción recomendado

1. Scaffolding (Vite + React + TS + Tailwind + Vitest).
2. Worker de Pyodide + ejecución de código simple (stdout) con timeout.
3. Runner de tests (`function` y `output`) + traducción de errores.
4. Dominio del RPG en `game/` + tests.
5. Capa de contenido + cargar Zona 0 y Zona 1.
6. UI: editor (CodeMirror) + panel de quest + HUD (XP/nivel) + consola de salida.
7. Mapa de zonas + navegación + desbloqueos.
8. Persistencia localStorage.
9. Grimorio + hidden quests.
10. Completar contenido del Módulo 1.
