import { Box, Typography, Button } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

interface DeleteCourseSectionProps {
  onDelete: () => void;
}

export const DeleteCourseSection = ({ onDelete }: DeleteCourseSectionProps) => {
  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: "#f8fafc",
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <DeleteOutline sx={{ color: "#dc2626" }} />
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
            Delete Course
          </Typography>
          <Typography sx={{ color: "#64748b", fontSize: "14px" }}>
            Deleting a course will delete its contents which cannot be recovered.
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={onDelete}
        disableElevation
        sx={{
          bgcolor: "#DC2626 !important",
          backgroundColor: "#DC2626 !important",
          color: "#fff !important",
          "&:hover": {
            bgcolor: "#b91c1c !important",
            backgroundColor: "#b91c1c !important",
            color: "#fff !important",
          },
          "&:focus": {
            bgcolor: "#dc2626 !important",
            backgroundColor: "#dc2626 !important",
            color: "#fff !important",
          },
          "&:active": {
            bgcolor: "#991b1b !important",
            backgroundColor: "#991b1b !important",
            color: "#fff !important",
          },
        }}
      >
        Delete Course
      </Button>
    </Box>
  );
};
