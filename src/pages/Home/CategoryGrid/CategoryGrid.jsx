import React from "react";
import { Box, Container, Typography, Card, CardContent, Chip } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BRAND } from "../../../theme/theme";

// ── CategoryCard ──────────────────────────────────────────────
const CategoryCard = ({ category = {}, index = 0 }) => {
  const theme = useTheme();

  // Default gradients use theme palette colors
  const defaultGradients = [
    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
    `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, #533483 100%)`,
    `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.warning.main} 100%)`,
    `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.primary.main} 100%)`,
    `linear-gradient(135deg, #533483 0%, ${theme.palette.secondary.main} 100%)`,
  ];

  const bg = category.image
    ? undefined
    : (category.gradient || defaultGradients[index % defaultGradients.length]);

  return (
    <Card
      component="a"
      href={category.url || "#"}
      elevation={0}
      sx={{
        position:       "relative",
        borderRadius:   BRAND.radiusCard,
        overflow:       "hidden",
        cursor:         "pointer",
        textDecoration: "none",
        aspectRatio:    "3/4",
        background:     bg,
        display:        "block",
        "&:hover .cat-overlay": { opacity: 1 },
        "&:hover .cat-arrow":   { transform: "translateX(4px)" },
        "&:hover": {
          transform:  "translateY(-6px)",
          boxShadow:  `0 16px 40px ${alpha(theme.palette.common.black, 0.22)}` },
        transition: "transform 0.35s ease, box-shadow 0.35s ease" }}
    >
      {category.image && (
        <Box
          component="img"
          src={category.image}
          alt={category.name}
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* Gradient overlay */}
      <Box sx={{
        position:   "absolute",
        inset:      0,
        background: `linear-gradient(180deg,
          ${alpha(theme.palette.common.black, 0.05)} 0%,
          ${alpha(theme.palette.common.black, 0.7)} 100%)` }} />

      {/* Hover tint */}
      <Box className="cat-overlay" sx={{
        position:        "absolute",
        inset:           0,
        backgroundColor: alpha(theme.palette.secondary.main, 0.18),
        opacity:         0,
        transition:      "opacity 0.3s ease" }} />

      {/* Item count */}
      {category.count && (
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <Chip
            label={`${category.count} items`}
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.common.white, 0.2),
              backdropFilter:  "blur(8px)",
              color:           theme.palette.primary.contrastText,
              fontWeight:      600,
              fontSize:        "0.7rem",
              fontFamily:      BRAND.fontBody,
              border:          `1px solid ${alpha(theme.palette.common.white, 0.3)}` }}
          />
        </Box>
      )}

      {/* Category info */}
      <CardContent sx={{ position: "absolute", bottom: 0, left: 0, right: 0, pb: "16px !important", pt: 2 }}>
        {category.tag && (
          <Typography sx={{
            color:         theme.palette.warning.main,
            fontSize:      "0.68rem",
            fontWeight:    700,
            letterSpacing: "0.12em",
            mb:            0.5,
            textTransform: "uppercase",
            fontFamily:    BRAND.fontBody }}>
            {category.tag}
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5" sx={{
              color:      theme.palette.primary.contrastText,
              fontFamily: BRAND.fontDisplay,
              fontWeight: 700,
              fontSize:   { xs: "1.1rem", md: "1.3rem" },
              lineHeight: 1.2,
              mb:         0.25 }}>
              {category.name || "Category"}
            </Typography>
            {category.subtitle && (
              <Typography sx={{
                color:      alpha(theme.palette.primary.contrastText, 0.65),
                fontSize:   "0.78rem",
                fontFamily: BRAND.fontBody }}>
                {category.subtitle}
              </Typography>
            )}
          </Box>

          <Box className="cat-arrow" sx={{
            width:           36,
            height:          36,
            borderRadius:    "50%",
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            border:          `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            flexShrink:      0,
            transition:      "transform 0.25s ease" }}>
            <ArrowForwardIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 16 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// ── CategoryGrid (main export) ────────────────────────────────
const CategoryGrid = ({
  enabled = true,
  title = "Shop by Category",
  subtitle = "Explore our curated collections",
  categories = [],
  columns = { xs: 2, sm: 3, md: 4, lg: 6 } }) => {
  const theme = useTheme();
  if (!enabled || !categories?.length) return null;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{
            color:         theme.palette.secondary.main,
            fontWeight:    700,
            letterSpacing: "0.15em",
            display:       "block",
            mb:            1,
            fontFamily:    BRAND.fontBody }}>
            COLLECTIONS
          </Typography>
          <Typography variant="h2" sx={{ mb: 1.5, fontFamily: BRAND.fontDisplay }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: "auto", fontFamily: BRAND.fontBody }}>
            {subtitle}
          </Typography>
        </Box>

        <Box sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: `repeat(${columns.xs || 2}, 1fr)`,
            sm: `repeat(${columns.sm || 3}, 1fr)`,
            md: `repeat(${columns.md || 4}, 1fr)`,
            lg: `repeat(${columns.lg || 6}, 1fr)`,
          },
          gap: { xs: 2, md: 3 },
        }}>
          {categories.map((category, i) => (
            <CategoryCard key={category.id || i} category={category} index={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryGrid;
