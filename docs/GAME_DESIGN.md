# GAME_DESIGN.md — Diseño del juego

## 1. Tema y ambientación

**El mundo:** *Pythonia*, un reino digital donde el código es magia. El alumno es un
**Aprendiz de Programación** que recorre el **Valle de las Serpientes**, una región
formada por zonas; cada zona encarna un concepto de Python. Avanzar implica "ordenar"
zonas afectadas por el caos del *Spaghetti Code*.

> El tema es flexible. Lo importante es que cada zona tenga una identidad visual y
> narrativa propia para que progresar se sienta como viajar, no como pasar de página.

Metáfora central: **aprender un concepto = aprender un hechizo**. El "grimorio" del
jugador es, literalmente, un cheatsheet de Python que se va llenando solo a medida que
domina conceptos (doble función: gamificación + material de referencia real).

## 2. Sistemas de RPG

### 2.1 Experiencia (XP) y niveles

- La XP se gana completando quests. No se pierde nunca.
- Subir de nivel da prestigio y desbloquea cosméticos / títulos ("Domador de Bucles").
- **El nivel NO es lo que gatea el contenido** (eso lo hacen las main quests). El nivel
  es la recompensa de dopamina; el desbloqueo es por demostrar dominio.

Curva sugerida (tunable en `game/config.ts`):

```
XP para subir del nivel N al N+1 = 100 * N
Nivel 1→2: 100,  2→3: 200,  3→4: 300, ...
```

Recompensas por tipo de quest (tunable):

| Tipo | XP | Otra recompensa |
|---|---|---|
| Side quest (práctica) | 15 | — |
| Quest de integración | 40 | entrada al grimorio |
| Main quest (evaluación) | 90 | **desbloquea zona siguiente** |
| Hidden quest | 30 | **Punto de Sabiduría** + tip pythonico al grimorio |

### 2.2 Quests

Cuatro tipos, todos comparten el mismo motor de ejercicios (ver `ARCHITECTURE.md`),
cambian metadata y rol narrativo:

- **Main quest (evaluación):** una por zona. Más exigente, suele integrar lo de la
  zona. Aprobarla desbloquea la zona siguiente. Es "el jefe".
- **Side quest (práctica):** muchas por zona. Un concepto, foco estrecho. Reintentos
  ilimitados.
- **Quest de integración:** combinan varios conceptos de la zona (o de zonas previas).
- **Hidden quest:** ocultas. Se revelan al cumplir una condición (ej.: resolver una
  side quest de forma "ingenua" sugiere la hidden que enseña la forma elegante; o
  aparecen al explorar cierto rincón del mapa). Enseñan: f-strings, `enumerate`,
  `dict.get`, comprehensions, *truthiness*, operador `in`, etc.

### 2.3 El Grimorio (cheatsheet vivo)

Cada concepto dominado agrega una "página" al grimorio con sintaxis + ejemplo mínimo.
Las hidden quests agregan páginas de "magia elegante". Es consultable en cualquier
momento. Es el material de estudio que el alumno *construyó jugando*.

### 2.4 Pistas (hints)

- Cada ejercicio tiene 1–3 pistas en orden creciente de ayuda.
- Pedir pista es gratis pero opcional; podés (decisión de diseño) reducir levemente la
  XP del ejercicio o no — recomendado: no penalizar al inicio para no frustrar.
- La última "pista" puede revelar un esqueleto de solución, nunca la solución completa.

### 2.5 Manejo del error como mecánica

- Un error de ejecución NO es "perder". El juego muestra el traceback **traducido a
  lenguaje humano** ("Parece que usaste una variable que todavía no creaste: `nombre`").
- Pequeña animación/feedback con personalidad en vez de un cartel rojo seco.

## 3. Mapa y progresión

- Vista de **mapa de zonas** (nodos conectados, estilo árbol de habilidades / mapa de
  niveles tipo Candy Crush/Slay the Spire).
- Zonas bloqueadas se ven en silueta. Al aprobar la main quest de una zona, se
  "ilumina" el camino a la siguiente.
- Dentro de una zona: lista de quests (teoría arriba, luego side quests, integración y
  finalmente la main quest, que aparece habilitada cuando hizo suficiente práctica
  — sugerido: completar al menos N side quests para habilitar el jefe).

## 4. Tono y feedback

- Cálido, con humor amable. Nunca condescendiente.
- Los NPCs de cada zona dan las quests y comentan resultados.
- Al aprobar la main quest: celebración visible (subida de nivel, página de grimorio,
  apertura del camino).

## 5. Qué hace que esto sea un juego y no "ejercicios con barra de progreso"

1. Tema y narrativa por zona (viaje, no temario).
2. Grimorio que el alumno construye y posee.
3. Hidden quests que recompensan la curiosidad y la elegancia.
4. Feedback con personalidad y errores explicados, no castigados.
5. Progresión visible en un mapa, con jefes y desbloqueos.
