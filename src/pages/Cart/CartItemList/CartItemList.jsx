// ─────────────────────────────────────────────────────────────
//  CartItemList — full list with select-all header and clear CTA
//
//  ✅ All colours  → theme.palette.*
//  ✅ All fonts    → BRAND.font*
//  ✅ All sizes    → BRAND.size*
//  ✅ All radii    → BRAND.radius*
//
//  Responsive:
//    xs  — compact list header, small checkbox label
//    md+ — wider card padding, slightly larger header text
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, Typography, Checkbox, FormControlLabel,
  Button as MuiButton,
} from "@mui/material";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { useTheme, alpha }     from "@mui/material/styles";
import { BRAND }               from "../../../theme/theme";
import CartItem                from "../CartItem/CartItem";

const CartItemList = ({
  items = [],
  onQuantityChange,
  onRemove,
  onSaveForLater,
  onClearCart,
}) => {
  const theme = useTheme();
  const [allChecked, setAllChecked] = useState(false);

  if (!items.length) return null;

  return (
    <Box sx={{
      bgcolor:      theme.palette.background.paper,
      border:       `1px solid ${theme.palette.divider}`,
      borderRadius: BRAND.radiusCard,
      overflow:     "hidden",
    }}>

      {/* ── List header ─────────────────────────────── */}
      <Box sx={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        flexWrap:       "wrap",
        gap:            1,
        px:             { xs: 2, md: 3 },
        py:             { xs: 1.25, md: 1.75 },
        bgcolor:        alpha(theme.palette.primary.main, 0.03),
        borderBottom:   `1px solid ${theme.palette.divider}`,
      }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={allChecked}
              onChange={(e) => setAllChecked(e.target.checked)}
              sx={{
                color: theme.palette.divider,
                "&.Mui-checked": { color: theme.palette.secondary.main },
                p: 0.75,
              }}
            />
          }
          label={
            <Typography sx={{
              fontFamily: BRAND.fontBody,
              fontSize:   BRAND.sizeXs,
              fontWeight: theme.typography.fontWeightMedium,
              color:      theme.palette.text.secondary,
            }}>
              Select all ({items.length})
            </Typography>
          }
          sx={{ m: 0 }}
        />

        <MuiButton
          size="small"
          startIcon={<DeleteSweepOutlinedIcon sx={{ fontSize: "14px !important" }} />}
          onClick={onClearCart}
          sx={{
            fontFamily:    BRAND.fontBody,
            fontSize:      BRAND.sizeXxs,
            fontWeight:    theme.typography.fontWeightMedium,
            color:         theme.palette.text.disabled,
            textTransform: "none",
            px: 1,
            minWidth: 0,
            "&:hover": {
              color:  theme.palette.error.main,
              bgcolor: alpha(theme.palette.error.main, 0.06),
            },
          }}
        >
          Clear cart
        </MuiButton>
      </Box>

      {/* ── Items ───────────────────────────────────── */}
      <Box sx={{ px: { xs: 2, md: 3 } }}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
            onSaveForLater={onSaveForLater}
          />
        ))}
      </Box>

      {/* ── Footer note ─────────────────────────────── */}
      <Box sx={{
        px:           { xs: 2, md: 3 },
        py:           1.5,
        borderTop:    `1px solid ${theme.palette.divider}`,
        bgcolor:      alpha(theme.palette.primary.main, 0.02),
      }}>
        <Typography sx={{
          fontFamily: BRAND.fontBody,
          fontSize:   BRAND.sizeXxs,
          color:      theme.palette.text.disabled,
          textAlign:  "center",
        }}>
          Prices and availability are subject to change until the order is confirmed.
        </Typography>
      </Box>
    </Box>
  );
};
export default CartItemList;
