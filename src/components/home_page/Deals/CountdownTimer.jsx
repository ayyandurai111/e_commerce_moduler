// ============================================================
//  Deals/CountdownTimer.jsx — Live countdown to deal expiry
// ============================================================
import React, { useState, useEffect } from "react";

/**
 * CountdownTimer — ticking HH:MM:SS countdown
 * @param {number}  props.expiresAt  — Unix ms timestamp
 * @param {object}  props.theme
 */
const CountdownTimer = ({ expiresAt, theme }) => {
  const [timeLeft, setTimeLeft] = useState(calcTime(expiresAt));

  function calcTime(target) {
    const diff = Math.max((target ?? 0) - Date.now(), 0);
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
      expired: diff <= 0,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTime(expiresAt)), 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  const t  = theme?.typography ?? {};
  const c  = theme?.colors ?? {};

  const pad = (n) => String(n).padStart(2, "0");

  const unitStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "44px",
  };

  const numStyle = {
    fontFamily: t.fontMono ?? "monospace",
    fontSize: t.sizeXl ?? "1.25rem",
    fontWeight: t.weightBold ?? 700,
    color: c.secondary ?? "#e94560",
    lineHeight: 1,
    background: "rgba(233,69,96,0.08)",
    padding: "6px 10px",
    borderRadius: theme?.radius?.md ?? "8px",
    minWidth: "44px",
    textAlign: "center",
  };

  const labelStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: "9px",
    fontWeight: t.weightMedium ?? 500,
    color: c.textMuted ?? "#9ca3af",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginTop: "4px",
  };

  const sepStyle = {
    fontFamily: t.fontMono ?? "monospace",
    fontSize: t.sizeXl ?? "1.25rem",
    fontWeight: t.weightBold ?? 700,
    color: c.secondary ?? "#e94560",
    alignSelf: "flex-start",
    paddingTop: "4px",
  };

  if (timeLeft.expired) {
    return (
      <span style={{ ...numStyle, fontSize: "0.75rem", color: c.textMuted }}>
        EXPIRED
      </span>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }} aria-label="Time remaining">
      <div style={unitStyle}>
        <span style={numStyle}>{pad(timeLeft.h)}</span>
        <span style={labelStyle}>hrs</span>
      </div>
      <span style={sepStyle}>:</span>
      <div style={unitStyle}>
        <span style={numStyle}>{pad(timeLeft.m)}</span>
        <span style={labelStyle}>min</span>
      </div>
      <span style={sepStyle}>:</span>
      <div style={unitStyle}>
        <span style={numStyle}>{pad(timeLeft.s)}</span>
        <span style={labelStyle}>sec</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
