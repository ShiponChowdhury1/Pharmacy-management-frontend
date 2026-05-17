import { useState } from 'react'
import { MdAdd, MdDelete, MdPrint, MdSave } from 'react-icons/md'
import { useGetCustomersQuery } from '../store/features/customers/customersApi'
import { useGetMedicinesQuery } from '../store/features/medicine/medicineApi'
import { useAddSaleMutation } from '../store/features/sales/salesApi'
import toast from 'react-hot-toast'

const paymentMethods = ['Cash', 'Card', 'Online']

export default function Sales() {
  const { data: customerRes } = useGetCustomersQuery()
  const customersList = customerRes?.data || []

  const { data: medRes } = useGetMedicinesQuery()
  const medicinesList = medRes?.data || []

  const [addSale, { isLoading: isSelling }] = useAddSaleMutation()

  const [customer, setCustomer] = useState('')
  const [payment, setPayment] = useState('Cash')
  const [selectedMedicine, setSelectedMedicine] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [items, setItems] = useState([])

  const invoiceNumber = `INV-${Math.floor(Math.random() * 900000 + 100000)}`
  const today = new Date().toLocaleDateString('en-US')

  const handleAdd = () => {
    if (!selectedMedicine) return
    const med = medicinesList.find((m) => m._id === selectedMedicine)
    if (!med) return

    if (quantity > med.quantity) {
      toast.error(`Only ${med.quantity} ${med.unit || 'pcs'} available`)
      return
    }

    const existing = items.find((item) => item.medicineId === med._id)
    if (existing) {
      if (existing.qty + quantity > med.quantity) {
        toast.error(`Exceeds available stock. Available: ${med.quantity}`)
        return
      }
      setItems(items.map((item) =>
        item.medicineId === med._id ? { ...item, qty: item.qty + quantity } : item
      ))
    } else {
      setItems([...items, { medicineId: med._id, name: med.name, qty: quantity, price: med.price }])
    }
    setSelectedMedicine('')
    setQuantity(1)
  }

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.medicineId !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0)
  const tax = subtotal * 0.10
  const total = subtotal + tax

  const handleCompleteSale = async () => {
    if (!customer) {
      toast.error("Please select a customer")
      return
    }
    if (items.length === 0) {
      toast.error("Please add at least one item")
      return
    }

    try {
      const saleData = {
        customer,
        items: items.map(i => ({ medicine: i.medicineId, quantity: i.qty, price: i.price })),
        paymentMethod: payment,
        subTotal: subtotal,
        tax,
        total,
        paid: total,
        due: 0
      }
      const res = await addSale(saleData).unwrap()
      if (res.success) {
        toast.success("Sale completed successfully")
        setItems([])
        setCustomer('')
        setSelectedMedicine('')
        setQuantity(1)
      } else {
        toast.error("Failed to complete sale")
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Failed to complete sale")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create Sale</h2>
        <p className="text-gray-500 text-sm mt-1">Process new pharmacy sale and generate invoice</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-bold text-gray-900 mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Customer</label>
                <select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Choose a customer...</option>
                  {customersList.map((c) => (
                    <option key={c._id} value={c._id}>{c.name} {c.phone ? `(${c.phone})` : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Payment Method</label>
                <select
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {paymentMethods.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Add Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-bold text-gray-900 mb-4">Add Items</h3>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Medicine</label>
                <select
                  value={selectedMedicine}
                  onChange={(e) => setSelectedMedicine(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Choose a medicine...</option>
                  {medicinesList.map((med) => (
                    <option key={med._id} value={med._id}>{med.name} - ${med.price} ({med.quantity} {med.unit} left)</option>
                  ))}
                </select>
              </div>
              <div className="w-28">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAdd}
                  disabled={!selectedMedicine}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center"
                >
                  <MdAdd className="text-lg" />
                  Add
                </button>
              </div>
            </div>

            {/* Items Table */}
            {items.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2.5 text-xs font-semibold text-gray-500 uppercase">Medicine</th>
                      <th className="text-center py-2.5 text-xs font-semibold text-gray-500 uppercase">Qty</th>
                      <th className="text-center py-2.5 text-xs font-semibold text-gray-500 uppercase">Price</th>
                      <th className="text-center py-2.5 text-xs font-semibold text-gray-500 uppercase">Total</th>
                      <th className="text-center py-2.5 text-xs font-semibold text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.medicineId} className="border-b border-gray-100">
                        <td className="py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="py-3 text-sm text-gray-600 text-center">{item.qty}</td>
                        <td className="py-3 text-sm text-gray-600 text-center">${item.price.toFixed(2)}</td>
                        <td className="py-3 text-sm font-semibold text-gray-900 text-center">${(item.qty * item.price).toFixed(2)}</td>
                        <td className="py-3 text-center">
                          <button onClick={() => handleRemove(item.medicineId)} className="text-red-500 hover:text-red-700 transition-colors">
                            <MdDelete className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right: Invoice Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Invoice Summary</h3>

            <div className="space-y-3 mb-5">
              <div>
                <p className="text-xs text-gray-400">Invoice Number</p>
                <p className="text-sm font-bold text-gray-900">{invoiceNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Date</p>
                <p className="text-sm font-medium text-gray-900">{today}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Payment Method</p>
                <p className="text-sm font-medium text-gray-900">{payment}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (10%)</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <button 
                onClick={handleCompleteSale}
                disabled={isSelling || items.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                <MdSave className="text-lg" />
                {isSelling ? 'Processing...' : 'Complete Sale'}
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <MdPrint className="text-lg" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
