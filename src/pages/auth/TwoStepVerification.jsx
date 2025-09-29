"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const TwoStepVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState("sms") // sms, email, authenticator
  const navigate = useNavigate()

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      
      setCode(newCode)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const verificationCode = code.join("")
    if (verificationCode.length !== 6) {
      alert("Please enter the complete verification code")
      return
    }
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("authToken", "dummy-token")
      navigate("/dashboard")
      setLoading(false)
    }, 1000)
  }

  const getMethodInfo = () => {
    switch (method) {
      case "sms":
        return {
          icon: (
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          ),
          title: "SMS Verification",
          description: "We've sent a 6-digit code to your phone number ending in ****1234",
        }
      case "email":
        return {
          icon: (
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          ),
          title: "Email Verification",
          description: "We've sent a 6-digit code to your email address",
        }
      case "authenticator":
        return {
          icon: (
            <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          ),
          title: "Authenticator App",
          description: "Enter the 6-digit code from your authenticator app",
        }
      default:
        return {}
    }
  }

  const methodInfo = getMethodInfo()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">SmartHR</span>
            </div>
          </div>

          <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            {methodInfo.icon}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">{methodInfo.title}</h2>
          <p className="text-gray-600 mb-6">{methodInfo.description}</p>
        </div>

        {/* Method Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Choose verification method:</p>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="method"
                value="sms"
                checked={method === "sms"}
                onChange={(e) => setMethod(e.target.value)}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">SMS to ****1234</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="method"
                value="email"
                checked={method === "email"}
                onChange={(e) => setMethod(e.target.value)}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Email to j***@company.com</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="method"
                value="authenticator"
                checked={method === "authenticator"}
                onChange={(e) => setMethod(e.target.value)}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Authenticator App</span>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">Enter Verification Code</label>
            <div className="flex justify-center space-x-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                />
              ))}
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
                Verifying...
              </div>
            ) : (
              "Verify & Continue"
            )}
          </button>

          <div className="text-center">
            <button type="button" className="text-orange-600 hover:text-orange-700 font-medium">
              Resend Code
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">
              ← Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TwoStepVerification
