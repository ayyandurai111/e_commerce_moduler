// ============================================================
//  Footer/LinksCol.jsx — Footer links column
// ============================================================
import React, { useState } from "react";

/**
 * LinksCol — titled list of nav links
 * @param {object}  props.column  — { title, links[] }
 * @param {object}  props.theme
 */
export const LinksCol = ({ column = {}, theme }) => {
  const [hovered, setHovered] = useState(null);
  const t   = theme?.typography ?? {};
  const ftr = theme?.components?.footer ?? {};

  const titleStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    fontWeight: t.weightBold ?? 700,
    color: "#ffffff",
    letterSpacing: t.letterSpacingWider ?? "0.1em",
    textTransform: "uppercase",
    margin: "0 0 20px",
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const linkStyle = (i) => ({
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    color: hovered === i ? (ftr.linkHover ?? "#e94560") : (ftr.linkColor ?? "#9ca3af"),
    textDecoration: "none",
    transition: `color ${theme?.transitions?.fast ?? "0.15s ease"}`,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  });

  return (
    <div>
      <h3 style={titleStyle}>{column.title}</h3>
      <ul style={listStyle}>
        {column.links?.map((link, i) => (
          <li key={i}>
            <a
              href={link.url ?? "#"}
              style={linkStyle(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================================
//  Footer/ContactCol.jsx — Contact info column
// ============================================================
/**
 * ContactCol — address, phone, email, hours
 * @param {object}  props.contact  — { address, phone, email, hours }
 * @param {object}  props.theme
 */
export const ContactCol = ({ contact = {}, theme }) => {
  const t   = theme?.typography ?? {};
  const ftr = theme?.components?.footer ?? {};
  const c   = theme?.colors ?? {};

  const titleStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    fontWeight: t.weightBold ?? 700,
    color: "#ffffff",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: "0 0 20px",
  };

  const itemStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "14px",
  };

  const textStyle = {
    fontFamily: t.fontBody ?? "sans-serif",
    fontSize: t.sizeSm ?? "0.875rem",
    color: ftr.textColor ?? "#d1d5db",
    lineHeight: t.lineHeightNormal ?? 1.6,
    margin: 0,
  };

  const iconStyle = {
    color: c.secondary ?? "#e94560",
    flexShrink: 0,
    marginTop: "2px",
  };

  const PinIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  const PhoneIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.38 2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  const MailIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const ClockIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

  return (
    <div>
      <h3 style={titleStyle}>Contact</h3>
      {contact.address && (
        <div style={itemStyle}>
          <span style={iconStyle}><PinIcon /></span>
          <p style={textStyle}>{contact.address}</p>
        </div>
      )}
      {contact.phone && (
        <div style={itemStyle}>
          <span style={iconStyle}><PhoneIcon /></span>
          <a href={`tel:${contact.phone}`} style={{ ...textStyle, textDecoration: "none" }}>{contact.phone}</a>
        </div>
      )}
      {contact.email && (
        <div style={itemStyle}>
          <span style={iconStyle}><MailIcon /></span>
          <a href={`mailto:${contact.email}`} style={{ ...textStyle, textDecoration: "none" }}>{contact.email}</a>
        </div>
      )}
      {contact.hours && (
        <div style={itemStyle}>
          <span style={iconStyle}><ClockIcon /></span>
          <p style={textStyle}>{contact.hours}</p>
        </div>
      )}
    </div>
  );
};

// ============================================================
//  Footer/SocialIcons.jsx — Social media icon row
// ============================================================
const InstagramIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const FacebookIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TwitterIcon   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>;
const PinterestIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83l1.07-4.54s-.27-.55-.27-1.36c0-1.27.74-2.22 1.66-2.22.78 0 1.16.59 1.16 1.3 0 .79-.5 1.97-.77 3.07-.22.92.46 1.66 1.36 1.66 1.63 0 2.72-2.07 2.72-4.51 0-1.87-1.27-3.18-3.08-3.18-2.1 0-3.33 1.57-3.33 3.2 0 .64.25 1.31.56 1.68a.23.23 0 0 1 .05.22l-.21.87c-.03.14-.11.17-.26.1C8.43 13.4 7.8 11.84 7.8 10.61c0-2.7 1.96-5.18 5.66-5.18 2.97 0 5.27 2.12 5.27 4.95 0 2.95-1.86 5.32-4.43 5.32-.87 0-1.68-.45-1.96-1l-.53 1.99c-.19.74-.71 1.67-1.06 2.24.8.25 1.65.38 2.52.38 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>;
const YoutubeIcon   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;

const socialIconMap = {
  instagram: InstagramIcon,
  facebook:  FacebookIcon,
  twitter:   TwitterIcon,
  pinterest: PinterestIcon,
  youtube:   YoutubeIcon,
};

/**
 * SocialIcons — row of social media icon links
 * @param {object}  props.social  — { platform: url }
 * @param {object}  props.theme
 */
export const SocialIcons = ({ social = {}, theme }) => {
  const [hovered, setHovered] = useState(null);
  const c   = theme?.colors ?? {};
  const ftr = theme?.components?.footer ?? {};
  const trn = theme?.transitions ?? {};

  const entries = Object.entries(social).filter(([, url]) => url);
  if (!entries.length) return null;

  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
      {entries.map(([platform, url]) => {
        const Icon = socialIconMap[platform];
        if (!Icon) return null;
        const isHov = hovered === platform;
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            onMouseEnter={() => setHovered(platform)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: isHov ? (c.secondary ?? "#e94560") : "rgba(255,255,255,0.1)",
              color: isHov ? "#fff" : (ftr.linkColor ?? "#9ca3af"),
              transition: `all ${trn.normal ?? "0.25s ease"}`,
              border: `1px solid ${isHov ? "transparent" : "rgba(255,255,255,0.1)"}`,
            }}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};
