# PRD — PyQuest

## 1. Visión

Un videojuego web donde aprender Python se siente como progresar en un RPG. El alumno
no "hace un curso": **explora un mundo**, acepta misiones, sube de nivel y desbloquea
zonas más difíciles a medida que demuestra que domina los conceptos.

La promesa central: *escribís Python real, se ejecuta de verdad, y cada cosa que
aprendés te hace más poderoso en el juego.*

## 2. Quién lo usa

- **Principiante absoluto** en programación que prefiere jugar a leer un manual.
- **Persona que ya programó algo** y quiere afianzar fundamentos sin aburrirse.
- Uso autodidacta, en navegador, sin instalar nada.

## 3. Principios de diseño educativo

1. **Hacer > leer.** La teoría es corta y siempre desemboca en escribir código.
2. **Feedback inmediato.** El código corre al instante; los errores se explican, no
   solo se marcan.
3. **Dificultad escalonada.** Cada concepto se practica aislado antes de combinarse.
4. **Errar es parte del juego.** Equivocarse no penaliza; reintentar es gratis. Las
   pistas cuestan "algo" (tiempo/recompensa menor), nunca bloquean.
5. **Lo elegante se premia, no se exige.** Las buenas prácticas viven en *hidden
   quests*: el alumno primero resuelve, después aprende a resolver mejor.

## 4. Las cuatro instancias de aprendizaje (y su mapeo al juego)

| Instancia pedagógica | En el juego | Propósito |
|---|---|---|
| **Teoría** | Pergamino / Códice de la zona | Explicación breve + ejemplos ejecutables |
| **Práctica puntual** | **Side quests** | Un concepto, un ejercicio chico y enfocado |
| **Integración** | **Quests de integración** | Combinar varios conceptos en un mini-programa |
| **Evaluación** | **Main quest** (jefe de zona) | Aprobar para desbloquear la siguiente zona |
| **Excelencia (extra)** | **Hidden quests** | Tips, formas pythonicas, mejores prácticas |

## 5. Bucle de juego (game loop)

```
Entrar a una zona
  → Leer la teoría (Códice)
  → Resolver side quests (práctica)        → ganar XP
  → Resolver quest(s) de integración       → ganar más XP
  → Enfrentar la main quest (evaluación)   → aprobar = desbloquear zona siguiente
  → (opcional) descubrir hidden quests     → desbloquear sabiduría / mejores prácticas
  → Subir de nivel cuando la XP alcanza el umbral
Repetir en la zona siguiente
```

## 6. Alcance del MVP (este primer entregable)

**Incluye:**
- Módulo 1 completo (ver `CURRICULUM.md`): fundamentos, decisiones, bucles, listas,
  diccionarios (+ intro a funciones como puente).
- Ejecución de Python real en el navegador.
- XP, niveles, los 4 tipos de quest, desbloqueo de zonas.
- Persistencia local del progreso.

**Queda para después (no-MVP):**
- Cuentas de usuario / backend / sincronización entre dispositivos.
- Módulos intermedios y avanzados (POO, archivos, excepciones, módulos, etc.).
- Multijugador, rankings, logros sociales.
- Editor de contenido visual para autores.

## 7. Métricas de éxito (cuando haya usuarios)

- % de alumnos que completan la Zona 0 (activación).
- % que llega a la main quest de cada zona (retención por zona).
- Tasa de aprobación de cada evaluación (calibración de dificultad).
- Intentos promedio por ejercicio (detectar ejercicios mal diseñados).

## 8. Riesgos y mitigaciones

- **Pyodide pesa y tarda en cargar** → cargarlo de forma diferida (al entrar a la
  primera zona con código), con pantalla de "preparando tu grimorio…".
- **Código del alumno con bucle infinito** → ejecución en Web Worker con timeout y
  reinicio del worker.
- **Dificultad mal calibrada** → instrumentar intentos por ejercicio desde el día 1.
- **El "juego" termina siendo solo ejercicios con barra de XP** → invertir en tema,
  narrativa de zona y feedback con personalidad (ver `GAME_DESIGN.md`).
