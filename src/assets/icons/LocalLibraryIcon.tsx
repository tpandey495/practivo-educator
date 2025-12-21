import React from "react";
import MuiLocalLibraryIcon from "@mui/icons-material/LocalLibrary";

type Props = {
  color?: string;
  fontSize?: "inherit" | "large" | "medium" | "small";
};

export default function LocalLibraryIcon({ color, fontSize = "small" }: Props) {
  return <MuiLocalLibraryIcon sx={color ? { color } : undefined} fontSize={fontSize} />;
}


