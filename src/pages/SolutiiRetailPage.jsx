import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { imgUrl } from '../data/helpers';
import { BusinessBranch, richText } from './HomePage';
import page from '../data/retail_page.json';

const hero = page['Widget Page Header Automatizare RETAIL - RO'] || {};
const breadcrumbs = (page['Breadcrumbs Automatizare Retail'] || {}).breadcrumbs || [];
const dualW = page['Dual Widget Title - Automatizare Retail'] || {};
const leftTitle = (dualW.left && dualW.left.content && dualW.left.content.payload) || {};
const rightDesc = (dualW.right && dualW.right.content && dualW.right.content.payload) || {};
const leftPadding = (dualW.left && dualW.left.padding) || {};
const solutions = (page['Widget Solution Retail Business Branch-5'] || {}).slides || [];
const entrustP = page['Descriere - Automatizare Retail New - Entrust Widget-0'] || {};
const redFeatures = page['Funcționalitățile REM - Automatizare Retail New - Widget Red Features-3'] || {};
const textFeatures = page['REM Beneficii - IMAGE+TEXT -  Ro Text Features'] || {};
const automatization = page['Complecte produse - Automatizare Retail - Widget Categorii produse'] || {};
const seoDesc = page['Description Widget-4 RO - Landing automatizarea magazinelor - Descriere SEO'] || {};

function ChevronRight() {
  return (
    <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 320 512" width="8" height="12" style={{ margin: '0 10px', color: '#b3b3b3' }}>
      <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
    </svg>
  );
}

function SeoText({ description }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="container">
      <div className="seo-text">
        <div className={'seo-content' + (expanded ? '' : ' collapsed')} style={expanded ? undefined : { maxHeight: 300, overflow: 'hidden', position: 'relative' }}>
          {!expanded && (
            <div className="bg-gradient" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(transparent, #fff)' }}></div>
          )}
          <div dangerouslySetInnerHTML={{ __html: richText(description) }} />
        </div>
        <div className="extend-button">
          <div className="button" onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
            <div>{expanded ? 'Restrange' : 'Extinde'}</div>
            <div className="seo-arrow" style={{ transform: expanded ? 'rotate(180deg)' : undefined }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SolutiiRetailPage() {
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

      <div className="widgetBusinessBranch solutionsBranch">
        <div className="container">
          <div className="slides">
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

      <div className="widgetEntrust">
        <div className="left-side"></div>
        <div className="container">
          <div className="header">
            <div className="row">
              <div className="col-lg-7 title">{entrustP.title}</div>
              <div className="col-lg-5 description">{entrustP.description}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="widget-red-features">
        <div className="container">
          <div className="over-bg">
            {redFeatures.title && (
              <div className="header">
                <h3>{redFeatures.title}</h3>
              </div>
            )}
            <div className="body">
              <div className="row">
                {(redFeatures.information || []).map((info, i) => (
                  <div className="col-md-6 col-lg-4 item-info" key={i}>
                    <div className="info-block">
                      <div className="body">
                        {info.image && (
                          <div className="image">
                            <img alt="" src={imgUrl(info.image.path)} />
                          </div>
                        )}
                        <div className="title">{info.title}</div>
                        <div className="description">{info.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="background" style={{ background: redFeatures.backgroundColor }}></div>
          <div className="bullet-mask"></div>
        </div>
      </div>

      <div className="empty-space widget-background" style={{ height: 32 }}></div>

      <div className="widget-text-features">
        <div className="container">
          <div className="body">
            <div className="header">
              <div className="title">{textFeatures.title}</div>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-6">
                  <div className="left">
                    <div className="image">
                      {textFeatures.image && <img alt="" className="payload-image" src={imgUrl(textFeatures.image.path)} />}
                      <div className="bullet-mask"></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="right">
                    <div className="features">
                      <div className="items">
                        {(textFeatures.features || []).map((f, i) => (
                          <div className="item" key={i}>
                            <div className="left">
                              <div className="icon">
                                <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 512 512" width="17" height="17" style={{ color: '#000' }}>
                                  <path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                                </svg>
                              </div>
                            </div>
                            <div className="right">
                              <div className="text">{f.text}</div>
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
        </div>
      </div>

      <div className="empty-space widget-background" style={{ height: 10 }}></div>

      <div className="widgetBusinessAutomatization">
        <div className="container">
          <div className="sectionTitle">{automatization.title}</div>
          <p className="sectionDescription">{automatization.description}</p>
          <div className="productsWrap">
            {(automatization.products || []).map((p, i) => (
              <app-product-item className={p.type === 'big' ? 'big' : undefined} key={i}>
                <div className="productItem">
                  <div className="imageBg">
                    {p.image && <img alt="productImage" className="image-loaded" src={imgUrl(p.image.path)} />}
                  </div>
                  <h4 className="productItemTitle">{p.title}</h4>
                  <p className="description">{p.description}</p>
                  {p.target && p.target.url && (
                    <Link className="btn btn-primary btn-sm" to={p.target.url.startsWith('/') ? p.target.url : '/' + p.target.url}>
                      Mai multe
                    </Link>
                  )}
                </div>
              </app-product-item>
            ))}
          </div>
        </div>
      </div>

      <SeoText description={seoDesc.description} />
    </div>
  );
}
