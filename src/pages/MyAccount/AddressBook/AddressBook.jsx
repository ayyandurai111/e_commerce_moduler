// ─────────────────────────────────────────────────────────────
//  AddressBook — list, add and remove saved addresses
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Divider, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddIcon               from "@mui/icons-material/Add";
import EditOutlinedIcon      from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon     from "@mui/icons-material/DeleteOutline";
import HomeOutlinedIcon      from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon  from "@mui/icons-material/BusinessOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useTheme, alpha }   from "@mui/material/styles";
import { BRAND }             from "../../../theme/theme";
import Button                from "../../../components/common/Button/Button";
import { fieldSx }           from "../../Checkout/ContactForm/ContactForm";

const BLANK = { label:"Home", name:"", mobile:"", line1:"", line2:"", city:"", state:"", pincode:"" };

const INDIAN_STATES = [
  "Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim",
  "Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
];

const AddressCard = ({ address, onEdit, onDelete, onSetDefault, isDefault }) => {
  const theme = useTheme();
  const TypeIcon = address.label === "Work" ? BusinessOutlinedIcon : HomeOutlinedIcon;

  return (
    <Box sx={{
      p:            { xs:2, md:2.5 },
      border:       `2px solid ${isDefault ? theme.palette.secondary.main : theme.palette.divider}`,
      borderRadius: BRAND.radiusCard,
      bgcolor:      theme.palette.background.paper,
      position:     "relative",
      transition:   "border-color 0.2s ease",
      "&:hover":    { borderColor: alpha(theme.palette.secondary.main, 0.5) },
    }}>
      {isDefault && (
        <Chip label="Default" size="small" color="secondary" sx={{
          position:"absolute", top:12, right:12,
          height:20, fontFamily:BRAND.fontBody, fontWeight:700, fontSize:"0.6rem",
          "& .MuiChip-label":{ px:1 },
        }} />
      )}

      <Box sx={{ display:"flex", alignItems:"center", gap:1, mb:1.25 }}>
        <TypeIcon sx={{ fontSize:16, color:theme.palette.secondary.main }} />
        <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeXs, color:theme.palette.text.primary, textTransform:"uppercase", letterSpacing:"0.06em" }}>
          {address.label}
        </Typography>
      </Box>

      <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:600, fontSize:BRAND.sizeSm, color:theme.palette.text.primary }}>
        {address.name}
      </Typography>
      <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, mt:0.25, lineHeight:1.7 }}>
        {address.line1}{address.line2 ? `, ${address.line2}` : ""}<br />
        {address.city}, {address.state} — {address.pincode}<br />
        +91 {address.mobile}
      </Typography>

      <Divider sx={{ my:1.5 }} />

      <Box sx={{ display:"flex", gap:1, flexWrap:"wrap" }}>
        <Button variant="ghost" size="sm" startIcon={<EditOutlinedIcon />} onClick={()=>onEdit?.(address)}>
          Edit
        </Button>
        {!isDefault && (
          <Button variant="ghost" size="sm" onClick={()=>onSetDefault?.(address.id)}
            sx={{ color:theme.palette.info.main }}>
            Set as Default
          </Button>
        )}
        <Box sx={{ flex:1 }} />
        <IconButton size="small" onClick={()=>onDelete?.(address.id)}
          sx={{ color:theme.palette.error.main, "&:hover":{ bgcolor:alpha(theme.palette.error.main,0.08) } }}>
          <DeleteOutlineIcon sx={{ fontSize:18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

const AddressForm = ({ initial = BLANK, onSave, onCancel }) => {
  const theme  = useTheme();
  const fSx    = fieldSx(theme);
  const [form, setForm] = useState(initial);
  const up = (k) => (e) => setForm(f=>({...f,[k]:e.target.value}));

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:2 }}>
      <Box sx={{ display:"flex", gap:1 }}>
        {["Home","Work","Other"].map(l=>(
          <Box key={l} onClick={()=>setForm(f=>({...f,label:l}))}
            sx={{ px:1.5, py:0.75, borderRadius:BRAND.radiusButton, border:`2px solid ${form.label===l?theme.palette.secondary.main:theme.palette.divider}`, bgcolor:form.label===l?alpha(theme.palette.secondary.main,0.06):"transparent", cursor:"pointer", transition:"all 0.15s" }}>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:form.label===l?700:400, fontSize:BRAND.sizeXs, color:form.label===l?theme.palette.secondary.main:theme.palette.text.secondary }}>{l}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
        <TextField label="Full Name"    value={form.name}   onChange={up("name")}   fullWidth inputProps={{style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm}}} sx={fSx} />
        <TextField label="Mobile"       value={form.mobile} onChange={up("mobile")} fullWidth inputMode="tel" inputProps={{maxLength:10,style:{fontFamily:BRAND.fontMono,fontSize:BRAND.sizeSm}}} sx={fSx} />
      </Box>
      <TextField label="Address Line 1" value={form.line1} onChange={up("line1")} fullWidth inputProps={{style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm}}} sx={fSx} />
      <TextField label="Address Line 2 (optional)" value={form.line2} onChange={up("line2")} fullWidth inputProps={{style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm}}} sx={fSx} />
      <Box sx={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:2 }}>
        <TextField label="City"    value={form.city}    onChange={up("city")}    fullWidth inputProps={{style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm}}} sx={fSx} />
        <TextField label="State"   value={form.state}   onChange={up("state")}   select fullWidth sx={fSx} inputProps={{style:{fontFamily:BRAND.fontBody,fontSize:BRAND.sizeSm}}}>
          {INDIAN_STATES.map(s=><option key={s} value={s}>{s}</option>)}
        </TextField>
        <TextField label="Pincode" value={form.pincode} onChange={up("pincode")} fullWidth inputMode="numeric" inputProps={{maxLength:6,style:{fontFamily:BRAND.fontMono,fontSize:BRAND.sizeSm}}} sx={fSx} />
      </Box>
      <Box sx={{ display:"flex", gap:1, justifyContent:"flex-end" }}>
        <Button variant="outline" size="md" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" size="md" onClick={()=>onSave?.(form)}>Save Address</Button>
      </Box>
    </Box>
  );
};

const AddressBook = ({ addresses = [], defaultAddressId, onAddAddress, onEditAddress, onDeleteAddress, onSetDefault, sx = {} }) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing]       = useState(null);

  const openAdd  = ()  => { setEditing(null); setDialogOpen(true); };
  const openEdit = (a) => { setEditing(a);    setDialogOpen(true); };

  const handleSave = (form) => {
    if (editing) onEditAddress?.({ ...editing, ...form });
    else         onAddAddress?.(form);
    setDialogOpen(false);
  };

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:3, ...sx }}>
      <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Box>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:700, fontSize:BRAND.sizeSm, color:theme.palette.text.primary }}>
            Saved Addresses
          </Typography>
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, mt:0.3 }}>
            Manage your delivery addresses
          </Typography>
        </Box>
        <Button variant="secondary" size="sm" startIcon={<AddIcon />} onClick={openAdd}>
          Add New
        </Button>
      </Box>

      {addresses.length === 0 ? (
        <Box sx={{ py:6, textAlign:"center" }}>
          <LocationOnOutlinedIcon sx={{ fontSize:48, color:theme.palette.text.disabled, mb:1.5 }} />
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.disabled }}>
            No saved addresses yet
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs:2, md:2.5 }}>
          {addresses.map(a=>(
            <Grid item xs={12} sm={6} key={a.id}>
              <AddressCard
                address={a}
                isDefault={a.id === defaultAddressId}
                onEdit={openEdit}
                onDelete={onDeleteAddress}
                onSetDefault={onSetDefault}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={dialogOpen} onClose={()=>setDialogOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx:{ borderRadius:BRAND.radiusCard, p:0.5 } }}>
        <DialogTitle sx={{ fontFamily:BRAND.fontDisplay, fontWeight:700, fontSize:"1.1rem" }}>
          {editing ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent>
          <AddressForm initial={editing ?? BLANK} onSave={handleSave} onCancel={()=>setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddressBook;
