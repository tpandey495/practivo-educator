// components/AddNewCourseCard.tsx
import { Box, Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useModal } from "../../../hooks/useModal";
import { AddNewCourseModal } from "../../course/components/AddNewCourseModal";


export default function AddNewCourseCard() {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 350,
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          borderRadius: "18px",
          border: "2px dashed rgba(99,102,241,0.35)",
          background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
          boxShadow:
            "0 4px 12px rgba(15,23,42,0.06), 0 12px 28px rgba(15,23,42,0.08)",
          textAlign: "center",
          transition:
            "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
          cursor: "pointer",
          px: 3,
          py: 4,
          transform: "translateY(0)",
          "&:hover": {
            boxShadow:
              "0 8px 18px rgba(15,23,42,0.08), 0 16px 40px rgba(15,23,42,0.1)",
            borderColor: "rgba(99,102,241,0.6)",
            transform: "translateY(-6px)",
          },
        }}
        onClick={openModal}
      >
        <Box
          sx={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(14,165,233,0.12))",
            color: "#4338CA",
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "18px",
            color: "#1e293b",
            lineHeight: 1.4,
          }}
        >
          Add A New Course
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            color: "#64748b",
            maxWidth: 220,
          }}
        >
          Create a new course to share with your learners.
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            px: 2.8,
            py: 1,
            fontSize: "13.5px",
            fontWeight: 600,
            color: "#fff",
            background:
              "linear-gradient(135deg, #6366f1, #7c3aed, #0ea5e9)",
            boxShadow: "0 6px 14px rgba(99,102,241,0.25)",
            "&:hover": {
              background:
                "linear-gradient(135deg, #4f46e5, #7c3aed, #0891b2)",
              boxShadow: "0 8px 22px rgba(99,102,241,0.35)",
            },
          }}
          onClick={(event) => {
            event.stopPropagation();
            openModal();
          }}
        >
          New Course
        </Button>
      </Box>
      <AddNewCourseModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}