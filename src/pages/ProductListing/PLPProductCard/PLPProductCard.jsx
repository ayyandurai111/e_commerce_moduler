// Thin wrapper — delegates to the shared ProductCard component.
// Both the default export and ProductCardGrid are re-exported
// so ProductListingPage doesn't need to change its import path.
import ProductCard, { ProductCardGrid } from "../../../components/common/ProductCard/ProductCard";
export { ProductCardGrid };
export default ProductCard;
