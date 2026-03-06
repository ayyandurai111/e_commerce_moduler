// ============================================================
//  Navbar/IconBar.jsx — Using react-icons library
// ============================================================
import React, { useState } from "react";

// ── Import icons directly from react-icons ──────────────────
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

const IconBar = ({
  config        = {},
  cartCount     = 0,
  wishlistCount = 0,
  theme,
  scrolled      = false,
  mobileOpen    = false,
  onMobileToggle,
}) => {
  const [hov, setHov] = useState(null);

  const c   = theme?.colors ?? {};
  const trn = theme?.transitions ?? {};

  // ── Colors ──────────────────────────────────────────────
  const ICON_COLOR = scrolled ? "#ffffff" : "#1a1a2e";
  const HOVER_BG   = c.secondary ?? "#e94560";

  // ── Badge ───────────────────────────────────────────────
  const Badge = ({ count }) => {
    if (!count || count <= 0) return null;
    return (
      <span style={{
        position:       "absolute",
        top:            "-5px",
        right:          "-5px",
        minWidth:       "18px",
        height:         "18px",
        borderRadius:   "9999px",
        background:     HOVER_BG,
        color:          "#ffffff",
        fontSize:       "10px",
        fontWeight:     700,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "0 4px",
        border:         "2px solid #ffffff",
        zIndex:         10,
        lineHeight:     1,
        pointerEvents:  "none",
      }}>
        {count > 9 ? "9+" : count}
      </span>
    );
  };

  // ── Reusable button ─────────────────────────────────────
  const Btn = ({ id, label, badge = 0, onClick, icon: Icon }) => {
    const isHov = hov === id;
    return (
      <button
        aria-label={label}
        onClick={onClick}
        onMouseEnter={() => setHov(id)}
        onMouseLeave={() => setHov(null)}
        style={{
          position:       "relative",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          width:          "42px",
          height:         "42px",
          borderRadius:   "50%",
          background:     isHov ? HOVER_BG : "transparent",
          border:         "none",
          cursor:         "pointer",
          flexShrink:     0,
          transition:     `background ${trn.normal ?? "0.25s ease"}`,
        }}
      >
        <Icon
    color={isHov ? "#ffffff" : ICON_COLOR}
  style={{
    display:  "block",
    width:    "28px",   // ← change this number
    height:   "28px",   // ← change this number
    minWidth: "28px",   // ← prevents shrinking
    flexShrink: 0,
  }}
/>

        <Badge count={badge} />
      </button>
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>

      {config.showSearch   !== false && (
        <Btn id="search"   label="Search"   icon={FiSearch} />
      )}

      {config.showWishlist !== false && (
        <Btn id="wishlist" label="Wishlist"  icon={FiHeart}  badge={wishlistCount} />
      )}

      {config.showCart     !== false && (
        <Btn id="cart"     label="Cart"     icon={FiShoppingCart} badge={cartCount} />
      )}

      {config.showAccount  !== false && (
        <Btn id="account"  label="Account"  icon={FiUser} />
      )}

      {/* Mobile hamburger */}
      <button
        className="luxe-hamburger"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={onMobileToggle}
        onMouseEnter={() => setHov("menu")}
        onMouseLeave={() => setHov(null)}
        style={{
          display:        "none",
          alignItems:     "center",
          justifyContent: "center",
          width:          "42px",
          height:         "42px",
          borderRadius:   "50%",
          background:     hov === "menu" ? HOVER_BG : "transparent",
          border:         "none",
          cursor:         "pointer",
          transition:     `background ${trn.normal ?? "0.25s ease"}`,
        }}
      >
        {mobileOpen
          ? <FiX   size={22} color={hov === "menu" ? "#ffffff" : ICON_COLOR} />
          : <FiMenu size={22} color={hov === "menu" ? "#ffffff" : ICON_COLOR} />
        }
      </button>

    </div>
  );
};

export default IconBar;