import { useState } from 'react'
import { MdSearch, MdAdd, MdEdit, MdDelete, MdFilterList } from 'react-icons/md'

const categories = ['All', 'Antibiotics', 'Pain Relief', 'Vitamins', 'Diabetes', 'Allergy', 'Digestive', 'Cardiovascular']

const categoryColors = {
  Antibiotics: 'bg-blue-50 text-blue-600',
  'Pain Relief': 'bg-orange-50 text-orange-600',
  Vitamins: 'bg-green-50 text-green-600',
  Diabetes: 'bg-purple-50 text-purple-600',
  Allergy: 'bg-pink-50 text-pink-600',
  Digestive: 'bg-teal-50 text-teal-600',
  Cardiovascular: 'bg-red-50 text-red-600',
}

const medicinesData = [
  { id: 1, name: 'Amoxicillin 500mg', generic: 'Amoxicillin', category: 'Antibiotics', supplier: 'PharmaCorp', price: 12.50, stock: 450, expiry: '2027-08-15' },
  { id: 2, name: 'Ibuprofen 400mg', generic: 'Ibuprofen', category: 'Pain Relief', supplier: 'MediSupply', price: 8.75, stock: 320, expiry: '2026-12-20' },
  { id: 3, name: 'Vitamin D3 1000IU', generic: 'Cholecalciferol', category: 'Vitamins', supplier: 'HealthPlus', price: 15.00, stock: 550, expiry: '2028-03-10' },
  { id: 4, name: 'Paracetamol 500mg', generic: 'Acetaminophen', category: 'Pain Relief', supplier: 'PharmaCorp', price: 6.25, stock: 18, expiry: '2026-11-30' },
  { id: 5, name: 'Metformin 850mg', generic: 'Metformin', category: 'Diabetes', supplier: 'MediCare Ltd', price: 22.00, stock: 410, expiry: '2027-05-18' },
  { id: 6, name: 'Cetirizine 10mg', generic: 'Cetirizine', category: 'Allergy', supplier: 'HealthPlus', price: 9.50, stock: 15, expiry: '2026-09-25' },
  { id: 7, name: 'Omeprazole 20mg', generic: 'Omeprazole', category: 'Digestive', supplier: 'PharmaCorp', price: 18.75, stock: 280, expiry: '2027-07-12' },
  { id: 8, name: 'Aspirin 75mg', generic: 'Acetylsalicylic Acid', category: 'Cardiovascular', supplier: 'MediSupply', price: 5.50, stock: 520, expiry: '2028-01-05' },
]

export default function Medicines() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = medicinesData.filter((med) => {
    const matchSearch =
      med.name.toLowerCase().includes(search.toLowerCase()) ||
      med.generic.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || med.category === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medicine Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your pharmacy inventory</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <MdAdd className="text-lg" />
          Add Medicine
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search medicines by name or generic name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
        <div className="relative">
          <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Medicine Name</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Generic Name</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((med) => (
                <tr key={med.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{med.name}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{med.generic}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[med.category] || 'bg-gray-100 text-gray-600'}`}>
                      {med.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{med.supplier}</td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">${med.price.toFixed(2)}</td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-semibold ${med.stock <= 20 ? 'text-red-500' : 'text-green-600'}`}>
                      {med.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{med.expiry}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <MdEdit className="text-lg" />
                      </button>
                      <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No medicines found.</div>
        )}
      </div>
    </div>
  )
}
