import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGooglePlusG,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaTruck,
  FaChevronDown,
  FaPhone,
  FaHeart,
} from 'react-icons/fa'
import { MdLocalPharmacy } from 'react-icons/md'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop', hasDropdown: true },
  { label: 'Page', href: '#', hasDropdown: true },
  { label: 'Blog', href: '#' },
  { label: 'On sale', href: '#', isSale: true },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
            <FaTruck className="text-[10px] sm:text-xs" />
            <span className="tracking-wide">Free Shipping for all Order of $99</span>
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
              Medi<span className="text-teal-500">lazar</span>
            </span>
          </Link>

          {/* Search Bar — Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl">
            <div className="flex w-full rounded-full border-2 border-teal-500 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 px-5 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                id="navbar-search"
              />
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 transition-colors duration-200 flex items-center"
                aria-label="Search"
              >
                <FaSearch className="text-sm" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Sign in / Sign up — Desktop */}
            <div className="hidden lg:flex items-center gap-2 text-gray-600">
              <FaUser className="text-base text-teal-500" />
              <div className="text-sm leading-tight">
                <Link to="/login" className="hover:text-teal-500 transition-colors duration-200">Sign in</Link>
                <span className="text-gray-400"> / </span>
                <Link to="/register" className="hover:text-teal-500 transition-colors duration-200">Sign up</Link>
              </div>
            </div>

            {/* Wishlist */}
            <button className="hidden sm:flex relative text-gray-600 hover:text-teal-500 transition-colors duration-200" aria-label="Wishlist">
              <FaHeart className="text-lg" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
            </button>

            {/* Cart */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <FaShoppingCart className="text-lg sm:text-xl text-gray-600 group-hover:text-teal-500 transition-colors duration-200" />
                <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-[9px] sm:text-[10px] rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">0</span>
              </div>
              <span className="text-sm font-semibold text-gray-800 hidden sm:inline">$0.00</span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gray-700 hover:text-teal-500 transition-colors duration-200 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {menuOpen ? <FaTimes className="text-xl sm:text-2xl" /> : <FaBars className="text-xl sm:text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* ====== BOTTOM NAV BAR — Desktop ====== */}
      <nav
        className={`bg-white border-b border-gray-200 hidden lg:block transition-all duration-300 ${
          scrolled
            ? 'fixed top-0 left-0 right-0 z-50 shadow-lg animate-slideDown'
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center gap-1">
            {navLinks.map((item) => (
              <li key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-3.5 text-sm font-medium transition-colors duration-200 ${
                    item.isSale
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-700 hover:text-teal-500'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && <FaChevronDown className="text-[8px] ml-0.5 opacity-60" />}
                  {item.isSale && (
                    <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider ml-1">
                      Sale
                    </span>
                  )}
                </Link>
                {/* Hover underline effect */}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
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
            <span className="text-lg font-bold text-white">Medilazar</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white p-1">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex rounded-full border-2 border-teal-500 overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-4 py-2.5 text-sm outline-none"
            />
            <button className="bg-teal-500 text-white px-4">
              <FaSearch className="text-sm" />
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        <div className="py-2">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center justify-between px-5 py-3.5 text-sm font-medium border-b border-gray-50 transition-colors duration-200 ${
                item.isSale
                  ? 'text-red-500 hover:bg-red-50'
                  : 'text-gray-700 hover:bg-teal-50 hover:text-teal-500'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                {item.label}
                {item.isSale && (
                  <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold">SALE</span>
                )}
              </span>
              {item.hasDropdown && <FaChevronDown className="text-[10px] text-gray-400" />}
            </Link>
          ))}
        </div>

        {/* Mobile Auth */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 text-gray-600">
            <FaUser className="text-teal-500" />
            <Link to="/login" className="text-sm hover:text-teal-500" onClick={() => setMenuOpen(false)}>Sign in</Link>
            <span className="text-gray-300">/</span>
            <Link to="/register" className="text-sm hover:text-teal-500" onClick={() => setMenuOpen(false)}>Sign up</Link>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FaPhone className="text-teal-500 text-sm" />
            <span className="text-sm">1-800-88-44-99</span>
          </div>
        </div>

        {/* Mobile Social */}
        <div className="px-4 pb-6">
          <div className="flex items-center gap-3 mt-4">
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
