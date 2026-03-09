import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box, Button } from "@mui/material";
import theme, { BRAND } from "./theme/theme";

import HomePage            from "./pages/Home/HomePage";
import ProductListingPage  from "./pages/ProductListing/ProductListingPage";
import ProductDetailPage   from "./pages/ProductDetail/ProductDetailPage";
import CartPage            from "./pages/Cart/CartPage";

const navbarProps = {
  enabled:       true,
  storeName:     "LUXE STORE",
  cartCount:     3,
  wishlistCount: 5,
  showSearch:    true,
  showWishlist:  true,
  showCart:      true,
  showAccount:   true,
  links: [
    { label:"Home",       url:"#" },
    { label:"New In",     url:"#", badge:"NEW" },
    { label:"Watches",    url:"#" },
    { label:"Fashion",    url:"#" },
    { label:"Beauty",     url:"#" },
    { label:"Sale",       url:"#", badge:"HOT" },
  ],
  drawer: { position:"left", width:300 },
};

const footerProps = {
  enabled:     true,
  storeName:   "LUXE STORE",
  tagline:     "Refined Living, Delivered.",
  description: "Curating premium products from the world's finest brands since 2018.",
  social: { instagram:"#", facebook:"#", twitter:"#", pinterest:"#" },
  shopLinks: [
    { label:"New Arrivals", url:"#", badge:"NEW" },
    { label:"Best Sellers", url:"#" },
    { label:"Sale",         url:"#", badge:"SALE" },
    { label:"Gift Cards",   url:"#" },
    { label:"Lookbook",     url:"#" },
  ],
  helpLinks: [
    { label:"Track Order",   url:"#" },
    { label:"Returns",       url:"#" },
    { label:"Size Guide",    url:"#" },
    { label:"FAQ",           url:"#" },
    { label:"Contact Us",    url:"#" },
  ],
  contact: {
    phone:   "+1 (800) 123-4567",
    email:   "hello@luxestore.com",
    address: "123 Fifth Avenue, New York, NY 10001",
  },
};

const plpProducts = [
  { id:1,  name:"Luxury Smart Watch Pro",    brand:"APEX",    price:199, originalPrice:249, rating:4.5, reviewCount:120, badge:"SALE",      stock:15, category:"Watches"  },
  { id:2,  name:"Tailored Wool Blazer",       brand:"MAISON",  price:389, originalPrice:520, rating:4.8, reviewCount:64,  badge:"BESTSELLER", stock:6,  category:"Fashion"  },
  { id:3,  name:"Diamond Drop Earrings",      brand:"ÉCLAT",   price:245, originalPrice:null,rating:4.7, reviewCount:38,  badge:"NEW",        stock:22, category:"Jewellery"},
  { id:4,  name:"Leather Quilted Bag",        brand:"BELVÈT",  price:475, originalPrice:590, rating:4.6, reviewCount:91,  badge:"SALE",       stock:9,  category:"Bags"     },
  { id:5,  name:"Silk Camisole Top",          brand:"SOLÈNE",  price:95,  originalPrice:null,rating:4.3, reviewCount:47,  badge:"NEW",        stock:30, category:"Fashion"  },
  { id:6,  name:"Velvet Kitten-Heel Mules",   brand:"STRIDA",  price:165, originalPrice:210, rating:4.4, reviewCount:29,  badge:"SALE",       stock:14, category:"Shoes"    },
  { id:7,  name:"Cashmere Oversized Hoodie",  brand:"NÓRD",    price:285, originalPrice:340, rating:4.9, reviewCount:203, badge:"BESTSELLER", stock:5,  category:"Fashion"  },
  { id:8,  name:"Saffiano Leather Wallet",    brand:"BELVÈT",  price:120, originalPrice:null,rating:4.6, reviewCount:55,  badge:null,         stock:40, category:"Accessories"},
];

const pdpProduct = {
  id:2, name:"Tailored Wool Blazer", brand:"MAISON", sku:"MSN-WBL-NVY-42",
  category:"Fashion", categoryPath:[{ label:"Fashion", href:"#" }, { label:"Blazers & Suits", href:"#" }],
  badge:"BESTSELLER", price:389, originalPrice:520, currency:"$",
  rating:4.8, reviewCount:64, stock:6,
  shortDescription:"A masterclass in precision tailoring — our signature Wool Blazer sculpts your silhouette with a structured shoulder and a single-button fastening that never goes out of style.",
  description:`Crafted from 100% Italian Merino wool sourced from the finest mills in Biella, this blazer represents MAISON's commitment to uncompromising quality.\n\nThe canvas construction ensures the jacket retains its shape over years of wear, while the hand-stitched lapels and horn buttons elevate it beyond everyday suiting.\n\nFully lined in silk-touch viscose for a luxurious drape and comfortable all-day wear. The two-button cuffs are functional — a mark of genuine tailoring — and the flap pockets are perfectly proportioned.\n\nPair with tailored trousers for boardroom authority, or wear over a fitted tee with jeans for sophisticated weekend dressing.\n\nCare instructions: Dry clean recommended. Store on a quality suit hanger.`,
  specifications:[
    { label:"Material",          value:"100% Italian Merino Wool" },
    { label:"Lining",            value:"Silk-touch Viscose" },
    { label:"Fit",               value:"Tailored / Regular" },
    { label:"Buttons",           value:"Natural Horn, Single-Button" },
    { label:"Pockets",           value:"2 Flap, 1 Breast Welt" },
    { label:"Construction",      value:"Half Canvas" },
    { label:"Shoulder",          value:"Structured, Lightly Padded" },
    { label:"Country of Origin", value:"Italy" },
    { label:"Care",              value:"Dry Clean Only" },
    { label:"Season",            value:"Autumn / Winter" },
  ],
  images:[
    "https://picsum.photos/seed/blazer1/800/900",
    "https://picsum.photos/seed/blazer2/800/900",
    "https://picsum.photos/seed/blazer3/800/900",
    "https://picsum.photos/seed/blazer4/800/900",
  ],
  variants:{ colors:["Navy","Charcoal","Black","Camel","Olive"], sizes:["XS","S","M","L","XL","XXL"] },
  reviews:[
    { author:"Charlotte M.", avatar:"", rating:5, title:"Absolutely stunning quality",        comment:"I've owned a lot of blazers but this is in a completely different league. The wool is incredibly soft, the construction is immaculate, and it arrived beautifully packaged. Fit perfectly with minimal alterations.", date:"14 Feb 2025", verified:true  },
    { author:"James T.",      avatar:"", rating:5, title:"Worth every penny",                  comment:"Wore this to a board presentation and received three compliments within the first hour. The structure is perfect and it doesn't crease even after a long flight. Will be ordering the charcoal next.",                date:"3 Jan 2025",  verified:true  },
    { author:"Sophie L.",     avatar:"", rating:4, title:"Excellent — runs slightly large",     comment:"Beautiful blazer. The quality is top-notch and it photographs incredibly well. I'd recommend sizing down if you're between sizes. The navy is a rich, deep colour — not at all corporate.",                         date:"29 Nov 2024", verified:true  },
    { author:"Priya K.",      avatar:"", rating:5, title:"A wardrobe staple",                  comment:"I hesitated at the price but this blazer has paid for itself in compliments. It works dressed up or down, the tailoring is clean and modern, and it's warm without being heavy.",                                     date:"12 Oct 2024", verified:false },
  ],
  relatedProducts:[
    { id:10, name:"Tailored Wool Trousers",  brand:"MAISON",  price:245, originalPrice:310, rating:4.7, reviewCount:41, badge:"NEW",  stock:18 },
    { id:11, name:"Silk Blend Blouse",        brand:"SOLÈNE",  price:165, originalPrice:null,rating:4.5, reviewCount:28, badge:null,   stock:25 },
    { id:12, name:"Cashmere Roll-Neck",       brand:"NÓRD",    price:195, originalPrice:240, rating:4.9, reviewCount:87, badge:"SALE", stock:4  },
    { id:13, name:"Leather Belt — 3cm Width", brand:"BELVÈT",  price:95,  originalPrice:null,rating:4.6, reviewCount:53, badge:null,   stock:60 },
  ],
};

// ── Cart fixtures ──────────────────────────────────────────────
const cartItems = [
  { id:2,  name:"Tailored Wool Blazer",      brand:"MAISON",  price:389, originalPrice:520, currency:"$", quantity:1, stock:6,  image:"https://picsum.photos/seed/blazer1/400/500",   variants:{ color:"Navy",     size:"M" } },
  { id:7,  name:"Cashmere Oversized Hoodie", brand:"NÓRD",    price:285, originalPrice:340, currency:"$", quantity:2, stock:5,  image:"https://picsum.photos/seed/hoodie77/400/500",  variants:{ color:"Charcoal", size:"L" } },
  { id:3,  name:"Diamond Drop Earrings",     brand:"ÉCLAT",   price:245, originalPrice:null,currency:"$", quantity:1, stock:22, image:"https://picsum.photos/seed/earrings3/400/500", variants:{ color:"Gold"              } },
  { id:8,  name:"Saffiano Leather Wallet",   brand:"BELVÈT",  price:120, originalPrice:null,currency:"$", quantity:1, stock:40, image:"https://picsum.photos/seed/wallet8/400/500",   variants:{ color:"Black"             } },
];
const savedItems = [
  { id:11, name:"Silk Blend Blouse",        brand:"SOLÈNE",  price:165, originalPrice:null, image:"https://picsum.photos/seed/blouse11/300/360" },
  { id:6,  name:"Velvet Kitten-Heel Mules", brand:"STRIDA",  price:165, originalPrice:210,  image:"https://picsum.photos/seed/mules6/300/360"  },
  { id:13, name:"Leather Belt — 3cm",       brand:"BELVÈT",  price:95,  originalPrice:null, image:"https://picsum.photos/seed/belt13/300/360"  },
];
const cartRelated = [
  { id:10, name:"Tailored Wool Trousers",brand:"MAISON", price:245, originalPrice:310, rating:4.7, reviewCount:41, badge:"NEW",  stock:18 },
  { id:4,  name:"Leather Quilted Bag",   brand:"BELVÈT", price:475, originalPrice:590, rating:4.6, reviewCount:91, badge:"SALE", stock:9  },
  { id:5,  name:"Silk Camisole Top",     brand:"SOLÈNE", price:95,  originalPrice:null,rating:4.3, reviewCount:47, badge:"NEW",  stock:30 },
  { id:12, name:"Cashmere Roll-Neck",    brand:"NÓRD",   price:195, originalPrice:240, rating:4.9, reviewCount:87, badge:"SALE", stock:4  },
];

export default function App() {
  const [page, setPage] = useState("cart");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ── Dev page switcher ───────────────────────── */}
      <Box sx={{ position:"fixed", bottom:16, right:16, zIndex:9999, display:"flex", gap:0.75, flexWrap:"wrap", maxWidth:340 }}>
        {[["home","Home","#1a1a2e"],["plp","Products","#3b82f6"],["pdp","Detail","#e94560"],["cart","Cart","#059669"]].map(([id,label,color])=>(
          <Button key={id} variant={page===id?"contained":"outlined"} size="small" onClick={()=>setPage(id)}
            sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:"0.72rem", letterSpacing:"0.06em", minWidth:0, px:1.75, py:0.75, borderRadius:"6px", textTransform:"none", borderColor:color, color:page===id?"#fff":color, bgcolor:page===id?color:"rgba(255,255,255,0.92)", "&:hover":{ bgcolor:color, color:"#fff" }, backdropFilter:"blur(6px)", boxShadow:"0 2px 12px rgba(0,0,0,0.15)" }}>
            {label}
          </Button>
        ))}
      </Box>

      {page==="home" && <HomePage navbar={navbarProps} footer={footerProps} />}

      {page==="plp" && (
        <ProductListingPage title="All Products" products={plpProducts} navbar={navbarProps} footer={footerProps} currency="$"
          onAddToCart={(p)=>console.log("Add to cart:", p?.name)}
          onQuickView={(p)=>{ console.log("Quick view:", p?.name); setPage("pdp"); }} />
      )}

      {page==="pdp" && (
        <ProductDetailPage product={pdpProduct} loading={false} navbar={navbarProps} footer={footerProps}
          onAddToCart={({ product, quantity, selected })=>{ console.log("Add to cart:", product?.name, { quantity, selected }); setPage("cart"); }}
          onBuyNow={({ product, quantity, selected })=>{ console.log("Buy now:", product?.name, { quantity, selected }); setPage("cart"); }}
          onRelatedClick={(p)=>console.log("Related click:", p?.name)} />
      )}

      {page==="cart" && (
        <CartPage
          initialItems={cartItems}
          savedItemsInit={savedItems}
          relatedProducts={cartRelated}
          navbar={{ ...navbarProps, cartCount:cartItems.length }}
          footer={footerProps}
          currency="$"
          onCheckout={(s)=>console.log("Checkout:", s)}
          onContinueShopping={()=>setPage("plp")} />
      )}
    </ThemeProvider>
  );
}
