// ─────────────────────────────────────────────────────────────
//  CreateAccountPage.jsx
//
//  Registration form with:
//    • First name + Last name
//    • 10-digit Indian mobile with +91 prefix
//    • Password with strength meter
//    • Confirm password
//    • Date of birth (optional — for birthday offer)
//    • WhatsApp updates opt-in
//    • Luxe newsletter opt-in
//    • Terms & conditions agreement
//    • Social sign-up (Google)
//    • Link back to Login
//
//  Props:
//    onRegister(data)    — called on successful validation
//    onLogin()           — navigate to login page
//    onLogoClick()       — navigate home
//    onGoogle()
//    loading             bool
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, Typography, TextField, Checkbox, FormControlLabel,
  InputAdornment, IconButton, LinearProgress, Snackbar, Alert,
} from "@mui/material";
import VisibilityOutlinedIcon    from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockOutlinedIcon          from "@mui/icons-material/LockOutlined";
import { useTheme, alpha }       from "@mui/material/styles";
import { BRAND }                 from "../../theme/theme";
import { fieldSx }               from "../Checkout/ContactForm/ContactForm";
import Button                    from "../../components/common/Button/Button";
import AuthLayout                from "./components/AuthLayout";
import SocialAuthRow             from "./components/SocialAuthRow";
import storeConfig               from "../../config/store/storeConfig";

// ── Password strength ─────────────────────────────────────────
const getStrength = (pwd) => {
  if (!pwd) return { score:0, label:"", color:"transparent" };
  let s = 0;
  if (pwd.length >= 8)           s++;
  if (/[A-Z]/.test(pwd))         s++;
  if (/[0-9]/.test(pwd))         s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  const map = [
    { score:0, label:"",         color:"transparent"                     },
    { score:1, label:"Weak",     color:"#ef4444"                         },
    { score:2, label:"Fair",     color:"#f97316"                         },
    { score:3, label:"Good",     color:"#eab308"                         },
    { score:4, label:"Strong",   color:"#22c55e"                         },
  ];
  return { ...map[s], pct: s * 25 };
};

// ── Main component ────────────────────────────────────────────
const CreateAccountPage = ({
  loading       = false,
  onRegister,
  onLogin,
  onLogoClick,
  onGoogle,
  storeName     = storeConfig.name,
}) => {
  const theme = useTheme();
  const fSx   = fieldSx(theme);

  const [form, setForm] = useState({
    firstName: "",
    lastName:  "",
    mobile:    "",
    dob:       "",
    password:  "",
    confirm:   "",
  });
  const [opts, setOpts] = useState({
    whatsapp:  true,
    newsletter:false,
    terms:     false,
  });
  const [showPwd,  setShowPwd]  = useState(false);
  const [showCfm,  setShowCfm]  = useState(false);
  const [errors,   setErrors]   = useState({});
  const [snack,    setSnack]    = useState({ open:false, msg:"", severity:"success" });

  const up = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const strength = getStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim())                              e.firstName = "First name is required";
    if (!form.lastName.trim())                               e.lastName  = "Last name is required";
    if (!/^[6-9]\d{9}$/.test(form.mobile))                  e.mobile    = "Enter a valid 10-digit mobile number";
    if (!form.password || form.password.length < 8)          e.password  = "Password must be at least 8 characters";
    if (strength.score < 2)                                  e.password  = "Password is too weak";
    if (form.confirm !== form.password)                      e.confirm   = "Passwords do not match";
    if (!opts.terms)                                         e.terms     = "Please accept the Terms & Conditions";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    onRegister?.({ ...form, ...opts });
    setSnack({ open:true, msg:"Account created! Welcome to Luxe Store 🎉", severity:"success" });
  };

  return (
    <AuthLayout
      storeName={storeName}
      tagline={storeConfig.tagline}
      heroQuote="Elegance is not about being noticed, it's about being remembered."
      heroAuthor="Giorgio Armani"
      onLogoClick={onLogoClick}
    >
      {/* Heading */}
      <Box sx={{ mb:3 }}>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:theme.palette.secondary.main, mb:0.75 }}>
          Join Luxe Store
        </Typography>
        <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:{ xs:"1.75rem", sm:"2.1rem" }, color:theme.palette.text.primary, lineHeight:1.15, mb:0.75 }}>
          Create your account
        </Typography>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary }}>
          Already have an account?{" "}
          <Box component="span" onClick={onLogin}
            sx={{ fontWeight:700, color:theme.palette.secondary.main, cursor:"pointer", "&:hover":{ textDecoration:"underline" } }}>
            Sign in
          </Box>
        </Typography>
      </Box>

      {/* ── Form ────────────────────────────────────── */}
      <Box sx={{ display:"flex", flexDirection:"column", gap:2.25 }}>

        {/* Name row */}
        <Box sx={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1.5 }}>
          <TextField
            label="First Name" value={form.firstName}
            onChange={up("firstName")}
            error={!!errors.firstName} helperText={errors.firstName}
            fullWidth
            FormHelperTextProps={{ sx:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, mx:0 } }}
            inputProps={{ style:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm } }}
            sx={fSx}
          />
          <TextField
            label="Last Name" value={form.lastName}
            onChange={up("lastName")}
            error={!!errors.lastName} helperText={errors.lastName}
            fullWidth
            FormHelperTextProps={{ sx:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, mx:0 } }}
            inputProps={{ style:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm } }}
            sx={fSx}
          />
        </Box>

        {/* Mobile */}
        <TextField
          label="Mobile Number" value={form.mobile}
          onChange={e => setForm(f=>({...f, mobile:e.target.value.replace(/\D/g,"").slice(0,10)}))}
          error={!!errors.mobile} helperText={errors.mobile || "We'll send your order updates here"}
          inputMode="tel" fullWidth
          FormHelperTextProps={{ sx:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, mx:0 } }}
          inputProps={{ maxLength:10, style:{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeSm, letterSpacing:"0.08em" } }}
          InputProps={{ startAdornment:(
            <InputAdornment position="start">
              <Typography sx={{ fontFamily:BRAND.fontMono, fontWeight:700, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary, borderRight:`1px solid ${theme.palette.divider}`, pr:1, mr:0.5 }}>+91</Typography>
            </InputAdornment>
          )}}
          sx={fSx}
        />

        {/* DOB */}
        <TextField
          label="Date of Birth (optional)" type="date"
          value={form.dob}
          onChange={up("dob")}
          fullWidth
          InputLabelProps={{ shrink:true }}
          helperText="Get an exclusive birthday surprise 🎂"
          FormHelperTextProps={{ sx:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, mx:0 } }}
          inputProps={{ style:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm } }}
          sx={fSx}
        />

        {/* Password */}
        <Box>
          <TextField
            label="Create Password" type={showPwd ? "text" : "password"}
            value={form.password}
            onChange={up("password")}
            error={!!errors.password} helperText={errors.password}
            fullWidth
            FormHelperTextProps={{ sx:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, mx:0 } }}
            inputProps={{ style:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm } }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize:18, color:theme.palette.text.disabled }} /></InputAdornment>,
              endAdornment:(
                <InputAdornment position="end">
                  <IconButton size="small" edge="end" onClick={()=>setShowPwd(p=>!p)}>
                    {showPwd
                      ? <VisibilityOffOutlinedIcon sx={{ fontSize:18, color:theme.palette.text.disabled }} />
                      : <VisibilityOutlinedIcon   sx={{ fontSize:18, color:theme.palette.text.disabled }} />
                    }
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={fSx}
          />
          {/* Strength bar */}
          {form.password && (
            <Box sx={{ mt:0.75, display:"flex", alignItems:"center", gap:1.25 }}>
              <LinearProgress
                variant="determinate"
                value={strength.pct}
                sx={{
                  flex:1, height:4, borderRadius:2,
                  bgcolor: alpha(strength.color, 0.15),
                  "& .MuiLinearProgress-bar":{ bgcolor:strength.color, borderRadius:2, transition:"width 0.35s ease" },
                }}
              />
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:700, color:strength.color, minWidth:40 }}>
                {strength.label}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Confirm password */}
        <TextField
          label="Confirm Password" type={showCfm ? "text" : "password"}
          value={form.confirm}
          onChange={up("confirm")}
          error={!!errors.confirm} helperText={errors.confirm}
          fullWidth
          FormHelperTextProps={{ sx:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, mx:0 } }}
          inputProps={{ style:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm } }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize:18, color:theme.palette.text.disabled }} /></InputAdornment>,
            endAdornment:(
              <InputAdornment position="end">
                <IconButton size="small" edge="end" onClick={()=>setShowCfm(p=>!p)}>
                  {showCfm
                    ? <VisibilityOffOutlinedIcon sx={{ fontSize:18, color:theme.palette.text.disabled }} />
                    : <VisibilityOutlinedIcon   sx={{ fontSize:18, color:theme.palette.text.disabled }} />
                  }
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={fSx}
        />

        {/* Opt-ins */}
        <Box sx={{ display:"flex", flexDirection:"column", gap:0.5, mt:0.25 }}>
          <FormControlLabel
            control={<Checkbox size="small" checked={opts.whatsapp} onChange={e=>setOpts(o=>({...o,whatsapp:e.target.checked}))} sx={{ "&.Mui-checked":{ color:theme.palette.secondary.main } }} />}
            label={<Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>Receive order updates on <strong>WhatsApp</strong></Typography>}
            sx={{ m:0 }}
          />
          <FormControlLabel
            control={<Checkbox size="small" checked={opts.newsletter} onChange={e=>setOpts(o=>({...o,newsletter:e.target.checked}))} sx={{ "&.Mui-checked":{ color:theme.palette.secondary.main } }} />}
            label={<Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>Get exclusive offers & style updates</Typography>}
            sx={{ m:0 }}
          />
          <FormControlLabel
            control={<Checkbox size="small" checked={opts.terms} onChange={e=>setOpts(o=>({...o,terms:e.target.checked}))} sx={{ "&.Mui-checked":{ color:theme.palette.secondary.main } }} />}
            label={
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:errors.terms ? theme.palette.error.main : theme.palette.text.secondary }}>
                I agree to the{" "}
                <Box component="span" sx={{ color:theme.palette.secondary.main, fontWeight:600, cursor:"pointer", "&:hover":{ textDecoration:"underline" } }}>Terms & Conditions</Box>
                {" "}and{" "}
                <Box component="span" sx={{ color:theme.palette.secondary.main, fontWeight:600, cursor:"pointer", "&:hover":{ textDecoration:"underline" } }}>Privacy Policy</Box>
              </Typography>
            }
            sx={{ m:0, alignItems:"flex-start", "& .MuiCheckbox-root":{ pt:0.25 } }}
          />
          {errors.terms && (
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.error.main, ml:3.5 }}>
              {errors.terms}
            </Typography>
          )}
        </Box>

        <Button variant="primary" size="lg" fullWidth onClick={submit} loading={loading}>
          Create Account
        </Button>
      </Box>

      {/* Social sign-up */}
      <SocialAuthRow
        label="Or sign up with"
        onGoogle={onGoogle}
      />

      {/* Login nudge */}
      <Box sx={{ mt:2.5, p:2, borderRadius:BRAND.radiusInput, bgcolor:alpha(theme.palette.primary.main,0.03), border:`1px solid ${theme.palette.divider}`, textAlign:"center" }}>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>
          Already have an account?{" "}
          <Box component="span" onClick={onLogin}
            sx={{ fontWeight:700, color:theme.palette.secondary.main, cursor:"pointer", "&:hover":{ textDecoration:"underline" } }}>
            Sign in →
          </Box>
        </Typography>
      </Box>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={()=>setSnack(s=>({...s,open:false}))} anchorOrigin={{ vertical:"bottom", horizontal:"center" }}>
        <Alert severity={snack.severity} variant="filled" onClose={()=>setSnack(s=>({...s,open:false}))} sx={{ fontFamily:BRAND.fontBody }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
};

export default CreateAccountPage;
