// ─────────────────────────────────────────────────────────────
//  ProductDetailPage — top-level PDP orchestrator
//
//  Layout:
//    xs / sm  — single column (gallery → info → purchase → tabs → related)
//    md+      — two-column (gallery left  |  info + purchase right)
//               sticky right panel on lg+
//
//  Responsive breakpoints:
//    xs   0–480px    mobile
//    sm   480–768px  large phone
//    md   768–1024px tablet
//    lg   1024px+    laptop / desktop
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import { useTheme }             from "@mui/material/styles";
import { BRAND }                from "../../theme/theme";
import Navbar                   from "../../components/layout/Navbar/Navbar";
import Footer                   from "../../components/layout/Footer/Footer";
import ProductBreadcrumbs       from "./Breadcrumbs/ProductBreadcrumbs";
import ProductGallery           from "./ProductGallery/ProductGallery";
import ProductInfo              from "./ProductInfo/ProductInfo";
import PurchasePanel            from "./PurchasePanel/PurchasePanel";
import ProductTabs              from "./ProductTabs/ProductTabs";
import RelatedProducts          from "./RelatedProducts/RelatedProducts";

// ── Skeleton shimmer while loading ───────────────────────────
const PDPSkeleton = () => (
  <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
    <Grid container spacing={{ xs: 2, md: 4 }}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rectangular" sx={{ width:"100%", aspectRatio:"1/1", borderRadius:BRAND.radiusCard }} />
        <Box sx={{ display:"flex", gap:1, mt:1 }}>
          {[0,1,2,3].map(i=><Skeleton key={i} variant="rectangular" width={72} height={72} sx={{ borderRadius:BRAND.radiusButton }} />)}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton variant="text" width="40%" height={16} sx={{ mb:1 }} />
        <Skeleton variant="text" width="80%" height={42} />
        <Skeleton variant="text" width="60%" height={32} sx={{ mb:2 }} />
        <Skeleton variant="rectangular" height={52} sx={{ borderRadius:BRAND.radiusCard, mb:1.5 }} />
        <Skeleton variant="rectangular" height={52} sx={{ borderRadius:BRAND.radiusCard, mb:1.5 }} />
        <Skeleton variant="rectangular" height={120} sx={{ borderRadius:BRAND.radiusCard }} />
      </Grid>
    </Grid>
  </Container>
);

// ── Main page component ───────────────────────────────────────
const ProductDetailPage = ({
  product,
  loading       = false,
  navbar        = {},
  footer        = {},
  onAddToCart,
  onBuyNow,
  onRelatedClick,
}) => {
  const theme = useTheme();

  // Derive breadcrumb trail from product data
  const breadcrumbs = [
    { label: "Home",    href: "/" },
    ...(product?.categoryPath ?? []),
    { label: product?.name ?? "Product" },
  ];

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>

      {/* ── Navbar ─────────────────────────────────────── */}
      <Navbar {...navbar} />

      {loading ? <PDPSkeleton /> : (
        <>
          {/* ── Breadcrumbs ─────────────────────────────── */}
          <Container maxWidth="xl" sx={{ pt: { xs: 1.5, sm: 2.5 } }}>
            <ProductBreadcrumbs crumbs={breadcrumbs} />
          </Container>

          {/* ── Main two-column grid ─────────────────────── */}
          <Container maxWidth="xl" sx={{ pt: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 4, md: 6 } }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}>

              {/* Left: Gallery */}
              <Grid item xs={12} md={6} lg={6}>
                <Box sx={{
                  // Sticky on md+ so panel scrolls alongside content
                  position: { md: "sticky" },
                  top: { md: "80px" },
                  alignSelf: "flex-start",
                }}>
                  <ProductGallery images={product?.images} alt={product?.name} />
                </Box>
              </Grid>

              {/* Right: Info + Purchase */}
              <Grid item xs={12} md={6} lg={6}>
                <Box sx={{ display:"flex", flexDirection:"column", gap:{ xs:2, md:2.5 } }}>
                  <ProductInfo product={product} />
                  <PurchasePanel
                    product={product}
                    onAddToCart={onAddToCart}
                    onBuyNow={onBuyNow}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>

          {/* ── Tabs (Description / Specs / Reviews) ────── */}
          <Container maxWidth="xl" sx={{ pb: { xs: 5, md: 7 } }}>
            <ProductTabs
              description={product?.description}
              specifications={product?.specifications}
              reviews={product?.reviews}
              rating={product?.rating}
              reviewCount={product?.reviewCount}
            />
          </Container>

          {/* ── Related products ─────────────────────────── */}
          {product?.relatedProducts?.length > 0 && (
            <Box sx={{
              bgcolor:    theme.palette.background.paper,
              borderTop: `1px solid ${theme.palette.divider}`,
              py:        { xs: 5, md: 8 },
            }}>
              <Container maxWidth="xl">
                <RelatedProducts
                  products={product.relatedProducts}
                  onProductClick={onRelatedClick}
                  onAddToCart={onAddToCart}
                  currency={product?.currency}
                />
              </Container>
            </Box>
          )}
        </>
      )}

      {/* ── Footer ─────────────────────────────────────── */}
      <Footer {...footer} />
    </Box>
  );
};
export default ProductDetailPage;
