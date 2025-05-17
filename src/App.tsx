import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes as you create them */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/post" element={<Post />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
