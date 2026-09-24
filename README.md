# Galaxy PPRC factory website

Standalone Next.js 16.3.5 application for Galaxy PPRC Pipes & Fittings. Run all commands below from this directory. It owns its package.json, package-lock.json, node_modules, components, assets and styles; it does not import the Asia Pipe Store application.

## Run locally

```powershell
npm ci
npm run dev
```

Open http://localhost:3001. The retail application continues to use port 3000.

```powershell
npm run build
npm run start
```

The Next.js bundler and file tracing roots are explicitly scoped to this directory. The parent retail project excludes this folder from TypeScript, ESLint and Tailwind source scanning. Those three exclusions are the only retail configuration changes.

## Public business configuration

The owner confirmed WhatsApp **0321-6661900** (international format `923216661900`) and **sales@galaxypprc.com**. They are defaults in `data/factoryData.ts`. To override them, copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_FACTORY_WHATSAPP`: country code and phone number, digits only.
- `NEXT_PUBLIC_FACTORY_EMAIL`: public sales email.
- `NEXT_PUBLIC_SITE_URL`: final factory domain, including https://.
- `NEXT_PUBLIC_SHOP_URL`: final Asia Pipe Store domain, including https://.

The domain settings are deliberately blank until the production destinations are known. Before deployment, set the factory URL to enable indexing, the canonical URL, absolute social image URL and sitemap entries. Set the shop URL to enable its website link. The depot address and inquiry link remain available without a shop URL. Rebuild after changing public environment values.

## Content and assets

- Edit the catalogue and business information in `data/factoryData.ts`.
- All seven existing high-resolution JPGs are retained in `public/images/products/`. They are presented as illustrative renderings. Generated imagery does not verify product geometry, certification or the actual plant layout.
- Production capacity, certification badges, numerical laboratory results and unverified engineering dimensions from the earlier draft have been removed. Add these only from approved factory documents.
- Technical tables list product construction and connection information. Pressure classes are inquiry selections, not installation ratings. Product sheets print only the selected product, with a note to obtain approved engineering data.
- Actual certification PDFs can be added when supplied. There are no placeholder download links.

## Inquiry behavior

Add products from the catalogue or technical table, or use the quote builder's Add product button. Each line records product, requested size, pressure class, quantity and unit. The dealership form builds a separate message.

Both forms validate and generate customer-controlled WhatsApp and email drafts. Review, manual-copy fallback, text download and print/PDF are available. Nothing is sent automatically. Product lines persist across routes and reloads in the versioned `galaxy-inquiry-v1` browser draft; contact details and project notes stay in memory and clear on reload. Invalid drafts recover safely; storage-disabled browsers retain an in-memory inquiry. No backend, database, analytics, email transport or automatic messaging is configured.

## Verification

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

For browser tests, keep `npm run dev` running in a separate terminal and run:

```powershell
npm run test:e2e
```

Tests use the locally installed Google Chrome in headless mode, at desktop and mobile viewport sizes. They cover filters/search, image loading, product sheets, Escape/focus restoration, print CSS, multi-item quote prefilling, validation, message encoding, edit/remove behavior, dealership review, mobile navigation, color tokens and horizontal overflow. Tests inspect WhatsApp URLs without opening or sending messages. Screenshots are written to `test-results/` (ignored).

`npm test` uses Node's native TypeScript stripping; use Node 24 (the verified local version is 24.12.0).

Use `npm run format` to format maintained source files.

## Multi-page showroom

The routes are `/`, `/products`, `/products/[slug]`, `/compare`, `/product-finder`, `/factory`, `/technical`, `/dealership`, `/locations`, `/locations/factory`, `/locations/asia-pipe-store`, and `/quote`. Unknown product slugs return 404. Legacy homepage section links redirect to their corresponding pages. The comparison URL carries up to three catalogue IDs. The guided finder carries application, size, quantity and document requests into the inquiry without declaring engineering suitability.

Manrope is bundled locally. Three.js 0.186.0, React Three Fiber 9.8.0 and Drei 10.7.8 are pinned for React 19. The renderer loads only after activating 3D; cards and inactive viewers use matching posters. Every procedural model is illustrative and not to scale. A model can later use `{kind: "glb", src: "/models/approved.glb"}` in catalogue data. Real engineering geometry should be reviewed before replacement.

Viewer controls include drag, keyboard buttons, zoom, presets, reset, optional rotation and an expanded dialog. PN20 supports section view; fiber supports section and separated layers; the threaded socket supports exploded view; the valve demonstrates lever orientation. Mobile starts with a poster to preserve page scrolling. Stationary rendering is demand-driven; offscreen/hidden viewers pause. WebGL errors/context loss return to the poster and retain product actions. Geometry and canvas resources are disposed on unmount. The initial view is stationary, including for reduced-motion users.

`public/images/models/*-studio.png` are 1200×900 posters captured directly from these models. Original images remain in `public/images/products/`. To regenerate the studio posters with the dev server running, use `node scripts/render-posters.mjs`. Review the resulting images before release. Product data supports optional verified specifications, documents, approved photographs and future Urdu content; current content is English.

## Locations

`data/locations.ts` holds the user-confirmed destinations and Google listing embed URLs:

- Factory: `31.5004234, 73.1084974`, Chak 117 JB, Millat Road, Faisalabad.
- Retail outlet: `31.4171743, 73.0856842`, C38P+V77, Railway Road, Sadiq Market, Faisalabad.

Maps load only on request. Directions target the exact coordinates; address and directions stay usable if Google Maps is blocked. No visitor geolocation is requested. The number on both location pages is labelled **Galaxy inquiries**. Business hours, entrance photos and a separate shop number remain unpublished until confirmed.

## Production performance check

Build, then run `node node_modules/next/dist/bin/next start -p 3002` and `node scripts/check-performance.mjs`. The script records results in `test-results/performance.json`. It uses Chrome headless, 390×844 viewport, a cold browser cache, 4× CPU slowdown, 1.6 Mbps download, 0.75 Mbps upload and 150 ms latency. This is a local production-build test, not a physical Android measurement or a hosting/CDN benchmark.

The September 24, 2026 run recorded LCP of 0.988 s on home, 1.196 s on catalogue and 1.192 s on the PN20 detail page; CLS was 0 on all three. No canvas was created before activation. These measurements meet the stated targets under those conditions. Repeat after deploying to the final domain, and verify touch interaction on a physical mid-range Android device before launch.

Factory build, retail build, lint, TypeScript, draft/message unit tests and desktop/mobile browser checks are covered. Browser checks also exercise all six models, dialog controls, stationary/offscreen rendering, context loss, corrupt/blocked storage, blocked maps, copy failure, email drafts, downloads and print isolation. Messaging links are inspected without sending anything. Production domains, real factory evidence and approved engineering documents remain deployment/content inputs; this implementation does not publish or replace a live website.

Final verification: **7 unit tests and 26 production-mode browser tests passed**, along with lint, TypeScript and both application builds. To run browser tests against a production server, set `$env:PLAYWRIGHT_BASE_URL = 'http://localhost:3002'` before `npm run test:e2e`. The default remains the dev server on port 3001.
