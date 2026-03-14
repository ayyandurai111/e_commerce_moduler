// ─────────────────────────────────────────────────────────────
//  OrderFilters — status filter tabs + search bar
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Tabs, Tab, TextField, InputAdornment } from "@mui/material";
import SearchIcon        from "@mui/icons-material/Search";
import { useTheme }      from "@mui/material/styles";
import { BRAND }         from "../../../theme/theme";

const FILTERS = ["All", "Processing", "Confirmed", "Shipped", "Delivered", "Cancelled"];

const OrderFilters = ({ activeFilter = "All", onFilterChange, searchQuery = "", onSearchChange, sx = {} }) => {
  const theme   = useTheme();
  const tabIdx  = FILTERS.indexOf(activeFilter);

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:1.5, ...sx }}>
      {/* Status tabs */}
      <Box sx={{
        border:       `1px solid ${theme.palette.divider}`,
        borderRadius: BRAND.radiusCard,
        bgcolor:      theme.palette.background.paper,
        overflow:     "hidden",
      }}>
        <Tabs
          value={tabIdx < 0 ? 0 : tabIdx}
          onChange={(_, i) => onFilterChange?.(FILTERS[i])}
          variant="scrollable" scrollButtons="auto"
          TabIndicatorProps={{ sx:{ bgcolor:theme.palette.secondary.main, height:2.5 } }}
          sx={{ minHeight:44, "& .MuiTab-root":{ fontFamily:BRAND.fontBody, fontSize:{ xs:"0.7rem", sm:BRAND.sizeXs }, textTransform:"none", minHeight:44, px:{ xs:1.5, md:2.5 }, fontWeight:500, color:theme.palette.text.secondary, "&.Mui-selected":{ color:theme.palette.text.primary, fontWeight:700 } } }}
        >
          {FILTERS.map(f => <Tab key={f} label={f} />)}
        </Tabs>
      </Box>

      {/* Search */}
      <TextField
        placeholder="Search by order ID or product name…"
        value={searchQuery}
        onChange={e=>onSearchChange?.(e.target.value)}
        size="small"
        InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize:18, color:theme.palette.text.disabled }} />
            </InputAdornment>
          ),
          sx:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, borderRadius:BRAND.radiusButton },
        }}
        sx={{
          "& .MuiOutlinedInput-root":{ bgcolor:theme.palette.background.paper },
          "& fieldset":{ borderColor:theme.palette.divider },
          "&:hover fieldset":{ borderColor:theme.palette.primary.main },
        }}
      />
    </Box>
  );
};

export default OrderFilters;
