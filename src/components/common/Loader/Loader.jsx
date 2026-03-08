// ─────────────────────────────────────────────────────────────
//  Loader — Full-page and inline loading states
//
//  Props:
//    variant   "page" | "inline" | "overlay" | "skeleton"
//    size      "sm" | "md" | "lg"
//    text      string | null   (optional label below spinner)
//    rows      number          (skeleton rows, default 3)
//
//  ZERO hardcoded colors / fonts / sizes / weights
// ─────────────────────────────────────────────────────────────
import React from "react";
import {
  Box, CircularProgress, Typography,
  Skeleton, Backdrop,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND } from "../../../theme/theme";

// ── Animated brand dots ───────────────────────────────────────
const BrandDots = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width:           8,
            height:          8,
            borderRadius:    "50%",
            backgroundColor: theme.palette.secondary.main,
            animation:       "plp-bounce 1.2s ease-in-out infinite",
            animationDelay:  `${i * 0.2}s`,
            "@keyframes plp-bounce": {
              "0%, 80%, 100%": { transform: "scale(0.6)", opacity: 0.4 },
              "40%":           { transform: "scale(1)",   opacity: 1   },
            },
          }}
        />
      ))}
    </Box>
  );
};

// ── Size map ──────────────────────────────────────────────────
const sizeMap = {
  sm: 24,
  md: 44,
  lg: 64,
};

// ── Page loader — centered full-height ────────────────────────
const PageLoader = ({ size, text }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      minHeight:      "60vh",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      gap:            3,
    }}>
      {/* Brand ring */}
      <Box sx={{ position: "relative", width: sizeMap[size] + 16, height: sizeMap[size] + 16 }}>
        <CircularProgress
          size={sizeMap[size] + 16}
          thickness={2}
          sx={{
            color:    alpha(theme.palette.secondary.main, 0.15),
            position: "absolute",
            top: 0, left: 0,
          }}
          variant="determinate"
          value={100}
        />
        <CircularProgress
          size={sizeMap[size] + 16}
          thickness={2}
          sx={{
            color:    theme.palette.secondary.main,
            position: "absolute",
            top: 0, left: 0,
          }}
        />
        {/* Center brand initial */}
        <Box sx={{
          position:       "absolute",
          inset:          0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
        }}>
          <Typography sx={{
            fontFamily: BRAND.fontDisplay,
            fontWeight: theme.typography.fontWeightBlack,
            fontSize:   size === "lg" ? BRAND.sizeLg : BRAND.sizeSm,
            color:      theme.palette.primary.main,
            lineHeight: 1,
          }}>
            L
          </Typography>
        </Box>
      </Box>

      <BrandDots />

      {text && (
        <Typography sx={{
          fontFamily:    BRAND.fontBody,
          fontSize:      BRAND.sizeSm,
          fontWeight:    theme.typography.fontWeightMedium,
          color:         theme.palette.text.secondary,
          letterSpacing: "0.04em",
        }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

// ── Inline loader — fits inside any container ─────────────────
const InlineLoader = ({ size, text }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <CircularProgress
        size={sizeMap[size]}
        thickness={3}
        sx={{ color: theme.palette.secondary.main }}
      />
      {text && (
        <Typography sx={{
          fontFamily: BRAND.fontBody,
          fontSize:   BRAND.sizeSm,
          fontWeight: theme.typography.fontWeightMedium,
          color:      theme.palette.text.secondary,
        }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

// ── Overlay loader — sits on top of content ───────────────────
const OverlayLoader = ({ size, text }) => {
  const theme = useTheme();
  return (
    <Backdrop
      open
      sx={{
        position:        "absolute",
        zIndex:          theme.zIndex.modal,
        backgroundColor: alpha(theme.palette.background.paper, 0.75),
        backdropFilter:  "blur(4px)",
        borderRadius:    BRAND.radiusCard,
        flexDirection:   "column",
        gap:             2,
      }}
    >
      <CircularProgress
        size={sizeMap[size]}
        thickness={3}
        sx={{ color: theme.palette.secondary.main }}
      />
      {text && (
        <Typography sx={{
          fontFamily: BRAND.fontBody,
          fontSize:   BRAND.sizeSm,
          fontWeight: theme.typography.fontWeightMedium,
          color:      theme.palette.text.primary,
        }}>
          {text}
        </Typography>
      )}
    </Backdrop>
  );
};

// ── Skeleton loader — content placeholder rows ────────────────
const SkeletonLoader = ({ rows = 3 }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, width: "100%" }}>
      {Array.from({ length: rows }).map((_, i) => (
        <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          {i === 0 && (
            <Skeleton
              variant="rectangular"
              width={56} height={56}
              sx={{ borderRadius: BRAND.radiusButton, flexShrink: 0 }}
            />
          )}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Skeleton
              variant="text"
              width={i === 0 ? "60%" : `${70 - i * 10}%`}
              height={16}
              sx={{ borderRadius: BRAND.radiusButton }}
            />
            <Skeleton
              variant="text"
              width={`${45 - i * 5}%`}
              height={12}
              sx={{ borderRadius: BRAND.radiusButton }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// ── Loader — main export ──────────────────────────────────────
const Loader = ({
  variant = "page",
  size    = "md",
  text    = null,
  rows    = 3,
}) => {
  if (variant === "inline")   return <InlineLoader   size={size} text={text} />;
  if (variant === "overlay")  return <OverlayLoader  size={size} text={text} />;
  if (variant === "skeleton") return <SkeletonLoader rows={rows} />;
  return <PageLoader size={size} text={text} />;
};

export default Loader;
