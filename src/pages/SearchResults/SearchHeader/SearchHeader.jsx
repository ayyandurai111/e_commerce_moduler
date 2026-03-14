// ─────────────────────────────────────────────────────────────
//  SearchHeader — shows query, result count, sort select
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Select, MenuItem, Chip } from "@mui/material";
import SortIcon     from "@mui/icons-material/Sort";
import { useTheme } from "@mui/material/styles";
import { BRAND }    from "../../../theme/theme";

const SORT_OPTIONS = [
  { value:"relevance",  label:"Most Relevant"   },
  { value:"price_asc",  label:"Price: Low–High" },
  { value:"price_desc", label:"Price: High–Low" },
  { value:"rating",     label:"Top Rated"       },
  { value:"newest",     label:"Newest First"    },
];

const SearchHeader = ({ query = "", totalResults = 0, sort = "relevance", onSortChange, filters = [], onRemoveFilter, sx = {} }) => {
  const theme = useTheme();

  return (
    <Box sx={{ ...sx }}>
      <Box sx={{ display:"flex", alignItems:{ xs:"flex-start", sm:"center" }, justifyContent:"space-between", flexDirection:{ xs:"column", sm:"row" }, gap:1.5, mb: filters.length ? 1.5 : 0 }}>
        <Box>
          <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:{ xs:"1.4rem", md:"2rem" }, color:theme.palette.text.primary, lineHeight:1.2 }}>
            {query ? (
              <>Search: <Box component="span" sx={{ color:theme.palette.secondary.main }}>"{query}"</Box></>
            ) : "Search Results"}
          </Typography>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, mt:0.4 }}>
            {totalResults > 0 ? `${totalResults.toLocaleString("en-IN")} product${totalResults !== 1 ? "s" : ""} found` : "No results found"}
          </Typography>
        </Box>

        {totalResults > 0 && (
          <Box sx={{ display:"flex", alignItems:"center", gap:1, flexShrink:0 }}>
            <SortIcon sx={{ fontSize:18, color:theme.palette.text.secondary }} />
            <Select
              value={sort}
              onChange={e=>onSortChange?.(e.target.value)}
              size="small"
              sx={{
                fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs,
                "& .MuiOutlinedInput-notchedOutline":{ borderColor:theme.palette.divider },
                "& .MuiSelect-select":{ py:0.9, pr:"28px !important" },
              }}
            >
              {SORT_OPTIONS.map(o=>(
                <MenuItem key={o.value} value={o.value} sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs }}>{o.label}</MenuItem>
              ))}
            </Select>
          </Box>
        )}
      </Box>

      {/* Active filter chips */}
      {filters.length > 0 && (
        <Box sx={{ display:"flex", flexWrap:"wrap", gap:0.75 }}>
          {filters.map((f, i) => (
            <Chip
              key={i}
              label={f}
              size="small"
              onDelete={()=>onRemoveFilter?.(f)}
              sx={{
                fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:500,
                bgcolor:theme.palette.background.paper,
                border:`1px solid ${theme.palette.divider}`,
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchHeader;
