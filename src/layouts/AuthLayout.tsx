import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  imageSrc: string;
  imageOnLeft?: boolean;
  titleText: string;
  submitButtonText: string;
  dividerText: string;
  signUpBtnText?: string;
  signInBtnTxt?: string;
  onSubmit: () => void;
  renderFormFields: ReactNode;
  isLoading?: boolean;
  isOrgSignUp?: boolean;
  isUserSignUp?: boolean;
  isLogin?: boolean;
}

const AuthLayout = ({
  imageSrc,
  imageOnLeft = false,
  titleText,
  submitButtonText,
  signUpBtnText,
  dividerText,
  onSubmit,
  renderFormFields,
  isLoading,
  signInBtnTxt,
  isOrgSignUp = false,
  isUserSignUp = false,
  isLogin = false
}: AuthLayoutProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const ImageSection = (
    <Grid item md={6} xs={12}>
      <Box
        sx={{
          height: "100%",
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {!isSmallScreen && imageOnLeft && ImageSection}
      <Grid item
        md={6}
        xs={12}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box maxWidth="750px" mx="auto" width="100%">
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight={600}
            mb={4}
            fontSize={32}
            textAlign="center"
          >
            {titleText}
          </Typography>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {/* Form Fields */}
            {renderFormFields}

            {/* Submit Button */}
            <Box display="flex" alignItems="center" gap={2} mt={2} mb={3}>
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
                sx={{
                  backgroundColor: "#4F39F6",
                  color: "#FFFFFF",
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  boxShadow: "0px 6px 18px rgba(79, 57, 246, 0.35)",
                  transition: "background-color 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#3E2DC4",
                    color: "#FFFFFF",
                    boxShadow: "0px 10px 24px rgba(79, 57, 246, 0.45)",
                  },
                  "&:active": {
                    backgroundColor: "#3E2DC4",
                    boxShadow: "0px 2px 8px rgba(79, 57, 246, 0.4)",
                    color: "#FFFFFF",
                  },
                  "&:focus-visible": {
                    outline: "3px solid rgba(79, 57, 246, 0.35)",
                    outlineOffset: "2px",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#B8A1DE",
                    color: "#FFFFFF",
                    opacity: 0.95,
                  },
                }}
              >
                {isLoading ? "Loading..." : submitButtonText}
              </Button>
            </Box>
          </form>

          {/* OAuth buttons removed - only JWT auth supported */}
          <Box  >
            <Box >
              {isOrgSignUp && <Box display="flex" gap={2} mt={3} width={"100%"} flexWrap="nowrap">
                <Link
                  to={"/organization/create-account"}
                  style={{
                    width: "100%"
                  }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                  >
                    Sign Up as Organization
                  </Button>
                </Link>
              </Box>}
            </Box>
            {isLogin && (
              <Box
                display="flex"
                gap={2}
                width={"100%"}
                mt={3}
                flexWrap="nowrap"
              >
                <Link
                  to={"/login"}
                  style={{
                    width: "100%",
                  }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      backgroundColor: "#fff",
                      color: "#4F39F6",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#3E2DC4",
                        color: "#FFFFFF",
                      },
                      "&:active": {
                        backgroundColor: "#3E2DC4",
                        color: "#FFFFFF",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#B8A1DE",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    {signInBtnTxt ?? "Sign In"}
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>

      {!isSmallScreen && !imageOnLeft && ImageSection}
    </Grid>
  );
};

export default AuthLayout;