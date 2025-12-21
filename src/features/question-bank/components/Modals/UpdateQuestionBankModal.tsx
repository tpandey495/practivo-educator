import { Box, Button, Chip, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useUpdateQuestionBankMutation } from "../../api/questionBankApi";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "../../../../components/ui/Modal/Modal";
import { useSnackbar } from "../../../../components/ui/Snackbar/SnackBarProvider";

interface IUpdateQuestionBank {
  name: string;
  description: string;
}

interface UpdateQuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionBank: {
    id: number;
    name: string;
    description: string;
    tags: string[];
  };
}

export function UpdateQuestionBankModal({ 
  isOpen, 
  onClose, 
  questionBank 
}: UpdateQuestionBankModalProps) {
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [updateQuestionBank, { isLoading }] = useUpdateQuestionBankMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IUpdateQuestionBank>({ mode: "onBlur" });

  // Populate form when modal opens
  useEffect(() => {
    if (isOpen && questionBank) {
      setValue("name", questionBank.name);
      setValue("description", questionBank.description);
      setTags(questionBank.tags || []);
    }
  }, [isOpen, questionBank, setValue]);

  const handleAddTag = (): void => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string): void => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmit = async (data: IUpdateQuestionBank) => {
    try {
      const requestBody = {
        name: data.name,
        description: data.description,
        tags: tags,
      };

      const response = await updateQuestionBank({ 
        id: questionBank.id, 
        body: requestBody 
      }).unwrap();
      
      showSnackbar({ 
        message: response?.message || "Question Bank updated successfully!", 
        severity: "success" 
      });
      
      handleClose();
    } catch (error: any) {
      console.error("Error updating question bank:", error);
      const errorMessage = error?.data?.errors?.map((e: any) => e.message).join(", ") || 
                          error?.data?.message || 
                          "Something went wrong!";
      showSnackbar({ message: errorMessage, severity: "error" });
    }
  };

  const handleClose = () => {
    reset();
    setTags([]);
    setTagInput("");
    onClose();
  };

  return (
    <Modal onClose={handleClose} open={isOpen}>
      <Typography 
        id="modal-modal-title" 
        variant={isMobile ? "h6" : "h5"} 
        component="h2"
        sx={{ mb: { xs: 2, md: 3 } }}
      >
        Update Question Bank
      </Typography>

      <Box
        component="form"
        sx={{ 
          mt: 2,
          width: { xs: '100%', sm: 400, md: 500 },
          maxWidth: '100%'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          fullWidth
          label="Question Bank Name"
          variant="outlined"
          margin="normal"
          size={isMobile ? "small" : "medium"}
          {...register("name", {
            required: "Question Bank name is required",
            minLength: { value: 2, message: "Minimum 2 characters required" },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: { xs: '0.875rem', md: '1rem' }
            }
          }}
        />

        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={isMobile ? 3 : 4}
          size={isMobile ? "small" : "medium"}
          {...register("description", {
            required: "Description is required",
            minLength: { value: 10, message: "Minimum 10 characters required" },
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: { xs: '0.875rem', md: '1rem' }
            }
          }}
        />

        <TextField
          fullWidth
          label="Add Tags"
          variant="outlined"
          margin="normal"
          size={isMobile ? "small" : "medium"}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Press Enter or comma to add tags"
          sx={{
            '& .MuiInputBase-root': {
              fontSize: { xs: '0.875rem', md: '1rem' }
            }
          }}
        />

        <Box sx={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: { xs: 0.5, md: 1 }, 
          mt: 1,
          mb: 2
        }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              color="primary"
              size={isMobile ? "small" : "medium"}
              sx={{
                fontSize: { xs: '0.75rem', md: '0.875rem' }
              }}
            />
          ))}
        </Box>

        <Box 
          display="flex" 
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="end" 
          gap={{ xs: 1, sm: 2 }} 
          mt={3}
        >
          <Button 
            variant="outlined" 
            onClick={handleClose}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              order: { xs: 2, sm: 1 },
              minHeight: { xs: 40, md: 36 }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            type="submit" 
            disabled={isLoading}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              order: { xs: 1, sm: 2 },
              minHeight: { xs: 40, md: 36 }
            }}
          >
            {isLoading ? "Updating..." : "Update Question Bank"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
