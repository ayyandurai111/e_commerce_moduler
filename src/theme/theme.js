// ============================================================
//  theme.js — E-Commerce Design System & Theme Configuration
//  Pass this object (or override any key) as the `theme` prop
//  to any ECommerce component for full visual customisation.
// ============================================================

const theme = {
  // ─── Brand ────────────────────────────────────────────────
  brand: {
    name: "LUXE STORE",
    tagline: "Refined Living, Delivered.",
    logo: null,                     // URL string or null (uses text)
    favicon: null,
  },

  // ─── Color Palette ────────────────────────────────────────
  colors: {
    // Core
    primary:        "#1a1a2e",      // deep navy — buttons, headings
    secondary:      "#e94560",      // vivid rose — accents, badges, hover
    accent:         "#f5a623",      // warm gold — stars, highlights
    surface:        "#ffffff",      // card / panel backgrounds
    background:     "#f7f5f2",      // page canvas
    backgroundAlt:  "#1a1a2e",      // dark sections (hero, footer)

    // Text
    textPrimary:    "#1a1a2e",
    textSecondary:  "#6b7280",
    textInverse:    "#ffffff",
    textMuted:      "#9ca3af",

    // Status
    success:        "#10b981",
    warning:        "#f5a623",
    error:          "#ef4444",
    info:           "#3b82f6",

    // Borders & Dividers
    border:         "#e5e7eb",
    borderFocus:    "#e94560",

    // Overlays
    overlay:        "rgba(26,26,46,0.55)",
    cardHover:      "rgba(233,69,96,0.07)",
  },

  // ─── Typography ───────────────────────────────────────────
  typography: {
    fontDisplay:  "'Playfair Display', Georgia, serif",   // headings
    fontBody:     "'DM Sans', system-ui, sans-serif",     // body text
    fontMono:     "'JetBrains Mono', monospace",          // prices / code

    // Scale (rem)
    sizeXs:   "0.75rem",
    sizeSm:   "0.875rem",
    sizeMd:   "1rem",
    sizeLg:   "1.125rem",
    sizeXl:   "1.25rem",
    size2xl:  "1.5rem",
    size3xl:  "1.875rem",
    size4xl:  "2.25rem",
    size5xl:  "3rem",
    sizeHero: "4rem",

    weightLight:    300,
    weightNormal:   400,
    weightMedium:   500,
    weightSemibold: 600,
    weightBold:     700,
    weightBlack:    900,

    lineHeightTight:  1.25,
    lineHeightNormal: 1.6,
    lineHeightRelax:  1.8,

    letterSpacingWide:   "0.05em",
    letterSpacingWider:  "0.1em",
    letterSpacingTight:  "-0.02em",
  },

  // ─── Spacing ──────────────────────────────────────────────
  spacing: {
    xs:   "4px",
    sm:   "8px",
    md:   "16px",
    lg:   "24px",
    xl:   "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "96px",
    "5xl": "128px",
  },

  // ─── Border Radius ────────────────────────────────────────
  radius: {
    none:   "0",
    sm:     "4px",
    md:     "8px",
    lg:     "12px",
    xl:     "16px",
    "2xl":  "24px",
    full:   "9999px",
    card:   "12px",
    button: "8px",
    badge:  "9999px",
    input:  "8px",
  },

  // ─── Shadows ──────────────────────────────────────────────
  shadows: {
    sm:     "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
    md:     "0 4px 12px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
    lg:     "0 10px 28px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.08)",
    xl:     "0 20px 48px rgba(0,0,0,0.16), 0 8px 16px rgba(0,0,0,0.10)",
    card:   "0 2px 16px rgba(26,26,46,0.08)",
    cardHover: "0 8px 32px rgba(233,69,96,0.18)",
    button: "0 4px 14px rgba(233,69,96,0.35)",
    inner:  "inset 0 2px 4px rgba(0,0,0,0.06)",
  },

  // ─── Transitions ──────────────────────────────────────────
  transitions: {
    fast:    "0.15s ease",
    normal:  "0.25s ease",
    slow:    "0.4s ease",
    bounce:  "0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    spring:  "0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },

  // ─── Breakpoints ──────────────────────────────────────────
  breakpoints: {
    xs:  "320px",
    sm:  "480px",
    md:  "768px",
    lg:  "1024px",
    xl:  "1280px",
    "2xl": "1536px",
  },

  // ─── Layout ───────────────────────────────────────────────
  layout: {
    containerMax:   "1280px",
    containerPad:   "24px",
    navHeight:      "68px",
    sidebarWidth:   "320px",
    gridColumns:    4,           // product grid default columns
    gridGap:        "24px",
  },

  // ─── Z-Index Stack ────────────────────────────────────────
  zIndex: {
    base:    0,
    raised:  10,
    dropdown: 100,
    sticky:  200,
    overlay: 300,
    modal:   400,
    toast:   500,
  },

  // ─── Component Defaults ───────────────────────────────────
  components: {

    // Navbar
    navbar: {
      background:       "#ffffff",
      backgroundScroll: "#1a1a2e",
      textColor:        "#1a1a2e",
      textColorScroll:  "#ffffff",
      borderBottom:     "1px solid #e5e7eb",
      height:           "68px",
      logoSize:         "1.6rem",
      showSearch:       true,
      showWishlist:     true,
      showCart:         true,
      showAccount:      true,
    },

    // Hero Section
    hero: {
      minHeight:        "90vh",
      background:       "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      textColor:        "#ffffff",
      titleSize:        "4rem",
      subtitleSize:     "1.25rem",
      ctaBackground:    "#e94560",
      ctaColor:         "#ffffff",
      ctaRadius:        "8px",
      overlayOpacity:   0.4,
      showBadge:        true,
      badgeText:        "NEW COLLECTION",
      animateIn:        true,
    },

    // Product Card
    productCard: {
      background:       "#ffffff",
      borderRadius:     "12px",
      shadow:           "0 2px 16px rgba(26,26,46,0.08)",
      shadowHover:      "0 8px 32px rgba(233,69,96,0.18)",
      imageAspectRatio: "3/4",
      showQuickAdd:     true,
      showWishlist:     true,
      showRating:       true,
      showBadge:        true,
      badgeNew:         { bg: "#e94560", color: "#fff" },
      badgeSale:        { bg: "#f5a623", color: "#fff" },
      badgeBestSeller:  { bg: "#1a1a2e", color: "#fff" },
      priceColor:       "#1a1a2e",
      salePriceColor:   "#e94560",
      transition:       "0.3s ease",
    },

    // Button
    button: {
      primary: {
        background:   "#e94560",
        color:        "#ffffff",
        hoverBg:      "#c73652",
        radius:       "8px",
        padding:      "12px 28px",
        fontSize:     "0.9rem",
        fontWeight:   600,
        letterSpacing: "0.04em",
        shadow:       "0 4px 14px rgba(233,69,96,0.35)",
      },
      secondary: {
        background:   "transparent",
        color:        "#1a1a2e",
        border:       "2px solid #1a1a2e",
        hoverBg:      "#1a1a2e",
        hoverColor:   "#ffffff",
        radius:       "8px",
        padding:      "12px 28px",
      },
      ghost: {
        background:   "transparent",
        color:        "#e94560",
        hoverBg:      "rgba(233,69,96,0.08)",
        radius:       "8px",
        padding:      "10px 20px",
      },
      icon: {
        background:   "#f7f5f2",
        color:        "#1a1a2e",
        hoverBg:      "#e94560",
        hoverColor:   "#ffffff",
        radius:       "50%",
        size:         "40px",
      },
    },

    // Input / Form
    input: {
      background:     "#ffffff",
      border:         "1.5px solid #e5e7eb",
      borderFocus:    "1.5px solid #e94560",
      radius:         "8px",
      padding:        "12px 16px",
      fontSize:       "0.95rem",
      color:          "#1a1a2e",
      placeholderColor: "#9ca3af",
      shadow:         "none",
      shadowFocus:    "0 0 0 3px rgba(233,69,96,0.12)",
    },

    // Badge
    badge: {
      radius:       "9999px",
      padding:      "3px 10px",
      fontSize:     "0.7rem",
      fontWeight:   700,
      letterSpacing: "0.06em",
    },

    // Rating Stars
    rating: {
      filledColor:  "#f5a623",
      emptyColor:   "#e5e7eb",
      size:         "14px",
    },

    // Cart Sidebar
    cart: {
      width:        "380px",
      background:   "#ffffff",
      headerBg:     "#1a1a2e",
      headerColor:  "#ffffff",
      shadow:       "-4px 0 40px rgba(0,0,0,0.15)",
      itemRadius:   "8px",
      checkoutBg:   "#e94560",
      checkoutColor: "#ffffff",
    },

    // Category Chip
    categoryChip: {
      background:     "#f7f5f2",
      backgroundActive: "#1a1a2e",
      color:          "#1a1a2e",
      colorActive:    "#ffffff",
      border:         "1.5px solid #e5e7eb",
      borderActive:   "1.5px solid #1a1a2e",
      radius:         "9999px",
      padding:        "8px 20px",
      fontSize:       "0.85rem",
      fontWeight:     500,
    },

    // Footer
    footer: {
      background:   "#1a1a2e",
      textColor:    "#d1d5db",
      linkColor:    "#9ca3af",
      linkHover:    "#e94560",
      borderColor:  "rgba(255,255,255,0.08)",
      copyrightColor: "#6b7280",
    },

    // Toast / Notification
    toast: {
      success: { bg: "#10b981", color: "#fff" },
      error:   { bg: "#ef4444", color: "#fff" },
      warning: { bg: "#f5a623", color: "#fff" },
      info:    { bg: "#3b82f6", color: "#fff" },
      radius:  "10px",
      shadow:  "0 8px 24px rgba(0,0,0,0.15)",
    },
  },

  // ─── Content Defaults (swap per client) ───────────────────
  content: {
    currency:       "USD",
    currencySymbol: "$",
    locale:         "en-US",
    freeShippingThreshold: 50,
    showReviews:    true,
    showStock:      true,
    enableWishlist: true,
    enableCompare:  false,
    taxIncluded:    false,
    shippingNote:   "Free shipping on orders over $50",
    returnPolicy:   "30-day hassle-free returns",
  },
};

export default theme;
