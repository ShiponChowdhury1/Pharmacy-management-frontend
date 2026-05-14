import { motion } from 'framer-motion'
import { FaSearch, FaCartPlus, FaCreditCard } from 'react-icons/fa'
import aboutImg from '../../assets/about/aboutus3-01.png'

const steps = [
  { icon: FaSearch, title: 'Search Your Medicine', desc: 'Browse from our wide range of medicines and health products.', color: 'from-teal-400 to-cyan-500' },
  { icon: FaCartPlus, title: 'Place Your Order', desc: 'Add items to cart and proceed to checkout easily.', color: 'from-emerald-400 to-green-500' },
  { icon: FaCreditCard, title: 'Get it Delivered', desc: 'Complete payment and get free delivery at your doorstep.', color: 'from-amber-400 to-orange-500' },
]

export default function HowToOrder() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — Image */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl blur-xl opacity-60" />
              <img src={aboutImg} alt="How to order" className="relative w-full max-w-md rounded-2xl shadow-xl" />
            </div>
          </motion.div>

          {/* Right — Steps */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              How to order medicines on Medilazar?
            </h2>
            <p className="text-lg text-teal-600 font-medium mb-8">It&apos;s Simple.</p>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                  className="flex gap-4 group">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="text-white text-lg sm:text-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-teal-500 bg-teal-50 px-2 py-0.5 rounded-full">Step {i + 1}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
