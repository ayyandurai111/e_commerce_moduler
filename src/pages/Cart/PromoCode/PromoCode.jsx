// ─────────────────────────────────────────────────────────────
//  PromoCode — discount code input + validation
//
//  ✅ All colours  → theme.palette.*
//  ✅ All fonts    → BRAND.font*
//  ✅ All sizes    → BRAND.size*
//  ✅ All radii    → BRAND.radius*
//
//  Responsive: full-width at all breakpoints
//  States: idle → loading → success | error → applied
//
//  Demo valid codes:
//    LUXE10    → 10% off
//    WELCOME20 → 20% off
//    FREESHIP  → free shipping
// ─────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Box, TextField, Typography, Fade } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CloseIcon              from "@mui/icons-material/Close";
import { useTheme, alpha }    from "@mui/material/styles";
import { BRAND }              from "../../../theme/theme";
import Button                 from "../../../components/common/Button/Button";

const VALID_CODES = {
  LUXE10:    { discount: 0.10, label: "10% off your order" },
  WELCOME20: { discount: 0.20, label: "20% welcome discount" },
  FREESHIP:  { discount: 0,    label: "Free shipping applied", shipping: true },
};

const PromoCode = ({ onApply, onRemove }) => {
  const theme = useTheme();
  const [code,    setCode]    = useState("");
  const [status,  setStatus]  = useState("idle"); // idle|loading|success|error
  const [applied, setApplied] = useState(null);
  const [errMsg,  setErrMsg]  = useState("");

  const handleApply = async () => {
    if (!code.trim()) return;
    setStatus("loading");
    await new Promise(r => setTimeout(r, 700));
    const found = VALID_CODES[code.trim().toUpperCase()];
    if (found) {
      const result = { code: code.trim().toUpperCase(), ...found };
      setApplied(result);
      setStatus("success");
      onApply?.(result);
    } else {
      setStatus("error");
      setErrMsg("Invalid or expired promo code.");
    }
  };

  const handleRemove = () => {
    setApplied(null);
    setCode("");
    setStatus("idle");
    setErrMsg("");
    onRemove?.();
  };

  return (
    <Box>
      {/* Label */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.25 }}>
        <LocalOfferOutlinedIcon sx={{ fontSize: 14, color: theme.palette.secondary.main }} />
        <Typography sx={{
          fontFamily: BRAND.fontBody,
          fontSize:   BRAND.sizeSm,
          fontWeight: theme.typography.fontWeightBold,
          color:      theme.palette.text.primary,
        }}>
          Promo Code
        </Typography>
      </Box>

      {/* Input row — shown when no code applied */}
      {!applied && (
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              if (status === "error") { setStatus("idle"); setErrMsg(""); }
            }}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Try LUXE10 or FREESHIP"
            size="small"
            error={status === "error"}
            helperText={status === "error" ? errMsg : ""}
            disabled={status === "loading"}
            fullWidth
            inputProps={{
              style: {
                fontFamily:    BRAND.fontMono,
                fontSize:      BRAND.sizeSm,
                letterSpacing: "0.07em",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: BRAND.radiusInput,
                bgcolor:      theme.palette.background.default,
                "& fieldset":          { borderColor: theme.palette.divider, borderWidth: "1.5px" },
                "&:hover fieldset":    { borderColor: theme.palette.secondary.main },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.secondary.main,
                  boxShadow:   `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.1)}`,
                },
              },
              "& .MuiFormHelperText-root": {
                fontFamily: BRAND.fontBody,
                fontSize:   BRAND.sizeXxs,
                mx: 0, mt: 0.5,
              },
            }}
          />
          <Button
            variant="outline"
            size="sm"
            loading={status === "loading"}
            disabled={!code.trim() || status === "loading"}
            onClick={handleApply}
            sx={{ flexShrink: 0, minWidth: { xs: 72, sm: 80 }, height: 40, px: 2 }}
          >
            Apply
          </Button>
        </Box>
      )}

      {/* Applied badge */}
      {applied && (
        <Fade in timeout={300}>
          <Box sx={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            gap: 1,
            px:  2, py: 1.25,
            border:       `1.5px solid ${theme.palette.success.main}`,
            borderRadius: BRAND.radiusButton,
            bgcolor:      alpha(theme.palette.success.main, 0.05),
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 15, color: theme.palette.success.main, flexShrink: 0 }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{
                  fontFamily:    BRAND.fontMono,
                  fontSize:      BRAND.sizeSm,
                  fontWeight:    theme.typography.fontWeightBold,
                  color:         theme.palette.success.main,
                  letterSpacing: "0.08em",
                  lineHeight:    1.2,
                }}>
                  {applied.code}
                </Typography>
                <Typography sx={{
                  fontFamily: BRAND.fontBody,
                  fontSize:   BRAND.sizeXxs,
                  color:      theme.palette.text.secondary,
                  lineHeight: 1.3,
                }}>
                  {applied.label}
                </Typography>
              </Box>
            </Box>

            <Box
              onClick={handleRemove}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleRemove()}
              sx={{
                display: "flex", alignItems: "center", gap: 0.5,
                cursor: "pointer", flexShrink: 0,
                color: theme.palette.text.disabled,
                "&:hover": { color: theme.palette.error.main },
                transition: "color 0.2s ease",
              }}
            >
              <CloseIcon sx={{ fontSize: 13 }} />
              <Typography sx={{ fontFamily: BRAND.fontBody, fontSize: BRAND.sizeXxs }}>Remove</Typography>
            </Box>
          </Box>
        </Fade>
      )}
    </Box>
  );
};
export default PromoCode;
