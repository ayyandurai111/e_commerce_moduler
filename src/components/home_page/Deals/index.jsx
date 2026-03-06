// ============================================================
//  Deals/index.jsx — "Deals of the Day" section
// ============================================================
import React from "react";
import DealCard from "./DealCard";

/**
 * Deals — dark-background section with deal cards
 * @param {boolean}  props.enabled
 * @param {string}   props.title
 * @param {string}   props.subtitle
 * @param {array}    props.deals
 * @param {object}   props.theme
 */
const Deals = ({
  enabled = true,
  title   = "Deals of the Day",
  subtitle,
  deals   = [],
  theme,
}) => {
  if (!enabled || !deals?.length) return null;

  const t = theme?.typography ?? {};
  const c = theme?.colors     ?? {};
  const s = theme?.spacing    ?? {};

  const sectionStyle = {
    padding: `${s["3xl"] ?? "64px"} ${theme?.layout?.containerPad ?? "24px"}`,
    background: c.backgroundAlt ?? "#1a1a2e",
    position: "relative",
    overflow: "hidden",
  };

  // Decorative background pattern
  const patternStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(233,69,96,0.08) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(245,166,35,0.06) 0%, transparent 40%)`,
    pointerEvents: "none",
  };

  const innerStyle = {
    maxWidth: theme?.layout?.containerMax ?? "1280px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: s["2xl"] ?? "48px",
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "4px 14px",
    background: c.secondary ?? "#e94560",
    color: "#fff",
    borderRadius: theme?.radius?.badge ?? "9999px",
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeXs ?? "0.75rem",
    fontWeight: t.weightBold ?? 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "16px",
  };

  const titleStyle = {
    fontFamily: t.fontDisplay ?? "serif",
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    fontWeight: t.weightBold ?? 700,
    color: "#ffffff",
    letterSpacing: t.letterSpacingTight ?? "-0.02em",
    margin: "0 0 12px",
  };

  const subtitleStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeLg ?? "1.125rem",
    color: "rgba(255,255,255,0.65)",
    margin: 0,
  };

  return (
    <section style={sectionStyle} aria-label="Deals of the day">
      <div style={patternStyle} aria-hidden="true" />

      <div style={innerStyle}>
        {/* Heading */}
        <div style={headingStyle}>
          <span style={badgeStyle}>⚡ Limited Time</span>
          <h2 style={titleStyle}>{title}</h2>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </div>

        {/* Deal cards grid */}
        <style>{`
          .luxe-deals-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: ${theme?.layout?.gridGap ?? "24px"};
          }
          @media (max-width: 1024px) {
            .luxe-deals-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 640px) {
            .luxe-deals-grid { grid-template-columns: 1fr; }
          }
        `}</style>

        <div className="luxe-deals-grid">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deals;
