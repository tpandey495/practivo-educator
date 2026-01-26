import React from 'react';
import { Box, Container, Grid, Typography, Button, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SummaryCards } from '../component/SummaryCards';
import { RevenueChart } from '../component/RevenueChart';
import { CourseList } from '../component/CourseList';
import { ActivityFeed } from '../component/ActivityFeed';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>Good morning, Alex</Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what's happening with your courses today.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ px: 3, py: 1, borderRadius: 2 }}>
            New Course
          </Button>
        </Box>

        {/* Top Stats Row */}
        <SummaryCards />

        {/* Main Content Row */}
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} lg={8}>
            <RevenueChart />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CourseList />
          </Grid>
        </Grid>

        {/* Recent Activity Row */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 700 }}>Recent Activity</Typography>
        <ActivityFeed />
      </Container>
    </Box>
  );
};

export default Dashboard;