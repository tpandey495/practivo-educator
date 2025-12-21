import React from "react";
import MuiAutoStoriesIcon from "@mui/icons-material/AutoStories";

type Props = {
  color?: string;
  fontSize?: "inherit" | "large" | "medium" | "small";
};

export default function AutoStoriesIcon({ color, fontSize = "small" }: Props) {
  return <MuiAutoStoriesIcon sx={color ? { color } : undefined} fontSize={fontSize} />;
}


