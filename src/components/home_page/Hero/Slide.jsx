// ============================================================
//  Hero/Slide.jsx — Single hero slide with image + text overlay
// ============================================================
import React from "react";
import CTAButtons from "./CTAButtons";

/**
 * Slide — one hero slide (background image + animated text content)
 * @param {object}  props.slide      — slide data object
 * @param {boolean} props.active     — is this the current slide?
 * @param {string}  props.ctaText    — fallback CTA label
 * @param {string}  props.ctaLink    — fallback CTA url
 * @param {string}  props.ctaSecondaryText
 * @param {string}  props.ctaSecondaryLink
 * @param {object}  props.theme
 */
const Slide = ({
  slide = {},
  active = false,
  ctaText = "Shop Now",
  ctaLink = "/shop",
  ctaSecondaryText,
  ctaSecondaryLink,
  theme,
}) => {
  const t    = theme?.typography  ?? {};
  const c    = theme?.colors      ?? {};
  const hero = theme?.components?.hero ?? {};

  const slideStyle = {
    position: "absolute",
    inset: 0,
    opacity: active ? 1 : 0,
    transform: active ? "scale(1)" : "scale(1.03)",
    transition: "opacity 0.9s ease, transform 0.9s ease",
    pointerEvents: active ? "auto" : "none",
  };

  // Background: image with overlay OR gradient
  const bgImageStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: slide.image ? `url(${slide.image})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const bgGradientStyle = {
    position: "absolute",
    inset: 0,
    background: slide.bgGradient ?? hero.background ?? "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: slide.image
      ? `rgba(26,26,46,${hero.overlayOpacity ?? 0.55})`
      : "transparent",
  };

  const contentStyle = {
    position: "relative",
    zIndex: 1,
    maxWidth: theme?.layout?.containerMax ?? "1280px",
    margin: "0 auto",
    padding: `0 ${theme?.layout?.containerPad ?? "24px"}`,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: theme?.spacing?.lg ?? "24px",
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "6px 16px",
    background: c.secondary ?? "#e94560",
    color: "#fff",
    fontSize: t.sizeXs ?? "0.75rem",
    fontWeight: t.weightBold ?? 700,
    fontFamily: t.fontBody ?? "sans-serif",
    letterSpacing: t.letterSpacingWider ?? "0.1em",
    borderRadius: theme?.radius?.badge ?? "9999px",
    textTransform: "uppercase",
    alignSelf: "flex-start",
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(16px)",
    transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
  };

  const titleStyle = {
    fontFamily: t.fontDisplay ?? "serif",
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    fontWeight: t.weightBold ?? 700,
    color: hero.textColor ?? "#ffffff",
    lineHeight: t.lineHeightTight ?? 1.1,
    letterSpacing: t.letterSpacingTight ?? "-0.02em",
    margin: 0,
    whiteSpace: "pre-line",
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
    maxWidth: "680px",
  };

  const subtitleStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    fontWeight: t.weightNormal ?? 400,
    color: "rgba(255,255,255,0.82)",
    lineHeight: t.lineHeightRelax ?? 1.8,
    margin: 0,
    maxWidth: "520px",
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
  };

  const ctaWrapStyle = {
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(16px)",
    transition: "opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s",
  };

  return (
    <div style={slideStyle} aria-hidden={!active}>
      {/* Background layers */}
      {!slide.image && <div style={bgGradientStyle} />}
      {slide.image  && <div style={bgImageStyle} />}
      <div style={overlayStyle} />

      {/* Text content */}
      <div style={contentStyle}>
        {slide.badge && hero.showBadge !== false && (
          <span style={badgeStyle}>{slide.badge}</span>
        )}
        <h1 style={titleStyle}>{slide.title ?? ""}</h1>
        {slide.subtitle && <p style={subtitleStyle}>{slide.subtitle}</p>}
        <div style={ctaWrapStyle}>
          <CTAButtons
            primaryText={slide.ctaText ?? ctaText}
            primaryLink={slide.ctaLink ?? ctaLink}
            secondaryText={ctaSecondaryText}
            secondaryLink={ctaSecondaryLink}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default Slide;
