import { Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import { Question, Topic } from "../types";
import ListAddIcon from "@icons/ListAddIcon";
import EditIcon2 from "@icons/EditIcon2";
import CheckBoxIcon from "@icons/CheckBoxIcon";
import { useState } from "react";

export default function Topics({
  TopicsData, selectedId, setSelectedId, setFormType
}: {
  setFormType: (type: "multiple_choice" | "single_choice" | "fill_up" | null) => void;
  TopicsData: Topic[];
  selectedId: number;
  setSelectedId: (id: number) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  return (
    <>
      {TopicsData?.map((question: any) => (
        <Box
          sx={{
            border: selectedId === question.topicId
              ? "1px solid #4F39F6"
              : "1px solid #CCCCCC",
            p: "16px",
            borderLeft: selectedId === question.topicId
              ? "4px solid #4F39F6"
              : "1px solid #CCCCCC",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            mb: "16px",
            height: "44px",
            cursor: "pointer",
          }}
          onClick={() => setSelectedId(question.topicId)}
        >
          <Typography>{question?.text?.length > 20 ? question?.text?.slice(0, 20) + "..." : question?.text}</Typography>
          <Typography sx={{ ml: "auto", textTransform: "capitalize" }}>{question?.type}</Typography>
          <IconButton>
            <MoreVert sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
      ))}

      {/* Add Question Button with dropdown */}
      <Button onClick={handleMenuOpen} sx={{ width: "100%" }} startIcon={<ListAddIcon color="#fff" />}>
        Add question
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setFormType("multiple_choice");
          }}
        >
          Multiple Choice
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setFormType("single_choice");
          }}
        >
          Single Choice
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setFormType("fill_up");
          }}
        >
          Fill Ups
        </MenuItem>
      </Menu>
    </>
  );
}

export const QuestionsSideList = ({
  QuestionsData,
  selectedId,
  setSelectedId,
}: {
  QuestionsData: Question[];
  selectedId: number;
  setSelectedId: (id: number) => void;
}) => {
  return (
    <>
      {QuestionsData.map((question: Question) => (
        <Box
          sx={{
            border:
              selectedId === question.questionId
                ? "1px solid #4F39F6"
                : "1px solid #CCCCCC",
            p: "16px",
            borderLeft:
              selectedId === question.questionId
                ? "4px solid #4F39F6"
                : "1px solid #CCCCCC",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            mb: "16px",
            height: "44px",
            cursor: "pointer",
          }}
          onClick={() => setSelectedId(question.questionId)}
        >
          <Box sx={{ mr: 2 }}>
            {selectedId === question.questionId ? (
              <EditIcon2 />
            ) : (
              <CheckBoxIcon />
            )}
          </Box>
          <Typography>{question.question}</Typography>
          <Typography sx={{ ml: "auto" }}>{question.score}</Typography>
          <IconButton>
            <MoreVert sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
      ))}
      <Button sx={{ width: "100%" }} startIcon={<ListAddIcon color="#fff" />}>
        Add question
      </Button>
    </>
  );
};
