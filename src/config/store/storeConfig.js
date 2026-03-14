// ╔══════════════════════════════════════════════════════════════════╗
//  storeConfig.js
//  ──────────────────────────────────────────────────────────────────
//  ✦  ONE FILE TO RULE THEM ALL  ✦
//
//  Change anything here → it automatically updates across:
//    ✅  Navbar          ✅  Footer
//    ✅  Login Page      ✅  Register Page
//    ✅  Auth Layout     ✅  Checkout
//    ✅  Product Pages   ✅  SEO / Meta tags
//    ✅  Connectors      ✅  Everywhere!
//
//  ──────────────────────────────────────────────────────────────────
//  HOW TO USE:
//    → Edit the values below
//    → Save the file
//    → Done ✓  No other file needs touching.
// ╚══════════════════════════════════════════════════════════════════╝

const storeConfig = {

  // ┌─────────────────────────────────────────────────────────────┐
  // │  🏷️  STORE IDENTITY                                         │
  // │  The name & tagline shown in Navbar, Footer, Auth pages     │
  // └─────────────────────────────────────────────────────────────┘
  name:        "LUXE STORE",                     // ← Change store name here
  shortName:   "LUXE",                           // Used in mobile / tab titles
  tagline:     "Refined Living, Delivered.",      // ← Shown under logo
  description: "India's premium lifestyle destination for luxury fashion, accessories & home décor.",

  // ┌─────────────────────────────────────────────────────────────┐
  // │  🖼️  LOGO                                                    │
  // │  Place your logo files in /public/assets/                   │
  // └─────────────────────────────────────────────────────────────┘
  logoUrl:      "/assets/logo.png",              // ← Main logo (Navbar)
  logoUrlDark:  "/assets/logo-dark.png",         // ← For dark backgrounds
  logoUrlWhite: "/assets/logo-white.png",        // ← Footer / light-on-dark
  favicon:      "/assets/favicon.ico",           // ← Browser tab icon

  // ┌─────────────────────────────────────────────────────────────┐
  // │  💰  CURRENCY                                               │
  // │  Shown on all price tags across the whole site              │
  // └─────────────────────────────────────────────────────────────┘
  currency:       "₹",                           // ← Symbol shown on screen
  currencyCode:   "INR",                         // ISO 4217 code
  currencyLocale: "en-IN",                       // Number format  →  1,00,000

  // ┌─────────────────────────────────────────────────────────────┐
  // │  📞  CONTACT INFORMATION                                    │
  // │  Footer, Contact page, WhatsApp link, Order emails          │
  // └─────────────────────────────────────────────────────────────┘
  phone:        "+91 98765 43210",               // ← Primary contact number
  phoneDisplay: "98765 43210",                   // Short format shown on site
  whatsapp:     "919876543210",                  // Digits only (for wa.me link)

  email:        "support@luxestore.in",          // ← Customer support email
  emailOrders:  "orders@luxestore.in",           // Order confirmations
  emailReturns: "returns@luxestore.in",          // Returns & refunds

  // ┌─────────────────────────────────────────────────────────────┐
  // │  📍  STORE ADDRESS                                          │
  // │  Shown in Footer and Contact page                           │
  // └─────────────────────────────────────────────────────────────┘
  address: {
    line1:   "No. 42, Luxury Lane",              // ← Street / building
    line2:   "Nungambakkam High Road",            // ← Area / locality
    city:    "Chennai",                           // ← City
    state:   "Tamil Nadu",                        // ← State
    pincode: "600034",                            // ← PIN code
    country: "India",
    mapUrl:  "https://maps.google.com/?q=Nungambakkam+Chennai", // Google Maps link
  },

  // ┌─────────────────────────────────────────────────────────────┐
  // │  🕐  BUSINESS HOURS                                         │
  // └─────────────────────────────────────────────────────────────┘
  businessHours: {
    weekdays: "Mon – Sat: 10:00 AM – 8:00 PM",
    sunday:   "Sun: 11:00 AM – 6:00 PM",
    holidays: "Closed on National Holidays",
  },

  // ┌─────────────────────────────────────────────────────────────┐
  // │  🌐  SOCIAL MEDIA                                           │
  // │  Used in Footer social icon row                             │
  // └─────────────────────────────────────────────────────────────┘
  social: {
    instagram: "https://instagram.com/luxestore",
    facebook:  "https://facebook.com/luxestore",
    twitter:   "https://twitter.com/luxestore",
    youtube:   "https://youtube.com/@luxestore",
    pinterest: "https://pinterest.com/luxestore",
    whatsapp:  "https://wa.me/919876543210",
  },

  // ┌─────────────────────────────────────────────────────────────┐
  // │  🔗  SITE URLS                                              │
  // └─────────────────────────────────────────────────────────────┘
  siteUrl:    "https://www.luxestore.in",
  supportUrl: "https://support.luxestore.in",
  blogUrl:    "https://blog.luxestore.in",

  // ┌─────────────────────────────────────────────────────────────┐
  // │  📦  STORE POLICY                                           │
  // │  Shown in Product pages & Footer trust badges               │
  // └─────────────────────────────────────────────────────────────┘
  policy: {
    freeShippingAbove: 999,   // Free shipping above ₹999
    returnDays:        30,    // 30-day returns
    warrantyYears:     2,     // 2-year warranty
    codAvailable:      true,  // Cash on Delivery enabled
  },

  // ┌─────────────────────────────────────────────────────────────┐
  // │  🔍  SEO / META TAGS                                        │
  // │  Used in <head> for search engines & social sharing         │
  // └─────────────────────────────────────────────────────────────┘
  seo: {
    metaTitle:       "LUXE STORE — Refined Living, Delivered.",
    metaDescription: "Shop premium fashion, accessories & home décor at LUXE STORE. Free shipping above ₹999.",
    metaKeywords:    "luxury store, premium fashion, India, online shopping",
    ogImage:         "/assets/og-image.jpg",
  },

};

// ── Convenience helpers (read-only — do not edit) ─────────────────
export const STORE_NAME     = storeConfig.name;
export const STORE_TAGLINE  = storeConfig.tagline;
export const STORE_CURRENCY = storeConfig.currency;
export const STORE_LOGO     = storeConfig.logoUrl;
export const STORE_PHONE    = storeConfig.phone;
export const STORE_EMAIL    = storeConfig.email;
export const STORE_ADDRESS  = storeConfig.address;
export const STORE_POLICY   = storeConfig.policy;
export const STORE_SOCIAL   = storeConfig.social;

export default storeConfig;
