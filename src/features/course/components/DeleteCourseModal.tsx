import { Modal, useSnackbar } from "@components/ui";
import { Box, Button, Typography } from "@mui/material";
import { useDeleteCourseMutation } from "../api/courseApi";

export function DeleteModal({ isOpen, onClose, id }: { isOpen: boolean, onClose: () => void; id?: number }) {
    const [deleteCourse, { isLoading }] = useDeleteCourseMutation();
    const { showSnackbar } = useSnackbar();

    const handleDelete = async () => {
        if (!id) return;

        try {
            const response = await deleteCourse({ id }).unwrap();
            showSnackbar({ message: response?.message, severity: "success" });
        } catch (err: any) {
            console.error("Delete failed", err);
            const errorMessage = err?.data?.errors?.map((e: any) => e.message).join(", ") || "Something went wrong!";
            showSnackbar({ message: errorMessage, severity: "error", });
        } finally {
            onClose();
        }
    };
    return (
        <Modal onClose={onClose} open={isOpen}>
            <Typography id="modal-modal-title" variant="h6" component="h2">Delete Course</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You are about to permanently delete this course. Are you sure you
                want to delete it?
            </Typography>
            <Box display={"flex"} gap={"10px"} justifyContent={"end"} mt={2}>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="error" variant="contained" disabled={isLoading}>
                    {isLoading ? "Deleting..." : "Delete"}
                </Button>
            </Box>
        </Modal>
    )
}