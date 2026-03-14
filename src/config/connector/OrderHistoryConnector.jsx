// ─────────────────────────────────────────────────────────────
//  OrderHistoryConnector.jsx
// ─────────────────────────────────────────────────────────────
import React            from "react";
import { useNavigate }  from "react-router-dom";
import OrderHistoryPage from "../../pages/OrderHistory/OrderHistoryPage";
import navbarProps      from "./shared/navbarProps";
import footerProps      from "./shared/footerProps";

const OrderHistoryConnector = () => {
  const navigate = useNavigate();
  return (
    <OrderHistoryPage
      navbar={{
        ...navbarProps,
        onCartClick:     () => navigate("/cart"),
        onWishlistClick: () => navigate("/wishlist"),
        onAccountClick:  () => navigate("/account"),
        onSearch:        (q) => navigate(`/search?q=${encodeURIComponent(q)}`),
      }}
      footer={footerProps}
      onOrderClick={(order) => console.log("Order detail:", order?.id)}
      onContinueShopping={() => navigate("/products")}
    />
  );
};
export default OrderHistoryConnector;
