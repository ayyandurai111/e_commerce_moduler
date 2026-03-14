import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";
import Button              from "../../../components/common/Button/Button";

const WishlistEmpty = ({ onShopNow }) => {
  const theme = useTheme();
  return (
    <Box sx={{ py:{ xs:8, md:14 }, textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:2.5 }}>
      <Box sx={{ width:96, height:96, borderRadius:"50%", bgcolor:alpha(theme.palette.secondary.main,0.08), display:"flex", alignItems:"center", justifyContent:"center" }}>
        <FavoriteBorderIcon sx={{ fontSize:44, color:theme.palette.secondary.main }} />
      </Box>
      <Box>
        <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:{ xs:"1.4rem", md:"1.75rem" }, color:theme.palette.text.primary, mb:0.75 }}>
          Your wishlist is empty
        </Typography>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary, maxWidth:360, mx:"auto", lineHeight:1.75 }}>
          Save items you love so you can find them easily later. Look for the ♡ on any product.
        </Typography>
      </Box>
      <Button variant="primary" size="lg" onClick={onShopNow}>
        Explore Products
      </Button>
    </Box>
  );
};

export default WishlistEmpty;
