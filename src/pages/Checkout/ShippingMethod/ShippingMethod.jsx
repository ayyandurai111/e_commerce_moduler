// ─────────────────────────────────────────────────────────────
//  ShippingMethod — selectable delivery tier cards
//
//  Options: Standard · Express · Overnight
//  Each card shows: carrier logo area, name, ETA, price,
//                   badge (FREE / FAST / FASTEST)
//
//  Responsive:
//    xs — stacked column
//    sm+ — row or column depending on count
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import CheckCircleIcon              from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon     from "@mui/icons-material/RadioButtonUnchecked";
import LocalShippingOutlinedIcon    from "@mui/icons-material/LocalShippingOutlined";
import FlashOnOutlinedIcon          from "@mui/icons-material/FlashOnOutlined";
import RocketLaunchOutlinedIcon     from "@mui/icons-material/RocketLaunchOutlined";
import { useTheme, alpha }          from "@mui/material/styles";
import { BRAND }                    from "../../../theme/theme";
import Button                       from "../../../components/common/Button/Button";

const METHODS = [
  {
    id:       "standard",
    icon:     LocalShippingOutlinedIcon,
    label:    "Standard Shipping",
    carrier:  "DHL / FedEx",
    eta:      "5–7 business days",
    price:    0,
    badge:    "FREE",
    badgeColor: "success",
  },
  {
    id:       "express",
    icon:     FlashOnOutlinedIcon,
    label:    "Express Shipping",
    carrier:  "FedEx Priority",
    eta:      "2–3 business days",
    price:    12.95,
    badge:    "FAST",
    badgeColor: "warning",
  },
  {
    id:       "overnight",
    icon:     RocketLaunchOutlinedIcon,
    label:    "Overnight Delivery",
    carrier:  "UPS Next Day Air",
    eta:      "Next business day",
    price:    24.95,
    badge:    "FASTEST",
    badgeColor: "secondary",
  },
];

const ShippingMethod = ({ selected, onChange, onNext, onBack, subtotal = 0 }) => {
  const theme = useTheme();

  const freeUnlocked = subtotal >= 150;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 2.5 } }}>

      {freeUnlocked && (
        <Box sx={{
          display:      "flex",
          alignItems:   "center",
          gap:          0.75,
          bgcolor:      alpha(theme.palette.success.main, 0.07),
          border:       `1px solid ${alpha(theme.palette.success.main, 0.25)}`,
          borderRadius: BRAND.radiusButton,
          px: 1.75, py: 1.25,
        }}>
          <CheckCircleIcon sx={{ fontSize: 14, color: theme.palette.success.main }} />
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, fontWeight: theme.typography.fontWeightBold, color: theme.palette.success.main }}>
            Your order qualifies for free standard shipping! 🎉
          </Typography>
        </Box>
      )}

      {/* Method cards */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
        {METHODS.map((method) => {
          const Icon     = method.icon;
          const isActive = selected === method.id;
          const price    = method.id === "standard" && freeUnlocked ? 0 : method.price;

          return (
            <Box
              key={method.id}
              role="radio"
              aria-checked={isActive}
              tabIndex={0}
              onClick={() => onChange?.(method.id)}
              onKeyDown={(e) => e.key === "Enter" && onChange?.(method.id)}
              sx={{
                display:   "flex",
                alignItems: "center",
                gap:        { xs: 1.5, md: 2 },
                px:         { xs: 1.75, md: 2.25 },
                py:         { xs: 1.5, md: 2 },
                border:     `2px solid ${isActive ? theme.palette.secondary.main : theme.palette.divider}`,
                borderRadius: BRAND.radiusCard,
                bgcolor:    isActive
                  ? alpha(theme.palette.secondary.main, 0.04)
                  : theme.palette.background.paper,
                cursor:     "pointer",
                transition: "all 0.22s ease",
                boxShadow:  isActive ? theme.shadows[2] : "none",
                "&:hover":  {
                  borderColor: isActive ? theme.palette.secondary.main : theme.palette.primary.main,
                  bgcolor:     isActive
                    ? alpha(theme.palette.secondary.main, 0.04)
                    : alpha(theme.palette.primary.main, 0.03),
                },
              }}
            >
              {/* Radio indicator */}
              <Box sx={{ flexShrink: 0, color: isActive ? theme.palette.secondary.main : theme.palette.text.disabled }}>
                {isActive
                  ? <CheckCircleIcon          sx={{ fontSize: { xs: 18, md: 20 } }} />
                  : <RadioButtonUncheckedIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                }
              </Box>

              {/* Icon */}
              <Box sx={{
                flexShrink: 0,
                width:      { xs: 36, md: 42 },
                height:     { xs: 36, md: 42 },
                borderRadius: BRAND.radiusButton,
                bgcolor:    isActive
                  ? alpha(theme.palette.secondary.main, 0.1)
                  : alpha(theme.palette.primary.main, 0.06),
                display:    "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Icon sx={{
                  fontSize: { xs: 18, md: 20 },
                  color:    isActive ? theme.palette.secondary.main : theme.palette.text.secondary,
                }} />
              </Box>

              {/* Text */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25, flexWrap: "wrap" }}>
                  <Typography sx={{
                    fontFamily: BRAND.fontBody,
                    fontSize:   { xs: BRAND.sizeSm, md: BRAND.sizeBody },
                    fontWeight: theme.typography.fontWeightBold,
                    color:      theme.palette.text.primary,
                    lineHeight: 1.2,
                  }}>
                    {method.label}
                  </Typography>
                  <Chip
                    label={method.badge}
                    size="small"
                    sx={{
                      height:     18,
                      fontFamily: BRAND.fontBody,
                      fontSize:   "0.58rem",
                      fontWeight: theme.typography.fontWeightBlack,
                      letterSpacing: "0.06em",
                      bgcolor:    method.badgeColor === "success"
                        ? alpha(theme.palette.success.main, 0.12)
                        : method.badgeColor === "warning"
                          ? alpha(theme.palette.warning.main, 0.12)
                          : alpha(theme.palette.secondary.main, 0.12),
                      color:      method.badgeColor === "success"
                        ? theme.palette.success.main
                        : method.badgeColor === "warning"
                          ? theme.palette.warning.main
                          : theme.palette.secondary.main,
                      "& .MuiChip-label": { px: 0.9 },
                      borderRadius: BRAND.radiusBadge,
                    }}
                  />
                </Box>
                <Typography sx={{
                  fontFamily: BRAND.fontBody,
                  fontSize:   BRAND.sizeXs,
                  color:      theme.palette.text.secondary,
                }}>
                  {method.carrier} · {method.eta}
                </Typography>
              </Box>

              {/* Price */}
              <Typography sx={{
                fontFamily: BRAND.fontMono,
                fontSize:   { xs: BRAND.sizeSm, md: BRAND.sizeBody },
                fontWeight: theme.typography.fontWeightBold,
                color:      price === 0 ? theme.palette.success.main : theme.palette.text.primary,
                flexShrink: 0,
              }}>
                {price === 0 ? "FREE" : `$${price.toFixed(2)}`}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Nav */}
      <Box sx={{ display: "flex", gap: 1.25, flexDirection: { xs: "column", sm: "row" }, mt: 1 }}>
        <Button variant="outline" fullWidth size="lg" onClick={onBack}>← Back</Button>
        <Button variant="primary" fullWidth size="lg" disabled={!selected} onClick={() => onNext?.(selected)}>
          Continue to Payment
        </Button>
      </Box>
    </Box>
  );
};
export default ShippingMethod;
