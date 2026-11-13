import { Box, Paper, Typography, Chip } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const AccountSettings = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>
        Account Settings
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to right, #ef4444, #ec4899)",
            color: "#fff",
          }}
        >
          <PersonOutlineOutlinedIcon sx={{ fontSize: 36 }} />
        </Box>
        <Chip label="Upcoming" color="primary" size="small" sx={{ fontWeight: 600 }} />
        <Typography variant="h6" fontWeight={600}>
          Account settings are coming soon
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
          You'll soon be able to manage your profile, password and preferences from here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AccountSettings;
