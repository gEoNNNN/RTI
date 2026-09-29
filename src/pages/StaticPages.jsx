import React from 'react';
import { Link } from 'react-router-dom';

// Shared page header matching the original site's page-header/breadcrumb design
export function PageHeader({ title, crumbs = [] }) {
  return (
    <div className="header">
      <div className="page-header">
        <div className="page-header__container container">
          <div className="page-header__breadcrumb">
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="bc-item">
                  <Link to="/">Principala</Link>
                  <span className="bc-arrow"> / </span>
                </li>
                {crumbs.map((c, i) => (
                  <li className="bc-item" key={i}>
                    {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
                    {i < crumbs.length - 1 && <span className="bc-arrow"> / </span>}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="page-header__title">
            <h1>{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StaticPage({ title, crumbs, children }) {
  return (
    <div className="site__body">
      <PageHeader title={title} crumbs={crumbs} />
      <div className="block">
        <div className="container">
          <div className="document" style={{ maxWidth: 960, margin: '0 auto', padding: '30px 0 60px' }}>
            <div className="document__content typography">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
