import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ShareIcon from '@mui/icons-material/Share';
import SchoolIcon from '@mui/icons-material/School';
import BoltIcon from '@mui/icons-material/Bolt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SyncIcon from '@mui/icons-material/Sync';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TerminalIcon from '@mui/icons-material/Terminal';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CodeIcon from '@mui/icons-material/Code';

// Theme constants
const COLORS = {
  primary: '#a83900',
  primaryContainer: '#ff6b2c',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#5c1c00',
  tertiary: '#4d44e3',
  tertiaryContainer: '#8f8cff',
  onTertiaryContainer: '#1e00a8',
  secondary: '#5f5e5e',
  secondaryContainer: '#e2dfde',
  onSecondaryContainer: '#636262',
  background: '#f8f9fa',
  surface: '#f8f9fa',
  surfaceContainer: '#edeeef',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerHighest: '#e1e3e4',
  onSurface: '#191c1d',
  onSurfaceVariant: '#594139',
  outline: '#8d7167',
  outlineVariant: '#e2bfb3',
  error: '#ba1a1a',
};

const FONTS = {
  headline: '"Plus Jakarta Sans", sans-serif',
  body: '"Inter", sans-serif',
  label: '"Geist", sans-serif',
};

const glassCardSx = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(12px)',
  border: `1px solid rgba(0, 0, 0, 0.05)`,
  boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.05)',
  borderRadius: 6,
  p: 5,
  transition: 'all 0.7s ease',
  opacity: 0,
  transform: 'translateY(40px)',
};

export default function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.glass-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ bgcolor: COLORS.background, color: COLORS.onSurface, minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Navbar */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: alpha(COLORS.surface, 0.8), 
          backdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${alpha(COLORS.outlineVariant, 0.2)}`
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
            <Stack direction="row" alignItems="center" spacing={5}>
              <Typography variant="h5" sx={{ fontFamily: FONTS.headline, fontWeight: 800, color: COLORS.primary, letterSpacing: '-0.04em' }}>
                Practivo
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              {!isMobile && (
                <Button 
                  component={Link} 
                  to="/login" 
                  variant="contained"
                  sx={{ 
                    bgcolor: COLORS.primary,
                    color: COLORS.onPrimary, 
                    fontFamily: FONTS.label, 
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { bgcolor: COLORS.primaryContainer }
                  }}
                >
                  Log In
                </Button>
              )}
              <Button 
                component={Link} 
                to="/login"
                variant="contained" 
                sx={{ 
                  bgcolor: COLORS.primaryContainer, 
                  color: COLORS.onPrimary,
                  fontFamily: FONTS.label,
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: `0 8px 24px ${alpha(COLORS.primaryContainer, 0.2)}`,
                  '&:hover': { bgcolor: COLORS.primaryContainer, transform: 'scale(1.05)' }
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main">
        {/* Hero Section */}
        <Box 
          sx={{ 
            position: 'relative', 
            pb: { xs: 10, md: 12 }, 
            pt: { xs: 4, md: 6 },
            overflow: 'hidden',
            background: `radial-gradient(circle at 50% 50%, ${alpha(COLORS.primaryContainer, 0.08)} 0%, ${alpha(COLORS.background, 0)} 70%)`
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box 
                  sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    bgcolor: alpha(COLORS.primaryContainer, 0.1), 
                    px: 2, 
                    py: 1, 
                    borderRadius: 8, 
                    border: `1px solid ${alpha(COLORS.primaryContainer, 0.2)}`,
                    mb: 4 
                  }}
                >
                  <AutoAwesomeIcon sx={{ color: COLORS.primary, fontSize: 18 }} />
                  <Typography sx={{ fontFamily: FONTS.label, fontWeight: 600, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 14 }}>
                    Educator Platform
                  </Typography>
                </Box>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontFamily: FONTS.headline, 
                    fontWeight: 800, 
                    fontSize: { xs: 40, md: 72 }, 
                    lineHeight: 1.1, 
                    letterSpacing: '-0.04em',
                    mb: 3
                  }}
                >
                  turn your <Box component="span" sx={{ color: COLORS.primaryContainer }}>viewers</Box><br />into learners.
                </Typography>
                <Typography sx={{ fontFamily: FONTS.body, fontSize: 18, color: COLORS.onSurfaceVariant, mb: 6, maxWidth: 600, lineHeight: 1.6 }}>
                  The easiest way for YouTube educators to create, distribute, and monetize interactive coding drills. Stop being a video host—start being a mentor.
                </Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Button 
                    component={Link}
                    to="/login"
                    variant="contained" 
                    sx={{ 
                      bgcolor: COLORS.primaryContainer, 
                      color: COLORS.onPrimary,
                      fontFamily: FONTS.headline,
                      fontWeight: 600,
                      fontSize: 18,
                      textTransform: 'none',
                      px: 5,
                      py: 2,
                      borderRadius: 3,
                      boxShadow: `0 16px 40px ${alpha(COLORS.primaryContainer, 0.3)}`,
                      '&:hover': { bgcolor: COLORS.primaryContainer, transform: 'scale(1.05)' }
                    }}
                  >
                    Create your first exercise
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                    sx={{ 
                      borderColor: COLORS.outline, 
                      color: COLORS.onSurface,
                      fontFamily: FONTS.headline,
                      fontWeight: 600,
                      fontSize: 18,
                      textTransform: 'none',
                      px: 5,
                      py: 2,
                      borderRadius: 3,
                      '&:hover': { bgcolor: COLORS.surfaceContainer, borderColor: COLORS.outline }
                    }}
                  >
                    See how it works
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ borderRadius: 6, overflow: 'hidden', boxShadow: 12, border: `1px solid ${alpha(COLORS.outlineVariant, 0.2)}` }}>
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG5s112MiHox0nEprTm8CiaHw7Xxai8Rjg4rvenOa6Ylu1W1s5a7wxFzIyqC-He_Oz5xJz8equw7u6HxdNuZf7jHrQ6VN0odkNDUPXOmx4HktT7tqnk92GEVY3kwINXHbX_A70cHbymjRiXa7BWukphC9s9h67FOryn3qiDIVhgjbpKr7iIG9usvML-_FP5O4KsoV9nmyGgV4uUs2PTu2eDUUjNfBm6B4xIw7LcdfJbs7-FcBI8zIj" 
                    alt="Dashboard" 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 10, textAlign: 'center' }}>
              <Typography sx={{ fontFamily: FONTS.label, fontWeight: 600, color: alpha(COLORS.onSurfaceVariant, 0.6), textTransform: 'uppercase', letterSpacing: '0.1em', mb: 4 }}>
                Join 10+ top educators already using Practivo
              </Typography>
              <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={6} sx={{ opacity: 0.7, filter: 'grayscale(1)', transition: 'all 0.5s', '&:hover': { opacity: 1, filter: 'grayscale(0)' } }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CodeIcon sx={{ color: COLORS.primary }} />
                  <Typography sx={{ fontFamily: FONTS.headline, fontWeight: 600, fontSize: 20 }}>TrioCareers</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TerminalIcon sx={{ color: COLORS.primary }} />
                  <Typography sx={{ fontFamily: FONTS.headline, fontWeight: 600, fontSize: 20 }}>Beyond Surface</Typography>
                </Stack>
              </Stack>
            </Box>
          </Container>
        </Box>

        {/* How It Works */}
        <Box id="how-it-works" sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" sx={{ fontFamily: FONTS.headline, fontWeight: 700, fontSize: { xs: 32, md: 48 }, mb: 2 }}>
                How It Works
              </Typography>
              <Typography sx={{ fontFamily: FONTS.body, fontSize: 18, color: COLORS.onSurfaceVariant, maxWidth: 700, mx: 'auto' }}>
                Transform your educational content into an interactive learning experience in four simple steps.
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              {[
                { icon: <EditNoteIcon fontSize="large" sx={{ color: COLORS.primary }} />, title: "Create & Organize", desc: "Educators create exercises and organize them into structured chapters and lessons.", bg: alpha(COLORS.primaryContainer, 0.1) },
                { icon: <AutoAwesomeIcon fontSize="large" sx={{ color: COLORS.tertiary }} />, title: "AI-Powered Generation", desc: "Leverage AI to generate diverse question types (coding, MCQ, subjective) instantly.", bg: alpha(COLORS.tertiaryContainer, 0.1) },
                { icon: <ShareIcon fontSize="large" sx={{ color: COLORS.onSecondaryContainer }} />, title: "Review & Share", desc: "Perform manual review and paste the lesson link directly into video descriptions.", bg: alpha(COLORS.secondaryContainer, 0.3) },
                { icon: <SchoolIcon fontSize="large" sx={{ color: COLORS.primary }} />, title: "Student Practice", desc: "Learners click the link to enter an immersive practice environment and master the material.", bg: alpha(COLORS.primaryContainer, 0.1) }
              ].map((step, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Box sx={{ textAlign: 'center', '&:hover .icon-container': { transform: 'scale(1.1)' } }}>
                    <Box className="icon-container" sx={{ width: 64, height: 64, borderRadius: 4, bgcolor: step.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, transition: 'transform 0.3s' }}>
                      {step.icon}
                    </Box>
                    <Typography sx={{ fontFamily: FONTS.headline, fontWeight: 600, fontSize: 24, mb: 1.5 }}>{step.title}</Typography>
                    <Typography sx={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.onSurfaceVariant }}>{step.desc}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Bento Grid */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 8, maxWidth: 600 }}>
              <Typography variant="h2" sx={{ fontFamily: FONTS.headline, fontWeight: 700, fontSize: { xs: 32, md: 48 }, mb: 2 }}>
                Built for the next generation of instructors.
              </Typography>
              <Typography sx={{ fontFamily: FONTS.body, fontSize: 18, color: COLORS.onSurfaceVariant }}>
                We removed the friction between your video content and your student's muscle memory.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* AI Powered Creation */}
              <Grid item xs={12} md={8}>
                <Box className="glass-card" sx={{ ...glassCardSx, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5, alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ width: 64, height: 64, borderRadius: 4, bgcolor: alpha(COLORS.primaryContainer, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                      <BoltIcon fontSize="large" sx={{ color: COLORS.primary }} />
                    </Box>
                    <Typography sx={{ fontFamily: FONTS.headline, fontWeight: 600, fontSize: 24, mb: 2 }}>AI-Powered Creation</Typography>
                    <Typography sx={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.onSurfaceVariant, mb: 3 }}>
                      Paste your video link and we'll generate interactive exercises in seconds. Our AI analyzes your code walkthroughs and builds test suites automatically.
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ color: COLORS.primary, cursor: 'pointer', '&:hover .arrow': { transform: 'translateX(4px)' } }}>
                      <Typography sx={{ fontFamily: FONTS.label, fontWeight: 600, fontSize: 14 }}>Explore AI Tools</Typography>
                      <ArrowForwardIcon className="arrow" sx={{ fontSize: 18, transition: 'transform 0.2s' }} />
                    </Stack>
                  </Box>
                  <Box sx={{ flex: 1, width: '100%', bgcolor: COLORS.surfaceContainer, borderRadius: 4, p: 3, border: `1px solid ${alpha(COLORS.outlineVariant, 0.3)}` }}>
                    <Stack direction="row" spacing={0.5} mb={3}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: alpha(COLORS.error, 0.2) }} />
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: alpha(COLORS.primary, 0.2) }} />
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: alpha(COLORS.secondary, 0.2) }} />
                    </Stack>
                    <Stack spacing={2}>
                      <Box sx={{ height: 12, borderRadius: 10, bgcolor: COLORS.surfaceContainerHighest, width: '75%' }} />
                      <Box sx={{ height: 12, borderRadius: 10, bgcolor: COLORS.surfaceContainerHighest, width: '100%' }} />
                      <Box sx={{ height: 12, borderRadius: 10, bgcolor: alpha(COLORS.primaryContainer, 0.2), width: '50%' }} />
                      <Stack direction="row" alignItems="center" spacing={1} pt={2}>
                        <SyncIcon sx={{ color: COLORS.primaryContainer, animation: 'spin 1.5s linear infinite', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
                        <Typography sx={{ fontFamily: FONTS.label, fontWeight: 600, color: COLORS.primary, fontSize: 14 }}>Generating test cases...</Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Grid>

              {/* Detailed Analytics */}
              <Grid item xs={12} md={4}>
                <Box className="glass-card" sx={{ ...glassCardSx, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box sx={{ width: 64, height: 64, borderRadius: 4, bgcolor: alpha(COLORS.tertiaryContainer, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <AnalyticsIcon fontSize="large" sx={{ color: COLORS.tertiary }} />
                  </Box>
                  <Typography sx={{ fontFamily: FONTS.headline, fontWeight: 600, fontSize: 24, mb: 2 }}>Detailed Analytics</Typography>
                  <Typography sx={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.onSurfaceVariant }}>
                    See exactly where your audience is struggling. Identify common syntax errors and drop-off points in your curricula.
                  </Typography>
                  <Box sx={{ mt: 'auto', pt: 4, borderTop: `1px solid ${alpha(COLORS.outlineVariant, 0.1)}` }}>
                    <Stack direction="row" alignItems="flex-end" spacing={0.5} sx={{ height: 80 }}>
                      {[40, 60, 90, 75, 45].map((h, i) => (
                        <Box key={i} sx={{ flex: 1, bgcolor: alpha(COLORS.tertiaryContainer, h/100), height: `${h}%`, borderRadius: '4px 4px 0 0' }} />
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Grid>

              {/* Sandbox */}
              <Grid item xs={12} md={4}>
                <Box className="glass-card" sx={{ ...glassCardSx, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box sx={{ width: 64, height: 64, borderRadius: 4, bgcolor: alpha(COLORS.primaryContainer, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <TerminalIcon fontSize="large" sx={{ color: COLORS.primary }} />
                  </Box>
                  <Typography sx={{ fontFamily: FONTS.headline, fontWeight: 600, fontSize: 24, mb: 2 }}>In-Browser Sandbox</Typography>
                  <Typography sx={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.onSurfaceVariant }}>
                    No local setup for your students; they code directly on the page with a full VS Code-like experience.
                  </Typography>
                </Box>
              </Grid>

              {/* Monetization */}
              <Grid item xs={12} md={8}>
                <Box className="glass-card" sx={{ ...glassCardSx, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5, alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ width: 64, height: 64, borderRadius: 4, bgcolor: alpha(COLORS.secondaryContainer, 0.3), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                      <PaymentsIcon fontSize="large" sx={{ color: COLORS.onSecondaryContainer }} />
                    </Box>
                    <Typography sx={{ fontFamily: FONTS.headline, fontWeight: 600, fontSize: 24, mb: 2 }}>Monetization</Typography>
                    <Typography sx={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.onSurfaceVariant }}>
                      Seamlessly sell access to premium practice sets. Integrate with Stripe and offer tiers that reward your most dedicated learners.
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, position: 'relative' }}>
                    <Box sx={{ bgcolor: COLORS.surfaceContainerLowest, p: 3, borderRadius: 4, border: `1px solid ${alpha(COLORS.outlineVariant, 0.3)}`, boxShadow: 4, transform: 'rotate(3deg)' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                        <Typography sx={{ fontFamily: FONTS.label, fontWeight: 600 }}>Course Revenue</Typography>
                        <Typography sx={{ fontFamily: FONTS.headline, fontWeight: 600, fontSize: 24, color: COLORS.primary }}>+$4,280.00</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ bgcolor: COLORS.surfaceContainer, p: 1.5, borderRadius: 2 }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: alpha(COLORS.primaryContainer, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <PersonIcon sx={{ color: COLORS.primary }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ height: 8, bgcolor: alpha(COLORS.onSurfaceVariant, 0.2), borderRadius: 10, width: 96 }} />
                        </Box>
                        <Typography sx={{ fontFamily: FONTS.label, fontWeight: 600 }}>$29.00</Typography>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Diverse Question Types */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" sx={{ fontFamily: FONTS.headline, fontWeight: 700, fontSize: { xs: 32, md: 48 }, mb: 2 }}>
                Diverse Question Types for Deep Learning
              </Typography>
              <Typography sx={{ fontFamily: FONTS.body, fontSize: 18, color: COLORS.onSurfaceVariant, maxWidth: 700, mx: 'auto' }}>
                Go beyond simple quizzes with specialized environments designed for every learning objective.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {[
                { icon: <ChecklistIcon fontSize="large" sx={{ color: COLORS.primary }} />, title: "Adaptive MCQs", desc: "Interactive multiple-choice questions with instant feedback and branching logic based on student performance.", bg: alpha(COLORS.primaryContainer, 0.1) },
                { icon: <PsychologyIcon fontSize="large" sx={{ color: COLORS.tertiary }} />, title: "AI-Evaluated Subjective", desc: "Long-form and short-answer questions graded by our advanced AI for nuanced feedback on conceptual understanding.", bg: alpha(COLORS.tertiaryContainer, 0.1) },
                { icon: <CodeIcon fontSize="large" sx={{ color: COLORS.onSecondaryContainer }} />, title: "Advanced Coding Environment", desc: "Support for 50+ programming languages with real-time execution, custom test case validation, and linting.", bg: alpha(COLORS.secondaryContainer, 0.3) }
              ].map((item, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Box className="glass-card" sx={{ ...glassCardSx, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ width: 64, height: 64, borderRadius: 4, bgcolor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                      {item.icon}
                    </Box>
                    <Typography sx={{ fontFamily: FONTS.headline, fontWeight: 600, fontSize: 24, mb: 2 }}>{item.title}</Typography>
                    <Typography sx={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.onSurfaceVariant }}>{item.desc}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Final CTA */}
        <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 8 } }}>
          <Container maxWidth="lg">
            <Box 
              sx={{ 
                bgcolor: COLORS.primaryContainer, 
                borderRadius: 10, 
                p: { xs: 5, md: 12 }, 
                position: 'relative', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center' 
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute', 
                  inset: 0, 
                  opacity: 0.1, 
                  pointerEvents: 'none', 
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
                  backgroundSize: '40px 40px' 
                }} 
              />
              <Typography 
                variant="h2" 
                sx={{ 
                  fontFamily: FONTS.headline, 
                  fontWeight: 800, 
                  fontSize: { xs: 40, md: 72 }, 
                  color: COLORS.onPrimary, 
                  mb: 4, 
                  position: 'relative', 
                  zIndex: 1,
                  letterSpacing: '-0.04em'
                }}
              >
                Scale your educational impact.
              </Typography>
              <Typography sx={{ fontFamily: FONTS.body, fontSize: 18, color: alpha(COLORS.onPrimary, 0.9), maxWidth: 600, mb: 6, position: 'relative', zIndex: 1 }}>
                Join the elite circle of YouTube creators who are building the future of online education. Start for free, upgrade as you grow.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                <Button 
                  component={Link} 
                  to="/login"
                  variant="contained" 
                  sx={{ 
                    bgcolor: COLORS.primary, 
                    color: COLORS.onPrimary,
                    fontFamily: FONTS.headline,
                    fontWeight: 600,
                    fontSize: 20,
                    textTransform: 'none',
                    px: 6,
                    py: 3,
                    borderRadius: 4,
                    boxShadow: 6,
                    '&:hover': { bgcolor: COLORS.primaryContainer, transform: 'scale(1.02)' }
                  }}
                >
                  Get Started for Free
                </Button>
                <Button 
                  disabled
                  variant="outlined" 
                  sx={{ 
                    borderColor: COLORS.onPrimary, 
                    color: COLORS.onPrimary,
                    fontFamily: FONTS.headline,
                    fontWeight: 600,
                    fontSize: 20,
                    textTransform: 'none',
                    borderWidth: 2,
                    px: 6,
                    py: 3,
                    borderRadius: 4,
                    '&:hover': { bgcolor: alpha(COLORS.onPrimary, 0.1), borderColor: COLORS.onPrimary, borderWidth: 2 }
                  }}
                >
                  Book a Demo
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: COLORS.surfaceContainerLowest, borderTop: `1px solid ${alpha(COLORS.outlineVariant, 0.1)}` }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={6} sx={{ py: 10 }}>
            <Stack spacing={2} alignItems={{ xs: 'flex-start', md: 'flex-start' }}>
              <Typography sx={{ fontFamily: FONTS.headline, fontWeight: 800, color: COLORS.primary, fontSize: 24 }}>Practivo</Typography>
              <Typography sx={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.onSurfaceVariant, maxWidth: 300 }}>
                Master through action. The professional platform for interactive learning.
              </Typography>
            </Stack>
            
            <Stack direction="row" flexWrap="wrap" gap={4}>
              {['About Us', 'Privacy Policy', 'Terms of Service', 'Support'].map((link) => (
                <Typography key={link} component="a" href="#" sx={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.onSurfaceVariant, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
                  {link}
                </Typography>
              ))}
              <Typography component="a" href="mailto:contact@practivo.net" sx={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.primary, fontWeight: 600, textDecoration: 'none' }}>
                contact@practivo.net
              </Typography>
            </Stack>
            
            <Typography sx={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.onSurfaceVariant }}>
              © 2024 Practivo. Master through action.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
