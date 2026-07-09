import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HomeShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const boomVisualRef = useRef<HTMLDivElement>(null);
  const boomNumberRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const scrollDistance = track.scrollWidth - window.innerWidth;
      const isMobile = window.innerWidth < 768;
      const isWide = window.innerWidth >= 1280;

      const scrollEnd = Math.max(
        scrollDistance * (isMobile ? 1.35 : isWide ? 0.55 : 0.75),
        window.innerHeight * (isMobile ? 1.25 : isWide ? 0.95 : 1.1)
      );

      const horizontalTween = gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          id: 'home-showcase-pin',
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollEnd}`,
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (boomVisualRef.current) {
        gsap.fromTo(
          boomVisualRef.current,
          { scale: 0.55, rotate: -20, opacity: 0.25 },
          {
            scale: 1.08,
            rotate: 10,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: boomVisualRef.current,
              containerAnimation: horizontalTween,
              start: 'left 92%',
              end: 'left 8%',
              scrub: 0.45,
            },
          }
        );
      }

      if (boomNumberRef.current) {
        gsap.fromTo(
          boomNumberRef.current,
          { scale: 0.4, opacity: 0.15 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: boomNumberRef.current,
              containerAnimation: horizontalTween,
              start: 'left 88%',
              end: 'left 12%',
              scrub: 0.4,
            },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: ctaRef.current,
              containerAnimation: horizontalTween,
              start: 'left 90%',
              end: 'left 40%',
              scrub: 0.4,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="destacados"
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 55% 50% at 30% 50%, rgba(55,18,17,0.35) 0%, transparent 70%),
          radial-gradient(ellipse 45% 55% at 75% 35%, rgba(125,20,22,0.18) 0%, transparent 60%),
          linear-gradient(180deg, #141618 0%, #0A0A0B 100%)
        `,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(250,250,250,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[38vw] max-w-[480px] aspect-square rounded-full bg-delbichi-wine/25 blur-[160px] pointer-events-none z-0" />

      <div
        ref={trackRef}
        className="relative z-10 flex h-full items-center will-change-transform"
        style={{ width: 'max-content' }}
      >
        <div className="flex h-full w-screen flex-shrink-0 items-center justify-center px-6 md:px-12">
          <div
            ref={boomVisualRef}
            className="relative flex flex-col items-center text-center"
          >
            <p className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(3.5rem,14vw,9rem)] font-black uppercase leading-none tracking-tighter text-delbichi-white/[0.04]">
              VULCANO
            </p>

            <div className="showcase-ring relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-delbichi-vibrant/18 blur-3xl" />
              <div
                className="absolute inset-[6%] rounded-full border-[12px] border-delbichi-metallic/22 md:border-[16px]"
                aria-hidden
              />
              <div
                className="absolute inset-[16%] rounded-full border border-dashed border-delbichi-vibrant/35"
                aria-hidden
              />
              <div ref={boomNumberRef} className="relative z-10 flex flex-col items-center">
                <span className="font-display text-[clamp(4.5rem,18vw,8rem)] font-black leading-none tracking-tighter text-gradient-red">
                  18+
                </span>
                <span className="mt-2 font-body text-[10px] uppercase tracking-[0.35em] text-delbichi-gray md:text-xs">
                  Modelos
                </span>
              </div>
            </div>

            <h2 className="mt-8 font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-black leading-tight text-delbichi-white">
              Cauchos al mayor
            </h2>
          </div>
        </div>

        <div className="flex h-full w-screen flex-shrink-0 items-center justify-center px-6 md:px-16">
          <div
            ref={ctaRef}
            className="flex w-full max-w-lg flex-col items-center rounded-3xl border border-delbichi-metallic/20 bg-delbichi-dark/80 px-8 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-md md:px-12 md:py-14"
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-delbichi-vibrant">
              Inventario completo
            </span>
            <h3 className="mt-4 font-display text-2xl font-black leading-tight text-delbichi-white md:text-3xl">
              Fotos, medidas y repuestos
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-delbichi-gray md:text-base">
              Entra al catálogo para ver todo el inventario con fotos y medidas.
            </p>
            <Link
              to="/catalogo"
              className="btn-bubble btn-bubble-primary btn-bubble-lg mt-8 w-full max-w-xs"
            >
              Entrar al catálogo
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
