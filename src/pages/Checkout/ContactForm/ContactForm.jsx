// ─────────────────────────────────────────────────────────────
//  ContactForm — India Edition
//
//  Fields: Email + 10-digit mobile (mandatory for India COD/OTP)
//
//  Features:
//    • Express checkout: GPay / PhonePe / Paytm (India-native)
//    • +91 prefix, 10-digit mobile validation (starts 6-9)
//    • WhatsApp order updates opt-in (very common in India UX)
//    • Offers & style newsletter opt-in
//    • "Sign in / Register" link
//    • RBI / Razorpay secure note
//
//  Exports: fieldSx (shared MUI input style factory)
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, Typography, TextField, Checkbox,
  FormControlLabel, Divider, InputAdornment,
} from "@mui/material";
import LockOutlinedIcon  from "@mui/icons-material/LockOutlined";
import WhatsAppIcon      from "@mui/icons-material/WhatsApp";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";
import Button              from "../../../components/common/Button/Button";

// ── Shared field style (exported for use across Checkout forms) ──
export const fieldSx = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: BRAND.radiusInput,
    bgcolor:      theme.palette.background.paper,
    fontFamily:   BRAND.fontBody,
    fontSize:     BRAND.sizeSm,
    "& fieldset":                 { borderColor: theme.palette.divider, borderWidth: "1.5px" },
    "&:hover fieldset":           { borderColor: theme.palette.primary.main },
    "&.Mui-focused fieldset":     { borderColor: theme.palette.secondary.main, boxShadow: `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.1)}` },
  },
  "& .MuiInputLabel-root": {
    fontFamily: BRAND.fontBody, fontSize: BRAND.sizeSm,
    color:      theme.palette.text.secondary,
    "&.Mui-focused": { color: theme.palette.secondary.main },
  },
  "& .MuiFormHelperText-root": { fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXxs, mx: 0, mt: 0.5 },
});

// ── Validation ────────────────────────────────────────────────
const validate = (d) => {
  const e = {};
  if (!d.mobile)                                             e.mobile = "Mobile number is required";
  else if (!/^[6-9]\d{9}$/.test(d.mobile.replace(/\s/g,""))) e.mobile = "Enter valid 10-digit Indian mobile number";
  return e;
};

const ContactForm = ({ data = {}, onChange, onNext }) => {
  const theme   = useTheme();
  const fSx     = fieldSx(theme);
  const [touched,   setTouched]   = useState({});
  const [whatsapp,  setWhatsapp]  = useState(true);   // default ON — very Indian UX
  const [newsletter,setNewsletter]= useState(false);

  const errors    = validate(data);
  const hasErrors = Object.keys(errors).length > 0;
  const touch     = (f) => setTouched(t => ({...t,[f]:true}));
  const update    = (f) => (e) => onChange?.({...data,[f]:e.target.value});

  const handleNext = () => {
    setTouched({ mobile:true });
    if (!hasErrors) onNext?.({...data, whatsapp, newsletter});
  };

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:{xs:2.5,md:3} }}>

      {/* ── Express checkout (India native) ──────── */}
      <Box>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightMedium, color:theme.palette.text.secondary, textAlign:"center", mb:{xs:1.5,md:2}, letterSpacing:"0.04em" }}>
          Express checkout
        </Typography>

        <Box sx={{ display:"flex", gap:1.25, flexDirection:{xs:"column",sm:"row"} }}>
          {/* Google Pay */}
          <Box sx={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:1, height:{xs:46,md:50}, border:`1.5px solid ${theme.palette.divider}`, borderRadius:BRAND.radiusButton, bgcolor:theme.palette.background.paper, cursor:"pointer", transition:"all 0.2s ease", "&:hover":{ borderColor:"#4285F4", bgcolor:alpha("#4285F4",0.04), transform:"translateY(-1px)" } }}>
            <Box sx={{ width:22, height:22, borderRadius:"50%", bgcolor:"#4285F4", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:900, fontSize:"0.65rem", color:"#fff" }}>G</Typography>
            </Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightBold, color:theme.palette.text.primary }}>Google Pay</Typography>
          </Box>

          {/* PhonePe */}
          <Box sx={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:1, height:{xs:46,md:50}, border:`1.5px solid ${theme.palette.divider}`, borderRadius:BRAND.radiusButton, bgcolor:theme.palette.background.paper, cursor:"pointer", transition:"all 0.2s ease", "&:hover":{ borderColor:"#5f259f", bgcolor:alpha("#5f259f",0.04), transform:"translateY(-1px)" } }}>
            <Box sx={{ width:22, height:22, borderRadius:"50%", bgcolor:"#5f259f", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:900, fontSize:"0.6rem", color:"#fff" }}>Pe</Typography>
            </Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightBold, color:theme.palette.text.primary }}>PhonePe</Typography>
          </Box>

          {/* Paytm */}
          <Box sx={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:1, height:{xs:46,md:50}, border:`1.5px solid ${theme.palette.divider}`, borderRadius:BRAND.radiusButton, bgcolor:theme.palette.background.paper, cursor:"pointer", transition:"all 0.2s ease", "&:hover":{ borderColor:"#00BAF2", bgcolor:alpha("#00BAF2",0.05), transform:"translateY(-1px)" } }}>
            <Box sx={{ width:22, height:22, borderRadius:"50%", bgcolor:"#00BAF2", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:900, fontSize:"0.65rem", color:"#fff" }}>P</Typography>
            </Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightBold, color:theme.palette.text.primary }}>Paytm</Typography>
          </Box>
        </Box>

        <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mt:2.5 }}>
          <Divider sx={{ flex:1 }} />
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.disabled, whiteSpace:"nowrap" }}>
            or continue with mobile
          </Typography>
          <Divider sx={{ flex:1 }} />
        </Box>
      </Box>

      {/* ── Mobile ────────────────────────────────── */}
      <Box sx={{ display:"flex", flexDirection:"column", gap:{xs:2,md:2.5} }}>
        <TextField
          label="Mobile number"
          value={data.mobile??""}
          onChange={(e) => onChange?.({...data, mobile:e.target.value.replace(/\D/g,"").slice(0,10)})}
          onBlur={()=>touch("mobile")}
          error={touched.mobile&&Boolean(errors.mobile)}
          helperText={touched.mobile?errors.mobile:"Required for delivery OTP and order tracking"}
          fullWidth required inputMode="tel" autoComplete="tel"
          inputProps={{ maxLength:10, style:{fontFamily:BRAND.fontMono,fontSize:BRAND.sizeSm,letterSpacing:"0.06em"} }}
          InputProps={{
            startAdornment:(
              <InputAdornment position="start">
                <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightBold, color:theme.palette.text.secondary, borderRight:`1px solid ${theme.palette.divider}`, pr:1, mr:0.5 }}>+91</Typography>
              </InputAdornment>
            ),
          }}
          sx={fSx}
        />

        {/* WhatsApp opt-in — prominent, default ON */}
        <Box sx={{ border:`1.5px solid ${whatsapp ? "#25D366" : theme.palette.divider}`, borderRadius:BRAND.radiusButton, px:1.5, py:1.25, bgcolor:whatsapp ? alpha("#25D366",0.04) : "transparent", transition:"all 0.2s ease" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={whatsapp}
                onChange={(e)=>setWhatsapp(e.target.checked)}
                size="small"
                sx={{ color:theme.palette.divider, "&.Mui-checked":{ color:"#25D366" }, pt:0 }}
              />
            }
            label={
              <Box sx={{ display:"flex", alignItems:"flex-start", gap:0.75 }}>
                <WhatsAppIcon sx={{ fontSize:16, color:"#25D366", mt:0.1, flexShrink:0 }} />
                <Box>
                  <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, color:theme.palette.text.primary, lineHeight:1.3 }}>
                    Get order updates on WhatsApp
                  </Typography>
                  <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>
                    Shipping confirmation, OTP, and delivery alerts on WhatsApp
                  </Typography>
                </Box>
              </Box>
            }
            sx={{ mx:0, alignItems:"flex-start", "& .MuiCheckbox-root":{ pt:0.25 } }}
          />
        </Box>

        {/* Newsletter opt-in */}
        <FormControlLabel
          control={
            <Checkbox checked={newsletter} onChange={(e)=>setNewsletter(e.target.checked)} size="small"
              sx={{ color:theme.palette.divider, "&.Mui-checked":{ color:theme.palette.secondary.main } }} />
          }
          label={
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>
              Receive exclusive offers, festive sale alerts & style news via WhatsApp
            </Typography>
          }
          sx={{ mx:0, alignItems:"flex-start", "& .MuiCheckbox-root":{ pt:0.25 } }}
        />
      </Box>

      {/* ── Secure note ──────────────────────────── */}
      <Box sx={{ display:"flex", alignItems:"center", gap:0.75, bgcolor:alpha(theme.palette.success.main,0.06), border:`1px solid ${alpha(theme.palette.success.main,0.18)}`, borderRadius:BRAND.radiusButton, px:1.75, py:1.25 }}>
        <LockOutlinedIcon sx={{ fontSize:13, color:theme.palette.success.main, flexShrink:0 }} />
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary, fontWeight:theme.typography.fontWeightMedium }}>
          Your data is encrypted and protected under India's IT Act 2000 & DPDP Act 2023. We never sell your information.
        </Typography>
      </Box>

      {/* ── Continue CTA ─────────────────────────── */}
      <Button variant="primary" fullWidth size="lg" onClick={handleNext}>
        Continue to Shipping
      </Button>
    </Box>
  );
};

export default ContactForm;
