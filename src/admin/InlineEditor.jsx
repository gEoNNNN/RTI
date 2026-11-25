import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { api, getToken, readFileAsDataUrl } from './api'
import { useEditMode } from './editMode'
import {
  applyOverrides,
  backgroundUrl,
  describeTarget,
  loadOverrides,
  selectorFor,
} from './overrides'
import './admin.css'

function readFields(info) {
  return {
    text: info.textEl ? info.textEl.innerHTML.trim() : '',
    src: info.imgEl ? info.imgEl.getAttribute('src') || '' : '',
    bg: info.bgEl ? backgroundUrl(info.bgEl) : '',
    href: info.linkEl ? info.linkEl.getAttribute('href') || '' : '',
  }
}

function ImageField({ label, value, onChange, onError }) {
  const [uploading, setUploading] = useState(false)

  const pick = async (event) => {
    const file = event.target.files && event.target.files[0]
    event.target.value = ''
    if (!file) return
    setUploading(true)
    try {
      const dataUrl = await readFileAsDataUrl(file)
      const uploaded = await api.upload(file.name, dataUrl)
      onChange(uploaded.url)
    } catch (err) {
      onError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="adm-field">
      <span>{label}</span>
      <div className="adm-image-field">
        {value ? <img src={value} alt="" /> : <div className="adm-image-empty">No image</div>}
        <div className="adm-image-controls">
          <label className="adm-btn adm-btn-small">
            {uploading ? 'Uploading…' : 'Upload'}
            <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" onChange={pick} hidden />
          </label>
          <input
            className="adm-input"
            value={value}
            placeholder="/images/photo.jpg or https://…"
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default function InlineEditor() {
  const editing = useEditMode()
  const { pathname } = useLocation()
  const [sel, setSel] = useState(null)
  const [fields, setFields] = useState({ text: '', src: '', bg: '', href: '' })
  const [initial, setInitial] = useState({ text: '', src: '', bg: '', href: '' })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const active = editing && !!getToken() && !pathname.startsWith('/admin')

  useEffect(() => {
    setSel(null)
  }, [pathname])

  useEffect(() => {
    if (!active) return undefined

    let lastHoverTarget = null
    let hovered = null
    const clearHover = () => {
      if (hovered) hovered.removeAttribute('data-admin-hover')
      hovered = null
    }

    const onOver = (event) => {
      const target = event.target
      if (!target || !target.closest) return
      if (target.closest('[data-admin-ui]')) {
        clearHover()
        return
      }
      if (target === lastHoverTarget) return
      lastHoverTarget = target
      const info = describeTarget(target)
      const anchor = info ? info.anchor : null
      if (anchor !== hovered) {
        clearHover()
        hovered = anchor
        if (hovered) hovered.setAttribute('data-admin-hover', '')
      }
    }

    const onClick = (event) => {
      if (!event.target || !event.target.closest) return
      if (event.target.closest('[data-admin-ui]')) return
      event.preventDefault()
      event.stopPropagation()
      const info = describeTarget(event.target)
      if (!info) return
      const next = readFields(info)
      setSel(info)
      setFields(next)
      setInitial(next)
      setMessage('')
    }

    const onSubmit = (event) => {
      if (event.target.closest && event.target.closest('[data-admin-ui]')) return
      event.preventDefault()
      event.stopPropagation()
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('click', onClick, true)
    document.addEventListener('submit', onSubmit, true)
    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('submit', onSubmit, true)
      clearHover()
    }
  }, [active])

  useEffect(() => {
    if (!sel) return undefined
    sel.anchor.setAttribute('data-admin-selected', '')
    const onKey = (event) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      sel.anchor.removeAttribute('data-admin-selected')
      document.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel])

  if (!active) return null

  function close() {
    setSel(null)
    setMessage('')
  }

  async function save() {
    if (!sel) return
    const jobs = []
    if (sel.textEl && fields.text !== initial.text) {
      jobs.push({ selector: selectorFor(sel.textEl), kind: 'html', value: fields.text })
    }
    if (sel.imgEl && fields.src !== initial.src) {
      jobs.push({ selector: selectorFor(sel.imgEl), kind: 'src', value: fields.src })
    }
    if (sel.bgEl && fields.bg !== initial.bg) {
      jobs.push({ selector: selectorFor(sel.bgEl), kind: 'bg', value: fields.bg })
    }
    if (sel.linkEl && fields.href !== initial.href) {
      jobs.push({ selector: selectorFor(sel.linkEl), kind: 'href', value: fields.href })
    }
    if (!jobs.length) {
      close()
      return
    }

    setBusy(true)
    setMessage('')
    try {
      await Promise.all(jobs.map((job) => api.saveOverride({ route: pathname, ...job })))
      if (jobs.some((job) => !job.value)) {
        window.location.reload()
        return
      }
      const list = await loadOverrides(true)
      applyOverrides(pathname, list)
      setInitial(fields)
      setMessage('Saved to public/content-overrides.json')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function reset() {
    if (!sel) return
    const jobs = []
    if (sel.textEl) jobs.push({ selector: selectorFor(sel.textEl), kind: 'html' })
    if (sel.imgEl) jobs.push({ selector: selectorFor(sel.imgEl), kind: 'src' })
    if (sel.bgEl) jobs.push({ selector: selectorFor(sel.bgEl), kind: 'bg' })
    if (sel.linkEl) jobs.push({ selector: selectorFor(sel.linkEl), kind: 'href' })
    setBusy(true)
    try {
      await Promise.all(jobs.map((job) => api.deleteOverride({ route: pathname, ...job })))
      window.location.reload()
    } catch (err) {
      setMessage(err.message)
      setBusy(false)
    }
  }

  if (!sel) return null

  return createPortal(
    <div className="adm-panel" data-admin-ui>
      <div className="adm-panel-head">
        <div>
          <span className="adm-eyebrow">Editing element</span>
          <strong>{sel.label}</strong>
          <span className="adm-route">{pathname}</span>
        </div>
        <button type="button" className="adm-close" onClick={close} aria-label="Close">
          ×
        </button>
      </div>

      <div className="adm-panel-body">
        {sel.textEl ? (
          <label className="adm-field">
            <span>Text (HTML allowed)</span>
            <textarea
              className="adm-input"
              rows={4}
              value={fields.text}
              onChange={(event) => setFields({ ...fields, text: event.target.value })}
            />
          </label>
        ) : null}

        {sel.imgEl ? (
          <ImageField
            label="Image"
            value={fields.src}
            onChange={(value) => setFields({ ...fields, src: value })}
            onError={setMessage}
          />
        ) : null}

        {sel.bgEl ? (
          <ImageField
            label="Background image"
            value={fields.bg}
            onChange={(value) => setFields({ ...fields, bg: value })}
            onError={setMessage}
          />
        ) : null}

        {sel.linkEl ? (
          <label className="adm-field">
            <span>Link / button URL</span>
            <input
              className="adm-input"
              value={fields.href}
              placeholder="/contacte"
              onChange={(event) => setFields({ ...fields, href: event.target.value })}
            />
          </label>
        ) : null}

        {message ? <div className="adm-note">{message}</div> : null}
      </div>

      <div className="adm-panel-actions">
        <button type="button" className="adm-btn adm-btn-ghost" onClick={reset} disabled={busy}>
          Reset
        </button>
        <span className="adm-spacer" />
        <button type="button" className="adm-btn" onClick={close} disabled={busy}>
          Cancel
        </button>
        <button type="button" className="adm-btn adm-btn-primary" onClick={save} disabled={busy}>
          {busy ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>,
    document.body
  )
}
