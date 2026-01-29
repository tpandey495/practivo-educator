import { Avatar, Paper, Typography, Box, Grid, Stack, Chip } from '@mui/material';
import {
  PersonAddRounded,
  CheckCircleRounded,
  AccountBalanceWalletRounded,
  StarRounded,
} from '@mui/icons-material';

const activities = [
  {
    user: 'Sarah J.',
    action: 'enrolled in',
    target: 'UI/UX Masterclass',
    time: '2 minutes ago',
    avatar: 'S',
    icon: PersonAddRounded,
    iconColor: '#3B82F6',
    iconBg: '#DBEAFE',
    type: 'enrollment',
  },
  {
    user: 'Mike T.',
    action: 'completed',
    target: 'Lesson 4 in React',
    time: '15 minutes ago',
    avatar: 'M',
    icon: CheckCircleRounded,
    iconColor: '#10B981',
    iconBg: '#D1FAE5',
    type: 'completion',
  },
  {
    user: 'Payout',
    action: 'of $4,250',
    target: 'processed',
    time: '1 hour ago',
    isMoney: true,
    icon: AccountBalanceWalletRounded,
    iconColor: '#10B981',
    iconBg: '#D1FAE5',
    type: 'payout',
  },
  {
    user: 'Emily R.',
    action: 'left a',
    target: '5-star review',
    time: '3 hours ago',
    avatar: 'E',
    icon: StarRounded,
    iconColor: '#F59E0B',
    iconBg: '#FEF3C7',
    type: 'review',
  },
];

export const ActivityFeed = () => (
  <Grid container spacing={2.5}>
    {activities.map((item, i) => {
      const IconComponent = item.icon;
      return (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5 },
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              background: 'white',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                borderColor: item.iconColor,
                '&::before': {
                  opacity: 0.1,
                },
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${item.iconColor} 0%, transparent 100%)`,
                opacity: 0,
                transition: 'opacity 0.3s ease',
              },
            }}
          >
            <Avatar
              sx={{
                bgcolor: item.iconBg,
                color: item.iconColor,
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {item.isMoney ? (
                <IconComponent sx={{ fontSize: 22 }} />
              ) : (
                <IconComponent sx={{ fontSize: 20 }} />
              )}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.4,
                  fontSize: { xs: '13px', sm: '14px' },
                  color: '#1e293b',
                  mb: 0.5,
                }}
              >
                <Box
                  component="span"
                  sx={{ fontWeight: 700, color: '#1e293b' }}
                >
                  {item.user}
                </Box>{' '}
                {item.action}{' '}
                <Box
                  component="span"
                  sx={{
                    color: item.iconColor,
                    fontWeight: 600,
                  }}
                >
                  {item.target}
                </Box>
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#64748b',
                    fontSize: '11px',
                    fontWeight: 500,
                  }}
                >
                  {item.time}
                </Typography>
                {item.type === 'payout' && (
                  <Chip
                    label="Payment"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '10px',
                      fontWeight: 600,
                      bgcolor: '#dcfce7',
                      color: '#166534',
                      border: 'none',
                    }}
                  />
                )}
              </Stack>
            </Box>
          </Paper>
        </Grid>
      );
    })}
  </Grid>
);