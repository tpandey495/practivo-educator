import { Box, Button, TextField, Typography } from "@mui/material";
import { Modal, useSnackbar } from "@components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCreateChapterMutation } from "../api/chapterApi";

interface IAddChapterModalProps {
  open: boolean;
  onClose: () => void;
  onChapterAdded?: () => void;
}

export const AddChapterModal = ({ open, onClose, onChapterAdded }: IAddChapterModalProps) => {
  const { courseId } = useParams();
  const { showSnackbar } = useSnackbar();
  const [createChapter, { isLoading }] = useCreateChapterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ title: string }>();

  const onSubmit: SubmitHandler<{ title: string }> = async (data: { title: string }) => {
    try {
      const response = await createChapter({
        body: {
          title: data.title,
          courseId: Number(courseId!),
        },
      }).unwrap();
      showSnackbar({ message: response?.message || "Chapter created successfully", severity: "success" });
      reset();
      onClose();
      // Notify parent component that a chapter was added
      onChapterAdded?.();
    } catch (err: any) {
      const errorMessage =
        err?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Something went wrong!";
      showSnackbar({ message: errorMessage, severity: "error" });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Lesson
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Chapter Title"
            variant="outlined"
            margin="normal"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 2, message: "Minimum 2 characters required" },
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <Box display="flex" justifyContent="end" gap="10px" mt={3}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
