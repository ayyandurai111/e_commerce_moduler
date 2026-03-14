// ─────────────────────────────────────────────────────────────
//  WishlistPage — Save products for later purchase
//
//  Features:
//    • Responsive grid (2 → 3 → 4 columns)
//    • Remove single item / clear all
//    • Add to cart directly from wishlist
//    • Sort by: date added / price / name
//    • Empty state with CTA
// ─────────────────────────────────────────────────────────────
import React, { useState, useMemo } from "react";
import { Box, Container, Typography, Breadcrumbs, Link, Select, MenuItem, Snackbar, Alert, Button as MuiButton, Divider } from "@mui/material";
import NavigateNextIcon  from "@mui/icons-material/NavigateNext";
import SortIcon          from "@mui/icons-material/Sort";
import DeleteSweepIcon   from "@mui/icons-material/DeleteSweep";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../theme/theme";
import Navbar              from "../../components/layout/Navbar/Navbar";
import Footer              from "../../components/layout/Footer/Footer";
import WishlistGrid        from "./WishlistGrid/WishlistGrid";
import WishlistEmpty       from "./WishlistEmpty/WishlistEmpty";

const SORT_OPTIONS = [
  { value:"added",     label:"Date Added"      },
  { value:"price_asc", label:"Price: Low–High" },
  { value:"price_desc",label:"Price: High–Low" },
  { value:"name",      label:"Name (A–Z)"      },
];

const WishlistPage = ({
  initialItems   = [],
  navbar         = {},
  footer         = {},
  onAddToCart,
  onProductClick,
  onShopNow,
}) => {
  const theme  = useTheme();
  const [items,   setItems]   = useState(initialItems);
  const [sort,    setSort]    = useState("added");
  const [snack,   setSnack]   = useState({ open:false, msg:"" });

  const handleRemove = (id) => {
    setItems(prev => prev.filter(p => p.id !== id));
    setSnack({ open:true, msg:"Removed from wishlist" });
  };

  const handleClearAll = () => {
    setItems([]);
    setSnack({ open:true, msg:"Wishlist cleared" });
  };

  const handleAddToCart = async (product) => {
    await onAddToCart?.(product);
    setSnack({ open:true, msg:`${product.name} added to cart!` });
  };

  const sorted = useMemo(() => {
    const list = [...items];
    if (sort === "price_asc")  return list.sort((a,b) => a.price - b.price);
    if (sort === "price_desc") return list.sort((a,b) => b.price - a.price);
    if (sort === "name")       return list.sort((a,b) => a.name.localeCompare(b.name));
    return list; // date added — preserve insertion order
  }, [items, sort]);

  return (
    <Box sx={{ backgroundColor:theme.palette.background.default, minHeight:"100vh" }}>
      <Navbar {...navbar} wishlistCount={items.length} />

      <Container maxWidth="xl" sx={{ pt:{ xs:2.5, md:4 }, pb:{ xs:6, md:8 } }}>

        {/* Breadcrumbs */}
        <Box sx={{ display:{ xs:"none", sm:"block" }, mb:2.5 }}>
          <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize:13 }} />}>
            <Link href="#" underline="hover" sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>Home</Link>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:600, color:theme.palette.text.primary }}>Wishlist</Typography>
          </Breadcrumbs>
        </Box>

        {/* Page header */}
        <Box sx={{ display:"flex", alignItems:{ xs:"flex-start", sm:"center" }, justifyContent:"space-between", flexDirection:{ xs:"column", sm:"row" }, gap:1.5, mb:{ xs:2.5, md:3.5 } }}>
          <Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:theme.palette.secondary.main, mb:0.5 }}>
              My Account
            </Typography>
            <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:{ xs:"1.6rem", md:"2.25rem" }, color:theme.palette.text.primary, lineHeight:1.15 }}>
              Wishlist
              {items.length > 0 && (
                <Box component="span" sx={{ fontFamily:BRAND.fontBody, fontWeight:400, fontSize:{ xs:"1rem", md:"1.25rem" }, color:theme.palette.text.secondary, ml:1.5 }}>
                  ({items.length} {items.length === 1 ? "item" : "items"})
                </Box>
              )}
            </Typography>
          </Box>

          {items.length > 0 && (
            <Box sx={{ display:"flex", alignItems:"center", gap:1.5 }}>
              {/* Sort */}
              <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
                <SortIcon sx={{ fontSize:18, color:theme.palette.text.secondary }} />
                <Select
                  value={sort}
                  onChange={e=>setSort(e.target.value)}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs,
                    "& .MuiOutlinedInput-notchedOutline":{ borderColor:theme.palette.divider },
                    "& .MuiSelect-select":{ py:0.9, pr:"28px !important" },
                  }}
                >
                  {SORT_OPTIONS.map(o=>(
                    <MenuItem key={o.value} value={o.value} sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs }}>
                      {o.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Divider orientation="vertical" flexItem />

              {/* Clear all */}
              <MuiButton
                startIcon={<DeleteSweepIcon />}
                size="small"
                onClick={handleClearAll}
                sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.error.main, textTransform:"none", fontWeight:600, "&:hover":{ bgcolor:alpha(theme.palette.error.main,0.06) } }}
              >
                Clear All
              </MuiButton>
            </Box>
          )}
        </Box>

        {/* Content */}
        {items.length === 0 ? (
          <WishlistEmpty onShopNow={onShopNow} />
        ) : (
          <WishlistGrid
            products={sorted}
            onRemove={handleRemove}
            onAddToCart={handleAddToCart}
            onProductClick={onProductClick}
          />
        )}
      </Container>

      <Footer {...footer} />

      <Snackbar open={snack.open} autoHideDuration={2500} onClose={()=>setSnack(s=>({...s,open:false}))} anchorOrigin={{ vertical:"bottom", horizontal:"center" }}>
        <Alert severity="success" variant="filled" onClose={()=>setSnack(s=>({...s,open:false}))} sx={{ width:"100%", fontFamily:BRAND.fontBody }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WishlistPage;
