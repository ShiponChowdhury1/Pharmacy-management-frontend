import { useState } from 'react'
import { MdSearch, MdPerson } from 'react-icons/md'

const customersData = [
  { id: 1, name: 'John Doe', email: 'john.doe@email.com', purchases: 45, spent: 1250.50, initials: 'JD', color: 'bg-blue-600' },
  { id: 2, name: 'Sarah Smith', email: 'sarah.smith@email.com', purchases: 32, spent: 890.00, initials: 'SS', color: 'bg-gray-600' },
  { id: 3, name: 'Mike Johnson', email: 'mike.j@email.com', purchases: 67, spent: 2100.75, initials: 'MJ', color: 'bg-green-600' },
  { id: 4, name: 'Emily Brown', email: 'emily.brown@email.com', purchases: 18, spent: 450.25, initials: 'EB', color: 'bg-purple-600' },
  { id: 5, name: 'David Wilson', email: 'david.w@email.com', purchases: 89, spent: 3450.00, initials: 'DW', color: 'bg-indigo-600' },
  { id: 6, name: 'Lisa Anderson', email: 'lisa.a@email.com', purchases: 56, spent: 1680.50, initials: 'LA', color: 'bg-pink-600' },
  { id: 7, name: 'James Taylor', email: 'james.t@email.com', purchases: 23, spent: 780.00, initials: 'JT', color: 'bg-amber-600' },
  { id: 8, name: 'Maria Garcia', email: 'maria.g@email.com', purchases: 41, spent: 1320.25, initials: 'MG', color: 'bg-teal-600' },
]

const summaryCards = [
  { label: 'Total Customers', value: '8' },
  { label: 'Active This Month', value: '156', color: 'text-green-600' },
  { label: 'New This Month', value: '24', color: 'text-blue-600' },
  { label: 'Avg. Purchase Value', value: '$124.50', color: 'text-green-600' },
]

export default function Customers() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = customersData.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
        <p className="text-gray-500 text-sm mt-1">View and manage your customer database</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color || 'text-gray-900'}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search customers by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
      </div>

      {/* Customer List + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-3">
          {filtered.map((customer) => (
            <div
              key={customer.id}
              onClick={() => setSelected(customer)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selected?.id === customer.id
                  ? 'border-blue-300 ring-2 ring-blue-100'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${customer.color} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                  {customer.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                  <p className="text-xs text-gray-400">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-400">Total Purchases</p>
                  <p className="text-sm font-bold text-gray-900">{customer.purchases}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Spent</p>
                  <p className="text-sm font-bold text-green-600">${customer.spent.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-6">
          {selected ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className={`w-16 h-16 ${selected.color} rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3`}>
                  {selected.initials}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
                <p className="text-sm text-gray-500">{selected.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Purchases</p>
                  <p className="text-xl font-bold text-gray-900">{selected.purchases}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                  <p className="text-xl font-bold text-green-600">${selected.spent.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Recent Purchases</h4>
                <div className="space-y-2">
                  {[
                    { date: 'May 10, 2026', item: 'Amoxicillin 500mg', amount: '$12.50' },
                    { date: 'May 8, 2026', item: 'Vitamin D3', amount: '$15.00' },
                    { date: 'May 5, 2026', item: 'Ibuprofen 400mg', amount: '$8.75' },
                  ].map((purchase, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-sm text-gray-900">{purchase.item}</p>
                        <p className="text-xs text-gray-400">{purchase.date}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{purchase.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <MdPerson className="text-5xl mb-3 opacity-50" />
              <p className="text-base font-medium text-gray-500">No Customer Selected</p>
              <p className="text-sm text-gray-400 mt-1">Select a customer from the list to view their details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
