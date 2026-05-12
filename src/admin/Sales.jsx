import { useState } from 'react'
import { MdAdd, MdDelete, MdPrint, MdSave } from 'react-icons/md'

const customersList = ['John Doe', 'Sarah Smith', 'Mike Johnson', 'Emily Brown', 'David Wilson']
const paymentMethods = ['Cash', 'Card', 'Online']

const medicinesList = [
  { id: 1, name: 'Amoxicillin 500mg', price: 12.50 },
  { id: 2, name: 'Ibuprofen 400mg', price: 8.75 },
  { id: 3, name: 'Vitamin D3 1000IU', price: 15.00 },
  { id: 4, name: 'Paracetamol 500mg', price: 6.25 },
  { id: 5, name: 'Metformin 850mg', price: 22.00 },
  { id: 6, name: 'Cetirizine 10mg', price: 9.50 },
  { id: 7, name: 'Omeprazole 20mg', price: 18.75 },
  { id: 8, name: 'Aspirin 75mg', price: 5.50 },
]

export default function Sales() {
  const [customer, setCustomer] = useState('John Doe')
  const [payment, setPayment] = useState('Cash')
  const [selectedMedicine, setSelectedMedicine] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [items, setItems] = useState([
    { id: 2, name: 'Ibuprofen 400mg', qty: 8, price: 8.75 },
  ])

  const invoiceNumber = `INV-${Math.floor(Math.random() * 900000 + 100000)}`
  const today = new Date().toLocaleDateString('en-US')

  const handleAdd = () => {
    if (!selectedMedicine) return
    const med = medicinesList.find((m) => m.id === parseInt(selectedMedicine))
    if (!med) return

    const existing = items.find((item) => item.id === med.id)
    if (existing) {
      setItems(items.map((item) =>
        item.id === med.id ? { ...item, qty: item.qty + quantity } : item
      ))
    } else {
      setItems([...items, { id: med.id, name: med.name, qty: quantity, price: med.price }])
    }
    setSelectedMedicine('')
    setQuantity(1)
  }

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0)
  const tax = subtotal * 0.10
  const total = subtotal + tax

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
                  {customersList.map((c) => (
                    <option key={c} value={c}>{c}</option>
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
                    <option key={med.id} value={med.id}>{med.name}</option>
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
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center"
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
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="py-3 text-sm text-gray-600 text-center">{item.qty}</td>
                        <td className="py-3 text-sm text-gray-600 text-center">${item.price.toFixed(2)}</td>
                        <td className="py-3 text-sm font-semibold text-gray-900 text-center">${(item.qty * item.price).toFixed(2)}</td>
                        <td className="py-3 text-center">
                          <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 transition-colors">
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
                <p className="text-xs text-gray-400">Customer</p>
                <p className="text-sm font-medium text-gray-900">{customer}</p>
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
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                <MdSave className="text-lg" />
                Complete Sale
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
