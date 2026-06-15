import type { RunResult, TestResult } from '../python/types'

interface OutputConsoleProps {
  result: RunResult | null
  running: boolean
}

function TestResultRow({ test }: { test: TestResult }) {
  return (
    <div className={`flex items-start gap-2 text-sm py-1 ${test.passed ? 'text-green-400' : 'text-red-400'}`}>
      <span className="mt-0.5 shrink-0">{test.passed ? '✓' : '✗'}</span>
      <div>
        <span className="font-mono">{test.name}</span>
        {!test.passed && test.message && (
          <p className="text-red-300 text-xs mt-1 whitespace-pre-wrap">{test.message}</p>
        )}
      </div>
    </div>
  )
}

export default function OutputConsole({ result, running }: OutputConsoleProps) {
  if (running) {
    return (
      <div className="flex items-center gap-2 text-yellow-400 text-sm p-4">
        <span className="animate-spin">⟳</span>
        <span>Ejecutando Python...</span>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="text-gray-600 text-sm p-4">
        Presioná "Ejecutar" para ver el resultado...
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      {result.timedOut && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <span>⏱</span>
          <span>Tiempo agotado (5s). El código tardó demasiado — ¿hay un bucle infinito?</span>
        </div>
      )}

      {result.error && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
            <span>✗</span>
            <span>{result.error.type}</span>
          </div>
          <p className="text-orange-300 text-sm bg-orange-900/20 rounded p-2 border border-orange-800/30">
            {result.error.friendly}
          </p>
        </div>
      )}

      {result.stdout && (
        <div>
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Salida</p>
          <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap bg-gray-900/50 rounded p-2">
            {result.stdout}
          </pre>
        </div>
      )}

      {result.tests && result.tests.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Tests</p>
          <div className="flex flex-col divide-y divide-gray-800">
            {result.tests.map((t, i) => (
              <TestResultRow key={i} test={t} />
            ))}
          </div>
          <p className={`text-xs mt-2 font-semibold ${
            result.tests.every(t => t.passed) ? 'text-green-400' : 'text-red-400'
          }`}>
            {result.tests.filter(t => t.passed).length}/{result.tests.length} tests pasaron
          </p>
        </div>
      )}
    </div>
  )
}
