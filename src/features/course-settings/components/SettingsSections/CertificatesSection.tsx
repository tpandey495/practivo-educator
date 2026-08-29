import { Box, Button } from "@mui/material";
import SettingsIcon from "@icons/SettingsIcon";
import { SettingsTab } from "../SettingsTab";

export function CertificatesSection() {
  return (
    <SettingsTab
      iconBgColor="#FEF3FF"
      icon={<SettingsIcon color="#B84BC0" />}
      title="Certificates"
      subTitle="Reward your learners with custom course completion certificates."
    >
      <Box pl="54px">
        <Button
          variant="contained"
          disabled
          sx={{
            borderRadius: 2,
            bgcolor: "#4F39F6",
            color: "#FFFFFF",
            py: "10px",
            px: "20px",
            mt: "32px",
            "&:hover": {
              bgcolor: "#3E2DC4",
              color: "#FFFFFF",
            },
            "&:disabled": {
              bgcolor: "#E0E0E0",
              color: "#9E9E9E",
            },
          }}
        >
          Create Certificate (Coming Soon)
        </Button>
      </Box>
    </SettingsTab>
  );
}
