// ============================================================
//  Hero/SliderDots.jsx — Dot indicators for hero carousel
// ============================================================
import React from "react";

/**
 * SliderDots — clickable slide indicator dots
 * @param {number}  props.count     — total number of slides
 * @param {number}  props.current   — active slide index (0-based)
 * @param {func}    props.onSelect  — (index) => void
 * @param {object}  props.theme
 */
const SliderDots = ({ count = 0, current = 0, onSelect, theme }) => {
  if (count <= 1) return null;

  const c   = theme?.colors   ?? {};
  const trn = theme?.transitions ?? {};

  return (
    <div
      role="tablist"
      aria-label="Slide indicators"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === current;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect?.(i)}
            style={{
              width: isActive ? "28px" : "8px",
              height: "8px",
              borderRadius: "9999px",
              background: isActive
                ? (c.secondary ?? "#e94560")
                : "rgba(255,255,255,0.45)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: `all ${trn.normal ?? "0.25s ease"}`,
              flexShrink: 0,
            }}
          />
        );
      })}
    </div>
  );
};

export default SliderDots;
