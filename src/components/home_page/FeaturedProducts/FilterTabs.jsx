// ============================================================
//  FeaturedProducts/FilterTabs.jsx — Pill filter tab bar
// ============================================================
import React from "react";

/**
 * FilterTabs — horizontal scrollable pill buttons for product filtering
 * @param {array}   props.filters     — array of filter label strings
 * @param {string}  props.active      — currently active filter
 * @param {func}    props.onChange    — (filterLabel) => void
 * @param {object}  props.theme
 */
const FilterTabs = ({ filters = [], active, onChange, theme }) => {
  if (!filters?.length) return null;

  const chip = theme?.components?.categoryChip ?? {};
  const t    = theme?.typography ?? {};
  const trn  = theme?.transitions ?? {};

  return (
    <div
      role="tablist"
      aria-label="Product filters"
      style={{
        display: "flex",
        gap: theme?.spacing?.sm ?? "8px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {filters.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(filter)}
            style={{
              padding: chip.padding ?? "8px 20px",
              borderRadius: chip.radius ?? "9999px",
              background: isActive ? (chip.backgroundActive ?? "#1a1a2e") : (chip.background ?? "#f7f5f2"),
              color: isActive ? (chip.colorActive ?? "#fff") : (chip.color ?? "#1a1a2e"),
              border: isActive ? (chip.borderActive ?? "1.5px solid #1a1a2e") : (chip.border ?? "1.5px solid #e5e7eb"),
              fontSize: chip.fontSize ?? "0.85rem",
              fontWeight: chip.fontWeight ?? 500,
              fontFamily: t.fontBody ?? "sans-serif",
              letterSpacing: "0.02em",
              cursor: "pointer",
              transition: `all ${trn.fast ?? "0.15s ease"}`,
              whiteSpace: "nowrap",
            }}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;
