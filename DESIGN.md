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

## Color Palette (Material Liquid Glass — updated)

### Primary (Emerald)
- **Primary**: `#006d36` — Dark emerald, headings, primary buttons, footer
- **Primary Light**: `#50c878` — Emerald, primary container, icons, highlights
- **Primary Fixed**: `#83fba5` — Bright mint for glows and accents
- **Primary Fixed Dim**: `#66dd8b` — Soft mint
- **On Primary**: `#ffffff` — Text/icons on primary backgrounds

### Accent (Vibrant Orange)
- **Accent**: `#ff7f39` — CTA buttons, badges, highlights
- **Accent Light**: `#ffb693` — Light orange, hover glows
- **Accent Dark**: `#a04100` — Deep orange/brown, active states
- **Secondary Container**: `#ff7f39` — Same as accent
- **Secondary Fixed**: `#ffdbcc` — Soft peach backgrounds

### Tertiary
- **Tertiary**: `#46664d` — Muted forest green
- **Tertiary Container**: `#97ba9d` — Sage green

### Neutral / Surface
- **Background**: `#faf9f6` — Warm off-white page background
- **Surface**: `#faf9f6` — Card/surface backgrounds
- **Surface Container**: `#efeeeb` — Slightly darker sections
- **Surface Container High**: `#e9e8e5` — Elevated surfaces
- **Surface Variant**: `#e3e2e0` — Subtle backgrounds, progress bars
- **Foreground**: `#1a1c1a` — Near-black text
- **On Surface**: `#1a1c1a` — Text on light surfaces
- **On Surface Variant**: `#3e4a3f` — Secondary text
- **Muted**: `#6e7a6e` — Gray-green for muted text
- **Outline**: `#6e7a6e` — Borders
- **Outline Variant**: `#bdcabc` — Subtle borders

### Inverse (Dark surfaces)
- **Inverse Surface**: `#2f312f` — Dark section backgrounds
- **Inverse On Surface**: `#f2f1ee` — Text on dark surfaces
- **Inverse Primary**: `#66dd8b` — Accent on dark surfaces

### Semantic
- **Success**: `#2a9d8f` — Teal green for confirmations
- **Warm**: `#ffdbcc` — Light peach for highlights
- **Error**: `#ba1a1a` — Red for errors
- **Error Container**: `#ffdad6` — Light red backgrounds

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
- **Brand Gradient**: `linear-gradient(135deg, #006d36 0%, #ff7f39 100%)` — stat numbers, hero title, primary CTAs
- **Hero Overlay**: `linear-gradient(135deg, rgba(0,66,37,0.78) 0%, rgba(0,109,54,0.75) 50%, rgba(0,66,37,0.6) 100%)`
- **Hero Bottom**: `from-black/60 via-transparent to-black/10`
- **Section Separator**: Diagonal SVG cuts between sections
- **Card Gradient**: `from-primary-dark via-primary-dark/40 to-transparent`
- **Orange Glow**: `radial-gradient(circle, rgba(255,127,57,0.15) 0%, transparent 70%)`

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

### Liquid Glass Effect (iPhone-style)
- **Philosophy**: Maximum transparency, deep blur, barely-visible borders
- **liquid-glass**: `rgba(255,255,255,0.04)` background, `blur(60px)`, top/left white borders at 0.12/0.05
- **glass-max**: `rgba(255,255,255,0.06)` background, `blur(80px)`, top/left white borders at 0.2/0.1
- **glass-card**: `rgba(255,255,255,0.75)` background, `blur(24px)`, white border at 0.25
- **glass-nav**: `rgba(250,249,246,0.72)` background, `blur(30px)`, primary border at 0.08
- **glass-dark**: `rgba(0,66,37,0.75)` background, `blur(30px)`, white border at 0.08
- **Shadows**: ultra-soft `0 20px 60px rgba(0,0,0,0.04)` and `0 40px 80px rgba(0,0,0,0.03)`

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
