"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const navigate = useNavigate()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

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
      navigate("/login")
      setLoading(false)
    }, 1000)
  }

  const handleResend = async () => {
    setResending(true)
    setTimeLeft(60)

    // Simulate API call
    setTimeout(() => {
      setResending(false)
    }, 1000)
  }

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

          <div className="mx-auto h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600 mb-2">We've sent a 6-digit verification code to</p>
          <p className="text-gray-900 font-medium mb-6">john@company.com</p>
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
              "Verify Email"
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Didn't receive the code?</p>
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-500">Resend code in {timeLeft} seconds</p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-orange-600 hover:text-orange-700 font-medium disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend Code"}
              </button>
            )}
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

export default EmailVerification
