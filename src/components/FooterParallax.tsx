import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4V12h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12" />
  </svg>
);

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
        className="relative flex h-auto w-full flex-col overflow-hidden px-6 pb-10 pt-20 md:px-12 md:pb-12 md:pt-24 lg:px-20 will-change-transform"
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
          <h2 className="w-full cursor-default break-words font-display text-[clamp(2rem,7vw,4.5rem)] font-bold leading-tight tracking-tight text-delbichi-white">
            Cotiza tu pedido
          </h2>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bubble btn-bubble-primary btn-bubble-lg group"
          >
            <MessageCircle className="h-6 w-6 shrink-0 md:h-7 md:w-7" aria-hidden />
            Iniciar chat
            <ArrowUpRight
              className="h-5 w-5 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:h-6 md:w-6"
              strokeWidth={2.5}
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
          <div className="flex flex-row flex-wrap items-center gap-3 lg:justify-end">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-social btn-social-instagram"
            >
              <InstagramIcon />
              Instagram
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-social btn-social-facebook"
            >
              <FacebookIcon />
              Facebook
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-social btn-social-whatsapp"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterParallax;
