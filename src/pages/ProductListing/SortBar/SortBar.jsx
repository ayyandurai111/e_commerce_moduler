// ─────────────────────────────────────────────────────────────
//  SortBar
//  Props: totalResults, sortBy, onSortChange, viewMode,
//         onViewChange, activeFilters, onOpenMobileFilters
//
//  ZERO hardcoded colors / fonts / sizes / weights
// ─────────────────────────────────────────────────────────────
import React from "react";
import {
  Box, Typography, Select, MenuItem,
  IconButton, Tooltip, FormControl, Chip,
} from "@mui/material";
import GridViewIcon   from "@mui/icons-material/GridView";
import ViewListIcon   from "@mui/icons-material/ViewList";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND } from "../../../theme/theme";

const SORT_OPTIONS = [
  { value: "featured",    label: "Featured"          },
  { value: "newest",      label: "Newest First"      },
  { value: "price_asc",   label: "Price: Low → High" },
  { value: "price_desc",  label: "Price: High → Low" },
  { value: "rating",      label: "Top Rated"         },
  { value: "bestselling", label: "Best Selling"      },
];

const SortBar = ({
  totalResults        = 0,
  sortBy              = "featured",
  onSortChange,
  viewMode            = "grid",
  onViewChange,
  activeFilters       = {},
  onOpenMobileFilters,
}) => {
  const theme = useTheme();

  const activeCount = [
    activeFilters.category,
    activeFilters.rating,
    ...(activeFilters.brands || []),
    ...(activeFilters.colors || []),
    ...(activeFilters.sizes  || []),
  ].filter(Boolean).length;

  // Shared sx for the dropdown
  const selectSx = {
    fontFamily:      BRAND.fontBody,
    fontSize:        BRAND.sizeSm,
    fontWeight:      theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.background.default,
    borderRadius:    BRAND.radiusButton,
    color:           theme.palette.text.primary,
    "& .MuiOutlinedInput-notchedOutline":          { borderColor: theme.palette.divider },
    "&:hover .MuiOutlinedInput-notchedOutline":    { borderColor: theme.palette.secondary.main },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.secondary.main },
    "& .MuiSelect-icon": { color: theme.palette.text.secondary },
  };

  const menuSx = {
    PaperProps: {
      sx: {
        borderRadius: BRAND.radiusCard,
        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
        border: `1px solid ${theme.palette.divider}`,
        mt: 0.5,
        "& .MuiMenuItem-root": {
          fontFamily: BRAND.fontBody,
          fontSize:   BRAND.sizeSm,
          py: 1,
          "&:hover":     { backgroundColor: alpha(theme.palette.secondary.main, 0.07) },
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            color:           theme.palette.secondary.main,
            fontWeight:      theme.typography.fontWeightSemibold,
          },
        },
      },
    },
  };

  return (
    <Box sx={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 1.5, px: 2, py: 1.75,
      borderRadius:    BRAND.radiusCard,
      backgroundColor: theme.palette.background.paper,
      border:          `1px solid ${theme.palette.divider}`,
      mb: 3,
    }}>

      {/* Left — count + mobile filter btn */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ display: { xs: "flex", md: "none" }, position: "relative" }}>
          <IconButton onClick={onOpenMobileFilters} size="small" sx={{
            backgroundColor: activeCount > 0
              ? alpha(theme.palette.secondary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.05),
            color: activeCount > 0 ? theme.palette.secondary.main : theme.palette.text.primary,
            border: `1px solid ${activeCount > 0 ? theme.palette.secondary.main : theme.palette.divider}`,
            borderRadius: BRAND.radiusButton,
            width: 38, height: 38,
          }}>
            <FilterListIcon fontSize="small" />
          </IconButton>
          {activeCount > 0 && (
            <Chip label={activeCount} size="small" sx={{
              position: "absolute", top: -6, right: -6,
              height: 18, minWidth: 18,
              fontSize:        BRAND.sizeXxs,
              fontWeight:      theme.typography.fontWeightBold,
              backgroundColor: theme.palette.secondary.main,
              color:           theme.palette.secondary.contrastText,
              "& .MuiChip-label": { px: 0.5 },
            }} />
          )}
        </Box>

        <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, color: theme.palette.text.secondary }}>
          <Box component="span" sx={{ fontWeight: theme.typography.fontWeightBold, color: theme.palette.text.primary, fontFamily: BRAND.fontMono }}>
            {totalResults.toLocaleString()}
          </Box>
          {" "}results found
        </Typography>
      </Box>

      {/* Right — sort + view toggle */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <FormControl size="small" sx={{ minWidth: 185 }}>
          <Select value={sortBy} onChange={(e) => onSortChange?.(e.target.value)} sx={selectSx} MenuProps={menuSx}>
            {SORT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Grid / List toggle */}
        <Box sx={{
          display: "flex",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: BRAND.radiusButton,
          overflow: "hidden",
        }}>
          {[
            { mode: "grid", Icon: GridViewIcon, tip: "Grid view" },
            { mode: "list", Icon: ViewListIcon, tip: "List view" },
          ].map(({ mode, Icon, tip }) => (
            <Tooltip key={mode} title={tip}>
              <IconButton size="small" onClick={() => onViewChange?.(mode)} sx={{
                borderRadius: 0, width: 36, height: 36,
                backgroundColor: viewMode === mode ? theme.palette.primary.main : "transparent",
                color: viewMode === mode ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: viewMode === mode
                    ? theme.palette.primary.main
                    : alpha(theme.palette.primary.main, 0.06),
                },
              }}>
                <Icon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SortBar;
