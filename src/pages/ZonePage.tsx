import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor'
import QuestPanel from '../components/QuestPanel'
import OutputConsole from '../components/OutputConsole'
import HUD from '../components/HUD'
import { useGameStore } from '../store/gameStore'
import { pyodideClient } from '../python/workerClient'
import { buildRunRequest, postProcessResult } from '../python/testRunner'
import { getZoneContent } from '../content/loader'
import type { Challenge } from '../content/loader'
import type { RunResult } from '../python/types'

export default function ZonePage() {
  const { zoneId } = useParams<{ zoneId: string }>()
  const { player, completeQuest } = useGameStore()

  const zoneContent = zoneId ? getZoneContent(zoneId) : null

  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)
  const [code, setCode] = useState('')
  const [result, setResult] = useState<RunResult | null>(null)
  const [running, setRunning] = useState(false)
  const [justPassed, setJustPassed] = useState(false)

  useEffect(() => {
    if (zoneContent && zoneContent.challenges.length > 0) {
      const first = zoneContent.challenges[0]
      setActiveChallenge(first)
      setCode(first.starterCode)
      setResult(null)
      setJustPassed(false)
    }
  }, [zoneId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!zoneContent) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Zona no encontrada.{' '}
        <Link to="/map" className="text-purple-400 ml-1 hover:underline">Volver al mapa</Link>
      </div>
    )
  }

  const { zone, challenges } = zoneContent

  function selectChallenge(challenge: Challenge) {
    setActiveChallenge(challenge)
    setCode(challenge.starterCode)
    setResult(null)
    setJustPassed(false)
  }

  async function handleRun() {
    if (!activeChallenge || running) return
    setRunning(true)
    setResult(null)
    setJustPassed(false)

    const request = buildRunRequest(code, activeChallenge)
    const raw = await pyodideClient.run(request)
    const processed = postProcessResult(raw, activeChallenge)
    setResult(processed)
    setRunning(false)

    const allPassed = processed.tests?.every((t) => t.passed) ?? false
    const alreadyDone = player.completedQuests.includes(activeChallenge.id)
    if (allPassed && !processed.error && !processed.timedOut && !alreadyDone) {
      completeQuest(activeChallenge)
      setJustPassed(true)
    }
  }

  const visibleChallenges = challenges.filter(
    (c) => c.type !== 'hidden' || player.completedQuests.some(
      (id) => c.revealWhen === `completed:${id}`
    )
  )

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <HUD />
      <div className="flex items-center gap-4 px-6 py-3 bg-gray-900 border-b border-gray-800 shrink-0">
        <Link to="/map" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
          ← Mapa
        </Link>
        <div>
          <h1 className="text-lg font-bold text-white">{zone.title}</h1>
          <p className="text-xs text-gray-500">{zone.concept}</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: lista de quests */}
        <div className="w-56 shrink-0 bg-gray-900/50 border-r border-gray-800 overflow-y-auto p-3 flex flex-col gap-1">
          {visibleChallenges.map((c) => {
            const done = player.completedQuests.includes(c.id)
            const active = activeChallenge?.id === c.id
            return (
              <button
                key={c.id}
                onClick={() => selectChallenge(c)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-purple-600/30 text-purple-200 border border-purple-500/50'
                    : done
                    ? 'text-green-400 hover:bg-gray-800'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="shrink-0">
                    {done ? '✓' : c.type === 'main' ? '⚔' : c.type === 'hidden' ? '✨' : '◦'}
                  </span>
                  <span className="truncate">{c.title}</span>
                </div>
              </button>
            )
          })}
        </div>

        {activeChallenge ? (
          <div className="flex flex-1 overflow-hidden">
            {/* Quest panel */}
            <div className="w-80 shrink-0 p-4 border-r border-gray-800 overflow-y-auto">
              <QuestPanel
                challenge={activeChallenge}
                isCompleted={player.completedQuests.includes(activeChallenge.id)}
              />
            </div>

            {/* Editor + Consola */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-hidden p-4 pb-2">
                <CodeEditor value={code} onChange={setCode} disabled={running} />
              </div>

              <div className="px-4 py-2 flex items-center gap-3 shrink-0">
                <button
                  onClick={handleRun}
                  disabled={running}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 rounded-lg font-semibold text-sm transition-colors"
                >
                  {running ? '⟳ Ejecutando...' : '▶ Ejecutar'}
                </button>
                {justPassed && (
                  <span className="text-green-400 text-sm font-semibold animate-pulse">
                    ✓ +{activeChallenge.xp} XP ganados!
                  </span>
                )}
              </div>

              <div className="h-48 shrink-0 border-t border-gray-800 overflow-y-auto bg-gray-950/50">
                <OutputConsole result={result} running={running} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600">
            Seleccioná una quest para empezar
          </div>
        )}
      </div>
    </div>
  )
}
