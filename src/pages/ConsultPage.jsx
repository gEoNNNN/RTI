import React from 'react';
import { imgUrl } from '../data/helpers';
import { Partners, richText } from './HomePage';
import pageRo from '../data/consult_page.json';
import pageRu from '../data/ru/consult_page.json';
import pageEn from '../data/en/consult_page.json';
import { useLang, useT, useTo, to, pick } from '../lang';


export default function ConsultPage() {
  const lang = useLang();
  const page = pick(lang, pageRo, pageRu, pageEn);
  const header = page.widgets[0].payload || {};
  const paragraph = (page.widgets[2].payload || {}).paragraph || '';
  const partners = page.widgets[3].payload || {};
  return (
    <div className="site__body">
      {/* widget-1: page header */}
      <div
        className="page-header widget bg-image"
        style={{ backgroundImage: header.bgImage ? `url("${imgUrl(header.bgImage.path)}")` : undefined }}
      >
        <div className="overlay" style={{ background: 'transparent' }}></div>
        <div className="page-header__container container">
          <div className="page-header__title">
            <h1>{header.title}</h1>
          </div>
        </div>
      </div>

      {/* widget-2: empty space (live renders height 0) */}
      <div className="empty-space widget-body widget-background"></div>

      {/* widget-3: paragraph */}
      <div className="container paragraph-section" dangerouslySetInnerHTML={{ __html: richText(paragraph) }} />

      {/* widget-4: partners */}
      <Partners data={partners} />
    </div>
  );
}
