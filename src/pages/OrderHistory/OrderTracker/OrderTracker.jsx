// ─────────────────────────────────────────────────────────────
//  OrderTracker — visual step-by-step order status timeline
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon          from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ReceiptOutlinedIcon      from "@mui/icons-material/ReceiptOutlined";
import InventoryOutlinedIcon    from "@mui/icons-material/InventoryOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HomeOutlinedIcon         from "@mui/icons-material/HomeOutlined";
import { useTheme, alpha }      from "@mui/material/styles";
import { BRAND }                from "../../../theme/theme";

const STEPS = [
  { key:"placed",    label:"Order Placed",    Icon:ReceiptOutlinedIcon       },
  { key:"confirmed", label:"Confirmed",       Icon:InventoryOutlinedIcon     },
  { key:"shipped",   label:"Shipped",         Icon:LocalShippingOutlinedIcon },
  { key:"delivered", label:"Delivered",       Icon:HomeOutlinedIcon          },
];

const STATUS_STEP = {
  Processing: 1,
  Confirmed:  2,
  Shipped:    3,
  Delivered:  4,
  Cancelled:  0,
};

const OrderTracker = ({ status = "Processing", timeline = [], sx = {} }) => {
  const theme     = useTheme();
  const activeIdx = (STATUS_STEP[status] ?? 1) - 1;
  const cancelled = status === "Cancelled";

  return (
    <Box sx={{ ...sx }}>
      {/* Step row */}
      <Box sx={{ display:"flex", alignItems:"flex-start", position:"relative" }}>
        {/* Connector line underneath */}
        <Box sx={{
          position: "absolute",
          top:      { xs:14, md:18 },
          left:     "calc(12.5% - 1px)",
          right:    "calc(12.5% - 1px)",
          height:   2,
          bgcolor:  theme.palette.divider,
          zIndex:   0,
        }} />
        {/* Active portion */}
        {!cancelled && (
          <Box sx={{
            position:  "absolute",
            top:       { xs:14, md:18 },
            left:      "calc(12.5% - 1px)",
            width:     `${(activeIdx / (STEPS.length - 1)) * 75}%`,
            height:    2,
            bgcolor:   theme.palette.secondary.main,
            zIndex:    1,
            transition:"width 0.4s ease",
          }} />
        )}

        {STEPS.map((step, i) => {
          const done    = !cancelled && i <= activeIdx;
          const current = !cancelled && i === activeIdx;
          return (
            <Box key={step.key} sx={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", zIndex:2 }}>
              {/* Icon bubble */}
              <Box sx={{
                width:  { xs:28, md:36 }, height:{ xs:28, md:36 },
                borderRadius: "50%",
                bgcolor: done
                  ? current ? theme.palette.secondary.main : theme.palette.success.main
                  : cancelled ? alpha(theme.palette.error.main,0.12) : theme.palette.background.default,
                border:  `2px solid ${done ? (current ? theme.palette.secondary.main : theme.palette.success.main) : theme.palette.divider}`,
                display: "flex", alignItems:"center", justifyContent:"center",
                transition: "all 0.3s ease",
                boxShadow: current ? `0 0 0 4px ${alpha(theme.palette.secondary.main,0.15)}` : "none",
              }}>
                {done
                  ? <CheckCircleIcon sx={{ fontSize:{ xs:14, md:18 }, color:"#fff" }} />
                  : <step.Icon sx={{ fontSize:{ xs:12, md:15 }, color:cancelled ? theme.palette.error.main : theme.palette.text.disabled }} />
                }
              </Box>

              {/* Label */}
              <Typography sx={{
                fontFamily: BRAND.fontBody,
                fontSize:   { xs:"0.58rem", sm:BRAND.sizeXxs, md:"0.72rem" },
                fontWeight: current ? 700 : done ? 600 : 400,
                color:      done ? theme.palette.text.primary : theme.palette.text.disabled,
                mt:         0.75,
                textAlign:  "center",
                lineHeight: 1.3,
                px:         0.5,
              }}>
                {step.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Timeline detail */}
      {timeline.length > 0 && (
        <Box sx={{ mt:2.5, display:"flex", flexDirection:"column", gap:1 }}>
          {timeline.map((t, i) => (
            <Box key={i} sx={{ display:"flex", gap:1.5, alignItems:"flex-start" }}>
              <Box sx={{ width:8, height:8, borderRadius:"50%", bgcolor:i===0?theme.palette.secondary.main:theme.palette.divider, flexShrink:0, mt:0.5 }} />
              <Box>
                <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:600, color:theme.palette.text.primary, lineHeight:1.4 }}>
                  {t.status}
                </Typography>
                <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>
                  {t.location} · {t.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default OrderTracker;
