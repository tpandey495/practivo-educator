import FilterIcon from "@icons/FilterIcon";
import { Button } from "@mui/material";

const FilterButton = () => {
  return (
    <Button
      sx={{
        minWidth: "0", // Prevents default Button text padding
        width: { xs: 40, sm: 44 },
        height: { xs: 40, sm: 44 },
        backgroundColor: "#fff",
        border: "1px solid #fff",
        borderRadius: { xs: "8px", sm: "10px" },
        padding: { xs: "8px", sm: "10px" },
        "&:hover": {
          backgroundColor: "#f5f5f5",
          borderColor: "rgba(79, 57, 246, 1)",
        },
        "& svg": {
          fontSize: { xs: "18px", sm: "20px" },
        },
      }}
    >
      {/* <FilterAltOutlinedIcon sx={{ color: "rgba(153, 153, 153, 1)" }} /> */}
      <FilterIcon />
    </Button>
  );
};

export default FilterButton;
