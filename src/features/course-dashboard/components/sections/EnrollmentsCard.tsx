import { Card, CardHeader, CardContent, Typography, Stack, Box, FormControl, Select, MenuItem, Button } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as ReTooltip } from "recharts";
import { enrollments } from "../../utils/mockData";
import StatMini from "../common/StatMini";
import { useTheme } from "@mui/material";

export default function EnrollmentsCard({ granularity, setGranularity }: { granularity: "Weekly" | "Monthly" | "Quarterly"; setGranularity: (g: any) => void }) {
  const theme = useTheme();
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardHeader
        title={<Typography variant="h6" fontWeight={800}>Enrollments Over Time</Typography>}
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            <FormControl size="small">
              <Select value={granularity} onChange={(e) => setGranularity(e.target.value as any)}>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined">Last 6 Weeks</Button>
            <Button variant="outlined">Last 3 Months</Button>
            <Button variant="outlined">Year to Date</Button>
          </Stack>
        }
      />
      <CardContent>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={enrollments.series} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <ReTooltip />
              <Line type="monotone" dataKey="value" stroke={theme.palette.primary.main} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <StatMini title="Total Enrollment" value={enrollments.total.toLocaleString()} />
          <StatMini title="Unique Students" value={enrollments.unique.toLocaleString()} />
        </Stack>
      </CardContent>
    </Card>
  );
}


