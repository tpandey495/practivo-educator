import { Card, CardHeader, CardContent, Grid, Typography, IconButton, Box, Divider } from "@mui/material";
import { MoreVertRounded } from "@mui/icons-material";
import StatMini from "../common/StatMini";
import { analytics } from "../../utils/mockData";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as ReTooltip, Legend as ReLegend } from "recharts";
import { useTheme } from "@mui/material";

export default function AnalyticsCard() {
  const theme = useTheme();
  const PIE_COLORS = [
    theme.palette.success.main,
    theme.palette.primary.main,
    theme.palette.error.main,
  ];
  return (
    <Card sx={{ borderRadius: 3, height: "100%" }}>
      <CardHeader
        action={<IconButton size="small"><MoreVertRounded /></IconButton>}
        title={<Typography variant="h6" fontWeight={800}>Analytics</Typography>}
        subheader={<Typography variant="body2" color="text.secondary">Distribution & engagement</Typography>}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StatMini title="Average Progress" value={`${analytics.avgProgress}%`} />
          </Grid>
          <Grid item xs={6}>
            <StatMini title="Active Learners" value={analytics.active} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={analytics.distribution} innerRadius={55} outerRadius={85} dataKey="value" nameKey="name" paddingAngle={2}>
                {analytics.distribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <ReLegend verticalAlign="bottom" height={36} />
              <ReTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}


