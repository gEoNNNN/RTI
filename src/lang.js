import { useLocation } from 'react-router-dom';
import i18nRo from './data/i18n.json';
import i18nRu from './data/ru/i18n.json';
import i18nEn from './data/en/i18n.json';

export const I18N = { ro: i18nRo, ru: i18nRu, en: i18nEn };
const PREFIX = { ru: '/ru', en: '/en', ro: '' };

export function langFromPath(pathname = '') {
  if (pathname === '/ru' || pathname.startsWith('/ru/')) return 'ru';
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  return 'ro';
}

export function useLang() {
  return langFromPath(useLocation().pathname);
}

// Prefix an internal path with the language segment. External/anchored
// paths and already-prefixed paths are returned unchanged.
export function to(path, lang) {
  if (!path || typeof path !== 'string') return path;
  if (!path.startsWith('/')) return path;
  if (/^\/(ru|en)(\/|$)/.test(path)) return path;
  return (PREFIX[lang] || '') + path;
}

export function useTo() {
  const lang = useLang();
  return (p) => to(p, lang);
}

function lookup(bundle, key) {
  let d = bundle;
  for (const k of key.split('.')) {
    if (!d || typeof d !== 'object') return undefined;
    d = d[k];
  }
  return d;
}

export function t(lang, key, fallback) {
  let v = lookup(I18N[lang], key);
  if (v === undefined && lang !== 'ro') v = lookup(I18N.ro, key);
  return v === undefined ? (fallback !== undefined ? fallback : key) : v;
}

export function useT() {
  const lang = useLang();
  return (key, fallback) => t(lang, key, fallback);
}

// Pick the dataset variant matching the active language, RO as fallback.
export function pick(lang, ro, ru, en) {
  if (lang === 'ru') return ru || ro;
  if (lang === 'en') return en || ro;
  return ro;
}
