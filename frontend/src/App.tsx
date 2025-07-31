import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import './App.css'

// 简单的认证检查
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('access_token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          // <ProtectedRoute>
            <Home />
          // </ProtectedRoute>
        } />
        {/* <Route path="/" element={<Navigate to="/home" />} /> */}
      </Routes>
    </Router>
  )
}

export default App