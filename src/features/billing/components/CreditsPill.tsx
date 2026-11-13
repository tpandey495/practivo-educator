import { useState } from "react";
import { Box, Button, ButtonBase, Divider, Popover, Skeleton, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";
import { creditStatusColor, useCredits } from "../hooks/useCredits";
import CreditUsageBar from "./CreditUsageBar";
import BuyCreditsModal from "./BuyCreditsModal";

interface CreditsPillProps {
  /** Hide the "credits" label (for narrow screens) */
  compact?: boolean;
}

const CreditsPill = ({ compact = false }: CreditsPillProps) => {
  const { remaining, status, isLoading } = useCredits();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [buyOpen, setBuyOpen] = useState(false);
  const color = creditStatusColor[status];

  if (isLoading) {
    return <Skeleton variant="rounded" width={compact ? 56 : 110} height={34} sx={{ borderRadius: 999 }} />;
  }

  return (
    <>
      <ButtonBase
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-label={`${remaining} AI credits remaining`}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          px: 1.5,
          height: 34,
          borderRadius: 999,
          border: "1px solid",
          borderColor: `${color}40`,
          bgcolor: `${color}10`,
          color,
          fontWeight: 600,
          fontSize: 13,
          flexShrink: 0,
          transition: "all 0.2s ease",
          "&:hover": { bgcolor: `${color}1F` },
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 16 }} />
        <span>{remaining.toLocaleString()}</span>
        {!compact && <span style={{ fontWeight: 500, opacity: 0.85 }}>credits</span>}
      </ButtonBase>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { mt: 1, p: 2, width: 300, borderRadius: 3 } } }}
      >
        <Typography fontWeight={700} fontSize={15} sx={{ mb: 1.5 }}>
          AI credits
        </Typography>
        <CreditUsageBar />

        {status !== "ok" && (
          <Typography variant="body2" sx={{ mt: 1.5, color, fontWeight: 500 }}>
            {status === "empty"
              ? "You're out of credits. Buy more to keep using AI features."
              : "You're running low on credits."}
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={() => {
              setAnchorEl(null);
              navigate("/billing");
            }}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            View usage
          </Button>
          <Button
            fullWidth
            variant="contained"
            size="small"
            onClick={() => {
              setAnchorEl(null);
              setBuyOpen(true);
            }}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              background: "linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)",
            }}
          >
            Buy credits
          </Button>
        </Box>
      </Popover>

      <BuyCreditsModal open={buyOpen} onClose={() => setBuyOpen(false)} />
    </>
  );
};

export default CreditsPill;
