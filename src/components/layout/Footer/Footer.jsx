import React from "react";
import { Box, Container, Typography, Divider, IconButton, Link, Chip } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { BRAND } from "../../../theme/theme";

const SOCIAL_MAP = { facebook:<FacebookIcon/>, instagram:<InstagramIcon/>, twitter:<TwitterIcon/>, pinterest:<PinterestIcon/> };

const Footer = ({ enabled=true, storeName="LUXE STORE", tagline="Refined Living, Delivered.", description="Curating premium products from around the world.", social={}, shopLinks=[], helpLinks=[], contact={}, paymentMethods=[], hours="" }) => {
  const theme = useTheme();
  if (!enabled) return null;
  const year = new Date().getFullYear();
  return (
    <Box component="footer" sx={{ backgroundColor:theme.palette.primary.main, pt:{ xs:6, md:10 }, pb:0 }}>
      <Container maxWidth="xl">
        <Box sx={{ display:"grid", gridTemplateColumns:{ xs:"repeat(2,1fr)", md:"2fr 1fr 1fr 2fr" }, gap:{ xs:4, md:6 } }}>
          <Box sx={{ gridColumn:{ xs:"1/-1", md:"auto" } }}>
            <Typography sx={{ fontFamily:BRAND.fontDisplay, fontWeight:900, fontSize:"1.5rem", color:theme.palette.primary.contrastText, letterSpacing:"0.04em", mb:1 }}>{storeName}</Typography>
            {tagline && <Typography sx={{ fontSize:"0.8rem", color:theme.palette.warning.main, letterSpacing:"0.08em", mb:2, fontFamily:BRAND.fontBody }}>{tagline}</Typography>}
            {description && <Typography sx={{ fontSize:"0.86rem", color:alpha(theme.palette.primary.contrastText,0.55), lineHeight:1.7, mb:3, maxWidth:260, fontFamily:BRAND.fontBody }}>{description}</Typography>}
            <Box sx={{ display:"flex", gap:1 }}>
              {Object.entries(social).filter(([k])=>SOCIAL_MAP[k]).map(([p,url])=>(
                <IconButton key={p} component="a" href={url} target="_blank" size="small" sx={{ width:36, height:36, backgroundColor:alpha(theme.palette.primary.contrastText,0.07), color:alpha(theme.palette.primary.contrastText,0.5), border:`1px solid ${alpha(theme.palette.primary.contrastText,0.1)}`, transition:"all 0.22s ease", "&:hover":{ backgroundColor:theme.palette.secondary.main, color:"#fff", transform:"translateY(-2px)" } }}>
                  {React.cloneElement(SOCIAL_MAP[p],{ sx:{ fontSize:17 } })}
                </IconButton>
              ))}
            </Box>
          </Box>
          {[{ heading:"Shop", links:shopLinks }, { heading:"Help", links:helpLinks }].map(col=>(
            <Box key={col.heading}>
              <Typography sx={{ color:theme.palette.primary.contrastText, fontWeight:700, fontSize:"0.88rem", letterSpacing:"0.08em", textTransform:"uppercase", mb:2.5, fontFamily:BRAND.fontBody }}>{col.heading}</Typography>
              <Box sx={{ display:"flex", flexDirection:"column", gap:1.25 }}>
                {col.links.map(link=>(
                  <Link key={link.label} href={link.url||"#"} underline="none" sx={{ color:alpha(theme.palette.primary.contrastText,0.5), fontSize:"0.86rem", fontFamily:BRAND.fontBody, display:"flex", alignItems:"center", gap:0.75, transition:"all 0.2s ease", "&:hover":{ color:theme.palette.secondary.main, paddingLeft:"4px" } }}>
                    {link.badge && <Chip label={link.badge} size="small" sx={{ backgroundColor:theme.palette.secondary.main, color:"#fff", fontSize:"0.58rem", fontWeight:700, height:16, "& .MuiChip-label":{ px:0.75 } }} />}
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Box>
          ))}
          <Box sx={{ gridColumn:{ xs:"1/-1", md:"auto" } }}>
            <Typography sx={{ color:theme.palette.primary.contrastText, fontWeight:700, fontSize:"0.88rem", letterSpacing:"0.08em", textTransform:"uppercase", mb:2.5, fontFamily:BRAND.fontBody }}>Contact Us</Typography>
            <Box sx={{ display:"flex", flexDirection:"column", gap:1.75 }}>
              {contact.phone   && <Box sx={{ display:"flex", alignItems:"flex-start", gap:1.25 }}><PhoneIcon       sx={{ fontSize:15, color:theme.palette.secondary.main, mt:0.15, flexShrink:0 }} /><Typography sx={{ color:alpha(theme.palette.primary.contrastText,0.5), fontSize:"0.86rem", fontFamily:BRAND.fontBody }}>{contact.phone}</Typography></Box>}
              {contact.email   && <Box sx={{ display:"flex", alignItems:"flex-start", gap:1.25 }}><EmailIcon       sx={{ fontSize:15, color:theme.palette.secondary.main, mt:0.15, flexShrink:0 }} /><Typography sx={{ color:alpha(theme.palette.primary.contrastText,0.5), fontSize:"0.86rem", fontFamily:BRAND.fontBody }}>{contact.email}</Typography></Box>}
              {contact.address && <Box sx={{ display:"flex", alignItems:"flex-start", gap:1.25 }}><LocationOnIcon sx={{ fontSize:15, color:theme.palette.secondary.main, mt:0.15, flexShrink:0 }} /><Typography sx={{ color:alpha(theme.palette.primary.contrastText,0.5), fontSize:"0.86rem", fontFamily:BRAND.fontBody }}>{contact.address}</Typography></Box>}
            </Box>
          </Box>
        </Box>
        <Divider sx={{ borderColor:alpha(theme.palette.primary.contrastText,0.08), mt:{ xs:5, md:8 } }} />
        <Box sx={{ py:3, display:"flex", alignItems:"center", justifyContent:"space-between", flexDirection:{ xs:"column", sm:"row" }, gap:2 }}>
          <Typography sx={{ fontSize:"0.8rem", color:alpha(theme.palette.primary.contrastText,0.3), fontFamily:BRAND.fontBody }}>© {year} {storeName}. All rights reserved.</Typography>
          <Box sx={{ display:"flex", gap:3 }}>
            {["Privacy Policy","Terms of Service","Cookie Policy"].map(item=>(
              <Link key={item} href="#" underline="none" sx={{ fontSize:"0.78rem", color:alpha(theme.palette.primary.contrastText,0.3), fontFamily:BRAND.fontBody, transition:"color 0.2s ease", "&:hover":{ color:theme.palette.secondary.main } }}>{item}</Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
