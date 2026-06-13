## AGENTS.md Instructions (copy this into your project)
```
You are building the Pink Moon Salon website — a mobile-first Next.js 14 + Tailwind CSS site.

Rules:
- Always refer to PLANNING.md before making any structural decisions
- Build one component or page section at a time — confirm before moving on
- Mobile-first always: design for 375px width, then scale up
- Use CSS variables defined in globals.css for all colors and typography
- Content comes from /content markdown and JSON files — never hardcode content in components
- Form submissions use Resend (or Formspree as fallback) — do not build a custom backend
- Never use placeholder logic silently — label all TODOs clearly with // TODO: comments
- Keep components small, focused, and reusable
- When in doubt, ask — don't assume
```

---

## Phased Build Order

### Phase 1 — Foundation
- [ ] Init Next.js 14 project with Tailwind CSS
- [ ] Set up globals.css with CSS variables (colors, fonts)
- [ ] Build Navbar and Footer components
- [ ] Set up /content folder and salon-info.json
- [ ] Create lib/content.ts helper

### Phase 2 — Home Page
- [ ] HeroSection
- [ ] IntroBlurb
- [ ] ServicesSnapshot
- [ ] GalleryStrip
- [ ] SocialProof
- [ ] CTABanner

### Phase 3 — Inner Pages
- [ ] Services page + ServiceCard component
- [ ] About page + TeamGrid + ValuesSection
- [ ] Contact page + ConsultationForm

### Phase 4 — Form & Email
- [ ] Wire up ConsultationForm to Resend or Formspree
- [ ] Success state UI
- [ ] Test form submission end-to-end

### Phase 5 — Content & Polish
- [ ] Swap in real photos to /public/images
- [ ] Fill in all content files with real salon info
- [ ] Typography and spacing polish pass
- [ ] Mobile QA across iPhone SE, iPhone 14, Android
- [ ] Accessibility check (alt text, focus states, contrast)

### Phase 6 — Launch
- [ ] Push to GitHub
- [ ] Connect repo to Vercel
- [ ] Set environment variables (form API key)
- [ ] Test live deployment
- [ ] Share URL

---

## Notes & Decisions Log
- No CMS — content managed via GitHub file editor (Option B)
- No booking system in v1 — consultation form only, salon follows up manually
- Instagram/Facebook linked in footer and contact page — no live feed pull in v1
- Pricing on services page is optional — can show ranges or "contact for pricing"
- Team section uses real photos — manager uploads to /public/images/team/
```
