import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/features/auth/authSlice'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGooglePlusG,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaPhone,
} from 'react-icons/fa'
import { MdLocalPharmacy } from 'react-icons/md'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features', hasDropdown: true },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isLoggedIn, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 140)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className="w-full relative z-50">

      {/* ====== TOP BAR ====== */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9 sm:h-10">
          <div className="flex items-center gap-2">
            <FaPhone className="text-[10px] sm:text-xs" />
            <span className="tracking-wide">Support: 1-800-88-44-99</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <a href="#" className="hover:text-teal-200 transition-colors duration-200" aria-label="Facebook">
              <FaFacebookF className="text-xs" />
            </a>
            <a href="#" className="hover:text-teal-200 transition-colors duration-200" aria-label="Twitter">
              <FaTwitter className="text-xs" />
            </a>
            <a href="#" className="hover:text-teal-200 transition-colors duration-200" aria-label="Instagram">
              <FaInstagram className="text-xs" />
            </a>
            <a href="#" className="hover:text-teal-200 transition-colors duration-200" aria-label="Google Plus">
              <FaGooglePlusG className="text-sm" />
            </a>
          </div>
        </div>
      </div>

      {/* ====== MIDDLE BAR ====== */}
      <div className="bg-white border-b border-gray-100 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 lg:gap-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md shadow-teal-500/25">
              <MdLocalPharmacy className="text-white text-lg sm:text-xl" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
              Pharma<span className="text-teal-500">Care</span>
            </span>
          </Link>

          {/* Right Actions — Desktop */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {user.profileImage || user.avatar ? (
                    <img src={user.profileImage || user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {(user?.name?.charAt(0) || user?.firstName?.charAt(0) || 'U').toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800 leading-none">
                      {user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '')}
                    </span>
                    <span className="text-[10px] text-gray-500 leading-none mt-1">{user.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(logout())}
                  className="px-4 py-1.5 text-sm font-semibold text-red-500 border border-red-200 rounded-full hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-semibold text-teal-600 border-2 border-teal-500 rounded-full hover:bg-teal-50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full shadow-md shadow-teal-500/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-700 hover:text-teal-500 transition-colors duration-200 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes className="text-xl sm:text-2xl" /> : <FaBars className="text-xl sm:text-2xl" />}
          </button>
        </div>
      </div>

      {/* ====== BOTTOM NAV BAR — Desktop ====== */}
      <nav
        className={`bg-white border-b border-gray-200 hidden lg:block transition-all duration-300 ${
          scrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center gap-1">
            {navLinks.map((item) => (
              <li key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-4 py-3.5 text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors duration-200"
                >
                  {item.label}
                  {item.hasDropdown && <FaChevronDown className="text-[8px] ml-0.5 opacity-60" />}
                </Link>
                {/* Hover underline effect */}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FaPhone className="text-teal-500 text-xs" />
            <span className="font-medium">1-800-88-44-99</span>
          </div>
        </div>
      </nav>

      {/* ====== MOBILE MENU OVERLAY ====== */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ====== MOBILE MENU PANEL ====== */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden transform transition-transform duration-300 ease-out overflow-y-auto ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-teal-500 to-cyan-500">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <MdLocalPharmacy className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold text-white">PharmaCare</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white p-1">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <div className="py-2">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center justify-between px-5 py-3.5 text-sm font-medium border-b border-gray-50 text-gray-700 hover:bg-teal-50 hover:text-teal-500 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.label}</span>
              {item.hasDropdown && <FaChevronDown className="text-[10px] text-gray-400" />}
            </Link>
          ))}
        </div>

        {/* Mobile Auth Buttons */}
        <div className="p-4 space-y-3 border-t border-gray-100">
          {isLoggedIn && user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {user.profileImage || user.avatar ? (
                  <img src={user.profileImage || user.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    {(user?.name?.charAt(0) || user?.firstName?.charAt(0) || 'U').toUpperCase()}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '')}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(logout())
                  setMenuOpen(false)
                }}
                className="block w-full text-center py-2.5 text-sm font-semibold text-red-500 border-2 border-red-200 rounded-full hover:bg-red-50 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-2.5 text-sm font-semibold text-teal-600 border-2 border-teal-500 rounded-full hover:bg-teal-50 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full shadow-md transition-all duration-200"
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Phone */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 text-gray-600">
            <FaPhone className="text-teal-500 text-sm" />
            <span className="text-sm">1-800-88-44-99</span>
          </div>
        </div>

        {/* Mobile Social */}
        <div className="px-4 pb-6">
          <div className="flex items-center gap-3 mt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaGooglePlusG].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-teal-500 hover:text-white transition-all duration-200"
              >
                <Icon className="text-xs" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}