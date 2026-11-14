import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableQuestionItemProps {
  id: number;
  title: string;
  score: number;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const SortableQuestionItem: React.FC<SortableQuestionItemProps> = ({
  id,
  title,
  score,
  selected,
  disabled,
  onClick,
  onMenuClick,
}) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id, disabled });

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      sx={{
        border: selected ? "1px solid #4F39F6" : "1px solid #CCCCCC",
        borderLeft: selected ? "4px solid #4F39F6" : "1px solid #CCCCCC",
        p: "16px",
        pl: "4px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        mb: "16px",
        height: "44px",
        bgcolor: "#F9FAFA",
        position: "relative",
        zIndex: isDragging ? 1 : "auto",
        opacity: isDragging ? 0.6 : 1,
        boxShadow: isDragging ? "0px 4px 12px rgba(16, 24, 40, 0.15)" : "none",
      }}
    >
      {/* DRAG HANDLE */}
      <Box
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#98A2B3",
          cursor: disabled ? "default" : isDragging ? "grabbing" : "grab",
          touchAction: "none",
          mr: "4px",
          flexShrink: 0,
          "&:hover": { color: disabled ? "#98A2B3" : "#475467" },
        }}
      >
        <DragIndicatorIcon fontSize="small" />
      </Box>

      {/* CLICK AREA */}
      <Box
        onClick={onClick}
        sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0, cursor: "pointer" }}
      >
        <Typography noWrap title={title} sx={{ minWidth: 0 }}>
          {title}
        </Typography>
      </Box>

      {/* SCORE */}
      <Typography sx={{ ml: 2, flexShrink: 0 }}>{score}</Typography>

      {/* ACTION MENU BUTTON */}
      <IconButton size="small" onClick={onMenuClick} sx={{ flexShrink: 0 }}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default SortableQuestionItem;
