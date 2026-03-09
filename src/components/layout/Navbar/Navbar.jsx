import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Container, Box, Typography, Button, IconButton, Badge, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, InputBase, Chip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BRAND } from "../../../theme/theme";

const Navbar = ({ enabled=true, storeName="LUXE STORE", logo=null, links=[], cartCount=0, wishlistCount=0, showSearch=true, showWishlist=true, showCart=true, showAccount=true, drawer={}, onCartClick, onWishlistClick, onAccountClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn, { passive:true }); return () => window.removeEventListener("scroll", fn); }, []);
  if (!enabled) return null;
  const iconColor = scrolled ? theme.palette.primary.contrastText : theme.palette.primary.main;
  const iconSx = { color:iconColor, transition:"all 0.2s ease", "&:hover":{ color:theme.palette.secondary.main, transform:"scale(1.1)" } };
  return (
    <>
      <AppBar position="fixed" elevation={scrolled?4:0} sx={{ backgroundColor:scrolled?theme.palette.primary.main:theme.palette.background.paper, borderBottom:scrolled?"none":`1px solid ${theme.palette.divider}`, transition:"background-color 0.3s ease", height:"68px", justifyContent:"center" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height:"68px", gap:2 }}>
            {isMobile && <IconButton onClick={()=>setDrawerOpen(true)} sx={{ color:iconColor, mr:0.5 }}><MenuIcon /></IconButton>}
            <Box component="a" href="/" sx={{ display:"flex", alignItems:"center", textDecoration:"none" }}>
              <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:"1.5rem", letterSpacing:"0.05em", color:scrolled?theme.palette.primary.contrastText:theme.palette.primary.main, transition:"color 0.3s ease", lineHeight:1 }}>{storeName}</Typography>
            </Box>
            {!isMobile && (
              <Box sx={{ flex:1, display:"flex", justifyContent:"center", gap:0.5 }}>
                {links.map(link => (
                  <Button key={link.label} href={link.url||"#"} sx={{ color:scrolled?alpha(theme.palette.primary.contrastText,0.85):theme.palette.text.primary, fontFamily:BRAND.fontBody, fontWeight:500, fontSize:"0.88rem", px:1.5, borderRadius:2, "&:hover":{ color:theme.palette.secondary.main, backgroundColor:alpha(theme.palette.secondary.main,0.07) } }}>
                    {link.label}{link.badge&&<Chip label={link.badge} size="small" sx={{ ml:0.75, height:18, fontSize:"0.6rem", fontWeight:700, backgroundColor:theme.palette.secondary.main, color:"#fff", "& .MuiChip-label":{ px:0.75 } }} />}
                  </Button>
                ))}
              </Box>
            )}
            {isMobile && <Box sx={{ flex:1 }} />}
            <Box sx={{ display:"flex", alignItems:"center", gap:0.5 }}>
              {showWishlist && <IconButton size="small" sx={iconSx} onClick={onWishlistClick}><Badge badgeContent={wishlistCount||0} color="secondary"><FavoriteBorderIcon fontSize="small" /></Badge></IconButton>}
              {showCart && <IconButton size="small" sx={iconSx} onClick={onCartClick}><Badge badgeContent={cartCount||0} color="secondary"><ShoppingBagOutlinedIcon fontSize="small" /></Badge></IconButton>}
              {showAccount && <IconButton size="small" sx={iconSx} onClick={onAccountClick}><PersonOutlineIcon fontSize="small" /></IconButton>}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height:"68px" }} />
      <Drawer anchor={drawer.position||"left"} open={drawerOpen} onClose={()=>setDrawerOpen(false)} PaperProps={{ sx:{ width:drawer.width||300, background:drawer.background||theme.palette.primary.main, color:drawer.textColor||"#fff" } }}>
        <Box sx={{ px:3, pt:2.5, pb:2, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:"1.4rem", letterSpacing:"0.05em" }}>{storeName}</Typography>
          <IconButton onClick={()=>setDrawerOpen(false)} sx={{ color:"inherit" }}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ borderColor:"rgba(255,255,255,0.12)" }} />
        <List sx={{ px:1.5, mt:1 }}>
          {links.map(link => (
            <ListItem key={link.label} component="a" href={link.url||"#"} onClick={()=>setDrawerOpen(false)} sx={{ borderRadius:2, mb:0.5, color:"rgba(255,255,255,0.85)", textDecoration:"none", "&:hover":{ backgroundColor:"rgba(233,69,96,0.15)" } }}>
              <ListItemIcon sx={{ minWidth:36, color:"inherit", opacity:0.7 }}><StorefrontOutlinedIcon /></ListItemIcon>
              <ListItemText primary={link.label} primaryTypographyProps={{ fontFamily:BRAND.fontBody, fontWeight:500 }} />
              {link.badge && <Chip label={link.badge} size="small" sx={{ height:20, fontSize:"0.62rem", fontWeight:700, backgroundColor:theme.palette.secondary.main, color:"#fff", "& .MuiChip-label":{ px:1 } }} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
export default Navbar;
