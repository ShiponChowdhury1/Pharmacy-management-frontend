import { motion } from 'framer-motion'
import { FaPaperPlane } from 'react-icons/fa'

export default function Newsletter() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-10 w-40 h-40 border-2 border-white rounded-full" />
        <div className="absolute bottom-0 right-20 w-60 h-60 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">Sign Up For Newsletter</h2>
          <p className="text-teal-100 text-sm sm:text-base mb-8">Get the latest health tips, exclusive offers and updates delivered to your inbox.</p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 px-5 py-3 sm:py-3.5 rounded-full text-sm text-gray-700 outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              id="newsletter-email"
            />
            <button type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              <FaPaperPlane className="text-xs" />
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
