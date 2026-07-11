import HeroSection from '../components/HeroSection';
import HomeShowcase from '../components/HomeShowcase';
import AccordionServices from '../components/AccordionServices';
import InstagramFeed from '../components/InstagramFeed';
import FooterParallax from '../components/FooterParallax';
import { usePageSeo } from '../hooks/usePageSeo';

export default function HomePage() {
  usePageSeo({
    title: 'Delbichi Motors — Cauchos y Repuestos para Motos',
    description:
      'Delbichi Motors — El mayor inventario de cauchos y repuestos para motos en Venezuela. Calidad garantizada, al mayor.',
    robots: 'index, follow',
    canonical: 'https://www.delbichimotors.com/',
  });
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
