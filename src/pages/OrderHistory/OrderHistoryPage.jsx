// ─────────────────────────────────────────────────────────────
//  OrderHistoryPage — view past and current orders with tracking
//
//  Features:
//    • Filter by status (All / Processing / Shipped / Delivered / Cancelled)
//    • Search by order ID or product name
//    • Expandable OrderCard with tracker, items, totals, actions
//    • Empty state per filter
//    • Breadcrumb trail
// ─────────────────────────────────────────────────────────────
import React, { useState, useMemo } from "react";
import { Box, Container, Typography, Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon              from "@mui/icons-material/NavigateNext";
import ShoppingBagOutlinedIcon       from "@mui/icons-material/ShoppingBagOutlined";
import { useTheme, alpha }           from "@mui/material/styles";
import { BRAND }                     from "../../theme/theme";
import Navbar                        from "../../components/layout/Navbar/Navbar";
import Footer                        from "../../components/layout/Footer/Footer";
import OrderFilters                  from "./OrderFilters/OrderFilters";
import OrderCard                     from "./OrderCard/OrderCard";

const EmptyOrders = ({ filter }) => {
  const theme = useTheme();
  return (
    <Box sx={{ py:{ xs:6, md:10 }, textAlign:"center" }}>
      <ShoppingBagOutlinedIcon sx={{ fontSize:64, color:theme.palette.text.disabled, mb:2 }} />
      <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:700, fontSize:"1.25rem", color:theme.palette.text.primary, mb:0.75 }}>
        No {filter !== "All" ? filter.toLowerCase() : ""} orders found
      </Typography>
      <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary }}>
        {filter === "All"
          ? "You haven't placed any orders yet. Start shopping!"
          : `You have no orders with status "${filter}".`}
      </Typography>
    </Box>
  );
};

const OrderHistoryPage = ({
  orders         = [],
  navbar         = {},
  footer         = {},
  onTrackOrder,
  onReorder,
  onDownloadInvoice,
  onShopNow,
}) => {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery,  setSearchQuery]  = useState("");

  const filtered = useMemo(() => {
    let list = orders;
    if (activeFilter !== "All") list = list.filter(o => o.status === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o =>
        o.orderId?.toLowerCase().includes(q) ||
        o.items?.some(i => i.name?.toLowerCase().includes(q))
      );
    }
    return list;
  }, [orders, activeFilter, searchQuery]);

  return (
    <Box sx={{ backgroundColor:theme.palette.background.default, minHeight:"100vh" }}>
      <Navbar {...navbar} />

      <Container maxWidth="xl" sx={{ pt:{ xs:2.5, md:4 }, pb:{ xs:6, md:8 } }}>

        {/* Breadcrumbs */}
        <Box sx={{ display:{ xs:"none", sm:"block" }, mb:2.5 }}>
          <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize:13 }} />}>
            <Link href="#" underline="hover" sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>Home</Link>
            <Link href="#" underline="hover" sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>My Account</Link>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:600, color:theme.palette.text.primary }}>Order History</Typography>
          </Breadcrumbs>
        </Box>

        {/* Page header */}
        <Box sx={{ mb:{ xs:2.5, md:3.5 }, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:1 }}>
          <Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:theme.palette.secondary.main, mb:0.5 }}>
              My Account
            </Typography>
            <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:{ xs:"1.6rem", md:"2.25rem" }, color:theme.palette.text.primary, lineHeight:1.15 }}>
              Order History
            </Typography>
          </Box>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>
            {orders.length} order{orders.length !== 1 ? "s" : ""} total
          </Typography>
        </Box>

        {/* Filters */}
        <OrderFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sx={{ mb:{ xs:2.5, md:3 } }}
        />

        {/* Order list */}
        {filtered.length === 0 ? (
          <EmptyOrders filter={activeFilter} />
        ) : (
          <Box sx={{ display:"flex", flexDirection:"column", gap:{ xs:2, md:2.5 } }}>
            {filtered.map((order, i) => (
              <OrderCard
                key={order.orderId ?? i}
                order={order}
                onTrackOrder={onTrackOrder}
                onReorder={onReorder}
                onDownloadInvoice={onDownloadInvoice}
              />
            ))}
          </Box>
        )}
      </Container>

      <Footer {...footer} />
    </Box>
  );
};

export default OrderHistoryPage;
