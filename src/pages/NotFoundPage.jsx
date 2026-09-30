import React from 'react';
import { Link } from 'react-router-dom';
import { useT, useTo } from '../lang';
import { StaticPage } from './StaticPages';

export default function NotFoundPage() {
  const t = useT();
  const to = useTo();
  return (
    <StaticPage title={t('notFound.subtitle', 'Pagina nu a fost găsită')} crumbs={[{ label: '404' }]}>
      <p>{t('notFound.description', 'Pagina căutată nu există sau a fost mutată.')}</p>
      <p>
        <Link to={to('/')} style={{ color: '#1976d2' }}>{t('notFound.toFirstPage', 'Înapoi la pagina principală')}</Link>
      </p>
    </StaticPage>
  );
}
