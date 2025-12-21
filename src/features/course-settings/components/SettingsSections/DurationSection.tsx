import { Box, Paper, IconButton, Typography, Button } from "@mui/material";
import SettingsIcon from "@icons/SettingsIcon";
import { SettingsTab } from "../SettingsTab";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export function DurationSection() {
  return (
    <SettingsTab
      iconBgColor="#EDF8E7"
      icon={<SettingsIcon color="#4E9E22" />}
      title="Course Duration"
      subTitle="Specify the number of days or hours a learner will take to complete this course."
    >
      <Box pl="54px" display="flex" gap="32px">
        <Box display="flex" gap={2}>
          <Paper
            elevation={0}
            sx={{
              px: 2,
              borderRadius: 2,
              border: "1px solid #D1D1D1",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Typography color="#4D4D4D" fontSize={14}>
              Hours
            </Typography>
            <Box display="flex" flexDirection="column">
              <IconButton size="small" sx={{ p: "0.5px" }}>
                <ArrowDropUpIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ p: "0.5px" }}>
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              px: 2,
              borderRadius: 2,
              border: "1px solid #D1D1D1",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Typography color="#4D4D4D" fontSize={14}>
              Minutes
            </Typography>
            <Box display="flex" flexDirection="column">
              <IconButton size="small" sx={{ p: "0.5px" }}>
                <ArrowDropUpIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ p: "0.5px" }}>
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        </Box>
        <Box display="flex" gap={2}>
          <Box>
            <Button
              variant="contained"
              disabled
              sx={{
                borderRadius: 2,
                color: "#fff",
                "&.Mui-disabled": {
                  color: "#fff",
                }
              }}
            >
              Save
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              disabled
              sx={{
                borderRadius: 2,
                color: "#fff",
                "&.Mui-disabled": {
                  color: "#fff",
                }
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </SettingsTab>
  );
}
