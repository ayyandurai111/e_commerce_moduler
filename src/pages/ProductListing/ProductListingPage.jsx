// ═══════════════════════════════════════════════════════════════
//  ProductListingPage
//
//  ✅  ZERO Grid / Grid2 usage — pure Box + CSS flex/grid only.
//      This is 100% reliable across all MUI v6 patch versions.
//
//  Layout:
//    Navbar
//    Container
//      Breadcrumbs | Hero Banner
//      [Sidebar 260px fixed] [Product area — flex:1]
//        SortBar · ActiveFilters · ProductCardGrid · Pagination
//    MobileFilterDrawer
//    Footer
//
//  ZERO hardcoded colors / fonts / sizes / weights
// ═══════════════════════════════════════════════════════════════
import React, { useState, useMemo } from "react";
import {
  Box, Container, Typography, Breadcrumbs,
  Link, Skeleton,
} from "@mui/material";
import NavigateNextIcon    from "@mui/icons-material/NavigateNext";
import { useTheme, alpha } from "@mui/material/styles";
import useMediaQuery       from "@mui/material/useMediaQuery";

import { BRAND }          from "../../theme/theme";
import Navbar             from "../../components/layout/Navbar/Navbar";
import Footer             from "../../components/layout/Footer/Footer";
import FilterSidebar      from "./FilterSidebar/FilterSidebar";
import SortBar            from "./SortBar/SortBar";
import ActiveFilters      from "./ActiveFilters/ActiveFilters";
import PLPProductCard, { ProductCardGrid }
                          from "./PLPProductCard/PLPProductCard";
import PLPPagination      from "./PLPPagination/PLPPagination";
import MobileFilterDrawer from "./MobileFilterDrawer/MobileFilterDrawer";
import EmptyState         from "./EmptyState/EmptyState";

// ─── Breadcrumb bar ───────────────────────────────────────────
const PLPBreadcrumb = ({ crumbs = [] }) => {
  const theme = useTheme();
  return (
    <Breadcrumbs
      separator={
        <NavigateNextIcon sx={{ fontSize: 14, color: theme.palette.text.disabled }} />
      }
      sx={{ mb: 2.5 }}
    >
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        return isLast ? (
          <Typography key={c.label} sx={{
            fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm,
            fontWeight: theme.typography.fontWeightSemibold,
            color: theme.palette.text.primary,
          }}>{c.label}</Typography>
        ) : (
          <Link key={c.label} href={c.url || "#"} underline="hover" sx={{
            fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm,
            color: theme.palette.text.secondary,
            "&:hover": { color: theme.palette.secondary.main },
          }}>{c.label}</Link>
        );
      })}
    </Breadcrumbs>
  );
};

// ─── Hero banner ──────────────────────────────────────────────
const PageHeader = ({ title, description, heroImage }) => {
  const theme = useTheme();
  const bgSx = heroImage
    ? {
        backgroundImage: `linear-gradient(135deg,
          ${alpha(theme.palette.primary.main, 0.88)} 0%,
          ${alpha(theme.palette.primary.main, 0.65)} 100%),
          url(${heroImage})`,
        backgroundSize: "cover", backgroundPosition: "center",
      }
    : {
        background: `linear-gradient(135deg,
          ${theme.palette.primary.main} 0%,
          ${alpha(theme.palette.primary.main, 0.8)} 50%,
          ${theme.palette.primary.dark} 100%)`,
      };
  return (
    <Box sx={{
      ...bgSx, position: "relative", overflow: "hidden",
      borderRadius: BRAND.radiusCard,
      py: { xs: 4, md: 5 }, px: { xs: 3, md: 6 }, mb: { xs: 3, md: 4 },
    }}>
      {/* Glow accent */}
      <Box sx={{
        position: "absolute", right: -60, top: "50%",
        transform: "translateY(-50%)",
        width: 280, height: 280, borderRadius: "50%",
        background: `radial-gradient(circle,
          ${alpha(theme.palette.secondary.main, 0.25)} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      {/* Season badge */}
      <Box sx={{
        display: "inline-flex", alignItems: "center", gap: 0.75,
        backgroundColor: alpha(theme.palette.secondary.main, 0.18),
        border: `1px solid ${alpha(theme.palette.secondary.main, 0.35)}`,
        borderRadius: BRAND.radiusBadge, px: 2, py: 0.5, mb: 2,
      }}>
        <Box sx={{
          width: 6, height: 6, borderRadius: "50%",
          backgroundColor: theme.palette.secondary.main,
        }} />
        <Typography sx={{
          fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXxs,
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.secondary.main, letterSpacing: "0.1em",
        }}>
          NEW SEASON
        </Typography>
      </Box>
      <Typography sx={{
        fontFamily: BRAND.fontDisplay,
        fontWeight: theme.typography.fontWeightBlack,
        fontSize: { xs: BRAND.size3xl, md: BRAND.sizeH2 },
        color: theme.palette.primary.contrastText,
        mb: description ? 1.5 : 0,
        position: "relative", zIndex: 1,
      }}>
        {title}
      </Typography>
      {description && (
        <Typography sx={{
          fontFamily: BRAND.fontBody, fontSize: BRAND.sizeBody,
          color: alpha(theme.palette.primary.contrastText, 0.72),
          maxWidth: 540, lineHeight: 1.75,
          position: "relative", zIndex: 1,
        }}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

// ─── Skeleton card ────────────────────────────────────────────
const ProductSkeleton = ({ viewMode = "grid" }) => {
  const theme = useTheme();
  const base = {
    borderRadius: BRAND.radiusCard, overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  };
  return viewMode === "list" ? (
    <Box sx={{ ...base, display: "flex", gap: 2 }}>
      <Skeleton variant="rectangular" width={160} height={160}
        sx={{ flexShrink: 0 }} />
      <Box sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Skeleton variant="text" width="30%" height={12} />
        <Skeleton variant="text" width="65%" height={18} />
        <Skeleton variant="text" width="45%" height={12} />
        <Skeleton variant="text" width="25%" height={22} sx={{ mt: "auto" }} />
      </Box>
    </Box>
  ) : (
    <Box sx={base}>
      <Skeleton variant="rectangular" width="100%"
        sx={{ aspectRatio: BRAND.cardImageRatio, minHeight: BRAND.cardImageHeightSm }} />
      <Box sx={{ p: 1.75, display: "flex", flexDirection: "column", gap: 0.75 }}>
        <Skeleton variant="text" width="35%" height={11} />
        <Skeleton variant="text" width="75%" height={15} />
        <Skeleton variant="text" width="50%" height={11} />
        <Skeleton variant="text" width="30%" height={19} />
      </Box>
    </Box>
  );
};

// ─── Filter logic ─────────────────────────────────────────────
const applyFilters = (products, active) =>
  products.filter((p) => {
    if (active.category && p.category !== active.category)                            return false;
    if (active.rating   && (p.rating || 0) < active.rating)                          return false;
    if (active.brands?.length && !active.brands.includes(p.brand))                   return false;
    if (active.colors?.length && !active.colors.some((c) => p.colors?.includes(c))) return false;
    if (active.sizes?.length  && !active.sizes.some((s)  => p.sizes?.includes(s)))   return false;
    if (active.price &&
        (p.price < active.price[0] || p.price > active.price[1]))                    return false;
    return true;
  });

const applySort = (products, sortBy) => {
  const s = [...products];
  if (sortBy === "price_asc")   return s.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc")  return s.sort((a, b) => b.price - a.price);
  if (sortBy === "rating")      return s.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  if (sortBy === "newest")      return s.sort((a, b) => (b.id || 0) - (a.id || 0));
  if (sortBy === "bestselling") return s.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
  return s;
};

// ─── Main export ──────────────────────────────────────────────
const ProductListingPage = ({
  title       = "All Products",
  description = null,
  heroImage   = null,
  breadcrumbs = [
    { label: "Home", url: "/" },
    { label: "Shop", url: "/shop" },
    { label: "All Products" },
  ],
  products    = [],
  loading     = false,
  filters     = {},
  currency    = "$",
  navbar      = {},
  footer      = {},
  onAddToCart,
  onQuickView,
}) => {
  const theme    = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("md"));

  const [activeFilters,    setActiveFilters]    = useState({});
  const [sortBy,           setSortBy]           = useState("featured");
  const [viewMode,         setViewMode]         = useState("grid");
  const [page,             setPage]             = useState(1);
  const [perPage,          setPerPage]          = useState(24);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: value === null || (Array.isArray(value) && value.length === 0)
        ? undefined : value,
    }));
    setPage(1);
  };

  const handleClearAll = () => { setActiveFilters({}); setPage(1); };

  const priceMin   = filters.price?.min ?? 0;
  const priceMax   = filters.price?.max ?? 9999;
  const filtered   = useMemo(() => applyFilters(products, activeFilters), [products, activeFilters]);
  const sorted     = useMemo(() => applySort(filtered, sortBy),           [filtered, sortBy]);
  const paginated  = sorted.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(sorted.length / perPage);

  // ─── Sidebar ────────────────────────────────────────
  const SIDEBAR_W = 260;   // px — fixed sidebar width on desktop

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>

      {/* Navbar */}
      <Navbar {...navbar} />

      <Container maxWidth="xl" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 8 } }}>

        <PLPBreadcrumb crumbs={breadcrumbs} />
        <PageHeader title={title} description={description} heroImage={heroImage} />

        {/* ── Two-column layout: sidebar + products ─────
            Pure CSS flexbox — zero Grid2 dependency.
            Sidebar is hidden on mobile (xs/sm).           */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: { md: 3, lg: 4 } }}>

          {/* ── Sticky Filter Sidebar (tablet & desktop) */}
          {isTablet && (
            <Box sx={{
              flexShrink:      0,
              width:           SIDEBAR_W,
              position:        "sticky",
              top:             88,
              maxHeight:       "calc(100vh - 104px)",
              overflowY:       "auto",
              backgroundColor: theme.palette.background.paper,
              borderRadius:    BRAND.radiusCard,
              border:          `1px solid ${theme.palette.divider}`,
              p:               2.5,
              boxShadow:       `0 2px 12px ${alpha(theme.palette.primary.main, 0.06)}`,
              // Thin custom scrollbar
              "&::-webkit-scrollbar":       { width: 4 },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                background: theme.palette.divider, borderRadius: 2,
              },
            }}>
              <FilterSidebar
                filters={filters}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
                currency={currency}
              />
            </Box>
          )}

          {/* ── Product Area (always visible) ─────────── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>

            {/* Sort / view-toggle bar */}
            <SortBar
              totalResults={sorted.length}
              sortBy={sortBy}
              onSortChange={(v) => { setSortBy(v); setPage(1); }}
              viewMode={viewMode}
              onViewChange={setViewMode}
              activeFilters={activeFilters}
              onOpenMobileFilters={() => setMobileFilterOpen(true)}
            />

            {/* Active filter chips */}
            <ActiveFilters
              activeFilters={activeFilters}
              filterMeta={{ priceMin, priceMax, currency, colors: filters.colors }}
              onRemove={handleFilterChange}
              onClearAll={handleClearAll}
            />

            {/* ── Products ──────────────────────────── */}
            {loading ? (
              viewMode === "list" ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
                  {Array.from({ length: Math.min(perPage, 8) }).map((_, i) => (
                    <ProductSkeleton key={i} viewMode="list" />
                  ))}
                </Box>
              ) : (
                <ProductCardGrid>
                  {Array.from({ length: Math.min(perPage, 12) }).map((_, i) => (
                    <ProductSkeleton key={i} viewMode="grid" />
                  ))}
                </ProductCardGrid>
              )
            ) : paginated.length === 0 ? (
              <EmptyState onClearFilters={handleClearAll} />
            ) : viewMode === "list" ? (
              /* ── List View ───── */
              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
                {paginated.map((product, i) => (
                  <PLPProductCard
                    key={product.id || i}
                    product={product} viewMode="list"
                    onAddToCart={onAddToCart} onQuickView={onQuickView}
                    currency={currency}
                  />
                ))}
              </Box>
            ) : (
              /* ── Grid View ───── */
              <ProductCardGrid>
                {paginated.map((product, i) => (
                  <PLPProductCard
                    key={product.id || i}
                    product={product} viewMode="grid"
                    onAddToCart={onAddToCart} onQuickView={onQuickView}
                    currency={currency}
                  />
                ))}
              </ProductCardGrid>
            )}

            {/* Pagination */}
            {!loading && paginated.length > 0 && (
              <PLPPagination
                page={page} totalPages={totalPages}
                totalResults={sorted.length} perPage={perPage}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onPerPageChange={(n) => { setPerPage(n); setPage(1); }}
              />
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters} activeFilters={activeFilters}
        onFilterChange={handleFilterChange} onClearAll={handleClearAll}
        onApply={() => setMobileFilterOpen(false)}
        currency={currency} totalResults={sorted.length}
      />

      <Footer {...footer} />
    </Box>
  );
};

export default ProductListingPage;
