// components/QuestionCard.tsx
import { Box, Typography, Chip, Divider, IconButton } from "@mui/material";
import DeleteIcon from "@icons/DeleteIcon";
import EditIcon from "@icons/EditIcon";
import { useModal } from "../../../hooks/useModal";
import { DeleteQuestionBankModal } from "./Modals/DeleteQuestionBankModal";
import { UpdateQuestionBankModal } from "./Modals/UpdateQuestionBankModal";
import { useNavigate } from "react-router-dom";

interface IQuestionCardProps {
  id: number;
  thumbnailSrc: string;
  tags: string[];
  title: string;
  description: string;
  name: string;
  rating: number;
  backgroundColor: string;
  color: string;
  totalQuestions: number;
}

const QuestionCard = ({
  id,
  tags,
  title,
  description,
  name,
  backgroundColor,
  color,
  totalQuestions
}: IQuestionCardProps) => {
  const navigate = useNavigate();
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isOpen: isUpdateOpen, openModal: openUpdateModal, closeModal: closeUpdateModal } = useModal();
  return (
    <Box
      sx={{
        width: 268,
        height: 242,
        borderRadius: "20px",
        padding: 1.5,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        background: "#fff",
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: "10px" }}>
        {tags.map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            size="small"
            sx={{ bgcolor: backgroundColor, color: color, p: "12px" }}
          />
        ))}
      </Box>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 16,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          mt: "10px",
          cursor: "pointer",
          "&:hover": {
            color: "#702DFF",
            textDecoration: "none"
          }
        }}
        onClick={() => {
          // Navigate to content management page
          navigate(`/question-bank/${id}/questions`);
        }}
      >
        {title}
      </Typography>
      <Divider
        sx={{
          position: "absolute",
          bottom: 37,
          left: 12,
          right: 12,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          bottom: 12,
          left: 12,
          right: 12,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "7px", alignItems: "center" }}>
          <Typography sx={{ fontSize: "12px", color: "#666666" }}>
            {name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "7px", alignItems: "center" }}>
          <Typography sx={{ fontSize: "12px", color: "#666666", mt: "3px" }}>
           {totalQuestions} Question
          </Typography>
        </Box>
      </Box>

      {/* Edit Button */}
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 48,
          zIndex: 1,
          background: "#fff",
          "&:hover": { background: "#eee" },
        }}
        onClick={(e) => {
          e.stopPropagation();
          openUpdateModal();
        }}
      >
        <EditIcon />
      </IconButton>

      {/* Delete Button */}
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          background: "#fff",
          "&:hover": { background: "#eee" },
        }}
        onClick={(e) => {
          e.stopPropagation();
          openDeleteModal();
        }}
      >
        <DeleteIcon />
      </IconButton>

      {/* Update Modal */}
      <UpdateQuestionBankModal 
        isOpen={isUpdateOpen} 
        onClose={closeUpdateModal} 
        questionBank={{
          id,
          name: title,
          description,
          tags
        }}
      />

      {/* Delete Modal */}
      <DeleteQuestionBankModal 
        isOpen={isDeleteOpen} 
        onClose={closeDeleteModal} 
        questionBankId={id}
        questionBankName={title}
      />
    </Box>
  );
};

export default QuestionCard;
