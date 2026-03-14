// ─────────────────────────────────────────────────────────────
//  SearchResultsPage — displays products matching a search query
//
//  Layout:
//    xs/sm  — top filter bar (mobile drawer) + full-width grid
//    md+    — left filter sidebar + right product grid
//
//  Features:
//    • Live sort (relevance / price / rating / newest)
//    • Filter by category, price range, rating, brand
//    • Active filter chips with remove
//    • URL-style breadcrumb
//    • Skeleton loading state
//    • Empty state with suggestions
// ─────────────────────────────────────────────────────────────
import React, { useState, useMemo } from "react";
import { Box, Container, Grid, Breadcrumbs, Link, Typography, Drawer, IconButton, Badge, Skeleton } from "@mui/material";
import NavigateNextIcon   from "@mui/icons-material/NavigateNext";
import TuneIcon           from "@mui/icons-material/Tune";
import CloseIcon          from "@mui/icons-material/Close";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../theme/theme";
import Navbar              from "../../components/layout/Navbar/Navbar";
import Footer              from "../../components/layout/Footer/Footer";
import ProductCard, { ProductCardGrid } from "../../components/common/ProductCard/ProductCard";
import SearchHeader        from "./SearchHeader/SearchHeader";
import SearchFilters       from "./SearchFilters/SearchFilters";
import SearchEmpty         from "./SearchEmpty/SearchEmpty";
import { STORE_CURRENCY }  from "../../config/store/storeConfig";

// ── Loading skeleton ──────────────────────────────────────────
const SearchSkeleton = () => (
  <Grid container spacing={2}>
    {Array.from({length:8}).map((_,i)=>(
      <Grid item xs={6} sm={6} md={4} lg={3} key={i}>
        <Skeleton variant="rectangular" sx={{ aspectRatio:"3/4", borderRadius:BRAND.radiusCard, mb:1 }} />
        <Skeleton variant="text" width="60%" height={14} />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="40%" height={18} />
      </Grid>
    ))}
  </Grid>
);

// ── Filter active count ───────────────────────────────────────
const countActiveFilters = (f) => {
  let n = 0;
  if (f.categories?.length) n += f.categories.length;
  if (f.brands?.length)     n += f.brands.length;
  if (f.minRating)          n += 1;
  return n;
};

const SearchResultsPage = ({
  query           = "",
  products        = [],
  loading         = false,
  filters         = {},
  suggestions     = [],
  navbar          = {},
  footer          = {},
  onAddToCart,
  onProductClick,
  onQueryChange,
}) => {
  const theme = useTheme();
  const [sort,          setSort]          = useState("relevance");
  const [activeFilters, setActiveFilters] = useState({ categories:[], brands:[], priceRange: filters.priceRange ?? [0,50000], minRating:0 });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleReset = () => setActiveFilters({ categories:[], brands:[], priceRange: filters.priceRange ?? [0,50000], minRating:0 });

  // Active filter chips
  const activeChips = useMemo(() => [
    ...activeFilters.categories.map(c=>`Category: ${c}`),
    ...activeFilters.brands.map(b=>`Brand: ${b}`),
    ...(activeFilters.minRating ? [`Rating: ${activeFilters.minRating}★ & up`] : []),
  ], [activeFilters]);

  const handleRemoveChip = (chip) => {
    if (chip.startsWith("Category: ")) setActiveFilters(f=>({ ...f, categories:f.categories.filter(c=>`Category: ${c}`!==chip) }));
    if (chip.startsWith("Brand: "))    setActiveFilters(f=>({ ...f, brands:f.brands.filter(b=>`Brand: ${b}`!==chip) }));
    if (chip.startsWith("Rating: "))   setActiveFilters(f=>({ ...f, minRating:0 }));
  };

  // Filter + sort
  const displayProducts = useMemo(() => {
    let list = [...products];
    if (activeFilters.categories.length) list = list.filter(p=>activeFilters.categories.includes(p.category));
    if (activeFilters.brands.length)     list = list.filter(p=>activeFilters.brands.includes(p.brand));
    if (activeFilters.minRating)         list = list.filter(p=>(p.rating??0) >= activeFilters.minRating);
    const [lo, hi] = activeFilters.priceRange;
    list = list.filter(p => p.price >= lo && p.price <= hi);

    if (sort === "price_asc")  list.sort((a,b)=>a.price-b.price);
    if (sort === "price_desc") list.sort((a,b)=>b.price-a.price);
    if (sort === "rating")     list.sort((a,b)=>(b.rating??0)-(a.rating??0));
    if (sort === "newest")     list.sort((a,b)=>(b.id??0)-(a.id??0));
    return list;
  }, [products, activeFilters, sort]);

  const filterCount = countActiveFilters(activeFilters);

  return (
    <Box sx={{ backgroundColor:theme.palette.background.default, minHeight:"100vh" }}>
      <Navbar {...navbar} />

      <Container maxWidth="xl" sx={{ pt:{ xs:2.5, md:4 }, pb:{ xs:6, md:8 } }}>

        {/* Breadcrumbs */}
        <Box sx={{ display:{ xs:"none", sm:"block" }, mb:2.5 }}>
          <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize:13 }} />}>
            <Link href="#" underline="hover" sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>Home</Link>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:600, color:theme.palette.text.primary }}>
              {query ? `"${query}"` : "Search"}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Mobile filter button */}
        <Box sx={{ display:{ xs:"flex", md:"none" }, justifyContent:"flex-end", mb:1.5 }}>
          <Box onClick={()=>setMobileFiltersOpen(true)}
            sx={{ display:"flex", alignItems:"center", gap:0.75, px:1.5, py:0.9, border:`1px solid ${theme.palette.divider}`, borderRadius:BRAND.radiusButton, bgcolor:theme.palette.background.paper, cursor:"pointer" }}>
            <Badge badgeContent={filterCount||null} color="secondary">
              <TuneIcon sx={{ fontSize:18, color:theme.palette.text.secondary }} />
            </Badge>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:600, fontSize:BRAND.sizeXs }}>Filters</Typography>
          </Box>
        </Box>

        <Grid container spacing={{ xs:0, md:3 }}>

          {/* Sidebar (md+) */}
          <Grid item md={3} lg={2.5} sx={{ display:{ xs:"none", md:"block" } }}>
            <Box sx={{ position:"sticky", top:"88px" }}>
              <SearchFilters
                filters={filters}
                activeFilters={activeFilters}
                onFiltersChange={setActiveFilters}
                onReset={handleReset}
              />
            </Box>
          </Grid>

          {/* Results */}
          <Grid item xs={12} md={9} lg={9.5}>
            <SearchHeader
              query={query}
              totalResults={displayProducts.length}
              sort={sort}
              onSortChange={setSort}
              filters={activeChips}
              onRemoveFilter={handleRemoveChip}
              sx={{ mb:{ xs:2, md:2.5 } }}
            />

            {loading ? (
              <SearchSkeleton />
            ) : displayProducts.length === 0 ? (
              <SearchEmpty
                query={query}
                suggestions={suggestions}
                onClearSearch={q=>{ handleReset(); onQueryChange?.(q); }}
              />
            ) : (
              <ProductCardGrid>
                {displayProducts.map((p, i) => (
                  <ProductCard
                    key={p.id ?? i}
                    product={p}
                    currency={STORE_CURRENCY}
                    onAddToCart={onAddToCart}
                    onQuickView={onProductClick}
                  />
                ))}
              </ProductCardGrid>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile filter drawer */}
      <Drawer anchor="left" open={mobileFiltersOpen} onClose={()=>setMobileFiltersOpen(false)}
        PaperProps={{ sx:{ width:300, p:2, bgcolor:theme.palette.background.default } }}>
        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:2 }}>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm }}>Filters</Typography>
          <IconButton size="small" onClick={()=>setMobileFiltersOpen(false)}>
            <CloseIcon sx={{ fontSize:20 }} />
          </IconButton>
        </Box>
        <SearchFilters
          filters={filters}
          activeFilters={activeFilters}
          onFiltersChange={(f)=>{ setActiveFilters(f); }}
          onReset={handleReset}
        />
      </Drawer>

      <Footer {...footer} />
    </Box>
  );
};

export default SearchResultsPage;
