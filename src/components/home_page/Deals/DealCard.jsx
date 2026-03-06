// ============================================================
//  Deals/DealCard.jsx — Individual deal card with timer + progress
// ============================================================
import React, { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import ProgressBar    from "./ProgressBar";
import RatingStars    from "../FeaturedProducts/RatingStars";

/**
 * DealCard — product deal with countdown, progress, and CTA
 * @param {object}  props.deal
 * @param {object}  props.theme
 */
const DealCard = ({ deal = {}, theme }) => {
  const [hovered, setHovered] = useState(false);
  const [hovBtn,  setHovBtn]  = useState(false);

  const t   = theme?.typography ?? {};
  const c   = theme?.colors ?? {};
  const s   = theme?.spacing ?? {};
  const r   = theme?.radius ?? {};
  const trn = theme?.transitions ?? {};
  const sh  = theme?.shadows ?? {};
  const currencySymbol = theme?.content?.currencySymbol ?? "$";

  const discountPct = deal.discount ??
    (deal.originalPrice && deal.salePrice
      ? Math.round((1 - deal.salePrice / deal.originalPrice) * 100)
      : 0);

  const cardStyle = {
    background: "#ffffff",
    borderRadius: r.card ?? "12px",
    overflow: "hidden",
    boxShadow: hovered ? (sh.cardHover ?? "0 8px 32px rgba(233,69,96,0.18)") : (sh.card ?? "0 2px 16px rgba(26,26,46,0.08)"),
    transform: hovered ? "translateY(-4px)" : "none",
    transition: `all ${trn.normal ?? "0.25s ease"}`,
  };

  const imageWrapStyle = {
    position: "relative",
    aspectRatio: "1/1",
    overflow: "hidden",
    background: c.background ?? "#f7f5f2",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hovered ? "scale(1.06)" : "scale(1)",
    transition: `transform ${trn.slow ?? "0.4s ease"}`,
  };

  const discountBadgeStyle = {
    position: "absolute",
    top: "12px",
    left: "12px",
    padding: "5px 12px",
    background: c.secondary ?? "#e94560",
    color: "#fff",
    borderRadius: r.badge ?? "9999px",
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeXs ?? "0.75rem",
    fontWeight: t.weightBold ?? 700,
    letterSpacing: "0.04em",
  };

  const bodyStyle = {
    padding: s.lg ?? "24px",
    display: "flex",
    flexDirection: "column",
    gap: s.sm ?? "8px",
  };

  const catStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeXs ?? "0.75rem",
    fontWeight: t.weightMedium ?? 500,
    color: c.textMuted ?? "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: 0,
  };

  const nameStyle = {
    fontFamily: t.fontDisplay ?? "serif",
    fontSize: t.sizeXl ?? "1.25rem",
    fontWeight: t.weightBold ?? 700,
    color: c.textPrimary ?? "#1a1a2e",
    margin: 0,
    lineHeight: t.lineHeightTight ?? 1.25,
  };

  const priceRowStyle = {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
    marginTop: "2px",
  };

  const salePriceStyle = {
    fontFamily: t.fontMono ?? "monospace",
    fontSize: t.size2xl ?? "1.5rem",
    fontWeight: t.weightBold ?? 700,
    color: c.secondary ?? "#e94560",
  };

  const originalPriceStyle = {
    fontFamily: t.fontMono ?? "monospace",
    fontSize: t.sizeSm ?? "0.875rem",
    color: c.textMuted ?? "#9ca3af",
    textDecoration: "line-through",
  };

  const btnStyle = {
    width: "100%",
    padding: "12px",
    background: hovBtn ? "#c73652" : (c.secondary ?? "#e94560"),
    color: "#fff",
    border: "none",
    borderRadius: r.button ?? "8px",
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    fontWeight: t.weightSemibold ?? 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: `background ${trn.fast ?? "0.15s ease"}`,
    marginTop: s.sm ?? "8px",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={imageWrapStyle}>
        {deal.image && <img src={deal.image} alt={deal.name ?? ""} style={imageStyle} loading="lazy" />}
        {discountPct > 0 && (
          <span style={discountBadgeStyle}>{discountPct}% OFF</span>
        )}
      </div>

      {/* Body */}
      <div style={bodyStyle}>
        <p style={catStyle}>{deal.category}</p>
        <h3 style={nameStyle}>{deal.name}</h3>

        {deal.rating && (
          <RatingStars rating={deal.rating} reviewCount={deal.reviewCount} theme={theme} />
        )}

        <div style={priceRowStyle}>
          <span style={salePriceStyle}>{currencySymbol}{deal.salePrice?.toLocaleString?.()}</span>
          {deal.originalPrice && (
            <span style={originalPriceStyle}>{currencySymbol}{deal.originalPrice?.toLocaleString?.()}</span>
          )}
        </div>

        {/* Timer */}
        <div style={{ marginTop: "4px" }}>
          <p style={{ ...catStyle, marginBottom: "8px" }}>Ends in:</p>
          <CountdownTimer expiresAt={deal.expiresAt} theme={theme} />
        </div>

        {/* Stock progress */}
        {deal.stockTotal && (
          <div style={{ marginTop: "4px" }}>
            <ProgressBar sold={deal.stockSold ?? 0} total={deal.stockTotal} theme={theme} />
          </div>
        )}

        <button
          style={btnStyle}
          onMouseEnter={() => setHovBtn(true)}
          onMouseLeave={() => setHovBtn(false)}
          onClick={() => window.location.href = `/product/${deal.id}`}
        >
          Grab This Deal
        </button>
      </div>
    </div>
  );
};

export default DealCard;
