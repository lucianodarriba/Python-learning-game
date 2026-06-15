# Listas

Las listas guardan colecciones ordenadas de valores. Son los inventarios de Pythonia.

## Crear y acceder

```python
inventario = ["espada", "escudo", "poción"]
print(inventario[0])   # 'espada'
print(inventario[-1])  # 'poción' (último)
print(inventario[1:])  # ['escudo', 'poción']
```

## Modificar listas

```python
inventario.append("llave")       # agrega al final
inventario.insert(0, "mapa")     # inserta en posición
quitado = inventario.pop()       # elimina y devuelve el último
inventario.remove("escudo")      # elimina por valor
inventario.sort()                # ordena in-place
```

## Recorrer listas

```python
for item in inventario:
    print(item)

# Con índice:
for i, item in enumerate(inventario):
    print(f"{i}: {item}")
```

## Verificar pertenencia

```python
if "espada" in inventario:
    print("Tenés espada")
```

## Funciones útiles

```python
len(inventario)      # cantidad de elementos
sum([1, 2, 3])       # suma (solo para números)
min([3, 1, 4])       # mínimo
max([3, 1, 4])       # máximo
```
