import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { ReusablePopper } from "@components/ui/popper/ReusablePopper";
import SingleRadioButton from "@components/ui/SingleRadioButton";
import IOSSwitch from "@components/ui/popper/IOSSwitch";

const PublishButton = () => {
  const [_subscribe, setSubscribe] = useState("yes");
  return (
    <ReusablePopper
      content={
        <Box
          sx={{
            width: "fit-content",
            maxWidth: "420px",
            padding: "16px",
          }}
        >
          <Typography
            sx={{ color: "#000000", fontSize: "18px", fontWeight: 600 }}
          >
            Publish Setting
          </Typography>
          <Box
            sx={{
              borderRadius: "8px",
              border: "1px solid #CCCCCC",
              mt: "16px",
              p: "12px",
            }}
          >
            <SingleRadioButton
              label="Hub Users"
              value="yes"
              name="Publish Setting"
              checked={true}
              onChange={(e) => setSubscribe(e.target.value)}
              formStyles={{
                height: "24px",
              }}
            />
            <Box sx={{ ml: 3 }}>
              <Typography sx={{ fontSize: "13px", color: "#666666" }}>
                All hub users can access this course and enroll themselves
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  mt: "12px",
                }}
              >
                <Typography sx={{ fontWeight: "500", color: "#333333", fontSize: "13px" }}>
                  Needs Admin Approval{" "}
                </Typography>

                <IOSSwitch checked={false} onChange={() => { }} size="small" />
              </Box>
            </Box>
            <Box sx={{ mt: "20px" }}>
              <SingleRadioButton
                label="Added Learners Only"
                value="yes"
                name="Publish Setting"
                checked={true}
                onChange={(e) => setSubscribe(e.target.value)}
                formStyles={{
                  height: "24px",
                }}
              />
              <Typography sx={{ fontSize: "13px", color: "#666666", ml: 3 }}>
                All hub users can access this course and enroll themselves
              </Typography>
            </Box>
          </Box>
          <Button sx={{ mt: "16px" }}>Publish</Button>
        </Box>
      }
      trigger={
        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDownRoundedIcon />}
          sx={{
            padding: "10px 24px",
            height: "40px",
            borderRadius: "12px",
            border: "1px solid rgba(148, 163, 184, 0.4)",
            color: "#4F39F6",
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
          Publish
        </Button>
      }
    />
  );
};

export default PublishButton;
