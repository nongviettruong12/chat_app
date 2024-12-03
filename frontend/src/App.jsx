import { Routes, Route } from 'react-router-dom'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Register from './auth/Register'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
