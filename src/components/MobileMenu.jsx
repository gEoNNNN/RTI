import React from 'react';
import { Link } from 'react-router-dom';
import categoriesRo from '../data/categories_full.json';
import categoriesRu from '../data/ru/categories_full.json';
import categoriesEn from '../data/en/categories_full.json';
import { useLang, useT, to, pick } from '../lang';

const CATS = { ro: categoriesRo, ru: categoriesRu, en: categoriesEn };

export default function MobileMenu({ isOpen, onClose }) {
  const lang = useLang();
  const t = useT();
  if (!isOpen) return null;

  const categories = pick(lang, CATS.ro, CATS.ru, CATS.en);
  const roots = Object.values(categories).filter((c) => !c.parent);

  return (
    <div className="mobile-menu" style={{ display: 'block' }}>
      <div className="mobilemenu mobilemenu--open">
        <div className="mobilemenu__backdrop" onClick={onClose}></div>
        <div className="mobilemenu__body">
          <div className="mobilemenu__header">
            <div className="mobilemenu__title">Menu</div>
            <button
              aria-label="Close mobile menu button."
              type="button"
              className="mobilemenu__close"
              onClick={onClose}
            >
              <svg className="svg-inline--fa fa-times fa-w-11 fa-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
              </svg>
            </button>
          </div>
          <div className="mobilemenu__content">
            <ul className="mobile-links mobile-links--level--0">
              <li className="mobile-links__item">
                <Link to={to('/', lang)} onClick={onClose} className="mobile-links__item-link">
                  {t('global.menu.home', 'Acasă')}
                </Link>
              </li>
              {roots.map((c) => (
                <li className="mobile-links__item" key={c.slug}>
                  <Link to={to('/category/' + c.slug, lang)} onClick={onClose} className="mobile-links__item-link">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
