// ─────────────────────────────────────────────────────────────
//  OrderSummary — sticky price breakdown + checkout CTA
//
//  ✅ All colours  → theme.palette.*
//  ✅ All fonts    → BRAND.font*
//  ✅ All sizes    → BRAND.size*
//  ✅ All radii    → BRAND.radius*
//  ✅ Shadows      → theme.shadows[N]
//
//  Responsive:
//    xs / sm  — full-width card below item list, not sticky
//    md+      — position:sticky, top 84px (below 68px Navbar)
//    lg+      — slightly more internal padding
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Box, Typography, Divider, LinearProgress } from "@mui/material";
import LockIcon                      from "@mui/icons-material/Lock";
import LocalShippingOutlinedIcon     from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon  from "@mui/icons-material/AssignmentReturnOutlined";
import VerifiedUserOutlinedIcon      from "@mui/icons-material/VerifiedUserOutlined";
import ArrowForwardIcon              from "@mui/icons-material/ArrowForward";
import CheckCircleIcon               from "@mui/icons-material/CheckCircle";
import { useTheme, alpha }           from "@mui/material/styles";
import { BRAND }                     from "../../../theme/theme";
import Button                        from "../../../components/common/Button/Button";
import PromoCode                     from "../PromoCode/PromoCode";

// ── Constants ────────────────────────────────────────────────
const FREE_SHIP_THRESHOLD = 150;
const SHIPPING_RATE       = 12.95;
const TAX_RATE            = 0.08;

const TRUST_BADGES = [
  { icon: <LockIcon sx={{ fontSize: 12 }} />,                         label: "SSL Encrypted Checkout"  },
  { icon: <LocalShippingOutlinedIcon sx={{ fontSize: 12 }} />,        label: "Free Returns on all orders" },
  { icon: <AssignmentReturnOutlinedIcon sx={{ fontSize: 12 }} />,     label: "30-Day Easy Returns"     },
  { icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 12 }} />,         label: "2-Year Warranty Included" },
];

// ── PriceLine ────────────────────────────────────────────────
const PriceLine = ({ label, value, strikeValue = null, bold = false, positive = false, large = false }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography sx={{
        fontFamily: BRAND.fontBody,
        fontSize:   large ? BRAND.sizeBody : BRAND.sizeSm,
        fontWeight: bold ? theme.typography.fontWeightBold : theme.typography.fontWeightRegular,
        color:      theme.palette.text[large ? "primary" : "secondary"],
      }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        {strikeValue && (
          <Typography sx={{
            fontFamily:     BRAND.fontMono,
            fontSize:       BRAND.sizeXs,
            color:          theme.palette.text.disabled,
            textDecoration: "line-through",
          }}>
            {strikeValue}
          </Typography>
        )}
        <Typography sx={{
          fontFamily: BRAND.fontMono,
          fontSize:   large ? "1.15rem" : BRAND.sizeSm,
          fontWeight: bold ? theme.typography.fontWeightBlack : theme.typography.fontWeightMedium,
          color:      positive
            ? theme.palette.success.main
            : large
              ? theme.palette.text.primary
              : theme.palette.text.primary,
        }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

// ── Main component ───────────────────────────────────────────
const OrderSummary = ({
  subtotal         = 0,
  originalSubtotal = null,
  itemCount        = 0,
  currency         = "$",
  onCheckout,
}) => {
  const theme = useTheme();
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [freeShipping,  setFreeShipping]  = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  /* ── Derived values ───────────────────────────────────── */
  const promoAmount   = subtotal * promoDiscount;
  const afterPromo    = subtotal - promoAmount;
  const shipping      = freeShipping || afterPromo >= FREE_SHIP_THRESHOLD
    ? 0
    : SHIPPING_RATE;
  const tax           = afterPromo * TAX_RATE;
  const total         = afterPromo + shipping + tax;
  const savings       = ((originalSubtotal ?? subtotal) - subtotal) + promoAmount;
  const progressToFree = Math.min((afterPromo / FREE_SHIP_THRESHOLD) * 100, 100);
  const amountToFree  = Math.max(0, FREE_SHIP_THRESHOLD - afterPromo);

  const fmt = (n) => `${currency}${n.toFixed(2)}`;

  const handlePromoApply = ({ discount = 0, shipping: ship = false }) => {
    setPromoDiscount(discount);
    if (ship) setFreeShipping(true);
  };

  const handlePromoRemove = () => {
    setPromoDiscount(0);
    setFreeShipping(false);
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    await onCheckout?.({ subtotal, total, shipping, tax, promoDiscount });
    await new Promise(r => setTimeout(r, 900));
    setCheckoutLoading(false);
  };

  return (
    <Box sx={{
      position:  { md: "sticky" },
      top:       { md: "84px" },
      alignSelf: "flex-start",
      display:   "flex", flexDirection: "column",
      gap:       { xs: 1.5, md: 2 },
    }}>

      {/* ── Main summary card ─────────────────────── */}
      <Box sx={{
        border:       `1px solid ${theme.palette.divider}`,
        borderRadius: BRAND.radiusCard,
        bgcolor:      theme.palette.background.paper,
        overflow:     "hidden",
        boxShadow:    { md: theme.shadows[3] },
      }}>

        {/* Card header */}
        <Box sx={{
          px:           { xs: 2, md: 2.5 },
          py:           { xs: 1.75, md: 2.25 },
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor:      alpha(theme.palette.primary.main, 0.03),
        }}>
          <Typography sx={{
            fontFamily: BRAND.fontDisplay,
            fontWeight: theme.typography.fontWeightBold,
            fontSize:   { xs: BRAND.sizeLg, md: "1.2rem" },
            color:      theme.palette.text.primary,
            lineHeight: 1.2,
          }}>
            Order Summary
          </Typography>
          <Typography sx={{
            fontFamily: BRAND.fontBody,
            fontSize:   BRAND.sizeXxs,
            color:      theme.palette.text.secondary,
            mt:         0.25,
          }}>
            {itemCount} {itemCount === 1 ? "item" : "items"} in your bag
          </Typography>
        </Box>

        {/* Body */}
        <Box sx={{
          px:            { xs: 2, md: 2.5 },
          pt:            2,
          pb:            { xs: 2.5, md: 3 },
          display:       "flex",
          flexDirection: "column",
          gap:           1.25,
        }}>

          {/* Price lines */}
          <PriceLine
            label="Subtotal"
            value={fmt(subtotal)}
            strikeValue={
              originalSubtotal && originalSubtotal !== subtotal
                ? fmt(originalSubtotal)
                : null
            }
          />

          {promoDiscount > 0 && (
            <PriceLine
              label={`Promo (−${Math.round(promoDiscount * 100)}%)`}
              value={`−${fmt(promoAmount)}`}
              positive
            />
          )}

          <PriceLine
            label="Shipping"
            value={shipping === 0 ? "FREE" : fmt(shipping)}
            positive={shipping === 0}
          />

          <PriceLine label="Estimated Tax" value={fmt(tax)} />

          {/* Free-shipping progress bar */}
          {!freeShipping && afterPromo < FREE_SHIP_THRESHOLD && (
            <Box sx={{
              bgcolor:      alpha(theme.palette.warning.main, 0.06),
              border:       `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
              borderRadius: BRAND.radiusButton,
              p:            { xs: 1.25, md: 1.5 },
              mt:           0.25,
            }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                <Typography sx={{
                  fontFamily: BRAND.fontBody,
                  fontSize:   BRAND.sizeXxs,
                  fontWeight: theme.typography.fontWeightBold,
                  color:      theme.palette.warning.main,
                }}>
                  🚚 Unlock free shipping
                </Typography>
                <Typography sx={{
                  fontFamily: BRAND.fontMono,
                  fontSize:   BRAND.sizeXxs,
                  color:      theme.palette.text.secondary,
                }}>
                  {fmt(amountToFree)} away
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progressToFree}
                sx={{
                  height:      5,
                  borderRadius: "3px",
                  bgcolor:      alpha(theme.palette.warning.main, 0.15),
                  "& .MuiLinearProgress-bar": {
                    bgcolor:      theme.palette.warning.main,
                    borderRadius: "3px",
                  },
                }}
              />
            </Box>
          )}

          {/* Free shipping unlocked */}
          {(freeShipping || afterPromo >= FREE_SHIP_THRESHOLD) && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <CheckCircleIcon sx={{ fontSize: 13, color: theme.palette.success.main }} />
              <Typography sx={{
                fontFamily: BRAND.fontBody,
                fontSize:   BRAND.sizeXxs,
                fontWeight: theme.typography.fontWeightBold,
                color:      theme.palette.success.main,
              }}>
                You've unlocked free shipping! 🎉
              </Typography>
            </Box>
          )}

          <Divider />

          {/* Total */}
          <PriceLine label="Total" value={fmt(total)} bold large />

          {/* Savings callout */}
          {savings > 0.01 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: -0.5 }}>
              <Typography sx={{
                fontFamily:  BRAND.fontBody,
                fontSize:    BRAND.sizeXxs,
                fontWeight:  theme.typography.fontWeightBold,
                color:       theme.palette.success.main,
                bgcolor:     alpha(theme.palette.success.main, 0.08),
                border:      `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                borderRadius: BRAND.radiusBadge,
                px: 1.5, py: 0.4,
              }}>
                You're saving {fmt(savings)} on this order 🎉
              </Typography>
            </Box>
          )}

          <Divider />

          {/* Promo code */}
          <PromoCode onApply={handlePromoApply} onRemove={handlePromoRemove} />

          <Divider />

          {/* Checkout button */}
          <Button
            variant="primary"
            fullWidth
            size="lg"
            loading={checkoutLoading}
            onClick={handleCheckout}
            endIcon={!checkoutLoading && <ArrowForwardIcon />}
            sx={{
              mt:        0.5,
              boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.35)}`,
            }}
          >
            {checkoutLoading ? "Processing…" : `Checkout · ${fmt(total)}`}
          </Button>

          {/* Payment icons */}
          <Typography sx={{
            fontFamily: BRAND.fontBody,
            fontSize:   BRAND.sizeXxs,
            color:      theme.palette.text.disabled,
            textAlign:  "center",
            letterSpacing: "0.03em",
          }}>
            Visa · Mastercard · Amex · PayPal · UPI
          </Typography>
        </Box>
      </Box>

      {/* ── Trust badges card ────────────────────────── */}
      <Box sx={{
        border:       `1px solid ${theme.palette.divider}`,
        borderRadius: BRAND.radiusCard,
        bgcolor:      theme.palette.background.paper,
        px:           { xs: 2, md: 2.5 },
        py:           { xs: 1.5, md: 2 },
        display:      "flex",
        flexDirection: "column",
        gap:          { xs: 1, md: 1.25 },
      }}>
        {TRUST_BADGES.map((badge, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ color: theme.palette.secondary.main, flexShrink: 0 }}>
              {badge.icon}
            </Box>
            <Typography sx={{
              fontFamily: BRAND.fontBody,
              fontSize:   BRAND.sizeXxs,
              fontWeight: theme.typography.fontWeightMedium,
              color:      theme.palette.text.secondary,
            }}>
              {badge.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default OrderSummary;
