import { Routes, Route } from 'react-router-dom'
import { useAuth } from '@clerk/react'
import { Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CreateCV from './pages/CreateCV'
import EditCV from './pages/EditCV'
import Pricing from './pages/Pricing'
import Success from './pages/Success'

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return <div className="text-center py-16 text-xl text-gray-400">Loading...</div>
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/success" element={<Success />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cv/create"
          element={
            <ProtectedRoute>
              <CreateCV />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cv/edit/:id"
          element={
            <ProtectedRoute>
              <EditCV />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
