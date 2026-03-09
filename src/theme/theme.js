import { createTheme } from "@mui/material/styles";

const BRAND = {
  colorPrimary:   "#1a1a2e",
  colorSecondary: "#e94560",
  colorAccent:    "#f5a623",
  colorBg:        "#f7f5f2",
  colorSurface:   "#ffffff",
  colorDark:      "#1a1a2e",

  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody:    "'DM Sans', system-ui, sans-serif",
  fontMono:    "'JetBrains Mono', monospace",

  sizeHero:  "4rem",
  sizeH2:    "2.25rem",
  sizeH3:    "1.875rem",
  sizeH4:    "1.5rem",
  size3xl:   "1.875rem",
  sizeLg:    "1.125rem",
  sizeBody:  "1rem",
  sizeSm:    "0.875rem",
  sizeXs:    "0.75rem",
  sizeXxs:   "0.65rem",

  weightNormal:   400,
  weightMedium:   500,
  weightSemibold: 600,
  weightBold:     700,
  weightBlack:    900,

  spacingBase: 8,

  radiusCard:   "12px",
  radiusButton: "8px",
  radiusBadge:  "9999px",
  radiusInput:  "8px",
  radiusChip:   "9999px",

  cardWidth:          "280px",
  cardMinWidthMobile: "140px",
  cardImageRatio:     "3 / 4",
  cardContentMinH:    "130px",
  cardNameLines:      2,
  cardNameMinH:       "2.8em",
  cardImageHeightXs:  "180px",
  cardImageHeightSm:  "200px",
  cardImageHeightMd:  "220px",
  cardImageHeightLg:  "240px",
  cardListImageW:     "200px",
  cardListImageWMd:   "160px",
  cardListImageWXs:   "120px",
  cardListMinH:       "160px",
  savedCardHeight:    "320px",
  savedCardImageHeight: "200px",
};

const hex2rgb = (hex) => {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
};
const pRGB = hex2rgb(BRAND.colorPrimary);
const sRGB = hex2rgb(BRAND.colorSecondary);

const shadowCard      = `0 2px 16px rgba(${pRGB},0.08)`;
const shadowCardHover = `0 8px 32px rgba(${sRGB},0.18)`;
const shadowButton    = `0 4px 14px rgba(${sRGB},0.35)`;

const theme = createTheme({
  palette: {
    mode: "light",
    primary:    { main: BRAND.colorPrimary,   light: BRAND.colorPrimary,   dark: BRAND.colorDark,      contrastText: "#ffffff" },
    secondary:  { main: BRAND.colorSecondary, light: BRAND.colorSecondary, dark: BRAND.colorSecondary, contrastText: "#ffffff" },
    warning:    { main: BRAND.colorAccent },
    success:    { main: "#10b981" },
    error:      { main: "#ef4444" },
    info:       { main: "#3b82f6" },
    background: { default: BRAND.colorBg, paper: BRAND.colorSurface, alt: BRAND.colorDark },
    text:       { primary: BRAND.colorPrimary, secondary: "#6b7280", disabled: "#9ca3af" },
    divider:    "#e5e7eb",
  },
  typography: {
    fontWeightSemibold: BRAND.weightSemibold,
    fontWeightBlack:    BRAND.weightBlack,
    fontFamily: BRAND.fontBody,
    h1: { fontFamily: BRAND.fontDisplay, fontWeight:900, fontSize: BRAND.sizeHero, lineHeight:1.1, letterSpacing:"-0.02em", "@media (max-width:600px)":{ fontSize:"2.25rem" } },
    h2: { fontFamily: BRAND.fontDisplay, fontWeight:700, fontSize: BRAND.sizeH2,  lineHeight:1.25, letterSpacing:"-0.02em", "@media (max-width:600px)":{ fontSize:"1.75rem" } },
    h3: { fontFamily: BRAND.fontDisplay, fontWeight:700, fontSize: BRAND.sizeH3,  lineHeight:1.25 },
    h4: { fontFamily: BRAND.fontDisplay, fontWeight:600, fontSize: BRAND.sizeH4,  lineHeight:1.3  },
    h5: { fontFamily: BRAND.fontBody,    fontWeight:600, fontSize: "1.25rem"  },
    h6: { fontFamily: BRAND.fontBody,    fontWeight:600, fontSize: "1.125rem" },
    body1:    { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeBody, lineHeight:1.6 },
    body2:    { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm,   lineHeight:1.6, color:"#6b7280" },
    subtitle1:{ fontFamily: BRAND.fontBody, fontSize:"1.125rem", lineHeight:1.6 },
    subtitle2:{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, fontWeight:500 },
    button:   { fontFamily: BRAND.fontBody, fontWeight:600, letterSpacing:"0.04em", textTransform:"none", fontSize:"0.9rem" },
    caption:  { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, letterSpacing:"0.06em" },
    overline: { fontFamily: BRAND.fontBody, fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.1em" },
  },
  spacing: BRAND.spacingBase,
  shape:   { borderRadius: parseInt(BRAND.radiusButton) },
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
    "0 4px 12px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
    shadowCard, shadowCardHover, shadowButton,
    "0 10px 28px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.08)",
    "0 20px 48px rgba(0,0,0,0.16), 0 8px 16px rgba(0,0,0,0.10)",
    "-4px 0 40px rgba(0,0,0,0.15)",
    "0 8px 24px rgba(0,0,0,0.15)",
    ...Array(15).fill("none"),
    ...Array(5).fill("none"),
  ],
  breakpoints: { values: { xs:0, sm:480, md:768, lg:1024, xl:1280 } },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius:BRAND.radiusButton, padding:"12px 28px", fontWeight:600, letterSpacing:"0.04em", textTransform:"none", transition:"all 0.25s ease" },
        containedPrimary:   { backgroundColor:BRAND.colorPrimary,   "&:hover":{ backgroundColor:BRAND.colorDark,      boxShadow:`0 4px 14px rgba(${pRGB},0.3)` } },
        containedSecondary: { backgroundColor:BRAND.colorSecondary, boxShadow:shadowButton, "&:hover":{ filter:"brightness(0.88)", boxShadow:`0 6px 20px rgba(${sRGB},0.45)`, transform:"translateY(-1px)" } },
        outlined: { borderWidth:"2px", "&:hover":{ borderWidth:"2px" } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius:BRAND.radiusCard, boxShadow:shadowCard, transition:"box-shadow 0.3s ease, transform 0.3s ease", "&:hover":{ boxShadow:shadowCardHover, transform:"translateY(-4px)" } },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius:BRAND.radiusInput, backgroundColor:BRAND.colorSurface,
            "& fieldset":{ borderColor:"#e5e7eb", borderWidth:"1.5px" },
            "&:hover fieldset":{ borderColor:BRAND.colorSecondary },
            "&.Mui-focused fieldset":{ borderColor:BRAND.colorSecondary, boxShadow:`0 0 0 3px rgba(${sRGB},0.12)` },
          },
        },
      },
    },
    MuiAppBar:        { styleOverrides:{ root:{ boxShadow:"0 1px 3px rgba(0,0,0,0.08)" } } },
    MuiChip:          { styleOverrides:{ root:{ borderRadius:BRAND.radiusChip, fontWeight:500, fontSize:"0.85rem" } } },
    MuiTab:           { styleOverrides:{ root:{ textTransform:"none", fontWeight:500, fontSize:"0.9rem" } } },
    MuiLinearProgress:{ styleOverrides:{ root:{ borderRadius:"4px" }, bar:{ borderRadius:"4px" } } },
  },
});

export { BRAND };
export default theme;
