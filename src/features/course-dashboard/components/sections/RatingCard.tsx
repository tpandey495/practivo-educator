import { Card, CardHeader, CardContent, Typography, Stack, Divider, Box, Chip, useTheme } from "@mui/material";
import { StarRounded } from "@mui/icons-material";
import { analytics } from "../../utils/mockData";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip } from "recharts";

export default function RatingCard() {
  const theme = useTheme();
  return (
    <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
      <CardHeader title={<Typography variant="h6" fontWeight={800}>Course Rating & Feedback</Typography>} />
      <CardContent>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.light}14, ${theme.palette.primary.main}10)`,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <StarRounded sx={{ color: "#FFB400" }} />
            <Typography variant="h5" fontWeight={900}>{analytics.rating.value.toFixed(1)}</Typography>
            <Chip size="small" label={`${analytics.rating.reviews} reviews`} sx={{ bgcolor: "background.paper" }} />
          </Stack>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Common Drop-off Points
        </Typography>
        <Box
          sx={{
            height: 220,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "background.default",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.dropoff} barCategoryGap={10}>
              <XAxis dataKey="lesson" hide />
              <YAxis hide />
              <ReTooltip formatter={(v: any) => [`${v}%`, "Drop-off"]} cursor={{ fill: theme.palette.action.hover }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Stack spacing={1} sx={{ mt: 1 }}>
          {analytics.dropoff.map((d) => (
            <Stack key={d.lesson} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">
                {d.lesson}
              </Typography>
              <Typography variant="caption" fontWeight={700}>
                {d.value}%
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}


