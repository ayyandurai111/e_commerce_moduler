// ─────────────────────────────────────────────────────────────
//  LoginPage.jsx
//
//  Two login modes (tabs):
//    Password  — mobile number + password
//    OTP       — mobile number + 6-digit OTP (send / resend)
//
//  Features:
//    • Form validation with inline error messages
//    • Show / hide password toggle
//    • OTP countdown resend timer
//    • "Remember me" checkbox
//    • Forgot password link
//    • Social auth row (Google)
//    • Link to Create Account
//
//  Props:
//    onLogin(data)        — called with { mobile, password | otp, remember }
//    onForgotPassword()   — navigate to forgot-password flow
//    onCreateAccount()    — navigate to create-account page
//    onLogoClick()        — navigate home
//    onGoogle()           — Google SSO

//    loading              bool
// ─────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";
import {
  Box, Typography, TextField, Checkbox, FormControlLabel,
  InputAdornment, IconButton, Tab, Tabs, Snackbar, Alert,
} from "@mui/material";
import VisibilityOutlinedIcon    from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import PhoneAndroidOutlinedIcon  from "@mui/icons-material/PhoneAndroidOutlined";
import LockOutlinedIcon          from "@mui/icons-material/LockOutlined";
import { useTheme, alpha }       from "@mui/material/styles";
import { BRAND }                 from "../../theme/theme";
import { fieldSx }               from "../Checkout/ContactForm/ContactForm";
import Button                    from "../../components/common/Button/Button";
import AuthLayout                from "./components/AuthLayout";
import SocialAuthRow             from "./components/SocialAuthRow";
import storeConfig               from "../../config/store/storeConfig";

// ── OTP Input (6 boxes) ───────────────────────────────────────
const OtpInput = ({ value, onChange }) => {
  const theme   = useTheme();
  const refs    = Array.from({ length:6 }, () => useRef(null));
  const digits  = (value + "      ").slice(0,6).split("");

  const handleKey = (i, e) => {
    if (e.key === "Backspace") {
      const next = [...digits];
      if (next[i] !== " ") { next[i] = " "; }
      else if (i > 0)      { next[i-1] = " "; refs[i-1].current?.focus(); }
      onChange(next.join("").replace(/ /g,""));
    }
  };

  const handleChange = (i, e) => {
    const v = e.target.value.replace(/\D/g,"").slice(-1);
    if (!v) return;
    const next = [...digits]; next[i] = v;
    onChange(next.join("").replace(/ /g,""));
    if (i < 5) refs[i+1].current?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);
    onChange(pasted);
    refs[Math.min(pasted.length, 5)].current?.focus();
    e.preventDefault();
  };

  return (
    <Box sx={{ display:"flex", gap:{ xs:1, sm:1.25 } }}>
      {digits.map((d, i) => (
        <Box
          key={i}
          ref={refs[i]}
          component="input"
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          sx={{
            flex:       1,
            minWidth:   0,
            height:     { xs:48, sm:52 },
            textAlign:  "center",
            fontSize:   "1.25rem",
            fontWeight: 700,
            fontFamily: BRAND.fontMono,
            border:     `2px solid ${d.trim() ? theme.palette.secondary.main : theme.palette.divider}`,
            borderRadius: BRAND.radiusInput,
            bgcolor:    d.trim() ? alpha(theme.palette.secondary.main,0.04) : theme.palette.background.paper,
            color:      theme.palette.text.primary,
            outline:    "none",
            transition: "all 0.15s ease",
            "&:focus":  {
              borderColor: theme.palette.secondary.main,
              boxShadow:   `0 0 0 3px ${alpha(theme.palette.secondary.main,0.15)}`,
              bgcolor:     alpha(theme.palette.secondary.main,0.03),
            },
          }}
        />
      ))}
    </Box>
  );
};

// ── OTP panel ─────────────────────────────────────────────────
const OtpPanel = ({ mobile, onSendOtp, onSubmit, loading }) => {
  const theme          = useTheme();
  const fSx            = fieldSx(theme);
  const [step,     setStep]     = useState("mobile"); // mobile | otp
  const [otp,      setOtp]      = useState("");
  const [seconds,  setSeconds]  = useState(0);
  const [mob,      setMob]      = useState(mobile || "");
  const [mobErr,   setMobErr]   = useState("");
  const timerRef               = useRef(null);

  const startTimer = () => {
    setSeconds(30);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds(s => { if (s <= 1) { clearInterval(timerRef.current); return 0; } return s-1; }), 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const sendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(mob)) { setMobErr("Enter a valid 10-digit mobile number"); return; }
    setMobErr("");
    onSendOtp?.(mob);
    setStep("otp");
    startTimer();
  };

  if (step === "mobile") return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:2.5 }}>
      <TextField
        label="Mobile Number" value={mob}
        onChange={e => setMob(e.target.value.replace(/\D/g,"").slice(0,10))}
        onKeyDown={e => e.key==="Enter" && sendOtp()}
        error={!!mobErr} helperText={mobErr}
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
      <Button variant="primary" size="lg" fullWidth onClick={sendOtp} loading={loading}>
        Send OTP
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:2.5 }}>
      <Box>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary, mb:0.5 }}>
          OTP sent to <strong>+91 {mob}</strong>
          <Box component="span" onClick={()=>{ setStep("mobile"); setOtp(""); }}
            sx={{ ml:1, color:theme.palette.secondary.main, cursor:"pointer", fontWeight:600, fontSize:BRAND.sizeXs, "&:hover":{ textDecoration:"underline" } }}>
            Change
          </Box>
        </Typography>
      </Box>

      <OtpInput value={otp} onChange={setOtp} />

      <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>
          {seconds > 0 ? `Resend in ${seconds}s` : ""}
        </Typography>
        {seconds === 0 && (
          <Typography onClick={startTimer}
            sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeXs, color:theme.palette.secondary.main, cursor:"pointer", "&:hover":{ textDecoration:"underline" } }}>
            Resend OTP
          </Typography>
        )}
      </Box>

      <Button variant="primary" size="lg" fullWidth
        onClick={() => onSubmit?.({ mobile:mob, otp })}
        loading={loading} disabled={otp.length < 6}>
        Verify & Login
      </Button>
    </Box>
  );
};

// ── Password panel ────────────────────────────────────────────
const PasswordPanel = ({ onSubmit, onForgotPassword, loading }) => {
  const theme = useTheme();
  const fSx   = fieldSx(theme);
  const [form,     setForm]     = useState({ mobile:"", password:"" });
  const [showPwd,  setShowPwd]  = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors,   setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!form.password || form.password.length < 6)    e.password = "Password must be at least 6 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => { if (validate()) onSubmit?.({ ...form, remember }); };

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:2.5 }}>
      <TextField
        label="Mobile Number" value={form.mobile}
        onChange={e => setForm(f=>({...f, mobile:e.target.value.replace(/\D/g,"").slice(0,10)}))}
        onKeyDown={e => e.key==="Enter" && submit()}
        error={!!errors.mobile} helperText={errors.mobile}
        inputMode="tel" fullWidth
        FormHelperTextProps={{ sx:{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, mx:0 } }}
        inputProps={{ maxLength:10, style:{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeSm, letterSpacing:"0.08em" } }}
        InputProps={{ startAdornment:(
          <InputAdornment position="start">
            <PhoneAndroidOutlinedIcon sx={{ fontSize:18, color:theme.palette.text.disabled, mr:0.25 }} />
            <Typography sx={{ fontFamily:BRAND.fontMono, fontWeight:700, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary, borderRight:`1px solid ${theme.palette.divider}`, pr:1, mr:0.5 }}>+91</Typography>
          </InputAdornment>
        )}}
        sx={fSx}
      />

      <TextField
        label="Password" type={showPwd ? "text" : "password"}
        value={form.password}
        onChange={e => setForm(f=>({...f, password:e.target.value}))}
        onKeyDown={e => e.key==="Enter" && submit()}
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

      <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <FormControlLabel
          control={<Checkbox size="small" checked={remember} onChange={e=>setRemember(e.target.checked)} sx={{ "&.Mui-checked":{ color:theme.palette.secondary.main } }} />}
          label={<Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>Remember me</Typography>}
          sx={{ m:0 }}
        />
        <Typography onClick={onForgotPassword}
          sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:600, color:theme.palette.secondary.main, cursor:"pointer", "&:hover":{ textDecoration:"underline" } }}>
          Forgot password?
        </Typography>
      </Box>

      <Button variant="primary" size="lg" fullWidth onClick={submit} loading={loading}>
        Sign In
      </Button>
    </Box>
  );
};

// ── LoginPage ─────────────────────────────────────────────────
const LoginPage = ({
  loading          = false,
  onLogin,
  onSendOtp,
  onForgotPassword,
  onCreateAccount,
  onLogoClick,
  onGoogle,
  storeName        = storeConfig.name,
}) => {
  const theme         = useTheme();
  const [tab, setTab] = useState(0); // 0=password  1=otp
  const [snack, setSnack] = useState({ open:false, msg:"", severity:"info" });

  const handleLogin = (data) => {
    onLogin?.(data);
    setSnack({ open:true, msg:"Signing you in…", severity:"info" });
  };

  return (
    <AuthLayout
      storeName={storeName}
      tagline={storeConfig.tagline}
      heroQuote="Style is a way to say who you are without having to speak."
      heroAuthor="Rachel Zoe"
      onLogoClick={onLogoClick}
    >
      {/* Heading */}
      <Box sx={{ mb:3.5 }}>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:theme.palette.secondary.main, mb:0.75 }}>
          Welcome back
        </Typography>
        <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:{ xs:"1.75rem", sm:"2.1rem" }, color:theme.palette.text.primary, lineHeight:1.15, mb:0.75 }}>
          Sign in to your account
        </Typography>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary }}>
          Don't have an account?{" "}
          <Box component="span" onClick={onCreateAccount}
            sx={{ fontWeight:700, color:theme.palette.secondary.main, cursor:"pointer", "&:hover":{ textDecoration:"underline" } }}>
            Create one free
          </Box>
        </Typography>
      </Box>

      {/* Mode tabs */}
      <Box sx={{
        border:       `1px solid ${theme.palette.divider}`,
        borderRadius: BRAND.radiusInput,
        overflow:     "hidden",
        mb:           3,
        bgcolor:      theme.palette.background.paper,
      }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="fullWidth"
          TabIndicatorProps={{ sx:{ bgcolor:theme.palette.secondary.main, height:2.5 } }}
          sx={{ minHeight:44, "& .MuiTab-root":{ fontFamily:BRAND.fontBody, fontWeight:600, fontSize:BRAND.sizeXs, textTransform:"none", minHeight:44, "&.Mui-selected":{ color:theme.palette.text.primary } } }}
        >
          <Tab label="Password" />
          <Tab label="OTP" />
        </Tabs>
      </Box>

      {/* Form panels */}
      {tab === 0 && (
        <PasswordPanel
          onSubmit={handleLogin}
          onForgotPassword={onForgotPassword}
          loading={loading}
        />
      )}
      {tab === 1 && (
        <OtpPanel
          onSendOtp={onSendOtp}
          onSubmit={handleLogin}
          loading={loading}
        />
      )}

      {/* Social auth */}
      <SocialAuthRow
        label="Or sign in with"
        onGoogle={onGoogle}
      />

      {/* Create account nudge */}
      <Box sx={{ mt:3, p:2, borderRadius:BRAND.radiusInput, bgcolor:alpha(theme.palette.primary.main,0.03), border:`1px solid ${theme.palette.divider}`, textAlign:"center" }}>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>
          New to {storeName}?{" "}
          <Box component="span" onClick={onCreateAccount}
            sx={{ fontWeight:700, color:theme.palette.secondary.main, cursor:"pointer", "&:hover":{ textDecoration:"underline" } }}>
            Create a free account →
          </Box>
        </Typography>
      </Box>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={()=>setSnack(s=>({...s,open:false}))} anchorOrigin={{ vertical:"bottom", horizontal:"center" }}>
        <Alert severity={snack.severity} variant="filled" onClose={()=>setSnack(s=>({...s,open:false}))} sx={{ fontFamily:BRAND.fontBody }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
};

export default LoginPage;
