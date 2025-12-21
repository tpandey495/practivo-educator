import { Box, FormControl, MenuItem, Select } from "@mui/material";
import SettingsIcon from "@icons/SettingsIcon";
import { SettingsTab } from "../SettingsTab";

export function ExpirationSection() {
  return (
    <SettingsTab
      iconBgColor="#FFF4EC"
      icon={<SettingsIcon color="#E07936" />}
      title="Expiration Time"
      subTitle="Specify date and time till which the course will remain active for the learners."
    >
      <Box pl="54px">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select displayEmpty>
            <MenuItem value="">Never Expires</MenuItem>
            <MenuItem value={10}>Three Days</MenuItem>
            <MenuItem value={20}>Two Days</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </SettingsTab>
  );
}
