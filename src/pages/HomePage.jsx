import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import widgets from '../data/widgets.json';
import articles from '../data/articles.json';
import { imgUrl } from '../data/helpers';

const MONTHS_RO = [
  'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie',
];

export function richText(html) {
  if (!html) return '';
  return html
    .replace(/&l;/g, '<')
    .replace(/&g;/g, '>')
    .replace(/&icirc;/g, 'î')
    .replace(/&#537;/g, 'ș')
    .replace(/&#539;/g, 'ț')
    .replace(/&#259;/g, 'ă')
    .replace(/&#226;/g, 'â')
    .replace(/&#238;/g, 'î')
    .replace(/&amp;/g, '&');
}

const w = {};
widgets.forEach((widget) => {
  w[widget.type] = widget.payload;
});

const branch = w['business-branch-widget'] || {};
const entrust = w['entrust-widget'] || {};
const partners = w['partners-widget'] || {};
const dual = w['dual-widget'] || {};
const newsW = w['news-widget'] || {};
const seo = w['seo-text-widget'] || {};

const dualLeft = dual.left && dual.left.content && dual.left.content.payload;
const dualRight = dual.right && dual.right.content && dual.right.content.payload;

const NEWS_SLUGS = [
  'cum-alegem-un-cantar-electronic-comercial-mai-bun',
  'avtomatizaciya-restorana-3-interesnyh-instrumenta',
  'automatizarea-comertului-cu-amanuntul-solutii-pentru-orice-tip-de-magazin',
  'sfaturi-utile-pentru-alegerea-sistemului-crm-potrivit-afacerii-tale',
  'un-magazin-securizat-este-un-magazin-profitabil',
];
const newsArticles = NEWS_SLUGS.map((s) => articles.find((a) => a.slug === s)).filter(Boolean);

function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${MONTHS_RO[d.getMonth()]} ${d.getFullYear()}`;
}

function ShareIcon({ color = '#FFFFFF' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 6.66675C16.3807 6.66675 17.5 5.54746 17.5 4.16675C17.5 2.78604 16.3807 1.66675 15 1.66675C13.6193 1.66675 12.5 2.78604 12.5 4.16675C12.5 5.54746 13.6193 6.66675 15 6.66675Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke={color} />
      <path d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke={color} />
      <path d="M15 18.3333C16.3807 18.3333 17.5 17.214 17.5 15.8333C17.5 14.4525 16.3807 13.3333 15 13.3333C13.6193 13.3333 12.5 14.4525 12.5 14.4525C12.5 15.8333 13.6193 18.3333 15 18.3333Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke={color} />
      <path d="M7.15833 11.2583L12.85 14.575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke={color} />
      <path d="M12.8417 5.42505L7.15833 8.74172" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke={color} />
    </svg>
  );
}

function ArrowBtn() {
  return (
    <div className="position-arrow-btn">
      <div className="arrow-btn">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.9418 20.4562L17.7379 13.6601L10.9418 6.86401" stroke="#D8242C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function Chevron({ dir }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d={dir === 'left' ? 'M15 18L9 12L15 6' : 'M9 18L15 12L9 6'}
        stroke="#161616"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BusinessBranch({ data = branch }) {
  return (
    <div className="widgetBusinessBranch">
      <div className="background">
        {data.bgImage && <img alt="Hero section image." loading="eager" src={imgUrl(data.bgImage.path)} />}
        <div className="gradient"></div>
        <div className="container">
          <div className="meta">
            <h1 dangerouslySetInnerHTML={{ __html: richText(data.title) }} />
            <p dangerouslySetInnerHTML={{ __html: richText(data.description) }} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="slides clearfix">
          {(data.slides || []).map((s, i) => (
            <div className="slide" key={i}>
              <div className="businessBranchItem">
                <a href={s.target && s.target.url ? '/' + s.target.url.replace(/^\//, '') : undefined}>
                  <div
                    className="content"
                    style={{ backgroundImage: s.image ? `url("${imgUrl(s.image.path)}")` : undefined }}
                  >
                    {s.icon && <img loading="lazy" alt="icon" className="icon light" src={imgUrl(s.icon.path)} />}
                    {s.darkIcon && <img loading="lazy" alt="icon" className="icon dark" src={imgUrl(s.darkIcon.path)} />}
                    <h6>
                      <span>{s.label}</span>
                    </h6>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Entrust({ data = entrust }) {
  const slides = data.slides || [];
  const [idx, setIdx] = useState(0);
  if (!slides.length) return null;
  const s = slides[idx];
  const prev = () => setIdx((idx - 1 + slides.length) % slides.length);
  const next = () => setIdx((idx + 1) % slides.length);

  return (
    <div className="widgetEntrust">
      <div className="left-side"></div>
      <div className="container">
        <div className="header">
          <div className="row">
            <div className="col-lg-7 title" dangerouslySetInnerHTML={{ __html: richText(data.title) }} />
            <div className="col-lg-5 description" dangerouslySetInnerHTML={{ __html: richText(data.description) }} />
          </div>
        </div>
        <div className="slider">
          <div className="entrustSlider">
            <div className="icon-decorator">
              <img alt="Icon decorator" src="/images/red-leave.e9efb.svg" />
            </div>
            <div className="slideContent">
              <div className="row">
                <div className="col-lg-5">
                  <div className="left-side">
                    <div className="meta">
                      <div className="imageBox">
                        <img alt={s.company || 'Client'} src={s.image ? imgUrl(s.image.path) : '/images/shopping-bag.e9efb.svg'} />
                      </div>
                      <div className="descriptionBox">
                        {s.description}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="right-side">
                    <div className="videoBox">
                      <div className="playerWrap">
                        {s.video && s.video.url ? (
                          <a
                            href={
                              /^https?:/i.test(s.video.url.replace(/"/g, ''))
                                ? s.video.url.replace(/"/g, '')
                                : 'https://www.youtube.com/watch?v=' + s.video.url.replace(/"/g, '')
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="video-placeholder"
                            style={{ display: 'block' }}
                          >
                            <img alt="Video thumbnail." loading="lazy" src={s.video.image ? imgUrl(s.video.image.path) : ''} />
                            <div className="wrapper">
                              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                                <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fillOpacity="0.8" className="ytp-large-play-button-bg"></path>
                                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                              </svg>
                            </div>
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <div className="bottomBox">
                      <div className="author-info">
                        <div className="author">
                          <span>{s.author}</span>
                        </div>
                        <div className="author-origins">
                          <span>{s.job} {s.company}</span>
                        </div>
                      </div>
                      <div className="navigation desktop">
                        <div className="buttons" style={{ display: 'flex' }}>
                          <div className="btn-nav" onClick={prev} role="button" tabIndex="0">
                            <img alt="Previous slide icon" src="/images/chevron-left.e9efb.svg" />
                          </div>
                          <div className="btn-nav" onClick={next} role="button" tabIndex="0">
                            <img alt="Next slide icon" src="/images/chevron-right.e9efb.svg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-dots" style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '14px 0' }}>
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={'owl-dot' + (i === idx ? ' active' : '')}
                  onClick={() => setIdx(i)}
                  role="button"
                  tabIndex="0"
                  style={{ cursor: 'pointer' }}
                >
                  <span
                    style={{
                      display: 'block',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: i === idx ? '#d8242c' : '#d6d6d6',
                    }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Partners({ data = partners }) {
  const list = data.partners || [];
  const [start, setStart] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const wrapRef = useRef(null);
  const [wrapW, setWrapW] = useState(1200);
  const len = list.length;

  const visibleCount = wrapW < 576 ? 2 : wrapW < 992 ? 4 : 7;
  const itemW = wrapW / visibleCount;

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((es) => setWrapW(es[0].contentRect.width));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (showAll || len < 2) return;
    const t = setInterval(() => setStart((s) => s + 1), 2000);
    return () => clearInterval(t);
  }, [showAll, len]);

  // When the offset reaches the full list length, the doubled track shows the
  // same logos as offset 0 — snap back without transition to keep it seamless.
  useEffect(() => {
    if (start >= len && len > 0) {
      setAnimate(false);
      setStart(0);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(raf);
    }
  }, [start, len]);

  const go = (dir) => {
    if (dir === 'next') {
      setAnimate(true);
      setStart((s) => s + 1);
    } else {
      setAnimate(false);
      setStart((s) => (s === 0 ? len : s));
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setStart((s) => s - 1);
        })
      );
    }
  };

  return (
    <div className="widgetPartners">
      <div className="left-side"></div>
      <div className="container">
        <div className="header">
          <div className="left-header">
            <div className="title">
              <h2 dangerouslySetInnerHTML={{ __html: richText(data.title) }} />
            </div>
            {data.label && <p dangerouslySetInnerHTML={{ __html: richText(data.label) }} />}
          </div>
          <div className="right-header">
            <div className="nav-position desktop">
              <div className="viewAll" onClick={() => setShowAll((v) => !v)} style={{ cursor: 'pointer' }}>
                <div className="viewAll-body">
                  <div className="button">
                    <span>{showAll ? 'Ascunde' : (data.target && data.target.text) || 'Vezi toate'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="partnersWrap">
          {showAll ? (
            <div
              className="partnersGrid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 24,
                alignItems: 'center',
              }}
            >
              {list.map((p, i) => (
                <div className="partnerItem" key={i} style={{ minHeight: 80 }}>
                  <img alt="rti clients logos" loading="lazy" src={imgUrl(p.image && p.image.path)} style={{ maxWidth: '100%', maxHeight: 80, objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="partnersCarousel">
              <div className="carousel-arrow left" onClick={() => go('prev')} role="button" tabIndex="0">
                <Chevron dir="left" />
              </div>
              <div className="partnersTrackWrap" ref={wrapRef}>
                <div
                  className="partnersTrack"
                  style={{
                    transform: `translateX(-${start * itemW}px)`,
                    transition: animate ? 'transform 0.5s ease' : 'none',
                  }}
                >
                  {[...list, ...list].map((p, i) => (
                    <div className="partnersTrackItem" key={i} style={{ width: itemW }}>
                      <img alt="rti clients logos" loading="lazy" src={imgUrl(p.image && p.image.path)} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="carousel-arrow right" onClick={() => go('next')} role="button" tabIndex="0">
                <Chevron dir="right" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DualWidget() {
  const media = (dualRight && dualRight.media) || [];
  const footer = (dualRight && dualRight.footer_item) || [];
  const [mi, setMi] = useState(0);
  const [mAnim, setMAnim] = useState(true);
  const [fi, setFi] = useState(0);
  const mWrapRef = useRef(null);
  const [mW, setMW] = useState(560);

  useEffect(() => {
    if (!mWrapRef.current) return;
    const ro = new ResizeObserver((es) => setMW(es[0].contentRect.width));
    ro.observe(mWrapRef.current);
    return () => ro.disconnect();
  }, []);

  const mVis = mW < 576 ? 2 : 4;
  const mItemW = mW / mVis;

  useEffect(() => {
    if (media.length < 2) return;
    const t = setInterval(() => setMi((s) => s + 1), 3000);
    return () => clearInterval(t);
  }, [media.length]);

  useEffect(() => {
    if (footer.length < 2) return;
    const t = setInterval(() => setFi((s) => (s + 1) % footer.length), 3000);
    return () => clearInterval(t);
  }, [footer.length]);

  useEffect(() => {
    if (mi >= media.length && media.length > 0) {
      setMAnim(false);
      setMi(0);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMAnim(true)));
      return () => cancelAnimationFrame(raf);
    }
  }, [mi, media.length]);

  const f = footer[fi];
  return (
    <div className="dual-widgets">
      <div className="container">
        <div className="dualWidgetWrap">
          <div className="left">
            <div className="dualWidgetBody">
              <div className="widgetAdvantages widget-body" style={{ width: '100%' }}>
                <div className="container">
                  <div className="ourAdvantages">
                  <div className="header">
                    <h2>{dualLeft && dualLeft.title}</h2>
                    <p>{dualLeft && dualLeft.label}</p>
                  </div>
                  <div className="advantagesList">
                    {(dualLeft ? dualLeft.advantages || [] : []).map((a, i) => (
                      <div className="advantageItem" key={i}>
                        <div className="header">
                          <span>{i + 1}</span>
                          <h4 dangerouslySetInnerHTML={{ __html: richText(a.title) }} />
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
              <div className="widgetInfo widget-body">
                <div className="infoWidgetWrap">
                  <div className="header">
                    <h3 className="sectionTitle">{dualRight && dualRight.title}</h3>
                    <p className="description" dangerouslySetInnerHTML={{ __html: richText(dualRight && dualRight.description) }} />
                  </div>
                  <div className="body">
                    <div className="carousel-media">
                      <div className="mediaTrackWrap" ref={mWrapRef} style={{ overflow: 'hidden' }}>
                        <div
                          className="mediaTrack"
                          style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            width: 'max-content',
                            transform: `translateX(-${mi * mItemW}px)`,
                            transition: mAnim ? 'transform 0.5s ease' : 'none',
                          }}
                        >
                          {[...media, ...media].map((m, i) => (
                            <div
                              key={i}
                              style={{ width: mItemW, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 90 }}
                            >
                              <img
                                alt="rti rewards"
                                className="slide-media-item"
                                src={imgUrl(m.image && m.image.path)}
                                style={{ maxHeight: 87, maxWidth: '80%', objectFit: 'contain' }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer">
                    {f && (
                      <div className="meta footerSlide" key={fi} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {f.image && <img alt="" src={imgUrl(f.image.path)} style={{ marginRight: 27, maxHeight: 60, width: 'auto' }} />}
                        <h4 style={{ margin: 0, flex: 1, fontSize: 14, lineHeight: '22px', color: '#464646', fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: richText(f.image_description) }} />
                        <div className="carousel-arrow" onClick={() => setFi((fi + 1) % footer.length)} role="button" tabIndex="0" style={{ flex: 'none', cursor: 'pointer', opacity: 0.4 }}>
                          <Chevron dir="right" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsWidget() {
  if (!newsArticles.length) return null;
  const [first, ...rest] = newsArticles;
  return (
    <div className="widgetNews">
      <div className="container">
        <div className="header">
          <div className="row flex-content">
            <div className="col-lg-6">
              <h3>{newsW.title}</h3>
            </div>
            <div className="col-lg-5">
              <div className="info">
                <p>{newsW.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="news-block">
          <div className="over-bg">
            <div className="newsWrap">
              <div className="container p-0">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="big-post">
                      <Link to={'/noutati/' + first.slug}>
                        <div className="background" style={{ backgroundImage: first.image ? `url("${imgUrl(first.image)}")` : undefined }}>
                          <div className="overlay">
                            <div className="header">
                              <div className="date">
                                <span>{fmtDate(first.createdAt)}</span>
                              </div>
                              <div className="share">
                                <div className="share-block">
                                  <div className="share-icon">
                                    <ShareIcon />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="title" tabIndex="0">
                              <h4> {first.title} </h4>
                            </div>
                            <ArrowBtn />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="row">
                      {rest.slice(0, 4).map((a) => (
                        <div className="col-lg-6" key={a.slug}>
                          <div className="small-post">
                            <Link to={'/noutati/' + a.slug}>
                              <div className="body">
                                <div className="content">
                                  <div className="left">
                                    <div className="date">
                                      <span style={{ textTransform: 'capitalize' }}>{fmtDate(a.createdAt)}</span>
                                      <div className="share">
                                        <div className="share-block">
                                          <div className="share-icon">
                                            <ShareIcon color="#ACACAC" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="title" tabIndex="0">
                                      <h4>{a.title}</h4>
                                    </div>
                                  </div>
                                </div>
                                <div className="footer" tabIndex="0">
                                  <div className="background" style={{ backgroundImage: a.image ? `url("${imgUrl(a.image)}")` : undefined }}></div>
                                  <ArrowBtn />
                                </div>
                              </div>
                            </Link>
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
  );
}

function SeoText() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="container">
      <div className="seo-text">
        <div className={'seo-content' + (expanded ? '' : ' collapsed')} style={expanded ? undefined : { maxHeight: 300, overflow: 'hidden', position: 'relative' }}>
          {!expanded && (
            <div className="bg-gradient" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(transparent, #fff)' }}></div>
          )}
          <div dangerouslySetInnerHTML={{ __html: richText(seo.description) }} />
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

export default function HomePage() {
  return (
    <div className="site__body">
      <div className="block builder-page">
        <BusinessBranch />
        <Entrust />
        <Partners />
        <DualWidget />
        <NewsWidget />
        <SeoText />
      </div>
    </div>
  );
}
