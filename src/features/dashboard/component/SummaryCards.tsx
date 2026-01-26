import { Grid, Paper, Box, Typography, Chip } from '@mui/material';
import { TrendingUp, People, Star, Visibility, CheckCircle, Dashboard } from '@mui/icons-material';

const statData = [
  { label: 'TOTAL REVENUE', value: '$124,500', change: '+12%', icon: <TrendingUp />, color: '#4caf50' },
  { label: 'TOTAL STUDENTS', value: '3,402', change: '+8%', icon: <People />, color: '#2196f3' },
  { label: 'AVG. RATING', value: '4.8 / 5.0', change: '+0.2%', icon: <Star />, color: '#ff9800' },
  { label: 'COURSE VIEWS', value: '85.2k', change: '+15%', icon: <Visibility />, color: '#9c27b0' },
  { label: 'COMPLETED', value: '12,900', change: '+22%', icon: <CheckCircle />, color: '#4caf50' },
  { label: 'COURSE STATUS', value: '8 Active', change: '2 Draft', icon: <Dashboard />, color: '#757575' },
];

export const SummaryCards = () => (
  <Grid container spacing={2}>
    {statData.map((stat, index) => (
      <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
        <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #f0f0f0' }} elevation={0}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Box sx={{ p: 1, bgcolor: `${stat.color}15`, color: stat.color, borderRadius: 2, display: 'flex' }}>
              {stat.icon}
            </Box>
            <Chip 
              label={stat.change} 
              size="small" 
              sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 'bold', fontSize: '0.7rem' }} 
            />
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
            {stat.label}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {stat.value}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);