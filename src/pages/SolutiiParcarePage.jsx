import React from 'react';
import { Link } from 'react-router-dom';
import { imgUrl } from '../data/helpers';
import { BusinessBranch, Partners, richText } from './HomePage';
import pageRo from '../data/parcare_page.json';
import pageRu from '../data/ru/parcare_page.json';
import pageEn from '../data/en/parcare_page.json';
import { useLang, useT, useTo, to, pick } from '../lang';


function ChevronRight() {
  return (
    <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 320 512" width="8" height="12" style={{ margin: '0 10px', color: '#b3b3b3' }}>
      <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
    </svg>
  );
}

export default function SolutiiParcarePage() {
  const lang = useLang();
  const page = pick(lang, pageRo, pageRu, pageEn);
  const hero = page['Widget Page Header Automatizare PARCARE - RO'] || {};
  const breadcrumbs = (page['Breadcrumbs Solutii Sisteme de parcare'] || {}).breadcrumbs || [];
  const dualW = page['Dual Widget Title - Sisteme parcare'] || {};
  const solutions = (page['Widget Solution Unde poate fi instalat?'] || {}).slides || [];
  const partnersData = page['Partners Widget-Sisteme de parcare'] || {};
  const leftTitle = (dualW.left && dualW.left.content && dualW.left.content.payload) || {};
  const rightDesc = (dualW.right && dualW.right.content && dualW.right.content.payload) || {};
  const leftPadding = (dualW.left && dualW.left.padding) || {};
  return (
    <div className="site__body">
      <BusinessBranch data={hero} />

      {breadcrumbs.length > 0 && (
        <div className="bottom-breadcrumbs">
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

      <div className="empty-space widget-background" style={{ height: 30 }}></div>

      <div className="dual-widgets widget-background">
        <div className="container">
          <div className="dualWidgetWrap">
            <div className="left">
              <div className="dualWidgetBody">
                <div className="title-parent" style={{ padding: leftPadding.desktop || undefined }}>
                  <div className="title" style={{ maxWidth: leftTitle.maxWidth ? `${leftTitle.maxWidth}px` : undefined }}>
                    <div dangerouslySetInnerHTML={{ __html: richText(leftTitle.title) }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="dualWidgetBody">
                <div className="sectionDescription" style={{ lineHeight: '30px' }} dangerouslySetInnerHTML={{ __html: richText(rightDesc.description) }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="empty-space widget-background" style={{ height: 30 }}></div>

      <div className="widgetBusinessBranch solutionsBranch">
        <div className="container">
          <div className="slides clearfix">
            <div className="row w-full">
              {solutions.map((s, i) => (
                <div className="col-md-6 col-lg-4 item-info" key={i}>
                  <div className={`businessBranchItem ${s.class || ''}`}>
                    <Link to={'/' + (s.target && s.target.url ? s.target.url.replace(/^\//, '') : '')}>
                      <div
                        className="content"
                        style={{ backgroundImage: s.image ? `url("${imgUrl(s.image.path)}")` : undefined }}
                      >
                        <h6>
                          <span>{s.label}</span>
                        </h6>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="background-red"></div>
        </div>
      </div>

      <div className="empty-space widget-background" style={{ height: 80 }}></div>

      <Partners data={partnersData} />
    </div>
  );
}
