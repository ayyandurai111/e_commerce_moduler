// ─────────────────────────────────────────────────────────────
//  CheckoutSidebar — Sticky right-column order summary
//
//  Shows:
//    • Collapsible item list with images, names, variant chips
//    • Subtotal / shipping / tax / savings breakdown
//    • Promo code field (inline apply)
//    • Total with currency
//    • 4-icon trust strip (secure / returns / support / shipping)
//    • "Edit cart" link
//
//  Responsive:
//    xs/sm  → flat panel above or below form (no sticky)
//    md+    → position: sticky, top: 88px
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, Typography, Divider, Collapse,
  TextField, InputAdornment, IconButton,
  Avatar, Chip,
} from "@mui/material";
import ExpandMoreIcon            from "@mui/icons-material/ExpandMore";
import ExpandLessIcon            from "@mui/icons-material/ExpandLess";
import LocalOfferOutlinedIcon    from "@mui/icons-material/LocalOfferOutlined";
import LockOutlinedIcon          from "@mui/icons-material/LockOutlined";
import ReplayIcon                from "@mui/icons-material/Replay";
import HeadsetMicOutlinedIcon    from "@mui/icons-material/HeadsetMicOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleIcon           from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon          from "@mui/icons-material/ArrowForward";
import { useTheme, alpha }       from "@mui/material/styles";
import { BRAND }                 from "../../../theme/theme";

// ── Promo code dictionary ─────────────────────────────────────
const PROMOS = {
  LUXE10:      { type: "percent", value: 10,  label: "10% off"            },
  WELCOME200:  { type: "fixed",   value: 200, label: "₹200 off"           },
  FREESHIP:    { type: "shipping",            label: "Free shipping"      },
  FESTIVE15:   { type: "percent",  value: 15,  label: "15% off (Festive)" },
};

const SHIPPING_PRICES = { standard: 0, express: 99, overnight: 199 };
const TAX_RATE = 0.18; // GST @ 18%

const TRUST = [
  { icon: LockOutlinedIcon,          label: "Secure checkout"  },
  { icon: ReplayIcon,                label: "Free returns"     },
  { icon: HeadsetMicOutlinedIcon,    label: "24/7 support"     },
  { icon: LocalShippingOutlinedIcon, label: "Fast delivery"    },
];

// ── Tiny line-row ─────────────────────────────────────────────
const Row = ({ label, value, bold, color, strike }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography sx={{
        fontFamily: BRAND.fontBody,
        fontSize:   bold ? BRAND.sizeBody : BRAND.sizeSm,
        fontWeight: bold ? theme.typography.fontWeightBold : theme.typography.fontWeightNormal,
        color:      color ?? theme.palette.text.secondary,
      }}>{label}</Typography>
      <Typography sx={{
        fontFamily:      BRAND.fontMono,
        fontSize:        bold ? BRAND.sizeBody : BRAND.sizeSm,
        fontWeight:      bold ? theme.typography.fontWeightBold : theme.typography.fontWeightNormal,
        color:           color ?? theme.palette.text.primary,
        textDecoration:  strike ? "line-through" : "none",
      }}>{value}</Typography>
    </Box>
  );
};

const CheckoutSidebar = ({
  items          = [],
  shippingMethod = "standard",
  currency       = "$",
  onEditCart,
}) => {
  const theme = useTheme();
  const [itemsOpen,   setItemsOpen]   = useState(true);
  const [promoCode,   setPromoCode]   = useState("");
  const [appliedPromo,setAppliedPromo]= useState(null);
  const [promoError,  setPromoError]  = useState("");

  // ── Calculations ────────────────────────────────────────────
  const subtotal     = items.reduce((s, i) => s + (i.price ?? 0) * (i.quantity ?? 1), 0);
  const originalTotal= items.reduce((s, i) => s + (i.originalPrice ?? i.price ?? 0) * (i.quantity ?? 1), 0);
  const savings      = originalTotal - subtotal;

  let shippingCost = SHIPPING_PRICES[shippingMethod] ?? 0;
  let promoDiscount = 0;

  if (appliedPromo) {
    if (appliedPromo.type === "percent")  promoDiscount = subtotal * (appliedPromo.value / 100);
    if (appliedPromo.type === "fixed")    promoDiscount = Math.min(appliedPromo.value, subtotal);
    if (appliedPromo.type === "shipping") shippingCost  = 0;
  }

  const taxable = subtotal - promoDiscount;
  const tax     = taxable * TAX_RATE;
  const total   = taxable + shippingCost + tax;

  const handlePromo = () => {
    const key   = promoCode.trim().toUpperCase();
    const found = PROMOS[key];
    if (!found) { setPromoError("Invalid promo code. Try LUXE10 or WELCOME20."); return; }
    setAppliedPromo({ ...found, code: key });
    setPromoError("");
    setPromoCode("");
  };

  const fmt = (n) => `${currency}${n.toFixed(2)}`;

  return (
    <Box sx={{
      position:     { md: "sticky" },
      top:          { md: "88px"   },
      bgcolor:      theme.palette.background.paper,
      border:       `1px solid ${theme.palette.divider}`,
      borderRadius: BRAND.radiusCard,
      overflow:     "hidden",
      boxShadow:    theme.shadows[3],
    }}>

      {/* ── Header ────────────────────────────────────────── */}
      <Box sx={{
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "space-between",
        px:              { xs: 2, md: 2.5 },
        py:              { xs: 1.5, md: 2  },
        bgcolor:         alpha(theme.palette.primary.main, 0.03),
        borderBottom:    `1px solid ${theme.palette.divider}`,
      }}>
        <Typography sx={{
          fontFamily: BRAND.fontDisplay,
          fontSize:   { xs: BRAND.sizeSm, md: BRAND.sizeBody },
          fontWeight: theme.typography.fontWeightBold,
          color:      theme.palette.text.primary,
        }}>
          Order Summary
          <Typography component="span" sx={{
            fontFamily:  BRAND.fontBody,
            fontSize:    BRAND.sizeXs,
            fontWeight:  theme.typography.fontWeightNormal,
            color:       theme.palette.text.secondary,
            ml:          0.75,
          }}>
            ({items.length} {items.length === 1 ? "item" : "items"})
          </Typography>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {onEditCart && (
            <Typography
              onClick={onEditCart}
              sx={{
                fontFamily: BRAND.fontBody,
                fontSize:   BRAND.sizeXs,
                color:      theme.palette.secondary.main,
                cursor:     "pointer",
                textDecoration: "underline",
                display:    { xs: "none", sm: "block" },
                "&:hover":  { color: alpha(theme.palette.secondary.main, 0.75) },
              }}
            >
              Edit cart
            </Typography>
          )}
          <IconButton
            size="small"
            onClick={() => setItemsOpen(o => !o)}
            sx={{ color: theme.palette.text.secondary }}
          >
            {itemsOpen
              ? <ExpandLessIcon sx={{ fontSize: 18 }} />
              : <ExpandMoreIcon sx={{ fontSize: 18 }} />
            }
          </IconButton>
        </Box>
      </Box>

      {/* ── Item list ─────────────────────────────────────── */}
      <Collapse in={itemsOpen}>
        <Box sx={{
          maxHeight:  { xs: 220, md: 300 },
          overflowY:  "auto",
          px:         { xs: 2, md: 2.5 },
          py:         { xs: 1.5, md: 2  },
          display:    "flex",
          flexDirection: "column",
          gap:        1.5,
          "&::-webkit-scrollbar":       { width: 4 },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          "&::-webkit-scrollbar-thumb": { bgcolor: theme.palette.divider, borderRadius: 4 },
        }}>
          {items.map((item, idx) => (
            <Box key={item.id ?? idx} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              {/* Image with qty badge */}
              <Box sx={{ position: "relative", flexShrink: 0 }}>
                <Avatar
                  src={item.image}
                  variant="rounded"
                  sx={{
                    width:        { xs: 52, md: 60 },
                    height:       { xs: 52, md: 60 },
                    borderRadius: BRAND.radiusButton,
                    border:       `1px solid ${theme.palette.divider}`,
                    bgcolor:      alpha(theme.palette.primary.main, 0.05),
                  }}
                >
                  {item.name?.[0]}
                </Avatar>
                {/* Qty bubble */}
                <Box sx={{
                  position:   "absolute",
                  top:        -6,
                  right:      -6,
                  minWidth:   18,
                  height:     18,
                  borderRadius: BRAND.radiusBadge,
                  bgcolor:    theme.palette.primary.main,
                  color:      "#fff",
                  display:    "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: BRAND.fontBody,
                  fontSize:   "0.58rem",
                  fontWeight: theme.typography.fontWeightBold,
                  px:         0.5,
                }}>
                  {item.quantity ?? 1}
                </Box>
              </Box>

              {/* Details */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{
                  fontFamily: BRAND.fontBody,
                  fontSize:   BRAND.sizeSm,
                  fontWeight: theme.typography.fontWeightMedium,
                  color:      theme.palette.text.primary,
                  lineHeight: 1.3,
                  overflow:   "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {item.name}
                </Typography>

                {/* Variant chips */}
                {item.variants && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.4, mt: 0.4 }}>
                    {Object.entries(item.variants).map(([k, v]) => v && (
                      <Chip key={k} label={`${k}: ${v}`} size="small" sx={{
                        height:     16,
                        fontFamily: BRAND.fontBody,
                        fontSize:   "0.58rem",
                        color:      theme.palette.text.secondary,
                        bgcolor:    alpha(theme.palette.primary.main, 0.05),
                        "& .MuiChip-label": { px: 0.75 },
                        borderRadius: BRAND.radiusBadge,
                      }} />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Price */}
              <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                <Typography sx={{ fontFamily: BRAND.fontMono, fontSize: BRAND.sizeSm, fontWeight: theme.typography.fontWeightBold, color: theme.palette.text.primary }}>
                  {fmt((item.price ?? 0) * (item.quantity ?? 1))}
                </Typography>
                {item.originalPrice && item.originalPrice > item.price && (
                  <Typography sx={{ fontFamily: BRAND.fontMono, fontSize: BRAND.sizeXxs, color: theme.palette.text.disabled, textDecoration: "line-through" }}>
                    {fmt((item.originalPrice ?? 0) * (item.quantity ?? 1))}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Divider />
      </Collapse>

      {/* ── Promo code ────────────────────────────────────── */}
      <Box sx={{ px: { xs: 2, md: 2.5 }, pt: { xs: 1.75, md: 2.25 }, pb: { xs: 1.5, md: 2 } }}>
        {appliedPromo ? (
          <Box sx={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            bgcolor: alpha(theme.palette.success.main, 0.07),
            border:  `1px solid ${alpha(theme.palette.success.main, 0.25)}`,
            borderRadius: BRAND.radiusButton,
            px: 1.5, py: 1,
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <CheckCircleIcon sx={{ fontSize: 14, color: theme.palette.success.main }} />
              <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, fontWeight: theme.typography.fontWeightBold, color: theme.palette.success.main }}>
                {appliedPromo.code} — {appliedPromo.label}
              </Typography>
            </Box>
            <Typography
              onClick={() => setAppliedPromo(null)}
              sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, color: theme.palette.text.disabled, cursor: "pointer", "&:hover": { color: theme.palette.secondary.main } }}
            >
              Remove
            </Typography>
          </Box>
        ) : (
          <Box>
            <TextField
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handlePromo()}
              size="small"
              fullWidth
              error={Boolean(promoError)}
              helperText={promoError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOfferOutlinedIcon sx={{ fontSize: 14, color: theme.palette.text.disabled }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={handlePromo}
                      disabled={!promoCode.trim()}
                      sx={{ color: theme.palette.secondary.main, "&:hover": { bgcolor: alpha(theme.palette.secondary.main, 0.08) } }}
                    >
                      <ArrowForwardIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  fontFamily:   BRAND.fontBody,
                  fontSize:     BRAND.sizeSm,
                  borderRadius: BRAND.radiusInput,
                  bgcolor:      theme.palette.background.default,
                },
              }}
              FormHelperTextProps={{ sx: { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXxs, mx: 0 } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset":             { borderColor: theme.palette.divider, borderWidth: "1.5px" },
                  "&:hover fieldset":       { borderColor: theme.palette.primary.main },
                  "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main },
                },
              }}
            />
            <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXxs, color: theme.palette.text.disabled, mt: 0.5 }}>
              Try: LUXE10 · WELCOME200 · FESTIVE15 · FREESHIP
            </Typography>
          </Box>
        )}
      </Box>

      <Divider />

      {/* ── Pricing breakdown ─────────────────────────────── */}
      <Box sx={{ px: { xs: 2, md: 2.5 }, py: { xs: 1.75, md: 2.25 }, display: "flex", flexDirection: "column", gap: 1.1 }}>
        <Row label="Subtotal"  value={fmt(subtotal)} />
        {savings > 0 && (
          <Row label="You save"  value={`-${fmt(savings)}`} color={theme.palette.success.main} />
        )}
        {appliedPromo && promoDiscount > 0 && (
          <Row label={`Promo (${appliedPromo.code})`} value={`-${fmt(promoDiscount)}`} color={theme.palette.secondary.main} />
        )}
        <Row
          label="Shipping"
          value={shippingCost === 0 ? "FREE" : fmt(shippingCost)}
          color={shippingCost === 0 ? theme.palette.success.main : undefined}
        />
        <Row label={`GST (${(TAX_RATE * 100).toFixed(0)}%)`} value={fmt(tax)} />

        <Divider sx={{ my: 0.5 }} />

        {/* Total */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{
            fontFamily: BRAND.fontDisplay,
            fontSize:   { xs: BRAND.sizeBody, md: BRAND.sizeLg },
            fontWeight: theme.typography.fontWeightBold,
            color:      theme.palette.text.primary,
          }}>
            Total
          </Typography>
          <Typography sx={{
            fontFamily: BRAND.fontMono,
            fontSize:   { xs: BRAND.sizeLg, md: BRAND.sizeH4 },
            fontWeight: theme.typography.fontWeightBlack,
            color:      theme.palette.secondary.main,
          }}>
            {fmt(total)}
          </Typography>
        </Box>
      </Box>

      {/* ── Trust strip ───────────────────────────────────── */}
      <Box sx={{
        borderTop:   `1px solid ${theme.palette.divider}`,
        bgcolor:     alpha(theme.palette.primary.main, 0.02),
        px:          { xs: 2, md: 2.5 },
        py:          { xs: 1.25, md: 1.5 },
        display:     "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap:         1,
        textAlign:   "center",
      }}>
        {TRUST.map((t) => {
          const Icon = t.icon;
          return (
            <Box key={t.label} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.4 }}>
              <Icon sx={{ fontSize: { xs: 14, md: 16 }, color: alpha(theme.palette.primary.main, 0.45) }} />
              <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: "0.58rem", color: theme.palette.text.disabled, lineHeight: 1.3, display: { xs: "none", sm: "block" } }}>
                {t.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export { SHIPPING_PRICES, TAX_RATE, PROMOS };
export default CheckoutSidebar;
