// ============================================================
//  Hero/CTAButtons.jsx — Primary + secondary CTA button pair
// ============================================================
import React, { useState } from "react";

/**
 * CTAButtons — renders primary and optional secondary hero CTAs
 * @param {string}  props.primaryText
 * @param {string}  props.primaryLink
 * @param {string}  [props.secondaryText]
 * @param {string}  [props.secondaryLink]
 * @param {object}  props.theme
 */
const CTAButtons = ({
  primaryText = "Shop Now",
  primaryLink = "/shop",
  secondaryText,
  secondaryLink,
  theme,
}) => {
  const [hov1, setHov1] = useState(false);
  const [hov2, setHov2] = useState(false);

  const t   = theme?.typography   ?? {};
  const btn = theme?.components?.button ?? {};
  const p   = btn.primary   ?? {};
  const trn = theme?.transitions  ?? {};

  const primaryStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: p.padding ?? "14px 32px",
    background: hov1 ? (p.hoverBg ?? "#c73652") : (p.background ?? "#e94560"),
    color: p.color ?? "#ffffff",
    borderRadius: p.radius ?? "8px",
    fontSize: p.fontSize ?? "0.95rem",
    fontWeight: p.fontWeight ?? 600,
    fontFamily: t.fontBody ?? "sans-serif",
    letterSpacing: p.letterSpacing ?? "0.04em",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    boxShadow: hov1 ? "0 8px 24px rgba(233,69,96,0.5)" : (p.shadow ?? "0 4px 14px rgba(233,69,96,0.35)"),
    transform: hov1 ? "translateY(-2px)" : "none",
    transition: `all ${trn.normal ?? "0.25s ease"}`,
    textTransform: "uppercase",
  };

  const secondaryStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "13px 32px",
    background: "transparent",
    color: hov2 ? "#1a1a2e" : "#ffffff",
    borderRadius: p.radius ?? "8px",
    fontSize: "0.95rem",
    fontWeight: 600,
    fontFamily: t.fontBody ?? "sans-serif",
    letterSpacing: "0.04em",
    textDecoration: "none",
    border: "2px solid rgba(255,255,255,0.6)",
    cursor: "pointer",
    background: hov2 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.1)",
    backdropFilter: "blur(8px)",
    transform: hov2 ? "translateY(-2px)" : "none",
    transition: `all ${trn.normal ?? "0.25s ease"}`,
    textTransform: "uppercase",
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: theme?.spacing?.md ?? "16px", alignItems: "center" }}>
      <a
        href={primaryLink}
        style={primaryStyle}
        onMouseEnter={() => setHov1(true)}
        onMouseLeave={() => setHov1(false)}
      >
        {primaryText}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>

      {secondaryText && secondaryLink && (
        <a
          href={secondaryLink}
          style={secondaryStyle}
          onMouseEnter={() => setHov2(true)}
          onMouseLeave={() => setHov2(false)}
        >
          {secondaryText}
        </a>
      )}
    </div>
  );
};

export default CTAButtons;
