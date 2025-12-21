import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GeneratedQuestion } from "./types";

type Props = {
  open: boolean;
  question: GeneratedQuestion | null;
  onClose: () => void;
  onSave: (updated: GeneratedQuestion) => void;
};

export const EditQuestionModal = ({
  open,
  question,
  onClose,
  onSave,
}: Props) => {
  const [editedQuestion, setEditedQuestion] =
    useState<GeneratedQuestion | null>(null);

  useEffect(() => {
    if (question) {
      setEditedQuestion({ ...question });
    }
  }, [question]);

  if (!editedQuestion) return null;

  // ---- Handlers ----
  const handleOptionChange = (index: number, value: string) => {
    const updated = [...(editedQuestion.options ?? [])];
    updated[index].text = value;
    setEditedQuestion({ ...editedQuestion, options: updated });
  };

  const handleCorrectChange = (index: number) => {
    const updated = [...(editedQuestion.options ?? [])].map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setEditedQuestion({ ...editedQuestion, options: updated });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Question</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Question Text */}
          <TextField
            label="Question"
            value={editedQuestion.text}
            fullWidth
            onChange={(e) =>
              setEditedQuestion({
                ...editedQuestion,
                text: e.target.value,
              })
            }
          />

          {/* Score */}
          <TextField
            label="Score"
            type="number"
            value={editedQuestion.score ?? 1}
            onChange={(e) =>
              setEditedQuestion({
                ...editedQuestion,
                score: Number(e.target.value),
              })
            }
          />

          {/* Multiple / Single Choice */}
          {(editedQuestion.type === "multiple_choice" ||
            editedQuestion.type === "single_choice") &&
            editedQuestion.options?.map((opt, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1}>
                <TextField
                  fullWidth
                  label={`Option ${index + 1}`}
                  value={opt.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />

                <Radio
                  checked={opt.isCorrect}
                  onChange={() => handleCorrectChange(index)}
                />
              </Box>
            ))}

          {/* Fill in the blank */}
          {editedQuestion.type === "fill_up" && (
            <TextField
              label="Correct Answer"
              value={editedQuestion.correctAnswer ?? ""}
              onChange={(e) =>
                setEditedQuestion({
                  ...editedQuestion,
                  correctAnswer: e.target.value,
                })
              }
            />
          )}

          {/* Subjective */}
          {editedQuestion.type === "subjective" && (
            <TextField
              label="Description / Guidelines"
              multiline
              rows={4}
              value={editedQuestion.description ?? ""}
              onChange={(e) =>
                setEditedQuestion({
                  ...editedQuestion,
                  description: e.target.value,
                })
              }
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(editedQuestion)}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
