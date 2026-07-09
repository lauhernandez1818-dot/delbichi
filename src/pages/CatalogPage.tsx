import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import HorizontalCatalog from '../components/HorizontalCatalog';
import FooterParallax from '../components/FooterParallax';

export default function CatalogPage() {
  return (
    <>
      <main>
        <div className="fixed left-4 top-24 z-40 md:left-8 md:top-28">
          <Link
            to="/"
            className="btn-bubble btn-bubble-ghost btn-bubble-sm inline-flex"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            Inicio
          </Link>
        </div>
        <HorizontalCatalog standalone />
      </main>
      <FooterParallax />
    </>
  );
}
