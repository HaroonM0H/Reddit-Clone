import { UserAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "./components/ui/button"

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
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-zinc-400 hover:text-white transition-colors">
                      {session.user.email}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link to="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <Link to="/postpage">
                        <DropdownMenuItem>Post</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem >
                        <Button variant="outline" className="w-full" onClick={signOut}>
                          Sign Out
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
