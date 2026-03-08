// ─────────────────────────────────────────────────────────────
//  PLPPagination — Page controls + per-page selector
//  ZERO hardcoded colors / fonts / sizes / weights
// ─────────────────────────────────────────────────────────────
import React from "react";
import {
  Box, Typography, Pagination, Select, MenuItem, FormControl,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND } from "../../../theme/theme";

const PLPPagination = ({
  page           = 1,
  totalPages     = 1,
  totalResults   = 0,
  perPage        = 24,
  perPageOptions = [12, 24, 48, 96],
  onPageChange,
  onPerPageChange,
}) => {
  const theme = useTheme();
  const start = (page - 1) * perPage + 1;
  const end   = Math.min(page * perPage, totalResults);

  return (
    <Box sx={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 2, mt: 4, pt: 3,
      borderTop: `1px solid ${theme.palette.divider}`,
    }}>
      {/* Summary */}
      <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, color: theme.palette.text.secondary }}>
        Showing{" "}
        <Box component="span" sx={{ fontWeight: theme.typography.fontWeightBold, color: theme.palette.text.primary, fontFamily: BRAND.fontMono }}>
          {start}–{end}
        </Box>
        {" "}of{" "}
        <Box component="span" sx={{ fontWeight: theme.typography.fontWeightBold, color: theme.palette.text.primary, fontFamily: BRAND.fontMono }}>
          {totalResults.toLocaleString()}
        </Box>
        {" "}products
      </Typography>

      {/* Page buttons */}
      <Pagination
        count={totalPages} page={page}
        onChange={(_, v) => onPageChange?.(v)}
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            fontFamily:   BRAND.fontBody,
            fontWeight:   theme.typography.fontWeightMedium,
            fontSize:     BRAND.sizeSm,
            color:        theme.palette.text.secondary,
            border:       `1px solid ${theme.palette.divider}`,
            borderRadius: BRAND.radiusButton,
            transition:   "all 0.2s ease",
            "&:hover": {
              backgroundColor: alpha(theme.palette.secondary.main, 0.08),
              borderColor:     theme.palette.secondary.main,
              color:           theme.palette.secondary.main,
            },
          },
          "& .Mui-selected": {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color:           `${theme.palette.primary.contrastText} !important`,
            borderColor:     `${theme.palette.primary.main} !important`,
            fontWeight:      theme.typography.fontWeightBold,
          },
        }}
      />

      {/* Per-page */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, color: theme.palette.text.secondary }}>
          Show
        </Typography>
        <FormControl size="small">
          <Select value={perPage} onChange={(e) => onPerPageChange?.(e.target.value)}
            sx={{
              fontFamily:      BRAND.fontBody,
              fontSize:        BRAND.sizeSm,
              fontWeight:      theme.typography.fontWeightMedium,
              color:           theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
              borderRadius:    BRAND.radiusButton,
              "& .MuiOutlinedInput-notchedOutline":       { borderColor: theme.palette.divider },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.secondary.main },
              "& .MuiSelect-icon": { color: theme.palette.text.secondary },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: BRAND.radiusCard,
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
                  "& .MuiMenuItem-root": {
                    fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm,
                    "&.Mui-selected": {
                      backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                      color:           theme.palette.secondary.main,
                      fontWeight:      theme.typography.fontWeightSemibold,
                    },
                  },
                },
              },
            }}
          >
            {perPageOptions.map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </Select>
        </FormControl>
        <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, color: theme.palette.text.secondary }}>
          per page
        </Typography>
      </Box>
    </Box>
  );
};

export default PLPPagination;
