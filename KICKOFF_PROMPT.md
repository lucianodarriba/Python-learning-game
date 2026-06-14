# KICKOFF_PROMPT.md — Cómo arrancar con Claude Code

## Paso 0 — Preparar el repo

1. Creá una carpeta vacía y abrila con Claude Code.
2. Copiá dentro estos archivos:
   - `CLAUDE.md` (en la raíz)
   - `docs/PRD.md`, `docs/GAME_DESIGN.md`, `docs/CURRICULUM.md`, `docs/ARCHITECTURE.md`
3. Pegá el prompt de abajo en Claude Code.

> Consejo: trabajá por fases. NO le pidas "hacé todo el juego" de una. Pedí una fase,
> revisá, corregí, y recién ahí seguís. Cada fase del plan es un buen punto de commit.

---

## Prompt de arranque (pegar tal cual)

```
Vas a ayudarme a construir PyQuest, un videojuego web para aprender Python con
mecánicas de RPG. Ya dejé la documentación del proyecto en el repo:

- CLAUDE.md  (contexto, stack y reglas — leelo primero)
- docs/PRD.md  (visión y enfoque educativo)
- docs/GAME_DESIGN.md  (mecánicas de RPG)
- docs/CURRICULUM.md  (currículum del Módulo 1)
- docs/ARCHITECTURE.md  (arquitectura, schema de contenido, ejecución con Pyodide)

Antes de escribir código:
1. Leé los cinco documentos.
2. Resumime en tus palabras qué vamos a construir y confirmá que entendiste las
   reglas de arquitectura (Pyodide en Web Worker, contenido como data, validación en
   Python, dominio separado de la UI).
3. Proponé un plan de implementación por fases siguiendo el "orden de construcción
   recomendado" de ARCHITECTURE.md. Para cada fase, decime el criterio de "hecho".

NO escribas código todavía. Cuando aprobemos el plan, arrancamos por la Fase 1.

Stack obligatorio: React + TypeScript + Vite + Tailwind + Zustand + Vitest, CodeMirror 6,
y Pyodide en un Web Worker. Persistencia en localStorage detrás de una capa storage/.

Mantené actualizada la sección "Estado actual" de CLAUDE.md a medida que completamos
fases.
```

---

## Prompts por fase (usar uno por vez, después del plan)

**Fase 1 — Scaffolding**
```
Arranquemos la Fase 1. Generá el scaffolding: Vite + React + TS + Tailwind + Vitest +
Zustand. Estructura de carpetas según CLAUDE.md. Una pantalla placeholder y los scripts
npm (dev/test/build) funcionando. Mostrame cómo correrlo y verificá que el build pasa.
```

**Fase 2 — Pyodide en Web Worker**
```
Fase 2. Implementá el Web Worker de Pyodide y el cliente en python/. Quiero poder
ejecutar código Python y recibir stdout, con timeout configurable que mate y recree el
worker si hay bucle infinito. Agregá una pantalla de prueba que ejecute código que yo
escriba. Incluí los tipos de python/types.ts del ARCHITECTURE.md.
```

**Fase 3 — Runner de tests + errores friendly**
```
Fase 3. Implementá el runner que corre los modos "output" y "function" del schema de
challenges (ver ARCHITECTURE.md), devolviendo TestResult[]. Agregá la traducción de
tracebacks a mensajes human-friendly según la tabla del doc. Tests en Vitest para la
lógica que no dependa de Pyodide.
```

**Fase 4 — Dominio del RPG**
```
Fase 4. Implementá el modelo de dominio en game/ (PlayerState, xpForNextLevel,
applyQuestReward, isBossUnlocked, revealHiddenQuests) como funciones puras, con tests
de Vitest que cubran subida de nivel, desbloqueo de zona y revelado de hidden quests.
```

**Fase 5 — Contenido**
```
Fase 5. Creá la capa de contenido y escribí el contenido REAL de la Zona 0 y la Zona 1
del CURRICULUM.md (theory.md + challenges.json con sus tests y pistas). Implementá el
loader que valida el schema al cargar.
```

**Fase 6+ — UI, mapa, persistencia, grimorio**
```
Seguimos con la Fase N (ver orden en ARCHITECTURE.md). Implementala completa, mostrame
cómo verificarla y actualizá "Estado actual" en CLAUDE.md.
```

---

## Buenas prácticas trabajando con Claude Code en este proyecto

- **Pedí un plan antes de cada fase grande**; aprobalo; recién ahí, código.
- **Commiteá al final de cada fase** que funcione (es tu punto de retorno seguro).
- Si algo se desvía del stack o de las reglas de `CLAUDE.md`, frenalo y recordáselo.
- Cuando agregues una quest nueva, debería bastar con editar `content/` — si Claude
  toca `src/` para eso, algo se diseñó mal.
- Probá en el navegador después de cada fase con UI; no confíes solo en que "compila".
