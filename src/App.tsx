import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';

function hidePageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader || loader.classList.contains('is-hidden')) return;
  loader.classList.add('is-hidden');
  window.setTimeout(() => loader.remove(), 600);
}

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    ScrollTrigger.refresh();

    if (hash) {
      const id = hash.replace('#', '');
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AppRoutes() {
  useSmoothScroll();

  return (
    <>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  useEffect(() => {
    hidePageLoader();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
