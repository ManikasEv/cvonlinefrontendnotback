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
    personalInfo: { 
      fullName: '', 
      email: '', 
      phone: '', 
      address: '', 
      summary: '',
      dateOfBirth: '',
      nationality: '',
      profilePictureUrl: ''
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    drivingLicense: {
      has_license: false,
      categories: []
    },
    attachments: [],
    certifications: [],
    projects: []
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
    const skill = prompt('Enter skill name:')
    if (skill) {
      const level = prompt('Enter proficiency level (1-5):', '3')
      const proficiency = Math.min(5, Math.max(1, parseInt(level) || 3))
      setForm({ 
        ...form, 
        skills: [...form.skills, { name: skill, level: proficiency }] 
      })
    }
  }

  const removeSkill = (index) => {
    setForm({ ...form, skills: form.skills.filter((_, i) => i !== index) })
  }

  const addLanguage = () => {
    const language = prompt('Enter language:')
    if (language) {
      const level = prompt('Enter proficiency (A1, A2, B1, B2, C1, C2):', 'B2')
      setForm({ 
        ...form, 
        languages: [...form.languages, { name: language, level: level.toUpperCase() }] 
      })
    }
  }

  const removeLanguage = (index) => {
    setForm({ ...form, languages: form.languages.filter((_, i) => i !== index) })
  }

  const addExperience = () => {
    setForm({
      ...form,
      experience: [...form.experience, {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: []
      }]
    })
  }

  const updateExperience = (index, field, value) => {
    const newExperience = [...form.experience]
    newExperience[index][field] = value
    setForm({ ...form, experience: newExperience })
  }

  const addResponsibility = (expIndex) => {
    const responsibility = prompt('Enter responsibility/achievement:')
    if (responsibility) {
      const newExperience = [...form.experience]
      newExperience[expIndex].responsibilities.push(responsibility)
      setForm({ ...form, experience: newExperience })
    }
  }

  const removeResponsibility = (expIndex, respIndex) => {
    const newExperience = [...form.experience]
    newExperience[expIndex].responsibilities = newExperience[expIndex].responsibilities.filter((_, i) => i !== respIndex)
    setForm({ ...form, experience: newExperience })
  }

  const removeExperience = (index) => {
    setForm({ ...form, experience: form.experience.filter((_, i) => i !== index) })
  }

  const toggleDrivingLicenseCategory = (category) => {
    const categories = form.drivingLicense.categories || []
    const hasCategory = categories.includes(category)
    setForm({
      ...form,
      drivingLicense: {
        has_license: true,
        categories: hasCategory 
          ? categories.filter(c => c !== category)
          : [...categories, category]
      }
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({
          ...form,
          personalInfo: {
            ...form.personalInfo,
            profilePictureUrl: reader.result
          }
        })
      }
      reader.readAsDataURL(file)
    }
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
                  {/* Profile Picture */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      {form.personalInfo.profilePictureUrl && (
                        <img 
                          src={form.personalInfo.profilePictureUrl} 
                          alt="Profile" 
                          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </div>
                  </div>

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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={form.personalInfo.dateOfBirth}
                      onChange={e => setForm({...form, personalInfo: {...form.personalInfo, dateOfBirth: e.target.value}})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <input
                      type="text"
                      value={form.personalInfo.nationality}
                      onChange={e => setForm({...form, personalInfo: {...form.personalInfo, nationality: e.target.value}})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent text-sm"
                      placeholder="e.g., American, British"
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

              {/* Work Experience */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="text-violet-600 text-sm font-medium hover:text-violet-700"
                  >
                    + Add Experience
                  </button>
                </div>
                <div className="space-y-4">
                  {form.experience.map((exp, i) => (
                    <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">Experience {i + 1}</h3>
                        <button
                          type="button"
                          onClick={() => removeExperience(i)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <input
                        type="text"
                        placeholder="Company Name *"
                        value={exp.company}
                        onChange={e => updateExperience(i, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      
                      <input
                        type="text"
                        placeholder="Position/Title *"
                        value={exp.position}
                        onChange={e => updateExperience(i, 'position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={e => updateExperience(i, 'startDate', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={exp.endDate}
                          disabled={exp.current}
                          onChange={e => updateExperience(i, 'endDate', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100"
                        />
                      </div>
                      
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={e => updateExperience(i, 'current', e.target.checked)}
                          className="rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                        />
                        <span className="text-gray-700">I currently work here</span>
                      </label>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-700">Responsibilities</label>
                          <button
                            type="button"
                            onClick={() => addResponsibility(i)}
                            className="text-violet-600 text-xs hover:text-violet-700"
                          >
                            + Add
                          </button>
                        </div>
                        <ul className="space-y-1">
                          {exp.responsibilities.map((resp, ri) => (
                            <li key={ri} className="flex items-start gap-2 text-sm">
                              <span className="text-gray-600 mt-1">•</span>
                              <span className="flex-1 text-gray-700">{resp}</span>
                              <button
                                type="button"
                                onClick={() => removeResponsibility(i, ri)}
                                className="text-red-500 hover:text-red-700 text-xs"
                              >
                                ×
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills with Proficiency */}
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
                <div className="space-y-2">
                  {form.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <span className="flex-1 text-sm font-medium text-gray-700">{skill.name}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(level => (
                          <div
                            key={level}
                            className={`w-6 h-6 rounded ${
                              level <= skill.level 
                                ? 'bg-violet-600' 
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeSkill(i)} 
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Languages</h2>
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="text-violet-600 text-sm font-medium hover:text-violet-700"
                  >
                    + Add Language
                  </button>
                </div>
                <div className="space-y-2">
                  {form.languages.map((lang, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-700">{lang.name}</span>
                        <span className="ml-3 px-2 py-1 bg-violet-100 text-violet-700 rounded text-xs font-medium">
                          {lang.level}
                        </span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeLanguage(i)} 
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driving License */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Driving License</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.drivingLicense.has_license}
                      onChange={e => setForm({
                        ...form, 
                        drivingLicense: {
                          ...form.drivingLicense,
                          has_license: e.target.checked,
                          categories: e.target.checked ? form.drivingLicense.categories : []
                        }
                      })}
                      className="rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                    />
                    <span className="text-sm text-gray-700">I have a driving license</span>
                  </label>

                  {form.drivingLicense.has_license && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                      <div className="flex flex-wrap gap-2">
                        {['A', 'A1', 'A2', 'B', 'BE', 'C', 'CE', 'D', 'DE'].map(category => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => toggleDrivingLicenseCategory(category)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              form.drivingLicense.categories.includes(category)
                                ? 'bg-violet-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Attachments (URLs for now) */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Attachments</h2>
                  <button
                    type="button"
                    onClick={() => {
                      const title = prompt('Attachment title (e.g., "Bachelor Degree"):')
                      if (title) {
                        const url = prompt('Attachment URL or description:')
                        if (url) {
                          setForm({
                            ...form,
                            attachments: [...form.attachments, { title, url, type: 'pdf' }]
                          })
                        }
                      }
                    }}
                    className="text-violet-600 text-sm font-medium hover:text-violet-700"
                  >
                    + Add Attachment
                  </button>
                </div>
                <div className="space-y-2">
                  {form.attachments.map((attachment, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">📄</span>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">{attachment.title}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[200px]">{attachment.url}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm({
                          ...form,
                          attachments: form.attachments.filter((_, idx) => idx !== i)
                        })}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {form.attachments.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No attachments added yet</p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Add links to your diplomas, certificates, or portfolio PDFs
                </p>
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
