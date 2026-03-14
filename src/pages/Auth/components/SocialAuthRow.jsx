// ─────────────────────────────────────────────────────────────
//  SocialAuthRow.jsx
//  Google SSO quick-auth button.
//  Shared between LoginPage and CreateAccountPage.
//
//  NOTE: PhonePe authentication has been removed.
//        Only Google SSO is supported.
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useTheme, alpha }           from "@mui/material/styles";
import { BRAND }                     from "../../../theme/theme";

const GoogleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const SocialBtn = ({ icon, label, onClick }) => {
  const theme = useTheme();
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            1,
        width:          "100%",
        py:             1.5,
        px:             2,
        border:         `1.5px solid ${theme.palette.divider}`,
        borderRadius:   BRAND.radiusInput,
        bgcolor:        theme.palette.background.paper,
        cursor:         "pointer",
        transition:     "all 0.18s ease",
        fontFamily:     BRAND.fontBody,
        fontSize:       BRAND.sizeSm,
        fontWeight:     600,
        color:          theme.palette.text.primary,
        "&:hover": {
          borderColor: theme.palette.primary.main,
          bgcolor:     alpha(theme.palette.primary.main, 0.03),
          boxShadow:   `0 2px 10px ${alpha(theme.palette.primary.main, 0.08)}`,
        },
      }}
    >
      {icon}
      <span>{label}</span>
    </Box>
  );
};

const SocialAuthRow = ({ label = "Or continue with", onGoogle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 2.5 }}>
        <Divider sx={{ flex: 1, borderColor: theme.palette.divider }} />
        <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXxs, color: theme.palette.text.disabled, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
          {label}
        </Typography>
        <Divider sx={{ flex: 1, borderColor: theme.palette.divider }} />
      </Box>
      <SocialBtn icon={<GoogleIcon />} label="Continue with Google" onClick={onGoogle} />
    </Box>
  );
};

export default SocialAuthRow;
