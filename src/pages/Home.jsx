import { Link } from 'react-router-dom'
import {
  MdMedication,
  MdShoppingCart,
  MdPeople,
  MdAssessment,
  MdLocalShipping,
  MdSecurity,
  MdCheckCircle,
  MdSend,
} from 'react-icons/md'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const chartData = [
  { name: 'Mon', val: 3200 },
  { name: 'Tue', val: 4800 },
  { name: 'Wed', val: 3900 },
  { name: 'Thu', val: 5200 },
  { name: 'Fri', val: 4600 },
  { name: 'Sat', val: 6100 },
  { name: 'Sun', val: 5500 },
]

const features = [
  {
    icon: MdMedication,
    title: 'Medicine Management',
    desc: 'Track inventory, expiry dates, and stock levels with real-time alerts for low stock items.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MdShoppingCart,
    title: 'Sales Tracking',
    desc: 'Process sales quickly, generate invoices, and maintain complete transaction history.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: MdPeople,
    title: 'Customer Management',
    desc: 'Maintain customer records, purchase history, and build lasting relationships.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: MdAssessment,
    title: 'Reports & Analytics',
    desc: 'Generate comprehensive reports and gain insights with powerful analytics tools.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: MdLocalShipping,
    title: 'Supplier Management',
    desc: 'Manage supplier information, orders, and maintain healthy supply chains.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: MdSecurity,
    title: 'Secure & Reliable',
    desc: 'Bank-level security with regular backups and data protection compliance.',
    color: 'bg-teal-50 text-teal-600',
  },
]

const whyChoose = [
  'Easy to use interface with minimal training required',
  'Real-time inventory tracking and automated alerts',
  'Comprehensive reporting and analytics dashboard',
  '24/7 customer support and regular updates',
]

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-gray-900 leading-tight tracking-tight">
                Modern Pharmacy Management Made{' '}
                <span className="text-blue-600">Simple</span>
              </h1>
              <p className="mt-5 text-lg text-gray-500 leading-relaxed">
                Streamline your pharmacy operations with MediTrack – the complete solution for inventory, sales, and customer management.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30"
                >
                  Get Started
                </Link>
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-7 py-3 rounded-lg text-sm font-semibold transition-all duration-200">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right - Dashboard Preview Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/70 border border-gray-100 p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$45,231</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <MdAssessment className="text-blue-600 text-xl" />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" tick={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="val" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section id="features" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Everything you need to manage your pharmacy efficiently
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <feat.icon className="text-2xl" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About MediTrack</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                MediTrack is a comprehensive pharmacy management system designed to simplify and streamline daily pharmacy operations. Built with modern technology and user-centric design, we help pharmacies of all sizes manage their inventory, sales, and customer relationships.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Our platform provides real-time insights, automated alerts, and powerful reporting tools that enable pharmacy owners to make data-driven decisions and focus on what matters most – serving their customers.
              </p>

              {/* Stats */}
              <div className="flex gap-8">
                {[
                  { value: '500+', label: 'Pharmacies' },
                  { value: '50K+', label: 'Transactions' },
                  { value: '99.9%', label: 'Uptime' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Why Choose Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white w-full max-w-md shadow-xl">
                <h3 className="text-xl font-bold mb-6">Why Choose MediTrack?</h3>
                <div className="space-y-4">
                  {whyChoose.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <MdCheckCircle className="text-green-300 text-xl flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-100 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Get In Touch</h2>
            <p className="mt-3 text-gray-500">
              Have questions? We&apos;d love to hear from you.
            </p>
          </div>

          <form
            className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              <MdSend className="text-lg" />
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
