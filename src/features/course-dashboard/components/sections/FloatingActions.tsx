import { Stack, Tooltip, Fab } from "@mui/material";
import { CampaignRounded, AddRounded, DownloadRounded } from "@mui/icons-material";
import type { Learner } from "../../types";
import { exportCSV } from "../../utils/helpers";

export default function FloatingActions({ onAnnounce, onAdd, learners }: { onAnnounce: () => void; onAdd: () => void; learners: Learner[] }) {
  return (
    <Stack direction="column" spacing={1.5} sx={{ position: "fixed", right: 24, bottom: 24, zIndex: 100 }}>
      <Tooltip title="Send Announcement">
        <Fab color="primary" onClick={onAnnounce}>
          <CampaignRounded />
        </Fab>
      </Tooltip>
      <Tooltip title="Add Learner">
        <Fab color="secondary" onClick={onAdd}>
          <AddRounded />
        </Fab>
      </Tooltip>
      <Tooltip title="Export Data">
        <Fab onClick={() => exportCSV(learners)} sx={{ bgcolor: "success.main", color: "white", "&:hover": { bgcolor: "success.dark" } }}>
          <DownloadRounded />
        </Fab>
      </Tooltip>
    </Stack>
  );
}


