import React from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LessonItem } from "../../../course-settings/components/StyledComponents";

interface UnitItemProps {
  unit: any;
  chapter: any;
  editLessonId: number | null;
  editUnitTitle: string;
  setEditLessonId: (id: number | null) => void;
  setEditUnitTitle: (title: string) => void;
  handleUnitUpdate: (lessonId: number | string) => void;
  handleUnitDelete: (lessonId: number | string) => void;
  handleUnitEditClick: (unit: any) => void;
  setAddContentAnchor: (val: any) => void;
  isSmallScreen: boolean;
}

export const UnitItem: React.FC<UnitItemProps> = ({
  unit,
  chapter,
  editLessonId,
  editUnitTitle,
  setEditLessonId,
  setEditUnitTitle,
  handleUnitUpdate,
  handleUnitDelete,
  handleUnitEditClick,
  setAddContentAnchor,
  isSmallScreen,
}) => {
  return (
    <LessonItem>
      <Box sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
        <DragIndicatorIcon
          sx={{
            color: "#999999",
            mr: { xs: "6px", md: "10px" },
            fontSize: { xs: 18, md: 24 },
          }}
        />
        {editLessonId === unit.id ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              size="small"
              value={editUnitTitle}
              onChange={(e) => setEditUnitTitle(e.target.value)}
            />
            <Button size="small" variant="contained" onClick={() => handleUnitUpdate(unit.id)}>
              Save
            </Button>
            <Button size="small" variant="outlined" onClick={() => setEditLessonId(null)}>
              Cancel
            </Button>
          </Box>
        ) : (
          <>
            <Typography
              sx={{
                color: "#000",
                fontSize: { xs: "14px", md: "16px" },
                ml: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {unit?.title}
            </Typography>
            <IconButton size="small" onClick={() => handleUnitEditClick(unit)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => handleUnitDelete(unit.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
        <Button
          variant="contained"
          size={isSmallScreen ? "small" : "medium"}
          sx={{
            fontSize: { xs: "12px", md: "14px" },
            px: { xs: 1.5, md: 2 },
            py: { xs: 0.5, md: 1 },
            whiteSpace: "nowrap",
          }}
          onClick={(e) => {
            setAddContentAnchor({
              anchorEl: e.currentTarget,
              chapterId: chapter.id,
              lessonId: unit.id,
            });
          }}
        >
          Add Content
        </Button>
      </Box>
    </LessonItem>
  );
};
