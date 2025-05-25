import { createBrowserRouter } from 'react-router-dom'

//pages
import App from './App'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import PostPage from './pages/PostPage'
import ViewPost from './pages/ViewPost'

export const router = createBrowserRouter([ 
    {path: "/", element: <App />},
    {path: "/signup", element: <Signup />},
    {path: "/signin", element: <Signin />},
    {path: "/profile",
         element: (
        <PrivateRoute>
            <Profile />{" "}
        </PrivateRoute> 
        ),       
    },
    {path: "/postpage",
        element: (
        <PrivateRoute>
            <PostPage/>{" "}
        </PrivateRoute> 
        ),  
    },
    {path: "/post/:id",
        element: (
        <PrivateRoute>
            <ViewPost />{" "}
        </PrivateRoute>
        ),
    }
]);