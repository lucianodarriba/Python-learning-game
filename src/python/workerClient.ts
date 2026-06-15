import type { RunRequest, RunResult } from './types'
import { getFriendlyError } from './errorMessages'

const TIMEOUT_MS = 5000

export class PyodideWorkerClient {
  private worker: Worker | null = null

  private createWorker(): Worker {
    return new Worker(new URL('./pyodide.worker.ts', import.meta.url), { type: 'module' })
  }

  private getWorker(): Worker {
    if (!this.worker) {
      this.worker = this.createWorker()
    }
    return this.worker
  }

  async run(request: RunRequest): Promise<RunResult> {
    return new Promise((resolve) => {
      const worker = this.getWorker()
      let settled = false

      const timer = setTimeout(() => {
        if (settled) return
        settled = true
        // Matar y recrear el worker
        worker.terminate()
        this.worker = null
        resolve({ stdout: '', timedOut: true })
      }, TIMEOUT_MS)

      worker.onmessage = (event: MessageEvent<RunResult>) => {
        if (settled) return
        settled = true
        clearTimeout(timer)

        const result = event.data
        // Enriquecer error con mensaje amable
        if (result.error) {
          result.error.friendly = getFriendlyError(result.error.type, result.error.message)
        }
        resolve(result)
      }

      worker.onerror = (err) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        resolve({
          stdout: '',
          error: {
            type: 'WorkerError',
            message: err.message,
            friendly: 'Ocurrió un error inesperado. Intentá de nuevo.',
          },
        })
      }

      worker.postMessage(request)
    })
  }

  terminate() {
    this.worker?.terminate()
    this.worker = null
  }
}

// Singleton para reutilizar el worker entre ejercicios
export const pyodideClient = new PyodideWorkerClient()
