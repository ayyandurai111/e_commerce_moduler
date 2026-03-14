// ─────────────────────────────────────────────────────────────
//  HomeConnector.jsx
//  Owns all data + callbacks for the HomePage.
//  ➜ Edit fixture data here to customise the storefront.
// ─────────────────────────────────────────────────────────────
import React        from "react";
import { useNavigate } from "react-router-dom";
import HomePage     from "../../pages/Home/HomePage";
import navbarProps  from "./shared/navbarProps";
import footerProps  from "./shared/footerProps";
import storeConfig  from "../store/storeConfig";

// ── Fixture: hero banner ──────────────────────────────────────
const hero = {
  headline: "Luxury Redefined.",
  subline:  `${storeConfig.description}`,
  cta:      "Shop Now",
  badge:    "New Season Arrivals",
  image:    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop", // Add your image URL here
};

// ── Fixture: categories ───────────────────────────────────────
const categories = [
  { id: "fashion",     label: "Fashion",     emoji: "👗" },
  { id: "watches",     label: "Watches",     emoji: "⌚" },
  { id: "beauty",      label: "Beauty",      emoji: "✨" },
  { id: "accessories", label: "Accessories", emoji: "💼", badge: "NEW" },
  { id: "footwear",    label: "Footwear",    emoji: "👠" },
  { id: "home",        label: "Home Décor",  emoji: "🏡" },
];

// ── Fixture: featured products ────────────────────────────────
const featuredProducts = [
  { id: 1, name: "Silk Evening Gown",      brand: "LUXE", price: 45000, originalPrice: 62000, rating: 4.8, reviewCount: 38, badge: "BESTSELLER", stock: 5,  currency: storeConfig.currency },
  { id: 2, name: "Tailored Wool Blazer",   brand: "MAISON", price: 38900, originalPrice: 52000, rating: 4.9, reviewCount: 64, badge: null,         stock: 6,  currency: storeConfig.currency },
  { id: 3, name: "Cashmere Roll-Neck",     brand: "NÓRD",  price: 19500, originalPrice: 24000, rating: 4.7, reviewCount: 41, badge: "SALE",        stock: 12, currency: storeConfig.currency },
  { id: 4, name: "Leather Crossbody Bag",  brand: "BELVÈT",price: 28000, originalPrice: null,  rating: 4.6, reviewCount: 22, badge: "NEW",         stock: 9,  currency: storeConfig.currency },
];

// ── Fixture: trending products ────────────────────────────────
const trendingProducts = [
  { id: 5, name: "Oval Sunglasses",         brand: "EYRA",   price: 12500, originalPrice: 16000, rating: 4.5, reviewCount: 55, badge: "HOT",  stock: 20, currency: storeConfig.currency },
  { id: 6, name: "Gold Cuff Bracelet",      brand: "AURUM",  price: 8900,  originalPrice: null,  rating: 4.4, reviewCount: 18, badge: null,   stock: 30, currency: storeConfig.currency },
  { id: 7, name: "Scented Candle Set",      brand: "LUMIA",  price: 4500,  originalPrice: 5500,  rating: 4.6, reviewCount: 71, badge: "SALE", stock: 50, currency: storeConfig.currency },
  { id: 8, name: "Leather Derby Shoes",     brand: "KRAFT",  price: 22000, originalPrice: null,  rating: 4.7, reviewCount: 33, badge: "NEW",  stock: 7,  currency: storeConfig.currency },
];

// ── Fixture: promo banner ─────────────────────────────────────
const promoBanner = {
  eyebrow:  "Limited Time",
  headline: "Up to 40% Off — End of Season Sale",
  subline:  "Luxury doesn't have to cost a fortune. Shop handpicked deals before they're gone.",
  cta:      "Grab the Deals",
};

// ── Connector ─────────────────────────────────────────────────
const HomeConnector = () => {
  const navigate = useNavigate();

  return (
    <HomePage
      /* layout */
      navbar={{
        ...navbarProps,
        onCartClick:     () => navigate("/cart"),
        onWishlistClick: () => navigate("/wishlist"),
        onAccountClick:  () => navigate("/login"),
        onSearch:        (q) => navigate(`/search?q=${encodeURIComponent(q)}`),
      }}
      footer={footerProps}

      /* hero */
      hero={hero}

      /* categories */
      categories={categories}

      /* products */
      featuredProducts={featuredProducts}
      trendingProducts={trendingProducts}
      productsLoading={false}

      /* promo */
      promoBanner={{ ...promoBanner, onClick: () => navigate("/products") }}

      /* callbacks */
      onShopNow={()              => navigate("/products")}
      onCategoryClick={(cat)     => navigate(cat ? `/products?category=${cat.id}` : "/products")}
      onProductClick={(p)        => navigate(`/products/${p?.slug ?? p?.id ?? "demo"}`)}
      onAddToCart={(p)           => { console.log("Home → cart:", p?.name); navigate("/cart"); }}
      onNewsletterSubmit={(email)=> console.log("Newsletter signup:", email)}
    />
  );
};

export default HomeConnector;
