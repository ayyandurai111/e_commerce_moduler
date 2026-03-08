// ─────────────────────────────────────────────────────────────
//  FeaturedProducts — Home Page section
//
//  ✅ Uses shared <ProductCard> from components/common
//     Card sizing controlled ONLY by BRAND.card* in theme.js
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, Container, Typography, Tabs, Tab, Button } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }      from "../../../theme/theme";
import ProductCard, { ProductCardGrid } from "../../../components/common/ProductCard/ProductCard";

// ── FilterTabs ────────────────────────────────────────────────
const FilterTabs = ({ filters = [], activeFilter, onChange }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 3, md: 5 } }}>
      <Tabs
        value={activeFilter}
        onChange={(_, val) => onChange(val)}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ style: { backgroundColor: theme.palette.secondary.main, height: 2 } }}
        sx={{
          "& .MuiTab-root": {
            minWidth: "auto",
            px:          { xs: 2, md: 3 },
            fontSize:    BRAND.sizeSm,
            fontWeight:  theme.typography.fontWeightMedium,
            fontFamily:  BRAND.fontBody,
            color:       theme.palette.text.secondary,
            borderRadius: BRAND.radiusButton,
            mr:          0.5,
            transition:  "all 0.2s ease",
            "&:hover": {
              color:           theme.palette.secondary.main,
              backgroundColor: alpha(theme.palette.secondary.main, 0.06) } },
          "& .Mui-selected": {
            color:      `${theme.palette.secondary.main} !important`,
            fontWeight: theme.typography.fontWeightBold } }}
      >
        {filters.map((f) => <Tab key={f} label={f} value={f} />)}
      </Tabs>
    </Box>
  );
};

// ── Main export ───────────────────────────────────────────────
const FeaturedProducts = ({
  enabled    = true,
  title      = "Featured Products",
  subtitle   = "Handpicked pieces our stylists are obsessing over this season.",
  products   = [],
  filters    = ["All"],
  onAddToCart,
  onQuickView,
  currency   = "$",
  maxVisible = 8 }) => {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState(filters?.[0] || "All");

  if (!enabled || !products?.length) return null;

  const filtered = activeFilter === "All"
    ? products.slice(0, maxVisible)
    : products
        .filter((p) => p.category === activeFilter || p.tags?.includes(activeFilter))
        .slice(0, maxVisible);

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="xl">

        {/* Section header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
          <Typography variant="overline" sx={{
            color:         theme.palette.secondary.main,
            fontWeight:    theme.typography.fontWeightBold,
            letterSpacing: "0.15em",
            display:       "block",
            mb:            1,
            fontFamily:    BRAND.fontBody }}>
            FEATURED
          </Typography>
          <Typography variant="h2" sx={{ mb: 1.5, fontFamily: BRAND.fontDisplay }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary"
            sx={{ maxWidth: 480, mx: "auto", fontFamily: BRAND.fontBody }}>
            {subtitle}
          </Typography>
        </Box>

        {filters?.length > 1 && (
          <FilterTabs filters={filters} activeFilter={activeFilter} onChange={setActiveFilter} />
        )}

        {/* ─── Product Grid ─────────────────────────────────
            sx={{ display: "flex" }} on each Grid is
            REQUIRED — it makes cards stretch to equal height  */}
        <ProductCardGrid>
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id || i}
              product={product}
              currency={currency}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </ProductCardGrid>

        <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 } }}>
          <Button
            variant="outlined" color="primary" size="large"
            sx={{
              borderWidth: 2, px: 5, py: 1.5,
              fontWeight:  theme.typography.fontWeightBold,
              fontFamily:  BRAND.fontBody,
              "&:hover": { borderWidth: 2, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText },
              transition:  "all 0.25s ease" }}
          >
            View All Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
