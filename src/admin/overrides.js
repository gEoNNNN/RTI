// Content edits are stored as a list of DOM patches in
// public/content-overrides.json — a local file, applied on top of the
// rendered React page. Each patch is scoped to one route.
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const FILE = '/content-overrides.json'
const EVENT = 'rti-overrides-changed'
const MAX_TEXT_DEPTH = 4

let cache = null

export async function loadOverrides(force = false) {
  if (cache && !force) return cache
  try {
    const res = await fetch(FILE + '?t=' + Date.now(), { cache: 'no-store' })
    cache = res.ok ? await res.json() : []
  } catch {
    cache = []
  }
  return cache
}

export function invalidateOverrides() {
  cache = null
  window.dispatchEvent(new Event(EVENT))
}

export function onOverridesChange(fn) {
  window.addEventListener(EVENT, fn)
  return () => window.removeEventListener(EVENT, fn)
}

export function selectorFor(el) {
  const root = document.getElementById('root')
  const parts = []
  let node = el
  while (node && node !== root && node.nodeType === 1) {
    let part = node.tagName.toLowerCase()
    const cls = Array.from(node.classList).find((c) => !c.startsWith('ng-'))
    if (cls) part += '.' + CSS.escape(cls)
    const parent = node.parentElement
    if (parent) {
      const sameTag = Array.from(parent.children).filter((c) => c.tagName === node.tagName)
      if (sameTag.length > 1) part += `:nth-of-type(${sameTag.indexOf(node) + 1})`
    }
    parts.unshift(part)
    node = node.parentElement
  }
  return parts.join(' > ')
}

function elementFor(selector) {
  try {
    return document.querySelector('#root > ' + selector)
  } catch {
    return null
  }
}

export function applyOverrides(route, list = cache) {
  if (!list || !list.length) return
  for (const patch of list) {
    if (patch.route !== route) continue
    const el = elementFor(patch.selector)
    if (!el) continue
    if (patch.kind === 'html') {
      if (el.innerHTML !== patch.value) el.innerHTML = patch.value
    } else if (patch.kind === 'src' && el.tagName === 'IMG') {
      if (el.getAttribute('src') !== patch.value) el.setAttribute('src', patch.value)
    } else if (patch.kind === 'href') {
      if (el.getAttribute('href') !== patch.value) el.setAttribute('href', patch.value)
    } else if (patch.kind === 'bg') {
      el.style.backgroundImage = `url("${patch.value}")`
    }
  }
}

export function backgroundUrl(el) {
  // Prefer the authored inline value: getComputedStyle() expands relative
  // paths to absolute URLs, which would stop working on another host.
  const inline = el.style && el.style.backgroundImage
  const bg = inline && inline !== 'none' ? inline : getComputedStyle(el).backgroundImage
  if (!bg || bg === 'none' || !bg.startsWith('url(')) return ''
  const match = /^url\(["']?(.*?)["']?\)/.exec(bg)
  if (!match || !match[1]) return ''
  const url = match[1]
  try {
    const parsed = new URL(url, window.location.origin)
    return parsed.origin === window.location.origin ? parsed.pathname + parsed.search : url
  } catch {
    return url
  }
}

function findTextLeaf(el, skipSvg = true) {
  if (!el || el.nodeType !== 1) return null
  if (skipSvg && ['svg', 'script', 'style', 'img', 'input', 'textarea'].includes(el.tagName.toLowerCase())) {
    return null
  }
  if (!el.children.length) return el.textContent.trim() ? el : null
  for (const child of el.children) {
    const leaf = findTextLeaf(child)
    if (leaf) return leaf
  }
  return null
}

// What can the admin edit from this click? Walks up a few levels so clicking
// a card's padding still finds its label and background image.
export function describeTarget(start) {
  if (!start || start.nodeType !== 1) return null
  const root = document.getElementById('root')
  if (!root || start === root || !root.contains(start)) return null
  const chain = []
  let node = start
  for (let i = 0; node && i <= MAX_TEXT_DEPTH; i += 1) {
    if (node.id === 'root') break
    chain.push(node)
    node = node.parentElement
  }

  const imgEl = chain.find((el) => el.tagName === 'IMG') || null
  const bgEl = imgEl ? null : chain.find((el) => backgroundUrl(el)) || null
  const textEl = imgEl ? null : chain.map((el) => findTextLeaf(el)).find(Boolean) || null
  const linkEl = start.closest('a')

  if (!imgEl && !bgEl && !textEl && !linkEl) return null

  return {
    anchor: imgEl || bgEl || textEl || start,
    textEl,
    imgEl,
    bgEl,
    linkEl,
    label: (imgEl || bgEl || textEl || start).tagName.toLowerCase(),
  }
}

export function applyAll(route) {
  loadOverrides().then((list) => applyOverrides(route, list))
}

// Applies saved patches after each route render and whenever React re-creates
// matching DOM (route transitions, language switch, sliders).
export function useApplyOverrides() {
  const { pathname } = useLocation()

  useEffect(() => {
    let alive = true
    loadOverrides(true).then((list) => {
      if (alive) applyOverrides(pathname, list)
    })

    const root = document.getElementById('root')
    if (!root) return undefined

    let timer = null
    let applying = false
    const observer = new MutationObserver(() => {
      if (applying) return
      clearTimeout(timer)
      timer = setTimeout(() => {
        applying = true
        observer.disconnect()
        applyOverrides(pathname)
        observer.observe(root, { childList: true, subtree: true })
        setTimeout(() => {
          applying = false
        }, 0)
      }, 80)
    })
    observer.observe(root, { childList: true, subtree: true })

    const refresh = () => loadOverrides(true).then((list) => applyOverrides(pathname, list))
    window.addEventListener(EVENT, refresh)
    return () => {
      alive = false
      clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener(EVENT, refresh)
    }
  }, [pathname])
}
