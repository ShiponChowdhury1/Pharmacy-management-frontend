import { motion } from 'framer-motion'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import img1 from '../../assets/pharmacy-1.png'
import img2 from '../../assets/image-1.png'
import img3 from '../../assets/about/aboutus3-01.png'

const stats = [
  { value: '500+', label: 'Pharmacies Using' },
  { value: '50K+', label: 'Medicines Tracked' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
]

const testimonials = [
  {
    id: 1,
    name: 'Md. Karim Uddin',
    role: 'Pharmacy Owner, Dhaka',
    text: 'PharmaCare has completely transformed how we manage our stock. Expiry alerts alone saved us thousands.',
    image: img1,
    rating: 5,
  },
  {
    id: 2,
    name: 'Fatema Begum',
    role: 'Pharmacist, Chittagong',
    text: 'The sales report feature is amazing. I can see daily performance in seconds without any manual work.',
    image: img2,
    rating: 5,
  },
  {
    id: 3,
    name: 'Rahim Ahmed',
    role: 'Manager, Rajshahi',
    text: 'Managing suppliers was always a headache. Now everything is in one place. Highly recommended!',
    image: img3,
    rating: 5,
  },
]

export default function BlogSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-teal-600">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <div className="w-16 h-1 bg-teal-500 rounded-full mt-2 mx-auto" />
          <p className="text-gray-500 mt-3 text-sm sm:text-base">Trusted by pharmacies across Bangladesh</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <FaQuoteLeft className="text-teal-200 text-3xl mb-3" />
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{t.text}</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <FaStar key={j} className="text-amber-400 text-xs" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-teal-100" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}