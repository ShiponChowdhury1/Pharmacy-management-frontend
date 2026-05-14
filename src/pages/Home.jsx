import HeroSlider from '../components/landing/HeroSlider'
import CategoryCards from '../components/landing/CategoryCards'
import HealthProducts from '../components/landing/HealthProducts'
import ShippingBanner from '../components/landing/ShippingBanner'
import TrendingProducts from '../components/landing/TrendingProducts'
import HowToOrder from '../components/landing/HowToOrder'
import BlogSection from '../components/landing/BlogSection'
import Newsletter from '../components/landing/Newsletter'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSlider />
      <CategoryCards />
      <HealthProducts />
      <ShippingBanner />
      <TrendingProducts />
      <HowToOrder />
      <BlogSection />
      <Newsletter />
    </div>
  )
}
