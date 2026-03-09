import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import { useTheme } from "@mui/material/styles";
import { BRAND } from "../../theme/theme";
import ProductCard, { ProductCardGrid } from "../../components/common/ProductCard/ProductCard";

const ProductListingPage = ({ title="All Products", products=[], navbar={}, footer={}, onAddToCart, onQuickView, currency="$" }) => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor:theme.palette.background.default, minHeight:"100vh" }}>
      <Navbar {...navbar} />
      <Container maxWidth="xl" sx={{ pt:4, pb:8 }}>
        <Typography variant="h2" sx={{ mb:4, fontFamily:BRAND.fontDisplay }}>{title}</Typography>
        <ProductCardGrid>
          {products.map((p,i) => <ProductCard key={p.id||i} product={p} currency={currency} onAddToCart={onAddToCart} onQuickView={onQuickView} />)}
        </ProductCardGrid>
      </Container>
      <Footer {...footer} />
    </Box>
  );
};
export default ProductListingPage;
