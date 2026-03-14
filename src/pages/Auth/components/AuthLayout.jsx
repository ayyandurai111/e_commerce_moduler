// ─────────────────────────────────────────────────────────────
//  AuthLayout.jsx
//  Shared shell for all auth pages.
//
//  Desktop: left brand-panel (40%) + right form-panel (60%)
//  Mobile:  form only — brand panel collapses to a top logo strip
//
//  Props:
//    storeName   string
//    tagline     string
//    heroQuote   string
//    heroImage   string (optional background URL)
//    onLogoClick ()=>   — navigate home
//    children    ReactNode — the form content
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme, alpha }            from "@mui/material/styles";
import { BRAND }                      from "../../../theme/theme";
import storeConfig                   from "../../../config/store/storeConfig";

const AuthLayout = ({
  storeName  = storeConfig.name,
  tagline    = storeConfig.tagline,
  heroQuote  = "Luxury is not a necessity to me, but beautiful and good things are.",
  heroAuthor = "Anais Nin",
  heroImage  = null,
  onLogoClick,
  children,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight:"100vh", display:"flex" }}>

      {/* ── Left brand panel (md+) ───────────────────── */}
      <Box sx={{
        display:       { xs:"none", md:"flex" },
        flexDirection: "column",
        justifyContent:"space-between",
        width:         "42%",
        flexShrink:    0,
        position:      "relative",
        overflow:      "hidden",
        background:    heroImage
          ? `url(${heroImage}) center/cover no-repeat`
          : `linear-gradient(160deg, ${theme.palette.primary.main} 0%, #2d1b4e 50%, ${alpha(theme.palette.secondary.main,0.85)} 100%)`,
        p:             { md:5, lg:6 },
      }}>
        {/* Overlay for readability over image */}
        {heroImage && (
          <Box sx={{
            position:"absolute", inset:0,
            background:`linear-gradient(160deg,${alpha(theme.palette.primary.main,0.88)} 0%,${alpha("#2d1b4e",0.72)} 60%,${alpha(theme.palette.secondary.main,0.55)} 100%)`,
          }} />
        )}

        {/* Decorative circles */}
        <Box sx={{ position:"absolute", top:-80, right:-80, width:320, height:320, borderRadius:"50%", border:`1px solid ${alpha("#fff",0.07)}`, pointerEvents:"none" }} />
        <Box sx={{ position:"absolute", bottom:-60, left:-60, width:260, height:260, borderRadius:"50%", border:`1px solid ${alpha("#fff",0.05)}`, pointerEvents:"none" }} />
        <Box sx={{ position:"absolute", bottom:100, right:-40, width:180, height:180, borderRadius:"50%", bgcolor:alpha(theme.palette.secondary.main,0.12), pointerEvents:"none" }} />

        {/* Logo */}
        <Box sx={{ position:"relative", zIndex:1, cursor:"pointer" }} onClick={onLogoClick}>
          <Typography sx={{
            fontFamily:    BRAND.fontDisplay,
            fontWeight:    900,
            fontSize:      "1.75rem",
            letterSpacing: "0.06em",
            color:         "#fff",
            lineHeight:    1,
          }}>
            {storeName}
          </Typography>
          <Typography sx={{
            fontFamily: BRAND.fontBody,
            fontSize:   BRAND.sizeXs,
            color:      alpha("#fff", 0.55),
            mt:         0.5,
            letterSpacing:"0.04em",
          }}>
            {tagline}
          </Typography>
        </Box>

        {/* Hero quote */}
        <Box sx={{ position:"relative", zIndex:1 }}>
          <Box sx={{
            width:  40,
            height: 3,
            bgcolor:theme.palette.secondary.main,
            mb:     2.5,
            borderRadius:2,
          }} />
          <Typography sx={{
            fontFamily: BRAND.fontDisplay,
            fontWeight: 700,
            fontSize:   { md:"1.35rem", lg:"1.6rem" },
            color:      "#fff",
            lineHeight: 1.5,
            fontStyle:  "italic",
            mb:         1.5,
          }}>
            "{heroQuote}"
          </Typography>
          <Typography sx={{
            fontFamily:    BRAND.fontBody,
            fontSize:      BRAND.sizeXs,
            color:         alpha("#fff", 0.5),
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            — {heroAuthor}
          </Typography>
        </Box>
      </Box>

      {/* ── Right form panel ─────────────────────────── */}
      <Box sx={{
        flex:           1,
        display:        "flex",
        flexDirection:  "column",
        bgcolor:        theme.palette.background.default,
        overflowY:      "auto",
      }}>
        {/* Mobile logo strip */}
        <Box sx={{
          display:        { xs:"flex", md:"none" },
          alignItems:     "center",
          justifyContent: "center",
          py:             2.5,
          borderBottom:   `1px solid ${theme.palette.divider}`,
          bgcolor:        theme.palette.background.paper,
          cursor:         "pointer",
          flexShrink:     0,
        }} onClick={onLogoClick}>
          <Typography sx={{
            fontFamily:    BRAND.fontDisplay,
            fontWeight:    900,
            fontSize:      "1.4rem",
            letterSpacing: "0.06em",
            color:         theme.palette.primary.main,
          }}>
            {storeName}
          </Typography>
        </Box>

        {/* Form content */}
        <Box sx={{
          flex:           1,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          px:             { xs:2, sm:4 },
          py:             { xs:3, md:5 },
        }}>
          <Box sx={{ width:"100%", maxWidth:480 }}>
            {children}
          </Box>
        </Box>

        {/* Footer note */}
        <Box sx={{
          textAlign:    "center",
          py:           2,
          borderTop:    `1px solid ${theme.palette.divider}`,
          flexShrink:   0,
        }}>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.disabled }}>
            © {new Date().getFullYear()} {storeName}. All rights reserved. &nbsp;·&nbsp; Secured by 256-bit SSL
          </Typography>
        </Box>
      </Box>

    </Box>
  );
};

export default AuthLayout;
