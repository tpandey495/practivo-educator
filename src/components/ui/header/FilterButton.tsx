import FilterIcon from "../../../assets/icons/FilterIcon";
import { Button } from "@mui/material";

const FilterButton = () => {
  return (
    <Button
      sx={{
        minWidth: "0",
        width: { xs: 40, sm: 44 },
        height: { xs: 40, sm: 44 },
        backgroundColor: "rgba(79, 57, 246, 1)",
        border: "1px solid rgba(79, 57, 246, 1)",
        borderRadius: { xs: "8px", sm: "10px" },
        padding: { xs: "8px", sm: "10px" },

        // Default Icon Color
        "& svg path": {
          fill: "white", // or "currentColor"
          transition: "0.3s",
        },

        "&:hover": {
          backgroundColor: "#f5f5f5",
          borderColor: "rgba(79, 57, 246, 1)",
          // CHANGE ICON COLOR ON HOVER HERE
          "& svg path": {
            fill: "rgba(79, 57, 246, 1)",
          },
        },

        "& svg": {
          fontSize: { xs: "18px", sm: "20px" },
        },
      }}
    >
      <FilterIcon />
    </Button>
  );
};

export default FilterButton;
