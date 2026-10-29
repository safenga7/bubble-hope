# 🧋 Bubble Hope — Premium Bubble Tea & Kids Area Experience

> **⚠️ Disclaimer: Unofficial Portfolio Concept & Demo**  
> This project is an independent frontend engineering and UI/UX portfolio concept. It is **not** an official commercial application and is **not affiliated with or endorsed by any real business entity**. All product data, pricing, locations, contact numbers, and forms are illustrative and fictional. No real transactions, bookings, or inquiries are processed.

🔗 **Live Website**: [https://bubble-hope.vercel.app](https://bubble-hope.vercel.app)  
📦 **GitHub Repository**: [https://github.com/safenga7/bubble-hope](https://github.com/safenga7/bubble-hope)

---

## ✨ Overview

**Bubble Hope** is a modern, responsive web application built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It showcases an end-to-end digital experience for a boutique bubble tea concept with an integrated family entertainment and children's party venue.

---

## 🚀 Key Features

### 🧪 1. Interactive Boba Lab
- **Real-Time SVG Cup Visualizer**: Live drink preview reacting instantly to ingredient adjustments.
- **Custom Recipe Builder**:
  - Base selections: Taro Milk, Roasted Oolong, Organic Matcha, Thai Tea.
  - Sweetness calibration (0% to 100%) and ice levels (No ice to Extra ice) via tactile step sliders.
  - Layered toppings: Tapioca Pearls, Mango Popping Boba, Lychee Jelly, Salted Cream Cloud, Aloe Vera.
- **Live Dynamic Pricing**: Instant subtotal calculation as ingredients are added or removed.

### 🍵 2. House Brews & Desserts Menu
- Signature drinks and desserts with calorie badges, star ratings, and dietary indicators.
- One-click additions with animated confirmations and micro-interactions.

### 🎈 3. Kids Area & Birthday Party Hub (`/kids`)
- **Soft-Play & Workshops Showcase**: Dedicated zones for physical activity, sensory play, and creative arts.
- **Party Packages**: Tiered party offerings (*Bubble Fun*, *Boba Blast*, *Pop Star Party*) with per-child pricing breakdowns.
- **Interactive Demo Booking Widget**: Date selection, guest count, package selector, and simulated booking confirmation feedback.
- **Sample Community Reviews & Concept Safety Standards**: Clear illustrative feedback and safety design specifications.

### 📍 4. Multi-Branch Explorer & District Guide (`/locations`)
- **Branch Switcher**: Interactive cards for Hadayek Al-Ahram (24/7 flagship), Sheikh Zayed, and Heliopolis (Korba).
- **District Arrival & Accessibility Guide**: Real-world transit guidance, neighborhood character tags, address clipboard copy, and direct Google Maps neighborhood exploration links.
- **Community & Expansion**: Interactive demo inquiry forms for the **Barista Academy** and **Franchise Opportunities**.

### 🌐 5. Bilingual & Bidirectional (English / Arabic RTL)
- Seamless language toggle across the entire application without page reloads.
- Full layout mirroring: LTR for English, native RTL for Arabic with tailored typography (`Cairo` and `IBM Plex Sans Arabic`).

### 🛍️ 6. Persistent Cart & Mobile Slide-Out
- Global reactive store managing cart items, quantities, and pricing.
- Local storage persistence for seamless returning visitor experiences.
- Accessible slide-out drawer with Escape key handling, body-scroll lock, and an in-drawer simulated checkout celebration state.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts via `next/font` (Plus Jakarta Sans, Outfit, Cairo, IBM Plex Sans Arabic)

---

## 📦 Project Structure

```
bubble-hope/
├── app/
│   ├── globals.css         # Custom utilities, CSS variables & theme styling
│   ├── layout.tsx          # Root layout with fonts, metadata, and StoreProvider
│   ├── loading.tsx         # Global loading skeleton
│   ├── error.tsx           # Production error boundary handler
│   ├── not-found.tsx       # Branded 404 handler
│   ├── page.tsx            # Home page (Hero section)
│   ├── menu/               # Boba Lab & Popular Brews
│   ├── kids/               # Kids Area, Party Packages & Booking
│   └── locations/          # Branches, District Guide, Academy & Franchise
├── components/
│   ├── BobaLab.tsx         # Drink customization engine
│   ├── CartDrawer.tsx      # Slide-out bag drawer with simulated checkout
│   ├── CupPreview.tsx      # Dynamic SVG boba cup renderer
│   ├── Footer.tsx          # Responsive footer with demo disclaimers
│   ├── HeroSection.tsx     # Landing page hero with animated glassmorphism
│   ├── MenuGrid.tsx        # Popular menu items grid
│   ├── Navbar.tsx          # Glassmorphic header with navigation and language toggle
│   ├── SafeImage.tsx       # Fallback-resilient Next.js image component
│   ├── StepSlider.tsx      # Accessible step slider for ice and sweetness
│   └── StickyCartBar.tsx   # Floating mobile bag summary
├── lib/
│   ├── data.ts             # Menu, toppings, and navigation configuration
│   ├── images.ts           # Centralized image asset references
│   └── store.tsx           # Global state (Cart, Language, Translations)
└── public/
    └── favicon.svg         # SVG favicon
```

---

## 💻 Getting Started

### Prerequisites
- Node.js 18.17+ or higher
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/safenga7/bubble-hope.git
   cd bubble-hope
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To test the production build locally:
```bash
npm run build
npm run start
```

---

## 🛡️ License & Attributions

This project is open-source under the [MIT License](LICENSE).  
Photography sourced via [Unsplash](https://unsplash.com) with open licenses for demonstration purposes.
