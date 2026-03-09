// ─────────────────────────────────────────────────────────────
//  ProductInfo — title, brand, rating, stock status, trust strip
//
//  Responsive behaviour:
//    xs  — compact spacing, trust strip stacks vertically
//    sm+ — trust strip switches to horizontal row
//    md+ — larger heading, more generous gaps
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Divider, Chip } from "@mui/material";
import LocalShippingOutlinedIcon    from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import SecurityOutlinedIcon         from "@mui/icons-material/SecurityOutlined";
import VerifiedIcon                 from "@mui/icons-material/Verified";
import { useTheme, alpha }          from "@mui/material/styles";
import { BRAND }                    from "../../../theme/theme";
import RatingStars                  from "../../../components/common/RatingStars/RatingStars";
import ProductBadge                 from "../../../components/common/ProductBadge/ProductBadge";

const PERKS = [
  { icon: <LocalShippingOutlinedIcon    sx={{ fontSize:{ xs:14, md:15 } }} />, label:"Free shipping $50+" },
  { icon: <AssignmentReturnOutlinedIcon sx={{ fontSize:{ xs:14, md:15 } }} />, label:"30-day returns"     },
  { icon: <SecurityOutlinedIcon         sx={{ fontSize:{ xs:14, md:15 } }} />, label:"2-year warranty"    },
];

const badgeVariantMap = { SALE:"sale", NEW:"new", BESTSELLER:"bestseller", HOT:"sale", LIMITED:"limited" };

const ProductInfo = ({ product, sx = {} }) => {
  const theme = useTheme();
  if (!product) return null;

  const { name, brand, sku, rating, reviewCount, shortDescription, badge, stock, category } = product;
  const inStock  = (stock ?? 0) > 0;
  const lowStock = inStock && stock < 10;
  const badgeVariant = badgeVariantMap[badge?.toUpperCase()] ?? "new";

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:{ xs:1.5, md:2 }, ...sx }}>

      {/* Category + badge */}
      <Box sx={{ display:"flex", alignItems:"center", gap:1, flexWrap:"wrap" }}>
        {category && (
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:theme.typography.fontWeightBold, letterSpacing:"0.12em", color:theme.palette.secondary.main, textTransform:"uppercase" }}>
            {category}
          </Typography>
        )}
        {badge && <ProductBadge label={badge} variant={badgeVariant} />}
      </Box>

      {/* Title */}
      <Box>
        <Typography component="h1"
          sx={{ fontFamily:BRAND.fontDisplay, fontWeight:theme.typography.fontWeightBlack, color:theme.palette.text.primary, lineHeight:1.15,
            fontSize:{ xs:"1.6rem", sm:"1.9rem", md:"2.1rem", lg:"2.3rem" },
            mb: brand ? 0.75 : 0,
          }}>
          {name ?? "Unnamed Product"}
        </Typography>

        {brand && (
          <Box sx={{ display:"flex", alignItems:"center", gap:0.75 }}>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary }}>by</Typography>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightBold, color:theme.palette.text.primary }}>{brand}</Typography>
            <VerifiedIcon sx={{ fontSize:{ xs:13, md:14 }, color:theme.palette.secondary.main }} />
          </Box>
        )}
      </Box>

      {/* Rating */}
      {rating != null && (
        <Box sx={{ display:"flex", alignItems:"center", gap:{ xs:1, md:1.5 }, flexWrap:"wrap" }}>
          <RatingStars rating={rating} count={reviewCount ?? 0} size="small" />
          {sku && (
            <>
              <Box sx={{ width:1, height:14, bgcolor:theme.palette.divider }} />
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>
                SKU: <Box component="span" sx={{ fontWeight:theme.typography.fontWeightSemibold, color:theme.palette.text.primary }}>{sku}</Box>
              </Typography>
            </>
          )}
        </Box>
      )}

      <Divider />

      {/* Short description */}
      {shortDescription && (
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:{ xs:BRAND.sizeSm, md:BRAND.sizeBody }, color:theme.palette.text.secondary, lineHeight:1.75, borderLeft:`3px solid ${theme.palette.secondary.main}`, pl:{ xs:1.5, md:2 } }}>
          {shortDescription}
        </Typography>
      )}

      {/* Stock status */}
      <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
        <Box sx={{ width:8, height:8, borderRadius:"50%", flexShrink:0, bgcolor:inStock?theme.palette.success.main:theme.palette.error.main, boxShadow:inStock?`0 0 0 3px ${alpha(theme.palette.success.main,0.15)}`:`0 0 0 3px ${alpha(theme.palette.error.main,0.15)}` }} />
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightSemibold, color:inStock?theme.palette.success.main:theme.palette.error.main }}>
          {inStock ? "In Stock" : "Out of Stock"}
        </Typography>
        {lowStock && (
          <Chip label={`Only ${stock} left!`} size="small"
            sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:theme.typography.fontWeightBold, height:20, bgcolor:alpha(theme.palette.warning.main,0.12), color:theme.palette.warning.main, border:`1px solid ${alpha(theme.palette.warning.main,0.3)}`, borderRadius:BRAND.radiusBadge, "& .MuiChip-label":{ px:1 } }} />
        )}
      </Box>

      {/* Trust perks strip */}
      <Box sx={{ display:"flex", flexDirection:{ xs:"column", sm:"row" }, border:`1px solid ${theme.palette.divider}`, borderRadius:BRAND.radiusCard, overflow:"hidden", mt:0.5 }}>
        {PERKS.map((perk, i) => (
          <Box key={i} sx={{
            flex:1, display:"flex", alignItems:"center", gap:{ xs:1, md:1.25 },
            px:{ xs:1.5, md:2 }, py:{ xs:1.25, md:1.5 },
            borderRight: { xs:"none", sm: i < PERKS.length-1 ? `1px solid ${theme.palette.divider}` : "none" },
            borderBottom:{ xs: i < PERKS.length-1 ? `1px solid ${theme.palette.divider}` : "none", sm:"none" },
            bgcolor: theme.palette.background.paper,
          }}>
            <Box sx={{ color:theme.palette.secondary.main, flexShrink:0 }}>{perk.icon}</Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:{ xs:"0.7rem", md:BRAND.sizeXxs }, fontWeight:theme.typography.fontWeightMedium, color:theme.palette.text.secondary, lineHeight:1.3 }}>
              {perk.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default ProductInfo;
