// ─────────────────────────────────────────────────────────────
//  WishlistGrid — responsive grid of saved wishlist items
//  Each item shows image, brand, name, price, stock and CTAs
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, IconButton, Tooltip, Chip, Snackbar, Alert } from "@mui/material";
import DeleteOutlineIcon     from "@mui/icons-material/DeleteOutline";
import AddShoppingCartIcon   from "@mui/icons-material/AddShoppingCart";
import ShareOutlinedIcon     from "@mui/icons-material/ShareOutlined";
import { useTheme, alpha }   from "@mui/material/styles";
import { BRAND }             from "../../../theme/theme";
import PriceTag              from "../../../components/common/PriceTag/PriceTag";
import ProductBadge          from "../../../components/common/ProductBadge/ProductBadge";
import { STORE_CURRENCY }    from "../../../config/store/storeConfig";

const WishlistCard = ({ product, onRemove, onAddToCart, onProductClick }) => {
  const theme = useTheme();
  const [adding, setAdding] = useState(false);
  const inStock = (product.stock ?? 1) > 0;

  const handleAdd = async () => {
    setAdding(true);
    await onAddToCart?.(product);
    await new Promise(r=>setTimeout(r,700));
    setAdding(false);
  };

  return (
    <Card elevation={0} sx={{
      display:      "flex",
      flexDirection:"column",
      height:       "100%",
      borderRadius: BRAND.radiusCard,
      border:       `1px solid ${theme.palette.divider}`,
      overflow:     "hidden",
      transition:   "box-shadow 0.25s ease, transform 0.25s ease",
      "&:hover":    {
        boxShadow:  `0 12px 32px ${alpha(theme.palette.secondary.main,0.14)}`,
        transform:  "translateY(-3px)",
        borderColor: alpha(theme.palette.secondary.main,0.3),
      },
    }}>
      {/* Image */}
      <Box sx={{
        position:    "relative",
        aspectRatio: "3/4",
        overflow:    "hidden",
        bgcolor:     theme.palette.background.default,
        cursor:      "pointer",
        "&:hover .wl-img":{ transform:"scale(1.06)" },
      }} onClick={()=>onProductClick?.(product)}>
        {product.image ? (
          <Box className="wl-img" component="img" src={product.image} alt={product.name} sx={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease" }} />
        ) : (
          <Box className="wl-img" sx={{ width:"100%", height:"100%", background:`linear-gradient(135deg,${theme.palette.primary.main},${alpha(theme.palette.secondary.main,0.6)})`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform 0.5s ease" }}>
            <Typography sx={{ color:alpha("#fff",0.7), fontFamily:BRAND.fontBody, fontWeight:600, fontSize:BRAND.sizeXs, textAlign:"center", px:2 }}>{product.name}</Typography>
          </Box>
        )}

        {product.badge && (
          <Box sx={{ position:"absolute", top:10, left:10 }}>
            <ProductBadge label={product.badge} variant={product.badge.toLowerCase()} />
          </Box>
        )}

        {!inStock && (
          <Box sx={{ position:"absolute", inset:0, bgcolor:alpha("#fff",0.55), display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Chip label="Out of Stock" size="small" color="error" sx={{ fontFamily:BRAND.fontBody, fontWeight:700 }} />
          </Box>
        )}

        {/* Remove button */}
        <Tooltip title="Remove from wishlist">
          <IconButton size="small" onClick={(e)=>{ e.stopPropagation(); onRemove?.(product.id); }}
            sx={{ position:"absolute", top:8, right:8, bgcolor:alpha("#fff",0.9), backdropFilter:"blur(4px)", width:30, height:30, "&:hover":{ bgcolor:"#fff", color:theme.palette.error.main } }}>
            <DeleteOutlineIcon sx={{ fontSize:15 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Content */}
      <CardContent sx={{ p:"14px !important", flex:1, display:"flex", flexDirection:"column", gap:0.5 }}>
        {product.brand && (
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:theme.palette.secondary.main, lineHeight:1 }}>
            {product.brand}
          </Typography>
        )}
        <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:600, fontSize:BRAND.sizeSm, lineHeight:1.4, color:theme.palette.text.primary, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {product.name}
        </Typography>
        <Box sx={{ mt:"auto", pt:0.75 }}>
          <PriceTag price={product.price} originalPrice={product.originalPrice} currency={STORE_CURRENCY} size="small" />
        </Box>

        {/* Add to cart */}
        <Box
          onClick={inStock ? handleAdd : undefined}
          sx={{
            mt:          1,
            display:     "flex",
            alignItems:  "center",
            justifyContent:"center",
            gap:         0.75,
            py:          1,
            borderRadius:BRAND.radiusButton,
            bgcolor:     inStock ? (adding ? theme.palette.success.main : theme.palette.primary.main) : alpha(theme.palette.text.disabled,0.1),
            cursor:      inStock ? "pointer" : "not-allowed",
            transition:  "background-color 0.2s ease",
            "&:hover":   inStock ? { bgcolor: adding ? theme.palette.success.main : theme.palette.secondary.main } : {},
          }}
        >
          <AddShoppingCartIcon sx={{ fontSize:15, color:inStock?"#fff":theme.palette.text.disabled }} />
          <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeXxs, color:inStock?"#fff":theme.palette.text.disabled, letterSpacing:"0.04em" }}>
            {!inStock ? "Out of Stock" : adding ? "Added!" : "Add to Cart"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const WishlistGrid = ({ products = [], onRemove, onAddToCart, onProductClick, sx = {} }) => (
  <Box sx={sx}>
    <Grid container spacing={{ xs:1.5, sm:2, md:2.5 }}>
      {products.map((p, i) => (
        <Grid item xs={6} sm={4} md={3} lg={3} key={p.id ?? i}>
          <WishlistCard
            product={p}
            onRemove={onRemove}
            onAddToCart={onAddToCart}
            onProductClick={onProductClick}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default WishlistGrid;
