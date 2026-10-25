import Collection from './components/Collection'
import Contact from './components/Contact'
import Faq from './components/Faq'
import Floors from './components/Floors'
import Footer from './components/Footer'
import Hero from './components/Hero'
import History from './components/History'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Stats from './components/Stats'
import { useHashScroll } from './hooks/useHashScroll'
import { useMotion } from './hooks/useMediaQuery'
import { useParallax } from './hooks/useParallax'

export default function App() {
  useParallax(useMotion())
  useHashScroll()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Floors />
        <Collection />
        <History />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
