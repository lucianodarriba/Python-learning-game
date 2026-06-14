import { Link } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { getAllZones } from '../content/loader'
import HUD from '../components/HUD'

export default function MapPage() {
  const player = useGameStore((s) => s.player)
  const zones = getAllZones()

  return (
    <div className="min-h-screen flex flex-col">
      <HUD />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Valle de las Serpientes</h1>
        <p className="text-gray-400 mb-8 text-sm">Módulo 1 — Fundamentos de Python</p>

        <div className="flex flex-col items-center gap-2 max-w-sm mx-auto">
          {zones.map((zone, i) => {
            const unlocked = player.unlockedZones.includes(zone.id)
            const nextZone = zones[i + 1]
            const completed = nextZone
              ? player.unlockedZones.includes(nextZone.id)
              : player.completedQuests.some((id) => id === `${zone.id}-main`)

            return (
              <div key={zone.id} className="flex flex-col items-center w-full">
                {i > 0 && (
                  <div className={`w-0.5 h-6 ${unlocked ? 'bg-purple-600' : 'bg-gray-700'}`} />
                )}
                {unlocked ? (
                  <Link
                    to={`/zone/${zone.id}`}
                    className={`w-full rounded-xl p-4 border transition-all hover:scale-[1.02] ${
                      completed
                        ? 'bg-green-900/20 border-green-700/50 hover:border-green-500'
                        : 'bg-gray-800/60 border-gray-700 hover:border-purple-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">{zone.concept}</p>
                        <p className="font-semibold text-white">{zone.title}</p>
                      </div>
                      <span className="text-2xl">{completed ? '✓' : '→'}</span>
                    </div>
                  </Link>
                ) : (
                  <div className="w-full rounded-xl p-4 border border-gray-800 bg-gray-900/30 opacity-50 cursor-not-allowed">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">{zone.concept}</p>
                        <p className="font-semibold text-gray-500">{zone.title}</p>
                      </div>
                      <span className="text-gray-600">🔒</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
