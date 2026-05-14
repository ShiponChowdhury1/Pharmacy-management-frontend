import { motion } from 'framer-motion'
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from 'react-icons/fa'
import img1 from '../../assets/pharmacy-1.png'
import img2 from '../../assets/image-1.png'

const trending = [
  { id: 1, name: 'Paracetamol Extra Strength', price: 8.99, oldPrice: 12.00, rating: 4, image: img1 },
  { id: 2, name: 'Antibacterial Hand Wash', price: 5.50, oldPrice: 8.00, rating: 4.5, image: img2 },
  { id: 3, name: 'Blood Pressure Monitor', price: 45.00, oldPrice: 65.00, rating: 5, image: img1 },
  { id: 4, name: 'First Aid Kit Premium', price: 22.99, oldPrice: 30.00, rating: 4, image: img2 },
]

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5 text-amber-400 text-[10px]">
      {[1,2,3,4,5].map(s => rating >= s ? <FaStar key={s}/> : rating >= s-0.5 ? <FaStarHalfAlt key={s}/> : <FaRegStar key={s} className="text-gray-300"/>)}
    </div>
  )
}

export default function TrendingProducts() {
  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Trending Products</h2>
          <div className="w-16 h-1 bg-teal-500 rounded-full mt-2" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Product Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
            {trending.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 flex gap-3 hover:shadow-lg transition-all duration-300 group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-16 h-16 sm:w-20 sm:h-20 object-contain group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <Stars rating={p.rating} />
                  <h4 className="text-xs sm:text-sm font-medium text-gray-800 mt-1 line-clamp-2">{p.name}</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-sm font-bold text-teal-600">${p.price.toFixed(2)}</span>
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through">${p.oldPrice.toFixed(2)}</span>
                  </div>
                  <button className="mt-2 text-[10px] sm:text-xs bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-full flex items-center gap-1 transition-colors">
                    <FaShoppingCart className="text-[8px]" /> Add
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Essentials Promo */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 w-20 h-20 bg-amber-200/50 rounded-full blur-2xl" />
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-2">Daily Essentials</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">Essentials</h3>
            <p className="text-gray-500 text-sm mb-1">from</p>
            <p className="text-4xl sm:text-5xl font-black text-teal-600 mb-4">$<span>199</span></p>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105">
              Shop Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
