import { motion } from 'framer-motion'
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa'

const perks = [
  'No credit card required',
  'Free 14-day trial',
  'Cancel anytime',
]

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            ✦ Get Started Today
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Ready to Modernize Your Pharmacy?
          </h2>
          <p className="text-teal-100 text-sm sm:text-base mb-6">
            Join 500+ pharmacies already using PharmaCare to manage smarter.
          </p>

          {/* Perks */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-2 text-white text-sm font-medium">
                <FaCheckCircle className="text-white/80 text-base" />
                {perk}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Start Free Trial
              <FaArrowRight className="text-xs" />
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 border border-white/30">
              Login to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}