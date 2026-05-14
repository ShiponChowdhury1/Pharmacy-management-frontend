import { motion } from 'framer-motion'
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa'
import img1 from '../../assets/pharmacy-1.png'
import img2 from '../../assets/image-1.png'
import img3 from '../../assets/about/aboutus3-01.png'

const blogs = [
  { id: 1, title: 'How to Boost Your Immunity Naturally This Season', category: 'Health Tips', date: 'May 10, 2026', image: img1 },
  { id: 2, title: 'Understanding Vitamin Supplements: A Complete Guide', category: 'Wellness', date: 'May 8, 2026', image: img2 },
  { id: 3, title: '5 Signs You Need to Visit a Pharmacist Today', category: 'Medical', date: 'May 5, 2026', image: img3 },
]

export default function BlogSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">From Our Blog</h2>
          <div className="w-16 h-1 bg-teal-500 rounded-full mt-2 mx-auto" />
          <p className="text-gray-500 mt-3 text-sm sm:text-base">Latest health tips and pharmacy news</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {blogs.map((blog, i) => (
            <motion.article key={blog.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Image */}
              <div className="relative h-48 sm:h-52 bg-gray-100 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-teal-500 text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full">{blog.category}</span>
              </div>
              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                  <FaCalendarAlt className="text-[10px]" />
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-teal-600 transition-colors">{blog.title}</h3>
                <button className="mt-3 text-teal-600 text-xs sm:text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200">
                  Read More <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
