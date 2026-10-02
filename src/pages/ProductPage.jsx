import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productsRo from '../data/products.json';
import productsRu from '../data/ru/products.json';
import productsEn from '../data/en/products.json';
import categoriesRo from '../data/categories_full.json';
import categoriesRu from '../data/ru/categories_full.json';
import categoriesEn from '../data/en/categories_full.json';
import features from '../data/product_features.json';
import { imgUrl } from '../data/helpers';
import { useLang, useT, useTo, pick } from '../lang';
import NotFoundPage from './NotFoundPage';

const PRODUCTS = { ro: productsRo, ru: productsRu, en: productsEn };
const CATS = { ro: categoriesRo, ru: categoriesRu, en: categoriesEn };

const catIdToSlug = {};
Object.values(categoriesRo).forEach((c) => {
  if (c.id) catIdToSlug[c.id] = c.slug;
});

const BC_ARROW = (
  <span className="ng-fa-icon bc-arrow" style={{ margin: '0 6px', color: '#737373', display: 'inline-flex' }}>
    <svg role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="8">
      <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
    </svg>
  </span>
);

const CHECK_ICON = (
  <svg role="img" aria-hidden="true" focusable="false" className="svg-inline--fa fa-check fa-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
  </svg>
);

const CHEVRON_LEFT = (
  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.3688 9.77694L14.66 19.4856L24.3688 29.1943" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CHEVRON_RIGHT = (
  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6312 29.2231L24.34 19.5144L14.6312 9.80566" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ReadMore({ html, moreLabel, lessLabel }) {
  const ref = useRef(null);
  const [collapsible, setCollapsible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const MAX = 340;

  useEffect(() => {
    if (ref.current) setCollapsible(ref.current.scrollHeight > MAX);
  }, [html]);

  return (
    <div className="read-more">
      <div
        ref={ref}
        id="text-read-more"
        className="text"
        style={collapsible && !expanded ? { maxHeight: MAX } : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {collapsible && !expanded && <div className="overlay"></div>}
      {collapsible && (
        <div className="footer">
          <span onClick={() => setExpanded((e) => !e)}>{expanded ? lessLabel : moreLabel}</span>
        </div>
      )}
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const lang = useLang();
  const t = useT();
  const to = useTo();
  const products = pick(lang, PRODUCTS.ro, PRODUCTS.ru, PRODUCTS.en);
  const categories = pick(lang, CATS.ro, CATS.ru, CATS.en);
  const feats = pick(lang, features.ro, features.ru, features.en);
  const product = products[slug] || products[slug && slug.replace(/_20/g, ' ')];
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState(0);

  if (!product) return <NotFoundPage />;

  const images = (product.images || []).map((p) => imgUrl(p)).filter(Boolean);
  const variant = (product.variants && product.variants[0]) || null;
  const inStock = !variant || (variant.quantity && variant.quantity > 0);
  const askQuote = variant && variant.askQuote;

  // category chain: leaf → parents (root first)
  const chain = [];
  let cur = catIdToSlug[product.category];
  const seen = new Set();
  while (cur && categories[cur] && !seen.has(cur)) {
    seen.add(cur);
    chain.unshift(cur);
    const c = categories[cur];
    cur = c.parent ? catIdToSlug[c.parent] : null;
  }

  const crumbs = chain.map((s, i) => ({
    label: categories[s].title,
    to: to('/category/' + chain.slice(0, i + 1).join('/')),
  }));

  const attrs = (product.attributes || [])
    .map((a) => ({
      name: a.attributeId && a.attributeId.name,
      unit: a.attributeId && a.attributeId.unit,
      value: a.value,
    }))
    .filter((a) => a.name && a.value);

  const tabs = [];
  if (product.description) tabs.push({ key: 'desc', label: t('product.meta.description', 'Descriere') });
  if (attrs.length) tabs.push({ key: 'specs', label: t('product.meta.characteristic', 'Caracteristici') });
  const activeTab = tabs[Math.min(tab, tabs.length - 1)] || null;

  const noPriceText = t('product.noPriceText.text', 'Pre-comanda intr-un  ');
  const noPriceBtn = t('product.noPriceText.button', 'click');

  return (
    <div className="site__body product-page">
      <div className="page-header product" style={{ backgroundImage: 'url()' }}>
        <div className="overlay" style={{ background: 'transparent' }}></div>
        <div id="links" className="page-header__container container">
          <div>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="bc-item">
                  <a href={to('/')}>{t('contacts.breadcrumbs.home', 'Principala')}</a>
                  {BC_ARROW}
                </li>
                {crumbs.map((c, i) => (
                  <li className="bc-item" key={i}>
                    <a href={c.to}>{c.label}</a>
                    {BC_ARROW}
                  </li>
                ))}
                <li className="bc-item active" aria-current="page">
                  {product.title}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="product">
          <div className="header">
            <div className="title">
              <h1>{product.title}</h1>
            </div>
            <div className="stock-status">
              <div className="stock-block">
                <span className="ng-fa-icon">{CHECK_ICON}</span>
                <span>{inStock ? t('product.inStock', 'In stoc') : t('product.outOfStock', 'Stoc epuizat')}</span>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="left">
              {images.length > 0 && (
                <div className="gallery">
                  <div className="product-gallery">
                    <div className="body">
                      <div className="over-bg">
                        <img className="slide-img" src={images[activeImg]} alt={product.title} />
                        {images.length > 1 && (
                          <div className="navigation">
                            <div
                              className="btn-nav left"
                              onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                            >
                              <div>{CHEVRON_LEFT}</div>
                            </div>
                            <div
                              className="btn-nav right"
                              onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                            >
                              <div>{CHEVRON_RIGHT}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="bullet-mask"></div>
                    </div>
                    {images.length > 1 && (
                      <div className="footer">
                        <div className="thumbs">
                          {images.map((img, i) => (
                            <div className="slide" key={i}>
                              <div
                                className={'slideWrap ' + (i === activeImg ? 'active' : 'inactive')}
                                onClick={() => setActiveImg(i)}
                              >
                                <div className="bd"></div>
                                <img src={img} alt={product.title} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="right">
              <div className="product-header">
                <div className="product-price">
                  <div className="priceBox">
                    <div className="no-price">
                      {askQuote && (
                        <div className="text">
                          {' '}
                          {noPriceText}
                          <span>{noPriceBtn}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="product-card__button">
                  <div className="form-group product__option">
                    <div className="product__actions">
                      <div className="product__actions-item product__actions-item--addtocart">
                        <button type="button" className="add-to-card-btn">
                          <img src="/images/shopping-bag.e9efb.svg" alt="" />
                          <span>{t('product.addToCart', 'Adauga in cos')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {activeTab && (
                <div className="product-meta">
                  <div className="content">
                    <div className="header">
                      <div className="items">
                        {tabs.map((tb, i) => (
                          <div
                            key={tb.key}
                            className={'item' + (i === tab ? ' active' : '')}
                            onClick={() => setTab(i)}
                          >
                            <h4>{tb.label}</h4>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="body">
                      <div className="items">
                        <div className="item">
                          {activeTab.key === 'desc' && (
                            <ReadMore
                              html={product.description}
                              moreLabel={t('global.readMore', 'Extinde')}
                              lessLabel={t('global.collapse', 'Restrange')}
                            />
                          )}
                          {activeTab.key === 'specs' && (
                            <div id="block-product-specifications" className="product-specifications">
                              <div className="specification">
                                <div className="body">
                                  {attrs.map((a, i) => (
                                    <div className="item" key={i}>
                                      <div className="spec__name" dangerouslySetInnerHTML={{ __html: a.name }} />
                                      <div
                                        className="spec__value"
                                        dangerouslySetInnerHTML={{ __html: a.value + (a.unit ? ' ' + a.unit : '') }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="product-features">
          <div className="parent">
            <div className="body">
              <div className="container">
                <div className="items">
                  {feats.map((f, i) => (
                    <div className="item" tabIndex="0" key={i}>
                      <div className="front-box item-content">
                        <div className="icon" dangerouslySetInnerHTML={{ __html: f.icon }} />
                        <div className="text">
                          <h4>{f.title}</h4>
                        </div>
                      </div>
                      <div className="back-box item-content">
                        <div className="text">
                          <p>{f.back}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
