// ============================================================
//  FeaturedProducts/PriceTag.jsx — Price display with sale pricing
// ============================================================
import React from "react";

/**
 * PriceTag — shows current price and optional strikethrough original
 * @param {number}   props.price          — current price
 * @param {number}   [props.originalPrice] — pre-sale price (optional)
 * @param {string}   props.currencySymbol  — default "$"
 * @param {object}   props.theme
 */
const PriceTag = ({
  price,
  originalPrice,
  currencySymbol = "$",
  theme,
}) => {
  const t  = theme?.typography ?? {};
  const c  = theme?.colors ?? {};
  const pc = theme?.components?.productCard ?? {};

  const isSale = originalPrice && originalPrice > price;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
      {/* Current price */}
      <span
        style={{
          fontFamily: t.fontMono ?? "monospace",
          fontSize: t.sizeLg ?? "1.125rem",
          fontWeight: t.weightBold ?? 700,
          color: isSale ? (pc.salePriceColor ?? c.secondary ?? "#e94560") : (pc.priceColor ?? c.textPrimary ?? "#1a1a2e"),
          letterSpacing: t.letterSpacingTight ?? "-0.02em",
          lineHeight: 1,
        }}
      >
        {currencySymbol}{price?.toLocaleString?.() ?? price}
      </span>

      {/* Original price (strikethrough) */}
      {isSale && (
        <span
          style={{
            fontFamily: t.fontMono ?? "monospace",
            fontSize: t.sizeSm ?? "0.875rem",
            fontWeight: t.weightNormal ?? 400,
            color: c.textMuted ?? "#9ca3af",
            textDecoration: "line-through",
            lineHeight: 1,
          }}
        >
          {currencySymbol}{originalPrice?.toLocaleString?.() ?? originalPrice}
        </span>
      )}
    </div>
  );
};

export default PriceTag;
