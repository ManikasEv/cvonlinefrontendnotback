import { useState, useEffect } from 'react'
import { useUser, useAuth } from '@clerk/react'
import { Link } from 'react-router-dom'

export default function SubscriptionStatus() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchStatus()
    }
  }, [user])

  const fetchStatus = async () => {
    try {
      const token = await getToken()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/subscription-status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setStatus(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const cancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will still have access until the end of your billing period.')) return
    
    try {
      const token = await getToken()
      await fetch(`${import.meta.env.VITE_API_URL}/api/payment/cancel-subscription`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      alert('Subscription cancelled. You will have access until the end of your billing period.')
      fetchStatus()
    } catch (err) {
      alert('Failed to cancel subscription')
    }
  }

  if (loading) return null

  if (!status?.hasPremium) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">No Active Subscription</h3>
            <p className="text-gray-600 text-sm mb-4">Subscribe to create unlimited professional CVs with premium templates.</p>
            <Link to="/pricing" className="inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors">
              Subscribe Now - $9.99/month
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusColor = {
    active: 'green',
    past_due: 'red',
    cancelled: 'gray'
  }[status.subscriptionStatus] || 'gray'

  return (
    <div className={`bg-${statusColor}-50 border border-${statusColor}-200 rounded-xl p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 bg-${statusColor}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
            <svg className={`w-5 h-5 text-${statusColor}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Active Subscription</h3>
            <p className="text-gray-600 text-sm">
              Status: <span className="font-medium capitalize">{status.subscriptionStatus}</span>
            </p>
            {status.subscriptionDetails?.currentPeriodEnd && (
              <p className="text-gray-600 text-sm">
                {status.subscriptionDetails.cancelAtPeriodEnd ? 'Ends' : 'Renews'} on: {new Date(status.subscriptionDetails.currentPeriodEnd).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        {status.subscriptionStatus === 'active' && !status.subscriptionDetails?.cancelAtPeriodEnd && (
          <button
            onClick={cancelSubscription}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Cancel Subscription
          </button>
        )}
      </div>
    </div>
  )
}
