// ─────────────────────────────────────────────────────────────
//  CheckoutPage — Orchestrator
//
//  Steps:
//    0  Contact    → email, phone, express checkout
//    1  Shipping   → address + delivery method (2 sub-steps)
//    2  Payment    → card / PayPal / Apple Pay + billing address
//    3  Review     → confirm all details → Place Order
//    ✓  Confirmation screen
//
//  Layout:
//    xs/sm  → single column: stepper + form (sidebar below)
//    md+    → 2-col: form (7/12) | sticky sidebar (5/12)
//
//  Props:
//    initialItems        cart item[] (same shape as CartPage)
//    currency            "$"
//    onOrderPlaced       (orderSummary) => void
//    onContinueShopping  () => void
//    onEditCart          () => void
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, Container, Grid, Typography, Breadcrumbs, Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND } from "../../theme/theme";

// ── Step components ───────────────────────────────────────────
import CheckoutStepper  from "./CheckoutStepper/CheckoutStepper";
import ContactForm      from "./ContactForm/ContactForm";
import ShippingForm     from "./ShippingForm/ShippingForm";
import ShippingMethod   from "./ShippingMethod/ShippingMethod";
import PaymentForm      from "./PaymentForm/PaymentForm";
import BillingForm      from "./BillingForm/BillingForm";
import OrderReview      from "./OrderReview/OrderReview";
import OrderConfirmation from "./OrderConfirmation/OrderConfirmation";
import CheckoutSidebar, { SHIPPING_PRICES, TAX_RATE } from "./CheckoutSidebar/CheckoutSidebar";

// ── Step index constants ──────────────────────────────────────
const STEP_CONTACT  = 0;
const STEP_SHIPPING = 1;
const STEP_PAYMENT  = 2;
const STEP_REVIEW   = 3;
const STEP_DONE     = 4;

// ── Section heading ───────────────────────────────────────────
const SectionTitle = ({ step, label }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: { xs: 2, md: 2.5 } }}>
      <Box sx={{
        width:        28, height: 28,
        borderRadius: "50%",
        bgcolor:      theme.palette.secondary.main,
        display:      "flex", alignItems: "center", justifyContent: "center",
        flexShrink:   0,
      }}>
        <Typography sx={{ fontFamily: BRAND.fontMono, fontSize: "0.7rem", fontWeight: theme.typography.fontWeightBlack, color: "#fff" }}>
          {step}
        </Typography>
      </Box>
      <Typography sx={{
        fontFamily: BRAND.fontDisplay,
        fontSize:   { xs: BRAND.sizeBody, md: BRAND.sizeLg },
        fontWeight: theme.typography.fontWeightBold,
        color:      theme.palette.text.primary,
      }}>
        {label}
      </Typography>
    </Box>
  );
};

// ── Card wrapper ──────────────────────────────────────────────
const StepCard = ({ children }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      bgcolor:      theme.palette.background.paper,
      border:       `1px solid ${theme.palette.divider}`,
      borderRadius: BRAND.radiusCard,
      p:            { xs: 2, sm: 2.5, md: 3 },
      boxShadow:    theme.shadows[1],
    }}>
      {children}
    </Box>
  );
};

// ── Compute order total ───────────────────────────────────────
const computeTotal = (items, shippingMethod, promoDiscount = 0) => {
  const subtotal    = items.reduce((s, i) => s + (i.price ?? 0) * (i.quantity ?? 1), 0);
  const shipping    = SHIPPING_PRICES[shippingMethod] ?? 0;
  const taxable     = subtotal - promoDiscount;
  const tax         = taxable * TAX_RATE;
  return taxable + shipping + tax;
};

// ─────────────────────────────────────────────────────────────
//  CheckoutPage
// ─────────────────────────────────────────────────────────────
const CheckoutPage = ({
  initialItems       = [],
  currency           = "$",
  onOrderPlaced,
  onContinueShopping,
  onEditCart,
  // ── Payment configuration ─────────────────────────────────
  // Pass to limit which UPI apps / banks / methods appear.
  // Omit to show everything (default behaviour).
  paymentConfig      = {},
}) => {
  const theme = useTheme();

  // ── Global step state ─────────────────────────────────────
  const [step, setStep] = useState(STEP_CONTACT);

  // ── Sub-step within Shipping (0=address, 1=method) ────────
  const [shippingSubStep, setShippingSubStep] = useState(0);

  // ── Form data ─────────────────────────────────────────────
  const [contact,        setContact]        = useState({ email: "", phone: "" });
  const [shippingAddr,   setShippingAddr]   = useState({ country: "US" });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentData,    setPaymentData]    = useState({});
  const [billingData,    setBillingData]    = useState({});
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [placing,        setPlacing]        = useState(false);

  // ── Stepper step index (0-3) ──────────────────────────────
  const stepperIndex = step === STEP_DONE ? 3 : step;

  // ── Computed total for sidebar ────────────────────────────
  const total = computeTotal(initialItems, shippingMethod);

  // ── Handlers ─────────────────────────────────────────────
  const goTo = (s) => {
    setStep(s);
    setShippingSubStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactNext  = (data) => { setContact(data);  goTo(STEP_SHIPPING); };
  const handleAddressNext  = (data) => { setShippingAddr(data); setShippingSubStep(1); };
  const handleMethodNext   = (m)    => { setShippingMethod(m);  goTo(STEP_PAYMENT);   };
  const handlePaymentNext  = (data) => { setPaymentData(data);  goTo(STEP_REVIEW);    };

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      goTo(STEP_DONE);
      onOrderPlaced?.({ contact, shippingAddr, shippingMethod, payment: paymentData, items: initialItems, total });
    }, 1800);
  };

  // Confirmation screen — full width, no sidebar
  if (step === STEP_DONE) {
    return (
      <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", pt: { xs: 2, md: 4 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="sm">
          <OrderConfirmation
            items={initialItems}
            contact={contact}
            shippingMethod={shippingMethod}
            currency={currency}
            total={total}
            onContinueShopping={onContinueShopping}
          />
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", pt: { xs: 2, md: 4 }, pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">

        {/* ── Top breadcrumbs ─────────────────────── */}
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: 12 }} />}
          sx={{ mb: { xs: 2, md: 3 } }}
        >
          {["Cart", "Contact", "Shipping", "Payment", "Review"].map((crumb, i) => (
            <Typography
              key={crumb}
              onClick={i > 0 && i < step ? () => goTo(i - 1) : undefined}
              sx={{
                fontFamily: BRAND.fontBody,
                fontSize:   BRAND.sizeXs,
                color:      i === step + 1
                  ? theme.palette.text.primary
                  : theme.palette.text.disabled,
                fontWeight: i === step + 1
                  ? theme.typography.fontWeightBold
                  : theme.typography.fontWeightNormal,
                cursor:     i > 0 && i <= step ? "pointer" : "default",
                "&:hover":  i > 0 && i <= step ? { color: theme.palette.secondary.main } : {},
              }}
            >
              {crumb}
            </Typography>
          ))}
        </Breadcrumbs>

        {/* ── Stepper ─────────────────────────────── */}
        <CheckoutStepper activeStep={stepperIndex} />

        {/* ── 2-col layout ───────────────────────── */}
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="flex-start">

          {/* ── LEFT: Form column ──────────────────── */}
          <Grid item xs={12} md={7}>

            {/* ── Step 0: Contact ──────────────────── */}
            {step === STEP_CONTACT && (
              <StepCard>
                <SectionTitle step={1} label="Contact information" />
                <ContactForm
                  data={contact}
                  onChange={setContact}
                  onNext={handleContactNext}
                />
              </StepCard>
            )}

            {/* ── Step 1: Shipping ─────────────────── */}
            {step === STEP_SHIPPING && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 2.5 } }}>
                <StepCard>
                  {shippingSubStep === 0 && (
                    <>
                      <SectionTitle step={2} label="Delivery address" />
                      <ShippingForm
                        data={shippingAddr}
                        onChange={setShippingAddr}
                        onNext={handleAddressNext}
                        onBack={() => goTo(STEP_CONTACT)}
                      />
                    </>
                  )}

                  {shippingSubStep === 1 && (
                    <>
                      {/* Address summary strip */}
                      <Box sx={{
                        display:      "flex",
                        alignItems:   "center",
                        justifyContent: "space-between",
                        bgcolor:      alpha(theme.palette.primary.main, 0.04),
                        border:       `1px solid ${theme.palette.divider}`,
                        borderRadius: BRAND.radiusButton,
                        px:           1.75, py: 1.25,
                        mb:           2.5,
                      }}>
                        <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, color: theme.palette.text.secondary }}>
                          {shippingAddr.firstName} {shippingAddr.lastName} · {shippingAddr.city}, {shippingAddr.country}
                        </Typography>
                        <Typography
                          onClick={() => setShippingSubStep(0)}
                          sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, color: theme.palette.secondary.main, cursor: "pointer", textDecoration: "underline" }}
                        >
                          Edit
                        </Typography>
                      </Box>

                      <SectionTitle step={2} label="Choose delivery method" />
                      <ShippingMethod
                        selected={shippingMethod}
                        onChange={setShippingMethod}
                        subtotal={initialItems.reduce((s, i) => s + (i.price ?? 0) * (i.quantity ?? 1), 0)}
                        onNext={handleMethodNext}
                        onBack={() => setShippingSubStep(0)}
                      />
                    </>
                  )}
                </StepCard>
              </Box>
            )}

            {/* ── Step 2: Payment ──────────────────── */}
            {step === STEP_PAYMENT && (
              <StepCard>
                <SectionTitle step={3} label="Payment details" />
                <PaymentForm
                  data={paymentData}
                  onChange={setPaymentData}
                  onNext={handlePaymentNext}
                  onBack={() => goTo(STEP_SHIPPING)}
                  enabledUpiApps={paymentConfig?.enabledUpiApps}
                  enabledBanks={paymentConfig?.enabledBanks}
                  enabledMethods={paymentConfig?.enabledMethods}
                />
                {/* Billing address (inside same card) */}
                <BillingForm
                  shippingData={shippingAddr}
                  data={sameAsShipping ? shippingAddr : billingData}
                  onChange={setBillingData}
                  sameAsShipping={sameAsShipping}
                  onSameToggle={setSameAsShipping}
                />
              </StepCard>
            )}

            {/* ── Step 3: Review ───────────────────── */}
            {step === STEP_REVIEW && (
              <StepCard>
                <SectionTitle step={4} label="Review your order" />
                <OrderReview
                  contact={contact}
                  shipping={shippingAddr}
                  shippingMethod={shippingMethod}
                  payment={paymentData}
                  items={initialItems}
                  currency={currency}
                  total={total}
                  placing={placing}
                  onBack={() => goTo(STEP_PAYMENT)}
                  onPlaceOrder={handlePlaceOrder}
                  onEditContact={() => goTo(STEP_CONTACT)}
                  onEditShipping={() => { goTo(STEP_SHIPPING); setShippingSubStep(0); }}
                  onEditPayment={() => goTo(STEP_PAYMENT)}
                />
              </StepCard>
            )}
          </Grid>

          {/* ── RIGHT: Sticky sidebar ──────────────── */}
          <Grid item xs={12} md={5}>
            <CheckoutSidebar
              items={initialItems}
              shippingMethod={shippingMethod}
              currency={currency}
              onEditCart={onEditCart}
            />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
