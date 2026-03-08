import React from "react";
import {
  Box, Container, Typography, Divider,
  IconButton, Link, Chip } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import FacebookIcon   from "@mui/icons-material/Facebook";
import InstagramIcon  from "@mui/icons-material/Instagram";
import TwitterIcon    from "@mui/icons-material/Twitter";
import PinterestIcon  from "@mui/icons-material/Pinterest";
import YouTubeIcon    from "@mui/icons-material/YouTube";
import PhoneIcon      from "@mui/icons-material/Phone";
import EmailIcon      from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { BRAND } from "../../../theme/theme";

const SOCIAL_MAP = {
  facebook:  { icon: <FacebookIcon />,  label: "Facebook"  },
  instagram: { icon: <InstagramIcon />, label: "Instagram" },
  twitter:   { icon: <TwitterIcon />,   label: "Twitter"   },
  pinterest: { icon: <PinterestIcon />, label: "Pinterest" },
  youtube:   { icon: <YouTubeIcon />,   label: "YouTube"   } };

// ── SocialIcons ───────────────────────────────────────────────
const SocialIcons = ({ social = {} }) => {
  const theme   = useTheme();
  const entries = Object.entries(social).filter(([k]) => SOCIAL_MAP[k]);
  if (!entries.length) return null;

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {entries.map(([platform, url]) => (
        <IconButton
          key={platform}
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={SOCIAL_MAP[platform].label}
          size="small"
          sx={{
            width: 36, height: 36,
            backgroundColor: alpha(theme.palette.primary.contrastText, 0.07),
            color:           alpha(theme.palette.primary.contrastText, 0.5),
            border:          `1px solid ${alpha(theme.palette.primary.contrastText, 0.1)}`,
            transition:      "all 0.22s ease",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              color:           theme.palette.secondary.contrastText,
              borderColor:     theme.palette.secondary.main,
              transform:       "translateY(-2px)" } }}
        >
          {React.cloneElement(SOCIAL_MAP[platform].icon, { sx: { fontSize: 17 } })}
        </IconButton>
      ))}
    </Box>
  );
};

// ── BrandCol ──────────────────────────────────────────────────
const BrandCol = ({ storeName, tagline, description, social, paymentMethods }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography sx={{
        fontFamily:    BRAND.fontDisplay,
        fontWeight:    900,
        fontSize:      "1.5rem",
        color:         theme.palette.primary.contrastText,
        letterSpacing: "0.04em",
        mb:            1 }}>
        {storeName}
      </Typography>

      {tagline && (
        <Typography sx={{
          fontSize:      "0.8rem",
          color:         theme.palette.warning.main,
          letterSpacing: "0.08em",
          mb:            2,
          fontFamily:    BRAND.fontBody }}>
          {tagline}
        </Typography>
      )}

      {description && (
        <Typography sx={{
          fontSize:   "0.86rem",
          color:      alpha(theme.palette.primary.contrastText, 0.55),
          lineHeight: 1.7,
          mb:         3,
          maxWidth:   260,
          fontFamily: BRAND.fontBody }}>
          {description}
        </Typography>
      )}

      {social && <SocialIcons social={social} />}

      {paymentMethods?.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography sx={{
            fontSize:      "0.7rem",
            color:         alpha(theme.palette.primary.contrastText, 0.35),
            fontWeight:    600,
            letterSpacing: "0.08em",
            mb:            1,
            fontFamily:    BRAND.fontBody }}>
            SECURE PAYMENTS
          </Typography>
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
            {paymentMethods.map((pm) => (
              <Chip
                key={pm}
                label={pm}
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.contrastText, 0.08),
                  color:           alpha(theme.palette.primary.contrastText, 0.55),
                  border:          `1px solid ${alpha(theme.palette.primary.contrastText, 0.1)}`,
                  fontSize:        "0.68rem",
                  fontWeight:      600,
                  fontFamily:      BRAND.fontBody,
                  height:          22,
                  "& .MuiChip-label": { px: 1 } }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

// ── LinksCol ──────────────────────────────────────────────────
const LinksCol = ({ heading = "Links", links = [] }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography sx={{
        color:         theme.palette.primary.contrastText,
        fontWeight:    700,
        fontSize:      "0.88rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        mb:            2.5,
        fontFamily:    BRAND.fontBody }}>
        {heading}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.url || "#"}
            underline="none"
            sx={{
              color:      alpha(theme.palette.primary.contrastText, 0.5),
              fontSize:   "0.86rem",
              fontFamily: BRAND.fontBody,
              display:    "flex",
              alignItems: "center",
              gap:        0.75,
              transition: "all 0.2s ease",
              "&:hover": {
                color:       theme.palette.secondary.main,
                paddingLeft: "4px" } }}
          >
            {link.badge && (
              <Chip
                label={link.badge}
                size="small"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color:           theme.palette.secondary.contrastText,
                  fontSize:        "0.58rem",
                  fontWeight:      700,
                  fontFamily:      BRAND.fontBody,
                  height:          16,
                  "& .MuiChip-label": { px: 0.75 } }}
              />
            )}
            {link.label}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

// ── ContactCol ────────────────────────────────────────────────
const ContactCol = ({ heading = "Contact Us", contact = {}, hours }) => {
  const theme = useTheme();

  const items = [
    contact.phone   && { icon: <PhoneIcon      sx={{ fontSize: 15 }} />, text: contact.phone   },
    contact.email   && { icon: <EmailIcon      sx={{ fontSize: 15 }} />, text: contact.email   },
    contact.address && { icon: <LocationOnIcon sx={{ fontSize: 15 }} />, text: contact.address },
  ].filter(Boolean);

  return (
    <Box>
      <Typography sx={{
        color:         theme.palette.primary.contrastText,
        fontWeight:    700,
        fontSize:      "0.88rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        mb:            2.5,
        fontFamily:    BRAND.fontBody }}>
        {heading}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
        {items.map(({ icon, text }) => (
          <Box key={text} sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
            <Box sx={{ color: theme.palette.secondary.main, mt: 0.15, flexShrink: 0 }}>
              {icon}
            </Box>
            <Typography sx={{
              color:      alpha(theme.palette.primary.contrastText, 0.5),
              fontSize:   "0.86rem",
              lineHeight: 1.5,
              fontFamily: BRAND.fontBody }}>
              {text}
            </Typography>
          </Box>
        ))}

        {hours && (
          <Box>
            <Typography sx={{
              color:      theme.palette.primary.contrastText,
              fontSize:   "0.78rem",
              fontWeight: 600,
              mb:         0.5,
              fontFamily: BRAND.fontBody }}>
              Support Hours
            </Typography>
            <Typography sx={{
              color:      alpha(theme.palette.primary.contrastText, 0.5),
              fontSize:   "0.82rem",
              lineHeight: 1.5,
              fontFamily: BRAND.fontBody }}>
              {hours}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// ── Footer (main export) ──────────────────────────────────────
const Footer = ({
  enabled = true,
  storeName = "LUXE STORE",
  tagline = "Refined Living, Delivered.",
  description = "Curating the finest products from around the world.",
  links = [],
  shopLinks = [],
  helpLinks = [],
  contact = {},
  social = {},
  paymentMethods = ["Visa", "Mastercard", "PayPal", "Apple Pay"],
  copyright = null,
  hours = "Mon–Fri, 9am–6pm EST" }) => {
  const theme = useTheme();
  if (!enabled) return null;

  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{ backgroundColor: theme.palette.primary.main, pt: { xs: 6, md: 10 }, pb: 0 }}
    >
      <Container maxWidth="xl">
        <Box sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "2fr 1fr 1fr 2fr",
          },
          gap: { xs: 4, md: 6 },
        }}>
          <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1", md: "auto" } }}>
            <BrandCol
              storeName={storeName}
              tagline={tagline}
              description={description}
              social={social}
              paymentMethods={paymentMethods}
            />
          </Box>
          <Box>
            <LinksCol
              heading="Shop"
              links={shopLinks.length ? shopLinks : links.slice(0, Math.ceil(links.length / 2))}
            />
          </Box>
          <Box>
            <LinksCol
              heading="Help"
              links={helpLinks.length ? helpLinks : links.slice(Math.ceil(links.length / 2))}
            />
          </Box>
          <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1", md: "auto" } }}>
            <ContactCol contact={contact} hours={hours} />
          </Box>
        </Box>

        <Divider sx={{ borderColor: alpha(theme.palette.primary.contrastText, 0.08), mt: { xs: 5, md: 8 } }} />

        <Box sx={{
          py:             3,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          flexDirection:  { xs: "column", sm: "row" },
          gap:            2 }}>
          <Typography sx={{
            fontSize:   "0.8rem",
            color:      alpha(theme.palette.primary.contrastText, 0.3),
            fontFamily: BRAND.fontBody }}>
            {copyright || `© ${year} ${storeName}. All rights reserved.`}
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={{
                  fontSize:   "0.78rem",
                  color:      alpha(theme.palette.primary.contrastText, 0.3),
                  fontFamily: BRAND.fontBody,
                  transition: "color 0.2s ease",
                  "&:hover":  { color: theme.palette.secondary.main } }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
