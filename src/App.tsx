import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PlaygroundPage from './pages/PlaygroundPage'

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-400 mb-4">PyQuest</h1>
        <p className="text-xl text-gray-400 mb-8">Aprende Python jugando</p>
        <Link
          to="/playground"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
        >
          Ir al Playground →
        </Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
