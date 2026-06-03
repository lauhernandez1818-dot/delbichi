import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
];

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=584223330304&text&type=phone_number&app_absent=0&utm_source=ig';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
      });
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-delbichi-black/70 border-b border-delbichi-metallic/10"
    >
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between h-20 md:h-24">
        {/* Logo — tamaño generoso y responsivo, sin fondo cuadrado */}
        <a href="#hero" className="flex h-full items-center py-3 md:py-4 group flex-shrink-0" id="nav-logo">
          <img
            src="/images/logo.png"
            alt="Delbichi Motors"
            className="h-full w-auto object-contain mix-blend-screen brightness-110 transition-all duration-300 group-hover:brightness-125"
          />
        </a>

        {/* Desktop Links — ocultos en móvil */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-[0.8rem] lg:text-sm font-medium uppercase tracking-[0.2em] text-delbichi-gray hover:text-delbichi-white transition-colors duration-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button Desktop */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="nav-cta"
          className="hidden md:inline-flex items-center gap-2 bg-delbichi-vibrant hover:bg-delbichi-primary text-delbichi-white font-display text-sm font-bold uppercase tracking-wider px-5 lg:px-6 py-3 rounded transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,30,27,0.3)] flex-shrink-0 whitespace-nowrap"
        >
          Cotizar
        </a>

        {/* Mobile Menu Toggle — visible solo en móvil */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-delbichi-white p-2 flex-shrink-0"
          id="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu — solo visible en móvil */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-8 pt-4 bg-delbichi-black/95 border-t border-delbichi-metallic/10">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-lg font-medium uppercase tracking-[0.15em] text-delbichi-gray hover:text-delbichi-white transition-colors duration-300 block py-3 border-b border-delbichi-metallic/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-delbichi-vibrant hover:bg-delbichi-primary text-delbichi-white font-display text-sm font-bold uppercase tracking-wider px-6 py-4 rounded transition-all duration-300 w-full justify-center"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
