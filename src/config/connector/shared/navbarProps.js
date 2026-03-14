// ─────────────────────────────────────────────────────────────
//  navbarProps.js
//  Shared base navbar configuration used across all pages.
//  Each connector can spread this and override specific keys.
//
//  Usage:
//    import navbarProps from './shared/navbarProps';
//    <Page navbar={{ ...navbarProps, cartCount: 5 }} />
// ─────────────────────────────────────────────────────────────
import storeConfig from "../../store/storeConfig";

const navbarProps = {
  enabled:          true,
  storeName:        storeConfig.name,
  cartCount:        0,
  wishlistCount:    0,
  showSearch:       true,
  showWishlist:     true,
  showCart:         true,
  showAccount:      true,
  searchPlaceholder:"Search luxury products…",
  links: [
    { label: "Home",    url: "#"            },
    { label: "New In",  url: "#", badge: "NEW" },
    { label: "Watches", url: "#"            },
    { label: "Fashion", url: "#"            },
    { label: "Beauty",  url: "#"            },
    { label: "Sale",    url: "#", badge: "HOT" },
  ],
  drawer: { position: "left", width: 300 },
};

export default navbarProps;
