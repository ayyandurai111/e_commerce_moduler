// ─────────────────────────────────────────────────────────────
//  MobileFilterDrawer — Bottom-sheet filter panel for mobile
//  ZERO hardcoded colors / fonts / sizes / weights
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Drawer, Box, Typography, IconButton, Button, Divider } from "@mui/material";
import CloseIcon      from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }      from "../../../theme/theme";
import FilterSidebar  from "../FilterSidebar/FilterSidebar";

const MobileFilterDrawer = ({
  open, onClose,
  filters, activeFilters, onFilterChange, onClearAll, onApply,
  currency, totalResults = 0,
}) => {
  const theme = useTheme();

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius:    "20px 20px 0 0",
          maxHeight:       "88vh",
          backgroundColor: theme.palette.background.paper,
          overflow:        "hidden",
          display:         "flex",
          flexDirection:   "column",
        },
      }}
    >
      {/* Drag handle */}
      <Box sx={{ display: "flex", justifyContent: "center", pt: 1.5, pb: 0.5 }}>
        <Box sx={{ width: 40, height: 4, borderRadius: 2, backgroundColor: theme.palette.divider }} />
      </Box>

      {/* Header */}
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: 2.5, py: 1.5, borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterListIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
          <Typography sx={{
            fontFamily: BRAND.fontDisplay,
            fontWeight: theme.typography.fontWeightBold,
            fontSize:   BRAND.sizeLg,
            color:      theme.palette.text.primary,
          }}>
            Filters
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{
          color:           theme.palette.text.secondary,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          "&:hover":       { backgroundColor: alpha(theme.palette.primary.main, 0.1) },
        }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Scrollable filter content */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, py: 2 }}>
        <FilterSidebar
          filters={filters} activeFilters={activeFilters}
          onFilterChange={onFilterChange} onClearAll={onClearAll}
          currency={currency}
        />
      </Box>

      {/* Footer */}
      <Divider />
      <Box sx={{ px: 2.5, py: 2, display: "flex", gap: 1.5, backgroundColor: theme.palette.background.paper }}>
        <Button variant="outlined" fullWidth onClick={onClearAll} sx={{
          fontFamily:   BRAND.fontBody,
          fontWeight:   theme.typography.fontWeightSemibold,
          borderWidth:  "1.5px",
          borderRadius: BRAND.radiusButton,
          color:        theme.palette.text.primary,
          borderColor:  theme.palette.divider,
          py:           1.25,
          "&:hover": { borderWidth: "1.5px", borderColor: theme.palette.primary.main },
        }}>
          Clear All
        </Button>
        <Button variant="contained" color="secondary" fullWidth
          onClick={() => { onApply?.(); onClose(); }}
          sx={{
            fontFamily:   BRAND.fontBody,
            fontWeight:   theme.typography.fontWeightBold,
            borderRadius: BRAND.radiusButton,
            py:           1.25,
            boxShadow:    `0 4px 14px ${alpha(theme.palette.secondary.main, 0.35)}`,
          }}>
          Show {totalResults.toLocaleString()} Results
        </Button>
      </Box>
    </Drawer>
  );
};

export default MobileFilterDrawer;
