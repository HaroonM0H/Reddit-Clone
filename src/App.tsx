

//pages

import Home from "./pages/Home"


function App() {
  return (

      <div className="min-h-screen bg-zinc-900">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <h1 className="text-white text-2xl font-bold">My App</h1>
          </div>
        </nav>  
        <main className="container mx-auto px-4 pt-20">
          <Home />
        </main>
      </div>

  )
}

export default App
