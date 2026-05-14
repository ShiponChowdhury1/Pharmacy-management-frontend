import { motion } from 'framer-motion'
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa'
import img1 from '../../assets/pharmacy-1.png'
import img2 from '../../assets/image-1.png'

const products = [
  { id: 1, name: 'Calcium + Vit D Supplement', price: 29.00, oldPrice: 39.00, rating: 4.5, image: img1, tag: 'New' },
  { id: 2, name: 'Herbal Pain Relief Cream', price: 15.99, oldPrice: 22.00, rating: 4, image: img2, tag: 'Hot' },
  { id: 3, name: 'Omega-3 Fish Oil Capsules', price: 24.50, oldPrice: 32.00, rating: 5, image: img1, tag: null },
  { id: 4, name: 'Vitamin C Chewable Tabs', price: 12.99, oldPrice: 18.00, rating: 4.5, image: img2, tag: 'Sale' },
  { id: 5, name: 'Antiseptic Liquid Wash', price: 8.50, oldPrice: 12.00, rating: 3.5, image: img1, tag: null },
  { id: 6, name: 'Multivitamin Daily Pack', price: 35.00, oldPrice: 45.00, rating: 4.5, image: img2, tag: 'Best' },
  { id: 7, name: 'Probiotic Digestive Aid', price: 19.99, oldPrice: 27.00, rating: 4, image: img1, tag: null },
  { id: 8, name: 'Iron + Folic Acid Tablets', price: 11.50, oldPrice: 16.00, rating: 4.5, image: img2, tag: 'New' },
]

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5 text-amber-400 text-xs">
      {[1, 2, 3, 4, 5].map((s) =>
        rating >= s ? <FaStar key={s} /> : rating >= s - 0.5 ? <FaStarHalfAlt key={s} /> : <FaRegStar key={s} className="text-gray-300" />
      )}
    </div>
  )
}

const tagColors = {
  New: 'bg-teal-500', Hot: 'bg-orange-500', Sale: 'bg-red-500', Best: 'bg-purple-500',
}

export default function HealthProducts() {
  return (
    <section className="py-10 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Health Products</h2>
          <div className="w-16 h-1 bg-teal-500 rounded-full mt-2" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-50 p-4 flex items-center justify-center overflow-hidden">
                {p.tag && (
                  <span className={`absolute top-2 left-2 ${tagColors[p.tag]} text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-bold uppercase z-10`}>
                    {p.tag}
                  </span>
                )}
                <img src={p.image} alt={p.name} className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500" />
                {/* Quick actions */}
                <div className="absolute right-2 top-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  {[FaHeart, FaEye, FaShoppingCart].map((Icon, idx) => (
                    <button key={idx} className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:bg-teal-500 hover:text-white transition-colors duration-200">
                      <Icon className="text-[10px] sm:text-xs" />
                    </button>
                  ))}
                </div>
              </div>
              {/* Info */}
              <div className="p-3 sm:p-4">
                <Stars rating={p.rating} />
                <h3 className="text-xs sm:text-sm font-medium text-gray-800 mt-1.5 line-clamp-2 leading-snug min-h-[2.5em]">{p.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm sm:text-base font-bold text-teal-600">${p.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-400 line-through">${p.oldPrice.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
