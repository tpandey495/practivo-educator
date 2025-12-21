import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useDeleteQuestionBankMutation } from "../../api/questionBankApi";
import Modal from "../../../../components/ui/Modal/Modal";
import { useSnackbar } from "../../../../components/ui/Snackbar/SnackBarProvider";

interface DeleteQuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionBankId: number;
  questionBankName: string;
}

export function DeleteQuestionBankModal({ 
  isOpen, 
  onClose, 
  questionBankId, 
  questionBankName 
}: DeleteQuestionBankModalProps) {
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [deleteQuestionBank, { isLoading }] = useDeleteQuestionBankMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteQuestionBank({ id: questionBankId }).unwrap();
      showSnackbar({ 
        message: response?.message || "Question Bank deleted successfully!", 
        severity: "success" 
      });
      onClose();
    } catch (error: any) {
      console.error("Error deleting question bank:", error);
      const errorMessage = error?.data?.errors?.map((e: any) => e.message).join(", ") || 
                          error?.data?.message || 
                          "Failed to delete question bank!";
      showSnackbar({ message: errorMessage, severity: "error" });
    }
  };

  return (
    <Modal onClose={onClose} open={isOpen}>
      <Typography 
        id="modal-modal-title" 
        variant={isMobile ? "h6" : "h5"} 
        component="h2"
        sx={{ mb: { xs: 2, md: 3 } }}
      >
        Delete Question Bank
      </Typography>

      <Box
        sx={{ 
          width: { xs: '100%', sm: 400, md: 450 },
          maxWidth: '100%'
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '0.875rem', md: '1rem' },
            color: 'text.secondary'
          }}
        >
          Are you sure you want to delete the question bank{' '}
          <Typography 
            component="span" 
            sx={{ 
              fontWeight: 'bold',
              color: 'error.main'
            }}
          >
            "{questionBankName}"
          </Typography>
          ?
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            mb: 4,
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            color: 'warning.main',
            fontStyle: 'italic'
          }}
        >
          This action cannot be undone. All questions associated with this question bank will also be affected.
        </Typography>

        <Box 
          display="flex" 
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="end" 
          gap={{ xs: 1, sm: 2 }} 
          mt={3}
        >
          <Button 
            variant="outlined" 
            onClick={onClose}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              order: { xs: 2, sm: 1 },
              minHeight: { xs: 40, md: 36 }
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleDelete}
            disabled={isLoading}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              order: { xs: 1, sm: 2 },
              minHeight: { xs: 40, md: 36 }
            }}
          >
            {isLoading ? "Deleting..." : "Delete Question Bank"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
