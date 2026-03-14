// ─────────────────────────────────────────────────────────────
//  CheckoutStepper
//  Steps: Contact → Shipping → Payment → Review
//
//  Responsive:
//    xs  — icon-only steps with connecting line
//    sm+ — icon + label
//    md+ — numbered badge + label + sublabel
// ─────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography } from "@mui/material";
import PersonOutlineIcon        from "@mui/icons-material/PersonOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon   from "@mui/icons-material/CreditCardOutlined";
import FactCheckOutlinedIcon    from "@mui/icons-material/FactCheckOutlined";
import CheckIcon                from "@mui/icons-material/Check";
import { useTheme, alpha }      from "@mui/material/styles";
import { BRAND }                from "../../../theme/theme";

const STEPS = [
  { label: "Contact",  sub: "Email & phone",      icon: PersonOutlineIcon         },
  { label: "Shipping", sub: "Address & delivery",  icon: LocalShippingOutlinedIcon },
  { label: "Payment",  sub: "Card & billing",      icon: CreditCardOutlinedIcon    },
  { label: "Review",   sub: "Confirm & place",     icon: FactCheckOutlinedIcon     },
];

const CheckoutStepper = ({ activeStep = 0 }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      gap:            0,
      mb:             { xs: 3, md: 5 },
    }}>
      {STEPS.map((step, i) => {
        const done   = i < activeStep;
        const active = i === activeStep;
        const Icon   = step.icon;

        return (
          <React.Fragment key={i}>
            {/* Step node */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75 }}>

              {/* Circle */}
              <Box sx={{
                width:        { xs: 36, sm: 40, md: 44 },
                height:       { xs: 36, sm: 40, md: 44 },
                borderRadius: "50%",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                transition:   "all 0.3s ease",
                bgcolor: done
                  ? theme.palette.success.main
                  : active
                    ? theme.palette.secondary.main
                    : alpha(theme.palette.primary.main, 0.07),
                border: active
                  ? `2px solid ${theme.palette.secondary.main}`
                  : done
                    ? `2px solid ${theme.palette.success.main}`
                    : `2px solid ${theme.palette.divider}`,
                boxShadow: active
                  ? `0 0 0 4px ${alpha(theme.palette.secondary.main, 0.14)}`
                  : "none",
              }}>
                {done ? (
                  <CheckIcon sx={{ fontSize: { xs: 16, md: 18 }, color: "#fff" }} />
                ) : (
                  <Icon sx={{
                    fontSize: { xs: 16, sm: 17, md: 18 },
                    color: active
                      ? "#fff"
                      : theme.palette.text.disabled,
                  }} />
                )}
              </Box>

              {/* Label — hidden on xs */}
              <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", alignItems: "center" }}>
                <Typography sx={{
                  fontFamily: BRAND.fontBody,
                  fontSize:   { sm: BRAND.sizeXs, md: BRAND.sizeSm },
                  fontWeight: active
                    ? theme.typography.fontWeightBold
                    : theme.typography.fontWeightMedium,
                  color: active
                    ? theme.palette.secondary.main
                    : done
                      ? theme.palette.success.main
                      : theme.palette.text.secondary,
                  lineHeight: 1.2,
                }}>
                  {step.label}
                </Typography>
                <Typography sx={{
                  display:    { sm: "none", md: "block" },
                  fontFamily: BRAND.fontBody,
                  fontSize:   BRAND.sizeXxs,
                  color:      theme.palette.text.disabled,
                  lineHeight: 1.2,
                  mt:         0.2,
                }}>
                  {step.sub}
                </Typography>
              </Box>
            </Box>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <Box sx={{
                flex:     1,
                height:   2,
                mx:       { xs: 0.75, sm: 1.5, md: 2 },
                mb:       { xs: 0, sm: "22px", md: "30px" },
                borderRadius: "1px",
                bgcolor: i < activeStep
                  ? theme.palette.success.main
                  : theme.palette.divider,
                transition: "background-color 0.4s ease",
                minWidth:   { xs: 20, sm: 32, md: 48 },
              }} />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};
export default CheckoutStepper;
