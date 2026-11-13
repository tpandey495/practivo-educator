import { useState } from "react";
import { Box, Link, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BuyCreditsModal from "./BuyCreditsModal";

interface CreditCostHintProps {
  /** Credits this action will use; null hides the hint (pricing not loaded) */
  cost: number | null;
  remaining: number;
  canAfford: boolean;
}

/**
 * Shown above an AI action's submit button:
 * "This will use 432 credits · 1,568 left", or a red "not enough" warning.
 */
const CreditCostHint = ({ cost, remaining, canAfford }: CreditCostHintProps) => {
  const [buyOpen, setBuyOpen] = useState(false);
  if (cost === null) return null;

  const color = canAfford ? "#475569" : "#DC2626";

  return (
    <>
      <Box
        data-testid="credit-cost-hint"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          px: 1.25,
          py: 0.75,
          borderRadius: "8px",
          bgcolor: canAfford ? "#F8FAFC" : "#FEF2F2",
          border: "1px solid",
          borderColor: canAfford ? "#E2E8F0" : "#FECACA",
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 14, color: canAfford ? "#4F39F6" : color }} />
        <Typography sx={{ fontSize: 12, color, fontWeight: 500 }}>
          {canAfford ? (
            <>
              This will use <b>{cost.toLocaleString()}</b> credits · {remaining.toLocaleString()} left
            </>
          ) : (
            <>
              Needs <b>{cost.toLocaleString()}</b> credits, you have {remaining.toLocaleString()}.{" "}
              <Link component="button" type="button" onClick={() => setBuyOpen(true)} sx={{ fontSize: 12, verticalAlign: "baseline" }}>
                Get more
              </Link>
            </>
          )}
        </Typography>
      </Box>
      <BuyCreditsModal open={buyOpen} onClose={() => setBuyOpen(false)} />
    </>
  );
};

export default CreditCostHint;
