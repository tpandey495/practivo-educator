import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useTheme } from "@mui/material";

export default function KPIRing({ percent = 68 }: { percent?: number }) {
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
      </PieChart>
    </ResponsiveContainer>
  );
}


