# Global Approach To Development — NGO Platform

A full-featured web platform for [Global Approach To Development (GAD)](https://ngo-platform-399q.vercel.app), a 501(c)(3) nonprofit organization dedicated to building sustainable futures through education, clean water, and healthcare in communities across Africa and Latin America.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + Liquid Glass design system
- **Database:** Neon (PostgreSQL serverless) + Prisma 7 ORM
- **Auth:** NextAuth.js v5 (JWT, credentials)
- **Payments:** Stripe + PayPal (pending)
- **i18n:** 5 languages (EN, FR, ES, DE, PT)
- **Testing:** Vitest

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features

- **9 public pages** — Home, About, Programs, Education, Impact, Blog, Contact, Donate, Privacy, Terms
- **User dashboard** — Profile, donation history, sessions management
- **Admin panel** — User and message management
- **Full authentication** — Register, login, password recovery with CSRF protection
- **Internationalization** — 5 languages with persistent cookie-based locale
- **Liquid Glass design** — iPhone-style frosted glass UI with emerald/orange palette
- **Security** — CSP, HSTS, CSRF tokens, rate limiting, honeypot, DOMPurify, Zod validation
- **SEO** — JSON-LD schemas, dynamic sitemap, Open Graph, Twitter Cards

## Environment Variables

Copy `.env.example` (or see `STACK.md` for full reference). Required vars:

```
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm test` | Run tests |
| `pnpm lint` | Run ESLint |

## Architecture

```
src/
├── app/          # Pages (public + dashboard) + API routes
├── components/   # React components
├── lib/          # Utilities (auth, csrf, i18n, prisma, validation, etc.)
├── data/         # Static data
└── __tests__/    # Unit tests
```

## License

Proprietary — GAD Organization
