import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';

gsap.registerPlugin(ScrollTrigger);

const SUBTITLE = (
  <>
    El mayor inventario de cauchos y repuestos para motos en Venezuela.
    <br className="hidden sm:block" /> Calidad garantizada, al mayor.
  </>
);

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=584223330304&text&type=phone_number&app_absent=0&utm_source=ig';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const orbTopRef = useRef<HTMLDivElement>(null);
  const orbBottomRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-line', {
        y: '110%',
        duration: 1.1,
        stagger: 0.18,
        delay: 0.8,
      });

      tl.from(
        subtitleRef.current,
        { y: 40, opacity: 0, duration: 0.8 },
        '-=0.5'
      );

      tl.from(
        ctaRef.current,
        { y: 30, opacity: 0, duration: 0.6 },
        '-=0.4'
      );

      tl.from(
        scrollIndicatorRef.current,
        { opacity: 0, duration: 0.5 },
        '-=0.2'
      );

      gsap.to(scrollIndicatorRef.current, {
        y: 12,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
        delay: 3.5,
      });

      if (orbTopRef.current) {
        gsap.to(orbTopRef.current, {
          x: 30,
          y: -20,
          scale: 1.08,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orbBottomRef.current) {
        gsap.to(orbBottomRef.current, {
          x: -25,
          y: 15,
          scale: 1.12,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 28, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: heroRef }
  );

  const renderLine = (text: string, accentWord?: string) => {
    if (!accentWord) {
      return text;
    }

    const parts = text.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="text-gradient-red">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section relative flex min-h-[100dvh] flex-col justify-start bg-radial-hero overflow-hidden md:justify-center"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(250,250,250,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div
        ref={orbTopRef}
        className="absolute top-0 right-0 w-[40vw] max-w-[600px] aspect-square bg-delbichi-wine/30 rounded-full blur-[200px] pointer-events-none"
      />
      <div
        ref={orbBottomRef}
        className="absolute bottom-0 left-1/4 w-[30vw] max-w-[400px] aspect-square bg-delbichi-deep/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="hero-shell relative z-10 flex w-full flex-col px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        <div>
          <span className="hero-badge hero-line inline-block font-display uppercase tracking-[0.25em] text-delbichi-primary font-semibold border border-delbichi-primary/30 rounded-full">
            Delbichi Motors — Caracas, Venezuela
          </span>
        </div>

        <h1 className="hero-title font-display font-black tracking-tight max-w-[1300px]">
          <span className="block overflow-hidden">
            <span className="hero-line block text-delbichi-white">
              {renderLine('POTENCIA EN CADA RODADA.')}
            </span>
          </span>
          <span className="hero-title-line2 block overflow-hidden">
            <span className="hero-line block text-delbichi-white">
              {renderLine('REPUESTOS DE VERDAD.', 'VERDAD.')}
            </span>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="hero-subtitle font-body text-delbichi-gray max-w-2xl"
        >
          {SUBTITLE}
        </p>

        <div
          ref={ctaRef}
          className="hero-ctas flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-primary"
            className="btn-bubble btn-bubble-primary btn-bubble-md animate-bubble-float"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Cotizar ahora
          </a>
          <Link
            to="/catalogo"
            id="hero-cta-secondary"
            className="btn-bubble btn-bubble-outline btn-bubble-md"
          >
            Ir al catálogo
          </Link>
        </div>

        <div
          ref={statsRef}
          className="hero-stats grid grid-cols-2 md:grid-cols-4 border-t border-delbichi-metallic/15 max-w-5xl"
        >
          {[
            { value: '5K+', label: 'Productos' },
            { value: '200+', label: 'Talleres Aliados' },
            { value: '24', label: 'Estados con Envío' },
            { value: '10+', label: 'Años de Experiencia' },
          ].map((stat) => (
            <div key={stat.label} className="hero-stat-item">
              <p className="hero-stat-value font-display font-black text-delbichi-white">
                {stat.value}
              </p>
              <p className="hero-stat-label font-body text-delbichi-gray uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="hero-scroll-hint absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-display text-[10px] uppercase tracking-[0.3em] text-delbichi-metallic">
          Scroll
        </span>
        <ChevronDown size={18} className="text-delbichi-metallic" />
      </div>
    </section>
  );
}
