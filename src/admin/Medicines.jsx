import { useState } from 'react'
import { MdSearch, MdAdd, MdEdit, MdDelete, MdFilterList, MdClose, MdVisibility } from 'react-icons/md'
import toast from 'react-hot-toast'
import {
  useGetMedicinesQuery,
  useAddMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} from '../store/features/medicine/medicineApi'

const categories = ['All', 'Fever & Pain', 'Antibiotic', 'Gastric', 'Allergy', 'Dehydration', 'Vitamin']

const categoryColors = {
  Antibiotic: 'bg-blue-50 text-blue-600',
  'Fever & Pain': 'bg-orange-50 text-orange-600',
  Vitamin: 'bg-green-50 text-green-600',
  Gastric: 'bg-purple-50 text-purple-600',
  Allergy: 'bg-pink-50 text-pink-600',
  Dehydration: 'bg-teal-50 text-teal-600',
}

export default function Medicines() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [viewingData, setViewingData] = useState(null)

  const initialForm = {
    name: '',
    genericName: '',
    category: 'Fever & Pain',
    brand: '',
    price: '',
    costPrice: '',
    quantity: '',
    unit: 'pcs',
    expiryDate: ''
  }
  
  const [formData, setFormData] = useState(initialForm)

  // RTK Query Hooks
  const { data: response, isLoading } = useGetMedicinesQuery()
  const [addMedicine, { isLoading: isAdding }] = useAddMedicineMutation()
  const [updateMedicine, { isLoading: isUpdating }] = useUpdateMedicineMutation()
  const [deleteMedicine] = useDeleteMedicineMutation()

  const medicinesData = response?.data || []

  // Derived filtered data
  const filtered = medicinesData.filter((med) => {
    const matchSearch =
      med.name.toLowerCase().includes(search.toLowerCase()) ||
      med.genericName?.toLowerCase().includes(search.toLowerCase()) ||
      med.brand?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || med.category === filter
    return matchSearch && matchFilter
  })

  // Handlers
  const handleOpenModal = (med = null) => {
    if (med) {
      setEditingId(med._id)
      setFormData({
        name: med.name || '',
        genericName: med.genericName || '',
        category: med.category || 'Fever & Pain',
        brand: med.brand || '',
        price: med.price || '',
        costPrice: med.costPrice || '',
        quantity: med.quantity || '',
        unit: med.unit || 'pcs',
        expiryDate: med.expiryDate ? new Date(med.expiryDate).toISOString().split('T')[0] : ''
      })
    } else {
      setEditingId(null)
      setFormData(initialForm)
    }
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await deleteMedicine(id).unwrap()
        toast.success("Medicine deleted successfully")
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete medicine")
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        costPrice: Number(formData.costPrice),
        quantity: Number(formData.quantity)
      }

      if (editingId) {
        await updateMedicine({ id: editingId, ...payload }).unwrap()
        toast.success("Medicine updated successfully")
      } else {
        await addMedicine(payload).unwrap()
        toast.success("Medicine added successfully")
      }
      setIsModalOpen(false)
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save medicine")
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medicine Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your pharmacy inventory</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
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
            placeholder="Search medicines by name, generic, or brand..."
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
        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Medicine Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Generic Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price / Cost</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((med) => (
                  <tr key={med._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{med.name}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{med.genericName}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[med.category] || 'bg-gray-100 text-gray-600'}`}>
                        {med.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{med.brand}</td>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">
                      ${med.price?.toFixed(2)} <span className="text-xs text-gray-400 font-normal ml-1">/ ${med.costPrice?.toFixed(2)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-semibold ${med.quantity <= 20 ? 'text-red-500' : 'text-green-600'}`}>
                        {med.quantity} {med.unit}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {med.expiryDate ? new Date(med.expiryDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { setViewingData(med); setIsViewModalOpen(true); }}
                          className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" 
                          title="View Details"
                        >
                          <MdVisibility className="text-lg" />
                        </button>
                        <button 
                          onClick={() => handleOpenModal(med)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                          title="Edit"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button 
                          onClick={() => handleDelete(med._id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Delete"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">No medicines found.</div>
          )}
        </div>
      </div>

      {/* Modal Overlay & Content */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? 'Edit Medicine' : 'Add New Medicine'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <MdClose className="text-xl" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g. Ace 500mg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Generic Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="genericName"
                    required
                    value={formData.genericName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g. Paracetamol"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="brand"
                    required
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g. Square"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price / MRP ($) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price ($) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    step="0.01"
                    name="costPrice"
                    required
                    value={formData.costPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity/Stock <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="e.g. 100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit <span className="text-red-500">*</span></label>
                  <select
                    name="unit"
                    required
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  >
                    <option value="pcs">Pcs</option>
                    <option value="box">Box</option>
                    <option value="bottle">Bottle</option>
                    <option value="strip">Strip</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="expiryDate"
                    required
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding || isUpdating}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center"
                >
                  {(isAdding || isUpdating) ? 'Saving...' : (editingId ? 'Update Medicine' : 'Add Medicine')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Modal */}
      {isViewModalOpen && viewingData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-900">Medicine Details</h3>
              <button 
                onClick={() => { setIsViewModalOpen(false); setViewingData(null); }}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <MdClose className="text-xl" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-sm font-semibold text-gray-900">{viewingData.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Generic Name</p>
                  <p className="text-sm font-semibold text-gray-900">{viewingData.genericName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Category</p>
                  <p className="text-sm font-semibold text-gray-900">{viewingData.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Brand</p>
                  <p className="text-sm font-semibold text-gray-900">{viewingData.brand}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Sell Price</p>
                  <p className="text-sm font-semibold text-gray-900">${viewingData.price?.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Cost Price</p>
                  <p className="text-sm font-semibold text-gray-900">${viewingData.costPrice?.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stock</p>
                  <p className={`text-sm font-semibold ${viewingData.quantity <= 20 ? 'text-red-500' : 'text-gray-900'}`}>
                    {viewingData.quantity} {viewingData.unit}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {viewingData.expiryDate ? new Date(viewingData.expiryDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="col-span-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Added On</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {viewingData.createdAt ? new Date(viewingData.createdAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => { setIsViewModalOpen(false); setViewingData(null); }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
