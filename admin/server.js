// Local admin API. Runs inside the Vite dev/preview server and writes
// straight to the project files — there is no database.
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const API = '/api/admin'
const CREDENTIALS = '.admin.json'
const OVERRIDES = 'public/content-overrides.json'
const LANGS = { ro: '', ru: 'ru/', en: 'en/' }
const SESSION_MS = 12 * 60 * 60 * 1000
const MAX_UPLOAD = 10 * 1024 * 1024

const IMAGE_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
}

const sessions = new Map()

function productFile(lang) {
  if (!(lang in LANGS)) throw httpError(400, 'Unknown language')
  return `src/data/${LANGS[lang]}products.json`
}

function categoryFile(lang) {
  if (!(lang in LANGS)) throw httpError(400, 'Unknown language')
  return `src/data/${LANGS[lang]}categories_full.json`
}

function httpError(status, message) {
  const err = new Error(message)
  err.status = status
  return err
}

function readJsonFile(rel, fallback) {
  const file = path.join(ROOT, rel)
  if (!fs.existsSync(file)) return fallback
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJsonFile(rel, data, pretty = false) {
  const file = path.join(ROOT, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const contents = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data)
  const temp = `${file}.tmp`
  fs.writeFileSync(temp, contents)
  try {
    fs.renameSync(temp, file)
  } catch {
    fs.writeFileSync(file, contents)
    fs.rmSync(temp, { force: true })
  }
}

function credentials() {
  const file = path.join(ROOT, CREDENTIALS)
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({ username: 'admin', password: 'rti-admin' }, null, 2))
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function digest(value) {
  return crypto.createHash('sha256').update(String(value)).digest()
}

function sameSecret(a, b) {
  return crypto.timingSafeEqual(digest(a), digest(b))
}

function issueToken() {
  const token = crypto.randomBytes(24).toString('hex')
  sessions.set(token, Date.now() + SESSION_MS)
  return token
}

function authorized(req) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  const expires = sessions.get(token)
  if (!expires) return false
  if (expires < Date.now()) {
    sessions.delete(token)
    return false
  }
  return true
}

async function readBody(req, limit = 1024 * 1024) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > limit) throw httpError(413, 'Payload too large')
    chunks.push(chunk)
  }
  if (!chunks.length) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw httpError(400, 'Invalid JSON')
  }
}

function send(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(data))
}

function cleanText(value, max = 500000) {
  return typeof value === 'string' ? value.slice(0, max) : ''
}

function isValidSlug(slug) {
  return typeof slug === 'string' && /^[a-z0-9][a-z0-9._-]{0,180}$/.test(slug)
}

function sanitizeProduct(input, existing) {
  if (!input || typeof input !== 'object') throw httpError(400, 'Product is required')
  const title = cleanText(input.title, 300).trim()
  if (!title) throw httpError(400, 'Product title is required')

  const slug = String(input.slug || '').trim().toLowerCase()
  if (!isValidSlug(slug)) throw httpError(400, 'Slug may only contain a-z, 0-9, dot, dash and underscore')

  const images = Array.isArray(input.images)
    ? input.images.filter((src) => typeof src === 'string' && /^(public\/|https?:\/\/|\/images\/)/.test(src)).slice(0, 30)
    : []

  const baseVariant =
    (existing && existing.variants && existing.variants[0]) || {
      image: { path: null, mimetype: null },
      askQuote: false,
      quantity: 0,
      price: null,
      attributes: [],
      sku: '',
    }

  return {
    ...(existing || {}),
    title,
    description: cleanText(input.description),
    slug,
    images,
    attributes: (existing && existing.attributes) || [],
    variants: (() => {
      const variants =
        existing && Array.isArray(existing.variants) && existing.variants.length
          ? [...existing.variants]
          : [baseVariant]
      variants[0] = {
        ...variants[0],
        quantity: Number.isFinite(Number(input.quantity)) ? Math.max(0, Number(input.quantity)) : 0,
        askQuote: Boolean(input.askQuote),
      }
      return variants
    })(),
    category: cleanText(input.category, 100),
    documentation: (existing && existing.documentation) || [],
  }
}

function handleOverrides(body) {
  const { route, selector, kind, value } = body || {}
  if (typeof route !== 'string' || !route.startsWith('/')) throw httpError(400, 'Invalid route')
  if (typeof selector !== 'string' || !selector || selector.length > 2000) throw httpError(400, 'Invalid selector')
  if (!['html', 'src', 'href', 'bg'].includes(kind)) throw httpError(400, 'Invalid kind')

  const list = readJsonFile(OVERRIDES, [])
  const index = list.findIndex((o) => o.route === route && o.selector === selector && o.kind === kind)
  if (value === '' || value === null || value === undefined) {
    if (index >= 0) list.splice(index, 1)
  } else if (index >= 0) {
    list[index].value = cleanText(value)
  } else {
    list.push({ route, selector, kind, value: cleanText(value) })
  }
  writeJsonFile(OVERRIDES, list, true)
  return list
}

function handleUpload(body) {
  const name = cleanText(body && body.name, 255)
  const dataUrl = body && body.dataUrl
  if (typeof dataUrl !== 'string') throw httpError(400, 'Image data is required')
  const match = /^data:([a-z0-9.+-]+\/[a-z0-9.+-]+);base64,([a-z0-9+/=\s]+)$/i.exec(dataUrl)
  if (!match) throw httpError(400, 'Only base64 image data is accepted')
  const ext = IMAGE_TYPES[match[1].toLowerCase()]
  if (!ext) throw httpError(400, 'Unsupported image type')

  const buffer = Buffer.from(match[2], 'base64')
  if (!buffer.length) throw httpError(400, 'Empty image')
  if (buffer.length > MAX_UPLOAD) throw httpError(413, 'Image is larger than 10 MB')

  const base = path
    .basename(name || 'image', path.extname(name || ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
  const file = `${base || 'image'}-${crypto.randomUUID().slice(0, 8)}.${ext}`
  const dest = path.join(ROOT, 'public', 'images', file)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, buffer)
  return { file, path: `public/products/images/${file}`, url: `/images/${file}` }
}

function syncCategoryProducts(lang, slug, previousSlug, product) {
  // Generic category pages read this map. Renames must follow the product
  // everywhere it is listed; new products are appended to their category.
  const file = `src/data/${LANGS[lang]}category_products.json`
  const map = readJsonFile(file, {})
  let changed = false

  if (previousSlug && previousSlug !== slug) {
    for (const [categorySlug, list] of Object.entries(map)) {
      if (!Array.isArray(list) || !list.includes(previousSlug)) continue
      map[categorySlug] = list.map((entry) => (entry === previousSlug ? slug : entry))
      changed = true
    }
  }

  if (product && product.category) {
    const categories = readJsonFile(categoryFile(lang), {})
    const category = Object.values(categories).find((c) => c && c.id === product.category)
    if (category && category.slug) {
      const list = Array.isArray(map[category.slug]) ? map[category.slug] : []
      if (!list.includes(slug)) {
        map[category.slug] = [...list, slug]
        changed = true
      }
    }
  }

  if (!product) {
    for (const [categorySlug, list] of Object.entries(map)) {
      if (!Array.isArray(list)) continue
      const filtered = list.filter((entry) => entry !== slug)
      if (filtered.length !== list.length) {
        map[categorySlug] = filtered
        changed = true
      }
    }
  }

  if (changed) writeJsonFile(file, map)
}

function handleProducts(req, url, body) {
  const lang = url.searchParams.get('lang') || 'ro'
  const file = productFile(lang)

  if (req.method === 'GET') {
    const products = readJsonFile(file, {})
    const categories = readJsonFile(categoryFile(lang), {})
    return { products, categories }
  }

  if (req.method === 'PUT') {
    const originalSlug = body && body.originalSlug ? String(body.originalSlug) : ''
    const products = readJsonFile(file, {})
    const existing = originalSlug ? products[originalSlug] : null
    const product = sanitizeProduct(body && body.product, existing)

    if (!existing && products[product.slug]) throw httpError(409, 'A product with this slug already exists')
    if (originalSlug && originalSlug !== product.slug) delete products[originalSlug]
    products[product.slug] = product
    writeJsonFile(file, products)
    syncCategoryProducts(lang, product.slug, originalSlug, product)
    console.log(`[admin] saved product ${lang}/${product.slug}`)
    return { slug: product.slug }
  }

  if (req.method === 'DELETE') {
    const slug = url.searchParams.get('slug') || ''
    if (!isValidSlug(slug)) throw httpError(400, 'Invalid slug')
    const products = readJsonFile(file, {})
    if (!products[slug]) throw httpError(404, 'Product not found')
    delete products[slug]
    writeJsonFile(file, products)
    syncCategoryProducts(lang, slug, slug, null)
    console.log(`[admin] deleted product ${lang}/${slug}`)
    return { ok: true }
  }

  throw httpError(405, 'Method not allowed')
}

const STATIC_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

function serveFromPublic(url, res) {
  // Uploads land in public/images; serve them directly so `vite preview`
  // shows new images before a rebuild.
  if (url.pathname === '/content-overrides.json') {
    const data = readJsonFile(OVERRIDES, [])
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    res.end(JSON.stringify(data))
    return true
  }
  if (url.pathname.startsWith('/images/')) {
    const file = path.join(ROOT, 'public', 'images', path.basename(url.pathname))
    const ext = path.extname(file).toLowerCase()
    if (STATIC_TYPES[ext] && fs.existsSync(file)) {
      res.setHeader('Content-Type', STATIC_TYPES[ext])
      res.setHeader('Cache-Control', 'no-cache')
      res.end(fs.readFileSync(file))
      return true
    }
  }
  return false
}

async function handle(req, res, url) {
  if (req.method === 'POST' && url.pathname === `${API}/login`) {
    const body = await readBody(req)
    const creds = credentials()
    const ok =
      sameSecret(body.username || '', creds.username) & sameSecret(body.password || '', creds.password)
    if (!ok) throw httpError(401, 'Wrong username or password')
    return send(res, 200, { token: issueToken() })
  }

  if (!authorized(req)) throw httpError(401, 'Sign in to continue')

  if (req.method === 'POST' && url.pathname === `${API}/logout`) {
    const token = (req.headers.authorization || '').slice(7)
    sessions.delete(token)
    return send(res, 200, { ok: true })
  }

  if (url.pathname === `${API}/products`) {
    return send(res, 200, await handleProducts(req, url, req.method === 'PUT' ? await readBody(req, 2 * 1024 * 1024) : null))
  }

  if (url.pathname === `${API}/overrides`) {
    if (req.method === 'GET') return send(res, 200, { overrides: readJsonFile(OVERRIDES, []) })
    if (req.method === 'PUT') return send(res, 200, { overrides: handleOverrides(await readBody(req, 4 * 1024 * 1024)) })
  }

  if (req.method === 'POST' && url.pathname === `${API}/upload`) {
    return send(res, 200, handleUpload(await readBody(req, 16 * 1024 * 1024)))
  }

  throw httpError(404, 'Not found')
}

export function adminPlugin() {
  const middleware = async (req, res, next) => {
    const url = new URL(req.url || '/', 'http://localhost')
    if (url.pathname.startsWith(API)) {
      try {
        await handle(req, res, url)
      } catch (err) {
        send(res, err.status || 500, { error: err.message || 'Server error' })
      }
      return
    }
    if (req.method === 'GET' && serveFromPublic(url, res)) return
    next()
  }

  const announce = (server) => {
    credentials()
    const port = server.httpServer && server.httpServer.address()
    console.log(
      `\n  Admin panel: http://localhost:${(port && port.port) || 5173}/admin  (credentials: ${CREDENTIALS})\n`
    )
  }

  return {
    name: 'rti-admin',
    configureServer(server) {
      server.middlewares.use(middleware)
      if (server.httpServer) server.httpServer.once('listening', () => announce(server))
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
      if (server.httpServer) server.httpServer.once('listening', () => announce(server))
    },
  }
}
