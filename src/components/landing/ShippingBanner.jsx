import { FaTruck, FaShieldAlt, FaUndoAlt, FaHeadset } from 'react-icons/fa'

const features = [
  { icon: FaTruck, text: 'FREE 2-Day Shipping on orders of $35+' },
  { icon: FaShieldAlt, text: 'Secure Payment' },
  { icon: FaUndoAlt, text: 'Easy Returns' },
  { icon: FaHeadset, text: '24/7 Support' },
]

export default function ShippingBanner() {
  return (
    <section className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3 text-white">
              <f.icon className="text-base sm:text-lg flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
