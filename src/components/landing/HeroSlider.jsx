import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { motion } from 'framer-motion'
import { FaArrowRight, FaChartBar, FaPills } from 'react-icons/fa'
import banner1 from '../../assets/banner/h1-news01 (1).png'
import banner2 from '../../assets/banner/h1-new02.png'
import banner3 from '../../assets/banner/h1-new03.png'

const slides = [
  {
    id: 1,
    bg: 'from-teal-400 via-teal-500 to-cyan-500',
    image: banner1,
    tag: 'Smart Management',
    title: 'Manage Your Pharmacy',
    subtitle: 'Smarter & Faster',
    features: ['Real-time Stock Tracking', 'Automated Reports'],
  },
  {
    id: 2,
    bg: 'from-emerald-500 via-green-500 to-teal-500',
    image: banner2,
    tag: 'Easy Setup',
    title: 'All-in-One Solution',
    subtitle: 'For Your Pharmacy',
    features: ['Supplier Management', 'Sales Analytics'],
  },
  {
    id: 3,
    bg: 'from-cyan-500 via-teal-500 to-teal-600',
    image: banner3,
    tag: 'Trusted System',
    title: 'Grow Your Business',
    subtitle: 'With PharmaCare',
    features: ['Multi-role Access', 'Secure & Reliable'],
  },
]

export default function HeroSlider() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`relative bg-gradient-to-r ${slide.bg} overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                <div className="absolute bottom-20 right-40 w-20 h-20 border border-white rounded-full" />
                <div className="absolute top-1/2 left-1/3 w-40 h-40 border border-white/50 rounded-full" />
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute w-2 h-2 bg-white rounded-full" style={{
                    top: `${20 + i * 12}%`, left: `${10 + i * 15}%`
                  }} />
                ))}
              </div>

              <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
                  {/* Left — Image */}
                  <div className="relative flex justify-center order-2 lg:order-1">
                    <motion.div
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <img
                        src={slide.image}
                        alt="Pharmacy management"
                        className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                  </div>

                  {/* Right — Content */}
                  <div className="text-white order-1 lg:order-2 text-center lg:text-left">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                    >
                      ✦ {slide.tag}
                    </motion.span>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-md"
                    >
                      {slide.title}<br />{slide.subtitle}
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="space-y-3 mb-6"
                    >
                      {slide.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                          <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            {i === 0 ? <FaChartBar className="text-white text-sm" /> : <FaPills className="text-white text-sm" />}
                          </div>
                          <span className="text-sm sm:text-base font-medium">{f}</span>
                        </div>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
                    >
                      <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                        Get Started Free
                        <FaArrowRight className="text-xs" />
                      </button>
                    
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}