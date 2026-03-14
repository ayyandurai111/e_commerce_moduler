// ─────────────────────────────────────────────────────────────
//  Navbar.jsx
//
//  Search bar:
//    Desktop (md+) — pill input right of nav-links, expands on focus
//    Mobile  (<md) — search icon toggles a full-width slide-down bar
//    Drawer        — search bar at top of mobile nav drawer
//
//  New props vs original:
//    onSearch(query)        — fired on Enter or search-icon click
//    onSearchChange(query)  — fired on every keystroke (live)
//    searchPlaceholder      — input placeholder text
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";
import {
  AppBar, Toolbar, Container, Box, Typography,
  Button, IconButton, Badge, Drawer,
  List, ListItem, ListItemIcon, ListItemText,
  Divider, InputBase, Chip, Slide, Paper,
} from "@mui/material";
import MenuIcon                from "@mui/icons-material/Menu";
import CloseIcon               from "@mui/icons-material/Close";
import SearchIcon              from "@mui/icons-material/Search";
import FavoriteBorderIcon      from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon       from "@mui/icons-material/PersonOutline";
import StorefrontOutlinedIcon  from "@mui/icons-material/StorefrontOutlined";
import { useTheme, alpha }     from "@mui/material/styles";
import useMediaQuery           from "@mui/material/useMediaQuery";
import { BRAND }               from "../../../theme/theme";
import storeConfig             from "../../../config/store/storeConfig";

// ── Desktop search pill ───────────────────────────────────────
const DesktopSearch = ({ scrolled, onSearch, onSearchChange, placeholder }) => {
  const theme    = useTheme();
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [query,   setQuery]   = useState("");

  const baseBg   = scrolled ? alpha("#fff", 0.12)   : alpha(theme.palette.primary.main, 0.055);
  const hoverBg  = scrolled ? alpha("#fff", 0.18)   : alpha(theme.palette.primary.main, 0.09);
  const focusBg  = scrolled ? alpha("#fff", 0.15)   : alpha(theme.palette.secondary.main, 0.07);
  const txtColor = scrolled ? "#fff"                : theme.palette.text.primary;
  const iconClr  = scrolled ? alpha("#fff", 0.65)   : theme.palette.text.secondary;
  const borderClr = focused
    ? (scrolled ? alpha("#fff", 0.5) : theme.palette.secondary.main)
    : "transparent";

  const submit = () => { if (query.trim()) onSearch?.(query.trim()); };

  return (
    <Box sx={{
      display:      "flex",
      alignItems:   "center",
      height:       36,
      width:        focused || query ? 260 : 210,
      borderRadius: "999px",
      border:       `1.5px solid ${borderClr}`,
      bgcolor:      focused ? focusBg : baseBg,
      transition:   "all 0.25s ease",
      overflow:     "hidden",
      px:           1.25,
      cursor:       "text",
      "&:hover":    { bgcolor: hoverBg, borderColor: scrolled ? alpha("#fff",0.28) : alpha(theme.palette.secondary.main,0.3) },
    }} onClick={() => inputRef.current?.focus()}>
      <IconButton disableRipple size="small" onClick={(e) => { e.stopPropagation(); submit(); }}
        sx={{ p:0.4, flexShrink:0, color: focused ? theme.palette.secondary.main : iconClr }}>
        <SearchIcon sx={{ fontSize:18 }} />
      </IconButton>

      <InputBase
        inputRef={inputRef}
        value={query}
        onChange={(e) => { setQuery(e.target.value); onSearchChange?.(e.target.value); }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
          if (e.key === "Escape") { setQuery(""); inputRef.current?.blur(); }
        }}
        placeholder={placeholder}
        sx={{
          flex:1, ml:0.75, color:txtColor,
          "& input":{
            fontFamily:BRAND.fontBody, fontSize:"0.82rem", fontWeight:400, p:0,
            "&::placeholder":{ color:iconClr, opacity:1 },
          },
        }}
      />

      {query && (
        <IconButton disableRipple size="small"
          onClick={(e) => { e.stopPropagation(); setQuery(""); onSearchChange?.(""); inputRef.current?.focus(); }}
          sx={{ p:0.3, flexShrink:0, color:iconClr }}>
          <CloseIcon sx={{ fontSize:14 }} />
        </IconButton>
      )}
    </Box>
  );
};

// ── Mobile search overlay (slide-down) ───────────────────────
const MobileSearchOverlay = ({ open, scrolled, onClose, onSearch, onSearchChange, placeholder }) => {
  const theme    = useTheme();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      setQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <Paper elevation={6} sx={{
        position:     "fixed",
        top:          68,
        left:         0,
        right:        0,
        zIndex:       1300,
        borderRadius: 0,
        bgcolor:      scrolled ? theme.palette.primary.main : theme.palette.background.paper,
        borderBottom: `1px solid ${scrolled ? alpha("#fff",0.12) : theme.palette.divider}`,
        px:           2,
        py:           1.25,
      }}>
        <Box sx={{
          display:     "flex",
          alignItems:  "center",
          gap:         1,
          maxWidth:    600,
          mx:          "auto",
          bgcolor:     scrolled ? alpha("#fff",0.1) : alpha(theme.palette.primary.main,0.05),
          borderRadius:"999px",
          border:      `1.5px solid ${scrolled ? alpha("#fff",0.25) : theme.palette.divider}`,
          px:          1.5, py: 0.6,
        }}>
          <SearchIcon sx={{ fontSize:20, color: scrolled ? alpha("#fff",0.65) : theme.palette.text.secondary, flexShrink:0 }} />
          <InputBase
            inputRef={inputRef}
            value={query}
            fullWidth
            onChange={(e) => { setQuery(e.target.value); onSearchChange?.(e.target.value); }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) { onSearch?.(query.trim()); onClose(); }
              if (e.key === "Escape") onClose();
            }}
            placeholder={placeholder}
            sx={{
              flex:1,
              color: scrolled ? "#fff" : theme.palette.text.primary,
              "& input":{
                fontFamily:BRAND.fontBody, fontSize:"0.95rem", p:0,
                "&::placeholder":{ color: scrolled ? alpha("#fff",0.45) : theme.palette.text.disabled, opacity:1 },
              },
            }}
          />
          <IconButton size="small" disableRipple onClick={() => { setQuery(""); onSearchChange?.(""); inputRef.current?.focus(); onClose(); }}
            sx={{ p:0.3, color: scrolled ? alpha("#fff",0.65) : theme.palette.text.secondary }}>
            <CloseIcon sx={{ fontSize:16 }} />
          </IconButton>
        </Box>
      </Paper>
    </Slide>
  );
};

// ── Navbar ────────────────────────────────────────────────────
const Navbar = ({
  enabled           = true,
  storeName         = storeConfig.name,
  logo              = null,
  links             = [],
  cartCount         = 0,
  wishlistCount     = 0,
  showSearch        = true,
  showWishlist      = true,
  showCart          = true,
  showAccount       = true,
  drawer            = {},
  searchPlaceholder = "Search products…",
  onCartClick,
  onWishlistClick,
  onAccountClick,
  onSearch,
  onSearchChange,
}) => {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen,       setDrawerOpen]       = useState(false);
  const [scrolled,         setScrolled]         = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!enabled) return null;

  const iconColor = scrolled ? theme.palette.primary.contrastText : theme.palette.primary.main;
  const iconSx    = {
    color:     iconColor,
    transition:"all 0.2s ease",
    "&:hover": { color:theme.palette.secondary.main, transform:"scale(1.1)" },
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? theme.palette.primary.main : theme.palette.background.paper,
          borderBottom:    scrolled ? "none" : `1px solid ${theme.palette.divider}`,
          transition:      "background-color 0.3s ease",
          height:          "68px",
          justifyContent:  "center",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height:"68px", gap:{ xs:1, md:2 } }}>

            {/* Hamburger */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color:iconColor, mr:0.5 }}>
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box component="a" href="/" sx={{ display:"flex", alignItems:"center", textDecoration:"none", flexShrink:0 }}>
              <Typography sx={{
                fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:"1.5rem",
                letterSpacing:"0.05em", lineHeight:1,
                color:      scrolled ? theme.palette.primary.contrastText : theme.palette.primary.main,
                transition: "color 0.3s ease",
              }}>
                {storeName}
              </Typography>
            </Box>

            {/* Desktop nav links */}
            {!isMobile && (
              <Box sx={{ display:"flex", justifyContent:"center", gap:0.5, flexShrink:0 }}>
                {links.map(link => (
                  <Button key={link.label} href={link.url||"#"}
                    sx={{
                      color:     scrolled ? alpha(theme.palette.primary.contrastText,0.85) : theme.palette.text.primary,
                      fontFamily:BRAND.fontBody, fontWeight:500, fontSize:"0.88rem",
                      px:1.5, borderRadius:2,
                      "&:hover": { color:theme.palette.secondary.main, backgroundColor:alpha(theme.palette.secondary.main,0.07) },
                    }}>
                    {link.label}
                    {link.badge && (
                      <Chip label={link.badge} size="small" sx={{ ml:0.75, height:18, fontSize:"0.6rem", fontWeight:700, backgroundColor:theme.palette.secondary.main, color:"#fff", "& .MuiChip-label":{ px:0.75 } }} />
                    )}
                  </Button>
                ))}
              </Box>
            )}

            {/* Desktop search — pushes into remaining space */}
            {!isMobile && showSearch && (
              <Box sx={{ flex:1, display:"flex", justifyContent:"flex-end", alignItems:"center", pr:0.5 }}>
                <DesktopSearch
                  scrolled={scrolled}
                  onSearch={onSearch}
                  onSearchChange={onSearchChange}
                  placeholder={searchPlaceholder}
                />
              </Box>
            )}

            {/* Mobile spacer */}
            {isMobile && <Box sx={{ flex:1 }} />}

            {/* Icon row */}
            <Box sx={{ display:"flex", alignItems:"center", gap:0.5, flexShrink:0 }}>
              {isMobile && showSearch && (
                <IconButton size="small" sx={iconSx}
                  onClick={() => setMobileSearchOpen(o => !o)}>
                  {mobileSearchOpen ? <CloseIcon fontSize="small" /> : <SearchIcon fontSize="small" />}
                </IconButton>
              )}
              {showWishlist && (
                <IconButton size="small" sx={iconSx} onClick={onWishlistClick}>
                  <Badge badgeContent={wishlistCount||0} color="secondary">
                    <FavoriteBorderIcon fontSize="small" />
                  </Badge>
                </IconButton>
              )}
              {showCart && (
                <IconButton size="small" sx={iconSx} onClick={onCartClick}>
                  <Badge badgeContent={cartCount||0} color="secondary">
                    <ShoppingBagOutlinedIcon fontSize="small" />
                  </Badge>
                </IconButton>
              )}
              {showAccount && (
                <IconButton size="small" sx={iconSx} onClick={onAccountClick}>
                  <PersonOutlineIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      {/* Height offset */}
      <Box sx={{ height:"68px" }} />

      {/* Mobile search overlay */}
      {isMobile && (
        <MobileSearchOverlay
          open={mobileSearchOpen}
          scrolled={scrolled}
          onClose={() => setMobileSearchOpen(false)}
          onSearch={(q) => { onSearch?.(q); setMobileSearchOpen(false); }}
          onSearchChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      )}

      {/* Mobile drawer */}
      <Drawer
        anchor={drawer.position||"left"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx:{
          width:      drawer.width      || 300,
          background: drawer.background || theme.palette.primary.main,
          color:      drawer.textColor  || "#fff",
        }}}
      >
        <Box sx={{ px:3, pt:2.5, pb:2, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:"1.4rem", letterSpacing:"0.05em" }}>
            {storeName}
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color:"inherit" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor:"rgba(255,255,255,0.12)" }} />

        {/* Drawer search bar */}
        {showSearch && (
          <Box sx={{ px:2, pt:2, pb:0.5 }}>
            <Box sx={{
              display:"flex", alignItems:"center", gap:1,
              bgcolor:     alpha("#fff",0.1),
              borderRadius:"999px",
              border:      `1px solid ${alpha("#fff",0.2)}`,
              px:1.5, py:0.75,
            }}>
              <SearchIcon sx={{ fontSize:18, color:alpha("#fff",0.6), flexShrink:0 }} />
              <InputBase
                placeholder={searchPlaceholder}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    onSearch?.(e.target.value.trim());
                    setDrawerOpen(false);
                  }
                }}
                sx={{
                  flex:1, color:"#fff",
                  "& input":{ fontFamily:BRAND.fontBody, fontSize:"0.85rem", p:0,
                    "&::placeholder":{ color:alpha("#fff",0.45), opacity:1 },
                  },
                }}
              />
            </Box>
          </Box>
        )}

        <List sx={{ px:1.5, mt:1 }}>
          {links.map(link => (
            <ListItem key={link.label} component="a" href={link.url||"#"}
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius:2, mb:0.5, color:"rgba(255,255,255,0.85)", textDecoration:"none", "&:hover":{ backgroundColor:"rgba(233,69,96,0.15)" } }}
            >
              <ListItemIcon sx={{ minWidth:36, color:"inherit", opacity:0.7 }}>
                <StorefrontOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={link.label} primaryTypographyProps={{ fontFamily:BRAND.fontBody, fontWeight:500 }} />
              {link.badge && (
                <Chip label={link.badge} size="small" sx={{ height:20, fontSize:"0.62rem", fontWeight:700, backgroundColor:theme.palette.secondary.main, color:"#fff", "& .MuiChip-label":{ px:1 } }} />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
