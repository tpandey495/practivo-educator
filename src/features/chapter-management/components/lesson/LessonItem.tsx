import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LessonItem as StyledLessonItem } from "../../../course-settings/components/StyledComponents";
import {
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  usePublishLessonMutation,
} from "../../api/chapterApi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const lessonDndId = (id: string | number) => `lesson-${id}`;

interface LessonItemProps {
  lesson: any;
  chapter: any;
  setAddContentAnchor: (val: any) => void;
  isSmallScreen: boolean;
  onLessonAdded?: () => void;
}

export const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  chapter,
  setAddContentAnchor,
  isSmallScreen,
  onLessonAdded,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(lesson.title);
  const [updateLesson] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();
  const [publishLesson, { isLoading: isPublishing }] = usePublishLessonMutation();
  const [justPublished, setJustPublished] = useState(false);
  const isPublished = Boolean(lesson?.isPublished) || justPublished;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: lessonDndId(lesson.id),
      data: { type: "lesson", lessonId: lesson.id, chapterId: chapter.id },
    });

  const sortableStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative",
    zIndex: isDragging ? 1 : undefined,
  };

  const handlePublish = async () => {
    if (isPublished || isPublishing) return;
    const confirmPublish = window.confirm(
      "Publish this lesson? This cannot be undone."
    );
    if (!confirmPublish) return;

    try {
      await publishLesson({ lessonId: Number(lesson.id) }).unwrap();
      setJustPublished(true);
      alert("Lesson published successfully");
      onLessonAdded?.();
    } catch (err: any) {
      if (err?.status === 409) {
        // Already published on the server — reflect that in the UI.
        setJustPublished(true);
        onLessonAdded?.();
      }
      alert(err?.data?.errors?.[0]?.message || "Publish failed");
    }
  };

  const handleEditClick = () => {
    setEditTitle(lesson.title);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await updateLesson({
        lessonId: Number(lesson.id),
        title: editTitle,
      }).unwrap();
      alert("Lesson updated successfully");
      setIsEditing(false);
      onLessonAdded?.();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this lesson?");
    if (!confirmDelete) return;

    try {
      await deleteLesson({ lessonId: Number(lesson.id) }).unwrap();
      alert("Lesson deleted");
      onLessonAdded?.();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <StyledLessonItem ref={setNodeRef} style={sortableStyle}>
      <Box sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
        <DragIndicatorIcon
          {...attributes}
          {...listeners}
          sx={{
            color: "#999999",
            mr: { xs: "6px", md: "10px" },
            fontSize: { xs: 18, md: 24 },
            cursor: "move",
            touchAction: "none",
          }}
        />
        {isEditing ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              size="small"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <Button size="small" variant="contained" onClick={handleUpdate}>
              Save
            </Button>
            <Button size="small" variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        ) : (
          <>
            <Typography
              sx={{
                color: "#000",
                fontSize: { xs: "14px", md: "16px" },
                ml: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {lesson?.title}
            </Typography>
            <IconButton size="small" onClick={handleEditClick}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
        <Button
          variant="outlined"
          color={isPublished ? "success" : "primary"}
          size={isSmallScreen ? "small" : "medium"}
          disabled={isPublished || isPublishing}
          onClick={handlePublish}
          sx={{
            fontSize: { xs: "12px", md: "14px" },
            px: { xs: 1.5, md: 2 },
            py: { xs: 0.5, md: 1 },
            whiteSpace: "nowrap",
            "&.Mui-disabled": isPublished
              ? { color: "success.main", borderColor: "success.main" }
              : undefined,
          }}
        >
          {isPublished ? "Published" : isPublishing ? "Publishing..." : "Publish"}
        </Button>
        <Button
          variant="contained"
          size={isSmallScreen ? "small" : "medium"}
          sx={{
            fontSize: { xs: "12px", md: "14px" },
            px: { xs: 1.5, md: 2 },
            py: { xs: 0.5, md: 1 },
            whiteSpace: "nowrap",
          }}
          onClick={(e) => {
            setAddContentAnchor({
              anchorEl: e.currentTarget,
              chapterId: chapter.id,
              lessonId: lesson.id,
            });
          }}
        >
          Add Content
        </Button>
      </Box>
    </StyledLessonItem>
  );
};
