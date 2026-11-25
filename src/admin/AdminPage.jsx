import React, { useEffect, useMemo, useState } from 'react'
import { api, getToken, readFileAsDataUrl, setToken } from './api'
import { setEditMode } from './editMode'
import { invalidateOverrides } from './overrides'
import { imgUrl } from '../data/helpers'
import './admin.css'

const LANGUAGES = [
  ['ro', 'Română'],
  ['ru', 'Русский'],
  ['en', 'English'],
]

const EMPTY_PRODUCT = {
  title: '',
  slug: '',
  description: '',
  images: [],
  category: '',
  quantity: 0,
  askQuote: false,
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function Login({ onDone }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const { token } = await api.login(username, password)
      setToken(token)
      onDone()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="adm-login-wrap">
      <form className="adm-login" onSubmit={submit}>
        <div className="adm-brand">
          <span className="adm-brand-mark">RTI</span>
          <span>Admin panel</span>
        </div>
        <h1>Sign in</h1>
        <p className="adm-muted">Local admin — credentials live in .admin.json at the project root.</p>

        <label className="adm-field">
          <span>Username</span>
          <input
            className="adm-input"
            value={username}
            autoComplete="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="adm-field">
          <span>Password</span>
          <input
            className="adm-input"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          />
        </label>

        {error ? <div className="adm-error">{error}</div> : null}

        <button type="submit" className="adm-btn adm-btn-primary adm-btn-block" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

function ImageList({ images, onChange, onError }) {
  const [url, setUrl] = useState('')
  const [busy, setBusy] = useState(false)

  const upload = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    if (!files.length) return
    setBusy(true)
    try {
      const uploaded = []
      for (const file of files) {
        const dataUrl = await readFileAsDataUrl(file)
        const res = await api.upload(file.name, dataUrl)
        uploaded.push(res.path)
      }
      onChange([...images, ...uploaded])
    } catch (err) {
      onError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const addUrl = () => {
    const value = url.trim()
    if (!value) return
    onChange([...images, value])
    setUrl('')
  }

  return (
    <div className="adm-field">
      <span>Images</span>
      <div className="adm-thumbs">
        {images.map((image, index) => (
          <div className="adm-thumb" key={image + index}>
            <img src={imgUrl(image)} alt="" />
            <button
              type="button"
              className="adm-thumb-remove"
              title="Remove image"
              onClick={() => onChange(images.filter((_, i) => i !== index))}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="adm-row">
        <label className="adm-btn adm-btn-small">
          {busy ? 'Uploading…' : 'Upload images'}
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            onChange={upload}
            hidden
          />
        </label>
        <input
          className="adm-input"
          value={url}
          placeholder="…or paste an image path / URL"
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              addUrl()
            }
          }}
        />
        <button type="button" className="adm-btn adm-btn-small" onClick={addUrl}>
          Add
        </button>
      </div>
    </div>
  )
}

function ProductsTab({ message }) {
  const [lang, setLang] = useState('ro')
  const [products, setProducts] = useState({})
  const [categories, setCategories] = useState({})
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [draft, setDraft] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setBusy(true)
    setError('')
    api
      .products(lang)
      .then((data) => {
        if (!alive) return
        setProducts(data.products || {})
        setCategories(data.categories || {})
        setSelected(null)
        setDraft(null)
      })
      .catch((err) => alive && setError(err.message))
      .finally(() => alive && setBusy(false))
    return () => {
      alive = false
    }
  }, [lang])

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return Object.entries(products)
      .map(([slug, product]) => ({
        slug,
        title: typeof product.title === 'string' && product.title ? product.title : slug,
      }))
      .filter(
        (item) =>
          !needle ||
          item.title.toLowerCase().includes(needle) ||
          item.slug.toLowerCase().includes(needle)
      )
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [products, query])

  const categoryOptions = useMemo(
    () =>
      Object.values(categories)
        .filter((category) => category && category.id)
        .sort((a, b) =>
          String(typeof a.title === 'string' ? a.title : a.slug || a.id).localeCompare(
            String(typeof b.title === 'string' ? b.title : b.slug || b.id)
          )
        ),
    [categories]
  )

  const open = (slug) => {
    const product = products[slug]
    setSelected(slug)
    setDraft({
      title: typeof product.title === 'string' ? product.title : '',
      slug: product.slug || slug,
      description: product.description || '',
      images: [...(product.images || [])],
      category: product.category || '',
      quantity:
        product.variants && product.variants[0] && product.variants[0].quantity != null
          ? product.variants[0].quantity
          : 0,
      askQuote: Boolean(product.variants && product.variants[0] && product.variants[0].askQuote),
    })
    setError('')
  }

  const startNew = () => {
    setSelected(null)
    setDraft({ ...EMPTY_PRODUCT, images: [] })
    setError('')
  }

  const refresh = async () => {
    const data = await api.products(lang)
    setProducts(data.products || {})
    setCategories(data.categories || {})
  }

  const save = async () => {
    if (!draft) return
    setBusy(true)
    setError('')
    try {
      const slug = draft.slug.trim() || slugify(draft.title)
      const payload = { ...draft, slug }
      const res = await api.saveProduct(lang, selected, payload)
      await refresh()
      setSelected(res.slug)
      setDraft({ ...payload, slug: res.slug })
      message('Product saved to src/data/' + (lang === 'ro' ? '' : lang + '/') + 'products.json')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    if (!selected) return
    if (!window.confirm('Delete this product? This removes it from the local products.json file.')) return
    setBusy(true)
    setError('')
    try {
      await api.deleteProduct(lang, selected)
      await refresh()
      setSelected(null)
      setDraft(null)
      message('Product deleted')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="adm-products">
      <aside className="adm-products-list">
        <div className="adm-langs">
          {LANGUAGES.map(([code, label]) => (
            <button
              key={code}
              type="button"
              className={'adm-lang' + (lang === code ? ' is-active' : '')}
              onClick={() => setLang(code)}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          className="adm-input adm-search"
          placeholder="Search products…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="button" className="adm-btn adm-btn-primary adm-btn-block" onClick={startNew}>
          + New product
        </button>
        <div className="adm-list">
          {list.map((item) => (
            <button
              type="button"
              key={item.slug}
              className={'adm-list-item' + (selected === item.slug ? ' is-active' : '')}
              onClick={() => open(item.slug)}
            >
              <span className="adm-list-title">{item.title}</span>
              <span className="adm-list-slug">{item.slug}</span>
            </button>
          ))}
          {!list.length && !busy ? <p className="adm-muted adm-pad">No products found.</p> : null}
        </div>
      </aside>

      <section className="adm-editor">
        {!draft ? (
          <div className="adm-empty">
            <h2>Products</h2>
            <p className="adm-muted">
              Pick a product to edit, or create a new one. Everything is written to the JSON files in{' '}
              <code>src/data</code>.
            </p>
          </div>
        ) : (
          <>
            <div className="adm-editor-head">
              <div>
                <span className="adm-eyebrow">{selected ? 'Editing product' : 'New product'}</span>
                <h2>{draft.title || 'Untitled product'}</h2>
              </div>
              <div className="adm-row">
                {selected ? (
                  <button type="button" className="adm-btn adm-btn-danger" onClick={remove} disabled={busy}>
                    Delete
                  </button>
                ) : null}
                <button type="button" className="adm-btn adm-btn-primary" onClick={save} disabled={busy}>
                  {busy ? 'Saving…' : 'Save product'}
                </button>
              </div>
            </div>

            {error ? <div className="adm-error">{error}</div> : null}

            <div className="adm-grid">
              <label className="adm-field">
                <span>Title</span>
                <input
                  className="adm-input"
                  value={draft.title}
                  onChange={(event) => {
                    const title = event.target.value
                    setDraft({
                      ...draft,
                      title,
                      slug: selected || draft.slug ? draft.slug : slugify(title),
                    })
                  }}
                />
              </label>

              <label className="adm-field">
                <span>Slug (URL)</span>
                <input
                  className="adm-input"
                  value={draft.slug}
                  onChange={(event) => setDraft({ ...draft, slug: event.target.value })}
                  placeholder="my-product"
                />
              </label>

              <label className="adm-field">
                <span>Category</span>
                <select
                  className="adm-input"
                  value={draft.category}
                  onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                >
                  <option value="">— no category —</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {typeof category.title === 'string' && category.title
                        ? category.title
                        : category.slug || category.id}
                    </option>
                  ))}
                </select>
              </label>

              <label className="adm-field">
                <span>Stock quantity</span>
                <input
                  className="adm-input"
                  type="number"
                  min="0"
                  value={draft.quantity}
                  onChange={(event) => setDraft({ ...draft, quantity: event.target.value })}
                />
              </label>
            </div>

            <label className="adm-checkbox">
              <input
                type="checkbox"
                checked={draft.askQuote}
                onChange={(event) => setDraft({ ...draft, askQuote: event.target.checked })}
              />
              Show “ask for quote” instead of a price
            </label>

            <ImageList
              images={draft.images}
              onChange={(images) => setDraft({ ...draft, images })}
              onError={setError}
            />

            <label className="adm-field">
              <span>Description (HTML allowed)</span>
              <textarea
                className="adm-input adm-description"
                rows={14}
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
              />
            </label>

            <p className="adm-muted">
              Saved products update the running site automatically in dev; reload the site tab to see them.
            </p>
          </>
        )}
      </section>
    </div>
  )
}

function PageEditsTab({ message }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = () => {
    setBusy(true)
    api
      .overrides()
      .then((data) => setItems(data.overrides || []))
      .catch((err) => setError(err.message))
      .finally(() => setBusy(false))
  }

  useEffect(load, [])

  const remove = async (item) => {
    setBusy(true)
    try {
      const data = await api.deleteOverride({ route: item.route, selector: item.selector, kind: item.kind })
      setItems(data.overrides || [])
      invalidateOverrides()
      message('Page edit removed — reload the site to see the original content')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="adm-edits">
      <div className="adm-editor-head">
        <div>
          <span className="adm-eyebrow">Inline edits</span>
          <h2>Page changes</h2>
        </div>
        <button type="button" className="adm-btn" onClick={load} disabled={busy}>
          Refresh
        </button>
      </div>

      <p className="adm-muted">
        These are the text, image and link changes made with “Edit site”. Stored in{' '}
        <code>public/content-overrides.json</code>.
      </p>

      {error ? <div className="adm-error">{error}</div> : null}

      {!items.length && !busy ? (
        <div className="adm-empty adm-empty-small">
          <p className="adm-muted">No page changes yet. Open the site and click “Edit site”.</p>
        </div>
      ) : null}

      <div className="adm-edits-list">
        {items.map((item) => (
          <div className="adm-edit-row" key={item.route + item.selector + item.kind}>
            <div>
              <div className="adm-edit-route">{item.route}</div>
              <div className="adm-edit-kind">
                {item.kind} · <code>{item.selector}</code>
              </div>
              <div className="adm-edit-value">
                {item.kind === 'html' ? item.value.replace(/<[^>]+>/g, ' ').slice(0, 160) : item.value}
              </div>
            </div>
            <button
              type="button"
              className="adm-btn adm-btn-danger adm-btn-small"
              onClick={() => remove(item)}
              disabled={busy}
            >
              Reset
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(!!getToken())
  const [tab, setTab] = useState('products')
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 3500)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const sync = () => setAuthed(!!getToken())
    window.addEventListener('rti-admin-auth', sync)
    return () => window.removeEventListener('rti-admin-auth', sync)
  }, [])

  const signOut = () => {
    api.logout()
    setToken(null)
    setEditMode(false)
    setAuthed(false)
  }

  if (!authed) return <Login onDone={() => setAuthed(true)} />

  return (
    <div className="adm-page">
      <header className="adm-topbar">
        <div className="adm-brand">
          <span className="adm-brand-mark">RTI</span>
          <span>Admin panel</span>
        </div>

        <nav className="adm-tabs">
          <button
            type="button"
            className={'adm-tab' + (tab === 'products' ? ' is-active' : '')}
            onClick={() => setTab('products')}
          >
            Products
          </button>
          <button
            type="button"
            className={'adm-tab' + (tab === 'edits' ? ' is-active' : '')}
            onClick={() => setTab('edits')}
          >
            Page changes
          </button>
        </nav>

        <div className="adm-row">
          <a className="adm-btn adm-btn-ghost" href="/" target="_blank" rel="noreferrer">
            View site
          </a>
          <button
            type="button"
            className="adm-btn adm-btn-primary"
            onClick={() => {
              setEditMode(true)
              window.location.href = '/'
            }}
          >
            Edit site
          </button>
          <button type="button" className="adm-btn adm-btn-ghost" onClick={signOut}>
            Sign out
          </button>
        </div>
      </header>

      <main className="adm-main">
        {tab === 'products' ? <ProductsTab message={setToast} /> : <PageEditsTab message={setToast} />}
      </main>

      {toast ? <div className="adm-toast">{toast}</div> : null}
    </div>
  )
}
