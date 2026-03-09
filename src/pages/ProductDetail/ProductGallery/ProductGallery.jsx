// ─────────────────────────────────────────────────────────────
//  ProductGallery — responsive image gallery
//
//  Responsive behaviour:
//    xs / sm  — full-width hero + dot indicators below
//    md+      — hero image + horizontal thumbnail strip
//    lg+      — larger hero, bigger thumbnails
//
//  Features:
//    • Fade transition on image switch
//    • CSS hover-zoom (no external deps)
//    • Prev / next arrow navigation
//    • Touch-friendly dot indicators (mobile)
//    • Scrollable thumbnail strip (desktop)
//    • Skeleton shimmer while loading
// ─────────────────────────────────────────────────────────────
import React, { useState, useCallback } from "react";
import { Box, IconButton, Typography, Fade } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ZoomInIcon          from "@mui/icons-material/ZoomIn";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";

const FALLBACK = "https://picsum.photos/seed/product/800/800";

const ProductGallery = ({ images = [], alt = "Product", sx = {} }) => {
  const theme = useTheme();
  const safeImages = images?.length > 0 ? images : [FALLBACK];

  const [active,     setActive]     = useState(0);
  const [loaded,     setLoaded]     = useState(false);
  const [zoomed,     setZoomed]     = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const switchTo = useCallback((idx) => {
    setLoaded(false);
    setActive(idx);
    setZoomed(false);
  }, []);

  const goPrev = () => switchTo(active === 0 ? safeImages.length - 1 : active - 1);
  const goNext = () => switchTo(active === safeImages.length - 1 ? 0 : active + 1);

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: ((e.clientX - r.left) / r.width)  * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
    });
  };

  const arrowSx = (side) => ({
    position:  "absolute",
    top:       "50%",
    [side]:    10,
    transform: "translateY(-50%)",
    bgcolor:   alpha(theme.palette.background.paper, 0.92),
    backdropFilter: "blur(6px)",
    border:    `1px solid ${theme.palette.divider}`,
    width:     { xs: 32, md: 36 },
    height:    { xs: 32, md: 36 },
    zIndex:    2,
    transition:"all 0.2s ease",
    "&:hover": {
      bgcolor:      theme.palette.background.paper,
      borderColor:  theme.palette.secondary.main,
      transform:    "translateY(-50%) scale(1.06)",
    },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 }, ...sx }}>

      {/* ── Hero image ─────────────────────────────────── */}
      <Box
        sx={{
          position:     "relative",
          width:        "100%",
          // Responsive aspect ratio
          aspectRatio:  { xs: "4 / 4", sm: "4 / 4.2", md: "1 / 1" },
          borderRadius: { xs: BRAND.radiusButton, sm: BRAND.radiusCard },
          overflow:     "hidden",
          bgcolor:      theme.palette.background.default,
          border:       `1px solid ${theme.palette.divider}`,
          cursor:       zoomed ? "zoom-out" : "zoom-in",
        }}
        onClick={() => setZoomed(z => !z)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomed(false)}
      >
        {/* Shimmer */}
        {!loaded && (
          <Box sx={{ position:"absolute", inset:0, bgcolor:theme.palette.background.default, animation:"pdp-pulse 1.4s ease-in-out infinite", "@keyframes pdp-pulse":{ "0%,100%":{ opacity:1 }, "50%":{ opacity:0.45 } } }} />
        )}

        <Fade in={loaded} timeout={350}>
          <Box
            component="img"
            src={safeImages[active]}
            alt={`${alt} — image ${active + 1}`}
            onLoad={()  => setLoaded(true)}
            onError={(e)=> { e.target.src = FALLBACK; setLoaded(true); }}
            sx={{
              width:     "100%",
              height:    "100%",
              objectFit: "cover",
              display:   "block",
              userSelect:"none",
              pointerEvents: "none",
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              transform:  zoomed ? "scale(2.2)" : "scale(1)",
              transition: zoomed ? "transform 0.08s ease" : "transform 0.35s ease",
            }}
          />
        </Fade>

        {/* Arrows — shown on md+ always, on xs/sm only when >1 image */}
        {safeImages.length > 1 && (
          <>
            <IconButton size="small" onClick={(e)=>{ e.stopPropagation(); goPrev(); }} sx={arrowSx("left")}  aria-label="Previous image"><ArrowBackIosNewIcon  sx={{ fontSize:{ xs:11, md:13 }, color:theme.palette.primary.main }} /></IconButton>
            <IconButton size="small" onClick={(e)=>{ e.stopPropagation(); goNext(); }} sx={arrowSx("right")} aria-label="Next image"><ArrowForwardIosIcon sx={{ fontSize:{ xs:11, md:13 }, color:theme.palette.primary.main }} /></IconButton>
          </>
        )}

        {/* Zoom hint — desktop only */}
        {!zoomed && (
          <Box sx={{ display:{ xs:"none", md:"flex" }, position:"absolute", bottom:10, right:10, bgcolor:alpha(theme.palette.background.paper,0.88), backdropFilter:"blur(4px)", borderRadius:BRAND.radiusButton, p:0.75, opacity:0.8, border:`1px solid ${theme.palette.divider}`, pointerEvents:"none", alignItems:"center", gap:0.5 }}>
            <ZoomInIcon sx={{ fontSize:14, color:theme.palette.text.secondary }} />
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:"0.6rem", color:theme.palette.text.secondary }}>Hover to zoom</Typography>
          </Box>
        )}

        {/* Image counter badge */}
        {safeImages.length > 1 && (
          <Box sx={{ position:"absolute", bottom:10, left:10, bgcolor:alpha(theme.palette.primary.main,0.72), backdropFilter:"blur(4px)", color:"#fff", fontFamily:BRAND.fontBody, fontWeight:600, fontSize:BRAND.sizeXxs, letterSpacing:"0.06em", borderRadius:BRAND.radiusButton, px:1.25, py:0.4 }}>
            {active + 1} / {safeImages.length}
          </Box>
        )}
      </Box>

      {/* ── Thumbnails — md+ ───────────────────────────── */}
      {safeImages.length > 1 && (
        <Box sx={{
          display:   { xs: "none", md: "flex" },
          gap:       { md: 1, lg: 1.25 },
          overflowX: "auto",
          pb:        0.5,
          scrollbarWidth: "thin",
          scrollbarColor: `${theme.palette.divider} transparent`,
          "&::-webkit-scrollbar":       { height: 4 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: theme.palette.divider, borderRadius: 2 },
        }}>
          {safeImages.map((img, idx) => (
            <Box
              key={idx}
              onClick={() => switchTo(idx)}
              sx={{
                flexShrink:  0,
                width:       { md: 68, lg: 80, xl: 88 },
                height:      { md: 68, lg: 80, xl: 88 },
                borderRadius: BRAND.radiusButton,
                overflow:    "hidden",
                cursor:      "pointer",
                border:      `2px solid ${idx === active ? theme.palette.secondary.main : theme.palette.divider}`,
                bgcolor:     theme.palette.background.default,
                transition:  "all 0.2s ease",
                "&:hover":   { borderColor: alpha(theme.palette.secondary.main, 0.6), transform:"scale(1.04)" },
              }}
            >
              <Box component="img" src={img} alt={`Thumbnail ${idx + 1}`} onError={(e)=>{ e.target.src=FALLBACK; }}
                sx={{ width:"100%", height:"100%", objectFit:"cover", display:"block", opacity:idx===active?1:0.6, transition:"opacity 0.2s ease" }} />
            </Box>
          ))}
        </Box>
      )}

      {/* ── Mobile dot indicators — xs/sm ─────────────── */}
      {safeImages.length > 1 && (
        <Box sx={{ display:{ xs:"flex", md:"none" }, justifyContent:"center", gap:0.75 }}>
          {safeImages.map((_, idx) => (
            <Box key={idx} onClick={()=>switchTo(idx)} sx={{ width:idx===active?22:8, height:8, borderRadius:"4px", bgcolor:idx===active?theme.palette.secondary.main:alpha(theme.palette.primary.main,0.25), transition:"all 0.3s ease", cursor:"pointer" }} />
          ))}
        </Box>
      )}
    </Box>
  );
};
export default ProductGallery;
