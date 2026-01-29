import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import {
  AddRounded as AddIcon,
  DashboardRounded as DashboardIcon,
  NotificationsNoneRounded as NotificationIcon,
  CalendarTodayRounded as CalendarIcon,
  TrendingUpRounded as TrendingUpIcon,
  ArrowForwardRounded as ArrowForwardIcon,
} from '@mui/icons-material';
import { SummaryCards } from '../component/SummaryCards';
import { RevenueChart } from '../component/RevenueChart';
import { CourseList } from '../component/CourseList';
import { ActivityFeed } from '../component/ActivityFeed';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        bgcolor: '#f8fafc',
        minHeight: '100vh',
        position: 'relative',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Premium Header Section */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid #e2e8f0',
          borderRadius: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 2.5, sm: 3, md: 3.5 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DashboardIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                </Box>
                <Box>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Typography
                      variant={isMdUp ? 'h4' : 'h5'}
                      sx={{
                        fontWeight: 800,
                        color: '#1E293B',
                        fontSize: { xs: '24px', sm: '28px', md: '32px' },
                        lineHeight: 1.2,
                      }}
                    >
                      Good morning, Rahul
                    </Typography>
                    <Chip
                      icon={<CalendarIcon sx={{ fontSize: 12 }} />}
                      label="Today"
                      size="small"
                      sx={{
                        bgcolor: '#EEF2FF',
                        color: '#4F39F6',
                        fontWeight: 700,
                        fontSize: '11px',
                        height: '24px',
                        '& .MuiChip-icon': {
                          color: '#4F39F6',
                        },
                      }}
                    />
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748B',
                      fontSize: { xs: '13px', sm: '14px' },
                      fontWeight: 500,
                      mt: 0.5,
                    }}
                  >
                    Here's what's happening with your courses today. Track your performance and stay ahead.
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Stack
              direction={{ xs: 'row', sm: 'row' }}
              spacing={1.5}
              alignItems="center"
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1.25, sm: 1.5 },
                  borderRadius: 2.5,
                  bgcolor: '#4F39F6',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: { xs: '13px', sm: '14px' },
                  boxShadow: '0 4px 12px rgba(79, 57, 246, 0.3)',
                  background: 'linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3E2DC4 0%, #7C3AED 100%)',
                    boxShadow: '0 6px 16px rgba(79, 57, 246, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                New Course
              </Button>
              <IconButton
                sx={{
                  bgcolor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: '#e2e8f0',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <NotificationIcon />
              </IconButton>
            </Stack>
          </Box>
        </Container>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
        {/* Top Stats Row */}
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <SummaryCards />
        </Box>

        {/* Main Content Row */}
        <Grid container spacing={3} sx={{ mb: { xs: 3, sm: 4 } }}>
          <Grid item xs={12} lg={8}>
            <RevenueChart />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CourseList />
          </Grid>
        </Grid>

        {/* Recent Activity Row */}
        <Box sx={{ mt: { xs: 3, sm: 4 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: '#1E293B',
                    fontSize: { xs: '20px', sm: '24px' },
                  }}
                >
                  Recent Activity
                </Typography>
                <Chip
                  icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
                  label="Live"
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
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '13px' }}
              >
                Latest updates from your courses and students
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
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
          <ActivityFeed />
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;