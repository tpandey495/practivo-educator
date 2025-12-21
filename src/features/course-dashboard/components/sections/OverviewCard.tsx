import { Card, CardHeader, CardContent, Grid, Typography, IconButton } from "@mui/material";
import { MoreVertRounded } from "@mui/icons-material";
import KPIRing from "../common/KPIRing";
import StatMini from "../common/StatMini";
import { header } from "../../utils/mockData";

export default function OverviewCard() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardHeader
        action={<IconButton size="small"><MoreVertRounded /></IconButton>}
        title={<Typography variant="h6" fontWeight={800}>Overall Completion Rate</Typography>}
        subheader={<Typography variant="body2" color="text.secondary">Live cohort performance</Typography>}
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
  );
}


