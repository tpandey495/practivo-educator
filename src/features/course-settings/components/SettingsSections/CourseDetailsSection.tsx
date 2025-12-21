import { Box, Button, FormControl, MenuItem, Select, Typography, useTheme, useMediaQuery } from "@mui/material";
import SettingsIcon from "@icons/SettingsIcon";
import { SettingsTab } from "../SettingsTab";
import { TextField } from "@mui/material";

export const CourseDetailsSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SettingsTab
      iconBgColor="#FFF6F6"
      icon={<SettingsIcon color="#DB5959" />}
      title="Course Name And Description"
      subTitle="Enter Course And Description"
    >
      <Box
        sx={{
          mt: 2,
          px: { xs: 1, sm: 1 },
          py: 2,
          pl: { xs: 2, sm: "54px" },
          display: "grid",
          gap: { xs: "20px", sm: "32px" },
        }}
      >
        <Box>
          <Typography
            fontWeight={600}
            mb={1}
            sx={{ fontSize: { xs: '14px', sm: '16px' } }}
          >
            Name
          </Typography>
          <TextField
            fullWidth
            size={isSmallScreen ? "medium" : "small"}
            placeholder="Name"
            InputProps={{
              sx: {
                bgcolor: "#f9fafb",
                borderRadius: 2,
                p: { xs: "8px", sm: "5px" },
                fontSize: { xs: '14px', sm: '16px' }
              },
            }}
          />
        </Box>
        <Box>
          <Typography
            fontWeight={600}
            mb={1}
            sx={{ fontSize: { xs: '14px', sm: '16px' } }}
          >
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={isSmallScreen ? 4 : 6}
            size={isSmallScreen ? "medium" : "small"}
            placeholder="Description"
            InputProps={{
              sx: {
                bgcolor: "#f9fafb",
                borderRadius: 2,
                "& .MuiInputBase-input": {
                  padding: { xs: "8px", sm: "5px" },
                  fontSize: { xs: '14px', sm: '16px' }
                },
              },
            }}
          />
        </Box>
        <Box>
          <Typography
            fontWeight={600}
            mb={1}
            sx={{ fontSize: { xs: '14px', sm: '16px' } }}
          >
            Course Permalink
          </Typography>
          <TextField
            fullWidth
            size={isSmallScreen ? "medium" : "small"}
            placeholder="Name"
            InputProps={{
              sx: {
                bgcolor: "#f9fafb",
                borderRadius: 2,
                p: { xs: "8px", sm: "5px" },
                fontSize: { xs: '14px', sm: '16px' }
              },
            }}
          />
        </Box>
        <Box>
          <Typography sx={{
            color: "#666666",
            fontSize: { xs: '12px', sm: '14px' },
            wordBreak: 'break-all',
            lineHeight: 1.4
          }}>
            http://learn.logo.in/portal/trial2558/course/
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            disabled
            fullWidth={isSmallScreen}
            sx={{
              borderRadius: 2,
              py: { xs: 1.5, sm: 1 },
              fontSize: { xs: '14px', sm: '16px' },
              minHeight: { xs: 44, sm: 'auto' },
              color: "#fff",
              "&.Mui-disabled": {
                color: "#fff",
              }
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </SettingsTab>
  );
};

export const ExpirationSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SettingsTab
      iconBgColor="#FFF4EC"
      icon={<SettingsIcon color="#E07936" />}
      title="Expiration Time"
      subTitle="Specify date and time till which the course will remain active for the learners."
    >
      <Box pl={{ xs: 2, sm: "54px" }}>
        <FormControl sx={{
          m: { xs: 0, sm: 1 },
          minWidth: { xs: '100%', sm: 120 },
          width: { xs: '100%', sm: 'auto' }
        }}>
          <Select
            displayEmpty
            size={isSmallScreen ? "medium" : "small"}
            sx={{
              fontSize: { xs: '14px', sm: '16px' },
              '& .MuiSelect-select': {
                py: { xs: 1.5, sm: 1 }
              }
            }}
          >
            <MenuItem value="">Never Expires</MenuItem>
            <MenuItem value={10}>Three Days</MenuItem>
            <MenuItem value={20}>Two Days</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </SettingsTab>
  );
};
