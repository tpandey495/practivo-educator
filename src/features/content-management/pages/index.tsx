import { Box, Typography, Button, CircularProgress, Alert, IconButton } from "@mui/material";
import ToolBar from "../../course-settings/components/index";
// import MoreButton from "../../../components/ui/MoreButton";
// import PublishButton from "../../../components/ui/PublishButton";
import CreateContentLayout from "../layout/CreateContentLayout";
import { useState, useEffect } from "react";
import { AddCourseContentForm } from "./AddContent";
import { useLocation, useParams } from "react-router-dom";
import { useGetCourseByIdQuery, useDeleteQuestionMutation, useGetContentTypeByIdQuery } from "../../course/api/courseApi";
import CourseInfoHeader from "../components/CourseInfoHeader";
import ContentTypeSelector from "../components/ContentTypeSelector";
import { useGetContentByTopicIdQuery } from "../../course-practice/api/courseProgressApi";// delete icon 
import DeleteIcon from "@mui/icons-material/Delete";


interface Content {
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

export default function ContentCreateForm() {
  const location = useLocation(); // ← yeh missing tha bhi
  const params = useParams();
  const rawContentTypeId = useParams().contentTypeId || location.state?.contentTypeId;
  const contentTypeId = rawContentTypeId ? Number(rawContentTypeId) : undefined;

  const courseId = params.courseId ? Number(params.courseId) : undefined;
  const unitId = params.unitId ? Number(params.unitId) : undefined;

  const defaultType = location.state?.type || null;

  const [addType, setAddType] = useState<string | null>(defaultType);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showForm, setShowForm] = useState(!!defaultType);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formKey, setFormKey] = useState(0);

  const lessonId = params.lessonId ? Number(params.lessonId) : undefined;


  /* =========================
  COURSE API
  ========================= */

  const {
    data: courseData,
    isFetching: isCourseFetching,
    isError: isCourseError,
  } = useGetCourseByIdQuery({ id: courseId! }, { skip: !courseId });

  const { data: contentTypeData, isLoading: isLoadingTypes } =
    useGetContentTypeByIdQuery(contentTypeId!, { skip: contentTypeId === undefined || isNaN(contentTypeId) });

  const dynamicOptions =
    contentTypeData?.data?.showContent
      ?.map((id: number) => QUESTION_TYPE_MAP[id])
      .filter(Boolean) || [];

  console.log(contentTypeData);

  useEffect(() => {
    if (dynamicOptions.length > 0 && contentTypeId) {
      setAddType(dynamicOptions[0]?.value); // param se pehla type set karo
      setShowForm(true);
    }
  }, [dynamicOptions.length, contentTypeId]);

  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    error: questionsError,
    refetch: refetchQuestions,
  } = useGetContentByTopicIdQuery(
    { lessonId: lessonId!.toString(), courseId: courseId!.toString() },
    { skip: !lessonId }
  );

  const lessonCount = courseData?.data?.chapters?.length;
  const learnerCount = courseData?.data?.chapters?.length;


  const content: Content[] =
    questionsData?.data?.contentTypes
      ?.flatMap((ct: any) => ct.questions || []) || [];

  // console.log("questionsData:", questionsData);
  // console.log("contentTypeId:", contentTypeId);
  // console.log("content array:", content);

  useEffect(() => {
    if (content.length > 0 && !selectedId) {
      setSelectedId(content[0].id);
    }
  }, [content, selectedId]);


  const getContentDisplayText = (item: Content): string => {
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

  const handleSidebarItemClick = (item: Content) => {
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
        <CreateContentLayout
          heading="Questions Order"
          mainContent={
            showForm && addType ? (
              <AddCourseContentForm
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
                Select a content type to add new content.
              </Box>
            )
          }
          sidebarContent={
            <>
              {/* ADD CONTENT */}
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

                <ContentTypeSelector
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={handleMenuClose}
                  options={dynamicOptions}
                  onSelect={handleTypeSelect}
                />
              </Box>

              {/* CONTENT LIST */}
              <Box>
                {isLoadingQuestions ? (
                  <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : questionsError ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Failed to load content. Please try again.
                  </Alert>
                ) : content.length === 0 ? (
                  <Typography
                    sx={{ p: 2, color: "#888", textAlign: "center" }}
                  >
                    No content found for this unit.
                  </Typography>
                ) : (
                  content.map((c) => (
                    <Box
                      key={c.id}
                      sx={{
                        border:
                          selectedId === c.id
                            ? "1px solid #4F39F6"
                            : "1px solid #CCCCCC",
                        borderLeft:
                          selectedId === c.id
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
                        onClick={() => handleSidebarItemClick(c)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flex: 1,
                          cursor: "pointer",
                        }}
                      >
                        <Typography>
                          {getContentDisplayText(c)}
                        </Typography>
                      </Box>

                      {/* SCORE */}
                      <Typography sx={{ ml: 2 }}>
                        {c.score ?? 0}
                      </Typography>

                      {/* DELETE BUTTON  */}
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteQuestion(c.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))
                )}
              </Box>
            </>
          }
        />
      </Box>
    </Box>
  );
}
