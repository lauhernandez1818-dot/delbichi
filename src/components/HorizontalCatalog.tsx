import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X, ZoomIn, ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import {
  catalogItems,
  catalogProducts,
  isCatalogSection,
  type CatalogProduct,
} from '../data/catalog';

gsap.registerPlugin(ScrollTrigger);

function getOffsetWithinTrack(element: HTMLElement, track: HTMLElement) {
  let offset = 0;
  let node: HTMLElement | null = element;
  while (node && node !== track) {
    offset += node.offsetLeft;
    node = node.parentElement;
  }
  return offset;
}

function smoothScrollTo(targetY: number) {
  const startY = window.scrollY;
  gsap.to(
    { value: startY },
    {
      value: targetY,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate() {
        window.scrollTo(0, this.targets()[0].value);
      },
    }
  );
}

export default function HorizontalCatalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cauchosMarkerRef = useRef<HTMLDivElement>(null);
  const repuestosMarkerRef = useRef<HTMLDivElement>(null);
  const catalogScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);

  const getCatalogScrollY = (horizontalOffset: number) => {
    const track = trackRef.current;
    const st = catalogScrollTriggerRef.current;
    if (!track || !st) return null;

    const scrollDistance = Math.max(track.scrollWidth - window.innerWidth, 1);
    const progress = Math.min(1, Math.max(0, horizontalOffset / scrollDistance));
    return st.start + progress * (st.end - st.start);
  };

  const jumpToMarker = (marker: HTMLElement | null) => {
    const track = trackRef.current;
    if (!track || !marker) return;

    const offset = Math.max(0, getOffsetWithinTrack(marker, track) - 32);
    const targetY = getCatalogScrollY(offset);
    if (targetY !== null) smoothScrollTo(targetY);
  };

  const skipCatalog = () => {
    const st = catalogScrollTriggerRef.current;
    if (st) {
      smoothScrollTo(st.end + 2);
      return;
    }
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const scrollDistance = track.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          id: 'catalog-pin',
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      catalogScrollTriggerRef.current = horizontalTween.scrollTrigger ?? null;

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        {
          opacity: 0.3,
          scale: 0.92,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  let productCardCount = 0;

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="relative h-screen w-full overflow-hidden pt-20 md:pt-24"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 20% 50%, rgba(55,18,17,0.35) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 80% 30%, rgba(125,20,22,0.15) 0%, transparent 60%),
          linear-gradient(180deg, #282F32 0%, #141618 100%)
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
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] aspect-square rounded-full bg-delbichi-wine/30 blur-[180px] pointer-events-none z-0" />

      <nav
        aria-label="Atajos del catálogo"
        className="absolute bottom-5 left-1/2 z-20 flex max-w-[calc(100%-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-sm border border-delbichi-metallic/25 bg-delbichi-black/75 px-3 py-2 backdrop-blur-md md:bottom-8 md:gap-2.5 md:px-4 md:py-2.5"
      >
        <span className="hidden font-body text-[10px] uppercase tracking-[0.2em] text-delbichi-metallic sm:inline">
          Ir a:
        </span>
        <button
          type="button"
          onClick={() => jumpToMarker(cauchosMarkerRef.current)}
          className="rounded-sm border border-delbichi-metallic/30 px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.15em] text-delbichi-white transition-colors hover:border-delbichi-vibrant hover:text-delbichi-vibrant md:text-xs"
        >
          Cauchos
        </button>
        <button
          type="button"
          onClick={() => jumpToMarker(repuestosMarkerRef.current)}
          className="rounded-sm border border-delbichi-metallic/30 px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.15em] text-delbichi-white transition-colors hover:border-delbichi-vibrant hover:text-delbichi-vibrant md:text-xs"
        >
          Repuestos
        </button>
        <button
          type="button"
          onClick={skipCatalog}
          className="inline-flex items-center gap-1.5 rounded-sm border border-delbichi-primary/50 bg-delbichi-primary/20 px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.15em] text-delbichi-white transition-colors hover:border-delbichi-vibrant hover:bg-delbichi-vibrant/20 md:text-xs"
        >
          <SkipForward className="h-3 w-3" aria-hidden />
          Saltar catálogo
        </button>
      </nav>

      <div
        ref={trackRef}
        className="relative z-10 flex h-full items-center gap-6 md:gap-12 px-6 md:px-12 will-change-transform"
        style={{ width: 'max-content' }}
      >
        <div className="flex h-full w-[90vw] md:w-screen flex-shrink-0 flex-col items-start justify-center px-4 md:px-16 lg:px-24">
          <span className="mb-8 font-body text-xs md:text-sm uppercase tracking-[0.3em] text-delbichi-vibrant">
            Productos Destacados
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-tight tracking-tight text-delbichi-white">
            CATÁLOGO
          </h2>
          <div className="mt-6 md:mt-8 h-1 w-16 md:w-24 bg-delbichi-primary" />
          <p className="mt-6 md:mt-8 max-w-md font-body text-base md:text-lg leading-relaxed text-delbichi-gray">
            Cauchos Vulcano y repuestos de alto rendimiento para motocicletas.
            Calidad industrial, venta exclusiva al mayor.
          </p>
        </div>

        {catalogItems.map((item) => {
          if (isCatalogSection(item)) {
            const sectionMarkerRef =
              item.title === 'Cauchos Vulcano'
                ? cauchosMarkerRef
                : item.title === 'Repuestos'
                  ? repuestosMarkerRef
                  : null;

            return (
              <div
                key={`section-${item.title}`}
                ref={sectionMarkerRef}
                className="flex h-[70%] max-h-[520px] w-[75vw] sm:w-[300px] md:w-[340px] flex-shrink-0 flex-col items-start justify-center rounded-sm border border-delbichi-primary/30 bg-delbichi-wine/20 px-8 md:px-10"
              >
                <span className="mb-4 font-body text-[10px] md:text-xs uppercase tracking-[0.35em] text-delbichi-vibrant">
                  Línea
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight text-delbichi-white">
                  {item.title}
                </h3>
                <div className="mt-5 h-1 w-12 bg-delbichi-primary" />
                <p className="mt-5 font-body text-sm md:text-base leading-relaxed text-delbichi-gray">
                  {item.description}
                </p>
              </div>
            );
          }

          const product = item;
          const cardIndex = productCardCount;
          productCardCount += 1;
          const isCaucho = product.category === 'cauchos';

          return (
            <div
              key={product.tag}
              ref={(el) => {
                cardsRef.current[cardIndex] = el;
              }}
              onClick={() => setSelectedProduct(product)}
              className="group relative flex h-[75%] max-h-[600px] min-h-[450px] w-[85vw] sm:w-[350px] md:w-[400px] lg:w-[440px] flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-sm border border-delbichi-metallic/20 bg-delbichi-dark will-change-transform"
            >
              <span className="absolute right-4 top-4 md:right-6 md:top-6 z-10 font-display text-[4rem] md:text-[6rem] font-black leading-none text-delbichi-white/[0.04] pointer-events-none">
                {product.tag}
              </span>

              <div
                className={`relative w-full flex-shrink-0 overflow-hidden ${
                  isCaucho ? 'h-[58%] md:h-[62%] bg-[#7a0f12]' : 'h-[45%] md:h-[50%] bg-delbichi-black'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
                    isCaucho ? 'object-contain p-2' : 'object-cover group-hover:scale-105'
                  }`}
                  loading="lazy"
                  decoding="async"
                />
                {!isCaucho && (
                  <div className="absolute inset-0 bg-gradient-to-t from-delbichi-dark via-delbichi-dark/20 to-transparent" />
                )}

                <div className="absolute left-4 top-4 md:left-6 md:top-6 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center border border-delbichi-vibrant/60 bg-delbichi-black/60 backdrop-blur-sm">
                  <span className="font-display text-[10px] md:text-xs font-bold text-delbichi-vibrant">
                    {product.tag}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                <div>
                  <h3 className="font-display text-xl lg:text-2xl font-black uppercase leading-tight tracking-tight text-delbichi-white">
                    {product.title}
                  </h3>
                  {product.model && (
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-delbichi-vibrant">
                      {product.model}
                    </p>
                  )}
                  <p className="mt-3 md:mt-4 font-body text-sm md:text-base leading-relaxed text-delbichi-gray">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 md:mt-8 flex items-center justify-between border-t border-delbichi-metallic/20 pt-4 md:pt-6">
                  <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-delbichi-metallic">
                    {isCaucho ? 'Caucho' : 'Repuesto'} {product.tag}
                  </span>
                  <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center border border-delbichi-metallic/30 transition-colors duration-300 group-hover:border-delbichi-vibrant group-hover:bg-delbichi-vibrant/10">
                    <ZoomIn className="h-4 w-4 text-delbichi-gray transition-colors duration-300 group-hover:text-delbichi-vibrant" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="h-1 w-[15vw] flex-shrink-0" />
      </div>

      {selectedProduct &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-delbichi-black/95 backdrop-blur-xl p-4 sm:p-8 md:p-12">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 z-[10000] flex h-12 w-12 items-center justify-center border border-delbichi-metallic/30 bg-delbichi-black text-delbichi-white transition-colors hover:border-delbichi-vibrant hover:text-delbichi-vibrant md:right-8 md:top-8"
            >
              <X size={28} />
            </button>

            <div className="flex max-h-[90vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-xl border border-delbichi-metallic/20 bg-delbichi-dark shadow-[0_0_80px_rgba(192,25,31,0.15)] md:flex-row">
              <div
                className={`relative flex h-[50vh] w-full items-center justify-center md:h-auto md:min-h-[500px] md:w-[60%] ${
                  selectedProduct.category === 'cauchos' ? 'bg-[#7a0f12]' : 'bg-[#050505]'
                }`}
              >
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="absolute inset-0 h-full w-full object-contain p-4"
                  loading="lazy"
                />
                <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center border border-delbichi-vibrant/60 bg-delbichi-black/60 backdrop-blur-sm">
                  <span className="font-display text-sm font-bold text-delbichi-vibrant">
                    {selectedProduct.tag}
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-col p-6 md:w-[40%] md:p-10 lg:p-12">
                <span className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-delbichi-vibrant">
                  {selectedProduct.category === 'cauchos' ? 'Caucho Vulcano' : 'Repuesto'}
                </span>
                <h3 className="mb-2 font-display text-3xl font-black uppercase leading-tight tracking-tight text-delbichi-white">
                  {selectedProduct.title}
                </h3>
                {selectedProduct.model && (
                  <p className="mb-6 font-mono text-sm uppercase tracking-[0.15em] text-delbichi-vibrant">
                    {selectedProduct.model}
                  </p>
                )}

                <div className="mb-8 h-1 w-12 bg-delbichi-primary" />

                <p className="font-body text-base leading-relaxed text-delbichi-light">
                  {selectedProduct.description}
                </p>

                <div className="mt-auto pt-8 flex items-center justify-between border-t border-delbichi-metallic/20">
                  <span className="font-body text-[10px] uppercase tracking-widest text-delbichi-gray">
                    Delbichi Motors
                  </span>
                  <ZoomIn className="h-5 w-5 text-delbichi-metallic/50" />
                </div>
              </div>
            </div>

            {catalogProducts.findIndex((p) => p.tag === selectedProduct.tag) > 0 && (
              <button
                onClick={() => {
                  const currentIndex = catalogProducts.findIndex(
                    (p) => p.tag === selectedProduct.tag
                  );
                  setSelectedProduct(catalogProducts[currentIndex - 1]);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 sm:left-6 z-[10000] flex h-12 w-12 items-center justify-center border border-delbichi-metallic/30 bg-delbichi-black text-delbichi-white transition-colors hover:border-delbichi-vibrant hover:text-delbichi-vibrant md:left-8"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {catalogProducts.findIndex((p) => p.tag === selectedProduct.tag) <
              catalogProducts.length - 1 && (
              <button
                onClick={() => {
                  const currentIndex = catalogProducts.findIndex(
                    (p) => p.tag === selectedProduct.tag
                  );
                  setSelectedProduct(catalogProducts[currentIndex + 1]);
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
