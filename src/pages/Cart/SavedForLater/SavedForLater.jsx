// ─────────────────────────────────────────────────────────────
//  SavedForLater — wishlist-style saved items section
//
//  ✅ All colours  → theme.palette.*
//  ✅ All fonts    → BRAND.font*
//  ✅ All sizes    → BRAND.size*
//  ✅ All radii    → BRAND.radius*
//
//  Responsive:
//    xs  — horizontal scroll row (160px cards, no wrap)
//    sm  — 2-column grid
//    md  — 3-column grid
//    lg  — 4-column grid
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlineIcon   from "@mui/icons-material/DeleteOutline";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";
import PriceTag            from "../../../components/common/PriceTag/PriceTag";

const FALLBACK = "https://picsum.photos/seed/saved/300/340";

const SavedCard = ({ item, onMoveToCart, onRemove, currency }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      height:      BRAND.savedCardHeight, // Fixed height for consistent card layout
      border:       `1px solid ${theme.palette.divider}`,
      borderRadius: BRAND.radiusCard,
      bgcolor:      theme.palette.background.paper,
      overflow:     "hidden",
      display:      "flex",
      flexDirection: "column",
      transition:   "box-shadow 0.25s ease, transform 0.25s ease",
      "&:hover": {
        boxShadow: theme.shadows[3],
        transform: "translateY(-2px)",
      },
    }}>
      {/* Image */}
      <Box sx={{
        width:       "100%",
        height:      BRAND.savedCardImageHeight, // Fixed height for consistent image size
        overflow:    "hidden",
        bgcolor:     theme.palette.background.default,
      }}>
        <Box
          component="img"
          src={item?.image || FALLBACK}
          alt={item?.name}
          onError={e => { e.target.src = FALLBACK; }}
          sx={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transition: "transform 0.35s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
      </Box>

      {/* Info */}
      <Box sx={{ 
        flex: 1, // Take remaining space
        px: { xs: 1.25, md: 1.5 }, 
        pt: 1.25, 
        pb: 1.5, 
        display: "flex", 
        flexDirection: "column", 
        gap: 0.75 
      }}>
        {item?.brand && (
          <Typography sx={{
            fontFamily:    BRAND.fontBody,
            fontSize:      BRAND.sizeXxs,
            fontWeight:    theme.typography.fontWeightBold,
            color:         theme.palette.secondary.main,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight:    1,
          }}>
            {item.brand}
          </Typography>
        )}

        <Typography sx={{
          fontFamily:       BRAND.fontBody,
          fontWeight:       theme.typography.fontWeightSemibold,
          fontSize:         BRAND.sizeXs,
          color:            theme.palette.text.primary,
          lineHeight:       1.35,
          display:          "-webkit-box",
          WebkitLineClamp:  2,
          WebkitBoxOrient:  "vertical",
          overflow:         "hidden",
        }}>
          {item?.name ?? "—"}
        </Typography>

        <PriceTag
          price={item?.price ?? 0}
          originalPrice={item?.originalPrice}
          currency={currency}
          size="small"
        />

        {/* Action buttons */}
        <Box sx={{ display: "flex", gap: 0.75, mt: "auto" }}>
          <Tooltip title="Move to cart">
            <IconButton
              size="small"
              onClick={() => onMoveToCart?.(item)}
              aria-label="Move to cart"
              sx={{
                flex:         1,
                borderRadius: BRAND.radiusButton,
                border:       `1.5px solid ${theme.palette.secondary.main}`,
                color:        theme.palette.secondary.main,
                gap:          0.5,
                "&:hover": { bgcolor: alpha(theme.palette.secondary.main, 0.08) },
              }}
            >
              <AddShoppingCartIcon sx={{ fontSize: 13 }} />
              <Typography sx={{
                fontFamily: BRAND.fontBody,
                fontSize:   "0.62rem",
                fontWeight: theme.typography.fontWeightBold,
              }}>
                Add
              </Typography>
            </IconButton>
          </Tooltip>

          <Tooltip title="Remove">
            <IconButton
              size="small"
              onClick={() => onRemove?.(item?.id)}
              aria-label="Remove saved item"
              sx={{
                border: `1.5px solid ${theme.palette.divider}`,
                color:  theme.palette.text.disabled,
                "&:hover": {
                  borderColor: theme.palette.error.main,
                  color:       theme.palette.error.main,
                },
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 13 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

const SavedForLater = ({
  items = [],
  onMoveToCart,
  onRemove,
  currency = "$",
}) => {
  const theme = useTheme();
  if (!items?.length) return null;

  return (
    <Box>
      {/* Section heading */}
      <Typography sx={{
        fontFamily: BRAND.fontDisplay,
        fontWeight: theme.typography.fontWeightBold,
        fontSize:   { xs: "1.1rem", md: "1.3rem" },
        color:      theme.palette.text.primary,
        mb:         { xs: 1.5, md: 2 },
      }}>
        Saved for Later ({items.length})
      </Typography>

      {/* Grid: horizontal scroll xs → CSS grid sm+ */}
      <Box sx={{
        // xs: flex row, horizontal scroll
        display:    { xs: "flex",   sm: "grid" },
        // sm+: 2→3→4 col grid
        gridTemplateColumns: {
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap:        { xs: 1.5, sm: 2, md: 2 },
        // xs: horizontal scroll
        overflowX:  { xs: "auto",   sm: "visible" },
        pb:         { xs: 1,        sm: 0 },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}>
        {items.map((item, i) => (
          <Box
            key={item?.id ?? i}
            sx={{
              // xs: fixed card width for scroll
              flexShrink: 0,
              width:      { xs: 155, sm: "auto" },
            }}
          >
            <SavedCard
              item={item}
              onMoveToCart={onMoveToCart}
              onRemove={onRemove}
              currency={currency}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default SavedForLater;
