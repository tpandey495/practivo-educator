const fs = require('fs');

const chaptersFile = 'src/features/chapter-management/components/chapter/Chapters.tsx';
const sortableFile = 'src/features/chapter-management/components/chapter/SortableChapterItem.tsx';
const lessonFile = 'src/features/chapter-management/components/lesson/LessonItem.tsx';

// LessonItem.tsx
fs.writeFileSync(lessonFile, `import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LessonItem as StyledLessonItem } from "../../../course-settings/components/StyledComponents";
import { useUpdateLessonMutation, useDeleteLessonMutation } from "../../api/chapterApi";

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
    <StyledLessonItem>
      <Box sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
        <DragIndicatorIcon
          sx={{
            color: "#999999",
            mr: { xs: "6px", md: "10px" },
            fontSize: { xs: 18, md: 24 },
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
`);

// SortableChapterItem.tsx
fs.writeFileSync(sortableFile, `import React, { useState } from "react";
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
          aria-controls={\`panel\${chapter?.id}-content\`}
          id={\`panel\${chapter?.id}-header\`}
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
`);

// Chapters.tsx
fs.writeFileSync(chaptersFile, `import { Fragment, useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useModal } from "../../../../hooks/useModal";
import { useParams } from "react-router-dom";
import { AddChapterModal } from "./AddChapterModal";
import { AddLessonForm } from "../lesson/AddLessonForm";
import { Chapter, CourseData } from "../../types";
import { useReorderChaptersMutation } from "../../api/chapterApi";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableChapterItem } from "./SortableChapterItem";
import { AddContentMenu } from "../content/AddContentMenu";

interface LessonsProps {
  courseData?: CourseData;
  chaptersData?: Chapter[];
  onChapterAdded?: () => void;
  onLessonAdded?: () => void;
}

export default function Lessons({ courseData, chaptersData, onChapterAdded, onLessonAdded }: LessonsProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { courseId } = useParams<{ courseId: string }>();
  const effectiveCourseId = Number(courseData?.id || courseId || 0);

  const [openEditorChapterId, setOpenEditorChapterId] = useState<number | null>(null);

  const {
    isOpen: isChapterModalOpen,
    closeModal: closeChapterModal,
    openModal: openChapterModal,
  } = useModal();

  const [addContentAnchor, setAddContentAnchor] = useState<{
    anchorEl: HTMLElement | null;
    chapterId: string | number;
    lessonId: string | number;
  } | null>(null);

  const [reorderChapters] = useReorderChaptersMutation();

  const [items, setItems] = useState<Chapter[]>(chaptersData || []);

  useEffect(() => {
    if (chaptersData) {
      setItems(chaptersData);
    }
  }, [chaptersData]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((c) => c.id === active.id);
    const newIndex = items.findIndex((c) => c.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);

    try {
      await reorderChapters({
        courseId: effectiveCourseId,
        orderedIds: reordered.map((c) => c.id),
      }).unwrap();
    } catch (err) {
      console.error("Failed to reorder chapters", err);
      setItems(items);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "12px", md: "16px" }, p: { xs: 1, sm: 2, md: 0 } }}>
      {!openEditorChapterId && (
        <Fragment>
          {!chaptersData || !Array.isArray(chaptersData) || chaptersData.length === 0 ? (
            <Box sx={{ display: "grid", placeItems: "center", p: 10 }}>
              <Typography color="textSecondary">
                {!chaptersData ? "Loading chapters..." : "No chapters available. Add a new chapter to get started."}
              </Typography>
            </Box>
          ) : (
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                {items.map((chapter: Chapter) => (
                  <SortableChapterItem
                    key={chapter.id}
                    chapter={chapter}
                    courseId={effectiveCourseId}
                    onChapterAdded={onChapterAdded}
                    onLessonAdded={onLessonAdded}
                    setOpenEditorChapterId={setOpenEditorChapterId}
                    setAddContentAnchor={setAddContentAnchor}
                    isSmallScreen={isSmallScreen}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
          <Box sx={{ m: "auto", display: "flex", gap: { xs: "12px", md: "24px" }, flexDirection: { xs: "column", sm: "row" }, alignItems: "center", width: { xs: "100%", sm: "auto" } }}>
            <Button
              startIcon={<AddRoundedIcon />}
              fullWidth={isSmallScreen}
              onClick={openChapterModal}
              sx={{ fontSize: { xs: "14px", md: "16px" }, px: { xs: 2, md: 3 }, py: { xs: 1, md: 1.5 }, minHeight: { xs: 40, md: "auto" } }}
            >
              Add Chapter
            </Button>
          </Box>
        </Fragment>
      )}
      {openEditorChapterId !== null && (
        <AddLessonForm
          chapterId={openEditorChapterId}
          onClose={() => setOpenEditorChapterId(null)}
          onLessonAdded={onLessonAdded}
        />
      )}

      <AddContentMenu
        addContentAnchor={addContentAnchor}
        setAddContentAnchor={setAddContentAnchor}
        courseData={courseData}
      />

      <AddChapterModal
        onClose={closeChapterModal}
        open={isChapterModalOpen}
        onChapterAdded={onChapterAdded}
      />
    </Box>
  );
}
`);
