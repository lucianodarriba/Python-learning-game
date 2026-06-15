# Cadenas de Texto (Strings)

Los strings son secuencias de caracteres. En Pythonia, son los encantamientos verbales.

## Índices y slicing

```python
s = "Python"
print(s[0])     # 'P' — primer carácter
print(s[-1])    # 'n' — último carácter
print(s[0:3])   # 'Pyt' — del índice 0 al 2
print(s[2:])    # 'thon' — desde el índice 2 hasta el final
```

## Largo y métodos útiles

```python
nombre = "  Ada Lovelace  "
print(len(nombre))          # largo del string
print(nombre.strip())       # elimina espacios de los extremos
print(nombre.upper())       # TODO EN MAYÚSCULAS
print(nombre.lower())       # todo en minúsculas
print(nombre.replace("Ada", "Grace"))  # reemplaza texto
```

## Separar y unir

```python
frase = "hola mundo python"
palabras = frase.split()        # ['hola', 'mundo', 'python']
unida = "-".join(palabras)      # 'hola-mundo-python'
```

## f-strings (la forma elegante)

```python
nombre = "Ada"
nivel = 7
# Concatenación (vieja):
print("Hola " + nombre + ", nivel " + str(nivel))
# f-string (moderna):
print(f"Hola {nombre}, nivel {nivel}")
```
