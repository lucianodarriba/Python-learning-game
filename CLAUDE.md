# CLAUDE.md — Contexto del proyecto

> Claude Code lee este archivo automáticamente al iniciar en el repo.
> Mantenelo conciso y actualizado. Los detalles largos viven en `/docs`.

## Qué es esto

**PyQuest** es un videojuego web para aprender Python desde cero, con mecánicas de
RPG (experiencia, niveles, quests). Corre 100% en el navegador, sin instalación.
El alumno escribe **Python real** y se ejecuta con Pyodide (CPython en WebAssembly).

Visión completa: `docs/PRD.md`
Diseño de juego: `docs/GAME_DESIGN.md`
Currículum del Módulo 1: `docs/CURRICULUM.md`
Arquitectura técnica: `docs/ARCHITECTURE.md`

## Stack (no cambiar sin discutir)

- **Frontend / motor**: React + TypeScript + Vite
- **Ejecución de Python del alumno**: Pyodide, dentro de un **Web Worker**
- **Editor de código**: CodeMirror 6 (`@codemirror/lang-python`)
- **Estado**: Zustand
- **Persistencia (MVP)**: localStorage detrás de una capa `storage/` que se pueda
  reemplazar por un backend más adelante sin tocar la UI
- **Estilos**: Tailwind CSS
- **Tests del proyecto**: Vitest

## Reglas de arquitectura (importantes)

1. **Pyodide SIEMPRE corre en un Web Worker**, nunca en el hilo principal. Esto evita
   congelar la UI y permite **matar código con bucles infinitos** (timeout → terminar
   y recrear el worker).
2. **El contenido es data, no código.** Quests, teoría y tests viven en archivos de
   contenido (Markdown + JSON), no hardcodeados en componentes. Ver `content/`.
3. **La validación de ejercicios se escribe en Python** y corre en Pyodide (assertions
   / harness de tests). La UI solo orquesta y muestra resultados.
4. **Separá dominio de presentación**: la lógica de XP, niveles y desbloqueos vive en
   `game/` (funciones puras y testeables), no dentro de componentes React.
5. **Dirección visual (MVP):** UI web 2D basada en componentes, limpia y estilizada
   (referencia: Duolingo / Linear, **no** un videojuego con sprites). Sin pixel art,
   sin assets de personajes, sin animaciones de juego, sin 3D. La "sensación de juego"
   se logra con la progresión, el feedback con personalidad, micro-animaciones de UI
   (transiciones, celebración al subir de nivel) y buen uso de Tailwind. **No** usar
   motores de juego (Phaser/PixiJS) ni librerías 3D. Los NPCs son avatar simple +
   nombre + texto; el mapa de zonas son nodos/tarjetas conectados con CSS.

## Estructura de carpetas objetivo

```
src/
  game/            # lógica pura: XP, niveles, desbloqueos, estado de quests
  python/          # cliente del Web Worker de Pyodide + runner de tests
  content/         # currículum como data
    module-01/
      zones.json         # zonas/conceptos y su orden
      zone-XX/
        theory.md        # la "teoría" (lore + explicación)
        challenges.json  # side/main/hidden quests con tests
  components/       # UI React (mapa, editor, panel de quest, HUD de RPG)
  store/           # Zustand stores
  storage/         # capa de persistencia (localStorage hoy, API mañana)
  pages/           # rutas/pantallas
```

## Convenciones

- TypeScript estricto (`strict: true`). Sin `any` salvo justificación en comentario.
- Funciones de dominio puras y con tests en Vitest.
- Componentes chicos; nada de "componentes Dios".
- Mensajes de commit en español, imperativo: "agrega worker de pyodide".
- Toda quest nueva debe poder agregarse editando SOLO `content/`, sin tocar `src/`.

## Cómo correr

```bash
npm install
npm run dev      # desarrollo
npm run test     # tests del proyecto
npm run build    # build de producción
```

## Estado actual

- [x] Scaffolding del proyecto (Vite + React + TS + Tailwind) — commit 696ba49
- [ ] Worker de Pyodide + ejecución básica de código
- [ ] Runner de tests en Python
- [ ] Modelo de dominio del RPG (XP, niveles, quests) + tests
- [ ] Capa de contenido + carga de Zona 0
- [ ] UI: editor + panel de quest + HUD
- [ ] Mapa de zonas y navegación
- [ ] Persistencia en localStorage
- [ ] Contenido completo del Módulo 1
