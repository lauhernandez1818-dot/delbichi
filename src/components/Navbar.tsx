import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Menu, X, MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=584223330304&text&type=phone_number&app_absent=0&utm_source=ig';

function getNavLinks(pathname: string) {
  const onHome = pathname === '/';

  return [
    { label: 'Inicio', to: onHome ? '/#hero' : '/', match: (p: string) => p === '/' },
    { label: 'Catálogo', to: '/catalogo', match: (p: string) => p === '/catalogo' },
    { label: 'Servicios', to: onHome ? '/#servicios' : '/#servicios', match: () => false },
    { label: 'Contacto', to: onHome ? '/#contacto' : '/#contacto', match: () => false },
  ];
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navLinks = getNavLinks(pathname);

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
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-delbichi-black/80 border-b border-delbichi-primary/15 shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
    >
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between h-20 md:h-24">
        <Link to="/" className="flex h-full items-center py-3 md:py-4 group flex-shrink-0" id="nav-logo">
          <img
            src="/images/logo.webp"
            alt="Delbichi Motors"
            className="h-full w-auto max-w-[min(280px,55vw)] object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-opacity duration-300 group-hover:opacity-90"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-1 rounded-full border border-delbichi-metallic/20 bg-delbichi-dark/50 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          {navLinks.map((link) => {
            const isActive = link.match(pathname);
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-pill ${isActive ? 'nav-pill-active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="nav-cta"
          className="btn-bubble btn-bubble-primary btn-bubble-sm hidden md:inline-flex flex-shrink-0 whitespace-nowrap"
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
          Cotizar
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-delbichi-white p-2 flex-shrink-0"
          id="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-8 pt-4 bg-delbichi-black/95 border-t border-delbichi-metallic/10">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = link.match(pathname);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display text-lg font-semibold uppercase tracking-[0.12em] transition-colors duration-300 block py-3 border-b border-delbichi-metallic/10 ${
                      isActive
                        ? 'text-delbichi-vibrant'
                        : 'text-delbichi-gray hover:text-delbichi-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bubble btn-bubble-primary btn-bubble-md mt-6 w-full"
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
