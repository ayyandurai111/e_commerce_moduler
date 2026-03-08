import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND } from "../../../theme/theme";

const PriceTag = ({ price = 0, originalPrice = null, currency = "$", size = "medium" }) => {
  const theme = useTheme();

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const priceSize = size === "small" ? "1rem" : size === "medium" ? "1.25rem" : "1.5rem";
  const origSize  = size === "small" ? "0.75rem" : size === "medium" ? "0.875rem" : "1rem";

  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
      {/* Current price */}
      <Typography sx={{
        fontFamily: BRAND.fontMono,
        fontSize:   priceSize,
        fontWeight: 700,
        color:      originalPrice ? theme.palette.secondary.main : theme.palette.text.primary,
        lineHeight: 1,
      }}>
        {currency}{price.toFixed(2)}
      </Typography>

      {/* Original / crossed-out price */}
      {originalPrice && originalPrice > price && (
        <Typography sx={{
          fontFamily:     BRAND.fontMono,
          fontSize:       origSize,
          fontWeight:     400,
          color:          theme.palette.text.disabled,
          textDecoration: "line-through",
          lineHeight:     1,
        }}>
          {currency}{originalPrice.toFixed(2)}
        </Typography>
      )}

      {/* Discount badge */}
      {discount && (
        <Typography sx={{
          fontSize:        "0.7rem",
          fontWeight:      700,
          color:           theme.palette.secondary.main,
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          px: 0.75, py: 0.25,
          borderRadius:    "4px",
          lineHeight:      1.5,
        }}>
          -{discount}%
        </Typography>
      )}
    </Box>
  );
};

export default PriceTag;
