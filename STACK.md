# GAD NGO Platform — Full Stack Reference

> **Project:** Global Approach To Development — Full-featured web platform
> **Repository:** https://github.com/IsmaBlehealth/ngo-platform
> **Hosting:** Vercel (Hobby, free) — https://ngo-platform-399q.vercel.app
> **Database:** Neon (PostgreSQL serverless, free)
> **Status:** Production

---

## 1. TECH STACK — COMPLETE

### 1.1 Frontend

| Technology | Version | Purpose | Key file |
|---|---|---|---|
| **Next.js** | 16.2.12 | Full-stack React framework (App Router, Turbopack) | `next.config.ts` |
| **React** | 19.2.4 | UI library | `src/components/` |
| **TypeScript** | 5.x | Static typing | `tsconfig.json` |
| **Tailwind CSS** | 4.x | CSS utilities | `src/app/globals.css` |
| **Material Symbols** | — | Icons (Google Fonts) | `globals.css:1` |

### 1.2 Backend / Database

| Technology | Version | Purpose |
|---|---|---|
| **Prisma** | 7.9.0 | ORM, migrations, type generation |
| **@prisma/adapter-pg** | 7.9.0 | PostgreSQL driver for Prisma |
| **pg** | 8.22.0 | Native PostgreSQL client (adapter dependency) |
| **Neon (serverless)** | — | Serverless PostgreSQL, replication, branching |
| **Prisma Client** | generated | Typed Prisma client at `@/generated/prisma/client` |

### 1.3 Authentication

| Technology | Version | Purpose |
|---|---|---|
| **NextAuth.js (Auth.js v5)** | 5.0.0-beta.32 | Full authentication (JWT, credentials) |
| **@auth/prisma-adapter** | 2.11.3 | Session/user persistence via Prisma |
| **bcryptjs** | 3.0.3 | Password hashing |

### 1.4 Payments

| Technology | Version | Purpose |
|---|---|---|
| **Stripe** | 22.3.2 | Checkout + Webhooks (secondary) |
| **PayPal (Orders API)** | — | Primary payment method (credentials pending) |

### 1.5 Security

| Technology / Mechanism | Purpose |
|---|---|
| **Zod** | Schema validation (server + client) |
| **isomorphic-dompurify** | HTML sanitization (XSS) |
| **CSP Headers** | Content-Security-Policy in `next.config.ts` |
| **HSTS** | HTTP Strict Transport Security |
| **Rate Limiting** | `src/lib/rate-limit.ts` (in-memory, see note) |
| **CSRF Tokens** | `src/lib/csrf.ts` — session-bound tokens |
| **Honeypot** | Hidden anti-spam field in forms |
| **Logger** | `src/lib/logger.ts` — sanitized, leveled |

### 1.6 Observability

| Technology | Purpose |
|---|---|
| **Sentry** | Error monitoring (DSN pending in Vercel) |
| **Vercel Analytics** | Web analytics |
| **Vercel Speed Insights** | Core Web Vitals metrics |

### 1.7 Email

| Technology | Purpose |
|---|---|
| **Resend** | Transactional email API (key pending) |

### 1.8 Testing

| Technology | Purpose | Files |
|---|---|---|
| **Vitest** | Test runner | `vitest.config.ts` |
| **@testing-library/jest-dom** | DOM matchers | `src/__tests__/setup.ts` |

### 1.9 Tooling / Dev

| Tool | Purpose |
|---|---|
| **pnpm** | Package manager |
| **ESLint** 9.x | Linter |
| **Turbopack** | Next.js dev bundler |
| **Git / GitHub** | Version control |
| **Vercel CLI** | Automated deploys from GitHub |
| **rimraf** | Build cleanup |
| **dotenv** | Local environment variables |

### 1.10 Internationalization

| File | Purpose |
|---|---|
| `src/lib/i18n.ts` | 5 full languages: EN, FR, ES, DE, PT |
| `src/lib/locale-context.tsx` | Provider with persistent cookie |
| `src/components/LanguageSwitcher.tsx` | Language selector in UI |

### 1.11 Design System

| Element | File | Description |
|---|---|---|
| Material palette | `globals.css:4-51` | Emerald (#006d36) / Orange (#ff7f39) |
| Liquid Glass (6 variants) | `globals.css:286-355` | Ultra-transparent panels with blur |
| Buttons (3 variants) | `globals.css:173-263` | `.btn-primary`, `.btn-secondary`, `.btn-ghost` |
| UX Components | `src/components/` | See section 3 |

---

## 2. PROJECT ARCHITECTURE

### 2.1 Directory structure

```
ngo-platform/
├── src/
│   ├── app/
│   │   ├── (public)/         # Public pages
│   │   │   ├── page.tsx      # Home
│   │   │   ├── about/        # About
│   │   │   ├── programs/     # Programs (+ education)
│   │   │   ├── impact/       # Impact
│   │   │   ├── blog/         # Blog (+ slugs)
│   │   │   ├── contact/      # Contact
│   │   │   ├── donate/       # Donations (+ success)
│   │   │   ├── privacy/      # Privacy
│   │   │   ├── terms/        # Terms
│   │   │   └── auth/         # Login, register, passwords
│   │   ├── (dashboard)/      # User/admin dashboard
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Global layout
│   │   ├── globals.css       # Global styles
│   │   ├── error.tsx         # Error boundary
│   │   ├── not-found.tsx     # 404 page
│   │   └── sitemap.ts        # Dynamic sitemap
│   ├── components/           # React components
│   ├── lib/                  # Shared utilities
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── csrf.ts           # CSRF tokens
│   │   ├── env.ts            # Env vars validation
│   │   ├── i18n.ts           # Translations
│   │   ├── logger.ts         # Sanitized logger
│   │   ├── prisma.ts         # Prisma client singleton
│   │   ├── rate-limit.ts     # Rate limiter
│   │   ├── sanitize.ts       # DOMPurify wrapper
│   │   ├── validation.ts     # Zod schemas
│   │   ├── email.ts          # Resend client
│   │   ├── locale-context.tsx# i18n Provider
│   │   ├── seo.ts            # JSON-LD schemas
│   │   └── payments/         # Stripe + PayPal
│   ├── data/                 # Static data
│   └── __tests__/            # Unit tests
├── prisma/
│   ├── schema.prisma         # DB schema
│   └── seed.ts               # Seed data
├── public/images/            # Assets (hero, old-site, etc.)
└── config files              # next.config, tailwind, postcss, etc.
```

### 2.2 Data flow

```
User → Next.js (Server Components RSC) → Prisma → Neon (PostgreSQL)
                ↓
          Client Components (interactivity)
                ↓
          API Routes → Zod validation → CSRF check → Rate limit → Logic → DB
                ↓
          Stripe/PayPal (redirect) → Webhooks → DB updates
```

### 2.3 Authentication flow

```
Login → NextAuth credentials → bcrypt verify → JWT (24h)
  ├── Protects: dashboard/*, api/user/*, api/admin/*
  ├── CSRF: token bound to session cookie (rl_session)
  └── Rate limit: 5 attempts/15min per IP (in-memory)
```

---

## 3. UX COMPONENTS

| Component | File | Location |
|---|---|---|
| BackToTop | `BackToTop.tsx` | layout.tsx global |
| ReadingProgress | `ReadingProgress.tsx` | layout.tsx global |
| Breadcrumb | `Breadcrumb.tsx` | about, programs, impact, blog, contact, donate |
| AnimatedCounter | `AnimatedCounter.tsx` | Stats (scroll reveal) |
| FAQAccordion | `FAQAccordion.tsx` | about page |
| Timeline | `Timeline.tsx` | about page |
| TestimonialsCarousel | `TestimonialsCarousel.tsx` | HomeContent |
| DonationCalculator | `DonationCalculator.tsx` | donate page |
| LoadingSkeleton | `LoadingSkeleton.tsx` | Various pages |
| ScrollProgress | `ScrollProgress.tsx` | Blog post detail |
| HeroCarousel | `HeroCarousel.tsx` | Home |
| FloatingDonateBar | `FloatingDonateBar.tsx` | layout.tsx |
| LanguageSwitcher | `LanguageSwitcher.tsx` | Header |
| NewsletterForm | `NewsletterForm.tsx` | Footer |

---

## 4. UNUSED DEPENDENCIES

These packages are in `package.json` but **not imported anywhere in source**. Kept for future reference.

| Dependency | Type | Likely reason | Recommended action |
|---|---|---|---|
| `@neondatabase/serverless` | Normal | Leftover from earlier Neon driver setup | Keep (may be useful for direct driver) |
| `@testing-library/react` | Dev | Planned but component tests not written yet | Keep (useful future) |
| `@types/pg` | Dev | pg used transitively via Prisma adapter | Keep |
| `jsr` | Normal | JSR CLI registry, experimental addition | Keep |
| `otplib` | Normal | Planned for 2FA/TOTP, not implemented | Keep |
| `qrcode` | Normal | Planned for 2FA QR codes, not implemented | Keep |

**Note**: `@neondatabase/serverless` was used in an earlier version with the direct Neon driver. Now using `@prisma/adapter-pg` with standard Neon PostgreSQL URL.

---

## 5. FUTURE TECHNOLOGIES

Based on current architecture and project needs, these are the most likely technologies to be implemented:

### 5.1 High priority (already planned)

| Technology | Purpose | Blocked by |
|---|---|---|
| **PayPal SDK** (`@paypal/paypal-js` / REST API) | Primary payment gateway | Dra. Ble (credentials `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`) |
| **Resend** (already installed) | Transactional emails (reset password, welcome, donations) | `RESEND_API_KEY` in Vercel |
| **Sentry** (already installed) | Proactive error monitoring | `NEXT_PUBLIC_SENTRY_DSN` in Vercel |
| **Custom domain** | Custom DNS for production | Dra. Ble (domain purchase/configuration) |

### 5.2 Medium priority (infrastructure improvements)

| Technology | Purpose | Notes |
|---|---|---|
| **Upstash Redis** (or Vercel KV) | Persistent rate limiting + login lockout in serverless | Would replace in-memory `Map` in `rate-limit.ts` and `auth.ts` |
| **Resend Email Templates** | Professional HTML email templates | Improvement over current plain text |
| **@radix-ui/react-dialog** + **@radix-ui/react-dropdown-menu** | Accessible dialogs and menus | Headless unstyled components |
| **next-intl** or **react-intl** | More robust i18n with ICU message format | If app scales to more languages |
| **next-sitemap** | Advanced sitemap with per-section priorities | Already have manual sitemap.ts |

### 5.3 Low priority (nice-to-have)

| Technology | Purpose |
|---|---|
| **Lucide Icons** | SVG alternative to Material Symbols (lighter) |
| **Framer Motion** | More complex animations than CSS transitions |
| **TanStack Query** | Client-side data caching |
| **Zustand** | Client global state (replace contexts) |
| **React Hook Form** | Advanced form handling |
| **date-fns** | Multi-language date formatting |
| **next-themes** | Dark mode (requires additional palette) |
| **PWA (next-pwa / service worker)** | Installable app, offline support |
| **i18n Routing** | Translated routes (`/es/about`, `/de/ueber-uns`) |
| **Playwright / Cypress** | E2E tests |
| **Storybook** | Isolated component catalog |
| **Knip** | Dead code detection |

### 5.4 Future security

| Technology | Purpose |
|---|---|
| **TOTP 2FA** (otplib + qrcode already installed) | Two-factor authentication |
| **Upstash Redis + Rate Limiting** | Persistent rate limiting (critical in serverless) |
| **WebAuthn / Passkeys** | Passwordless authentication |
| **next-safe-actions** | Typed secure Server Actions |

---

## 6. ENVIRONMENT VARIABLES

```env
# File: .env (DO NOT commit to git — see .gitignore)

# Database
DATABASE_URL="postgresql://..."  # Neon PostgreSQL

# Auth
NEXTAUTH_SECRET="..."            # Generated with openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"  # Change in production

# Stripe (pending)
NEXT_PUBLIC_STRIPE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# PayPal (pending — ask Dra. Ble)
PAYPAL_CLIENT_ID="..."
PAYPAL_CLIENT_SECRET="..."
PAYPAL_WEBHOOK_ID="..."

# Resend (pending)
RESEND_API_KEY="re_..."

# Sentry (pending)
NEXT_PUBLIC_SENTRY_DSN="..."

# Cron (pending)
CRON_SECRET="..."
```

---

## 7. PROJECT STATUS

### 7.1 Implemented ✅

- [x] 9 public pages (Home, About, Programs, Education, Impact, Blog, Contact, Donate, Privacy, Terms)
- [x] User dashboard with profile, donations, sessions
- [x] Admin panel with users and messages
- [x] Full authentication (register, login, password recovery)
- [x] 5 languages (EN, FR, ES, DE, PT)
- [x] Hero carousel with 7 real GAD photos
- [x] 28 images from old GAD site downloaded and in use
- [x] Liquid Glass system (6 variants)
- [x] 10 interactive UX components
- [x] Stripe + PayPal donations (pending keys)
- [x] SEO: JSON-LD, sitemap, Open Graph, Twitter Cards
- [x] Security: CSP, HSTS, CSRF, rate limiting, honeypot, DOMPurify, Zod
- [x] Unit tests: 32/32 passing
- [x] TypeScript: clean

### 7.2 Blocked 🚫

- PayPal: waiting for credentials from Dra. Ble
- Custom domain: waiting for action from Dra. Ble
- Sentry DSN: pending in Vercel
- CRON_SECRET: pending in Vercel
- Resend API key: pending

---

## 8. TECHNICAL NOTES

- **Local build**: `pnpm build` (requires `prisma generate` first)
- **Font**: Inter via `next/font/google` (unavailable in offline environments)
- **Turbopack**: Uses `'unsafe-inline'` in CSP due to Turbopack limitation; migrate to nonce when possible
- **Rate limiting**: In-memory (`Map`) — does not persist between serverless deploys. Migrate to Redis/Upstash for production
- **JWT**: No automatic rotation — fixed 24h validity
- **Reset password**: Token in URL query param — upgrade to POST-only in next iteration
