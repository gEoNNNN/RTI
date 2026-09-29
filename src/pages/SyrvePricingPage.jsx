import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { imgUrl } from '../data/helpers';
import { richText } from './HomePage';
import page from '../data/syrve_page.json';

const header = page['Widget Page Header-3 Romana'] || {};
const breadcrumbs = (page['Breadcrumbs-Preturi Syrve - RO'] || {}).breadcrumbs || [];
const pricing = page['Pachete soft Syrve - Landing software Syrve - Widget Pricing Box'] || {};
const solutions = page['Caracteristici pachete iiko - Landing software iiko - package-solutions English'] || {};

export function scrollToWidget(value) {
  const el = document.getElementById('widget-' + value);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function ChevronRight({ size = 10 }) {
  return (
    <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 320 512" width={size} height={size * 1.6}>
      <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
    </svg>
  );
}

/* Red arrow used in the comparison-table accordion (exact shape from the Angular SSR) */
function TableArrow() {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 11" style={{ width: '12px', height: '12px' }}>
      <path d="M0.3,10.7L0.3,10.7c0.4,0.4,0.9,0.4,1.3,0L7,5.5L1.6,0.3C1.2-0.1,0.7,0,0.3,0.3l0,0c-0.4,0.4-0.4,1,0,1.3l4,3.9l-4,3.9 C-0.1,9.8-0.1,10.4,0.3,10.7z" fill="#E72D35" />
    </svg>
  );
}

/* Status cell: '1' → green leaf, '0' → yellow leaf, '-1' → gray leaf, other → text */
function SolutionValue({ value }) {
  if (value === '1' || value === 1) return <div className="solution-status green"></div>;
  if (value === '0' || value === 0) return <div className="solution-status yellow"></div>;
  if (value === '-1' || value === -1) return <div className="solution-status gray"></div>;
  if (value === null || value === undefined || value === '') return null;
  return <div className="solution-info" dangerouslySetInnerHTML={{ __html: richText(value) }} />;
}

export function PricingBox({ data }) {
  const navigate = useNavigate();
  const many = (data.packages || []).length > 3;
  return (
    <div className="widget-pricing-box">
      <div className="left-side"></div>
      <div className="left-bullet-mark">
        <img src="/images/pricing-bullet-rectangle.svg" alt="" />
      </div>
      <div className="container">
        <div className="header">
          <div className="row" style={{ width: '100%' }}>
            <div className="col-lg-7"><h3 dangerouslySetInnerHTML={{ __html: richText(data.title) }} /></div>
            <div className="col-lg-5 description" dangerouslySetInnerHTML={{ __html: richText(data.description) }} />
          </div>
        </div>
        <div className="packages row">
          {(data.packages || []).map((p, i) => (
            <div className={(many ? 'col-lg-4 col-xl-3' : 'col-lg-4') + ' col-xs-12 col-sm-6'} key={i}>
              <div className={'package' + (many ? ' package-width' : '')}>
                <div className="title" dangerouslySetInnerHTML={{ __html: richText(p.title) }} />
                <div className={'description' + (p.description ? ' available' : '')} dangerouslySetInnerHTML={{ __html: richText(p.description) }} />
                <div className="box" tabIndex={0} onClick={() => navigate('/contacte')}>
                  <div className="pricing">
                    <div className={'price' + (data.oneTimePayment ? ' onetime-payment' : '')} dangerouslySetInnerHTML={{ __html: richText(p.price) }} />
                    {!data.oneTimePayment && <div className="time">/</div>}
                  </div>
                  <div className="content" dangerouslySetInnerHTML={{ __html: richText(p.content) }} />
                  <a className="button"> Comanda</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="background custome-bg"></div>
        {data.disclaimer && <div className="stared-text" dangerouslySetInnerHTML={{ __html: richText(data.disclaimer) }} />}
      </div>
    </div>
  );
}

function PackageSolutions({ data }) {
  const [open, setOpen] = useState({});
  const toggle = (i) => setOpen((o) => ({ ...o, [i]: !o[i] }));
  const groups = data.solutions || [];
  return (
    <div className="widget-package-solution widget container">
      <h4 className="widget__title">{data.title}</h4>
      <div className="widget-table">
        <div className="row table-header">
          <div className="col-lg-5 package-content col-md-4 col-3"> {data.packageContent} </div>
          <div className="col-lg-2 basic-head col-md-2 col-3"> {data.basic} </div>
          <div className="col-lg-2 basic-head col-md-2 col-3"> {data.pro} </div>
          <div className="col-lg-2 basic-head col-md-2 col-3"> {data.enterprise} </div>
          <div className="col-lg-1 see-all col-md-2"> {data.seeAll} </div>
        </div>
        <div role="tablist" className="panel-group" aria-multiselectable="false" style={{ display: 'block' }}>
          {groups.map((s, i) => {
            const subs = s.additional_solutions || [];
            const active = !!open[i];
            return (
              <div key={i} className={'panel accordion-item' + (active ? ' panel-open' : '')} style={{ display: 'block' }}>
                <div className="panel card panel-default">
                  <div role="tab" className="panel-heading card-header panel-enabled" onClick={() => toggle(i)}>
                    <div className="panel-title">
                      <div role="button" className="accordion-toggle" aria-expanded={active}>
                        <div className="accordion-header">
                          <div className="row">
                            <div className="col-lg-5 col-md-4 col-3 item-title"> {s.title} </div>
                            <div className="col-lg-2 col-md-2 col-3"><SolutionValue value={s.basic} /></div>
                            <div className="col-lg-2 col-md-2 col-3"><SolutionValue value={s.pro} /></div>
                            <div className="col-lg-2 col-md-2 col-3"><SolutionValue value={s.enterprise} /></div>
                            <div className="col-lg-1 header-arrow col-md-2 col-2"><TableArrow /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div role="tabpanel" className={'panel-collapse collapse' + (active ? ' show active-collapse' : '')} style={active ? undefined : { display: 'none' }} aria-expanded={active} aria-hidden={!active}>
                    <div className="panel-body card-block card-body">
                      {subs.map((sub, j) => (
                        <div className="accordion-content" key={j}>
                          <div className="row">
                            <div className="col-lg-5 col-md-4 col-3"> {sub.title} </div>
                            <div className="col-lg-2 col-md-2 col-3"><SolutionValue value={sub.basic} /></div>
                            <div className="col-lg-2 col-md-2 col-3"><SolutionValue value={sub.pro} /></div>
                            <div className="col-lg-1 col-md-2 col-3"><SolutionValue value={sub.enterprise} /></div>
                            <div className="col-lg-1 col-md-2 col-2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function SyrvePricingPage() {
  return (
    <div className="site__body">
      {/* 1 — page header with scroll links */}
      <div
        className="page-header widget bg-image hasLinks"
        id="widget-1"
        style={{ backgroundImage: header.bgImage ? `url("${imgUrl(header.bgImage.path)}")` : undefined }}
      >
        <div className="overlay" style={{ background: 'transparent' }}></div>
        <div id="links" className="page-header__container container">
          <div className="page-header__title">
            <h1>{header.title}</h1>
          </div>
        </div>
        <div className="links-container">
          <ul className="links">
            {(header.links || []).map((l, i) => (
              <li key={i}>
                <a onClick={() => l.type === 'SCROLL' && scrollToWidget(l.value)}>{l.name}</a>
              </li>
            ))}
          </ul>
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

      {/* 3 — pricing box */}
      <div id="widget-3"><PricingBox data={pricing} /></div>

      {/* 4 — package solutions comparison table */}
      <div id="widget-4"><PackageSolutions data={solutions} /></div>
    </div>
  );
}
