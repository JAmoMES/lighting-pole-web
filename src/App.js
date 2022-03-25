import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { getAllPoldData } from './services/light'
import AuthProvider from './contexts/AuthPorvider'

function App() {
  useEffect(() => {
    getAllPoldData().then(({ data }) => {
      // setPoldData(data)
      console.log(data)
    })
  }, [])

  return (
    <AuthProvider>
      <Navbar />
      <Home />
    </AuthProvider>
  )
}

export default App
