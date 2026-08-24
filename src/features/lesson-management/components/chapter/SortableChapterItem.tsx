import React from "react";
import { Box, TextField, Button, Typography, IconButton, AccordionDetails } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Accordion, AccordionSummary } from "../../../course-settings/components/StyledComponents";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UnitItem } from "../lesson/LessonItem";

interface SortableChapterItemProps {
  chapter: any;
  editChapterId: number | null;
  editTitle: string;
  setEditChapterId: (id: number | null) => void;
  setEditTitle: (title: string) => void;
  handleUpdate: (chapterId: number | string) => void;
  handleEditClick: (chapter: any) => void;
  handleDelete: (chapterId: number | string) => void;
  setOpenEditorChapterId: (id: number | null) => void;

  // Unit props to pass down
  editLessonId: number | null;
  editUnitTitle: string;
  setEditLessonId: (id: number | null) => void;
  setEditUnitTitle: (title: string) => void;
  handleUnitUpdate: (lessonId: number | string) => void;
  handleUnitDelete: (lessonId: number | string) => void;
  handleUnitEditClick: (unit: any) => void;
  setAddContentAnchor: (val: any) => void;
  isSmallScreen: boolean;
}

export const SortableChapterItem: React.FC<SortableChapterItemProps> = ({
  chapter,
  editChapterId,
  editTitle,
  setEditChapterId,
  setEditTitle,
  handleUpdate,
  handleEditClick,
  handleDelete,
  setOpenEditorChapterId,
  
  editLessonId,
  editUnitTitle,
  setEditLessonId,
  setEditUnitTitle,
  handleUnitUpdate,
  handleUnitDelete,
  handleUnitEditClick,
  setAddContentAnchor,
  isSmallScreen,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Accordion disableGutters elevation={0}>
        <AccordionSummary
          aria-controls={`panel${chapter?.id}-content`}
          id={`panel${chapter?.id}-header`}
          sx={{
            cursor: "default",
            userSelect: "none",
          }}
        >
          <DragIndicatorIcon
            {...attributes}
            {...listeners}
            sx={{
              color: "#999999",
              mr: { xs: "6px", md: "10px" },
              fontSize: { xs: 18, md: 24 },
              cursor: "move",
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
          {editChapterId === chapter.id ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                size="small"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <Button variant="contained" size="small" onClick={() => handleUpdate(chapter.id)}>
                Save
              </Button>
              <Button variant="outlined" size="small" onClick={() => setEditChapterId(null)}>
                Cancel
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography component="span" sx={{ color: "#000", fontWeight: 600 }}>
                {chapter?.title}
              </Typography>
              <IconButton size="small" onClick={() => handleEditClick(chapter)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => handleDelete(chapter?.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {chapter?.lessons?.length > 0 ? (
              chapter?.lessons.map((unit: any) => (
                <UnitItem
                  key={unit?.id}
                  unit={unit}
                  chapter={chapter}
                  editLessonId={editLessonId}
                  editUnitTitle={editUnitTitle}
                  setEditLessonId={setEditLessonId}
                  setEditUnitTitle={setEditUnitTitle}
                  handleUnitUpdate={handleUnitUpdate}
                  handleUnitDelete={handleUnitDelete}
                  handleUnitEditClick={handleUnitEditClick}
                  setAddContentAnchor={setAddContentAnchor}
                  isSmallScreen={isSmallScreen}
                />
              ))
            ) : (
              <Box sx={{ display: "grid", placeItems: "center", p: 10 }}>
                No Units Found
              </Box>
            )}
            <IconButton
              sx={{
                m: "auto",
                border: "1px solid #E6E6E6",
                p: { xs: 1, md: 1.5 },
              }}
              onClick={() => {
                setOpenEditorChapterId(Number(chapter?.id));
              }}
            >
              <AddRoundedIcon
                sx={{
                  color: "#4D4D4D",
                  fontSize: { xs: 20, md: 24 },
                }}
              />
            </IconButton>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
