import { useGameStore } from '../store/gameStore'
import { xpForNextLevel } from '../game/config'

export default function HUD() {
  const player = useGameStore((s) => s.player)
  const xpNeeded = xpForNextLevel(player.level)
  const xpPercent = Math.min(100, (player.xp / xpNeeded) * 100)

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-gray-900/80 border-b border-gray-800 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">
          {player.level}
        </div>
        <span className="text-xs text-gray-400">Nivel</span>
      </div>

      <div className="flex-1 max-w-xs">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>XP</span>
          <span>{player.xp} / {xpNeeded}</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      <div className="text-xs text-gray-400">
        <span className="text-white font-semibold">{player.completedQuests.length}</span> quests
      </div>

      {player.wisdom > 0 && (
        <div className="flex items-center gap-1 text-xs">
          <span>✨</span>
          <span className="text-purple-300 font-semibold">{player.wisdom}</span>
          <span className="text-gray-500">sabiduría</span>
        </div>
      )}
    </div>
  )
}
