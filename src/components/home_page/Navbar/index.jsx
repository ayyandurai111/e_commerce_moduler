// ============================================================
//  Navbar/index.jsx — Sticky navbar with scroll transition
//                     and responsive mobile drawer
// ============================================================
import React, { useState, useEffect } from "react";
import Logo     from "./Logo";
import NavLinks from "./NavLinks";
import IconBar  from "./IconBar";

/**
 * Navbar
 * @param {object}  props.enabled        — render guard
 * @param {string}  props.storeName
 * @param {string}  [props.logoUrl]
 * @param {array}   props.links          — [{ label, url, highlight? }]
 * @param {number}  props.cartCount
 * @param {number}  props.wishlistCount
 * @param {object}  props.theme          — full theme
 */
const Navbar = ({
  enabled = true,
  storeName,
  logoUrl,
  links = [],
  cartCount = 0,
  wishlistCount = 0,
  theme,
}) => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!enabled) return null;

  const c   = theme?.colors ?? {};
  const nav = theme?.components?.navbar ?? {};
  const trn = theme?.transitions ?? {};

  const navBackground = scrolled
    ? (nav.backgroundScroll ?? c.backgroundAlt ?? "#1a1a2e")
    : (nav.background ?? "#ffffff");

  const brandName = storeName ?? theme?.brand?.name ?? "STORE";

  // ── Styles ──────────────────────────────────────────────────
  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme?.zIndex?.sticky ?? 200,
    height: nav.height ?? "68px",
    background: navBackground,
    borderBottom: scrolled ? "none" : (nav.borderBottom ?? "1px solid #e5e7eb"),
    boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
    transition: `background ${trn.normal ?? "0.25s ease"}, box-shadow ${trn.normal ?? "0.25s ease"}`,
  };

  const innerStyle = {
    maxWidth: theme?.layout?.containerMax ?? "1280px",
    margin: "0 auto",
    padding: `0 ${theme?.layout?.containerPad ?? "24px"}`,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme?.spacing?.lg ?? "24px",
  };

  // ── Mobile drawer ─────────────────────────────────────────
  const drawerStyle = {
    position: "fixed",
    top: nav.height ?? "68px",
    left: 0,
    right: 0,
    bottom: 0,
    background: c.backgroundAlt ?? "#1a1a2e",
    zIndex: (theme?.zIndex?.dropdown ?? 100),
    transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
    transition: `transform ${trn.slow ?? "0.4s ease"}`,
    overflowY: "auto",
    padding: `${theme?.spacing?.xl ?? "32px"} ${theme?.layout?.containerPad ?? "24px"}`,
  };

  return (
    <>
      {/* ── Inject responsive CSS ─────────────────────────── */}
      <style>{`
        .luxe-nav-links { display: flex !important; }
        .luxe-hamburger { display: none !important; }
        @media (max-width: 1023px) {
          .luxe-nav-links { display: none !important; }
          .luxe-hamburger { display: flex !important; }
        }
        .luxe-mobile-link {
          display: block;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          font-family: ${theme?.typography?.fontDisplay ?? "serif"};
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .luxe-mobile-link:hover { color: ${c.secondary ?? "#e94560"}; }
        .luxe-mobile-highlight { color: ${c.secondary ?? "#e94560"} !important; }
      `}</style>

      {/* ── Main navbar bar ─────────────────────────────── */}
      <header style={navbarStyle} role="banner">
        <div style={innerStyle}>
          {/* Logo */}
          <Logo
            storeName={brandName}
            logoUrl={logoUrl ?? theme?.brand?.logo}
            theme={theme}
            scrolled={scrolled}
          />

          {/* Desktop nav links */}
          <div className="luxe-nav-links" style={{ flex: 1, justifyContent: "center", display: "flex" }}>
            <NavLinks links={links} theme={theme} scrolled={scrolled} />
          </div>

          {/* Icon bar + hamburger */}
          <IconBar
            config={nav}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            theme={theme}
            scrolled={scrolled}
            mobileOpen={mobileOpen}
            onMobileToggle={() => setMobileOpen((v) => !v)}
          />
        </div>
      </header>

      {/* ── Mobile drawer ──────────────────────────────── */}
      <div style={drawerStyle} aria-hidden={!mobileOpen}>
        <nav>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url ?? "#"}
              className={`luxe-mobile-link${link.highlight ? " luxe-mobile-highlight" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Spacer to push content below fixed nav ────── */}
      <div style={{ height: nav.height ?? "68px" }} aria-hidden="true" />
    </>
  );
};

export default Navbar;
