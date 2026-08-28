import { Box, Typography, Button, CircularProgress, Alert, IconButton, Menu, MenuItem } from "@mui/material";
import ToolBar from "../../course-settings/components/index";
import CreateQuestionLayout from "../layout/CreateQuestionLayout";
import { useState, useEffect } from "react";
import { AddCourseQuestionForm } from "./AddQuestion";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetCourseByIdQuery, useDeleteQuestionMutation, useGetContentTypeByIdQuery } from "../../course/api/courseApi";
import CourseInfoHeader from "../components/CourseInfoHeader";
import QuestionTypeSelector from "../components/question-templates/QuestionTypeSelector";
import { useGetContentByTopicIdQuery } from "../api/courseProgressApi";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";


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

  const [actionAnchorEl, setActionAnchorEl] = useState<null | HTMLElement>(null);
  const [actionQuestion, setActionQuestion] = useState<QuestionItem | null>(null);

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

  const questionsList: QuestionItem[] =
    Array.isArray(questionsData?.data)
      ? questionsData.data.flatMap((d: any) =>
          d.contents?.flatMap((c: any) => c.question || []) || []
        )
      : [];

  useEffect(() => {
    if (questionsList.length > 0 && !selectedId) {
      setSelectedId(questionsList[0].id);
    }
  }, [questionsList, selectedId]);


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
    setShowForm(true);
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
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleSidebarItemClick = (item: QuestionItem) => {
    const mappedType = QUESTION_TYPE_MAP[item.queTypeId]?.value;
    setSelectedId(item.id);
    if (mappedType) {
      setAddType(mappedType);
      setShowForm(true);
      setFormKey((prev) => prev + 1);
    }
  };
  return (
    <Box>
      <ToolBar courseName={courseData?.data?.title}>
        <CourseInfoHeader lessonCount={lessonCount} learnerCount={learnerCount} />
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
                  questionsList.map((q) => (
                    <Box
                      key={q.id}
                      sx={{
                        border:
                          selectedId === q.id
                            ? "1px solid #4F39F6"
                            : "1px solid #CCCCCC",
                        borderLeft:
                          selectedId === q.id
                            ? "4px solid #4F39F6"
                            : "1px solid #CCCCCC",
                        p: "16px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        mb: "16px",
                        height: "44px",
                      }}
                    >
                      {/* CLICK AREA */}
                      <Box
                        onClick={() => handleSidebarItemClick(q)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flex: 1,
                          cursor: "pointer",
                        }}
                      >
                        <Typography>
                          {getQuestionDisplayText(q)}
                        </Typography>
                      </Box>

                      {/* SCORE */}
                      <Typography sx={{ ml: 2 }}>
                        {q.score ?? 0}
                      </Typography>

                      {/* ACTION MENU BUTTON  */}
                      <IconButton
                        size="small"
                        onClick={(e) => handleActionMenuClick(e, q)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))
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
    </Box>
  );
}
