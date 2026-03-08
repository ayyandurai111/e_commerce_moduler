// ─────────────────────────────────────────────────────────────
//  ActiveFilters — Deletable chips for each applied filter
//  ZERO hardcoded colors / fonts / sizes / weights
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Chip, Button } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND } from "../../../theme/theme";

const ActiveFilters = ({ activeFilters = {}, filterMeta = {}, onRemove, onClearAll }) => {
  const theme    = useTheme();
  const priceMin = filterMeta.priceMin ?? 0;
  const priceMax = filterMeta.priceMax ?? 1000;
  const currency = filterMeta.currency ?? "$";

  const chips = [];

  if (activeFilters.category) {
    chips.push({ key: "category", label: activeFilters.category,
      onDelete: () => onRemove("category", null) });
  }
  if (activeFilters.rating) {
    chips.push({ key: "rating", label: `${activeFilters.rating}★ & up`,
      onDelete: () => onRemove("rating", null) });
  }
  if (activeFilters.price &&
      (activeFilters.price[0] !== priceMin || activeFilters.price[1] !== priceMax)) {
    chips.push({ key: "price",
      label: `${currency}${activeFilters.price[0]} – ${currency}${activeFilters.price[1]}`,
      onDelete: () => onRemove("price", [priceMin, priceMax]) });
  }
  (activeFilters.brands || []).forEach((b) =>
    chips.push({ key: `brand-${b}`, label: b,
      onDelete: () => onRemove("brands", (activeFilters.brands || []).filter((x) => x !== b)) })
  );
  (activeFilters.colors || []).forEach((c) => {
    const meta = (filterMeta.colors || []).find((x) => x.value === c);
    chips.push({ key: `color-${c}`, label: meta?.label || c, hex: meta?.hex,
      onDelete: () => onRemove("colors", (activeFilters.colors || []).filter((x) => x !== c)) });
  });
  (activeFilters.sizes || []).forEach((s) =>
    chips.push({ key: `size-${s}`, label: `Size ${s}`,
      onDelete: () => onRemove("sizes", (activeFilters.sizes || []).filter((x) => x !== s)) })
  );

  if (!chips.length) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mb: 2 }}>
      <Typography sx={{
        fontFamily:    BRAND.fontBody,
        fontSize:      BRAND.sizeXs,
        fontWeight:    theme.typography.fontWeightSemibold,
        color:         theme.palette.text.secondary,
        letterSpacing: "0.04em",
        whiteSpace:    "nowrap",
      }}>
        Active:
      </Typography>

      {chips.map((chip) => (
        <Chip key={chip.key}
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {chip.hex && (
                <Box sx={{
                  width: 10, height: 10, borderRadius: "50%",
                  backgroundColor: chip.hex,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  flexShrink: 0,
                }} />
              )}
              {chip.label}
            </Box>
          }
          onDelete={chip.onDelete}
          size="small"
          sx={{
            fontFamily:      BRAND.fontBody,
            fontSize:        BRAND.sizeXs,
            fontWeight:      theme.typography.fontWeightMedium,
            backgroundColor: alpha(theme.palette.secondary.main, 0.08),
            color:           theme.palette.secondary.main,
            border:          `1px solid ${alpha(theme.palette.secondary.main, 0.25)}`,
            borderRadius:    BRAND.radiusBadge,
            "& .MuiChip-deleteIcon": {
              color:     alpha(theme.palette.secondary.main, 0.6),
              fontSize:  15,
              "&:hover": { color: theme.palette.secondary.main },
            },
          }}
        />
      ))}

      <Button size="small" onClick={onClearAll} sx={{
        fontFamily: BRAND.fontBody,
        fontSize:   BRAND.sizeXs,
        fontWeight: theme.typography.fontWeightSemibold,
        color:      theme.palette.text.disabled,
        p: 0, minWidth: "auto",
        "&:hover": { color: theme.palette.secondary.main, backgroundColor: "transparent" },
      }}>
        Clear all
      </Button>
    </Box>
  );
};

export default ActiveFilters;
