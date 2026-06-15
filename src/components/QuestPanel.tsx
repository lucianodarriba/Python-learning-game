import { useState } from 'react'
import type { Challenge } from '../content/loader'

interface QuestPanelProps {
  challenge: Challenge
  isCompleted: boolean
}

const QUEST_TYPE_LABELS: Record<string, string> = {
  side: 'Side Quest',
  integration: 'Quest de Integración',
  main: 'Main Quest',
  hidden: 'Quest Oculta',
}

const QUEST_TYPE_COLORS: Record<string, string> = {
  side: 'text-blue-400 bg-blue-400/10',
  integration: 'text-yellow-400 bg-yellow-400/10',
  main: 'text-red-400 bg-red-400/10',
  hidden: 'text-purple-400 bg-purple-400/10',
}

export default function QuestPanel({ challenge, isCompleted }: QuestPanelProps) {
  const [hintsShown, setHintsShown] = useState(0)

  const typeColor = QUEST_TYPE_COLORS[challenge.type] ?? 'text-gray-400 bg-gray-400/10'
  const typeLabel = QUEST_TYPE_LABELS[challenge.type] ?? challenge.type

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeColor}`}>
            {typeLabel}
          </span>
          <span className="text-xs text-amber-400 font-semibold">+{challenge.xp} XP</span>
          {isCompleted && (
            <span className="text-xs text-green-400 font-semibold ml-auto">✓ Completada</span>
          )}
        </div>
        <h2 className="text-xl font-bold text-white">{challenge.title}</h2>
        <p className="text-sm text-purple-300 italic">— {challenge.npc}</p>
      </div>

      {/* Prompt */}
      <div className="flex-1 bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
        <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{challenge.prompt}</p>
      </div>

      {/* Hints */}
      {challenge.hints.length > 0 && (
        <div className="flex flex-col gap-2">
          {challenge.hints.slice(0, hintsShown).map((hint, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Pista {i + 1}</p>
              <p className="text-sm text-gray-200">{hint}</p>
            </div>
          ))}
          {hintsShown < challenge.hints.length && (
            <button
              onClick={() => setHintsShown((n) => n + 1)}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors text-left"
            >
              💡 Ver pista {hintsShown + 1} de {challenge.hints.length}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
