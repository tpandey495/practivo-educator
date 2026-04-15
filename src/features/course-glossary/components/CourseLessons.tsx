import { Box, Button, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface CourseLessonsProps {
  chapters: any[] | undefined;
}

export default function CourseLessons({ chapters }: CourseLessonsProps) {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const handleStartLesson = (unitId: string) => {
    // Navigate to course practice page
    navigate(`/course-practice/${courseId}`);
  };

  if (!chapters || chapters.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          pt: { xs: 2, md: 3 },
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No lessons available for this course.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1.5, md: 2 },
        width: "100%",
        pt: { xs: 2, md: 3 },
      }}
    >

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {chapters.map((chapter, chapterIdx) => (
          <Accordion
            key={chapterIdx}
            sx={{
              boxShadow: "none",
              border: "1px solid #E2E8F0",
              borderRadius: 2,
              "&:before": {
                display: "none",
              },
              "&.Mui-expanded": {
                margin: 0,
              },
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#4F39F6",
                boxShadow: "0 2px 8px rgba(79, 57, 246, 0.1)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: "#4F39F6" }} />
              }
              aria-controls={`panel${chapterIdx}-content`}
              id={`panel${chapterIdx}-header`}
              sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 1.5, md: 2 },
                "&.Mui-expanded": {
                  minHeight: 56,
                },
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                  "&.Mui-expanded": {
                    margin: 0,
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 0 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1.5,
                      bgcolor: "#F1E5FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4F39F6",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    {chapterIdx + 1}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: 600,
                      color: "#0F172A",
                    }}
                  >
                    {chapter?.title || `Chapter ${chapterIdx + 1}`}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: { xs: "12px", md: "14px" },
                    fontWeight: 500,
                  }}
                >
                  {chapter?.units?.length || 0} {chapter?.units?.length === 1 ? "Lesson" : "Lessons"}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pl: { xs: 0, md: 5 } }}>
                {chapter?.units?.map((unit: any, unitIdx: number) => (
                  <Box
                    key={unitIdx}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #E2E8F0",
                      borderRadius: 2,
                      padding: { xs: "12px 16px", md: "16px 24px" },
                      backgroundColor: "#FAFBFC",
                      transition: "all 0.2s ease",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 1.5, sm: 2 },
                      "&:hover": {
                        borderColor: "#4F39F6",
                        backgroundColor: "#FBF8FF",
                        boxShadow: "0 2px 4px rgba(79, 57, 246, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: "white",
                          border: "1px solid #E2E8F0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#4F39F6",
                        }}
                      >
                        <PlayArrowIcon sx={{ fontSize: 20 }} />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: { xs: "13px", md: "16px" },
                          fontWeight: 500,
                          color: "#1E293B",
                        }}
                      >
                        {unit?.title || `Lesson ${unitIdx + 1}`}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      // onClick={() => handleStartLesson(unit?.id)}
                      startIcon={<PlayArrowIcon />}
                      sx={{
                        bgcolor: "#4F39F6",
                        color: "#fff",
                        fontSize: { xs: "12px", md: "14px" },
                        fontWeight: 600,
                        px: { xs: 2, md: 3 },
                        py: { xs: 0.75, md: 1 },
                        borderRadius: 2,
                        textTransform: "none",
                        boxShadow: "0 2px 4px rgba(79, 57, 246, 0.2)",
                        transition: "all 0.2s ease",
                        width: { xs: "100%", sm: "auto" },
                        "&:hover": {
                          bgcolor: "#3E2DC4",
                          color: "#FFFFFF",
                          boxShadow: "0 4px 6px rgba(79, 57, 246, 0.3)",
                          transform: "translateY(-1px)",
                        },
                        "&:active": {
                          transform: "translateY(0)",
                        },
                      }}
                    >
                      Start
                    </Button>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

