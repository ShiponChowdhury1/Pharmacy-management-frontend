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
import { useGetDashboardStatsQuery } from '../store/features/dashboard-stats/dashboardStatsApi'

export default function Dashboard() {
  const { data: response, isLoading, isError } = useGetDashboardStatsQuery()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)] text-red-500">
        Failed to load dashboard statistics.
      </div>
    )
  }

  const stats = response?.data || {}

  const statCards = [
    {
      icon: MdMedication,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      value: stats.totalMedicines || 0,
      label: 'Total Medicines',
      badge: '',
      badgeColor: 'text-green-600',
    },
    {
      icon: MdAttachMoney,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      value: `$${(stats.totalSalesAmount || 0).toLocaleString()}`,
      label: 'Total Sales',
      badge: '',
      badgeColor: 'text-green-600',
    },
    {
      icon: MdPeople,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      value: stats.totalCustomers || 0,
      label: 'Total Customers',
      badge: '',
      badgeColor: 'text-green-600',
    },
    {
      icon: MdWarning,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      value: stats.lowStockItems || 0,
      label: 'Low Stock Items',
      badge: 'Alert',
      badgeColor: 'text-red-500',
    },
  ]

  const recentTransactions = stats.recentTransactions || []

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
              {card.badge && (
                <span className={`text-xs font-semibold ${card.badgeColor}`}>{card.badge}</span>
              )}
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
          <p className="text-3xl font-bold text-red-500">{stats.expiredMedicines || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Remove from inventory</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <MdTrendingUp className="text-lg" />
            <span className="text-sm font-medium">Monthly Revenue</span>
          </div>
          <p className="text-3xl font-bold">${(stats.monthlyRevenue || 0).toLocaleString()}</p>
          <p className="text-sm mt-1 opacity-80">
            {stats.revenueGrowth > 0 ? `+${stats.revenueGrowth}%` : `${stats.revenueGrowth || 0}%`} from last month
          </p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <MdAttachMoney className="text-lg" />
            <span className="text-sm font-medium">Today&apos;s Sales</span>
          </div>
          <p className="text-3xl font-bold">${(stats.todaysSalesAmount || 0).toLocaleString()}</p>
          <p className="text-sm mt-1 opacity-80">{stats.todaysTransactions || 0} transactions</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Monthly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={stats.monthlySalesTrend || []}>
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
            <BarChart data={stats.stockOverviewByCategory || []}>
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
              <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        {recentTransactions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentTransactions.map((txn, i) => (
              <div key={txn._id || txn.id || i} className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                    <MdPerson className="text-gray-500 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {txn.customer?.name || txn.customerName || txn.customer || 'Guest User'}
                    </p>
                    <p className="text-xs text-gray-400">#{txn._id || txn.id || `TXN-${i}`}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(txn.totalAmount || txn.amount || 0).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {txn.createdAt ? new Date(txn.createdAt).toLocaleDateString() : (txn.time || 'N/A')}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      (txn.status || '').toLowerCase() === 'completed'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {txn.status || 'Completed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No recent transactions found.
          </div>
        )}
      </div>
    </div>
  )
}
