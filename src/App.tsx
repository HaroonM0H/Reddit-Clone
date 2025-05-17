import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-900">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <h1 className="text-white text-2xl font-bold">My App</h1>
          </div>
        </nav>  
        <main className="container mx-auto px-4 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes as you create them */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/post" element={<Post />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
