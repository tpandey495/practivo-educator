import AttacthmentIcon from "@icons/AttacthmentIcon";
import BrandingIcon from "@icons/BrandingIcon";
import PersonIcon from "@icons/PersonIcon";
import TagsIcon from "@icons/TagsIcon";
import {
  Box,
  ClickAwayListener,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
const CourseMetadataEditor = () => {
  return (
    <Box
      sx={{
        width: "356px",
        background: "#F9FAFA",
        borderRadius: "16px",
        padding: "16px",
        height: "288px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <ListItem icon={<BrandingIcon />} title="Course Branding" />
      <ListItem
        icon={<TagsIcon />}
        title="Tags"
        isDropDown={true}
        options={["frontend", "db"]}
      />
      <ListItem
        icon={<PersonIcon />}
        title="Co - Author"
        isDropDown={true}
        options={["Vishal", "Akash"]}
      />
      <ListItem
        icon={<AttacthmentIcon />}
        title="Resource"
        isDropDown={true}
        options={["link", "link 2"]}
      />
    </Box>
  );
};

export default CourseMetadataEditor;

interface ListItemProps {
  icon: React.ReactNode;
  title: string;
  isDropDown?: boolean;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  icon,
  title,
  isDropDown = false,
  options = [],
  value = "",
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const handleSelect = (selected: string) => {
    onChange?.(selected);
    setOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ position: "relative", height: "52px" }}>
        <Box
          onClick={() => {
            if (isDropDown) setOpen((prev) => !prev);
          }}
          sx={{
            p: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #E6E6E6",
            gap: "24px",
            cursor: isDropDown ? "pointer" : "default",
          }}
        >
          {/* Icon and Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Box
              sx={{
                width: "36px",
                height: "36px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#F1F2F4",
                p: "6px",
              }}
            >
              {icon}
            </Box>
            <Typography sx={{ color: "#000000" }}>{value || title}</Typography>
          </Box>

          {/* Dropdown arrow */}
          {isDropDown && (
            <KeyboardArrowDownRoundedIcon
              sx={{
                color: "#B3B3B3",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          )}
        </Box>

        {/* Dropdown list */}
        {open && isDropDown && (
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              mt: 1,
              width: "100%",
              zIndex: 10,
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {options.map((opt) => (
              <MenuItem key={opt} onClick={() => handleSelect(opt)}>
                {opt}
              </MenuItem>
            ))}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};
