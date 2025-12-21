import {
  Box,
  Typography,
  Radio,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { GeneratedQuestion } from "./types";
import { COLORS, GRADIENTS } from "../../../course-practice/constants/index";

type Props = {
  question: GeneratedQuestion;
  length?: number;
  isFirst?: boolean;
  isLast?: boolean;
  onEdit?: (question: GeneratedQuestion) => void;
  onDelete?: (question: GeneratedQuestion) => void;
};

export const QuestionRenderer = ({
  question,
  length = 1,
  isFirst = false,
  isLast = false,
  onEdit,
  onDelete,
}: Props) => {
  console.log("Question:", question);

  return (
    <Box>
      {/* ===== Header ===== */}
      <Box
        sx={{
          background: isFirst ? GRADIENTS.background : "transparent",
          p: 3,
          borderBottom: !isLast ? "1px solid #E5E7EB" : "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: COLORS.text.primary,
              fontWeight: 700,
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              gap : 1,
            }}
          >
            {/* Question Number */}
            <Box
              sx={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: GRADIENTS.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {length}
            </Box>

            {question.text || "Question"}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label={question.type?.replace("_", " ").toUpperCase()}
              size="small"
              sx={{
                background: COLORS.primary,
                color: "white",
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            />

            {/* Edit Button */}
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit?.(question)}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            {/* Delete Button */}
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete?.(question)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ===== Body ===== */}
      <Box sx={{ p: 3 }}>
        {!isLast && <Divider sx={{ mb: 3, opacity: 0.3 }} />}

        {/* MCQ / Single Choice */}
        {(question.type === "single_choice" ||
          question.type === "multiple_choice") && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
            }}
          >
            {question.options?.map((option, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  px: 2,
                  py: 1.2,
                  bgcolor: option.isCorrect
                    ? "rgba(52,211,153,0.15)"
                    : "#fff",
                }}
              >
                {question.type === "single_choice" ? (
                  <Radio checked={option.isCorrect} disabled size="small" />
                ) : (
                  <Radio checked={option.isCorrect} disabled size="small" />
                )}

                <Typography fontSize={14}>{option.text}</Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Fill in the blank */}
        {question.type === "fill_up" && (
          <Box
            sx={{
              bgcolor: "rgba(52,211,153,0.15)",
              p: 2,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">Correct Answer:</Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {question.correctAnswer}
            </Typography>
          </Box>
        )}

        {/* Subjective */}
        {question.type === "subjective" && (
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{
              __html: question.description || "",
            }}
          />
        )}
      </Box>
    </Box>
  );
};
