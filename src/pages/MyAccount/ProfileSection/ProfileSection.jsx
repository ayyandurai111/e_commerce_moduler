// ─────────────────────────────────────────────────────────────
//  ProfileSection — edit name, mobile, avatar, password
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Box, Typography, TextField, Avatar, IconButton, Divider, Snackbar, Alert, InputAdornment } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import VisibilityOutlinedIcon  from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useTheme, alpha }     from "@mui/material/styles";
import { BRAND }               from "../../../theme/theme";
import Button                  from "../../../components/common/Button/Button";
import { fieldSx }             from "../../Checkout/ContactForm/ContactForm";

const ProfileSection = ({ user = {}, onSave, sx = {} }) => {
  const theme = useTheme();
  const fSx   = fieldSx(theme);

  const [form, setForm]       = useState({
    firstName: user.firstName ?? "",
    lastName:  user.lastName  ?? "",
    mobile:    user.mobile    ?? "",
    dob:       user.dob       ?? "",
  });
  const [pwd, setPwd]         = useState({ current:"", newPwd:"", confirm:"" });
  const [showPwd, setShowPwd] = useState({ current:false, newPwd:false, confirm:false });
  const [saving, setSaving]   = useState(false);
  const [snack,  setSnack]    = useState({ open:false, msg:"", severity:"success" });

  const initials = ((form.firstName?.[0]??"")+(form.lastName?.[0]??"")).toUpperCase()||"U";

  const handleSave = async () => {
    setSaving(true);
    await onSave?.({ ...form });
    await new Promise(r=>setTimeout(r,700));
    setSaving(false);
    setSnack({ open:true, msg:"Profile updated successfully!", severity:"success" });
  };

  const pwdToggle = (f) => () => setShowPwd(s=>({...s,[f]:!s[f]}));

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:{ xs:3, md:4 }, ...sx }}>

      {/* Avatar */}
      <Box sx={{ display:"flex", alignItems:"center", gap:2.5 }}>
        <Box sx={{ position:"relative", flexShrink:0 }}>
          <Avatar src={user.avatar} sx={{
            width:80, height:80,
            bgcolor: theme.palette.secondary.main,
            fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:"1.75rem",
          }}>
            {!user.avatar && initials}
          </Avatar>
          <IconButton size="small" sx={{
            position:"absolute", bottom:-4, right:-4,
            width:28, height:28,
            bgcolor:theme.palette.primary.main,
            border:`2px solid ${theme.palette.background.paper}`,
            "&:hover":{ bgcolor:theme.palette.secondary.main },
          }}>
            <PhotoCameraOutlinedIcon sx={{ fontSize:14, color:"#fff" }} />
          </IconButton>
        </Box>
        <Box>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm }}>
            {form.firstName} {form.lastName}
          </Typography>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, mt:0.25 }}>
            Tap the camera to update your photo
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Personal info */}
      <Box>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm, mb:2, color:theme.palette.text.primary, letterSpacing:"0.01em" }}>
          Personal Information
        </Typography>
        <Box sx={{ display:"grid", gridTemplateColumns:{ xs:"1fr", sm:"1fr 1fr" }, gap:{ xs:2, md:2.5 } }}>
          <TextField
            label="First Name"
            value={form.firstName}
            onChange={e=>setForm(f=>({...f,firstName:e.target.value}))}
            fullWidth sx={fSx}
            inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }}
          />
          <TextField
            label="Last Name"
            value={form.lastName}
            onChange={e=>setForm(f=>({...f,lastName:e.target.value}))}
            fullWidth sx={fSx}
            inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }}
          />
          <TextField
            label="Mobile Number"
            value={form.mobile}
            onChange={e=>setForm(f=>({...f,mobile:e.target.value.replace(/\D/g,"").slice(0,10)}))}
            fullWidth inputMode="tel"
            helperText="Used for OTP and delivery updates"
            FormHelperTextProps={{ sx:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeXxs,mx:0} }}
            inputProps={{ maxLength:10, style:{fontFamily:BRAND.fontMono,fontSize:BRAND.sizeSm,letterSpacing:"0.06em"} }}
            InputProps={{ startAdornment:(
              <InputAdornment position="start">
                <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeSm, fontWeight:700, color:theme.palette.text.secondary, borderRight:`1px solid ${theme.palette.divider}`, pr:1, mr:0.5 }}>+91</Typography>
              </InputAdornment>
            )}}
            sx={fSx}
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={form.dob}
            onChange={e=>setForm(f=>({...f,dob:e.target.value}))}
            fullWidth
            InputLabelProps={{ shrink:true }}
            helperText="Get a birthday surprise from us 🎂"
            FormHelperTextProps={{ sx:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeXxs,mx:0} }}
            inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }}
            sx={fSx}
          />
        </Box>
      </Box>

      <Box sx={{ display:"flex", justifyContent:"flex-end" }}>
        <Button variant="primary" loading={saving} onClick={handleSave} size="md">
          Save Changes
        </Button>
      </Box>

      <Divider />

      {/* Change password */}
      <Box>
        <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm, mb:2, color:theme.palette.text.primary }}>
          Change Password
        </Typography>
        <Box sx={{ display:"flex", flexDirection:"column", gap:2, maxWidth:480 }}>
          {[
            { key:"current", label:"Current Password"  },
            { key:"newPwd",  label:"New Password"      },
            { key:"confirm", label:"Confirm Password"  },
          ].map(({ key, label }) => (
            <TextField
              key={key}
              label={label}
              type={showPwd[key] ? "text" : "password"}
              value={pwd[key]}
              onChange={e=>setPwd(p=>({...p,[key]:e.target.value}))}
              fullWidth
              inputProps={{ style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm} }}
              InputProps={{ endAdornment:(
                <InputAdornment position="end">
                  <IconButton size="small" onClick={pwdToggle(key)} edge="end">
                    {showPwd[key]
                      ? <VisibilityOffOutlinedIcon sx={{ fontSize:18, color:theme.palette.text.disabled }} />
                      : <VisibilityOutlinedIcon   sx={{ fontSize:18, color:theme.palette.text.disabled }} />
                    }
                  </IconButton>
                </InputAdornment>
              )}}
              sx={fSx}
            />
          ))}
          <Box sx={{ display:"flex", justifyContent:"flex-end" }}>
            <Button variant="secondary" size="md" onClick={()=>setSnack({ open:true, msg:"Password updated!", severity:"success" })}>
              Update Password
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={()=>setSnack(s=>({...s,open:false}))} anchorOrigin={{ vertical:"bottom", horizontal:"center" }}>
        <Alert severity={snack.severity} variant="filled" onClose={()=>setSnack(s=>({...s,open:false}))} sx={{ width:"100%", fontFamily:BRAND.fontBody }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileSection;
