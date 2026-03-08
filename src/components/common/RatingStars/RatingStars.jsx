import React from "react";
import { Box, Typography } from "@mui/material";
import StarIcon        from "@mui/icons-material/Star";
import StarHalfIcon    from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarBorder";
import { useTheme }    from "@mui/material/styles";

const RatingStars = ({ rating = 0, count = null, size = "small" }) => {
  const theme = useTheme();

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1)   return "full";
    if (rating >= i + 0.5) return "half";
    return "empty";
  });

  const iconSize = size === "small" ? "14px" : size === "medium" ? "18px" : "22px";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
      {stars.map((type, i) => (
        <Box key={i} component="span" sx={{ display: "flex", fontSize: iconSize }}>
          {type === "full"  && <StarIcon        sx={{ fontSize: iconSize, color: theme.palette.warning.main }} />}
          {type === "half"  && <StarHalfIcon    sx={{ fontSize: iconSize, color: theme.palette.warning.main }} />}
          {type === "empty" && <StarOutlineIcon sx={{ fontSize: iconSize, color: theme.palette.divider      }} />}
        </Box>
      ))}
      {count !== null && (
        <Typography variant="caption" sx={{ ml: 0.5, color: theme.palette.text.secondary, fontWeight: 500 }}>
          ({count})
        </Typography>
      )}
    </Box>
  );
};

export default RatingStars;
