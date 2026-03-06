// ============================================================
//  CategoryGrid/index.jsx — Responsive masonry-style category grid
// ============================================================
import React from "react";
import CategoryCard from "./CategoryCard";

/**
 * CategoryGrid
 * @param {boolean}  props.enabled
 * @param {string}   props.title
 * @param {string}   props.subtitle
 * @param {array}    props.categories  — array of category objects
 * @param {object}   props.theme
 */
const CategoryGrid = ({
  enabled = true,
  title = "Shop by Category",
  subtitle,
  categories = [],
  theme,
}) => {
  if (!enabled || !categories?.length) return null;

  const t = theme?.typography ?? {};
  const c = theme?.colors     ?? {};
  const s = theme?.spacing    ?? {};

  const sectionStyle = {
    padding: `${s["3xl"] ?? "64px"} ${theme?.layout?.containerPad ?? "24px"}`,
    background: theme?.colors?.background ?? "#f7f5f2",
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
    margin: 0,
    fontWeight: t.weightNormal ?? 400,
  };

  // First category is featured (wide), rest are normal
  const [featured, ...rest] = categories;

  return (
    <section style={sectionStyle} aria-label="Product categories">
      <div style={innerStyle}>
        {/* Heading */}
        <div style={headingStyle}>
          <h2 style={titleStyle}>{title}</h2>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </div>

        {/* Grid layout CSS */}
        <style>{`
          .luxe-cat-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: auto;
            gap: ${theme?.layout?.gridGap ?? "24px"};
          }
          .luxe-cat-featured {
            grid-column: span 2;
            grid-row: span 2;
          }
          @media (max-width: 1023px) {
            .luxe-cat-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .luxe-cat-featured {
              grid-column: span 2;
              grid-row: span 1;
            }
          }
          @media (max-width: 640px) {
            .luxe-cat-grid {
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }
            .luxe-cat-featured {
              grid-column: span 2;
            }
          }
        `}</style>

        <div className="luxe-cat-grid">
          {featured && (
            <div className="luxe-cat-featured">
              <div style={{ height: "100%" }}>
                <CategoryCard category={{ ...featured, featured: true }} theme={theme} />
              </div>
            </div>
          )}
          {rest.map((cat) => (
            <CategoryCard key={cat.id ?? cat.slug} category={cat} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
