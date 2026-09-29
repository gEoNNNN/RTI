import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { imgUrl } from '../data/helpers';
import { richText } from './HomePage';
import page from '../data/despre_page.json';

const header = page[0].payload || {};
const breadcrumbs = (page[1].payload || {}).breadcrumbs || [];
const nested = page[2].nested || [];
const clientsDual = page[4];
const logos = page[5].payload || {};

// nested widgets inside .background.grey-right (widget-3)
const nTitleDual = nested[1]; // dual: title + short description
const nLongDesc = nested[3].payload || {}; // company description + links
const nAwards = nested[5].payload || {}; // certificates grid
const nVideoDual = nested[7]; // dual: video + user quote
const nRed = nested[9].payload || {}; // red features "Succesul nostru e in cifre"

const ytId = (url) => {
  const m = /[?&]v=([^&]+)/.exec(url || '') || /youtu\.be\/([^?&]+)/.exec(url || '');
  return m ? m[1] : '';
};

function localize(html) {
  return richText(html).replace(/https:\/\/rti\.md/g, '');
}

function EmptySpace() {
  // live renders empty-space widgets with height 0 (heights come from widget CSS, not inline)
  return <div className="empty-space widget-body"></div>;
}

function ChevronRight() {
  return (
    <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 320 512" width="8" height="12" style={{ margin: '0 10px', color: '#b3b3b3' }}>
      <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
    </svg>
  );
}

function DualWidget({ left, right, grey }) {
  return (
    <div className="dual-widgets">
      {grey && <div className="widget-bg grey-right"></div>}
      <div className="container">
        <div className="dualWidgetWrap">
          <div className="left">
            <div className="dualWidgetBody" style={{ padding: left.padding && left.padding.desktop || undefined }}>
              <DualContent widget={left.widget} />
            </div>
          </div>
          <div className="right">
            <div className="dualWidgetBody" style={{ padding: right.padding && right.padding.desktop || undefined }}>
              <DualContent widget={right.widget} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DualContent({ widget }) {
  if (!widget) return null;
  const p = widget.payload || {};
  if (widget.type === 'title-widget') {
    return (
      <div className="title-parent">
        <div className="title container" style={{ maxWidth: p.maxWidth ? `${p.maxWidth}px` : undefined }}
          dangerouslySetInnerHTML={{ __html: richText(p.title) }} />
      </div>
    );
  }
  if (widget.type === 'description-widget') {
    return <div className="sectionDescription" style={{ lineHeight: '30px' }} dangerouslySetInnerHTML={{ __html: localize(p.description) }} />;
  }
  if (widget.type === 'video-widget') return <VideoWidget data={p} />;
  if (widget.type === 'widget-user-quote') return <UserQuote data={p} />;
  return null;
}

function VideoWidget({ data }) {
  const [playing, setPlaying] = useState(false);
  const id = ytId(data.video && data.video.url);
  return (
    <div className="widget-video">
      <div className="container p-0">
        <div className="body">
          {playing && id ? (
            <div className="videoPlayer videoBox">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="video-placeholder" onClick={() => setPlaying(true)} style={{ cursor: 'pointer' }}>
              <img alt="" src={imgUrl(data.video && data.video.image && data.video.image.path)} />
              <div aria-label="Play" className="wrapper">
                <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                  <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fillOpacity="0.8" className="ytp-large-play-button-bg"></path>
                  <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                </svg>
              </div>
            </div>
          )}
          <div className="bullet-mask"></div>
        </div>
      </div>
    </div>
  );
}

function UserQuote({ data }) {
  const a = data.author || {};
  return (
    <div className="widget-user-quote">
      <div className="body">
        <div className="quote"><p> {data.quote} </p></div>
        <div className="author">
          <hr />
          <div className="info-block">
            <div className="image-block">
              <div
                className="image"
                style={a.image ? { backgroundImage: `url("${imgUrl(a.image.path)}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
              ></div>
            </div>
            <div className="meta">
              <h4 className="name"><a target="_blank" rel="noreferrer" href={a.social && a.social.link}> {a.name} </a></h4>
              <h4 className="bio"> {a.bio} </h4>
              <h4 className="social"><a target="_blank" rel="noreferrer" href={a.social && a.social.link}> {a.social && a.social.text} </a></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImgLink({ url, children }) {
  if (url && url.startsWith('/')) return <Link to={url}>{children}</Link>;
  if (url) return <a href={url}>{children}</a>;
  return <a>{children}</a>;
}

export default function AboutPage() {
  return (
    <div className="site__body about-page">
      {/* widget-1: page header */}
      <div
        className="page-header widget bg-image"
        style={{ backgroundImage: header.bgImage ? `url("${imgUrl(header.bgImage.path)}")` : undefined }}
      >
        <div className="overlay" style={{ background: header.overlay || undefined }}></div>
        <div className="page-header__container container">
          <div className="page-header__title">
            <h1>{header.title}</h1>
          </div>
        </div>
      </div>

      {/* widget-2: breadcrumbs */}
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

      {/* widget-3: grey-right background with nested widgets */}
      <div className="background grey-right">
        <EmptySpace />

        <DualWidget left={nTitleDual.left} right={nTitleDual.right} grey />

        <EmptySpace />

        <div className="container">
          <div className="sectionDescription" style={{ lineHeight: '30px' }} dangerouslySetInnerHTML={{ __html: localize(nLongDesc.description) }} />
        </div>

        <EmptySpace />

        {/* awards / certificates grid */}
        <div className="widgetImages">
          <div className="container">
            <div className="body">
              <div className="images">
                <div className="flex">
                  {(nAwards.images || []).slice(0, 16).map((im, i) => (
                    <div className="image" key={i}>
                      <ImgLink url={im.imageUrl}>
                        <img alt="" src={imgUrl(im.image && im.image.path)} />
                      </ImgLink>
                      <div className="bg-image-box"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <EmptySpace />

        <DualWidget left={nVideoDual.left} right={nVideoDual.right} grey />

        <EmptySpace />

        {/* red features: Succesul nostru e in cifre */}
        <div className="widget-red-features">
          <div className="container">
            <div className="over-bg">
              <div className="header">
                <h3>{nRed.title}</h3>
              </div>
              <div className="body">
                <div className="row">
                  {(nRed.information || []).map((info, i) => (
                    <div className="col-md-6 col-lg-4 item-info" key={i}>
                      <div className="info-block">
                        <div className="body">
                          <div className="number"> {info.number} </div>
                          <div className="image"></div>
                          <div className="title"> {info.title} </div>
                          <div className="description"> {info.description} </div>
                        </div>
                        <div className="icon-box">
                          <div className="icon">
                            {info.icon && <img alt="" src={imgUrl(info.icon.path)} width="136" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="background" style={{ background: nRed.backgroundColor }}></div>
            <div className="bullet-mask"></div>
          </div>
        </div>
      </div>

      {/* widget-4: empty space */}
      <EmptySpace />

      {/* widget-5: clients title + description dual */}
      <DualWidget left={clientsDual.left} right={clientsDual.right} />

      {/* widget-6: client logos grid */}
      <div className="widgetImages">
        <div className="container">
          <div className="body">
            <div className="images">
              <div className="row flex">
                {(logos.images || []).slice(0, 16).map((im, i) => (
                  <div className="custom-column" style={{ alignSelf: 'center' }} key={i}>
                    <ImgLink url={im.imageUrl}>
                      <img alt="" style={{ maxHeight: '100px', maxWidth: '100px' }} src={imgUrl(im.image && im.image.path)} />
                    </ImgLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* widget-7: empty space */}
      <EmptySpace />
    </div>
  );
}
