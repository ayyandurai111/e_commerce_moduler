// ─────────────────────────────────────────────────────────────
//  App.jsx — Root application entry point
//  Wraps everything in MUI ThemeProvider and CssBaseline
//  Provides full sample data for all HomePage modules
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme   from "./theme/theme";
import HomePage             from "./pages/Home/HomePage";
import ProductListingPage    from "./pages/ProductListing/ProductListingPage";

// ─────────────────────────────────────────────────────────────
//  Sample Data — replace / extend per client
// ─────────────────────────────────────────────────────────────

const navbarProps = {
  enabled:      true,
  storeName:    "LUXE STORE",
  logo:         null,
  cartCount:    3,
  wishlistCount:2,
  showSearch:   true,
  showWishlist: true,
  showCart:     true,
  showAccount:  true,

  // Nav links — badge prop shows a colored chip on desktop too
  links: [
    { label: "Home",   url: "/"       },
    { label: "Shop",   url: "/shop"   },
    { label: "New In", url: "/new",   badge: "NEW" },
    { label: "Sale",   url: "/sale",  badge: "40%" },
    { label: "Brands", url: "/brands" },
    { label: "About",  url: "/about"  },
  ],

  // ── Drawer (mobile slide-in menu) ─────────────────────────
  drawer: {
    // Position & size
    position: "left",   // "left" | "right"
    width:    300,      // px

    // Colors
    background:     "#1a1a2e",
    textColor:      "#ffffff",
    accentColor:    "#e94560",
    linkHoverBg:    "rgba(233,69,96,0.15)",
    linkHoverColor: "#ffffff",
    dividerColor:   "rgba(255,255,255,0.12)",

    // Header
    showLogo:      true,
    logoSize:      "1.4rem",
    headerTagline: "Free shipping on orders $50+",  // null to hide

    // Search
    showSearch:        true,
    searchPlaceholder: "Search products…",

    // Links
    showLinkIcons:    true,   // icon beside each nav link
    linkFontSize:     "1rem",
    linkFontWeight:   500,
    linkBorderRadius: 2,

    // Promo banner inside drawer
    showPromoBanner:  true,
    promoBannerText:  "🎉 Use code LUXE15 for 15% off!",
    promoBannerBg:    "rgba(245,166,35,0.12)",
    promoBannerColor: "#f5a623",

    // Auth buttons
    showAuthButtons:    true,
    signInLabel:        "Sign In",
    createAccountLabel: "Create Account",
    onSignIn:         () => alert("Sign In clicked"),
    onCreateAccount:  () => alert("Create Account clicked"),

    // Footer strip
    showDrawerFooter: true,
    drawerFooterText: "© 2025 LUXE STORE",
    showSocialIcons:  true,
    social: {
      instagram: "https://instagram.com",
      facebook:  "https://facebook.com",
      twitter:   "https://twitter.com",
    },
  },

  onCartClick:     () => alert("Cart opened"),
  onWishlistClick: () => alert("Wishlist opened"),
  onAccountClick:  () => alert("Account opened"),
};

const heroProps = {
  enabled: true,
  autoPlay: true,
  interval: 5500,
  ctaText: "Shop Now",
  ctaLink: "/shop",
  showBadge: true,
  badgeText: "SS 2025",
  slides: [
    {
      title: "Luxury Redefined",
      subtitle: "SPRING / SUMMER 2025",
      badge: "NEW COLLECTION",
      description:
        "Discover our curated selection of premium fashion, crafted for those who appreciate quality and timeless elegance.",
      ctaText: "Explore Collection",
      ctaLink: "/shop/new",
      background:
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      stats: [
        { value: "2,400+", label: "PRODUCTS"   },
        { value: "180+",   label: "BRANDS"     },
        { value: "50K+",   label: "CUSTOMERS"  },
      ],
    },
    {
      title: "Summer Essentials",
      subtitle: "CURATED PICKS",
      badge: "SALE UP TO 40%",
      description:
        "Fresh arrivals and seasonal favourites, now at exclusive members-only prices.",
      ctaText: "View Sale",
      ctaLink: "/sale",
      background:
        "linear-gradient(135deg, #0f3460 0%, #533483 50%, #e94560 100%)",
      secondaryCta: { text: "Watch Lookbook", link: "/lookbook" },
    },
    {
      title: "Iconic Brands",
      subtitle: "BRAND SPOTLIGHT",
      badge: "EXCLUSIVE",
      description:
        "Shop from 180+ of the world's most sought-after labels, all in one place.",
      ctaText: "Browse Brands",
      ctaLink: "/brands",
      background:
        "linear-gradient(135deg, #16213e 0%, #1a1a2e 40%, #533483 100%)",
    },
  ],
};

const categoryGridProps = {
  enabled: true,
  title: "Shop by Category",
  subtitle: "Explore our handpicked collections for every style and occasion.",
  categories: [
    { id: 1, name: "Women",      subtitle: "1,240 items", count: 1240, tag: "TRENDING",    url: "/shop/women",     gradient: "linear-gradient(135deg, #e94560 0%, #c73652 100%)"   },
    { id: 2, name: "Men",        subtitle: "980 items",   count: 980,  tag: "POPULAR",     url: "/shop/men",       gradient: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)"   },
    { id: 3, name: "Accessories",subtitle: "540 items",   count: 540,  tag: "NEW IN",      url: "/shop/acc",       gradient: "linear-gradient(135deg, #533483 0%, #e94560 100%)"   },
    { id: 4, name: "Footwear",   subtitle: "720 items",   count: 720,  tag: "SALE",        url: "/shop/shoes",     gradient: "linear-gradient(135deg, #f5a623 0%, #e94560 100%)"   },
    { id: 5, name: "Kids",       subtitle: "310 items",   count: 310,  tag: "NEW SEASON",  url: "/shop/kids",      gradient: "linear-gradient(135deg, #10b981 0%, #1a1a2e 100%)"   },
    { id: 6, name: "Home",       subtitle: "460 items",   count: 460,  tag: "LIFESTYLE",   url: "/shop/home",      gradient: "linear-gradient(135deg, #16213e 0%, #533483 100%)"   },
  ],
};

const featuredProductsProps = {
  enabled: true,
  title: "Featured Products",
  subtitle: "Handpicked pieces our stylists are obsessing over this season.",
  filters: ["All", "Women", "Men", "Accessories", "Sale"],
  currency: "$",
  maxVisible: 8,
  onAddToCart: (product) => console.log("Added to cart:", product.name),
  products: [
    { id: 1,  name: "Tailored Wool Blazer",           price: 289, originalPrice: 420,  rating: 4.8, reviewCount: 124, badge: "SALE",       category: "Women", brand: "MAXMARA",    tags: ["Women"] },
    { id: 2,  name: "Slim-Fit Oxford Shirt",          price: 89,  originalPrice: null,  rating: 4.6, reviewCount: 89,  badge: "NEW",        category: "Men",   brand: "RALPH LAUREN", tags: ["Men"] },
    { id: 3,  name: "Leather Crossbody Bag",          price: 195, originalPrice: 260,  rating: 4.9, reviewCount: 213, badge: "SALE",       category: "Accessories", brand: "COACH", tags: ["Accessories"] },
    { id: 4,  name: "High-Top Canvas Sneakers",       price: 120, originalPrice: null,  rating: 4.5, reviewCount: 67,  badge: "NEW",        category: "Men",   brand: "CONVERSE",   tags: ["Men"] },
    { id: 5,  name: "Cashmere Turtleneck",            price: 245, originalPrice: 310,  rating: 4.7, reviewCount: 98,  badge: "BESTSELLER", category: "Women", brand: "THEORY",     tags: ["Women"] },
    { id: 6,  name: "Minimalist Watch — Rose Gold",   price: 349, originalPrice: null,  rating: 4.9, reviewCount: 305, badge: "BESTSELLER", category: "Accessories", brand: "MVMT",  tags: ["Accessories"] },
    { id: 7,  name: "Straight-Leg Denim Jeans",       price: 130, originalPrice: 180,  rating: 4.4, reviewCount: 145, badge: "SALE",       category: "Men",   brand: "LEVI'S",     tags: ["Men", "Sale"] },
    { id: 8,  name: "Floral Silk Midi Dress",         price: 195, originalPrice: null,  rating: 4.8, reviewCount: 77,  badge: "NEW",        category: "Women", brand: "ZIMMERMANN", tags: ["Women"] },
  ],
};

const dealsSectionProps = {
  enabled: true,
  title: "Deals of the Day",
  subtitle: "Exclusive limited-time offers — don't miss out!",
  currency: "$",
  onAddToCart: (deal) => console.log("Deal added:", deal.name),
  deals: [
    {
      id: 1,
      name: "Premium Leather Belt — Italian Grain",
      price: 49,
      originalPrice: 95,
      rating: 4.7,
      reviewCount: 88,
      brand: "GUCCI",
      sold: 68,
      total: 80,
      endsAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      name: "Structured Tote Bag — Vegan Leather",
      price: 89,
      originalPrice: 159,
      rating: 4.8,
      reviewCount: 142,
      brand: "STELLA M.",
      sold: 45,
      total: 60,
      endsAt: new Date(Date.now() + 5 * 3600 * 1000).toISOString(),
    },
    {
      id: 3,
      name: "Merino Wool Cardigan — Oatmeal",
      price: 110,
      originalPrice: 195,
      rating: 4.6,
      reviewCount: 63,
      brand: "EVERLANE",
      sold: 30,
      total: 50,
      endsAt: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    },
    {
      id: 4,
      name: "Suede Chelsea Boots — Midnight Black",
      price: 165,
      originalPrice: 280,
      rating: 4.9,
      reviewCount: 201,
      brand: "CHELSEA CO.",
      sold: 55,
      total: 70,
      endsAt: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    },
  ],
};

const newsletterProps = {
  enabled: true,
  title: "Join the Luxe Inner Circle",
  subtitle:
    "Get early access to new arrivals, exclusive member deals, and personalised style inspiration delivered to your inbox.",
  incentive: "Get 15% off your first order",
  showPerks: true,
  onSubscribe: async (email) => {
    console.log("Subscribed:", email);
    return new Promise((r) => setTimeout(r, 1000));
  },
};

const footerProps = {
  enabled: true,
  storeName: "LUXE STORE",
  tagline: "Refined Living, Delivered.",
  description:
    "Curating premium fashion and lifestyle products from around the world, delivered with care.",
  social: {
    instagram: "https://instagram.com",
    facebook:  "https://facebook.com",
    twitter:   "https://twitter.com",
    pinterest: "https://pinterest.com",
  },
  shopLinks: [
    { label: "New Arrivals",  url: "/new",       badge: "NEW" },
    { label: "Women",         url: "/shop/women" },
    { label: "Men",           url: "/shop/men"   },
    { label: "Accessories",   url: "/shop/acc"   },
    { label: "Sale",          url: "/sale",      badge: "40%" },
    { label: "Brands",        url: "/brands"     },
  ],
  helpLinks: [
    { label: "Size Guide",     url: "/size-guide" },
    { label: "Shipping Info",  url: "/shipping"   },
    { label: "Returns",        url: "/returns"    },
    { label: "Track Order",    url: "/track"      },
    { label: "Contact Us",     url: "/contact"    },
    { label: "FAQs",           url: "/faqs"       },
  ],
  contact: {
    phone:   "+1 (800) 555-0170",
    email:   "support@luxestore.com",
    address: "250 Fifth Ave, New York, NY 10001",
  },
  paymentMethods: ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"],
  hours: "Mon – Fri, 9am – 6pm EST",
};

// ─────────────────────────────────────────────────────────────
//  PLP Sample Data
// ─────────────────────────────────────────────────────────────
const plpProducts = [
  { id:1,  name:"Tailored Wool Blazer",        price:289, originalPrice:420,  rating:4.8, reviewCount:124, badge:"SALE",       category:"Women",      brand:"MAXMARA",      colors:["black","navy"],   sizes:["XS","S","M","L"],    tags:["Formal","Office"],       description:"A beautifully structured blazer crafted from premium wool blend. Perfect for the modern professional." },
  { id:2,  name:"Slim-Fit Oxford Shirt",       price:89,  originalPrice:null, rating:4.6, reviewCount:89,  badge:"NEW",        category:"Men",        brand:"RALPH LAUREN", colors:["white","blue"],   sizes:["S","M","L","XL"],    tags:["Casual","Smart-Casual"], description:"Classic Oxford weave shirt with a modern slim fit. Versatile enough for work or weekend." },
  { id:3,  name:"Leather Crossbody Bag",       price:195, originalPrice:260,  rating:4.9, reviewCount:213, badge:"SALE",       category:"Accessories",brand:"COACH",        colors:["black","tan"],    sizes:["One Size"],           tags:["Bags","Leather"],        description:"Luxurious full-grain leather crossbody with gold-tone hardware. Fits all your everyday essentials." },
  { id:4,  name:"High-Top Canvas Sneakers",    price:120, originalPrice:null, rating:4.5, reviewCount:67,  badge:"NEW",        category:"Men",        brand:"CONVERSE",     colors:["white","black"],  sizes:["7","8","9","10","11"],tags:["Sneakers","Casual"],     description:"The iconic high-top silhouette reimagined with premium canvas and cushioned insole." },
  { id:5,  name:"Cashmere Turtleneck",         price:245, originalPrice:310,  rating:4.7, reviewCount:98,  badge:"BESTSELLER", category:"Women",      brand:"THEORY",       colors:["cream","grey"],   sizes:["XS","S","M","L","XL"],tags:["Knitwear","Luxury"],     description:"Pure Grade-A cashmere in a relaxed turtleneck silhouette. Unbelievably soft against skin." },
  { id:6,  name:"Minimalist Watch Rose Gold",  price:349, originalPrice:null, rating:4.9, reviewCount:305, badge:"BESTSELLER", category:"Accessories",brand:"MVMT",         colors:["rosegold"],       sizes:["One Size"],           tags:["Watches","Luxury"],      description:"Swiss quartz movement encased in brushed rose gold stainless steel. Water resistant to 30m." },
  { id:7,  name:"Straight-Leg Denim Jeans",   price:130, originalPrice:180,  rating:4.4, reviewCount:145, badge:"SALE",       category:"Men",        brand:"LEVI'S",       colors:["blue","black"],   sizes:["28","30","32","34"],  tags:["Denim","Casual"],        description:"Classic straight leg cut in premium selvedge denim. Gets better with every wash." },
  { id:8,  name:"Floral Silk Midi Dress",      price:195, originalPrice:null, rating:4.8, reviewCount:77,  badge:"NEW",        category:"Women",      brand:"ZIMMERMANN",   colors:["floral"],         sizes:["XS","S","M","L"],    tags:["Dresses","Summer"],      description:"Bias-cut silk satin with an exclusive floral print. Designed for effortless elegance." },
  { id:9,  name:"Structured Canvas Tote",      price:85,  originalPrice:110,  rating:4.3, reviewCount:52,  badge:"SALE",       category:"Accessories",brand:"EVERLANE",     colors:["tan","black"],    sizes:["One Size"],           tags:["Bags","Everyday"],       description:"Heavyweight cotton canvas with reinforced handles and interior zipper pocket." },
  { id:10, name:"Merino Wool Cardigan",        price:165, originalPrice:220,  rating:4.6, reviewCount:88,  badge:"SALE",       category:"Women",      brand:"EVERLANE",     colors:["cream","brown"],  sizes:["XS","S","M","L","XL"],tags:["Knitwear","Casual"],     description:"Midweight merino in a relaxed open-front silhouette. Machine washable." },
  { id:11, name:"Suede Chelsea Boots",         price:240, originalPrice:320,  rating:4.7, reviewCount:119, badge:"SALE",       category:"Accessories",brand:"CHELSEA CO.",  colors:["tan","black"],    sizes:["7","8","9","10"],     tags:["Boots","Leather"],       description:"Pull-on Chelsea boots in premium suede leather with elastic gussets." },
  { id:12, name:"Linen Blend Trousers",        price:110, originalPrice:null, rating:4.5, reviewCount:64,  badge:"NEW",        category:"Men",        brand:"COS",          colors:["sand","navy"],    sizes:["28","30","32","34"],  tags:["Trousers","Summer"],     description:"Relaxed wide-leg trousers in a breathable linen-cotton blend. Ideal for warm weather." },
  { id:13, name:"Satin Slip Skirt",            price:90,  originalPrice:120,  rating:4.4, reviewCount:41,  badge:"SALE",       category:"Women",      brand:"ARITZIA",      colors:["champagne","black"],sizes:["XS","S","M","L"],   tags:["Skirts","Going-Out"],    description:"Fluid bias-cut satin with a high-low hem and invisible side zip." },
  { id:14, name:"Leather Belt Italian Grain",  price:75,  originalPrice:null, rating:4.8, reviewCount:203, badge:"BESTSELLER", category:"Accessories",brand:"ALLEN EDMONDS",colors:["brown","black"],  sizes:["30","32","34","36"],  tags:["Belts","Leather"],       description:"Full-grain Italian leather with a nickel-free brass buckle. Improves with age." },
  { id:15, name:"Ribbed Knit Midi Dress",      price:135, originalPrice:180,  rating:4.6, reviewCount:93,  badge:"SALE",       category:"Women",      brand:"REFORMATION",  colors:["black","olive"],  sizes:["XS","S","M","L"],    tags:["Dresses","Knitwear"],    description:"Stretchy ribbed knit in a flattering midi length. Effortlessly day-to-night." },
  { id:16, name:"Polarised Aviator Sunglasses",price:180, originalPrice:null, rating:4.7, reviewCount:156, badge:"NEW",        category:"Accessories",brand:"RAY-BAN",      colors:["gold","silver"],  sizes:["One Size"],           tags:["Sunglasses","Summer"],   description:"Classic aviator frame with polarised lenses offering 100% UV protection." },
];

const plpFilters = {
  categories: [
    { value:"Women",       label:"Women",       count:6  },
    { value:"Men",         label:"Men",         count:4  },
    { value:"Accessories", label:"Accessories", count:6  },
  ],
  price:   { min: 0, max: 500 },
  ratings: true,
  brands: [
    { value:"MAXMARA",      label:"Max Mara",       count:1 },
    { value:"RALPH LAUREN", label:"Ralph Lauren",   count:1 },
    { value:"COACH",        label:"Coach",           count:1 },
    { value:"THEORY",       label:"Theory",          count:1 },
    { value:"EVERLANE",     label:"Everlane",        count:2 },
    { value:"LEVI'S",       label:"Levi's",         count:1 },
    { value:"MVMT",         label:"MVMT",            count:1 },
    { value:"ZIMMERMANN",   label:"Zimmermann",      count:1 },
    { value:"COS",          label:"COS",             count:1 },
    { value:"ARITZIA",      label:"Aritzia",         count:1 },
    { value:"CONVERSE",     label:"Converse",        count:1 },
    { value:"RAY-BAN",      label:"Ray-Ban",         count:1 },
  ],
  colors: [
    { value:"black",  label:"Black",    hex:"#1a1a1a" },
    { value:"white",  label:"White",    hex:"#f5f5f5" },
    { value:"navy",   label:"Navy",     hex:"#1a1a2e" },
    { value:"tan",    label:"Tan",      hex:"#d2b48c" },
    { value:"cream",  label:"Cream",    hex:"#fffdd0" },
    { value:"blue",   label:"Blue",     hex:"#4a90d9" },
    { value:"grey",   label:"Grey",     hex:"#9ca3af" },
    { value:"brown",  label:"Brown",    hex:"#7b5335" },
    { value:"olive",  label:"Olive",    hex:"#6b7c4c" },
    { value:"floral", label:"Floral",   hex:"#f093fb" },
  ],
  sizes: [
    { value:"XS",      label:"XS"       },
    { value:"S",       label:"S"        },
    { value:"M",       label:"M"        },
    { value:"L",       label:"L"        },
    { value:"XL",      label:"XL"       },
    { value:"One Size",label:"One Size" },
  ],
};

// ─────────────────────────────────────────────────────────────
//  App Root — toggle between HomePage and ProductListingPage
// ─────────────────────────────────────────────────────────────
const App = () => {
  const [page, setPage] = React.useState("home"); // "home" | "plp"

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Simple page switcher — replace with React Router in production */}
      <div style={{ position:"fixed", bottom:20, right:20, zIndex:9999, display:"flex", gap:8 }}>
        <button
          onClick={() => setPage("home")}
          style={{
            padding:"8px 18px", borderRadius:8, border:"2px solid #1a1a2e",
            background: page === "home" ? "var(--primary)" : "#fff",
            color: page === "home" ? "#fff" : "var(--primary)",
            fontWeight:700, cursor:"pointer", fontSize:"0.82rem",
          }}
        >
          Home Page
        </button>
        <button
          onClick={() => setPage("plp")}
          style={{
            padding:"8px 18px", borderRadius:8, border:"2px solid #e94560",
            background: page === "plp" ? "#e94560" : "#fff",
            color: page === "plp" ? "#fff" : "#e94560",
            fontWeight:700, cursor:"pointer", fontSize:"0.82rem",
          }}
        >
          Product Listing
        </button>
      </div>

      {page === "home" && (
        <HomePage
          navbar={navbarProps}
          hero={heroProps}
          categoryGrid={categoryGridProps}
          featuredProducts={featuredProductsProps}
          dealsSection={dealsSectionProps}
          newsletter={newsletterProps}
          footer={footerProps}
        />
      )}

      {page === "plp" && (
        <ProductListingPage
          title="All Products"
          description="Discover our curated collection of premium fashion, accessories, and lifestyle products."
          breadcrumbs={[
            { label: "Home",  url: "/" },
            { label: "Shop",  url: "/shop" },
            { label: "All Products" },
          ]}
          products={plpProducts}
          filters={plpFilters}
          currency="$"
          navbar={navbarProps}
          footer={footerProps}
          onAddToCart={(p) => console.log("Cart:", p.name)}
          onQuickView={(p) => console.log("Quick view:", p.name)}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
