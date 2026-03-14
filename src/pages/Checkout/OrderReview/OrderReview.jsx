// ─────────────────────────────────────────────────────────────
//  OrderReview — Step 4: Confirm everything before placing
//
//  Shows:
//    • Contact summary (email / phone) with Edit button
//    • Shipping address summary with Edit button
//    • Delivery method chosen
//    • Payment method summary (masked card or PayPal/Apple)
//    • Item list with images + quantities
//    • Place Order CTA with total
//    • Legal fine print
// ─────────────────────────────────────────────────────────────
import React from "react";
import {
  Box, Typography, Divider, Avatar, Chip, CircularProgress,
} from "@mui/material";
import EditOutlinedIcon          from "@mui/icons-material/EditOutlined";
import PersonOutlineIcon         from "@mui/icons-material/PersonOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardIcon            from "@mui/icons-material/CreditCard";
import QrCodeIcon                from "@mui/icons-material/QrCode";
import LockIcon                  from "@mui/icons-material/Lock";
import CheckCircleIcon           from "@mui/icons-material/CheckCircle";
import { useTheme, alpha }       from "@mui/material/styles";
import { BRAND }                 from "../../../theme/theme";
import Button                    from "../../../components/common/Button/Button";
import PriceTag                  from "../../../components/common/PriceTag/PriceTag";

const SHIPPING_LABELS = {
  standard:  { label: "Standard Shipping",  eta: "5–7 business days" },
  express:   { label: "Express Shipping",   eta: "2–3 business days" },
  overnight: { label: "Overnight Delivery", eta: "Next business day" },
};

// ── Section card ─────────────────────────────────────────────
const ReviewSection = ({ icon: Icon, title, onEdit, children }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      border:       `1px solid ${theme.palette.divider}`,
      borderRadius: BRAND.radiusCard,
      overflow:     "hidden",
    }}>
      {/* Header */}
      <Box sx={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        px:             { xs: 1.75, md: 2.25 },
        py:             { xs: 1.25, md: 1.5  },
        bgcolor:        alpha(theme.palette.primary.main, 0.03),
        borderBottom:   `1px solid ${theme.palette.divider}`,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Icon sx={{ fontSize: 15, color: theme.palette.secondary.main }} />
          <Typography sx={{
            fontFamily: BRAND.fontBody,
            fontSize:   BRAND.sizeSm,
            fontWeight: theme.typography.fontWeightBold,
            color:      theme.palette.text.primary,
          }}>
            {title}
          </Typography>
        </Box>
        {onEdit && (
          <Box
            onClick={onEdit}
            sx={{
              display:    "flex",
              alignItems: "center",
              gap:        0.4,
              cursor:     "pointer",
              color:      theme.palette.secondary.main,
              "&:hover":  { color: alpha(theme.palette.secondary.main, 0.7) },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 13 }} />
            <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, fontWeight: theme.typography.fontWeightMedium }}>
              Edit
            </Typography>
          </Box>
        )}
      </Box>

      {/* Body */}
      <Box sx={{ px: { xs: 1.75, md: 2.25 }, py: { xs: 1.25, md: 1.5 } }}>
        {children}
      </Box>
    </Box>
  );
};

// ── Info line ─────────────────────────────────────────────────
const InfoLine = ({ label, value }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 1, mb: 0.4 }}>
      <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, color: theme.palette.text.disabled, minWidth: 80 }}>
        {label}
      </Typography>
      <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.primary }}>
        {value}
      </Typography>
    </Box>
  );
};

const OrderReview = ({
  contact       = {},
  shipping      = {},
  shippingMethod= "standard",
  payment       = {},
  items         = [],
  total         = 0,
  currency      = "$",
  placing       = false,
  onBack,
  onPlaceOrder,
  onEditContact,
  onEditShipping,
  onEditPayment,
}) => {
  const theme     = useTheme();
  const delivery  = SHIPPING_LABELS[shippingMethod] ?? SHIPPING_LABELS.standard;

  const maskedCard = payment.cardNumber
    ? `•••• •••• •••• ${payment.cardNumber.replace(/\s/g,"").slice(-4)}`
    : null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 2.5 } }}>

      {/* ── Contact ─────────────────────────────── */}
      <ReviewSection icon={PersonOutlineIcon} title="Contact" onEdit={onEditContact}>
        <InfoLine label="Email"  value={contact.email  ?? "—"} />
        {contact.phone && <InfoLine label="Phone" value={contact.phone} />}
      </ReviewSection>

      {/* ── Shipping address ─────────────────────── */}
      <ReviewSection icon={LocalShippingOutlinedIcon} title="Shipping address" onEdit={onEditShipping}>
        <Typography sx={{
          fontFamily: BRAND.fontBody,
          fontSize:   BRAND.sizeSm,
          color:      theme.palette.text.primary,
          lineHeight: 1.75,
        }}>
          {shipping.firstName} {shipping.lastName}<br />
          {shipping.address1}{shipping.address2 ? `, ${shipping.address2}` : ""}<br />
          {shipping.city}{shipping.state ? `, ${shipping.state}` : ""} {shipping.zip}<br />
          {shipping.country}
        </Typography>

        {/* Delivery method */}
        <Box sx={{
          mt:           1.25,
          display:      "flex",
          alignItems:   "center",
          gap:          0.75,
          bgcolor:      alpha(theme.palette.primary.main, 0.04),
          borderRadius: BRAND.radiusButton,
          px:           1.25,
          py:           0.75,
        }}>
          <LocalShippingOutlinedIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.primary }}>
            {delivery.label}
          </Typography>
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, color: theme.palette.text.disabled }}>
            · {delivery.eta}
          </Typography>
        </Box>
      </ReviewSection>

      {/* ── Payment ──────────────────────────────── */}
      <ReviewSection icon={CreditCardIcon} title="Payment" onEdit={onEditPayment}>
        {payment.paymentMethod === "card" && maskedCard ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CreditCardIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
            <Typography sx={{ fontFamily: BRAND.fontMono, fontSize: BRAND.sizeSm, color: theme.palette.text.primary }}>
              {maskedCard}
            </Typography>
            <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, color: theme.palette.text.disabled }}>
              · expires {payment.expiry}
            </Typography>
          </Box>
        ) : payment.paymentMethod === "paypal" ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontFamily: BRAND.fontBody, fontWeight: 900, fontSize: BRAND.sizeSm, color: "#003087" }}>Pay</Typography>
            <Typography sx={{ fontFamily: BRAND.fontBody, fontWeight: 900, fontSize: BRAND.sizeSm, color: "#009cde" }}>Pal</Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <QrCodeIcon sx={{ fontSize: 16, color: "#0066CC" }} />
            <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, fontWeight: theme.typography.fontWeightBold, color: "#0066CC", letterSpacing: "0.04em" }}>UPI</Typography>
          </Box>
        )}
        {payment.cardName && (
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, color: theme.palette.text.secondary, mt: 0.4 }}>
            {payment.cardName}
          </Typography>
        )}
      </ReviewSection>

      {/* ── Items list ───────────────────────────── */}
      <Box sx={{
        border:       `1px solid ${theme.palette.divider}`,
        borderRadius: BRAND.radiusCard,
        overflow:     "hidden",
      }}>
        <Box sx={{
          px:           { xs: 1.75, md: 2.25 },
          py:           { xs: 1.25, md: 1.5  },
          bgcolor:      alpha(theme.palette.primary.main, 0.03),
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}>
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, fontWeight: theme.typography.fontWeightBold, color: theme.palette.text.primary }}>
            Items ({items.length})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", divide: `1px solid ${theme.palette.divider}` }}>
          {items.map((item, idx) => (
            <Box key={item.id ?? idx} sx={{
              display:     "flex",
              gap:         1.5,
              px:          { xs: 1.75, md: 2.25 },
              py:          { xs: 1.25, md: 1.5  },
              borderBottom: idx < items.length - 1 ? `1px solid ${theme.palette.divider}` : "none",
              alignItems:  "center",
            }}>
              <Box sx={{ position: "relative", flexShrink: 0 }}>
                <Avatar
                  src={item.image}
                  variant="rounded"
                  sx={{ width: { xs: 48, md: 56 }, height: { xs: 48, md: 56 }, borderRadius: BRAND.radiusButton, border: `1px solid ${theme.palette.divider}` }}
                >
                  {item.name?.[0]}
                </Avatar>
                <Box sx={{
                  position: "absolute", top: -5, right: -5,
                  minWidth: 17, height: 17, borderRadius: BRAND.radiusBadge,
                  bgcolor: theme.palette.primary.main, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: BRAND.fontBody, fontSize: "0.55rem", fontWeight: theme.typography.fontWeightBold, px: 0.4,
                }}>
                  {item.quantity ?? 1}
                </Box>
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.primary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name}
                </Typography>
                {item.variants && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.4, mt: 0.35 }}>
                    {Object.entries(item.variants).map(([k, v]) => v && (
                      <Chip key={k} label={`${k}: ${v}`} size="small" sx={{ height: 15, fontFamily: BRAND.fontBody, fontSize: "0.56rem", color: theme.palette.text.secondary, bgcolor: alpha(theme.palette.primary.main, 0.05), "& .MuiChip-label": { px: 0.7 }, borderRadius: BRAND.radiusBadge }} />
                    ))}
                  </Box>
                )}
              </Box>

              <PriceTag
                price={(item.price ?? 0) * (item.quantity ?? 1)}
                originalPrice={item.originalPrice ? (item.originalPrice * (item.quantity ?? 1)) : undefined}
                currency={currency}
                size="sm"
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Place order CTA ───────────────────────── */}
      <Box sx={{
        bgcolor:      alpha(theme.palette.secondary.main, 0.04),
        border:       `1px solid ${alpha(theme.palette.secondary.main, 0.15)}`,
        borderRadius: BRAND.radiusCard,
        p:            { xs: 2, md: 2.5 },
        display:      "flex",
        flexDirection:"column",
        gap:          1.5,
        alignItems:   "center",
      }}>
        <Typography sx={{
          fontFamily: BRAND.fontDisplay,
          fontSize:   { xs: BRAND.sizeSm, md: BRAND.sizeBody },
          fontWeight: theme.typography.fontWeightBold,
          color:      theme.palette.text.primary,
          textAlign:  "center",
        }}>
          Total due today:&nbsp;
          <Typography component="span" sx={{ fontFamily: BRAND.fontMono, color: theme.palette.secondary.main, fontWeight: theme.typography.fontWeightBlack, fontSize: "inherit" }}>
            {currency}{total.toFixed(2)}
          </Typography>
        </Typography>

        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={onPlaceOrder}
          disabled={placing}
          startIcon={placing ? <CircularProgress size={16} color="inherit" /> : <LockIcon sx={{ fontSize: 15 }} />}
          sx={{
            bgcolor:     theme.palette.secondary.main,
            "&:hover":   { bgcolor: alpha(theme.palette.secondary.main, 0.88) },
            fontSize:    { xs: BRAND.sizeSm, md: BRAND.sizeBody },
            py:          { xs: 1.5, md: 1.75 },
          }}
        >
          {placing ? "Placing order…" : "Place Order"}
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <LockIcon sx={{ fontSize: 11, color: theme.palette.text.disabled }} />
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXxs, color: theme.palette.text.disabled, textAlign: "center" }}>
            By placing your order you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Box>
      </Box>

      {/* Back */}
      <Button variant="ghost" fullWidth onClick={onBack} sx={{ color: theme.palette.text.secondary }}>
        ← Back to Payment
      </Button>
    </Box>
  );
};

export default OrderReview;
