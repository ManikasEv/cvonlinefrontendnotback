import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser, useAuth } from '@clerk/react'
import SubscriptionStatus from '../components/SubscriptionStatus'

export default function Dashboard() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const [cvs, setCvs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    syncUser()
    fetchCVs()
  }, [])

  const syncUser = async () => {
    try {
      const token = await getToken()
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          clerkUserId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName
        })
      })
    } catch (err) {
      console.error('Sync failed:', err)
    }
  }

  const fetchCVs = async () => {
    try {
      const token = await getToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cvs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setCvs(data.cvs || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteCV = async (id) => {
    if (!confirm('Delete this CV?')) return
    try {
      const token = await getToken()
      await fetch(`${import.meta.env.VITE_API_URL}/api/cvs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setCvs(cvs.filter(cv => cv.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div></div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Subscription Status */}
      <div className="mb-8">
        <SubscriptionStatus />
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My CVs</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user.firstName}!</p>
        </div>
        <Link to="/cv/create" className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
          Create New CV (Free!)
        </Link>
      </div>

      {cvs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No CVs yet</h3>
          <p className="text-gray-600 mb-6">Create your first professional CV - it's free to start!</p>
          <Link to="/cv/create" className="inline-block px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Create CV (Free!)
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvs.map(cv => (
            <div key={cv.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{cv.title}</h3>
                  <p className="text-sm text-gray-500">Updated {new Date(cv.updated_at).toLocaleDateString()}</p>
                </div>
                <span className="px-3 py-1 bg-violet-100 text-violet-600 text-xs font-medium rounded-full">{cv.template_type}</span>
              </div>
              <div className="flex gap-2">
                <Link to={`/cv/edit/${cv.id}`} className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors text-center">
                  Edit
                </Link>
                <button onClick={() => deleteCV(cv.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
