import { Link } from 'react-router-dom'
import { MdLocalPharmacy } from 'react-icons/md'
import {
  FaFacebookF, FaTwitter, FaInstagram, FaGooglePlusG,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronRight,
} from 'react-icons/fa'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const features = [
  'Stock Management',
  'Sales & Reports',
  'Supplier Management',
  'Invoice & Billing',
  'Expiry Alerts',
  'Multi-role Access',
]

const support = [
  'FAQs',
  'Documentation',
  'Privacy Policy',
  'Terms of Service',
  'Refund Policy',
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* Top Bar — Contact + Stats */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6 items-center text-center sm:text-left">

          {/* Phone */}
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaPhone className="text-teal-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">PharmaCare Support</p>
              <p className="text-lg font-bold text-white">1-800-88-44-99</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-teal-400">500+</p>
              <p className="text-xs text-gray-500">Pharmacies</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-teal-400">50K+</p>
              <p className="text-xs text-gray-500">Medicines</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-teal-400">99.9%</p>
              <p className="text-xs text-gray-500">Uptime</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 justify-center sm:justify-end">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaEnvelope className="text-teal-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Email Us</p>
              <p className="text-sm font-semibold text-white">support@pharmacare.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <MdLocalPharmacy className="text-white text-lg" />
              </div>
              <span className="text-lg font-bold text-white">
                Pharma<span className="text-teal-400">Care</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-xs">
              The all-in-one pharmacy management system to track stock, manage suppliers, generate reports and grow your business.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-teal-500 text-xs flex-shrink-0" />
                <span>123 Health Street, Medical City</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-teal-500 text-xs flex-shrink-0" />
                <span>1-800-88-44-99</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-teal-500 text-xs flex-shrink-0" />
                <span>support@pharmacare.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <FaChevronRight className="text-[8px] text-gray-600 group-hover:text-teal-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Features</h4>
            <ul className="space-y-2.5">
              {features.map((feat) => (
                <li key={feat}>
                  <a href="#features" className="text-sm text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 group">
                    <FaChevronRight className="text-[8px] text-gray-600 group-hover:text-teal-500 transition-colors" />
                    {feat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              {support.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 group">
                    <FaChevronRight className="text-[8px] text-gray-600 group-hover:text-teal-500 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + CTA */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-2 flex-wrap mb-5">
              {[
                { icon: FaFacebookF, color: 'hover:bg-blue-600' },
                { icon: FaTwitter, color: 'hover:bg-sky-500' },
                { icon: FaInstagram, color: 'hover:bg-pink-600' },
                { icon: FaGooglePlusG, color: 'hover:bg-red-600' },
              ].map(({ icon: Icon, color }, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-9 h-9 rounded-lg bg-gray-800 ${color} flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200`}
                >
                  <Icon className="text-xs" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-teal-600/20 to-emerald-600/20 border border-teal-500/20 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                Start managing your pharmacy smarter today.
              </p>
              <Link
                to="/register"
                className="block text-center text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-500 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} PharmaCare. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}