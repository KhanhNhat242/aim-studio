import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RevealOnScroll from '@/components/RevealOnScroll'
import HeroSection from '@/components/sections/HeroSection'
import StorySection from '@/components/sections/StorySection'
import ServicesSection from '@/components/sections/ServicesSection'
import LookbookSection from '@/components/sections/LookbookSection'
import ContactSection from '@/components/sections/ContactSection'

// Nhịp nền: Trắng → Xám → Trắng → Xám → Đen (CTA + footer)
const Home = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StorySection />
        <ServicesSection />
        <LookbookSection />
        <ContactSection />
      </main>
      <Footer />
      <RevealOnScroll />
    </>
  )
}

export default Home
