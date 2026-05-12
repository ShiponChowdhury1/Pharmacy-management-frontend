import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
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
