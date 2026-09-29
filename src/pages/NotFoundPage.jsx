import React from 'react';
import { Link } from 'react-router-dom';
import { StaticPage } from './StaticPages';

export default function NotFoundPage() {
  return (
    <StaticPage title="Pagina nu a fost găsită" crumbs={[{ label: '404' }]}>
      <p>Pagina căutată nu există sau a fost mutată.</p>
      <p>
        <Link to="/" style={{ color: '#1976d2' }}>Înapoi la pagina principală</Link>
      </p>
    </StaticPage>
  );
}
