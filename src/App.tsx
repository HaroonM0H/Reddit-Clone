import { UserAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";
//pages
import Home from "./pages/Home"


function App() {
  const { session, signOut } = UserAuth();
  
  return (
      <div className="min-h-screen bg-zinc-900">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 shadow-lg">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-white text-2xl font-bold hover:text-zinc-200 transition-colors">
              Dread it
            </Link>
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <span className="text-zinc-400">
                    <Link to= '/profile'>
                    {session.user.email}
                    </Link>
                  </span>
                  <button 
                    onClick={() => signOut()}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/signin" 
                  className="bg-red-600 text-white px-6 py-2 rounded-sm hover:bg-red-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </nav>  
        <main className="container mx-auto px-4 pt-20">
          <Home />
        </main>
      </div>

  )
}

export default App
