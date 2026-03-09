import React from "react";
import { Box, CircularProgress, Typography, Skeleton, Backdrop } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND } from "../../../theme/theme";

const sizeMap = { sm:24, md:44, lg:64 };

const PageLoader = ({ size, text }) => {
  const theme = useTheme();
  return (
    <Box sx={{ minHeight:"60vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3 }}>
      <Box sx={{ position:"relative", width:sizeMap[size]+16, height:sizeMap[size]+16 }}>
        <CircularProgress size={sizeMap[size]+16} thickness={2} sx={{ color:alpha(theme.palette.secondary.main,0.15), position:"absolute", top:0, left:0 }} variant="determinate" value={100} />
        <CircularProgress size={sizeMap[size]+16} thickness={2} sx={{ color:theme.palette.secondary.main, position:"absolute", top:0, left:0 }} />
        <Box sx={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:theme.typography.fontWeightBlack, fontSize:size==="lg"?BRAND.sizeLg:BRAND.sizeSm, color:theme.palette.primary.main, lineHeight:1 }}>L</Typography>
        </Box>
      </Box>
      {text && <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightMedium, color:theme.palette.text.secondary, letterSpacing:"0.04em" }}>{text}</Typography>}
    </Box>
  );
};

const SkeletonLoader = ({ rows=3 }) => (
  <Box sx={{ display:"flex", flexDirection:"column", gap:1.5, width:"100%" }}>
    {Array.from({ length:rows }).map((_,i) => (
      <Box key={i} sx={{ display:"flex", gap:1.5, alignItems:"center" }}>
        {i===0 && <Skeleton variant="rectangular" width={56} height={56} sx={{ borderRadius:2, flexShrink:0 }} />}
        <Box sx={{ flex:1, display:"flex", flexDirection:"column", gap:0.75 }}>
          <Skeleton variant="text" width={i===0?"60%":`${70-i*10}%`} height={16} sx={{ borderRadius:2 }} />
          <Skeleton variant="text" width={`${45-i*5}%`} height={12} sx={{ borderRadius:2 }} />
        </Box>
      </Box>
    ))}
  </Box>
);

const Loader = ({ variant="page", size="md", text=null, rows=3 }) => {
  if (variant==="skeleton") return <SkeletonLoader rows={rows} />;
  return <PageLoader size={size} text={text} />;
};
export default Loader;
