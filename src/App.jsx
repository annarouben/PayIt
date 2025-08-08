import { useState } from 'react'
import './App.css'
import SplashScreen from './components/SplashScreen'
import Dashboard from './components/Dashboard'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return <Dashboard />
}

export default App
