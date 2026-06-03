import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=584223330304&text&type=phone_number&app_absent=0&utm_source=ig';
const INSTAGRAM_URL = 'https://www.instagram.com/delbichimotors/';
const FACEBOOK_URL =
  'https://www.facebook.com/profile.php?id=61578278223462';

const FooterParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      // Animate children on reveal — no yPercent on the footer itself
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1,
        },
      });

      tl.fromTo(
        footer.querySelectorAll('.footer-reveal'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: 'power3.out' }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} id="contacto" className="relative w-full">
      <footer
        ref={footerRef}
        className="relative flex h-auto w-full flex-col overflow-hidden px-6 pb-12 pt-32 md:px-12 lg:px-20 will-change-transform"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 30%, rgba(125,20,22,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 80%, rgba(55,18,17,0.4) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 10% 90%, rgba(55,18,17,0.3) 0%, transparent 50%),
            linear-gradient(180deg, #0A0A0B 0%, #141618 100%)
          `,
        }}
      >
        {/* Decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(250,250,250,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glowing red orb behind CTA */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[700px] aspect-square rounded-full bg-delbichi-deep/20 blur-[150px] pointer-events-none" />
        {/* ── Top Area: Massive CTA & Industrial Button ── */}
        <div className="footer-reveal my-auto flex w-full flex-col items-center justify-center gap-8 text-center">
          <h2 className="w-full cursor-default break-words font-display text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-none tracking-tight text-delbichi-white transition-colors duration-500 hover:text-delbichi-vibrant">
            COTIZA TU PEDIDO
          </h2>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-4 border-4 border-delbichi-primary bg-transparent px-12 py-6 transition-all duration-300 hover:bg-delbichi-vibrant"
          >
            <span className="font-display text-xl font-black uppercase tracking-widest text-delbichi-white transition-colors duration-300 group-hover:text-delbichi-black md:text-2xl">
              Iniciar Chat
            </span>
            <ArrowUpRight
              className="h-8 w-8 text-delbichi-primary transition-colors duration-300 group-hover:text-delbichi-black md:h-10 md:w-10"
              strokeWidth={3}
            />
          </a>
        </div>

        {/* ── Bottom Area: Minimalist Grid Layout ── */}
        <div className="footer-reveal mt-24 grid w-full grid-cols-1 items-end gap-12 border-t border-white/10 pt-8 lg:grid-cols-2 lg:gap-8">
          {/* Tech/Mono Info */}
          <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-delbichi-gray md:text-xs">
            <p>© {new Date().getFullYear()} Delbichi Motors</p>
            <p>RIF: J-506397650</p>
            <p>Caracas, Venezuela</p>
            <p className="mt-4 text-delbichi-metallic/40">
              v1.0.0 — All Systems Nominal
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-row flex-wrap gap-6 lg:justify-end">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl font-bold uppercase tracking-tight text-delbichi-white transition-all duration-300 hover:text-delbichi-vibrant hover:underline decoration-delbichi-vibrant decoration-2 underline-offset-8 md:text-3xl"
            >
              Instagram
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl font-bold uppercase tracking-tight text-delbichi-white transition-all duration-300 hover:text-delbichi-vibrant hover:underline decoration-delbichi-vibrant decoration-2 underline-offset-8 md:text-3xl"
            >
              Facebook
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl font-bold uppercase tracking-tight text-delbichi-white transition-all duration-300 hover:text-delbichi-vibrant hover:underline decoration-delbichi-vibrant decoration-2 underline-offset-8 md:text-3xl"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterParallax;
