import {
  MdMedication,
  MdAttachMoney,
  MdPeople,
  MdWarning,
  MdInventory,
  MdTrendingUp,
  MdPerson,
} from 'react-icons/md'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const monthlySalesData = [
  { name: 'Jan', sales: 32000 },
  { name: 'Feb', sales: 28000 },
  { name: 'Mar', sales: 45000 },
  { name: 'Apr', sales: 52000 },
  { name: 'May', sales: 61000 },
  { name: 'Jun', sales: 72000 },
]

const stockData = [
  { name: 'Pain Relief', stock: 450 },
  { name: 'Vitamins', stock: 550 },
  { name: 'Cold & Flu', stock: 280 },
  { name: 'Diabetes', stock: 410 },
]

const recentTransactions = [
  { id: 'TXN-001', customer: 'John Doe', amount: 124.50, time: '2 mins ago', status: 'Completed' },
  { id: 'TXN-002', customer: 'Sarah Smith', amount: 89.00, time: '15 mins ago', status: 'Completed' },
  { id: 'TXN-003', customer: 'Mike Johnson', amount: 210.75, time: '1 hour ago', status: 'Completed' },
  { id: 'TXN-004', customer: 'Emily Brown', amount: 56.25, time: '2 hours ago', status: 'Pending' },
  { id: 'TXN-005', customer: 'David Wilson', amount: 345.00, time: '3 hours ago', status: 'Completed' },
]

const statCards = [
  {
    icon: MdMedication,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    value: '1,234',
    label: 'Total Medicines',
    badge: '+12%',
    badgeColor: 'text-green-600',
  },
  {
    icon: MdAttachMoney,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    value: '$85,230',
    label: 'Total Sales',
    badge: '+18%',
    badgeColor: 'text-green-600',
  },
  {
    icon: MdPeople,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    value: '892',
    label: 'Total Customers',
    badge: '+5%',
    badgeColor: 'text-green-600',
  },
  {
    icon: MdWarning,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    value: '23',
    label: 'Low Stock Items',
    badge: 'Alert',
    badgeColor: 'text-red-500',
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here&apos;s your pharmacy overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                <card.icon className={`text-xl ${card.iconColor}`} />
              </div>
              <span className={`text-xs font-semibold ${card.badgeColor}`}>{card.badge}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Info Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <MdInventory className="text-lg" />
            <span className="text-sm font-medium">Expired Medicines</span>
          </div>
          <p className="text-3xl font-bold text-red-500">8</p>
          <p className="text-sm text-gray-500 mt-1">Remove from inventory</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <MdTrendingUp className="text-lg" />
            <span className="text-sm font-medium">Monthly Revenue</span>
          </div>
          <p className="text-3xl font-bold">$85,230</p>
          <p className="text-sm mt-1 opacity-80">+18% from last month</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <MdAttachMoney className="text-lg" />
            <span className="text-sm font-medium">Today&apos;s Sales</span>
          </div>
          <p className="text-3xl font-bold">$3,240</p>
          <p className="text-sm mt-1 opacity-80">45 transactions</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Monthly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlySalesData}>
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
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Stock Overview by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stockData}>
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
              <Bar dataKey="stock" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="divide-y divide-gray-100">
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdPerson className="text-gray-500 text-lg" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{txn.customer}</p>
                  <p className="text-xs text-gray-400">#{txn.id}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">${txn.amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">{txn.time}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    txn.status === 'Completed'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}
                >
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
