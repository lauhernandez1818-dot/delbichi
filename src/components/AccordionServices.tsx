import { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Package,
  Truck,
  User,
  ShieldCheck,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: 'Ventas al Mayor',
    description:
      'Precios competitivos y volumen garantizado para talleres y revendedores.',
    icon: Package,
  },
  {
    title: 'Envíos Nacionales',
    description:
      'Despachamos tu mercancía a cualquier rincón del país de forma rápida y segura.',
    icon: Truck,
  },
  {
    title: 'Venta al Detal',
    description:
      'Atención personalizada para el motorizado que busca la mejor calidad.',
    icon: User,
  },
  {
    title: 'Garantía Delbichi',
    description:
      'Todos nuestros repuestos y cauchos cuentan con calidad certificada (RIF: J-506397650).',
    icon: ShieldCheck,
  },
];

function formatIndex(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export default function AccordionServices() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  useGSAP(
    () => {
      const validItems = itemsRef.current.filter(Boolean) as HTMLDivElement[];
      if (validItems.length === 0) return;

      gsap.fromTo(
        validItems,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 25%',
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
      id="servicios"
      className="relative z-10 overflow-hidden px-8 py-32"
      style={{
        background: `
          radial-gradient(ellipse 50% 40% at 70% 20%, rgba(125,20,22,0.2) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 10% 80%, rgba(55,18,17,0.3) 0%, transparent 65%),
          linear-gradient(180deg, #141618 0%, #282F32 50%, #0A0A0B 100%)
        `,
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(250,250,250,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glowing orb left side */}
      <div className="absolute left-0 bottom-1/4 w-[35vw] max-w-[400px] aspect-square rounded-full bg-delbichi-deep/15 blur-[150px] pointer-events-none" />
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-20">
          <span className="mb-6 block font-body text-sm uppercase tracking-[0.3em] text-delbichi-vibrant">
            Lo que hacemos
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none tracking-tight text-delbichi-white">
            SERVICIOS
          </h2>
          <div className="mt-6 h-1 w-16 bg-delbichi-primary" />
        </div>

        {/* Accordion Items */}
        <div className="flex flex-col">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            const IconComponent = service.icon;

            return (
              <div
                key={service.title}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className="border-t border-delbichi-metallic/20 last:border-b"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="group flex w-full cursor-pointer items-center gap-6 py-8 text-left transition-colors duration-300 hover:bg-delbichi-dark/30 md:gap-8"
                  aria-expanded={isOpen}
                >
                  {/* Index Number */}
                  <span className="flex-shrink-0 font-display text-sm font-bold tracking-wider text-delbichi-metallic transition-colors duration-300 group-hover:text-delbichi-vibrant">
                    {formatIndex(index)}
                  </span>

                  {/* Icon */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-delbichi-metallic/20 bg-delbichi-dark transition-all duration-300 group-hover:border-delbichi-vibrant/40 group-hover:bg-delbichi-vibrant/10">
                    <IconComponent
                      className="h-5 w-5 text-delbichi-gray transition-colors duration-300 group-hover:text-delbichi-vibrant"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="flex-1 font-display text-xl font-bold uppercase tracking-tight text-delbichi-white transition-colors duration-300 group-hover:text-delbichi-vibrant md:text-2xl lg:text-3xl">
                    {service.title}
                  </h3>

                  {/* Chevron */}
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center border transition-all duration-500 ${
                      isOpen
                        ? 'border-delbichi-vibrant bg-delbichi-vibrant/10'
                        : 'border-delbichi-metallic/30 bg-transparent'
                    }`}
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-all duration-500 ${
                        isOpen
                          ? 'rotate-180 text-delbichi-vibrant'
                          : 'rotate-0 text-delbichi-gray'
                      }`}
                      strokeWidth={2}
                    />
                  </div>
                </button>

                {/* Accordion Content */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="pb-8 pl-[calc(0.875rem+1.5rem+3rem+2rem)] pr-12 md:pl-[calc(0.875rem+2rem+3rem+2rem)]">
                    <p className="max-w-lg font-body text-base leading-relaxed text-delbichi-gray">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-px w-8 bg-delbichi-vibrant/60" />
                      <span className="font-body text-xs uppercase tracking-[0.2em] text-delbichi-vibrant/80">
                        Más información
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
