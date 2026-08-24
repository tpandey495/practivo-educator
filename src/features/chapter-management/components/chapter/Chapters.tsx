import { Fragment, useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useModal } from "../../../../hooks/useModal";
import { useParams } from "react-router-dom";
import { AddChapterModal } from "./AddChapterModal";
import { AddUnitForm } from "../lesson/AddLessonForm";
import { Chapter, CourseData } from "../../types";
import {
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
  useReorderChaptersMutation,
} from "../../api/chapterApi";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

import { SortableChapterItem } from "./SortableChapterItem";
import { AddContentMenu } from "../content/AddContentMenu";

interface LessonsProps {
  courseData?: CourseData;
  chaptersData?: Chapter[];
  onChapterAdded?: () => void;
  onUnitAdded?: () => void;
}

export default function Lessons({ courseData, chaptersData, onChapterAdded, onUnitAdded }: LessonsProps) {
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

  // EDIT CHAPTER STATE
  const [editChapterId, setEditChapterId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const [updateChapter] = useUpdateChapterMutation();
  const [deleteChapter] = useDeleteChapterMutation();

  // UNIT EDIT STATE
  const [editLessonId, setEditLessonId] = useState<number | null>(null);
  const [editUnitTitle, setEditUnitTitle] = useState("");

  const [updateUnit] = useUpdateUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();

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

  const handleUnitEditClick = (unit: any) => {
    setEditLessonId(Number(unit.id));
    setEditUnitTitle(unit.title);
  };

  const handleEditClick = (chapter: any) => {
    setEditChapterId(Number(chapter.id));
    setEditTitle(chapter.title);
  };

  const handleDelete = async (chapterId: number | string) => {
    if (!effectiveCourseId) {
      alert("Course ID missing");
      return;
    }
    const confirmDelete = window.confirm("Are you sure you want to delete this chapter?");
    if (!confirmDelete) return;

    try {
      await deleteChapter({
        courseId: effectiveCourseId,
        chapterId: Number(chapterId),
      }).unwrap();
      alert("Chapter deleted successfully");
      onChapterAdded?.();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleUnitUpdate = async (lessonId: number | string) => {
    try {
      await updateUnit({
        lessonId: Number(lessonId),
        title: editUnitTitle,
      }).unwrap();
      alert("Unit updated successfully");
      setEditLessonId(null);
      onUnitAdded?.();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleUnitDelete = async (lessonId: number | string) => {
    const confirmDelete = window.confirm("Delete this unit?");
    if (!confirmDelete) return;

    try {
      await deleteUnit({ lessonId: Number(lessonId) }).unwrap();
      alert("Unit deleted");
      onUnitAdded?.();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleUpdate = async (chapterId: number | string) => {
    try {
      await updateChapter({
        courseId: effectiveCourseId,
        chapterId: Number(chapterId),
        title: editTitle,
      }).unwrap();
      alert("Chapter updated successfully");
      setEditChapterId(null);
      onChapterAdded?.();
    } catch (err) {
      alert("Update failed");
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
                    editChapterId={editChapterId}
                    editTitle={editTitle}
                    setEditChapterId={setEditChapterId}
                    setEditTitle={setEditTitle}
                    handleUpdate={handleUpdate}
                    handleEditClick={handleEditClick}
                    handleDelete={handleDelete}
                    setOpenEditorChapterId={setOpenEditorChapterId}

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
        <AddUnitForm
          chapterId={openEditorChapterId}
          onClose={() => setOpenEditorChapterId(null)}
          onUnitAdded={onUnitAdded}
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
