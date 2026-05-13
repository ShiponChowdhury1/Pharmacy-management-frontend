import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Register from '../pages/Register'
import OtpVerify from '../pages/OtpVerify'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import AdminLayout from '../admin/AdminLayout'
import Dashboard from '../admin/Dashboard'
import Medicines from '../admin/Medicines'
import Suppliers from '../admin/Suppliers'
import Customers from '../admin/Customers'
import Sales from '../admin/Sales'
import Reports from '../admin/Reports'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  // Auth pages (no layout wrapper – standalone pages)
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/otp-verify', element: <OtpVerify /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  // Admin
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'medicines', element: <Medicines /> },
      { path: 'suppliers', element: <Suppliers /> },
      { path: 'customers', element: <Customers /> },
      { path: 'sales', element: <Sales /> },
      { path: 'reports', element: <Reports /> },
    ],
  },
])

export default router
