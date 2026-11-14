import { Box, Typography, Button, CircularProgress, Alert, Menu, MenuItem } from "@mui/material";
import ToolBar from "../../course-settings/components/index";
import CreateQuestionLayout from "../layout/CreateQuestionLayout";
import { useState, useEffect, useMemo } from "react";
import { AddCourseQuestionForm } from "./AddQuestion";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetCourseByIdQuery, useDeleteQuestionMutation, useGetContentTypeByIdQuery } from "../../course/api/courseApi";
import CourseInfoHeader from "../components/CourseInfoHeader";
import QuestionTypeSelector from "../components/question-templates/QuestionTypeSelector";
import {
  useGetContentByTopicIdQuery,
  useLazyGetQuestionsByLessonIdQuery,
  useReorderLessonQuestionsMutation,
} from "../api/courseProgressApi";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewDialog from "../components/PreviewDialog";
import SortableQuestionItem from "../components/SortableQuestionItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";


interface QuestionItem {
  id: number;
  lessonId: number;
  queTypeId: number;
  score: number | null;
  contentTypeId: number;
  contentType?: string;

  title?: string;
  description?: string | object;
  html?: string;

  content?: {
    id?: number;
    title?: string;
    question?: string;
  };

  options?: Array<{
    id: number;
    mcqId: number;
    text: string;
  }>;
}

const QUESTION_TYPE_MAP: Record<number, { value: string; label: string }> = {
  1: { value: "multiple_choice", label: "Multiple Choice" },
  2: { value: "single_choice", label: "Single Choice" },
  3: { value: "fill_up", label: "Fill Ups" },
  4: { value: "subjective", label: "Subjective" },
  5: { value: "blog", label: "Blog" },
  6: { value: "video", label: "Video" },
  7: { value: "code", label: "Code" },
};

export default function QuestionCreateForm() {
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const rawContentTypeId = params.contentTypeId || location.state?.contentTypeId;
  const contentTypeId = rawContentTypeId ? Number(rawContentTypeId) : undefined;

  const courseIdParam = searchParams.get("courseId") || params.courseId;
  const courseId = courseIdParam ? Number(courseIdParam) : undefined;

  const defaultType = location.state?.type || null;

  const [addType, setAddType] = useState<string | null>(defaultType);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showForm, setShowForm] = useState(!!defaultType);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);


  const [actionAnchorEl, setActionAnchorEl] = useState<null | HTMLElement>(null);
  const [actionQuestion, setActionQuestion] = useState<QuestionItem | null>(null);
  const [isAddingMode, setIsAddingMode] = useState(!selectedId && !!defaultType);

  const handleActionMenuClick = (event: React.MouseEvent<HTMLElement>, q: QuestionItem) => {
    event.stopPropagation();
    setActionAnchorEl(event.currentTarget);
    setActionQuestion(q);
  };

  const handleActionMenuClose = () => {
    setActionAnchorEl(null);
    setActionQuestion(null);
  };

  const handleEditOption = () => {
    if (actionQuestion) {
      handleSidebarItemClick(actionQuestion);
    }
    handleActionMenuClose();
  };

  const handleDeleteOption = () => {
    if (actionQuestion) {
      handleDeleteQuestion(actionQuestion.id);
    }
    handleActionMenuClose();
  };

  const lessonIdParam = searchParams.get("lessonId") || params.lessonId;
  const lessonId = lessonIdParam ? Number(lessonIdParam) : undefined;


  /* =========================
  COURSE API
  ========================= */

  const {
    data: courseData,
    isFetching: isCourseFetching,
    isError: isCourseError,
  } = useGetCourseByIdQuery({ id: courseId! }, { skip: !courseId });

  const lessonCount = courseData?.data?.chapters?.length;
  const learnerCount = courseData?.data?.chapters?.length;

  const { data: contentTypeData } =
    useGetContentTypeByIdQuery(contentTypeId!, { skip: contentTypeId === undefined || isNaN(contentTypeId) });

  const dynamicOptions =
    contentTypeData?.data?.showContent
      ?.map((id: number) => QUESTION_TYPE_MAP[id])
      .filter(Boolean) || [];

  useEffect(() => {
    if (dynamicOptions.length > 0 && contentTypeId) {
      setAddType(dynamicOptions[0]?.value);
      setShowForm(true);
    }
  }, [dynamicOptions.length, contentTypeId]);



  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    error: questionsError,
    refetch: refetchQuestions,
  } = useGetContentByTopicIdQuery(
    { lessonId: lessonId!.toString(), courseId: courseId!.toString(), contentTypeId: contentTypeId!.toString() },
    { skip: !lessonId || !contentTypeId }

  );

  const fetchedQuestions: QuestionItem[] = useMemo(
    () =>
      Array.isArray(questionsData?.data)
        ? questionsData.data.flatMap((d: any) =>
            d.contents?.flatMap((c: any) => c.question || []) || []
          )
        : [],
    [questionsData]
  );

  /* =========================
  QUESTION REORDER
  ========================= */

  // Locally saved order (question IDs). Applied on top of the fetched list so the
  // UI updates instantly on drop; IDs not in it (e.g. newly added) go to the end.
  const [orderOverride, setOrderOverride] = useState<number[] | null>(null);
  const [isReordering, setIsReordering] = useState(false);
  const [fetchLessonQuestions] = useLazyGetQuestionsByLessonIdQuery();
  const [reorderLessonQuestions] = useReorderLessonQuestionsMutation();

  useEffect(() => {
    setOrderOverride(null);
  }, [lessonId, contentTypeId]);

  const questionsList: QuestionItem[] = useMemo(() => {
    if (!orderOverride) return fetchedQuestions;
    const rank = new Map(orderOverride.map((id, i) => [id, i]));
    return [...fetchedQuestions].sort(
      (a, b) => (rank.get(a.id) ?? Infinity) - (rank.get(b.id) ?? Infinity)
    );
  }, [fetchedQuestions, orderOverride]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleQuestionDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id || !lessonId) return;

    const prevOverride = orderOverride;
    const prevIds = questionsList.map((q) => q.id);
    const oldIndex = prevIds.indexOf(Number(active.id));
    const newIndex = prevIds.indexOf(Number(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    const newIds = arrayMove(prevIds, oldIndex, newIndex);
    setOrderOverride(newIds); // optimistic
    setIsReordering(true);

    try {
      // The API needs EVERY question ID in the lesson, but this page only lists one
      // content type. Fetch the full list and put the new order into the slots the
      // visible questions occupy, leaving the other questions where they are.
      const allQuestions = await fetchLessonQuestions(lessonId).unwrap();
      const allIds = [...allQuestions]
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((q) => q.id);
      const allIdSet = new Set(allIds);
      const visibleOrder = newIds.filter((id) => allIdSet.has(id));
      const visibleSet = new Set(visibleOrder);
      let next = 0;
      const merged = allIds.map((id) => (visibleSet.has(id) ? visibleOrder[next++] : id));

      const res: any = await reorderLessonQuestions({ lessonId, questions: merged }).unwrap();

      // Sync with the server's order from the response.
      if (Array.isArray(res?.data)) {
        setOrderOverride(
          [...res.data]
            .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
            .map((q: any) => q.id)
        );
      }
    } catch (err: any) {
      console.error(err);
      setOrderOverride(prevOverride); // put the old order back
      const message = err?.data?.errors?.[0]?.message || "Failed to reorder questions";
      alert(message);
    } finally {
      setIsReordering(false);
    }
  };

  useEffect(() => {
    if (questionsList.length > 0 && !selectedId && !isAddingMode) {
      setSelectedId(questionsList[0].id);
    }
  }, [questionsList, selectedId, isAddingMode]);


  const getQuestionDisplayText = (item: QuestionItem): string => {
    if (item.title) return item.title;
    if (item.content?.question) return item.content.question;
    if (typeof item.description === "string") {
      const text = item.description.replace(/<[^>]*>/g, "");
      if (text.trim()) return text;
    }
    return `Question ${item.id}`;
  };


  const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleTypeSelect = (type: string) => {
    setAddType(type);
    setSelectedId(null);
    setIsAddingMode(true);
    setShowForm(true);
    setFormKey((prev) => prev + 1);
    setAnchorEl(null);
  };

  const handleFormClose = () => {
    refetchQuestions();
    setFormKey(prev => prev + 1);
    if (contentTypeId) {
      setShowForm(false);
      setTimeout(() => setShowForm(true), 0);
    } else {
      setShowForm(false);
      setAddType(null);
      setIsAddingMode(false);
    }
  };


  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleDeleteQuestion = async (questionId: number) => {
    const confirmDelete = window.confirm("Delete this question?");
    if (!confirmDelete) return;

    try {
      await deleteQuestion({ id: questionId }).unwrap();
      alert("Question deleted successfully");
      refetchQuestions();
      setSelectedId(null);
      setIsAddingMode(false);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleSidebarItemClick = (item: any) => {
    const typeId = item.queTypeId || item.questiontypecon?.id;
    const mappedType = QUESTION_TYPE_MAP[typeId]?.value;
    setSelectedId(item.id);
    setIsAddingMode(false);
    if (mappedType) {
      setAddType(mappedType);
      setShowForm(true);
      setFormKey((prev) => prev + 1);
    }
  };
  return (
    <Box>
      <ToolBar courseName={courseData?.data?.title}>
        <CourseInfoHeader lessonCount={lessonCount} learnerCount={learnerCount} onPreviewClick={() => setPreviewOpen(true)} />
      </ToolBar>

      <Box
        sx={{
          display: "flex",
          height: "100vh",
          pt: 0,
          pr: "24px",
          pb: "24px",
          pl: "24px",
        }}
      >
        <CreateQuestionLayout
          heading="Questions Order"
          mainContent={
            showForm && addType ? (
              <AddCourseQuestionForm
                key={formKey}
                type={addType}
                courseId={courseId}
                lessonId={lessonId!}
                contentTypeId={contentTypeId}
                ContentType={location.state?.parentContentType || location.state?.type}
                onClose={handleFormClose}
                editData={selectedId ? questionsList.find((q) => q.id === selectedId) : undefined}
              />
            ) : (
              <Box sx={{ p: 4, color: "#888" }}>
                Select a question type to add a new question.
              </Box>
            )
          }
          sidebarContent={
            <>
              {/* ADD QUESTION */}
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddClick}
                  sx={{ mb: 2 }}
                >
                  Add Question
                </Button>

                <QuestionTypeSelector
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={handleMenuClose}
                  options={dynamicOptions}
                  onSelect={handleTypeSelect}
                />
              </Box>

              {/* QUESTION LIST */}
              <Box>
                {isLoadingQuestions ? (
                  <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : questionsError ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Failed to load questions. Please try again.
                  </Alert>
                ) : questionsList.length === 0 ? (
                  <Typography
                    sx={{ p: 2, color: "#888", textAlign: "center" }}
                  >
                    No questions found for this unit.
                  </Typography>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleQuestionDragEnd}
                  >
                    <SortableContext
                      items={questionsList.map((q) => q.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {questionsList.map((q) => (
                        <SortableQuestionItem
                          key={q.id}
                          id={q.id}
                          title={getQuestionDisplayText(q)}
                          score={q.score ?? 0}
                          selected={selectedId === q.id}
                          disabled={isReordering}
                          onClick={() => handleSidebarItemClick(q)}
                          onMenuClick={(e) => handleActionMenuClick(e, q)}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                )}
              </Box>

              <Menu
                anchorEl={actionAnchorEl}
                open={Boolean(actionAnchorEl)}
                onClose={handleActionMenuClose}
              >
                <MenuItem onClick={handleEditOption}>
                  <EditIcon fontSize="small" sx={{ mr: 1 }} />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteOption} sx={{ color: "error.main" }}>
                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                  Delete
                </MenuItem>
              </Menu>
            </>
          }
        />
      </Box>
      
      <PreviewDialog 
        open={previewOpen} 
        onClose={() => setPreviewOpen(false)} 
        questions={questionsList} 
      />
    </Box>
  );
}
