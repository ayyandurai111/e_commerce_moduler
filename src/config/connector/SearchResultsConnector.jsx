// ─────────────────────────────────────────────────────────────
//  SearchResultsConnector.jsx
// ─────────────────────────────────────────────────────────────
import React              from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchResultsPage  from "../../pages/SearchResults/SearchResultsPage";
import navbarProps        from "./shared/navbarProps";
import footerProps        from "./shared/footerProps";

const SearchResultsConnector = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <SearchResultsPage
      query={query}
      navbar={{
        ...navbarProps,
        onCartClick:     () => navigate("/cart"),
        onWishlistClick: () => navigate("/wishlist"),
        onAccountClick:  () => navigate("/login"),
        onSearch:        (q) => navigate(`/search?q=${encodeURIComponent(q)}`),
      }}
      footer={footerProps}
      onProductClick={(p) => navigate(`/products/${p?.slug ?? p?.id ?? "demo"}`)}
      onAddToCart={(p)    => { console.log("Search → cart:", p?.name); navigate("/cart"); }}
    />
  );
};
export default SearchResultsConnector;
