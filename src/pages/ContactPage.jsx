import React, { useRef, useState } from 'react';
import page from '../data/contacte_page.json';

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const REASONS = [
  { name: 'Suport Tehnic', value: 'TECHNICAL' },
  { name: 'Suport Software', value: 'SOFTWARE' },
];
const API_URL = 'https://api.ecommerce.rti.md/api/utils/contact-email';
const EMPTY_FORM = { name: '', email: '', phone: '', company: '', message: '', reason: null };

const MapMarker = () => (
  <svg className="ng-fa-icon" width="12" height="16" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
  </svg>
);

function ContactMeta({ payload }) {
  return (
    <div className="widgetContactMeta">
      <div className="header">
        <h2 className="title">{payload.title}</h2>
        <div className="description">
          <span>{payload.description}</span>
        </div>
      </div>
      <div className="body">
        <div className="items">
          {(payload.information || []).map((item, i) => (
            <div className="item" key={i}>
              <h3 className="title">{item.title}</h3>
              <h5 className="description">
                {item.description && item.description.link ? (
                  <a href={item.description.link}>{item.description.text}</a>
                ) : (
                  item.description && item.description.text
                )}
              </h5>
            </div>
          ))}
        </div>
      </div>
      {payload.button && (
        <div className="footer">
          <a target="_blank" rel="noreferrer" href={payload.button.link}>
            <div className="black-btn">
              <MapMarker />
              <span> {payload.button.text}</span>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}

function ReasonSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = REASONS.find((r) => r.value === value);
  return (
    <div
      ref={ref}
      className={`ng-select ng-select-single reason-select form-item${open ? ' ng-select-opened ng-select-bottom' : ''}${selected ? ' ng-has-value' : ''}`}
      tabIndex="0"
      onBlur={(e) => { if (!ref.current || !ref.current.contains(e.relatedTarget)) setOpen(false); }}
    >
      <div className="ng-select-container" onClick={() => setOpen((o) => !o)}>
        <div className="ng-value-container">
          {!selected && <div className="ng-placeholder">Motiv pentru a lua legatura</div>}
          {selected && (
            <div className="ng-value">
              <span className="ng-value-label">{selected.name}</span>
            </div>
          )}
        </div>
        <span className="ng-arrow-wrapper">
          <span className="ng-arrow"></span>
        </span>
      </div>
      {open && (
        <div className="ng-dropdown-panel ng-select-bottom">
          <div className="ng-dropdown-panel-items">
            {REASONS.map((r) => (
              <div
                key={r.value}
                className={`ng-option${value === r.value ? ' ng-option-selected' : ''}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(r.value);
                  setOpen(false);
                }}
              >
                <span className="ng-option-label">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [selling, setSelling] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [toast, setToast] = useState(null);
  const [sending, setSending] = useState(false);
  const toastTimer = useRef(null);

  const set = (k) => (e) => {
    const v = e && e.target ? e.target.value : e;
    setForm((f) => ({ ...f, [k]: v }));
  };
  const touch = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const errors = {
    name: !form.name ? 'required' : form.name.length < 3 || form.name.length > 20 ? 'minmax' : null,
    email: !form.email ? 'required' : !EMAIL_RE.test(form.email) ? 'invalid' : null,
    phone: selling && (!form.phone || form.phone.length < 3 || form.phone.length > 20) ? 'required' : null,
    company: selling && (!form.company || form.company.length < 3 || form.company.length > 20) ? 'required' : null,
    message: !form.message ? 'required' : form.message.length < 10 || form.message.length > 500 ? 'minmax' : null,
  };
  const invalid = Object.values(errors).some(Boolean);
  const showErr = (k) => touched[k] && errors[k];

  const switchTab = (left) => {
    setSelling(left);
    setForm(EMPTY_FORM);
    setTouched({});
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 5000);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (invalid || sending) return;
    setSending(true);
    const payload = { ...form, type: selling ? 'SELLING' : 'SUPPORT' };
    if (!selling) {
      delete payload.phone;
      delete payload.company;
    } else {
      delete payload.reason;
    }
    if (!payload.reason) delete payload.reason;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(res.status);
      showToast('success', 'Mesajul a fost livrat cu success');
      setForm(EMPTY_FORM);
      setTouched({});
    } catch {
      showToast('error', 'Mesajul nu a fost livrat.');
    } finally {
      setSending(false);
    }
  };

  const widget = page.widgets.find((w) => (w.payload.layout === 'SELLING') === selling);

  return (
    <div className="site__body contact-page">
      <div className="page-header contact bg-image" style={{ backgroundImage: 'url()' }}>
        <div className="overlay" style={{ background: 'transparent' }}></div>
        <div id="links" className="page-header__container container">
          <div className="page-header__title">
            <h1>Contacte</h1>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="container">
          <div className="header">
            <div className="header-body">
              <div className="items">
                <div className={`item first${selling ? ' active' : ''}`} onClick={() => switchTab(true)}>
                  <div className="title"><h4>Cereri de vanzare</h4></div>
                </div>
                <div className={`item second${!selling ? ' active' : ''}`} onClick={() => switchTab(false)}>
                  <div className="title"><h4>Ai nevoie de suport?</h4></div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-us-container">
            <div className="bullet-mask"></div>
            <div className="row">
              <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                {widget && <ContactMeta payload={widget.payload} />}
                <div></div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="rti-form">
                  <h4 className="form-title">Completati campurile</h4>
                  <form id="contacts-form" noValidate onSubmit={onSubmit}>
                    <div className="form-item">
                      {showErr('name') && (
                        <div className="errors">
                          {errors.name === 'required' && <span className="error">Cimpul nu poate fi gol</span>}
                          {errors.name === 'minmax' && <span className="error">Campul trebuie sa contina minim 3 caracter(e) si maxim 20 caracter(e)</span>}
                        </div>
                      )}
                      <input type="text" id="form-name" name="name" className="form-control" placeholder="Numele"
                        value={form.name} onChange={set('name')} onBlur={touch('name')} />
                    </div>
                    <div className="form-item">
                      {showErr('email') && (
                        <div className="errors">
                          {errors.email === 'required' && <span className="error">Cimpul nu poate fi gol</span>}
                          {errors.email === 'invalid' && <span className="error">Emailul este invalid</span>}
                        </div>
                      )}
                      <input type="email" id="form-email" name="email" className="form-control" placeholder="Email"
                        value={form.email} onChange={set('email')} onBlur={touch('email')} />
                    </div>
                    {selling && (
                      <>
                        <div className="form-item">
                          <input type="text" id="form-phone" name="phone" className="form-control" placeholder="Telefon"
                            value={form.phone} onChange={set('phone')} onBlur={touch('phone')} />
                        </div>
                        <div className="form-item">
                          <input type="text" id="form-company" name="company" className="form-control" placeholder="Denumirea Companiei"
                            value={form.company} onChange={set('company')} onBlur={touch('company')} />
                        </div>
                      </>
                    )}
                    {!selling && (
                      <ReasonSelect value={form.reason} onChange={(v) => setForm((f) => ({ ...f, reason: v }))} />
                    )}
                    <div className="form-item">
                      {showErr('message') && (
                        <div className="errors">
                          {errors.message === 'required' && <span className="error">Cimpul nu poate fi gol</span>}
                          {errors.message === 'minmax' && <span className="error">Campul trebuie sa contina minim 10 caracter(e) si maxim 500 caracter(e)</span>}
                        </div>
                      )}
                      <textarea id="form-message" rows="4" name="message" className="form-control textarea-class" placeholder="Mesaj"
                        value={form.message} onChange={set('message')} onBlur={touch('message')}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary submitForm" disabled={invalid || sending}>
                      {' '}Trimiteti{' '}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast-container toast-top-right">
          <div className={`ngx-toastr toast-${toast.type}`} onClick={() => setToast(null)}>
            <div className="toast-message">{toast.msg}</div>
          </div>
        </div>
      )}
    </div>
  );
}
