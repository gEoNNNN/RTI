import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import productsRo from '../data/products.json';
import productsRu from '../data/ru/products.json';
import productsEn from '../data/en/products.json';
import categoriesRo from '../data/categories_full.json';
import categoriesRu from '../data/ru/categories_full.json';
import categoriesEn from '../data/en/categories_full.json';
import { imgUrl } from '../data/helpers';
import { useLang, useT, useTo, pick } from '../lang';
import { PageHeader } from './StaticPages';
import NotFoundPage from './NotFoundPage';

const PRODUCTS = { ro: productsRo, ru: productsRu, en: productsEn };
const CATS = { ro: categoriesRo, ru: categoriesRu, en: categoriesEn };

const catIdToSlug = {};
Object.values(categoriesRo).forEach((c) => {
  if (c.id) catIdToSlug[c.id] = c.slug;
});

export default function ProductPage() {
  const { slug } = useParams();
  const lang = useLang();
  const t = useT();
  const to = useTo();
  const products = pick(lang, PRODUCTS.ro, PRODUCTS.ru, PRODUCTS.en);
  const categories = pick(lang, CATS.ro, CATS.ru, CATS.en);
  const product = products[slug] || products[slug && slug.replace(/_20/g, ' ')];
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return <NotFoundPage />;

  const images = (product.images || []).map((p) => imgUrl(p)).filter(Boolean);
  const catSlug = catIdToSlug[product.category];
  const catTitle = catSlug && categories[catSlug] ? categories[catSlug].title : null;

  const crumbs = [];
  if (catSlug) crumbs.push({ label: catTitle, to: to('/category/' + catSlug) });
  crumbs.push({ label: product.title });

  const attrs = (product.attributes || [])
    .map((a) => ({
      name: a.attributeId && a.attributeId.name,
      unit: a.attributeId && a.attributeId.unit,
      value: a.value,
    }))
    .filter((a) => a.name && a.value);

  return (
    <div className="site__body">
      <PageHeader title={product.title} crumbs={crumbs} />
      <div className="block">
        <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <div className="product" style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
            <div style={{ flex: '0 0 420px', maxWidth: '100%' }}>
              <div
                style={{
                  border: '1px solid #ececec',
                  borderRadius: 4,
                  padding: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 380,
                  background: '#fff',
                }}
              >
                <img
                  src={images[activeImg] || '/images/shopping-bag.e9efb.svg'}
                  alt={product.title}
                  style={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }}
                />
              </div>
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      style={{
                        border: i === activeImg ? '2px solid #1976d2' : '1px solid #ececec',
                        borderRadius: 4,
                        padding: 6,
                        background: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      <img src={img} alt="" style={{ width: 60, height: 60, objectFit: 'contain' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div style={{ flex: '1 1 400px', minWidth: 300 }}>
              <h1 style={{ fontSize: 28, marginBottom: 16 }}>{product.title}</h1>
              {catSlug && (
                <p style={{ marginBottom: 16 }}>
                  {t('categoryPage.sort.show', 'Categorie')}:{' '}
                  <Link to={to('/category/' + catSlug)} style={{ color: '#1976d2' }}>
                    {catTitle}
                  </Link>
                </p>
              )}
              <div style={{ margin: '24px 0' }}>
                <Link
                  to={to('/contacte')}
                  className="btn btn-primary btn-lg"
                  style={{
                    display: 'inline-block',
                    background: '#1976d2',
                    color: '#fff',
                    padding: '12px 32px',
                    borderRadius: 4,
                    fontWeight: 500,
                  }}
                >
                  {t('global.askForPrice', 'Cere ofertă')}
                </Link>
                <a
                  href="tel:+37369116121"
                  style={{
                    display: 'inline-block',
                    marginLeft: 12,
                    padding: '12px 32px',
                    border: '1px solid #1976d2',
                    borderRadius: 4,
                    color: '#1976d2',
                    fontWeight: 500,
                  }}
                >
                  +373 69 116 121
                </a>
              </div>
              {product.description && (
                <div
                  className="typography"
                  style={{ marginTop: 24 }}
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
            </div>
          </div>

          {attrs.length > 0 && (
            <div style={{ marginTop: 50 }}>
              <h2 style={{ fontSize: 22, marginBottom: 16 }}>{t('product.specification', 'Specificații')}</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {attrs.map((a, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '10px 16px', color: '#6c757d', width: '40%' }}>
                        {a.name}
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        {a.value}
                        {a.unit ? ' ' + a.unit : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
