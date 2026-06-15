import { describe, it, expect } from 'vitest'
import { getFriendlyError } from './errorMessages'

describe('getFriendlyError', () => {
  it('traduce NameError', () => {
    const msg = getFriendlyError('NameError', "name 'nombre' is not defined")
    expect(msg).toContain('nombre')
    expect(msg).toContain('creaste')
  })

  it('traduce IndentationError', () => {
    const msg = getFriendlyError('IndentationError', 'unexpected indent')
    expect(msg).toContain('sangría')
  })

  it('traduce SyntaxError', () => {
    const msg = getFriendlyError('SyntaxError', 'invalid syntax')
    expect(msg).toContain('error de escritura')
  })

  it('traduce IndexError', () => {
    const msg = getFriendlyError('IndexError', 'list index out of range')
    expect(msg).toContain('posición')
  })

  it('traduce KeyError', () => {
    const msg = getFriendlyError('KeyError', "'clave'")
    expect(msg).toContain('diccionario')
  })

  it('traduce ZeroDivisionError', () => {
    const msg = getFriendlyError('ZeroDivisionError', 'division by zero')
    expect(msg).toContain('cero')
  })

  it('devuelve mensaje genérico para errores desconocidos', () => {
    const msg = getFriendlyError('WeirdError', 'something strange')
    expect(msg).toContain('something strange')
  })

  it('traduce TypeError con mezcla de str e int', () => {
    const msg = getFriendlyError('TypeError', 'can only concatenate str (not "int") to str')
    expect(msg).toContain('f-string')
  })

  it('traduce TypeError genérico', () => {
    const msg = getFriendlyError('TypeError', 'unsupported operand type')
    expect(msg).toContain('tipo')
  })

  it('NameError incluye el nombre de la variable en el mensaje', () => {
    const msg = getFriendlyError('NameError', "name 'miVariable' is not defined")
    expect(msg).toContain('miVariable')
  })

  it('KeyError incluye la clave faltante en el mensaje', () => {
    const msg = getFriendlyError('KeyError', "'usuario'")
    expect(msg).toContain('usuario')
  })
})
