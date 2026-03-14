// ─────────────────────────────────────────────────────────────
//  SearchFilters — collapsible filter panels (category, price,
//                  rating, brand). Desktop sidebar / mobile drawer.
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Box, Typography, Checkbox, FormControlLabel, Slider, Divider, Collapse, IconButton, Chip } from "@mui/material";
import ExpandMoreIcon  from "@mui/icons-material/ExpandMore";
import ExpandLessIcon  from "@mui/icons-material/ExpandLess";
import StarIcon        from "@mui/icons-material/Star";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";
import Button              from "../../../components/common/Button/Button";

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Box sx={{ borderBottom:`1px solid ${theme.palette.divider}`, pb:2 }}>
      <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", py:1.5, cursor:"pointer" }} onClick={()=>setOpen(o=>!o)}>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm, color:theme.palette.text.primary }}>
          {title}
        </Typography>
        <IconButton size="small" sx={{ p:0.25, color:theme.palette.text.secondary }}>
          {open ? <ExpandLessIcon sx={{ fontSize:18 }} /> : <ExpandMoreIcon sx={{ fontSize:18 }} />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Box sx={{ pt:0.5 }}>{children}</Box>
      </Collapse>
    </Box>
  );
};

const SearchFilters = ({ filters = {}, activeFilters = {}, onFiltersChange, onReset, sx = {} }) => {
  const theme = useTheme();
  const { categories = [], brands = [], priceRange = [0, 50000], ratings = [5,4,3] } = filters;
  const {
    categories: selCats   = [],
    brands:     selBrands = [],
    priceRange: selPrice  = priceRange,
    minRating:  selRating = 0,
  } = activeFilters;

  const toggleArr = (arr, val) => arr.includes(val) ? arr.filter(v=>v!==val) : [...arr, val];

  return (
    <Box sx={{
      border:       `1px solid ${theme.palette.divider}`,
      borderRadius: BRAND.radiusCard,
      bgcolor:      theme.palette.background.paper,
      p:            { xs:2, md:2.5 },
      ...sx,
    }}>
      {/* Header */}
      <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:1 }}>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm }}>Filters</Typography>
        <Typography onClick={onReset} sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.secondary.main, cursor:"pointer", fontWeight:600, "&:hover":{ textDecoration:"underline" } }}>
          Reset
        </Typography>
      </Box>

      <Box sx={{ display:"flex", flexDirection:"column", gap:0 }}>

        {/* Categories */}
        {categories.length > 0 && (
          <FilterSection title="Category">
            <Box sx={{ display:"flex", flexDirection:"column", gap:0.25 }}>
              {categories.map(cat=>(
                <FormControlLabel key={cat.label}
                  control={<Checkbox size="small" checked={selCats.includes(cat.label)} onChange={()=>onFiltersChange?.({ ...activeFilters, categories:toggleArr(selCats,cat.label) })} sx={{ py:0.5, "&.Mui-checked":{ color:theme.palette.secondary.main } }} />}
                  label={
                    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", flex:1, gap:1 }}>
                      <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.primary }}>{cat.label}</Typography>
                      <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeXxs, color:theme.palette.text.disabled }}>({cat.count})</Typography>
                    </Box>
                  }
                  sx={{ mx:0, width:"100%", "& .MuiFormControlLabel-label":{ flex:1 } }}
                />
              ))}
            </Box>
          </FilterSection>
        )}

        {/* Price range */}
        <FilterSection title="Price Range">
          <Box sx={{ px:1, pt:1 }}>
            <Slider
              value={selPrice}
              onChange={(_, v)=>onFiltersChange?.({ ...activeFilters, priceRange:v })}
              min={priceRange[0]} max={priceRange[1]}
              step={500}
              sx={{ color:theme.palette.secondary.main, "& .MuiSlider-thumb":{ width:16, height:16 }, "& .MuiSlider-rail":{ bgcolor:theme.palette.divider } }}
            />
            <Box sx={{ display:"flex", justifyContent:"space-between", mt:0.5 }}>
              <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>₹{selPrice[0].toLocaleString("en-IN")}</Typography>
              <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>₹{selPrice[1].toLocaleString("en-IN")}</Typography>
            </Box>
          </Box>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Customer Rating">
          <Box sx={{ display:"flex", flexDirection:"column", gap:0.5 }}>
            {ratings.map(r=>(
              <Box key={r} onClick={()=>onFiltersChange?.({ ...activeFilters, minRating:selRating===r?0:r })}
                sx={{ display:"flex", alignItems:"center", gap:1, cursor:"pointer", p:0.75, borderRadius:BRAND.radiusButton, bgcolor:selRating===r?alpha(theme.palette.warning.main,0.08):"transparent", border:`1.5px solid ${selRating===r?theme.palette.warning.main:theme.palette.divider}`, transition:"all 0.15s" }}>
                {Array.from({length:r}).map((_,i)=><StarIcon key={i} sx={{ fontSize:14, color:theme.palette.warning.main }} />)}
                {Array.from({length:5-r}).map((_,i)=><StarIcon key={i+r} sx={{ fontSize:14, color:theme.palette.divider }} />)}
                <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, ml:0.25 }}>& up</Typography>
              </Box>
            ))}
          </Box>
        </FilterSection>

        {/* Brands */}
        {brands.length > 0 && (
          <FilterSection title="Brand" defaultOpen={false}>
            <Box sx={{ display:"flex", flexWrap:"wrap", gap:0.75 }}>
              {brands.map(b=>(
                <Chip key={b} label={b} size="small" clickable onClick={()=>onFiltersChange?.({ ...activeFilters, brands:toggleArr(selBrands,b) })}
                  sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, borderRadius:BRAND.radiusButton, height:26,
                    bgcolor:selBrands.includes(b)?theme.palette.primary.main:theme.palette.background.default,
                    color: selBrands.includes(b)?"#fff":theme.palette.text.primary,
                    border:`1.5px solid ${selBrands.includes(b)?theme.palette.primary.main:theme.palette.divider}`,
                    "& .MuiChip-label":{ px:1 },
                  }} />
              ))}
            </Box>
          </FilterSection>
        )}
      </Box>
    </Box>
  );
};

export default SearchFilters;
