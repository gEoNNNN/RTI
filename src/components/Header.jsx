import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import navMenuRo from '../data/nav_menu.json';
import navMenuRu from '../data/ru/nav_menu.json';
import navMenuEn from '../data/en/nav_menu.json';
import categoriesRo from '../data/categories_full.json';
import categoriesRu from '../data/ru/categories_full.json';
import categoriesEn from '../data/en/categories_full.json';
import { imgUrl } from '../data/helpers';
import { useLang, useT, to, pick, langFromPath } from '../lang';
import { getCart, cartCount, onCartChange, removeFromCart } from '../cart';

function CartIndicator() {
  const lang = useLang();
  const t = useT();
  const navigate = useNavigate();
  const [items, setItems] = useState(getCart());
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);

  useEffect(() => onCartChange(() => setItems(getCart())), []);

  useEffect(() => {
    if (!opened) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpened(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [opened]);

  const count = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <app-view-cart>
      <div className="header-cart">
        <div
          ref={ref}
          appdropdown="indicator--opened"
          className={'indicator indicator--trigger--click' + (opened ? ' indicator--opened' : '')}
        >
          <button className="indicator__button" tabIndex="0" onClick={() => setOpened((o) => !o)}>
            <span className="indicator__area">
              <CartIcon />
              <span className="indicator__value"> {count} </span>
            </span>
            <span className="text-cart ng-star-inserted"> {t('cart.viewCart', 'Cos')} </span>
          </button>
          <div className="indicator__dropdown">
            <app-header-dropcart>
              <div className="dropcart" style={{ display: opened ? 'block' : 'none' }}>
                <div className="cart-header">
                  <div className="cart-header-text">
                    <span className="cart-title">{t('cart.viewCart', 'Cos')}</span>
                    <span className="products-count">
                      {count}
                      {t('cart.articles', ' articole')}
                    </span>
                  </div>
                </div>
                <div className="dropcart__products-list">
                  {items.map((item) => (
                    <div key={item.slug} className="dropcart__product">
                      <div className="dropcart__product-info">
                        {item.image && (
                          <img src={item.image} alt={item.title} style={{ width: 60, objectFit: 'contain' }} />
                        )}
                        <div className="dropcart__product-meta">
                          <div className="dropcart__product-meta-description">
                            <a
                              href={to('/product/' + item.slug, lang)}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpened(false);
                                navigate(to('/product/' + item.slug, lang));
                              }}
                            >
                              {item.title}
                            </a>
                            <div className="dropcart__product-quantity">
                              {t('cart.quantity', 'Cantitate: ')}
                              {item.quantity}
                            </div>
                          </div>
                          <div
                            className="dropcart__product-remove"
                            style={{ cursor: 'pointer' }}
                            onClick={() => removeFromCart(item.slug)}
                          >
                            ×
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div style={{ padding: '20px 0', color: '#737373', fontSize: 14 }}>
                      {t('cart.emptyCart', 'Cosul dvs. este gol')}
                    </div>
                  )}
                </div>
              </div>
            </app-header-dropcart>
          </div>
        </div>
      </div>
    </app-view-cart>
  );
}

const NAV = { ro: navMenuRo, ru: navMenuRu, en: navMenuEn };
const CATS = { ro: categoriesRo, ru: categoriesRu, en: categoriesEn };

function ChevronDown() {
  return (
    <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fa-chevron-down fa-w-14">
      <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
    </svg>
  );
}

function PlanetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6818 14.6666 7.99992C14.6666 4.31802 11.6818 1.33325 7.99992 1.33325C4.31802 1.33325 1.33325 4.31802 1.33325 7.99992C1.33325 11.6818 4.31802 14.6666 7.99992 14.6666Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.33325 8H14.6666" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.99992 1.33325C9.66744 3.15882 10.6151 5.52794 10.6666 7.99992C10.6151 10.4719 9.66744 12.841 7.99992 14.6666C6.3324 12.841 5.38475 10.4719 5.33325 7.99992C5.38475 5.52794 6.3324 3.15882 7.99992 1.33325V1.33325Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const LANG_ITEMS = [
  { code: 'ro', label: 'Română' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

function LanguageSwitch() {
  const lang = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!opened) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpened(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [opened]);

  const switchTo = (code) => {
    setOpened(false);
    if (code === lang) return;
    const rest = location.pathname.replace(/^\/(ru|en)(?=\/|$)/, '') || '/';
    navigate(to(rest, code));
  };

  return (
    <app-language-switch ref={ref}>
      <div className="language-switch">
        <div className="switcher bottom">
          <div appdropdown="topbar-dropdown--opened" className={'topbar-dropdown' + (opened ? ' topbar-dropdown--opened' : '')}>
            <span className="icon planet">
              <PlanetIcon />
            </span>
            <button type="button" className="topbar-dropdown__btn ng-star-inserted" onClick={() => setOpened((o) => !o)}>
              <span className="current-language"> {lang} </span>
              <span className="arrow-icon ng-star-inserted">
                <ChevronDown />
              </span>
            </button>
            <div className="topbar-dropdown__body">
              <div className="language-items">
                {LANG_ITEMS.map((l) => (
                  <div key={l.code} className="language-item ng-star-inserted" onClick={() => switchTo(l.code)} style={{ cursor: 'pointer' }}>
                    <span> {l.label} </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-language-switch>
  );
}

function NavSubmenu({ items }) {
  const lang = useLang();
  return (
    <div className="nav-submenu">
      <ul className="menu">
        {items.map((s, i) => (
          <li key={i}>
            <Link to={to('/' + (s.link || '').replace(/^\//, ''), lang)}>
              {s.icon && <img alt="" src={imgUrl(s.icon)} />}
              <span>{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Department (root category) list + submenu panels — driven by localized
// categories_full so titles/icons follow the active language.
function Departments({ categories, open, activeDept, setActiveDept, openDepartments, closeDepartments, departmentsRef, setDepartmentsOpen }) {
  const lang = useLang();
  const t = useT();
  const all = Object.values(categories);
  const byParent = {};
  all.forEach((c) => {
    if (c.parent) (byParent[c.parent] = byParent[c.parent] || []).push(c);
  });
  const roots = all.filter((c) => !c.parent);
  const kidsOf = (c) => (byParent[c.id] || []);

  return (
    <div ref={departmentsRef} className={`departments ${open ? 'departments--opened' : ''}`} onMouseEnter={openDepartments} onMouseLeave={closeDepartments}>
      <div className="departments__body" style={{ display: open ? 'flex' : 'none' }} onClick={() => setDepartmentsOpen(false)}>
        <div className="departments__links-wrapper">
          <ul className="departments__links">
            {roots.map((c, i) => {
              const kids = kidsOf(c);
              return (
                <li
                  key={c.slug}
                  className={`departments__item ${kids.length ? 'departments__item--menu' : ''} ${activeDept === i ? 'active' : ''}`}
                  id={`departments__item_${i}`}
                  onMouseEnter={() => setActiveDept(i)}
                >
                  <a href={to('/category/' + c.slug, lang)}>
                    <div className="icon ng-star-inserted">
                      {c.icon && <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src={imgUrl(c.icon)} />}
                      {(c.activeIcon || c.icon) && <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src={imgUrl(c.activeIcon || c.icon)} />}
                    </div>
                    <span className="label ng-star-inserted"> {c.title} </span>
                    {kids.length > 0 && (
                      <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                        <ChevronDown />
                      </fa-icon>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="departments-subcategories">
          {roots.map((c, i) => {
            const kids = kidsOf(c);
            if (!kids.length) return null;
            return (
              <div key={c.slug} className={`department-${i} departments__menu ng-star-inserted`} style={{ display: activeDept === i ? 'block' : 'none', visibility: activeDept === i ? 'visible' : 'hidden' }}>
                <app-header-menu>
                  <ul className="menu menu--layout--classic full-width">
                    {kids.map((k) => (
                      <li className="list ng-star-inserted" key={k.slug}>
                        <a href={to(`/category/${c.slug}/${k.slug}`, lang)} className="ng-star-inserted">
                          {k.icon && <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src={imgUrl(k.icon)} />}
                          <div className="ng-star-inserted"> {k.title} </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </app-header-menu>
              </div>
            );
          })}
        </div>
      </div>
      <button ariaLabel="Products menu button." className="departments__button" onClick={() => setDepartmentsOpen((prev) => !prev)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ng-star-inserted">
          <path d="M5.3335 4H14.0002" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.3335 8H14.0002" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.3335 12H14.0002" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 4H2.00667" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 8H2.00667" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12H2.00667" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span> {t('header.megaMenu', 'Produse')} </span>
      </button>
    </div>
  );
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.28578 14.8572C6.60138 14.8572 6.85721 14.6014 6.85721 14.2858C6.85721 13.9702 6.60138 13.7144 6.28578 13.7144C5.97019 13.7144 5.71436 13.9702 5.71436 14.2858C5.71436 14.6014 5.97019 14.8572 6.28578 14.8572Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill" />
      <path d="M13.143 14.8572C13.4586 14.8572 13.7144 14.6014 13.7144 14.2858C13.7144 13.9702 13.4586 13.7144 13.143 13.7144C12.8274 13.7144 12.5715 13.9702 12.5715 14.2858C12.5715 14.6014 12.8274 14.8572 13.143 14.8572Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill" />
      <path d="M1.14282 1.14282H3.63633L5.30698 10.3243C5.36398 10.64 5.52012 10.9236 5.74805 11.1254C5.97598 11.3272 6.26118 11.4345 6.55373 11.4283H12.613C12.9055 11.4345 13.1907 11.3272 13.4186 11.1254C13.6466 10.9236 13.8027 10.64 13.8597 10.3243L14.8571 4.57131H4.25971" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3333 14V12.6667C13.3333 11.9594 13.0523 11.2811 12.5522 10.781C12.0521 10.281 11.3739 10 10.6666 10H5.33329C4.62605 10 3.94777 10.281 3.44767 10.781C2.94758 11.2811 2.66663 11.9594 2.66663 12.6667V14" stroke="#E72D35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.00004 7.33333C9.4728 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.4728 2 8.00004 2C6.52728 2 5.33337 3.19391 5.33337 4.66667C5.33337 6.13943 6.52728 7.33333 8.00004 7.33333Z" stroke="#E72D35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ stroke = '#737373' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6494 14.555 13.8195C14.4807 13.9897 14.3716 14.1424 14.2348 14.2679C14.0979 14.3934 13.9364 14.489 13.7605 14.5485C13.5847 14.6079 13.3983 14.63 13.2134 14.6133C11.1619 14.3904 9.19137 13.6894 7.46004 12.5666C5.84926 11.5431 4.48359 10.1774 3.46004 8.56665C2.33336 6.82745 1.6322 4.84731 1.41337 2.78665C1.39671 2.60229 1.41862 2.41649 1.4777 2.24107C1.53679 2.06564 1.63175 1.90444 1.75655 1.76773C1.88134 1.63102 2.03324 1.52179 2.20256 1.447C2.37189 1.37221 2.55493 1.33349 2.74004 1.33332H4.74004C5.06357 1.33013 5.37723 1.4447 5.62254 1.65567C5.86786 1.86664 6.02809 2.15961 6.07337 2.47998C6.15779 3.12003 6.31434 3.74847 6.54004 4.35332C6.62973 4.59193 6.64915 4.85126 6.59597 5.10057C6.5428 5.34988 6.41928 5.57872 6.24004 5.75998L5.39337 6.60665C6.34241 8.27568 7.72434 9.65761 9.39337 10.6066L10.24 9.75998C10.4213 9.58074 10.6501 9.45722 10.8994 9.40405C11.1488 9.35087 11.4081 9.37029 11.6467 9.45998C12.2516 9.68568 12.88 9.84223 13.52 9.92665C13.8439 9.97234 14.1396 10.1355 14.3511 10.385C14.5625 10.6345 14.6748 10.953 14.6667 11.28Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke={stroke} />
    </svg>
  );
}

function MobilePhoneIcon() {
  return (
    <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="phone-volume" className="svg-inline--fa fa-phone-volume fa-w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <path fill="currentColor" d="M97.333 506.966c-129.874-129.874-129.681-340.252 0-469.933 5.698-5.698 14.527-6.632 21.263-2.422l64.817 40.513a17.187 17.187 0 0 1 6.849 20.958l-32.408 81.021a17.188 17.188 0 0 1-17.669 10.719l-55.81-5.58c-21.051 58.261-20.612 122.471 0 179.515l55.811-5.581a17.188 17.188 0 0 1 17.669 10.719l32.408 81.022a17.188 17.188 0 0 1-6.849 20.958l-64.817 40.513a17.19 17.19 0 0 1-21.264-2.422zM247.126 95.473c11.832 20.047 11.832 45.008 0 65.055-3.95 6.693-13.108 7.959-18.718 2.581l-5.975-5.726c-3.911-3.748-4.793-9.622-2.261-14.41a32.063 32.063 0 0 0 0-29.945c-2.533-4.788-1.65-10.662 2.261-14.41l5.975-5.726c5.61-5.378 14.768-4.112 18.718 2.581zm91.787-91.187c60.14 71.604 60.092 175.882 0 247.428-4.474 5.327-12.53 5.746-17.552.933l-5.798-5.557c-4.56-4.371-4.977-11.529-.93-16.379 49.687-59.538 49.646-145.933 0-205.422-4.047-4.85-3.631-12.008.93-16.379l5.798-5.557c5.022-4.813 13.078-4.394 17.552.933zm-45.972 44.941c36.05 46.322 36.108 111.149 0 157.546-4.39 5.641-12.697 6.251-17.856 1.304l-5.818-5.579c-4.4-4.219-4.998-11.095-1.285-15.931 26.536-34.564 26.534-82.572 0-117.134-3.713-4.836-3.115-11.711 1.285-15.931l5.818-5.579c5.159-4.947 13.466-4.337 17.856 1.304z" />
    </svg>
  );
}

function SignInIcon() {
  return (
    <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="sign-in-alt" className="svg-inline--fa fa-sign-in-alt fa-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="currentColor" d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.0001 14.0001L11.1001 11.1001" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header({ onOpenMobileMenu }) {
  const lang = useLang();
  const t = useT();
  const navMenu = pick(lang, NAV.ro, NAV.ru, NAV.en);
  const categories = pick(lang, CATS.ro, CATS.ru, CATS.en);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [activeDept, setActiveDept] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [openNav, setOpenNav] = useState(-1);
  const [navFixed, setNavFixed] = useState(false);
  const deptTimer = useRef(null);
  const navTimer = useRef(null);
  const departmentsRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setNavFixed(window.scrollY > 140);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!departmentsOpen) return;
    const onDown = (e) => {
      if (departmentsRef.current && !departmentsRef.current.contains(e.target)) {
        setDepartmentsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [departmentsOpen]);

  const openDepartments = () => {
    clearTimeout(deptTimer.current);
    setDepartmentsOpen(true);
  };
  const closeDepartments = () => {
    clearTimeout(deptTimer.current);
    deptTimer.current = setTimeout(() => setDepartmentsOpen(false), 300);
  };
  const openNavItem = (i) => {
    clearTimeout(navTimer.current);
    setOpenNav(i);
  };
  const closeNavItem = () => {
    clearTimeout(navTimer.current);
    navTimer.current = setTimeout(() => setOpenNav(-1), 300);
  };

  return (
    <>
      {/* Mobile Header */}
      <div onClick={(e) => {
        const btn = e.target.closest('.mobile-header__menu-button') || e.target.closest('.menu-btn');
        if (btn && onOpenMobileMenu) {
          e.preventDefault();
          onOpenMobileMenu();
        }
      }}>
        <header className="site__header d-xl-none">
          <app-mobile-header>
            <div className="mobile-header">
              <div className="body">
                <div className="content">
                  <div className="left">
                    <button ariaLabel="Open mobile menu button" className="menu-btn mobile-button-nav">
                      <img alt="Open mobile menu icon" src="/images/menu-bars.e9efb.svg" />
                    </button>
                    <div className="logo">
                      <app-logo type="nav-mobile">
                        <div className="logo nav-mobile">
                          <a href={to('/', lang)}>
                            <img alt="Logoul companiei RTI" src="/images/Big-Logo.24063.svg" className="ng-star-inserted" />
                          </a>
                        </div>
                      </app-logo>
                    </div>
                    <div className="mobile-header-phone">
                      <a href="tel:+373%2069%20116121">
                        <fa-icon className="ng-fa-icon">
                          <MobilePhoneIcon />
                        </fa-icon>
                      </a>
                    </div>
                  </div>
                  <div className="right">
                    <div>
                      <LanguageSwitch />
                    </div>
                    <div className="cart mobile-button-nav">
                      <CartIndicator />
                    </div>
                    <div className="user mobile-button-nav">
                      <app-account-button>
                        <div className="nav-panel__indicators">
                          <a href={to('/account/profilul-meu', lang)} className="ng-star-inserted">
                            <div className="desktop login-button">
                              <span className="icon">
                                <AccountIcon />
                              </span>
                              <span className="text ng-star-inserted"> {t('account.global.login', 'Autentificare')} </span>
                            </div>
                            <div className="mobile">
                              <div className="account-btn">
                                <fa-icon className="ng-fa-icon" style={{ color: '#737373' }}>
                                  <SignInIcon />
                                </fa-icon>
                              </div>
                            </div>
                          </a>
                        </div>
                      </app-account-button>
                    </div>
                    <div className="search mobile-button-nav">
                      <app-header-search>
                        <div ariaHidden="true" className="search-overlay-shadow"></div>
                        <div id="search" className="search">
                          <form novalidate="" className="search__form ng-untouched ng-pristine ng-valid" style={{}}>
                            <input name="search" ariaLabel="Site search" type="text" autoComplete="off" className="search__input ng-untouched ng-pristine ng-valid" placeholder={t('header.searchComponent.placeholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <button ariaLabel="Search Button Icon." type="button" className="search__button">
                              <SearchIcon />
                            </button>
                          </form>
                        </div>
                      </app-header-search>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </app-mobile-header>
        </header>
      </div>

      {/* Desktop Header */}
      <div className="header-wrapper">
        <header className="site__header d-xl-block d-none">
          <app-header>
            <div className="site-header">
              <div className="container">
                <div className="site-header__left">
                  <div className="h-logo">
                    <app-logo type="main-logo">
                      <div className="logo main-logo">
                        <a href={to('/', lang)}>
                          <img alt="Logoul companiei RTI" src="/images/Big-Logo.24063.svg" className="ng-star-inserted" />
                        </a>
                      </div>
                    </app-logo>
                  </div>
                </div>
                <div className="site-header__right">
                  <div className="site-header__middle">
                    <div className="d-flex">
                      <div className="h-content">
                        <app-header-search>
                          <div ariaHidden="true" className="search-overlay-shadow"></div>
                          <div id="search" className="search">
                            <form novalidate="" className="search__form ng-untouched ng-pristine ng-valid" style={{}}>
                              <input name="search" ariaLabel="Site search" type="text" autoComplete="off" className="search__input ng-untouched ng-pristine ng-valid" placeholder={t('header.searchComponent.placeholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                              <button ariaLabel="Search Button Icon." type="button" className="search__button">
                                <SearchIcon />
                              </button>
                            </form>
                          </div>
                        </app-header-search>
                        <div className="grey-line margin"></div>
                        <app-phone-number>
                          <div className="phone-number">
                            <a href="tel:+373%2069%20116121">
                              <span className="icon">
                                <PhoneIcon />
                              </span>
                              <span className="mobile-number ng-star-inserted" style={{ color: '#737373' }}> +373 69 116121 </span>
                            </a>
                          </div>
                        </app-phone-number>
                        <div className="grey-line margin"></div>
                        <LanguageSwitch />
                        <div className="grey-line margin"></div>
                        <CartIndicator />
                        <div className="grey-line margin"></div>
                        <div className="account-btn">
                          <app-account-button>
                            <div className="nav-panel__indicators">
                              <a href={to('/account/profilul-meu', lang)} className="ng-star-inserted">
                                <div className="desktop login-button">
                                  <span className="icon">
                                    <AccountIcon />
                                  </span>
                                  <span className="text ng-star-inserted"> {t('account.global.login', 'Autentificare')} </span>
                                </div>
                                <div className="mobile">
                                  <div className="account-btn">
                                    <fa-icon className="ng-fa-icon" style={{ color: '#000000' }}>
                                      <SignInIcon />
                                    </fa-icon>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </app-account-button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grey-line horizontal"></div>
                  <div className="site-header__nav-panel">
                    <app-header-nav>
                      <div className={`nav-panel ${navFixed ? 'fixed' : ''}`}>
                        <div className="nav-panel__container">
                          <div className="nav-panel__row">
                            <div className="sticky-logo">
                              <div className="logo">
                                <a href={to('/', lang)}>
                                  <img alt="RTI mini logo." className="sticky-logo-class" src="/images/Lil-Logo.24063.svg" />
                                </a>
                              </div>
                            </div>
                            <app-header-links className="nav-panel__nav-links nav-links">
                              <ul className="nav-links__list">
                                <li id="departmentIdItem" className="nav-links__item nav-links__item--with-submenu first">
                                  <app-header-departments>
                                    <Departments
                                      categories={categories}
                                      open={departmentsOpen}
                                      activeDept={activeDept}
                                      setActiveDept={setActiveDept}
                                      openDepartments={openDepartments}
                                      closeDepartments={closeDepartments}
                                      departmentsRef={departmentsRef}
                                      setDepartmentsOpen={setDepartmentsOpen}
                                    />
                                  </app-header-departments>
                                </li>
                                {navMenu.map((item, i) => {
                                  const hasSub = (item.submenu || []).length > 0;
                                  const link = '/' + (item.link || '').replace(/^\//, '');
                                  const target = to(link === '/' && hasSub ? '/' : link, lang);
                                  return (
                                    <li
                                      key={i}
                                      className={`nav-links__item nav-item-count-${i} nav-links__item--with-submenu ng-star-inserted`}
                                      onMouseEnter={hasSub ? () => openNavItem(i) : undefined}
                                      onMouseLeave={hasSub ? closeNavItem : undefined}
                                    >
                                      {hasSub ? (
                                        <a className="cursor-pointer ng-star-inserted" onClick={(e) => e.preventDefault()}>
                                          <span className="item-nav-link ng-star-inserted">
                                            <span className="item-icon ng-star-inserted">
                                              {item.icon && <img alt="Inactive link icon" className="inactive" src={imgUrl(item.icon)} />}
                                              {(item.activeIcon || item.icon) && <img alt="Active link icon" className="active" src={imgUrl(item.activeIcon || item.icon)} />}
                                            </span>
                                            <span className="item-title"> {item.title} </span>
                                          </span>
                                        </a>
                                      ) : (
                                        <a href={target} className="ng-star-inserted">
                                          <span className="item-nav-link ng-star-inserted">
                                            <span className="item-icon ng-star-inserted">
                                              {item.icon && <img alt="Inactive link icon" className="inactive" src={imgUrl(item.icon)} />}
                                              {(item.activeIcon || item.icon) && <img alt="Active link icon" className="active" src={imgUrl(item.activeIcon || item.icon)} />}
                                            </span>
                                            <span className="item-title"> {item.title} </span>
                                          </span>
                                        </a>
                                      )}
                                      {hasSub && openNav === i && <NavSubmenu items={item.submenu} />}
                                    </li>
                                  );
                                })}
                              </ul>
                            </app-header-links>
                          </div>
                        </div>
                      </div>
                    </app-header-nav>
                  </div>
                </div>
              </div>
            </div>
          </app-header>
        </header>
      </div>
    </>
  );
}
