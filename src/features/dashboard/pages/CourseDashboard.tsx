import React, { useState } from 'react';
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  Tabs, Tab, TextField, InputAdornment, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Avatar,
  AvatarGroup, Chip, IconButton, Pagination, Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Star as StarIcon,
  AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';

// --- Types ---
interface Course {
  id: number;
  title: string;
  category: string;
  status: 'Published' | 'Pending' | 'Draft';
  revenue: string;
  students: string;
  rating: string;
  lastUpdated: string;
  image: string;
}

// --- Mock Data ---
const COURSES: Course[] = [
  { id: 1, title: 'Mastering UI/UX Design', category: 'Design Category', status: 'Published', revenue: '$45,200', students: '+2k', rating: '4.9', lastUpdated: 'Oct 24, 2023', image: 'https://via.placeholder.com/40' },
  { id: 2, title: 'Advanced React Patterns', category: 'Development Category', status: 'Pending', revenue: '$12,890', students: '+450', rating: '4.7', lastUpdated: 'Nov 02, 2023', image: 'https://via.placeholder.com/40' },
  { id: 3, title: 'Digital Marketing 101', category: 'Marketing Category', status: 'Draft', revenue: '—', students: '—', rating: '—', lastUpdated: 'Yesterday', image: 'https://via.placeholder.com/40' },
  { id: 4, title: 'Python for Data Science', category: 'Data Science Category', status: 'Published', revenue: '$67,120', students: '+3.5k', rating: '4.8', lastUpdated: 'Oct 12, 2023', image: 'https://via.placeholder.com/40' },
];

const StatCard = ({ title, value, trend, icon, color }: any) => (
  <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary" fontWeight="medium">{title}</Typography>
          <Typography variant="h5" fontWeight="bold">{value}</Typography>
          <Box display="flex" alignItems="center" gap={0.5}>
            <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
            <Typography variant="caption" color="success.main" fontWeight="bold">{trend}</Typography>
          </Box>
        </Stack>
        <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${color}.lighter`, color: `${color}.main` }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default function CourseDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Courses Overview</Typography>
            <Typography variant="body1" color="text.secondary">Manage, track, and optimize your educational content.</Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ px: 3, py: 1, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}>
            Create New Course
          </Button>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}><StatCard title="Total Revenue" value="$124,500" trend="12%" color="primary" icon={<WalletIcon />} /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="Active Students" value="12,403" trend="5%" color="info" icon={<PeopleIcon />} /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="Course Enrollments" value="854" trend="8%" color="secondary" icon={<SchoolIcon />} /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="Avg. Rating" value="4.8" trend="from 320 reviews" color="warning" icon={<StarIcon />} /></Grid>
        </Grid>

        {/* Filters & Table Card */}
        <Card variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 'bold', minWidth: 80 } }}>
              <Tab label="All" />
              <Tab label="Published" />
              <Tab label="Drafts" />
              <Tab label="Archived" />
            </Tabs>
            <TextField 
              size="small" 
              placeholder="Search courses..." 
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
              sx={{ width: { xs: '100%', sm: 250 } }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#fafafa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>COURSE INFO</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>REVENUE</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>STUDENTS</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>RATING</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>LAST UPDATED</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {COURSES.map((course) => (
                  <TableRow key={course.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar variant="rounded" src={course.image} sx={{ width: 48, height: 48 }} />
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">{course.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{course.category}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={course.status} 
                        size="small" 
                        color={course.status === 'Published' ? 'success' : course.status === 'Pending' ? 'warning' : 'default'}
                        variant="soft" // Note: custom variant logic or use sx for background
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell><Typography variant="body2" fontWeight="medium">{course.revenue}</Typography></TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AvatarGroup max={3} componentsProps={{ additionalAvatar: { sx: { width: 24, height: 24, fontSize: 12 } } }}>
                           <Avatar sx={{ width: 24, height: 24 }} src="https://i.pravatar.cc/150?u=1" />
                           <Avatar sx={{ width: 24, height: 24 }} src="https://i.pravatar.cc/150?u=2" />
                        </AvatarGroup>
                        <Typography variant="caption" fontWeight="bold" color="text.secondary">{course.students}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        {course.rating !== '—' && <StarIcon sx={{ fontSize: 16, color: 'orange' }} />}
                        <Typography variant="body2" fontWeight="bold">{course.rating}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2" color="text.secondary">{course.lastUpdated}</Typography></TableCell>
                    <TableCell align="right">
                      <IconButton size="small"><MoreVertIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">Showing <b>1 to 4</b> of 12 courses</Typography>
            <Pagination count={3} shape="rounded" size="small" />
          </Box>
        </Card>
      </Container>
    </Box>
  );
}