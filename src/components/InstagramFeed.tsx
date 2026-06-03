import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

interface Reel {
  id: string;
  videoSrc: string;
  text: string;
}

const reels: Reel[] = [
  {
    id: '01',
    videoSrc: '/videos/video1.mp4',
    text: `Es momento de usar cauchos de VERDAD 🛞💪🏽 ¡En delbichi motors tu seguridad al rodar es lo más importante! 🤩 #venezuela
✅ Recuerda que somos MAYORISTAS (Compra mínima 8 cauchos)
📞Realiza tu pedido ahora mismo
#caracas #accesorios #cauchos #ventas
📌Tenemos lista de precios en cauchos y Respuestos, pídela ya`,
  },
  {
    id: '02',
    videoSrc: '/videos/video2.mp4',
    text: `Emprende tu negocio con nosotros 🏍️🤩 ¡Cauchos y Respuestos para motos al mejor precio! 🏆
✅Somos mayoristas #venezuela #fyp #ventas
📞Agenda tu pedido ya #motos #cauchos`,
  },
  {
    id: '03',
    videoSrc: '/videos/video3.mp4',
    text: `𝗖𝗔𝗨𝗖𝗛𝗢𝗦 𝗩𝗨𝗟𝗖𝗔𝗡𝗢 ⚡ AL POR MAYOR
🏍️ Medidas comerciales para todo tipo de motos. Envíos nacionales. Mira el video y cotiza ➡️
🛵Más que cauchos, seguridad y rendimiento para tu moto. Descubre en el video las ofertas al mayor de la marca Vulcano. Llevamos la medida que necesitas a cualquier rincón del país 🚚 #venezuela #fyp #ventas #cauchos #motos`,
  },
];

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !headerRef.current) return;

      gsap.fromTo(
        headerRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="comunidad"
      className="relative z-20 overflow-hidden bg-delbichi-black py-32"
    >
      {/* Decorative Background */}
      <div className="absolute left-1/2 top-0 h-[1px] w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-delbichi-primary/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[50vw] -translate-x-1/2 rounded-full bg-delbichi-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20">
        <div
          ref={headerRef}
          className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <span className="mb-4 flex items-center gap-3 font-body text-sm uppercase tracking-[0.3em] text-delbichi-vibrant">
              <InstagramIcon /> @delbichimotors
            </span>
            <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tighter text-delbichi-white">
              COMUNIDAD<br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '2px #FAFAFA' }}
              >
                EN ACCIÓN
              </span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/delbichimotors/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-delbichi-metallic/30 px-6 py-3 transition-colors hover:border-delbichi-vibrant hover:bg-delbichi-vibrant/10"
          >
            <span className="font-display text-sm font-bold uppercase tracking-wider text-delbichi-white">
              Seguir en Instagram
            </span>
            <div className="h-2 w-2 rounded-full bg-delbichi-vibrant transition-transform group-hover:scale-150" />
          </a>
        </div>

        {/* Reels Container */}
        <div className="hide-scrollbar flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onClick={() => reel.videoSrc && setSelectedReel(reel)}
              className={`group relative flex aspect-[9/16] w-[80vw] flex-shrink-0 snap-center flex-col overflow-hidden border border-delbichi-metallic/20 bg-delbichi-dark sm:w-[320px] md:w-[360px] lg:w-[400px] ${
                reel.videoSrc ? 'cursor-pointer' : ''
              }`}
            >
              {/* Video Element */}
              {reel.videoSrc ? (
                <video
                  src={reel.videoSrc}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-delbichi-dark">
                  <Play className="mb-4 h-16 w-16 text-delbichi-metallic/30" />
                  <span className="font-display text-2xl font-black text-delbichi-metallic/30">
                    VIDEO {reel.id}
                  </span>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-delbichi-black via-delbichi-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

              {/* Tag */}
              <div className="absolute right-4 top-4 border border-delbichi-white/20 bg-delbichi-black/40 px-3 py-1 backdrop-blur-md">
                <span className="font-display text-xs font-bold text-delbichi-white">
                  REEL {reel.id}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 transition-transform duration-300">
                <p className="line-clamp-4 font-body text-sm leading-relaxed text-delbichi-light">
                  {reel.text}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-[2px] w-8 bg-delbichi-vibrant" />
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-delbichi-vibrant">
                    {reel.videoSrc ? 'Reproduciendo' : 'Pendiente'}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer for right edge */}
          <div className="w-[4vw] flex-shrink-0" />
        </div>
      </div>

      {/* Fullscreen Video Modal using React Portal to escape z-index constraints */}
      {selectedReel && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-delbichi-black/95 backdrop-blur-xl p-4 sm:p-8 md:p-12">
          {/* Close Button */}
          <button
            onClick={() => setSelectedReel(null)}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 z-[10000] flex h-12 w-12 items-center justify-center border border-delbichi-metallic/30 bg-delbichi-black text-delbichi-white transition-colors hover:border-delbichi-vibrant hover:text-delbichi-vibrant md:right-8 md:top-8"
          >
            <X size={28} />
          </button>

          {/* Modal Content */}
          <div className="flex h-[85vh] w-full max-w-[1200px] flex-col overflow-hidden rounded-xl border border-delbichi-metallic/20 bg-delbichi-dark shadow-[0_0_50px_rgba(0,0,0,0.5)] md:flex-row">
            
            {/* Video Player (Left/Top) */}
            <div className="relative flex h-[40%] w-full items-center justify-center bg-[#050505] md:h-full md:w-[45%] lg:w-[50%]">
              <video
                src={selectedReel.videoSrc}
                className="absolute inset-0 h-full w-full object-contain"
                autoPlay
                controls
                playsInline
              />
            </div>

            {/* Post Info (Right/Bottom) */}
            <div className="flex h-[60%] w-full flex-col p-6 md:h-full md:w-[55%] lg:w-[50%] md:p-10 lg:p-16">
              
              {/* Header */}
              <div className="mb-6 flex flex-shrink-0 items-center gap-4 border-b border-delbichi-metallic/20 pb-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-delbichi-primary/50 bg-delbichi-black">
                  <InstagramIcon />
                </div>
                <div>
                  <h3 className="font-display text-base md:text-lg font-bold uppercase tracking-widest text-delbichi-white">
                    @delbichimotors
                  </h3>
                  <span className="font-body text-[10px] md:text-xs text-delbichi-gray uppercase tracking-widest">
                    Reel {selectedReel.id}
                  </span>
                </div>
              </div>

              {/* Text Area */}
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                <p className="font-body text-sm md:text-base leading-relaxed text-delbichi-light whitespace-pre-wrap">
                  {selectedReel.text}
                </p>
              </div>

              {/* Footer */}
              <a
                href="https://www.instagram.com/delbichimotors/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 pt-6 border-t border-delbichi-metallic/10 group flex flex-shrink-0 items-center gap-3 transition-colors hover:text-delbichi-vibrant"
              >
                <div className="h-10 w-10 flex items-center justify-center border border-delbichi-metallic/30 group-hover:border-delbichi-vibrant bg-delbichi-black">
                  <InstagramIcon />
                </div>
                <span className="font-display text-xs md:text-sm font-bold uppercase tracking-wider text-delbichi-white group-hover:text-delbichi-vibrant">
                  Ver en Instagram
                </span>
              </a>

            </div>
          </div>

          {/* Navigation Arrows */}
          {reels.findIndex((r) => r.id === selectedReel.id) > 0 && (
            <button
              onClick={() => {
                const currentIndex = reels.findIndex((r) => r.id === selectedReel.id);
                setSelectedReel(reels[currentIndex - 1]);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 sm:left-6 z-[10000] flex h-12 w-12 items-center justify-center border border-delbichi-metallic/30 bg-delbichi-black text-delbichi-white transition-colors hover:border-delbichi-vibrant hover:text-delbichi-vibrant md:left-8"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {reels.findIndex((r) => r.id === selectedReel.id) < reels.length - 1 && (
            <button
              onClick={() => {
                const currentIndex = reels.findIndex((r) => r.id === selectedReel.id);
                setSelectedReel(reels[currentIndex + 1]);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 sm:right-6 z-[10000] flex h-12 w-12 items-center justify-center border border-delbichi-metallic/30 bg-delbichi-black text-delbichi-white transition-colors hover:border-delbichi-vibrant hover:text-delbichi-vibrant md:right-8"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>,
        document.body
      )}
    </section>
  );
}
