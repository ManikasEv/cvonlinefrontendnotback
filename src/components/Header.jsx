import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CV Creator</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Pricing
            </Link>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                  Get Started
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors hidden md:block">
                Dashboard
              </Link>
              <Link to="/cv/create" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                Create CV
              </Link>
              <UserButton afterSignOutUrl="/" />
            </Show>
          </nav>
        </div>
      </div>
    </header>
  )
}
