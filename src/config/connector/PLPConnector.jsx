// ─────────────────────────────────────────────────────────────
//  PLPConnector.jsx
//  Owns all data + callbacks for the Product Listing Page.
// ─────────────────────────────────────────────────────────────
import React from "react";
import { useNavigate } from "react-router-dom";
import ProductListingPage from "../../pages/ProductListing/ProductListingPage";
import navbarProps from "./shared/navbarProps";
import footerProps from "./shared/footerProps";
import storeConfig from "../store/storeConfig";

// ── Fixture: PLP Products ─────────────────────────────────────
const products = [
  { id: 1, name: "Silk Evening Gown", brand: "LUXE", price: 45000, originalPrice: 62000, rating: 4.8, reviewCount: 38, category: "Fashion", badge: "BESTSELLER", stock: 5 },
  { id: 2, name: "Tailored Wool Blazer", brand: "MAISON", price: 38900, originalPrice: 52000, rating: 4.9, reviewCount: 64, category: "Fashion", badge: null, stock: 6 },
  { id: 3, name: "Cashmere Roll-Neck", brand: "NÓRD", price: 19500, originalPrice: 24000, rating: 4.7, reviewCount: 41, category: "Fashion", badge: "SALE", stock: 12 },
  { id: 4, name: "Leather Crossbody Bag", brand: "BELVÈT", price: 28000, originalPrice: null, rating: 4.6, reviewCount: 22, category: "Accessories", badge: "NEW", stock: 9 },
  { id: 5, name: "Oval Sunglasses", brand: "EYRA", price: 12500, originalPrice: 16000, rating: 4.5, reviewCount: 55, category: "Accessories", badge: "HOT", stock: 20 },
  { id: 6, name: "Gold Cuff Bracelet", brand: "AURUM", price: 8900, originalPrice: null, rating: 4.4, reviewCount: 18, category: "Accessories", badge: null, stock: 30 },
  { id: 7, name: "Scented Candle Set", brand: "LUMIA", price: 4500, originalPrice: 5500, rating: 4.6, reviewCount: 71, category: "Home Décor", badge: "SALE", stock: 50 },
  { id: 8, name: "Leather Derby Shoes", brand: "KRAFT", price: 22000, originalPrice: null, rating: 4.7, reviewCount: 33, category: "Footwear", badge: "NEW", stock: 7 },
  { id: 9, name: "Chronograph Watch", brand: "TEMPUS", price: 85000, originalPrice: 95000, rating: 4.9, reviewCount: 12, category: "Watches", badge: "LIMITED", stock: 3 },
  { id: 10, name: "Minimalist Wall Clock", brand: "LUMIA", price: 6500, originalPrice: 8000, rating: 4.3, reviewCount: 44, category: "Home Décor", badge: null, stock: 15 },
  { id: 11, name: "Hydrating Face Serum", brand: "GLOW", price: 5200, originalPrice: null, rating: 4.8, reviewCount: 89, category: "Beauty", badge: "BESTSELLER", stock: 40 },
  { id: 12, name: "Suede Ankle Boots", brand: "KRAFT", price: 18500, originalPrice: 21000, rating: 4.5, reviewCount: 27, category: "Footwear", badge: null, stock: 11 },
];

// ── Extract filters dynamically from products ─────────────────
const extractFilters = (prods) => {
  const categories = [...new Set(prods.map(p => p.category).filter(Boolean))].sort();
  const brands = [...new Set(prods.map(p => p.brand).filter(Boolean))].sort();
  const maxPrice = Math.max(...prods.map(p => p.price));
  return {
    categories,
    brands,
    priceRange: [0, Math.ceil(maxPrice / 1000) * 1000], // Round up to nearest thousand
  };
};

// ── Connector ─────────────────────────────────────────────────
const PLPConnector = () => {
  const navigate = useNavigate();
  const defaultFilters = extractFilters(products);

  return (
    <ProductListingPage
      /* title */
      title="All Collections"

      /* layout */
      navbar={{
        ...navbarProps,
        onCartClick: () => navigate("/cart"),
        onWishlistClick: () => navigate("/wishlist"),
        onAccountClick: () => navigate("/login"),
        onSearch: (q) => navigate(`/search?q=${encodeURIComponent(q)}`),
      }}
      footer={footerProps}
      currency={storeConfig.currency}

      /* products & filtering */
      products={products}
      filters={defaultFilters}
      loading={false}

      /* callbacks */
      onProductClick={(p) => navigate(`/products/${p?.slug ?? p?.id ?? "demo"}`)}
      onAddToCart={(p) => { console.log("PLP → cart:", p?.name); navigate("/cart"); }}
      onContinueShopping={() => navigate("/")}
    />
  );
};

export default PLPConnector;
