import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function StarRatings({ averageRating = 0, totalRatings = 0, ratings = [] }) {

  // ⭐ distribution calculate
  const starCount = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  ratings.forEach((r) => {
    starCount[r.value] = (starCount[r.value] || 0) + 1;
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = starCount[star];
    const percent = totalRatings
      ? Math.round((count / totalRatings) * 100)
      : 0;

    return { stars: star, percent };
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", md: 320 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: { xs: 2, md: 3 },
        bgcolor: "#FAFBFC",
        borderRadius: 3,
        border: "1px solid #E2E8F0",
      }}
    >
      {/* ⭐ Top Rating Summary */}
      <Box display="flex" alignItems="center" gap={1.5}>
        <Box display="flex" alignItems="center" gap={0.5}>
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              sx={{
                fontSize: 20,
                color:
                  i < Math.round(averageRating)
                    ? "#FBBF24"
                    : "#E2E8F0",
              }}
            />
          ))}
        </Box>

        <Typography fontWeight={700} fontSize={24}>
          {averageRating || 0}
        </Typography>

        <Typography fontSize={14} sx={{ color: "#64748B" }}>
          {totalRatings} reviews
        </Typography>
      </Box>

      {/* ⭐ Rating Distribution */}
      <Box display="flex" flexDirection="column" gap={1.5}>
        {ratingDistribution.map((rating, index) => (
          <Box key={index} display="flex" alignItems="center" gap={2}>
            {/* Stars */}
            <Box display="flex" gap={0.5} minWidth={80}>
              {[...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    fontSize: 14,
                    color:
                      i < rating.stars ? "#FBBF24" : "#E2E8F0",
                  }}
                >
                  {i < rating.stars ? "★" : "☆"}
                </Box>
              ))}
            </Box>

            {/* Progress Bar */}
            <Box
              sx={{
                flex: 1,
                height: 8,
                bgcolor: "#E2E8F0",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${rating.percent}%`,
                  bgcolor: "#4F39F6",
                  borderRadius: 4,
                }}
              />
            </Box>

            {/* Percent */}
            <Typography fontSize={14} fontWeight={600}>
              {rating.percent}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}