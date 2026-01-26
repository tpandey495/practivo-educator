import { Avatar, Paper, Typography, Box, Grid} from '@mui/material';

const activities = [
  { user: 'Sarah J.', action: 'enrolled in', target: 'UI/UX Masterclass', time: '2 minutes ago', avatar: 'S' },
  { user: 'Mike T.', action: 'completed', target: 'Lesson 4 in React', time: '15 minutes ago', avatar: 'M' },
  { user: 'Payout', action: 'of $4,250', target: 'processed', time: '1 hour ago', isMoney: true },
  { user: 'Emily R.', action: 'left a', target: '5-star review', time: '3 hours ago', avatar: 'E' },
];

export const ActivityFeed = () => (
  <Grid container spacing={2}>
    {activities.map((item, i) => (
      <Grid item xs={12} sm={6} md={3} key={i}>
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 3 }} elevation={0}>
          <Avatar sx={{ bgcolor: item.isMoney ? '#e8f5e9' : '#e3f2fd', color: item.isMoney ? '#2e7d32' : '#1976d2' }}>
            {item.isMoney ? '$' : item.avatar}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
              <strong>{item.user}</strong> {item.action} <span style={{ color: '#1976d2', fontWeight: 500 }}>{item.target}</span>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.time}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    ))}
  </Grid>
);