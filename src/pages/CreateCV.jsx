import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser, useAuth } from '@clerk/react'
import CVPreview from '../components/CVPreview'

export default function CreateCV() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState('basic')
  const [form, setForm] = useState({
    title: '',
    templateType: 'basic',
    personalInfo: { fullName: '', email: '', phone: '', address: '', summary: '' },
    experience: [],
    education: [],
    skills: []
  })

  useEffect(() => {
    checkSubscription()
  }, [])

  const checkSubscription = async () => {
    try {
      const token = await getToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/subscription-status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setHasSubscription(data.hasPremium && data.subscriptionStatus === 'active')
    } catch (err) {
      console.error(err)
      setHasSubscription(false)
    }
  }

  const templates = [
    { id: 'basic', name: 'Basic', icon: '📄' },
    { id: 'modern', name: 'Modern', icon: '✨' },
    { id: 'professional', name: 'Professional', icon: '💼' },
    { id: 'creative', name: 'Creative', icon: '🎨' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check subscription before saving/downloading
    if (!hasSubscription) {
      setShowPaywall(true)
      return
    }

    setLoading(true)
    try {
      const token = await getToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cvs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, templateType: activeTemplate })
      })
      const data = await res.json()
      
      // Trigger download
      downloadCV()
      
      // Navigate to dashboard
      alert('CV created and downloaded successfully!')
      navigate('/dashboard')
    } catch (err) {
      alert('Failed to create CV')
    } finally {
      setLoading(false)
    }
  }

  const downloadCV = () => {
    // Create a simple PDF download simulation
    const cvData = JSON.stringify(form, null, 2)
    const blob = new Blob([cvData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.title || 'cv'}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const addSkill = () => {
    const skill = prompt('Enter a skill:')
    if (skill) {
      setForm({ ...form, skills: [...form.skills, skill] })
    }
  }

  const removeSkill = (index) => {
    setForm({ ...form, skills: form.skills.filter((_, i) => i !== index) })
  }

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Side - Form (25%) */}
        <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New CV</h1>
              {!hasSubscription && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                  <p className="text-yellow-800 font-medium">🎨 Free Preview Mode</p>
                  <p className="text-yellow-700 text-xs mt-1">Subscribe to save and download your CV</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CV Title *</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={e => setForm({...form, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent text-sm"
                      placeholder="e.g., Software Engineer Resume"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.personalInfo.fullName}
                      onChange={e => setForm({...form, personalInfo: {...form.personalInfo, fullName: e.target.value}})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.personalInfo.email}
                      onChange={e => setForm({...form, personalInfo: {...form.personalInfo, email: e.target.value}})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.personalInfo.phone}
                      onChange={e => setForm({...form, personalInfo: {...form.personalInfo, phone: e.target.value}})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={form.personalInfo.address}
                      onChange={e => setForm({...form, personalInfo: {...form.personalInfo, address: e.target.value}})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                    <textarea
                      rows="4"
                      value={form.personalInfo.summary}
                      onChange={e => setForm({...form, personalInfo: {...form.personalInfo, summary: e.target.value}})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent text-sm"
                      placeholder="Brief summary..."
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="text-violet-600 text-sm font-medium hover:text-violet-700"
                  >
                    + Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-2">
                      {skill}
                      <button type="button" onClick={() => removeSkill(i)} className="hover:text-violet-900">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 relative"
                >
                  {loading ? 'Saving...' : hasSubscription ? 'Save & Download CV' : '🔒 Save & Download (Subscribe Required)'}
                </button>
                {!hasSubscription && (
                  <button
                    type="button"
                    onClick={() => setShowPaywall(true)}
                    className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-all"
                  >
                    Subscribe to Save ($9.99/month)
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Preview (75%) */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Template Tabs */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Template:</span>
              <div className="flex gap-2">
                {templates.map(template => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setActiveTemplate(template.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTemplate === template.id
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{template.icon}</span>
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="flex-1 overflow-hidden">
            <CVPreview data={form} template={activeTemplate} />
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowPaywall(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to Continue</h2>
              <p className="text-gray-600">Unlock the ability to save and download your professional CVs</p>
            </div>

            <div className="bg-violet-50 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <span className="text-4xl font-bold text-gray-900">$9.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Save unlimited CVs</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Download as PDF</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">All premium templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Cancel anytime</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate('/pricing')}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all mb-3"
            >
              Subscribe Now
            </button>
            <button
              onClick={() => setShowPaywall(false)}
              className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium"
            >
              Continue Previewing
            </button>
          </div>
        </div>
      )}
    </>
  )
}
