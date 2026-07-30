# GAD NGO Platform — Full Stack Reference

> Proyecto: Global Approach To Development — Plataforma web completa
> Repositorio: https://github.com/IsmaBlehealth/ngo-platform
> Hosting: Vercel (Hobby, free) — https://ngo-platform-399q.vercel.app
> Base de datos: Neon (PostgreSQL serverless, free)
> Estado: Producción

---

## 1. STACK TECNOLÓGICO — COMPLETO

### 1.1 Frontend

| Tecnología | Versión | Propósito | Archivo clave |
|---|---|---|---|
| **Next.js** | 16.2.12 | Framework React full-stack (App Router, Turbopack) | `next.config.ts` |
| **React** | 19.2.4 | UI library | `src/components/` |
| **TypeScript** | 5.x | Tipado estático | `tsconfig.json` |
| **Tailwind CSS** | 4.x | Utilidades CSS | `src/app/globals.css` |
| **Material Symbols** | — | Iconos (Google Fonts) | `globals.css:1` |

### 1.2 Backend / Base de datos

| Tecnología | Versión | Propósito |
|---|---|---|
| **Prisma** | 7.9.0 | ORM, migraciones, generación de tipos |
| **@prisma/adapter-pg** | 7.9.0 | Driver PostgreSQL para Prisma |
| **pg** | 8.22.0 | Cliente PostgreSQL nativo (dependencia del adapter) |
| **Neon (serverless)** | — | PostgreSQL serverless, replicación, branching |
| **Prisma Client** | generado | Cliente Prisma tipado en `@/generated/prisma/client` |

### 1.3 Autenticación

| Tecnología | Versión | Propósito |
|---|---|---|
| **NextAuth.js (Auth.js v5)** | 5.0.0-beta.32 | Autenticación completa (JWT, credentials) |
| **@auth/prisma-adapter** | 2.11.3 | Persistencia de sesiones/usuarios en Prisma |
| **bcryptjs** | 3.0.3 | Hash de contraseñas |

### 1.4 Pagos

| Tecnología | Versión | Propósito |
|---|---|---|
| **Stripe** | 22.3.2 | Checkout + Webhooks (secundario) |
| **PayPal (Orders API)** | — | Método de pago principal (pendiente credenciales) |

### 1.5 Seguridad

| Tecnología / Mecanismo | Propósito |
|---|---|
| **Zod** | Validación de esquemas (servidor + cliente) |
| **isomorphic-dompurify** | Sanitización HTML (XSS) |
| **CSP Headers** | Content-Security-Policy en `next.config.ts` |
| **HSTS** | HTTP Strict Transport Security |
| **Rate Limiting** | `src/lib/rate-limit.ts` (in-memory, ver nota) |
| **CSRF Tokens** | `src/lib/csrf.ts` — tokens por sesión |
| **Honeypot** | Campo oculto anti-spam en formularios |
| **Logger** | `src/lib/logger.ts` — sanitizado, niveles |

### 1.6 Observabilidad

| Tecnología | Propósito |
|---|---|
| **Sentry** | Monitoreo de errores (DSN pendiente en Vercel) |
| **Vercel Analytics** | Analítica web |
| **Vercel Speed Insights** | Métricas Core Web Vitals |

### 1.7 Email

| Tecnología | Propósito |
|---|---|
| **Resend** | API de envío de correos transaccionales (key pendiente) |

### 1.8 Testing

| Tecnología | Propósito | Archivos |
|---|---|---|
| **Vitest** | Test runner | `vitest.config.ts` |
| **@testing-library/jest-dom** | Matchers DOM | `src/__tests__/setup.ts` |

### 1.9 Tooling / Dev

| Herramienta | Propósito |
|---|---|
| **pnpm** | Package manager |
| **ESLint** 9.x | Linter |
| **Turbopack** | Bundler de desarrollo de Next.js |
| **Git / GitHub** | Control de versiones |
| **Vercel CLI** | Deploys automatizados desde GitHub |
| **rimraf** | Limpieza de build |
| **dotenv** | Variables de entorno local |

### 1.10 Internacionalización

| Archivo | Propósito |
|---|---|
| `src/lib/i18n.ts` | 5 idiomas completos: EN, FR, ES, DE, PT |
| `src/lib/locale-context.tsx` | Provider con cookie persistente |
| `src/components/LanguageSwitcher.tsx` | Selector de idioma en UI |

### 1.11 Sistema de Diseño

| Elemento | Archivo | Descripción |
|---|---|---|
| Paleta Material | `globals.css:4-51` | Esmeralda (#006d36) / Naranja (#ff7f39) |
| Liquid Glass (6 variantes) | `globals.css:286-355` | Paneles ultra-transparentes con blur |
| Botones (3 variantes) | `globals.css:173-263` | `.btn-primary`, `.btn-secondary`, `.btn-ghost` |
| Componentes UX | `src/components/` | Ver sección 3 |

---

## 2. ARQUITECTURA DEL PROYECTO

### 2.1 Estructura de directorios

```
ngo-platform/
├── src/
│   ├── app/
│   │   ├── (public)/         # Páginas públicas
│   │   │   ├── page.tsx      # Home
│   │   │   ├── about/        # Nosotros
│   │   │   ├── programs/     # Programas (+ education)
│   │   │   ├── impact/       # Impacto
│   │   │   ├── blog/         # Blog (+ slugs)
│   │   │   ├── contact/      # Contacto
│   │   │   ├── donate/       # Donaciones (+ success)
│   │   │   ├── privacy/      # Privacidad
│   │   │   ├── terms/        # Términos
│   │   │   └── auth/         # Login, register, passwords
│   │   ├── (dashboard)/      # Panel de usuario/admin
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Layout global
│   │   ├── globals.css       # Estilos globales
│   │   ├── error.tsx         # Error boundary
│   │   ├── not-found.tsx     # Página 404
│   │   └── sitemap.ts        # Sitemap dinámico
│   ├── components/           # Componentes React
│   ├── lib/                  # Utilidades compartidas
│   │   ├── auth.ts           # Configuración NextAuth
│   │   ├── csrf.ts           # CSRF tokens
│   │   ├── env.ts            # Validación env vars
│   │   ├── i18n.ts           # Traducciones
│   │   ├── logger.ts         # Logger sanitizado
│   │   ├── prisma.ts         # Cliente Prisma singleton
│   │   ├── rate-limit.ts     # Rate limiter
│   │   ├── sanitize.ts       # DOMPurify wrapper
│   │   ├── validation.ts     # Esquemas Zod
│   │   ├── email.ts          # Resend client
│   │   ├── locale-context.tsx# Provider i18n
│   │   ├── seo.ts            # JSON-LD schemas
│   │   └── payments/         # Stripe + PayPal
│   ├── data/                 # Datos estáticos
│   └── __tests__/            # Tests unitarios
├── prisma/
│   ├── schema.prisma         # Schema DB
│   └── seed.ts               # Seed datos
├── public/images/            # Assets (hero, old-site, etc.)
└── config files              # next.config, tailwind, postcss, etc.
```

### 2.2 Data flow

```
Usuario → Next.js (Server Components RSC) → Prisma → Neon (PostgreSQL)
                ↓
          Client Components (interactividad)
                ↓
          API Routes → Validación Zod → CSRF check → Rate limit → Lógica → DB
                ↓
          Stripe/PayPal (redirect) → Webhooks → DB updates
```

### 2.3 Autenticación flow

```
Login → NextAuth credentials → bcrypt verify → JWT (24h)
  ├── Protege: dashboard/*, api/user/*, api/admin/*
  ├── CSRF: token bound to session cookie (rl_session)
  └── Rate limit: 5 intentos/15min por IP (in-memory)
```

---

## 3. COMPONENTES UX

| Componente | Archivo | Ubicación |
|---|---|---|
| BackToTop | `BackToTop.tsx` | layout.tsx global |
| ReadingProgress | `ReadingProgress.tsx` | layout.tsx global |
| Breadcrumb | `Breadcrumb.tsx` | about, programs, impact, blog, contact, donate |
| AnimatedCounter | `AnimatedCounter.tsx` | Stats (scroll reveal) |
| FAQAccordion | `FAQAccordion.tsx` | about page |
| Timeline | `Timeline.tsx` | about page |
| TestimonialsCarousel | `TestimonialsCarousel.tsx` | HomeContent |
| DonationCalculator | `DonationCalculator.tsx` | donate page |
| LoadingSkeleton | `LoadingSkeleton.tsx` | Varias páginas |
| ScrollProgress | `ScrollProgress.tsx` | Blog post detail |
| HeroCarousel | `HeroCarousel.tsx` | Home |
| FloatingDonateBar | `FloatingDonateBar.tsx` | layout.tsx |
| LanguageSwitcher | `LanguageSwitcher.tsx` | Header |
| NewsletterForm | `NewsletterForm.tsx` | Footer |

---

## 4. DEPENDENCIAS NO UTILIZADAS

Estas dependencias están en `package.json` pero **no se importan en ningún archivo fuente**. Se mantienen por ahora para referencia futura.

| Dependencia | Tipo | Razón probable | Acción recomendada |
|---|---|---|---|
| `@neondatabase/serverless` | Normal | Resto de setup anterior de Neon | No removida (puede servir para driver directo) |
| `@testing-library/react` | Dev | Se planeó pero no se implementaron tests de componentes | No removida (útil futura) |
| `@types/pg` | Dev | pg se usa transitivamente vía Prisma adapter | No removida |
| `jsr` | Normal | CLI de JSR registry, agregado experimental | No removida |
| `otplib` | Normal | Planeado para 2FA/TOTP, no implementado | No removida |
| `qrcode` | Normal | Planeado para QR de 2FA, no implementado | No removida |

**Nota**: `@neondatabase/serverless` se usaba en una versión anterior con el driver directo de Neon. Ahora usamos `@prisma/adapter-pg` que funciona con la URL estándar de PostgreSQL de Neon.

---

## 5. POSIBLES TECNOLOGÍAS FUTURAS

Basado en la arquitectura actual y necesidades del proyecto, estas son las tecnologías más probables de implementar:

### 5.1 Alta prioridad (ya planeadas)

| Tecnología | Para qué | Bloqueada por |
|---|---|---|
| **PayPal SDK** (`@paypal/paypal-js` / REST API) | Pasarela de pago principal | Dra. Ble (credenciales `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`) |
| **Resend** (ya instalado) | Emails transaccionales (reset password, bienvenida, donaciones) | `RESEND_API_KEY` en Vercel |
| **Sentry** (ya instalado) | Monitoreo proactivo de errores | `NEXT_PUBLIC_SENTRY_DSN` en Vercel |
| **Custom domain** | DNS personalizado para producción | Dra. Ble (compra/configuración de dominio) |

### 5.2 Media prioridad (mejoras de infraestructura)

| Tecnología | Para qué | Notas |
|---|---|---|
| **Upstash Redis** (o Vercel KV) | Rate limiting persistente + login lockout en serverless | Reemplazaría el `Map` en memoria de `rate-limit.ts` y `auth.ts` |
| **Resend Email Templates** | Plantillas HTML profesionales para emails | Mejora sobre texto plano actual |
| **@radix-ui/react-dialog** + **@radix-ui/react-dropdown-menu** | Diálogos y menús accesibles | Componentes headless sin estilos |
| **next-intl** o **react-intl** | i18n más robusto con ICU message format | Si la app escala a más idiomas |
| **next-sitemap** | Sitemap más avanzado con prioridades por sección | Ya tenemos sitemap.ts manual |

### 5.3 Baja prioridad (nice-to-have)

| Tecnología | Para qué |
|---|---|
| **Lucide Icons** | Alternativa SVG a Material Symbols (más liviano) |
| **Framer Motion** | Animaciones más complejas que CSS transitions |
| **TanStack Query** | Caché de datos del lado cliente |
| **Zustand** | Estado global cliente (reemplazar contextos) |
| **React Hook Form** | Manejo avanzado de formularios |
| **date-fns** | Formateo de fechas multilingüe |
| **next-themes** | Modo oscuro (requiere paleta adicional) |
| **PWA (next-pwa / service worker)** | Instalable como app, offline support |
| **i18n Routing** | Rutas traducidas (`/es/about`, `/de/ueber-uns`) |
| **Playwright / Cypress** | Tests E2E |
| **Storybook** | Catálogo de componentes aislados |
| **Knip** | Detector de código muerto |

### 5.4 Seguridad a futuro

| Tecnología | Para qué |
|---|---|
| **TOTP 2FA** (otplib + qrcode ya instalados) | Autenticación de doble factor |
| **Upstash Redis + Rate Limiting** | Rate limiting persistente (crítico en serverless) |
| **WebAuthn / Passkeys** | Autenticación sin contraseña |
| **next-safe-actions** | Server Actions tipadas con seguridad |

---

## 6. VARIABLES DE ENTORNO

```env
# Archivo: .env (NO subir a git — ver .gitignore)

# Base de datos
DATABASE_URL="postgresql://..."  # Neon PostgreSQL

# Auth
NEXTAUTH_SECRET="..."            # Generado con openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"  # Cambiar en producción

# Stripe (pendiente)
NEXT_PUBLIC_STRIPE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# PayPal (pendiente — solicitar a Dra. Ble)
PAYPAL_CLIENT_ID="..."
PAYPAL_CLIENT_SECRET="..."
PAYPAL_WEBHOOK_ID="..."

# Resend (pendiente)
RESEND_API_KEY="re_..."

# Sentry (pendiente)
NEXT_PUBLIC_SENTRY_DSN="..."

# Cron (pendiente)
CRON_SECRET="..."
```

---

## 7. ESTADO DEL PROYECTO

### 7.1 Implementado ✅

- [x] 9 páginas públicas (Home, About, Programs, Education, Impact, Blog, Contact, Donate, Privacy, Terms)
- [x] Panel de usuario con dashboard, perfil, donaciones, sesiones
- [x] Panel admin con usuarios y mensajes
- [x] Autenticación completa (registro, login, recuperación de contraseña)
- [x] 5 idiomas (EN, FR, ES, DE, PT)
- [x] Hero carousel con 7 fotos reales de GAD
- [x] 28 imágenes del antiguo sitio de GAD descargadas y en uso
- [x] Sistema Liquid Glass (6 variantes)
- [x] 10 componentes UX interactivos
- [x] Donaciones Stripe + PayPal (pending keys)
- [x] SEO: JSON-LD, sitemap, Open Graph, Twitter Cards
- [x] Seguridad: CSP, HSTS, CSRF, rate limiting, honeypot, DOMPurify, Zod
- [x] Tests unitarios: 32/32 pasando
- [x] TypeScript: limpio

### 7.2 Bloqueado 🚫

- PayPal: esperando credenciales de Dra. Ble
- Custom domain: esperando acción de Dra. Ble
- Sentry DSN: pendiente en Vercel
- CRON_SECRET: pendiente en Vercel
- Resend API key: pendiente

---

## 8. NOTAS TÉCNICAS

- **Build local**: `pnpm build` (requiere `prisma generate` previo)
- **Font**: Inter vía `next/font/google` (no se puede cargar en entornos sin internet)
- **Turbopack**: Usa `'unsafe-inline'` en CSP por limitación de Turbopack; migrar a nonce cuando sea posible
- **Rate limiting**: In-memory (`Map`) — no persiste entre deploys en serverless. Migrar a Redis/Upstash para producción seria
- **JWT**: Sin rotación automática — 24h de validez fija
- **Reset password**: Token en URL query param — mejora a POST-only en próxima iteración
