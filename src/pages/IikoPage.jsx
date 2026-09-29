import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { imgUrl } from '../data/helpers';
import { BusinessBranch, Entrust, richText } from './HomePage';
import page from '../data/iiko_page.json';

const hero = page['Tipuri afaceri - Landing software iiko - Business Branch Ro - versimea 2'] || {};
const entrustData = page['Video - Automaizare restaurant Ro - Entrust Widget-8'] || {};
const redFeatures = page['Funcționalități - RED FEATURES - Automaitzare restarunta Ro - Widget Red Features'] || {};
const bgVanzare = page['iiko interfata de vanzare - iiko - BG GREY - Automatizare restaurant - Widget 2 '] || {};
const bgGestiune = page['iiko interfata de gestiune - iiko - BG GREY - Automatizare restaurant - Widget 3 '] || {};
const menu = page['iiko cloud + MENU - Widget Header-1'] || {};
const bgBucatarie = page['Ecran de bucatarie - iiko - BG GREY - Automatizare restaurant - Widget 2 '] || {};
const textFeatures = page['Echipament - IMAGE+TEXT -  Ro Text Features'] || {};
const dualServices = page['Servicii si suport - Landing iiko -Dual Widget-9'] || {};
const dualClients = page['Titlu si descriere clientii HORECA DUAL - Landing Horeca'] || {};
const clientLogos = page['LOGO CLIENTI PARTENERI RO - Automatizare restaurant '] || {};

function sidePayload(bg, side) {
  const s = (bg.widgets && bg.widgets[0] && bg.widgets[0].content && bg.widgets[0].content.payload && bg.widgets[0].content.payload[side]) || {};
  return {
    payload: (s.content && s.content.payload) || {},
    type: (s.content && s.content.template && s.content.template.type) || '',
    padding: s.padding || {},
  };
}

function scrollToWidget(value) {
  const el = document.getElementById('widget-' + value);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ChevronRight() {
  return (
    <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 320 512" width="10" height="16" style={{ color: '#161616' }}>
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

/* Title + list of numbered features (title-description-feature-widget) */
function TdfWidget({ data }) {
  return (
    <div className="widget-title-description-features">
      <div className="body">
        <div className="top">
          <div className="header">
            <div className="title">{data.title}</div>
            {data.description && <div className="description" dangerouslySetInnerHTML={{ __html: richText(data.description) }} />}
          </div>
          <div className="features">
            <div className="items">
              {(data.features || []).map((f, i) => (
                <div className="item" key={i}>
                  <div className="title">{f.title}</div>
                  <div className="content" dangerouslySetInnerHTML={{ __html: richText(f.description) }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Images column/row (widget-images) — used inside dual widgets and for client logos */
function WidgetImages({ data }) {
  const h = parseInt(data.imageHeight, 10) || null;
  const limit = data.limit ? data.limit + 1 : (data.images || []).length;
  const images = (data.images || []).slice(0, limit);
  return (
    <div className="widgetImages" style={data.padding ? { padding: data.padding } : undefined}>
      <div className="container">
        <div className="body">
          {data.title && (
            <div className="card-box-title">
              <h1>{data.title}</h1>
              {data.showViewAll && data.link && <Link to={data.link}>Vezi toate</Link>}
            </div>
          )}
          <div className="images">
            <div className="row flex">
              {images.map((im, i) => (
                <div className="custom-column" key={i} style={{ alignSelf: 'center' }}>
                  <a>
                    <img alt="" style={h ? { maxHeight: h + 'px', maxWidth: h + 'px' } : undefined} src={imgUrl(im.image && im.image.path)} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Accordion widget (Gestiunea bucatariei) — items expand on click */
function AccordionWidget({ data }) {
  const [open, setOpen] = useState(-1);
  const toggle = (i) => setOpen(open === i ? -1 : i);
  return (
    <div className="widget-accordion">
      <div className="body">
        <div className="top">
          <div className="header">
            <div className="title">{data.title}</div>
            <div className="description" dangerouslySetInnerHTML={{ __html: richText(data.description) }} />
          </div>
          <div className="accordions">
            <div className="items">
              {(data.accordions || []).map((a, i) => (
                <div className={'item' + (open === i ? ' active' : '')} key={i}>
                  <div className="left">
                    <div className="icon" onClick={() => toggle(i)}>
                      <ChevronRight />
                    </div>
                  </div>
                  <div className="right">
                    <div className="header" onClick={() => toggle(i)}>{a.header}</div>
                    {open === i && <div className="content" dangerouslySetInnerHTML={{ __html: richText(a.description) }} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {data.button && (
          <div className="bottom">
            <div className="button">
              <Link className="default-red-btn" to={data.button.button_link || '/'}>{data.button.button_text}</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Simple image slider (slider-images) */
function SliderImages({ data }) {
  const images = data.images || [];
  const [idx, setIdx] = useState(0);
  if (!images.length) return null;
  const img = images[idx];
  return (
    <div className="slider-images">
      <div className="content">
        <div className="carousel">
          <img alt="" src={imgUrl(img.image && img.image.path)} />
          {images.length > 1 && (
            <div className="owl-dots">
              {images.map((_, i) => (
                <div key={i} className={'owl-dot' + (i === idx ? ' active' : '')} onClick={() => setIdx(i)}><span /></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Renders a nested widget inside a dual column by its template type */
function NestedWidget({ side }) {
  if (side.type === 'widget-images') return <WidgetImages data={side.payload} />;
  if (side.type === 'widget-accordion') return <AccordionWidget data={side.payload} />;
  if (side.type === 'slider-images') return <SliderImages data={side.payload} />;
  return <TdfWidget data={side.payload} />;
}

/* Grey/white background wrapper containing a dual widget */
function BgDual({ bg, id }) {
  const left = sidePayload(bg, 'left');
  const right = sidePayload(bg, 'right');
  return (
    <div className="background null" id={id} style={bg.padding ? { padding: bg.padding } : undefined}>
      <div className="dual-widgets">
        <div className="widget-bg null"></div>
        <div className="container">
          <div className="dualWidgetWrap">
            <div className="left">
              <div className="dualWidgetBody">
                <div style={{ padding: left.padding.desktop || undefined, height: '100%' }}>
                  <NestedWidget side={left} />
                </div>
              </div>
            </div>
            <div className="right">
              <div className="dualWidgetBody">
                <div style={{ padding: right.padding.desktop || undefined, height: '100%' }}>
                  <NestedWidget side={right} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptySpace({ desktop, mobile, id }) {
  return (
    <>
      <div className="empty-space widget-background es-desktop" id={id} style={{ height: desktop }}></div>
      <div className="empty-space widget-background es-mobile" style={{ height: mobile }}></div>
    </>
  );
}

export default function IikoPage() {
  const advLeft = (dualServices.left && dualServices.left.content && dualServices.left.content.payload) || {};
  const advPadding = (dualServices.left && dualServices.left.padding) || {};
  const svcImages = (dualServices.right && dualServices.right.content && dualServices.right.content.payload) || {};
  const clientsTitle = (dualClients.left && dualClients.left.content && dualClients.left.content.payload) || {};
  const clientsDesc = (dualClients.right && dualClients.right.content && dualClients.right.content.payload) || {};
  const clientsPad = (dualClients.left && dualClients.left.padding) || {};

  return (
    <div className="site__body">
      {/* 1 — hero */}
      <div id="widget-1"><BusinessBranch data={hero} /></div>

      {/* 2 — entrust video */}
      <div id="widget-2"><Entrust data={entrustData} /></div>

      {/* 3 — red features */}
      <div className="widget-red-features" id="widget-3">
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

      {/* 4 — interfata de vanzare (TDF + images) */}
      <BgDual bg={bgVanzare} id="widget-4" />

      {/* 5 — empty space 32/20 */}
      <EmptySpace id="widget-5" desktop={32} mobile={20} />

      {/* 6 — interfata de gestiune (images + TDF) */}
      <BgDual bg={bgGestiune} id="widget-6" />

      {/* 7 — MENIU iiko page header + scroll links */}
      <div
        className="page-header widget bg-image hasLinks"
        id="widget-7"
        style={{ backgroundImage: menu.bgImage ? `url("${imgUrl(menu.bgImage.path)}")` : undefined }}
      >
        <div className="overlay" style={menu.overlay ? { background: menu.overlay } : undefined}></div>
        <div className="page-header__container container">
          <div className="page-header__title">
            <h1>{menu.title}</h1>
          </div>
        </div>
        <div className="links-container">
          <ul className="links">
            {(menu.links || []).map((l, i) => (
              <li key={i}>
                <a onClick={() => l.type === 'SCROLL' && scrollToWidget(l.value)}>{l.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 8 — ecran de bucatarie (slider + accordion) */}
      <BgDual bg={bgBucatarie} id="widget-8" />

      {/* 9 — empty space 45/0 */}
      <EmptySpace id="widget-9" desktop={45} mobile={0} />

      {/* 10 — echipamente text features */}
      <div className="widget-text-features" id="widget-10">
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
                              <div className="text" dangerouslySetInnerHTML={{ __html: richText(f.text) }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {textFeatures.button && (
                      <div className="button">
                        <Link className="default-red-btn" to={textFeatures.button.button_link || '/'}>{textFeatures.button.button_text}</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 11 — empty space 45/0 */}
      <EmptySpace id="widget-11" desktop={45} mobile={0} />

      {/* 12 — servicii si suport (advantages + image) */}
      <div className="dual-widgets" id="widget-12">
        <div className="container">
          <div className="dualWidgetWrap">
            <div className="left">
              <div className="dualWidgetBody">
                <div className="widgetAdvantages" style={{ padding: advPadding.desktop || undefined }}>
                  <div className="container">
                    <div className="ourAdvantages">
                      <div className="header">
                        <h2>{advLeft.title}</h2>
                        <p>{advLeft.label}</p>
                      </div>
                      <div className="advantagesList">
                        {(advLeft.advantages || []).map((a, i) => (
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
                <WidgetImages data={svcImages} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 13 — empty space 10/10 */}
      <EmptySpace id="widget-13" desktop={10} mobile={10} />

      {/* 14 — clienti title + description */}
      <div className="dual-widgets widget-background" id="widget-14">
        <div className="container">
          <div className="dualWidgetWrap">
            <div className="left">
              <div className="dualWidgetBody">
                <div className="title-parent" style={{ padding: clientsPad.desktop || undefined }}>
                  <div className="title" style={{ maxWidth: clientsTitle.maxWidth ? `${clientsTitle.maxWidth}px` : undefined }}>
                    <div dangerouslySetInnerHTML={{ __html: richText(clientsTitle.title) }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="dualWidgetBody bottom">
                <div className="sectionDescription" style={{ lineHeight: '30px' }} dangerouslySetInnerHTML={{ __html: richText(clientsDesc.description) }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 15 — client logos */}
      <div id="widget-15">
        <WidgetImages data={clientLogos} />
      </div>
    </div>
  );
}
