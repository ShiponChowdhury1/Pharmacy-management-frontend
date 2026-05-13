import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdMedication, MdRefresh } from 'react-icons/md'

export default function OtpVerify() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(59)
  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const data = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newOtp = [...otp]
    data.split('').forEach((char, i) => {
      newOtp[i] = char
    })
    setOtp(newOtp)
    const nextIndex = Math.min(data.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleResend = () => {
    setTimer(59)
    setOtp(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length === 6) {
      // Handle OTP verification
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
          <h1 className="text-3xl font-bold text-gray-900">Verify OTP</h1>
          <p className="mt-2 text-gray-500 text-sm">
            We&apos;ve sent a 6-digit code to your email
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          {/* Email display */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500">Code sent to</p>
            <p className="text-sm font-semibold text-gray-900">admin@meditrack.com</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                    digit
                      ? 'border-blue-500 bg-blue-50/50 text-blue-600'
                      : 'border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend code in{' '}
                  <span className="font-semibold text-blue-600">
                    0:{timer.toString().padStart(2, '0')}
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  <MdRefresh className="text-lg" />
                  Resend Code
                </button>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Verify & Continue
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Didn&apos;t receive the code?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Change Email
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
