import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Container, Box, Typography, Button,
  IconButton, Badge, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Divider, InputBase, Chip,
} from "@mui/material";
import MenuIcon                from "@mui/icons-material/Menu";
import CloseIcon               from "@mui/icons-material/Close";
import SearchIcon              from "@mui/icons-material/Search";
import FavoriteBorderIcon      from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon       from "@mui/icons-material/PersonOutline";
import HomeOutlinedIcon        from "@mui/icons-material/HomeOutlined";
import StorefrontOutlinedIcon  from "@mui/icons-material/StorefrontOutlined";
import LocalOfferOutlinedIcon  from "@mui/icons-material/LocalOfferOutlined";
import InfoOutlinedIcon        from "@mui/icons-material/InfoOutlined";
import PhoneOutlinedIcon       from "@mui/icons-material/PhoneOutlined";
import FacebookIcon            from "@mui/icons-material/Facebook";
import InstagramIcon           from "@mui/icons-material/Instagram";
import TwitterIcon             from "@mui/icons-material/Twitter";
import { useTheme, alpha }     from "@mui/material/styles";
import useMediaQuery           from "@mui/material/useMediaQuery";
import { BRAND }               from "../../../theme/theme";

// ── Link icon map ─────────────────────────────────────────────
const LINK_ICONS = {
  home:    <HomeOutlinedIcon />,
  shop:    <StorefrontOutlinedIcon />,
  sale:    <LocalOfferOutlinedIcon />,
  about:   <InfoOutlinedIcon />,
  contact: <PhoneOutlinedIcon />,
  default: <StorefrontOutlinedIcon />,
};
const getLinkIcon = (label = "") =>
  LINK_ICONS[label.toLowerCase()] || LINK_ICONS.default;

const SOCIAL_ICONS = {
  facebook:  <FacebookIcon  sx={{ fontSize: 18 }} />,
  instagram: <InstagramIcon sx={{ fontSize: 18 }} />,
  twitter:   <TwitterIcon   sx={{ fontSize: 18 }} />,
};

// ── Logo ──────────────────────────────────────────────────────
const Logo = ({ storeName = "LUXE STORE", logo = null, scrolled = false }) => {
  const theme = useTheme();
  return (
    <Box component="a" href="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
      {logo ? (
        <Box component="img" src={logo} alt={storeName} sx={{ height: 36 }} />
      ) : (
        <Typography sx={{
          fontFamily:    BRAND.fontDisplay,
          fontWeight:    900,
          fontSize:      "1.5rem",
          letterSpacing: "0.05em",
          color:         scrolled
            ? theme.palette.primary.contrastText
            : theme.palette.primary.main,
          transition: "color 0.3s ease",
          lineHeight: 1,
        }}>
          {storeName}
        </Typography>
      )}
    </Box>
  );
};

// ── NavLinks (desktop) ────────────────────────────────────────
const NavLinks = ({ links = [], scrolled = false }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {links.map((link) => (
        <Button
          key={link.label}
          href={link.url || "#"}
          sx={{
            color: scrolled
              ? alpha(theme.palette.primary.contrastText, 0.85)
              : theme.palette.text.primary,
            fontFamily:    BRAND.fontBody,
            fontWeight:    500,
            fontSize:      "0.88rem",
            letterSpacing: "0.02em",
            px: 1.5, py: 0.75,
            borderRadius: 2,
            transition: "all 0.2s ease",
            "&:hover": {
              color:           theme.palette.secondary.main,
              backgroundColor: alpha(theme.palette.secondary.main, 0.07),
            },
          }}
        >
          {link.label}
          {link.badge && (
            <Chip
              label={link.badge}
              size="small"
              sx={{
                ml: 0.75, height: 18, fontSize: "0.6rem", fontWeight: 700,
                backgroundColor: theme.palette.secondary.main,
                color:           theme.palette.secondary.contrastText,
                "& .MuiChip-label": { px: 0.75 },
              }}
            />
          )}
        </Button>
      ))}
    </Box>
  );
};

// ── IconBar ───────────────────────────────────────────────────
const IconBar = ({
  cartCount = 0, wishlistCount = 0,
  showSearch = true, showWishlist = true, showCart = true, showAccount = true,
  scrolled = false,
  onCartClick, onWishlistClick, onAccountClick,
}) => {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const iconColor = scrolled
    ? theme.palette.primary.contrastText
    : theme.palette.primary.main;

  const iconSx = {
    color: iconColor,
    transition: "all 0.2s ease",
    "&:hover": { color: theme.palette.secondary.main, transform: "scale(1.1)" },
  };

  const badgeSx = {
    "& .MuiBadge-badge": { fontSize: "0.6rem", minWidth: 16, height: 16 },
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.25, md: 0.5 } }}>
      {showSearch && !isMobile && (
        <IconButton size="small" sx={iconSx} aria-label="Search">
          <SearchIcon fontSize="small" />
        </IconButton>
      )}
      {showWishlist && (
        <IconButton size="small" sx={iconSx} onClick={onWishlistClick} aria-label="Wishlist">
          <Badge badgeContent={wishlistCount || 0} color="secondary" sx={badgeSx}>
            <FavoriteBorderIcon fontSize="small" />
          </Badge>
        </IconButton>
      )}
      {showCart && (
        <IconButton size="small" sx={iconSx} onClick={onCartClick} aria-label="Cart">
          <Badge badgeContent={cartCount || 0} color="secondary" sx={badgeSx}>
            <ShoppingBagOutlinedIcon fontSize="small" />
          </Badge>
        </IconButton>
      )}
      {showAccount && (
        <IconButton size="small" sx={iconSx} onClick={onAccountClick} aria-label="Account">
          <PersonOutlineIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

// ── MobileDrawer ──────────────────────────────────────────────
const MobileDrawer = ({ open, onClose, links = [], storeName = "LUXE STORE", drawer = {} }) => {
  const theme = useTheme();

  const {
    position            = "left",
    width               = 300,
    background          = theme.palette.primary.main,
    textColor           = theme.palette.primary.contrastText,
    accentColor         = theme.palette.secondary.main,
    linkHoverBg         = alpha(theme.palette.secondary.main, 0.15),
    linkHoverColor      = theme.palette.primary.contrastText,
    dividerColor        = alpha(theme.palette.primary.contrastText, 0.12),
    showLogo            = true,
    logoSize            = "1.4rem",
    headerTagline       = null,
    showSearch          = true,
    searchPlaceholder   = "Search products…",
    showLinkIcons       = true,
    linkFontSize        = "1rem",
    linkFontWeight      = 500,
    linkBorderRadius    = 2,
    showPromoBanner     = false,
    promoBannerText     = "🎉 Free shipping on orders over $50",
    promoBannerBg       = alpha(theme.palette.warning.main, 0.12),
    promoBannerColor    = theme.palette.warning.main,
    showAuthButtons     = true,
    signInLabel         = "Sign In",
    createAccountLabel  = "Create Account",
    onSignIn,
    onCreateAccount,
    showDrawerFooter    = true,
    drawerFooterText    = "© 2025 LUXE STORE",
    showSocialIcons     = true,
    social              = {},
    extraContent        = null,
  } = drawer;

  return (
    <Drawer
      anchor={position}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width,
          background,
          color:          textColor,
          display:        "flex",
          flexDirection:  "column",
          overflowX:      "hidden",
        },
      }}
    >
      {/* ── Header ─────────────────────────────────────── */}
      <Box sx={{ px: 3, pt: 2.5, pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          {showLogo && (
            <Box>
              <Typography sx={{
                fontFamily:    BRAND.fontDisplay,
                fontWeight:    900,
                fontSize:      logoSize,
                letterSpacing: "0.05em",
                color:         textColor,
                lineHeight:    1.2,
              }}>
                {storeName}
              </Typography>
              {headerTagline && (
                <Typography sx={{
                  fontSize:      "0.72rem",
                  color:         accentColor,
                  mt:            0.4,
                  fontWeight:    600,
                  letterSpacing: "0.06em",
                  fontFamily:    BRAND.fontBody,
                }}>
                  {headerTagline}
                </Typography>
              )}
            </Box>
          )}
          <IconButton
            onClick={onClose}
            aria-label="Close menu"
            sx={{
              color:           textColor,
              ml:              "auto",
              backgroundColor: alpha(theme.palette.primary.contrastText, 0.08),
              width: 32, height: 32,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.contrastText, 0.18),
                transform:       "rotate(90deg)",
              },
              transition: "all 0.25s ease",
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ borderColor: dividerColor }} />

      {/* ── Promo Banner ───────────────────────────────── */}
      {showPromoBanner && (
        <Box sx={{
          mx: 2, mt: 2, px: 2, py: 1.25, borderRadius: 2,
          backgroundColor: promoBannerBg,
          border:          `1px solid ${alpha(promoBannerColor, 0.3)}`,
        }}>
          <Typography sx={{
            fontSize:   "0.78rem",
            fontWeight: 600,
            color:      promoBannerColor,
            textAlign:  "center",
            fontFamily: BRAND.fontBody,
          }}>
            {promoBannerText}
          </Typography>
        </Box>
      )}

      {/* ── Search ─────────────────────────────────────── */}
      {showSearch && (
        <Box sx={{
          mx: 2, mt: 2, px: 2, py: 1.25,
          borderRadius:    2,
          backgroundColor: alpha(theme.palette.primary.contrastText, 0.08),
          border:          `1px solid ${alpha(theme.palette.primary.contrastText, 0.1)}`,
          display:         "flex",
          alignItems:      "center",
          gap:             1,
        }}>
          <SearchIcon sx={{ color: alpha(textColor, 0.45), fontSize: 18 }} />
          <InputBase
            placeholder={searchPlaceholder}
            fullWidth
            sx={{
              color:       textColor,
              fontSize:    "0.88rem",
              fontFamily:  BRAND.fontBody,
              "& input::placeholder": {
                color:   alpha(textColor, 0.35),
                opacity: 1,
              },
            }}
          />
        </Box>
      )}

      {/* ── Nav Links ──────────────────────────────────── */}
      <List sx={{ px: 1.5, mt: 1.5, flex: 1 }}>
        {links.map((link) => (
          <ListItem
            key={link.label}
            component="a"
            href={link.url || "#"}
            onClick={onClose}
            sx={{
              borderRadius:   linkBorderRadius,
              mb:             0.5,
              color:          alpha(textColor, 0.85),
              textDecoration: "none",
              px: 1.5, py: 1,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: linkHoverBg,
                color:           linkHoverColor,
                paddingLeft:     "20px",
              },
            }}
          >
            {showLinkIcons && (
              <ListItemIcon sx={{ minWidth: 36, color: "inherit", opacity: 0.7 }}>
                {link.icon || getLinkIcon(link.label)}
              </ListItemIcon>
            )}
            <ListItemText
              primary={link.label}
              primaryTypographyProps={{
                fontFamily:    BRAND.fontBody,
                fontWeight:    linkFontWeight,
                fontSize:      linkFontSize,
                letterSpacing: "0.02em",
              }}
            />
            {link.badge && (
              <Chip
                label={link.badge}
                size="small"
                sx={{
                  height:          20,
                  fontSize:        "0.62rem",
                  fontWeight:      700,
                  backgroundColor: accentColor,
                  color:           theme.palette.primary.contrastText,
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            )}
          </ListItem>
        ))}
      </List>

      {/* ── Extra slot ─────────────────────────────────── */}
      {extraContent && <Box sx={{ px: 2, pb: 1 }}>{extraContent}</Box>}

      <Divider sx={{ borderColor: dividerColor, mx: 2 }} />

      {/* ── Auth Buttons ───────────────────────────────── */}
      {showAuthButtons && (
        <Box sx={{ p: 2.5, pt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={onSignIn}
            sx={{
              mb:              1.25,
              backgroundColor: accentColor,
              color:           theme.palette.secondary.contrastText,
              fontFamily:      BRAND.fontBody,
              fontWeight:      700,
              borderRadius:    "10px",
              py:              1.25,
              boxShadow:       "none",
              "&:hover": { filter: "brightness(0.88)", boxShadow: "none" },
            }}
          >
            {signInLabel}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={onCreateAccount}
            sx={{
              borderColor:  alpha(textColor, 0.25),
              color:        textColor,
              fontFamily:   BRAND.fontBody,
              fontWeight:   600,
              borderRadius: "10px",
              py:           1.25,
              borderWidth:  "1.5px",
              "&:hover": {
                borderColor:     textColor,
                backgroundColor: alpha(textColor, 0.08),
                borderWidth:     "1.5px",
              },
            }}
          >
            {createAccountLabel}
          </Button>
        </Box>
      )}

      {/* ── Drawer Footer ──────────────────────────────── */}
      {showDrawerFooter && (
        <Box sx={{
          px: 2.5, py: 2,
          borderTop:      `1px solid ${dividerColor}`,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}>
          <Typography sx={{
            fontSize:   "0.72rem",
            color:      alpha(textColor, 0.3),
            fontFamily: BRAND.fontBody,
          }}>
            {drawerFooterText}
          </Typography>

          {showSocialIcons && Object.keys(social).length > 0 && (
            <Box sx={{ display: "flex", gap: 0.75 }}>
              {Object.entries(social).map(([platform, url]) =>
                SOCIAL_ICONS[platform] ? (
                  <IconButton
                    key={platform}
                    component="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{
                      color:  alpha(textColor, 0.4),
                      width: 30, height: 30,
                      "&:hover": {
                        color:           accentColor,
                        backgroundColor: alpha(textColor, 0.08),
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {SOCIAL_ICONS[platform]}
                  </IconButton>
                ) : null
              )}
            </Box>
          )}
        </Box>
      )}
    </Drawer>
  );
};

// ── Navbar (main export) ──────────────────────────────────────
const Navbar = ({
  enabled = true, storeName = "LUXE STORE", logo = null, links = [],
  cartCount = 0, wishlistCount = 0,
  showSearch = true, showWishlist = true, showCart = true, showAccount = true,
  drawer = {},
  onCartClick, onWishlistClick, onAccountClick,
}) => {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled
            ? theme.palette.primary.main
            : theme.palette.background.paper,
          borderBottom: scrolled
            ? "none"
            : `1px solid ${theme.palette.divider}`,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          height:     "68px",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: "68px", gap: 2 }}>
            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                sx={{
                  color: scrolled
                    ? theme.palette.primary.contrastText
                    : theme.palette.primary.main,
                  mr: 0.5,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Logo storeName={storeName} logo={logo} scrolled={scrolled} />

            {!isMobile && (
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <NavLinks links={links} scrolled={scrolled} />
              </Box>
            )}

            {isMobile && <Box sx={{ flex: 1 }} />}

            <IconBar
              cartCount={cartCount} wishlistCount={wishlistCount}
              showSearch={showSearch} showWishlist={showWishlist}
              showCart={showCart} showAccount={showAccount}
              scrolled={scrolled}
              onCartClick={onCartClick}
              onWishlistClick={onWishlistClick}
              onAccountClick={onAccountClick}
            />
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ height: "68px" }} />

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={links}
        storeName={storeName}
        drawer={drawer}
      />
    </>
  );
};

export default Navbar;
