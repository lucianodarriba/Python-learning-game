# Estructuras de Decisión

A veces el programa necesita elegir qué hacer. Los `if`, `elif` y `else` son las bifurcaciones del camino.

## if / elif / else

```python
nivel = 5

if nivel >= 10:
    print("Maestro")
elif nivel >= 5:
    print("Aprendiz avanzado")
else:
    print("Novato")
# Imprime: Aprendiz avanzado
```

La sangría (indentación) define qué código pertenece a cada bloque. Siempre usá 4 espacios.

## Anidamiento

Podés poner un `if` dentro de otro:

```python
tiene_llave = True
puerta_abierta = False

if tiene_llave:
    if not puerta_abierta:
        print("Abrís la puerta con la llave")
    else:
        print("La puerta ya está abierta")
else:
    print("No tenés la llave")
```

## Truthiness

En Python, no todo tiene que ser `True` o `False` exacto. Estos valores se consideran falsos:
- `0`, `0.0` — cero
- `""` — string vacío
- `[]`, `{}` — colecciones vacías
- `None`

Todo lo demás es verdadero. Esto permite escribir `if lista:` en vez de `if len(lista) > 0:`.
