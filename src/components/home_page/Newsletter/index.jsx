// ============================================================
//  Newsletter/index.jsx — Email signup with discount offer
// ============================================================
import React, { useState } from "react";

/**
 * Newsletter — full-width signup section with discount incentive
 * @param {boolean}  props.enabled
 * @param {string}   props.headline
 * @param {string}   props.subheadline
 * @param {string}   props.discount
 * @param {string}   props.placeholder
 * @param {string}   props.ctaText
 * @param {array}    props.benefits    — string array
 * @param {func}     props.onSubscribe — (email) => void
 * @param {object}   props.theme
 */
const Newsletter = ({
  enabled       = true,
  headline      = "Join Our Community",
  subheadline,
  discount,
  placeholder   = "Your email address",
  ctaText       = "Subscribe",
  benefits      = [],
  onSubscribe,
  theme,
}) => {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");
  const [hovBtn,    setHovBtn]    = useState(false);
  const [focused,   setFocused]   = useState(false);

  if (!enabled) return null;

  const t   = theme?.typography ?? {};
  const c   = theme?.colors ?? {};
  const s   = theme?.spacing ?? {};
  const r   = theme?.radius ?? {};
  const inp = theme?.components?.input ?? {};
  const btn = theme?.components?.button?.primary ?? {};

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onSubscribe?.(email);
    setSubmitted(true);
    setEmail("");
  };

  const sectionStyle = {
    padding: `${s["3xl"] ?? "64px"} ${theme?.layout?.containerPad ?? "24px"}`,
    background: `linear-gradient(135deg, ${c.primary ?? "#1a1a2e"} 0%, #16213e 50%, ${c.primary ?? "#1a1a2e"} 100%)`,
    position: "relative",
    overflow: "hidden",
  };

  const bgDecoStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      radial-gradient(circle at 10% 50%, rgba(233,69,96,0.15) 0%, transparent 40%),
      radial-gradient(circle at 90% 30%, rgba(245,166,35,0.1) 0%, transparent 35%)
    `,
    pointerEvents: "none",
  };

  const innerStyle = {
    maxWidth: "720px",
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  };

  const discountBadgeStyle = discount ? {
    display: "inline-block",
    padding: "6px 18px",
    background: c.accent ?? "#f5a623",
    color: "#1a1a2e",
    borderRadius: r.badge ?? "9999px",
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    fontWeight: t.weightBold ?? 700,
    letterSpacing: "0.04em",
    marginBottom: "20px",
  } : null;

  const titleStyle = {
    fontFamily: t.fontDisplay ?? "serif",
    fontSize: "clamp(1.75rem, 4vw, 2.8rem)",
    fontWeight: t.weightBold ?? 700,
    color: "#ffffff",
    letterSpacing: t.letterSpacingTight ?? "-0.02em",
    margin: "0 0 16px",
    lineHeight: t.lineHeightTight ?? 1.2,
  };

  const subStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeLg ?? "1.1rem",
    color: "rgba(255,255,255,0.7)",
    margin: "0 0 32px",
    lineHeight: t.lineHeightRelax ?? 1.8,
  };

  const formStyle = {
    display: "flex",
    gap: "0",
    maxWidth: "520px",
    margin: "0 auto 24px",
    borderRadius: r.button ?? "8px",
    overflow: "hidden",
    boxShadow: focused
      ? `0 0 0 3px rgba(233,69,96,0.35), ${theme?.shadows?.lg ?? "0 10px 28px rgba(0,0,0,0.2)"}`
      : (theme?.shadows?.lg ?? "0 10px 28px rgba(0,0,0,0.2)"),
    transition: `box-shadow ${theme?.transitions?.normal ?? "0.25s ease"}`,
  };

  const inputStyle = {
    flex: 1,
    padding: inp.padding ?? "14px 20px",
    background: "#ffffff",
    border: "none",
    outline: "none",
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: inp.fontSize ?? "0.95rem",
    color: inp.color ?? "#1a1a2e",
  };

  const submitBtnStyle = {
    padding: "14px 28px",
    background: hovBtn ? (btn.hoverBg ?? "#c73652") : (c.secondary ?? "#e94560"),
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    fontWeight: t.weightBold ?? 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    transition: `background ${theme?.transitions?.fast ?? "0.15s ease"}`,
  };

  const errorStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    color: "#fca5a5",
    marginBottom: "12px",
  };

  const benefitStyle = {
    display: "flex",
    justifyContent: "center",
    gap: s.lg ?? "24px",
    flexWrap: "wrap",
  };

  const benefitItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    color: "rgba(255,255,255,0.65)",
  };

  // ── Success state ───────────────────────────────────────
  if (submitted) {
    return (
      <section style={sectionStyle} aria-label="Newsletter">
        <div style={bgDecoStyle} aria-hidden="true" />
        <div style={innerStyle}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎉</div>
          <h2 style={titleStyle}>You're In!</h2>
          <p style={subStyle}>
            Welcome to the LUXE family. Check your inbox for your
            {discount ? ` ${discount} discount code` : " welcome gift"}.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={sectionStyle} aria-label="Newsletter signup">
      <div style={bgDecoStyle} aria-hidden="true" />
      <div style={innerStyle}>
        {discountBadgeStyle && discount && (
          <span style={discountBadgeStyle}>🎁 Get {discount} OFF your first order</span>
        )}

        <h2 style={titleStyle}>{headline}</h2>
        {subheadline && <p style={subStyle}>{subheadline}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {error && <p style={errorStyle} role="alert">{error}</p>}
          <div style={formStyle}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              style={inputStyle}
              aria-label="Email address"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              required
            />
            <button
              type="submit"
              style={submitBtnStyle}
              onMouseEnter={() => setHovBtn(true)}
              onMouseLeave={() => setHovBtn(false)}
            >
              {ctaText}
            </button>
          </div>
        </form>

        {/* Benefits */}
        {benefits?.length > 0 && (
          <div style={benefitStyle}>
            {benefits.map((b, i) => (
              <span key={i} style={benefitItemStyle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.accent ?? "#f5a623"} strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Privacy note */}
        <p style={{
          ...benefitItemStyle,
          justifyContent: "center",
          marginTop: s.md ?? "16px",
          fontSize: t.sizeXs ?? "0.75rem",
          color: "rgba(255,255,255,0.4)",
        }}>
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
