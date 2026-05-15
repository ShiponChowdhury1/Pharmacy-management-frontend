import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../../store/features/auth/authApi";
import { clearTempData } from "../../store/features/auth/authSlice";

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-gray-400";

const labelCls =
  "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

export default function ResetPassword() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get email from Redux (set during forgot-password → OTP flow)
  const { tempEmail } = useSelector((state) => state.auth);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const getStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strengthLabel = ["", "Weak", "Fair", "Strong", "Very Strong"];
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-green-400", "bg-green-600"];
  const strength = getStrength(form.newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!tempEmail) {
      toast.error("Session expired. Please start the forgot password flow again.");
      navigate("/forgot-password");
      return;
    }

    setError("");

    try {
      const res = await resetPassword({
        email: tempEmail,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      }).unwrap();
      toast.success(res.message || "Password reset successful!");
      dispatch(clearTempData());
      setDone(true);
    } catch (err) {
      const msg = err?.data?.message || "Password reset failed. Please try again.";
      setError(msg);
      toast.error(msg);
    }
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

          {!done ? (
            <>
              <h2 className="text-base font-bold text-emerald-700 border-b border-emerald-100 pb-2 mb-2">
                🔒 Reset Password
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Create a new strong password for your account.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* New Password */}
                <div>
                  <label className={labelCls}>New Password</label>
                  <div className="relative">
                    <input
                      className={inputCls}
                      type={showNew ? "text" : "password"}
                      placeholder="Min 8 characters"
                      value={form.newPassword}
                      onChange={(e) => update("newPassword", e.target.value)}
                      style={{ paddingRight: "44px" }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                      {showNew ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {/* Strength Bar */}
                  {form.newPassword.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`flex-1 h-1 rounded-full transition-all ${
                              i <= strength ? strengthColor[strength] : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{strengthLabel[strength]}</p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className={labelCls}>Confirm New Password</label>
                  <div className="relative">
                    <input
                      className={inputCls}
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter new password"
                      value={form.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      style={{ paddingRight: "44px" }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                      {showConfirm ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {form.confirmPassword.length > 0 && form.newPassword !== form.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Resetting...
                    </span>
                  ) : "Reset Password ✓"}
                </button>
              </form>
            </>
          ) : (
            /* Success */
            <div className="text-center py-6 space-y-3">
              <div className="text-6xl">✅</div>
              <h3 className="text-xl font-bold text-emerald-700">Password Reset!</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Your password has been successfully updated.<br />
                You can now login with your new password.
              </p>
              <Link
                to="/login"
                className="inline-block w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-center mt-2"
              >
                Go to Login →
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}