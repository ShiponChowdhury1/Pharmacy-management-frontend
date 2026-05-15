import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../store/features/auth/authApi";
import { setTempEmail } from "../../store/features/auth/authSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form state for all 3 steps
  const [form, setForm] = useState({
    // Step 1 — Account Info
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    // Step 2 — Pharmacy Info
    pharmacyName: "",
    address: "",
    city: "",
    district: "",
    pharmacyPhone: "",
    licenseNumber: "",
    pharmacyEmail: "",
    // Step 3 — Verification
    nidNumber: "",
    drugLicenseNo: "",
    ownerName: "",
    agreeTerms: false,
  });

  const [register, { isLoading }] = useRegisterMutation();

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const goBack = () => setCurrent((p) => Math.max(p - 1, 0));

  // Validate each step
  const validateStep = () => {
    if (current === 0) {
      if (!form.fullName || !form.email || !form.phone || !form.password || !form.confirmPassword || !form.role) {
        toast.error("Please fill all account fields");
        return false;
      }
      if (form.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return false;
      }
      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match");
        return false;
      }
    }
    if (current === 1) {
      if (!form.pharmacyName || !form.address || !form.city || !form.district || !form.pharmacyPhone || !form.licenseNumber) {
        toast.error("Please fill all pharmacy fields");
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setCurrent((p) => Math.min(p + 1, 3));
  };

  // Submit registration to the API (Step 3 → Submit)
  const handleSubmit = async () => {
    if (!form.nidNumber || !form.drugLicenseNo || !form.ownerName) {
      toast.error("Please fill all verification fields");
      return;
    }
    if (!form.agreeTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      confirmPassword: form.confirmPassword,
      role: form.role.toLowerCase(),
      pharmacyName: form.pharmacyName,
      address: form.address,
      city: form.city,
      district: form.district,
      pharmacyPhone: form.pharmacyPhone,
      licenseNumber: form.licenseNumber,
      pharmacyEmail: form.pharmacyEmail,
      nidNumber: form.nidNumber,
      drugLicenseNo: form.drugLicenseNo,
      ownerName: form.ownerName,
    };

    try {
      const res = await register(payload).unwrap();
      toast.success(res.message || "Registration OTP sent to your email");
      // Save email + purpose so OTP page knows context
      dispatch(setTempEmail({ email: form.email, purpose: "register" }));
      // Navigate to OTP verification
      navigate("/otp-verify");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed. Please try again.");
    }
  };

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
                <input className={inputCls} placeholder="e.g. Md. Rahim Uddin" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Email Address</label>
                <input className={inputCls} type="email" placeholder="example@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Phone Number</label>
                <input className={inputCls} type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Password</label>
                  <input className={inputCls} type="password" placeholder="Min 8 chars" value={form.password} onChange={(e) => update("password", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Confirm Password</label>
                  <input className={inputCls} type="password" placeholder="Re-enter" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Role</label>
                <select className={inputCls} value={form.role} onChange={(e) => update("role", e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
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
                <input className={inputCls} placeholder="e.g. Al-Amin Pharmacy" value={form.pharmacyName} onChange={(e) => update("pharmacyName", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Street / Area Address</label>
                <input className={inputCls} placeholder="Road, Area" value={form.address} onChange={(e) => update("address", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>City</label>
                  <input className={inputCls} placeholder="Dhaka" value={form.city} onChange={(e) => update("city", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>District</label>
                  <input className={inputCls} placeholder="District" value={form.district} onChange={(e) => update("district", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Pharmacy Phone</label>
                  <input className={inputCls} type="tel" placeholder="+880..." value={form.pharmacyPhone} onChange={(e) => update("pharmacyPhone", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>License Number</label>
                  <input className={inputCls} placeholder="LIC-XXXX" value={form.licenseNumber} onChange={(e) => update("licenseNumber", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Pharmacy Email (Optional)</label>
                <input className={inputCls} type="email" placeholder="pharmacy@email.com" value={form.pharmacyEmail} onChange={(e) => update("pharmacyEmail", e.target.value)} />
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
                  <input className={inputCls} placeholder="17-digit NID" value={form.nidNumber} onChange={(e) => update("nidNumber", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Drug License No.</label>
                  <input className={inputCls} placeholder="DL-XXXXX" value={form.drugLicenseNo} onChange={(e) => update("drugLicenseNo", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Owner Name</label>
                <input className={inputCls} placeholder="Owner Full Name" value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} />
              </div>
              <UploadBox icon="📄" label="Upload Trade License" />
              <UploadBox icon="💊" label="Upload Drug License" />
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-0.5 accent-emerald-600 w-4 h-4" checked={form.agreeTerms} onChange={(e) => update("agreeTerms", e.target.checked)} />
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
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Submitting...
                  </span>
                ) : "Submit ✓"}
              </button>
            )}
            {current === 3 && (
              <Link
                to="/login"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white text-sm font-bold shadow-md text-center"
              >
                Go to Login
              </Link>
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