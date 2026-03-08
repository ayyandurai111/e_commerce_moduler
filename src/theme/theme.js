import { createTheme } from "@mui/material/styles";

// ╔══════════════════════════════════════════════════════════════╗
//  ✏️  BRAND CONFIG — EDIT ONLY THIS SECTION
//  Every color, font, size, and radius used across the whole
//  site is derived from the values below. Change here → done.
// ╚══════════════════════════════════════════════════════════════╝

const BRAND = {
  // ── Colors ────────────────────────────────────────────────────
  colorPrimary:    "#1a1a2e",   // main navy  — navbar, headings, buttons
  colorSecondary:  "#e94560",   // rose red   — accents, CTAs, badges, hover
  colorAccent:     "#f5a623",   // warm gold  — stars, highlights, icons
  colorBg:         "#f7f5f2",   // page canvas background
  colorSurface:    "#ffffff",   // cards, panels, inputs
  colorDark:       "#1a1a2e",   // hero, footer, dark sections

  // ── Typography ────────────────────────────────────────────────
  fontDisplay: "'Playfair Display', Georgia, serif",  // headings / display
  fontBody:    "'DM Sans', system-ui, sans-serif",    // body text / UI
  fontMono:    "'JetBrains Mono', monospace",         // prices / code

  // ── Font Sizes (rem) ──────────────────────────────────────────
  sizeHero:  "4rem",     // h1 hero title (desktop)
  sizeH2:    "2.25rem",  // section headings
  sizeH3:    "1.875rem",
  sizeH4:    "1.5rem",
  sizeLg:    "1.125rem", // h6-level
  sizeBody:  "1rem",     // body1
  sizeSm:    "0.875rem", // body2 / secondary
  sizeXs:    "0.75rem",  // caption / badge
  sizeXxs:   "0.65rem",  // tiny labels / overline chips

  // ── Font Weights ───────────────────────────────────────────────
  weightNormal:   400,
  weightMedium:   500,
  weightSemibold: 600,
  weightBold:     700,
  weightBlack:    900,

  // ── Spacing Base ──────────────────────────────────────────────
  spacingBase: 8,   // MUI multiplier: spacing(1) = 8px

  // ── Border Radius ─────────────────────────────────────────────
  radiusCard:   "12px",
  radiusButton: "8px",
  radiusBadge:  "9999px",
  radiusInput:  "8px",
  radiusChip:   "9999px",

  // ── Product Card Dimensions ────────────────────────────────────
  // ONE place to control every product card size site-wide.
  // Used by FeaturedProducts (Home) AND PLPProductCard (PLP) — same values.
  //
  //  Image area  → fixed aspect-ratio "3/4"  (portrait — looks like a fashion card)
  //  Content area→ fixed minHeight so brand + name(2 lines) + rating + price
  //                all fit without causing card height differences
  //
  // ── Grid Card — Fixed Width (industry standard) ───────────────
  //
  //  Reference sites   Width used
  //  ────────────────  ──────────
  //  ASOS              280 px
  //  Zara              300 px
  //  Net-a-Porter      290 px
  //  Farfetch          285 px
  //  H&M               270 px
  //  ➜ LUXE STORE      280 px  ← chosen value (edit ONE line to change sitewide)
  //
  cardWidth:           "280px",   // fixed card width — desktop & tablet
  //
  //  Mobile layout rule (industry standard = 2 columns on phones)
  //  Grid uses repeat(2, 1fr) so each card = ~50% of screen width.
  //  Cards never shrink below this on any screen.
  cardMinWidthMobile:  "140px",   // safety floor — never smaller than this on xs
  //
  // ── Image area ────────────────────────────────────────────────
  cardImageRatio:      "3 / 4",   // CSS aspect-ratio — portrait (fashion standard)
  cardContentMinH:     "130px",   // min-height of text area — same on every card
  cardNameLines:       2,         // WebkitLineClamp — always exactly 2 lines
  cardNameMinH:        "2.8em",   // reserved space so short names don't collapse card
  //
  // Responsive image min-height fallback (for browsers without aspect-ratio)
  cardImageHeightXs:   "180px",   // mobile
  cardImageHeightSm:   "200px",   // large phone
  cardImageHeightMd:   "220px",   // tablet
  cardImageHeightLg:   "240px",   // desktop
  //
  // ── List-view card ────────────────────────────────────────────
  cardListImageW:      "200px",   // image column width — desktop
  cardListImageWMd:    "160px",   // image column width — tablet
  cardListImageWXs:    "120px",   // image column width — mobile
  cardListMinH:        "160px",   // minimum card height in list mode
};

// ── Auto-compute shadows from brand colors ────────────────────
const hex2rgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
};
const pRGB = hex2rgb(BRAND.colorPrimary);
const sRGB = hex2rgb(BRAND.colorSecondary);

const shadowCard      = `0 2px 16px rgba(${pRGB},0.08)`;
const shadowCardHover = `0 8px 32px rgba(${sRGB},0.18)`;
const shadowButton    = `0 4px 14px rgba(${sRGB},0.35)`;

// ═════════════════════════════════════════════════════════════════
//  MUI createTheme — DO NOT EDIT BELOW (everything reads BRAND)
// ═════════════════════════════════════════════════════════════════

const theme = createTheme({

  palette: {
    mode: "light",
    primary:    { main: BRAND.colorPrimary,   light: BRAND.colorPrimary,   dark: BRAND.colorDark,      contrastText: "#ffffff" },
    secondary:  { main: BRAND.colorSecondary, light: BRAND.colorSecondary, dark: BRAND.colorSecondary, contrastText: "#ffffff" },
    warning:    { main: BRAND.colorAccent  },
    success:    { main: "#10b981"          },
    error:      { main: "#ef4444"          },
    info:       { main: "#3b82f6"          },
    background: { default: BRAND.colorBg, paper: BRAND.colorSurface, alt: BRAND.colorDark },
    text:       { primary: BRAND.colorPrimary, secondary: "#6b7280", disabled: "#9ca3af" },
    divider:    "#e5e7eb",
  },

  typography: {
    fontWeightSemibold: BRAND.weightSemibold,   // 600 — not in MUI default
    fontWeightBlack:    BRAND.weightBlack,       // 900 — not in MUI default
    fontFamily: BRAND.fontBody,
    h1: { fontFamily: BRAND.fontDisplay, fontWeight: 900, fontSize: BRAND.sizeHero,  lineHeight: 1.1,  letterSpacing: "-0.02em", "@media (max-width:600px)": { fontSize: "2.25rem" } },
    h2: { fontFamily: BRAND.fontDisplay, fontWeight: 700, fontSize: BRAND.sizeH2,   lineHeight: 1.25, letterSpacing: "-0.02em", "@media (max-width:600px)": { fontSize: "1.75rem" } },
    h3: { fontFamily: BRAND.fontDisplay, fontWeight: 700, fontSize: BRAND.sizeH3,   lineHeight: 1.25 },
    h4: { fontFamily: BRAND.fontDisplay, fontWeight: 600, fontSize: BRAND.sizeH4,   lineHeight: 1.3  },
    h5: { fontFamily: BRAND.fontBody,    fontWeight: 600, fontSize: "1.25rem"  },
    h6: { fontFamily: BRAND.fontBody,    fontWeight: 600, fontSize: "1.125rem" },
    body1:    { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeBody, lineHeight: 1.6  },
    body2:    { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm,   lineHeight: 1.6, color: "#6b7280" },
    subtitle1:{ fontFamily: BRAND.fontBody, fontSize: "1.125rem", lineHeight: 1.6 },
    subtitle2:{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, fontWeight: 500 },
    button:   { fontFamily: BRAND.fontBody, fontWeight: 600, letterSpacing: "0.04em", textTransform: "none", fontSize: "0.9rem" },
    caption:  { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, letterSpacing: "0.06em" },
    overline: { fontFamily: BRAND.fontBody, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em" },
  },

  spacing: BRAND.spacingBase,
  shape:   { borderRadius: parseInt(BRAND.radiusButton) },

  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
    "0 4px 12px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
    shadowCard,
    shadowCardHover,
    shadowButton,
    "0 10px 28px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.08)",
    "0 20px 48px rgba(0,0,0,0.16), 0 8px 16px rgba(0,0,0,0.10)",
    "-4px 0 40px rgba(0,0,0,0.15)",
    "0 8px 24px rgba(0,0,0,0.15)",
    ...Array(15).fill("none"),
    ...Array(5).fill("none"),
  ],

  breakpoints: {
    values: { xs: 0, sm: 480, md: 768, lg: 1024, xl: 1280 },
  },

  components: {

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius:  BRAND.radiusButton,
          padding:       "12px 28px",
          fontWeight:    600,
          letterSpacing: "0.04em",
          textTransform: "none",
          transition:    "all 0.25s ease",
        },
        containedPrimary: {
          backgroundColor: BRAND.colorPrimary,
          "&:hover": { backgroundColor: BRAND.colorDark, boxShadow: `0 4px 14px rgba(${pRGB},0.3)` },
        },
        containedSecondary: {
          backgroundColor: BRAND.colorSecondary,
          boxShadow: shadowButton,
          "&:hover": { filter: "brightness(0.88)", boxShadow: `0 6px 20px rgba(${sRGB},0.45)`, transform: "translateY(-1px)" },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": { borderWidth: "2px" },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BRAND.radiusCard,
          boxShadow:    shadowCard,
          transition:   "box-shadow 0.3s ease, transform 0.3s ease",
          "&:hover": { boxShadow: shadowCardHover, transform: "translateY(-4px)" },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius:    BRAND.radiusInput,
            backgroundColor: BRAND.colorSurface,
            "& fieldset":    { borderColor: "#e5e7eb", borderWidth: "1.5px" },
            "&:hover fieldset": { borderColor: BRAND.colorSecondary },
            "&.Mui-focused fieldset": { borderColor: BRAND.colorSecondary, boxShadow: `0 0 0 3px rgba(${sRGB},0.12)` },
          },
        },
      },
    },

    MuiAppBar:       { styleOverrides: { root: { boxShadow: "0 1px 3px rgba(0,0,0,0.08)" } } },
    MuiChip:         { styleOverrides: { root: { borderRadius: BRAND.radiusChip, fontWeight: 500, fontSize: "0.85rem" } } },
    MuiTab:          { styleOverrides: { root: { textTransform: "none", fontWeight: 500, fontSize: "0.9rem" } } },
    MuiLinearProgress:{ styleOverrides: { root: { borderRadius: "4px" }, bar: { borderRadius: "4px" } } },
  },
});

// Export BRAND so components can use raw values (e.g. gradient strings)
export { BRAND };
export default theme;
