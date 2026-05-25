<p align="center">
  <img src="docs/logo.png" alt="K-Patrol" width="140" />
</p>

<h1 align="center">K-Patrol — Web Commerce</h1>

<p align="center">
  <em>Marketing &amp; e-commerce site for the K-Patrol indoor patrol robot platform.</em><br/>
  <em>Trang giới thiệu sản phẩm và đặt hàng cho hệ sinh thái robot tuần tra K-Patrol.</em>
</p>

<p align="center">
  <a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14.2-black?logo=next.js" /></a>
  <a href="https://www.typescriptlang.org"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" /></a>
  <a href="https://tailwindcss.com"><img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss" /></a>
  <a href="https://maplibre.org"><img alt="MapLibre" src="https://img.shields.io/badge/MapLibre-GL%205-396cb2?logo=maplibre" /></a>
  <a href="#license"><img alt="License" src="https://img.shields.io/badge/license-MIT-green" /></a>
  <a href="CHANGELOG.md"><img alt="Release" src="https://img.shields.io/badge/release-v1.0.0-blue" /></a>
  <a href="https://github.com/KPatrol/KPatrol_WebCommerce"><img alt="Repo" src="https://img.shields.io/badge/repo-KPatrol_WebCommerce-181717?logo=github" /></a>
</p>

<p align="center">
  <a href="#overview--tổng-quan">Overview</a> ·
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#roadmap">Roadmap</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#license">License</a>
</p>

---

## Overview / Tổng quan

The web-commerce app is the public-facing site for K-Patrol. It shipped as the demo storefront for the graduation thesis "Robot tuần tra trong nhà K-Patrol V10 (TBR/IGV)" and serves three audiences:

1. **Visitors** — discover product specs, pricing, FAQ, alert proof gallery, and the Phenikaa University deployment showcase.
2. **Customers** — submit inquiries, subscribe to the newsletter, and explore the live patrol map.
3. **Operators** — sign in to a lightweight admin portal to triage inquiries and manage products.

Tech-stack-wise it is a fully App-Router Next.js 14 app with i18n (EN/VI), edge middleware for locale routing, route-level loading/error states, MapLibre + Leaflet for the live map, a 3D Spline hero, and a small token-protected admin API.

> 🎓 **Academic context:** Public storefront of the graduation thesis *"Phát triển hệ sinh thái tuần tra và giám sát thông minh tích hợp AIoT — K-Patrol"* by Vũ Đăng Khoa, Phenikaa University.

---

## Features

### Public site
- 🦸 Hero with 3D Spline scene + animated CTAs
- 🗺️ Live Phenikaa University map (MapLibre + Leaflet, GeoJSON boundary)
- 🧱 Bento-style features grid, specs, pricing, testimonials, partners, FAQ, CTA blocks
- 🛡️ Detection alert gallery — real patrol snapshots (`frame_003105.jpg`,
  `frame_003847.jpg`) showcasing person + fire detection on the deployed robot
- 🌐 i18n EN/VI via `next-intl`, automatic locale detection in middleware
- 📨 Inquiry form posting to internal API with name/phone/email validation
- 📰 Newsletter signup with rate-limited POST `/api/newsletter`
- ⚠️ Global `error.tsx`, `loading.tsx`, `not-found.tsx`
- 🔔 Toaster notifications via Sonner
- 💬 Live chat floating widget

### Admin
- 🔐 Token-based admin login (`/admin/login`)
- 📊 Dashboard with overview stats
- 📥 Inquiries list (`/api/inquiries`) with detail view (`/api/inquiries/[id]`)
- 🛍️ Products CRUD (`/api/products`, `/api/products/[id]`)

---

## Tech Stack

| Layer | Library / Tool |
|-------|---------------|
| Framework | Next.js 14.2 (App Router, Edge Middleware) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4, `tailwind-merge`, `clsx` |
| State | Zustand 5 |
| i18n | `next-intl` 4.8 |
| Maps | MapLibre GL 5, Leaflet 1.9, react-leaflet, react-map-gl |
| 3D | `@splinetool/react-spline` |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| HTTP | Axios |
| Notifications | Sonner |

---

## Project Structure

```
web-commerce/
├── public/
│   ├── alert/                            # Real detection snapshots used as visual proof
│   │   ├── frame_003105.jpg                # Person detection sample
│   │   └── frame_003847.jpg                # Fire detection sample
│   └── maps/
│       └── phenikaa.geojson              # Campus boundary used by LiveMapSection
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (i18n provider, fonts, toaster)
│   │   ├── page.tsx                      # Landing page composition
│   │   ├── error.tsx · loading.tsx · not-found.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx                # Admin shell with auth guard
│   │   │   ├── page.tsx                  # Admin dashboard
│   │   │   └── login/page.tsx            # Login form
│   │   ├── api/
│   │   │   ├── admin/auth/               # Issue / verify admin token
│   │   │   ├── inquiries/                # Inquiry list + detail
│   │   │   ├── newsletter/               # Email subscribe (rate-limited)
│   │   │   └── products/                 # Product list + detail
│   │   └── products/                     # Public product catalog
│   ├── components/
│   │   ├── layout/                       # Navbar, Footer (refreshed copy)
│   │   ├── sections/                     # HeroSection, FeaturesBento, Pricing, FAQ,
│   │   │                                 # ContactCTASection, CTASection, ContactSection
│   │   ├── map/                          # PhenikaaShowcaseMap (+Client variant)
│   │   ├── features/                     # LiveChatWidget
│   │   └── ui/                           # LanguageSwitcher, Toaster
│   ├── hooks/
│   │   └── useTranslations.ts            # Client-side translation helper
│   ├── i18n/
│   │   ├── config.ts                     # next-intl runtime config
│   │   └── messages/
│   │       ├── en.json
│   │       └── vi.json
│   ├── lib/
│   │   ├── data-store.ts                 # In-memory data layer + newsletter table
│   │   ├── notification.ts               # Notification utilities
│   │   └── phenikaa-boundary.ts          # GeoJSON helpers
│   └── store/
│       └── useStore.ts                   # Zustand global store
├── middleware.ts                         # Locale + admin route gate
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## Quick Start

```bash
pnpm install

cp .env.example .env.local
#   NEXT_PUBLIC_SITE_URL=http://localhost:3001
#   NEXT_PUBLIC_API_URL=http://localhost:4000
#   ADMIN_TOKEN=change-me
#   NEWSLETTER_FROM=K-Patrol Newsletter <hello@kpatrol.online>
#   ADMIN_NOTIFY_EMAIL=khoa.vu@alphaasimov.com

# Develop on http://localhost:3001
pnpm dev

# Production build
pnpm build && pnpm start
```

### Environment variables

| Key | Required | Description |
|-----|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical site URL (used in metadata + SEO) |
| `NEXT_PUBLIC_API_URL` | optional | Backend base URL when wiring real APIs |
| `ADMIN_TOKEN` | required for admin | Static token issued by `/api/admin/auth` |
| `NEWSLETTER_FROM` | optional | "From" header for newsletter confirmations |
| `ADMIN_NOTIFY_EMAIL` | optional | Inbox that receives new inquiry alerts |

---

## Internationalization

All UI strings live in [src/i18n/messages](src/i18n/messages). The middleware in [middleware.ts](middleware.ts) routes `/`, `/en/*`, `/vi/*` and falls back to the visitor's `Accept-Language` header. To add a locale:

1. Add `src/i18n/messages/<locale>.json`
2. Register the locale in [src/i18n/config.ts](src/i18n/config.ts)
3. Update `LanguageSwitcher` options.

---

## Deployment

### Docker

```bash
docker build -f Dockerfile.docker -t kpatrol-web .
docker run -p 3001:3001 --env-file .env.local kpatrol-web
```

The repository ships with a `Dockerfile.docker` configured for the workspace-aware monorepo build (`pnpm --filter web-commerce build`).

### Compose (recommended)

From the parent repo root:

```bash
make up           # Start the full stack including web-commerce
make logs         # Tail logs
```

Local Mac endpoint: `http://localhost:8002` (production stack) or `http://localhost:3001` (dev).

### Vercel / Netlify / Cloudflare Pages

The app is a standard Next.js 14 build — no special configuration required. Set the env vars listed above in the platform dashboard.

---

## Scripts

| Script | Action |
|--------|--------|
| `pnpm dev` | Dev server on port 3001 |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint via `next lint` |
| `pnpm clean` | Remove `.next`, `out`, `node_modules` |

---

## Roadmap

### v1.1 (next minor)
- [ ] Stripe / VNPay / MoMo checkout integration (currently inquiry-only)
- [ ] Real Postgres-backed data store (currently in-memory demo)
- [ ] Email confirmation flow for inquiries + newsletter
- [ ] Blog / case study CMS (Markdown + MDX)
- [ ] Lead scoring + CRM webhook export (HubSpot, Salesforce)

### v1.2
- [ ] Multi-tenant catalogue (per-distributor pricing + branding)
- [ ] Customer dashboard (order history, support tickets, warranty)
- [ ] Live patrol stream embed (read-only public feed for partner demos)
- [ ] A/B testing for hero copy / CTA + analytics dashboard
- [ ] Programmatic SEO pages (per-industry landing pages)

### Long term
- [ ] Headless commerce backend (Medusa / Saleor) replacing the demo data layer
- [ ] AR product preview (place a 3D K-Patrol model in your space)
- [ ] Localised storefronts (TH, ID, PH) with regional payment rails
- [ ] Partner / reseller portal with commission tracking

---

## Related repositories

| Component | Repo |
|-----------|------|
| Backend API + WebSocket | [KPatrol_Backend](https://github.com/KPatrol/KPatrol_Backend) |
| Robot firmware + Pi controller | [Robot_WS](https://github.com/KPatrol/Robot_WS) |
| Operator PWA | [KPatrol_MobileApp](https://github.com/KPatrol/KPatrol_MobileApp) |

---

## Author

**Vũ Đăng Khoa** · MSSV 22010357 · K16, Lớp CNTT4
Khoa Hệ thống Thông tin · Trường Công nghệ Thông tin · Phenikaa University
✉️ khoa.vu@alphaasimov.com

---

## License

MIT License — © K-Patrol / Vu Dang Khoa, 2026.
