import { useState } from 'react'
import { MdSearch, MdAdd, MdEdit, MdDelete, MdEmail, MdPhone, MdLocationOn, MdStar } from 'react-icons/md'

const suppliersData = [
  { id: 1, name: 'PharmaCorp', contact: 'John Smith', email: 'john@pharmacorp.com', phone: '+1 234-567-8900', address: '123 Medical Ave, New York, NY 10001', products: 145, rating: 4.8 },
  { id: 2, name: 'MediSupply', contact: 'Sarah Johnson', email: 'sarah@medisupply.com', phone: '+1 234-567-8901', address: '456 Health St, Boston, MA 02108', products: 98, rating: 4.5 },
  { id: 3, name: 'HealthPlus', contact: 'Mike Wilson', email: 'mike@healthplus.com', phone: '+1 234-567-8902', address: '789 Pharma Rd, Chicago, IL 60601', products: 120, rating: 4.7 },
  { id: 4, name: 'MediCare Ltd', contact: 'Emily Brown', email: 'emily@medicare.com', phone: '+1 234-567-8903', address: '321 Care Blvd, Los Angeles, CA 90001', products: 87, rating: 4.6 },
  { id: 5, name: 'Global Pharma', contact: 'David Lee', email: 'david@globalpharma.com', phone: '+1 234-567-8904', address: '555 International Dr, Miami, FL 33101', products: 162, rating: 4.9 },
]

export default function Suppliers() {
  const [search, setSearch] = useState('')

  const filtered = suppliersData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contact.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Supplier Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your pharmacy suppliers</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <MdAdd className="text-lg" />
          Add Supplier
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search suppliers by name or contact person..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">{supplier.name}</h3>
                <p className="text-sm text-gray-500">{supplier.contact}</p>
              </div>
              <div className="flex items-center gap-1">
                <MdStar className="text-amber-400 text-lg" />
                <span className="text-sm font-semibold text-gray-700">{supplier.rating}</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MdEmail className="text-gray-400 flex-shrink-0" />
                <span className="truncate">{supplier.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MdPhone className="text-gray-400 flex-shrink-0" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MdLocationOn className="text-gray-400 flex-shrink-0" />
                <span className="truncate">{supplier.address}</span>
              </div>
            </div>

            {/* Products Count */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Total Products</span>
              <span className="text-lg font-bold text-green-600">{supplier.products}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 border border-blue-200 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                <MdEdit className="text-base" />
                Edit
              </button>
              <button className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <MdDelete className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-sm">No suppliers found.</div>
      )}
    </div>
  )
}
