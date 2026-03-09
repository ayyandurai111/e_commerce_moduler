// ─────────────────────────────────────────────────────────────
//  VariantSelector — color swatches + size chips
//
//  Responsive behaviour:
//    xs  — swatches 30px, chips compact, wrapping flex rows
//    md+ — swatches 34px, chips slightly larger
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Tooltip, Chip } from "@mui/material";
import CheckIcon           from "@mui/icons-material/Check";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";

const SWATCH_MAP = {
  black:"#1a1a1a", white:"#f5f5f5", silver:"#c0c0c0", gold:"#c9a84c",
  navy:"#001f5b", blue:"#1565c0", red:"#c62828", green:"#2e7d32",
  pink:"#e91e63", purple:"#6a1b9a", orange:"#e65100", yellow:"#f9a825",
  grey:"#9e9e9e", gray:"#9e9e9e", tan:"#d2b48c", cream:"#fffdd0",
  brown:"#7b5335", olive:"#6b7c4c", champagne:"#f7e7ce",
  "rose gold":"#b76e79", "space gray":"#4a4a4a", midnight:"#191970",
  starlight:"#f0ebe3", rosegold:"#b76e79", floral:"#f093fb", camel:"#c19a6b",
};

const resolveHex = (name) => SWATCH_MAP[name?.toLowerCase()] ?? "#cccccc";
const isLight = (hex="#000") => {
  const c = hex.replace("#","");
  if (c.length < 6) return false;
  const r=parseInt(c.substring(0,2),16), g=parseInt(c.substring(2,4),16), b=parseInt(c.substring(4,6),16);
  return (0.299*r + 0.587*g + 0.114*b)/255 > 0.62;
};

const LabelRow = ({ title, value }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display:"flex", alignItems:"baseline", gap:1, mb:{ xs:1, md:1.25 } }}>
      <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, letterSpacing:"0.08em", color:theme.palette.text.secondary, textTransform:"uppercase" }}>
        {title}
      </Typography>
      {value && (
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightSemibold, color:theme.palette.text.primary, textTransform:"capitalize" }}>
          {value}
        </Typography>
      )}
    </Box>
  );
};

const VariantSelector = ({ variants, selected = {}, onColorChange, onSizeChange, sx = {} }) => {
  const theme = useTheme();
  const colors = variants?.colors ?? [];
  const sizes  = variants?.sizes  ?? [];
  if (!colors.length && !sizes.length) return null;

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:{ xs:2, md:2.5 }, ...sx }}>

      {/* Colors */}
      {colors.length > 0 && (
        <Box>
          <LabelRow title="Color" value={selected?.color} />
          <Box sx={{ display:"flex", flexWrap:"wrap", gap:{ xs:0.75, md:1 } }}>
            {colors.map(name => {
              const hex      = resolveHex(name);
              const isActive = selected?.color === name;
              const light    = isLight(hex);
              return (
                <Tooltip key={name} title={name} placement="top">
                  <Box role="button" aria-label={`Color: ${name}`} aria-pressed={isActive} tabIndex={0}
                    onClick={() => onColorChange?.(name)}
                    onKeyDown={(e) => e.key === "Enter" && onColorChange?.(name)}
                    sx={{ width:{ xs:30, md:34 }, height:{ xs:30, md:34 }, borderRadius:"50%", bgcolor:hex, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                      border: isActive ? `3px solid ${theme.palette.secondary.main}` : `2px solid ${theme.palette.divider}`,
                      boxShadow: isActive ? `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${theme.palette.secondary.main}` : "none",
                      transition:"all 0.2s ease", userSelect:"none",
                      "&:hover":{ transform:"scale(1.12)", borderColor:theme.palette.secondary.main },
                    }}>
                    {isActive && <CheckIcon sx={{ fontSize:{ xs:12, md:14 }, color:light?theme.palette.primary.main:theme.palette.primary.contrastText }} />}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Sizes */}
      {sizes.length > 0 && (
        <Box>
          <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:{ xs:1, md:1.25 } }}>
            <LabelRow title="Size" value={selected?.size} />
            <Typography component="span" sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightSemibold, color:theme.palette.secondary.main, cursor:"pointer", "&:hover":{ textDecoration:"underline" } }}>
              Size Guide
            </Typography>
          </Box>
          <Box sx={{ display:"flex", flexWrap:"wrap", gap:{ xs:0.75, md:1 } }}>
            {sizes.map(size => {
              const isActive = selected?.size === size;
              return (
                <Chip key={size} label={size} clickable onClick={()=>onSizeChange?.(size)} size="small"
                  sx={{ fontFamily:BRAND.fontBody, fontSize:{ xs:BRAND.sizeXxs, sm:BRAND.sizeXs }, fontWeight:isActive?theme.typography.fontWeightBold:theme.typography.fontWeightRegular,
                    height:{ xs:32, md:38 }, minWidth:{ xs:38, md:44 }, borderRadius:BRAND.radiusButton,
                    bgcolor:    isActive?theme.palette.primary.main:theme.palette.background.default,
                    color:      isActive?theme.palette.primary.contrastText:theme.palette.text.primary,
                    border:     `1.5px solid ${isActive?theme.palette.primary.main:theme.palette.divider}`,
                    transition: "all 0.2s ease",
                    "&:hover":  { borderColor:theme.palette.primary.main, bgcolor:isActive?theme.palette.primary.main:alpha(theme.palette.primary.main,0.06) },
                    "& .MuiChip-label":{ px:{ xs:1, md:1.25 } },
                  }}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default VariantSelector;
