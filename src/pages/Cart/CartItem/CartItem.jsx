// ─────────────────────────────────────────────────────────────
//  CartItem — single row in the cart
//
//  ✅ All colours  → theme.palette.*
//  ✅ All fonts    → BRAND.font*
//  ✅ All sizes    → BRAND.size*
//  ✅ All radii    → BRAND.radius*
//
//  Responsive:
//    xs  — image 72px, compact qty stepper (28px), text xs
//    sm  — image 88px, stepper 30px
//    md+ — image 108px, stepper 34px, body font sizes
//
//  Features:
//    • Qty stepper clamped to stock
//    • Smooth fade-out on remove (320 ms)
//    • Save for later toggle → wishlist heart
//    • Stock / overstock warning
//    • Per-variant chips
//    • Live line-total via PriceTag
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip, Chip, Fade } from "@mui/material";
import AddIcon             from "@mui/icons-material/Add";
import RemoveIcon          from "@mui/icons-material/Remove";
import DeleteOutlineIcon   from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon  from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon        from "@mui/icons-material/Favorite";
import WarningAmberIcon    from "@mui/icons-material/WarningAmber";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";
import PriceTag            from "../../../components/common/PriceTag/PriceTag";

const FALLBACK = "https://picsum.photos/seed/cartitem/400/400";

const CartItem = ({ item, onQuantityChange, onRemove, onSaveForLater }) => {
  const theme = useTheme();
  const [removing, setRemoving] = useState(false);
  const [saved,    setSaved]    = useState(false);

  if (!item) return null;

  const {
    id, name, brand, image, price, originalPrice,
    currency = "$", quantity, stock, variants,
  } = item;

  const lineTotal = price * quantity;
  const lineOrig  = originalPrice ? originalPrice * quantity : null;
  const lowStock  = stock != null && stock <= 5;
  const overStock = stock != null && quantity > stock;

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove?.(id), 300);
  };

  const handleSave = () => {
    setSaved(s => !s);
    onSaveForLater?.(item, !saved);
  };

  /* ── Qty stepper button shared style ───────────────────── */
  const qtyBtnSx = {
    border:  `1.5px solid ${theme.palette.divider}`,
    bgcolor: theme.palette.background.paper,
    transition: "all 0.18s ease",
    "&:hover:not(.Mui-disabled)": {
      borderColor: theme.palette.secondary.main,
      bgcolor:     alpha(theme.palette.secondary.main, 0.05),
    },
    "&.Mui-disabled": { opacity: 0.3 },
  };

  return (
    <Fade in={!removing} timeout={280}>
      <Box sx={{
        display: "flex", gap: { xs: 1.5, sm: 2, md: 2.5 },
        py:      { xs: 2, md: 2.5 },
        borderBottom: `1px solid ${theme.palette.divider}`,
        "&:last-child": { borderBottom: "none" },
        transition: "opacity 0.28s ease",
        opacity:    removing ? 0 : 1,
      }}>

        {/* ── Product image ──────────────────────────── */}
        <Box sx={{
          flexShrink: 0,
          width:      { xs: 72, sm: 88, md: 108 },
          height:     { xs: 90, sm: 110, md: 134 },
          borderRadius: BRAND.radiusButton,
          overflow: "hidden",
          bgcolor:  theme.palette.background.default,
          border:   `1px solid ${theme.palette.divider}`,
        }}>
          <Box
            component="img"
            src={image || FALLBACK}
            alt={name}
            onError={e => { e.target.src = FALLBACK; }}
            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </Box>

        {/* ── Details ────────────────────────────────── */}
        <Box sx={{
          flex: 1, minWidth: 0,
          display: "flex", flexDirection: "column",
          gap: { xs: 0.5, md: 0.75 },
        }}>

          {/* Brand */}
          {brand && (
            <Typography sx={{
              fontFamily:    BRAND.fontBody,
              fontSize:      BRAND.sizeXxs,
              fontWeight:    theme.typography.fontWeightBold,
              letterSpacing: "0.1em",
              color:         theme.palette.secondary.main,
              textTransform: "uppercase",
              lineHeight:    1,
            }}>
              {brand}
            </Typography>
          )}

          {/* Name */}
          <Typography sx={{
            fontFamily:        BRAND.fontBody,
            fontWeight:        theme.typography.fontWeightSemibold,
            fontSize:          { xs: BRAND.sizeSm, md: BRAND.sizeBody },
            color:             theme.palette.text.primary,
            lineHeight:        1.35,
            display:           "-webkit-box",
            WebkitLineClamp:   2,
            WebkitBoxOrient:   "vertical",
            overflow:          "hidden",
          }}>
            {name}
          </Typography>

          {/* Variant chips */}
          {variants && (
            <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mt: 0.25 }}>
              {Object.entries(variants).map(([k, v]) => v && (
                <Chip
                  key={k}
                  label={`${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`}
                  size="small"
                  sx={{
                    fontFamily: BRAND.fontBody,
                    fontSize:   BRAND.sizeXxs,
                    fontWeight: theme.typography.fontWeightMedium,
                    height:     20,
                    bgcolor:    alpha(theme.palette.primary.main, 0.05),
                    color:      theme.palette.text.secondary,
                    borderRadius: BRAND.radiusBadge,
                    "& .MuiChip-label": { px: 1 },
                  }}
                />
              ))}
            </Box>
          )}

          {/* Stock warning */}
          {(lowStock || overStock) && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <WarningAmberIcon sx={{
                fontSize: 11,
                color: overStock ? theme.palette.error.main : theme.palette.warning.main,
              }} />
              <Typography sx={{
                fontFamily: BRAND.fontBody,
                fontSize:   BRAND.sizeXxs,
                fontWeight: theme.typography.fontWeightMedium,
                color: overStock ? theme.palette.error.main : theme.palette.warning.main,
              }}>
                {overStock ? `Only ${stock} in stock` : `Only ${stock} left`}
              </Typography>
            </Box>
          )}

          {/* ── Bottom row: stepper + line price ─────── */}
          <Box sx={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: 1,
            mt: "auto", pt: { xs: 0.75, md: 1 },
          }}>
            {/* Qty stepper */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="small"
                onClick={() => onQuantityChange?.(id, quantity - 1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                sx={{
                  ...qtyBtnSx,
                  width:  { xs: 28, sm: 30, md: 34 },
                  height: { xs: 28, sm: 30, md: 34 },
                  borderRadius: `${BRAND.radiusButton} 0 0 ${BRAND.radiusButton}`,
                }}
              >
                <RemoveIcon sx={{ fontSize: { xs: 11, md: 13 } }} />
              </IconButton>

              <Box sx={{
                width:  { xs: 36, sm: 40, md: 44 },
                height: { xs: 28, sm: 30, md: 34 },
                display: "flex", alignItems: "center", justifyContent: "center",
                borderTop:    `1.5px solid ${theme.palette.divider}`,
                borderBottom: `1.5px solid ${theme.palette.divider}`,
                bgcolor:      theme.palette.background.paper,
              }}>
                <Typography sx={{
                  fontFamily: BRAND.fontMono,
                  fontSize:   { xs: BRAND.sizeXs, md: BRAND.sizeSm },
                  fontWeight: theme.typography.fontWeightBold,
                  lineHeight: 1,
                }}>
                  {quantity}
                </Typography>
              </Box>

              <IconButton
                size="small"
                onClick={() => onQuantityChange?.(id, quantity + 1)}
                disabled={stock != null && quantity >= stock}
                aria-label="Increase quantity"
                sx={{
                  ...qtyBtnSx,
                  width:  { xs: 28, sm: 30, md: 34 },
                  height: { xs: 28, sm: 30, md: 34 },
                  borderRadius: `0 ${BRAND.radiusButton} ${BRAND.radiusButton} 0`,
                }}
              >
                <AddIcon sx={{ fontSize: { xs: 11, md: 13 } }} />
              </IconButton>
            </Box>

            {/* Line price via shared PriceTag */}
            <PriceTag
              price={lineTotal}
              originalPrice={lineOrig}
              currency={currency}
              size="small"
            />
          </Box>
        </Box>

        {/* ── Action icons (top-right) ────────────────── */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
          <Tooltip title="Remove item">
            <IconButton
              size="small"
              onClick={handleRemove}
              aria-label="Remove item"
              sx={{ color: theme.palette.text.disabled, "&:hover": { color: theme.palette.error.main } }}
            >
              <DeleteOutlineIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
            </IconButton>
          </Tooltip>

          <Tooltip title={saved ? "Remove from wishlist" : "Save for later"}>
            <IconButton
              size="small"
              onClick={handleSave}
              aria-label={saved ? "Remove from wishlist" : "Save for later"}
              sx={{
                color: saved ? theme.palette.secondary.main : theme.palette.text.disabled,
                transition: "color 0.2s ease",
                "&:hover": { color: theme.palette.secondary.main },
              }}
            >
              {saved
                ? <FavoriteIcon      sx={{ fontSize: { xs: 15, md: 17 } }} />
                : <FavoriteBorderIcon sx={{ fontSize: { xs: 15, md: 17 } }} />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Fade>
  );
};
export default CartItem;
