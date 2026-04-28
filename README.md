<p align="center">
  <img src="docs/logo.png" alt="K-Patrol" width="140" />
</p>

<h1 align="center">K-Patrol — Web Commerce</h1>

<p align="center">
  <em>Marketing & e-commerce site for the K-Patrol indoor patrol robot platform.</em><br/>
  <em>Trang giới thiệu sản phẩm và đặt hàng cho hệ sinh thái robot tuần tra K-Patrol.</em>
</p>

<p align="center">
  <a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14.2-black?logo=next.js" /></a>
  <a href="https://www.typescriptlang.org"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" /></a>
  <a href="https://tailwindcss.com"><img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss" /></a>
  <a href="#license"><img alt="License" src="https://img.shields.io/badge/license-MIT-green" /></a>
  <a href="https://github.com/KPatrol/KPatrol_WebCommerce"><img alt="Repo" src="https://img.shields.io/badge/repo-KPatrol_WebCommerce-181717?logo=github" /></a>
</p>

<p align="center">
  <a href="#overview--tổng-quan">Overview</a> ·
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#license">License</a>
</p>

---

## Overview / Tổng quan

The web-commerce app is the public-facing site for K-Patrol. It shipped as the demo storefront for the graduation thesis "Robot tuần tra trong nhà K-Patrol V10 (TBR/IGV)" and serves three audiences:

1. **Visitors** — discover product specs, pricing, FAQ, and the Phenikaa University deployment showcase.
2. **Customers** — submit inquiries, read documentation, and explore the live patrol map.
3. **Operators** — sign in to a lightweight admin portal to triage inquiries and manage products.

Tech-stack-wise it is a fully App-Router Next.js 14 app with i18n (EN/VI), edge middleware for locale routing, route-level loading/error states, MapLibre + Leaflet for the live map, and a small token-protected admin API.

---

## Features

### Public site
- 🦸 Hero with 3D Spline scene
- 🗺️ Live Phenikaa University map (MapLibre + Leaflet, GeoJSON boundary)
- 🧱 Bento-style features grid, specs, pricing, testimonials, partners, FAQ, CTA blocks
- 🌐 i18n EN/VI via `next-intl`, automatic locale detection in middleware
- 📨 Inquiry form posting to internal API
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
│   └── maps/
│       └── phenikaa.geojson         # Campus boundary used by LiveMapSection
├── src/
│   ├── app/                         # App Router
│   │   ├── layout.tsx               # Root layout (i18n provider, fonts, toaster)
│   │   ├── page.tsx                 # Landing page composition
│   │   ├── error.tsx                # Global error boundary
│   │   ├── loading.tsx              # Loading skeleton
│   │   ├── not-found.tsx            # 404 page
│   │   ├── admin/
│   │   │   ├── layout.tsx           # Admin shell with auth guard
│   │   │   ├── page.tsx             # Admin dashboard
│   │   │   └── login/page.tsx       # Login form
│   │   ├── api/
│   │   │   ├── admin/auth/          # Issue / verify admin token
│   │   │   ├── inquiries/           # Inquiry list + detail
│   │   │   └── products/            # Product list + detail
│   │   └── products/                # Public product catalog
│   ├── components/
│   │   ├── layout/                  # Navbar, Footer
│   │   ├── sections/                # HeroSection, FeaturesBento, Pricing, FAQ, …
│   │   ├── map/                     # PhenikaaShowcaseMap (+Client variant)
│   │   ├── features/                # LiveChatWidget
│   │   └── ui/                      # LanguageSwitcher, Toaster
│   ├── hooks/
│   │   └── useTranslations.ts       # Client-side translation helper
│   ├── i18n/
│   │   ├── config.ts                # next-intl runtime config
│   │   └── messages/
│   │       ├── en.json
│   │       └── vi.json
│   ├── lib/
│   │   ├── data-store.ts            # In-memory data layer for the demo
│   │   ├── notification.ts          # Notification utilities
│   │   └── phenikaa-boundary.ts     # GeoJSON helpers
│   └── store/
│       └── useStore.ts              # Zustand global store
├── middleware.ts                    # Locale + admin route gate
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## Quick Start

```bash
# Install
pnpm install      # or npm install

# Configure env
cp .env.example .env.local
#   NEXT_PUBLIC_SITE_URL=http://localhost:3001
#   ADMIN_TOKEN=change-me

# Develop on http://localhost:3001
pnpm dev

# Production build
pnpm build && pnpm start
```

### Environment variables

| Key | Required | Description |
|-----|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical site URL (used in metadata) |
| `ADMIN_TOKEN` | required for admin | Static token issued by `/api/admin/auth` |
| `NEXT_PUBLIC_API_URL` | optional | Backend base URL when wiring real APIs |

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

### Netlify / Vercel

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

## License

MIT License — © K-Patrol / Vu Dang Khoa, 2026.
