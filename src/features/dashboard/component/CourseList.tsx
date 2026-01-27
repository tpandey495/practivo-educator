import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  Divider, 
  Button, 
  Paper, 
  Typography, 
  Box, 
  Chip 
} from '@mui/material';

const courses = [
  { name: 'Advanced React Patterns', students: '1,204', growth: '+42', status: 'Active' },
  { name: 'UI/UX Masterclass', students: '856', growth: '+18', status: 'Active' },
  { name: 'Digital Marketing', students: 'Pre-launch', growth: '0', status: 'Draft' },
  { name: 'Python for Beginners', students: '622', growth: '+5', status: 'Active' },
];

export const CourseList = () => (
  <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }} elevation={0}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h6">Top Courses</Typography>
      <Button size="small" sx={{ textTransform: 'none' }}>View All</Button>
    </Box>
    <List disablePadding>
      {courses.map((course, i) => (
        <React.Fragment key={i}>
          <ListItem sx={{ px: 0, py: 2 }}>
            <ListItemAvatar>
              <Avatar variant="rounded" sx={{ bgcolor: '#f1f5f9', width: 48, height: 48 }}>
                📚
              </Avatar>
            </ListItemAvatar>
            
            <ListItemText 
              primary={
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {course.name}
                </Typography>
              } 
              secondary={
                <Chip 
                  label={course.status} 
                  size="small" 
                  // Logic to change color based on status
                  color={course.status === 'Active' ? 'success' : 'default'}
                  variant="outlined"
                  sx={{ height: 20, fontSize: '0.65rem', mt: 0.5 }} 
                />
              } 
              // The Fix: Ensures the secondary text container is a <div> instead of a <p>
              secondaryTypographyProps={{ component: 'div' }}
            />

            <Box textAlign="right">
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                {course.students}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {course.growth !== '0' ? `${course.growth} this week` : 'Pre-launch'}
              </Typography>
            </Box>
          </ListItem>
          {i < courses.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Paper>
);