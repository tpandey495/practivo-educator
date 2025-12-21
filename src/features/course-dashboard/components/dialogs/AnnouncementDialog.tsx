import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, FormLabel, Switch, Button } from "@mui/material";
import { CampaignRounded } from "@mui/icons-material";
import { header } from "../../utils/mockData";

export default function AnnouncementDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sendEmail, setSendEmail] = React.useState(true);
  const [message, setMessage] = React.useState("");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Send Announcement</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Subject" fullWidth defaultValue={`Update for ${header.title}`} />
          <TextField label="Message" fullWidth multiline minRows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          <Stack direction="row" spacing={1} alignItems="center">
            <FormLabel>Also send email</FormLabel>
            <Switch checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onClose} variant="contained" startIcon={<CampaignRounded />}>Send</Button>
      </DialogActions>
    </Dialog>
  );
}


