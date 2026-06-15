# Operadores y Expresiones

Los **operadores** son los símbolos que hacen cálculos. En Pythonia, son los hechizos de la aritmética.

## Operadores aritméticos

```python
print(10 + 3)   # 13 — suma
print(10 - 3)   # 7  — resta
print(10 * 3)   # 30 — multiplicación
print(10 / 3)   # 3.333... — división (siempre float)
print(10 // 3)  # 3  — división entera (sin decimales)
print(10 % 3)   # 1  — módulo (resto de la división)
print(2 ** 10)  # 1024 — potencia
```

## Operadores de comparación

Devuelven `True` o `False`:

```python
print(5 > 3)    # True
print(5 == 5)   # True  (igual)
print(5 != 4)   # True  (distinto)
print(5 >= 5)   # True
```

## Operadores lógicos

```python
print(True and False)  # False
print(True or False)   # True
print(not True)        # False
```

## Precedencia (orden de operaciones)

Python sigue el orden matemático: primero `**`, luego `* / // %`, luego `+ -`.
Usá paréntesis para cambiar el orden:

```python
print(2 + 3 * 4)    # 14 (no 20)
print((2 + 3) * 4)  # 20
```
