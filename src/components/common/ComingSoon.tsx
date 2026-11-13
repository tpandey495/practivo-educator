import { Box, Typography } from "@mui/material";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout title={title} showActions={false}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 2,
            py: { xs: 8, md: 12 },
            px: 2,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(79, 57, 246, 0.08)",
              color: "#4F39F6",
            }}
          >
            <RocketLaunchOutlinedIcon sx={{ fontSize: 40 }} />
          </Box>
          <Box
            component="span"
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "#4F39F6",
              backgroundColor: "rgba(79, 57, 246, 0.08)",
            }}
          >
            Upcoming
          </Box>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: "text.primary" }}>
            {title} is coming soon
          </Typography>
          <Typography sx={{ color: "#667085", maxWidth: 480 }}>
            {description ?? "We're working on this feature. Stay tuned!"}
          </Typography>
        </Box>
      </PageToolbarLayout>
    </Box>
  );
}
