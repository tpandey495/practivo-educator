import { Box, Chip, Container, Stack, Typography, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { ArrowOutwardRounded, MoreVertRounded, StarRounded } from "@mui/icons-material";
import { header } from "../../utils/mockData";

export default function Hero() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      sx={{
        py: 2,
        mb: 2,
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }} justifyContent="space-between">
          <Box>
            <Typography variant={isMdUp ? "h4" : "h5"} fontWeight={900} letterSpacing={-0.5}>
              {header.title}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, flexWrap: "wrap" }}>
              <Chip size="small" label={`Course ID: ${header.id}`} />
              <Chip size="small" label={`Category: ${header.category}`} />
              <Chip size="small" label={`Instructor: ${header.instructor}`} />
            </Stack>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1}>
            <StarRounded sx={{ color: "#FFB400" }} />
            <Typography variant="h6" fontWeight={800}>
              {header.rating.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({header.reviews} reviews)
            </Typography>
            <Button endIcon={<ArrowOutwardRounded />} sx={{ ml: 1 }} variant="contained">
              View Reviews
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}


