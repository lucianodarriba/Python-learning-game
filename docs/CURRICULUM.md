# CURRICULUM.md — Módulo 1: Fundamentos

Cada **concepto = una zona**. Cada zona tiene: teoría breve, side quests (práctica),
al menos una quest de integración, una main quest (evaluación) y 1–2 hidden quests.

Orden pensado pedagógicamente: cada zona usa solo lo de las zonas anteriores.

---

## Zona 0 — El Despertar (primeros pasos)

**Objetivo:** que el alumno ejecute su primer código y entienda el bucle del juego.

- Teoría: qué es un programa, `print()`, comentarios `#`, cómo se ejecuta el código.
- Side quests: imprimir un saludo; imprimir varias líneas; comentar código.
- Main quest: imprimir una "ficha de aventurero" con varios `print`.
- Hidden: `print` con varios argumentos y `sep=`/`end=`.

## Zona 1 — Variables y Tipos

- Teoría: variables, asignación, tipos `int`, `float`, `str`, `bool`, `type()`,
  conversión (`int()`, `float()`, `str()`), `input()`.
- Side quests: crear variables; convertir un input a número; intercambiar dos valores.
- Integración: pedir nombre y edad y construir un mensaje.
- Main quest: mini "calculadora de monedas" que lee valores y opera.
- Hidden: asignación múltiple `a, b = b, a` (swap pythonico).

## Zona 2 — Operadores y Expresiones

- Teoría: aritméticos (`+ - * / // % **`), comparación, lógicos (`and or not`),
  precedencia.
- Side quests: calcular área; saber si un número es par (`%`); promedios.
- Integración: dada una compra, calcular total con descuento.
- Main quest: "calculadora de daño" que combina varios operadores y comparaciones.
- Hidden: comparaciones encadenadas `0 <= x <= 10`.

## Zona 3 — Cadenas (Strings)

- Teoría: índices, *slicing*, largo `len()`, métodos (`.upper`, `.lower`, `.strip`,
  `.replace`, `.split`), concatenación, **f-strings**.
- Side quests: poner en mayúsculas; obtener iniciales; contar caracteres.
- Integración: generar un "nombre de usuario" a partir de nombre y apellido.
- Main quest: parser simple de un comando de texto (ej.: `"atacar dragon"`).
- Hidden: **f-strings** como forma elegante vs concatenación con `+`.

## Zona 4 — Estructuras de Decisión

- Teoría: `if`, `elif`, `else`, anidamiento, *truthiness* (qué es verdadero/falso).
- Side quests: mayor de dos números; aprobado/desaprobado; clasificar edad.
- Integración: "guardián del puente" que decide el paso según varias condiciones.
- Main quest: árbol de decisión de una aventura corta (varias ramas).
- Hidden: *truthiness* (`if lista:` en vez de `if len(lista) > 0:`).

## Zona 5 — Bucles

- Teoría: `while`, `for`, `range()`, `break`, `continue`, patrón **acumulador**.
- Side quests: contar de 1 a N; sumar números; tabla de multiplicar; cuenta regresiva.
- Integración: simular tiradas de dado hasta sacar un 6 (con `while`).
- Main quest: "torre de N pisos" o validador de input con reintentos.
- Hidden: `range(inicio, fin, paso)` y por qué `for` > `while` cuando sabés cuántas
  veces iterar.

## Zona 6 — Listas

- Teoría: crear, indexar, *slicing*, métodos (`.append`, `.pop`, `.sort`, `in`),
  recorrer con `for`, listas dentro de bucles.
- Side quests: sumar/promediar una lista; encontrar el máximo; filtrar pares.
- Integración: "inventario del aventurero" (agregar, quitar, listar objetos).
- Main quest: procesar una lista de puntajes (máx, mín, promedio, aprobados).
- Hidden: `enumerate()` para índice+valor; teaser de *list comprehension*.

## Zona 7 — Diccionarios

- Teoría: pares clave-valor, acceso, agregar/actualizar, `.keys`/`.values`/`.items`,
  recorrer, cuándo usar dict vs lista.
- Side quests: crear ficha de personaje; contar frecuencia de palabras; actualizar
  stats.
- Integración: "tienda" con productos y precios (dict) + carrito (lista).
- Main quest: sistema de inventario con cantidades (dict) + reporte.
- Hidden: `dict.get(clave, default)` para evitar `KeyError`.

## Zona 8 — Funciones (puente al Módulo 2) *[opcional / stretch]*

> Incluida como "jefe final" del módulo y puente al siguiente. Si hay que recortar el
> MVP, esta zona es la primera candidata a posponer.

- Teoría: `def`, parámetros, `return`, alcance (scope) básico, reutilización.
- Side quests: función que saluda; función que suma; función que valida.
- Integración: refactorizar un ejercicio previo usando funciones.
- Main quest: mini-juego de texto donde cada acción es una función.
- Hidden: parámetros con valor por defecto; una función, una responsabilidad.

---

## Notas para el diseño de ejercicios

- **Una side quest = un concepto.** Si necesita dos ideas nuevas, partila en dos.
- Cada ejercicio define sus **tests en Python** (ver schema en `ARCHITECTURE.md`).
- Las main quests deben poder fallar de formas interesantes (casos borde) para que
  aprobarlas signifique algo.
- Las hidden quests parten de "ya lo resolviste así; mirá esta forma más elegante".
