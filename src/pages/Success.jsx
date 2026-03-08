import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Success() {
  const [searchParams] = useSearchParams()
  const [verifying, setVerifying] = useState(true)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // Wait a moment for webhook to process
    setTimeout(() => {
      setVerifying(false)
    }, 2000)
  }, [])

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-violet-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing your subscription...</h2>
          <p className="text-gray-600">Please wait a moment</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Subscription Active!</h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for subscribing to CV Creator Pro! You now have unlimited access to create professional CVs with all premium templates.
        </p>

        <div className="bg-violet-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
          <ul className="text-left space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Unlimited CV Creation
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              All Premium Templates
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Priority Support
            </li>
          </ul>
        </div>

        <Link
          to="/cv/create"
          className="block w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all mb-4"
        >
          Create Your First CV
        </Link>

        <Link
          to="/dashboard"
          className="block w-full py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Go to Dashboard
        </Link>

        <p className="text-xs text-gray-500 mt-6">
          Session ID: {sessionId?.slice(0, 20)}...
        </p>
      </div>
    </div>
  )
}
