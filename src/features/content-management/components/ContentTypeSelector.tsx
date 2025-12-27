import { Popover, Box, Paper, Typography, Avatar } from "@mui/material";
import { MouseEvent } from "react";

type ContentTypeOption = {
  value: string;
  label: string;
  icon?: string;
};

type ContentTypeSelectorProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  options: ContentTypeOption[];
  onSelect: (value: string) => void;
};

export default function ContentTypeSelector(props: ContentTypeSelectorProps) {
  const { anchorEl, open, onClose, options, onSelect } = props;

  const handleSelect = (event: MouseEvent<HTMLElement>, value: string) => {
    event.stopPropagation();
    onSelect(value);
  };

  // Color palette for Avatars - each with a light background and contrasting text color
  const avatarColors = [
    { bg: "#E3F2FD", text: "#1976D2" }, // Light Blue
    { bg: "#F3E5F5", text: "#7B1FA2" }, // Light Purple
    { bg: "#E8F5E9", text: "#388E3C" }, // Light Green
    { bg: "#FFF3E0", text: "#F57C00" }, // Light Orange
    { bg: "#FCE4EC", text: "#C2185B" }, // Light Pink
    { bg: "#E0F2F1", text: "#00796B" }, // Light Teal
    { bg: "#FFF9C4", text: "#F9A825" }, // Light Yellow
    { bg: "#E1BEE7", text: "#6A1B9A" }, // Light Purple 2
  ];

  const getAvatarColors = (index: number) => {
    return avatarColors[index % avatarColors.length];
  };

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: {
          p: 0,
          borderRadius: "8px",
          boxShadow:
            "0px 4px 12px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.04)",
          width: 280,
          maxWidth: "calc(100vw - 32px)",
          minWidth: 260,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        },
      }}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
    >
      {/* Header Section */}
      <Box
        sx={{
          px: 2.5,
          py: 1.75,
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            color: "text.primary",
            letterSpacing: "0.01em",
          }}
        >
          Select Question Type
        </Typography>
      </Box>

      {/* Options List */}
      <Box sx={{ p: 1.5 }}>
        {options.map((opt, index) => (
          <Paper
            key={opt.value}
            role="button"
            tabIndex={0}
            onClick={(e) => handleSelect(e as unknown as MouseEvent<HTMLElement>, opt.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onSelect(opt.value);
              }
            }}
            sx={{
              p: 1.5,
              mb: index < options.length - 1 ? 1 : 0,
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
              minHeight: 48,
              transition: (theme) =>
                theme.transitions.create(
                  ["background-color", "box-shadow", "border-color", "transform"],
                  {
                    duration: 150,
                    easing: "ease-in-out",
                  }
                ),
              "&:hover": {
                backgroundColor: "action.hover",
                borderColor: "primary.main",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
                transform: "translateY(-1px)",
              },
              "&:active": {
                transform: "translateY(0px)",
                boxShadow: "none",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <Avatar
              variant="rounded"
              sx={{
                width: 32,
                height: 32,
                bgcolor: getAvatarColors(index).bg,
                color: getAvatarColors(index).text,
                fontSize: "14px",
                fontWeight: 600,
                flexShrink: 0,
              }}
              src={opt.icon}
            >
              {opt.label.charAt(0)}
            </Avatar>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                color: "text.primary",
                lineHeight: 1.4,
                flex: 1,
              }}
            >
              {opt.label}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Popover>
  );
}


