import { BrowserRouter, Routes, Route } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-400 mb-4">PyQuest</h1>
        <p className="text-xl text-gray-400">Aprende Python jugando</p>
        <p className="mt-8 text-green-400 text-sm">Scaffolding OK ✓</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
