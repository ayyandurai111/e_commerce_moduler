// ─────────────────────────────────────────────────────────────
//  MyAccountPage — Dashboard for managing profile and orders
//
//  Layout:
//    xs/sm  — full-width + top mobile tab strip
//    md+    — left AccountSidebar (sticky) + right content
//
//  Sections:
//    overview  → AccountOverview  (stats + recent orders)
//    profile   → ProfileSection   (edit personal info)
//    addresses → AddressBook      (saved delivery addresses)
//    orders    → links to OrderHistoryPage
//    wishlist  → links to WishlistPage
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Box, Container, Grid, Tabs, Tab, Typography } from "@mui/material";
import DashboardOutlinedIcon     from "@mui/icons-material/DashboardOutlined";
import PersonOutlineIcon         from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon    from "@mui/icons-material/LocationOnOutlined";
import ShoppingBagOutlinedIcon   from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon        from "@mui/icons-material/FavoriteBorder";
import { useTheme, alpha }       from "@mui/material/styles";
import { BRAND }                 from "../../theme/theme";
import Navbar                    from "../../components/layout/Navbar/Navbar";
import Footer                    from "../../components/layout/Footer/Footer";
import AccountSidebar            from "./AccountSidebar/AccountSidebar";
import AccountOverview           from "./AccountOverview/AccountOverview";
import ProfileSection            from "./ProfileSection/ProfileSection";
import AddressBook               from "./AddressBook/AddressBook";

const MOBILE_TABS = [
  { id:"overview",  Icon:DashboardOutlinedIcon,  label:"Home"     },
  { id:"profile",   Icon:PersonOutlineIcon,       label:"Profile"  },
  { id:"addresses", Icon:LocationOnOutlinedIcon,  label:"Addresses"},
  { id:"orders",    Icon:ShoppingBagOutlinedIcon, label:"Orders"   },
  { id:"wishlist",  Icon:FavoriteBorderIcon,      label:"Wishlist" },
];

// ── Section heading ───────────────────────────────────────────
const SectionHeading = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb:{ xs:2.5, md:3 }, pb:{ xs:2, md:2.5 }, borderBottom:`1px solid ${theme.palette.divider}` }}>
      <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:{ xs:"1.4rem", md:"1.75rem" }, color:theme.palette.text.primary, lineHeight:1.2 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary, mt:0.5 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

// ── Main component ────────────────────────────────────────────
const MyAccountPage = ({
  user           = {},
  stats          = {},
  recentOrders   = [],
  addresses      = [],
  defaultAddressId,
  navbar         = {},
  footer         = {},
  initialSection = "overview",
  onSaveProfile,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefaultAddress,
  onViewOrders,
  onViewWishlist,
  onLogout,
}) => {
  const theme    = useTheme();
  const [section, setSection] = useState(initialSection);

  // Nav handler — intercept orders/wishlist to call parent callbacks
  const handleNav = (id) => {
    if (id === "orders")   { onViewOrders?.();   return; }
    if (id === "wishlist") { onViewWishlist?.(); return; }
    setSection(id);
  };

  const mobileTabIndex = MOBILE_TABS.findIndex(t => t.id === section);

  return (
    <Box sx={{ backgroundColor:theme.palette.background.default, minHeight:"100vh" }}>
      <Navbar {...navbar} />

      <Container maxWidth="xl" sx={{ pt:{ xs:2.5, md:4 }, pb:{ xs:6, md:8 } }}>

        {/* ── Mobile tab strip ─────────────────────── */}
        <Box sx={{
          display:      { xs:"block", md:"none" },
          mb:           2.5,
          border:       `1px solid ${theme.palette.divider}`,
          borderRadius: BRAND.radiusCard,
          bgcolor:      theme.palette.background.paper,
          overflow:     "hidden",
        }}>
          <Tabs
            value={mobileTabIndex < 0 ? 0 : mobileTabIndex}
            onChange={(_, i) => handleNav(MOBILE_TABS[i].id)}
            variant="scrollable" scrollButtons="auto"
            TabIndicatorProps={{ sx:{ bgcolor:theme.palette.secondary.main, height:2.5 } }}
            sx={{ minHeight:52 }}
          >
            {MOBILE_TABS.map(({ id, Icon, label }) => (
              <Tab key={id}
                label={
                  <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0.4 }}>
                    <Icon sx={{ fontSize:18 }} />
                    <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:"0.6rem", fontWeight:600, lineHeight:1 }}>{label}</Typography>
                  </Box>
                }
                sx={{
                  minHeight:52, minWidth:0, px:1.5,
                  color: theme.palette.text.secondary,
                  "&.Mui-selected":{ color:theme.palette.secondary.main },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* ── Two-column layout ─────────────────────── */}
        <Grid container spacing={{ xs:0, md:3, lg:4 }}>

          {/* Left sidebar (md+) */}
          <Grid item md={3} lg={2.5}>
            <AccountSidebar
              active={section}
              user={user}
              onNav={handleNav}
              onLogout={onLogout}
            />
          </Grid>

          {/* Main content */}
          <Grid item xs={12} md={9} lg={9.5}>
            <Box sx={{
              border:       `1px solid ${theme.palette.divider}`,
              borderRadius: BRAND.radiusCard,
              bgcolor:      theme.palette.background.paper,
              p:            { xs:2, sm:3, md:4 },
              boxShadow:    `0 2px 16px ${alpha(theme.palette.primary.main,0.05)}`,
            }}>
              {section === "overview" && (
                <AccountOverview
                  user={user}
                  stats={stats}
                  recentOrders={recentOrders}
                  onViewOrders={onViewOrders}
                />
              )}

              {section === "profile" && (
                <>
                  <SectionHeading title="My Profile" subtitle="Manage your personal information and account security" />
                  <ProfileSection user={user} onSave={onSaveProfile} />
                </>
              )}

              {section === "addresses" && (
                <>
                  <SectionHeading title="Address Book" subtitle="Save multiple delivery addresses for faster checkout" />
                  <AddressBook
                    addresses={addresses}
                    defaultAddressId={defaultAddressId}
                    onAddAddress={onAddAddress}
                    onEditAddress={onEditAddress}
                    onDeleteAddress={onDeleteAddress}
                    onSetDefault={onSetDefaultAddress}
                  />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer {...footer} />
    </Box>
  );
};

export default MyAccountPage;
