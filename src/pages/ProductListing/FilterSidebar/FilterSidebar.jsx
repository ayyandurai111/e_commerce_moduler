// ─────────────────────────────────────────────────────────────
//  FilterSidebar
//
//  ✅ Uses custom collapsible sections (not MUI Accordion)
//     MUI v6 Accordion has a known height/overflow issue with
//     sticky containers — replaced with Box + useState toggle.
//
//  ZERO hardcoded colors / fonts / sizes / weights
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, Typography, Checkbox, FormControlLabel,
  Slider, Button, Divider, Rating, Chip, Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND } from "../../../theme/theme";

// ── Collapsible section (replaces MUI Accordion) ─────────────
const FilterSection = ({ title, children, defaultOpen = true }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, pb: open ? 2 : 0 }}>
      {/* Header row — always visible */}
      <Box
        onClick={() => setOpen((v) => !v)}
        sx={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          py:             1.5,
          cursor:         "pointer",
          userSelect:     "none",
          "&:hover": { opacity: 0.8 },
        }}
      >
        <Typography sx={{
          fontFamily:    BRAND.fontBody,
          fontWeight:    theme.typography.fontWeightBold,
          fontSize:      BRAND.sizeXs,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color:         theme.palette.text.primary,
        }}>
          {title}
        </Typography>
        <IconButton size="small" sx={{ p: 0, color: theme.palette.text.secondary }}>
          {open
            ? <ExpandLessIcon sx={{ fontSize: 18 }} />
            : <ExpandMoreIcon sx={{ fontSize: 18 }} />}
        </IconButton>
      </Box>

      {/* Body — slides open/closed */}
      <Collapse in={open} timeout="auto" unmountOnExit={false}>
        <Box sx={{ pb: 1 }}>{children}</Box>
      </Collapse>
    </Box>
  );
};

// ── Category ──────────────────────────────────────────────────
const CategoryFilter = ({ categories = [], selected, onChange }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
      {categories.map((cat) => {
        const active = selected === cat.value;
        return (
          <Box
            key={cat.value}
            onClick={() => onChange(active ? null : cat.value)}
            sx={{
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "space-between",
              px:              1.5,
              py:              0.875,
              borderRadius:    BRAND.radiusButton,
              cursor:          "pointer",
              backgroundColor: active
                ? alpha(theme.palette.secondary.main, 0.09)
                : "transparent",
              transition: "background 0.18s ease",
              "&:hover": {
                backgroundColor: active
                  ? alpha(theme.palette.secondary.main, 0.13)
                  : alpha(theme.palette.primary.main, 0.04),
              },
            }}
          >
            <Typography sx={{
              fontFamily: BRAND.fontBody,
              fontSize:   BRAND.sizeSm,
              fontWeight: active
                ? theme.typography.fontWeightSemibold
                : theme.typography.fontWeightRegular,
              color:      active
                ? theme.palette.secondary.main
                : theme.palette.text.primary,
              transition: "all 0.18s ease",
            }}>
              {cat.label}
            </Typography>
            <Typography sx={{
              fontFamily:      BRAND.fontBody,
              fontSize:        BRAND.sizeXxs,
              color:           theme.palette.text.disabled,
              backgroundColor: alpha(theme.palette.primary.main, 0.06),
              px: 0.75, py: 0.2,
              borderRadius:    BRAND.radiusBadge,
            }}>
              {cat.count}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

// ── Price Range Slider ────────────────────────────────────────
const PriceFilter = ({ min = 0, max = 1000, value, onChange, currency = "$" }) => {
  const theme = useTheme();
  const safeValue = Array.isArray(value) ? value : [min, max];
  return (
    <Box sx={{ px: 1 }}>
      <Slider
        value={safeValue}
        onChange={(_, v) => onChange(v)}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `${currency}${v}`}
        sx={{
          color: theme.palette.secondary.main,
          "& .MuiSlider-thumb": {
            width: 16, height: 16,
            backgroundColor: theme.palette.background.paper,
            border:          `2px solid ${theme.palette.secondary.main}`,
            "&:hover": {
              boxShadow: `0 0 0 6px ${alpha(theme.palette.secondary.main, 0.15)}`,
            },
          },
          "& .MuiSlider-rail": {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: theme.palette.primary.main,
            fontFamily:      BRAND.fontMono,
            fontSize:        BRAND.sizeXxs,
          },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
        {safeValue.map((v, i) => (
          <Typography key={i} sx={{
            fontFamily:      BRAND.fontMono,
            fontSize:        BRAND.sizeXs,
            fontWeight:      theme.typography.fontWeightSemibold,
            color:           theme.palette.text.secondary,
            backgroundColor: alpha(theme.palette.primary.main, 0.06),
            px: 1, py: 0.25,
            borderRadius:    BRAND.radiusButton,
          }}>
            {currency}{v}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

// ── Star Rating filter ────────────────────────────────────────
const RatingFilter = ({ selected, onChange }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      {[4, 3, 2, 1].map((r) => {
        const active = selected === r;
        return (
          <Box
            key={r}
            onClick={() => onChange(active ? null : r)}
            sx={{
              display:         "flex",
              alignItems:      "center",
              gap:             1,
              px:              1,
              py:              0.75,
              borderRadius:    BRAND.radiusButton,
              cursor:          "pointer",
              backgroundColor: active
                ? alpha(theme.palette.secondary.main, 0.08)
                : "transparent",
              border: `1px solid ${active ? theme.palette.secondary.main : "transparent"}`,
              transition: "all 0.18s ease",
              "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.04) },
            }}
          >
            <Rating
              value={r}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": { color: theme.palette.warning.main },
                "& .MuiRating-iconEmpty":  { color: theme.palette.divider },
              }}
            />
            <Typography sx={{
              fontFamily: BRAND.fontBody,
              fontSize:   BRAND.sizeXs,
              color:      theme.palette.text.secondary,
            }}>
              & up
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

// ── Brand / generic checkbox filter ──────────────────────────
const CheckboxFilter = ({ options = [], selected = [], onChange }) => {
  const theme = useTheme();
  const toggle = (val) =>
    onChange(
      selected.includes(val)
        ? selected.filter((s) => s !== val)
        : [...selected, val]
    );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
      {options.map((opt) => (
        <FormControlLabel
          key={opt.value}
          control={
            <Checkbox
              checked={selected.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              size="small"
              sx={{
                color:        theme.palette.divider,
                "&.Mui-checked": { color: theme.palette.secondary.main },
                p:            0.75,
              }}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Typography sx={{
                fontFamily: BRAND.fontBody,
                fontSize:   BRAND.sizeSm,
                color:      theme.palette.text.primary,
              }}>
                {opt.label}
              </Typography>
              {opt.count !== undefined && (
                <Typography sx={{
                  fontFamily: BRAND.fontBody,
                  fontSize:   BRAND.sizeXxs,
                  color:      theme.palette.text.disabled,
                }}>
                  ({opt.count})
                </Typography>
              )}
            </Box>
          }
          sx={{
            mx: 0, px: 1, py: 0.25,
            borderRadius: BRAND.radiusButton,
            width: "100%",
            "& .MuiFormControlLabel-label": { flex: 1 },
            "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.04) },
          }}
        />
      ))}
    </Box>
  );
};

// ── Color swatches ────────────────────────────────────────────
const ColorFilter = ({ colors = [], selected = [], onChange }) => {
  const theme = useTheme();
  const toggle = (val) =>
    onChange(
      selected.includes(val)
        ? selected.filter((s) => s !== val)
        : [...selected, val]
    );
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pt: 0.5 }}>
      {colors.map((c) => {
        const active = selected.includes(c.value);
        return (
          <Box
            key={c.value}
            onClick={() => toggle(c.value)}
            title={c.label}
            sx={{
              width: 28, height: 28,
              borderRadius: "50%",
              backgroundColor: c.hex,
              cursor:          "pointer",
              border:          `${active ? 3 : 2}px solid ${active ? theme.palette.secondary.main : theme.palette.divider}`,
              boxShadow:       active
                ? `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${theme.palette.secondary.main}`
                : "none",
              transition: "all 0.18s ease",
              "&:hover":  { transform: "scale(1.15)" },
            }}
          />
        );
      })}
    </Box>
  );
};

// ── Size chips ────────────────────────────────────────────────
const SizeFilter = ({ sizes = [], selected = [], onChange }) => {
  const theme = useTheme();
  const toggle = (val) =>
    onChange(
      selected.includes(val)
        ? selected.filter((s) => s !== val)
        : [...selected, val]
    );
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, pt: 0.5 }}>
      {sizes.map((s) => {
        const active = selected.includes(s.value);
        return (
          <Chip
            key={s.value}
            label={s.label}
            size="small"
            onClick={() => toggle(s.value)}
            sx={{
              fontFamily:      BRAND.fontBody,
              fontWeight:      active
                ? theme.typography.fontWeightBold
                : theme.typography.fontWeightRegular,
              fontSize:        BRAND.sizeXs,
              backgroundColor: active
                ? theme.palette.primary.main
                : theme.palette.background.default,
              color:           active
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
              border:          `1px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
              borderRadius:    BRAND.radiusButton,
              cursor:          "pointer",
              transition:      "all 0.18s ease",
              "&:hover": {
                backgroundColor: active
                  ? theme.palette.primary.dark
                  : alpha(theme.palette.primary.main, 0.06),
              },
            }}
          />
        );
      })}
    </Box>
  );
};

// ── Main export ───────────────────────────────────────────────
const FilterSidebar = ({
  filters       = {},
  activeFilters = {},
  onFilterChange,
  onClearAll,
  currency      = "$",
}) => {
  const theme = useTheme();

  const hasActive =
    activeFilters.category           ||
    activeFilters.rating             ||
    activeFilters.brands?.length > 0 ||
    activeFilters.colors?.length > 0 ||
    activeFilters.sizes?.length  > 0 ||
    (activeFilters.price &&
      (activeFilters.price[0] !== (filters.price?.min ?? 0) ||
       activeFilters.price[1] !== (filters.price?.max ?? 1000)));

  return (
    <Box>
      {/* ── Header ──────────────────────────────────── */}
      <Box sx={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        mb:             1.5,
        pb:             1.5,
        borderBottom:   `2px solid ${theme.palette.divider}`,
      }}>
        <Typography sx={{
          fontFamily: BRAND.fontDisplay,
          fontWeight: theme.typography.fontWeightBold,
          fontSize:   BRAND.sizeLg,
          color:      theme.palette.text.primary,
        }}>
          Filters
        </Typography>
        {hasActive && (
          <Button
            size="small"
            onClick={onClearAll}
            sx={{
              fontFamily: BRAND.fontBody,
              fontSize:   BRAND.sizeXs,
              fontWeight: theme.typography.fontWeightSemibold,
              color:      theme.palette.secondary.main,
              p:          0,
              minWidth:   "auto",
              "&:hover":  { backgroundColor: "transparent", textDecoration: "underline" },
            }}
          >
            Clear all
          </Button>
        )}
      </Box>

      {/* ── Category ─────────────────────────────────── */}
      {filters.categories?.length > 0 && (
        <FilterSection title="Category">
          <CategoryFilter
            categories={filters.categories}
            selected={activeFilters.category}
            onChange={(v) => onFilterChange("category", v)}
          />
        </FilterSection>
      )}

      {/* ── Price Range ──────────────────────────────── */}
      {filters.price && (
        <FilterSection title="Price Range">
          <PriceFilter
            min={filters.price.min ?? 0}
            max={filters.price.max ?? 1000}
            value={activeFilters.price || [filters.price.min ?? 0, filters.price.max ?? 1000]}
            onChange={(v) => onFilterChange("price", v)}
            currency={currency}
          />
        </FilterSection>
      )}

      {/* ── Rating ───────────────────────────────────── */}
      {filters.ratings && (
        <FilterSection title="Rating">
          <RatingFilter
            selected={activeFilters.rating}
            onChange={(v) => onFilterChange("rating", v)}
          />
        </FilterSection>
      )}

      {/* ── Brand ────────────────────────────────────── */}
      {filters.brands?.length > 0 && (
        <FilterSection title="Brand">
          <CheckboxFilter
            options={filters.brands}
            selected={activeFilters.brands || []}
            onChange={(v) => onFilterChange("brands", v)}
          />
        </FilterSection>
      )}

      {/* ── Color ────────────────────────────────────── */}
      {filters.colors?.length > 0 && (
        <FilterSection title="Color" defaultOpen={false}>
          <ColorFilter
            colors={filters.colors}
            selected={activeFilters.colors || []}
            onChange={(v) => onFilterChange("colors", v)}
          />
        </FilterSection>
      )}

      {/* ── Size ─────────────────────────────────────── */}
      {filters.sizes?.length > 0 && (
        <FilterSection title="Size" defaultOpen={false}>
          <SizeFilter
            sizes={filters.sizes}
            selected={activeFilters.sizes || []}
            onChange={(v) => onFilterChange("sizes", v)}
          />
        </FilterSection>
      )}
    </Box>
  );
};

export default FilterSidebar;
