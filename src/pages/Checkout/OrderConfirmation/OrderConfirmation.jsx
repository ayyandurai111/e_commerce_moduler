// ─────────────────────────────────────────────────────────────
//  OrderConfirmation — Success screen shown after order placed
//
//  Shows:
//    • Animated checkmark ring
//    • Order number + confirmation email note
//    • Estimated delivery date range
//    • Order timeline (Processing → Dispatched → Delivered)
//    • Mini item grid
//    • CTA: Track Order / Continue Shopping
//    • Social share nudge
// ─────────────────────────────────────────────────────────────
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Divider, Avatar, Chip,
} from "@mui/material";
import CheckIcon                 from "@mui/icons-material/Check";
import InventoryOutlinedIcon     from "@mui/icons-material/InventoryOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DoneAllIcon               from "@mui/icons-material/DoneAll";
import { useTheme, alpha }       from "@mui/material/styles";
import { BRAND }                 from "../../../theme/theme";
import Button                    from "../../../components/common/Button/Button";

// ── Generate a fake order number ─────────────────────────────
const makeOrderNum = () =>
  "LX-" + Math.random().toString(36).toUpperCase().slice(2, 6) +
  "-" + Math.floor(1000 + Math.random() * 9000);

// ── Delivery estimate ─────────────────────────────────────────
const getEta = (method) => {
  const days = method === "overnight" ? 1 : method === "express" ? 3 : 7;
  const from = new Date(); from.setDate(from.getDate() + days);
  const to   = new Date(); to.setDate(to.getDate() + days + 2);
  const fmt  = (d) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  return method === "overnight" ? fmt(from) : `${fmt(from)} – ${fmt(to)}`;
};

// ── Timeline step ─────────────────────────────────────────────
const TimelineStep = ({ icon: Icon, label, sub, done, active, last }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <Box sx={{
          width:        32, height: 32,
          borderRadius: "50%",
          bgcolor:      done
            ? theme.palette.success.main
            : active
              ? alpha(theme.palette.secondary.main, 0.12)
              : alpha(theme.palette.primary.main, 0.06),
          border:       active ? `2px solid ${theme.palette.secondary.main}` : "2px solid transparent",
          display:      "flex", alignItems: "center", justifyContent: "center",
          transition:   "all 0.3s ease",
        }}>
          <Icon sx={{
            fontSize: 15,
            color:    done
              ? "#fff"
              : active
                ? theme.palette.secondary.main
                : theme.palette.text.disabled,
          }} />
        </Box>
        {!last && (
          <Box sx={{ width: 2, height: 28, bgcolor: done ? theme.palette.success.main : theme.palette.divider, mt: 0.5, mb: 0.5, transition: "background 0.4s ease" }} />
        )}
      </Box>
      <Box sx={{ pb: last ? 0 : 1 }}>
        <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, fontWeight: done || active ? theme.typography.fontWeightBold : theme.typography.fontWeightNormal, color: done ? theme.palette.success.main : active ? theme.palette.secondary.main : theme.palette.text.disabled, lineHeight: 1.3 }}>
          {label}
        </Typography>
        <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, color: theme.palette.text.disabled }}>
          {sub}
        </Typography>
      </Box>
    </Box>
  );
};

const OrderConfirmation = ({
  items          = [],
  contact        = {},
  shippingMethod = "standard",
  currency       = "$",
  total          = 0,
  onContinueShopping,
  onTrackOrder,
}) => {
  const theme = useTheme();
  const [orderNum]  = useState(makeOrderNum);
  const [animated,  setAnimated]  = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const eta = getEta(shippingMethod);

  return (
    <Box sx={{
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      textAlign:      "center",
      py:             { xs: 4, md: 6 },
      px:             { xs: 2, md: 0 },
    }}>
      {/* ── Animated checkmark ring ──────────────── */}
      <Box sx={{
        position:     "relative",
        width:        { xs: 88, md: 108 },
        height:       { xs: 88, md: 108 },
        mb:           { xs: 3, md: 4 },
        borderRadius: "50%",
        bgcolor:      alpha(theme.palette.success.main, 0.1),
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        transition:   "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        transform:    animated ? "scale(1)" : "scale(0.5)",
        "&::before":  {
          content:      '""',
          position:     "absolute",
          inset:        -10,
          borderRadius: "50%",
          border:       `2px dashed ${alpha(theme.palette.success.main, 0.25)}`,
        },
      }}>
        <Box sx={{
          width:        { xs: 56, md: 68 },
          height:       { xs: 56, md: 68 },
          borderRadius: "50%",
          bgcolor:      theme.palette.success.main,
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          boxShadow:    `0 8px 24px ${alpha(theme.palette.success.main, 0.4)}`,
        }}>
          <CheckIcon sx={{ fontSize: { xs: 28, md: 34 }, color: "#fff", strokeWidth: 3 }} />
        </Box>
      </Box>

      {/* ── Heading ──────────────────────────────── */}
      <Typography sx={{
        fontFamily: BRAND.fontDisplay,
        fontSize:   { xs: BRAND.sizeH4, sm: BRAND.sizeH3, md: BRAND.sizeH2 },
        fontWeight: theme.typography.fontWeightBold,
        color:      theme.palette.text.primary,
        lineHeight: 1.2,
        mb:         1,
      }}>
        Order confirmed! 🎉
      </Typography>

      <Typography sx={{
        fontFamily: BRAND.fontBody,
        fontSize:   { xs: BRAND.sizeSm, md: BRAND.sizeBody },
        color:      theme.palette.text.secondary,
        maxWidth:   420,
        lineHeight: 1.7,
        mb:         0.5,
      }}>
        Thank you for your purchase. A confirmation has been sent to{" "}
        <Typography component="span" sx={{ fontWeight: theme.typography.fontWeightBold, color: theme.palette.text.primary }}>
          {contact.email}
        </Typography>
      </Typography>

      {/* ── Order number chip ─────────────────────── */}
      <Chip
        label={`Order #${orderNum}`}
        sx={{
          mt:          1.5,
          mb:          { xs: 3, md: 4 },
          fontFamily:  BRAND.fontMono,
          fontSize:    BRAND.sizeSm,
          fontWeight:  theme.typography.fontWeightBold,
          bgcolor:     alpha(theme.palette.primary.main, 0.07),
          color:       theme.palette.primary.main,
          borderRadius: BRAND.radiusBadge,
          "& .MuiChip-label": { px: 2 },
          height:      32,
        }}
      />

      {/* ── Main card ─────────────────────────────── */}
      <Box sx={{
        width:        "100%",
        maxWidth:     520,
        border:       `1px solid ${theme.palette.divider}`,
        borderRadius: BRAND.radiusCard,
        overflow:     "hidden",
        textAlign:    "left",
        mb:           { xs: 3, md: 4 },
      }}>
        {/* Estimated delivery banner */}
        <Box sx={{
          bgcolor:    theme.palette.success.main,
          px:         { xs: 2, md: 2.5 },
          py:         { xs: 1.25, md: 1.5 },
          display:    "flex",
          alignItems: "center",
          gap:        1,
        }}>
          <LocalShippingOutlinedIcon sx={{ fontSize: 16, color: "#fff" }} />
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, fontWeight: theme.typography.fontWeightBold, color: "#fff" }}>
            Estimated delivery: {eta}
          </Typography>
        </Box>

        {/* Order timeline */}
        <Box sx={{ px: { xs: 2, md: 2.5 }, py: { xs: 2, md: 2.5 } }}>
          <TimelineStep icon={InventoryOutlinedIcon}     label="Order received"  sub="We've got it — processing now"     done   active={false} />
          <TimelineStep icon={LocalShippingOutlinedIcon} label="Dispatched"      sub="Your order is on its way"          done={false} active={false} />
          <TimelineStep icon={DoneAllIcon}               label="Delivered"       sub={`Expected ${eta}`}                 done={false} active={false} last />
        </Box>

        <Divider />

        {/* Mini item grid */}
        <Box sx={{ px: { xs: 2, md: 2.5 }, py: { xs: 1.5, md: 2 } }}>
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, fontWeight: theme.typography.fontWeightBold, color: theme.palette.text.secondary, mb: 1.25, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Your items
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {items.slice(0, 6).map((item, i) => (
              <Box key={item.id ?? i} sx={{ position: "relative" }}>
                <Avatar
                  src={item.image}
                  variant="rounded"
                  sx={{ width: { xs: 48, md: 56 }, height: { xs: 48, md: 56 }, borderRadius: BRAND.radiusButton, border: `1px solid ${theme.palette.divider}` }}
                >
                  {item.name?.[0]}
                </Avatar>
                <Box sx={{ position: "absolute", top: -5, right: -5, minWidth: 16, height: 16, borderRadius: BRAND.radiusBadge, bgcolor: theme.palette.primary.main, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: BRAND.fontBody, fontSize: "0.5rem", fontWeight: theme.typography.fontWeightBold, px: 0.35 }}>
                  {item.quantity ?? 1}
                </Box>
              </Box>
            ))}
            {items.length > 6 && (
              <Box sx={{ width: { xs: 48, md: 56 }, height: { xs: 48, md: 56 }, borderRadius: BRAND.radiusButton, bgcolor: alpha(theme.palette.primary.main, 0.06), display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, fontWeight: theme.typography.fontWeightBold, color: theme.palette.text.secondary }}>
                  +{items.length - 6}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Divider />

        {/* Total */}
        <Box sx={{ px: { xs: 2, md: 2.5 }, py: { xs: 1.25, md: 1.5 }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, color: theme.palette.text.secondary }}>
            Total charged
          </Typography>
          <Typography sx={{ fontFamily: BRAND.fontMono, fontSize: BRAND.sizeBody, fontWeight: theme.typography.fontWeightBlack, color: theme.palette.secondary.main }}>
            {currency}{total.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {/* ── CTA buttons ──────────────────────────── */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, width: "100%", maxWidth: 420 }}>
        {onTrackOrder && (
          <Button variant="primary" fullWidth size="lg" onClick={() => onTrackOrder(orderNum)}>
            Track Order
          </Button>
        )}
        <Button
          variant={onTrackOrder ? "outline" : "primary"}
          fullWidth
          size="lg"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default OrderConfirmation;
