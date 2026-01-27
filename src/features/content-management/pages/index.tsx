import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import ToolBar from "../../course-settings/components/index";
import MoreButton from "../../../components/ui/MoreButton";
import PublishButton from "../../../components/ui/PublishButton";
import CreateContentLayout from "../layout/CreateContentLayout";
import { useState, useEffect } from "react";
import { AddCourseContentForm } from "./AddContent";
import { useLocation, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../course/api/courseApi";
import CourseInfoHeader from "../components/CourseInfoHeader";
import ContentTypeSelector from "../components/ContentTypeSelector";
import { useGetContentByTopicIdQuery } from "../../course-practice/api/courseProgressApi";


  //  TYPES


interface Content {
  id: number;
  unitId: number;
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

const CONTENT_TYPES = [
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "single_choice", label: "Single Choice" },
  { value: "fill_up", label: "Fill Ups" },
  { value: "subjective", label: "Subjective" },
  { value: "blog", label: "Blog" },
  { value: "video", label: "Video" },
  { value: "code", label: "Code" },
];

/* =========================
   COMPONENT
========================= */

export default function ContentCreateForm() {
  const location = useLocation();
  const params = useParams();

  const defaultType = location.state?.type || null;
  // Get parent content type from navigation state (video, quiz, assignment, code, blog)
  const parentContentType = location.state?.parentContentType || location.state?.type || null;

  const [addType, setAddType] = useState<string | null>(defaultType);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showForm, setShowForm] = useState(!!defaultType);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const courseId = params.courseId ? Number(params.courseId) : undefined;
  const unitId = params.unitId ? Number(params.unitId) : undefined;
  

  /* =========================
     COURSE API
  ========================= */

  const {
    data: courseData,
    isFetching: isCourseFetching,
    isError: isCourseError,
  } = useGetCourseByIdQuery(
    { id: courseId! },
    { skip: !courseId }
  );

  /* =========================
     CONTENT API
  ========================= */

  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    error: questionsError,
    refetch: refetchQuestions,
  } = useGetContentByTopicIdQuery(
    { unitId: unitId!.toString(), courseId: courseId!.toString() },
    { skip: !unitId }
  );
  const lessonCount = courseData?.data?.chapters?.length;
  const learnerCount = courseData?.data?.chapters?.length;
  /* =========================
     NORMALIZE API RESPONSE
  ========================= */

  const content: Content[] =
    questionsData?.data?.contentTypes?.flatMap(
      (ct: any) => ct.questions || []
    ) || [];

  /* =========================
     AUTO SELECT FIRST ITEM
  ========================= */

  useEffect(() => {
    if (content.length > 0 && !selectedId) {
      setSelectedId(content[0].id);
    }
  }, [content, selectedId]);

  /* =========================
     DISPLAY TITLE FIX
  ========================= */

  const getContentDisplayText = (item: Content): string => {
    if (item.title) return item.title;

    if (item.content?.question) return item.content.question;

    if (typeof item.description === "string") {
      const text = item.description.replace(/<[^>]*>/g, "");
      if (text.trim()) return text;
    }

    return `Question ${item.id}`;
  };

  /* =========================
     HANDLERS
  ========================= */

  const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleTypeSelect = (type: string) => {
    setAddType(type);
    setShowForm(true);
    setAnchorEl(null);
    // Preserve parent content type when selecting question type from selector
    // This ensures questions created via "Add Question" button also use parent contentTypeId
  };

  const handleFormClose = () => {
    setShowForm(false);
    setAddType(null);
    refetchQuestions();
  };

  /* =========================
     RENDER
  ========================= */

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
                type={addType}
                courseId={courseId}
                unitId={unitId}
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
                  options={CONTENT_TYPES}
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
                      onClick={() => setSelectedId(c.id)}
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
                        cursor: "pointer",
                      }}
                    >
                      <Typography>
                        {getContentDisplayText(c)}
                      </Typography>

                      <Typography sx={{ ml: "auto" }}>
                        {c.score ?? 0}
                      </Typography>
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
