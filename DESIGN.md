# DESIGN.md — Global Approach To Development

## Brand Identity
- **Organization**: Global Approach To Development (GAD)
- **Type**: 501(c)(3) Nonprofit Organization
- **Founded**: 2014
- **EIN**: 47-2155496
- **Location**: Ontario, California, USA
- **Founder**: Dr. Keuleya Ruth Ble MD MPH

## Mission
Building sustainable futures through clean water, education, and healthcare in communities across Africa and Latin America.

## Programs
1. **Clean Water Initiative** — Sustainable water systems, 50K+ lives changed, 75% disease reduction
2. **Education & Scholarships** — Schools in Côte d'Ivoire and Mali, 332 students, 99% passing rate
3. **Healthcare Programs** — Mobile health clinics, 15K+ patients treated

## Color Palette

### Primary
- **Primary Dark**: `#0f2137` — Deep navy, used for hero backgrounds, footer, text
- **Primary**: `#1e3a5f` — Rich navy, headings, buttons
- **Primary Light**: `#2d5a8e` — Accent blue, links, hover states

### Accent
- **Accent**: `#e8a838` — Warm gold, CTAs, badges, highlights
- **Accent Light**: `#f0c060` — Light gold, hover states
- **Accent Dark**: `#d4922a` — Deep gold, active states

### Neutral
- **Background**: `#ffffff` — Clean white
- **Foreground**: `#1a1a2e` — Near-black text
- **Muted**: `#6b7280` — Gray for secondary text
- **Slate 50**: `#f8fafc` — Light gray sections

### Semantic
- **Success**: `#059669` — Green for confirmations
- **Warm**: `#fef3c7` — Light yellow for highlights

## Typography

### Font Family
- **Primary**: Inter (Google Fonts) — Clean, modern, highly readable
- **Weight Range**: 400 (body), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)

### Type Scale
- **Hero Title**: 5.5rem / 800-900 weight / line-height 1.05 / tight tracking
- **Section Title**: 3rem-3.75rem / 800-900 weight / line-height 1.1
- **Subtitle**: 1.125rem / 400 weight / line-height 1.7
- **Body**: 1rem / 400 weight / line-height 1.7
- **Micro Header**: 0.75rem / 700 weight / uppercase / tracking 0.2em
- **Stat Number**: Gradient text (accent colors) / 900 weight

### Typography Rules
- Titles use `text-tight` (line-height: 1.1)
- Body text uses `text-relaxed` (line-height: 1.8)
- Micro headers are always uppercase with wide tracking
- Stat numbers use gradient text effect

## Spacing & Layout

### Grid
- **Max Width**: 1280px (7xl)
- **Content Width**: 1152px (6xl) for stats
- **Padding**: 1rem mobile, 1.5rem tablet, 2rem desktop

### Section Spacing
- **Between sections**: 4rem-6rem
- **Card padding**: 2rem-2.5rem
- **Component gap**: 1rem-1.5rem

## Components

### Buttons
- **Primary**: Rounded-full, accent background, white text, shadow-lg, hover lift
- **Secondary**: Rounded-full, border-2, primary text, transparent background
- **Arrow**: SVG arrow slides right on hover

### Cards
- **Depth**: Double-layer shadow (short intense + long diffuse)
- **Hover**: translateY(-6px) with spring easing
- **Border**: 1px rgba(0,0,0,0.04)
- **Border Radius**: 1rem (rounded-2xl)

### Badges/Labels
- **Micro Header**: Uppercase, wide tracking, accent color
- **Stat Badge**: Gradient text, large font
- **Role Badge**: Colored background with rounded-full

## Visual Effects

### Gradients
- **Hero Overlay**: `from-black/85 via-black/50 to-black/10` (left to right)
- **Hero Bottom**: `from-black/60 via-transparent to-black/10`
- **Section Separator**: Diagonal SVG cuts between sections
- **Card Gradient**: `from-primary-dark via-primary-dark/40 to-transparent`

### Animations
- **Scroll Reveal**: Fade up 40px with 0.8s cubic-bezier(0.16, 1, 0.3, 1)
- **Ken Burns**: Slow zoom 1.0 → 1.08 over 8s on hero images
- **Crossfade**: 1.2s opacity transition between carousel slides
- **Float**: 6s infinite up/down animation for badges
- **Hover Lift**: translateY(-2px) on buttons, translateY(-6px) on cards

### Shadows
- **Card**: `0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06), 0 20px 40px -8px rgba(0,0,0,0.08)`
- **Glow**: `0 0 40px rgba(232,168,56,0.15)` (accent glow)
- **Primary**: `0 10px 40px -10px rgba(30,58,95,0.3)`

### Glass Effect
- **Background**: `rgba(255,255,255,0.08)` or `rgba(15,33,55,0.85)`
- **Blur**: 16-20px backdrop-blur
- **Border**: 1px solid rgba(255,255,255,0.1-0.15)

## Layout Patterns

### Bento Grid
- Asymmetric card layout
- Main card: 2x2 (spans 2 columns, 2 rows)
- Secondary cards: 1x1
- Gap: 1rem

### Overlapping Elements
- Stats bar overlaps hero section (margin-top: -3rem or -5rem)
- Floating stat cards overlap image cards
- Z-index management for layering

### Section Separators
- Diagonal SVG cuts between sections (alternating direction)
- Wave divider at hero bottom
- No horizontal lines

## Photography Style
- Real photos from projects in Côte d'Ivoire and Mali
- Children in classrooms, schools, sports activities
- Community gatherings, water projects
- Warm, authentic, documentary style
- High contrast with gradient overlays for text legibility

## Mood & Tone
- **Professional** but approachable
- **Hopeful** and empowering
- **Clean** and modern
- **Trustworthy** and transparent
- **Action-oriented** with clear CTAs

## Voice
- Direct and clear
- Impact-focused (numbers, statistics)
- Community-centered
- Empowering, not pitying
- Bilingual-ready (English primary, French for Côte d'Ivoire/Mali content)

## Page Structure Patterns

### Hero Section
- Full viewport height (100vh)
- Background image with Ken Burns effect
- Gradient overlay for text legibility
- Micro label → Title → Subtitle → CTA buttons
- Wave divider at bottom
- Overlapping stats bar

### Content Sections
- Alternating layouts (image left/text right, then reverse)
- Floating stat cards overlapping images
- Bento grid for program cards
- Diagonal SVG separators between sections

### Footer
- 4-column grid on desktop
- Social media icons
- Contact info bar
- Copyright with privacy link
