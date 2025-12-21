import React from 'react';
import { Box, Typography } from '@mui/material';

interface AddLessonPopperItemProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  onClickCallBack?: () => void;
}

export const AddLessonPopperItem: React.FC<AddLessonPopperItemProps> = ({
  title,
  description,
  icon,
  onClickCallBack,
}) => {
  return (
    <Box
      role="button"
      onClick={onClickCallBack}
      sx={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        p: "16px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "background-color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          bgcolor: "#f5f5f5",
          transform: "translateY(-2px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <Box
        sx={{
          height: "48px",
          width: "48px",
          borderRadius: "8px",
          bgcolor: "#F1F2F4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "600", fontSize: "18px", color: "#4d4d4d" }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#666666" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
