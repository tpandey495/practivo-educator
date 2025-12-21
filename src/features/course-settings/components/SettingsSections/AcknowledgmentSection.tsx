import { Box, Typography } from "@mui/material";
import SettingsIcon from "@icons/SettingsIcon";
import { SettingsTab } from "../SettingsTab";
import { IOSSwitch } from "@components/ui/Switch/IOSswitch";

export function AcknowledgmentSection() {
  return (
    <SettingsTab
      iconBgColor="#FFF4EC"
      icon={<SettingsIcon color="#E07936" />}
      title="Read Acknowledgment"
      subTitle="Learners will be required to acknowledge reading after completing each lesson in the course."
    >
      <Box pl="54px">
        <Typography
          display="flex"
          gap="8px"
          alignItems="center"
          sx={{ mt: "32px", fontSize: "14px" }}
        >
          Enable read acknowledgement for this course
          <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
        </Typography>
      </Box>
    </SettingsTab>
  );
}
