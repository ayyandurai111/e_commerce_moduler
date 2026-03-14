// ─────────────────────────────────────────────────────────────
//  WishlistConnector.jsx
// ─────────────────────────────────────────────────────────────
import React          from "react";
import { useNavigate } from "react-router-dom";
import WishlistPage   from "../../pages/Wishlist/WishlistPage";
import navbarProps    from "./shared/navbarProps";
import footerProps    from "./shared/footerProps";

const WishlistConnector = () => {
  const navigate = useNavigate();
  return (
    <WishlistPage
      navbar={{
        ...navbarProps,
        onCartClick:     () => navigate("/cart"),
        onWishlistClick: () => navigate("/wishlist"),
        onAccountClick:  () => navigate("/login"),
        onSearch:        (q) => navigate(`/search?q=${encodeURIComponent(q)}`),
      }}
      footer={footerProps}
      onProductClick={(p) => navigate(`/products/${p?.slug ?? p?.id ?? "demo"}`)}
      onAddToCart={(p)    => { console.log("Wishlist → cart:", p?.name); navigate("/cart"); }}
      onContinueShopping={() => navigate("/products")}
    />
  );
};
export default WishlistConnector;
