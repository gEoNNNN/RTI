# RTI site

React + Vite storefront for rti.md. Content lives in local JSON files under
`src/data`; there is no database.

## Admin panel (local files, no database)

1. `npm run dev`
2. Open <http://localhost:5173/admin>
3. Sign in with `admin` / `rti-admin` — `.admin.json` at the project root is
   created when the dev server starts. Change it there (the file is gitignored).

**Products** — add, edit, rename and delete products. Saves straight to
`src/data/products.json` (or `src/data/ru|en/products.json`). Image uploads go
to `public/images` and are referenced from the JSON.

**Edit site** — use the *Edit site* button in the admin panel (or the floating
admin bar while signed in). Click any text, image, button label or link on the
page and change it in the panel. Changes are stored in
`public/content-overrides.json` and applied on top of the page for every
visitor of that route. *Page changes* in the admin lists and resets them.
Deleting an override restores the original content after a reload.

### Limits

- Editing writes files through the Vite dev/preview server, so it only works
  while that server runs. A static `dist` deploy has no API — run
  `npm run dev` (or `npm run preview`) on the machine that owns the files.
- Product JSON is bundled at build time: after changing products, reload the
  site in dev (automatic) or rebuild before deploying. Inline overrides are
  read at runtime.
- Inline edits are keyed by the element's position in the page. If the markup
  of that section is rebuilt later, re-check the edit; the original text is
  never destroyed.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
