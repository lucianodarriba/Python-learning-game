# Bucles

Los bucles permiten repetir instrucciones. En Pythonia, son los hechizos de la perseverancia.

## El bucle `for`

Ideal cuando sabés cuántas veces repetir:

```python
for i in range(5):
    print(i)  # imprime 0, 1, 2, 3, 4
```

`range(inicio, fin, paso)`:
```python
range(1, 6)        # 1, 2, 3, 4, 5
range(0, 10, 2)    # 0, 2, 4, 6, 8
range(5, 0, -1)    # 5, 4, 3, 2, 1
```

## El bucle `while`

Ideal cuando repetís hasta que se cumpla una condición:

```python
contador = 0
while contador < 5:
    print(contador)
    contador += 1
```

## `break` y `continue`

```python
for i in range(10):
    if i == 5:
        break      # sale del bucle
    if i % 2 == 0:
        continue   # salta esta iteración
    print(i)  # imprime 1, 3
```

## Patrón acumulador

```python
total = 0
for numero in [1, 2, 3, 4, 5]:
    total += numero
print(total)  # 15
```
