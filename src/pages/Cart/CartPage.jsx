// ─────────────────────────────────────────────────────────────
//  CartPage — Shopping Cart orchestrator
//
//  ✅ All colours  → theme.palette.*
//  ✅ All fonts    → BRAND.font*
//  ✅ All sizes    → BRAND.size*
//  ✅ All radii    → BRAND.radius*
//  ✅ Spacing      → theme.spacing() / sx MUI tokens
//
//  Responsive layout:
//    xs / sm  — single column (header → items → summary → saved → related)
//    md+      — two-column Grid  (left 7/12 | right 5/12 sticky)
//    lg+      — left 8/12 | right 4/12, xl container max-width
//
//  State:
//    cartItems  — qty editable, removable, saveable
//    savedItems — move back to cart
//    snackbar   — global feedback toast
// ─────────────────────────────────────────────────────────────
import React, { useState, useMemo } from "react";
import {
  Box, Container, Grid, Snackbar, Alert,
} from "@mui/material";
import { useTheme }    from "@mui/material/styles";
import { BRAND }       from "../../theme/theme";
import Navbar          from "../../components/layout/Navbar/Navbar";
import Footer          from "../../components/layout/Footer/Footer";
import CartHeader      from "./CartHeader/CartHeader";
import CartItemList    from "./CartItemList/CartItemList";
import OrderSummary    from "./OrderSummary/OrderSummary";
import EmptyCart       from "./EmptyCart/EmptyCart";
import SavedForLater   from "./SavedForLater/SavedForLater";
import RelatedProducts from "../ProductDetail/RelatedProducts/RelatedProducts";

const CartPage = ({
  initialItems     = [],
  savedItemsInit   = [],
  relatedProducts  = [],
  navbar           = {},
  footer           = {},
  currency         = "$",
  onCheckout,
  onContinueShopping,
}) => {
  const theme = useTheme();

  const [cartItems,  setCartItems]  = useState(initialItems);
  const [savedItems, setSavedItems] = useState(savedItemsInit);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

  /* ── Derived totals ──────────────────────────────────────── */
  const { subtotal, originalSubtotal } = useMemo(() => ({
    subtotal:         cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
    originalSubtotal: cartItems.reduce((acc, i) => acc + (i.originalPrice ?? i.price) * i.quantity, 0),
  }), [cartItems]);

  /* ── Handlers ────────────────────────────────────────────── */
  const showSnack = (msg, severity = "success") =>
    setSnack({ open: true, msg, severity });

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i));
  };

  const handleRemove = (id) => {
    const item = cartItems.find(i => i.id === id);
    setCartItems(prev => prev.filter(i => i.id !== id));
    showSnack(`${item?.name ?? "Item"} removed.`, "info");
  };

  const handleSaveForLater = (item, isSaving) => {
    if (isSaving) {
      setCartItems(prev => prev.filter(i => i.id !== item.id));
      setSavedItems(prev => prev.some(i => i.id === item.id) ? prev : [item, ...prev]);
      showSnack(`${item.name} saved for later.`);
    } else {
      setSavedItems(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleMoveToCart = (item) => {
    setSavedItems(prev => prev.filter(i => i.id !== item.id));
    setCartItems(prev =>
      prev.some(i => i.id === item.id)
        ? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [{ ...item, quantity: 1 }, ...prev]
    );
    showSnack(`${item.name} moved to cart.`);
  };

  const handleRemoveSaved = (id) =>
    setSavedItems(prev => prev.filter(i => i.id !== id));

  const handleClearCart = () => {
    setCartItems([]);
    showSnack("Cart cleared.", "info");
  };

  const handleCheckout = async (summary) => {
    await onCheckout?.(summary);
    showSnack("Redirecting to checkout…");
  };

  /* ── Render ──────────────────────────────────────────────── */
  const isEmpty = cartItems.length === 0;

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      <Navbar {...navbar} cartCount={cartItems.length} />

      <Container maxWidth="xl" sx={{ pt: { xs: 2.5, sm: 3, md: 4 }, pb: { xs: 6, md: 8 } }}>

        {isEmpty ? (
          <EmptyCart onContinueShopping={onContinueShopping} />
        ) : (
          <>
            {/* ── Page header ─────────────────────────── */}
            <CartHeader
              itemCount={cartItems.length}
              onContinueShopping={onContinueShopping}
            />

            {/* ── Two-column grid (md+) ────────────────── */}
            <Grid
              container
              spacing={{ xs: 2, sm: 2.5, md: 3, lg: 4 }}
              alignItems="flex-start"
            >
              {/* Left column: items + saved */}
              <Grid item xs={12} md={7} lg={8}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 4 } }}>

                  <CartItemList
                    items={cartItems}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                    onSaveForLater={handleSaveForLater}
                    onClearCart={handleClearCart}
                  />

                  {savedItems.length > 0 && (
                    <SavedForLater
                      items={savedItems}
                      onMoveToCart={handleMoveToCart}
                      onRemove={handleRemoveSaved}
                      currency={currency}
                    />
                  )}
                </Box>
              </Grid>

              {/* Right column: sticky summary — hidden on xs/sm (rendered below) */}
              <Grid item md={5} lg={4} sx={{ display: { xs: "none", md: "block" } }}>
                <OrderSummary
                  subtotal={subtotal}
                  originalSubtotal={originalSubtotal !== subtotal ? originalSubtotal : null}
                  itemCount={cartItems.length}
                  currency={currency}
                  onCheckout={handleCheckout}
                />
              </Grid>
            </Grid>

            {/* Summary below items on xs / sm */}
            <Box sx={{ display: { xs: "block", md: "none" }, mt: { xs: 2.5, sm: 3 } }}>
              <OrderSummary
                subtotal={subtotal}
                originalSubtotal={originalSubtotal !== subtotal ? originalSubtotal : null}
                itemCount={cartItems.length}
                currency={currency}
                onCheckout={handleCheckout}
              />
            </Box>
          </>
        )}
      </Container>

      {/* ── Related products strip ─────────────────────── */}
      {!isEmpty && relatedProducts?.length > 0 && (
        <Box sx={{
          bgcolor:   theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          py:        { xs: 5, md: 8 },
        }}>
          <Container maxWidth="xl">
            <RelatedProducts
              products={relatedProducts}
              currency={currency}
              onAddToCart={(p) => showSnack(`${p?.name} added to cart!`)}
            />
          </Container>
        </Box>
      )}

      <Footer {...footer} />

      {/* ── Global snackbar ────────────────────────────── */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2800}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={() => setSnack(s => ({ ...s, open: false }))}
          sx={{
            fontFamily: BRAND.fontBody,
            fontSize:   BRAND.sizeSm,
            fontWeight: theme.typography.fontWeightMedium,
            borderRadius: BRAND.radiusButton,
          }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default CartPage;
