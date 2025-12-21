import { Box, Card, CardContent, Typography, useTheme, Stack } from "@mui/material";

export type StatCardProps = { label: string; value: string | number; suffix?: string };

export default function StatCard({ label, value, suffix }: StatCardProps) {
  const theme = useTheme();
  return (
    <Card sx={{ height: "100%", borderRadius: 3, overflow: "hidden", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.primary.light}05)`,
          pointerEvents: "none",
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 0.5 }}>
          <Typography variant="h4" fontWeight={800}>
            {value}
          </Typography>
          {suffix && (
            <Typography variant="caption" color="text.secondary">
              {suffix}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}


