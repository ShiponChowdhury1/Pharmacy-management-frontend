import HeroSlider from '../components/landing/HeroSlider'
import CategoryCards from '../components/landing/CategoryCards'
import HowToOrder from '../components/landing/HowToOrder'
import BlogSection from '../components/landing/BlogSection'
import Newsletter from '../components/landing/Newsletter'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSlider />
      <CategoryCards />
      <HowToOrder />
      <BlogSection />
      <Newsletter />
    </div>
  )
}
