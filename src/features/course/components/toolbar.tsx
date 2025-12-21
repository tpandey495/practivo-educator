import {
  Box,
  Button,
  Divider,
  IconButton,
  Rating,
  Typography,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// icons
import WestIcon from "@mui/icons-material/West";

import MoreButton from "@components/ui/MoreButton";
import PublishButton from "@components/ui/PublishButton";
import { Link, useNavigate, useParams } from "react-router-dom";

const ToolBar = ({ children, courseName, previousPage }: { courseName?: string; children: React.ReactNode; previousPage?: string }) => {
  const theme = useTheme();

  const iconButtonSx = {
    width: 40,
    height: 40,
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.4)",
    color: "#475467",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#4F39F6",
      color: "#4F39F6",
      boxShadow: "0 6px 16px rgba(79, 57, 246, 0.18)",
      backgroundColor: "rgba(79, 57, 246, 0.04)",
    },
    "& svg": {
      fontSize: "1.15rem",
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: 2,
          columnGap: 3,
          paddingBottom: { xs: 2, md: 1.5 },
          marginBottom: { xs: 3, md: 4 },
          borderBottom: "1px solid rgba(148, 163, 184, 0.35)",
        }}
      >
        {/* left side  */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Tooltip title="Go back">
            <IconButton
              component={Link}
              to={previousPage || "/courses"}
              sx={{
                ...iconButtonSx,
                textDecoration: "none",
              }}
            >
              <WestIcon />
            </IconButton>
          </Tooltip>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: 700,
              color: theme.palette.text.primary,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {courseName || "Course Name"}
          </Typography>
        </Box>
        {/* right side  */}
        {children}
      </Box>
    </Box>
  );
};

export const RightSideTools = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "flex-start", md: "flex-end" },
        gap: 1.5,
        flexWrap: "wrap",
      }}
    >
      <PublishButton />
      <Button
        variant="outlined"
        onClick={() => navigate(`/course-practice/${courseId}`)}
        sx={{
          padding: "10px 24px",
          height: "40px",
          color: "#4F39F6",
          border: "1px solid rgba(148, 163, 184, 0.4)",
          borderRadius: "12px",
          backgroundColor: "#fff",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.95rem",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: "#4F39F6",
            color: "#4F39F6",
            boxShadow: "0 6px 16px rgba(79, 57, 246, 0.18)",
            backgroundColor: "rgba(79, 57, 246, 0.04)",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(79, 57, 246, 0.1)",
          },
        }}
      >
        Preview
      </Button>
      <MoreButton />

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "rgba(148, 163, 184, 0.5)",
          mx: 1,
          display: { xs: "none", sm: "block" },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          minWidth: { xs: "auto", sm: "60px" },
        }}
      >
        <Rating
          size="small"
          name="simple-uncontrolled"
          readOnly
          defaultValue={0}
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "rgba(148, 163, 184, 0.6)",
            },
            "& .MuiRating-iconFilled": {
              color: "#F59E0B",
            },
          }}
        />
        <Typography
          sx={{
            color: "#667085",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          No Rating hai
        </Typography>
      </Box>

      {!isMobile && (
        <>
          <Typography
            sx={{
              color: "rgba(148, 163, 184, 0.6)",
              fontSize: "1rem",
              fontWeight: 400,
            }}
          >
            /
          </Typography>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          minWidth: { xs: "auto", sm: "60px" },
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          2
        </Typography>
        <Typography
          sx={{
            color: "#667085",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          Lessons
        </Typography>
      </Box>

      {!isMobile && (
        <>
          <Typography
            sx={{
              color: "rgba(148, 163, 184, 0.6)",
              fontSize: "1rem",
              fontWeight: 400,
            }}
          >
            /
          </Typography>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          minWidth: { xs: "auto", sm: "60px" },
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          2
        </Typography>
        <Typography
          sx={{
            color: "#667085",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          Learners
        </Typography>
      </Box>
    </Box>
  );
};

export default ToolBar;
