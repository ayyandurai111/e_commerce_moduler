// ─────────────────────────────────────────────────────────────
//  CartHeader
//  ✅ Colours   → theme.palette.*
//  ✅ Fonts     → BRAND.font*
//  ✅ Sizes     → BRAND.size*
//  ✅ Radii     → BRAND.radius*
//  ✅ Responsive:
//       xs  — back link + heading only, secure badge hidden
//       sm+ — secure badge visible alongside heading
//       md+ — larger heading, more vertical space
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon      from "@mui/icons-material/Lock";
import { useTheme }  from "@mui/material/styles";
import { BRAND }     from "../../../theme/theme";

const CartHeader = ({ itemCount = 0, onContinueShopping }) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: { xs: 2.5, md: 4 } }}>

      {/* ── Back link ─────────────────────────────── */}
      <Box
        onClick={onContinueShopping}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onContinueShopping?.()}
        sx={{
          display: "inline-flex", alignItems: "center", gap: 0.75,
          cursor: "pointer", mb: { xs: 1.5, md: 2 },
          color: theme.palette.text.secondary,
          transition: "color 0.2s ease",
          "&:hover": { color: theme.palette.secondary.main },
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 14 }} />
        <Typography sx={{
          fontFamily: BRAND.fontBody,
          fontSize:   BRAND.sizeXs,
          fontWeight: theme.typography.fontWeightMedium,
        }}>
          Continue Shopping
        </Typography>
      </Box>

      {/* ── Heading row ───────────────────────────── */}
      <Box sx={{
        display: "flex", alignItems: "baseline",
        justifyContent: "space-between", flexWrap: "wrap", gap: 1,
      }}>
        {/* Title + count */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: { xs: 1, md: 1.5 } }}>
          <Typography sx={{
            fontFamily: BRAND.fontDisplay,
            fontWeight: theme.typography.fontWeightBlack,
            fontSize:   { xs: BRAND.sizeH4, sm: BRAND.sizeH3, md: BRAND.sizeH2 },
            color:      theme.palette.text.primary,
            lineHeight: 1.1,
          }}>
            Shopping Cart
          </Typography>
          {itemCount > 0 && (
            <Typography sx={{
              fontFamily: BRAND.fontBody,
              fontSize:   BRAND.sizeSm,
              color:      theme.palette.text.secondary,
            }}>
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </Typography>
          )}
        </Box>

        {/* Secure checkout badge — hidden on xs */}
        <Box sx={{
          display:    { xs: "none", sm: "flex" },
          alignItems: "center", gap: 0.75,
        }}>
          <LockIcon sx={{ fontSize: 12, color: theme.palette.success.main }} />
          <Typography sx={{
            fontFamily: BRAND.fontBody,
            fontSize:   BRAND.sizeXxs,
            fontWeight: theme.typography.fontWeightMedium,
            color:      theme.palette.text.secondary,
            letterSpacing: "0.04em",
          }}>
            Secure Checkout
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default CartHeader;
