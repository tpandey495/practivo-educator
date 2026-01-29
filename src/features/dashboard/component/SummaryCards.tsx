import { Grid, Card, CardContent, Box, Typography, Chip, Stack } from '@mui/material';
import {
  TrendingUpRounded,
  PeopleRounded,
  StarRounded,
  VisibilityRounded,
  CheckCircleRounded,
  DashboardRounded,
  ArrowUpwardRounded,
} from '@mui/icons-material';

const statData = [
  {
    label: 'TOTAL REVENUE',
    value: '$124,500',
    change: '+12%',
    icon: TrendingUpRounded,
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    iconBg: '#D1FAE5',
    iconColor: '#10B981',
    changeColor: '#065F46',
    changeBg: '#D1FAE5',
  },
  {
    label: 'TOTAL STUDENTS',
    value: '3,402',
    change: '+8%',
    icon: PeopleRounded,
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    iconBg: '#DBEAFE',
    iconColor: '#3B82F6',
    changeColor: '#1E40AF',
    changeBg: '#DBEAFE',
  },
  {
    label: 'AVG. RATING',
    value: '4.8 / 5.0',
    change: '+0.2',
    icon: StarRounded,
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    iconBg: '#FEF3C7',
    iconColor: '#F59E0B',
    changeColor: '#92400E',
    changeBg: '#FEF3C7',
  },
  {
    label: 'COURSE VIEWS',
    value: '85.2k',
    change: '+15%',
    icon: VisibilityRounded,
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    iconBg: '#EDE9FE',
    iconColor: '#8B5CF6',
    changeColor: '#6D28D9',
    changeBg: '#EDE9FE',
  },
  {
    label: 'COMPLETED',
    value: '12,900',
    change: '+22%',
    icon: CheckCircleRounded,
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
    iconBg: '#CCFBF1',
    iconColor: '#14B8A6',
    changeColor: '#0F766E',
    changeBg: '#CCFBF1',
  },
  {
    label: 'COURSE STATUS',
    value: '8 Active',
    change: '2 Draft',
    icon: DashboardRounded,
    gradient: 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
    iconBg: '#F1F5F9',
    iconColor: '#64748B',
    changeColor: '#475569',
    changeBg: '#F1F5F9',
  },
];

export const SummaryCards = () => (
  <Grid container spacing={2.5}>
    {statData.map((stat, index) => {
      const IconComponent = stat.icon;
      return (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                borderColor: stat.iconColor,
                '& .gradient-overlay': {
                  opacity: 0.15,
                },
              },
            }}
          >
            <Box
              className="gradient-overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                background: stat.gradient,
                opacity: 0.08,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
              }}
            />
            <CardContent sx={{ position: 'relative', p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: stat.iconBg,
                    color: stat.iconColor,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <IconComponent sx={{ fontSize: 24 }} />
                </Box>
                <Chip
                  icon={<ArrowUpwardRounded sx={{ fontSize: 14 }} />}
                  label={stat.change}
                  size="small"
                  sx={{
                    bgcolor: stat.changeBg,
                    color: stat.changeColor,
                    fontWeight: 700,
                    fontSize: '11px',
                    height: '24px',
                    '& .MuiChip-icon': {
                      color: stat.changeColor,
                      fontSize: '14px',
                    },
                  }}
                />
              </Stack>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748B',
                  fontWeight: 600,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'block',
                  mb: 1,
                }}
              >
                {stat.label}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: '#1E293B',
                  fontSize: { xs: '20px', sm: '24px' },
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  background: stat.gradient,
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      );
    })}
  </Grid>
);