// ─────────────────────────────────────────────────────────────
//  footerProps.js
//  Shared base footer configuration used across all pages.
//  All store identity values come from storeConfig.js.
//
//  Usage:
//    import footerProps from './shared/footerProps';
//    <Page footer={footerProps} />
// ─────────────────────────────────────────────────────────────
import storeConfig from "../../store/storeConfig";

const footerProps = {
  enabled:     true,
  storeName:   storeConfig.name,
  tagline:     storeConfig.tagline,
  description: storeConfig.description,
  social: {
    instagram: storeConfig.social.instagram,
    facebook:  storeConfig.social.facebook,
    twitter:   storeConfig.social.twitter,
    pinterest: storeConfig.social.pinterest,
  },
  shopLinks: [
    { label: "New Arrivals", url: "#", badge: "NEW"  },
    { label: "Best Sellers", url: "#"                },
    { label: "Sale",         url: "#", badge: "SALE" },
    { label: "Gift Cards",   url: "#"                },
    { label: "Lookbook",     url: "#"                },
  ],
  helpLinks: [
    { label: "Track Order", url: "#" },
    { label: "Returns",     url: "#" },
    { label: "Size Guide",  url: "#" },
    { label: "FAQ",         url: "#" },
    { label: "Contact Us",  url: "#" },
  ],
  contact: {
    phone:   storeConfig.phone,
    email:   storeConfig.email,
    address: `${storeConfig.address.line1}, ${storeConfig.address.line2}, ${storeConfig.address.city} — ${storeConfig.address.pincode}`,
  },
};

export default footerProps;

