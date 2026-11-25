# Hy·Me·Up! — Official Product Website

Official single-SKU product website for **Hy·Me·Up! Hybrid Complete Sunscreen SPF 50+ PA++++** (*Do Less. Full Bless.*), built with **Vite + React + TypeScript + GSAP ScrollTrigger**.

## Tech Stack
- **Framework**: React 18 + TypeScript + Vite 5
- **Animation**: GSAP 3 + ScrollTrigger (scroll-scrubbed hero video & pinned horizontal showcase)
- **Icons**: Lucide React
- **Styling**: Custom Vanilla CSS (`src/index.css`) with unified Crystal Liquid Glass surfaces
- **Hosting**: Netlify (`netlify.toml`)

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server (hot reload)
npm run dev

# 3. Type-check and build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

## Quick Edit Guide for Team
- **All Bilingual Copy (`EN` / `ID`)**: `src/data/siteContent.ts`
- **External Store & Social Links (Shopee, Instagram, TikTok) & Hero Media**: `src/data/brandLinks.ts`
- **Global Theme & Liquid Glass Styling**: `src/index.css`
- **Main Sections & Modals**:
  - `src/components/Header.tsx` — Floating crystal glass navbar
  - `src/components/HeroScrollStage.tsx` — Curtain reveal & scroll-scrubbed product video
  - `src/components/HorizontalShowcase.tsx` — 4 Core Pillars + product highlights horizontal track
  - `src/components/AboutStorySection.tsx` — Brand story, value/promise, stats & Clear Sky gallery
  - `src/components/ProductShowcaseSection.tsx` — `/product` page with icons & 3:4 front/back packaging swiper
  - `src/components/DetailModal.tsx` — Unified transparent crystal glass modals (Contact, Specs, Pillars, Ingredients, Story, Legal)
  - `src/components/ContactFooter.tsx` — Footer links, socials, and `EN` / `ID` language switcher
