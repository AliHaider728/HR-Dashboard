"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LockScreen = ({ setIsAuthenticated }) => {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("authToken", "dummy-token")
      setIsAuthenticated(true)
      navigate("/dashboard")
      setLoading(false)
    }, 1000)
    
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-300 rounded-full opacity-30"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-red-300 rounded-full opacity-25"></div>

      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            {/* User Avatar */}
            <div className="mx-auto h-24 w-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-3xl font-bold text-white">JD</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back, John!</h2>
            <p className="text-gray-600">Enter your password to unlock your session</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Unlocking...
                </div>
              ) : (
                "Unlock"
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleLogout}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Sign in as different user
              </button>
            </div>
          </form>

          {/* Session Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Session locked at 2:30 PM</span>
              <span>Auto-lock: 15 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockScreen
