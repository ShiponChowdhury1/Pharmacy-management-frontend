import { useState } from "react";
import { Link } from "react-router-dom";

const steps = ["Account", "Pharmacy", "Verify", "Done"];

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-gray-400";

const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

function UploadBox({ icon, label }) {
  return (
    <div className="border-2 border-dashed border-emerald-200 rounded-xl p-4 text-center bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 cursor-pointer transition-all">
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-xs text-gray-600 font-medium">{label}</p>
      <p className="text-xs text-emerald-600 mt-1">PDF, JPG, PNG (max 2MB)</p>
    </div>
  );
}

export default function PharmacyRegister() {
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((p) => Math.min(p + 1, 3));
  const goBack = () => setCurrent((p) => Math.max(p - 1, 0));

  const progressWidth = `${((current + 1) / steps.length) * 100}%`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 px-8 py-7 text-white text-center">
          <div className="text-4xl mb-2">💊</div>
          <h1 className="text-xl font-bold tracking-tight">PharmaCare</h1>
          <p className="text-emerald-100 text-sm mt-1">Pharmacy Management System</p>
        </div>

        {/* Step Indicators */}
        <div className="px-8 pt-6">
          <div className="flex items-center justify-between mb-2">
            {steps.map((label, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                    ${i < current ? "bg-emerald-500 border-emerald-500 text-white"
                    : i === current ? "bg-white border-emerald-500 text-emerald-600"
                    : "bg-gray-100 border-gray-200 text-gray-400"}`}
                >
                  {i < current ? "✓" : i + 1}
                </div>
                <span className={`text-xs mt-1 font-semibold ${i === current ? "text-emerald-600" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="px-8 pb-8">

          {/* Step 1: Account Info */}
          {current === 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-emerald-700 border-b border-emerald-100 pb-2">
                👤 Account Information
              </h2>
              <div>
                <label className={labelCls}>Full Name</label>
                <input className={inputCls} placeholder="e.g. Md. Rahim Uddin" />
              </div>
              <div>
                <label className={labelCls}>Email Address</label>
                <input className={inputCls} type="email" placeholder="example@email.com" />
              </div>
              <div>
                <label className={labelCls}>Phone Number</label>
                <input className={inputCls} type="tel" placeholder="+880 1XXX-XXXXXX" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Password</label>
                  <input className={inputCls} type="password" placeholder="Min 8 chars" />
                </div>
                <div>
                  <label className={labelCls}>Confirm Password</label>
                  <input className={inputCls} type="password" placeholder="Re-enter" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Role</label>
                <select className={inputCls}>
                  <option value="">Select Role</option>
                  <option>Admin</option>
                  <option>Pharmacist</option>
                  <option>Manager</option>
                  <option>Staff</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Pharmacy Info */}
          {current === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-emerald-700 border-b border-emerald-100 pb-2">
                🏪 Pharmacy Information
              </h2>
              <div>
                <label className={labelCls}>Pharmacy Name</label>
                <input className={inputCls} placeholder="e.g. Al-Amin Pharmacy" />
              </div>
              <div>
                <label className={labelCls}>Street / Area Address</label>
                <input className={inputCls} placeholder="Road, Area" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>City</label>
                  <input className={inputCls} placeholder="Dhaka" />
                </div>
                <div>
                  <label className={labelCls}>District</label>
                  <input className={inputCls} placeholder="District" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Pharmacy Phone</label>
                  <input className={inputCls} type="tel" placeholder="+880..." />
                </div>
                <div>
                  <label className={labelCls}>License Number</label>
                  <input className={inputCls} placeholder="LIC-XXXX" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Pharmacy Email (Optional)</label>
                <input className={inputCls} type="email" placeholder="pharmacy@email.com" />
              </div>
            </div>
          )}

          {/* Step 3: Verify */}
          {current === 2 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-emerald-700 border-b border-emerald-100 pb-2">
                📎 Verification Documents
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>NID Number</label>
                  <input className={inputCls} placeholder="17-digit NID" />
                </div>
                <div>
                  <label className={labelCls}>Drug License No.</label>
                  <input className={inputCls} placeholder="DL-XXXXX" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Owner Name</label>
                <input className={inputCls} placeholder="Owner Full Name" />
              </div>
              <UploadBox icon="📄" label="Upload Trade License" />
              <UploadBox icon="💊" label="Upload Drug License" />
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-0.5 accent-emerald-600 w-4 h-4" />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I agree to the{" "}
                  <span className="text-emerald-600 font-semibold">Terms & Conditions</span>{" "}
                  and{" "}
                  <span className="text-emerald-600 font-semibold">Privacy Policy</span>
                </span>
              </label>
            </div>
          )}

          {/* Step 4: Success */}
          {current === 3 && (
            <div className="text-center py-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">Registration Successful!</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your pharmacy account has been created.<br />
                Admin will verify your documents within <strong>24 hours</strong>.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            {current > 0 && current < 3 && (
              <button
                onClick={goBack}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
              >
                ← Back
              </button>
            )}
            {current < 2 && (
              <button
                onClick={goNext}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Next →
              </button>
            )}
            {current === 2 && (
              <button
                onClick={goNext}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                Submit ✓
              </button>
            )}
            {current === 3 && (
              <button
                onClick={() => setCurrent(0)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md"
              >
                Go to Login
              </button>
            )}
          </div>

          {current < 3 && (
            <p className="text-center text-xs text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
  Login here
</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}