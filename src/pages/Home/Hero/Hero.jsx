import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Typography, Button, Chip, Fade } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon    from "@mui/icons-material/PlayArrow";
import { BRAND } from "../../../theme/theme";

// ── SliderDots ────────────────────────────────────────────────
const SliderDots = ({ count, active, onSelect }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          onClick={() => onSelect(i)}
          sx={{
            width:           active === i ? 28 : 8,
            height:          8,
            borderRadius:    "4px",
            backgroundColor: active === i
              ? theme.palette.secondary.main
              : alpha(theme.palette.primary.contrastText, 0.4),
            cursor:     "pointer",
            transition: "all 0.35s ease",
            "&:hover": {
              backgroundColor: active === i
                ? theme.palette.secondary.main
                : alpha(theme.palette.primary.contrastText, 0.7),
            },
          }}
        />
      ))}
    </Box>
  );
};

// ── CTAButtons ────────────────────────────────────────────────
const CTAButtons = ({ ctaText = "Shop Now", ctaLink = "/shop", secondaryCta = null }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <Button
        variant="contained"
        color="secondary"
        href={ctaLink}
        size="large"
        endIcon={<ArrowForwardIcon />}
        sx={{
          px: 4, py: 1.75,
          fontSize:      "1rem",
          fontWeight:    700,
          fontFamily:    BRAND.fontBody,
          borderRadius:  BRAND.radiusButton,
          boxShadow:     `0 4px 24px ${alpha(theme.palette.secondary.main, 0.45)}`,
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0 8px 32px ${alpha(theme.palette.secondary.main, 0.55)}`,
          },
          transition: "all 0.25s ease",
        }}
      >
        {ctaText}
      </Button>

      {secondaryCta && (
        <Button
          variant="outlined"
          href={secondaryCta.link || "#"}
          size="large"
          startIcon={<PlayArrowIcon />}
          sx={{
            px: 3.5, py: 1.75,
            fontSize:    "0.95rem",
            fontFamily:  BRAND.fontBody,
            borderColor: alpha(theme.palette.primary.contrastText, 0.45),
            color:       theme.palette.primary.contrastText,
            "&:hover": {
              borderColor:     theme.palette.primary.contrastText,
              backgroundColor: alpha(theme.palette.primary.contrastText, 0.12),
            },
            transition: "all 0.25s ease",
          }}
        >
          {secondaryCta.text}
        </Button>
      )}
    </Box>
  );
};

// ── Single Slide ──────────────────────────────────────────────
const HeroSlide = ({ slide = {}, visible = true, ctaText, ctaLink, showBadge, badgeText }) => {
  const theme = useTheme();

  const bgStyle = slide.image
    ? {
        backgroundImage:    `linear-gradient(135deg,
          ${alpha(theme.palette.primary.main, 0.88)} 0%,
          ${alpha(theme.palette.primary.main, 0.55)} 60%,
          ${alpha(theme.palette.primary.main, 0.2)} 100%),
          url(${slide.image})`,
        backgroundSize:     "cover",
        backgroundPosition: "center",
      }
    : {
        background: slide.background ||
          `linear-gradient(135deg,
            ${theme.palette.primary.main} 0%,
            ${theme.palette.primary.light} 50%,
            ${theme.palette.primary.dark} 100%)`,
      };

  return (
    <Fade in={visible} timeout={700}>
      <Box sx={{
        position:      "absolute",
        inset:         0,
        ...bgStyle,
        display:       "flex",
        alignItems:    "center",
        pointerEvents: visible ? "auto" : "none",
      }}>
        {/* Decorative glow circle */}
        <Box sx={{
          position:  "absolute",
          right:     { xs: "-10%", md: "5%" },
          top:       "50%",
          transform: "translateY(-50%)",
          width:     { xs: 300, md: 500, lg: 600 },
          height:    { xs: 300, md: 500, lg: 600 },
          borderRadius: "50%",
          background: `radial-gradient(circle,
            ${alpha(theme.palette.secondary.main, 0.18)} 0%,
            ${alpha(theme.palette.secondary.main, 0.04)} 60%,
            transparent 100%)`,
          pointerEvents: "none",
        }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ maxWidth: { xs: "100%", md: "55%", lg: "50%" } }}>

            {/* Badge */}
            {showBadge && (
              <Chip
                label={slide.badge || badgeText}
                size="small"
                sx={{
                  mb:              2.5,
                  backgroundColor: theme.palette.secondary.main,
                  color:           theme.palette.secondary.contrastText,
                  fontFamily:      BRAND.fontBody,
                  fontWeight:      700,
                  fontSize:        "0.68rem",
                  letterSpacing:   "0.12em",
                  height:          26,
                  borderRadius:    "4px",
                  boxShadow:       `0 2px 12px ${alpha(theme.palette.secondary.main, 0.4)}`,
                  "& .MuiChip-label": { px: 1.5 },
                }}
              />
            )}

            {/* Subtitle */}
            {slide.subtitle && (
              <Typography variant="overline" sx={{
                display:       "block",
                color:         alpha(theme.palette.primary.contrastText, 0.65),
                letterSpacing: "0.15em",
                mb:            1,
                fontSize:      "0.78rem",
                fontFamily:    BRAND.fontBody,
              }}>
                {slide.subtitle}
              </Typography>
            )}

            {/* Title */}
            <Typography variant="h1" sx={{
              color:      theme.palette.primary.contrastText,
              mb:         2.5,
              fontFamily: BRAND.fontDisplay,
              fontSize:   { xs: "2.4rem", sm: "3rem", md: "3.75rem", lg: BRAND.sizeHero },
              fontWeight: 900,
            }}>
              {slide.title || "Luxury Redefined"}
            </Typography>

            {/* Description */}
            {slide.description && (
              <Typography variant="body1" sx={{
                color:      alpha(theme.palette.primary.contrastText, 0.72),
                mb:         4,
                maxWidth:   480,
                lineHeight: 1.7,
                fontSize:   { xs: "0.95rem", md: "1.05rem" },
                fontFamily: BRAND.fontBody,
              }}>
                {slide.description}
              </Typography>
            )}

            <CTAButtons
              ctaText={slide.ctaText || ctaText}
              ctaLink={slide.ctaLink || ctaLink}
              secondaryCta={slide.secondaryCta}
            />

            {/* Stats */}
            {slide.stats && (
              <Box sx={{ display: "flex", gap: 4, mt: 5, flexWrap: "wrap" }}>
                {slide.stats.map((stat) => (
                  <Box key={stat.label}>
                    <Typography sx={{
                      color:      theme.palette.primary.contrastText,
                      fontWeight: 900,
                      fontSize:   "1.75rem",
                      lineHeight: 1,
                      fontFamily: BRAND.fontMono,
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography sx={{
                      color:         alpha(theme.palette.primary.contrastText, 0.5),
                      fontSize:      "0.75rem",
                      letterSpacing: "0.1em",
                      mt:            0.5,
                      fontFamily:    BRAND.fontBody,
                    }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

// ── Hero (main export) ────────────────────────────────────────
const Hero = ({
  enabled = true, slides = [], autoPlay = true, interval = 5000,
  ctaText = "Shop Now", ctaLink = "/shop",
  showBadge = true, badgeText = "NEW COLLECTION",
  minHeight = "90vh",
}) => {
  const theme = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);

  const next = useCallback(() =>
    setActiveSlide((p) => (p + 1) % (slides?.length || 1)),
    [slides?.length]
  );

  useEffect(() => {
    if (!autoPlay || !slides?.length || slides.length < 2) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [autoPlay, interval, next, slides?.length]);

  if (!enabled || !slides?.length) return null;

  return (
    <Box component="section" sx={{
      position:        "relative",
      minHeight:       { xs: "70vh", sm: "80vh", md: minHeight },
      overflow:        "hidden",
      backgroundColor: theme.palette.primary.main,
    }}>
      {slides.map((slide, i) => (
        <HeroSlide
          key={i}
          slide={slide}
          visible={i === activeSlide}
          ctaText={ctaText}
          ctaLink={ctaLink}
          showBadge={showBadge}
          badgeText={badgeText}
        />
      ))}

      {slides.length > 1 && (
        <Box sx={{
          position: "absolute", bottom: { xs: 24, md: 40 },
          left: 0, right: 0,
          display: "flex", justifyContent: "center", zIndex: 5,
        }}>
          <SliderDots count={slides.length} active={activeSlide} onSelect={setActiveSlide} />
        </Box>
      )}

      {/* Scroll indicator */}
      <Box sx={{
        position:       "absolute",
        bottom:         32,
        right:          { xs: 24, md: 48 },
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            0.75,
        zIndex:         5,
      }}>
        <Typography sx={{
          color:           alpha(theme.palette.primary.contrastText, 0.4),
          fontSize:        "0.65rem",
          letterSpacing:   "0.12em",
          writingMode:     "vertical-rl",
          fontFamily:      BRAND.fontBody,
        }}>
          SCROLL
        </Typography>
        <Box sx={{
          width:           1,
          height:          40,
          backgroundColor: alpha(theme.palette.primary.contrastText, 0.2),
          borderRadius:    1,
        }} />
      </Box>
    </Box>
  );
};

export default Hero;
