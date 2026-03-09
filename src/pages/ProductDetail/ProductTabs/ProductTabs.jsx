// ─────────────────────────────────────────────────────────────
//  ProductTabs — Description / Specifications / Reviews
//
//  Responsive behaviour:
//    xs  — scrollable tab bar (variant="scrollable"), compact padding
//    sm+ — tabs fit in a row, wider padding
//    md+ — full padding, larger table cells
//  Reviews rating summary:
//    xs  — stacked (score on top, bars below)
//    sm+ — side-by-side layout
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Fade, Table, TableBody, TableRow, TableCell, Avatar, LinearProgress, Chip, Divider } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { BRAND }           from "../../../theme/theme";
import RatingStars         from "../../../components/common/RatingStars/RatingStars";

const TabPanel = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value!==index} id={`pdp-tabpanel-${index}`} aria-labelledby={`pdp-tab-${index}`}>
    {value===index && <Fade in timeout={280}><Box sx={{ pt:{ xs:2.5, md:3.5 } }}>{children}</Box></Fade>}
  </Box>
);

const RatingBar = ({ star, count, total }) => {
  const theme = useTheme();
  const pct = total>0 ? (count/total)*100 : 0;
  return (
    <Box sx={{ display:"flex", alignItems:"center", gap:{ xs:1, md:1.5 } }}>
      <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeXs, fontWeight:theme.typography.fontWeightBold, width:{ xs:24, md:28 }, textAlign:"right", flexShrink:0, color:theme.palette.text.secondary }}>{star}★</Typography>
      <LinearProgress variant="determinate" value={pct} sx={{ flex:1, height:{ xs:5, md:6 }, borderRadius:"4px", bgcolor:alpha(theme.palette.primary.main,0.08), "& .MuiLinearProgress-bar":{ bgcolor:theme.palette.warning.main, borderRadius:"4px" } }} />
      <Typography sx={{ fontFamily:BRAND.fontMono, fontSize:BRAND.sizeXxs, color:theme.palette.text.secondary, width:24, flexShrink:0 }}>{count}</Typography>
    </Box>
  );
};

const ReviewCard = ({ review }) => {
  const theme = useTheme();
  return (
    <Box sx={{ py:{ xs:2.5, md:3 }, borderBottom:`1px solid ${theme.palette.divider}`, "&:last-child":{ borderBottom:"none" } }}>
      <Box sx={{ display:"flex", alignItems:"flex-start", gap:{ xs:1.5, md:2 } }}>
        <Avatar src={review?.avatar} sx={{ width:{ xs:36, md:40 }, height:{ xs:36, md:40 }, bgcolor:theme.palette.primary.main, fontFamily:BRAND.fontDisplay, fontWeight:theme.typography.fontWeightBold, fontSize:BRAND.sizeSm, flexShrink:0 }}>
          {review?.author?.[0]?.toUpperCase()??"U"}
        </Avatar>
        <Box sx={{ flex:1, minWidth:0 }}>
          <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:1, mb:0.5 }}>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightBold, fontSize:BRAND.sizeSm, lineHeight:1 }}>{review?.author??"Anonymous"}</Typography>
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary }}>{review?.date??""}</Typography>
          </Box>
          <Box sx={{ display:"flex", alignItems:"center", gap:1, mb:1 }}>
            <RatingStars rating={review?.rating??0} size="small" />
            {review?.verified && <Chip label="Verified" size="small" sx={{ height:18, fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightBold, fontSize:"0.6rem", bgcolor:alpha(theme.palette.success.main,0.1), color:theme.palette.success.main, "& .MuiChip-label":{ px:1 } }} />}
          </Box>
          {review?.title && <Typography sx={{ fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightBold, fontSize:BRAND.sizeSm, mb:0.5 }}>{review.title}</Typography>}
          <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:{ xs:BRAND.sizeXs, md:BRAND.sizeSm }, color:theme.palette.text.secondary, lineHeight:1.7 }}>{review?.comment??""}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const ProductTabs = ({ description="", specifications=[], reviews=[], rating=0, reviewCount=0, sx={} }) => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const distribution = [5,4,3,2,1].map(star => ({ star, count:reviews.filter(r=>Math.round(r?.rating??0)===star).length }));

  return (
    <Box sx={{ borderRadius:BRAND.radiusCard, border:`1px solid ${theme.palette.divider}`, bgcolor:theme.palette.background.paper, overflow:"hidden", ...sx }}>

      {/* Tab bar */}
      <Box sx={{ borderBottom:`1px solid ${theme.palette.divider}`, px:{ xs:1, sm:2, md:4 } }}>
        <Tabs value={tab} onChange={(_,v)=>setTab(v)} aria-label="Product detail tabs"
          variant="scrollable" scrollButtons="auto"
          TabIndicatorProps={{ sx:{ bgcolor:theme.palette.secondary.main, height:2.5, borderRadius:"2px 2px 0 0" } }}
          sx={{ minHeight:{ xs:44, md:52 } }}>
          {[`Description`, `Specs (${specifications?.length??0})`, `Reviews (${reviewCount})`].map((label,i) => (
            <Tab key={i} label={label} id={`pdp-tab-${i}`} aria-controls={`pdp-tabpanel-${i}`}
              sx={{ fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightMedium, fontSize:{ xs:BRAND.sizeXxs, sm:BRAND.sizeXs, md:BRAND.sizeSm }, minHeight:{ xs:44, md:52 }, px:{ xs:1.5, sm:2, md:3 }, color:theme.palette.text.secondary, "&.Mui-selected":{ color:theme.palette.text.primary, fontWeight:theme.typography.fontWeightBold } }} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ px:{ xs:2, sm:3, md:4 }, pb:{ xs:3, md:4 } }}>

        {/* Description */}
        <TabPanel value={tab} index={0}>
          {description ? (
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:{ xs:BRAND.sizeSm, md:BRAND.sizeBody }, color:theme.palette.text.secondary, lineHeight:{ xs:1.75, md:1.85 }, whiteSpace:"pre-line", maxWidth:760 }}>
              {description}
            </Typography>
          ) : (
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.disabled }}>No description available.</Typography>
          )}
        </TabPanel>

        {/* Specifications */}
        <TabPanel value={tab} index={1}>
          {specifications?.length > 0 ? (
            <Table size="small" sx={{ "& .MuiTableCell-root":{ borderColor:theme.palette.divider } }}>
              <TableBody>
                {specifications.map((spec,i) => (
                  <TableRow key={i} sx={{ "&:nth-of-type(odd) td":{ bgcolor:alpha(theme.palette.primary.main,0.03) } }}>
                    <TableCell sx={{ width:{ xs:"45%", sm:"35%", md:"30%" }, fontFamily:BRAND.fontBody, fontWeight:theme.typography.fontWeightBold, fontSize:{ xs:BRAND.sizeXs, md:BRAND.sizeSm }, color:theme.palette.text.primary, verticalAlign:"top", py:{ xs:1.25, md:1.5 }, pl:0 }}>{spec?.label??""}</TableCell>
                    <TableCell sx={{ fontFamily:BRAND.fontBody, fontSize:{ xs:BRAND.sizeXs, md:BRAND.sizeSm }, color:theme.palette.text.secondary, py:{ xs:1.25, md:1.5 }, pr:0 }}>{spec?.value??"—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.disabled }}>No specifications available.</Typography>
          )}
        </TabPanel>

        {/* Reviews */}
        <TabPanel value={tab} index={2}>
          {/* Summary card */}
          <Box sx={{ display:"flex", flexDirection:{ xs:"column", sm:"row" }, gap:{ xs:2.5, sm:4, md:5 }, p:{ xs:2, md:3 }, mb:{ xs:2.5, md:3 }, bgcolor:alpha(theme.palette.primary.main,0.03), border:`1px solid ${theme.palette.divider}`, borderRadius:BRAND.radiusCard }}>
            {/* Score */}
            <Box sx={{ textAlign:"center", flexShrink:0 }}>
              <Typography sx={{ fontFamily:BRAND.fontMono, fontWeight:theme.typography.fontWeightBlack, fontSize:{ xs:"3rem", md:"4rem" }, lineHeight:1, color:theme.palette.text.primary, letterSpacing:"-0.04em" }}>
                {Number(rating).toFixed(1)}
              </Typography>
              <Box sx={{ display:"flex", justifyContent:"center", mt:0.5 }}>
                <RatingStars rating={rating} size="small" />
              </Box>
              <Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeXs, color:theme.palette.text.secondary, mt:0.5 }}>{reviewCount} reviews</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ display:{ xs:"none", sm:"block" } }} />
            <Divider sx={{ display:{ xs:"block", sm:"none" } }} />
            {/* Bars */}
            <Box sx={{ flex:1, display:"flex", flexDirection:"column", gap:{ xs:0.6, md:0.75 }, justifyContent:"center" }}>
              {distribution.map(({ star, count }) => <RatingBar key={star} star={star} count={count} total={reviews.length} />)}
            </Box>
          </Box>
          {/* Review list */}
          {reviews?.length > 0
            ? reviews.map((r,i) => <ReviewCard key={i} review={r} />)
            : <Box sx={{ py:5, textAlign:"center" }}><Typography sx={{ fontFamily:BRAND.fontBody, fontSize:BRAND.sizeSm, color:theme.palette.text.disabled }}>No reviews yet. Be the first!</Typography></Box>}
        </TabPanel>
      </Box>
    </Box>
  );
};
export default ProductTabs;
