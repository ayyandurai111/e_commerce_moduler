import React from "react";
import { Button as MuiButton, CircularProgress, Box } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND } from "../../../theme/theme";

const Button = ({ variant="primary", size="md", fullWidth=false, disabled=false, loading=false, startIcon=null, endIcon=null, onClick, children, sx={} }) => {
  const theme = useTheme();
  const sizeMap = {
    sm: { px:2,   py:0.75, fontSize:BRAND.sizeXs,   height:34 },
    md: { px:3,   py:1.25, fontSize:BRAND.sizeSm,   height:44 },
    lg: { px:4,   py:1.5,  fontSize:BRAND.sizeBody, height:52 },
  };
  const s = sizeMap[size] || sizeMap.md;
  const variantSx = {
    primary: {
      backgroundColor:theme.palette.secondary.main, color:theme.palette.secondary.contrastText,
      boxShadow:`0 4px 14px ${alpha(theme.palette.secondary.main,0.35)}`,
      "&:hover":{ backgroundColor:theme.palette.secondary.dark, boxShadow:`0 6px 20px ${alpha(theme.palette.secondary.main,0.45)}`, transform:"translateY(-1px)" },
      "&:active":{ transform:"translateY(0)" },
    },
    secondary: {
      backgroundColor:theme.palette.primary.main, color:theme.palette.primary.contrastText,
      boxShadow:`0 4px 14px ${alpha(theme.palette.primary.main,0.25)}`,
      "&:hover":{ backgroundColor:theme.palette.primary.dark, boxShadow:`0 6px 20px ${alpha(theme.palette.primary.main,0.35)}`, transform:"translateY(-1px)" },
      "&:active":{ transform:"translateY(0)" },
    },
    ghost: { backgroundColor:"transparent", color:theme.palette.secondary.main, boxShadow:"none", "&:hover":{ backgroundColor:alpha(theme.palette.secondary.main,0.08), boxShadow:"none" } },
    outline: {
      backgroundColor:"transparent", color:theme.palette.primary.main, border:`2px solid ${theme.palette.primary.main}`, boxShadow:"none",
      "&:hover":{ backgroundColor:theme.palette.primary.main, color:theme.palette.primary.contrastText, boxShadow:`0 4px 14px ${alpha(theme.palette.primary.main,0.25)}`, transform:"translateY(-1px)" },
      "&:active":{ transform:"translateY(0)" },
    },
  };
  return (
    <MuiButton onClick={onClick} disabled={disabled||loading} fullWidth={fullWidth} startIcon={!loading&&startIcon} endIcon={!loading&&endIcon}
      sx={{ fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightSemibold, fontSize:s.fontSize, letterSpacing:"0.03em", borderRadius:BRAND.radiusButton, textTransform:"none", height:s.height, px:s.px, py:s.py, transition:"all 0.25s ease", "&.Mui-disabled":{ opacity:0.5, backgroundColor:theme.palette.action.disabledBackground, color:theme.palette.action.disabled, boxShadow:"none" }, ...variantSx[variant], ...sx }}>
      {loading ? <Box sx={{ display:"flex", alignItems:"center", gap:1 }}><CircularProgress size={16} sx={{ color:"inherit" }} />{children}</Box> : children}
    </MuiButton>
  );
};
export default Button;
