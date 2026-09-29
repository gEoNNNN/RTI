import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import navMenu from '../data/nav_menu.json';

function navIcon(path) {
  return path ? '/images/' + path.split('/').pop().replace('.svg', '.2e5cc.svg') : null;
}

function NavSubmenu({ items }) {
  return (
    <div className="nav-submenu">
      <ul className="menu">
        {items.map((s, i) => (
          <li key={i}>
            <Link to={'/' + (s.link || '').replace(/^\//, '')}>
              {navIcon(s.icon) && <img alt="" src={navIcon(s.icon)} />}
              <span>{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Header({ onOpenMobileMenu }) {
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
                          <a href="/">
                            <img alt="Logoul companiei RTI" src="/images/Big-Logo.24063.svg" className="ng-star-inserted" />
                          </a>
                        </div>
                      </app-logo>
                    </div>
                    <div className="mobile-header-phone">
                      <a href="tel:+373%2069%20116121">
                        <fa-icon className="ng-fa-icon">
                          <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="phone-volume" className="svg-inline--fa fa-phone-volume fa-w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path fill="currentColor" d="M97.333 506.966c-129.874-129.874-129.681-340.252 0-469.933 5.698-5.698 14.527-6.632 21.263-2.422l64.817 40.513a17.187 17.187 0 0 1 6.849 20.958l-32.408 81.021a17.188 17.188 0 0 1-17.669 10.719l-55.81-5.58c-21.051 58.261-20.612 122.471 0 179.515l55.811-5.581a17.188 17.188 0 0 1 17.669 10.719l32.408 81.022a17.188 17.188 0 0 1-6.849 20.958l-64.817 40.513a17.19 17.19 0 0 1-21.264-2.422zM247.126 95.473c11.832 20.047 11.832 45.008 0 65.055-3.95 6.693-13.108 7.959-18.718 2.581l-5.975-5.726c-3.911-3.748-4.793-9.622-2.261-14.41a32.063 32.063 0 0 0 0-29.945c-2.533-4.788-1.65-10.662 2.261-14.41l5.975-5.726c5.61-5.378 14.768-4.112 18.718 2.581zm91.787-91.187c60.14 71.604 60.092 175.882 0 247.428-4.474 5.327-12.53 5.746-17.552.933l-5.798-5.557c-4.56-4.371-4.977-11.529-.93-16.379 49.687-59.538 49.646-145.933 0-205.422-4.047-4.85-3.631-12.008.93-16.379l5.798-5.557c5.022-4.813 13.078-4.394 17.552.933zm-45.972 44.941c36.05 46.322 36.108 111.149 0 157.546-4.39 5.641-12.697 6.251-17.856 1.304l-5.818-5.579c-4.4-4.219-4.998-11.095-1.285-15.931 26.536-34.564 26.534-82.572 0-117.134-3.713-4.836-3.115-11.711 1.285-15.931l5.818-5.579c5.159-4.947 13.466-4.337 17.856 1.304z"></path>
                          </svg>
                        </fa-icon>
                      </a>
                    </div>
                  </div>
                  <div className="right">
                    <div>
                      <app-language-switch>
                        <div className="language-switch">
                          <div className="switcher bottom">
                            <div appdropdown="topbar-dropdown--opened" className="topbar-dropdown">
                              <span className="icon planet">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6818 14.6666 7.99992C14.6666 4.31802 11.6818 1.33325 7.99992 1.33325C4.31802 1.33325 1.33325 4.31802 1.33325 7.99992C1.33325 11.6818 4.31802 14.6666 7.99992 14.6666Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                  <path d="M1.33325 8H14.6666" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                  <path d="M7.99992 1.33325C9.66744 3.15882 10.6151 5.52794 10.6666 7.99992C10.6151 10.4719 9.66744 12.841 7.99992 14.6666C6.3324 12.841 5.38475 10.4719 5.33325 7.99992C5.38475 5.52794 6.3324 3.15882 7.99992 1.33325V1.33325Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                              </span>
                              <button type="button" className="topbar-dropdown__btn ng-star-inserted">
                                <span className="current-language">
                                   ro 
                                </span>
                                <span className="arrow-icon ng-star-inserted">
                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fa-chevron-down fa-w-14">
                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                  </svg>
                                </span>
                              </button>
                              <div className="topbar-dropdown__body">
                                <div className="language-items">
                                  <div className="language-item ng-star-inserted">
                                    <span>
                                       Română
                                    </span>
                                  </div>
                                  <div className="language-item ng-star-inserted">
                                    <span>
                                       Русский
                                    </span>
                                  </div>
                                  <div className="language-item ng-star-inserted">
                                    <span>
                                       English
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </app-language-switch>
                    </div>
                    <div className="cart mobile-button-nav">
                      <app-view-cart>
                        <div className="header-cart">
                          <div appdropdown="indicator--opened" className="indicator indicator--trigger--click">
                            <button className="indicator__button" tabIndex="0">
                              <span className="indicator__area">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6.28578 14.8572C6.60138 14.8572 6.85721 14.6014 6.85721 14.2858C6.85721 13.9702 6.60138 13.7144 6.28578 13.7144C5.97019 13.7144 5.71436 13.9702 5.71436 14.2858C5.71436 14.6014 5.97019 14.8572 6.28578 14.8572Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill"></path>
                                  <path d="M13.143 14.8572C13.4586 14.8572 13.7144 14.6014 13.7144 14.2858C13.7144 13.9702 13.4586 13.7144 13.143 13.7144C12.8274 13.7144 12.5715 13.9702 12.5715 14.2858C12.5715 14.6014 12.8274 14.8572 13.143 14.8572Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill"></path>
                                  <path d="M1.14282 1.14282H3.63633L5.30698 10.3243C5.36398 10.64 5.52012 10.9236 5.74805 11.1254C5.97598 11.3272 6.26118 11.4345 6.55373 11.4283H12.613C12.9055 11.4345 13.1907 11.3272 13.4186 11.1254C13.6466 10.9236 13.8027 10.64 13.8597 10.3243L14.8571 4.57131H4.25971" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span className="indicator__value">
                                  0
                                </span>
                              </span>
                              <span className="text-cart ng-star-inserted">
                                 Cos 
                              </span>
                            </button>
                            <div className="indicator__dropdown">
                              <app-header-dropcart>
                                <div className="dropcart" style={{ display: 'none' }}></div>
                              </app-header-dropcart>
                            </div>
                          </div>
                        </div>
                      </app-view-cart>
                    </div>
                    <div className="user mobile-button-nav">
                      <app-account-button>
                        <div className="nav-panel__indicators">
                          <a href="/account/profilul-meu" className="ng-star-inserted">
                            <div className="desktop login-button">
                              <span className="icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M13.3333 14V12.6667C13.3333 11.9594 13.0523 11.2811 12.5522 10.781C12.0521 10.281 11.3739 10 10.6666 10H5.33329C4.62605 10 3.94777 10.281 3.44767 10.781C2.94758 11.2811 2.66663 11.9594 2.66663 12.6667V14" stroke="#E72D35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                  <path d="M8.00004 7.33333C9.4728 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.4728 2 8.00004 2C6.52728 2 5.33337 3.19391 5.33337 4.66667C5.33337 6.13943 6.52728 7.33333 8.00004 7.33333Z" stroke="#E72D35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                              </span>
                              <span className="text ng-star-inserted">
                                 Autentificare 
                              </span>
                            </div>
                            <div className="mobile">
                              <div className="account-btn">
                                <fa-icon className="ng-fa-icon" style={{ color: '#737373' }}>
                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="sign-in-alt" className="svg-inline--fa fa-sign-in-alt fa-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"></path>
                                  </svg>
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
                          <form novalidate="" className="search__form ng-untouched ng-pristine ng-valid" style={{  }}>
                            <input name="search" ariaLabel="Site search" type="text" autoComplete="off" className="search__input ng-untouched ng-pristine ng-valid" placeholder="Introduceti un cuvant cheie sau model" value="" />
                            <button ariaLabel="Search Button Icon." type="button" className="search__button">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M14.0001 14.0001L11.1001 11.1001" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
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
                        <a href="/">
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
                            <form novalidate="" className="search__form ng-untouched ng-pristine ng-valid" style={{  }}>
                              <input name="search" ariaLabel="Site search" type="text" autoComplete="off" className="search__input ng-untouched ng-pristine ng-valid" placeholder="Introduceti un cuvant cheie sau model" value="" />
                              <button ariaLabel="Search Button Icon." type="button" className="search__button">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                  <path d="M14.0001 14.0001L11.1001 11.1001" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                              </button>
                            </form>
                          </div>
                        </app-header-search>
                        <div className="grey-line margin"></div>
                        <app-phone-number>
                          <div className="phone-number">
                            <a href="tel:+373%2069%20116121">
                              <span className="icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6494 14.555 13.8195C14.4807 13.9897 14.3716 14.1424 14.2348 14.2679C14.0979 14.3934 13.9364 14.489 13.7605 14.5485C13.5847 14.6079 13.3983 14.63 13.2134 14.6133C11.1619 14.3904 9.19137 13.6894 7.46004 12.5666C5.84926 11.5431 4.48359 10.1774 3.46004 8.56665C2.33336 6.82745 1.6322 4.84731 1.41337 2.78665C1.39671 2.60229 1.41862 2.41649 1.4777 2.24107C1.53679 2.06564 1.63175 1.90444 1.75655 1.76773C1.88134 1.63102 2.03324 1.52179 2.20256 1.447C2.37189 1.37221 2.55493 1.33349 2.74004 1.33332H4.74004C5.06357 1.33013 5.37723 1.4447 5.62254 1.65567C5.86786 1.86664 6.02809 2.15961 6.07337 2.47998C6.15779 3.12003 6.31434 3.74847 6.54004 4.35332C6.62973 4.59193 6.64915 4.85126 6.59597 5.10057C6.5428 5.34988 6.41928 5.57872 6.24004 5.75998L5.39337 6.60665C6.34241 8.27568 7.72434 9.65761 9.39337 10.6066L10.24 9.75998C10.4213 9.58074 10.6501 9.45722 10.8994 9.40405C11.1488 9.35087 11.4081 9.37029 11.6467 9.45998C12.2516 9.68568 12.88 9.84223 13.52 9.92665C13.8439 9.97234 14.1396 10.1355 14.3511 10.385C14.5625 10.6345 14.6748 10.953 14.6667 11.28Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#737373"></path>
                                </svg>
                              </span>
                              <span className="mobile-number ng-star-inserted" style={{ color: '#737373' }}>
                                 +373 69 116121
                              </span>
                            </a>
                          </div>
                        </app-phone-number>
                        <div className="grey-line margin"></div>
                        <app-language-switch>
                          <div className="language-switch">
                            <div className="switcher bottom">
                              <div appdropdown="topbar-dropdown--opened" className="topbar-dropdown">
                                <span className="icon planet">
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6818 14.6666 7.99992C14.6666 4.31802 11.6818 1.33325 7.99992 1.33325C4.31802 1.33325 1.33325 4.31802 1.33325 7.99992C1.33325 11.6818 4.31802 14.6666 7.99992 14.6666Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M1.33325 8H14.6666" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M7.99992 1.33325C9.66744 3.15882 10.6151 5.52794 10.6666 7.99992C10.6151 10.4719 9.66744 12.841 7.99992 14.6666C6.3324 12.841 5.38475 10.4719 5.33325 7.99992C5.38475 5.52794 6.3324 3.15882 7.99992 1.33325V1.33325Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                                <button type="button" className="topbar-dropdown__btn ng-star-inserted">
                                  <span className="current-language">
                                     ro 
                                  </span>
                                  <span className="arrow-icon ng-star-inserted">
                                    <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fa-chevron-down fa-w-14">
                                      <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                    </svg>
                                  </span>
                                </button>
                                <div className="topbar-dropdown__body">
                                  <div className="language-items">
                                    <div className="language-item ng-star-inserted">
                                      <span>
                                         Română
                                      </span>
                                    </div>
                                    <div className="language-item ng-star-inserted">
                                      <span>
                                         Русский
                                      </span>
                                    </div>
                                    <div className="language-item ng-star-inserted">
                                      <span>
                                         English
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </app-language-switch>
                        <div className="grey-line margin"></div>
                        <app-view-cart>
                          <div className="header-cart">
                            <div appdropdown="indicator--opened" className="indicator indicator--trigger--click">
                              <button className="indicator__button" tabIndex="0">
                                <span className="indicator__area">
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.28578 14.8572C6.60138 14.8572 6.85721 14.6014 6.85721 14.2858C6.85721 13.9702 6.60138 13.7144 6.28578 13.7144C5.97019 13.7144 5.71436 13.9702 5.71436 14.2858C5.71436 14.6014 5.97019 14.8572 6.28578 14.8572Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill"></path>
                                    <path d="M13.143 14.8572C13.4586 14.8572 13.7144 14.6014 13.7144 14.2858C13.7144 13.9702 13.4586 13.7144 13.143 13.7144C12.8274 13.7144 12.5715 13.9702 12.5715 14.2858C12.5715 14.6014 12.8274 14.8572 13.143 14.8572Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill"></path>
                                    <path d="M1.14282 1.14282H3.63633L5.30698 10.3243C5.36398 10.64 5.52012 10.9236 5.74805 11.1254C5.97598 11.3272 6.26118 11.4345 6.55373 11.4283H12.613C12.9055 11.4345 13.1907 11.3272 13.4186 11.1254C13.6466 10.9236 13.8027 10.64 13.8597 10.3243L14.8571 4.57131H4.25971" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                  <span className="indicator__value">
                                    0
                                  </span>
                                </span>
                                <span className="text-cart ng-star-inserted">
                                   Cos 
                                </span>
                              </button>
                              <div className="indicator__dropdown">
                                <app-header-dropcart>
                                  <div className="dropcart" style={{ display: 'none' }}></div>
                                </app-header-dropcart>
                              </div>
                            </div>
                          </div>
                        </app-view-cart>
                        <div className="grey-line margin"></div>
                        <div className="account-btn">
                          <app-account-button>
                            <div className="nav-panel__indicators">
                              <a href="/account/profilul-meu" className="ng-star-inserted">
                                <div className="desktop login-button">
                                  <span className="icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M13.3333 14V12.6667C13.3333 11.9594 13.0523 11.2811 12.5522 10.781C12.0521 10.281 11.3739 10 10.6666 10H5.33329C4.62605 10 3.94777 10.281 3.44767 10.781C2.94758 11.2811 2.66663 11.9594 2.66663 12.6667V14" stroke="#E72D35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M8.00004 7.33333C9.4728 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.4728 2 8.00004 2C6.52728 2 5.33337 3.19391 5.33337 4.66667C5.33337 6.13943 6.52728 7.33333 8.00004 7.33333Z" stroke="#E72D35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                  <span className="text ng-star-inserted">
                                     Autentificare 
                                  </span>
                                </div>
                                <div className="mobile">
                                  <div className="account-btn">
                                    <fa-icon className="ng-fa-icon" style={{ color: '#000000' }}>
                                      <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="sign-in-alt" className="svg-inline--fa fa-sign-in-alt fa-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"></path>
                                      </svg>
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
                      <div className={`nav-panel ${navFixed ? "fixed" : ""}`}>
                        <div className="nav-panel__container">
                          <div className="nav-panel__row">
                            <div className="sticky-logo">
                              <div className="logo">
                                <a href="/">
                                  <img alt="RTI mini logo." className="sticky-logo-class" src="/images/Lil-Logo.24063.svg" />
                                </a>
                              </div>
                            </div>
                            <app-header-links className="nav-panel__nav-links nav-links">
                              <ul className="nav-links__list">
                                <li id="departmentIdItem" className="nav-links__item nav-links__item--with-submenu first">
                                  <app-header-departments>
                                    <div ref={departmentsRef} className={`departments ${departmentsOpen ? "departments--opened" : ""}`} onMouseEnter={openDepartments} onMouseLeave={closeDepartments}>
                                      <div className="departments__body" style={{ display: departmentsOpen ? "flex" : "none" }} onClick={() => setDepartmentsOpen(false)}>
                                        <div className="departments__links-wrapper">
                                          <ul className="departments__links">
                                            <li className={`departments__item departments__item--menu ${activeDept === 0 ? "active" : ""}`} id="departments__item_0" onMouseEnter={() => setActiveDept(0)}>
                                              <a href="/category/pospc-specializat">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/388bd559-cdbe-40fe-909c-01e9c99cd41b.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/cff9f961-2659-4ffe-b34e-44ced14a8dcb.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   POS/PC specializat
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item ${activeDept === 1 ? "active" : ""}`} id="departments__item_1" onMouseEnter={() => setActiveDept(1)}>
                                              <a href="/category/echipamente-fiscale">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/d14bb8d5-eed3-4659-b217-9409eeb819df.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/edb2d11d-501c-49ef-97bc-6c533a736158.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Echipamente fiscale
                                                </span>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 2 ? "active" : ""}`} id="departments__item_2" onMouseEnter={() => setActiveDept(2)}>
                                              <a href="/category/imprimante">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/412efdb8-97ce-4bff-8ef1-6380fae276ce.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/1c3a765d-fdc6-4de5-8521-55035a29c3ad.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Imprimante 
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 3 ? "active" : ""}`} id="departments__item_3" onMouseEnter={() => setActiveDept(3)}>
                                              <a href="/category/cantare-comerciale">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/719fc604-31f0-4735-a1ed-f1feaac8c0a0.95d1f.png" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/25f82dc0-4f80-4813-9977-aea72537040f.95d1f.png" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Cantare comerciale
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 4 ? "active" : ""}`} id="departments__item_4" onMouseEnter={() => setActiveDept(4)}>
                                              <a href="/category/scanere-coduri-de-bare">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/9913315e-fa08-41dd-abfd-f168c1629182.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/2433ef8e-f97e-40d2-9a1b-d2097c775a3c.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Scanere coduri de bare
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 5 ? "active" : ""}`} id="departments__item_5" onMouseEnter={() => setActiveDept(5)}>
                                              <a href="/category/terminale-colectare-date">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/3bff2ee7-0e5d-4cc6-8866-3e3259813ce3.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/f02c5dd5-49d8-4ab1-98b8-76b5932819ce.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Terminale colectare date
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 6 ? "active" : ""}`} id="departments__item_6" onMouseEnter={() => setActiveDept(6)}>
                                              <a href="/category/case-de-autodeservire">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/89075582-863c-49d9-b1ff-eca1d22ff770.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/e4eb9596-c69e-4344-af7e-987b3f5d51ce.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Case de autodeservire
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item ${activeDept === 7 ? "active" : ""}`} id="departments__item_7" onMouseEnter={() => setActiveDept(7)}>
                                              <a href="/category/sistem-numarare-vizitatori">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/7295179b-6b8e-42d8-a28e-14bc628d6220.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/0d344815-ebed-4b56-849b-54093fb34e41.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Sistem numarare vizitatori
                                                </span>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 8 ? "active" : ""}`} id="departments__item_8" onMouseEnter={() => setActiveDept(8)}>
                                              <a href="/category/sistem-antifurt">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/79f1a2b5-21fc-47f5-8468-44364344370d.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/e8ba4623-4d99-4d2f-aa0a-830265d9634a.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Sistem antifurt
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 9 ? "active" : ""}`} id="departments__item_9" onMouseEnter={() => setActiveDept(9)}>
                                              <a href="/category/echipamente-de-parcare">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/b2b0fe8b-9f88-4941-a285-a7ae332868ed.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/8e8b4a2b-d7f7-47d5-8122-3671e59c70ff.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Echipamente de parcare
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 10 ? "active" : ""}`} id="departments__item_10" onMouseEnter={() => setActiveDept(10)}>
                                              <a href="/category/sisteme-supraveghere-video">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/92aefe24-ee4e-4491-8db9-6d7707c56cf1.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/1ab3281e-1f56-4ba1-b1b4-6fe0eb96a5db.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Sisteme supraveghere video
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 11 ? "active" : ""}`} id="departments__item_11" onMouseEnter={() => setActiveDept(11)}>
                                              <a href="/category/sisteme-audio">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/8687d167-03b6-40a5-8f08-62313f299e91.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/33c5b062-f31f-4b45-ad6a-1f24e910a745.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Sisteme audio
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 12 ? "active" : ""}`} id="departments__item_12" onMouseEnter={() => setActiveDept(12)}>
                                              <a href="/category/sistem-control-acces">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/e205feec-7ba6-4fa5-8da2-0f24af0d6bc5.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/8d50e91b-fd83-4ab2-af26-a7bbd56bbddd.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Sistem control acces
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 13 ? "active" : ""}`} id="departments__item_13" onMouseEnter={() => setActiveDept(13)}>
                                              <a href="/category/echipament-primireemitere-numerar">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/22892391-7047-4804-be11-c40dafa1a1f4.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/93f1ea3a-d51e-4556-a952-d0c67946d287.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Echipament primire/emitere numerar
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 14 ? "active" : ""}`} id="departments__item_14" onMouseEnter={() => setActiveDept(14)}>
                                              <a href="/category/echipamente-industriale-alimentare">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/d8ba2053-4958-4dba-8d3a-493fdb631ddf.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/ffeebc51-b2b5-4fa9-8261-eb5a8c1039f2.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Echipamente industriale alimentare
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item ${activeDept === 15 ? "active" : ""}`} id="departments__item_15" onMouseEnter={() => setActiveDept(15)}>
                                              <a href="/category/echipamente-wireless">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/42e7b0a0-912e-426b-9ccb-fa2c9ff7cf4a.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/adae1409-7e7d-409f-89ce-2a8ffeea15b5.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Echipamente wireless
                                                </span>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 16 ? "active" : ""}`} id="departments__item_16" onMouseEnter={() => setActiveDept(16)}>
                                              <a href="/category/sisteme-antiincendiu">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/ea3a76d9-baef-478b-98f6-6bcdacc32c58.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/37ad6601-3f20-437f-aa9b-0abbc1ed7ad2.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Sisteme antiincendiu
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item departments__item--menu ${activeDept === 17 ? "active" : ""}`} id="departments__item_17" onMouseEnter={() => setActiveDept(17)}>
                                              <a href="/category/consumabile">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/bbd71f8c-263f-49e0-b5f8-20822079999d.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/80a4244a-0fd6-4a89-9a17-0bdc9bff0ae4.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Consumabile
                                                </span>
                                                <fa-icon className="ng-fa-icon departments__link-arrow ng-star-inserted">
                                                  <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                                  </svg>
                                                </fa-icon>
                                              </a>
                                            </li>
                                            <li className={`departments__item ${activeDept === 18 ? "active" : ""}`} id="departments__item_18" onMouseEnter={() => setActiveDept(18)}>
                                              <a href="/category/sudare-cu-fibre-optice">
                                                <div className="icon ng-star-inserted">
                                                  <img alt="Inactive link icon" loading="lazy" className="inactive ng-star-inserted" src="/images/5ddc7954-6a35-4a83-a999-4a9c376a41de.95d1f.svg" />
                                                  <img alt="Active link icon" loading="lazy" className="active ng-star-inserted" src="/images/3a6dfb7f-e108-458e-80a1-fae347cb0fea.95d1f.svg" />
                                                </div>
                                                <span className="label ng-star-inserted">
                                                   Sudare cu fibre optice
                                                </span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="departments-subcategories">
                                          <div className="department-0 departments__menu ng-star-inserted" style={{ display: activeDept === 0 ? "block" : "none", visibility: activeDept === 0 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/sistem-pos" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/ee89a3ce-1629-4e9a-a425-7c4c81fb133b.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Sistem POS
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/echipamente-pos-suplimentare" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/d8ec6793-3d18-4a71-a0da-cdf4667183e3.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Echipamente POS suplimentare
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-2 departments__menu ng-star-inserted" style={{ display: activeDept === 2 ? "block" : "none", visibility: activeDept === 2 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/imprimante-termice" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/536410cc-63cf-4a78-937a-bd4d65751c97.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Imprimante termice
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/imprimante-de-etichete" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/d231e4fd-6da1-43b8-b8bf-480784833bab.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Imprimante de etichete
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/imprimante-portabile" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/53334a97-fbda-4952-8b6c-488aab82f2d9.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Imprimante portabile
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/imprimante-industriale" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/431fa255-f714-4026-8c33-4a879da3d5b3.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Imprimante industriale
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/imprimante-de-carduri" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/189bd2d2-f395-46c5-8ca4-45637dd89972.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Imprimante de carduri
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-3 departments__menu ng-star-inserted" style={{ display: activeDept === 3 ? "block" : "none", visibility: activeDept === 3 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/pc-based" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/74aaa6ea-9c02-4bb8-812a-915613109fca.95d1f.webp" />
                                                    <div className="ng-star-inserted">
                                                      PC Based
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/dibal-500" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/0deb9bb7-e38a-4407-847b-a833abdeb6ef.jfif" />
                                                    <div className="ng-star-inserted">
                                                      Dibal  500 
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/dibal-900" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/e4d77d4a-40f5-4b72-b5b6-e09e1e79e124.95d1f.webp" />
                                                    <div className="ng-star-inserted">
                                                      Dibal  900 
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-4 departments__menu ng-star-inserted" style={{ display: activeDept === 4 ? "block" : "none", visibility: activeDept === 4 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/scanere-manuale" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/f6648284-4fe1-4529-b6ca-ac0d2fff2825.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Scanere manuale
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/scanere-de-masa" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/b3faef36-1384-45ba-8a17-182434a3c644.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Scanere de masa
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/scanere-bi-optic" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/b8b29d1c-2ccc-443e-bcb4-b09a087a53fe.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Scanere Bi-optic
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/scanere-incorporate" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/be41f14f-b5b2-49a2-978f-5bf2ad4d8225.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                       Scanere  încorporate
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-5 departments__menu ng-star-inserted" style={{ display: activeDept === 5 ? "block" : "none", visibility: activeDept === 5 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/terminale-chainway" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/25313bf3-525c-459b-bed0-fde6a7391cba.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Terminale Chainway
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/terminale-datalogic" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/0261fdc8-1a9b-453d-8934-e19737c7221e.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Terminale Datalogic
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-6 departments__menu ng-star-inserted" style={{ display: activeDept === 6 ? "block" : "none", visibility: activeDept === 6 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/solutii-horeca" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/59468627-2707-437a-9c67-c820e4c98fec.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Solutii HoReCa 
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/solutii-retail" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/42bee20d-8c85-4701-99c5-4951ba3c5f2f.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Solutii Retail
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-8 departments__menu ng-star-inserted" style={{ display: activeDept === 8 ? "block" : "none", visibility: activeDept === 8 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/antene-antifurt-am" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/dbe97e98-51fb-476c-8ae2-65a7c2e79370.95d1f.png" />
                                                    <div className="ng-star-inserted">
                                                      Antene Antifurt AM
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/antene-antifurt-rf" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/172f723b-37e1-4099-9993-06936043f62a.95d1f.png" />
                                                    <div className="ng-star-inserted">
                                                      Antene Antifurt RF
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/accesorii-antifurt" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/c9e4edd9-74fc-41c7-9d36-91594c597601.95d1f.png" />
                                                    <div className="ng-star-inserted">
                                                      Accesorii Antifurt 
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/detacher" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/9092f296-bf74-47ab-9d1e-99fb002313df.95d1f.png" />
                                                    <div className="ng-star-inserted">
                                                      Detacher
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/safer" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/f61fe308-3520-48e8-a35e-7b2e426475b6.95d1f.png" />
                                                    <div className="ng-star-inserted">
                                                       Safer 
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-9 departments__menu ng-star-inserted" style={{ display: activeDept === 9 ? "block" : "none", visibility: activeDept === 9 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/ticket-system" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/4c1efe65-42ba-4302-b7bd-06e99a15dac8.95d1f.svg" />
                                                    <div className="ng-star-inserted">
                                                      Ticket System
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/cardpass-rparking" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/f5f1917f-49c0-4dd1-9289-2dd76c0fc97e.95d1f.svg" />
                                                    <div className="ng-star-inserted">
                                                      CardPass RParking
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/terminal-de-plata" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/be4233b6-2dc4-4617-968e-21aea981a434.95d1f.svg" />
                                                    <div className="ng-star-inserted">
                                                      Terminal de Plata
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/bariera-automata" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/89e036df-835f-4573-8d67-95b506e51458.95d1f.svg" />
                                                    <div className="ng-star-inserted">
                                                      Barieră Automată 
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/accesorii-de-parcare" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/ed4ef64a-00fe-4619-b2c7-42d56efb52bb.95d1f.svg" />
                                                    <div className="ng-star-inserted">
                                                      Accesorii de Parcare 
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-10 departments__menu ng-star-inserted" style={{ display: activeDept === 10 ? "block" : "none", visibility: activeDept === 10 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/sisteme-nvr" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/c83d67dc-97e7-4f6c-8946-a794e7f06a8b.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Sisteme NVR
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/camere-video-ptz" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/b465460a-be63-4a24-96cc-af3722ae333a.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Camere video PTZ
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/ip-camere-de-interior" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/bdb98833-747a-4f1d-82d1-8018057a1803.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      IP camere de interior
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/ip-camere-de-exterior" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/35ca807e-04f3-47cd-add5-5846939c5cb0.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      IP camere de exterior
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-11 departments__menu ng-star-inserted" style={{ display: activeDept === 11 ? "block" : "none", visibility: activeDept === 11 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/difuzoare-audio" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/207c103f-da94-4ef9-aa18-b17465900ce8.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Difuzoare audio
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/amplificatoare-audio" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/3d150501-febb-47d1-94f7-ce134692ca73.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Amplificatoare audio
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/accesorii-audio" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/bf6fe54f-b3f8-46cc-a3d9-fa48e00e02d3.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Accesorii audio
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-12 departments__menu ng-star-inserted" style={{ display: activeDept === 12 ? "block" : "none", visibility: activeDept === 12 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/turnichete" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/537964c7-ac00-470a-a0d2-369418f142d3.95d1f.svg" />
                                                    <div className="ng-star-inserted">
                                                      Turnichete
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/sisteme-biometrice" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/b8dce45d-b496-40a6-a390-21159e130570.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Sisteme biometrice
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/controlere-de-acces" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/4373899d-12b7-4b61-90e1-ae0280465c73.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Controlere de acces
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/cititoare" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/75ba33bb-a137-4b62-bdb7-84a8e2e4a108.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Cititoare
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/lacate-electronice" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/bdc20d0a-d3c9-4fa8-856c-400b0a49cebb.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Lacate electronice
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/accesorii" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/39912824-273d-473e-bbea-365b6b22c342.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Accesorii
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-13 departments__menu ng-star-inserted" style={{ display: activeDept === 13 ? "block" : "none", visibility: activeDept === 13 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/acceptoare-monede" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/5f01b9cb-21dd-4de6-8cf3-28650df45573.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Acceptoare monede
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/validatoracceptor-numerar" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/27e4dc33-a9a0-4b08-af6d-f0d4d83f48dd.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Validator/acceptor numerar
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/automate-de-schimb" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/296c7671-c1d3-4ecb-8d47-adcc9e0feb86.95d1f.svg" />
                                                    <div className="ng-star-inserted">
                                                      Automate de schimb
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-14 departments__menu ng-star-inserted" style={{ display: activeDept === 14 ? "block" : "none", visibility: activeDept === 14 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/masini-automate-de-etichetare" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/97decb30-d4c0-4c9f-9923-2425194dc5f8.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Masini automate de etichetare
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/detectoare-industriale-de-metale" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/f8f29bd7-fe24-4356-ba45-b5def78ee647.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Detectoare industriale de metale
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/feliatoare-manuale" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/d528e8c5-15d0-4d9e-8c78-828bb9c0f8a6.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Feliatoare manuale
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/feliatoare-automatesemi-automate" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/eb6cdf9e-a004-4f1f-a1e7-1da8db635ff3.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Feliatoare automate/semi-automate
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-16 departments__menu ng-star-inserted" style={{ display: activeDept === 16 ? "block" : "none", visibility: activeDept === 16 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/centrale-de-detectie-si-semnalizare-incendiu" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/08516625-037b-4bf5-801c-25acaa49127d.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Centrale de detectie si semnalizare incendiu
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/dispozitive-periferice" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/1ab4f02e-fea9-48b1-ac51-4012edae8b6c.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Dispozitive periferice
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                          <div className="department-17 departments__menu ng-star-inserted" style={{ display: activeDept === 17 ? "block" : "none", visibility: activeDept === 17 ? "visible" : "hidden" }}>
                                            <app-header-menu>
                                              <ul className="menu menu--layout--classic full-width">
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/etichete-cu-imagine-prealabila" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/576077d3-9c49-4a61-a146-4dca659f6346.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Etichete cu imagine prealabila
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/etichete-termice" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/4cb9ba8a-067b-4f5e-bcd9-ef3d451dd526.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Etichete termice
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/hartie-termica" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/e0f068f6-9523-4896-a5d8-f57e7031a4df.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Hartie termica
                                                    </div>
                                                  </a>
                                                </li>
                                                <li className="list ng-star-inserted">
                                                  <a href="/category/riboane" className="ng-star-inserted">
                                                    <img alt="RTI logo placeholder." className="icon lds-facebook ng-star-inserted" src="/images/c799405d-de24-42e2-9db2-c7db2b96cb00.95d1f.jpg" />
                                                    <div className="ng-star-inserted">
                                                      Riboane
                                                    </div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </app-header-menu>
                                          </div>
                                        </div>
                                      </div>
                                      <button ariaLabel="Products menu button." className="departments__button" onClick={() => setDepartmentsOpen(prev => !prev)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ng-star-inserted">
                                          <path d="M5.3335 4H14.0002" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                          <path d="M5.3335 8H14.0002" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                          <path d="M5.3335 12H14.0002" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                          <path d="M2 4H2.00667" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                          <path d="M2 8H2.00667" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                          <path d="M2 12H2.00667" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        <span>
                                           Produse
                                        </span>
                                      </button>
                                    </div>
                                  </app-header-departments>
                                </li>
                                <li className="nav-links__item nav-item-count-0 nav-links__item--with-submenu ng-star-inserted" onMouseEnter={() => openNavItem(0)} onMouseLeave={closeNavItem}>
                                  <a className="cursor-pointer ng-star-inserted" onClick={(e) => e.preventDefault()}>
                                    <span className="item-nav-link ng-star-inserted">
                                      <span className="item-icon ng-star-inserted">
                                        <img alt="Inactive link icon" className="inactive" src="/images/f7f8b439-dee2-4cbc-a171-cb05c79e96e9.2e5cc.svg" />
                                        <img alt="Active link icon" className="active" src="/images/8cda4cc1-57e1-4328-a489-8fec21a468ca.2e5cc.svg" />
                                      </span>
                                      <span className="item-title">
                                        Solutii
                                      </span>
                                    </span>
                                  </a>
                                  {openNav === 0 && <NavSubmenu items={navMenu[0].submenu} />}
                                </li>
                                <li className="nav-links__item nav-item-count-1 nav-links__item--with-submenu ng-star-inserted" onMouseEnter={() => openNavItem(1)} onMouseLeave={closeNavItem}>
                                  <a className="cursor-pointer ng-star-inserted" onClick={(e) => e.preventDefault()}>
                                    <span className="item-nav-link ng-star-inserted">
                                      <span className="item-icon ng-star-inserted">
                                        <img alt="Inactive link icon" className="inactive" src="/images/a928bb2b-4982-486c-ba30-18a378668c5b.2e5cc.svg" />
                                        <img alt="Active link icon" className="active" src="/images/f6daa054-7784-40bc-ac48-f34812a63ad7.2e5cc.svg" />
                                      </span>
                                      <span className="item-title">
                                        Preturi soft
                                      </span>
                                    </span>
                                  </a>
                                  {openNav === 1 && <NavSubmenu items={navMenu[1].submenu} />}
                                </li>
                                <li className="nav-links__item nav-item-count-2 nav-links__item--with-submenu ng-star-inserted">
                                  <a href="/despre-noi" className="ng-star-inserted">
                                    <span className="item-nav-link ng-star-inserted">
                                      <span className="item-icon ng-star-inserted">
                                        <img alt="Inactive link icon" className="inactive" src="/images/e4eeffff-8fa7-456e-b81f-6e3ebd1348a8.2e5cc.svg" />
                                        <img alt="Active link icon" className="active" src="/images/c43e50a6-2867-438c-ba86-d371910dc4ed.2e5cc.svg" />
                                      </span>
                                      <span className="item-title">
                                        Despre noi
                                      </span>
                                    </span>
                                  </a>
                                </li>
                                <li className="nav-links__item nav-item-count-3 nav-links__item--with-submenu ng-star-inserted">
                                  <a href="/noutati" className="ng-star-inserted">
                                    <span className="item-nav-link ng-star-inserted">
                                      <span className="item-icon ng-star-inserted">
                                        <img alt="Inactive link icon" className="inactive" src="/images/0230464a-5e86-4340-a10c-a75164e5b63a.2e5cc.svg" />
                                        <img alt="Active link icon" className="active" src="/images/aae77707-75d9-478f-aa49-a34b0348289e.2e5cc.svg" />
                                      </span>
                                      <span className="item-title">
                                        Noutati
                                      </span>
                                    </span>
                                  </a>
                                </li>
                                <li className="nav-links__item nav-item-count-4 nav-links__item--with-submenu ng-star-inserted">
                                  <a href="/consultation-free" className="ng-star-inserted">
                                    <span className="item-nav-link ng-star-inserted">
                                      <span className="item-icon ng-star-inserted">
                                        <img alt="Inactive link icon" className="inactive" src="/images/f1309890-5d26-4cf6-a6de-0b27e09ec9de.2e5cc.svg" />
                                        <img alt="Active link icon" className="active" src="/images/fd9528c1-d9f1-4c99-bcb9-41541a7802ef.2e5cc.svg" />
                                      </span>
                                      <span className="item-title">
                                        Consultatie gratuita
                                      </span>
                                    </span>
                                  </a>
                                </li>
                                <li className="nav-links__item nav-item-count-5 nav-links__item--with-submenu ng-star-inserted">
                                  <a href="/contacte" className="ng-star-inserted">
                                    <span className="item-nav-link ng-star-inserted">
                                      <span className="item-icon ng-star-inserted">
                                        <img alt="Inactive link icon" className="inactive" src="/images/bc7e5ae0-2415-45b1-985b-f46ef48dd98f.2e5cc.svg" />
                                        <img alt="Active link icon" className="active" src="/images/96179b06-5e48-4d17-be9a-e525586eaba1.2e5cc.svg" />
                                      </span>
                                      <span className="item-title">
                                        Contacte
                                      </span>
                                    </span>
                                  </a>
                                </li>
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
