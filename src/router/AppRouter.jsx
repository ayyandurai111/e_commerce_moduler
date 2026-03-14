// ─────────────────────────────────────────────────────────────
//  AppRouter.jsx
//  Central route configuration using React Router v6.
//
//  Routes:
//    /                → Home
//    /products        → Product Listing (PLP)
//    /products/:slug  → Product Detail  (PDP)
//    /cart            → Cart
//    /checkout        → Checkout
//    /account         → My Account
//    /orders          → Order History
//    /wishlist        → Wishlist
//    /search          → Search Results
//    /login           → Login
//    /register        → Create Account
//    *                → Redirect to /
// ─────────────────────────────────────────────────────────────
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

// ── Page Connectors ───────────────────────────────────────────
import HomeConnector          from "../config/connector/HomeConnector";
import PLPConnector           from "../config/connector/PLPConnector";
import PDPConnector           from "../config/connector/PDPConnector";
import CartConnector          from "../config/connector/CartConnector";
import CheckoutConnector      from "../config/connector/CheckoutConnector";
import MyAccountConnector     from "../config/connector/MyAccountConnector";
import OrderHistoryConnector  from "../config/connector/OrderHistoryConnector";
import WishlistConnector      from "../config/connector/WishlistConnector";
import SearchResultsConnector from "../config/connector/SearchResultsConnector";
import LoginConnector         from "../config/connector/LoginConnector";
import CreateAccountConnector from "../config/connector/CreateAccountConnector";

// ── Full-page loading fallback ────────────────────────────────
const PageLoader = () => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
    <CircularProgress />
  </Box>
);

// ── Route definitions ─────────────────────────────────────────
export const ROUTES = {
  HOME:     "/",
  PLP:      "/products",
  PDP:      "/products/:slug",
  CART:     "/cart",
  CHECKOUT: "/checkout",
  ACCOUNT:  "/account",
  ORDERS:   "/orders",
  WISHLIST: "/wishlist",
  SEARCH:   "/search",
  LOGIN:    "/login",
  REGISTER: "/register",
};

// ── AppRouter ─────────────────────────────────────────────────
const AppRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path={ROUTES.HOME}     element={<HomeConnector />} />
      <Route path={ROUTES.PLP}      element={<PLPConnector />} />
      <Route path={ROUTES.PDP}      element={<PDPConnector />} />
      <Route path={ROUTES.CART}     element={<CartConnector />} />
      <Route path={ROUTES.CHECKOUT} element={<CheckoutConnector />} />
      <Route path={ROUTES.ACCOUNT}  element={<MyAccountConnector />} />
      <Route path={ROUTES.ORDERS}   element={<OrderHistoryConnector />} />
      <Route path={ROUTES.WISHLIST} element={<WishlistConnector />} />
      <Route path={ROUTES.SEARCH}   element={<SearchResultsConnector />} />
      <Route path={ROUTES.LOGIN}    element={<LoginConnector />} />
      <Route path={ROUTES.REGISTER} element={<CreateAccountConnector />} />

      {/* Catch-all — redirect unknown paths to Home */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  </Suspense>
);

export default AppRouter;
