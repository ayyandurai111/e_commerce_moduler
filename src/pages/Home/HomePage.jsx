// ─────────────────────────────────────────────────────────────
//  HomePage — full storefront landing page
//
//  Layout sections (top → bottom):
//    1. Navbar
//    2. Hero banner   — headline + CTA ("Shop Now")
//    3. Trust bar     — free shipping / returns / warranty badges
//    4. Category strip — horizontal scroll on mobile, grid on md+
//    5. Featured products grid — top picks
//    6. Promo banner  — mid-page full-width accent
//    7. Trending grid — second product row
//    8. Newsletter strip
//    9. Footer
//
//  Connector-customisable props:
//    hero          { headline, subline, cta, image }
//    categories    [{ id, label, image?, badge? }]
//    featuredProducts / trendingProducts  — same shape as ProductCard
//    onShopNow, onProductClick, onCategoryClick
//    onNewsletterSubmit
//    navbar, footer
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, Container, Grid, Typography, Button,
  Chip, TextField, InputAdornment, Snackbar, Alert,
  Skeleton,
} from "@mui/material";
import ArrowForwardIcon        from "@mui/icons-material/ArrowForward";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayIcon               from "@mui/icons-material/Replay";
import VerifiedOutlinedIcon     from "@mui/icons-material/VerifiedOutlined";
import SendIcon                 from "@mui/icons-material/Send";
import { useTheme, alpha }      from "@mui/material/styles";
import { BRAND }                from "../../theme/theme";
import { STORE_CURRENCY, STORE_POLICY } from "../../config/store/storeConfig";
import Navbar                   from "../../components/layout/Navbar/Navbar";
import Footer                   from "../../components/layout/Footer/Footer";
import ProductCard, { ProductCardGrid } from "../../components/common/ProductCard/ProductCard";

// ── Default data (overridden by connector) ────────────────────
const DEFAULT_HERO = {
  headline:  "Luxury Redefined.",
  subline:   "Curated collections of the world's finest brands — delivered to your door.",
  cta:       "Shop Now",
  badge:     "New Season Arrivals",
};

const DEFAULT_CATEGORIES = [
  { id: "fashion",      label: "Fashion",      emoji: "👗" },
  { id: "watches",      label: "Watches",      emoji: "⌚" },
  { id: "beauty",       label: "Beauty",       emoji: "✨" },
  { id: "accessories",  label: "Accessories",  emoji: "💼" },
  { id: "footwear",     label: "Footwear",     emoji: "👠" },
  { id: "home",         label: "Home Décor",   emoji: "🏡" },
];

// ── Trust badges ──────────────────────────────────────────────
const TRUST_ITEMS = [
  { Icon: LocalShippingOutlinedIcon, label: `Free Shipping over ₹${STORE_POLICY.freeShippingAbove}` },
  { Icon: ReplayIcon,                label: `${STORE_POLICY.returnDays}-Day Easy Returns`           },
  { Icon: VerifiedOutlinedIcon,      label: `${STORE_POLICY.warrantyYears}-Year Warranty`           },
];

// ── Section heading ───────────────────────────────────────────
const SectionLabel = ({ eyebrow, title, subtitle, center }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: center ? "center" : "left" }}>
      {eyebrow && (
        <Typography sx={{
          fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXxs,
          fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
          color: theme.palette.secondary.main, mb: 0.75,
        }}>
          {eyebrow}
        </Typography>
      )}
      <Typography sx={{
        fontFamily: BRAND.fontDisplay, fontWeight: 900,
        fontSize: { xs: "1.75rem", md: "2.5rem" },
        color: theme.palette.text.primary, lineHeight: 1.1,
      }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{
          fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm,
          color: theme.palette.text.secondary, mt: 1, maxWidth: 560,
          mx: center ? "auto" : 0,
        }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

// ── Product skeleton row ──────────────────────────────────────
const ProductRowSkeleton = ({ count = 4 }) => (
  <Grid container spacing={2}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid item xs={6} sm={4} md={3} key={i}>
        <Skeleton variant="rectangular" sx={{ aspectRatio: "3/4", borderRadius: BRAND.radiusCard, mb: 1 }} />
        <Skeleton variant="text" width="55%" height={13} />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="40%" height={18} />
      </Grid>
    ))}
  </Grid>
);

// ─────────────────────────────────────────────────────────────
//  HomePage
// ─────────────────────────────────────────────────────────────
const HomePage = ({
  // Layout
  navbar               = {},
  footer               = {},

  // Hero
  hero                 = {},
  heroLoading          = false,

  // Categories
  categories           = DEFAULT_CATEGORIES,

  // Products
  featuredProducts     = [],
  trendingProducts     = [],
  productsLoading      = false,

  // Promo banner (mid-page)
  promoBanner          = {},

  // Callbacks — wired by connector
  onShopNow,
  onProductClick,
  onCategoryClick,
  onAddToCart,
  onNewsletterSubmit,
}) => {
  const theme   = useTheme();
  const heroData = { ...DEFAULT_HERO, ...hero };

  const [email,   setEmail]   = useState("");
  const [snack,   setSnack]   = useState({ open: false, msg: "", severity: "success" });

  const handleNewsletter = () => {
    if (!email.trim() || !email.includes("@")) {
      setSnack({ open: true, msg: "Please enter a valid email address.", severity: "error" });
      return;
    }
    onNewsletterSubmit?.(email);
    setSnack({ open: true, msg: "🎉 You're subscribed! Welcome to LUXE.", severity: "success" });
    setEmail("");
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      <Navbar {...navbar} />

      {/* ══════════════════════════════════════════════════ */}
      {/* 1. HERO BANNER                                    */}
      {/* ══════════════════════════════════════════════════ */}
      <Box sx={{
        position:   "relative",
        overflow:   "hidden",
        minHeight:  { xs: 420, sm: 520, md: 620 },
        display:    "flex",
        alignItems: "center",
        background: `linear-gradient(135deg,
          ${theme.palette.primary.dark}  0%,
          ${theme.palette.primary.main}  55%,
          ${alpha(theme.palette.secondary.main, 0.55)} 100%)`,
      }}>
        {/* Decorative blobs */}
        <Box sx={{
          position: "absolute", inset: 0, pointerEvents: "none",
          "&::before": {
            content: '""', position: "absolute",
            width: 600, height: 600, borderRadius: "50%",
            background: alpha(theme.palette.secondary.main, 0.12),
            top: "-20%", right: "-10%",
          },
          "&::after": {
            content: '""', position: "absolute",
            width: 400, height: 400, borderRadius: "50%",
            background: alpha("#fff", 0.05),
            bottom: "-15%", left: "5%",
          },
        }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: { xs: "100%", md: 620 }, py: { xs: 6, md: 0 } }}>

            {heroData.badge && (
              <Chip
                label={heroData.badge}
                size="small"
                sx={{
                  fontFamily: BRAND.fontBody, fontWeight: 700,
                  fontSize: BRAND.sizeXxs, letterSpacing: "0.08em",
                  bgcolor: alpha(theme.palette.secondary.main, 0.92),
                  color: "#fff", mb: 2.5, borderRadius: BRAND.radiusButton,
                  px: 0.5,
                }}
              />
            )}

            {heroLoading ? (
              <>
                <Skeleton variant="text" width="70%" height={56} sx={{ mb: 1, bgcolor: alpha("#fff", 0.12) }} />
                <Skeleton variant="text" width="90%" height={24} sx={{ mb: 0.5, bgcolor: alpha("#fff", 0.08) }} />
                <Skeleton variant="text" width="60%" height={24} sx={{ mb: 3, bgcolor: alpha("#fff", 0.08) }} />
              </>
            ) : (
              <>
                <Typography
                  component="h1"
                  sx={{
                    fontFamily: BRAND.fontDisplay, fontWeight: 900,
                    fontSize: { xs: "2.5rem", sm: "3.25rem", md: "4rem" },
                    color: "#fff", lineHeight: 1.08, mb: 2,
                    textShadow: "0 2px 24px rgba(0,0,0,0.18)",
                  }}
                >
                  {heroData.headline}
                </Typography>

                <Typography sx={{
                  fontFamily: BRAND.fontBody, fontSize: { xs: BRAND.sizeSm, md: BRAND.sizeBody },
                  color: "rgba(255,255,255,0.78)", mb: 4, maxWidth: 480, lineHeight: 1.7,
                }}>
                  {heroData.subline}
                </Typography>
              </>
            )}

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                id="home-shop-now-btn"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={onShopNow}
                sx={{
                  fontFamily: BRAND.fontBody, fontWeight: 700,
                  fontSize: BRAND.sizeSm, textTransform: "none",
                  px: 3.5, py: 1.4,
                  bgcolor: "#fff", color: theme.palette.primary.dark,
                  borderRadius: BRAND.radiusButton,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.92)", transform: "translateY(-1px)" },
                  transition: "all 0.2s ease",
                }}
              >
                {heroData.cta}
              </Button>

              <Button
                id="home-explore-btn"
                variant="outlined"
                size="large"
                onClick={() => onCategoryClick?.(null)}
                sx={{
                  fontFamily: BRAND.fontBody, fontWeight: 600,
                  fontSize: BRAND.sizeSm, textTransform: "none",
                  px: 3, py: 1.4,
                  borderColor: "rgba(255,255,255,0.55)", color: "#fff",
                  borderRadius: BRAND.radiusButton,
                  "&:hover": { borderColor: "#fff", bgcolor: alpha("#fff", 0.08) },
                  transition: "all 0.2s ease",
                }}
              >
                Explore Collections
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════ */}
      {/* 2. TRUST BAR                                      */}
      {/* ══════════════════════════════════════════════════ */}
      <Box sx={{
        bgcolor:    theme.palette.background.paper,
        borderTop:  `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        py: { xs: 2, md: 2.5 },
      }}>
        <Container maxWidth="xl">
          <Grid container spacing={1} justifyContent="center">
            {TRUST_ITEMS.map(({ Icon, label }) => (
              <Grid item xs={12} sm={4} key={label}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.25, py: { xs: 0.5, sm: 0 } }}
              >
                <Icon sx={{ fontSize: 22, color: theme.palette.secondary.main, flexShrink: 0 }} />
                <Typography sx={{ fontFamily: BRAND.fontBody, fontWeight: 600, fontSize: BRAND.sizeXs, color: theme.palette.text.primary }}>
                  {label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════ */}
      {/* 3. CATEGORY STRIP                                 */}
      {/* ══════════════════════════════════════════════════ */}
      {categories.length > 0 && (
        <Box sx={{ py: { xs: 5, md: 7 } }}>
          <Container maxWidth="xl">
            <SectionLabel eyebrow="Browse By" title="Top Categories" />

            {/* Horizontal scroll on xs, wrap on md+ */}
            <Box sx={{
              display: "flex",
              gap: 2,
              overflowX: { xs: "auto", md: "unset" },
              flexWrap: { xs: "nowrap", md: "wrap" },
              pb: { xs: 1, md: 0 },
              "&::-webkit-scrollbar": { height: 4 },
              "&::-webkit-scrollbar-thumb": { borderRadius: 4, bgcolor: theme.palette.divider },
            }}>
              {categories.map((cat) => (
                <Box
                  id={`home-category-${cat.id}`}
                  key={cat.id}
                  onClick={() => onCategoryClick?.(cat)}
                  sx={{
                    flexShrink: 0,
                    display: "flex", flexDirection: "column", alignItems: "center",
                    gap: 1, cursor: "pointer",
                    px: { xs: 2.5, md: 3 }, py: { xs: 2.5, md: 3 },
                    minWidth: { xs: 110, md: "auto" },
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: BRAND.radiusCard,
                    bgcolor: theme.palette.background.paper,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: theme.palette.secondary.main,
                      boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.14)}`,
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Typography sx={{ fontSize: { xs: "2rem", md: "2.25rem" }, lineHeight: 1 }}>
                    {cat.emoji}
                  </Typography>
                  <Typography sx={{
                    fontFamily: BRAND.fontBody, fontWeight: 600,
                    fontSize: BRAND.sizeXs, color: theme.palette.text.primary,
                    textAlign: "center",
                  }}>
                    {cat.label}
                  </Typography>
                  {cat.badge && (
                    <Chip
                      label={cat.badge} size="small"
                      sx={{
                        height: 18, fontSize: "0.6rem", fontWeight: 700,
                        bgcolor: theme.palette.secondary.main, color: "#fff",
                        fontFamily: BRAND.fontBody,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* ══════════════════════════════════════════════════ */}
      {/* 4. FEATURED PRODUCTS                              */}
      {/* ══════════════════════════════════════════════════ */}
      <Box sx={{
        py: { xs: 5, md: 7 },
        bgcolor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", mb: { xs: 3, md: 4 }, flexWrap: "wrap", gap: 2 }}>
            <SectionLabel
              eyebrow="Curated Picks"
              title="Featured Products"
              subtitle="Handpicked by our luxury stylists — the season's must-haves."
            />
            <Button
              id="home-view-all-featured-btn"
              variant="outlined"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={onShopNow}
              sx={{
                fontFamily: BRAND.fontBody, fontWeight: 600, fontSize: BRAND.sizeXs,
                textTransform: "none", borderRadius: BRAND.radiusButton,
                borderColor: theme.palette.divider, color: theme.palette.text.primary,
                "&:hover": { borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main },
                mb: { xs: 0, md: 1 }, flexShrink: 0,
              }}
            >
              View All
            </Button>
          </Box>

          {productsLoading ? (
            <ProductRowSkeleton count={4} />
          ) : featuredProducts.length > 0 ? (
            <ProductCardGrid>
              {featuredProducts.map((p, i) => (
                <ProductCard
                  key={p.id ?? i}
                  product={p}
                  currency={STORE_CURRENCY}
                  onAddToCart={onAddToCart}
                  onQuickView={onProductClick}
                />
              ))}
            </ProductCardGrid>
          ) : (
            // Placeholder state — shown on first load before connector supplies data
            <Box sx={{
              py: 8, textAlign: "center",
              border: `1.5px dashed ${theme.palette.divider}`,
              borderRadius: BRAND.radiusCard,
            }}>
              <Typography sx={{ fontFamily: BRAND.fontBody, color: theme.palette.text.disabled, fontSize: BRAND.sizeSm }}>
                No featured products — add some in the connector.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════ */}
      {/* 5. PROMO BANNER                                   */}
      {/* ══════════════════════════════════════════════════ */}
      {(promoBanner.headline || promoBanner.cta) && (
        <Box sx={{
          py: { xs: 6, md: 8 },
          background: `linear-gradient(135deg,
            ${theme.palette.secondary.dark}  0%,
            ${theme.palette.secondary.main}  100%)`,
          textAlign: "center",
        }}>
          <Container maxWidth="md">
            {promoBanner.eyebrow && (
              <Typography sx={{
                fontFamily: BRAND.fontBody, fontWeight: 700, fontSize: BRAND.sizeXxs,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)", mb: 1.5,
              }}>
                {promoBanner.eyebrow}
              </Typography>
            )}
            <Typography sx={{
              fontFamily: BRAND.fontDisplay, fontWeight: 900,
              fontSize: { xs: "2rem", md: "3rem" }, color: "#fff", mb: 2,
            }}>
              {promoBanner.headline}
            </Typography>
            {promoBanner.subline && (
              <Typography sx={{
                fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm,
                color: "rgba(255,255,255,0.75)", mb: 4, maxWidth: 480, mx: "auto",
              }}>
                {promoBanner.subline}
              </Typography>
            )}
            <Button
              id="home-promo-cta-btn"
              variant="contained"
              onClick={promoBanner.onClick ?? onShopNow}
              sx={{
                fontFamily: BRAND.fontBody, fontWeight: 700, textTransform: "none",
                fontSize: BRAND.sizeSm, px: 4, py: 1.4,
                bgcolor: "#fff", color: theme.palette.secondary.dark,
                borderRadius: BRAND.radiusButton,
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}
            >
              {promoBanner.cta}
            </Button>
          </Container>
        </Box>
      )}

      {/* ══════════════════════════════════════════════════ */}
      {/* 6. TRENDING NOW                                   */}
      {/* ══════════════════════════════════════════════════ */}
      {(productsLoading || trendingProducts.length > 0) && (
        <Box sx={{ py: { xs: 5, md: 7 } }}>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", mb: { xs: 3, md: 4 }, flexWrap: "wrap", gap: 2 }}>
              <SectionLabel
                eyebrow="What's Hot"
                title="Trending Now"
                subtitle="Most loved pieces this season."
              />
              <Button
                id="home-view-all-trending-btn"
                variant="outlined"
                size="small"
                endIcon={<ArrowForwardIcon />}
                onClick={onShopNow}
                sx={{
                  fontFamily: BRAND.fontBody, fontWeight: 600, fontSize: BRAND.sizeXs,
                  textTransform: "none", borderRadius: BRAND.radiusButton,
                  borderColor: theme.palette.divider, color: theme.palette.text.primary,
                  "&:hover": { borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main },
                  mb: { xs: 0, md: 1 }, flexShrink: 0,
                }}
              >
                View All
              </Button>
            </Box>

            {productsLoading ? (
              <ProductRowSkeleton count={4} />
            ) : (
              <ProductCardGrid>
                {trendingProducts.map((p, i) => (
                  <ProductCard
                    key={p.id ?? i}
                    product={p}
                    currency={STORE_CURRENCY}
                    onAddToCart={onAddToCart}
                    onQuickView={onProductClick}
                  />
                ))}
              </ProductCardGrid>
            )}
          </Container>
        </Box>
      )}

      {/* ══════════════════════════════════════════════════ */}
      {/* 7. NEWSLETTER STRIP                               */}
      {/* ══════════════════════════════════════════════════ */}
      <Box sx={{
        py: { xs: 6, md: 8 },
        bgcolor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <SectionLabel
            eyebrow="Stay In The Loop"
            title="Join the Inner Circle"
            subtitle="Get early access to new arrivals, exclusive offers and style guides — straight to your inbox."
            center
          />
          <Box
            sx={{ display: "flex", gap: 1.5, flexDirection: { xs: "column", sm: "row" } }}
            component="form"
            onSubmit={(e) => { e.preventDefault(); handleNewsletter(); }}
          >
            <TextField
              id="home-newsletter-email"
              placeholder="Your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                sx: {
                  fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm,
                  borderRadius: BRAND.radiusButton,
                  bgcolor: theme.palette.background.default,
                },
              }}
            />
            <Button
              id="home-newsletter-submit-btn"
              type="submit"
              variant="contained"
              color="secondary"
              endIcon={<SendIcon />}
              sx={{
                fontFamily: BRAND.fontBody, fontWeight: 700, textTransform: "none",
                fontSize: BRAND.sizeSm, px: 3, py: 1, borderRadius: BRAND.radiusButton,
                whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              Subscribe
            </Button>
          </Box>
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXxs, color: theme.palette.text.disabled, mt: 1.5 }}>
            No spam — unsubscribe any time.
          </Typography>
        </Container>
      </Box>

      <Footer {...footer} />

      {/* ── Global Snackbar ───────────────────────────── */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.severity} variant="filled"
          onClose={() => setSnack(s => ({ ...s, open: false }))}
          sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, borderRadius: BRAND.radiusButton }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
