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
import ConsultPage from './pages/ConsultPage';
import ContactPage from './pages/ContactPage';
import { to, langFromPath, useLang } from './lang';
import { addToCart, addedToCartToast } from './cart';
import CatSolutiiRetail from './pages/categories/CatSolutiiRetail';
import CatEchipamenteDeParcare from './pages/categories/CatEchipamenteDeParcare';
import CatSistemeSupraveghereVideo from './pages/categories/CatSistemeSupraveghereVideo';

const DOCUMENT_TITLES = {
  ro: 'Organizarea si automatizarea afacerilor in Moldova | Grupul de companii RTI',
  ru: 'Организация и автоматизация бизнес процессов в Молдове | Группа компаний RTI',
  en: 'Business organization and automation in Moldova | Группа компаний RTI',
};

function DocumentMeta() {
  const lang = useLang();
  useEffect(() => {
    document.title = DOCUMENT_TITLES[lang] || DOCUMENT_TITLES.ro;
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

function CartClickHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    function handleClick(e) {
      const bag = e.target.closest('.product-card .right-body');
      const addBtn = e.target.closest('.add-to-card-btn');
      if (!bag && !addBtn) return;
      const lang = langFromPath(pathname);
      let slug = null;
      if (bag) {
        const card = bag.closest('.product-card');
        const a = card && card.querySelector('a[href*="/product/"]');
        const href = a && a.getAttribute('href');
        const m = href && href.match(/\/product\/([^/"]+)/);
        slug = m && m[1];
      } else {
        const m = pathname.match(/\/product\/([^/]+)/);
        slug = m && m[1];
      }
      if (!slug) return;
      const product = addToCart(slug, lang);
      if (product) addedToCartToast(product, lang);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LinkInterceptor() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
        navigate(to(href, langFromPath(pathname)));
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate, pathname]);

  return null;
}

// [path, element] pairs — rendered once per language prefix ('', '/ru', '/en').
// Components detect the active language from the URL via useLang().
const ROUTES = [
  ['/', <HomePage />],
  ['/index', <HomePage />],

  /* All 49 imported category pages */
  ['/category/:slug', <CategoryPage />],
  ['/category/:parent/:slug', <CategoryPage />],

  /* Product detail pages */
  ['/product/:slug', <ProductPage />],

  /* News */
  ['/noutati', <NoutatiPage />],
  ['/noutati/:slug', <ArticlePage />],

  /* Content pages */
  ['/contacte', <ContactPage />],
  ['/despre-noi', <AboutPage />],
  ['/consultation-free', <ConsultPage />],
  ['/preturi-soft-syrve', <SyrvePricingPage />],
  ['/preturi-soft-1c', <OneCPricingPage />],

  /* Solution pages mapped to matching imported categories */
  ['/solutii-automatizare-horeca', <SolutiiHorecaPage />],
  ['/automatizare-retail', <CatSolutiiRetail />],
  ['/automatizarea-magazinelor-si-retelelor-de-vanzare-cu-amanuntul', <SolutiiRetailPage />],
  ['/solutii-sisteme-parcare', <SolutiiParcarePage />],
  ['/supraveghere-video', <CatSistemeSupraveghereVideo />],
  ['/instalarea-sistemelor-de-supraveghere-video-pentru-casa-si-afacere', <SupraveghereVideoPage />],

  /* Remaining informational pages */
  ['/panouri-digitale', <SolutiiPanouriPage />],
  ['/iiko-soft-de-gestiune-horeca', <IikoPage />],
  ['/politica-de-confidentialitate', <GenericPage titleKey="footer.policyPrivacy" title="Politica de confidențialitate" />],
  ['/termeni-si-conditii', <GenericPage titleKey="footer.termsAndCond" title="Termeni și condiții" />],
  ['/account/profilul-meu', <GenericPage titleKey="account.global.login" title="Profilul meu" />],
  ['/clienti', <ClientiPage />],
];

const LANG_PREFIXES = ['', '/ru', '/en'];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <LinkInterceptor />
      <CartClickHandler />
      <DocumentMeta />
      <div className="site">
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <Routes>
          {LANG_PREFIXES.map((prefix) =>
            ROUTES.map(([path, element], i) => (
              <Route key={(prefix || 'ro') + i} path={prefix + (path === '/' ? '' : path) || '/'} element={element} />
            ))
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
