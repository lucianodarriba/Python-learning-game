import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MapPage from './pages/MapPage'
import ZonePage from './pages/ZonePage'

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-400 mb-3">PyQuest</h1>
        <p className="text-xl text-gray-400 mb-2">Aprende Python jugando</p>
        <p className="text-sm text-gray-600 mb-10">Módulo 1 — Fundamentos</p>
        <a
          href="/map"
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-lg transition-all hover:scale-105 inline-block"
        >
          Comenzar aventura →
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/zone/:zoneId" element={<ZonePage />} />
      </Routes>
    </BrowserRouter>
  )
}
