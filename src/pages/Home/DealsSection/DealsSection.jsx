import React, { useState, useEffect, useCallback } from "react";
import {
  Box, Container, Typography, Card, CardContent, Button, LinearProgress } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon          from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon     from "@mui/icons-material/AddShoppingCart";
import PriceTag   from "../../../components/common/PriceTag/PriceTag";
import RatingStars from "../../../components/common/RatingStars/RatingStars";
import { BRAND }  from "../../../theme/theme";

// ── CountdownTimer ────────────────────────────────────────────
const CountdownTimer = ({ endsAt }) => {
  const theme = useTheme();

  const calc = useCallback(() => {
    const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());
    return {
      h: Math.floor(diff / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1000) };
  }, [endsAt]);

  const [time, setTime] = useState(calc);
  useEffect(() => {
    if (!endsAt) return;
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [endsAt, calc]);

  const pad = (n) => String(n).padStart(2, "0");

  const Unit = ({ value, label }) => (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{
        backgroundColor: theme.palette.primary.main,
        color:           theme.palette.primary.contrastText,
        borderRadius:    BRAND.radiusButton,
        px: { xs: 1, md: 1.5 },
        py: { xs: 0.75, md: 1 },
        minWidth: { xs: 36, md: 44 },
        display:  "inline-block",
        mb:       0.5 }}>
        <Typography sx={{
          fontFamily: BRAND.fontMono,
          fontWeight: 700,
          fontSize:   { xs: "1.1rem", md: "1.4rem" },
          lineHeight: 1,
          color:      theme.palette.primary.contrastText }}>
          {pad(value)}
        </Typography>
      </Box>
      <Typography sx={{
        fontSize:      "0.62rem",
        color:         theme.palette.text.secondary,
        fontWeight:    600,
        letterSpacing: "0.08em",
        fontFamily:    BRAND.fontBody }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 0.75, md: 1 } }}>
      <Unit value={time.h} label="HRS" />
      <Typography sx={{ fontSize: "1.4rem", fontWeight: 700, color: theme.palette.secondary.main, mt: 0.75 }}>:</Typography>
      <Unit value={time.m} label="MIN" />
      <Typography sx={{ fontSize: "1.4rem", fontWeight: 700, color: theme.palette.secondary.main, mt: 0.75 }}>:</Typography>
      <Unit value={time.s} label="SEC" />
    </Box>
  );
};

// ── StockProgress ─────────────────────────────────────────────
const StockProgress = ({ sold = 0, total = 100 }) => {
  const theme  = useTheme();
  const pct    = total > 0 ? Math.min(100, (sold / total) * 100) : 0;
  const urgent = pct >= 75;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
        <Typography sx={{ fontSize: "0.75rem", color: theme.palette.text.secondary, fontWeight: 500, fontFamily: BRAND.fontBody }}>
          Sold: <strong style={{ color: urgent ? theme.palette.secondary.main : theme.palette.success.main }}>{sold}</strong>
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", color: theme.palette.text.secondary, fontFamily: BRAND.fontBody }}>
          {total - sold} left
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 8,
          borderRadius: "4px",
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          "& .MuiLinearProgress-bar": {
            borderRadius:    "4px",
            backgroundColor: urgent
              ? theme.palette.secondary.main
              : theme.palette.success.main } }}
      />
    </Box>
  );
};

// ── DealCard ──────────────────────────────────────────────────
const DealCard = ({ deal = {}, onAddToCart, currency = "$" }) => {
  const theme = useTheme();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart?.(deal);
    setTimeout(() => setAdded(false), 1800);
  };

  const gradients = [
    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.7)} 0%, #764ba2 100%)`,
    `linear-gradient(135deg, #f093fb 0%, ${theme.palette.secondary.main} 100%)`,
    `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`,
    `linear-gradient(135deg, ${theme.palette.success.main} 0%, #38f9d7 100%)`,
  ];
  const placeholderBg = gradients[(deal.id || 0) % gradients.length];

  const discount = deal.originalPrice && deal.originalPrice > deal.price
    ? Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
    : null;

  return (
    <Card elevation={0} sx={{
      borderRadius: BRAND.radiusCard,
      overflow:     "hidden",
      border:       `1px solid ${theme.palette.divider}`,
      transition:   "all 0.3s ease",
      "&:hover": {
        boxShadow: `0 12px 36px ${alpha(theme.palette.secondary.main, 0.14)}`,
        transform: "translateY(-4px)" },
      height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Image */}
      <Box sx={{
        position:   "relative",
        aspectRatio: "4/3",
        overflow:   "hidden",
        background: deal.image ? theme.palette.background.default : placeholderBg }}>
        {deal.image ? (
          <Box
            component="img"
            src={deal.image}
            alt={deal.name}
            sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", "&:hover": { transform: "scale(1.05)" } }}
          />
        ) : (
          <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ color: alpha(theme.palette.primary.contrastText, 0.7), fontSize: "0.8rem", fontWeight: 600, px: 2, textAlign: "center", fontFamily: BRAND.fontBody }}>
              {deal.name}
            </Typography>
          </Box>
        )}

        {discount && (
          <Box sx={{
            position:        "absolute",
            top: 12, left: 12,
            backgroundColor: theme.palette.secondary.main,
            color:           theme.palette.secondary.contrastText,
            borderRadius:    BRAND.radiusButton,
            px: 1.25, py: 0.5,
            fontFamily:  BRAND.fontBody,
            fontWeight:  800,
            fontSize:    "0.82rem",
            lineHeight:  1,
            boxShadow:   `0 2px 10px ${alpha(theme.palette.secondary.main, 0.4)}` }}>
            -{discount}%
          </Box>
        )}

        {deal.endsAt && (
          <Box sx={{
            position:        "absolute",
            bottom: 12, left: 12, right: 12,
            backgroundColor: alpha(theme.palette.primary.main, 0.88),
            backdropFilter:  "blur(6px)",
            borderRadius:    "10px",
            px: 1.5, py: 1,
            display:     "flex",
            alignItems:  "center",
            gap:         1 }}>
            <AccessTimeIcon sx={{ fontSize: 14, color: theme.palette.secondary.main, flexShrink: 0 }} />
            <CountdownTimer endsAt={deal.endsAt} />
          </Box>
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
        {deal.brand && (
          <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: theme.palette.secondary.main, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: BRAND.fontBody }}>
            {deal.brand}
          </Typography>
        )}
        <Typography variant="body1" sx={{
          fontWeight: 600, lineHeight: 1.4, fontSize: "0.95rem", fontFamily: BRAND.fontBody,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {deal.name || "Deal Product"}
        </Typography>

        {deal.rating !== undefined && <RatingStars rating={deal.rating} count={deal.reviewCount} />}

        <PriceTag price={deal.price || 0} originalPrice={deal.originalPrice} currency={currency} />

        {deal.sold !== undefined && deal.total !== undefined && (
          <StockProgress sold={deal.sold} total={deal.total} />
        )}

        <Button
          variant="contained"
          color={added ? "success" : "secondary"}
          fullWidth
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAdd}
          sx={{ mt: "auto", fontWeight: 700, fontFamily: BRAND.fontBody, borderRadius: "10px", py: 1.25 }}
        >
          {added ? "Added to Cart!" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

// ── DealsSection (main export) ────────────────────────────────
const DealsSection = ({
  enabled = true,
  title = "Deals of the Day",
  subtitle = "Hurry up! Limited time offers",
  deals = [],
  onAddToCart,
  currency = "$" }) => {
  const theme = useTheme();
  if (!enabled || !deals?.length) return null;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="xl">
        <Box sx={{
          display:        "flex",
          alignItems:     { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexDirection:  { xs: "column", sm: "row" },
          gap: 2, mb: { xs: 4, md: 6 } }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <LocalFireDepartmentIcon sx={{ color: theme.palette.secondary.main, fontSize: 22 }} />
              <Typography variant="overline" sx={{
                color:         theme.palette.secondary.main,
                fontWeight:    700,
                letterSpacing: "0.15em",
                lineHeight:    1,
                fontFamily:    BRAND.fontBody }}>
                HOT DEALS
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ mb: 0.5, fontFamily: BRAND.fontDisplay }}>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontFamily: BRAND.fontBody }}>
              {subtitle}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="secondary"
            sx={{ borderWidth: 2, fontWeight: 700, fontFamily: BRAND.fontBody, flexShrink: 0, "&:hover": { borderWidth: 2 } }}
          >
            View All Deals
          </Button>
        </Box>

        <Box sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
        }}>
          {deals.map((deal, i) => (
            <DealCard key={deal.id || i} deal={deal} onAddToCart={onAddToCart} currency={currency} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default DealsSection;
