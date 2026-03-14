// ─────────────────────────────────────────────────────────────
//  RelatedProducts — responsive product grid
//
//  Responsive behaviour:
//    xs  — 2 columns
//    sm  — 2 columns
//    md  — 3 columns
//    lg  — 4 columns
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme }        from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";
import ProductCard, { ProductCardGrid } from "../../../components/common/ProductCard/ProductCard";

const RelatedProducts = ({ products = [], onProductClick, onAddToCart, currency = "₹", sx = {} }) => {
  const theme = useTheme();
  if (!products?.length) return null;

  return (
    <Box sx={sx}>
      {/* Section heading */}
      <Box sx={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", mb:{ xs:2.5, md:3.5 } }}>
        <Box>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:theme.typography.fontWeightBold, letterSpacing:"0.12em", textTransform:"uppercase", color:theme.palette.secondary.main, mb:0.5 }}>
            You May Also Like
          </Typography>
          <Typography variant="h3" sx={{ fontFamily:BRAND.fontDisplay, fontWeight:theme.typography.fontWeightBlack, fontSize:{ xs:"1.4rem", sm:"1.6rem", md:"1.875rem" }, lineHeight:1.2, color:theme.palette.text.primary }}>
            Related Products
          </Typography>
        </Box>
        <Typography component="span" onClick={()=>onProductClick?.(null)}
          sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightSemibold, color:theme.palette.secondary.main, cursor:"pointer", display:{ xs:"none", sm:"block" }, "&:hover":{ textDecoration:"underline" } }}>
          View All →
        </Typography>
      </Box>

      <ProductCardGrid>
        {products.map((p, i) => (
          <ProductCard key={p?.id ?? i} product={p} currency={currency} onAddToCart={onAddToCart} onQuickView={onProductClick} />
        ))}
      </ProductCardGrid>
    </Box>
  );
};
export default RelatedProducts;
