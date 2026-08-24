// PreviewModal.tsx

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Chip,
  Paper,
} from "@mui/material";

import { Close as CloseIcon } from "@mui/icons-material";

import { GeneratedQuestion, PreviewModalProps } from "./types";

import { QuestionRenderer } from "./QuestionRenderer";
import { EditQuestionModal } from "./EditQuestionModal";
import { SHADOWS } from "../../../../theme/colors";




export function PreviewModal({ open, onClose, onSave }: PreviewModalProps) {



  const STATIC_QUESTIONS: GeneratedQuestion[] = [
    {
      id: "1",
      type: "multiple_choice",
      text: "check3",
      options: [
        { text: "check4", isCorrect: false },
        { text: "check5", isCorrect: true },
        { text: "check6", isCorrect: false },
        { text: "check7", isCorrect: false },
      ],
      score: 5,
    },
    {
      id: "2",
      type: "fill_up",
      text: "_____ is the largest mammal in the world.",
      correctAnswer: "Blue Whale",
      score: 3,
    },
    {
      id: "3",
      type: "subjective",
      text: "Explain the water cycle in detail.",
      description:
        "<p>Include evaporation, condensation, and precipitation.</p>",
      score: 10,
    },
    {
      id: "4",
      type: "multiple_choice",
      text: "check3",
      options: [
        { text: "check4", isCorrect: false },
        { text: "check5", isCorrect: true },
        { text: "check6", isCorrect: false },
        { text: "check7", isCorrect: false },
      ],
      score: 5,
    },
  ];

  const [questions, setQuestions] =
    useState<GeneratedQuestion[]>(STATIC_QUESTIONS);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState<GeneratedQuestion | null>(
    null
  );

  // ---------- DRAG ----------
  const handleDragStart = (index: number) => setDraggedIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newQuestions = [...questions];
    const draggedItem = newQuestions[draggedIndex];
    newQuestions.splice(draggedIndex, 1);
    newQuestions.splice(index, 0, draggedItem);

    setQuestions(newQuestions);
    setDraggedIndex(index);
  };

  const handleDelete = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(questions);
    onClose();
  };

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setEditQuestion({ ...questions[index] });
  };

  const handleEditSave = (updated: GeneratedQuestion) => {
    if (editIndex === null) return;

    const updatedList = [...questions];
    updatedList[editIndex] = updated;
    setQuestions(updatedList);

    setEditIndex(null);
    setEditQuestion(null);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6">Preview Generated Content</Typography>
            <Chip
              label={`${questions.length} Items`}
              size="small"
              color="primary"
            />
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              borderRadius: "20px",
              background: "white",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              boxShadow: SHADOWS.xl,
            }}
          >
            {questions.map((question, index) => (
              <Paper
                key={question.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                elevation={0}
              >
                <QuestionRenderer
                  question={question}
                  length={index + 1}
                  onEdit={() => openEditModal(index)}
                  onDelete={() => handleDelete(index)}
                />
              </Paper>
            ))}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save All ({questions.length})
          </Button>
        </DialogActions>
      </Dialog>

      <EditQuestionModal
        open={editIndex !== null}
        question={editQuestion}
        onClose={() => {
          setEditIndex(null);
          setEditQuestion(null);
        }}
        onSave={handleEditSave}
      />
    </>
  );
}
