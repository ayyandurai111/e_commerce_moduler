// ─────────────────────────────────────────────────────────────
//  PurchasePanel — price, variants, qty stepper, CTA buttons
//
//  Responsive behaviour:
//    xs  — full-width below gallery; CTA buttons stack 100%
//    sm  — buttons in a row (Add to Cart | Buy Now)
//    md+ — sticky sidebar panel with border+shadow
//    Quantity stepper always accessible; font/spacing scales up
// ─────────────────────────────────────────────────────────────
import React, { useState, useCallback } from "react";
import { Box, Typography, IconButton, Divider, Snackbar, Alert, Tooltip } from "@mui/material";
import AddIcon                  from "@mui/icons-material/Add";
import RemoveIcon               from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BoltOutlinedIcon         from "@mui/icons-material/BoltOutlined";
import FavoriteBorderIcon       from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon             from "@mui/icons-material/Favorite";
import ShareOutlinedIcon        from "@mui/icons-material/ShareOutlined";
import { useTheme, alpha }      from "@mui/material/styles";
import { BRAND }                from "../../../theme/theme";
import PriceTag                 from "../../../components/common/PriceTag/PriceTag";
import Button                   from "../../../components/common/Button/Button";
import VariantSelector          from "../VariantSelector/VariantSelector";

const PurchasePanel = ({ product, onAddToCart, onBuyNow, sx = {} }) => {
  const theme = useTheme();

  const [quantity,    setQuantity]    = useState(1);
  const [selected,    setSelected]    = useState({
    color: product?.variants?.colors?.[0] ?? null,
    size:  product?.variants?.sizes?.[0]  ?? null,
  });
  const [wishlisted,  setWishlisted]  = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [buyLoading,  setBuyLoading]  = useState(false);
  const [snack,       setSnack]       = useState({ open:false, msg:"", severity:"success" });

  if (!product) return null;
  const { price, originalPrice, stock, variants, currency = "₹" } = product;
  const inStock = (stock ?? 0) > 0;
  const maxQty  = Math.min(stock ?? 99, 99);

  const handleColorChange = useCallback((color) => setSelected(s => ({ ...s, color })), []);
  const handleSizeChange  = useCallback((size)  => setSelected(s => ({ ...s, size  })), []);

  const handleAddToCart = async () => {
    setCartLoading(true);
    await onAddToCart?.({ product, quantity, selected });
    await new Promise(r => setTimeout(r, 600));
    setCartLoading(false);
    setSnack({ open:true, msg:`${product.name} added to cart!`, severity:"success" });
  };

  const handleBuyNow = async () => {
    setBuyLoading(true);
    await onBuyNow?.({ product, quantity, selected });
    await new Promise(r => setTimeout(r, 600));
    setBuyLoading(false);
  };

  const handleShare = () => {
    if (navigator.share) { navigator.share({ title:product.name, url:window.location.href }).catch(()=>{}); }
    else { navigator.clipboard?.writeText(window.location.href); setSnack({ open:true, msg:"Link copied!", severity:"info" }); }
  };

  const qtyBtnSx = {
    width:  { xs:36, md:40 },
    height: { xs:36, md:40 },
    border: `1.5px solid ${theme.palette.divider}`,
    bgcolor: theme.palette.background.paper,
    transition: "all 0.2s ease",
    "&:hover:not(.Mui-disabled)": { borderColor:theme.palette.primary.main, bgcolor:alpha(theme.palette.primary.main,0.04) },
    "&.Mui-disabled": { opacity:0.38 },
  };

  return (
    <Box sx={{
      display:"flex", flexDirection:"column", gap:{ xs:2, md:2.5 },
      p:{ xs:2, sm:2.5, md:3 },
      border:`1px solid ${theme.palette.divider}`,
      borderRadius:BRAND.radiusCard,
      bgcolor:theme.palette.background.paper,
      // Subtle elevation on md+
      boxShadow:{ md:`0 4px 24px ${alpha(theme.palette.primary.main,0.07)}` },
      ...sx,
    }}>

      {/* Price */}
      <PriceTag price={price} originalPrice={originalPrice} currency={currency} size="large" />

      <Divider />

      {/* Variants */}
      {variants && (
        <VariantSelector variants={variants} selected={selected} onColorChange={handleColorChange} onSizeChange={handleSizeChange} />
      )}

      {/* Quantity */}
      <Box>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, letterSpacing:"0.08em", textTransform:"uppercase", color:theme.palette.text.secondary, mb:{ xs:1, md:1.25 } }}>
          Quantity
        </Typography>
        <Box sx={{ display:"flex", alignItems:"center" }}>
          <IconButton size="small" onClick={()=>setQuantity(q=>Math.max(1,q-1))} disabled={quantity<=1}
            sx={{ ...qtyBtnSx, borderRadius:`${BRAND.radiusButton} 0 0 ${BRAND.radiusButton}` }} aria-label="Decrease quantity">
            <RemoveIcon sx={{ fontSize:{ xs:14, md:16 } }} />
          </IconButton>
          <Box sx={{ width:{ xs:44, md:52 }, height:{ xs:36, md:40 }, display:"flex", alignItems:"center", justifyContent:"center", borderTop:`1.5px solid ${theme.palette.divider}`, borderBottom:`1.5px solid ${theme.palette.divider}` }}>
            <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:{ xs:BRAND.sizeSm, md:BRAND.sizeBody }, fontWeight:theme.typography.fontWeightBold, lineHeight:1 }}>{quantity}</Typography>
          </Box>
          <IconButton size="small" onClick={()=>setQuantity(q=>Math.min(maxQty,q+1))} disabled={quantity>=maxQty}
            sx={{ ...qtyBtnSx, borderRadius:`0 ${BRAND.radiusButton} ${BRAND.radiusButton} 0` }} aria-label="Increase quantity">
            <AddIcon sx={{ fontSize:{ xs:14, md:16 } }} />
          </IconButton>
          {stock != null && stock < 20 && (
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, ml:2 }}>
              {inStock ? `${stock} available` : "Sold out"}
            </Typography>
          )}
        </Box>
      </Box>

      {/* CTAs */}
      <Box sx={{ display:"flex", flexDirection:{ xs:"column", sm:"row" }, gap:{ xs:1, sm:1.25 } }}>
        <Button variant="secondary" fullWidth loading={cartLoading} disabled={!inStock} onClick={handleAddToCart} startIcon={<ShoppingCartOutlinedIcon />} size="lg">
          Add to Cart
        </Button>
        <Button variant="primary" fullWidth loading={buyLoading} disabled={!inStock} onClick={handleBuyNow} startIcon={<BoltOutlinedIcon />} size="lg">
          Buy Now
        </Button>
      </Box>

      {/* Secondary actions */}
      <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0.5 }}>
        <Tooltip title={wishlisted?"Remove from wishlist":"Save to wishlist"}>
          <IconButton size="small" onClick={()=>setWishlisted(w=>!w)} sx={{ color:wishlisted?theme.palette.secondary.main:theme.palette.text.secondary, transition:"color 0.2s" }}>
            {wishlisted ? <FavoriteIcon sx={{ fontSize:{ xs:16, md:18 } }} /> : <FavoriteBorderIcon sx={{ fontSize:{ xs:16, md:18 } }} />}
          </IconButton>
        </Tooltip>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, cursor:"pointer" }} onClick={()=>setWishlisted(w=>!w)}>
          {wishlisted ? "Saved" : "Wishlist"}
        </Typography>
        <Box sx={{ width:1, height:14, bgcolor:theme.palette.divider, mx:1 }} />
        <Tooltip title="Share product">
          <IconButton size="small" onClick={handleShare} sx={{ color:theme.palette.text.secondary }}>
            <ShareOutlinedIcon sx={{ fontSize:{ xs:16, md:18 } }} />
          </IconButton>
        </Tooltip>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, cursor:"pointer" }} onClick={handleShare}>
          Share
        </Typography>
      </Box>

      <Snackbar open={snack.open} autoHideDuration={2500} onClose={()=>setSnack(s=>({...s,open:false}))} anchorOrigin={{ vertical:"bottom", horizontal:"center" }}>
        <Alert severity={snack.severity} variant="filled" onClose={()=>setSnack(s=>({...s,open:false}))} sx={{ width:"100%", fontFamily:BRAND.fontBody }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default PurchasePanel;
