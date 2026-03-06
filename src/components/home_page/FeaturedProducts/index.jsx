// ============================================================
//  FeaturedProducts/index.jsx — Filterable product grid section
// ============================================================
import React, { useState } from "react";
import FilterTabs from "./FilterTabs";
import ProductCard from "./ProductCard";

/**
 * FeaturedProducts
 * @param {boolean}  props.enabled
 * @param {string}   props.title
 * @param {string}   props.subtitle
 * @param {array}    props.filters
 * @param {array}    props.products
 * @param {func}     props.onAddToCart
 * @param {func}     props.onAddToWishlist
 * @param {object}   props.theme
 */
const FeaturedProducts = ({
  enabled = true,
  title = "Featured Products",
  subtitle,
  filters = [],
  products = [],
  onAddToCart,
  onAddToWishlist,
  theme,
}) => {
  const [activeFilter, setActiveFilter] = useState(filters?.[0] ?? "All");

  if (!enabled || !products?.length) return null;

  const t = theme?.typography ?? {};
  const c = theme?.colors     ?? {};
  const s = theme?.spacing    ?? {};

  // Filter products
  const filtered = products.filter((p) =>
    activeFilter === "All" || p.filter === activeFilter
  );

  const sectionStyle = {
    padding: `${s["3xl"] ?? "64px"} ${theme?.layout?.containerPad ?? "24px"}`,
    background: c.surface ?? "#ffffff",
  };

  const innerStyle = {
    maxWidth: theme?.layout?.containerMax ?? "1280px",
    margin: "0 auto",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: s["2xl"] ?? "48px",
  };

  const titleStyle = {
    fontFamily: t.fontDisplay ?? "serif",
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    fontWeight: t.weightBold ?? 700,
    color: c.textPrimary ?? "#1a1a2e",
    letterSpacing: t.letterSpacingTight ?? "-0.02em",
    margin: "0 0 12px",
  };

  const subtitleStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeLg ?? "1.125rem",
    color: c.textSecondary ?? "#6b7280",
    margin: "0 0 28px",
    fontWeight: t.weightNormal ?? 400,
  };

  const currencySymbol = theme?.content?.currencySymbol ?? "$";

  return (
    <section style={sectionStyle} aria-label="Featured products">
      <style>{`
        .luxe-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: ${theme?.layout?.gridGap ?? "24px"};
          margin-top: 40px;
        }
        @media (max-width: 1280px) {
          .luxe-product-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .luxe-product-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 480px) {
          .luxe-product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
      `}</style>

      <div style={innerStyle}>
        <div style={headingStyle}>
          <h2 style={titleStyle}>{title}</h2>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}

          {/* Filter tabs */}
          {filters?.length > 0 && (
            <FilterTabs
              filters={filters}
              active={activeFilter}
              onChange={setActiveFilter}
              theme={theme}
            />
          )}
        </div>

        {/* Product grid */}
        <div className="luxe-product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              currencySymbol={currencySymbol}
              theme={theme}
            />
          ))}
        </div>

        {/* View all CTA */}
        <div style={{ textAlign: "center", marginTop: s["2xl"] ?? "48px" }}>
          <ViewAllButton theme={theme} />
        </div>
      </div>
    </section>
  );
};

// ── Inline View All button ──────────────────────────────────
const ViewAllButton = ({ theme }) => {
  const [hov, setHov] = useState(false);
  const c   = theme?.colors ?? {};
  const t   = theme?.typography ?? {};
  const btn = theme?.components?.button?.secondary ?? {};

  return (
    <a
      href="/shop"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: btn.padding ?? "12px 32px",
        background: hov ? (c.primary ?? "#1a1a2e") : "transparent",
        color: hov ? "#ffffff" : (c.textPrimary ?? "#1a1a2e"),
        border: `2px solid ${c.primary ?? "#1a1a2e"}`,
        borderRadius: btn.radius ?? "8px",
        fontFamily: t.fontBody ?? "sans-serif",
        fontSize: t.sizeSm ?? "0.875rem",
        fontWeight: t.weightSemibold ?? 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        textDecoration: "none",
        transition: `all ${theme?.transitions?.normal ?? "0.25s ease"}`,
      }}
    >
      View All Products
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  );
};

export default FeaturedProducts;
