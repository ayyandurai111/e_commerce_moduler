import React from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BRAND } from "../../theme/theme";

const HomePage = ({ navbar={}, footer={} }) => {
  const theme = useTheme();
  return (
    <>
      <Navbar {...navbar} />
      <Box sx={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", background:`linear-gradient(135deg,${theme.palette.primary.main} 0%,${theme.palette.primary.dark} 100%)` }}>
        <Container maxWidth="md" sx={{ textAlign:"center", py:10 }}>
          <Typography variant="h1" sx={{ color:"#fff", mb:3, fontFamily:BRAND.fontDisplay }}>Luxury Redefined</Typography>
          <Typography sx={{ color:"rgba(255,255,255,0.7)", fontSize:"1.1rem", fontFamily:BRAND.fontBody }}>Use the page switcher below to navigate to Product Listing or Product Detail.</Typography>
        </Container>
      </Box>
      <Footer {...footer} />
    </>
  );
};
export default HomePage;
