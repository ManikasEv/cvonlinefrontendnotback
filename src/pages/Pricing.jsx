import { useState } from 'react'
import { useUser, useAuth } from '@clerk/react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Pricing() {
  const { user, isSignedIn } = useUser()
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!isSignedIn) {
      alert('Please sign in to subscribe')
      return
    }

    setLoading(true)
    try {
      const token = await getToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        console.error('Server error:', errorData)
        alert(`Failed to start subscription: ${errorData.error || 'Server error'}`)
        setLoading(false)
        return
      }
      
      const data = await res.json()
      
      if (!data.url) {
        console.error('No checkout URL received:', data)
        alert('Failed to create checkout session. Please check server logs.')
        setLoading(false)
        return
      }
      
      window.location.href = data.url
    } catch (err) {
      console.error('Subscription error:', err)
      alert(`Failed to start subscription: ${err.message}`)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Simple, Monthly Subscription</h1>
        <p className="text-xl text-gray-600">Create unlimited CVs, save and download for just $9.99/month</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-8 rounded-2xl shadow-2xl text-white relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 text-sm font-bold rounded-full">
            Best Value
          </div>
          
          <h3 className="text-3xl font-bold mb-4">CV Creator Pro</h3>
          
          <div className="mb-6">
            <span className="text-5xl font-bold">$9.99</span>
            <span className="text-violet-200 ml-2">/month</span>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Create CVs for FREE (no subscription needed!)</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Save Unlimited CVs</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Download as PDF</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>All Premium Templates</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Edit Anytime</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Priority Support</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Cancel Anytime</span>
            </div>
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full py-4 bg-white text-violet-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-lg"
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>

          <p className="text-center text-violet-200 text-sm mt-4">
            Cancel anytime. Billed monthly.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-block bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-green-900 text-lg mb-2">✨ Try Before You Buy!</h3>
          <p className="text-green-800 text-sm">You can create and preview CVs for FREE. Subscribe only when you're ready to save and download.</p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p className="text-sm">💳 Secure payment powered by Stripe</p>
        <p className="text-sm mt-2">🔒 Your billing info is encrypted and secure</p>
      </div>
    </div>
  )
}
