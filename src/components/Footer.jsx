import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import widgetsRo from '../data/widgets.json';
import widgetsRu from '../data/ru/widgets.json';
import widgetsEn from '../data/en/widgets.json';
import { useLang, useT, to, pick } from '../lang';

const WIDGETS = { ro: widgetsRo, ru: widgetsRu, en: widgetsEn };

function decodeEntities(s) {
  if (!s) return '';
  return s
    .replace(/&l;/g, '<')
    .replace(/&g;/g, '>')
    .replace(/&icirc;/g, 'î')
    .replace(/&amp;/g, '&');
}

const LANG_ITEMS = [
  { code: 'ro', label: 'Română' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

function FooterLangSwitch() {
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
    <app-language-switch>
      <div className="language-switch" ref={ref}>
        <div className="switcher top">
          <div appdropdown="topbar-dropdown--opened" className={'topbar-dropdown' + (opened ? ' topbar-dropdown--opened' : '')}>
            <span className="icon planet">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6818 14.6666 7.99992C14.6666 4.31802 11.6818 1.33325 7.99992 1.33325C4.31802 1.33325 1.33325 4.31802 1.33325 7.99992C1.33325 11.6818 4.31802 14.6666 7.99992 14.6666Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.33325 8H14.6666" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.99992 1.33325C9.66744 3.15882 10.6151 5.52794 10.6666 7.99992C10.6151 10.4719 9.66744 12.841 7.99992 14.6666C6.3324 12.841 5.38475 10.4719 5.33325 7.99992C5.38475 5.52794 6.3324 3.15882 7.99992 1.33325V1.33325Z" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <button type="button" className="topbar-dropdown__btn ng-star-inserted" onClick={() => setOpened((o) => !o)}>
              <span className="current-language"> {lang} </span>
              <span className="arrow-icon ng-star-inserted">
                <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-chevron-down fa-w-14">
                  <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                </svg>
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

function FooterMenu({ menu }) {
  const lang = useLang();
  return (
    <div className="menu-container">
      {menu.map((col, i) => (
        <div className="f-links" key={i}>
          <h4>{col.name}</h4>
          <ul>
            {col.target.map((t, j) => (
              <li key={j}>
                <a href={t.url && t.url.startsWith('/') ? to(t.url, lang) : t.url}>
                  {t.label && (
                    <span className="f-label" dangerouslySetInnerHTML={{ __html: decodeEntities(t.label) }} />
                  )}
                  {t.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  const lang = useLang();
  const t = useT();
  const widgets = pick(lang, WIDGETS.ro, WIDGETS.ru, WIDGETS.en);
  const footerWidget = widgets.find((w) => w.type === 'footer-widget');
  const footerMenu = (footerWidget && footerWidget.payload && footerWidget.payload.menu) || [];

  return (
    <footer className="site__footer">
      <app-footer>
        <div className="footer">
          <div className="container">
            <div className="top">
              <div className="row">
                <div className="col-lg-3 desktop">
                  <div className="left">
                    <div className="logo-template ng-star-inserted">
                      <div className="logo">
                        <app-logo type="footer">
                          <div className="logo footer">
                            <a href={to('/', lang)}>
                              <img alt="Logoul companiei RTI" src="/images/Big-Logo.24063.svg" className="ng-star-inserted" />
                            </a>
                          </div>
                        </app-logo>
                      </div>
                      <div className="description"> {t('footer.description')} </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="right">
                    <FooterMenu menu={footerMenu} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile between">
              <div className="left">
                <div className="logo-template ng-star-inserted">
                  <div className="logo">
                    <app-logo type="footer">
                      <div className="logo footer">
                        <a href={to('/', lang)}>
                          <img alt="Logoul companiei RTI" src="/images/Big-Logo.24063.svg" className="ng-star-inserted" />
                        </a>
                      </div>
                    </app-logo>
                  </div>
                  <div className="description"> {t('footer.description')} </div>
                </div>
              </div>
              <div className="right">
                <app-social-media>
                  <div className="items">
                    <div className="item">
                      <a ariaLabel="Facebook profile link" href="http://www.facebook.com/rticompanygroup/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ng-star-inserted">
                          <path d="M12.0003 1.3335H10.0003C9.11627 1.3335 8.26842 1.68469 7.6433 2.30981C7.01818 2.93493 6.66699 3.78277 6.66699 4.66683V6.66683H4.66699V9.3335H6.66699V14.6668H9.33366V9.3335H11.3337L12.0003 6.66683H9.33366V4.66683C9.33366 4.49002 9.4039 4.32045 9.52892 4.19543C9.65395 4.0704 9.82351 4.00016 10.0003 4.00016H12.0003V1.3335Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </a>
                    </div>
                    <div className="item">
                      <a ariaLabel="Linkedin profile link" href="https://www.linkedin.com/company/%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0-%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D0%B9-rti?trk=company_logo" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ng-star-inserted">
                          <path d="M10.667 5.3335C11.7279 5.3335 12.7453 5.75492 13.4954 6.50507C14.2456 7.25521 14.667 8.27263 14.667 9.3335V14.0002H12.0003V9.3335C12.0003 8.97987 11.8598 8.64074 11.6098 8.39069C11.3598 8.14064 11.0206 8.00016 10.667 8.00016C10.3134 8.00016 9.97423 8.14064 9.72418 8.39069C9.47413 8.64074 9.33366 8.97987 9.33366 9.3335V14.0002H6.66699V9.3335C6.66699 8.27263 7.08842 7.25521 7.83857 6.50507C8.58871 5.75492 9.60613 5.3335 10.667 5.3335V5.3335Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M3.99967 6H1.33301V14H3.99967V6Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M2.66634 4.00016C3.40272 4.00016 3.99967 3.40321 3.99967 2.66683C3.99967 1.93045 3.40272 1.3335 2.66634 1.3335C1.92996 1.3335 1.33301 1.93045 1.33301 2.66683C1.33301 3.40321 1.92996 4.00016 2.66634 4.00016Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </a>
                    </div>
                    <div className="item">
                      <a ariaLabel="Twitter profile link" href="https://twitter.com/Plasma_RTI" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ng-star-inserted">
                          <g clipPath="url(#clip0)">
                            <path d="M15.3337 1.99999C14.6952 2.45031 13.9884 2.79473 13.2403 3.01999C12.8388 2.55833 12.3052 2.23112 11.7117 2.08261C11.1181 1.9341 10.4933 1.97145 9.92171 2.18963C9.3501 2.4078 8.85929 2.79626 8.51565 3.30247C8.17201 3.80868 7.99212 4.40821 8.00033 5.01999V5.68666C6.82875 5.71704 5.66784 5.4572 4.621 4.93029C3.57415 4.40338 2.67387 3.62575 2.00033 2.66666C2.00033 2.66666 -0.666341 8.66666 5.33366 11.3333C3.96068 12.2653 2.3251 12.7326 0.666992 12.6667C6.66699 16 14.0003 12.6667 14.0003 4.99999C13.9997 4.81429 13.9819 4.62905 13.947 4.44666C14.6274 3.77565 15.1075 2.92847 15.3337 1.99999V1.99999Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </g>
                          <defs>
                            <clippath id="clip0">
                              <rect width="16" height="16" fill="white"></rect>
                            </clippath>
                          </defs>
                        </svg>
                      </a>
                    </div>
                  </div>
                </app-social-media>
              </div>
            </div>
            <div className="bottom">
              <div className="left">
                <div className="copyright">
                  <a href="">
                    Copyright © 2003-2021 Plasma RTI SRL
                  </a>
                </div>
                <div className="grey-line margin"></div>
                <div className="terms">
                  <a href={to('/politica-de-confidentialitate', lang)}>
                    {t('footer.policyPrivacy', 'Politica de confidențialitate')}
                  </a>
                </div>
                <div className="grey-line margin desktop"></div>
                <div className="terms">
                  <a href={to('/termeni-si-conditii', lang)}>
                    {t('footer.termsAndCond', 'Termeni și condiții')}
                  </a>
                </div>
                <div className="grey-line margin desktop"></div>
                <div className="language-switch desktop">
                  <FooterLangSwitch />
                </div>
                <div className="grey-line margin"></div>
              </div>
              <div className="right desktop">
                <div className="social">
                  <app-social-media>
                    <div className="items">
                      <div className="item">
                        <a ariaLabel="Facebook profile link" href="http://www.facebook.com/rticompanygroup/" target="_blank">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ng-star-inserted">
                            <path d="M12.0003 1.3335H10.0003C9.11627 1.3335 8.26842 1.68469 7.6433 2.30981C7.01818 2.93493 6.66699 3.78277 6.66699 4.66683V6.66683H4.66699V9.3335H6.66699V14.6668H9.33366V9.3335H11.3337L12.0003 6.66683H9.33366V4.66683C9.33366 4.49002 9.4039 4.32045 9.52892 4.19543C9.65395 4.0704 9.82351 4.00016 10.0003 4.00016H12.0003V1.3335Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </a>
                      </div>
                      <div className="item">
                        <a ariaLabel="Linkedin profile link" href="https://www.linkedin.com/company/%D0%B3%D1%80%D1%83%D0%BF%D0%BF%D0%B0-%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D0%B9-rti?trk=company_logo" target="_blank">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ng-star-inserted">
                            <path d="M10.667 5.3335C11.7279 5.3335 12.7453 5.75492 13.4954 6.50507C14.2456 7.25521 14.667 8.27263 14.667 9.3335V14.0002H12.0003V9.3335C12.0003 8.97987 11.8598 8.64074 11.6098 8.39069C11.3598 8.14064 11.0206 8.00016 10.667 8.00016C10.3134 8.00016 9.97423 8.14064 9.72418 8.39069C9.47413 8.64074 9.33366 8.97987 9.33366 9.3335V14.0002H6.66699V9.3335C6.66699 8.27263 7.08842 7.25521 7.83857 6.50507C8.58871 5.75492 9.60613 5.3335 10.667 5.3335V5.3335Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M3.99967 6H1.33301V14H3.99967V6Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M2.66634 4.00016C3.40272 4.00016 3.99967 3.40321 3.99967 2.66683C3.99967 1.93045 3.40272 1.3335 2.66634 1.3335C1.92996 1.3335 1.33301 1.93045 1.33301 2.66683C1.33301 3.40321 1.92996 4.00016 2.66634 4.00016Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </a>
                      </div>
                      <div className="item">
                        <a ariaLabel="Twitter profile link" href="https://twitter.com/Plasma_RTI" target="_blank">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="ng-star-inserted">
                            <g clipPath="url(#clip0)">
                              <path d="M15.3337 1.99999C14.6952 2.45031 13.9884 2.79473 13.2403 3.01999C12.8388 2.55833 12.3052 2.23112 11.7117 2.08261C11.1181 1.9341 10.4933 1.97145 9.92171 2.18963C9.3501 2.4078 8.85929 2.79626 8.51565 3.30247C8.17201 3.80868 7.99212 4.40821 8.00033 5.01999V5.68666C6.82875 5.71704 5.66784 5.4572 4.621 4.93029C3.57415 4.40338 2.67387 3.62575 2.00033 2.66666C2.00033 2.66666 -0.666341 8.66666 5.33366 11.3333C3.96068 12.2653 2.3251 12.7326 0.666992 12.6667C6.66699 16 14.0003 12.6667 14.0003 4.99999C13.9997 4.81429 13.9819 4.62905 13.947 4.44666C14.6274 3.77565 15.1075 2.92847 15.3337 1.99999V1.99999Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                            <defs>
                              <clippath id="clip0">
                                <rect width="16" height="16" fill="white"></rect>
                              </clippath>
                            </defs>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </app-social-media>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-footer>
    </footer>

  );
}
