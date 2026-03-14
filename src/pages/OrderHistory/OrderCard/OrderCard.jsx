// ─────────────────────────────────────────────────────────────
//  OrderCard — collapsible card showing one order's items,
//              status, tracker, and action buttons
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Box, Typography, Avatar, Chip, Divider, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon        from "@mui/icons-material/ExpandMore";
import ExpandLessIcon        from "@mui/icons-material/ExpandLess";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptOutlinedIcon   from "@mui/icons-material/ReceiptOutlined";
import ReplayIcon            from "@mui/icons-material/Replay";
import { useTheme, alpha }   from "@mui/material/styles";
import { BRAND }             from "../../../theme/theme";
import Button                from "../../../components/common/Button/Button";
import PriceTag              from "../../../components/common/PriceTag/PriceTag";
import OrderTracker          from "../OrderTracker/OrderTracker";
import { STORE_CURRENCY }    from "../../../config/store/storeConfig";

const STATUS_CHIP = {
  Delivered:  { color:"success" },
  Shipped:    { color:"info"    },
  Processing: { color:"warning" },
  Confirmed:  { color:"primary" },
  Cancelled:  { color:"error"   },
};

const OrderItem = ({ item }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display:"flex", gap:{ xs:1.5, md:2 }, py:1.5, borderBottom:`1px solid ${theme.palette.divider}`, "&:last-child":{ borderBottom:"none" } }}>
      <Avatar variant="rounded" src={item.image} sx={{
        width:{ xs:56, md:68 }, height:{ xs:56, md:68 },
        borderRadius:BRAND.radiusButton,
        bgcolor: alpha(theme.palette.primary.main,0.07),
        flexShrink:0,
      }} />
      <Box sx={{ flex:1, minWidth:0 }}>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:600, fontSize:BRAND.sizeSm, color:theme.palette.text.primary, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {item.name}
        </Typography>
        {item.brand && (
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:700, color:theme.palette.secondary.main, letterSpacing:"0.08em", textTransform:"uppercase", mt:0.2 }}>
            {item.brand}
          </Typography>
        )}
        <Box sx={{ display:"flex", gap:1, flexWrap:"wrap", mt:0.5 }}>
          {item.variants && Object.entries(item.variants).map(([k,v])=>(
            <Typography key={k} sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>
              {k.charAt(0).toUpperCase()+k.slice(1)}: <strong>{v}</strong>
            </Typography>
          ))}
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>
            Qty: <strong>{item.quantity}</strong>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign:"right", flexShrink:0 }}>
        <PriceTag price={item.price} originalPrice={item.originalPrice} currency={STORE_CURRENCY} size="small" />
      </Box>
    </Box>
  );
};

const OrderCard = ({ order, onTrackOrder, onReorder, onDownloadInvoice, sx = {} }) => {
  const theme    = useTheme();
  const [open, setOpen] = useState(false);
  const chipProps = STATUS_CHIP[order.status] ?? { color:"default" };

  return (
    <Box sx={{
      border:       `1px solid ${theme.palette.divider}`,
      borderRadius: BRAND.radiusCard,
      bgcolor:      theme.palette.background.paper,
      overflow:     "hidden",
      boxShadow:    `0 2px 12px ${alpha(theme.palette.primary.main,0.05)}`,
      transition:   "box-shadow 0.2s",
      "&:hover":    { boxShadow:`0 6px 24px ${alpha(theme.palette.primary.main,0.1)}` },
      ...sx,
    }}>
      {/* ── Header ──────────────────────────────────── */}
      <Box sx={{
        display:       "flex",
        alignItems:    { xs:"flex-start", sm:"center" },
        flexDirection: { xs:"column", sm:"row" },
        justifyContent:"space-between",
        gap:           1.5,
        px:            { xs:2, md:2.5 },
        py:            { xs:1.75, md:2.25 },
        bgcolor:       alpha(theme.palette.primary.main,0.025),
        borderBottom:  `1px solid ${theme.palette.divider}`,
      }}>
        <Box sx={{ display:"flex", flexWrap:"wrap", gap:{ xs:1.5, md:3 } }}>
          <Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary, textTransform:"uppercase", letterSpacing:"0.06em" }}>Order ID</Typography>
            <Typography sx={{ fontFamily:BRAND.fontMono, fontWeight:700, fontSize:BRAND.sizeSm, color:theme.palette.text.primary }}>{order.orderId}</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary, textTransform:"uppercase", letterSpacing:"0.06em" }}>Placed On</Typography>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:600, fontSize:BRAND.sizeSm, color:theme.palette.text.primary }}>{order.date}</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary, textTransform:"uppercase", letterSpacing:"0.06em" }}>Total</Typography>
            <Typography sx={{ fontFamily:BRAND.fontMono, fontWeight:700, fontSize:BRAND.sizeSm, color:theme.palette.text.primary }}>{STORE_CURRENCY}{order.total?.toLocaleString("en-IN")}</Typography>
          </Box>
        </Box>
        <Box sx={{ display:"flex", alignItems:"center", gap:1.5 }}>
          <Chip
            label={order.status}
            size="small"
            color={chipProps.color}
            sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:"0.7rem", height:26, "& .MuiChip-label":{ px:1.25 } }}
          />
          <IconButton size="small" onClick={()=>setOpen(o=>!o)} sx={{ color:theme.palette.text.secondary }}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* ── Items preview (collapsed) ────────────────── */}
      {!open && (
        <Box sx={{
          display:    "flex",
          alignItems: "center",
          gap:        1.5,
          px:         { xs:2, md:2.5 },
          py:         1.5,
          cursor:     "pointer",
          "&:hover":  { bgcolor:alpha(theme.palette.primary.main,0.02) },
        }} onClick={()=>setOpen(true)}>
          <Box sx={{ display:"flex", gap:0.75 }}>
            {order.items?.slice(0,3).map((item,i)=>(
              <Avatar key={i} variant="rounded" src={item.image} sx={{
                width:40, height:40, borderRadius:BRAND.radiusButton,
                bgcolor:alpha(theme.palette.primary.main,0.07), flexShrink:0,
              }} />
            ))}
            {(order.items?.length??0) > 3 && (
              <Box sx={{ width:40, height:40, borderRadius:BRAND.radiusButton, bgcolor:alpha(theme.palette.primary.main,0.07), display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>
                  +{order.items.length-3}
                </Typography>
              </Box>
            )}
          </Box>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, flex:1 }}>
            {order.items?.length} item{order.items?.length !== 1 ? "s" : ""}
            {order.deliveryDate ? ` · ${order.status === "Delivered" ? "Delivered" : "Expected"} ${order.deliveryDate}` : ""}
          </Typography>
          <ExpandMoreIcon sx={{ fontSize:18, color:theme.palette.text.disabled }} />
        </Box>
      )}

      {/* ── Expanded detail ───────────────────────────── */}
      <Collapse in={open}>
        <Box sx={{ px:{ xs:2, md:2.5 } }}>

          {/* Tracker */}
          {order.status !== "Cancelled" && (
            <Box sx={{ py:2.5, borderBottom:`1px solid ${theme.palette.divider}` }}>
              <OrderTracker status={order.status} timeline={order.timeline ?? []} />
            </Box>
          )}

          {/* Items */}
          <Box sx={{ py:0.5 }}>
            {order.items?.map((item,i) => <OrderItem key={i} item={item} />)}
          </Box>

          {/* Totals */}
          <Divider />
          <Box sx={{ py:2, display:"flex", flexDirection:"column", gap:0.75, maxWidth:280, ml:"auto" }}>
            {[
              { label:"Subtotal",  value:`${STORE_CURRENCY}${(order.subtotal??order.total)?.toLocaleString("en-IN")}` },
              { label:"Shipping",  value:order.shipping === 0 ? "FREE" : `${STORE_CURRENCY}${order.shipping?.toLocaleString("en-IN")}` },
              ...(order.discount ? [{ label:"Discount", value:`-${STORE_CURRENCY}${order.discount.toLocaleString("en-IN")}`, red:true }] : []),
            ].map(r=>(
              <Box key={r.label} sx={{ display:"flex", justifyContent:"space-between", gap:2 }}>
                <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>{r.label}</Typography>
                <Typography sx={{ fontFamily:BRAND.fontMono, fontWeight:600, fontSize:BRAND.sizeXs, color:r.red?theme.palette.success.main:theme.palette.text.primary }}>{r.value}</Typography>
              </Box>
            ))}
            <Divider sx={{ my:0.5 }} />
            <Box sx={{ display:"flex", justifyContent:"space-between" }}>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm }}>Total Paid</Typography>
              <Typography sx={{ fontFamily:BRAND.fontMono, fontWeight:900, fontSize:BRAND.sizeSm, color:theme.palette.secondary.main }}>{STORE_CURRENCY}{order.total?.toLocaleString("en-IN")}</Typography>
            </Box>
          </Box>

          {/* Actions */}
          <Divider />
          <Box sx={{ py:2, display:"flex", gap:1, flexWrap:"wrap" }}>
            {order.status === "Shipped" && (
              <Button variant="primary" size="sm" startIcon={<LocalShippingOutlinedIcon />} onClick={()=>onTrackOrder?.(order)}>
                Track Shipment
              </Button>
            )}
            <Button variant="secondary" size="sm" startIcon={<ReplayIcon />} onClick={()=>onReorder?.(order)}>
              Reorder
            </Button>
            <Button variant="ghost" size="sm" startIcon={<ReceiptOutlinedIcon />} onClick={()=>onDownloadInvoice?.(order)}>
              Invoice
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default OrderCard;
