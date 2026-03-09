// ─────────────────────────────────────────────────────────────
//  EmptyCart
//  ✅ Colours   → theme.palette.*
//  ✅ Fonts     → BRAND.font*
//  ✅ Sizes     → BRAND.size*
//  ✅ Radii     → BRAND.radius*
//  ✅ Spacing   → theme.spacing() / sx numbers
//  ✅ Responsive: xs compact → md comfortable
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon        from "@mui/icons-material/ArrowForward";
import { useTheme, alpha }     from "@mui/material/styles";
import { BRAND }               from "../../../theme/theme";
import Button                  from "../../../components/common/Button/Button";

const EmptyCart = ({ onContinueShopping }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", textAlign: "center",
      py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 },
    }}>
      {/* Icon ring */}
      <Box sx={{
        position: "relative",
        width:  { xs: 100, md: 128 }, height: { xs: 100, md: 128 },
        mb: { xs: 3, md: 4 },
        borderRadius: "50%",
        bgcolor: alpha(theme.palette.secondary.main, 0.06),
        display: "flex", alignItems: "center", justifyContent: "center",
        "&::before": {
          content: '""', position: "absolute", inset: -10,
          borderRadius: "50%",
          border: `2px dashed ${alpha(theme.palette.secondary.main, 0.2)}`,
        },
      }}>
        <ShoppingBagOutlinedIcon sx={{
          fontSize: { xs: 46, md: 60 },
          color: alpha(theme.palette.primary.main, 0.25),
        }} />
      </Box>

      <Typography sx={{
        fontFamily: BRAND.fontDisplay,
        fontWeight: theme.typography.fontWeightBlack,
        fontSize:   { xs: BRAND.sizeH4, sm: BRAND.sizeH3, md: BRAND.sizeH2 },
        color:      theme.palette.text.primary,
        lineHeight: 1.15, mb: { xs: 1, md: 1.5 },
      }}>
        Your cart is empty
      </Typography>

      <Typography sx={{
        fontFamily: BRAND.fontBody,
        fontSize:   { xs: BRAND.sizeSm, md: BRAND.sizeBody },
        color:      theme.palette.text.secondary,
        maxWidth: 340, lineHeight: 1.75, mb: { xs: 4, md: 5 },
      }}>
        Looks like you haven't added anything yet.
        Browse our collection and find something you love.
      </Typography>

      <Button
        variant="primary" size="lg"
        endIcon={<ArrowForwardIcon />}
        onClick={onContinueShopping}
        sx={{ minWidth: { xs: 200, sm: 240 } }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};
export default EmptyCart;
