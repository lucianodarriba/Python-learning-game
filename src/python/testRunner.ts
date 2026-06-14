import type { RunResult, TestResult } from './types'

// Tipos de ejercicio alineados con challenges.json
export type ExerciseMode = 'output' | 'function' | 'freeform'

export interface FunctionTestCase {
  name: string
  call: string       // ej: "suma(2, 3)"
  expected: unknown  // ej: 5
}

export interface Exercise {
  id: string
  mode: ExerciseMode
  // Para modo 'function'
  tests?: FunctionTestCase[]
  // Para modo 'output'
  expectedOutput?: string
  // Para modo 'freeform'
  checkCode?: string
}

// Genera el harness Python para modo 'function'
export function buildFunctionHarness(tests: FunctionTestCase[]): string {
  const lines: string[] = [
    'import json as _json',
    '_resultados = []',
    'def _check(nombre, esperado, obtenido):',
    '    ok = esperado == obtenido',
    '    _resultados.append({',
    '        "name": nombre,',
    '        "passed": ok,',
    '        "message": "" if ok else f"esperaba {esperado!r} y obtuve {obtenido!r}",',
    '    })',
    '',
  ]

  for (const tc of tests) {
    const expectedJson = JSON.stringify(tc.expected)
    lines.push(`_check(${JSON.stringify(tc.name)}, _json.loads(${JSON.stringify(expectedJson)}), ${tc.call})`)
  }

  lines.push('')
  lines.push('print("__PYQUEST_RESULTS__" + _json.dumps(_resultados))')

  return lines.join('\n')
}

// Genera el harness Python para modo 'freeform'
export function buildFreeformHarness(checkCode: string): string {
  return [
    'import json as _json',
    '_resultados = []',
    'try:',
    ...checkCode.split('\n').map(line => '    ' + line),
    '    _resultados.append({"name": "verificación", "passed": True, "message": ""})',
    'except AssertionError as _e:',
    '    _resultados.append({"name": "verificación", "passed": False, "message": str(_e) or "La condición no se cumplió"})',
    '',
    'print("__PYQUEST_RESULTS__" + _json.dumps(_resultados))',
  ].join('\n')
}

// Evalúa el resultado para modo 'output' (sin harness, compara stdout)
export function evaluateOutputMode(result: RunResult, expectedOutput: string): TestResult[] {
  const normalize = (s: string) => s.replace(/\r\n/g, '\n').trimEnd()
  const actual = normalize(result.stdout)
  const expected = normalize(expectedOutput)
  const passed = actual === expected
  return [{
    name: 'salida correcta',
    passed,
    message: passed ? undefined : `Se esperaba:\n${expected}\n\nSe obtuvo:\n${actual}`,
  }]
}

// Combina código del alumno + harness según el modo del ejercicio
export function buildRunRequest(studentCode: string, exercise: Exercise): { code: string; testCode?: string } {
  switch (exercise.mode) {
    case 'function': {
      if (!exercise.tests || exercise.tests.length === 0) {
        throw new Error(`Ejercicio ${exercise.id} en modo 'function' no tiene tests definidos`)
      }
      return {
        code: studentCode,
        testCode: buildFunctionHarness(exercise.tests),
      }
    }
    case 'freeform': {
      if (!exercise.checkCode) {
        throw new Error(`Ejercicio ${exercise.id} en modo 'freeform' no tiene checkCode definido`)
      }
      return {
        code: studentCode,
        testCode: buildFreeformHarness(exercise.checkCode),
      }
    }
    case 'output': {
      // En modo output no hay harness; la comparación la hace evaluateOutputMode
      return { code: studentCode }
    }
  }
}

// Post-procesa el RunResult para el modo 'output' (agrega tests al resultado)
export function postProcessResult(result: RunResult, exercise: Exercise): RunResult {
  if (exercise.mode === 'output') {
    if (!result.error && !result.timedOut) {
      const expected = exercise.expectedOutput ?? ''
      const tests = evaluateOutputMode(result, expected)
      return { ...result, tests }
    }
  }
  // Para function y freeform, los tests ya vienen en result.tests (parseados por el worker)
  return result
}
