import React from 'react';
import { Link, useParams } from 'react-router-dom';
import articlesRo from '../data/articles.json';
import articlesRu from '../data/ru/articles.json';
import articlesEn from '../data/en/articles.json';
import widgetsRo from '../data/widgets.json';
import widgetsRu from '../data/ru/widgets.json';
import widgetsEn from '../data/en/widgets.json';
import { imgUrl } from '../data/helpers';
import { useLang, useT, useTo, pick } from '../lang';
import { PageHeader, StaticPage } from './StaticPages';
import NotFoundPage from './NotFoundPage';

const ARTICLES = { ro: articlesRo, ru: articlesRu, en: articlesEn };
const WIDGETS = { ro: widgetsRo, ru: widgetsRu, en: widgetsEn };

export function NoutatiPage() {
  const lang = useLang();
  const t = useT();
  const to = useTo();
  const articles = pick(lang, ARTICLES.ro, ARTICLES.ru, ARTICLES.en);
  const newsLabel = t('blog.categoryPage.title', 'Noutăți');
  return (
    <div className="site__body">
      <PageHeader title={newsLabel} crumbs={[{ label: newsLabel }]} />
      <div className="block">
        <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {articles.map((a) => (
              <Link
                key={a.slug}
                to={to('/noutati/' + a.slug)}
                style={{
                  border: '1px solid #ececec',
                  borderRadius: 4,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  transition: 'box-shadow .2s',
                }}
              >
                <div style={{ height: 180, overflow: 'hidden', background: '#f6f6f6' }}>
                  <img
                    src={imgUrl(a.image, '/images/shopping-bag.e9efb.svg')}
                    alt={a.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontSize: 16, margin: '0 0 8px', color: '#161616' }}>{a.title}</h3>
                  {typeof a.description === 'string' && a.description && (
                    <p
                      style={{ fontSize: 14, color: '#6c757d', margin: 0 }}
                      dangerouslySetInnerHTML={{
                        __html: a.description.replace(/<[^>]+>/g, '').slice(0, 140) + '…',
                      }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const lang = useLang();
  const t = useT();
  const to = useTo();
  const articles = pick(lang, ARTICLES.ro, ARTICLES.ru, ARTICLES.en);
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFoundPage />;
  const newsLabel = t('blog.categoryPage.title', 'Noutăți');
  return (
    <div className="site__body">
      <PageHeader title={article.title} crumbs={[{ label: newsLabel, to: to('/noutati') }, { label: article.title }]} />
      <div className="block">
        <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {article.image && (
              <img
                src={imgUrl(article.image)}
                alt={article.title}
                style={{ width: '100%', borderRadius: 4, marginBottom: 24 }}
              />
            )}
            <div
              className="typography"
              dangerouslySetInnerHTML={{ __html: article.content || article.description || '' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactePage() {
  return (
    <StaticPage title="Contacte" crumbs={[{ label: 'Contacte' }]}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
        <div>
          <h3>Date de contact</h3>
          <p>
            <strong>Telefon:</strong>{' '}
            <a href="tel:+37369116121" style={{ color: '#1976d2' }}>+373 69 116 121</a>
          </p>
          <p>
            <strong>Adresă:</strong> Chișinău, Republica Moldova
          </p>
          <p>
            <strong>Program:</strong> Luni – Vineri: 09:00 – 18:00
          </p>
        </div>
        <div>
          <h3>Despre companie</h3>
          <p>
            RTI — marca companiei Plasma RTI SRL. Distribuitor de echipamente pentru afaceri în
            Chișinău: sisteme POS, echipamente fiscale, cântare comerciale, sisteme de supraveghere
            video, control acces și software de automatizare.
          </p>
          <p>
            <Link to="/consultation-free" style={{ color: '#1976d2' }}>
              Solicită consultație gratuită →
            </Link>
          </p>
        </div>
      </div>
    </StaticPage>
  );
}

export function DespreNoiPage() {
  return (
    <StaticPage title="Despre noi" crumbs={[{ label: 'Despre noi' }]}>
      <h3>Grupul de companii RTI</h3>
      <p>
        Compania RTI este furnizor de servicii și echipamente pentru afaceri din domeniul comerțului,
        producerii, industriei ușoare și al serviciilor alimentare. Timp de peste 19 ani de
        activitate, compania a furnizat peste 200.000 de echipamente și a deservit peste 600 de
        clienți în toată Moldova.
      </p>
      <p>
        Oferim soluții complexe pentru automatizarea afacerilor: sisteme POS, echipamente fiscale,
        cântare comerciale, scanere de coduri de bare, sisteme antifurt, supraveghere video, control
        acces, sisteme audio și software de gestiune.
      </p>
      <h3>Avantajele noastre</h3>
      <ul>
        <li>Distribuitor oficial al producătorilor mondiali</li>
        <li>Garanție dublă și suport tehnic autorizat</li>
        <li>Soluții individuale pentru fiecare proiect</li>
        <li>Serviciu de mentenanță pentru toată gama de produse</li>
        <li>Livrare rapidă și sigură</li>
      </ul>
      <p>
        <Link to="/contacte" style={{ color: '#1976d2' }}>Contactați-ne →</Link>
      </p>
    </StaticPage>
  );
}

export function ConsultatiePage() {
  return (
    <StaticPage title="Consultație gratuită" crumbs={[{ label: 'Consultație gratuită' }]}>
      <p>
        Specialiștii RTI vă oferă consultație gratuită pentru alegerea echipamentelor și soluțiilor
        software potrivite afacerii dumneavoastră.
      </p>
      <p>
        Sunați-ne la{' '}
        <a href="tel:+37369116121" style={{ color: '#1976d2' }}>+373 69 116 121</a> sau vizitați
        pagina de <Link to="/contacte" style={{ color: '#1976d2' }}>contacte</Link>.
      </p>
    </StaticPage>
  );
}

export function PreturiPage({ soft }) {
  const name = soft === '1c' ? '1C' : 'Syrve';
  return (
    <StaticPage
      title={`Prețuri soft ${name}`}
      crumbs={[{ label: 'Prețuri soft' }, { label: name }]}
    >
      <p>
        Pentru informații actualizate despre prețurile soluțiilor software {name}, contactați
        departamentul vânzări RTI.
      </p>
      <p>
        <a href="tel:+37369116121" style={{ color: '#1976d2' }}>+373 69 116 121</a>
      </p>
      <p>
        <Link to="/contacte" style={{ color: '#1976d2' }}>Formular de contact →</Link>
      </p>
    </StaticPage>
  );
}

export function GenericPage({ titleKey, title }) {
  const t = useT();
  const localized = titleKey ? t(titleKey, title) : title;
  return (
    <StaticPage title={localized} crumbs={[{ label: localized }]}>
      <p>
        {t('global.pageInProgress', 'Informațiile pentru această secțiune sunt în curs de actualizare. Pentru detalii, contactați echipa RTI.')}
      </p>
      <p>
        <Link to="/contacte" style={{ color: '#1976d2' }}>{t('contacts.title', 'Contacte')}</Link> ·{' '}
        <a href="tel:+37369116121" style={{ color: '#1976d2' }}>+373 69 116 121</a>
      </p>
    </StaticPage>
  );
}

export function ClientiPage() {
  const lang = useLang();
  const t = useT();
  const widgets = pick(lang, WIDGETS.ro, WIDGETS.ru, WIDGETS.en);
  const pw = widgets.find((w) => w.type === 'partners-widget');
  const partners = (pw && pw.payload && pw.payload.partners) || [];
  const title = t('contacts.breadcrumbs.clients', 'Clienți');
  return (
    <div className="site__body">
      <PageHeader title={title} crumbs={[{ label: title }]} />
      <div className="block">
        <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 24,
              alignItems: 'center',
            }}
          >
            {partners.map((p, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #ececec',
                  borderRadius: 4,
                  padding: 16,
                  height: 110,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                }}
              >
                <img
                  src={imgUrl(p.image && p.image.path)}
                  alt="Client logo"
                  loading="lazy"
                  style={{ maxWidth: '100%', maxHeight: 80, objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
