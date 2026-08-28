import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton, AccordionDetails } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Accordion, AccordionSummary } from "../../../course-settings/components/StyledComponents";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LessonItem } from "../lesson/LessonItem";
import { useUpdateChapterMutation, useDeleteChapterMutation } from "../../api/chapterApi";

interface SortableChapterItemProps {
  chapter: any;
  courseId: number;
  onChapterAdded?: () => void;
  onLessonAdded?: () => void;
  setOpenEditorChapterId: (id: number | null) => void;
  setAddContentAnchor: (val: any) => void;
  isSmallScreen: boolean;
}

export const SortableChapterItem: React.FC<SortableChapterItemProps> = ({
  chapter,
  courseId,
  onChapterAdded,
  onLessonAdded,
  setOpenEditorChapterId,
  setAddContentAnchor,
  isSmallScreen,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chapter.title);
  const [updateChapter] = useUpdateChapterMutation();
  const [deleteChapter] = useDeleteChapterMutation();

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

  const handleEditClick = () => {
    setEditTitle(chapter.title);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await updateChapter({
        courseId: courseId,
        chapterId: Number(chapter.id),
        title: editTitle,
      }).unwrap();
      alert("Chapter updated successfully");
      setIsEditing(false);
      onChapterAdded?.();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this chapter?");
    if (!confirmDelete) return;

    try {
      await deleteChapter({
        courseId: courseId,
        chapterId: Number(chapter.id),
      }).unwrap();
      alert("Chapter deleted successfully");
      onChapterAdded?.();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
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
          {isEditing ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                size="small"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <Button variant="contained" size="small" onClick={handleUpdate}>
                Save
              </Button>
              <Button variant="outlined" size="small" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography component="span" sx={{ color: "#000", fontWeight: 600 }}>
                {chapter?.title}
              </Typography>
              <IconButton size="small" onClick={handleEditClick}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={handleDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {chapter?.lessons?.length > 0 ? (
              chapter?.lessons.map((lesson: any) => (
                <LessonItem
                  key={lesson?.id}
                  lesson={lesson}
                  chapter={chapter}
                  setAddContentAnchor={setAddContentAnchor}
                  isSmallScreen={isSmallScreen}
                  onLessonAdded={onLessonAdded}
                />
              ))
            ) : (
              <Box sx={{ display: "grid", placeItems: "center", p: 10 }}>
                No Lessons Found
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
