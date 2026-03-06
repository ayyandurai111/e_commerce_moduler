// ============================================================
//  FeaturedProducts/ProductCard.jsx — Single product card tile
// ============================================================
import React, { useState } from "react";
import RatingStars from "./RatingStars";
import PriceTag    from "./PriceTag";

const HeartIcon    = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const CartPlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    <line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
  </svg>
);

/**
 * ProductCard — responsive product tile with hover actions
 * @param {object}  props.product        — product data object
 * @param {func}    props.onAddToCart
 * @param {func}    props.onAddToWishlist
 * @param {string}  props.currencySymbol
 * @param {object}  props.theme
 */
const ProductCard = ({
  product = {},
  onAddToCart,
  onAddToWishlist,
  currencySymbol = "$",
  theme,
}) => {
  const [hovered,      setHovered]      = useState(false);
  const [wishlisted,   setWishlisted]   = useState(false);
  const [addedToCart,  setAddedToCart]  = useState(false);

  const pc  = theme?.components?.productCard ?? {};
  const bdg = theme?.components?.badge       ?? {};
  const t   = theme?.typography ?? {};
  const c   = theme?.colors     ?? {};
  const trn = theme?.transitions ?? {};
  const r   = theme?.radius ?? {};

  // Badge config
  const badgeMap = {
    new:        pc.badgeNew        ?? { bg: "#e94560", color: "#fff" },
    sale:       pc.badgeSale       ?? { bg: "#f5a623", color: "#fff" },
    bestseller: pc.badgeBestSeller ?? { bg: "#1a1a2e", color: "#fff" },
  };
  const activeBadge = pc.showBadge !== false && product.badge ? badgeMap[product.badge] : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.inStock === false) return;
    onAddToCart?.(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setWishlisted((v) => !v);
    onAddToWishlist?.(product);
  };

  // ── Card styles ─────────────────────────────────────────
  const cardStyle = {
    position: "relative",
    background: pc.background ?? "#ffffff",
    borderRadius: pc.borderRadius ?? r.card ?? "12px",
    overflow: "hidden",
    boxShadow: hovered ? (pc.shadowHover ?? theme?.shadows?.cardHover) : (pc.shadow ?? theme?.shadows?.card),
    transition: `box-shadow ${trn.normal ?? "0.25s ease"}, transform ${trn.normal ?? "0.25s ease"}`,
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    cursor: "pointer",
  };

  const imageWrapStyle = {
    position: "relative",
    aspectRatio: pc.imageAspectRatio ?? "3/4",
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

  const badgeStyle = activeBadge ? {
    position: "absolute",
    top: "12px",
    left: "12px",
    padding: bdg.padding ?? "3px 10px",
    borderRadius: bdg.radius ?? "9999px",
    background: activeBadge.bg,
    color: activeBadge.color,
    fontSize: bdg.fontSize ?? "0.7rem",
    fontWeight: bdg.fontWeight ?? 700,
    fontFamily: t.fontBody ?? "sans-serif",
    letterSpacing: bdg.letterSpacing ?? "0.06em",
    textTransform: "uppercase",
    zIndex: 2,
  } : null;

  const wishlistBtnStyle = {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(4px)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: wishlisted ? (c.secondary ?? "#e94560") : (c.textSecondary ?? "#6b7280"),
    zIndex: 2,
    transition: `transform ${trn.bounce ?? "0.3s cubic-bezier(0.34,1.56,0.64,1)"}`,
    transform: wishlisted ? "scale(1.2)" : "scale(1)",
  };

  const quickAddStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "12px 16px",
    background: addedToCart
      ? (c.success ?? "#10b981")
      : (product.inStock === false ? "#9ca3af" : (c.primary ?? "#1a1a2e")),
    color: "#fff",
    border: "none",
    cursor: product.inStock === false ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    fontWeight: t.weightSemibold ?? 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    transform: hovered ? "translateY(0)" : "translateY(100%)",
    transition: `transform ${trn.normal ?? "0.25s ease"}, background ${trn.fast ?? "0.15s ease"}`,
    zIndex: 2,
  };

  const infoStyle = {
    padding: `${theme?.spacing?.md ?? "16px"} ${theme?.spacing?.md ?? "16px"} ${theme?.spacing?.lg ?? "24px"}`,
  };

  const categoryStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeXs ?? "0.75rem",
    fontWeight: t.weightMedium ?? 500,
    color: c.textMuted ?? "#9ca3af",
    letterSpacing: t.letterSpacingWide ?? "0.05em",
    textTransform: "uppercase",
    margin: "0 0 4px",
  };

  const nameStyle = {
    fontFamily: t.fontDisplay ?? "serif",
    fontSize: t.sizeLg ?? "1.1rem",
    fontWeight: t.weightSemibold ?? 600,
    color: c.textPrimary ?? "#1a1a2e",
    margin: "0 0 8px",
    lineHeight: t.lineHeightTight ?? 1.25,
    letterSpacing: t.letterSpacingTight ?? "-0.01em",
  };

  const stockStyle = product.inStock === false ? {
    display: "inline-block",
    padding: "2px 8px",
    background: "#fee2e2",
    color: c.error ?? "#ef4444",
    borderRadius: r.badge ?? "9999px",
    fontSize: t.sizeXs ?? "0.75rem",
    fontWeight: t.weightSemibold ?? 600,
    marginTop: "6px",
  } : null;

  return (
    <a href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <div
        style={cardStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div style={imageWrapStyle}>
          {product.image && (
            <img src={product.image} alt={product.name ?? ""} style={imageStyle} loading="lazy" />
          )}

          {/* Badge */}
          {activeBadge && <span style={badgeStyle}>{product.badgeLabel ?? product.badge}</span>}

          {/* Wishlist */}
          {pc.showWishlist !== false && (
            <button
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              style={wishlistBtnStyle}
              onClick={handleWishlist}
            >
              <HeartIcon filled={wishlisted} />
            </button>
          )}

          {/* Quick Add */}
          {pc.showQuickAdd !== false && (
            <button
              aria-label={product.inStock === false ? "Out of stock" : "Add to cart"}
              style={quickAddStyle}
              onClick={handleAddToCart}
            >
              <CartPlusIcon />
              {addedToCart ? "Added!" : product.inStock === false ? "Out of Stock" : "Quick Add"}
            </button>
          )}
        </div>

        {/* Info */}
        <div style={infoStyle}>
          <p style={categoryStyle}>{product.category}</p>
          <h3 style={nameStyle}>{product.name}</h3>
          {pc.showRating !== false && product.rating && (
            <div style={{ marginBottom: "8px" }}>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} theme={theme} />
            </div>
          )}
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            currencySymbol={currencySymbol}
            theme={theme}
          />
          {product.inStock === false && stockStyle && (
            <span style={stockStyle}>Out of Stock</span>
          )}
          {product.inStock && product.stockCount <= 5 && product.stockCount > 0 && (
            <span style={{ ...stockStyle, background: "#fef3c7", color: c.warning ?? "#f5a623" }}>
              Only {product.stockCount} left
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
