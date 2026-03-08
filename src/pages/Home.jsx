import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/react'

export default function Home() {
  const { isSignedIn } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-violet-50 to-white">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold">
              ✨ Try for FREE - No Credit Card Required
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Create Your Perfect CV
              <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mt-2">
                In Minutes
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional CV templates with live preview. Create and design for FREE, 
              subscribe only when you're ready to download.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={isSignedIn ? '/cv/create' : '/sign-up'}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Start Creating FREE
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-4 bg-white text-violet-600 border-2 border-violet-600 rounded-xl font-semibold text-lg hover:bg-violet-50 transition-all"
              >
                View Pricing
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              🎨 No subscription needed to create and preview • Subscribe at $9.99/mo to save & download
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose CV Creator?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Try for FREE</h3>
              <p className="text-gray-600">
                Create and preview your CV completely free. No credit card needed. Subscribe only when ready to download.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Templates</h3>
              <p className="text-gray-600">
                Choose from beautiful, ATS-friendly templates designed by professionals. Stand out from the crowd.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Preview</h3>
              <p className="text-gray-600">
                See your CV update in real-time as you type. What you see is what you get.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Create for FREE</h3>
              <p className="text-gray-600">
                Fill in your information and see your CV come to life. No payment required.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Template</h3>
              <p className="text-gray-600">
                Select from our professional templates and customize the look.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Subscribe & Download</h3>
              <p className="text-gray-600">
                When you're happy, subscribe for $9.99/mo to save and download as PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Create Your Professional CV?
          </h2>
          <p className="text-xl text-violet-100 mb-8">
            Start for free today. No credit card required.
          </p>
          <Link
            to={isSignedIn ? '/cv/create' : '/sign-up'}
            className="inline-block px-8 py-4 bg-white text-violet-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl"
          >
            Get Started Now - It's FREE!
          </Link>
          <p className="text-sm text-violet-200 mt-4">
            Subscribe at $9.99/month only when you're ready to download
          </p>
        </div>
      </section>
    </div>
  )
}
