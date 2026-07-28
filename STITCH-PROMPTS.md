# Stitch Prompts — Global Approach To Development

Copy these prompts into stitch.withgoogle.com (use Experimental Mode for best results).

---

## Prompt 1: Homepage Hero + Stats Bar

```
Create a hero section for a nonprofit NGO website called "Global Approach To Development". 

Design: Full viewport height hero with a background photo of African children in a classroom. Dark gradient overlay on the left side (black/85 to transparent, left to right) for text legibility. 

Content layout (left-aligned):
- Small gold pill badge at top: "GLOBAL APPROACH TO DEVELOPMENT" with a small pulsing dot
- Huge white title (900 weight, tight line-height): "Every Child Deserves a Future" 
- Subtitle below in white/95 opacity: "Building sustainable futures through education, clean water, and healthcare in communities across Africa."
- Two CTA buttons: "Donate Now" (gold rounded-full with arrow icon) and "Learn More" (white border, transparent background)
- Bottom center: 7 dot indicators in a dark pill container, first dot gold and wider
- Bottom right: slide counter "01 / 07" in dark pill

Below the hero, a white stats bar that overlaps the hero by 3rem with 4 stats in a row: "2014 Founded", "100K+ Lives Impacted", "3 Countries", "99% Passing Rate". Each stat has a gradient gold number and gray label.

Style: Modern agency aesthetic, clean typography, warm gold accent (#e8a838), deep navy primary (#1e3a5f). The hero should feel cinematic and hopeful.
```

---

## Prompt 2: Programs Bento Grid

```
Create a bento grid section for a nonprofit website showing 3 programs.

Layout:
- Section title with gold micro-header "WHAT WE DO" above a huge navy title "Our Programs"
- 3-column asymmetric bento grid:
  - LEFT (2x2 large card): "Clean Water Initiative" — background photo of water project, gradient overlay from bottom, stat "50K+" in gold, label "Lives Changed", "Learn More" arrow link
  - TOP RIGHT (1x1 card): "Education & Scholarships" — photo of children in school, stat "332" in gold, label "Students Enrolled"  
  - BOTTOM RIGHT (1x1 card): "Healthcare Programs" — photo of mobile clinic, stat "15K+" in gold, label "Patients Treated"

Style: Cards have rounded-2xl corners, double-layer shadows (short intense + long diffuse), images zoom slowly on hover. Gradient overlays go from transparent at top to dark at bottom for text legibility. Gold accent color (#e8a838), navy backgrounds (#0f2137).
```

---

## Prompt 3: About Page with Founder

```
Create an About page for a nonprofit NGO called "Global Approach To Development".

Sections:

1. HERO: Full viewport with background photo of community gathering. Dark gradient overlay. Left-aligned content:
   - Gold pill badge: "WHO WE ARE"
   - Title: "Empowering Communities Since 2014" (huge white text, "Since 2014" in gold gradient)
   - Subtitle about the organization's mission

2. FOUNDER SECTION: Two-column layout
   - Left: Photo of Dr. Keuleya Ruth Ble in a rounded card with floating gold badge showing "10+ Years"
   - Right: "Our Founder" section with name, credentials (MD, MPH), and bio about founding the organization in 2014

3. WHERE WE WORK: Three image cards showing:
   - Côte d'Ivoire: School with 332 students, 99% passing rate
   - Mali: 3 villages in Sikasso region
   - Ontario CA: Headquarters

Style: Clean nonprofit aesthetic, diagonal SVG separators between sections, pattern dots background on light sections, warm gold accent, deep navy primary. Professional but approachable tone.
```

---

## Prompt 4: Donate Page with Payment Options

```
Create a donation page for a nonprofit NGO called "Global Approach To Development".

Layout:
- HERO: Background photo with dark gradient. Gold micro-header "MAKE A DIFFERENCE". Title "Your Donation Changes Lives" in huge white text. Subtitle: "100% of your donation goes directly to our programs."

- DONATION FORM (centered, clean white card):
  - Amount selector: Quick buttons for $25, $50, $100, $250, $500 + custom amount input
  - "Your Impact" sidebar showing what each amount provides:
    - $25 = School supplies for one student
    - $50 = Clean water for a family for one year
    - $100 = Medical supplies for a mobile clinic visit
    - $250 = Scholarship for one student for a semester
  
  - Payment method selector: Card (Stripe) and PayPal tabs
  - For Card: Card number, expiry, CVC fields
  - For PayPal: PayPal button
  - "Donate" CTA button (gold, full width)

- IMPACT SECTION below: 3 cards showing recent impact with photos and stats

Style: Trust-building design, warm gold accent (#e8a838), clean white background, rounded cards with subtle shadows. The form should feel safe and professional. Include small lock icon next to payment for security feeling.
```

---

## Prompt 5: Impact Page with Stats

```
Create an Impact page for a nonprofit NGO called "Global Approach To Development".

Layout:
- HERO: Background photo with dark gradient. Gold micro-header "REAL RESULTS". Title "Our Impact" in huge white text.

- STATS COUNTER SECTION: Large numbers in a row with gradient gold text:
  - 100,000+ Lives Impacted
  - 50,000+ Clean Water Access
  - 332 Students Enrolled
  - 99% Passing Rate
  - 3 Countries Served
  - 15,000+ Patients Treated

- IMPACT STORIES: Alternating left/right layout (3 stories):
  1. Clean Water Transformation — photo left, text right with floating stat card "75% Disease Reduction"
  2. Education Excellence — text left, photo right with floating stat card "99% Passing Rate"  
  3. Healthcare Access — photo left, text right with floating stat card "15K+ Patients Treated"

- CTA SECTION: Dark navy background with overlay photo. Title "Your Donation Changes Lives". Two buttons: "Donate $25" (gold) and "Custom Amount" (white border).

Style: Data-driven, professional, warm gold accent, diagonal SVG separators between sections. Each impact story should have a floating stat card that overlaps the image by 2rem.
```

---

## Prompt 6: Contact Page

```
Create a Contact page for a nonprofit NGO called "Global Approach To Development".

Layout:
- HERO: Background photo with dark gradient. Gold micro-header "GET IN TOUCH". Title "Contact Us" in huge white text.

- INFO CARDS (3-column row):
  - Address card: Icon, "3200 E Guasti Rd., Suite 100, Ontario, CA 91761"
  - Phone card: Icon, "909-728-8111"  
  - Email card: Icon, "info@gapdev.org"

- CONTACT FORM (white card, 2-column on desktop):
  - Left: Name, Email, Subject, Phone (optional)
  - Right: Message textarea
  - Submit button: "Send Message" (gold, full width)

- MAP SECTION: Embedded Google Maps showing Ontario, California location

Style: Clean, professional, warm gold accent (#e8a838), rounded cards with double-layer shadows, pattern dots background on light sections. The form should feel welcoming and easy to use.
```

---

## How to Use These Prompts

1. Go to stitch.withgoogle.com
2. Sign in with your Google account
3. Use **Experimental Mode** (Gemini 2.5 Pro) for best quality
4. Copy each prompt and paste it into the canvas
5. Wait for generation (~45 seconds per screen)
6. Refine with follow-up prompts like:
   - "Make the title larger"
   - "Change the accent color to a warmer gold"
   - "Add a wave divider at the bottom"
   - "Make the cards have more shadow depth"
7. When satisfied, export as HTML/CSS or paste to Figma
8. Send me the results and I'll implement them in the codebase
