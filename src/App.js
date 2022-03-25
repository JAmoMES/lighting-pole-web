import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AuthProvider from './contexts/AuthPorvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
