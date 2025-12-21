import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, FormControl, FormLabel, MenuItem, Select, Button } from "@mui/material";
import { AddRounded, CloseRounded } from "@mui/icons-material";
import type { Learner, LearnerStatus } from "../../types";

export default function AddLearnerDialog({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (l: Learner) => void }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<LearnerStatus>("Active");
  const [progress, setProgress] = React.useState<number>(0);

  const canAdd = name.trim().length > 1 && progress >= 0 && progress <= 100;

  const handleAdd = () => {
    const now = new Date().toISOString().slice(0, 10);
    onAdd({ id: crypto.randomUUID(), name, email, enrolled: now, progress, status, lastActive: now });
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
          <TextField autoFocus label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <TextField
            label="Progress (%)"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            type="number"
            inputProps={{ min: 0, max: 100 }}
          />
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value as LearnerStatus)}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CloseRounded />}>Cancel</Button>
        <Button onClick={handleAdd} disabled={!canAdd} variant="contained" startIcon={<AddRounded />}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}


