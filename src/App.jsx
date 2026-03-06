// App.jsx
import React from "react";
import HomePage from "./pages/HomePage";
import theme from "./theme/theme";

export default function App() {
  return (
    <HomePage
      // ─── Override theme values (optional) ─────────────────
      theme={{
        ...theme,
        brand: {
          name: "M STORE",
          tagline: "Your tagline here.",
        },
        colors: {
          ...theme.colors,
          primary:   "#1a1a2e",   // change main dark color
          secondary: "#e94560",   // change accent / CTA color
          accent:    "#f5a623",   // change star / highlight color
        },
      }}

      // ═══════════════════════════════════════════════════════
      // 1. NAVBAR
      // ═══════════════════════════════════════════════════════
      navbar={{
        enabled: true,

        storeName: "MY STORE",         // text logo
        logoUrl: null,                 // or pass image url: "https://..."

        links: [
          { label: "Home",        url: "/" },
          { label: "Shop",        url: "/shop" },
          { label: "Collections", url: "/collections" },
          { label: "About",       url: "/about" },
          { label: "Sale",        url: "/sale",  highlight: true }, // accent color
        ],

        cartCount:     6,    // badge number on cart icon
        wishlistCount: 2,    // badge number on heart icon
      }}

      // ═══════════════════════════════════════════════════════
      // 2. HERO BANNER
      // ═══════════════════════════════════════════════════════
      hero={{
        enabled: true,

        autoPlay:         true,
        autoPlayInterval: 5000,        // milliseconds

        ctaText:          "Shop Now",  // fallback CTA for all slides
        ctaLink:          "/shop",
        ctaSecondaryText: "View Lookbook",  // remove line to hide
        ctaSecondaryLink: "/lookbook",

        slides: [
          {
            id: 1,
            badge:    "NEW COLLECTION",          // pill label — remove to hide
            title:    "Your Slide\nTitle Here",  // \n = line break
            subtitle: "Your slide description goes here. Keep it short and punchy.",
            ctaText:  "Shop Collection",         // override global CTA per slide
            ctaLink:  "/collections/new",
            image:    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80",
            // bgGradient: "linear-gradient(135deg, #1a1a2e, #0f3460)", // used if no image
          },
          {
            id: 2,
            badge:    "BEST SELLERS",
            title:    "Second Slide\nHeadline",
            subtitle: "Another compelling message for your second slide.",
            ctaText:  "View Best Sellers",
            ctaLink:  "/shop?sort=bestseller",
            image:    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80",
          },
          {
            id: 3,
            badge:    "UP TO 40% OFF",
            title:    "Season\nSale",
            subtitle: "Limited time offers on premium pieces.",
            ctaText:  "Shop Sale",
            ctaLink:  "/sale",
            image:    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80",
          },
        ],
      }}

      // ═══════════════════════════════════════════════════════
      // 3. CATEGORY GRID
      // ═══════════════════════════════════════════════════════
      categories={{
        enabled: true,

        title:    "Shop by Category",
        subtitle: "Explore our curated collections",

        // First item = featured (wide card, 2 columns)
        // Rest = normal square cards
        categories: [
          {
            id:    1,
            name:  "Women",
            slug:  "women",         // used in url: /category/women
            count: 240,             // "240 products" label
            image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80",
          },
          {
            id:    2,
            name:  "Men",
            slug:  "men",
            count: 185,
            image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&q=80",
          },
          {
            id:    3,
            name:  "Accessories",
            slug:  "accessories",
            count: 92,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
          },
          {
            id:    4,
            name:  "Footwear",
            slug:  "footwear",
            count: 130,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
          },
          {
            id:    5,
            name:  "Jewellery",
            slug:  "jewellery",
            count: 74,
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
          },
          {
            id:    6,
            name:  "Home",
            slug:  "home",
            count: 48,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
          },
        ],
      }}

      // ═══════════════════════════════════════════════════════
      // 4. FEATURED PRODUCTS
      // ═══════════════════════════════════════════════════════
      featuredProducts={{
        enabled: true,

        title:    "Featured Products",
        subtitle: "Handpicked pieces for the discerning shopper",

        // Filter tab labels — set [] to hide tabs entirely
        filters: ["All", "New Arrivals", "Best Sellers", "On Sale"],

        // Callbacks
        onAddToCart:     (product) => alert(`${product.name} added to cart!`),
        onAddToWishlist: (product) => console.log("Wishlisted:", product.name),

        products: [
          {
            id:            1,
            name:          "Silk Wrap Dress",
            category:      "Women",
            price:         289,
            originalPrice: 389,           // show strikethrough — remove if no sale
            rating:        4.8,           // 0–5 (supports 4.5 etc.)
            reviewCount:   124,
            badge:         "sale",        // "new" | "sale" | "bestseller" | null
            badgeLabel:    "25% OFF",     // text inside the badge pill
            filter:        "On Sale",     // must match one of filters[] above
            image:         "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80",
            inStock:       true,
            stockCount:    8,             // shows "Only 8 left" if ≤ 5
          },
          {
            id:            2,
            name:          "Linen Blazer",
            category:      "Men",
            price:         349,
            originalPrice: null,          // null = no strikethrough
            rating:        4.6,
            reviewCount:   89,
            badge:         "new",
            badgeLabel:    "NEW",
            filter:        "New Arrivals",
            image:         "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80",
            inStock:       true,
            stockCount:    15,
          },
          {
            id:            3,
            name:          "Gold Chain Necklace",
            category:      "Jewellery",
            price:         129,
            originalPrice: null,
            rating:        4.9,
            reviewCount:   211,
            badge:         "bestseller",
            badgeLabel:    "BEST SELLER",
            filter:        "Best Sellers",
            image:         "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
            inStock:       true,
            stockCount:    30,
          },
          {
            id:            4,
            name:          "Leather Tote Bag",
            category:      "Accessories",
            price:         199,
            originalPrice: 260,
            rating:        4.7,
            reviewCount:   156,
            badge:         "sale",
            badgeLabel:    "SALE",
            filter:        "On Sale",
            image:         "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
            inStock:       true,
            stockCount:    5,
          },
          {
            id:            5,
            name:          "Cashmere Sweater",
            category:      "Women",
            price:         245,
            originalPrice: null,
            rating:        4.5,
            reviewCount:   67,
            badge:         "new",
            badgeLabel:    "NEW",
            filter:        "New Arrivals",
            image:         "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
            inStock:       true,
            stockCount:    12,
          },
          {
            id:            6,
            name:          "Suede Chelsea Boots",
            category:      "Footwear",
            price:         319,
            originalPrice: 420,
            rating:        4.8,
            reviewCount:   203,
            badge:         "sale",
            badgeLabel:    "24% OFF",
            filter:        "On Sale",
            image:         "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
            inStock:       false,          // disables quick-add, shows "Out of Stock"
            stockCount:    0,
          },
          {
            id:            7,
            name:          "Merino Wool Coat",
            category:      "Women",
            price:         489,
            originalPrice: null,
            rating:        4.9,
            reviewCount:   45,
            badge:         "new",
            badgeLabel:    "NEW",
            filter:        "New Arrivals",
            image:         "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80",
            inStock:       true,
            stockCount:    7,
          },
          {
            id:            8,
            name:          "Aviator Sunglasses",
            category:      "Accessories",
            price:         159,
            originalPrice: null,
            rating:        4.4,
            reviewCount:   318,
            badge:         "bestseller",
            badgeLabel:    "BEST SELLER",
            filter:        "Best Sellers",
            image:         "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
            inStock:       true,
            stockCount:    22,
          },
        ],
      }}

      // ═══════════════════════════════════════════════════════
      // 5. DEALS OF THE DAY
      // ═══════════════════════════════════════════════════════
      deals={{
        enabled: true,

        title:    "Deals of the Day",
        subtitle: "Limited time offers — don't miss out",

        deals: [
          {
            id:            1,
            name:          "Premium Leather Jacket",
            category:      "Men",
            originalPrice: 599,
            salePrice:     349,
            discount:      42,            // % shown on badge — auto-calc if removed
            image:         "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
            stockTotal:    50,            // used for progress bar
            stockSold:     38,
            expiresAt:     Date.now() + 8 * 60 * 60 * 1000,  // 8 hours from now
            rating:        4.8,
            reviewCount:   89,
          },
          {
            id:            2,
            name:          "Diamond Tennis Bracelet",
            category:      "Jewellery",
            originalPrice: 899,
            salePrice:     599,
            discount:      33,
            image:         "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&q=80",
            stockTotal:    20,
            stockSold:     17,
            expiresAt:     Date.now() + 4 * 60 * 60 * 1000,  // 4 hours from now
            rating:        4.9,
            reviewCount:   43,
          },
          {
            id:            3,
            name:          "Designer Handbag",
            category:      "Accessories",
            originalPrice: 750,
            salePrice:     490,
            discount:      35,
            image:         "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
            stockTotal:    30,
            stockSold:     19,
            expiresAt:     Date.now() + 12 * 60 * 60 * 1000, // 12 hours from now
            rating:        4.7,
            reviewCount:   127,
          },
        ],
      }}

      // ═══════════════════════════════════════════════════════
      // 6. NEWSLETTER
      // ═══════════════════════════════════════════════════════
      newsletter={{
        enabled: true,

        headline:    "Join the Family",
        subheadline: "Subscribe and receive 15% off your first order",
        discount:    "15%",                     // gold badge — remove line to hide
        placeholder: "Enter your email address",
        ctaText:     "Claim Your Discount",

        benefits: [
          "Exclusive early access to new collections",
          "Members-only sale previews",
          "Style tips & trend reports",
        ],

        onSubscribe: (email) => {
          console.log("New subscriber:", email);
          // e.g. call your API: await api.subscribe(email)
        },
      }}

      // ═══════════════════════════════════════════════════════
      // 7. FOOTER
      // ═══════════════════════════════════════════════════════
      footer={{
        enabled: true,

        brand: {
          name:        "MY STORE",
          tagline:     "Refined Living, Delivered.",
          description: "Premium fashion and lifestyle products curated for those who appreciate quality and timeless style.",
        },

        // Add or remove columns freely
        columns: [
          {
            title: "Shop",
            links: [
              { label: "New Arrivals",  url: "/new-arrivals" },
              { label: "Women",         url: "/women" },
              { label: "Men",           url: "/men" },
              { label: "Accessories",   url: "/accessories" },
              { label: "Sale",          url: "/sale" },
            ],
          },
          {
            title: "Help",
            links: [
              { label: "FAQs",               url: "/faqs" },
              { label: "Shipping & Returns",  url: "/shipping" },
              { label: "Size Guide",          url: "/size-guide" },
              { label: "Track My Order",      url: "/track" },
              { label: "Contact Us",          url: "/contact" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About Us",      url: "/about" },
              { label: "Careers",       url: "/careers" },
              { label: "Sustainability", url: "/sustainability" },
              { label: "Press",         url: "/press" },
            ],
          },
        ],

        contact: {
          address: "15 Fashion Street, London, EC1A 1BB",
          phone:   "+44 20 7946 0958",
          email:   "hello@mystore.com",
          hours:   "Mon–Fri, 9am – 6pm GMT",
        },

        // Set platform to null to hide that icon
        social: {
          instagram: "https://instagram.com/mystore",
          facebook:  "https://facebook.com/mystore",
          twitter:   "https://twitter.com/mystore",
          pinterest: "https://pinterest.com/mystore",
          youtube:   "https://youtube.com/mystore",
        },

        legal: [
          { label: "Privacy Policy",   url: "/privacy" },
          { label: "Terms of Service", url: "/terms" },
          { label: "Cookie Policy",    url: "/cookies" },
        ],

        copyright: `© ${new Date().getFullYear()} MY STORE. All rights reserved.`,
      }}
    />
  );
}