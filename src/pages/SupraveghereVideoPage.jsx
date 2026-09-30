import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { imgUrl } from '../data/helpers';
import { BusinessBranch, richText } from './HomePage';
import pageRo from '../data/video_page.json';
import pageRu from '../data/ru/video_page.json';
import pageEn from '../data/en/video_page.json';
import { useLang, useT, useTo, to, pick } from '../lang';



// anchor targets for the SCROLL links of the menu widget (Domeniul, Beneficii, ...)
const anchorFor = {
  '1': 'sec-domeniul',
  '2': 'sec-beneficii',
  '3': 'sec-avantaje',
  '5': 'sec-functii',
  '10': 'sec-service',
  '11': 'sec-contacte',
};

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ChevronRight() {
  return (
    <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 320 512" width="8" height="12" style={{ margin: '0 10px', color: '#b3b3b3' }}>
      <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 512 512" width="17" height="17" style={{ color: '#000' }}>
      <path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </svg>
  );
}

function Banner({ data }) {
  return (
    <div className="widgetBanner">
      <div className="container">
        <div className="d-flex">
          <div className="left">
            <div className="content">
              <h4 className="bannerTitle">{data.title}</h4>
              <div className="description" dangerouslySetInnerHTML={{ __html: richText(data.description) }} />
            </div>
          </div>
          <div className="right">
            {data.image && <img alt="" src={imgUrl(data.image.path)} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function SeoText({ description }) {
  const t = useT();
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
            <div>{expanded ? t('SeoText.restrict', 'Restrange') : t('SeoText.expand', 'Extinde')}</div>
            <div className="seo-arrow" style={{ transform: expanded ? 'rotate(180deg)' : undefined }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SupraveghereVideoPage() {
  const lang = useLang();
  const page = pick(lang, pageRo, pageRu, pageEn);
  const cover = page['Cover - Landing sisteme de supraveghere - Business Branch Widget-6'] || {};
  const breadcrumbs = (page['Breadcrumbs Solutii Sisteme video'] || {}).breadcrumbs || [];
  const dualW = page['Dual Widget-Sisteme Video'] || {};
  const solutions = (page['Widget Solution Sisteme video Business Branch-5'] || {}).slides || [];
  const menu = page['Menu - Landing sisteme de supraveghere - Widget Page Header-4'] || {};
  const redFeatures = page['Beneficii - Landing sisteme supraveghere - Widget Red Features-3'] || {};
  const banner1 = page['Detector mișcare - Landing sisteme supraveghere - Banner Widget-3'] || {};
  const textFeatures = page['Conectare wifi - Landing sisteme supraveghere - Text Features-5'] || {};
  const banner2 = page['Vedere nocturnă - Landing sisteme supraveghere - Banner Widget-3'] || {};
  const ip67 = page['Imagine IP67 - Landing supraveghere video - Widget Images-8'] || {};
  const dual2 = page['Servicii si suport - Landing supraveghere video -Dual Widget-9'] || {};
  const cta = page['Call to action - Landing supraveghere video - Widget Images-8'] || {};
  const seoDesc = page['Description Widget-5 RO'] || {};
  const leftTitle = (dualW.left && dualW.left.content && dualW.left.content.payload) || {};
  const rightDesc = (dualW.right && dualW.right.content && dualW.right.content.payload) || {};
  const leftPadding = (dualW.left && dualW.left.padding) || {};
  const advPayload = (dual2.left && dual2.left.content && dual2.left.content.payload) || {};
  const advPadding = (dual2.left && dual2.left.padding) || {};
  const rightImagesPayload = (dual2.right && dual2.right.content && dual2.right.content.payload) || {};
  return (
    <div className="site__body">
      <BusinessBranch data={cover} />

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

      <div className="dual-widgets widget-background" id="sec-domeniul">
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

      <div className="page-header widget bg-image hasLinks" style={{ backgroundImage: menu.bgImage ? `url("${imgUrl(menu.bgImage.path)}")` : undefined }}>
        <div className="overlay"></div>
        <div className="page-header__container container">
          <div className="page-header__title">
            <h1>{menu.title}</h1>
          </div>
        </div>
        <div className="links-container">
          <ul className="links">
            {(menu.links || []).map((l, i) => (
              <li key={i}>
                <a onClick={() => scrollTo(anchorFor[l.value] || '')}>{l.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="widget-red-features" id="sec-beneficii">
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

      <div className="empty-space widget-background" style={{ height: 40 }}></div>

      <div id="sec-avantaje">
        <Banner data={banner1} />
      </div>

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
                              <div className="icon"><CheckIcon /></div>
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

      <Banner data={banner2} />

      <div className="widgetImages" id="sec-functii">
        <div className="container">
          <div className="body">
            <div className="images">
              <div className="flex">
                {(ip67.images || []).map((im, i) => (
                  <div className="image show-one-image" key={i}>
                    <a>
                      <img alt="" src={imgUrl(im.image && im.image.path)} />
                    </a>
                    <div className="bg-image-box"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="empty-space widget-background" style={{ height: 40 }}></div>

      <div className="dual-widgets" id="sec-service">
        <div className="container">
          <div className="dualWidgetWrap">
            <div className="left">
              <div className="dualWidgetBody">
                <div className="widgetAdvantages" style={{ padding: advPadding.desktop || undefined }}>
                  <div className="container">
                    <div className="ourAdvantages">
                      <div className="header">
                        <h2>{advPayload.title}</h2>
                        <p>{advPayload.label}</p>
                      </div>
                      <div className="advantagesList">
                        {(advPayload.advantages || []).map((a, i) => (
                          <div className="advantageItem" key={i}>
                            <div className="header">
                              <span>{i + 1}</span>
                              <h4>{a.title}</h4>
                            </div>
                            <p className="description">{a.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="dualWidgetBody">
                <div className="widgetImages">
                  <div className="body">
                    <div className="images">
                      <div className="row flex">
                        {(rightImagesPayload.images || []).map((im, i) => (
                          <div className="custom-column" key={i}>
                            <a>
                              <img alt="" src={imgUrl(im.image && im.image.path)} />
                            </a>
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

      <div className="widgetImages" id="sec-contacte">
        <div className="container">
          <div className="body">
            <div className="images">
              <div className="flex">
                {(cta.images || []).map((im, i) => (
                  <div className="image show-one-image" key={i}>
                    <a>
                      <img alt="" src={imgUrl(im.image && im.image.path)} />
                    </a>
                    <div className="bg-image-box"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SeoText description={seoDesc.description} />
    </div>
  );
}
