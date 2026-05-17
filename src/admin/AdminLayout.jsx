import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/features/auth/authSlice'
import {
  MdDashboard,
  MdMedication,
  MdLocalShipping,
  MdPeople,
  MdPointOfSale,
  MdAssessment,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose,
} from 'react-icons/md'

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', icon: MdDashboard, end: true },
  { to: '/admin/medicines', label: 'Medicines', icon: MdMedication },
  // { to: '/admin/suppliers', label: 'Suppliers', icon: MdLocalShipping },
  { to: '/admin/customers', label: 'Customers', icon: MdPeople },
  { to: '/admin/sales', label: 'Sales', icon: MdPointOfSale },
  { to: '/admin/reports', label: 'Reports', icon: MdAssessment },
  { to: '/admin/settings', label: 'Settings', icon: MdSettings },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[220px] bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <MdMedication className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">MediTrack</h1>
            <p className="text-[11px] text-gray-400 leading-tight">Admin Panel</p>
          </div>
          <button
            className="ml-auto lg:hidden text-gray-500"
            onClick={() => setSidebarOpen(false)}
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="text-lg flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-3 border-t border-gray-100 flex flex-col gap-2">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2">
              {user?.profileImage || user?.avatar ? (
                <img src={user.profileImage || user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {(user?.name?.charAt(0) || user?.firstName?.charAt(0) || 'U').toUpperCase()}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '')}
                </p>
                <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-150"
          >
            <MdLogout className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <button
            className="lg:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <MdMenu className="text-2xl" />
          </button>
          <div className="lg:block hidden" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '')}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              {user?.profileImage || user?.avatar ? (
                <img src={user.profileImage || user.avatar} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {(user?.name?.charAt(0) || user?.firstName?.charAt(0) || 'U').toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="h-6 w-px bg-gray-200"></div>

            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Logout"
            >
              <MdLogout className="text-xl" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
