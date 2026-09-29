import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';
import categories from '../data/categories_full.json';
import catProducts from '../data/category_products.json';
import { imgUrl } from '../data/helpers';
import { PageHeader } from './StaticPages';

const idToSlug = {};
Object.values(categories).forEach((c) => {
  if (c.id) idToSlug[c.id] = c.slug;
});

function ProductCard({ product }) {
  const img = product.images && product.images.length ? imgUrl(product.images[0]) : '/images/shopping-bag.e9efb.svg';
  return (
    <div className="products-list__item" style={{ padding: '8px' }}>
      <div className="product-card">
        <div className="product-card__image">
          <Link to={'/product/' + product.slug}>
            <img src={img} alt={product.title} loading="lazy" />
          </Link>
        </div>
        <div className="product-card-box-meta">
          <div className="product-name">
            <div className="product-card__name">
              <Link to={'/product/' + product.slug}>{product.title}</Link>
            </div>
          </div>
          <div className="product-card-footer">
            <div className="left">
              <div className="priceBox small">
                <div className="no-price"></div>
              </div>
            </div>
            <div className="right">
              <div className="right-body">
                <img src="/images/shopping-bag.e9efb.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GenericCategoryPage({ slug }) {
  const cat = categories[slug];
  const title = cat ? cat.title : slug;
  const prods = (catProducts[slug] || []).map((s) => products[s]).filter(Boolean);
  const children = Object.values(categories).filter((c) => c.parent === (cat && cat.id));
  const parent = cat && cat.parent ? categories[idToSlug[cat.parent]] : null;

  const crumbs = [{ label: 'Produse' }];
  if (parent) crumbs.push({ label: parent.title, to: '/category/' + parent.slug });
  crumbs.push({ label: title });

  return (
    <div className="site__body">
      <PageHeader title={title} crumbs={crumbs} />
      <div className="block">
        <div className="container" style={{ paddingBottom: 60 }}>
          <div className="shop-layout shop-layout--sidebar--start">
            <div className="shop-layout__content full-width">
              {children.length > 0 && (
                <div style={{ marginBottom: 30 }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: 12,
                    }}
                  >
                    {children.map((c) => (
                      <Link
                        key={c.slug}
                        to={'/category/' + c.slug}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          border: '1px solid #ececec',
                          borderRadius: 4,
                          padding: '10px 14px',
                          color: '#161616',
                          fontWeight: 500,
                          fontSize: 14,
                          background: '#fff',
                        }}
                      >
                        {c.icon && (
                          <img
                            src={imgUrl(c.icon)}
                            alt=""
                            style={{ width: 24, height: 24, objectFit: 'contain' }}
                          />
                        )}
                        {c.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {prods.length > 0 ? (
                <div className="products-view">
                  <div
                    className="products-view__list products-list"
                    data-layout="grid-3-full"
                    data-with-features="false"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                      gap: 0,
                    }}
                  >
                    {prods.map((p) => (
                      <ProductCard key={p.slug} product={p} />
                    ))}
                  </div>
                </div>
              ) : (
                children.length === 0 && (
                  <p>
                    Produsele din această categorie sunt în curs de actualizare. Pentru detalii
                    contactați-ne la{' '}
                    <a href="tel:+37369116121" style={{ color: '#1976d2' }}>+373 69 116 121</a>.
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
