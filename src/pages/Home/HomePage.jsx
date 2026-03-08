// ─────────────────────────────────────────────────────────────
//  HomePage — Root page composition
//  Renders all modules based on enabled prop and content data
// ─────────────────────────────────────────────────────────────
import React from "react";
import Navbar          from "../../components/layout/Navbar/Navbar";
import Hero            from "./Hero/Hero";
import CategoryGrid    from "./CategoryGrid/CategoryGrid";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import DealsSection    from "./DealsSection/DealsSection";
import Newsletter      from "./Newsletter/Newsletter";
import Footer          from "../../components/layout/Footer/Footer";

const HomePage = ({
  navbar          = {},
  hero            = {},
  categoryGrid    = {},
  featuredProducts = {},
  dealsSection    = {},
  newsletter      = {},
  footer          = {},
}) => {
  return (
    <>
      {/* ── Navbar ────────────────────────────────────── */}
      {navbar?.enabled !== false && (
        <Navbar {...navbar} />
      )}

      {/* ── Hero ──────────────────────────────────────── */}
      {hero?.enabled && hero?.slides?.length > 0 && (
        <Hero {...hero} />
      )}

      {/* ── Category Grid ─────────────────────────────── */}
      {categoryGrid?.enabled && categoryGrid?.categories?.length > 0 && (
        <CategoryGrid {...categoryGrid} />
      )}

      {/* ── Featured Products ─────────────────────────── */}
      {featuredProducts?.enabled && featuredProducts?.products?.length > 0 && (
        <FeaturedProducts {...featuredProducts} />
      )}

      {/* ── Deals Section ─────────────────────────────── */}
      {dealsSection?.enabled && dealsSection?.deals?.length > 0 && (
        <DealsSection {...dealsSection} />
      )}

      {/* ── Newsletter ────────────────────────────────── */}
      {newsletter?.enabled !== false && (
        <Newsletter {...newsletter} />
      )}

      {/* ── Footer ────────────────────────────────────── */}
      {footer?.enabled !== false && (
        <Footer {...footer} />
      )}
    </>
  );
};

export default HomePage;
