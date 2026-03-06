// ============================================================
//  pages/HomePage.jsx — Master page composition
//
//  Each section is conditionally rendered based on:
//    - module.enabled flag
//    - presence of required data (graceful fallbacks)
//
//  Usage:
//    <HomePage
//      theme={myTheme}
//      navbar={{ enabled: true, storeName: "MY STORE", ... }}
//      hero={{ enabled: true, slides: [...], ... }}
//      categories={{ enabled: true, categories: [...] }}
//      featuredProducts={{ enabled: true, products: [...] }}
//      deals={{ enabled: true, deals: [...] }}
//      newsletter={{ enabled: true }}
//      footer={{ enabled: true, ... }}
//    />
// ============================================================
import React from "react";

// ── Sections ─────────────────────────────────────────────────
import Navbar            from "../components/home_page/Navbar";
import Hero              from "../components/home_page/Hero";
import CategoryGrid      from "../components/home_page/CategoryGrid";
import FeaturedProducts  from "../components/home_page/FeaturedProducts";
import Deals             from "../components/home_page/Deals";
import Newsletter        from "../components/home_page/Newsletter";
import Footer            from "../components/home_page/Footer";

// ── Default theme fallback ───────────────────────────────────
import defaultTheme from "../theme/theme";

/**
 * HomePage — full e-commerce home page composition
 *
 * @param {object}   props.theme             — design system (defaults to theme.js)
 * @param {object}   [props.navbar]          — Navbar props (+ enabled flag)
 * @param {object}   [props.hero]            — Hero props
 * @param {object}   [props.categories]      — CategoryGrid props
 * @param {object}   [props.featuredProducts] — FeaturedProducts props
 * @param {object}   [props.deals]           — Deals props
 * @param {object}   [props.newsletter]      — Newsletter props
 * @param {object}   [props.footer]          — Footer props
 */
const HomePage = ({
  theme = defaultTheme,

  // Each module defaults to enabled unless explicitly disabled
  navbar           = {},
  hero             = {},
  categories       = {},
  featuredProducts = {},
  deals            = {},
  newsletter       = {},
  footer           = {},
}) => {
  // Merge each module prop with enabled: true default
  const nav  = { enabled: true, ...navbar };
  const hs   = { enabled: true, ...hero };
  const cats = { enabled: true, ...categories };
  const fps  = { enabled: true, ...featuredProducts };
  const dls  = { enabled: true, ...deals };
  const nl   = { enabled: true, ...newsletter };
  const ftr  = { enabled: true, ...footer };

  // Global page wrapper
  const pageStyle = {
    fontFamily: theme?.typography?.fontBody ?? "sans-serif",
    background: theme?.colors?.background ?? "#f7f5f2",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  };

  // Global Google Fonts import
  const googleFontsUrl =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap";

  return (
    <>
      {/* ── Google Fonts ─────────────────────────────────── */}
      <style>{`
        @import url('${googleFontsUrl}');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        img  { display: block; max-width: 100%; }
        a    { text-decoration: none; }
        button { cursor: pointer; }
      `}</style>

      <div style={pageStyle}>

        {/* ── 1. Navbar ────────────────────────────────────── */}
        {nav.enabled && (
          <Navbar
            enabled={nav.enabled}
            storeName={nav.storeName}
            logoUrl={nav.logoUrl}
            links={nav.links}
            cartCount={nav.cartCount}
            wishlistCount={nav.wishlistCount}
            theme={theme}
          />
        )}

        {/* ── 2. Hero Banner ───────────────────────────────── */}
        {hs.enabled && hs.slides?.length > 0 && (
          <Hero
            enabled={hs.enabled}
            slides={hs.slides}
            autoPlay={hs.autoPlay}
            autoPlayInterval={hs.autoPlayInterval}
            ctaText={hs.ctaText}
            ctaLink={hs.ctaLink}
            ctaSecondaryText={hs.ctaSecondaryText}
            ctaSecondaryLink={hs.ctaSecondaryLink}
            theme={theme}
          />
        )}

        {/* ── 3. Category Grid ─────────────────────────────── */}
        {cats.enabled && cats.categories?.length > 0 && (
          <CategoryGrid
            enabled={cats.enabled}
            title={cats.title}
            subtitle={cats.subtitle}
            categories={cats.categories}
            theme={theme}
          />
        )}

        {/* ── 4. Featured Products ─────────────────────────── */}
        {fps.enabled && fps.products?.length > 0 && (
          <FeaturedProducts
            enabled={fps.enabled}
            title={fps.title}
            subtitle={fps.subtitle}
            filters={fps.filters}
            products={fps.products}
            onAddToCart={fps.onAddToCart}
            onAddToWishlist={fps.onAddToWishlist}
            theme={theme}
          />
        )}

        {/* ── 5. Deals of the Day ──────────────────────────── */}
        {dls.enabled && dls.deals?.length > 0 && (
          <Deals
            enabled={dls.enabled}
            title={dls.title}
            subtitle={dls.subtitle}
            deals={dls.deals}
            theme={theme}
          />
        )}

        {/* ── 6. Newsletter ────────────────────────────────── */}
        {nl.enabled && (
          <Newsletter
            enabled={nl.enabled}
            headline={nl.headline}
            subheadline={nl.subheadline}
            discount={nl.discount}
            placeholder={nl.placeholder}
            ctaText={nl.ctaText}
            benefits={nl.benefits}
            onSubscribe={nl.onSubscribe}
            theme={theme}
          />
        )}

        {/* ── 7. Footer ────────────────────────────────────── */}
        {ftr.enabled && (
          <Footer
            enabled={ftr.enabled}
            brand={ftr.brand}
            columns={ftr.columns}
            contact={ftr.contact}
            social={ftr.social}
            legal={ftr.legal}
            copyright={ftr.copyright}
            theme={theme}
          />
        )}

      </div>
    </>
  );
};

export default HomePage;
