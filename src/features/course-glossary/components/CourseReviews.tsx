import { Box, Button, Typography } from "@mui/material";
import StarRatings from "./StarRatings";
import UserTestimonial from "./UserTestimonial";
import { useGetCourseRatingQuery } from "../api/courseApi";

export default function CourseReviews({ courseId }) {
  const { data, isLoading, isError } = useGetCourseRatingQuery({ courseId });

  if (isLoading) return <Typography>Loading reviews...</Typography>;
  if (isError) return <Typography>Error loading reviews</Typography>;

  const ratingsData = data?.data;

  return (
    <Box
      sx={{
        width: "100%",
        pt: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 4 },
          width: "100%",
        }}
      >
        {/* ⭐ Pass dynamic data */}
        <StarRatings
          averageRating={ratingsData?.averageRating}
          totalRatings={ratingsData?.totalRatings}
          ratings={ratingsData?.ratings}
        />

        <Box
          sx={{
            display: "grid",
            gap: { xs: 2.5, md: 3 },
            width: "100%",
            flex: 1,
          }}
        >
          {/* ✅ Dynamic Reviews */}
          {ratingsData?.ratings?.map((item) => (
            <UserTestimonial
              key={item.id}
              name={`${item.user.firstName} ${item.user.lastName}`}
              rating={item.value}
              date={new Date(item.createdAt).toDateString()}
              review={item.review}
            />
          ))}

          <Box sx={{ pt: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                border: "2px solid #E2E8F0",
                backgroundColor: "white",
                color: "#475569",
                fontSize: { xs: "13px", md: "14px" },
                padding: { xs: "10px 16px", md: "13px 24px" },
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#F8FAFC",
                  borderColor: "#4F39F6",
                  color: "#4F39F6",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 6px rgba(79, 57, 246, 0.1)",
                },
              }}
            >
              View more reviews
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}