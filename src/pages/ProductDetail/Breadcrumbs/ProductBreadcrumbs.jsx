// ─────────────────────────────────────────────────────────────
//  ProductBreadcrumbs — responsive breadcrumb trail
//
//  Responsive behaviour:
//    xs  — hidden on very small screens (saves space)
//    sm+ — visible, wraps gracefully, truncates long names
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@mui/material/styles";
import { BRAND } from "../../../theme/theme";

const ProductBreadcrumbs = ({ crumbs = [], sx = {} }) => {
  const theme = useTheme();
  if (!crumbs?.length) return null;

  return (
    <Box sx={{ display: { xs: "none", sm: "block" }, py: 1.5, ...sx }}>
      <Breadcrumbs
        separator={<NavigateNextIcon sx={{ fontSize: 13, color: theme.palette.text.disabled }} />}
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-ol":        { flexWrap: "nowrap", overflowX: "auto" },
          "& .MuiBreadcrumbs-li":        { whiteSpace: "nowrap" },
          "& .MuiBreadcrumbs-separator": { mx: 0.5 },
        }}
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return isLast ? (
            <Typography key={i} sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, fontWeight: theme.typography.fontWeightSemibold, color: theme.palette.text.primary, maxWidth: { sm: 180, md: 320 }, overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
              {crumb.label}
            </Typography>
          ) : (
            <Link key={i} href={crumb.href ?? "#"} underline="hover" sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXs, color: theme.palette.text.secondary, transition: "color 0.2s ease", "&:hover": { color: theme.palette.secondary.main } }}>
              {crumb.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};
export default ProductBreadcrumbs;
