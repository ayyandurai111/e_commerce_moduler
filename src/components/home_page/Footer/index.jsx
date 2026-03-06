// ============================================================
//  Footer/index.jsx — Full-width dark footer with columns
// ============================================================
import React from "react";
import BrandCol                          from "./BrandCol";
import { LinksCol, ContactCol, SocialIcons } from "./FooterCols";

/**
 * Footer
 * @param {boolean}  props.enabled
 * @param {object}   props.brand      — { name, tagline, description }
 * @param {array}    props.columns    — [{ title, links[] }]
 * @param {object}   props.contact    — { address, phone, email, hours }
 * @param {object}   props.social     — { platform: url }
 * @param {array}    props.legal      — [{ label, url }]
 * @param {string}   props.copyright
 * @param {object}   props.theme
 */
const Footer = ({
  enabled   = true,
  brand,
  columns   = [],
  contact,
  social,
  legal     = [],
  copyright,
  theme,
}) => {
  if (!enabled) return null;

  const t   = theme?.typography ?? {};
  const c   = theme?.colors ?? {};
  const s   = theme?.spacing ?? {};
  const ftr = theme?.components?.footer ?? {};

  const footerStyle = {
    background: ftr.background ?? c.backgroundAlt ?? "#1a1a2e",
    padding: `${s["3xl"] ?? "64px"} ${theme?.layout?.containerPad ?? "24px"} 0`,
  };

  const innerStyle = {
    maxWidth: theme?.layout?.containerMax ?? "1280px",
    margin: "0 auto",
  };

  const bottomBarStyle = {
    borderTop: `1px solid ${ftr.borderColor ?? "rgba(255,255,255,0.08)"}`,
    marginTop: s["2xl"] ?? "48px",
    padding: `${s.lg ?? "24px"} 0`,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: s.md ?? "16px",
  };

  const copyrightStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeXs ?? "0.75rem",
    color: ftr.copyrightColor ?? "#6b7280",
  };

  const legalLinkStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeXs ?? "0.75rem",
    color: ftr.linkColor ?? "#9ca3af",
    textDecoration: "none",
  };

  // Payment icons (simple text badges)
  const paymentMethods = ["VISA", "MC", "AMEX", "PayPal", "Apple Pay"];

  return (
    <footer style={footerStyle} aria-label="Site footer">
      <div style={innerStyle}>
        {/* Inject responsive CSS */}
        <style>{`
          .luxe-footer-grid {
            display: grid;
            grid-template-columns: 2fr repeat(${columns.length}, 1fr) ${contact ? "1.2fr" : ""};
            gap: ${s["2xl"] ?? "48px"};
          }
          @media (max-width: 1024px) {
            .luxe-footer-grid {
              grid-template-columns: 1fr 1fr;
              gap: ${s.xl ?? "32px"};
            }
          }
          @media (max-width: 600px) {
            .luxe-footer-grid {
              grid-template-columns: 1fr;
              gap: ${s.xl ?? "32px"};
            }
          }
          .luxe-footer-legal { display: flex; gap: 20px; flex-wrap: wrap; }
          .luxe-footer-payment { display: flex; gap: 8px; flex-wrap: wrap; }
          @media (max-width: 600px) {
            .luxe-footer-bottom { flex-direction: column; align-items: flex-start; }
          }
        `}</style>

        {/* Main grid */}
        <div className="luxe-footer-grid">
          {/* Brand column */}
          <div>
            <BrandCol brand={brand ?? theme?.brand} theme={theme} />
            {social && <SocialIcons social={social} theme={theme} />}
          </div>

          {/* Link columns */}
          {columns.map((col, i) => (
            <LinksCol key={i} column={col} theme={theme} />
          ))}

          {/* Contact column */}
          {contact && <ContactCol contact={contact} theme={theme} />}
        </div>

        {/* Bottom bar */}
        <div style={bottomBarStyle} className="luxe-footer-bottom">
          {/* Copyright */}
          <p style={copyrightStyle}>
            {copyright ?? `© ${new Date().getFullYear()} ${brand?.name ?? theme?.brand?.name ?? "Store"}. All rights reserved.`}
          </p>

          {/* Legal links */}
          {legal?.length > 0 && (
            <div className="luxe-footer-legal">
              {legal.map((link, i) => (
                <a
                  key={i}
                  href={link.url ?? "#"}
                  style={legalLinkStyle}
                  onMouseOver={(e) => (e.currentTarget.style.color = ftr.linkHover ?? "#e94560")}
                  onMouseOut={(e) => (e.currentTarget.style.color = ftr.linkColor ?? "#9ca3af")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Payment badges */}
          <div className="luxe-footer-payment">
            {paymentMethods.map((pm) => (
              <span
                key={pm}
                style={{
                  padding: "3px 8px",
                  borderRadius: theme?.radius?.sm ?? "4px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: t.fontBody ?? "sans-serif",
                  fontSize: "9px",
                  fontWeight: t.weightBold ?? 700,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.04em",
                }}
              >
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
