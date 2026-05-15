import { useState } from 'react'
import {
  MdPerson,
  MdStorefront,
  MdNotifications,
  MdSecurity,
  MdTune,
  MdEdit,
  MdSave,
  MdPhotoCamera,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdLanguage,
  MdDarkMode,
  MdVisibility,
  MdVisibilityOff,
  MdCheckCircle,
} from 'react-icons/md'

const tabs = [
  { id: 'profile', label: 'Profile', icon: MdPerson },
  { id: 'pharmacy', label: 'Pharmacy', icon: MdStorefront },
  { id: 'notifications', label: 'Notifications', icon: MdNotifications },
  { id: 'security', label: 'Security', icon: MdSecurity },
  { id: 'system', label: 'System', icon: MdTune },
]

function Toggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function InputField({ label, icon: Icon, type = 'text', value, onChange, placeholder, disabled = false }) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="text-lg" />
          </div>
        )}
        <input
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-10' : 'pr-4'} py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <MdVisibilityOff className="text-lg" /> : <MdVisibility className="text-lg" />}
          </button>
        )}
      </div>
    </div>
  )
}

function SectionCard({ title, description, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  )
}

// ─── Profile Tab ───────────────────────────────────
function ProfileTab() {
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@meditrack.com',
    phone: '+880 1234-567890',
    role: 'Administrator',
    bio: 'Pharmacy administrator managing MediTrack system.',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <SectionCard title="Profile Photo" description="Update your profile picture">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              AU
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm">
              <MdPhotoCamera className="text-sm" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500 mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
            <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Upload New Photo
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Personal Info */}
      <SectionCard title="Personal Information" description="Update your personal details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            icon={MdPerson}
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            placeholder="First name"
          />
          <InputField
            label="Last Name"
            icon={MdPerson}
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            placeholder="Last name"
          />
          <InputField
            label="Email Address"
            icon={MdEmail}
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="Email"
          />
          <InputField
            label="Phone Number"
            icon={MdPhone}
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            placeholder="Phone"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          />
        </div>
      </SectionCard>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
          }`}
        >
          {saved ? (
            <>
              <MdCheckCircle className="text-lg" /> Saved!
            </>
          ) : (
            <>
              <MdSave className="text-lg" /> Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Pharmacy Tab ──────────────────────────────────
function PharmacyTab() {
  const [pharmacy, setPharmacy] = useState({
    name: 'MediTrack Pharmacy',
    license: 'PH-2024-001234',
    address: '123 Health Street, Dhaka 1205',
    city: 'Dhaka',
    state: 'Dhaka Division',
    zip: '1205',
    country: 'Bangladesh',
    taxId: 'TIN-123456789',
    openTime: '08:00',
    closeTime: '22:00',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <SectionCard title="Pharmacy Details" description="Manage your pharmacy information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Pharmacy Name"
            icon={MdStorefront}
            value={pharmacy.name}
            onChange={(e) => setPharmacy({ ...pharmacy, name: e.target.value })}
          />
          <InputField
            label="License Number"
            value={pharmacy.license}
            onChange={(e) => setPharmacy({ ...pharmacy, license: e.target.value })}
          />
          <div className="md:col-span-2">
            <InputField
              label="Address"
              icon={MdLocationOn}
              value={pharmacy.address}
              onChange={(e) => setPharmacy({ ...pharmacy, address: e.target.value })}
            />
          </div>
          <InputField
            label="City"
            value={pharmacy.city}
            onChange={(e) => setPharmacy({ ...pharmacy, city: e.target.value })}
          />
          <InputField
            label="State / Division"
            value={pharmacy.state}
            onChange={(e) => setPharmacy({ ...pharmacy, state: e.target.value })}
          />
          <InputField
            label="ZIP / Postal Code"
            value={pharmacy.zip}
            onChange={(e) => setPharmacy({ ...pharmacy, zip: e.target.value })}
          />
          <InputField
            label="Country"
            icon={MdLanguage}
            value={pharmacy.country}
            onChange={(e) => setPharmacy({ ...pharmacy, country: e.target.value })}
          />
        </div>
      </SectionCard>

      <SectionCard title="Business Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Tax ID / TIN"
            value={pharmacy.taxId}
            onChange={(e) => setPharmacy({ ...pharmacy, taxId: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Opening Time</label>
              <input
                type="time"
                value={pharmacy.openTime}
                onChange={(e) => setPharmacy({ ...pharmacy, openTime: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Closing Time</label>
              <input
                type="time"
                value={pharmacy.closeTime}
                onChange={(e) => setPharmacy({ ...pharmacy, closeTime: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
          }`}
        >
          {saved ? (
            <>
              <MdCheckCircle className="text-lg" /> Saved!
            </>
          ) : (
            <>
              <MdSave className="text-lg" /> Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Notifications Tab ─────────────────────────────
function NotificationsTab() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    lowStock: true,
    expiry: true,
    dailyReport: false,
    weeklyReport: true,
    newSale: true,
    newCustomer: false,
    systemUpdates: true,
    promotions: false,
  })

  const toggle = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))

  const notifGroups = [
    {
      title: 'Alert Channels',
      description: 'Choose how you receive alerts',
      items: [
        { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive alerts via email' },
        { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive alerts via SMS' },
      ],
    },
    {
      title: 'Inventory Alerts',
      description: 'Stock and expiry notifications',
      items: [
        { key: 'lowStock', label: 'Low Stock Warning', desc: 'Alert when stock falls below threshold' },
        { key: 'expiry', label: 'Expiry Alerts', desc: 'Alert for medicines nearing expiry date' },
      ],
    },
    {
      title: 'Reports',
      description: 'Automated report delivery',
      items: [
        { key: 'dailyReport', label: 'Daily Report', desc: 'Receive daily sales summary' },
        { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive weekly performance report' },
      ],
    },
    {
      title: 'Activity',
      description: 'Activity-based notifications',
      items: [
        { key: 'newSale', label: 'New Sale', desc: 'Notify on every new sale' },
        { key: 'newCustomer', label: 'New Customer', desc: 'Notify when a new customer registers' },
        { key: 'systemUpdates', label: 'System Updates', desc: 'Important system announcements' },
        { key: 'promotions', label: 'Promotions', desc: 'Marketing and promotional alerts' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {notifGroups.map((group) => (
        <SectionCard key={group.title} title={group.title} description={group.description}>
          <div className="divide-y divide-gray-100">
            {group.items.map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
                <Toggle enabled={notifications[key]} onToggle={() => toggle(key)} />
              </div>
            ))}
          </div>
        </SectionCard>
      ))}
    </div>
  )
}

// ─── Security Tab ──────────────────────────────────
function SecurityTab() {
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [twoFA, setTwoFA] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const sessions = [
    { device: 'Chrome on Windows', ip: '192.168.1.105', time: 'Active now', current: true },
    { device: 'Firefox on macOS', ip: '10.0.0.42', time: '2 hours ago', current: false },
    { device: 'Mobile App (Android)', ip: '172.16.0.8', time: '1 day ago', current: false },
  ]

  return (
    <div className="space-y-6">
      <SectionCard title="Change Password" description="Ensure your account stays secure">
        <div className="space-y-4 max-w-md">
          <InputField
            label="Current Password"
            type="password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            placeholder="Enter current password"
          />
          <InputField
            label="New Password"
            type="password"
            value={passwords.newPass}
            onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
            placeholder="Enter new password"
          />
          <InputField
            label="Confirm New Password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            placeholder="Confirm new password"
          />
        </div>
        <div className="mt-5">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
            }`}
          >
            {saved ? (
              <>
                <MdCheckCircle className="text-lg" /> Updated!
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Two-Factor Authentication" description="Add an extra layer of security">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {twoFA ? 'Enabled' : 'Disabled'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {twoFA
                ? 'Your account is protected with 2FA'
                : 'Enable 2FA for additional security'}
            </p>
          </div>
          <Toggle enabled={twoFA} onToggle={() => setTwoFA(!twoFA)} />
        </div>
      </SectionCard>

      <SectionCard title="Active Sessions" description="Manage your active login sessions">
        <div className="divide-y divide-gray-100">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  {s.device}
                  {s.current && (
                    <span className="text-[10px] font-semibold bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  IP: {s.ip} · {s.time}
                </p>
              </div>
              {!s.current && (
                <button className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

// ─── System Tab ────────────────────────────────────
function SystemTab() {
  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'Asia/Dhaka',
    currency: 'BDT',
    dateFormat: 'DD/MM/YYYY',
    darkMode: false,
    autoBackup: true,
    lowStockThreshold: '50',
    expiryWarning: '30',
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <SectionCard title="Regional Settings" description="Configure language, timezone and formats">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="en">English</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
              <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
              <option value="America/New_York">America/New_York (GMT-5)</option>
              <option value="Europe/London">Europe/London (GMT+0)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="BDT">BDT (৳)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Date Format</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Appearance">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <MdDarkMode className="text-xl text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Dark Mode</p>
              <p className="text-xs text-gray-500 mt-0.5">Switch to dark theme</p>
            </div>
          </div>
          <Toggle
            enabled={settings.darkMode}
            onToggle={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
          />
        </div>
      </SectionCard>

      <SectionCard title="Inventory Preferences" description="Configure stock alert thresholds">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Low Stock Threshold"
            type="number"
            value={settings.lowStockThreshold}
            onChange={(e) => setSettings({ ...settings, lowStockThreshold: e.target.value })}
            placeholder="Minimum stock count"
          />
          <InputField
            label="Expiry Warning (days)"
            type="number"
            value={settings.expiryWarning}
            onChange={(e) => setSettings({ ...settings, expiryWarning: e.target.value })}
            placeholder="Days before expiry"
          />
        </div>
      </SectionCard>

      <SectionCard title="Data & Backup">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Auto Backup</p>
            <p className="text-xs text-gray-500 mt-0.5">Automatically backup data daily</p>
          </div>
          <Toggle
            enabled={settings.autoBackup}
            onToggle={() => setSettings({ ...settings, autoBackup: !settings.autoBackup })}
          />
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
            Import Data
          </button>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
          }`}
        >
          {saved ? (
            <>
              <MdCheckCircle className="text-lg" /> Saved!
            </>
          ) : (
            <>
              <MdSave className="text-lg" /> Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Main Settings Page ────────────────────────────
export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')

  const renderTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />
      case 'pharmacy':
        return <PharmacyTab />
      case 'notifications':
        return <NotificationsTab />
      case 'security':
        return <SecurityTab />
      case 'system':
        return <SystemTab />
      default:
        return <ProfileTab />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account, pharmacy, and system preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-1.5 flex flex-wrap gap-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === id
                ? 'bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon className="text-lg" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTab()}
    </div>
  )
}
