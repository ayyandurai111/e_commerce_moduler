// ─────────────────────────────────────────────────────────────
//  PDPConnector.jsx
//  Owns all data and props for the Product Detail page.
//  Route: /products/:slug
// ─────────────────────────────────────────────────────────────
import React         from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailPage from "../../pages/ProductDetail/ProductDetailPage";
import navbarProps   from "./shared/navbarProps";
import footerProps   from "./shared/footerProps";
import storeConfig   from "../store/storeConfig";

// ── Fixture data ──────────────────────────────────────────────
const product = {
  id:          2,
  name:        "Tailored Wool Blazer",
  brand:       "MAISON",
  sku:         "MSN-WBL-NVY-42",
  category:    "Fashion",
  categoryPath:[
    { label: "Fashion",         href: "/products" },
    { label: "Blazers & Suits", href: "/products?category=blazers" },
  ],
  badge:            "BESTSELLER",
  price:            38900,
  originalPrice:    52000,
  currency:         storeConfig.currency,
  rating:           4.8,
  reviewCount:      64,
  stock:            6,
  shortDescription: "A masterclass in precision tailoring — our signature Wool Blazer sculpts your silhouette with a structured shoulder and a single-button fastening that never goes out of style.",
  description:
    `Crafted from 100% Italian Merino wool sourced from the finest mills in Biella, this blazer represents MAISON's commitment to uncompromising quality.\n\nThe canvas construction ensures the jacket retains its shape over years of wear, while the hand-stitched lapels and horn buttons elevate it beyond everyday suiting.\n\nFully lined in silk-touch viscose for a luxurious drape and comfortable all-day wear. The two-button cuffs are functional — a mark of genuine tailoring — and the flap pockets are perfectly proportioned.\n\nPair with tailored trousers for boardroom authority, or wear over a fitted tee with jeans for sophisticated weekend dressing.\n\nCare instructions: Dry clean recommended. Store on a quality suit hanger.`,
  specifications: [
    { label: "Material",          value: "100% Italian Merino Wool"   },
    { label: "Lining",            value: "Silk-touch Viscose"         },
    { label: "Fit",               value: "Tailored / Regular"         },
    { label: "Buttons",           value: "Natural Horn, Single-Button"},
    { label: "Pockets",           value: "2 Flap, 1 Breast Welt"      },
    { label: "Construction",      value: "Half Canvas"                },
    { label: "Shoulder",          value: "Structured, Lightly Padded" },
    { label: "Country of Origin", value: "Italy"                      },
    { label: "Care",              value: "Dry Clean Only"             },
    { label: "Season",            value: "Autumn / Winter"            },
  ],
  images: [
    "https://picsum.photos/seed/blazer1/800/900",
    "https://picsum.photos/seed/blazer2/800/900",
    "https://picsum.photos/seed/blazer3/800/900",
    "https://picsum.photos/seed/blazer4/800/900",
  ],
  variants: {
    colors: ["Navy", "Charcoal", "Black", "Camel", "Olive"],
    sizes:  ["XS", "S", "M", "L", "XL", "XXL"],
  },
  reviews: [
    { author:"Charlotte M.", rating:5, title:"Absolutely stunning quality",    comment:"I've owned a lot of blazers but this is in a completely different league. The wool is incredibly soft, the construction is immaculate, and it arrived beautifully packaged.", date:"14 Feb 2025", verified:true  },
    { author:"James T.",     rating:5, title:"Worth every penny",              comment:"Wore this to a board presentation and received three compliments within the first hour. The structure is perfect and it doesn't crease even after a long flight.",               date:"3 Jan 2025",  verified:true  },
    { author:"Sophie L.",    rating:4, title:"Excellent — runs slightly large", comment:"Beautiful blazer. The quality is top-notch and it photographs incredibly well. I'd recommend sizing down if you're between sizes.",                                             date:"29 Nov 2024", verified:true  },
    { author:"Priya K.",     rating:5, title:"A wardrobe staple",              comment:"I hesitated at the price but this blazer has paid for itself in compliments. It works dressed up or down, the tailoring is clean and modern.",                                    date:"12 Oct 2024", verified:false },
  ],
  relatedProducts: [
    { id:10, name:"Tailored Wool Trousers",  brand:"MAISON", price:24500, originalPrice:31000, rating:4.7, reviewCount:41, badge:"NEW",  stock:18 },
    { id:11, name:"Silk Blend Blouse",        brand:"SOLÈNE", price:16500, originalPrice:null,  rating:4.5, reviewCount:28, badge:null,   stock:25 },
    { id:12, name:"Cashmere Roll-Neck",       brand:"NÓRD",   price:19500, originalPrice:24000, rating:4.9, reviewCount:87, badge:"SALE", stock:4  },
    { id:13, name:"Leather Belt — 3cm Width", brand:"BELVÈT", price:9500,  originalPrice:null,  rating:4.6, reviewCount:53, badge:null,   stock:60 },
  ],
};

// ── Connector ─────────────────────────────────────────────────
const PDPConnector = () => {
  const navigate = useNavigate();
  const { slug }  = useParams();

  return (
    <ProductDetailPage
      product={product}
      loading={false}
      navbar={{
        ...navbarProps,
        onCartClick:     () => navigate("/cart"),
        onWishlistClick: () => navigate("/wishlist"),
        onAccountClick:  () => navigate("/login"),
        onSearch:        (q) => navigate(`/search?q=${encodeURIComponent(q)}`),
      }}
      footer={footerProps}
      onAddToCart={({ product: p, quantity, selected }) => {
        console.log("PDP → Add to cart:", p?.name, { quantity, selected });
        navigate("/cart");
      }}
      onBuyNow={({ product: p, quantity, selected }) => {
        console.log("PDP → Buy now:", p?.name, { quantity, selected });
        navigate("/checkout");
      }}
      onRelatedClick={(p) => {
        if (p) navigate(`/products/${p?.slug ?? p?.id ?? "demo"}`);
        else    navigate("/products");
      }}
    />
  );
};
export default PDPConnector;
