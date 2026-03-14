// ─────────────────────────────────────────────────────────────
//  ShippingForm — India Edition
//
//  Fields: firstName, lastName, mobile (10-digit), address1,
//          address2, landmark, city, state (36 Indian states/UTs),
//          pincode (6-digit, verified against area name)
//
//  Features:
//    • +91 phone prefix display
//    • 6-digit PIN code with area lookup simulation
//    • All 28 states + 8 Union Territories
//    • "Landmark" field (important for Indian deliveries)
//    • 2-col grid on sm+ for first/last, city/pin
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, TextField, MenuItem, Typography, InputAdornment, CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme }    from "@mui/material/styles";
import { BRAND }       from "../../../theme/theme";
import Button          from "../../../components/common/Button/Button";
import { fieldSx }     from "../ContactForm/ContactForm";

// ── All 36 Indian states + UTs ────────────────────────────────
const INDIAN_STATES = [
  // States
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar",
  "Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
  "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands","Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu","Delhi",
  "Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

// ── Simulated PIN → area lookup ───────────────────────────────
const PIN_AREAS = {
  "110001":"Connaught Place, New Delhi",
  "400001":"Fort, Mumbai",
  "600001":"Chennai GPO, Chennai",
  "700001":"BBD Bagh, Kolkata",
  "560001":"MG Road, Bengaluru",
  "500001":"Abids, Hyderabad",
  "380001":"Lal Darwaja, Ahmedabad",
  "302001":"Badi Chaupar, Jaipur",
  "411001":"Budhwar Peth, Pune",
  "226001":"Hazratganj, Lucknow",
};

const validate = (d) => {
  const e = {};
  if (!d.firstName?.trim())                         e.firstName = "Required";
  if (!d.lastName?.trim())                          e.lastName  = "Required";
  if (!d.mobile?.trim())                            e.mobile    = "Mobile number required";
  else if (!/^[6-9]\d{9}$/.test(d.mobile.trim()))  e.mobile    = "Enter valid 10-digit mobile number";
  if (!d.address1?.trim())                          e.address1  = "House/flat/street address required";
  if (!d.city?.trim())                              e.city      = "City / district required";
  if (!d.state)                                     e.state     = "Select your state";
  if (!d.pincode?.trim())                           e.pincode   = "PIN code required";
  else if (!/^\d{6}$/.test(d.pincode.trim()))       e.pincode   = "Enter valid 6-digit PIN code";
  return e;
};

const ShippingForm = ({ data = {}, onChange, onNext, onBack }) => {
  const theme    = useTheme();
  const fSx      = fieldSx(theme);
  const [touched,      setTouched]      = useState({});
  const [pinLookup,    setPinLookup]    = useState("");
  const [pinChecking,  setPinChecking]  = useState(false);

  const errors    = validate(data);
  const hasErrors = Object.keys(errors).length > 0;
  const touch     = (f) => setTouched(t => ({...t,[f]:true}));
  const update    = (f) => (e) => onChange?.({...data,[f]:e.target.value});

  // Simulate PIN lookup
  const handlePinLookup = (pin) => {
    onChange?.({...data, pincode:pin});
    setPinLookup("");
    if (/^\d{6}$/.test(pin)) {
      setPinChecking(true);
      setTimeout(() => {
        setPinChecking(false);
        const area = PIN_AREAS[pin];
        setPinLookup(area ? `📍 ${area}` : "✓ Valid PIN code");
      }, 700);
    }
  };

  const handleNext = () => {
    const allFields = ["firstName","lastName","mobile","address1","city","state","pincode"];
    setTouched(Object.fromEntries(allFields.map(k=>[k,true])));
    if (!hasErrors) onNext?.(data);
  };

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:{xs:2,md:2.5} }}>

      {/* 2-col name grid */}
      <Box sx={{ display:"grid", gridTemplateColumns:{xs:"1fr",sm:"1fr 1fr"}, gap:{xs:2,sm:1.5,md:2} }}>

        {/* First name */}
        <TextField label="First name" value={data.firstName??""} onChange={update("firstName")} onBlur={()=>touch("firstName")} error={touched.firstName&&Boolean(errors.firstName)} helperText={touched.firstName?errors.firstName:""} required fullWidth autoComplete="given-name" inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }} sx={fSx} />

        {/* Last name */}
        <TextField label="Last name" value={data.lastName??""} onChange={update("lastName")} onBlur={()=>touch("lastName")} error={touched.lastName&&Boolean(errors.lastName)} helperText={touched.lastName?errors.lastName:""} required fullWidth autoComplete="family-name" inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }} sx={fSx} />

        {/* Mobile — full width with +91 prefix */}
        <Box sx={{ gridColumn:"span 2" }}>
          <TextField
            label="Mobile number"
            value={data.mobile??""}
            onChange={(e) => onChange?.({...data, mobile:e.target.value.replace(/\D/g,"").slice(0,10)})}
            onBlur={()=>touch("mobile")}
            error={touched.mobile&&Boolean(errors.mobile)}
            helperText={touched.mobile?errors.mobile:"10-digit mobile number for delivery updates"}
            required fullWidth inputMode="tel" autoComplete="tel"
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
        </Box>

        {/* Address line 1 — full width */}
        <Box sx={{ gridColumn:"span 2" }}>
          <TextField label="Flat / House No. / Building / Street" value={data.address1??""} onChange={update("address1")} onBlur={()=>touch("address1")} error={touched.address1&&Boolean(errors.address1)} helperText={touched.address1?errors.address1:"Include flat number and building name"} required fullWidth autoComplete="address-line1" inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }} sx={fSx} />
        </Box>

        {/* Address line 2 */}
        <Box sx={{ gridColumn:"span 2" }}>
          <TextField label="Area / Colony / Locality (optional)" value={data.address2??""} onChange={update("address2")} fullWidth autoComplete="address-line2" inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }} sx={fSx} />
        </Box>

        {/* Landmark */}
        <Box sx={{ gridColumn:"span 2" }}>
          <TextField label="Landmark (optional)" placeholder="e.g. Near Apollo Hospital, Opposite Metro Station" value={data.landmark??""} onChange={update("landmark")} fullWidth inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }} helperText="Helps delivery partner find your address faster" FormHelperTextProps={{ sx:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeXxs,mx:0} }} sx={fSx} />
        </Box>

        {/* City */}
        <TextField label="City / District" value={data.city??""} onChange={update("city")} onBlur={()=>touch("city")} error={touched.city&&Boolean(errors.city)} helperText={touched.city?errors.city:""} required fullWidth autoComplete="address-level2" inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }} sx={fSx} />

        {/* PIN code with lookup */}
        <Box>
          <TextField
            label="PIN Code"
            value={data.pincode??""}
            onChange={(e) => handlePinLookup(e.target.value.replace(/\D/g,"").slice(0,6))}
            onBlur={()=>touch("pincode")}
            error={touched.pincode&&Boolean(errors.pincode)}
            helperText={
              pinChecking ? "Looking up PIN…"
              : pinLookup ? pinLookup
              : touched.pincode ? (errors.pincode??"")
              : "6-digit India postal code"
            }
            required fullWidth inputMode="numeric" autoComplete="postal-code"
            inputProps={{ maxLength:6, style:{fontFamily:BRAND.fontMono,fontSize:BRAND.sizeSm,letterSpacing:"0.12em"} }}
            FormHelperTextProps={{ sx:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, mx:0, color: pinLookup&&!errors.pincode ? theme.palette.success.main : undefined } }}
            InputProps={{ endAdornment:(
              <InputAdornment position="end">
                {pinChecking
                  ? <CircularProgress size={14} sx={{ color:theme.palette.secondary.main }} />
                  : pinLookup && <CheckCircleIcon sx={{ fontSize:16, color:theme.palette.success.main }} />
                }
              </InputAdornment>
            )}}
            sx={fSx}
          />
        </Box>

        {/* State — full width */}
        <Box sx={{ gridColumn:"span 2" }}>
          <TextField label="State / Union Territory" value={data.state??""} onChange={update("state")} onBlur={()=>touch("state")} error={touched.state&&Boolean(errors.state)} helperText={touched.state?errors.state:""} required fullWidth select autoComplete="address-level1" inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }} sx={fSx}>
            {INDIAN_STATES.map((s)=>(
              <MenuItem key={s} value={s} sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm }}>{s}</MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {/* Nav */}
      <Box sx={{ display:"flex", gap:1.25, flexDirection:{xs:"column",sm:"row"}, mt:1 }}>
        <Button variant="outline" fullWidth size="lg" onClick={onBack}>← Back</Button>
        <Button variant="primary" fullWidth size="lg" onClick={handleNext}>Continue to Delivery</Button>
      </Box>
    </Box>
  );
};

export { INDIAN_STATES };
export default ShippingForm;
