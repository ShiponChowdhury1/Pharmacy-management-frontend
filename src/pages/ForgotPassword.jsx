import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdMedication, MdEmail, MdArrowBack } from 'react-icons/md'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <MdMedication className="text-white text-2xl" />
            </div>
            <span className="text-xl font-bold text-gray-900">MediTrack</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
          <p className="mt-2 text-gray-500 text-sm">
            {submitted
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive a password reset link'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Illustration */}
              <div className="flex justify-center mb-2">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <MdEmail className="text-blue-600 text-4xl" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                <div className="relative">
                  <MdEmail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="text-center space-y-5">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Email Sent!</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We&apos;ve sent a password reset link to{' '}
                  <span className="font-semibold text-gray-700">{email}</span>.
                  Please check your inbox and follow the instructions.
                </p>
              </div>

              <Link
                to="/reset-password"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 shadow-lg shadow-blue-600/25"
              >
                Continue to Reset Password
              </Link>

              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Try a different email
              </button>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              <MdArrowBack className="text-base" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
