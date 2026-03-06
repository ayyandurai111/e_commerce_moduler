// ============================================================
//  Navbar/Logo.jsx — Brand logo (image or text fallback)
// ============================================================
import React from "react";

/**
 * Logo — renders brand image or styled text mark
 * @param {object}  props
 * @param {string}  props.storeName   — display text if no logo
 * @param {string}  [props.logoUrl]   — optional image URL
 * @param {object}  props.theme       — full theme object
 * @param {boolean} props.scrolled    — toggle dark/light variant
 */
const Logo = ({ storeName = "STORE", logoUrl, theme, scrolled = false }) => {
  const t = theme?.typography ?? {};
  const c = theme?.colors ?? {};
  const nav = theme?.components?.navbar ?? {};

  const textColor = scrolled ? nav.textColorScroll ?? c.textInverse : nav.textColor ?? c.textPrimary;

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    cursor: "pointer",
  };

  // ── Image logo ─────────────────────────────────────────────
  if (logoUrl) {
    return (
      <a href="/" style={containerStyle} aria-label={storeName}>
        <img
          src={logoUrl}
          alt={storeName}
          style={{ height: "36px", width: "auto", objectFit: "contain" }}
        />
      </a>
    );
  }

  // ── Text logo (default) ────────────────────────────────────
  return (
    <a href="/" style={containerStyle} aria-label={storeName}>
      {/* Decorative accent mark */}
      <span
        style={{
          display: "inline-block",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: theme?.colors?.secondary ?? "#e94560",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: t.fontDisplay ?? "serif",
          fontSize: nav.logoSize ?? "1.6rem",
          fontWeight: t.weightBold ?? 700,
          color: textColor,
          letterSpacing: t.letterSpacingWider ?? "0.1em",
          lineHeight: 1,
          whiteSpace: "nowrap",
          transition: "color 0.25s ease",
        }}
      >
        {storeName}
      </span>
    </a>
  );
};

export default Logo;
