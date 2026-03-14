// ─────────────────────────────────────────────────────────────
//  MyAccountConnector.jsx
// ─────────────────────────────────────────────────────────────
import React         from "react";
import { useNavigate } from "react-router-dom";
import MyAccountPage from "../../pages/MyAccount/MyAccountPage";
import navbarProps   from "./shared/navbarProps";
import footerProps   from "./shared/footerProps";

const MyAccountConnector = () => {
  const navigate = useNavigate();
  return (
    <MyAccountPage
      navbar={{
        ...navbarProps,
        onCartClick:     () => navigate("/cart"),
        onWishlistClick: () => navigate("/wishlist"),
        onAccountClick:  () => navigate("/account"),
        onSearch:        (q) => navigate(`/search?q=${encodeURIComponent(q)}`),
      }}
      footer={footerProps}
      onOrdersClick={()   => navigate("/orders")}
      onWishlistClick={() => navigate("/wishlist")}
      onLogout={()        => navigate("/login")}
    />
  );
};
export default MyAccountConnector;
