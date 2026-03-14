// ─────────────────────────────────────────────────────────────
//  App.jsx
//  Single responsibility: ThemeProvider + AppRouter.
//  All routes are defined in src/router/AppRouter.jsx.
//  All data / handlers live in src/config/connector/*Connector.jsx.
//
//  Dev page-switcher is retained (bottom-right) — it now uses
//  React Router's <Link> / navigate so the URL updates too.
// ─────────────────────────────────────────────────────────────
import React                     from "react";
import { ThemeProvider, CssBaseline, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import theme, { BRAND }          from "./theme/theme";
import AppRouter, { ROUTES }     from "./router/AppRouter";

// ── Dev switcher config ───────────────────────────────────────
const PAGE_SWITCHER = [
  { path: ROUTES.HOME,     label: "Home",     color: "#1a1a2e" },
  { path: ROUTES.PLP,      label: "Products", color: "#3b82f6" },
  { path: "/products/demo",label: "Detail",   color: "#e94560" },
  { path: ROUTES.CART,     label: "Cart",     color: "#059669" },
  { path: ROUTES.CHECKOUT, label: "Checkout", color: "#7c3aed" },
  { path: ROUTES.ACCOUNT,  label: "Account",  color: "#0891b2" },
  { path: ROUTES.ORDERS,   label: "Orders",   color: "#d97706" },
  { path: ROUTES.WISHLIST, label: "Wishlist", color: "#db2777" },
  { path: ROUTES.SEARCH,   label: "Search",   color: "#6366f1" },
  { path: ROUTES.LOGIN,    label: "Login",    color: "#be185d" },
  { path: ROUTES.REGISTER, label: "Register", color: "#7e22ce" },
];

// ── Dev switcher — uses React Router navigate ─────────────────
const DevSwitcher = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box sx={{
      position:  "fixed",
      bottom:    16,
      right:     16,
      zIndex:    9999,
      display:   "flex",
      gap:       0.75,
      flexWrap:  "wrap",
      maxWidth:  480,
    }}>
      {PAGE_SWITCHER.map(({ path, label, color }) => {
        const active = pathname === path ||
          (path !== "/" && pathname.startsWith(path));
        return (
          <Button
            key={path}
            variant={active ? "contained" : "outlined"}
            size="small"
            onClick={() => navigate(path)}
            sx={{
              fontFamily:    BRAND.fontBody,
              fontWeight:    700,
              fontSize:      "0.72rem",
              letterSpacing: "0.06em",
              minWidth:      0,
              px:            1.75,
              py:            0.75,
              borderRadius:  "6px",
              textTransform: "none",
              borderColor:   color,
              color:         active ? "#fff" : color,
              bgcolor:       active ? color : "rgba(255,255,255,0.92)",
              backdropFilter:"blur(6px)",
              boxShadow:     "0 2px 12px rgba(0,0,0,0.15)",
              "&:hover":     { bgcolor: color, color: "#fff" },
            }}
          >
            {label}
          </Button>
        );
      })}
    </Box>
  );
};

// ── App ───────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DevSwitcher />
      <AppRouter />
    </ThemeProvider>
  );
}
