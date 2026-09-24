import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";
import { LockResetOutlined, ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { useResetPasswordMutation } from "../../api/authApi";

interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  // If no token in URL, show an immediate error
  useEffect(() => {
    if (!token) {
      setErrorMsg("Invalid or missing reset token. Please request a new link.");
    }
  }, [token]);

  const onSubmit: SubmitHandler<ResetPasswordForm> = async ({ newPassword }) => {
    setErrorMsg("");
    try {
      const res = await resetPassword({ token, newPassword }).unwrap();
      setSuccessMsg(res.message || "Password reset successfully!");
      // Redirect to login after 2.5 seconds
      setTimeout(() => navigate("/login"), 2500);
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Reset token is invalid or has expired.";
      setErrorMsg(msg);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left gradient panel — hidden on mobile */}
      {!isSmallScreen && (
        <Grid
          item
          md={6}
          sx={{
            background: "linear-gradient(135deg, #4F39F6 0%, #7C3AED 60%, #A855F7 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 6,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <Box
            sx={{
              position: "absolute",
              width: 340,
              height: 340,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              top: -80,
              left: -80,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              bottom: -60,
              right: -60,
            }}
          />

          {/* Icon */}
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
              backdropFilter: "blur(8px)",
            }}
          >
            <LockResetOutlined sx={{ fontSize: 48, color: "#fff" }} />
          </Box>

          <Typography
            variant="h4"
            fontWeight={700}
            color="#fff"
            textAlign="center"
            mb={2}
          >
            Create a new password
          </Typography>
          <Typography
            variant="body1"
            color="rgba(255,255,255,0.75)"
            textAlign="center"
            maxWidth={340}
          >
            Choose a strong password you haven't used before. This link expires
            in 1 hour.
          </Typography>
        </Grid>
      )}

      {/* Right form panel */}
      <Grid
        item
        md={6}
        xs={12}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: theme.palette.mode === "dark" ? "#0F0F14" : "#FAFAFA",
        }}
      >
        <Box maxWidth={480} mx="auto" width="100%">
          {/* Back to login */}
          <Link
            to="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#4F39F6",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 32,
            }}
          >
            <ArrowBack sx={{ fontSize: 16 }} />
            Back to Login
          </Link>

          <Typography variant="h5" fontWeight={700} mb={1}>
            Set New Password
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Must be at least 6 characters. Choose something memorable!
          </Typography>

          {/* Success state */}
          {successMsg ? (
            <Alert
              severity="success"
              sx={{ borderRadius: 2, "& .MuiAlert-message": { fontWeight: 500 } }}
            >
              {successMsg} Redirecting to login…
            </Alert>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {errorMsg && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {errorMsg}
                </Alert>
              )}

              {/* New Password */}
              <Box mb={3}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  mb={0.75}
                  color="text.primary"
                >
                  New Password
                </Typography>
                <Controller
                  name="newPassword"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      error={!!errors.newPassword}
                      helperText={errors.newPassword?.message}
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((p) => !p)}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? (
                                <VisibilityOff fontSize="small" />
                              ) : (
                                <Visibility fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&.Mui-focused fieldset": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* Confirm Password */}
              <Box mb={4}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  mb={0.75}
                  color="text.primary"
                >
                  Confirm Password
                </Typography>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === watch("newPassword") || "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirm((p) => !p)}
                              edge="end"
                              size="small"
                            >
                              {showConfirm ? (
                                <VisibilityOff fontSize="small" />
                              ) : (
                                <Visibility fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&.Mui-focused fieldset": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading || !token}
                sx={{
                  backgroundColor: "#4F39F6",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.25,
                  borderRadius: 2,
                  boxShadow: "0px 6px 18px rgba(79, 57, 246, 0.35)",
                  "&:hover": {
                    backgroundColor: "#3E2DC4",
                    boxShadow: "0px 10px 24px rgba(79, 57, 246, 0.45)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#B8A1DE",
                    color: "#fff",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
