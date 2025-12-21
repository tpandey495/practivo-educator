/**
 * @author Nitin
 */
import CustomTextField from "@components/ui/textfields/CustomTextField";
import LoginPng from "@images/login.png";
import AuthLayout from "@layouts/AuthLayout";
import { Alert, Box, Snackbar } from "@mui/material";
import { useLoginMutation } from "../../api/authApi";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TAuth } from "types/auth.types";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [authLogin, { isLoading }] = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuth>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<TAuth> = async (data) => {
    try {
      const res = await authLogin({ ...data }).unwrap();
      const { token, roleId } = res?.user;
      console.log(token);
      if (res?.success === true && token) {
        console.log("INSIDE TOKEN OBJECT");
        localStorage.setItem("token", token); // Store access token in localStorage
        if (roleId == "admin") {
          navigate("/courses");
        } else {
          navigate("/");
        }
        localStorage.setItem("roleId", roleId);
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message || "User registered successfully");
        setSnackbarOpen(true);
        // Optionally redirect or do something after successful login
      }
    } catch (err: any) {
      // On failure
      const errorMessage =
        err?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Something went wrong!";
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <AuthLayout
      imageSrc={LoginPng}
      imageOnLeft={false}
      isLoading={isLoading}
      isUserSignUp={true}
      signUpBtnText="Sign Up"
      titleText="Sign in your account"
      submitButtonText="Sign In →"
      dividerText="Sign in with"
      onSubmit={handleSubmit(onSubmit)}
      renderFormFields={
        <Box display={"grid"} gap={2}>
          <Box>
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
                <CustomTextField
                  {...field}
                  type="email"
                  labelText="Email"
                  placeholder="mail@mail.com"
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          </Box>
          <Box>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  type="password"
                  labelText="Password"
                  placeholder="Password"
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      }
    />
  );
};

export default Login;
