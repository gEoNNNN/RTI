// Lightweight cart: localStorage-backed, mirrors the live site's behaviour —
// add → success toast + header badge updates; dropcart lists items.
import productsRo from './data/products.json';
import productsRu from './data/ru/products.json';
import productsEn from './data/en/products.json';
import { imgUrl } from './data/helpers';
import { I18N } from './lang';

const KEY = 'rti-cart';
const EVENT = 'rti-cart-changed';

const ALL = { ro: productsRo, ru: productsRu, en: productsEn };

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT));
}

export function cartCount() {
  return getCart().reduce((n, i) => n + i.quantity, 0);
}

export function onCartChange(fn) {
  window.addEventListener(EVENT, fn);
  window.addEventListener('storage', fn);
  return () => {
    window.removeEventListener(EVENT, fn);
    window.removeEventListener('storage', fn);
  };
}

export function findProduct(slug, lang) {
  return (
    (ALL[lang] && ALL[lang][slug]) ||
    productsRo[slug] ||
    productsRu[slug] ||
    productsEn[slug] ||
    null
  );
}

export function addToCart(slug, lang, quantity = 1) {
  const product = findProduct(slug, lang);
  if (!product) return null;
  const items = getCart();
  const existing = items.find((i) => i.slug === slug);
  if (existing) existing.quantity += quantity;
  else {
    const image = product.images && product.images.length ? imgUrl(product.images[0]) : '';
    items.push({ slug, title: product.title, image, quantity });
  }
  saveCart(items);
  return product;
}

export function removeFromCart(slug) {
  saveCart(getCart().filter((i) => i.slug !== slug));
}

// ngx-toastr lookalike — markup matches the live toast CSS.
export function showToast(html, success = true) {
  let host = document.querySelector('.toast-host');
  if (!host) {
    host = document.createElement('div');
    host.className = 'toast-host overlay-container';
    const container = document.createElement('div');
    container.className = 'toast-container toast-top-right';
    host.appendChild(container);
    document.body.appendChild(host);
  }
  const container = host.firstChild;
  const toast = document.createElement('div');
  toast.className = 'ngx-toastr ' + (success ? 'toast-success' : 'toast-error');
  toast.innerHTML = `<div class="toast-message"><span>${html}</span></div>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity .3s';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

export function addedToCartToast(product, lang) {
  const tpl =
    (I18N[lang] && I18N[lang].cart && I18N[lang].cart.addedToCart) ||
    I18N.ro.cart.addedToCart;
  showToast(tpl.replace('{{title}}', product.title));
}
