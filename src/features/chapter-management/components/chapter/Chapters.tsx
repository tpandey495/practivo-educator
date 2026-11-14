import { Fragment, useState, useEffect, useRef } from "react";
import { Box, Button, Typography, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useModal } from "../../../../hooks/useModal";
import { useParams } from "react-router-dom";
import { AddChapterModal } from "./AddChapterModal";
import { AddLessonForm } from "../lesson/AddLessonForm";
import { Chapter, CurriculumReorderChapter } from "../../types";
import { useReorderCurriculumMutation, useGetChaptersQuery } from "../../api/chapterApi";
import { useGetCourseByIdQuery } from "../../../course/api/courseApi";
import {
  DndContext,
  closestCenter,
  pointerWithin,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  CollisionDetection,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableChapterItem, chapterDndId } from "./SortableChapterItem";

type DragType = "chapter" | "lesson";
const dragType = (data: any): DragType | undefined => data?.current?.type;

/** Build the payload for PUT /course/:courseId/curriculum/reorder from the current UI order. */
const toReorderPayload = (chapters: Chapter[]): CurriculumReorderChapter[] =>
  chapters.map((chapter) => ({
    id: Number(chapter.id),
    lessons: (chapter.lessons ?? []).map((lesson) => Number(lesson.id)),
  }));

const findChapterIndexOfLesson = (chapters: Chapter[], lessonId: string | number) =>
  chapters.findIndex((c) => (c.lessons ?? []).some((l) => l.id === lessonId));

/**
 * Chapters only collide with chapters. Lessons prefer the lesson under the pointer,
 * then the chapter under the pointer (covers empty / collapsed chapters and headers).
 */
const collisionDetection: CollisionDetection = (args) => {
  const ofType = (type: DragType) =>
    args.droppableContainers.filter((c) => c.data.current?.type === type);

  if (dragType(args.active.data) === "chapter") {
    return closestCenter({ ...args, droppableContainers: ofType("chapter") });
  }

  const lessonHits = pointerWithin({ ...args, droppableContainers: ofType("lesson") });
  if (lessonHits.length > 0) return lessonHits;

  const chapterHits = pointerWithin({ ...args, droppableContainers: ofType("chapter") });
  if (chapterHits.length > 0) return chapterHits;

  return closestCenter({ ...args, droppableContainers: ofType("lesson") });
};
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

  const [reorderCurriculum] = useReorderCurriculumMutation();

  const [items, setItems] = useState<Chapter[]>([]);
  // Order before the current drag started, used to diff and to roll back on failure.
  const dragSnapshot = useRef<Chapter[] | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (chaptersData && !dragSnapshot.current) {
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

  const handleDragStart = (_event: DragStartEvent) => {
    dragSnapshot.current = items;
  };

  // Moving a lesson into a different chapter happens live while dragging,
  // so the target chapter's list can open a gap for it.
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || dragType(active.data) !== "lesson") return;

    const lessonId = active.data.current?.lessonId;
    const overType = dragType(over.data);

    setItems((prev) => {
      const fromIndex = findChapterIndexOfLesson(prev, lessonId);
      const toIndex =
        overType === "lesson"
          ? findChapterIndexOfLesson(prev, over.data.current?.lessonId)
          : prev.findIndex((c) => c.id === over.data.current?.chapterId);

      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return prev;

      const fromLessons = [...(prev[fromIndex].lessons ?? [])];
      const toLessons = [...(prev[toIndex].lessons ?? [])];
      const [moved] = fromLessons.splice(
        fromLessons.findIndex((l) => l.id === lessonId),
        1
      );

      let insertAt = toLessons.length;
      if (overType === "lesson") {
        const overIndex = toLessons.findIndex((l) => l.id === over.data.current?.lessonId);
        const translated = active.rect.current.translated;
        const isBelow =
          !!translated && translated.top > over.rect.top + over.rect.height / 2;
        insertAt = overIndex + (isBelow ? 1 : 0);
      }
      toLessons.splice(insertAt, 0, moved);

      const next = [...prev];
      next[fromIndex] = { ...prev[fromIndex], lessons: fromLessons };
      next[toIndex] = { ...prev[toIndex], lessons: toLessons };
      return next;
    });
  };

  const handleDragCancel = () => {
    if (dragSnapshot.current) setItems(dragSnapshot.current);
    dragSnapshot.current = null;
  };

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    const before = dragSnapshot.current ?? items;
    let next = items;

    if (over && active.id !== over.id) {
      if (dragType(active.data) === "chapter") {
        const oldIndex = items.findIndex((c) => chapterDndId(c.id) === active.id);
        const newIndex = items.findIndex((c) => chapterDndId(c.id) === over.id);
        if (oldIndex !== -1 && newIndex !== -1) next = arrayMove(items, oldIndex, newIndex);
      } else if (dragType(over.data) === "lesson") {
        // Same-chapter reorder (cross-chapter moves were already applied in dragOver).
        const lessonId = active.data.current?.lessonId;
        const overLessonId = over.data.current?.lessonId;
        const chapterIndex = findChapterIndexOfLesson(items, lessonId);
        if (chapterIndex !== -1 && chapterIndex === findChapterIndexOfLesson(items, overLessonId)) {
          const lessons = items[chapterIndex].lessons ?? [];
          const oldIndex = lessons.findIndex((l) => l.id === lessonId);
          const newIndex = lessons.findIndex((l) => l.id === overLessonId);
          next = [...items];
          next[chapterIndex] = { ...items[chapterIndex], lessons: arrayMove(lessons, oldIndex, newIndex) };
        }
      }
    }

    const payload = toReorderPayload(next);
    if (JSON.stringify(payload) === JSON.stringify(toReorderPayload(before))) {
      dragSnapshot.current = null;
      setItems(before);
      return;
    }

    setItems(next);
    try {
      await reorderCurriculum({ courseId: effectiveCourseId, chapters: payload }).unwrap();
    } catch (err: any) {
      console.error("Failed to reorder curriculum", err);
      setItems(before);
      alert(err?.data?.errors?.[0]?.message || "Failed to save the new order");
    } finally {
      dragSnapshot.current = null;
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
            <DndContext
              sensors={sensors}
              collisionDetection={collisionDetection}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext items={items.map((c) => chapterDndId(c.id))} strategy={verticalListSortingStrategy}>
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
