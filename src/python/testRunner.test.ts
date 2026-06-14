import { describe, it, expect } from 'vitest'
import {
  buildFunctionHarness,
  buildFreeformHarness,
  evaluateOutputMode,
  buildRunRequest,
} from './testRunner'
import type { RunResult } from './types'

describe('buildFunctionHarness', () => {
  it('genera harness con import json y _check', () => {
    const harness = buildFunctionHarness([
      { name: 'suma(2, 3) == 5', call: 'suma(2, 3)', expected: 5 },
    ])
    expect(harness).toContain('import json as _json')
    expect(harness).toContain('_check')
    expect(harness).toContain('suma(2, 3)')
    expect(harness).toContain('__PYQUEST_RESULTS__')
  })

  it('incluye todos los casos de test', () => {
    const harness = buildFunctionHarness([
      { name: 'caso 1', call: 'f(1)', expected: 2 },
      { name: 'caso 2', call: 'f(-1)', expected: 0 },
    ])
    expect(harness).toContain('f(1)')
    expect(harness).toContain('f(-1)')
  })

  it('serializa correctamente strings esperados', () => {
    const harness = buildFunctionHarness([
      { name: 'saluda("Ada")', call: 'saluda("Ada")', expected: 'Hola Ada' },
    ])
    // El valor esperado se serializa vía JSON.stringify y se deserializa con _json.loads en Python
    expect(harness).toContain('Hola Ada')
  })

  it('serializa correctamente booleanos esperados', () => {
    const harness = buildFunctionHarness([
      { name: 'es_par(4)', call: 'es_par(4)', expected: true },
    ])
    expect(harness).toContain('true')
  })

  it('genera llamada _check por cada caso de test', () => {
    const harness = buildFunctionHarness([
      { name: 'caso 1', call: 'f(1)', expected: 1 },
      { name: 'caso 2', call: 'f(2)', expected: 4 },
      { name: 'caso 3', call: 'f(3)', expected: 9 },
    ])
    const matches = harness.match(/_check\(/g)
    // 1 definition + 3 calls
    expect(matches?.length).toBeGreaterThanOrEqual(3)
  })

  it('serializa listas esperadas correctamente', () => {
    const harness = buildFunctionHarness([
      { name: 'invertir([1,2,3])', call: 'invertir([1,2,3])', expected: [3, 2, 1] },
    ])
    expect(harness).toContain('[3,2,1]')
  })
})

describe('buildFreeformHarness', () => {
  it('envuelve el checkCode en try/except', () => {
    const harness = buildFreeformHarness('assert x == 42')
    expect(harness).toContain('try:')
    expect(harness).toContain('assert x == 42')
    expect(harness).toContain('AssertionError')
    expect(harness).toContain('__PYQUEST_RESULTS__')
  })

  it('maneja checkCode multilínea', () => {
    const harness = buildFreeformHarness('assert a == 1\nassert b == 2')
    expect(harness).toContain('assert a == 1')
    expect(harness).toContain('assert b == 2')
  })

  it('indenta el checkCode dentro del bloque try', () => {
    const harness = buildFreeformHarness('assert x == 42')
    // La línea del assert debe estar indentada
    expect(harness).toContain('    assert x == 42')
  })

  it('agrega resultado de éxito cuando pasa', () => {
    const harness = buildFreeformHarness('assert True')
    expect(harness).toContain('"passed": True')
  })

  it('incluye import json como _json', () => {
    const harness = buildFreeformHarness('assert x')
    expect(harness).toContain('import json as _json')
  })
})

describe('evaluateOutputMode', () => {
  const makeResult = (stdout: string): RunResult => ({ stdout })

  it('pasa cuando el stdout es idéntico al esperado', () => {
    const [test] = evaluateOutputMode(makeResult('Hola\n'), 'Hola')
    expect(test.passed).toBe(true)
  })

  it('pasa ignorando trailing newline', () => {
    const [test] = evaluateOutputMode(makeResult('Hola\n'), 'Hola\n')
    expect(test.passed).toBe(true)
  })

  it('falla cuando el output no coincide', () => {
    const [test] = evaluateOutputMode(makeResult('Chau\n'), 'Hola')
    expect(test.passed).toBe(false)
    expect(test.message).toContain('Hola')
    expect(test.message).toContain('Chau')
  })

  it('normaliza \\r\\n a \\n', () => {
    const [test] = evaluateOutputMode(makeResult('Hola\r\n'), 'Hola')
    expect(test.passed).toBe(true)
  })

  it('retorna un array con exactamente un TestResult', () => {
    const tests = evaluateOutputMode(makeResult('abc'), 'abc')
    expect(tests).toHaveLength(1)
  })

  it('el resultado exitoso no tiene mensaje de error', () => {
    const [test] = evaluateOutputMode(makeResult('ok'), 'ok')
    expect(test.message).toBeUndefined()
  })

  it('el resultado fallido incluye ambos outputs en el mensaje', () => {
    const [test] = evaluateOutputMode(makeResult('obtenido'), 'esperado')
    expect(test.passed).toBe(false)
    expect(test.message).toContain('esperado')
    expect(test.message).toContain('obtenido')
  })
})

describe('buildRunRequest', () => {
  it('modo output no agrega testCode', () => {
    const req = buildRunRequest('print("x")', {
      id: 'z0-sq-01', mode: 'output', expectedOutput: 'x',
    })
    expect(req.testCode).toBeUndefined()
  })

  it('modo function agrega testCode con harness', () => {
    const req = buildRunRequest('def f(x): return x', {
      id: 'z0-sq-02',
      mode: 'function',
      tests: [{ name: 'f(1)', call: 'f(1)', expected: 1 }],
    })
    expect(req.testCode).toBeDefined()
    expect(req.testCode).toContain('__PYQUEST_RESULTS__')
  })

  it('modo freeform agrega testCode con harness try/except', () => {
    const req = buildRunRequest('x = 42', {
      id: 'z0-freeform-01',
      mode: 'freeform',
      checkCode: 'assert x == 42',
    })
    expect(req.testCode).toBeDefined()
    expect(req.testCode).toContain('assert x == 42')
  })

  it('lanza error si modo function no tiene tests', () => {
    expect(() => buildRunRequest('def f(): pass', {
      id: 'z0-err', mode: 'function',
    })).toThrow()
  })

  it('lanza error si modo function tiene array vacío de tests', () => {
    expect(() => buildRunRequest('def f(): pass', {
      id: 'z0-err2', mode: 'function', tests: [],
    })).toThrow()
  })

  it('lanza error si modo freeform no tiene checkCode', () => {
    expect(() => buildRunRequest('x = 1', {
      id: 'z0-err3', mode: 'freeform',
    })).toThrow()
  })

  it('modo output pasa el código del alumno sin modificar', () => {
    const studentCode = 'print("hola mundo")'
    const req = buildRunRequest(studentCode, {
      id: 'z0-sq-03', mode: 'output', expectedOutput: 'hola mundo',
    })
    expect(req.code).toBe(studentCode)
  })
})
