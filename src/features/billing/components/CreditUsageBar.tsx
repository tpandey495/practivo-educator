import { Box, LinearProgress, Typography } from "@mui/material";
import { creditStatusColor, useCredits } from "../hooks/useCredits";

interface CreditUsageBarProps {
  compact?: boolean;
}

const CreditUsageBar = ({ compact = false }: CreditUsageBarProps) => {
  const { wallet, remaining, used, totalCredited, usedPercent, status, isLoading, isError } = useCredits();
  const color = creditStatusColor[status];

  if (isError && !wallet) {
    return (
      <Typography variant="body2" color="text.secondary" fontSize={compact ? 12 : 14}>
        Couldn't load your credits.
      </Typography>
    );
  }

  if (isLoading || !wallet) {
    return <LinearProgress sx={{ borderRadius: 4, height: compact ? 6 : 8 }} />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
        <Typography variant="body2" fontWeight={600} fontSize={compact ? 12 : 14}>
          {remaining.toLocaleString()} credits available
        </Typography>
        <Typography variant="caption" color="text.secondary" fontSize={compact ? 11 : 12}>
          {used.toLocaleString()} / {totalCredited.toLocaleString()} used
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={usedPercent}
        sx={{
          height: compact ? 6 : 8,
          borderRadius: 4,
          bgcolor: "#EEF2FF",
          "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 4 },
        }}
      />
    </Box>
  );
};

export default CreditUsageBar;
