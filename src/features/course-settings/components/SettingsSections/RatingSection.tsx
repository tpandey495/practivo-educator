import { Box, Typography } from "@mui/material";
import SettingsIcon from "@icons/SettingsIcon";
import { SettingsTab } from "../SettingsTab";
import { IOSSwitch } from "@components/ui/Switch/IOSswitch";

export function RatingSection() {
  return (
    <SettingsTab
      iconBgColor="#F6F1FF"
      icon={<SettingsIcon color="#7E51CF" />}
      title="Course Rating"
      subTitle="Choose whether learners can rate this course."
    >
      <Box pl="54px">
        <Typography
          display="flex"
          gap="8px"
          alignItems="center"
          sx={{ mt: "32px", fontSize: "14px" }}
        >
          Allow the learners to rate this course
          <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
        </Typography>
      </Box>
    </SettingsTab>
  );
}
