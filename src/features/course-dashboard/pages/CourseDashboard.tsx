/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Stack,
  Divider,
  Avatar,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  Fab,
  useTheme,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormLabel,
  Switch,
  useMediaQuery,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  StarRounded,
  SearchRounded,
  DownloadRounded,
  AddRounded,
  CampaignRounded,
  MoreVertRounded,
  ArrowOutwardRounded,
  CheckCircleOutline,
  CloseRounded,
} from "@mui/icons-material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import {
  CourseHeader,
  KPI,
  Learner,
  Analytics,
  Enrollments,
  LearnerStatus,
} from "../types";
import {
  header,
  kpis,
  initialLearners,
  analytics,
  enrollments,
  STATUS_COLOR,
} from "../utils/mockData";
import { exportCSV } from "../utils/helpers";

/* ==============================
 * Small building blocks
 * ============================== */
function StatCard({ label, value, suffix }: KPI) {
  const theme = useTheme();

  // Color mapping for different KPIs
  const getCardColors = (label: string) => {
    if (label.includes("Enrolled")) {
      return {
        bg: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
        border: "#667EEA",
        iconBg: "#EEF2FF",
      };
    }
    if (label.includes("Completion")) {
      return {
        bg: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        border: "#10B981",
        iconBg: "#D1FAE5",
      };
    }
    if (label.includes("Revenue")) {
      return {
        bg: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        border: "#F59E0B",
        iconBg: "#FEF3C7",
      };
    }
    if (label.includes("Completed")) {
      return {
        bg: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
        border: "#3B82F6",
        iconBg: "#DBEAFE",
      };
    }
    return {
      bg: "linear-gradient(135deg, #4F39F6 0%, #3E2DC4 100%)",
      border: "#4F39F6",
      iconBg: "#F3E8FF",
    };
  };

  const colors = getCardColors(label);

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        border: `1px solid ${colors.border}20`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: colors.bg,
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />
      <CardContent sx={{ position: "relative", p: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: "#64748B",
            fontWeight: 600,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            mb: 1.5,
          }}
        >
          {label}
        </Typography>
        <Stack
          direction="row"
          alignItems="baseline"
          spacing={1}
          sx={{ mt: 0.5 }}
        >
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              color: "#1E293B",
              fontSize: { xs: "28px", md: "32px" },
            }}
          >
            {value}
          </Typography>
          {suffix && (
            <Typography
              variant="caption"
              sx={{
                color: "#94A3B8",
                fontWeight: 500,
                fontSize: "12px",
              }}
            >
              {suffix}
            </Typography>
          )}
        </Stack>
        <Box
          sx={{
            mt: 2,
            width: 40,
            height: 4,
            borderRadius: 2,
            background: colors.bg,
          }}
        />
      </CardContent>
    </Card>
  );
}

function StatMini({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        bgcolor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        transition: "all 0.2s",
        "&:hover": {
          borderColor: "#4F39F6",
          boxShadow: "0 2px 6px rgba(79, 57, 246, 0.1)",
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "#64748B",
          fontWeight: 600,
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          color: "#1E293B",
          mt: 0.5,
          fontSize: "18px",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function KPIRing({ percent = 68 }: { percent?: number }) {
  const data = [
    { name: "Completed", value: percent },
    { name: "Remaining", value: Math.max(0, 100 - percent) },
  ];
  const theme = useTheme();
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={85}
          paddingAngle={2}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          stroke="none"
        >
          <Cell fill={theme.palette.primary.main} />
          <Cell fill={theme.palette.action.hover} />
        </Pie>
        <ReTooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

function StatusChip({ status }: { status: LearnerStatus }) {
  return (
    <Chip label={status} size="small" color={STATUS_COLOR[status]} />
  ) as any;
}

/* ==============================
 * Dialogs
 * ============================== */
function AddLearnerDialog({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (l: Learner) => void;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<LearnerStatus>("Active");
  const [progress, setProgress] = React.useState<number>(0);

  const canAdd = name.trim().length > 1 && progress >= 0 && progress <= 100;

  const handleAdd = () => {
    const now = new Date().toISOString().slice(0, 10);
    onAdd({
      id: crypto.randomUUID(),
      name,
      email,
      enrolled: now,
      progress,
      status,
      lastActive: now,
    });
    setName("");
    setEmail("");
    setProgress(0);
    setStatus("Active");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Learner</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <TextField
            label="Progress (%)"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            type="number"
            inputProps={{ min: 0, max: 100 }}
          />
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as LearnerStatus)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CloseRounded />}>
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          disabled={!canAdd}
          variant="contained"
          startIcon={<AddRounded />}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function AnnouncementDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [sendEmail, setSendEmail] = React.useState(true);
  const [message, setMessage] = React.useState("");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Send Announcement</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Subject"
            fullWidth
            defaultValue={`Update for ${header.title}`}
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            minRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <FormLabel>Also send email</FormLabel>
            <Switch
              checked={sendEmail}
              onChange={(e) => setSendEmail(e.target.checked)}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={onClose}
          variant="contained"
          startIcon={<CampaignRounded />}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ==============================
 * Main Page
 * ============================== */
export default function CourseDashboard() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [query, setQuery] = React.useState<string>("");
  const [granularity, setGranularity] = React.useState<
    "Weekly" | "Monthly" | "Quarterly"
  >("Weekly");
  const [learners, setLearners] = React.useState<Learner[]>(initialLearners);
  const [addOpen, setAddOpen] = React.useState(false);
  const [annOpen, setAnnOpen] = React.useState(false);
  const [snack, setSnack] = React.useState<string | null>(null);

  const filteredLearners = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return learners;
    return learners.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.email?.toLowerCase().includes(q) ?? false)
    );
  }, [query, learners]);

  const PIE_COLORS = [
    theme.palette.success.main,
    theme.palette.primary.main,
    theme.palette.error.main,
  ];

  const handleAdd = (l: Learner) => {
    setLearners((prev) => [l, ...prev]);
    setSnack("Learner added successfully");
  };

  return (
    <Box
      sx={{
        bgcolor: "#F8FAFC",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        marginTop: "-15px",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          borderBottom: "2px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ md: "center" }}
            justifyContent="space-between"
          >
            <Box>
              <Typography
                variant={isMdUp ? "h5" : "h6"}
                fontWeight={700}
                sx={{
                  color: "#1E293B",
                  mb: 1,
                  fontSize: { xs: "20px", md: "24px" },
                }}
              >
                {header.title}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                <Chip
                  size="small"
                  label={`Course ID: ${header.id}`}
                  sx={{
                    bgcolor: "#EEF2FF",
                    color: "#4F46E5",
                    fontWeight: 600,
                    fontSize: "11px",
                  }}
                />
                <Chip
                  size="small"
                  label={`Category: ${header.category}`}
                  sx={{
                    bgcolor: "#F0FDF4",
                    color: "#16A34A",
                    fontWeight: 600,
                    fontSize: "11px",
                  }}
                />
                <Chip
                  size="small"
                  label={`Instructor: ${header.instructor}`}
                  sx={{
                    bgcolor: "#FEF3C7",
                    color: "#D97706",
                    fontWeight: 600,
                    fontSize: "11px",
                  }}
                />
              </Stack>
            </Box>

            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "#FFFBEB",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  border: "1px solid #FDE68A",
                }}
              >
                <StarRounded sx={{ color: "#F59E0B", fontSize: 20 }} />
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: "#92400E" }}
                >
                  {header.rating.toFixed(1)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#78350F", fontSize: "12px" }}
                >
                  ({header.reviews} reviews)
                </Typography>
              </Box>
              <Button
                endIcon={<ArrowOutwardRounded />}
                variant="contained"
                sx={{
                  bgcolor: "#4F39F6",
                  color: "#FFFFFF",
                  "&:hover": {
                    bgcolor: "#3E2DC4",
                    color: "#FFFFFF",
                  },
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2.5,
                }}
              >
                View Reviews
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4 }, py: 3 }}>
        {/* KPI Row */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#1E293B",
              fontWeight: 700,
              mb: 2,
              fontSize: "18px",
            }}
          >
            Key Performance Indicators
          </Typography>
          <Grid container spacing={2.5}>
            {kpis.map((k) => (
              <Grid item xs={12} sm={6} md={3} key={k.label}>
                <StatCard {...k} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Overview + Analytics top */}
        <Grid container spacing={2.5} sx={{ mb: 3, mt: 0 }}>
          {/* Course Overview with ring */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                bgcolor: "#FFFFFF",
              }}
            >
              <CardHeader
                action={
                  <IconButton size="small" sx={{ color: "#64748B" }}>
                    <MoreVertRounded />
                  </IconButton>
                }
                title={
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#1E293B", fontSize: "16px" }}
                  >
                    Overall Completion Rate
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="body2"
                    sx={{ color: "#64748B", fontSize: "12px", mt: 0.5 }}
                  >
                    Live cohort performance
                  </Typography>
                }
                sx={{
                  borderBottom: "1px solid #F1F5F9",
                  pb: 2,
                }}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={5}>
                    <KPIRing percent={header.completionOverall} />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <StatMini title="Total Enrolled" value="245" />
                      </Grid>
                      <Grid item xs={6}>
                        <StatMini title="Completion Rate" value="68%" />
                      </Grid>
                      <Grid item xs={6}>
                        <StatMini title="Revenue Generated" value="$12,450" />
                      </Grid>
                      <Grid item xs={6}>
                        <StatMini title="Completed Learners" value="20" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Small analytics card */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                bgcolor: "#FFFFFF",
              }}
            >
              <CardHeader
                action={
                  <IconButton size="small" sx={{ color: "#64748B" }}>
                    <MoreVertRounded />
                  </IconButton>
                }
                title={
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#1E293B", fontSize: "16px" }}
                  >
                    Analytics
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="body2"
                    sx={{ color: "#64748B", fontSize: "12px", mt: 0.5 }}
                  >
                    Distribution & engagement
                  </Typography>
                }
                sx={{
                  borderBottom: "1px solid #F1F5F9",
                  pb: 2,
                }}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <StatMini
                      title="Average Progress"
                      value={`${analytics.avgProgress}%`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StatMini
                      title="Active Learners"
                      value={analytics.active}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ height: 220, width: "100%", minWidth: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.distribution}
                        innerRadius={55}
                        outerRadius={85}
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={2}
                      >
                        {analytics.distribution.map((_, i) => (
                          <Cell
                            key={i}
                            fill={PIE_COLORS[i % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36} />
                      <ReTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Learners + Drop-off */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {/* Learners Table */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                bgcolor: "#FFFFFF",
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#1E293B", fontSize: "16px" }}
                  >
                    Learners ({learners.length})
                  </Typography>
                }
                sx={{
                  borderBottom: "1px solid #F1F5F9",
                  pb: 2,
                }}
                action={
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <TextField
                      size="small"
                      placeholder="Search by name or email"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchRounded />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<DownloadRounded />}
                      onClick={() => exportCSV(filteredLearners)}
                      sx={{
                        borderColor: "#CBD5E1",
                        color: "#475569",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#4F39F6",
                          bgcolor: "#F3E8FF",
                        },
                      }}
                    >
                      Export
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<AddRounded />}
                      onClick={() => setAddOpen(true)}
                      sx={{
                        bgcolor: "#4F39F6",
                        color: "#FFFFFF",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          bgcolor: "#3E2DC4",
                          color: "#FFFFFF",
                        },
                      }}
                    >
                      Add Learner
                    </Button>
                  </Stack>
                }
              />
              <CardContent sx={{ p: 0 }}>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow
                        sx={{
                          bgcolor: "#F8FAFC",
                          "& th": {
                            color: "#475569",
                            fontWeight: 700,
                            fontSize: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            borderBottom: "2px solid #E2E8F0",
                            py: 2,
                          },
                        }}
                      >
                        <TableCell>Learner</TableCell>
                        <TableCell>Enrolled Date</TableCell>
                        <TableCell>Progress</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Last Active</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredLearners.map((l) => (
                        <TableRow
                          key={l.id}
                          hover
                          sx={{
                            "&:hover": {
                              bgcolor: "#F8FAFC",
                            },
                            "& td": {
                              borderBottom: "1px solid #F1F5F9",
                              py: 2,
                            },
                          }}
                        >
                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                            >
                              <Avatar sx={{ width: 28, height: 28 }}>
                                {l.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography fontWeight={600}>
                                  {l.name}
                                </Typography>
                                {l.email && (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {l.email}
                                  </Typography>
                                )}
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell>{l.enrolled}</TableCell>
                          <TableCell>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              sx={{ minWidth: 160 }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={l.progress}
                                  sx={{ height: 8, borderRadius: 999 }}
                                />
                              </Box>
                              <Chip
                                label={`${l.progress}%`}
                                size="small"
                                sx={{
                                  bgcolor:
                                    l.progress === 100
                                      ? "#DBEAFE"
                                      : l.progress >= 70
                                      ? "#D1FAE5"
                                      : l.progress >= 40
                                      ? "#FEF3C7"
                                      : "#FEE2E2",
                                  color:
                                    l.progress === 100
                                      ? "#1E40AF"
                                      : l.progress >= 70
                                      ? "#065F46"
                                      : l.progress >= 40
                                      ? "#92400E"
                                      : "#991B1B",
                                  fontWeight: 600,
                                  fontSize: "11px",
                                }}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <StatusChip status={l.status} />
                          </TableCell>
                          <TableCell>{l.lastActive}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Drop-off + Rating */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                bgcolor: "#FFFFFF",
              }}
            >
              <CardContent sx={{ pt: 3, pb: 3 }}>
                {/* Rating Section */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pb: 3,
                    mb: 3,
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        fontWeight: 500,
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        mb: 1,
                      }}
                    >
                      Course Rating & Feedback
                    </Typography>
                  </Box>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    divider={
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: "#E2E8F0", height: 24 }}
                      />
                    }
                  >
                    <Stack direction="row" spacing={1} alignItems="baseline">
                      <StarRounded
                        sx={{
                          color: "#F59E0B",
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                          color: "#1E293B",
                          fontSize: "28px",
                          lineHeight: 1,
                        }}
                      >
                        {analytics.rating.value.toFixed(1)}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {analytics.rating.reviews} reviews
                    </Typography>
                  </Stack>
                </Box>

                {/* Drop-off Points Section */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2.5,
                      color: "#64748B",
                      fontWeight: 600,
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Common Drop-off Points
                  </Typography>

                  <Stack spacing={1.5}>
                    {analytics.dropoff.map((d, index) => {
                      const getColorScheme = (value: number) => {
                        if (value >= 20)
                          return {
                            bg: "#FEF2F2",
                            text: "#1E293B",
                            bar: "#FCA5A5",
                            border: "#FEE2E2",
                          };
                        if (value >= 15)
                          return {
                            bg: "#FFFBEB",
                            text: "#1E293B",
                            bar: "#FCD34D",
                            border: "#FEF3C7",
                          };
                        return {
                          bg: "#FFFBEB",
                          text: "#1E293B",
                          bar: "#FBBF24",
                          border: "#FEF3C7",
                        };
                      };
                      const colors = getColorScheme(d.value);
                      return (
                        <Box
                          key={d.lesson}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "#FFFFFF",
                            border: `1px solid ${colors.border}`,
                            transition: "all 0.2s ease",
                            cursor: "pointer",
                            "&:hover": {
                              borderColor: "#4F39F6",
                              bgcolor: "#F8FAFC",
                              boxShadow: "0 2px 8px rgba(79, 57, 246, 0.08)",
                              transform: "translateY(-1px)",
                              "& .dropoff-text": {
                                color: "#4F39F6",
                              },
                              "& .dropoff-percent": {
                                color: "#4F39F6",
                              },
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="body2"
                              className="dropoff-text"
                              sx={{
                                color: colors.text,
                                fontWeight: 500,
                                fontSize: "13px",
                                transition: "color 0.2s",
                              }}
                            >
                              {d.lesson}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="dropoff-percent"
                              sx={{
                                color: colors.text,
                                fontWeight: 600,
                                fontSize: "13px",
                                transition: "color 0.2s",
                              }}
                            >
                              {d.value}%
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              height: 8,
                              borderRadius: 4,
                              bgcolor: "#F1F5F9",
                              overflow: "hidden",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                width: `${d.value}%`,
                                height: "100%",
                                bgcolor: colors.bar,
                                borderRadius: 4,
                                transition:
                                  "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                              }}
                            />
                          </Box>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Enrollments Over Time */}
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                bgcolor: "#FFFFFF",
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#1E293B", fontSize: "16px" }}
                  >
                    Enrollments Over Time
                  </Typography>
                }
                sx={{
                  borderBottom: "1px solid #F1F5F9",
                  pb: 2,
                }}
                action={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FormControl size="small">
                      <Select
                        value={granularity}
                        onChange={(e) => setGranularity(e.target.value as any)}
                      >
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                        <MenuItem value="Quarterly">Quarterly</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#CBD5E1",
                        color: "#475569",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#4F39F6",
                          bgcolor: "#F3E8FF",
                        },
                      }}
                    >
                      Last 6 Weeks
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#CBD5E1",
                        color: "#475569",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#4F39F6",
                          bgcolor: "#F3E8FF",
                        },
                      }}
                    >
                      Last 3 Months
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#CBD5E1",
                        color: "#475569",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#4F39F6",
                          bgcolor: "#F3E8FF",
                        },
                      }}
                    >
                      Year to Date
                    </Button>
                  </Stack>
                }
              />
              <CardContent>
                <Box sx={{ height: 300, width: "100%", minWidth: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={enrollments.series}
                      margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                    >
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ReTooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={theme.palette.primary.main}
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatMini
                      title="Total Enrollment"
                      value={enrollments.total.toLocaleString()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatMini
                      title="Unique Students"
                      value={enrollments.unique.toLocaleString()}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Floating Quick Actions */}
      <Stack
        direction="column"
        spacing={1.5}
        sx={{ position: "fixed", right: 24, bottom: 24, zIndex: 100 }}
      >
        <Tooltip title="Send Announcement">
          <Fab color="primary" onClick={() => setAnnOpen(true)}>
            <CampaignRounded />
          </Fab>
        </Tooltip>
        <Tooltip title="Add Learner">
          <Fab color="secondary" onClick={() => setAddOpen(true)}>
            <AddRounded />
          </Fab>
        </Tooltip>
        <Tooltip title="Export Data">
          <Fab
            onClick={() => exportCSV(filteredLearners)}
            sx={{
              bgcolor: "success.main",
              color: "white",
              "&:hover": { bgcolor: "success.dark" },
            }}
          >
            <DownloadRounded />
          </Fab>
        </Tooltip>
      </Stack>

      {/* Dialogs */}
      <AddLearnerDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
      <AnnouncementDialog open={annOpen} onClose={() => setAnnOpen(false)} />

      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        onClose={() => setSnack(null)}
      >
        <Alert
          icon={<CheckCircleOutline />}
          onClose={() => setSnack(null)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack}
        </Alert>
      </Snackbar>
    </Box>
  );
}
