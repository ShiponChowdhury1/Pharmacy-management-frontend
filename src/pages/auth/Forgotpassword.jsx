import { useState } from "react";
import { Link } from "react-router-dom";

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-gray-400";

const labelCls =
  "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to send OTP
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 px-8 py-7 text-white text-center">
          <div className="text-4xl mb-2">💊</div>
          <h1 className="text-xl font-bold tracking-tight">PharmaCare</h1>
          <p className="text-emerald-100 text-sm mt-1">Pharmacy Management System</p>
        </div>

        {/* Form Body */}
        <div className="px-8 py-8">
          <h2 className="text-base font-bold text-emerald-700 border-b border-emerald-100 pb-2 mb-2">
            🔑 Forgot Password
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Enter your registered email. We'll send a 6-digit OTP to reset your password.
          </p>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelCls}>Email Address</label>
                <input
                  className={inputCls}
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Send OTP →
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="text-5xl">📧</div>
              <p className="text-sm font-semibold text-gray-700">OTP Sent!</p>
              <p className="text-xs text-gray-400">
                We sent a 6-digit OTP to <span className="text-emerald-600 font-semibold">{email}</span>.<br />
                Please check your inbox.
              </p>
              <Link
                to="/otp-verify"
                className="inline-block w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-center"
              >
                Verify OTP →
              </Link>
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-6">
            Remember your password?{" "}
            <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}