import React from "react";
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const VARIANT_COLOR = { new:"secondary", sale:"warning", bestseller:"primary", soldout:"text", limited:"success" };

const ProductBadge = ({ label = "NEW", variant = "new", sx = {} }) => {
  const theme = useTheme();
  const colorKey = VARIANT_COLOR[variant?.toLowerCase()] || "secondary";
  const bg = colorKey === "text" ? theme.palette.text.disabled : theme.palette[colorKey]?.main;
  return (
    <Chip label={label} size="small" sx={{ backgroundColor:bg, color:theme.palette.getContrastText?.(bg)??"#fff", borderRadius:"9999px", fontWeight:700, fontSize:"0.68rem", letterSpacing:"0.06em", height:"22px", "& .MuiChip-label":{ px:1.25 }, ...sx }} />
  );
};
export default ProductBadge;
