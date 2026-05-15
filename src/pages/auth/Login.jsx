import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useLoginMutation, useLoginAsRoleMutation } from "../../store/features/auth/authApi";
import { setCredentials } from "../../store/features/auth/authSlice";

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-gray-400";

const labelCls =
  "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [loginAsRole, { isLoading: isRoleLoading }] = useLoginAsRoleMutation();

  const isLoading = isLoginLoading || isRoleLoading;

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  // Normal login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const res = await login({ email: form.email, password: form.password }).unwrap();
      toast.success(res.message || "Login successful!");
      dispatch(
        setCredentials({
          user: res.user,
          token: res.token,
          refreshToken: res.refreshToken,
        })
      );
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  // Role-based quick login
  const handleRoleLogin = async (role) => {
    if (!form.email || !form.password) {
      toast.error("Please enter email and password first");
      return;
    }

    try {
      const res = await loginAsRole({
        email: form.email,
        password: form.password,
        role: role.toLowerCase(),
      }).unwrap();
      toast.success(res.message || `Logged in as ${role}`);
      dispatch(
        setCredentials({
          user: res.user,
          token: res.token,
          refreshToken: res.refreshToken,
        })
      );
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || `Failed to login as ${role}`);
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
          <h2 className="text-base font-bold text-emerald-700 border-b border-emerald-100 pb-2 mb-6">
            🔐 Sign In to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className={labelCls}>Email Address</label>
              <input
                className={inputCls}
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className={labelCls}>Password</label>
              <div className="relative">
                <input
                  className={inputCls}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  style={{ paddingRight: "44px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 text-lg transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => update("remember", e.target.checked)}
                  className="accent-emerald-600 w-4 h-4"
                />
                <span className="text-xs text-gray-600 font-medium">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-xs text-emerald-600 font-semibold cursor-pointer hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Logging in...
                </span>
              ) : "Login →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Role Quick Select */}
          <p className="text-xs text-gray-400 text-center mb-3 font-medium uppercase tracking-wide">
            Login as
          </p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { label: "Admin", icon: "🛡️" },
              { label: "Pharmacist", icon: "💊" },
              { label: "Manager", icon: "📊" },
            ].map((r) => (
              <button
                key={r.label}
                type="button"
                disabled={isLoading}
                onClick={() => handleRoleLogin(r.label)}
                className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-lg">{r.icon}</span>
                {r.label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}