import { Avatar, Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface UserTestimonialProps {
  name?: string;
  rating?: number;
  date?: string;
  review?: string;
  avatar?: string;
}

export default function UserTestimonial({
  name = "Mark Doe",
  rating = 5,
  date = "22nd March, 2024",
  review = "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
  avatar = "https://storage.googleapis.com/a1aa/image/5147a9f3-030f-476c-1cb6-9f5e4c04e342.jpg",
}: UserTestimonialProps) {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        width: "100%",
        bgcolor: "white",
        border: "1px solid #E2E8F0",
        borderRadius: 3,
        p: { xs: 2.5, md: 3 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 3 },
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderColor: "#4F39F6",
        },
        wordBreak: "break-word",
      }}
    >
      <Box
        sx={{
          minWidth: 0,
          width: { xs: "100%", md: "auto" },
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 1.5,
        }}
      >
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: { xs: 56, md: 60 },
            height: { xs: 56, md: 60 },
            flexShrink: 0,
            border: "2px solid #E2E8F0",
          }}
        />
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Typography
            fontWeight={600}
            color="text.primary"
            fontSize={16}
            sx={{ mb: 0.5 }}
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{
                    fontSize: 16,
                    color: i < rating ? "#FBBF24" : "#E2E8F0",
                  }}
                />
              ))}
            </Box>
            <Typography
              fontWeight={600}
              sx={{ color: "#0F172A", fontSize: 14 }}
            >
              {rating}
            </Typography>
          </Box>
          <Typography color="text.secondary" fontSize={12} sx={{ color: "#64748B" }}>
            Reviewed on {date}
          </Typography>
        </Box>
      </Box>

      {/* Review Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
            mb: 0.5,
            flexWrap: "wrap",
          }}
        >
          <Typography
            fontWeight={600}
            color="text.primary"
            fontSize={16}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                sx={{
                  fontSize: 16,
                  color: i < rating ? "#FBBF24" : "#E2E8F0",
                }}
              />
            ))}
            <Typography
              fontWeight={700}
              sx={{ color: "#0F172A", fontSize: 16, ml: 0.5 }}
            >
              {rating}
            </Typography>
          </Box>
          <Typography
            color="text.secondary"
            fontSize={14}
            sx={{ color: "#64748B" }}
          >
            Reviewed on {date}
          </Typography>
        </Box>
        <Typography
          color="text.primary"
          fontSize={16}
          lineHeight={1.7}
          sx={{
            wordBreak: "break-word",
            color: "#475569",
          }}
        >
          {review}
        </Typography>
      </Box>
    </Box>
  );
}

