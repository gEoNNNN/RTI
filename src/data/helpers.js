// Map an API path like "public/products/images/xxx.jpg" to the local /images/ folder.
// Downloaded files may carry a hash infix (name.HASH.ext) — the manifest resolves it.
import manifest from './images_manifest.json';

export function imgUrl(apiPath, fallback = '/images/shopping-bag.e9efb.svg') {
  if (!apiPath || typeof apiPath !== 'string') return fallback;
  const base = apiPath.split('/').pop();
  const local = manifest[base];
  return local ? '/images/' + local : '/images/' + base;
}
