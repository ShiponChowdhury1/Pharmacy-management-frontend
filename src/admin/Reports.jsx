import { useState } from 'react'
import { MdFileDownload, MdCalendarToday } from 'react-icons/md'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const revenueData = [
  { name: 'Jan', revenue: 42000, expenses: 28000 },
  { name: 'Feb', revenue: 38000, expenses: 25000 },
  { name: 'Mar', revenue: 55000, expenses: 30000 },
  { name: 'Apr', revenue: 62000, expenses: 32000 },
  { name: 'May', revenue: 71000, expenses: 35000 },
  { name: 'Jun', revenue: 85000, expenses: 38000 },
]

const categoryData = [
  { name: 'Pain Relief', value: 28 },
  { name: 'Vitamins', value: 22 },
  { name: 'Antibiotics', value: 18 },
  { name: 'Diabetes', value: 15 },
  { name: 'Allergy', value: 10 },
  { name: 'Others', value: 7 },
]

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#6b7280']

const topMedicines = [
  { name: 'Amoxicillin 500mg', sales: 324, revenue: '$4,050' },
  { name: 'Ibuprofen 400mg', sales: 289, revenue: '$2,529' },
  { name: 'Vitamin D3 1000IU', sales: 256, revenue: '$3,840' },
  { name: 'Metformin 850mg', sales: 198, revenue: '$4,356' },
  { name: 'Paracetamol 500mg', sales: 178, revenue: '$1,113' },
]

const dailySales = [
  { name: 'Mon', sales: 3200 },
  { name: 'Tue', sales: 4100 },
  { name: 'Wed', sales: 3800 },
  { name: 'Thu', sales: 5200 },
  { name: 'Fri', sales: 4600 },
  { name: 'Sat', sales: 6100 },
  { name: 'Sun', sales: 2800 },
]

export default function Reports() {
  const [period, setPeriod] = useState('monthly')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-500 text-sm mt-1">Comprehensive analytics for your pharmacy</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <MdFileDownload className="text-lg" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$353,000', change: '+18%', positive: true },
          { label: 'Total Expenses', value: '$188,000', change: '+8%', positive: false },
          { label: 'Net Profit', value: '$165,000', change: '+28%', positive: true },
          { label: 'Profit Margin', value: '46.7%', change: '+5%', positive: true },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{card.label}</p>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
            <span className={`text-xs font-medium ${card.positive ? 'text-green-600' : 'text-red-500'}`}>
              {card.change}
            </span>
          </div>
        ))}
      </div>

      {/* Revenue vs Expenses Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Revenue vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Two Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Sales */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Daily Sales This Week</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Medicines */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Top Selling Medicines</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rank</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Medicine</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Units Sold</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topMedicines.map((med, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-amber-700' : 'bg-gray-300'
                    }`}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{med.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{med.sales}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">{med.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
