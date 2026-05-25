# Changelog — K-Patrol Web Commerce

All notable changes to this repository are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project follows
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Planned
- Stripe / VNPay / MoMo checkout
- Real Postgres-backed data store (currently in-memory)
- Email confirmation flow for inquiries + newsletter
- Blog / case study CMS (MDX)
- Multi-tenant catalogue (per-distributor pricing + branding)

## [1.0.0] — 2026-05-25

Graduation-thesis release: the public storefront for the K-Patrol V10 prototype demo.

### Added

#### Alert proof gallery
- `public/alert/frame_003105.jpg` + `frame_003847.jpg`: real detection snapshots
  captured by the deployed Pi controller, used as visual proof on the product
  page (and mirrored to `mobile-app/public/alerts/` for in-PWA placeholders).

#### Newsletter signup
- `POST /api/newsletter`: lightweight email subscribe endpoint backed by the
  local data-store, rate-limited, no third-party SaaS dependency.
- New `newsletter` table added to `data-store.ts`.

#### Inquiries hardening
- `/api/inquiries[/:id]`: trims fields, rejects non-Vietnamese phone formats,
  returns localized error messages, and notifies `ADMIN_NOTIFY_EMAIL` on each
  new submission.

#### UI polish
- `Footer`: legal block + social links + contact email.
- `Navbar`: condensed menu + sticky shadow at scroll.
- `CTASection` / `ContactCTASection`: aligned with the new product positioning
  (commercial security robot, indoor patrol).
- `next.config.js`: image domains added for the alert sample photos.
- `.env.example`: `NEWSLETTER_FROM` + `ADMIN_NOTIFY_EMAIL` placeholders.

#### i18n
- Refreshed CTA + newsletter copy across `en.json` and `vi.json`.

### Changed

- Contact placeholder name corrected to Vu Dang Khoa (pre-existing typo).
- Robot gallery: added back / right / top / left views to the product gallery.

---

[Unreleased]: https://github.com/KPatrol/KPatrol_WebCommerce/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/KPatrol/KPatrol_WebCommerce/releases/tag/v1.0.0
