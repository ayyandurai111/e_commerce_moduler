// ─────────────────────────────────────────────────────────────
//  AccountOverview — dashboard stats + recent order strip
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Grid, Divider, Chip, Avatar } from "@mui/material";
import ShoppingBagOutlinedIcon  from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon       from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StarOutlineIcon           from "@mui/icons-material/StarOutline";
import CheckCircleOutlineIcon    from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon            from "@mui/icons-material/AccessTime";
import { useTheme, alpha }       from "@mui/material/styles";
import { BRAND }                 from "../../../theme/theme";
import RatingStars               from "../../../components/common/RatingStars/RatingStars";

const StatCard = ({ icon: Icon, label, value, color, bg }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      display:      "flex",
      alignItems:   "center",
      gap:          2,
      p:            { xs: 2, md: 2.5 },
      border:       `1px solid ${theme.palette.divider}`,
      borderRadius: BRAND.radiusCard,
      bgcolor:      theme.palette.background.paper,
      boxShadow:    `0 2px 12px ${alpha(theme.palette.primary.main, 0.05)}`,
      transition:   "box-shadow 0.2s ease",
      "&:hover":    { boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.1)}` },
    }}>
      <Box sx={{
        width: { xs: 44, md: 52 }, height: { xs: 44, md: 52 },
        borderRadius: "14px",
        bgcolor: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon sx={{ fontSize: { xs: 22, md: 26 }, color }} />
      </Box>
      <Box>
        <Typography sx={{ fontFamily:BRAND.fontMono, fontWeight:900, fontSize:{ xs:"1.5rem", md:"1.75rem" }, color:theme.palette.text.primary, lineHeight:1 }}>
          {value}
        </Typography>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, mt:0.3 }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

const STATUS_COLOR = {
  Delivered:  "success",
  Shipped:    "info",
  Processing: "warning",
  Cancelled:  "error",
};

const RecentOrderRow = ({ order }) => {
  const theme = useTheme();
  const color = STATUS_COLOR[order.status] ?? "default";
  return (
    <Box sx={{
      display:     "flex",
      alignItems:  "center",
      gap:         { xs: 1.5, md: 2 },
      py:          { xs: 1.5, md: 2 },
      borderBottom:`1px solid ${theme.palette.divider}`,
      "&:last-child": { borderBottom: "none" },
    }}>
      <Avatar src={order.image} variant="rounded" sx={{
        width: { xs: 48, md: 56 }, height: { xs: 48, md: 56 },
        bgcolor: alpha(theme.palette.primary.main, 0.08),
        borderRadius: BRAND.radiusButton,
        flexShrink: 0,
      }}>
        <ShoppingBagOutlinedIcon sx={{ fontSize: 22, color: theme.palette.text.disabled }} />
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:600, fontSize:BRAND.sizeSm, color:theme.palette.text.primary, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {order.name}
        </Typography>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary, mt:0.2 }}>
          {order.orderId} · {order.date}
        </Typography>
      </Box>

      <Box sx={{ textAlign:"right", flexShrink:0 }}>
        <Typography sx={{ fontFamily:BRAND.fontMono, fontWeight:700, fontSize:BRAND.sizeSm, color:theme.palette.text.primary }}>
          ₹{order.amount?.toLocaleString("en-IN")}
        </Typography>
        <Chip
          label={order.status}
          size="small"
          color={color}
          sx={{
            mt: 0.4, height: 20,
            fontFamily: BRAND.fontBody, fontWeight: 700, fontSize: "0.6rem",
            "& .MuiChip-label": { px: 1 },
          }}
        />
      </Box>
    </Box>
  );
};

const AccountOverview = ({ user = {}, stats = {}, recentOrders = [], onViewOrders, sx = {} }) => {
  const theme = useTheme();

  const STATS = [
    { icon: ShoppingBagOutlinedIcon,   label:"Total Orders",    value: stats.totalOrders   ?? 0,  color: theme.palette.primary.main,   bg: alpha(theme.palette.primary.main,   0.08) },
    { icon: LocalShippingOutlinedIcon, label:"In Transit",      value: stats.inTransit     ?? 0,  color: theme.palette.info.main,      bg: alpha(theme.palette.info.main,      0.1)  },
    { icon: CheckCircleOutlineIcon,    label:"Delivered",       value: stats.delivered     ?? 0,  color: theme.palette.success.main,   bg: alpha(theme.palette.success.main,   0.1)  },
    { icon: FavoriteBorderIcon,        label:"Wishlist Items",  value: stats.wishlistCount ?? 0,  color: theme.palette.secondary.main, bg: alpha(theme.palette.secondary.main, 0.08) },
  ];

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:{ xs:3, md:4 }, ...sx }}>

      {/* Greeting */}
      <Box>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:theme.palette.secondary.main, mb:0.5 }}>
          Welcome back
        </Typography>
        <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:{ xs:"1.5rem", md:"2rem" }, color:theme.palette.text.primary, lineHeight:1.2 }}>
          {user.firstName} {user.lastName} 👋
        </Typography>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary, mt:0.5 }}>
          Here's what's happening with your account today.
        </Typography>
      </Box>

      {/* Stats grid */}
      <Grid container spacing={{ xs: 1.5, md: 2 }}>
        {STATS.map((s, i) => (
          <Grid item xs={6} md={6} lg={3} key={i}>
            <StatCard {...s} />
          </Grid>
        ))}
      </Grid>

      {/* Recent orders */}
      {recentOrders.length > 0 && (
        <Box sx={{
          border:       `1px solid ${theme.palette.divider}`,
          borderRadius: BRAND.radiusCard,
          bgcolor:      theme.palette.background.paper,
          overflow:     "hidden",
          boxShadow:    `0 2px 12px ${alpha(theme.palette.primary.main, 0.05)}`,
        }}>
          <Box sx={{
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "space-between",
            px:  { xs: 2, md: 2.5 },
            py:  { xs: 1.5, md: 2 },
            borderBottom:    `1px solid ${theme.palette.divider}`,
          }}>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm, color:theme.palette.text.primary }}>
              Recent Orders
            </Typography>
            <Typography
              onClick={onViewOrders}
              sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:600, color:theme.palette.secondary.main, cursor:"pointer", "&:hover":{ textDecoration:"underline" } }}
            >
              View All →
            </Typography>
          </Box>

          <Box sx={{ px: { xs: 2, md: 2.5 } }}>
            {recentOrders.slice(0, 4).map((o, i) => <RecentOrderRow key={i} order={o} />)}
          </Box>
        </Box>
      )}

      {/* Loyalty / points strip */}
      <Box sx={{
        display:      "flex",
        alignItems:   { xs:"flex-start", sm:"center" },
        justifyContent:"space-between",
        flexDirection:{ xs:"column", sm:"row" },
        gap:          2,
        p:            { xs:2, md:2.5 },
        border:       `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
        borderRadius: BRAND.radiusCard,
        background:   `linear-gradient(135deg,${alpha(theme.palette.warning.main,0.06)} 0%,${alpha(theme.palette.secondary.main,0.05)} 100%)`,
      }}>
        <Box sx={{ display:"flex", alignItems:"center", gap:1.5 }}>
          <StarOutlineIcon sx={{ fontSize:28, color:theme.palette.warning.main }} />
          <Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm, color:theme.palette.text.primary }}>
              Luxe Reward Points
            </Typography>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>
              Earn 1 point for every ₹100 spent
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign:{ xs:"left", sm:"right" } }}>
          <Typography sx={{ fontFamily:BRAND.fontMono, fontWeight:900, fontSize:"1.5rem", color:theme.palette.warning.main, lineHeight:1 }}>
            {(stats.loyaltyPoints ?? 0).toLocaleString("en-IN")}
          </Typography>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>
            points available
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountOverview;
