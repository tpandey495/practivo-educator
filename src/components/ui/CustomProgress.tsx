import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

interface ProgressBarProps {
  label?: string;
  progress: number; // should be 0–100
  color?: string; // optional custom bar color
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label = "Progress",
  progress,
  color = "#702DFF", // default MUI primary color
}) => {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="body2" gutterBottom>
        {label}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 5,
          backgroundColor: "#B3B3B3",
          "& .MuiLinearProgress-bar": {
            backgroundColor: color,
          },
        }}
      />
    </Box>
  );
};

export default ProgressBar;
