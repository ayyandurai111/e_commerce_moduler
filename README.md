# LUXE STORE — React + MUI E-Commerce Home Page

A production-ready, fully modular, SaaS-ready e-commerce home page built with **React 18** and **Material UI v6**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📁 Project Structure

```
src/
├── theme/
│   └── theme.js                  ← MUI createTheme() central design system
│
├── components/
│   ├── common/
│   │   ├── RatingStars.jsx       ← Star rating (filled / half / empty)
│   │   ├── PriceTag.jsx          ← Price + original price + discount %
│   │   └── ProductBadge.jsx      ← NEW / SALE / BESTSELLER chips
│   │
│   ├── Navbar/
│   │   └── index.jsx             ← AppBar + mobile Drawer + icon bar
│   │       ├── Logo
│   │       ├── NavLinks (desktop)
│   │       ├── IconBar (Search/Wishlist/Cart/Account)
│   │       └── MobileDrawer
│   │
│   ├── Hero/
│   │   └── index.jsx             ← Auto-sliding hero banner
│   │       ├── HeroSlide (Fade transition)
│   │       ├── SliderDots
│   │       └── CTAButtons
│   │
│   ├── CategoryGrid/
│   │   └── index.jsx             ← Responsive category card grid
│   │       └── CategoryCard
│   │
│   ├── FeaturedProducts/
│   │   └── index.jsx             ← Filtered product grid
│   │       ├── ProductCard (with hover quick-add)
│   │       └── FilterTabs
│   │
│   ├── DealsSection/
│   │   └── index.jsx             ← Time-limited deals
│   │       ├── DealCard
│   │       ├── CountdownTimer
│   │       └── StockProgress (LinearProgress)
│   │
│   ├── Newsletter/
│   │   └── index.jsx             ← Email subscription + perks row
│   │       ├── PerksRow
│   │       ├── EmailInput
│   │       └── SubscribeButton
│   │
│   └── Footer/
│       └── index.jsx             ← Multi-column dark footer
│           ├── BrandCol
│           ├── LinksCol (×2)
│           ├── ContactCol
│           └── SocialIcons
│
├── pages/
│   └── HomePage.jsx              ← Composition page — renders all modules
│
├── App.jsx                       ← ThemeProvider + sample data
└── main.jsx                      ← React root entry point
```

---

## 🎨 Theme System

All visual tokens live in `src/theme/theme.js` using MUI's `createTheme()`.

```js
import theme from "./theme/theme";

// Access anywhere via useTheme() hook:
const theme = useTheme();
theme.palette.primary.main        // "#1a1a2e"
theme.palette.secondary.main      // "#e94560"
theme.palette.warning.main        // "#f5a623"
theme.spacing(2)                  // "16px"
theme.typography.h2               // Playfair Display, 700
theme.breakpoints.down("md")      // "@media (max-width: 767px)"
```

---

## 🧩 Module Props API

### `<Navbar />`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `true` | Toggle module |
| `storeName` | string | `"LUXE STORE"` | Brand name |
| `logo` | string\|null | `null` | Logo image URL |
| `links` | array | `[]` | `[{ label, url }]` nav links |
| `cartCount` | number | `0` | Cart badge count |
| `wishlistCount` | number | `0` | Wishlist badge count |
| `showSearch/Wishlist/Cart/Account` | boolean | `true` | Toggle icon buttons |
| `onCartClick` | function | — | Cart click handler |

### `<Hero />`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `true` | Toggle module |
| `slides` | array | `[]` | Array of slide objects |
| `autoPlay` | boolean | `true` | Auto-advance slides |
| `interval` | number | `5000` | Slide interval (ms) |
| `ctaText` | string | `"Shop Now"` | Default CTA text |
| `ctaLink` | string | `"/shop"` | Default CTA href |
| `showBadge` | boolean | `true` | Show badge chip |

**Slide object:**
```js
{
  title: string,
  subtitle: string,
  description: string,
  badge: string,
  image: string,           // URL (or omit for gradient)
  background: string,      // CSS gradient fallback
  ctaText: string,
  ctaLink: string,
  secondaryCta: { text, link },
  stats: [{ value, label }]
}
```

### `<CategoryGrid />`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `true` | Toggle module |
| `title` | string | `"Shop by Category"` | Section heading |
| `categories` | array | `[]` | Array of category objects |
| `columns` | object | `{xs:2,sm:3,md:4,lg:6}` | Grid breakpoints |

### `<FeaturedProducts />`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `true` | Toggle module |
| `products` | array | `[]` | Product objects |
| `filters` | array | `["All"]` | Filter tab labels |
| `onAddToCart` | function | — | `(product) => void` |
| `currency` | string | `"$"` | Currency symbol |
| `maxVisible` | number | `8` | Max products shown |

**Product object:**
```js
{
  id: number,
  name: string,
  price: number,
  originalPrice: number|null,
  rating: number,           // 0–5, supports halves
  reviewCount: number,
  badge: string,            // "NEW" | "SALE" | "BESTSELLER"
  category: string,
  tags: string[],
  brand: string,
  image: string|null
}
```

### `<DealsSection />`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `true` | Toggle module |
| `deals` | array | `[]` | Deal objects |
| `onAddToCart` | function | — | `(deal) => void` |

**Deal object extends Product with:**
```js
{
  endsAt: string,   // ISO date string for countdown
  sold: number,     // Units sold (for progress bar)
  total: number     // Total stock
}
```

### `<Newsletter />`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `true` | Toggle module |
| `title` | string | `"Join the Luxe Inner Circle"` | Heading |
| `incentive` | string | `"Get 15% off..."` | Incentive pill text |
| `onSubscribe` | async function | — | `(email) => Promise` |
| `showPerks` | boolean | `true` | Show perks row |

### `<Footer />`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `true` | Toggle module |
| `storeName` | string | — | Brand name |
| `shopLinks` | array | `[]` | Shop nav links |
| `helpLinks` | array | `[]` | Help nav links |
| `contact` | object | `{}` | `{ phone, email, address }` |
| `social` | object | `{}` | `{ instagram, facebook, twitter, pinterest }` |
| `paymentMethods` | array | — | Payment method labels |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| `xs` | 0px+ | Mobile — 1 column, hamburger nav |
| `sm` | 480px+ | Large phones — 2 columns |
| `md` | 768px+ | Tablets — 3–4 columns, full nav |
| `lg` | 1024px+ | Laptops — 4 columns |
| `xl` | 1280px+ | Desktop — max-width container |

---

## 🏢 Multi-Brand / SaaS Usage

Swap the entire brand in `App.jsx` by changing `navbarProps`, `heroProps`, etc. — or pass a different `theme` to `<ThemeProvider>`:

```jsx
import { createTheme } from "@mui/material";

const brandBTheme = createTheme({
  palette: {
    primary:   { main: "#2d6a4f" },
    secondary: { main: "#74c69d" },
  },
});

// In render:
<ThemeProvider theme={brandBTheme}>
  <HomePage navbar={brandBNavbar} hero={brandBHero} ... />
</ThemeProvider>
```

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| MUI | v6 | Component library + theming |
| @mui/icons-material | v6 | Icon set |
| Vite | v5 | Build tool |
| @emotion/react + styled | v11 | MUI styling engine |
