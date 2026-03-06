// ============================================================
//  Deals/ProgressBar.jsx — Stock sold progress bar
// ============================================================
import React from "react";

/**
 * ProgressBar — animated fill bar showing units sold vs total
 * @param {number}  props.sold    — units sold
 * @param {number}  props.total   — total units available
 * @param {object}  props.theme
 */
const ProgressBar = ({ sold = 0, total = 100, theme }) => {
  const percent = Math.min(Math.round((sold / (total || 1)) * 100), 100);
  const c   = theme?.colors ?? {};
  const t   = theme?.typography ?? {};
  const r   = theme?.radius ?? {};

  // Color gradient: green → yellow → red based on % sold
  const barColor =
    percent >= 80
      ? (c.error ?? "#ef4444")
      : percent >= 50
      ? (c.warning ?? "#f5a623")
      : (c.success ?? "#10b981");

  return (
    <div>
      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{
          fontFamily: t.fontBody ?? "sans-serif",
          fontSize: t.sizeXs ?? "0.75rem",
          fontWeight: t.weightSemibold ?? 600,
          color: barColor,
        }}>
          {sold} sold
        </span>
        <span style={{
          fontFamily: t.fontBody ?? "sans-serif",
          fontSize: t.sizeXs ?? "0.75rem",
          color: c.textMuted ?? "#9ca3af",
        }}>
          {total - sold} remaining
        </span>
      </div>

      {/* Track */}
      <div style={{
        height: "6px",
        background: c.border ?? "#e5e7eb",
        borderRadius: r.full ?? "9999px",
        overflow: "hidden",
      }}>
        {/* Fill */}
        <div style={{
          height: "100%",
          width: `${percent}%`,
          background: `linear-gradient(90deg, ${barColor}99, ${barColor})`,
          borderRadius: r.full ?? "9999px",
          transition: "width 0.6s ease",
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;
