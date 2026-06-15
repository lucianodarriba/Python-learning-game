# Variables y Tipos

Has demostrado que podés hablar con Python. Ahora aprenderás a **recordar**.

## Variables: los contenedores de tu grimorio

Una variable es un nombre que guarda un valor. Podés pensar en ella como
una caja con una etiqueta.

```python
nombre = "Ada"
nivel = 5
salud = 100.0
activo = True
```

La primera vez que usás una variable, la **creás** con `=` (asignación).
Después podés usarla en cualquier parte del código.

## Los cuatro tipos básicos

| Tipo | Ejemplo | Para qué sirve |
|------|---------|----------------|
| `str` (texto) | `"Ada"` | Nombres, mensajes, comandos |
| `int` (entero) | `42` | Contadores, niveles, puntos |
| `float` (decimal) | `3.14` | Coordenadas, porcentajes |
| `bool` (verdadero/falso) | `True` | Condiciones, flags |

Podés verificar el tipo con `type()`:

```python
print(type(42))      # <class 'int'>
print(type("hola"))  # <class 'str'>
```

## Conversión entre tipos

```python
edad_texto = "25"
edad_numero = int(edad_texto)   # str → int
precio = float("9.99")          # str → float
codigo = str(42)                # int → str
```

## `input()`: el jugador habla

`input()` pausa el programa y espera que el usuario escriba algo.
Siempre devuelve un `str`, aunque el usuario escriba un número.

```python
nombre = input("¿Cómo te llamás? ")
print("Hola,", nombre)
```

> **Importante:** en los ejercicios de PyQuest, los valores de `input()`
> están predefinidos para que los tests funcionen automáticamente.
