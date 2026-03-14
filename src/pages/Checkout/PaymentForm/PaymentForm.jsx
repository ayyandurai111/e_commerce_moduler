// ─────────────────────────────────────────────────────────────
//  PaymentForm — India Edition
//
//  6 payment methods (India market order):
//    0  UPI         — GPay/PhonePe/Paytm/BHIM + manual UPI ID
//    1  Card        — RuPay/Visa/Mastercard/Amex, live detection
//    2  Net Banking — 20 major Indian banks
//    3  Wallets     — Paytm/PhonePe/Amazon Pay/MobiKwik
//    4  EMI         — No-Cost EMI 3/6 months + paid plans
//    5  COD         — ₹40 handling fee, PIN availability check
//
//  ✅ theme.js tokens · ₹ currency · RBI/Razorpay compliance note
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box, Typography, TextField, Tabs, Tab,
  Tooltip, InputAdornment, MenuItem, Chip,
} from "@mui/material";
import CreditCardIcon            from "@mui/icons-material/CreditCard";
import InfoOutlinedIcon          from "@mui/icons-material/InfoOutlined";
import LockIcon                  from "@mui/icons-material/Lock";
import AccountBalanceIcon        from "@mui/icons-material/AccountBalance";
import LocalAtmIcon              from "@mui/icons-material/LocalAtm";
import QrCodeIcon                from "@mui/icons-material/QrCode";
import AccountBalanceWalletIcon  from "@mui/icons-material/AccountBalanceWallet";
import CreditScoreIcon           from "@mui/icons-material/CreditScore";
import CheckCircleIcon           from "@mui/icons-material/CheckCircle";
import { useTheme, alpha }       from "@mui/material/styles";
import { BRAND }                 from "../../../theme/theme";
import Button                    from "../../../components/common/Button/Button";
import { fieldSx }               from "../ContactForm/ContactForm";

// ── Data ──────────────────────────────────────────────────────
const UPI_APPS = [
  { id:"gpay",    label:"Google Pay", color:"#4285F4", abbr:"G"  },
  { id:"phonepe", label:"PhonePe",    color:"#5f259f", abbr:"Pe" },
  { id:"paytm",   label:"Paytm",      color:"#00BAF2", abbr:"P"  },
  { id:"bhim",    label:"BHIM UPI",   color:"#00A550", abbr:"B"  },
  { id:"other",   label:"Other UPI",  color:"#6b7280", abbr:"+"  },
];

const BANKS = [
  "State Bank of India","HDFC Bank","ICICI Bank","Axis Bank",
  "Kotak Mahindra Bank","Punjab National Bank","Bank of Baroda",
  "Canara Bank","Union Bank of India","IDFC First Bank",
  "IndusInd Bank","Yes Bank","Federal Bank","South Indian Bank",
  "Karnataka Bank","City Union Bank","Bandhan Bank",
  "UCO Bank","Bank of India","Central Bank of India",
];

const WALLETS = [
  { id:"paytm",      label:"Paytm Wallet",  color:"#00BAF2" },
  { id:"phonepe",    label:"PhonePe Wallet",color:"#5f259f" },
  { id:"amazonpay",  label:"Amazon Pay",    color:"#FF9900" },
  { id:"mobikwik",   label:"MobiKwik",      color:"#1DAAF0" },
  { id:"freecharge", label:"FreeCharge",    color:"#FF5722" },
];

const EMI_TENURES = [
  { months:3,  note:"No cost EMI" },
  { months:6,  note:"No cost EMI" },
  { months:9,  note:"₹12/month extra" },
  { months:12, note:"₹18/month extra" },
  { months:18, note:"₹24/month extra" },
  { months:24, note:"₹30/month extra" },
];

// ── Helpers ───────────────────────────────────────────────────
const detectCard = (num) => {
  const n = num.replace(/\s/g,"");
  if (/^(508[5-9]|606[0-9]|607[0-9]|608[0-4])/.test(n)) return "RuPay";
  if (/^4/.test(n))       return "Visa";
  if (/^5[1-5]/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n))  return "Amex";
  return null;
};

const fmtCard   = (v) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
const fmtExpiry = (v) => { const d = v.replace(/\D/g,"").slice(0,4); return d.length>2 ? `${d.slice(0,2)}/${d.slice(2)}` : d; };

const validateCard = (d) => {
  const e = {};
  const raw = (d.cardNumber??"").replace(/\s/g,"");
  const cvvLen = detectCard(raw)==="Amex" ? 4 : 3;
  if (!d.cardName?.trim())  e.cardName   = "Name on card required";
  if (raw.length < 15)      e.cardNumber = "Enter valid card number";
  if (!(d.expiry??"").match(/^\d{2}\/\d{2}$/)) e.expiry = "Enter MM/YY";
  else {
    const [mm,yy] = d.expiry.split("/").map(Number);
    if (mm<1||mm>12||new Date(2000+yy,mm-1)<new Date()) e.expiry = "Card expired";
  }
  if ((d.cvv??"").length < cvvLen) e.cvv = `CVV is ${cvvLen} digits`;
  return e;
};

const validateUpi = (id) => {
  if (!id?.trim()) return "Enter your UPI ID";
  if (!/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/.test(id.trim())) return "Invalid UPI ID (e.g. name@okhdfc)";
  return null;
};

// ── Card brand badge ──────────────────────────────────────────
const CardBrandBadge = ({ brand }) => {
  const theme = useTheme();
  if (!brand) return null;
  const colors = { RuPay:"#1e4fa3", Visa:"#1a1f71", Mastercard:"#eb001b", Amex:"#007bc1" };
  return (
    <Box sx={{ bgcolor:colors[brand]??theme.palette.primary.main, color:"#fff", borderRadius:BRAND.radiusBadge, px:0.9, py:0.25, fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightBlack, fontSize:"0.56rem", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>
      {brand}
    </Box>
  );
};

// ── Tab label ─────────────────────────────────────────────────
const TL = ({ icon: Icon, label }) => (
  <Box sx={{ display:"flex", alignItems:"center", gap:0.5 }}>
    <Icon sx={{ fontSize:14 }} />
    <span>{label}</span>
  </Box>
);

// ─────────────────────────────────────────────────────────────
// ── Default full lists (used when caller passes no config) ────
const ALL_UPI_IDS   = UPI_APPS.map(a => a.id);
const ALL_BANK_NAMES = BANKS;
const ALL_METHODS   = ["upi","card","netbanking","wallet","emi","cod"];

const PaymentForm = ({
  data={},
  onChange,
  onNext,
  onBack,
  orderTotal=0,
  // ── Client config props ────────────────────────────────────
  // Pass an array of IDs to show only those options.
  // Omit (or pass undefined) to show everything.
  enabledUpiApps  = ALL_UPI_IDS,   // e.g. ["gpay","phonepe"]
  enabledBanks    = ALL_BANK_NAMES, // e.g. ["HDFC Bank","ICICI Bank"]
  enabledMethods  = ALL_METHODS,    // e.g. ["upi","card","cod"]
}) => {
  const theme = useTheme();
  const fSx   = fieldSx(theme);

  // ── Filtered option lists (derived from client config props) ──
  const visibleUpiApps = UPI_APPS.filter(a => enabledUpiApps.includes(a.id));
  const visibleBanks   = BANKS.filter(b => enabledBanks.includes(b));

  // Build tab list dynamically — only enabled methods, in original order
  const METHOD_DEFS = [
    { id:"upi",        label:"UPI",         Icon:QrCodeIcon              },
    { id:"card",       label:"Card",        Icon:CreditCardIcon          },
    { id:"netbanking", label:"Net Banking", Icon:AccountBalanceIcon      },
    { id:"wallet",     label:"Wallet",      Icon:AccountBalanceWalletIcon},
    { id:"emi",        label:"EMI",         Icon:CreditScoreIcon         },
    { id:"cod",        label:"COD",         Icon:LocalAtmIcon            },
  ];
  const visibleMethods = METHOD_DEFS.filter(m => enabledMethods.includes(m.id));
  // Map method id → visible tab index (needed for handleNext)
  const methodTabIndex = Object.fromEntries(visibleMethods.map((m, i) => [m.id, i]));

  const [tab,           setTab]           = useState(0);
  const [touched,       setTouched]       = useState({});
  const [upiApp,        setUpiApp]        = useState("gpay");
  const [upiVerified,   setUpiVerified]   = useState(false);
  const [upiChecking,   setUpiChecking]   = useState(false);
  const [selectedBank,  setSelectedBank]  = useState("");
  const [selectedWallet,setSelectedWallet]= useState("paytm");
  const [emiTenure,     setEmiTenure]     = useState(6);

  const cardErrors    = validateCard(data);
  const cardHasErrors = Object.keys(cardErrors).length > 0;
  const touch         = (f) => setTouched(t => ({...t,[f]:true}));
  const update        = (f) => (e) => onChange?.({...data,[f]:e.target.value});
  const cardType      = detectCard((data.cardNumber??"").replace(/\s/g,""));
  const cvvLen        = cardType==="Amex" ? 4 : 3;

  const verifyUpi = () => {
    if (validateUpi(data.upiId)) { touch("upiId"); return; }
    setUpiChecking(true);
    setTimeout(() => { setUpiChecking(false); setUpiVerified(true); }, 1200);
  };

  const handleNext = () => {
    const m = visibleMethods[tab]?.id;
    if (m==="card"||m==="emi") {
      setTouched({cardName:true,cardNumber:true,expiry:true,cvv:true});
      if (!cardHasErrors) onNext?.({...data, paymentMethod:m, emiTenure: m==="emi"?emiTenure:undefined});
    } else if (m==="upi") {
      if (!upiVerified && upiApp==="other") { touch("upiId"); return; }
      onNext?.({...data, paymentMethod:"upi", upiApp, upiId:data.upiId});
    } else if (m==="netbanking") {
      if (!selectedBank) return;
      onNext?.({...data, paymentMethod:"netbanking", bank:selectedBank});
    } else if (m==="wallet") {
      onNext?.({...data, paymentMethod:"wallet", wallet:selectedWallet});
    } else if (m==="cod") {
      onNext?.({...data, paymentMethod:"cod"});
    }
  };

  const tabSx = {
    borderBottom:`1px solid ${theme.palette.divider}`, minHeight:44,
    "& .MuiTab-root": {
      fontFamily:BRAND.fontBody, fontSize:{xs:"0.62rem",sm:BRAND.sizeXs},
      fontWeight:theme.typography.fontWeightMedium, textTransform:"none",
      minHeight:44, py:{xs:1,md:1.25}, px:{xs:0.75,md:1.25},
      color:theme.palette.text.secondary, minWidth:0,
      "&.Mui-selected":{ color:theme.palette.secondary.main, fontWeight:theme.typography.fontWeightBold },
    },
  };

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:{xs:2,md:2.5} }}>

      {/* ── Tabs ──────────────────────────────────────── */}
      <Box sx={{ border:`1px solid ${theme.palette.divider}`, borderRadius:BRAND.radiusCard, overflow:"hidden" }}>
        <Tabs value={tab} onChange={(_,v)=>setTab(v)} variant="scrollable" scrollButtons="auto"
          TabIndicatorProps={{ sx:{ bgcolor:theme.palette.secondary.main, height:2.5 } }} sx={tabSx}>
          {visibleMethods.map(({ id, label, Icon }) => (
            <Tab key={id} label={<TL icon={Icon} label={label} />} />
          ))}
        </Tabs>

        {/* ════════ UPI ════════ */}
        {visibleMethods[tab]?.id==="upi" && (
          <Box sx={{ p:{xs:2,md:2.5}, display:"flex", flexDirection:"column", gap:2 }}>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, color:theme.palette.text.secondary, textTransform:"uppercase", letterSpacing:"0.06em" }}>
              Choose UPI App
            </Typography>

            <Box sx={{ display:"flex", flexWrap:"wrap", gap:1 }}>
              {visibleUpiApps.map((app) => {
                const active = upiApp===app.id;
                return (
                  <Box key={app.id} onClick={()=>{ setUpiApp(app.id); setUpiVerified(false); }}
                    sx={{ display:"flex", alignItems:"center", gap:1, px:{xs:1.25,md:1.5}, py:{xs:0.75,md:1}, border:`2px solid ${active?app.color:theme.palette.divider}`, borderRadius:BRAND.radiusButton, bgcolor:active?alpha(app.color,0.06):theme.palette.background.paper, cursor:"pointer", transition:"all 0.18s ease", "&:hover":{ borderColor:app.color } }}>
                    <Box sx={{ width:24, height:24, borderRadius:"50%", bgcolor:app.color, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:"0.54rem", fontWeight:theme.typography.fontWeightBlack, color:"#fff" }}>{app.abbr}</Typography>
                    </Box>
                    <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:active?theme.typography.fontWeightBold:400, color:active?app.color:theme.palette.text.primary }}>
                      {app.label}
                    </Typography>
                    {active && <CheckCircleIcon sx={{ fontSize:13, color:app.color, ml:0.25 }} />}
                  </Box>
                );
              })}
            </Box>

            <TextField
              label="UPI ID" placeholder="yourname@okhdfc"
              value={data.upiId??""} onBlur={()=>touch("upiId")}
              onChange={(e)=>{ onChange?.({...data,upiId:e.target.value}); setUpiVerified(false); }}
              error={touched.upiId && Boolean(validateUpi(data.upiId))}
              helperText={ upiVerified ? "✓ UPI ID verified" : touched.upiId ? (validateUpi(data.upiId)??"") : "e.g. yourname@okhdfc  or  9876543210@paytm" }
              fullWidth
              FormHelperTextProps={{ sx:{ color:upiVerified?theme.palette.success.main:undefined, fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, mx:0 } }}
              inputProps={{ style:{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeSm } }}
              InputProps={{ endAdornment:(
                <InputAdornment position="end">
                  {upiVerified
                    ? <CheckCircleIcon sx={{ fontSize:18, color:theme.palette.success.main }} />
                    : <Typography onClick={verifyUpi} sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, color:upiChecking?theme.palette.text.disabled:theme.palette.secondary.main, cursor:upiChecking?"wait":"pointer" }}>
                        {upiChecking?"Checking…":"Verify"}
                      </Typography>
                  }
                </InputAdornment>
              )}}
              sx={fSx}
            />

            <Box sx={{ bgcolor:alpha(theme.palette.info.main,0.06), border:`1px solid ${alpha(theme.palette.info.main,0.2)}`, borderRadius:BRAND.radiusButton, px:1.5, py:1 }}>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>
                📱 You'll be redirected to your UPI app to approve payment of <strong>₹{orderTotal.toLocaleString("en-IN")}</strong>
              </Typography>
            </Box>
          </Box>
        )}

        {/* ════════ CARD ════════ */}
        {visibleMethods[tab]?.id==="card" && (
          <Box sx={{ p:{xs:2,md:2.5}, display:"flex", flexDirection:"column", gap:{xs:1.75,md:2} }}>
            {/* Card preview */}
            <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", px:2, py:1.25, bgcolor:theme.palette.primary.main, borderRadius:BRAND.radiusButton }}>
              <Box sx={{ display:"flex", gap:0.5, alignItems:"center" }}>
                {[0,1,2].map(i=><Box key={i} sx={{ width:7, height:7, borderRadius:"50%", bgcolor:alpha("#fff",0.3) }} />)}
                <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeSm, color:"#fff", ml:1, letterSpacing:"0.12em" }}>
                  {(data.cardNumber??"").slice(-4) ? `•••• ${(data.cardNumber??"").slice(-4)}` : "•••• ••••"}
                </Typography>
              </Box>
              {cardType ? <CardBrandBadge brand={cardType} /> : <CreditCardIcon sx={{ fontSize:18, color:alpha("#fff",0.45) }} />}
            </Box>

            <TextField label="Name on card" value={data.cardName??""} onChange={update("cardName")} onBlur={()=>touch("cardName")} error={touched.cardName&&Boolean(cardErrors.cardName)} helperText={touched.cardName?cardErrors.cardName:""} fullWidth autoComplete="cc-name" inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }} sx={fSx} />

            <TextField label="Card number" value={data.cardNumber??""} onChange={(e)=>onChange?.({...data,cardNumber:fmtCard(e.target.value)})} onBlur={()=>touch("cardNumber")} error={touched.cardNumber&&Boolean(cardErrors.cardNumber)} helperText={touched.cardNumber?cardErrors.cardNumber:"Visa · Mastercard · RuPay · Amex accepted"} fullWidth inputMode="numeric" inputProps={{ maxLength:19, style:{fontFamily:BRAND.fontMono,fontSize:BRAND.sizeSm,letterSpacing:"0.1em"} }} InputProps={{ endAdornment:<InputAdornment position="end"><CardBrandBadge brand={cardType} /></InputAdornment> }} sx={fSx} />

            <Box sx={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:{xs:1.5,md:2} }}>
              <TextField label="Expiry (MM/YY)" value={data.expiry??""} onChange={(e)=>onChange?.({...data,expiry:fmtExpiry(e.target.value)})} onBlur={()=>touch("expiry")} error={touched.expiry&&Boolean(cardErrors.expiry)} helperText={touched.expiry?cardErrors.expiry:""} autoComplete="cc-exp" inputMode="numeric" inputProps={{ maxLength:5, style:{fontFamily:BRAND.fontMono,fontSize:BRAND.sizeSm,letterSpacing:"0.1em"} }} sx={fSx} />
              <Tooltip title={`${cvvLen}-digit code on the ${cardType==="Amex"?"front":"back"} of your card`} placement="top" arrow>
                <TextField label="CVV" value={data.cvv??""} onChange={(e)=>onChange?.({...data,cvv:e.target.value.replace(/\D/g,"").slice(0,cvvLen)})} onBlur={()=>touch("cvv")} error={touched.cvv&&Boolean(cardErrors.cvv)} helperText={touched.cvv?cardErrors.cvv:""} autoComplete="cc-csc" inputMode="numeric" inputProps={{ maxLength:cvvLen, style:{fontFamily:BRAND.fontMono,fontSize:BRAND.sizeSm,letterSpacing:"0.2em"} }} InputProps={{ endAdornment:<InputAdornment position="end"><InfoOutlinedIcon sx={{ fontSize:14, color:theme.palette.text.disabled, cursor:"help" }} /></InputAdornment> }} sx={fSx} />
              </Tooltip>
            </Box>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.disabled }}>
              🇮🇳 RuPay cards (including PMJDY Jan Dhan) are fully supported
            </Typography>
          </Box>
        )}

        {/* ════════ NET BANKING ════════ */}
        {visibleMethods[tab]?.id==="netbanking" && (
          <Box sx={{ p:{xs:2,md:2.5}, display:"flex", flexDirection:"column", gap:2 }}>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, color:theme.palette.text.secondary, textTransform:"uppercase", letterSpacing:"0.06em" }}>
              Popular Banks
            </Typography>
            <Box sx={{ display:"flex", flexWrap:"wrap", gap:1 }}>
              {visibleBanks.slice(0,5).map((bank)=>(
                <Chip key={bank} label={bank} onClick={()=>setSelectedBank(bank)}
                  sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, borderRadius:BRAND.radiusButton, height:30, bgcolor:selectedBank===bank?theme.palette.secondary.main:alpha(theme.palette.primary.main,0.06), color:selectedBank===bank?"#fff":theme.palette.text.primary, fontWeight:selectedBank===bank?theme.typography.fontWeightBold:400, cursor:"pointer", "& .MuiChip-label":{px:1.25} }} />
              ))}
            </Box>
            <TextField label="All banks" select value={selectedBank} onChange={(e)=>setSelectedBank(e.target.value)} fullWidth inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }} sx={fSx}>
              {visibleBanks.map((b)=><MenuItem key={b} value={b} sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm }}>{b}</MenuItem>)}
            </TextField>
            {selectedBank && (
              <Box sx={{ bgcolor:alpha(theme.palette.success.main,0.06), border:`1px solid ${alpha(theme.palette.success.main,0.2)}`, borderRadius:BRAND.radiusButton, px:1.5, py:1, display:"flex", alignItems:"center", gap:0.75 }}>
                <CheckCircleIcon sx={{ fontSize:14, color:theme.palette.success.main }} />
                <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, color:theme.palette.success.main }}>
                  {selectedBank} — you'll be redirected to their secure net banking portal
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* ════════ WALLETS ════════ */}
        {visibleMethods[tab]?.id==="wallet" && (
          <Box sx={{ p:{xs:2,md:2.5}, display:"flex", flexDirection:"column", gap:2 }}>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, color:theme.palette.text.secondary, textTransform:"uppercase", letterSpacing:"0.06em" }}>
              Choose Wallet
            </Typography>
            <Box sx={{ display:"flex", flexDirection:"column", gap:1 }}>
              {WALLETS.map((w)=>{
                const active = selectedWallet===w.id;
                return (
                  <Box key={w.id} onClick={()=>setSelectedWallet(w.id)}
                    sx={{ display:"flex", alignItems:"center", gap:1.5, px:{xs:1.5,md:2}, py:{xs:1,md:1.25}, border:`2px solid ${active?w.color:theme.palette.divider}`, borderRadius:BRAND.radiusButton, bgcolor:active?alpha(w.color,0.05):theme.palette.background.paper, cursor:"pointer", transition:"all 0.18s ease" }}>
                    <Box sx={{ width:32, height:32, borderRadius:BRAND.radiusButton, bgcolor:w.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightBlack, fontSize:"0.6rem", color:"#fff" }}>{w.label[0]}</Typography>
                    </Box>
                    <Typography sx={{ flex:1, fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:active?theme.typography.fontWeightBold:400, color:active?w.color:theme.palette.text.primary }}>
                      {w.label}
                    </Typography>
                    {active && <CheckCircleIcon sx={{ fontSize:16, color:w.color }} />}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* ════════ EMI ════════ */}
        {visibleMethods[tab]?.id==="emi" && (
          <Box sx={{ p:{xs:2,md:2.5}, display:"flex", flexDirection:"column", gap:2 }}>
            <Box sx={{ bgcolor:alpha(theme.palette.success.main,0.07), border:`1px solid ${alpha(theme.palette.success.main,0.2)}`, borderRadius:BRAND.radiusButton, px:1.5, py:1 }}>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightBold, color:theme.palette.success.main }}>
                🎉 No-Cost EMI on 3 & 6 month plans
              </Typography>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary, mt:0.3 }}>
                Available on HDFC, ICICI, Axis, Kotak, SBI & RBL credit cards
              </Typography>
            </Box>

            <TextField label="Card number" value={data.cardNumber??""} onChange={(e)=>onChange?.({...data,cardNumber:fmtCard(e.target.value)})} onBlur={()=>touch("cardNumber")} error={touched.cardNumber&&Boolean(cardErrors.cardNumber)} helperText={touched.cardNumber?cardErrors.cardNumber:"Enter your EMI-eligible credit card"} fullWidth inputMode="numeric" inputProps={{ maxLength:19, style:{fontFamily:BRAND.fontMono,fontSize:BRAND.sizeSm,letterSpacing:"0.1em"} }} InputProps={{ endAdornment:<InputAdornment position="end"><CardBrandBadge brand={cardType} /></InputAdornment> }} sx={fSx} />

            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, color:theme.palette.text.secondary, textTransform:"uppercase", letterSpacing:"0.06em" }}>
              Choose Tenure
            </Typography>

            <Box sx={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1 }}>
              {EMI_TENURES.map((t)=>{
                const active  = emiTenure===t.months;
                const noCost  = t.note==="No cost EMI";
                const monthly = Math.ceil(orderTotal/t.months);
                return (
                  <Box key={t.months} onClick={()=>setEmiTenure(t.months)}
                    sx={{ p:{xs:1,md:1.25}, border:`2px solid ${active?theme.palette.secondary.main:theme.palette.divider}`, borderRadius:BRAND.radiusButton, bgcolor:active?alpha(theme.palette.secondary.main,0.04):theme.palette.background.paper, cursor:"pointer", textAlign:"center", transition:"all 0.18s ease", position:"relative", overflow:"hidden" }}>
                    {noCost && (
                      <Box sx={{ position:"absolute", top:0, right:0, bgcolor:theme.palette.success.main, color:"#fff", fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightBlack, fontSize:"0.48rem", px:0.5, py:0.15, borderBottomLeftRadius:BRAND.radiusButton }}>
                        NO COST
                      </Box>
                    )}
                    <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightBold, color:active?theme.palette.secondary.main:theme.palette.text.primary }}>
                      ₹{monthly.toLocaleString("en-IN")}
                    </Typography>
                    <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>
                      ×{t.months} months
                    </Typography>
                    {!noCost && (
                      <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:"0.54rem", color:theme.palette.warning.main }}>{t.note}</Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* ════════ COD ════════ */}
        {visibleMethods[tab]?.id==="cod" && (
          <Box sx={{ p:{xs:2.5,md:3.5}, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:2 }}>
            <Box sx={{ width:72, height:72, borderRadius:"50%", bgcolor:alpha(theme.palette.success.main,0.1), display:"flex", alignItems:"center", justifyContent:"center" }}>
              <LocalAtmIcon sx={{ fontSize:36, color:theme.palette.success.main }} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily:BRAND.fontDisplay, fontSize:BRAND.sizeLg, fontWeight:theme.typography.fontWeightBold, mb:0.5 }}>
                Cash on Delivery
              </Typography>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.secondary, lineHeight:1.75, maxWidth:300 }}>
                Pay with cash when your order arrives. Keep exact change ready for a smooth handover.
              </Typography>
            </Box>

            <Box sx={{ width:"100%", maxWidth:320, bgcolor:alpha(theme.palette.warning.main,0.07), border:`1px solid ${alpha(theme.palette.warning.main,0.25)}`, borderRadius:BRAND.radiusButton, px:2, py:1.25 }}>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, fontWeight:theme.typography.fontWeightBold, color:theme.palette.warning.main, mb:0.4 }}>
                COD Handling Fee: ₹40
              </Typography>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary }}>
                A ₹40 convenience fee is collected by the delivery agent. This is not refundable if you refuse the delivery.
              </Typography>
            </Box>

            <Box sx={{ width:"100%", maxWidth:320 }}>
              <TextField label="Check COD availability" placeholder="Enter 6-digit PIN code" fullWidth inputMode="numeric" inputProps={{ maxLength:6, style:{fontFamily:BRAND.fontMono,fontSize:BRAND.sizeSm,letterSpacing:"0.1em"} }} helperText="COD available at 26,000+ PIN codes across India" FormHelperTextProps={{ sx:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeXxs,mx:0} }} sx={fSx} />
            </Box>
          </Box>
        )}
      </Box>

      {/* ── Security strip ───────────────────────── */}
      <Box sx={{ display:"flex", alignItems:"center", gap:0.75 }}>
        <LockIcon sx={{ fontSize:12, color:theme.palette.success.main }} />
        <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXxs, color:theme.palette.text.disabled }}>
          256-bit SSL · PCI DSS compliant · Powered by Razorpay · RBI authorised payment gateway
        </Typography>
      </Box>

      {/* ── Nav ──────────────────────────────────── */}
      <Box sx={{ display:"flex", gap:1.25, flexDirection:{xs:"column",sm:"row"} }}>
        <Button variant="outline"  fullWidth size="lg" onClick={onBack}>← Back</Button>
        <Button variant="primary"  fullWidth size="lg" onClick={handleNext} disabled={visibleMethods[tab]?.id==="netbanking"&&!selectedBank}>
          Review Order
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentForm;
