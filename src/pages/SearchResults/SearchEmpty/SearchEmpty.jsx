import React from "react";
import { Box, Typography } from "@mui/material";
import SearchOffIcon   from "@mui/icons-material/SearchOff";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";
import Button              from "../../../components/common/Button/Button";

const TIPS = [
  "Check the spelling of your search term",
  "Try more general keywords",
  "Browse by category instead",
  "Use fewer or different keywords",
];

const SearchEmpty = ({ query = "", onClearSearch, suggestions = [] }) => {
  const theme = useTheme();
  return (
    <Box sx={{ py:{ xs:6, md:10 }, textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
      <Box sx={{ width:96, height:96, borderRadius:"50%", bgcolor:alpha(theme.palette.primary.main,0.06), display:"flex", alignItems:"center", justifyContent:"center" }}>
        <SearchOffIcon sx={{ fontSize:46, color:theme.palette.text.disabled }} />
      </Box>

      <Box>
        <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:{ xs:"1.25rem", md:"1.6rem" }, color:theme.palette.text.primary, mb:0.75 }}>
          No results for {query ? <Box component="span" sx={{ color:theme.palette.secondary.main }}>"{query}"</Box> : "your search"}
        </Typography>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary, lineHeight:1.75 }}>
          We couldn't find any products matching your search. Try the suggestions below.
        </Typography>
      </Box>

      <Box sx={{ textAlign:"left", bgcolor:theme.palette.background.paper, border:`1px solid ${theme.palette.divider}`, borderRadius:BRAND.radiusCard, p:{ xs:2, md:2.5 }, maxWidth:360, width:"100%" }}>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm, mb:1.25, color:theme.palette.text.primary }}>
          Suggestions
        </Typography>
        <Box sx={{ display:"flex", flexDirection:"column", gap:0.75 }}>
          {TIPS.map((tip,i)=>(
            <Box key={i} sx={{ display:"flex", gap:1, alignItems:"flex-start" }}>
              <Box sx={{ width:5, height:5, borderRadius:"50%", bgcolor:theme.palette.secondary.main, mt:0.7, flexShrink:0 }} />
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, lineHeight:1.6 }}>{tip}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {suggestions.length > 0 && (
        <Box>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:600, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, mb:1 }}>
            Did you mean?
          </Typography>
          <Box sx={{ display:"flex", flexWrap:"wrap", gap:0.75, justifyContent:"center" }}>
            {suggestions.map((s,i)=>(
              <Button key={i} variant="outline" size="sm" onClick={()=>onClearSearch?.(s)}>{s}</Button>
            ))}
          </Box>
        </Box>
      )}

      <Button variant="primary" size="lg" onClick={()=>onClearSearch?.("")}>
        Browse All Products
      </Button>
    </Box>
  );
};

export default SearchEmpty;
