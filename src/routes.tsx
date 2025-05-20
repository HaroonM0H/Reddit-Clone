import { createBrowserRouter } from 'react-router-dom'

//pages
import App from './App'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'

export const router = createBrowserRouter([ 
    {path: "/", element: <App />},
    {path: "/signup", element: <Signup />},
    {path: "/signin", element: <Signin />},
    {path: "/profile", element: <Profile />}
]);