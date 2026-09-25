# Aqua PPRC factory website

Standalone Next.js 16.3.5 application for Aqua PPRC Pipes & Fittings. Run all commands below from this directory. It owns its package.json, package-lock.json, node_modules, components, assets and styles; it does not import the Asia Pipe Store application.

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

Confirmed business contact numbers:
- **Owner & Executive Sales:** +92 300 6661900 (WhatsApp `923006661900`)
- **Sales Manager & Co-Owner:** +92 300 2828860 (WhatsApp `923002828860`)
- **Distributor & Wholesale Outlet:** 03087500960 (WhatsApp `923087500960`)
- **Sales & Online Support:** 03006606097 (WhatsApp `923006606097`)
- **Email:** **sales@aquapprc.com**

They are defaults in `data/factoryData.ts`. To override them, copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_FACTORY_WHATSAPP`: country code and phone number, digits only.
- `NEXT_PUBLIC_FACTORY_EMAIL`: public sales email.
- `NEXT_PUBLIC_SITE_URL`: final factory domain, including https://.
- `NEXT_PUBLIC_SHOP_URL`: final Asia Pipe Store domain, including https://.

## Content and assets

- Edit the catalogue and business information in `data/factoryData.ts`.
- All products feature clean standard size descriptors (e.g. `25 mm`, `32 mm`, `25 × 1/2"`), without AQ prefixes, and with *"Contact for pricing"* quote routing.
- The product catalog includes Single-Layer PPRC Pipes (PN20 & PN25) and Double-Layer (2-Layer) PPRC Pipes (PN20 & PN25), along with all 16+ fitting & valve categories.

## Inquiry behavior

Both forms validate and generate customer-controlled WhatsApp and email drafts. Review, manual-copy fallback, text download and print/PDF are available. Nothing is sent automatically. Product lines persist across routes and reloads in the browser draft; contact details and project notes stay in memory and clear on reload. Invalid drafts recover safely; storage-disabled browsers retain an in-memory inquiry. No backend, database, analytics, email transport or automatic messaging is configured.
