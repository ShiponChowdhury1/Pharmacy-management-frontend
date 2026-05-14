import { motion } from 'framer-motion'
import categoryNatural from '../../assets/categories/category_natural.png'
import categoryHealthcare from '../../assets/categories/category_healthcare.png'
import pharmacyImg from '../../assets/pharmacy-1.png'

const categories = [
  {
    title: 'Naturally Good',
    subtitle: 'Get 25% off on Medicines',
    bg: 'from-green-400 to-emerald-500',
    image: categoryNatural,
  },
  {
    title: 'Healthcare Products',
    subtitle: 'Flat 30% Discount',
    bg: 'from-teal-400 to-cyan-500',
    image: categoryHealthcare,
  },
  {
    title: 'Medlife Products',
    subtitle: 'Upto 40% off',
    bg: 'from-rose-400 to-red-500',
    image: pharmacyImg,
  },
]

export default function CategoryCards() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative bg-gradient-to-r ${cat.bg} rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex items-center p-5 sm:p-6 min-h-[160px] sm:min-h-[180px]">
                <div className="flex-1 text-white z-10">
                  <h3 className="text-lg sm:text-xl font-bold mb-1">{cat.title}</h3>
                  <p className="text-xs sm:text-sm text-white/80 mb-3">{cat.subtitle}</p>
                  <button className="text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full transition-all duration-200">
                    Shop Now →
                  </button>
                </div>
                <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
