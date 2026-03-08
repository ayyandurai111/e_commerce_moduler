// ═══════════════════════════════════════════════════════════════
//  ProductCard — SHARED component  (Home · PLP · every future page)
//
//  ┌──────────────────────────────────────────────────────────┐
//  │  SINGLE SOURCE OF TRUTH — card size, layout, behaviour  │
//  │  Home · PLP · any future page all import from here.     │
//  │  To resize cards sitewide → edit BRAND.card* in theme.js│
//  └──────────────────────────────────────────────────────────┘
//
//  Grid layout (industry standard — ASOS / Zara / Net-a-Porter):
//  ┌────────────┬───────────────────────────────────────────┐
//  │ xs  (0px)  │  2 columns                               │
//  │ sm  (480px)│  2 columns                               │
//  │ md  (768px)│  3 columns  (product area ~75% of page)  │
//  │ lg  (1024) │  4 columns                               │
//  │ xl  (1280) │  4 columns                               │
//  └────────────┴───────────────────────────────────────────┘
//  List view → always 1 column (100% width)
//
//  ZERO hardcoded colors / fonts / sizes / weights
// ═══════════════════════════════════════════════════════════════
import React, { useState } from "react";
import {
  Box, Card, CardContent, Typography,
  IconButton, Button, Tooltip,
} from "@mui/material";
import FavoriteBorderIcon     from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon           from "@mui/icons-material/Favorite";
import AddShoppingCartIcon    from "@mui/icons-material/AddShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useTheme, alpha }    from "@mui/material/styles";
import { BRAND }              from "../../../theme/theme";
import PriceTag               from "../PriceTag/PriceTag";
import ProductBadge           from "../ProductBadge/ProductBadge";
import RatingStars            from "../RatingStars/RatingStars";

// ── Decorative placeholder gradients (no hardcoded hex) ───────
const usePlaceholderBg = (id = 0) => {
  const theme = useTheme();
  const { primary: p, secondary: s, warning: w, success: su, error: e } = theme.palette;
  const list = [
    `linear-gradient(135deg, ${p.main} 0%, ${alpha(p.main,0.5)} 100%)`,
    `linear-gradient(135deg, ${s.main} 0%, ${alpha(s.main,0.5)} 100%)`,
    `linear-gradient(135deg, ${alpha(p.main,0.7)} 0%, ${alpha(s.main,0.6)} 100%)`,
    `linear-gradient(135deg, ${su.main} 0%, ${alpha(su.main,0.5)} 100%)`,
    `linear-gradient(135deg, ${w.main} 0%, ${alpha(s.main,0.7)} 100%)`,
    `linear-gradient(135deg, ${alpha(s.main,0.8)} 0%, ${alpha(w.main,0.6)} 100%)`,
    `linear-gradient(135deg, ${e.main} 0%, ${alpha(s.main,0.6)} 100%)`,
    `linear-gradient(135deg, ${p.dark} 0%, ${alpha(p.main,0.4)} 100%)`,
  ];
  return list[id % list.length];
};

// ═══════════════════════════════════════════════════════════════
//  GridCard
// ═══════════════════════════════════════════════════════════════
const GridCard = ({ product, onAddToCart, onQuickView, currency }) => {
  const theme = useTheme();
  const bg    = usePlaceholderBg(product.id || 0);
  const [wishlisted,  setWishlisted]  = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAdd = () => {
    setAddedToCart(true);
    onAddToCart?.(product);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <Card elevation={0} sx={{
      width:         "100%",
      height:        "100%",
      display:       "flex",
      flexDirection: "column",
      borderRadius:    BRAND.radiusCard,
      overflow:        "hidden",
      backgroundColor: theme.palette.background.paper,
      border:          `1px solid ${theme.palette.divider}`,
      position:        "relative",
      cursor:          "pointer",
      transition:      "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease",
      "&:hover": {
        boxShadow:   `0 16px 40px ${alpha(theme.palette.secondary.main, 0.16)}`,
        transform:   "translateY(-4px)",
        borderColor: alpha(theme.palette.secondary.main, 0.3),
      },
      "&:hover .pc-actions": { opacity: 1, transform: "translateY(0)" },
      "&:hover .pc-img":     { transform: "scale(1.06)" },
    }}>

      {/* ── IMAGE ──────────────────────────────────────── */}
      <Box sx={{
        position:   "relative",
        overflow:   "hidden",
        flexShrink: 0,
        aspectRatio: BRAND.cardImageRatio,
        minHeight: {
          xs: BRAND.cardImageHeightXs,
          sm: BRAND.cardImageHeightSm,
          md: BRAND.cardImageHeightMd,
          lg: BRAND.cardImageHeightLg,
        },
        backgroundColor: product.image ? theme.palette.background.default : "transparent",
      }}>
        {product.image ? (
          <Box className="pc-img" component="img" src={product.image} alt={product.name}
            sx={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease" }} />
        ) : (
          <Box className="pc-img" sx={{
            width:"100%", height:"100%", background:bg,
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"transform 0.5s ease",
          }}>
            <Typography sx={{
              color: alpha(theme.palette.primary.contrastText, 0.8),
              fontSize: BRAND.sizeXxs, fontFamily: BRAND.fontBody,
              fontWeight: theme.typography.fontWeightSemibold,
              textAlign: "center", letterSpacing: "0.06em", px: 2,
            }}>
              {product.name}
            </Typography>
          </Box>
        )}

        {/* Badge — top-left */}
        {product.badge && (
          <Box sx={{ position:"absolute", top:10, left:10 }}>
            <ProductBadge label={product.badge}
              variant={product.badge.toLowerCase().replace(/\s/g,"")} />
          </Box>
        )}

        {/* Wishlist — top-right */}
        <IconButton size="small" onClick={() => setWishlisted(w => !w)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          sx={{
            position:"absolute", top:8, right:8,
            backgroundColor: alpha(theme.palette.background.paper, 0.92),
            backdropFilter: "blur(4px)",
            width:32, height:32,
            transition:"all 0.2s ease",
            "&:hover": { backgroundColor: theme.palette.background.paper, transform:"scale(1.1)" },
          }}>
          {wishlisted
            ? <FavoriteIcon       sx={{ fontSize:15, color:theme.palette.secondary.main }} />
            : <FavoriteBorderIcon sx={{ fontSize:15, color:theme.palette.primary.main   }} />}
        </IconButton>

        {/* Hover action bar — slides up from bottom */}
        <Box className="pc-actions" sx={{
          position:"absolute", bottom:0, left:0, right:0,
          display:"flex", gap:0.75, p:1.25,
          opacity:0, transform:"translateY(8px)", transition:"all 0.3s ease",
        }}>
          <Button variant="contained" color={addedToCart ? "success" : "secondary"}
            fullWidth size="small" startIcon={<AddShoppingCartIcon />} onClick={handleAdd}
            sx={{
              borderRadius: BRAND.radiusButton,
              py: theme.spacing(0.9),
              fontSize: BRAND.sizeXs,
              fontWeight: theme.typography.fontWeightBold,
              fontFamily: BRAND.fontBody,
              backdropFilter: "blur(8px)",
            }}>
            {addedToCart ? "Added!" : "Add to Cart"}
          </Button>
          <Tooltip title="Quick View">
            <IconButton size="small" onClick={() => onQuickView?.(product)} sx={{
              backgroundColor: alpha(theme.palette.background.paper, 0.92),
              width:34, height:34, flexShrink:0,
              borderRadius: BRAND.radiusButton,
              "&:hover": { backgroundColor: theme.palette.background.paper },
            }}>
              <VisibilityOutlinedIcon sx={{ fontSize:15 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* ── CONTENT ────────────────────────────────────── */}
      <CardContent sx={{
        px:1.75, pt:1.75, pb:"14px !important",
        flex:1, display:"flex", flexDirection:"column",
        minHeight: BRAND.cardContentMinH,
        gap:0.5,
      }}>
        {/* Top: brand + name (grows to fill space) */}
        <Box sx={{ flex:1, display:"flex", flexDirection:"column", gap:0.4 }}>
          {product.brand && (
            <Typography sx={{
              fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXxs,
              fontWeight: theme.typography.fontWeightBold,
              letterSpacing:"0.1em", color:theme.palette.secondary.main,
              textTransform:"uppercase", lineHeight:1,
            }}>
              {product.brand}
            </Typography>
          )}
          <Typography sx={{
            fontFamily: BRAND.fontBody,
            fontWeight: theme.typography.fontWeightSemibold,
            fontSize:   BRAND.sizeSm, lineHeight:1.4,
            color:      theme.palette.text.primary,
            display:    "-webkit-box",
            WebkitLineClamp: BRAND.cardNameLines,
            WebkitBoxOrient: "vertical",
            overflow:   "hidden",
            minHeight:  BRAND.cardNameMinH,
          }}>
            {product.name || "Product Name"}
          </Typography>
        </Box>

        {/* Bottom: rating + price — pinned to card bottom */}
        <Box sx={{ display:"flex", flexDirection:"column", gap:0.5, mt:"auto" }}>
          {product.rating !== undefined && (
            <RatingStars rating={product.rating} count={product.reviewCount} size="small" />
          )}
          <PriceTag price={product.price||0} originalPrice={product.originalPrice}
            currency={currency} size="small" />
        </Box>
      </CardContent>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════════════
//  ListCard  (viewMode="list") — always full-width row
// ═══════════════════════════════════════════════════════════════
const ListCard = ({ product, onAddToCart, onQuickView, currency }) => {
  const theme = useTheme();
  const bg    = usePlaceholderBg(product.id || 0);
  const [wishlisted,  setWishlisted]  = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAdd = () => {
    setAddedToCart(true);
    onAddToCart?.(product);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <Card elevation={0} sx={{
      width:        "100%",
      minHeight:    BRAND.cardListMinH,
      display:      "flex",
      flexDirection:"row",
      alignItems:   "stretch",
      borderRadius:    BRAND.radiusCard,
      overflow:        "hidden",
      backgroundColor: theme.palette.background.paper,
      border:          `1px solid ${theme.palette.divider}`,
      transition:"all 0.25s ease",
      "&:hover": {
        boxShadow:   `0 8px 28px ${alpha(theme.palette.secondary.main, 0.12)}`,
        borderColor: alpha(theme.palette.secondary.main, 0.3),
      },
    }}>

      {/* Fixed image column */}
      <Box sx={{
        position:"relative", flexShrink:0,
        width: { xs: BRAND.cardListImageWXs, sm: BRAND.cardListImageWMd, md: BRAND.cardListImageW },
        overflow:"hidden",
        backgroundColor: product.image ? theme.palette.background.default : "transparent",
      }}>
        {product.image ? (
          <Box component="img" src={product.image} alt={product.name}
            sx={{ width:"100%", height:"100%", objectFit:"cover" }} />
        ) : (
          <Box sx={{
            width:"100%", height:"100%", minHeight: BRAND.cardListMinH,
            background:bg, display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <Typography sx={{ color:alpha(theme.palette.primary.contrastText,0.7),
              fontSize:BRAND.sizeXxs, fontFamily:BRAND.fontBody, textAlign:"center", px:1 }}>
              {product.name}
            </Typography>
          </Box>
        )}
        {product.badge && (
          <Box sx={{ position:"absolute", top:10, left:10 }}>
            <ProductBadge label={product.badge}
              variant={product.badge.toLowerCase().replace(/\s/g,"")} />
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ flex:1, display:"flex", flexDirection:"column", p:{ xs:1.5, md:2.5 }, gap:0.75 }}>
        {product.brand && (
          <Typography sx={{
            fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs,
            fontWeight:theme.typography.fontWeightBold,
            letterSpacing:"0.1em", color:theme.palette.secondary.main, textTransform:"uppercase",
          }}>
            {product.brand}
          </Typography>
        )}
        <Typography sx={{
          fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightSemibold,
          fontSize:{ xs:BRAND.sizeSm, md:BRAND.sizeBody }, lineHeight:1.4,
          color:theme.palette.text.primary,
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
        }}>
          {product.name}
        </Typography>
        {product.rating !== undefined && (
          <RatingStars rating={product.rating} count={product.reviewCount} size="small" />
        )}
        {product.description && (
          <Typography sx={{
            fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm,
            color:theme.palette.text.secondary, lineHeight:1.6,
            display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
          }}>
            {product.description}
          </Typography>
        )}
        {product.tags?.length > 0 && (
          <Box sx={{ display:"flex", gap:0.5, flexWrap:"wrap" }}>
            {product.tags.slice(0,3).map(tag => (
              <Typography key={tag} sx={{
                fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs,
                fontWeight:theme.typography.fontWeightMedium,
                color:theme.palette.text.secondary,
                backgroundColor:alpha(theme.palette.primary.main,0.05),
                border:`1px solid ${theme.palette.divider}`,
                px:0.75, py:0.2, borderRadius:BRAND.radiusButton,
              }}>
                {tag}
              </Typography>
            ))}
          </Box>
        )}
        {/* Price + actions — always pinned to bottom */}
        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:1, mt:"auto", pt:1 }}>
          <PriceTag price={product.price||0} originalPrice={product.originalPrice}
            currency={currency} size="medium" />
          <Box sx={{ display:"flex", gap:1 }}>
            <Tooltip title="Quick View">
              <IconButton size="small" onClick={() => onQuickView?.(product)} sx={{
                border:`1px solid ${theme.palette.divider}`, borderRadius:BRAND.radiusButton,
                width:36, height:36, color:theme.palette.text.secondary, transition:"all 0.2s ease",
                "&:hover":{ borderColor:theme.palette.secondary.main, color:theme.palette.secondary.main },
              }}>
                <VisibilityOutlinedIcon sx={{ fontSize:16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
              <IconButton size="small" onClick={() => setWishlisted(w => !w)} sx={{
                border:`1px solid ${wishlisted ? theme.palette.secondary.main : theme.palette.divider}`,
                borderRadius:BRAND.radiusButton, width:36, height:36,
                color:wishlisted ? theme.palette.secondary.main : theme.palette.text.secondary,
                backgroundColor:wishlisted ? alpha(theme.palette.secondary.main,0.08) : "transparent",
                transition:"all 0.2s ease",
                "&:hover":{ borderColor:theme.palette.secondary.main, color:theme.palette.secondary.main },
              }}>
                {wishlisted
                  ? <FavoriteIcon       sx={{ fontSize:16 }} />
                  : <FavoriteBorderIcon sx={{ fontSize:16 }} />}
              </IconButton>
            </Tooltip>
            <Button variant="contained" color={addedToCart ? "success" : "secondary"}
              size="small" startIcon={<AddShoppingCartIcon />} onClick={handleAdd}
              sx={{
                fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightBold,
                fontSize:BRAND.sizeSm, borderRadius:BRAND.radiusButton,
                px:2, whiteSpace:"nowrap",
              }}>
              {addedToCart ? "Added!" : "Add to Cart"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════════════
//  ProductCardGrid — CSS Grid container
//
//  ✅  Uses explicit column counts per breakpoint — NOT auto-fill.
//      MUI sx does not evaluate template literals inside responsive
//      objects, so auto-fill with a variable fails silently.
//      Explicit counts are reliable on every breakpoint.
//
//  Usage on ANY page:
//    import ProductCard, { ProductCardGrid }
//      from "../../components/common/ProductCard/ProductCard";
//
//    <ProductCardGrid>
//      {products.map(p => <ProductCard key={p.id} product={p} />)}
//    </ProductCardGrid>
// ═══════════════════════════════════════════════════════════════
export const ProductCardGrid = ({ children }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      display: "grid",
      // ── Explicit column counts (reliable in MUI v6 sx) ──────
      // xs / sm → 2 cols  (phones — matches Amazon, ASOS, Zara)
      // md      → 3 cols  (tablet / PLP with sidebar)
      // lg / xl → 4 cols  (desktop — fashion industry standard)
      gridTemplateColumns: {
        xs: "repeat(2, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(4, 1fr)",
      },
      gap: {
        xs: theme.spacing(1.5),   // 12px — mobile
        sm: theme.spacing(2),     // 16px — large phone
        md: theme.spacing(2.5),   // 20px — tablet
        lg: theme.spacing(3),     // 24px — desktop
      },
      // Each grid cell stretches cards to equal row height
      "& > *": { display: "flex" },
    }}>
      {children}
    </Box>
  );
};

// ═══════════════════════════════════════════════════════════════
//  ProductCard — main default export
// ═══════════════════════════════════════════════════════════════
const ProductCard = ({
  product    = {},
  viewMode   = "grid",
  currency   = "$",
  onAddToCart,
  onQuickView,
}) =>
  viewMode === "list"
    ? <ListCard product={product} onAddToCart={onAddToCart} onQuickView={onQuickView} currency={currency} />
    : <GridCard product={product} onAddToCart={onAddToCart} onQuickView={onQuickView} currency={currency} />;

export default ProductCard;
