// ─────────────────────────────────────────────────────────────
//  CheckoutConnector.jsx
// ─────────────────────────────────────────────────────────────
import React         from "react";
import { useNavigate } from "react-router-dom";
import CheckoutPage  from "../../pages/Checkout/CheckoutPage";
import navbarProps   from "./shared/navbarProps";
import footerProps   from "./shared/footerProps";

const CheckoutConnector = () => {
  const navigate = useNavigate();
  return (
    <CheckoutPage
      navbar={{
        ...navbarProps,
        onCartClick:     () => navigate("/cart"),
        onWishlistClick: () => navigate("/wishlist"),
        onAccountClick:  () => navigate("/login"),
        onSearch:        (q) => navigate(`/search?q=${encodeURIComponent(q)}`),
      }}
      footer={footerProps}
      onOrderComplete={() => navigate("/orders")}
      onBackToCart={()    => navigate("/cart")}
    />
  );
};
export default CheckoutConnector;
