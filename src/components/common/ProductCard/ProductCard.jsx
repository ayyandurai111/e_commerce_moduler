import React, { useState } from "react";
import { Box, Card, CardContent, Typography, IconButton, Button, Tooltip } from "@mui/material";
import FavoriteBorderIcon     from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon           from "@mui/icons-material/Favorite";
import AddShoppingCartIcon    from "@mui/icons-material/AddShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useTheme, alpha }    from "@mui/material/styles";
import { BRAND }              from "../../../theme/theme";
import PriceTag               from "../PriceTag/PriceTag";
import ProductBadge           from "../ProductBadge/ProductBadge";
import RatingStars            from "../RatingStars/RatingStars";

const usePlaceholderBg = (id=0) => {
  const theme = useTheme();
  const { primary:p, secondary:s, warning:w, success:su, error:e } = theme.palette;
  const list = [
    `linear-gradient(135deg,${p.main} 0%,${alpha(p.main,0.5)} 100%)`,
    `linear-gradient(135deg,${s.main} 0%,${alpha(s.main,0.5)} 100%)`,
    `linear-gradient(135deg,${alpha(p.main,0.7)} 0%,${alpha(s.main,0.6)} 100%)`,
    `linear-gradient(135deg,${su.main} 0%,${alpha(su.main,0.5)} 100%)`,
    `linear-gradient(135deg,${w.main} 0%,${alpha(s.main,0.7)} 100%)`,
    `linear-gradient(135deg,${alpha(s.main,0.8)} 0%,${alpha(w.main,0.6)} 100%)`,
    `linear-gradient(135deg,${e.main} 0%,${alpha(s.main,0.6)} 100%)`,
    `linear-gradient(135deg,${p.dark} 0%,${alpha(p.main,0.4)} 100%)`,
  ];
  return list[id % list.length];
};

const GridCard = ({ product, onAddToCart, onQuickView, currency }) => {
  const theme = useTheme();
  const bg = usePlaceholderBg(product.id||0);
  const [wishlisted,  setWishlisted]  = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const handleAdd = () => { setAddedToCart(true); onAddToCart?.(product); setTimeout(()=>setAddedToCart(false),1800); };
  return (
    <Card elevation={0} sx={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", borderRadius:BRAND.radiusCard, overflow:"hidden", backgroundColor:theme.palette.background.paper, border:`1px solid ${theme.palette.divider}`, position:"relative", cursor:"pointer", transition:"box-shadow 0.3s ease,transform 0.3s ease,border-color 0.3s ease", "&:hover":{ boxShadow:`0 16px 40px ${alpha(theme.palette.secondary.main,0.16)}`, transform:"translateY(-4px)", borderColor:alpha(theme.palette.secondary.main,0.3) }, "&:hover .pc-actions":{ opacity:1, transform:"translateY(0)" }, "&:hover .pc-img":{ transform:"scale(1.06)" } }}>
      <Box sx={{ position:"relative", overflow:"hidden", flexShrink:0, aspectRatio:BRAND.cardImageRatio, minHeight:{ xs:BRAND.cardImageHeightXs, sm:BRAND.cardImageHeightSm, md:BRAND.cardImageHeightMd, lg:BRAND.cardImageHeightLg }, backgroundColor:product.image?theme.palette.background.default:"transparent" }}>
        {product.image ? (
          <Box className="pc-img" component="img" src={product.image} alt={product.name} sx={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease" }} />
        ) : (
          <Box className="pc-img" sx={{ width:"100%", height:"100%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform 0.5s ease" }}>
            <Typography sx={{ color:alpha(theme.palette.primary.contrastText,0.8), fontSize:BRAND.sizeXxs, fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightSemibold, textAlign:"center", letterSpacing:"0.06em", px:2 }}>{product.name}</Typography>
          </Box>
        )}
        {product.badge && <Box sx={{ position:"absolute", top:10, left:10 }}><ProductBadge label={product.badge} variant={product.badge.toLowerCase().replace(/\s/g,"")} /></Box>}
        <IconButton size="small" onClick={()=>setWishlisted(w=>!w)} sx={{ position:"absolute", top:8, right:8, backgroundColor:alpha(theme.palette.background.paper,0.92), backdropFilter:"blur(4px)", width:32, height:32, transition:"all 0.2s ease", "&:hover":{ backgroundColor:theme.palette.background.paper, transform:"scale(1.1)" } }}>
          {wishlisted ? <FavoriteIcon sx={{ fontSize:15, color:theme.palette.secondary.main }} /> : <FavoriteBorderIcon sx={{ fontSize:15, color:theme.palette.primary.main }} />}
        </IconButton>
        <Box className="pc-actions" sx={{ position:"absolute", bottom:0, left:0, right:0, display:"flex", gap:0.75, p:1.25, opacity:0, transform:"translateY(8px)", transition:"all 0.3s ease" }}>
          <Button variant="contained" color={addedToCart?"success":"secondary"} fullWidth size="small" startIcon={<AddShoppingCartIcon />} onClick={handleAdd} sx={{ borderRadius:BRAND.radiusButton, py:0.9, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, fontFamily:BRAND.fontBody }}>
            {addedToCart?"Added!":"Add to Cart"}
          </Button>
          <Tooltip title="Quick View">
            <IconButton size="small" onClick={()=>onQuickView?.(product)} sx={{ backgroundColor:alpha(theme.palette.background.paper,0.92), width:34, height:34, flexShrink:0, borderRadius:BRAND.radiusButton, "&:hover":{ backgroundColor:theme.palette.background.paper } }}>
              <VisibilityOutlinedIcon sx={{ fontSize:15 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <CardContent sx={{ px:1.75, pt:1.75, pb:"14px !important", flex:1, display:"flex", flexDirection:"column", minHeight:BRAND.cardContentMinH, gap:0.5 }}>
        <Box sx={{ flex:1, display:"flex", flexDirection:"column", gap:0.4 }}>
          {product.brand && <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:theme.typography.fontWeightBold, letterSpacing:"0.1em", color:theme.palette.secondary.main, textTransform:"uppercase", lineHeight:1 }}>{product.brand}</Typography>}
          <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightSemibold, fontSize:BRAND.sizeSm, lineHeight:1.4, color:theme.palette.text.primary, display:"-webkit-box", WebkitLineClamp:BRAND.cardNameLines, WebkitBoxOrient:"vertical", overflow:"hidden", minHeight:BRAND.cardNameMinH }}>{product.name||"Product Name"}</Typography>
        </Box>
        <Box sx={{ display:"flex", flexDirection:"column", gap:0.5, mt:"auto" }}>
          {product.rating!==undefined && <RatingStars rating={product.rating} count={product.reviewCount} size="small" />}
          <PriceTag price={product.price||0} originalPrice={product.originalPrice} currency={currency} size="small" />
        </Box>
      </CardContent>
    </Card>
  );
};

export const ProductCardGrid = ({ children }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display:"grid", gridTemplateColumns:{ xs:"repeat(2,1fr)", sm:"repeat(2,1fr)", md:"repeat(3,1fr)", lg:"repeat(4,1fr)", xl:"repeat(4,1fr)" }, gap:{ xs:theme.spacing(1.5), sm:theme.spacing(2), md:theme.spacing(2.5), lg:theme.spacing(3) }, "& > *":{ display:"flex" } }}>
      {children}
    </Box>
  );
};

const ProductCard = ({ product={}, viewMode="grid", currency="₹", onAddToCart, onQuickView }) =>
  <GridCard product={product} onAddToCart={onAddToCart} onQuickView={onQuickView} currency={currency} />;

export default ProductCard;
