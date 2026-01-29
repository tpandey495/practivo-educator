import { Paper, Typography, Box, Stack, Button, Chip } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUpRounded, MoreVertRounded } from '@mui/icons-material';

const data = [
  { name: 'Jan', uv: 4000 }, { name: 'Mar', uv: 11000 },
  { name: 'May', uv: 10000 }, { name: 'Jul', uv: 18000 },
  { name: 'Sep', uv: 22000 }, { name: 'Nov', uv: 24500 },
  { name: 'Dec', uv: 26000 },
];

export const RevenueChart = () => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2.5, sm: 3, md: 3.5 },
      height: { xs: 380, sm: 420, md: 450 },
      borderRadius: 4,
      border: '1px solid #e2e8f0',
      background: 'white',
      transition: 'all 0.3s ease',
      fontFamily: "'Inter', sans-serif",
      '&:hover': {
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      }
    }}
  >
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      spacing={2}
      mb={3}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '18px', sm: '20px' },
            color: '#1e293b',
            mb: 0.5
          }}
        >
          Revenue Performance
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>
          Track your revenue growth over time
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip
          icon={<TrendingUpRounded sx={{ fontSize: 14 }} />}
          label="+24.5%"
          size="small"
          sx={{
            bgcolor: '#dcfce7',
            color: '#166534',
            fontWeight: 700,
            fontSize: '11px',
            height: '26px',
            '& .MuiChip-icon': {
              color: '#166534',
            },
          }}
        />
        <Button
          size="small"
          sx={{
            minWidth: 'auto',
            p: 0.5,
            color: 'white',
          }}
        >
          <MoreVertRounded sx={{ fontSize: 20 }} />
        </Button>
      </Stack>
    </Stack>
    <Box sx={{ height: { xs: 280, sm: 320, md: 350 }, width: '100%', pb: 2 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F39F6" stopOpacity={0.25} />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#4F39F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
            strokeWidth={1}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#1e293b', fontWeight: 700, fontSize: '12px' }}
            itemStyle={{ color: '#4F39F6', fontWeight: 600, fontSize: '13px' }}
            formatter={(value: number | undefined) => value ? [`$${value.toLocaleString()}`, 'Revenue'] : ['', '']}
          />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#4F39F6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorUv)"
            dot={{ fill: '#4F39F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#4F39F6', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  </Paper>
);