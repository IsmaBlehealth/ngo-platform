# Stitch Prompts — Global Approach To Development

> **How to use**: Open stitch.withgoogle.com → Experimental Mode → Paste each prompt → Refine with follow-ups → Export HTML/CSS → Send results to me for implementation.

> **Design system reference**: The DESIGN.md file in this repo contains all colors, typography, and component patterns. Reference it when pasting into Stitch.

---

## PROMPT 1: HOMEPAGE HERO CAROUSEL

```
Design a full-screen hero carousel for a nonprofit NGO website called "Global Approach To Development" (GAD). This is the most important section of the entire site — it must feel cinematic, hopeful, and world-class.

LAYOUT:
- Full viewport height (100vh), overflow hidden
- Background: Real photo of African children in a classroom (warm, authentic, documentary style)
- The photo should have a slow Ken Burns zoom effect (scale 1.0 to 1.08 over 8 seconds)

GRADIENT OVERLAY (critical for text readability):
- Left-to-right: black/85 → black/50 → black/10 (text sits on the dark left side, photo shows through on the right)
- Bottom-to-top: black/60 → transparent → black/10
- This creates a cinematic "spotlight" effect where the left third is dark enough for white text

TEXT CONTENT (left-aligned, max-width 680px):
1. MICRO LABEL (top): Small rounded-full pill badge in gold (#e8a838) with a tiny white pulsing dot. Text: "GLOBAL APPROACH TO DEVELOPMENT" in uppercase, letter-spacing 0.2em, font-size 12px, font-weight 700.

2. MAIN TITLE: "Every Child Deserves a Future" in white, font-size 80px on desktop (5.5rem), font-weight 900, line-height 1.05. Apply text-shadow: 0 2px 10px rgba(0,0,0,0.6), 0 4px 30px rgba(0,0,0,0.4). This must be HUGE and commanding.

3. SUBTITLE: "Building sustainable futures through education, clean water, and healthcare in communities across Africa." in white/95 opacity, font-size 18px, line-height 1.7, max-width 520px. Apply text-shadow: 0 1px 6px rgba(0,0,0,0.5).

4. CTA BUTTONS (horizontal row):
   - Primary: "Donate Now" — rounded-full, gold background (#e8a838), white text, 14px bold, padding 16px 32px, shadow-xl. Include a small arrow icon (→) that slides right 4px on hover.
   - Secondary: "Learn More" — rounded-full, 2px white/40 border, white/10 background with backdrop-blur, white text, same padding.

CONTROLS:
- Bottom center: Dot indicators in a dark pill container (bg-black/40, backdrop-blur-md, rounded-full). 7 dots total, each 8px wide. Active dot is gold (#e8a838) and 32px wide. Inactive dots are white/50.
- Bottom right: Slide counter "01 / 07" in dark pill, font-size 12px, font-weight 700, white/80.
- Desktop arrows: Left/right chevron buttons, circular (bg-black/40, backdrop-blur-md), positioned at vertical center, hidden on mobile.

BOTTOM EDGE: White wave SVG divider connecting hero to the next section.

BELOW HERO: A white stats bar that overlaps the hero by -3rem (negative margin). Contains 4 stats in a row: "2014 Founded", "100K+ Lives Impacted", "3 Countries", "99% Passing Rate". Each stat has a gradient gold number (font-size 36px, font-weight 900) and gray label.

MOOD: Cinematic, hopeful, premium NGO. Think Save The Children meets Apple aesthetic. The photo should feel authentic, not stock.

COLORS: Primary navy #1e3a5f, accent gold #e8a838, backgrounds #0f2137 (dark) and #ffffff (light).
```

**Follow-up prompts for this screen:**
```
- "Make the title even larger, at least 90px on desktop"
- "Add a subtle glass effect to the dot indicator container"
- "Make the donate button glow slightly with the gold accent color"
- "Add a faint grid pattern texture to the dark gradient overlay"
```

---

## PROMPT 2: PROGRAMS BENTO GRID

```
Design a programs section for a nonprofit website showing 3 core programs in an asymmetric bento grid layout.

SECTION HEADER:
- Gold micro-header: "WHAT WE DO" (uppercase, tracking 0.2em, font-size 12px)
- Huge navy title: "Our Programs" (font-size 48px, font-weight 900, line-height 1.1)
- Gray subtitle: "We work across three core areas to create lasting change in communities worldwide." (font-size 16px, muted gray, centered, max-width 640px)

BENTO GRID (3 columns, asymmetric):
- LEFT (spans 2 columns, 2 rows — the LARGEST card): "Clean Water Initiative"
  - Full-bleed photo of a water project in Africa
  - Gradient overlay from bottom (transparent → dark)
  - Bottom-left content: Gold micro-header "LIVES CHANGED", huge gold stat "50K+" (font-size 48px), title "Clean Water Initiative" (font-size 24px, white, bold), description (2 lines, white/70)
  - "Learn More →" link in gold with arrow that slides right on hover
  - Card has rounded-2xl corners, double-layer shadow

- TOP RIGHT (1 column, 1 row): "Education & Scholarships"
  - Photo of children in classroom
  - Same gradient treatment
  - Gold stat "332", label "Students Enrolled", title "Education & Scholarships"
  - "Explore →" link

- BOTTOM RIGHT (1 column, 1 row): "Healthcare Programs"
  - Photo of mobile health clinic
  - Gold stat "15K+", label "Patients Treated", title "Healthcare Programs"
  - "Explore →" link

INTERACTION:
- On hover: Image zooms to 1.08x slowly (8s transition), card lifts up 6px with spring easing
- Cards have a very subtle 1px border at rgba(0,0,0,0.04)
- Shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06), 0 20px 40px -8px rgba(0,0,0,0.08)

STYLE: Asymmetric, organic feel — NOT a boring 3-column equal grid. The main card should dominate. Think editorial magazine layout meets modern web design.
```

---

## PROMPT 3: ABOUT PAGE — FOUNDER + WHERE WE WORK

```
Design an About page for "Global Approach To Development" that tells the story of the organization and its founder.

HERO SECTION:
- Full viewport with background photo of a community gathering in West Africa
- Dark gradient overlay (same cinematic style as homepage)
- Gold micro-header: "WHO WE ARE"
- Title: "Empowering Communities" (huge white, 64px) with line break, then "Since 2014" in gradient gold text
- Subtitle about the mission

FOUNDER SECTION (two columns):
- LEFT COLUMN: 
  - Photo of Dr. Keuleya Ruth Ble in a rounded-2xl card with overflow hidden
  - Floating gold badge overlapping the top-right corner: "10+" in huge text, "Years" below, with a float animation (moves up and down 10px over 6s)
  - The card has a double-layer shadow

- RIGHT COLUMN:
  - Gold micro-header: "OUR FOUNDER"
  - Name: "Dr. Keuleya Ruth Ble" in navy, 36px, font-weight 800
  - Credentials: "MD, MPH" in gold
  - Bio paragraphs about founding GAD in 2014, commitment to sustainable solutions
  - A quote in italics: "Every child deserves access to clean water, education, and healthcare."
  - "Learn More About Us →" button

WHERE WE WORK SECTION:
- Section title: "Where We Work" in navy
- Three image cards in a row:
  1. Côte d'Ivoire: Photo of school, overlay text "332 Students", "99% Passing Rate"
  2. Mali: Photo of village, overlay text "3 Villages", "Sikasso Region"  
  3. Ontario CA: Photo of office/building, overlay text "Headquarters", "Global Operations"
- Each card has gradient overlay, rounded-2xl, hover zoom effect

SEPARATORS: Diagonal SVG cuts between sections (alternating direction). One section has a light gray (#f8fafc) background with subtle dot pattern.
```

---

## PROMPT 4: DONATE PAGE — PAYMENT FORM

```
Design a donation page for "Global Approach To Development" that maximizes conversions and trust.

HERO:
- Background photo of smiling children with dark gradient overlay
- Gold micro-header: "MAKE A DIFFERENCE"
- Title: "Your Donation" (64px white) + line break + "Changes Lives" in gradient gold
- Subtitle: "100% of your donation goes directly to our programs. No administrative fees."

DONATION FORM (centered white card, max-width 800px, rounded-2xl, double-layer shadow):

AMOUNT SELECTOR:
- Row of 5 quick-select buttons: $25, $50, $100, $250, $500
- Each button: rounded-full, 2px border (gray when inactive, gold when active), white background
- Active state: gold background, white text, shadow-glow
- Below: "Or enter custom amount" with dollar sign input field
- Selected amount shows a large gold number above the form

YOUR IMPACT SIDEBAR (right side on desktop, below on mobile):
- Title: "Your Impact" in navy
- Impact cards showing what each amount provides:
  - $25 = "School supplies for one student for a full year" + small icon
  - $50 = "Clean water access for a family for one year" + small icon
  - $100 = "Medical supplies for a mobile clinic visit" + small icon
  - $250 = "Full scholarship for one student for a semester" + small icon
- Each card has a small gold accent and clean icon

PAYMENT METHOD:
- Two tabs: "💳 Card" and "PayPal" 
- Card tab shows: Card number, Expiry date, CVC, Name on card
- PayPal tab shows: PayPal button with PayPal blue (#0070ba)
- Small lock icon + "Secure payment" text near the submit button

SUBMIT:
- Full-width gold button: "Donate $100" (amount updates dynamically)
- Below: "🔒 Encrypted & Secure" in small gray text

TRUST SIGNALS:
- Below form: "501(c)(3) Nonprofit | EIN: 47-2155496"
- "Tax-deductible donation" note
- Small logos of payment providers

STYLE: Clean, trustworthy, conversion-optimized. The form should feel safe and professional. Use warm gold (#e8a838) for CTAs, clean white card on light gray (#f8fafc) background.
```

---

## PROMPT 5: IMPACT PAGE — DATA VISUALIZATION

```
Design an Impact page for "Global Approach To Development" that showcases real results with powerful data visualization.

HERO:
- Full viewport with background photo of community impact
- Dark gradient overlay
- Gold micro-header: "REAL RESULTS"
- Title: "Our Impact" in huge white text (64px)

IMPACT NUMBERS (full-width section, dark navy background):
- 6 large stats in a 3x2 grid:
  - 100,000+ "Lives Impacted"
  - 50,000+ "Clean Water Access"
  - 332 "Students Enrolled"
  - 99% "Passing Rate"
  - 3 "Countries Served"
  - 15,000+ "Patients Treated"
- Each stat: gradient gold number (font-size 48px, font-weight 900), white label below
- Numbers should count up with animation when scrolling into view

IMPACT STORIES (3 alternating sections):
1. "Clean Water Transformation"
   - LEFT: Photo in rounded-2xl card with depth shadow
   - RIGHT: Micro-header "IMPACT REPORT", title, description about 50K lives transformed
   - FLOATING STAT CARD: Overlaps the image bottom-right by 2rem: "75%" in gold, "Disease Reduction" label, white card with shadow

2. "Education Excellence" (reversed layout — text left, image right)
   - Same floating stat card: "99%" "Passing Rate"

3. "Healthcare Access" (image left, text right)
   - Floating stat card: "15K+" "Patients Treated"

SEPARATORS: Diagonal SVG cuts between each story section, alternating direction.

CTA SECTION:
- Dark navy background with subtle background photo (20% opacity)
- Gold micro-header: "MAKE AN IMPACT"
- Title: "Your Donation Changes Lives" (56px white)
- Subtitle about 100% going to programs
- Two buttons: "Donate $25" (gold) + "Custom Amount" (white border)
- Below: 3 trust badges (501c3, Tax Deductible, Secure)

STYLE: Data-driven, professional, emotional. The floating stat cards that overlap images are the signature design element — they create depth and draw attention to key metrics.
```

---

## PROMPT 6: CONTACT PAGE

```
Design a Contact page for "Global Approach To Development" that feels warm and accessible.

HERO:
- Full viewport with background photo of a community meeting
- Dark gradient overlay
- Gold micro-header: "GET IN TOUCH"
- Title: "Contact Us" in huge white text (64px)

INFO CARDS (3-column row, centered):
Three white cards with double-layer shadow, rounded-2xl:
1. ADDRESS card: Location pin icon (gold), "Our Office", "3200 E Guasti Rd., Suite 100, Ontario, CA 91761"
2. PHONE card: Phone icon (gold), "Call Us", "909-728-8111"
3. EMAIL card: Mail icon (gold), "Email Us", "info@gapdev.org"

Each card: centered text, icon at top (48px, gold accent), label in uppercase tracking, value in medium weight. Hover effect: card lifts 6px.

CONTACT FORM (white card, 2-column on desktop):
- LEFT COLUMN:
  - Full name input
  - Email input
  - Phone input (optional, with "(Optional)" label)
  - Subject dropdown: General Inquiry, Volunteer, Partnership, Other

- RIGHT COLUMN:
  - Message textarea (tall, min-height 200px)
  - "Send Message" button: full-width, gold background, white text, rounded-full, arrow icon

FORM STYLE:
- Inputs: rounded-xl, 1px gray border, focus ring in gold
- Labels: uppercase tracking, small, gray
- Placeholder text in light gray
- The form card has subtle pattern-dots background

MAP SECTION:
- Full-width embedded Google Maps showing Ontario, California
- Overlapping the map: A small white card with the full address and a "Get Directions →" link

SEPARATORS: Diagonal SVG cut above the map section.

FOOTER: Standard 4-column footer with social media icons (Facebook, X/Twitter, Instagram, LinkedIn), contact info bar, copyright.

STYLE: Warm, accessible, professional. The info cards should feel inviting. The form should be easy to fill out. Pattern dots background adds subtle texture without distraction.
```

---

## BONUS PROMPT: DESIGN SYSTEM EXTRACTION

```
Extract a design system from this website: https://ngo-platform-399q.vercel.app

Capture: color palette, typography scale, component patterns (buttons, cards, badges), spacing system, shadow system, animation patterns. Export as DESIGN.md format.
```

## PROMPT 7: COMPLETE COLOR PALETTE + LIQUID GLASS SYSTEM

```
Generate a complete color palette and iPhone-inspired Liquid Glass design system for "Global Approach To Development" (GAD), an NGO website. Replace ALL existing colors with this new system.

## ANCHOR COLORS (fixed, do not change)
- **Emerald Green (Primary)**: #50C878 — rgb(80, 200, 120). Represents growth, health, nature, sustainability.
- **Vibrant Orange (Accent)**: #F67833 — rgb(246, 120, 51). Represents energy, warmth, action, urgency.

## LIQUID GLASS PHILOSOPHY (CRITICAL — read carefully)
The Liquid Glass system must emulate the iPhone's frosted glass aesthetic — maximally transparent, barely visible, ethereal. The glass should feel like a whisper of frost on a window, not a solid surface. It should create depth through extreme transparency and blur, not through opacity or heavy shadows.

Key principles:
- "Ghost glass" — backgrounds should be rgba(255,255,255,0.02–0.06), NEVER above 0.10
- "Deep blur" — backdrop-filter: blur(30–60px) to create that iPhone frosted look
- "Invisible borders" — borders should be rgba(255,255,255,0.04–0.08), barely perceptible
- "Air shadow" — shadows should be extremely light and wide: blur 40–80px, spread -10px, opacity 0.03–0.06
- "No solid whites" — never use pure white for backgrounds, always use the off-white #FAF9F6 or the transparent glass
- "Depth through layers" — multiple stacked glass layers create depth, not opacity

## GENERATE THE FULL PALETTE

### 1. EMERALD PRIMARY FAMILY (from #50C878)
Generate 8 shades:
- **Primary-950** (deepest, near-black green — for text on light backgrounds): very dark emerald, almost black
- **Primary-900**: very dark emerald
- **Primary-800**: dark emerald
- **Primary-700**: deep emerald (for solid dark backgrounds like footer)
- **Primary-600**: rich emerald (for hover states on primary-500)
- **Primary-500**: #50C878 (ANCHOR — primary brand color, main buttons, links)
- **Primary-400**: light emerald (for hover/active states on light bg)
- **Primary-300**: muted light emerald (for subtle borders, backgrounds)
- **Primary-200**: pale emerald tint (for very subtle backgrounds, stats)
- **Primary-50**: whisper of emerald (almost white with a hint of green — for section backgrounds)

### 2. ORANGE ACCENT FAMILY (from #F67833)
Generate 7 shades:
- **Accent-700**: deep burnt orange (active states, dark hover)
- **Accent-600**: rich orange (hover states)
- **Accent-500**: #F67833 (ANCHOR — CTAs, badges, highlights, emphasis)
- **Accent-400**: bright light orange (hover on dark bg, highlights)
- **Accent-300**: soft orange (subtle accent backgrounds, pill badges)
- **Accent-200**: pale orange tint (very subtle backgrounds)
- **Accent-100**: whisper orange (barely perceptible tint)

### 3. NEUTRAL BACKGROUND FAMILY
- **Bg-OffWhite**: #FAF9F6 (NOT pure white — this warm off-white replaces all white backgrounds)
- **Bg-WarmGray**: #F5F4F1 (slightly warmer — for alternating sections)
- **Bg-CoolGray**: #F1F2F3 (cool subtle gray — for card backgrounds)
- **Bg-Deep**: derived from Primary-800/900 (for dark sections, footers)

### 4. TEXT & FOREGROUND FAMILY
- **Text-Primary**: derive from Primary-950 (very dark, for headings)
- **Text-Body**: derive from Primary-800/700 level (slightly softer than headings)
- **Text-Muted**: derive from Primary-400/300 level (for secondary text)
- **Text-OnDark-White**: #FFFFFF (for text on dark sections)
- **Text-OnDark-Muted**: rgba(255,255,255,0.7) (for secondary text on dark)
- **Text-OnGlass**: rgba(0,0,0,0.85) or rgba(255,255,255,0.85) depending on layer beneath

### 5. SEMANTIC FAMILY
- **Success-Green**: #2A9D8F (teal-green, distinct from primary emerald)
- **Error-Red**: #E76F51 (warm red, complementary to orange palette)
- **Warning-Amber**: #E9C46A (warm amber)
- **Info-Blue**: #4A90D9 (clear blue, for info badges)

### 6. GRADIENT DEFINITIONS
Generate these exact gradients:
- **Brand Gradient (Primary → Accent)**: "linear-gradient(135deg, #50C878 0%, #F67833 100%)" — for stat numbers, hero micro-badges, section headings
- **Emerald Gradient**: "linear-gradient(180deg, rgba(80,200,120,0.15) 0%, rgba(80,200,120,0) 100%)" — for card overlays
- **Orange Glow**: "radial-gradient(ellipse at center, rgba(246,120,51,0.12) 0%, transparent 70%)" — for subtle accent glows behind CTAs
- **Glass Light**: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.04) 100%)" — for glass surfaces
- **Glass Dark**: "linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.01) 50%, rgba(0,0,0,0.03) 100%)" — for dark glass surfaces
- **Hero Overlay**: "linear-gradient(110deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.05) 70%)" — for hero text legibility
- **Hero Bottom**: "linear-gradient(0deg, rgba(0,0,0,0.50) 0%, transparent 50%, transparent 100%)"

## LIQUID GLASS — COMPLETE SPECIFICATION

### Glass Surface Variants (apply ALL site-wide)

**1. glass-max (most transparent — for hero content overlays, floating badges)**
```
Background: rgba(255,255,255,0.03)
Backdrop Blur: 40px
Saturate: 140%
Border: 0.5px solid rgba(255,255,255,0.05)
Border Radius: 16px
Shadow: 0 8px 40px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02)
```

**2. glass-card (for cards, stat containers, form elements)**
```
Background: rgba(255,255,255,0.05)
Backdrop Blur: 35px
Saturate: 130%
Border: 0.5px solid rgba(255,255,255,0.06)
Border Radius: 20px
Shadow: 0 4px 24px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.02)
```

**3. glass-nav (for navigation bar)**
```
Background: rgba(255,255,255,0.04)
Backdrop Blur: 50px (maximum blur for smooth nav)
Saturate: 150%
Border: none (nav should be nearly invisible)
Shadow: 0 1px 0 rgba(255,255,255,0.03) (bottom light line only)
```

**4. glass-dark (for cards on dark backgrounds like footer)**
```
Background: rgba(0,0,0,0.04)
Backdrop Blur: 35px
Saturate: 120%
Border: 0.5px solid rgba(255,255,255,0.04)
Border Radius: 20px
Shadow: 0 4px 24px rgba(0,0,0,0.08)
```

**5. glass-donate (for the floating donate bar — must stand out more)**
```
Background: linear-gradient(135deg, rgba(80,200,120,0.08) 0%, rgba(246,120,51,0.06) 100%)
Backdrop Blur: 40px
Border: 0.5px solid rgba(255,255,255,0.08)
Border Radius: 24px
Shadow: 0 8px 32px rgba(80,200,120,0.06), 0 1px 4px rgba(0,0,0,0.03)
```

**6. glass-surface (for page section backgrounds — extremely subtle)**
```
Background: rgba(255,255,255,0.02)
Backdrop Blur: 30px
Saturate: 120%
Border: 0.5px solid rgba(255,255,255,0.03)
```

### GLASS DEPTH LAYERING (how to stack glass elements)
When multiple glass elements are stacked, each layer should decrease in opacity:
- Layer 1 (deepest — page background): solid bg or Bg-OffWhite
- Layer 2 (section background): glass-surface
- Layer 3 (card): glass-card (or glass-dark depending on context)
- Layer 4 (overlay/nav/donate bar): glass-max

Each layer adds a whisper of frosted depth without ever looking heavy.

## DESIGN APPLICATION RULES

### Color Application (page by page)

**HOMEPAGE:**
- Hero: Background photo with Hero Overlay gradient. Glass-max container for the CTA buttons. Stats bar is glass-card with emerald accent numbers.
- Programs Section: Cards use glass-card. Program titles in Primary-900. Stat numbers use Brand Gradient.
- Impact Strip: Solid bg using Primary-50. Numbers in Brand Gradient.

**ABOUT PAGE:**
- Founder card: glass-card with subtle emerald border. Quote in italic with accented left border in #F67833 (Accent-500).
- "Where We Work" cards: glass-card. Location labels in Accent-500.

**DONATE PAGE:**
- Amount buttons: glass-card. Active state: Accent-500 solid bg, white text.
- Impact sidebar: glass-card items with emerald checkmarks.
- Form inputs: transparent bg with 0.5px rgba(255,255,255,0.08) border, focus ring in Accent-500.

**IMPACT PAGE:**
- Hero stats: large numbers in Brand Gradient on glass-card.
- Impact story cards: glass-card with floating stat badges using glass-max and Brand Gradient numbers.

**CONTACT PAGE:**
- Info cards: glass-card with accent-500 icons.
- Form: glass-card with emerald focus rings.

### Typography with New Colors
- All H1/H2 headings: Primary-950 (deep dark)
- Body text on light: Primary-700
- Body text on dark bg: rgba(255,255,255,0.85)
- Micro-headers (uppercase): Accent-500 (#F67833)
- Stat numbers: Brand Gradient (emerald → orange)
- Links: Primary-500 (#50C878), hover: Primary-400
- CTA buttons: Accent-500 (#F67833) background, white text
- Secondary buttons: Transparent with Accent-500 border and text

### Buttons with New Colors
- Primary CTA: bg gradient #50C878 → #F67833 (emerald to orange), white text, rounded-full, inner shadow for depth. Hover: reverse gradient.
- Secondary CTA: glass-card bg, Accent-500 border, Accent-500 text. Hover: slight lift.
- Tertiary/Text link: Accent-500 text with arrow. Hover: arrow slide.

### Shadows with New Colors
- Card shadow: 0 4px 24px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.02)
- Hover lift: translateY(-3px), shadow expands: 0 12px 40px rgba(0,0,0,0.04)
- Button shadow: 0 4px 16px rgba(246,120,51,0.15) (orange-tinted for CTAs)
- Never use hard black shadows — always use rgba(0,0,0,X) with very low opacity

### Animations (maintain existing)
- Keep all existing Ken Burns, crossfade, scroll reveal, float animations
- Add: glass cards should have a very subtle shimmer on load (a diagonal sweep of rgba(255,255,255,0.03) across the surface in 3s)

### Photos & Overlays
- Photos should have a subtle emerald tint overlay (rgba(80,200,120,0.06)) to tie them into the color system
- Hero overlays remain dark but can have a hint of emerald in the gradient: from-black/75 via-emerald/10 to-transparent

## MOOD SUMMARY
The final result should feel: fresh, modern, airy, premium — like an Apple-designed nonprofit. The emerald brings life and nature, the orange brings warmth and urgency. The liquid glass makes everything feel light, floaty, and ethereal. Maximum transparency, minimum visual weight. The website should look like it was designed by Apple for a world-class NGO.
```

---

## REFINEMENT PROMPTS (Use After Initial Generation)

### Typography
```
- "Make all titles font-weight 900 (black) with line-height 1.05"
- "Add text-shadow to all white text on dark backgrounds: 0 2px 10px rgba(0,0,0,0.6)"
- "Use Inter font family throughout"
- "Make micro-headers uppercase with letter-spacing 0.2em"
```

### Colors
```
- "Primary navy: #1e3a5f, Primary dark: #0f2137"
- "Accent gold: #e8a838, Accent light: #f0c060"
- "All CTA buttons should be the gold accent color"
- "Use gradient gold text for stat numbers"
```

### Shadows & Depth
```
- "Add double-layer shadows to all cards: short intense + long diffuse"
- "Cards should lift up 6px on hover with spring easing"
- "Add subtle 1px border at rgba(0,0,0,0.04) to all cards"
```

### Layout
```
- "Use asymmetric bento grid, not equal columns"
- "Make the hero full viewport height (100vh)"
- "Add diagonal SVG separators between sections"
- "Overlap the stats bar on top of the hero by 3rem"
```

### Animations
```
- "Add Ken Burns zoom effect to hero images"
- "Scroll reveal: elements fade up 40px when scrolling into view"
- "Button arrows should slide right 4px on hover"
- "Floating badges should have a gentle up-down animation"
```
