import { Box, IconButton } from "@mui/material";
import BackArrowIcon from "@icons/BackArrowIcon";
import Brand from "../../common/Brand";

const LogoAndName = ({
  toggleMenu,
  open,
}: {
  toggleMenu: () => void;
  open: boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: open ? "space-between" : "center",
        flexDirection: open ? "row" : "column",
        p: open ? "16px 14px 16px 18px" : "16px 8px",
        gap: open ? 1 : 1.5,
        minHeight: "68px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          width: open ? "auto" : "100%",
          overflow: "hidden",
        }}
      >
        <Brand size={open ? "md" : "sm"} markOnly={!open} />
      </Box>
      <IconButton
        onClick={toggleMenu}
        size="small"
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        sx={{
          transform: open ? "rotate(0deg)" : "rotate(180deg)",
          transition: "transform 0.3s ease-in-out",
          color: "#4b5563",
          p: "6px",
          "&:hover": {
            backgroundColor: "rgba(79, 57, 246, 0.08)",
            color: "#4f39f6",
          },
        }}
      >
        <BackArrowIcon />
      </IconButton>
    </Box>
  );
};

export default LogoAndName;
