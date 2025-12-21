import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ReusablePopper } from "@components/ui/popper/ReusablePopper";
import VideoCircleIcon from "@icons/VideoCircleIcon";
import GridViewIcon from "@icons/GridViewIcon";
import TextBlockIcon from "@icons/TextBlockIcon";
import CodeCircleIcon from "@icons/CodeCircleIcon";
import MessageQuestionIcon from "@icons/MessageQuestionIcon";
import ImportIcon from "@icons/ImportIcon";

export const AddContentButton: React.FC = () => {
  const contentTypes = [
    {
      id: 1,
      icon: <VideoCircleIcon />,
      title: "Video",
    },
    {
      id: 2,
      icon: <GridViewIcon color="#7E51CF" />,
      title: "Block",
    },
    {
      id: 3,
      icon: <TextBlockIcon />,
      title: "Text",
    },
    {
      id: 4,
      icon: <CodeCircleIcon />,
      title: "Code",
    },
    {
      id: 5,
      icon: <MessageQuestionIcon />,
      title: "Tasks",
    },
    {
      id: 6,
      icon: <ImportIcon />,
      title: "Bank",
    },
  ];

  return (
    <ReusablePopper
      backgroundColor="#F9FAFA"
      content={
        <Box
          sx={{
            width: "359px",
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {contentTypes.map((type) => (
            <Box
              key={type.id}
              sx={{
                width: "93px",
                height: "94px",
                borderRadius: "8px",
                bgcolor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                border: "1px solid #E6E6E6",
                p: "24px",
              }}
            >
              {type.icon}
              <Typography sx={{ fontWeight: 600, fontSize: "16px", color: "#000" }}>
                {type.title}
              </Typography>
            </Box>
          ))}
        </Box>
      }
      trigger={<Button>Add Content</Button>}
    />
  );
};
