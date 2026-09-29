import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import {
  NoutatiPage,
  ArticlePage,
  ContactePage,
  DespreNoiPage,
  ConsultatiePage,
  PreturiPage,
  GenericPage,
  ClientiPage,
} from './pages/ContentPages';
import CatSolutiiHoreca from './pages/categories/CatSolutiiHoreca';
import SolutiiHorecaPage from './pages/SolutiiHorecaPage';
import SolutiiRetailPage from './pages/SolutiiRetailPage';
import SupraveghereVideoPage from './pages/SupraveghereVideoPage';
import SolutiiParcarePage from './pages/SolutiiParcarePage';
import SolutiiPanouriPage from './pages/SolutiiPanouriPage';
import IikoPage from './pages/IikoPage';
import SyrvePricingPage from './pages/SyrvePricingPage';
import OneCPricingPage from './pages/OneCPricingPage';
import AboutPage from './pages/AboutPage';
import CatSolutiiRetail from './pages/categories/CatSolutiiRetail';
import CatEchipamenteDeParcare from './pages/categories/CatEchipamenteDeParcare';
import CatSistemeSupraveghereVideo from './pages/categories/CatSistemeSupraveghereVideo';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LinkInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !anchor.target &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        navigate(href);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  return null;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <LinkInterceptor />
      <div className="site">
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index" element={<HomePage />} />

          {/* All 49 imported category pages */}
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/category/:parent/:slug" element={<CategoryPage />} />

          {/* Product detail pages */}
          <Route path="/product/:slug" element={<ProductPage />} />

          {/* News */}
          <Route path="/noutati" element={<NoutatiPage />} />
          <Route path="/noutati/:slug" element={<ArticlePage />} />

          {/* Content pages */}
          <Route path="/contacte" element={<ContactePage />} />
          <Route path="/despre-noi" element={<AboutPage />} />
          <Route path="/consultation-free" element={<ConsultatiePage />} />
          <Route path="/preturi-soft-syrve" element={<SyrvePricingPage />} />
          <Route path="/preturi-soft-1c" element={<OneCPricingPage />} />

          {/* Solution pages mapped to matching imported categories */}
          <Route path="/solutii-automatizare-horeca" element={<SolutiiHorecaPage />} />
          <Route path="/automatizare-retail" element={<CatSolutiiRetail />} />
          <Route
            path="/automatizarea-magazinelor-si-retelelor-de-vanzare-cu-amanuntul"
            element={<SolutiiRetailPage />}
          />
          <Route path="/solutii-sisteme-parcare" element={<SolutiiParcarePage />} />
          <Route path="/supraveghere-video" element={<CatSistemeSupraveghereVideo />} />
          <Route
            path="/instalarea-sistemelor-de-supraveghere-video-pentru-casa-si-afacere"
            element={<SupraveghereVideoPage />}
          />

          {/* Remaining informational pages */}
          <Route path="/panouri-digitale" element={<SolutiiPanouriPage />} />
          <Route path="/iiko-soft-de-gestiune-horeca" element={<IikoPage />} />
          <Route path="/politica-de-confidentialitate" element={<GenericPage title="Politica de confidențialitate" />} />
          <Route path="/termeni-si-conditii" element={<GenericPage title="Termeni și condiții" />} />
          <Route path="/account/profilul-meu" element={<GenericPage title="Profilul meu" />} />
          <Route path="/clienti" element={<ClientiPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
