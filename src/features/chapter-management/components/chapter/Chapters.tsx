import { Fragment, useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useModal } from "../../../../hooks/useModal";
import { useParams } from "react-router-dom";
import { AddChapterModal } from "./AddChapterModal";
import { AddLessonForm } from "../lesson/AddLessonForm";
import { Chapter, CourseData } from "../../types";
import { useReorderChaptersMutation, useGetChaptersQuery } from "../../api/chapterApi";
import { useGetCourseByIdQuery } from "../../../course/api/courseApi";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableChapterItem } from "./SortableChapterItem";
import { AddContentMenu } from "../content/AddContentMenu";

interface chapterProps {
  onChapterAdded?: () => void;
  onLessonAdded?: () => void;
}

export default function Chapters({ onChapterAdded, onLessonAdded }: chapterProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { courseId } = useParams<{ courseId: string }>();

  // Fetch course data
  const {
    data: courseDataWrapper,
    isLoading: isCourseLoading,
    error: courseError,
  } = useGetCourseByIdQuery(
    {
      id: courseId ? Number(courseId) : 0,
    },
    {
      skip: !courseId || isNaN(Number(courseId)),
    }
  );
  const courseData = courseDataWrapper?.data;

  // Fetch chapters data
  const {
    data: chaptersDataResponse,
    isLoading: isChaptersLoading,
    error: chaptersError,
    refetch: refetchChapters,
  } = useGetChaptersQuery(
    {
      id: courseId || "",
      page: 1,
      limit: 100,
    },
    {
      skip: !courseId,
    }
  );

  const extractChaptersData = (data: any) => {
    if (!data) return null;
    if (Array.isArray(data)) return data;
    if (data.chapters && Array.isArray(data.chapters)) return data.chapters;
    if (data.data && Array.isArray(data.data)) return data.data;
    if (data.data && data.data.chapters && Array.isArray(data.data.chapters))
      return data.data.chapters;
    return null;
  };

  const chaptersData = extractChaptersData(chaptersDataResponse) || [];

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

  const [items, setItems] = useState<Chapter[]>([]);

  useEffect(() => {
    if (chaptersData) {
      setItems(chaptersData);
    }
  }, [chaptersDataResponse]);

  const handleChapterAdded = () => {
    refetchChapters();
    if (onChapterAdded) {
      onChapterAdded();
    }
  };

  const handleLessonAdded = () => {
    refetchChapters();
    if (onLessonAdded) {
      onLessonAdded();
    }
  };

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

  if (isCourseLoading || isChaptersLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (courseError || chaptersError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <Typography color="error">
          Error loading data: {courseError ? "Course data" : "Chapters data"}. Please try again.
        </Typography>
      </Box>
    );
  }

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
                    onChapterAdded={handleChapterAdded}
                    onLessonAdded={handleLessonAdded}
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
          onLessonAdded={handleLessonAdded}
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
        onChapterAdded={handleChapterAdded}
      />
    </Box>
  );
}
