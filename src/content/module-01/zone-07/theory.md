# Diccionarios

Los diccionarios guardan pares clave-valor. Son el grimorio indexado de Pythonia.

## Crear y acceder

```python
personaje = {
    "nombre": "Ada",
    "nivel": 7,
    "clase": "Maga"
}
print(personaje["nombre"])   # 'Ada'
print(personaje.get("xp", 0))  # 0 (default si no existe)
```

## Agregar, modificar y eliminar

```python
personaje["xp"] = 1500           # agrega o modifica
del personaje["clase"]            # elimina
```

## Recorrer diccionarios

```python
for clave in personaje:
    print(clave, personaje[clave])

for clave, valor in personaje.items():
    print(f"{clave}: {valor}")

print(list(personaje.keys()))    # ['nombre', 'nivel']
print(list(personaje.values()))  # ['Ada', 7]
```

## Verificar claves

```python
if "nombre" in personaje:
    print("Tiene nombre")
```

## `.get()` para evitar KeyError

```python
# Esto lanza KeyError si 'xp' no existe:
# print(personaje["xp"])

# Esto devuelve 0 si no existe:
print(personaje.get("xp", 0))
```
