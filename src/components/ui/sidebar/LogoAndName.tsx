import { Box, IconButton } from "@mui/material";
import BackArrowIcon from "@icons/BackArrowIcon";

const LogoAndName = ({
  toggleMenu,
  open,
}: {
  toggleMenu: () => void;
  open: boolean;
}) => {
  const logoSrc = open ? "/practivo-logo.png" : "/practivo-logo-mark.png";
  const logoAlt = open ? "Practivo logo" : "Practivo collapsed logo";
  const logoWidth = open ? "135px" : "32px";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        flexWrap: "wrap",
        columnGap: open ? 0 : 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          width: open ? "auto" : "100%",
        }}
      >
        <Box
          component="img"
          src={logoSrc}
          alt={logoAlt}
          sx={{
            width: logoWidth,
            height: "auto",
            objectFit: "contain",
            transition: "width 0.3s ease",
          }}
        />
      </Box>
      <IconButton
        onClick={toggleMenu}
        sx={{
          transform: open ? "rotate(0deg)" : "rotate(180deg)",
          transition: "transform 0.3s ease-in-out",
          marginLeft: "8px",
        }}
      >
        <BackArrowIcon />
      </IconButton>
    </Box>
  );
};

export default LogoAndName;
