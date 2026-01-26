import { Paper,Typography } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000 }, { name: 'Mar', uv: 11000 },
  { name: 'May', uv: 10000 }, { name: 'Jul', uv: 18000 },
  { name: 'Sep', uv: 22000 }, { name: 'Nov', uv: 24500 },
  { name: 'Dec', uv: 26000 },
];

export const RevenueChart = () => (
  <Paper sx={{ p: 3, height: 400 }}>
    <Typography variant="h6" mb={2}>Revenue Performance</Typography>
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2196f3" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#2196f3" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  </Paper>
);