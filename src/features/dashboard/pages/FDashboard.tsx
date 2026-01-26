import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Avatar,
  LinearProgress,
  Button,
  Stack,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import {
  MailOutline,
  LightbulbCircle,
  MoreHoriz,
  CreditCard,
  AccountBalanceWallet,
  PersonOutline,
} from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import FileAddIcon from "../../../assets/icons/FileAddIcon";

// --- Custom Theme ---
const theme = createTheme({
  palette: {
    primary: { main: "#3b82f6" },
    background: { default: "#f1f5f9" },
    success: { main: "#10b981", light: "#dcfce7" },
    error: { main: "#ef4444", light: "#fee2e2" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h5: { fontWeight: 700 },
    subtitle2: { fontWeight: 600, color: "#64748b" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16, border: "1px solid #e2e8f0", elevation: 0 },
      },
    },
  },
});

// --- Mock Data ---
const graphData = [
  { name: "Mon", revenue: 2500 },
  { name: "Tue", revenue: 4200 },
  { name: "Wed", revenue: 4800 },
  { name: "Thu", revenue: 3900 },
  { name: "Fri", revenue: 5800 },
  { name: "Sat", revenue: 8200 },
  { name: "Sun", revenue: 9240 },
];

// --- Sub-Components ---
const MetricCard = ({ title, value, sub, trend, icon, color }: any) => (
  <Paper sx={{ p: 3, height: "100%" }} elevation={0}>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Avatar sx={{ bgcolor: `${color}15`, color, borderRadius: 2 }}>
        {icon}
      </Avatar>
      <Chip
        icon={
          trend > 0 ? (
            <TrendingUpIcon size={14} />
          ) : (
            <TrendingDownIcon size={14} />
          )
        }
        label={`${Math.abs(trend)}%`}
        size="small"
        sx={{
          bgcolor: trend > 0 ? "success.light" : "error.light",
          color: trend > 0 ? "success.main" : "error.main",
          fontWeight: "bold",
        }}
      />
    </Stack>
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h5" sx={{ my: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {sub}
      </Typography>
    </Box>
  </Paper>
);

const CourseProgress = ({ name, sales, price, percent }: any) => (
  <Box sx={{ mb: 3 }}>
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
      <Typography variant="body2" fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="body2" fontWeight="bold">
        ${price}
      </Typography>
    </Stack>
    <LinearProgress
      variant="determinate"
      value={percent}
      sx={{ height: 8, borderRadius: 4, bgcolor: "#f1f5f9" }}
    />
    <Typography variant="caption" color="text.secondary">
      {sales} Sales
    </Typography>
  </Box>
);

// --- Main Dashboard ---
export default function FDashboard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4, bgcolor: '#f8fafc', minHeight: '100vh'}}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Marketing Overview
            </Typography>
            <Typography color="text.secondary">
              Manage your campaigns, discounts, and promotional insights.
            </Typography> 
          </Box>
          <Button
            variant="contained"
            startIcon={<FileAddIcon/>}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              py: 1,
              boxShadow: "none",
            }}
          >
            Create Campaign
          </Button>
        </Stack>
        {/* Top Metric Row */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <MetricCard
              title="Monthly Recurring Revenue"
              value="$12,450"
              sub="vs $11,116 last month"
              trend={12}
              icon={<CreditCard />}
              color="#3b82f6"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MetricCard
              title="Total Revenue (YTD)"
              value="$84,300"
              sub="On track to beat last year"
              trend={5}
              icon={<AccountBalanceWallet />}
              color="#8b5cf6"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MetricCard
              title="Avg Revenue Per User"
              value="$45.00"
              sub="vs $45.92 last month"
              trend={-2}
              icon={<PersonOutline />}
              color="#f59e0b"
            />
          </Grid>
        </Grid>

        {/* Middle Row: Graph and Top Courses */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3 }} elevation={0}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Box>
                  <Typography variant="h6">Revenue Growth</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gross sales over time
                  </Typography>
                </Box>
                <Paper
                  variant="outlined"
                  sx={{ p: 0.5, display: "flex", gap: 1, borderRadius: 2 }}
                >
                  {["Daily", "Weekly", "Monthly"].map((t) => (
                    <Button
                      key={t}
                      size="small"
                      variant={t === "Daily" ? "contained" : "text"}
                      disableElevation
                      sx={{ textTransform: "none", borderRadius: 1.5 }}
                    >
                      {t}
                    </Button>
                  ))}
                </Paper>
              </Stack>
              <Box sx={{ height: 350, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={graphData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      tickFormatter={(v) => `$${v / 1000}k`}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, height: "100%" }} elevation={0}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 3 }}
              >
                <Typography variant="h6">Top Courses</Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  View All
                </Typography>
              </Stack>
              <CourseProgress
                name="Mastering React"
                sales={452}
                price="12.5k"
                percent={80}
              />
              <CourseProgress
                name="UI Design Basics"
                sales={310}
                price="8.2k"
                percent={60}
              />
              <CourseProgress
                name="Advanced Python"
                sales={125}
                price="4.1k"
                percent={30}
              />

              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  bgcolor: "#eff6ff",
                  borderRadius: 3,
                  border: "1px solid #dbeafe",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Avatar sx={{ bgcolor: "white" }}>
                    <LightbulbCircle color="primary" />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      color="primary"
                    >
                      Insight
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      Bundle "React" and "UI Design" to increase ARPU by ~15%.
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom Row: Transactions and CTA */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }} elevation={0}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6">Recent Transactions</Typography>
                <MoreHoriz sx={{ color: "#94a3b8" }} />
              </Stack>
              {[
                {
                  name: "John Doe",
                  course: "Mastering React",
                  amount: "$49.00",
                  time: "2 mins ago",
                  initial: "JD",
                  color: "#dbeafe",
                },
                {
                  name: "Alice Smith",
                  course: "UI Design Basics",
                  amount: "$39.00",
                  time: "15 mins ago",
                  initial: "AS",
                  color: "#f3e8ff",
                },
              ].map((t, i) => (
                <Stack
                  key={i}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    py: 1.5,
                    borderBottom: i === 0 ? "1px solid #f1f5f9" : "none",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: t.color,
                        color: "text.primary",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {t.initial}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {t.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t.course}
                      </Typography>
                    </Box>
                  </Stack>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" fontWeight="bold">
                      {t.amount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t.time}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
              elevation={0}
            >
              <Chip
                icon={<MailOutline style={{ color: "white" }} />}
                label="Boost Sales"
                size="small"
                sx={{ color: "white", bgcolor: "rgba(255,255,255,0.2)", mb: 2 }}
              />
              <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
                Launch an Email Campaign
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.8, mb: 3, maxWidth: "80%" }}
              >
                Reach out to your students with a special offer. Creators who
                email weekly earn 2x more.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                Draft Campaign
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
