import { Link } from 'react-router-dom'
import { MdLocalPharmacy } from 'react-icons/md'
import {
  FaFacebookF, FaTwitter, FaInstagram, FaGooglePlusG,
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcStripe,
  FaGooglePlay, FaApple, FaChevronRight,
} from 'react-icons/fa'

const quickLinks = ['Home', 'Shop', 'About Us', 'Blog', 'Contact']
const categories = ['Medicines', 'Health Products', 'Supplements', 'Medical Devices', 'Personal Care']
const support = ['FAQs', 'Shipping Policy', 'Return Policy', 'Privacy Policy', 'Terms of Service']

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* App Download + Contact Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {/* Contact */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaPhone className="text-teal-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Medilazar</p>
              <p className="text-lg font-bold text-white">1-800-88-44-99</p>
            </div>
          </div>

          {/* App Download */}
          <div className="flex items-center gap-3 justify-center">
            <span className="text-sm text-gray-400 hidden sm:inline">Download the app now!</span>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-2 rounded-lg transition-colors">
                <FaGooglePlay className="text-teal-400 text-sm" />
                <div className="text-left">
                  <p className="text-[8px] text-gray-500 leading-none">GET IT ON</p>
                  <p className="text-[10px] sm:text-xs font-semibold text-white leading-tight">Google Play</p>
                </div>
              </button>
              <button className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-2 rounded-lg transition-colors">
                <FaApple className="text-white text-base" />
                <div className="text-left">
                  <p className="text-[8px] text-gray-500 leading-none">Download on</p>
                  <p className="text-[10px] sm:text-xs font-semibold text-white leading-tight">App Store</p>
                </div>
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 lg:justify-end">
            <span className="text-xs text-gray-500">We accept:</span>
            <div className="flex gap-2 text-2xl text-gray-500">
              <FaCcVisa className="hover:text-blue-400 transition-colors cursor-pointer" />
              <FaCcMastercard className="hover:text-red-400 transition-colors cursor-pointer" />
              <FaCcPaypal className="hover:text-blue-500 transition-colors cursor-pointer" />
              <FaCcStripe className="hover:text-purple-400 transition-colors cursor-pointer" />
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
              <span className="text-lg font-bold text-white">Medi<span className="text-teal-400">lazar</span></span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-xs">
              Your trusted online pharmacy for medicines, health products, and wellness essentials.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-teal-500 text-xs flex-shrink-0" /><span>123 Health Street, Medical City</span></div>
              <div className="flex items-center gap-2"><FaPhone className="text-teal-500 text-xs flex-shrink-0" /><span>1-800-88-44-99</span></div>
              <div className="flex items-center gap-2"><FaEnvelope className="text-teal-500 text-xs flex-shrink-0" /><span>support@medilazar.com</span></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 group">
                    <FaChevronRight className="text-[8px] text-gray-600 group-hover:text-teal-500 transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat}>
                  <a href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 group">
                    <FaChevronRight className="text-[8px] text-gray-600 group-hover:text-teal-500 transition-colors" />
                    {cat}
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

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-2 flex-wrap">
              {[
                { icon: FaFacebookF, color: 'hover:bg-blue-600' },
                { icon: FaTwitter, color: 'hover:bg-sky-500' },
                { icon: FaInstagram, color: 'hover:bg-pink-600' },
                { icon: FaGooglePlusG, color: 'hover:bg-red-600' },
              ].map(({ icon: Icon, color }, i) => (
                <a key={i} href="#"
                  className={`w-9 h-9 rounded-lg bg-gray-800 ${color} flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200`}>
                  <Icon className="text-xs" />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              Stay connected for the latest deals and health tips.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Medilazar. All rights reserved.</p>
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
