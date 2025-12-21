import CustomTextField from "@components/ui/textfields/CustomTextField";
import LoginPng from "@images/login.png";
import AuthLayout from "@layouts/AuthLayout";
import { Alert, Box, Snackbar } from "@mui/material";
import { useRegisterUserMutation } from "../../api/authApi";
import { useForm, Controller } from "react-hook-form";
import { IOrganisationRegister } from "types/user.types";
import { useState } from "react";

const Index = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IOrganisationRegister>();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const onSubmit = async (data: IOrganisationRegister) => {
    try {
      const res = await registerUser({ ...data }).unwrap();

      // On success
      setSnackbarSeverity("success");
      setSnackbarMessage(res?.message || "User registered successfully");
      setSnackbarOpen(true);
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
      imageOnLeft={true}
      titleText="Create your account"
      submitButtonText="Create Account →"
      dividerText="Sign up with"
      isLoading={isLoading}
      isOrgSignUp={true}
      isLogin={true}
      onSubmit={handleSubmit(onSubmit)} // Trigger RHF handleSubmit
      renderFormFields={
        <Box display={"grid"} gap={2}>
          <Box display={"flex"} gap={2} width="100%">
            <Box flex={1}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First Name is required" }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    type="text"
                    labelText="First Name"
                    placeholder="First Name"
                  />
                )}
              />
              <span style={{ color: "red" }}>
                {errors.firstName?.message}
              </span>
            </Box>
            <Box flex={1}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    type="text"
                    labelText="Last Name"
                    placeholder="Last Name"
                  />
                )}
              />
              <span style={{ color: "red" }}>{errors.lastName?.message}</span>
            </Box>
          </Box>

          <Box>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  type="text"
                  labelText="User Name"
                  placeholder="Username"
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.username?.message}</span>
          </Box>
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
                  placeholder="mail@example.com"
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          </Box>
          <Box display={"flex"} gap={2} width="100%">
            <Box flex={1}>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
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
            <Box flex={1}>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    type="password"
                    labelText="Confirm Password"
                    placeholder="Confirm Password"
                  />
                )}
              />
              <span style={{ color: "red" }}>
                {errors.confirmPassword?.message}
              </span>
            </Box>
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

export default Index;