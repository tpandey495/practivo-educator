import { Learner } from '../types';

export function exportCSV(rows: Learner[]) {
  const header = ["Name", "Email", "Enrolled Date", "Progress", "Status", "Last Active"]; 
  const lines = rows.map((l) => [l.name, l.email ?? "", l.enrolled, `${l.progress}%`, l.status, l.lastActive].join(","));
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "learners.csv";
  a.click();
  URL.revokeObjectURL(url);
}
