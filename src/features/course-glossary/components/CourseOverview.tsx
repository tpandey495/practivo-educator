import { Box, Typography, Chip, Stack, Divider } from "@mui/material";
import { ICourse } from "../../../types/course.types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import LanguageIcon from "@mui/icons-material/Language";

interface CourseOverviewProps {
  course: ICourse | undefined;
}

export default function CourseOverview({ course }: CourseOverviewProps) {
  const description = course?.description || "No description available for this course.";
  const paragraphs = description.split("\n").filter((p) => p.trim().length > 0);

  // ✅ Dynamic from API
  const duration = course?.duration ?? "N/A";
  const language = course?.language ?? "N/A"; // string or string[]
  const level = course?.level ?? "N/A";

  // ✅ API field name = objective
  const learnItems = Array.isArray(course?.objective) ? course.objective : [];

  // Helper for language display
  const displayLanguage = Array.isArray(language)
    ? language.map((lang) => lang.toUpperCase()).join(", ")
    : language?.toUpperCase() || "N/A";

  return (
    <Box sx={{ width: "100%", pt: { xs: 3, md: 4 } }}>
      {/* About */}
      <Box sx={{ mb: { xs: 4, md: 5 } }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "18px", md: "20px", lg: "22px" },
            fontWeight: 600,
            color: "#0F172A",
            mb: 3,
          }}
        >
          About this course
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {paragraphs.map((paragraph, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                fontSize: { xs: "15px", md: "16px", lg: "17px" },
                color: "#475569",
                lineHeight: 1.8,
                textAlign: "justify",
              }}
            >
              {paragraph.trim()}
            </Typography>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: { xs: 4, md: 5 } }} />

      {/* What you'll learn */}
      {learnItems.length > 0 && (
        <>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "18px", md: "20px", lg: "22px" },
                fontWeight: 600,
                color: "#0F172A",
                mb: 3,
              }}
            >
              What you'll learn
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: { xs: 2, md: 3 },
              }}
            >
              {learnItems.map((item: string, index: number) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#FBF8FF",
                    border: "1px solid #F1E5FF",
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      bgcolor: "#4F39F6",
                      flexShrink: 0,
                      mt: 0.5,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", md: "15px" },
                      color: "#1E293B",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: { xs: 4, md: 5 } }} />
        </>
      )}

      {/* Course Details */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "18px", md: "20px", lg: "22px" },
            fontWeight: 600,
            color: "#0F172A",
            mb: 3,
          }}
        >
          Course details
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {/* Duration */}
          <Box sx={cardStyle}>
            <Box sx={labelStyle}>
              <AccessTimeIcon sx={{ fontSize: 20, color: "#4F39F6" }} />
              <Typography sx={smallLabel}>Duration</Typography>
            </Box>
            <Typography sx={valueStyle}>
              {typeof duration === "number" ? `${duration} Hours` : duration}
            </Typography>
          </Box>

          {/* Level */}
          <Box sx={cardStyle}>
            <Box sx={labelStyle}>
              <SchoolIcon sx={{ fontSize: 20, color: "#4F39F6" }} />
              <Typography sx={smallLabel}>Level</Typography>
            </Box>
            <Typography sx={valueStyle}>{level}</Typography>
          </Box>

          {/* Language */}
          <Box sx={cardStyle}>
            <Box sx={labelStyle}>
              <LanguageIcon sx={{ fontSize: 20, color: "#4F39F6" }} />
              <Typography sx={smallLabel}>Language</Typography>
            </Box>
            <Typography sx={valueStyle}>{displayLanguage}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Tags */}
      {course?.tags && course.tags.length > 0 && (
        <>
          <Divider sx={{ my: { xs: 4, md: 5 } }} />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "18px", md: "20px", lg: "22px" },
                fontWeight: 600,
                color: "#0F172A",
                mb: 2.5,
              }}
            >
              Topics covered
            </Typography>

            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              {course.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{
                    bgcolor: "#F1E5FF",
                    color: "#4F39F6",
                    fontWeight: 500,
                    fontSize: "13px",
                    height: 32,
                  }}
                />
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
}

const cardStyle = {
  p: 2.5,
  borderRadius: 2,
  bgcolor: "#F8FAFC",
  border: "1px solid #E2E8F0",
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

const smallLabel = {
  fontSize: "12px",
  color: "#64748B",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

const valueStyle = {
  fontSize: { xs: "16px", md: "18px" },
  color: "#0F172A",
  fontWeight: 600,
};