import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";
import { MailOutline, ArrowBack } from "@mui/icons-material";
import { useForgotPasswordMutation } from "../../api/authApi";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [submitted, setSubmitted] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
      // Always shows success — backend never reveals if email exists
      await forgotPassword(data).unwrap();
    } catch {
      // Intentionally swallowed: anti-enumeration — always show success
    } finally {
      setSubmitted(true);
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
            <MailOutline sx={{ fontSize: 48, color: "#fff" }} />
          </Box>

          <Typography
            variant="h4"
            fontWeight={700}
            color="#fff"
            textAlign="center"
            mb={2}
          >
            Forgot your password?
          </Typography>
          <Typography
            variant="body1"
            color="rgba(255,255,255,0.75)"
            textAlign="center"
            maxWidth={340}
          >
            No worries — it happens to everyone. Enter your email and we'll
            send you a secure reset link.
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
            Reset Password
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Enter your registered email address and we'll send you a link to
            reset your password.
          </Typography>

          {submitted ? (
            <Alert
              severity="success"
              sx={{
                borderRadius: 2,
                "& .MuiAlert-message": { fontWeight: 500 },
              }}
            >
              If an account with that email exists, a password reset link has
              been sent. Please check your inbox (and spam folder).
            </Alert>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box mb={3}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  mb={0.75}
                  color="text.primary"
                >
                  Email address
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="email"
                      placeholder="mail@example.com"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      size="small"
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
                disabled={isLoading}
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
                  "Send Reset Link"
                )}
              </Button>
            </form>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
