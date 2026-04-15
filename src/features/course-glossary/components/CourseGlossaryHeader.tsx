import { Avatar, Box, Typography } from "@mui/material";
import { ICourse } from "../../../types/course.types";
import { useState, useRef, useEffect } from "react";

interface CourseGlossaryHeaderProps {
  course: ICourse | undefined;
  chapters: any[] | undefined;
  averageRating?: number | null;
  totalRatings?: number | null;
}

export default function CourseGlossaryHeader({
  course,
  chapters,
  averageRating,
  totalRatings
}: CourseGlossaryHeaderProps) {

  const totalLessons =
    chapters?.reduce((acc, chapter) => acc + (chapter?.units?.length || 0), 0) || 0;

  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current && course?.description) {
      const maxHeight = 120;
      const actualHeight = descriptionRef.current.scrollHeight;

      if (actualHeight > maxHeight) {
        setIsTruncated(true);
      } else {
        setIsTruncated(false);
      }
    }
  }, [course?.description]);

  const handleReadMore = () => {
    const overviewElement = document.getElementById("course-overview");

    if (overviewElement) {
      overviewElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
const level = course?.level || course?.difficulty || course?.courseLevel || "All Levels";
  return (
    <Box
      sx={{
        bgcolor: "#FEFBFF",
        border: "1px solid #F1E5FF",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2.5, md: 3 },
        alignItems: { xs: "center", md: "flex-start" },
        boxSizing: "border-box",
        borderRadius: 3,
        p: { xs: 3, md: 4 },
        width: "100%"
      }}
    >
      <Box
        sx={{
          gap: { xs: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
          width: "100%"
        }}
      >
        {/* Course Title */}
        <Box sx={{ position: "relative", width: "100%" }}>
          <Typography
            variant="h4"
            sx={{
              background:
                "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #4F39F6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              fontSize: { xs: "28px", sm: "36px", md: "44px", lg: "52px" },
              wordBreak: "break-word",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              mb: 0.5,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: 0,
                width: "60px",
                height: "4px",
                background:
                  "linear-gradient(90deg, #4F39F6 0%, #8B5CF6 100%)",
                borderRadius: "2px"
              }
            }}
          >
            {course?.title || "Course Title"}
          </Typography>
        </Box>

        {/* Description (UNCHANGED) */}
        <Box
          sx={{
            width: "100%",
            position: "relative",
            mt: { xs: 2.5, md: 3 },
            mb: 1,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "-16px",
              top: 0,
              bottom: 0,
              width: "4px",
              background:
                "linear-gradient(180deg, #4F39F6 0%, #8B5CF6 50%, #A78BFA 100%)",
              borderRadius: "2px",
              display: { xs: "none", md: "block" }
            }}
          />


          <Typography
            variant="body1"
            component="div"
            ref={descriptionRef}
            sx={{
              width: "100%",
              fontSize: { xs: "15px", md: "17px", lg: "19px" },
              wordBreak: "break-word",
              color: "#334155",
              lineHeight: 1.75,
              fontWeight: 400,
              pl: { xs: 0, md: 3 },
              overflow: isTruncated ? "hidden" : "visible",
              maxHeight: isTruncated ? "120px" : "none",
              position: "relative",

              /* ⭐ FIRST LETTER BIG */
              "&::first-letter": {
                fontSize: "42px",
                fontWeight: 700,
                float: "left",
                lineHeight: 1,
                marginRight: "8px",
                color: "#4F39F6"
              }
            }}
          >
            {course?.description}
          </Typography>

          {isTruncated && (
            <Typography
              onClick={handleReadMore}
              component="span"
              sx={{
                mt: 1,
                ml: 4,
                alignSelf: { xs: "center", md: "flex-start" },
                color: "#4F39F6",
                fontWeight: 700,
                fontSize: { xs: "14px", md: "15px" },
                cursor: "pointer"
              }}
            >
              ...Read More
            </Typography>
          )}
        </Box>

        {/* ⭐ RATING (DYNAMIC) */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 2.5 }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#0F172A",
              fontWeight: 500,
              fontSize: { xs: "12px", md: "14px" },
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap"
            }}
          >
            {averageRating && averageRating > 0 && (
              <>
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, color: "#4F39F6" }}
                  >
                    {averageRating}
                  </Box>

                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <img
                        key={i}
                        src="/icons/Vector.svg"
                        alt="star"
                        style={{ width: "16px", height: "16px" }}
                      />
                    ))}
                </Box>

                <Box component="span" sx={{ color: "#64748B" }}>
                  ({totalRatings} ratings)
                </Box>
              </>
            )}

            <Box component="span" sx={{ color: "#64748B" }}>
              |
            </Box>

            <Box component="span" sx={{ color: "#64748B" }}>
              22 Total Hours
            </Box>

            <Box component="span" sx={{ color: "#64748B" }}>
              |
            </Box>

            <Box component="span" sx={{ color: "#64748B" }}>
              {totalLessons} Lessons
            </Box>

            <Box component="span" sx={{ color: "#64748B" }}>
              |
            </Box>

            <Box component="span" sx={{ color: "#64748B" }}>
              {/* All levels */}
              {level}
            </Box>
          </Typography>

          {/* Instructor */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap"
            }}
          >
            <Avatar
              alt={course?.createdBy || "Instructor"}
              src="/images/avatarUser.png"
              sx={{
                width: { xs: 36, md: 40 },
                height: { xs: 36, md: 40 },
                border: "2px solid #E2E8F0"
              }}
            />

            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "12px", md: "16px" },
                color: "#1E293B",
                fontWeight: 500
              }}
            >
              Created by{" "}
              <Box component="span" sx={{ fontWeight: 600 }}>
                {course?.createdBy || "Instructor"}
              </Box>
            </Typography>
          </Box>

          {/* Language */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap"
            }}
          >
            <Avatar
              alt="Languages"
              src="/icons/Icon.svg"
              sx={{
                width: 20,
                height: 20
              }}
            />

            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "12px", md: "16px" },
                color: "#64748B"
              }}
            >   
              {Array.isArray(course?.language)
                ? course.language.map((lang) => lang.toUpperCase()).join(", ")
                : course?.language?.toUpperCase() || "Language not available"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
