import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser, useAuth } from '@clerk/react'

export default function EditCV() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [cv, setCV] = useState(null)

  useEffect(() => {
    fetchCV()
  }, [id])

  const fetchCV = async () => {
    try {
      const token = await getToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cvs/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setCV(data.cv)
    } catch (err) {
      alert('Failed to load CV')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const token = await getToken()
      await fetch(`${import.meta.env.VITE_API_URL}/api/cvs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cv)
      })
      alert('CV updated successfully!')
      navigate('/dashboard')
    } catch (err) {
      alert('Failed to update CV')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div></div>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit CV</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CV Title *</label>
              <input
                type="text"
                required
                value={cv?.title || ''}
                onChange={e => setCV({...cv, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
              <select
                value={cv?.template_type || 'basic'}
                onChange={e => setCV({...cv, template_type: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              >
                <option value="basic">Basic</option>
                <option value="modern">Modern (Premium)</option>
                <option value="professional">Professional (Premium)</option>
                <option value="creative">Creative (Premium)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={cv?.personal_info?.fullName || ''}
                onChange={e => setCV({...cv, personal_info: {...cv.personal_info, fullName: e.target.value}})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={cv?.personal_info?.email || ''}
                onChange={e => setCV({...cv, personal_info: {...cv.personal_info, email: e.target.value}})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={cv?.personal_info?.phone || ''}
                  onChange={e => setCV({...cv, personal_info: {...cv.personal_info, phone: e.target.value}})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={cv?.personal_info?.address || ''}
                  onChange={e => setCV({...cv, personal_info: {...cv.personal_info, address: e.target.value}})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
              <textarea
                rows="4"
                value={cv?.personal_info?.summary || ''}
                onChange={e => setCV({...cv, personal_info: {...cv.personal_info, summary: e.target.value}})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
