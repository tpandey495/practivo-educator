import {
  Box,
  Button,
  Divider,
  IconButton,
  Rating,
  Typography,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WestIcon from "@mui/icons-material/West";

import MoreButton from "../../../components/ui/MoreButton";
import PublishButton from "../../../components/ui/PublishButton";
import { useNavigate, useParams } from "react-router-dom";

// Added lessonCount and learnerCount to props
interface ToolBarProps {
  courseName?: string;
  children?: React.ReactNode;
  lessonCount?: number | string;
  learnerCount?: number | string;
}

const ToolBar = ({ 
  children, 
  courseName, 
  lessonCount = 0, 
  learnerCount = 0 
}: ToolBarProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: 2,
          columnGap: 3,
          paddingTop: { xs: 2, md: 3 },
          paddingBottom: { xs: 2, md: 1.5 },
          px: { xs: 2, md: 3 },
          marginBottom: { xs: 3, md: 4 },
          borderBottom: "1px solid rgba(148, 163, 184, 0.35)",
        }}
      >
        {/* Left Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Tooltip title="Go back">
            <IconButton onClick={() => navigate(-1)}>
              <WestIcon />
            </IconButton>
          </Tooltip>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: 700,
              color: theme.palette.text.primary,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {courseName || "Loading..."}
          </Typography>
        </Box>

        {/* Right Side - Passing props to children if they are the RightSideTools */}
        {children}
      </Box>
    </Box>
  );
};

export default ToolBar;

// Updated RightSideTools to accept props
export const RightSideTools = ({ 
  lessons = 0, 
  learners = 0 
}: { 
  lessons?: number | string; 
  learners?: number | string 
}) => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "flex-start", md: "flex-end" },
        gap: 1.5,
        flexWrap: "wrap",
      }}
    >
      <PublishButton />
      <Button
        variant="outlined"
        onClick={() => navigate(`/course-practice/${courseId}`)}
        sx={{
          padding: "12px 32px",
          height: "48px",
          color: "#4F39F6",
          border: "1px solid #4F39F6",
          borderRadius: "8px",
          textTransform: "none",
          "&:hover": {
            border: "2px solid #4F39F6",
            backgroundColor: "rgba(79, 57, 246, 0.04)",
          },
        }}
      >
        Preview
      </Button>
      <MoreButton />

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "rgba(148, 163, 184, 0.5)",
          mx: 1,
          display: { xs: "none", sm: "block" },
        }}
      />

      {/* Rating Section */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, minWidth: "60px" }}>
        <Rating size="small" readOnly defaultValue={0} />
        <Typography sx={{ color: "#667085", fontSize: "0.75rem", fontWeight: 500 }}>
          No Rating
        </Typography>
      </Box>

      {!isMobile && <Typography sx={{ color: "rgba(148, 163, 184, 0.6)" }}>/</Typography>}

      {/* Lessons Section - Dynamic */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "60px" }}>
        <Typography sx={{ color: theme.palette.text.primary, fontSize: "1rem", fontWeight: 600 }}>
          {lessons}
        </Typography>
        <Typography sx={{ color: "#667085", fontSize: "0.75rem", fontWeight: 500 }}>
          Lessons
        </Typography>
      </Box>

      {!isMobile && <Typography sx={{ color: "rgba(148, 163, 184, 0.6)" }}>/</Typography>}

      {/* Learners Section - Dynamic */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "60px" }}>
        <Typography sx={{ color: theme.palette.text.primary, fontSize: "1rem", fontWeight: 600 }}>
          {learners}
        </Typography>
        <Typography sx={{ color: "#667085", fontSize: "0.75rem", fontWeight: 500 }}>
          Learners
        </Typography>
      </Box>
    </Box>
  );
};