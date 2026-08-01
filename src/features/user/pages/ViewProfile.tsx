import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useGetProfileQuery, useUpdateProfileMutation, UpdateProfileRequest } from "../api/userApi";
import RichTextEditor from "@components/ui/RichTextEditor";
import CustomTextField from "@components/ui/textfields/CustomTextField";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const languages = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "it-IT", label: "Italian" },
  { value: "pt-PT", label: "Portuguese" },
  { value: "zh-CN", label: "Chinese (Simplified)" },
  { value: "ja-JP", label: "Japanese" },
  { value: "ko-KR", label: "Korean" },
];

const ViewProfile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [headlineCount, setHeadlineCount] = useState(0);

  const { data: profileData, isLoading, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UpdateProfileRequest>({
    defaultValues: {
      firstName: "",
      lastName: "",
      headline: "",
      biography: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
      language: "en-US",
    },
  });

  const headlineValue = watch("headline");

  useEffect(() => {
    if (headlineValue) {
      setHeadlineCount(headlineValue.length);
    } else {
      setHeadlineCount(0);
    }
  }, [headlineValue]);

  useEffect(() => {
    if (profileData?.user) {
      const user = profileData.user;
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        headline: user.headline || "",
        biography: user.biography || "",
        website: user.website || "",
        facebook: user.facebook || "",
        instagram: user.instagram || "",
        linkedin: user.linkedin || "",
        twitter: user.twitter || "",
        youtube: user.youtube || "",
        language: user.language || "en-US",
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (data: UpdateProfileRequest) => {
    try {
      await updateProfile(data).unwrap();
      setSnackbarMessage("Profile updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      refetch();
    } catch (error: any) {
      setSnackbarMessage(error?.data?.message || "Failed to update profile");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const PAGE_LAYOUT_SX = {
    width: "100%",
    maxWidth: "1440px",
    mx: "auto",
    px: { xs: 3, sm: 5, md: 10, lg: 15 },
    py: { xs: 3, md: 4 },
  };

  if (isLoading) {
    return (
      <Box sx={PAGE_LAYOUT_SX}>
        <PageToolbarLayout title="Profile & settings">
          <Typography>Loading...</Typography>
        </PageToolbarLayout>
      </Box>
    );
  }

  return (
    <Box sx={PAGE_LAYOUT_SX}>
      <PageToolbarLayout title="Profile & settings">

        {/* Tabs */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid #E6E6E6",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                minHeight: 60,
                padding: "12px 24px",
                color: "#64748b",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#4F39F6",
                fontWeight: 600,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#4F39F6",
                height: 3,
              },
            }}
          >
            <Tab label="Practivo Profile" />
            <Tab label="Profile Picture" disabled />
            <Tab label="Privacy Settings" disabled />
          </Tabs>
        </Paper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TabPanel value={tabValue} index={0}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                gap: 3,
              }}
            >
              {/* Left Column */}
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    border: "1px solid #E6E6E6",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 3, color: "#1a202c" }}
                  >
                    Personal Information
                  </Typography>

                  {/* First Name */}
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        labelText="First Name"
                        placeholder="Enter your first name"
                        inputSx={{ mb: 2 }}
                      />
                    )}
                  />

                  {/* Last Name */}
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        labelText="Last Name"
                        placeholder="Enter your last name"
                        inputSx={{ mb: 2 }}
                      />
                    )}
                  />

                  {/* Headline */}
                  <Box mb={3}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#0F172A", fontWeight: 500 }}
                      >
                        Headline
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: headlineCount > 60 ? "#ef4444" : "#64748b",
                        }}
                      >
                        {headlineCount}/60
                      </Typography>
                    </Box>
                    <Controller
                      name="headline"
                      control={control}
                      rules={{ maxLength: 60 }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          placeholder="e.g., Instructor at Practivo"
                          variant="outlined"
                          error={headlineCount > 60}
                          InputProps={{
                            sx: {
                              py: "10px",
                              backgroundColor: "#fff",
                              borderRadius: "6px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#E2E8F0",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#E2E8F0",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4F39F6",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </Box>

                  {/* Biography */}
                  <Box mb={3}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 1 }}
                    >
                      Biography
                    </Typography>
                    <Controller
                      name="biography"
                      control={control}
                      render={({ field }) => (
                        <Box
                          py={0.5}
                          sx={{
                            "& .custom-quill .ql-container": {
                              minHeight: "120px !important",
                            },
                            "& .custom-quill .ql-editor": {
                              minHeight: "100px !important",
                              padding: "12px !important",
                              fontSize: "14px !important",
                            },
                            "& .custom-quill .ql-editor.ql-blank::before": {
                              fontSize: "14px !important",
                            },
                          }}
                        >
                          <RichTextEditor
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality. Your biography should have at least 50 words, links and coupon codes are not permitted."
                          />
                        </Box>
                      )}
                    />
                  </Box>

                  {/* Language */}
                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <Box mb={2}>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                        >
                          Language
                        </Typography>
                        <TextField
                          {...field}
                          select
                          fullWidth
                          size="small"
                          variant="outlined"
                          InputProps={{
                            sx: {
                              py: "10px",
                              backgroundColor: "#fff",
                              borderRadius: "6px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#E2E8F0",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#E2E8F0",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4F39F6",
                              },
                            },
                          }}
                        >
                          {languages.map((lang) => (
                            <MenuItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                    )}
                  />
                </Paper>
              </Box>

              {/* Right Column */}
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    border: "1px solid #E6E6E6",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 3, color: "#1a202c" }}
                  >
                    Social Links
                  </Typography>

                  {/* Website */}
                  <Controller
                    name="website"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        labelText="Website"
                        placeholder="URL"
                        inputSx={{ mb: 2 }}
                      />
                    )}
                  />

                  {/* Facebook */}
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                    >
                      Facebook
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Username"
                      {...control.register("facebook")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ color: "#64748b" }}>
                              facebook.com/
                            </Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          py: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Instagram */}
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                    >
                      Instagram
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Username"
                      {...control.register("instagram")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ color: "#64748b" }}>
                              instagram.com/
                            </Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          py: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* LinkedIn */}
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                    >
                      LinkedIn
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Public profile URL"
                      {...control.register("linkedin")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ color: "#64748b" }}>
                              linkedin.com/
                            </Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          py: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* X (Twitter) */}
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                    >
                      X
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Username"
                      {...control.register("twitter")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ color: "#64748b" }}>
                              x.com/
                            </Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          py: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* YouTube */}
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                    >
                      YouTube
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Username"
                      {...control.register("youtube")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ color: "#64748b" }}>
                              youtube.com/
                            </Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          py: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  </Box>
                </Paper>

                {/* Save Button */}
                <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isUpdating}
                    sx={{
                      backgroundColor: "#4F39F6",
                      color: "#fff",
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#3E2DC4",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                </Box>
              </Box>
            </Box>


          </TabPanel>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </PageToolbarLayout>
    </Box>
  );
};

export default ViewProfile;

