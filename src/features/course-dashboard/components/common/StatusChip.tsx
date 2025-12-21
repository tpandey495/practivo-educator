import { Chip } from "@mui/material";
import type { LearnerStatus } from "../../types";
import { STATUS_COLOR } from "../../utils/mockData";

export default function StatusChip({ status }: { status: LearnerStatus }) {
  return <Chip label={status} size="small" color={STATUS_COLOR[status]} /> as any;
}


