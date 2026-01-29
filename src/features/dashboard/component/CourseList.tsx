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
  Chip,
  Stack,
} from '@mui/material';
import {
  SchoolRounded,
  CodeRounded,
  PaletteRounded,
  CampaignRounded,
  TrendingUpRounded,
  ArrowForwardRounded,
} from '@mui/icons-material';

const courses = [
  {
    name: 'Advanced React Patterns',
    students: '1,204',
    growth: '+42',
    status: 'Active',
    icon: CodeRounded,
    iconColor: '#3B82F6',
    iconBg: '#DBEAFE',
  },
  {
    name: 'UI/UX Masterclass',
    students: '856',
    growth: '+18',
    status: 'Active',
    icon: PaletteRounded,
    iconColor: '#8B5CF6',
    iconBg: '#EDE9FE',
  },
  {
    name: 'Digital Marketing',
    students: 'Pre-launch',
    growth: '0',
    status: 'Draft',
    icon: CampaignRounded,
    iconColor: '#64748B',
    iconBg: '#F1F5F9',
  },
  {
    name: 'Python for Beginners',
    students: '622',
    growth: '+5',
    status: 'Active',
    icon: SchoolRounded,
    iconColor: '#10B981',
    iconBg: '#D1FAE5',
  },
];

export const CourseList = () => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2.5, sm: 3 },
      borderRadius: 4,
      height: '100%',
      border: '1px solid #e2e8f0',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      fontFamily: "'Inter', sans-serif",
      '&:hover': {
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      }
    }}
  >
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2.5 }}
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
          Top Courses
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>
          Your best performing courses
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="small"
        endIcon={<ArrowForwardRounded sx={{ fontSize: 16 }} />}
        sx={{
          textTransform: 'none',
          color: '#FFFFFF',
          bgcolor: '#4F39F6',
          fontWeight: 600,
          fontSize: '13px',
          boxShadow: '0 2px 8px rgba(79, 57, 246, 0.3)',
          '&:hover': {
            bgcolor: '#3E2DC4',
            boxShadow: '0 4px 12px rgba(79, 57, 246, 0.4)',
            color: '#FFFFFF',
          },
          '&:active': {
            bgcolor: '#3E2DC4',
            color: '#FFFFFF',
          },
        }}
      >
        View All
      </Button>
    </Stack>
    <List disablePadding sx={{ flex: 1 }}>
      {courses.map((course, i) => {
        const IconComponent = course.icon;
        return (
          <React.Fragment key={i}>
            <ListItem
              sx={{
                px: 0,
                py: 2,
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#f8fafc',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: course.iconBg,
                    color: course.iconColor,
                    width: { xs: 44, sm: 48 },
                    height: { xs: 44, sm: 48 },
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent sx={{ fontSize: 22 }} />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '14px', sm: '15px' },
                      color: '#1e293b',
                      mb: 0.5,
                    }}
                  >
                    {course.name}
                  </Typography>
                }
                secondary={
                  <Chip
                    label={course.status}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      bgcolor:
                        course.status === 'Active'
                          ? '#dcfce7'
                          : '#f1f5f9',
                      color:
                        course.status === 'Active'
                          ? '#166534'
                          : '#64748b',
                      border: 'none',
                      mt: 0.5,
                    }}
                  />
                }
                secondaryTypographyProps={{ component: 'div' }}
              />

              <Box textAlign="right" sx={{ ml: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '15px', sm: '16px' },
                    color: '#1e293b',
                    mb: 0.25,
                  }}
                >
                  {course.students}
                </Typography>
                {course.growth !== '0' ? (
                  <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="flex-end">
                    <TrendingUpRounded sx={{ fontSize: 12, color: '#10b981' }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#10b981',
                        fontWeight: 600,
                        fontSize: '11px',
                      }}
                    >
                      {course.growth} this week
                    </Typography>
                  </Stack>
                ) : (
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#64748b',
                      fontWeight: 500,
                      fontSize: '11px',
                    }}
                  >
                    Pre-launch
                  </Typography>
                )}
              </Box>
            </ListItem>
            {i < courses.length - 1 && (
              <Divider sx={{ borderColor: '#f1f5f9', mx: 0 }} />
            )}
          </React.Fragment>
        );
      })}
    </List>
  </Paper>
);