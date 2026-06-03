import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

const HERO_WORDS_LINE1 = ['POTENCIA', 'EN', 'CADA', 'RODADA.'];
const HERO_WORDS_LINE2 = ['REPUESTOS', 'DE', 'VERDAD.'];

const SUBTITLE =
  'El mayor inventario de cauchos y repuestos para motos en Venezuela. Calidad garantizada, al mayor y detal.';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=584223330304&text&type=phone_number&app_absent=0&utm_source=ig';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-word', {
        y: '120%',
        duration: 1.2,
        stagger: 0.08,
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
    },
    { scope: heroRef }
  );

  const renderLine = (
    words: string[],
    lineKey: string,
    accentWord?: string
  ) => {
    return words.map((word, i) => {
      // Agregamos espacio real para que se lea y se seleccione correctamente en el navegador
      const isLast = i === words.length - 1;
      return (
        <span key={`${lineKey}-${i}`} className="inline-block align-top">
          <span className="inline-block overflow-hidden pt-[0.1em] pb-[0.3em] -mt-[0.1em] -mb-[0.3em]">
            <span
              className={`hero-word inline-block ${
                word === accentWord ? 'text-gradient-red' : 'text-delbichi-white'
              }`}
            >
              {word}{!isLast && '\u00A0'}
            </span>
          </span>
          {!isLast && <span className="inline-block w-[0.2em] md:w-[0.3em]"></span>}
        </span>
      );
    });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center bg-radial-hero overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(250,250,250,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="absolute top-0 right-0 w-[40vw] max-w-[600px] aspect-square bg-delbichi-wine/30 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[30vw] max-w-[400px] aspect-square bg-delbichi-deep/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-20">
        <div className="mb-6 md:mb-10">
          <span className="hero-word inline-block font-display text-[0.65rem] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-delbichi-primary font-semibold border border-delbichi-primary/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
            Delbichi Motors — Caracas, Venezuela
          </span>
        </div>

        <h1
          className="font-display font-black leading-[0.95] tracking-tight mb-8 md:mb-12 max-w-[1300px]"
          style={{ fontSize: 'clamp(2.5rem, 5.5vw, 6.5rem)' }}
        >
          <div className="block">
            {renderLine(HERO_WORDS_LINE1, 'l1')}
          </div>
          <div className="block mt-4 md:mt-8">
            {renderLine(HERO_WORDS_LINE2, 'l2', 'VERDAD.')}
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-delbichi-gray max-w-2xl leading-relaxed mb-10 md:mb-14"
        >
          {SUBTITLE}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 items-stretch sm:items-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-primary"
            className="inline-flex items-center justify-center gap-3 bg-delbichi-vibrant hover:bg-delbichi-primary text-delbichi-white font-display text-sm md:text-base font-bold uppercase tracking-wider px-6 md:px-8 py-3.5 md:py-4 rounded transition-all duration-300 hover:shadow-[0_0_40px_rgba(229,30,27,0.4)] animate-pulse-glow"
          >
            Cotizar Ahora
          </a>
          <a
            href="#catalogo"
            id="hero-cta-secondary"
            className="inline-flex items-center justify-center gap-3 border border-delbichi-metallic/40 hover:border-delbichi-light/60 text-delbichi-light font-display text-sm md:text-base font-medium uppercase tracking-wider px-6 md:px-8 py-3.5 md:py-4 rounded transition-all duration-300 hover:bg-delbichi-metallic/10"
          >
            Ver Catálogo
          </a>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-delbichi-metallic/15 pt-8 md:pt-12 max-w-5xl">
          {[
            { value: '5K+', label: 'Productos' },
            { value: '200+', label: 'Talleres Aliados' },
            { value: '24', label: 'Estados con Envío' },
            { value: '10+', label: 'Años de Experiencia' },
          ].map((stat) => (
            <div key={stat.label} className="hero-word">
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-delbichi-white">
                {stat.value}
              </p>
              <p className="font-body text-xs md:text-sm text-delbichi-gray mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-display text-[10px] uppercase tracking-[0.3em] text-delbichi-metallic">
          Scroll
        </span>
        <ChevronDown size={18} className="text-delbichi-metallic" />
      </div>
    </section>
  );
}
