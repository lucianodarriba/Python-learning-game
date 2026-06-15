import { useState } from 'react'
import { pyodideClient } from '../python/workerClient'
import type { RunResult } from '../python/types'

export default function PlaygroundPage() {
  const [code, setCode] = useState('print("¡Hola, Pythonia!")')
  const [result, setResult] = useState<RunResult | null>(null)
  const [running, setRunning] = useState(false)

  async function handleRun() {
    setRunning(true)
    setResult(null)
    const res = await pyodideClient.run({ code })
    setResult(res)
    setRunning(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">PyQuest — Playground</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-400 uppercase tracking-wider">Tu código Python</label>
          <textarea
            className="w-full h-64 bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm text-green-300 resize-none focus:outline-none focus:border-purple-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
          <button
            onClick={handleRun}
            disabled={running}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 rounded-lg font-semibold transition-colors"
          >
            {running ? 'Ejecutando...' : '▶ Ejecutar'}
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-400 uppercase tracking-wider">Resultado</label>
          <div className="w-full h-64 bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm overflow-auto">
            {result === null && !running && (
              <span className="text-gray-600">El output aparecerá acá...</span>
            )}
            {running && (
              <span className="text-yellow-400 animate-pulse">Ejecutando Python...</span>
            )}
            {result?.timedOut && (
              <span className="text-red-400">⏱ Tiempo agotado (5s). El worker fue reiniciado.</span>
            )}
            {result?.error && (
              <div>
                <p className="text-red-400 mb-1">❌ {result.error.type}</p>
                <p className="text-orange-300 text-xs">{result.error.friendly}</p>
              </div>
            )}
            {result?.stdout && (
              <pre className="text-green-300 whitespace-pre-wrap">{result.stdout}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
