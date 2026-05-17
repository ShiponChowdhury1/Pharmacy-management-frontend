import { useState } from 'react'
import { MdSearch, MdPerson, MdAdd, MdClose } from 'react-icons/md'
import { useGetCustomersQuery, useAddCustomerMutation } from '../store/features/customers/customersApi'
import toast from 'react-hot-toast'

const getInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

const getColor = (name) => {
  if (!name) return 'bg-blue-600'
  const colors = ['bg-blue-600', 'bg-gray-600', 'bg-green-600', 'bg-purple-600', 'bg-indigo-600', 'bg-pink-600', 'bg-amber-600', 'bg-teal-600']
  let sum = 0
  for(let i=0; i<name.length; i++) sum += name.charCodeAt(i)
  return colors[sum % colors.length]
}

export default function Customers() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' })

  const { data: apiResponse, isLoading } = useGetCustomersQuery()
  const customersData = apiResponse?.data || []
  
  const [addCustomer, { isLoading: isAdding }] = useAddCustomerMutation()

  const filtered = customersData.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search)
  )

  const summaryCards = [
    { label: 'Total Customers', value: customersData.length },
    { label: 'Active', value: customersData.filter(c => c.totalPurchases > 0).length, color: 'text-green-600' },
    { 
      label: 'Avg. Purchase Value', 
      value: customersData.length ? `$${(customersData.reduce((acc, curr) => acc + (curr.totalSpent || 0), 0) / customersData.length).toFixed(2)}` : '$0.00', 
      color: 'text-green-600' 
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name) return toast.error("Name is required")
    
    try {
      const res = await addCustomer(formData).unwrap()
      if (res.success) {
        toast.success("Customer added successfully")
        setIsAddModalOpen(false)
        setFormData({ name: '', email: '', phone: '', address: '' })
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add customer")
    }
  }

  if (isLoading) {
    return <div className="text-center py-10 font-medium text-gray-500">Loading customers...</div>
  }

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-500 text-sm mt-1">View and manage your customer database</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center"
        >
          <MdAdd className="text-lg" />
          Add Customer
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
          placeholder="Search customers by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
      </div>

      {/* Customer List + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-3">
          {filtered.length > 0 ? filtered.map((customer) => (
            <div
              key={customer._id}
              onClick={() => setSelected(customer)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selected?._id === customer._id
                  ? 'border-blue-300 ring-2 ring-blue-100'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${getColor(customer.name)} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                  {getInitials(customer.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                  <p className="text-xs text-gray-400">{customer.email || 'No email provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-400">Total Purchases</p>
                  <p className="text-sm font-bold text-gray-900">{customer.totalPurchases || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Spent</p>
                  <p className="text-sm font-bold text-green-600">${(customer.totalSpent || 0).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-5 text-gray-500">No customers found</div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-6">
          {selected ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className={`w-16 h-16 ${getColor(selected.name)} rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3`}>
                  {getInitials(selected.name)}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
                <p className="text-sm text-gray-500">{selected.email || 'N/A'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Purchases</p>
                  <p className="text-xl font-bold text-gray-900">{selected.totalPurchases || 0}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                  <p className="text-xl font-bold text-green-600">${(selected.totalSpent || 0).toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="text-sm font-bold text-gray-900">{selected.phone || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Address</p>
                  <p className="text-sm font-bold text-gray-900">{selected.address || 'N/A'}</p>
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
      
      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Add New Customer</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
                  placeholder="Enter complete address"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isAdding ? 'Adding...' : 'Add Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
