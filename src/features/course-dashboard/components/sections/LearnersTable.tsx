import * as React from "react";
import { Card, CardHeader, CardContent, Typography, Stack, TextField, InputAdornment, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, LinearProgress, Chip } from "@mui/material";
import { DownloadRounded, AddRounded, SearchRounded, MoreVertRounded } from "@mui/icons-material";
import type { Learner } from "../../types";
import { exportCSV } from "../../utils/helpers";
import StatusChip from "../common/StatusChip";

export default function LearnersTable({ learners, onAddOpen }: { learners: Learner[]; onAddOpen: () => void }) {
  const [query, setQuery] = React.useState<string>("");
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return learners;
    return learners.filter((l) => l.name.toLowerCase().includes(q) || (l.email?.toLowerCase().includes(q) ?? false));
  }, [query, learners]);
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardHeader
        title={<Typography variant="h6" fontWeight={800}>Learners ({learners.length})</Typography>}
        action={
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              size="small"
              placeholder="Search by name or email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{ startAdornment: (<InputAdornment position="start"><SearchRounded /></InputAdornment>) }}
            />
            <Button variant="outlined" startIcon={<DownloadRounded />} onClick={() => exportCSV(filtered)}>
              Export
            </Button>
            <Button variant="contained" startIcon={<AddRounded />} onClick={onAddOpen}>
              Add Learner
            </Button>
          </Stack>
        }
      />
      <CardContent>
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Learner</TableCell>
                <TableCell>Enrolled Date</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ width: 28, height: 28 }}>{l.name.charAt(0)}</Avatar>
                      <Stack>
                        <Typography fontWeight={600}>{l.name}</Typography>
                        {l.email && (<Typography variant="caption" color="text.secondary">{l.email}</Typography>)}
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>{l.enrolled}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 160 }}>
                      <Stack sx={{ flex: 1 }}>
                        <LinearProgress variant="determinate" value={l.progress} sx={{ height: 8, borderRadius: 999 }} />
                      </Stack>
                      <Chip label={`${l.progress}%`} size="small" color={l.progress === 100 ? "info" : "default"} />
                    </Stack>
                  </TableCell>
                  <TableCell><StatusChip status={l.status} /></TableCell>
                  <TableCell>{l.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}


