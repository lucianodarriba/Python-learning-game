import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { getGrimoireEntry } from '../content/grimoireEntries'

export default function Grimoire() {
  const grimoire = useGameStore((s) => s.player.grimoire)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const entries = grimoire
    .map((id) => getGrimoireEntry(id))
    .filter((e): e is NonNullable<typeof e> => e !== undefined)

  const selectedEntry = selected ? getGrimoireEntry(selected) : null

  return (
    <>
      {/* Botón para abrir */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-purple-300 hover:text-purple-100 hover:bg-purple-900/30 rounded-lg transition-colors"
        title="Abrir grimorio"
      >
        <span>📖</span>
        <span>Grimorio</span>
        {entries.length > 0 && (
          <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {entries.length}
          </span>
        )}
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => { setOpen(false); setSelected(null) }}
          />

          {/* Panel */}
          <div className="relative ml-auto w-96 h-full bg-gray-900 border-l border-gray-700 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <div>
                <h2 className="text-lg font-bold text-white">📖 Grimorio</h2>
                <p className="text-xs text-gray-500">Tu cheatsheet de Python</p>
              </div>
              <button
                onClick={() => { setOpen(false); setSelected(null) }}
                className="text-gray-500 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            {entries.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-600 text-sm px-8 text-center">
                Completá quests para desbloquear páginas del grimorio.
              </div>
            ) : (
              <div className="flex flex-1 overflow-hidden">
                {/* Lista de entradas */}
                <div className="w-40 border-r border-gray-800 overflow-y-auto py-2">
                  {entries.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => setSelected(entry.id)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        selected === entry.id
                          ? 'bg-purple-600/30 text-purple-200'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {entry.isWisdom && <span className="text-xs">✨</span>}
                        <span className="truncate">{entry.concept}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Detalle */}
                <div className="flex-1 overflow-y-auto p-4">
                  {selectedEntry ? (
                    <div className="flex flex-col gap-3">
                      <div>
                        {selectedEntry.isWisdom && (
                          <span className="text-xs text-purple-400 font-semibold">✨ Magia elegante</span>
                        )}
                        <h3 className="text-base font-bold text-white mt-1">{selectedEntry.title}</h3>
                      </div>
                      <pre className="bg-gray-950 rounded-lg p-3 text-sm text-green-300 font-mono whitespace-pre-wrap overflow-x-auto border border-gray-800">
                        {selectedEntry.syntax}
                      </pre>
                      <p className="text-sm text-gray-300 leading-relaxed">{selectedEntry.description}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">Seleccioná una entrada para ver los detalles.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
