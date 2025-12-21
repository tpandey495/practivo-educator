import React, { useState } from "react";
import { Popover, Box } from "@mui/material";

interface BlendedPopoverProps {
  trigger: React.ReactElement; // trigger button/element
  content: React.ReactNode; // content inside popover
  backgroundColor?: string;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  transformOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  arrowPlacement?: "left" | "center" | "right";
}

export const ReusablePopper: React.FC<BlendedPopoverProps> = ({
  trigger,
  content,
  backgroundColor = "#f9f9f9",
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  transformOrigin = { vertical: "top", horizontal: "center" },
  arrowPlacement = "center",
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "blended-popover" : undefined;

  return (
    <>
      {/* Trigger with click */}
      <span onClick={handleClick}>{trigger}</span>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            mt: anchorOrigin.vertical === "bottom" ? "10px" : undefined,
            mb: anchorOrigin.vertical === "top" ? "10px" : undefined,
            // center , left , right
            "&::before": {
              content: '""',
              position: "absolute",
              top: anchorOrigin.vertical === "bottom" ? "-6px" : undefined,
              bottom: anchorOrigin.vertical === "top" ? "-6px" : undefined,
              left: `calc(50% - ${
                arrowPlacement === "center"
                  ? "6px"
                  : arrowPlacement === "left"
                  ? "40%"
                  : "-40%"
              })`,
              width: 12,
              height: 12,
              backgroundColor: backgroundColor,
              transform: "rotate(45deg)",
              zIndex: 2, // arrow on top
              ...(anchorOrigin.vertical === "top"
                ? {
                    borderRight: "1px solid #d9d9d9",
                    borderBottom: "1px solid #d9d9d9",
                  }
                : {
                    borderLeft: "1px solid #d9d9d9",
                    borderTop: "1px solid #d9d9d9",
                  }),
            },
          }}
        >
          <Box
            sx={{
              padding: "16px",
              backgroundColor: backgroundColor,
              borderRadius: "16px",
              border: "1px solid #D9D9D9",
              position: "relative",
              zIndex: 1,
            }}
          >
            {content}
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default ReusablePopper;
