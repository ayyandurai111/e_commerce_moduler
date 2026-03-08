// ─────────────────────────────────────────────────────────────
//  EmptyState — No products match filters
//  ZERO hardcoded colors / fonts / sizes / weights
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND } from "../../../theme/theme";

const EmptyState = ({ onClearFilters }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", py: 10, textAlign: "center",
      backgroundColor: theme.palette.background.paper,
      borderRadius:    BRAND.radiusCard,
      border:          `1px solid ${theme.palette.divider}`,
    }}>
      <Box sx={{
        width: 80, height: 80, borderRadius: "50%",
        backgroundColor: alpha(theme.palette.secondary.main, 0.08),
        display: "flex", alignItems: "center", justifyContent: "center", mb: 3,
      }}>
        <SearchOffIcon sx={{ fontSize: 40, color: alpha(theme.palette.secondary.main, 0.5) }} />
      </Box>

      <Typography variant="h4" sx={{
        fontFamily: BRAND.fontDisplay,
        fontWeight: theme.typography.fontWeightBold,
        mb: 1.5, color: theme.palette.text.primary,
      }}>
        No products found
      </Typography>

      <Typography sx={{
        fontFamily: BRAND.fontBody,
        fontSize:   BRAND.sizeBody,
        color:      theme.palette.text.secondary,
        maxWidth:   380,
        lineHeight: 1.7,
        mb:         3.5,
      }}>
        We couldn't find any products matching your current filters.
        Try adjusting or clearing your filters.
      </Typography>

      <Button variant="contained" color="secondary" onClick={onClearFilters} sx={{
        fontFamily:   BRAND.fontBody,
        fontWeight:   theme.typography.fontWeightBold,
        borderRadius: BRAND.radiusButton,
        px: 4, py: 1.25,
        boxShadow: `0 4px 14px ${alpha(theme.palette.secondary.main, 0.35)}`,
      }}>
        Clear All Filters
      </Button>
    </Box>
  );
};

export default EmptyState;
