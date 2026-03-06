// ============================================================
//  FeaturedProducts/RatingStars.jsx — Star rating display
// ============================================================
import React from "react";

/**
 * RatingStars — renders 5 filled/half/empty stars
 * @param {number}  props.rating      — 0–5 (supports .5 increments)
 * @param {number}  props.reviewCount — display alongside stars
 * @param {object}  props.theme
 */
const RatingStars = ({ rating = 0, reviewCount, theme }) => {
  const r   = theme?.components?.rating ?? {};
  const t   = theme?.typography ?? {};
  const c   = theme?.colors ?? {};

  const filledColor = r.filledColor ?? "#f5a623";
  const emptyColor  = r.emptyColor  ?? "#e5e7eb";
  const starSize    = r.size        ?? "14px";

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = Math.min(Math.max(rating - i, 0), 1); // 0, 0.5, or 1
    return filled;
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {/* Stars */}
      <div style={{ display: "flex", gap: "2px" }}>
        {stars.map((fill, i) => (
          <svg
            key={i}
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`star-grad-${i}`}>
                <stop offset={`${fill * 100}%`} stopColor={filledColor} />
                <stop offset={`${fill * 100}%`} stopColor={emptyColor} />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={`url(#star-grad-${i})`}
            />
          </svg>
        ))}
      </div>

      {/* Numeric rating */}
      <span
        style={{
          fontFamily: t.fontMono ?? "monospace",
          fontSize: t.sizeXs ?? "0.75rem",
          fontWeight: t.weightSemibold ?? 600,
          color: c.textSecondary ?? "#6b7280",
          lineHeight: 1,
        }}
      >
        {rating?.toFixed(1)}
      </span>

      {/* Review count */}
      {reviewCount !== undefined && (
        <span
          style={{
            fontFamily: t.fontBody ?? "sans-serif",
            fontSize: t.sizeXs ?? "0.75rem",
            color: c.textMuted ?? "#9ca3af",
            lineHeight: 1,
          }}
        >
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
