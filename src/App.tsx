import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HorizontalCatalog from './components/HorizontalCatalog';
import AccordionServices from './components/AccordionServices';
import InstagramFeed from './components/InstagramFeed';
import FooterParallax from './components/FooterParallax';

export default function App() {
  // Initialize Lenis smooth scrolling globally
  useSmoothScroll();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HorizontalCatalog />
        <AccordionServices />
        <InstagramFeed />
      </main>
      <FooterParallax />
    </>
  );
}
