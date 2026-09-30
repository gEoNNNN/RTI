import React from 'react';
import { Link } from 'react-router-dom';
import { imgUrl } from '../data/helpers';
import { richText } from './HomePage';
import { PricingBox, ChevronRight } from './SyrvePricingPage';
import pageRo from '../data/onec_page.json';
import pageRu from '../data/ru/onec_page.json';
import pageEn from '../data/en/onec_page.json';
import { useLang, useT, useTo, to, pick } from '../lang';


function EmptySpace({ h, id }) {
  return (
    <>
      <div className="empty-space widget-body es-desktop" id={id} style={{ height: parseInt(h.desktop, 10) || 0 }}></div>
      <div className="empty-space widget-body es-mobile" style={{ height: parseInt(h.mobile, 10) || 0 }}></div>
    </>
  );
}

export default function OneCPricingPage() {
  const lang = useLang();
  const page = pick(lang, pageRo, pageRu, pageEn);
  const header = page['Page header widget 1C Soft'] || {};
  const breadcrumbs = (page['Preturi soft 1c breadcumbs'] || {}).breadcrumbs || [];
  const pricing = page['1C price box widget'] || {};
  const esAfterPricing = (page['Empty Space-1C-page'] || {}).height || {};
  const containerTitle = page['Title container 1C before feature items'] || {};
  const esAfterTitle = (page['Empty Space 1C after Title'] || {}).height || {};
  const features = page['Feature item with hover effect UP'] || {};
  const esAfterParagraph = (page['Empty Space after paragraph'] || {}).height || {};
  const paragraph = page['Paragraph container 1C page after Title'] || {};
  const esBottom = (page['Empty Space bottom'] || {}).height || {};
  return (
    <div className="site__body">
      {/* 1 — page header (no links) */}
      <div
        className="page-header widget bg-image"
        id="widget-1"
        style={{ backgroundImage: header.bgImage ? `url("${imgUrl(header.bgImage.path)}")` : undefined }}
      >
        <div className="overlay" style={{ background: 'transparent' }}></div>
        <div id="links" className="page-header__container container">
          <div className="page-header__title">
            <h1>{header.title}</h1>
          </div>
        </div>
      </div>

      {/* 2 — breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="bottom-breadcrumbs" id="widget-2">
          <div className="container">
            <nav aria-label="breadcrumb" className="border-bottom">
              <ul className="breadcrumb">
                {breadcrumbs.map((c, i) => {
                  const last = i === breadcrumbs.length - 1;
                  return (
                    <li key={i} className={`bc-item ${last ? 'active' : ''}`} aria-current={last ? 'page' : undefined}>
                      {c.link && !last ? <Link to={c.link}>{c.title}</Link> : <span>{c.title}</span>}
                      {!last && <ChevronRight />}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* 3 — pricing box (one-time payment, 4 packages) */}
      <div id="widget-3"><PricingBox data={pricing} /></div>

      {/* 4 — empty space 70/35 */}
      <EmptySpace h={esAfterPricing} id="widget-4" />

      {/* 5 — container title */}
      <div className="container container-title widget-body" id="widget-5">{containerTitle.title}</div>

      {/* 6 — empty space 30/20 */}
      <EmptySpace h={esAfterTitle} id="widget-6" />

      {/* 7 — feature items grid */}
      <div className="parent feature-items-new widget-body" id="widget-7">
        <div className="body">
          <div className="container">
            <div className="items">
              {(features.features || []).map((f, i) => (
                <div className="item" key={i}>
                  <div className="front-box item-content">
                    <div className="feature-date" dangerouslySetInnerHTML={{ __html: richText(f.numbers) }} />
                    <div className="text"><h4 dangerouslySetInnerHTML={{ __html: richText(f.text) }} /></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mask"></div>
          </div>
        </div>
      </div>

      {/* 8 — empty space 34/34 */}
      <EmptySpace h={esAfterParagraph} id="widget-8" />

      {/* 9 — paragraph */}
      <div className="container paragraph-section widget-body" id="widget-9" dangerouslySetInnerHTML={{ __html: richText(paragraph.paragraph) }} />

      {/* 10 — empty space 50/25 */}
      <EmptySpace h={esBottom} id="widget-10" />
    </div>
  );
}
