import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import SettingsIcon from "@icons/SettingsIcon";
import { SettingsTab } from "../SettingsTab";

export function ButtonTextSection() {
  return (
    <SettingsTab
      iconBgColor="#FFF6F6"
      icon={<SettingsIcon color="#DB5959" />}
      title="Modify Button Text"
      subTitle="Customize the text on the lesson and course completion buttons."
    >
      <Box display="flex" flexDirection="column" gap={3} pl="54px">
        <Box>
          <Typography fontWeight={600} mb={1}>
            Lesson Completion Button
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Complete & Continue"
            InputProps={{
              sx: {
                bgcolor: "#f9fafb",
                borderRadius: 2,
                p: "5px",
              },
            }}
          />
        </Box>

        <Box>
          <Typography fontWeight={600} mb={1}>
            Course Completion Button
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Complete & Continue"
            InputProps={{
              sx: {
                bgcolor: "#f9fafb",
                borderRadius: 2,
                p: "5px",
              },
            }}
          />
        </Box>

        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
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
            Reset All
          </Button>
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
        </Stack>
      </Box>
    </SettingsTab>
  );
}
