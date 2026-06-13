# PLANNING.md — Pink Moon Salon Website

## Project Overview
A mobile-first website for Pink Moon Salon, a warm and welcoming community-focused hair salon
specializing in colors, cuts, and trims. The primary goal is converting new visitors into
consultation leads via a simple contact/inquiry form.

---

## Tech Stack
| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Mobile-first, fast, SEO-friendly, scales well |
| Styling | Tailwind CSS | Rapid mobile-first responsive design |
| Content | Markdown / JSON files | No CMS needed, manager can edit via GitHub |
| Forms | Resend (free tier) or Formspree | Sends consultation form submissions to email |
| Hosting | Vercel | Free tier, auto-deploys from GitHub, made for Next.js |
| Repo | GitHub | Version control + content editing interface for manager |

---

## Brand Direction
- **Vibe:** Warm, welcoming, community feel — like a neighborhood gathering place
- **Tone of voice:** Friendly, personal, approachable. Not corporate. First-name basis.
- **Typography:** Pair a soft serif display font (e.g. Playfair Display or Cormorant Garamond)
  with a clean readable body font (e.g. DM Sans or Nunito)
- **Color system:** Build from existing logo colors. Suggested token structure:
  ```
  --color-primary       (main brand color from logo)
  --color-accent        (secondary/highlight color)
  --color-bg            (warm off-white or cream background)
  --color-text          (dark warm neutral, not pure black)
  --color-muted         (light gray for secondary text)
  ```
- **Imagery:** Real salon photos — styling in progress, finished looks, the space itself, the team

---

## Site Structure

### Pages
```
/                   → Home
/services           → Services & Pricing
/about              → About the Salon & Team
/contact            → New Client Consultation Form
```

### Navigation (mobile-first)
- Sticky top nav with logo + hamburger menu on mobile
- Full nav links on desktop
- CTA button ("Book a Consultation") always visible in nav

---

## Page-by-Page Component Map

### Home Page `/`
- `<HeroSection>`        — Full-screen hero image, headline, CTA button
- `<IntroBlurb>`         — 2–3 sentence warm welcome, who the salon is for
- `<ServicesSnapshot>`   — 3 card previews (Colors, Cuts, Trims) linking to /services
- `<GalleryStrip>`       — Horizontal scroll of 6–8 photos (sourced from Instagram/real photos)
- `<SocialProof>`        — 2–3 short client testimonials (hardcoded initially)
- `<CTABanner>`          — "New to Pink Moon? Let's Chat" → links to /contact
- `<Footer>`             — Hours, address, Instagram link, Facebook link, phone/email

### Services Page `/services`
- `<PageHeader>`         — Title + short intro
- `<ServiceCard>`        — Reusable card: service name, short description, price range (optional)
  - Colors (balayage, highlights, full color, toning)
  - Cuts (women's cut, men's cut, kids cut)
  - Trims (split end trim, bang trim)
- `<ConsultationCTA>`    — "Not sure what you need? Book a free consultation"

### About Page `/about`
- `<PageHeader>`         — Title + warm intro paragraph
- `<SalonStory>`         — The story of Pink Moon, what makes it different
- `<TeamGrid>`           — Stylist cards: photo, name, specialty, short bio
- `<ValuesSection>`      — 3 values (e.g. Community, Craft, Care) with icons

### Contact / Consultation Page `/contact`
- `<PageHeader>`         — "New Clients — Let's Get You Started"
- `<ConsultationForm>`   — Form fields (see below)
- `<ContactDetails>`     — Phone, email, address, hours, Instagram, Facebook

---

## Consultation Form Fields
```
First Name          (text, required)
Last Name           (text, required)
Email               (email, required)
Phone               (tel, optional)
Service Interest    (select: Colors / Cuts / Trims / Not Sure)
Hair Description    (textarea: "Tell us a little about your hair and what you're looking for")
How did you hear?   (select: Instagram / Facebook / Friend / Google / Other)
Submit Button       → "Send My Inquiry"
```
**On submit:** Sends an email notification to the salon's inbox via Resend or Formspree.
Show a friendly success message on the page (no page redirect needed).

---

## Content File Structure
```
/content
  /services
    colors.md
    cuts.md
    trims.md
  /team
    stylist-1.md
    stylist-2.md
  /testimonials
    testimonials.json
  /settings
    salon-info.json     ← hours, address, phone, email, social links
```

### salon-info.json shape
```json
{
  "name": "Pink Moon Salon",
  "phone": "",
  "email": "",
  "address": "",
  "hours": {
    "monday": "Closed",
    "tuesday": "9am – 6pm",
    ...
  },
  "social": {
    "instagram": "",
    "facebook": ""
  }
}
```

---

## Folder Structure
```
pink-moon-salon/
├── app/
│   ├── layout.tsx          ← Root layout, nav, footer
│   ├── page.tsx            ← Home
│   ├── services/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSnapshot.tsx
│   │   ├── GalleryStrip.tsx
│   │   ├── SocialProof.tsx
│   │   └── CTABanner.tsx
│   ├── services/
│   │   └── ServiceCard.tsx
│   ├── about/
│   │   ├── TeamGrid.tsx
│   │   └── ValuesSection.tsx
│   └── contact/
│       └── ConsultationForm.tsx
├── content/
│   ├── services/
│   ├── team/
│   ├── testimonials/
│   └── settings/
├── public/
│   └── images/
├── styles/
│   └── globals.css         ← CSS variables, base styles
├── lib/
│   └── content.ts          ← Helper functions to read .md and .json files
├── PLANNING.md             ← This file
├── AGENTS.md               ← Instructions for Claude Code in Cursor
└── README.md
```

---

