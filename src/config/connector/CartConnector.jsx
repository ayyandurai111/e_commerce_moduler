// ─────────────────────────────────────────────────────────────
//  CartConnector.jsx
// ─────────────────────────────────────────────────────────────
import React         from "react";
import { useNavigate } from "react-router-dom";
import CartPage      from "../../pages/Cart/CartPage";
import navbarProps   from "./shared/navbarProps";
import footerProps   from "./shared/footerProps";

const CartConnector = () => {
  const navigate = useNavigate();
  return (
    <CartPage
      navbar={{
        ...navbarProps,
        onCartClick:     () => navigate("/cart"),
        onWishlistClick: () => navigate("/wishlist"),
        onAccountClick:  () => navigate("/login"),
        onSearch:        (q) => navigate(`/search?q=${encodeURIComponent(q)}`),
      }}
      footer={footerProps}
      onCheckout={()         => navigate("/checkout")}
      onContinueShopping={() => navigate("/products")}
      onProductClick={(p)    => navigate(`/products/${p?.slug ?? p?.id ?? "demo"}`)}
    />
  );
};
export default CartConnector;
