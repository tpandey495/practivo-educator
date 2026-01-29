import React from 'react';
import {
  Box, Grid, Card, Typography, Button, Stack,
  Avatar, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, LinearProgress, Chip, IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Email as EmailIcon,
  ConfirmationNumber as CouponIcon,
  Share as SocialIcon,
  Link as LinkIcon,
  MoreVert as MoreIcon,
  Settings as SettingsIcon,
  Circle as CircleIcon
} from '@mui/icons-material';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

// 1. Define missing chart data
const chartData = [
  { name: 'Aug 1', value: 400 },
  { name: 'Aug 7', value: 600 },
  { name: 'Aug 14', value: 300 },
  { name: 'Aug 21', value: 800 },
  { name: 'Aug 28', value: 500 },
];

// 2. Types and Sub-components
interface StatCardProps {
  title: string; value: string | number; trend: string; isUp: boolean; color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, isUp, color }) => (
  <Card sx={{ p: 2, borderRadius: 4, bgcolor: color, boxShadow: 'none' }}>
    <Typography variant="body2" color="text.secondary">{title}</Typography>
    <Typography variant="h5" fontWeight="bold" sx={{ my: 1 }}>{value}</Typography>
    <Typography variant="caption" color={isUp ? "success.main" : "error.main"} sx={{ fontWeight: 600 }}>
      {isUp ? '↑' : '↓'} {trend} <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>vs last month</Box>
    </Typography>
  </Card>
);

const MarketingDashboard: React.FC = () => {
  return (
    <Box sx={{ p: 4, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Marketing Overview</Typography>
          <Typography variant="body1" color="#64748b">Manage your campaigns, discounts, and promotional insights.</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2, textTransform: 'none', px: 3, py: 1, boxShadow: 'none' }}>
          Create Campaign
        </Button>
      </Stack>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total Revenue" value="$12,400" trend="12%" isUp color="#eef2ff" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Active Campaigns" value="8" trend="2 new" isUp color="#faf5ff" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Conversion Rate" value="3.2%" trend="0.4%" isUp color="#fffbeb" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="CTR" value="1.8%" trend="0.2%" isUp={false} color="#f0fdfa" /></Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Chart Section */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 3, borderRadius: 4, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Box>
                <Typography variant="h6" fontWeight="bold">Campaign Performance</Typography>
                <Typography variant="body2" color="text.secondary">Sales & Traffic over the last 30 days</Typography>
              </Box>
              <Stack direction="row" spacing={1} sx={{ bgcolor: '#f1f5f9', p: 0.5, borderRadius: 2 }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    bgcolor: 'white',
                    color: '#1e293b',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: 'white',
                      color: '#1e293b',
                    },
                    '&:active': {
                      bgcolor: 'white',
                      color: '#1e293b',
                    }
                  }}
                >
                  30 Days
                </Button>
                <Button
                  size="small"
                  sx={{
                    color: '#1e293b',
                    fontWeight: 500,
                    bgcolor: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.5)',
                      color: '#1e293b',
                    },
                    '&:active': {
                      bgcolor: 'rgba(255, 255, 255, 0.7)',
                      color: '#1e293b',
                    }
                  }}
                >
                  7 Days
                </Button>
              </Stack>
            </Stack>
            <Box sx={{ height: 300, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Quick Actions & Integrations */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Quick Actions</Typography>
          <Grid container spacing={2} mb={3}>
            {[
              { icon: <EmailIcon color="primary" />, label: 'Email Blast' },
              { icon: <CouponIcon sx={{ color: '#a855f7' }} />, label: 'Create Coupon' },
              { icon: <SocialIcon sx={{ color: '#ec4899' }} />, label: 'Social Share' },
              { icon: <LinkIcon sx={{ color: '#10b981' }} />, label: 'Affiliate Link' }
            ].map((action, i) => (
              <Grid item xs={6} key={i}>
                <Card sx={{ p: 2, textAlign: 'center', borderRadius: 4, cursor: 'pointer', transition: '0.2s', '&:hover': { bgcolor: '#f1f5f9' } }}>
                  <Avatar sx={{ mx: 'auto', mb: 1, bgcolor: 'transparent' }}>{action.icon}</Avatar>
                  <Typography variant="caption" fontWeight="bold">{action.label}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Card sx={{ p: 2, borderRadius: 4 }}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography variant="caption" fontWeight="bold" color="text.secondary">INTEGRATIONS</Typography>
              <SettingsIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            </Stack>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CircleIcon sx={{ fontSize: 8, color: '#10b981' }} />
                <Typography variant="body2">Google Analytics Connected</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <CircleIcon sx={{ fontSize: 8, color: '#10b981' }} />
                <Typography variant="body2">Mailchimp Connected</Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Promotions Table */}
      <Box sx={{ mt: 4 }}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight="bold">Active Promotions</Typography>
          <Button size="small" sx={{ textTransform: 'none' }}>View All</Button>
        </Stack>
        <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 'none', border: '1px solid #e2e8f0' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 'bold' }}>PROMO CODE</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 'bold' }}>DISCOUNT</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 'bold' }}>REDEMPTIONS</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 'bold' }}>STATUS</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">SUMMER24</Typography>
                  <Typography variant="caption" color="text.secondary">Summer Sale Campaign</Typography>
                </TableCell>
                <TableCell><Chip label="20% OFF" size="small" sx={{ bgcolor: '#eef2ff', color: '#6366f1', fontWeight: 'bold' }} /></TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption">45 / 100</Typography>
                    <LinearProgress variant="determinate" value={45} sx={{ flexGrow: 1, borderRadius: 5, height: 6 }} />
                  </Stack>
                </TableCell>
                <TableCell><Stack direction="row" alignItems="center" spacing={1}><CircleIcon sx={{ fontSize: 8, color: '#10b981' }} /><Typography variant="body2">Active</Typography></Stack></TableCell>
                <TableCell align="right"><IconButton size="small"><MoreIcon /></IconButton></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MarketingDashboard;