import React from 'react';
import {
  Box, Grid, Paper, Typography, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Avatar, 
  Chip, LinearProgress, Stack, ThemeProvider, createTheme
} from '@mui/material';
import { FileDownloadOutlined, TrendingUp } from '@mui/icons-material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Theme Configuration ---
const theme = createTheme({
  palette: {
    primary: { main: '#3b82f6' },
    background: { default: '#f8fafc' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
});

// --- Mock Data ---
const chartData = [
  { name: 'Week 1', current: 20 },
  { name: 'Week 2', current: 35 },
  { name: 'Week 3', current: 45 },
  { name: 'Week 4', current: 70 },
];

const activities = [
  { id: 1, name: 'Sarah Jenkins', action: 'Completed Module', course: 'UI Design Fundamentals', time: '2 min ago', color: '#818cf8' },
  { id: 2, name: 'Michael Chen', action: 'Enrolled', course: 'Adv. React Patterns', time: '15 min ago', color: '#34d399' },
  { id: 3, name: 'Alex Johnson', action: 'Posted Comment', course: 'Fullstack Masterclass', time: '1 hr ago', color: '#fb923c' },
];

// --- Sub-Components ---
const MetricCard = ({ title, value, subValue, trend }: any) => (
  <Paper sx={{ p: 3, borderRadius: 4, height: '100%', border: '1px solid #e2e8f0' }} elevation={0}>
    <Typography variant="body2" color="textSecondary" gutterBottom>{title}</Typography>
    <Stack direction="row" alignItems="baseline" spacing={1}>
      <Typography variant="h4">{value}</Typography>
      {trend && <Chip label={trend} size="small" color="success" sx={{ bgcolor: '#dcfce7', color: '#166534', fontWeight: 'bold' }} />}
    </Stack>
    <Typography variant="caption" color="textSecondary">{subValue}</Typography>
  </Paper>
);

const FunnelRow = ({ label, value, percent, color }: any) => (
  <Box sx={{ mb: 2 }}>
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
      <Typography variant="body2" fontWeight="medium">{label}</Typography>
      <Typography variant="body2" color="textSecondary">{value} ({percent}%)</Typography>
    </Stack>
    <LinearProgress 
      variant="determinate" 
      value={percent} 
      sx={{ height: 8, borderRadius: 5, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: color } }} 
    />
  </Box>
);

// --- Main Dashboard ---
export default function StudentInsights() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100vh' }}>
        
        {/* Header */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4">Student Insights</Typography>
            <Typography variant="body1" color="textSecondary">Overview of your student growth and engagement metrics.</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', bgcolor: 'white' }}>Last 30 Days</Button>
            <Button variant="outlined" startIcon={<FileDownloadOutlined />} sx={{ borderRadius: 2, textTransform: 'none', bgcolor: 'white' }}>Export Report</Button>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {/* Top Metric Cards */}
          <Grid item xs={12} sm={6} md={3}><MetricCard title="New Students" value="+128" trend="+12%" subValue="vs. previous 30 days" /></Grid>
          <Grid item xs={12} sm={6} md={3}><MetricCard title="Active Now" value="42" subValue="Currently learning" /></Grid>
          <Grid item xs={12} sm={6} md={3}><MetricCard title="Avg. Completion" value="68%" trend="+5% growth" subValue="Overall progress" /></Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 4, bgcolor: 'white', border: '1px solid #e2e8f0' }} elevation={0}>
              <Typography variant="body2" color="textSecondary">Top Performing Course</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>Adv. React Patterns</Typography>
              <Typography variant="body2" color="primary" fontWeight="bold">⭐ 98 Engagement Score</Typography>
            </Paper>
          </Grid>

          {/* Main Chart Area */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0' }} elevation={0}>
              <Typography variant="h6">Student Growth Trend</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>New enrollments over time</Typography>
              <Box sx={{ height: 300, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Completion Funnel */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0' }} elevation={0}>
              <Typography variant="h6">Completion Funnel</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>Drop-off rates by stage</Typography>
              <FunnelRow label="Enrolled" value="1,240" percent={100} color="#3b82f6" />
              <FunnelRow label="Started" value="1,054" percent={85} color="#3b82f6" />
              <FunnelRow label="Halfway Point" value="744" percent={60} color="#60a5fa" />
              <FunnelRow label="Completed" value="558" percent={45} color="#10b981" />
              <Button fullWidth sx={{ mt: 2, textTransform: 'none' }}>View Detailed Breakdown</Button>
            </Paper>
          </Grid>

          {/* Activity Table */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 4, border: '1px solid #e2e8f0' }} elevation={0}>
              <Table>
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary' }}>Student</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>Action</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>Course</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ bgcolor: row.color, width: 32, height: 32 }}>{row.name[0]}</Avatar>
                          <Typography variant="body2" fontWeight="medium">{row.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={row.action} 
                          size="small" 
                          sx={{ 
                            bgcolor: row.action === 'Enrolled' ? '#dbeafe' : row.action === 'Completed Module' ? '#dcfce7' : '#ffedd5',
                            color: row.action === 'Enrolled' ? '#1e40af' : row.action === 'Completed Module' ? '#166534' : '#9a3412'
                          }} 
                        />
                      </TableCell>
                      <TableCell><Typography variant="body2" color="primary">{row.course}</Typography></TableCell>
                      <TableCell><Typography variant="body2" color="textSecondary">{row.time}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}