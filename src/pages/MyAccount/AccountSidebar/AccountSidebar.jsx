// ─────────────────────────────────────────────────────────────
//  AccountSidebar — left nav + avatar card for My Account
//
//  Responsive:
//    xs/sm  — hidden; top tabs shown instead (handled by parent)
//    md+    — sticky left panel
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Avatar, Divider, List, ListItemButton, ListItemIcon, ListItemText, Chip } from "@mui/material";
import DashboardOutlinedIcon     from "@mui/icons-material/DashboardOutlined";
import PersonOutlineIcon         from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon    from "@mui/icons-material/LocationOnOutlined";
import FavoriteBorderIcon        from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon   from "@mui/icons-material/ShoppingBagOutlined";
import LogoutIcon                from "@mui/icons-material/Logout";
import { useTheme, alpha }       from "@mui/material/styles";
import { BRAND }                 from "../../../theme/theme";

const NAV = [
  { id:"overview",  label:"Dashboard",      Icon:DashboardOutlinedIcon,   badge:null   },
  { id:"orders",    label:"My Orders",       Icon:ShoppingBagOutlinedIcon, badge:"3"    },
  { id:"profile",   label:"Profile",         Icon:PersonOutlineIcon,       badge:null   },
  { id:"addresses", label:"Address Book",    Icon:LocationOnOutlinedIcon,  badge:null   },
  { id:"wishlist",  label:"Wishlist",        Icon:FavoriteBorderIcon,      badge:"12"   },
];

const AccountSidebar = ({ active = "overview", user = {}, onNav, onLogout, sx = {} }) => {
  const theme = useTheme();
  const initials = ((user.firstName?.[0] ?? "") + (user.lastName?.[0] ?? "")).toUpperCase() || "U";

  return (
    <Box sx={{
      display:       { xs: "none", md: "flex" },
      flexDirection: "column",
      gap:           2,
      position:      "sticky",
      top:           "88px",
      alignSelf:     "flex-start",
      ...sx,
    }}>
      {/* ── Avatar card ─────────────────────────────── */}
      <Box sx={{
        display:      "flex",
        flexDirection:"column",
        alignItems:   "center",
        textAlign:    "center",
        gap:          1.25,
        p:            3,
        border:       `1px solid ${theme.palette.divider}`,
        borderRadius: BRAND.radiusCard,
        bgcolor:      theme.palette.background.paper,
        boxShadow:    `0 2px 16px ${alpha(theme.palette.primary.main, 0.06)}`,
      }}>
        <Avatar src={user.avatar} sx={{
          width:  72,
          height: 72,
          bgcolor: theme.palette.secondary.main,
          fontFamily: BRAND.fontDisplay,
          fontWeight: 900,
          fontSize:   "1.5rem",
          border:     `3px solid ${theme.palette.background.paper}`,
          boxShadow:  `0 0 0 2px ${theme.palette.secondary.main}`,
        }}>
          {!user.avatar && initials}
        </Avatar>

        <Box>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm, color:theme.palette.text.primary, lineHeight:1.3 }}>
            {user.firstName} {user.lastName}
          </Typography>
          {user.mobile && (
            <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, mt:0.25 }}>
              +91 {user.mobile}
            </Typography>
          )}
        </Box>

        <Chip label="Luxe Member" size="small" sx={{
          bgcolor:    alpha(theme.palette.warning.main, 0.12),
          color:      theme.palette.warning.main,
          fontFamily: BRAND.fontBody,
          fontWeight: 700,
          fontSize:   "0.68rem",
          letterSpacing: "0.06em",
          height:     22,
          "& .MuiChip-label": { px: 1.25 },
        }} />
      </Box>

      {/* ── Nav list ─────────────────────────────────── */}
      <Box sx={{
        border:       `1px solid ${theme.palette.divider}`,
        borderRadius: BRAND.radiusCard,
        bgcolor:      theme.palette.background.paper,
        overflow:     "hidden",
        boxShadow:    `0 2px 16px ${alpha(theme.palette.primary.main, 0.06)}`,
      }}>
        <List disablePadding>
          {NAV.map((item, i) => {
            const isActive = active === item.id;
            return (
              <React.Fragment key={item.id}>
                {i > 0 && <Divider />}
                <ListItemButton
                  onClick={() => onNav?.(item.id)}
                  sx={{
                    px: 2.25, py: 1.5,
                    bgcolor:    isActive ? alpha(theme.palette.secondary.main, 0.07) : "transparent",
                    borderLeft: `3px solid ${isActive ? theme.palette.secondary.main : "transparent"}`,
                    transition: "all 0.2s ease",
                    "&:hover":  { bgcolor: alpha(theme.palette.secondary.main, 0.05), borderLeftColor: alpha(theme.palette.secondary.main, 0.5) },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: isActive ? theme.palette.secondary.main : theme.palette.text.secondary }}>
                    <item.Icon sx={{ fontSize: 19 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontFamily: BRAND.fontBody,
                      fontSize:   BRAND.sizeSm,
                      fontWeight: isActive ? 700 : 500,
                      color:      isActive ? theme.palette.text.primary : theme.palette.text.secondary,
                    }}
                  />
                  {item.badge && (
                    <Chip label={item.badge} size="small" sx={{
                      height: 20, minWidth: 20,
                      bgcolor: isActive ? theme.palette.secondary.main : alpha(theme.palette.primary.main, 0.1),
                      color:   isActive ? "#fff" : theme.palette.text.secondary,
                      fontFamily: BRAND.fontBody, fontWeight: 700, fontSize: "0.6rem",
                      "& .MuiChip-label": { px: 0.75 },
                    }} />
                  )}
                </ListItemButton>
              </React.Fragment>
            );
          })}
        </List>

        <Divider />
        <ListItemButton
          onClick={onLogout}
          sx={{ px: 2.25, py: 1.5, "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.05) } }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: theme.palette.error.main }}>
            <LogoutIcon sx={{ fontSize: 19 }} />
          </ListItemIcon>
          <ListItemText primary="Sign Out" primaryTypographyProps={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, fontWeight: 500, color: theme.palette.error.main }} />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default AccountSidebar;
