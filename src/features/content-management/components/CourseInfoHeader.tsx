import { Box, Typography } from "@mui/material";
import PublishButton from "../../../components/ui/PublishButton";

interface RightSideToolsProps {
  lessonCount: number;
  learnerCount: number;
}

const RightSideTools: React.FC<RightSideToolsProps> = ({ lessonCount, learnerCount }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "48px",
      }}
    >
      <PublishButton />

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