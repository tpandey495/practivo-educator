import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import ToolBar from "../../course-settings/components/index";
import MoreButton from "../../../components/ui/MoreButton";
import PublishButton from "../../../components/ui/PublishButton";
import CreateContentLayout from "../layout/CreateContentLayout";
import { useState, useEffect } from "react";
import { AddCourseContentForm } from "./AddContent";
import { useLocation, useParams } from "react-router-dom";
import { useGetUnitsWithQuestionsQuery } from "../../lesson-management/api/chapterApi";
import { useGetCourseByIdQuery } from "../../course/api/courseApi";

import CourseInfoHeader from "../components/CourseInfoHeader";
import ContentTypeSelector from "../components/ContentTypeSelector";

// ✅ Updated Interface based on your API response
interface Content {
  id: number;
  unitId: number;
  queTypeId: number;
  score: number | null;
  contentTypeId: number;
  contentType?: string;

  // API fields
  title?: string;
  description?: string | object;
  html?: string;

  // nested structure
  content?: {
    id?: number;
    title?: string;
    question?: string;
  };

  // Options for MCQ
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
  { value: "video", label: "Video" }
];

export default function ContentCreateForm() {
  const location = useLocation();
  const params = useParams();
  const defaultType = location.state?.type || null;

  const [addType, setAddType] = useState(defaultType);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showForm, setShowForm] = useState(!!defaultType);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ✅ Route Params
  const courseId = params.courseId ? Number(params.courseId) : undefined;
  const unitId = params.unitId ? Number(params.unitId) : undefined;

  // Fetch course data to get course name
  const {
    data: courseData,
    isFetching: isCourseFetching,
    isError: isCourseError
  } = useGetCourseByIdQuery(
    { id: courseId! },
    { skip: !courseId }
  );

  // ✅ API Call
  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    error: questionsError,
    refetch: refetchQuestions,
  } = useGetUnitsWithQuestionsQuery(
    { unitId: unitId!.toString(), courseId: courseId!.toString() },
    { skip: !unitId }
  );

  // ✅ Normalize API Response
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const content: Content[] = (() => {
    if (Array.isArray(questionsData)) {
      return questionsData;
    }
    if (Array.isArray(questionsData?.questions)) {
      return questionsData.questions;
    }
    if (Array.isArray(questionsData?.data)) {
      return questionsData.data;
    }
    return [];
  })();

  // ✅ Auto select first item
  useEffect(() => {
    if (content.length > 0 && !selectedId) {
      setSelectedId(content[0].id);
    }
  }, [content, selectedId]);

  // ✅ Title extractor (Main Fix)
  const getContentDisplayText = (item: Content): string => {
    // 1. Direct title from API
    if (item?.title) return item.title;

    // 2. Nested title
    if (item?.content?.title) return item.content.title;

    // 3. Question fallback
    if (item?.content?.question) return item.content.question;

    // 4. If description is object
    if (item?.description && typeof item.description === "object") {

      return (item.description as { title?: string }).title || "";
    }

    return `Content ${item.id}`;
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
    setShowForm(false);
    setAddType(null);
    refetchQuestions(); // refresh list
  };

  return (
    <Box>
      <ToolBar courseName={courseData?.data?.title}>
        <CourseInfoHeader />
      </ToolBar>

      <Box sx={{ display: "flex", height: "100vh", pt: 0, pr: "24px", pb: "24px", pl: "24px" }}>
        <CreateContentLayout
          heading="Questions Order"
          mainContent={
            <>
              {showForm && addType && unitId ? (
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
              )}
            </>
          }
          sidebarContent={
            <>
              {/* Add Button */}
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

              {/* ✅ Content List */}
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
                        p: "16px",
                        borderLeft:
                          selectedId === c.id
                            ? "4px solid #4F39F6"
                            : "1px solid #CCCCCC",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        mb: "16px",
                        height: "44px",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedId(c.id)}
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
