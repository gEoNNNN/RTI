import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import categoriesRo from '../data/categories_full.json';
import categoriesRu from '../data/ru/categories_full.json';
import categoriesEn from '../data/en/categories_full.json';
import navRo from '../data/nav_menu.json';
import navRu from '../data/ru/nav_menu.json';
import navEn from '../data/en/nav_menu.json';
import { useLang, useT, to, pick } from '../lang';
import { imgUrl } from '../data/helpers';

const CATS = { ro: categoriesRo, ru: categoriesRu, en: categoriesEn };
const NAV = { ro: navRo, ru: navRu, en: navEn };

function ChevronDown() {
  return (
    <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-chevron-down fa-w-14">
      <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 24.569 9.373 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
    </svg>
  );
}

/* One expandable/leaf item — mirrors live app-mobile-links markup:
   li > .mobile-links__item > .mobile-links__item-title + .mobile-links__item-sub-links */
function MobileItem({ item, onClose }) {
  const [open, setOpen] = useState(false);
  const kids = item.kids || [];
  const hasKids = kids.length > 0;
  return (
    <li>
      <div className={`mobile-links__item ng-star-inserted ${open ? 'mobile-links__item--open' : ''}`}>
        <div className="mobile-links__item-title" onClick={(e) => { if (hasKids && !item.href && !e.target.closest('.mobile-links__item-toggle')) setOpen((o) => !o); }}>
          {item.href ? (
            <Link to={item.href} onClick={onClose} className="mobile-links__item-link ng-star-inserted">
              {item.icon && <img alt="Mobile link icon" loading="lazy" className="icon ng-star-inserted" src={item.icon} />}
              {' '}{item.title}{' '}
            </Link>
          ) : (
            <a className="mobile-links__item-link ng-star-inserted">
              {item.icon && <img alt="Mobile link icon" loading="lazy" className="icon ng-star-inserted" src={item.icon} />}
              {' '}{item.title}{' '}
            </a>
          )}
          {hasKids && (
            <button aria-label="Open submenu button" type="button" className="mobile-links__item-toggle ng-star-inserted" onClick={() => setOpen((o) => !o)}>
              <fa-icon className="ng-fa-icon mobile-links__item-arrow">
                <ChevronDown />
              </fa-icon>
            </button>
          )}
        </div>
        {hasKids && (
          <div className="mobile-links__item-sub-links ng-star-inserted">
            <ul className={`mobile-links mobile-links--level--${item.level + 1}`}>
              {kids.map((k, i) => (
                <MobileItem key={i} item={k} onClose={onClose} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}

export default function MobileMenu({ isOpen, onClose }) {
  const lang = useLang();
  const t = useT();
  if (!isOpen) return null;

  const categories = pick(lang, CATS.ro, CATS.ru, CATS.en);
  const navItems = pick(lang, NAV.ro, NAV.ru, NAV.en);

  const byParent = {};
  Object.values(categories).forEach((c) => {
    if (c.parent) (byParent[c.parent] = byParent[c.parent] || []).push(c);
  });
  const roots = Object.values(categories).filter((c) => !c.parent).sort((a, b) => (a.order || 0) - (b.order || 0));

  const buildCat = (c, parentSlug) => ({
    title: c.title,
    icon: c.icon ? imgUrl(c.icon) : null,
    href: to(parentSlug ? `/category/${parentSlug}/${c.slug}` : `/category/${c.slug}`, lang),
    kids: (byParent[c.id] || []).sort((a, b) => (a.order || 0) - (b.order || 0)).map((k) => buildCat(k, c.slug)),
    level: parentSlug ? 2 : 1,
  });

  const productsItem = {
    title: t('header.megaMenu', 'Produse'),
    href: null,
    icon: null,
    kids: roots.map((c) => buildCat(c, null)),
    level: 0,
  };

  const navTree = (Array.isArray(navItems) ? navItems : Object.values(navItems)).map((it) => ({
    title: it.title,
    icon: it.icon ? imgUrl(it.icon) : null,
    href: it.link && it.link !== '/' ? to('/' + it.link.replace(/^\//, ''), lang) : null,
    kids: (it.submenu || []).map((s) => ({
      title: s.title,
      icon: s.icon ? imgUrl(s.icon) : null,
      href: to('/' + (s.link || '').replace(/^\//, ''), lang),
      kids: [],
      level: 1,
    })),
    level: 0,
  }));

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
                <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.2 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
              </svg>
            </button>
          </div>
          <div className="mobilemenu__content">
            <app-mobile-links className="ng-star-inserted">
              <ul className="mobile-links mobile-links--level--0">
                <MobileItem item={productsItem} onClose={onClose} />
              </ul>
            </app-mobile-links>
            <app-mobile-links className="ng-star-inserted">
              <ul className="mobile-links mobile-links--level--0">
                {navTree.map((it, i) => (
                  <MobileItem key={i} item={it} onClose={onClose} />
                ))}
              </ul>
            </app-mobile-links>
          </div>
        </div>
      </div>
    </div>
  );
}
