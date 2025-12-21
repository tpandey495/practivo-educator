import { Box, Typography } from "@mui/material";
import SettingsIcon from "@icons/SettingsIcon";
import { SettingsTab } from "../SettingsTab";
import { IOSSwitch } from "@components/ui/Switch/IOSswitch";

export function CompletionSection() {
  return (
    <SettingsTab
      iconBgColor="#F1F5FF"
      icon={<SettingsIcon color="#2859C2" />}
      title="Course Completion"
      subTitle="Choose whether learners can mark the course as complete by themselves."
    >
      <Box pl="54px">
        <Typography
          display="flex"
          gap="8px"
          alignItems="center"
          sx={{ mt: "32px", fontSize: "14px" }}
        >
          Allow the learners to mark the course as complete
          <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
        </Typography>
      </Box>
    </SettingsTab>
  );
}
