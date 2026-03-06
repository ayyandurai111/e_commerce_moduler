// ============================================================
//  Navbar/NavLinks.jsx — Horizontal navigation link list
// ============================================================
import React, { useState } from "react";

const NavLinks = ({ links = [], theme, scrolled = false }) => {
  const [hovered, setHovered] = useState(null);

  const t   = theme?.typography ?? {};
  const c   = theme?.colors ?? {};
  const nav = theme?.components?.navbar ?? {};

  const baseColor = scrolled
    ? (nav.textColorScroll ?? "#fff")
    : (nav.textColor ?? c.textPrimary);

  if (!links?.length) return null;

  return (
    <nav aria-label="Main navigation">
      <ul
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        theme?.spacing?.lg ?? "24px",
          listStyle:  "none",
          margin:     0,
          padding:    0,
        }}
      >
        {links.map((link, i) => {
          const isHovered   = hovered === i;
          const isHighlight = link.highlight === true;

          return (
            <li key={link.url ?? i}>
              <a
                href={link.url ?? "#"}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position:       "relative",
                  fontFamily:     t.fontBody ?? "sans-serif",
                  fontSize:       t.sizeSm ?? "0.875rem",
                  fontWeight:     isHighlight ? 700 : t.weightMedium ?? 500,
                  letterSpacing:  t.letterSpacingWide ?? "0.05em",
                  color:          isHighlight
                                    ? "#e94560"
                                    : isHovered
                                    ? "#e94560"
                                    : baseColor,
                  textDecoration: "none",
                  textTransform:  "uppercase",
                  transition:     `color ${theme?.transitions?.normal ?? "0.25s ease"}`,
                  paddingBottom:  "4px",
                  display:        "inline-block",
                }}
              >
                {link.label}

                {/* Animated underline — explicit closing tag fixes JSX error */}
                <span
                  style={{
                    position:     "absolute",
                    bottom:       0,
                    left:         0,
                    width:        isHovered ? "100%" : "0%",
                    height:       "2px",
                    background:   "#e94560",
                    transition:   `width ${theme?.transitions?.normal ?? "0.25s ease"}`,
                    borderRadius: "2px",
                  }}
                ></span>

              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinks;