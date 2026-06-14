/// <reference lib="webworker" />

import type { RunRequest, RunResult } from './types'

// Pyodide se carga desde CDN
declare function loadPyodide(config: { indexURL: string }): Promise<PyodideInterface>

interface PyodideInterface {
  runPythonAsync(code: string, options?: { globals?: unknown }): Promise<unknown>
  globals: { get(key: string): unknown }
  OutputStream: new (options: { batched: (text: string) => void }) => unknown
  setStdout(options: { batched: (text: string) => void }): void
  setStderr(options: { batched: (text: string) => void }): void
}

let pyodide: PyodideInterface | null = null
let stdout = ''

async function initPyodide(): Promise<PyodideInterface> {
  if (pyodide) return pyodide

  // Importar Pyodide desde CDN usando dynamic import
  await import('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js' as string)
  pyodide = await (globalThis as unknown as { loadPyodide: typeof loadPyodide }).loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
  })
  return pyodide
}

self.onmessage = async (event: MessageEvent<RunRequest>) => {
  const { code, testCode } = event.data

  let result: RunResult = { stdout: '' }
  stdout = ''

  try {
    const py = await initPyodide()

    py.setStdout({ batched: (text: string) => { stdout += text + '\n' } })
    py.setStderr({ batched: (text: string) => { stdout += text + '\n' } })

    // Ejecutar código del alumno
    await py.runPythonAsync(code)

    // Si hay testCode, ejecutarlo en el mismo namespace
    if (testCode) {
      await py.runPythonAsync(testCode)
    }

    result = { stdout: stdout.trimEnd() }

    // Parsear resultados de tests si los hay
    const marker = '__PYQUEST_RESULTS__'
    const markerIdx = stdout.indexOf(marker)
    if (markerIdx !== -1) {
      const jsonStr = stdout.slice(markerIdx + marker.length).split('\n')[0]
      const tests = JSON.parse(jsonStr)
      // Limpiar el stdout para que no muestre la línea de resultados
      result.stdout = stdout.slice(0, markerIdx).trimEnd()
      result.tests = tests
    }

  } catch (err: unknown) {
    const error = err as { type?: string; message?: string; toString(): string }
    const errorStr = error.toString()
    const errorType = errorStr.split(':')[0] ?? 'Error'
    const errorMessage = errorStr.includes(':') ? errorStr.slice(errorStr.indexOf(':') + 1).trim() : errorStr

    result = {
      stdout: stdout.trimEnd(),
      error: {
        type: errorType,
        message: errorMessage,
        friendly: errorMessage, // el cliente reemplaza esto con getFriendlyError
      },
    }
  }

  self.postMessage(result)
}
