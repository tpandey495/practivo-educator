// IOSSwitch.tsx
import React from "react";
import { Switch, SwitchProps, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledIOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "primary.main",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "primary.main",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#D0D0D0",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface IOSSwitchProps extends SwitchProps {
  label?: string;
  labelPlacement?: "start" | "end" | "top" | "bottom";
}

const IOSSwitch: React.FC<IOSSwitchProps> = ({
  label,
  labelPlacement = "end",
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexDirection: labelPlacement === "start" ? "row-reverse" : "row",
      }}
    >
      {label && <Typography variant="body2">{label}</Typography>}
      <StyledIOSSwitch {...props} />
    </Box>
  );
};

export default IOSSwitch;
