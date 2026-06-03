import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  title: string;
  description: string;
  image: string;
  tag: string;
}

const products: Product[] = [
  {
    title: 'Kit de Bloque',
    description: 'Máximo rendimiento, durabilidad y fácil instalación para tu motor.',
    image: '/images/kit-bloque.webp',
    tag: '01',
  },
  {
    title: 'Cigüeñal',
    description: 'Material reforzado con calidad garantizada para máxima resistencia.',
    image: '/images/ciguenal.webp',
    tag: '02',
  },
  {
    title: 'Carburador GN125',
    description: 'Ahorro de combustible y mejor rendimiento del motor garantizado.',
    image: '/images/carburador.webp',
    tag: '03',
  },
  {
    title: 'Amortiguador GY6',
    description: 'Máxima absorción y resistencia para una conducción suave y segura.',
    image: '/images/amortiguador.webp',
    tag: '04',
  },
  {
    title: 'Crochera Completa',
    description: 'Transmisión impecable, alta calidad y mayor durabilidad para tu moto.',
    image: '/images/crochera.webp',
    tag: '05',
  },
  {
    title: 'Arranque GN125',
    description: 'Arranque potente y encendido confiable en cualquier condición.',
    image: '/images/arranque.webp',
    tag: '06',
  },
];

export default function HorizontalCatalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const scrollDistance = track.scrollWidth - window.innerWidth;

      // Main horizontal scroll
      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Card reveal animations — simple stagger on initial scroll
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
          stagger: 0.15,
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
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(250,250,250,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glowing orb */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] aspect-square rounded-full bg-delbichi-wine/30 blur-[180px] pointer-events-none z-0" />
      <div
        ref={trackRef}
        className="relative z-10 flex h-full items-center gap-6 md:gap-12 px-6 md:px-12 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {/* Section Header Card */}
        <div className="flex h-full w-[90vw] md:w-screen flex-shrink-0 flex-col items-start justify-center px-4 md:px-16 lg:px-24">
          <span className="mb-8 font-body text-xs md:text-sm uppercase tracking-[0.3em] text-delbichi-vibrant">
            Productos Destacados
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-tight tracking-tight text-delbichi-white">
            CATÁLOGO
          </h2>
          <div className="mt-6 md:mt-8 h-1 w-16 md:w-24 bg-delbichi-primary" />
          <p className="mt-6 md:mt-8 max-w-md font-body text-base md:text-lg leading-relaxed text-delbichi-gray">
            Explora nuestra línea de productos de alto rendimiento para
            motocicletas. Calidad industrial, resultados profesionales.
          </p>
        </div>

        {/* Product Cards */}
        {products.map((product, index) => (
          <div
            key={product.tag}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            onClick={() => setSelectedProduct(product)}
            className="group relative flex h-[75%] max-h-[600px] min-h-[450px] w-[85vw] sm:w-[350px] md:w-[400px] lg:w-[440px] flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-sm border border-delbichi-metallic/20 bg-delbichi-dark will-change-transform"
          >
            {/* Tag Number */}
            <span className="absolute right-4 top-4 md:right-6 md:top-6 z-10 font-display text-[4rem] md:text-[6rem] font-black leading-none text-delbichi-white/[0.04] pointer-events-none">
              {product.tag}
            </span>

            {/* Image Container */}
            <div className="relative h-[45%] md:h-[50%] w-full flex-shrink-0 overflow-hidden bg-delbichi-black">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-delbichi-dark via-delbichi-dark/20 to-transparent" />

              {/* Tag Badge */}
              <div className="absolute left-4 top-4 md:left-6 md:top-6 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center border border-delbichi-vibrant/60 bg-delbichi-black/60 backdrop-blur-sm">
                <span className="font-display text-[10px] md:text-xs font-bold text-delbichi-vibrant">
                  {product.tag}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
              <div>
                <h3 className="font-display text-xl lg:text-2xl font-black uppercase leading-tight tracking-tight text-delbichi-white">
                  {product.title}
                </h3>
                <p className="mt-3 md:mt-4 font-body text-sm md:text-base leading-relaxed text-delbichi-gray">
                  {product.description}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="mt-6 md:mt-8 flex items-center justify-between border-t border-delbichi-metallic/20 pt-4 md:pt-6">
                <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-delbichi-metallic">
                  Producto {product.tag}
                </span>
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center border border-delbichi-metallic/30 transition-colors duration-300 group-hover:border-delbichi-vibrant group-hover:bg-delbichi-vibrant/10">
                  <ZoomIn className="h-4 w-4 text-delbichi-gray transition-colors duration-300 group-hover:text-delbichi-vibrant" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Trailing spacer */}
        <div className="h-1 w-[15vw] flex-shrink-0" />
      </div>

      {/* Product Lightbox Modal using React Portal */}
      {selectedProduct && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-delbichi-black/95 backdrop-blur-xl p-4 sm:p-8 md:p-12">
          {/* Close Button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 z-[10000] flex h-12 w-12 items-center justify-center border border-delbichi-metallic/30 bg-delbichi-black text-delbichi-white transition-colors hover:border-delbichi-vibrant hover:text-delbichi-vibrant md:right-8 md:top-8"
          >
            <X size={28} />
          </button>

          {/* Modal Content */}
          <div className="flex max-h-[90vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-xl border border-delbichi-metallic/20 bg-delbichi-dark shadow-[0_0_80px_rgba(192,25,31,0.15)] md:flex-row">
            
            {/* Image (Left/Top) */}
            <div className="relative flex h-[50vh] w-full items-center justify-center bg-[#050505] md:h-auto md:min-h-[500px] md:w-[60%]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="absolute inset-0 h-full w-full object-contain"
                loading="lazy"
              />
              <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center border border-delbichi-vibrant/60 bg-delbichi-black/60 backdrop-blur-sm">
                <span className="font-display text-sm font-bold text-delbichi-vibrant">
                  {selectedProduct.tag}
                </span>
              </div>
            </div>

            {/* Product Details (Right/Bottom) */}
            <div className="flex w-full flex-col p-6 md:w-[40%] md:p-10 lg:p-12">
              <span className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-delbichi-vibrant">
                Producto Destacado
              </span>
              <h3 className="mb-6 font-display text-3xl font-black uppercase leading-tight tracking-tight text-delbichi-white">
                {selectedProduct.title}
              </h3>
              
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

          {/* Navigation Arrows */}
          {products.findIndex((p) => p.tag === selectedProduct.tag) > 0 && (
            <button
              onClick={() => {
                const currentIndex = products.findIndex((p) => p.tag === selectedProduct.tag);
                setSelectedProduct(products[currentIndex - 1]);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 sm:left-6 z-[10000] flex h-12 w-12 items-center justify-center border border-delbichi-metallic/30 bg-delbichi-black text-delbichi-white transition-colors hover:border-delbichi-vibrant hover:text-delbichi-vibrant md:left-8"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {products.findIndex((p) => p.tag === selectedProduct.tag) < products.length - 1 && (
            <button
              onClick={() => {
                const currentIndex = products.findIndex((p) => p.tag === selectedProduct.tag);
                setSelectedProduct(products[currentIndex + 1]);
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
