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
import MoreButton from "@components/ui/MoreButton";
import PublishButton from "@components/ui/PublishButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUpdateCourseMutation } from "../api/courseApi";

// 1. Define the Props Interface
interface RightSideToolsProps {
  rating?: number;
  lessonCount?: number;
  learnerCount?: number;
}
const ToolBar = ({ 
  children, 
  courseName, 
  previousPage 
}: { 
  courseName?: string; 
  children: React.ReactNode; 
  previousPage?: string 
}) => {
  const theme = useTheme();
  
  const iconButtonSx = {
    width: 40,
    height: 40,
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.4)",
    color: "#475467",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#4F39F6",
      color: "#4F39F6",
      boxShadow: "0 6px 16px rgba(79, 57, 246, 0.18)",
      backgroundColor: "rgba(79, 57, 246, 0.04)",
    },
    "& svg": {
      fontSize: "1.15rem",
    },
  };
  
  
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
          paddingBottom: { xs: 2, md: 1.5 },
          marginBottom: { xs: 3, md: 4 },
          borderBottom: "1px solid rgba(148, 163, 184, 0.35)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Tooltip title="Go back">
            <IconButton
              component={Link}
              to={previousPage || "/courses"}
              sx={{ ...iconButtonSx, textDecoration: "none" }}
            >
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
            {courseName || "Course Name"}
          </Typography>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

// 2. Destructure props with default values
export const RightSideTools = ({ 
  rating = 0, 
  lessonCount = 0, 
  learnerCount = 0 
}: RightSideToolsProps) => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const handleEditCourse = async () => {
    if (!courseId) return;
  
    try {
      const formData = new FormData();
      formData.append("active", "true"); 
  
      await updateCourse({
        id: courseId,
        body: formData,
      }).unwrap();
  
      console.log("Course Activated (Published)");
    } catch (err) {
      console.error("Error publishing", err);
    }
  };
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
      {/* <PublishButton /> */}
      {/* publish replaced btn  */}
      <Button variant="outlined" color="primary"
     onClick={handleEditCourse}>
  Publish
</Button>
      <Button
        variant="outlined"
        onClick={() => navigate(`/course-practice/${courseId}`)}
        sx={{
          padding: "10px 24px",
          height: "40px",
          color: "#4F39F6",
          border: "1px solid rgba(148, 163, 184, 0.4)",
          borderRadius: "12px",
          backgroundColor: "#fff",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.95rem",
          "&:hover": {
            borderColor: "#4F39F6",
            boxShadow: "0 6px 16px rgba(79, 57, 246, 0.18)",
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

      {/* --- Dynamic Rating --- */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, minWidth: "60px" }}>
        <Rating
          size="small"
          readOnly
          value={rating} // Dynamic Value
          precision={0.5}
          sx={{
            "& .MuiRating-iconEmpty": { color: "rgba(148, 163, 184, 0.6)" },
            "& .MuiRating-iconFilled": { color: "#F59E0B" },
          }}
        />
        <Typography sx={{ color: "#667085", fontSize: "0.75rem", fontWeight: 500 }}>
          {rating > 0 ? `${rating} Rating` : "No Rating"}
        </Typography>
      </Box>

      {!isMobile && <Typography sx={{ color: "rgba(148, 163, 184, 0.6)" }}>/</Typography>}

      {/* --- Dynamic Lessons --- */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "60px" }}>
        <Typography sx={{ color: theme.palette.text.primary, fontSize: "1rem", fontWeight: 600 }}>
          {lessonCount}
        </Typography>
        <Typography sx={{ color: "#667085", fontSize: "0.75rem", fontWeight: 500 }}>
          Lessons
        </Typography>
      </Box>

      {!isMobile && <Typography sx={{ color: "rgba(148, 163, 184, 0.6)" }}>/</Typography>}

      {/* --- Dynamic Learners --- */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "60px" }}>
        <Typography sx={{ color: theme.palette.text.primary, fontSize: "1rem", fontWeight: 600 }}>
          {learnerCount}
        </Typography>
        <Typography sx={{ color: "#667085", fontSize: "0.75rem", fontWeight: 500 }}>
          Learners
        </Typography>
      </Box>
    </Box>
  );
};

export default ToolBar;