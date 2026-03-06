// ============================================================
//  Footer/BrandCol.jsx — Brand column with tagline and description
// ============================================================
import React from "react";

/**
 * BrandCol — left footer column with brand identity
 * @param {object}  props.brand  — { name, tagline, description }
 * @param {object}  props.theme
 */
const BrandCol = ({ brand = {}, theme }) => {
  const t   = theme?.typography ?? {};
  const c   = theme?.colors ?? {};
  const ftr = theme?.components?.footer ?? {};
  const s   = theme?.spacing ?? {};

  const nameStyle = {
    fontFamily: t.fontDisplay ?? "serif",
    fontSize: t.sizeXl ?? "1.25rem",
    fontWeight: t.weightBold ?? 700,
    color: c.textInverse ?? "#ffffff",
    letterSpacing: t.letterSpacingWider ?? "0.1em",
    margin: "0 0 4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const taglineStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    color: ftr.linkColor ?? "#9ca3af",
    fontStyle: "italic",
    margin: "0 0 16px",
  };

  const descStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    color: ftr.textColor ?? "#d1d5db",
    lineHeight: t.lineHeightRelax ?? 1.8,
    margin: 0,
    maxWidth: "280px",
  };

  return (
    <div>
      <h2 style={nameStyle}>
        <span style={{
          display: "inline-block",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: c.secondary ?? "#e94560",
          flexShrink: 0,
        }} />
        {brand.name ?? theme?.brand?.name ?? "STORE"}
      </h2>
      {brand.tagline && <p style={taglineStyle}>{brand.tagline}</p>}
      {brand.description && <p style={descStyle}>{brand.description}</p>}
    </div>
  );
};

export default BrandCol;
