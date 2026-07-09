import HeroSection from '../components/HeroSection';
import HomeShowcase from '../components/HomeShowcase';
import AccordionServices from '../components/AccordionServices';
import InstagramFeed from '../components/InstagramFeed';
import FooterParallax from '../components/FooterParallax';

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <HomeShowcase />
        <AccordionServices />
        <InstagramFeed />
      </main>
      <FooterParallax />
    </>
  );
}
