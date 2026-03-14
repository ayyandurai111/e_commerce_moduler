// ─────────────────────────────────────────────────────────────
//  BillingForm — Billing address (inside PaymentForm step)
//
//  Behaviour:
//    • "Same as shipping" toggle (default ON)  →  no extra fields
//    • Toggle OFF  →  shows full billing address form
//    • Re-uses ShippingForm-style 2-col grid layout
//    • All tokens from theme.js / BRAND
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, Typography, Switch, FormControlLabel,
  TextField, MenuItem, Collapse, Divider,
} from "@mui/material";
import HomeOutlinedIcon    from "@mui/icons-material/HomeOutlined";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";
import { fieldSx }         from "../ContactForm/ContactForm";

const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "CA", label: "Canada"         },
  { code: "AU", label: "Australia"      },
  { code: "DE", label: "Germany"        },
  { code: "FR", label: "France"         },
  { code: "JP", label: "Japan"          },
  { code: "SG", label: "Singapore"      },
  { code: "IN", label: "India"          },
  { code: "AE", label: "UAE"            },
];

const validate = (d) => {
  const e = {};
  if (!d.firstName?.trim()) e.firstName = "Required";
  if (!d.lastName?.trim())  e.lastName  = "Required";
  if (!d.address1?.trim())  e.address1  = "Street address is required";
  if (!d.city?.trim())      e.city      = "City is required";
  if (!d.zip?.trim())       e.zip       = "Postcode is required";
  if (!d.country)           e.country   = "Select a country";
  return e;
};

const BillingForm = ({ shippingData = {}, data = {}, onChange, sameAsShipping, onSameToggle }) => {
  const theme   = useTheme();
  const [touched, setTouched] = useState({});
  const fSx = fieldSx(theme);

  const errors = validate(data);
  const touch  = (f) => setTouched(t => ({ ...t, [f]: true }));
  const update = (f) => (e) => onChange?.({ ...data, [f]: e.target.value });

  return (
    <Box sx={{ mt: { xs: 2, md: 3 } }}>
      <Divider sx={{ mb: { xs: 2, md: 2.5 } }} />

      {/* ── Section header ──────────────────────── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: { xs: 1.5, md: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{
            width: 32, height: 32,
            borderRadius: BRAND.radiusButton,
            bgcolor: alpha(theme.palette.primary.main, 0.07),
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <HomeOutlinedIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
          </Box>
          <Typography sx={{
            fontFamily: BRAND.fontDisplay,
            fontSize:   { xs: BRAND.sizeSm, md: BRAND.sizeBody },
            fontWeight: theme.typography.fontWeightBold,
            color:      theme.palette.text.primary,
          }}>
            Billing Address
          </Typography>
        </Box>

        {/* Same-as-shipping toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={sameAsShipping}
              onChange={(e) => onSameToggle?.(e.target.checked)}
              size="small"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: theme.palette.secondary.main },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: alpha(theme.palette.secondary.main, 0.5) },
              }}
            />
          }
          label={
            <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, color: theme.palette.text.secondary }}>
              Same as shipping
            </Typography>
          }
          labelPlacement="start"
          sx={{ ml: 0, gap: 0.5 }}
        />
      </Box>

      {/* ── Same-as-shipping summary ─────────────── */}
      <Collapse in={sameAsShipping}>
        <Box sx={{
          px: { xs: 1.75, md: 2.25 },
          py: { xs: 1.25, md: 1.5 },
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          border:  `1px dashed ${theme.palette.divider}`,
          borderRadius: BRAND.radiusButton,
        }}>
          <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm, color: theme.palette.text.secondary, lineHeight: 1.7 }}>
            {shippingData.firstName} {shippingData.lastName}<br />
            {shippingData.address1}{shippingData.address2 ? `, ${shippingData.address2}` : ""}<br />
            {shippingData.city}{shippingData.state ? `, ${shippingData.state}` : ""} {shippingData.zip}<br />
            {COUNTRIES.find(c => c.code === shippingData.country)?.label ?? shippingData.country}
          </Typography>
        </Box>
      </Collapse>

      {/* ── Full billing form ────────────────────── */}
      <Collapse in={!sameAsShipping}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: { xs: 2, sm: 1.5, md: 2 },
          mt: 1.5,
        }}>
          {/* First name */}
          <TextField
            label="First name" value={data.firstName ?? ""}
            onChange={update("firstName")} onBlur={() => touch("firstName")}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName ? errors.firstName : ""}
            required fullWidth autoComplete="billing given-name"
            inputProps={{ style: { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm } }}
            sx={fSx}
          />

          {/* Last name */}
          <TextField
            label="Last name" value={data.lastName ?? ""}
            onChange={update("lastName")} onBlur={() => touch("lastName")}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName ? errors.lastName : ""}
            required fullWidth autoComplete="billing family-name"
            inputProps={{ style: { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm } }}
            sx={fSx}
          />

          {/* Address line 1 */}
          <Box sx={{ gridColumn: "span 2" }}>
            <TextField
              label="Street address" value={data.address1 ?? ""}
              onChange={update("address1")} onBlur={() => touch("address1")}
              error={touched.address1 && Boolean(errors.address1)}
              helperText={touched.address1 ? errors.address1 : ""}
              required fullWidth autoComplete="billing address-line1"
              inputProps={{ style: { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm } }}
              sx={fSx}
            />
          </Box>

          {/* Address line 2 */}
          <Box sx={{ gridColumn: "span 2" }}>
            <TextField
              label="Apartment, suite, etc. (optional)" value={data.address2 ?? ""}
              onChange={update("address2")} fullWidth autoComplete="billing address-line2"
              inputProps={{ style: { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm } }}
              sx={fSx}
            />
          </Box>

          {/* Country */}
          <Box sx={{ gridColumn: "span 2" }}>
            <TextField
              label="Country" value={data.country ?? "US"}
              onChange={update("country")} onBlur={() => touch("country")}
              error={touched.country && Boolean(errors.country)}
              helperText={touched.country ? errors.country : ""}
              required fullWidth select autoComplete="billing country"
              inputProps={{ style: { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm } }}
              sx={fSx}
            >
              {COUNTRIES.map((c) => (
                <MenuItem key={c.code} value={c.code} sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm }}>
                  {c.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* City */}
          <TextField
            label="City" value={data.city ?? ""}
            onChange={update("city")} onBlur={() => touch("city")}
            error={touched.city && Boolean(errors.city)}
            helperText={touched.city ? errors.city : ""}
            required fullWidth autoComplete="billing address-level2"
            inputProps={{ style: { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm } }}
            sx={fSx}
          />

          {/* ZIP */}
          <TextField
            label="Postcode / ZIP" value={data.zip ?? ""}
            onChange={update("zip")} onBlur={() => touch("zip")}
            error={touched.zip && Boolean(errors.zip)}
            helperText={touched.zip ? errors.zip : ""}
            required fullWidth autoComplete="billing postal-code"
            inputProps={{ style: { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm } }}
            sx={fSx}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export default BillingForm;
