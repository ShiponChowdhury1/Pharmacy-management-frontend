import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const inputs = useRef([]);
  const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, val) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    setError("");
    if (val && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pasted.forEach((char, i) => {
      if (/\d/.test(char)) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputs.current[Math.min(pasted.length, 5)].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    // Call API to verify OTP
    navigate("/reset-password");
  };

  const handleResend = () => {
    setTimer(60);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    // Call API to resend OTP
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
            🔢 Verify OTP
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Enter the 6-digit OTP sent to your email address.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* OTP Boxes */}
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
                    ${digit ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-gray-50 text-gray-800"}
                    focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100`}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 text-center">{error}</p>
            )}

            {/* Timer & Resend */}
            <div className="text-center text-xs text-gray-400">
              {timer > 0 ? (
                <span>
                  Resend OTP in{" "}
                  <span className="text-emerald-600 font-bold">
                    0:{timer.toString().padStart(2, "0")}
                  </span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Verify OTP →
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Back to{" "}
            <Link to="/forgot-password" className="text-emerald-600 font-semibold hover:underline">
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}