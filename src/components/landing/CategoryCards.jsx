import { motion } from 'framer-motion'
import { FaBoxes, FaChartLine, FaTruck, FaUserShield, FaFileInvoiceDollar, FaBell } from 'react-icons/fa'

const features = [
  {
    title: 'Stock Management',
    subtitle: 'Track medicine inventory in real-time',
    bg: 'from-green-400 to-emerald-500',
    icon: FaBoxes,
  },
  {
    title: 'Sales & Reports',
    subtitle: 'Daily, weekly & monthly analytics',
    bg: 'from-teal-400 to-cyan-500',
    icon: FaChartLine,
  },
  {
    title: 'Supplier Management',
    subtitle: 'Manage all your suppliers easily',
    bg: 'from-rose-400 to-red-500',
    icon: FaTruck,
  },
  {
    title: 'Multi-role Access',
    subtitle: 'Admin, Pharmacist & Manager roles',
    bg: 'from-violet-400 to-purple-500',
    icon: FaUserShield,
  },
  {
    title: 'Invoice & Billing',
    subtitle: 'Auto-generate invoices instantly',
    bg: 'from-amber-400 to-orange-500',
    icon: FaFileInvoiceDollar,
  },
  {
    title: 'Expiry Alerts',
    subtitle: 'Get notified before medicines expire',
    bg: 'from-sky-400 to-blue-500',
    icon: FaBell,
  },
]

export default function CategoryCards() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Everything You Need</h2>
          <div className="w-16 h-1 bg-teal-500 rounded-full mt-2 mx-auto" />
          <p className="text-gray-500 mt-3 text-sm sm:text-base">Powerful features to run your pharmacy efficiently</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-gradient-to-r ${feat.bg} rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center p-5 sm:p-6 min-h-[140px] sm:min-h-[160px]">
                <div className="flex-1 text-white z-10">
                  <h3 className="text-lg sm:text-xl font-bold mb-1">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-white/80 mb-3">{feat.subtitle}</p>
                  <button className="text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full transition-all duration-200">
                    Learn More →
                  </button>
                </div>
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center">
                  <feat.icon className="text-white/30 group-hover:text-white/50 transition-all duration-500 group-hover:scale-110" style={{ fontSize: '5rem' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}