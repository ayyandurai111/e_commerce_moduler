import React, { useState } from "react";
import {
  Box, Container, Typography, TextField, Button,
  InputAdornment, Collapse } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import EmailOutlinedIcon          from "@mui/icons-material/EmailOutlined";
import CheckCircleIcon            from "@mui/icons-material/CheckCircle";
import LocalShippingOutlinedIcon  from "@mui/icons-material/LocalShippingOutlined";
import ReplayIcon                 from "@mui/icons-material/Replay";
import LockOutlinedIcon           from "@mui/icons-material/LockOutlined";
import { BRAND } from "../../../theme/theme";

// ── PerksRow ──────────────────────────────────────────────────
const PERKS = [
  { icon: <LocalShippingOutlinedIcon />, text: "Free Shipping on $50+" },
  { icon: <ReplayIcon />,               text: "30-Day Free Returns"    },
  { icon: <LockOutlinedIcon />,         text: "Secure Payments"        },
];

const PerksRow = () => {
  const theme = useTheme();
  return (
    <Box sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
      gap: 3, mb: 5,
    }}>
      {PERKS.map((perk) => (
        <Box key={perk.text} sx={{
          display: "flex", alignItems: "center",
          justifyContent: { xs: "flex-start", sm: "center" },
          gap: 1.5,
        }}>
          <Box sx={{ color: theme.palette.warning.main, display: "flex" }}>
            {perk.icon}
          </Box>
          <Typography sx={{
            fontSize: "0.88rem", fontWeight: 500,
            color: alpha(theme.palette.primary.contrastText, 0.8),
            fontFamily: BRAND.fontBody,
          }}>
            {perk.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

// ── Newsletter (main export) ──────────────────────────────────
const Newsletter = ({
  enabled    = true,
  title      = "Join the Luxe Inner Circle",
  subtitle   = "Get early access to new arrivals, exclusive deals, and style inspiration.",
  incentive  = "Get 15% off your first order",
  onSubscribe,
  showPerks  = true }) => {
  const theme = useTheme();
  const [email,   setEmail]   = useState("");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!enabled) return null;

  const validate = (val) => {
    if (!val) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Please enter a valid email.";
    return "";
  };

  const handleSubscribe = async () => {
    const err = validate(email);
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    await (onSubscribe ? onSubscribe(email) : new Promise((r) => setTimeout(r, 1200)));
    setLoading(false);
    setSuccess(true);
    setEmail("");
  };

  return (
    <Box component="section" sx={{
      py:         { xs: 8, md: 12 },
      background: `linear-gradient(135deg,
        ${theme.palette.primary.main} 0%,
        ${theme.palette.primary.light} 40%,
        ${theme.palette.primary.dark} 100%)`,
      position:   "relative",
      overflow:   "hidden" }}>
      {/* Decorative glows */}
      <Box sx={{
        position:     "absolute", top: -80, right: -80,
        width: 400, height: 400, borderRadius: "50%",
        background:   `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 70%)`,
        pointerEvents:"none" }} />
      <Box sx={{
        position:     "absolute", bottom: -60, left: -60,
        width: 300, height: 300, borderRadius: "50%",
        background:   `radial-gradient(circle, ${alpha(theme.palette.warning.main, 0.1)} 0%, transparent 70%)`,
        pointerEvents:"none" }} />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        {showPerks && <PerksRow />}

        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          {incentive && (
            <Box sx={{
              display:         "inline-flex",
              alignItems:      "center",
              gap:             1,
              backgroundColor: alpha(theme.palette.warning.main, 0.15),
              border:          `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
              borderRadius:    "9999px",
              px: 2.5, py: 0.75, mb: 3 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: theme.palette.warning.main }} />
              <Typography sx={{
                color:         theme.palette.warning.main,
                fontSize:      "0.8rem",
                fontWeight:    700,
                letterSpacing: "0.06em",
                fontFamily:    BRAND.fontBody }}>
                {incentive}
              </Typography>
            </Box>
          )}

          <Typography variant="h2" sx={{
            color:      theme.palette.primary.contrastText,
            mb:         2,
            fontFamily: BRAND.fontDisplay,
            fontSize:   { xs: "1.9rem", md: "2.5rem" } }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{
            color:      alpha(theme.palette.primary.contrastText, 0.65),
            maxWidth:   480,
            mx:         "auto",
            lineHeight: 1.7,
            fontFamily: BRAND.fontBody }}>
            {subtitle}
          </Typography>
        </Box>

        {/* Form */}
        <Collapse in={!success} unmountOnExit>
          <Box sx={{
            display:       "flex",
            flexDirection: { xs: "column", sm: "row" },
            maxWidth:      540,
            mx:            "auto",
            gap:           { xs: 1.5, sm: 0 } }}>
            {/* Email input */}
            <TextField
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
              error={Boolean(error)}
              helperText={error}
              disabled={loading}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                  </InputAdornment>
                ) }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.96),
                  borderRadius:    { xs: BRAND.radiusInput, sm: `${BRAND.radiusInput} 0 0 ${BRAND.radiusInput}` },
                  height:          54,
                  "& fieldset":    { border: "none" },
                  "&.Mui-focused fieldset": {
                    border:    `2px solid ${theme.palette.secondary.main}`,
                    boxShadow: `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.15)}` } },
                "& .MuiFormHelperText-root": {
                  color:     theme.palette.warning.main,
                  fontWeight:500,
                  ml:        0, mt: 0.75,
                  fontFamily:BRAND.fontBody } }}
            />

            {/* Subscribe button */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubscribe}
              disabled={loading}
              sx={{
                height:       54,
                px:           { xs: 3, md: 4 },
                borderRadius: { xs: BRAND.radiusButton, sm: `0 ${BRAND.radiusButton} ${BRAND.radiusButton} 0` },
                fontWeight:   700,
                fontFamily:   BRAND.fontBody,
                fontSize:     "0.9rem",
                flexShrink:   0,
                whiteSpace:   "nowrap",
                boxShadow:    `0 4px 20px ${alpha(theme.palette.secondary.main, 0.4)}`,
                "&:hover": { boxShadow: `0 6px 24px ${alpha(theme.palette.secondary.main, 0.5)}` } }}
            >
              {loading ? "Subscribing…" : "Subscribe"}
            </Button>
          </Box>

          <Typography sx={{
            textAlign:  "center",
            mt:         2,
            fontSize:   "0.75rem",
            color:      alpha(theme.palette.primary.contrastText, 0.35),
            fontFamily: BRAND.fontBody }}>
            No spam, ever. Unsubscribe at any time.
          </Typography>
        </Collapse>

        {/* Success state */}
        <Collapse in={success} unmountOnExit>
          <Box sx={{
            textAlign:       "center",
            backgroundColor: alpha(theme.palette.success.main, 0.12),
            border:          `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
            borderRadius:    "16px",
            py: 4, px: 3,
            maxWidth: 480, mx: "auto" }}>
            <CheckCircleIcon sx={{ fontSize: 48, color: theme.palette.success.main, mb: 1.5 }} />
            <Typography variant="h5" sx={{
              color:      theme.palette.primary.contrastText,
              mb:         1,
              fontFamily: BRAND.fontDisplay }}>
              You're on the list!
            </Typography>
            <Typography sx={{
              color:      alpha(theme.palette.primary.contrastText, 0.6),
              fontSize:   "0.9rem",
              fontFamily: BRAND.fontBody }}>
              Check your inbox for your welcome offer.
            </Typography>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Newsletter;
