import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

interface RightSideToolsProps {
  lessonCount: number;
  learnerCount: number;
  onPreviewClick?: () => void;
}

const RightSideTools: React.FC<RightSideToolsProps> = ({ lessonCount, learnerCount, onPreviewClick }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const courseIdParam = searchParams.get("courseId") || params.courseId;
  const lessonIdParam = searchParams.get("lessonId") || params.lessonId;

  const handlePreview = () => {
    if (onPreviewClick) {
      onPreviewClick();
    } else {
      navigate(`/course/content/preview?lessonId=${lessonIdParam}&courseId=${courseIdParam}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "48px",
      }}
    >
      <Button variant="outlined" color="primary" onClick={handlePreview} sx={{ mr: 2 }}>
        Preview
      </Button>

      {/* Dynamic Lesson Display */}
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {lessonCount}
        </Typography>
        <Typography variant="caption">
          {lessonCount === 1 ? "Lesson" : "Lessons"}
        </Typography>
      </Box>

      <Typography sx={{ color: "#000000" }}>/</Typography>

      {/* Dynamic Learner Display */}
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {learnerCount}
        </Typography>
        <Typography variant="caption">
          {learnerCount === 1 ? "Learner" : "Learners"}
        </Typography>
      </Box>
    </Box>
  );
};

export default RightSideTools;