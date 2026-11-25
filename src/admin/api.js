// Thin client for the local admin API (admin/server.js).
const TOKEN_KEY = 'rti-admin-token'

export function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token)
  else sessionStorage.removeItem(TOKEN_KEY)
  window.dispatchEvent(new Event('rti-admin-auth'))
}

async function request(url, options = {}) {
  const token = getToken()
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...options.headers,
    },
  })

  if (res.status === 401) setToken(null)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Request failed (' + res.status + ')')
  return data
}

export const api = {
  login: (username, password) =>
    request('/api/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  logout: () => request('/api/admin/logout', { method: 'POST' }).catch(() => {}),
  products: (lang) => request('/api/admin/products?lang=' + lang),
  saveProduct: (lang, originalSlug, product) =>
    request('/api/admin/products?lang=' + lang, {
      method: 'PUT',
      body: JSON.stringify({ originalSlug, product }),
    }),
  deleteProduct: (lang, slug) =>
    request('/api/admin/products?lang=' + lang + '&slug=' + encodeURIComponent(slug), {
      method: 'DELETE',
    }),
  overrides: () => request('/api/admin/overrides'),
  saveOverride: (payload) =>
    request('/api/admin/overrides', { method: 'PUT', body: JSON.stringify(payload) }),
  deleteOverride: (payload) =>
    request('/api/admin/overrides', {
      method: 'PUT',
      body: JSON.stringify({ ...payload, value: '' }),
    }),
  upload: (name, dataUrl) =>
    request('/api/admin/upload', { method: 'POST', body: JSON.stringify({ name, dataUrl }) }),
}

// Reads a picked file as a data URL for the upload endpoint.
export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.readAsDataURL(file)
  })
}
