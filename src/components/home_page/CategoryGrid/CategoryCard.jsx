// ============================================================
//  CategoryGrid/CategoryCard.jsx — Single category tile
// ============================================================
import React, { useState } from "react";

/**
 * CategoryCard — image card with title overlay and hover zoom
 * @param {object}  props.category  — { id, name, slug, count, image, featured }
 * @param {object}  props.theme
 */
const CategoryCard = ({ category = {}, theme }) => {
  const [hovered, setHovered] = useState(false);

  const t   = theme?.typography ?? {};
  const c   = theme?.colors ?? {};
  const trn = theme?.transitions ?? {};
  const r   = theme?.radius ?? {};

  const cardStyle = {
    position: "relative",
    borderRadius: r.card ?? "12px",
    overflow: "hidden",
    cursor: "pointer",
    aspectRatio: category.featured ? "4/3" : "3/4",
    background: "#1a1a2e",
    boxShadow: hovered
      ? (theme?.shadows?.cardHover ?? "0 8px 32px rgba(233,69,96,0.18)")
      : (theme?.shadows?.card ?? "0 2px 16px rgba(26,26,46,0.08)"),
    transition: `box-shadow ${trn.normal ?? "0.25s ease"}`,
  };

  const imageStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hovered ? "scale(1.08)" : "scale(1)",
    transition: `transform ${trn.slow ?? "0.4s ease"}`,
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: hovered
      ? "linear-gradient(to top, rgba(26,26,46,0.85) 0%, rgba(26,26,46,0.2) 60%, transparent 100%)"
      : "linear-gradient(to top, rgba(26,26,46,0.7) 0%, rgba(26,26,46,0.1) 60%, transparent 100%)",
    transition: `background ${trn.normal ?? "0.25s ease"}`,
  };

  const labelStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: `${theme?.spacing?.lg ?? "24px"}`,
  };

  const nameStyle = {
    fontFamily: t.fontDisplay ?? "serif",
    fontSize: category.featured ? t.size2xl ?? "1.5rem" : t.sizeXl ?? "1.25rem",
    fontWeight: t.weightBold ?? 700,
    color: "#ffffff",
    margin: 0,
    letterSpacing: t.letterSpacingTight ?? "-0.02em",
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    transition: `transform ${trn.normal ?? "0.25s ease"}`,
  };

  const countStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    color: "rgba(255,255,255,0.7)",
    marginTop: "4px",
    display: "block",
    opacity: hovered ? 1 : 0.7,
    transition: `opacity ${trn.normal ?? "0.25s ease"}`,
  };

  const arrowStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "8px",
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    fontWeight: t.weightSemibold ?? 600,
    color: c.secondary ?? "#e94560",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    opacity: hovered ? 1 : 0,
    transform: hovered ? "translateY(0)" : "translateY(8px)",
    transition: `opacity ${trn.normal ?? "0.25s ease"}, transform ${trn.normal ?? "0.25s ease"}`,
  };

  return (
    <a
      href={`/category/${category.slug ?? ""}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${category.name} — ${category.count} products`}
    >
      <div style={cardStyle}>
        {category.image && (
          <img
            src={category.image}
            alt={category.name}
            style={imageStyle}
            loading="lazy"
          />
        )}
        <div style={overlayStyle} />
        <div style={labelStyle}>
          <p style={nameStyle}>{category.name}</p>
          <span style={countStyle}>{category.count} products</span>
          <span style={arrowStyle}>
            Shop Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;
