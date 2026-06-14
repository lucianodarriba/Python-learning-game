# PyQuest — Starter Kit para Claude Code

Kit de documentación para construir **PyQuest**, un videojuego web para aprender
Python con mecánicas de RPG, usando Claude Code.

## Por dónde empezar

1. Leé `KICKOFF_PROMPT.md` → te dice cómo armar el repo y qué pegarle a Claude Code.
2. Copiá `CLAUDE.md` a la raíz de tu repo nuevo y la carpeta `docs/` adentro.
3. Seguí las fases.

## Los archivos

| Archivo | Para qué sirve |
|---|---|
| `CLAUDE.md` | Contexto que Claude Code lee solo. Stack, reglas, estructura. |
| `KICKOFF_PROMPT.md` | El prompt inicial + prompts por fase. **Empezá acá.** |
| `docs/PRD.md` | Visión de producto y enfoque educativo. |
| `docs/GAME_DESIGN.md` | Mecánicas de RPG (XP, niveles, quests, grimorio). |
| `docs/CURRICULUM.md` | Módulo 1 de Python mapeado a zonas y quests. |
| `docs/ARCHITECTURE.md` | Stack, ejecución con Pyodide, schema de contenido. |

## Resumen técnico (TL;DR)

- **El alumno escribe Python real**, ejecutado por **Pyodide** (CPython en WASM) en el
  navegador, dentro de un **Web Worker**. Sin instalación, sin backend para el MVP.
- El **motor/UI del juego** se hace en **React + TypeScript** (no en Python: el
  navegador habla JS y la UI sale mucho más fluida y rápida de construir).
- La **validación de ejercicios se escribe en Python** y corre en Pyodide — ahí está la
  elegancia poética de "Python corrigiendo Python".
- Alternativa "todo Python" (PyScript): posible, pero hoy implica bundle más pesado,
  arranque más lento y peor experiencia de UI. No recomendada para el MVP.
