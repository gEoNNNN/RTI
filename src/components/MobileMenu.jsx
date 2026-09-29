import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

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
              <li className="mobile-links__item"><Link to="/" onClick={onClose} className="mobile-links__item-link">Acasă</Link></li>
              <li className="mobile-links__item"><Link to="/category/amplificatoare-audio" onClick={onClose} className="mobile-links__item-link">Amplificatoare audio</Link></li>
              <li className="mobile-links__item"><Link to="/category/difuzoare-audio" onClick={onClose} className="mobile-links__item-link">Difuzoare audio</Link></li>
              <li className="mobile-links__item"><Link to="/category/sisteme-audio" onClick={onClose} className="mobile-links__item-link">Sisteme audio</Link></li>
              <li className="mobile-links__item"><Link to="/category/echipamente-fiscale" onClick={onClose} className="mobile-links__item-link">Echipamente fiscale</Link></li>
              <li className="mobile-links__item"><Link to="/category/cantare-comerciale" onClick={onClose} className="mobile-links__item-link">Cântare comerciale</Link></li>
              <li className="mobile-links__item"><Link to="/category/imprimante" onClick={onClose} className="mobile-links__item-link">Imprimante</Link></li>
              <li className="mobile-links__item"><Link to="/category/scanere-coduri-de-bare" onClick={onClose} className="mobile-links__item-link">Scanere coduri de bare</Link></li>
              <li className="mobile-links__item"><Link to="/category/sistem-antifurt" onClick={onClose} className="mobile-links__item-link">Sisteme antifurt</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
