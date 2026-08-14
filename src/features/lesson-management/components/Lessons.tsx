import React, { Fragment, useState, useEffect } from "react";
import {
  AccordionDetails,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Menu,
  TextField,
  CircularProgress,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CodeIcon from "@mui/icons-material/Code";
import QuizIcon from "@mui/icons-material/Quiz";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArticleIcon from "@mui/icons-material/Article";
import FileAddIcon from "../../../assets/icons/FileAddIcon";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Accordion,
  AccordionSummary,
  LessonItem,
} from "../../course-settings/components/StyledComponents";
import { ReusablePopper } from "../../../components/ui/popper/ReusablePopper";
import { AddLessonPopperItem } from "./AddLessonPopperItem";
import { useModal } from "../../../hooks/useModal";
import { useNavigate, useParams } from "react-router-dom";
import { AddChapterModal } from "./AddChapterModal";
import { AddUnitForm } from "./AddUnitForm";
import { Chapter, CourseData, ContentTypeConfig } from "../types";
import {
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
  useGetContentTypesQuery,
  useReorderChaptersMutation,
} from "../api/chapterApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// drag and drop import 
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface LessonsProps {
  courseData?: CourseData;
  chaptersData?: Chapter[];
  onChapterAdded?: () => void;
  onUnitAdded?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  "@mui/icons-material/OndemandVideo": OndemandVideoIcon,
  "@mui/icons-material/Quiz": QuizIcon,
  "@mui/icons-material/Assignment": AssignmentIcon,
  "@mui/icons-material/Code": CodeIcon,
  "@mui/icons-material/Article": ArticleIcon,
  "OndemandVideo": OndemandVideoIcon,
  "Quiz": QuizIcon,
  "Assignment": AssignmentIcon,
  "Code": CodeIcon,
  "Article": ArticleIcon,
  "Video": OndemandVideoIcon,
  "Blog": ArticleIcon,
};

const getIconComponent = (icon?: string, name?: string): React.ElementType => {
  if (icon && iconMap[icon]) return iconMap[icon];
  if (name && iconMap[name]) return iconMap[name];
  if (name && iconMap[name.toLowerCase()]) return iconMap[name.toLowerCase()];
  return OndemandVideoIcon;
};



function SortableChapter({ chapter, children }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners })}
    </div>
  );
}


export default function Lessons({ courseData, chaptersData, onChapterAdded, onUnitAdded }: LessonsProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { courseId } = useParams<{ courseId: string }>();
  const effectiveCourseId = Number(courseData?.id || courseId || 0);

  const [openEditorChapterId, setOpenEditorChapterId] = useState<number | null>(
    null
  );

  const {
    isOpen: isChapterModalOpen,
    closeModal: closeChapterModal,
    openModal: openChapterModal,
  } = useModal();
  const [addContentAnchor, setAddContentAnchor] = useState<{
    anchorEl: HTMLElement | null;
    chapterId: string | number;
    lessonId: string | number;
  } | null>(null);
  const navigate = useNavigate();
  // EDIT CHAPTER STATE
  const [editChapterId, setEditChapterId] = useState<number | null>(null);

  const [editTitle, setEditTitle] = useState("");
  // dropdown - fetch content types from {{baseURL}}/v1/config
  const { data: contentTypes = [], isLoading } = useGetContentTypesQuery();
  // UPDATE CHAPTER API HOOK
  const [updateChapter] = useUpdateChapterMutation();
  // delete hook
  const [deleteChapter] = useDeleteChapterMutation();

  // UNIT EDIT STATE
  const [editLessonId, setEditLessonId] = useState<number | null>(null);
  const [editUnitTitle, setEditUnitTitle] = useState("");

  // API hooks
  const [updateUnit] = useUpdateUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();

  // Reorder API hooks
  const [reorderChapters] = useReorderChaptersMutation();

  // DnD items state (chapters)
  const [items, setItems] = useState<Chapter[]>(chaptersData || []);

  useEffect(() => {
    if (chaptersData) {
      setItems(chaptersData);
    }
  }, [chaptersData]);

  // Chapter drag end handler
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((c) => c.id === active.id);
    const newIndex = items.findIndex((c) => c.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);

    try {
      await reorderChapters({
        courseId: effectiveCourseId,
        orderedIds: reordered.map((c) => c.id),
      }).unwrap();
    } catch (err) {
      console.error("Failed to reorder chapters", err);
      // Revert on failure
      setItems(items);
    }
  };

  // EDIT CLICK ch
  const handleUnitEditClick = (unit: any) => {
    setEditLessonId(Number(unit.id));
    setEditUnitTitle(unit.title);
  };

  const handleEditClick = (chapter: any) => {
    setEditChapterId(Number(chapter.id));
    setEditTitle(chapter.title);
  };

  // delete handler 
  const handleDelete = async (chapterId: number | string) => {
    if (!effectiveCourseId) {
      alert("Course ID missing");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this chapter?");
    if (!confirmDelete) return;

    try {
      await deleteChapter({
        courseId: effectiveCourseId,
        chapterId: Number(chapterId),
      }).unwrap();

      alert("Chapter deleted successfully");
      onChapterAdded?.();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // update unit 
  const handleUnitUpdate = async (lessonId: number | string) => {
    try {
      await updateUnit({
        lessonId: Number(lessonId),
        title: editUnitTitle,
      }).unwrap();

      alert("Unit updated successfully");
      setEditLessonId(null);
      onUnitAdded?.();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleUnitDelete = async (lessonId: number | string) => {
    const confirmDelete = window.confirm("Delete this unit?");
    if (!confirmDelete) return;

    try {
      await deleteUnit({ lessonId: Number(lessonId) }).unwrap();

      alert("Unit deleted");
      onUnitAdded?.();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // UPDATE API CALL
  const handleUpdate = async (chapterId: number | string) => {
    try {
      await updateChapter({
        courseId: effectiveCourseId,
        chapterId: Number(chapterId),
        title: editTitle,
      }).unwrap();

      alert("Chapter updated successfully");
      setEditChapterId(null);
      onChapterAdded?.();
    } catch (err) {
      alert("Update failed");
    }
  };


  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "12px", md: "16px" },
        p: { xs: 1, sm: 2, md: 0 },
      }}
    >
      {!openEditorChapterId && (
        <Fragment>
          {!chaptersData ||
            !Array.isArray(chaptersData) ||
            chaptersData.length === 0 ? (
            <Box sx={{ display: "grid", placeItems: "center", p: 10 }}>
              <Typography color="textSecondary">
                {!chaptersData
                  ? "Loading chapters..."
                  : "No chapters available. Add a new chapter to get started."}
              </Typography>
            </Box>
          ) : (

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={items.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >

                {items.map((chapter: Chapter) => (
                  <SortableChapter key={chapter.id} chapter={chapter}>
                    {({ attributes, listeners }: any) => (

                      <Accordion disableGutters elevation={0}>

                        <AccordionSummary
                          aria-controls={`panel${chapter?.id}-content`}
                          id={`panel${chapter?.id}-header`}
                          sx={{
                            cursor: "default",
                            userSelect: "none", // ✅ important
                          }}
                        >

                          {/* ✅ ADD THIS DRAG ICON (only addition) */}
                          <DragIndicatorIcon
                            {...attributes}
                            {...listeners}
                            sx={{
                              color: "#999999",
                              mr: { xs: "6px", md: "10px" },
                              fontSize: { xs: 18, md: 24 },
                              cursor: "move",
                            }}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          />

                          {/* ✅ EDIT MODE */}
                          {editChapterId === chapter.id ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                              {/* INPUT */}
                              <TextField
                                size="small"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                              />

                              {/* SAVE */}
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleUpdate(chapter.id)}
                              >
                                Save
                              </Button>

                              {/* CANCEL */}
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setEditChapterId(null)}
                              >
                                Cancel
                              </Button>
                            </Box>
                          ) : (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                              {/* TITLE */}
                              <Typography
                                component="span"
                                sx={{ color: "#000", fontWeight: 600 }}
                              >
                                {chapter?.title}
                              </Typography>

                              {/* ✅ EDIT BUTTON */}
                              <IconButton
                                size="small"
                                onClick={() => handleEditClick(chapter)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              {/* delte button  */}
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(chapter?.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          )}
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "16px",
                            }}
                          >
                            {chapter?.lessons?.length > 0 ? (
                              chapter?.lessons.map((unit: any) => (
                                <LessonItem key={unit?.id}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      flex: 1,
                                      minWidth: 0,
                                    }}
                                  >
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

                                        <Button
                                          size="small"
                                          variant="contained"
                                          onClick={() => handleUnitUpdate(unit.id)}
                                        >
                                          Save
                                        </Button>

                                        <Button
                                          size="small"
                                          variant="outlined"
                                          onClick={() => setEditLessonId(null)}
                                        >
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

                                        {/* EDIT */}
                                        <IconButton
                                          size="small"
                                          onClick={() => handleUnitEditClick(unit)}
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>

                                        {/* DELETE */}
                                        <IconButton
                                          size="small"
                                          color="error"
                                          onClick={() => handleUnitDelete(unit.id)}
                                        >
                                          <DeleteIcon fontSize="small" />
                                        </IconButton>
                                      </>
                                    )}
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      flexShrink: 0,
                                    }}
                                  >
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
                              ))
                            ) : (
                              <Box
                                sx={{ display: "grid", placeItems: "center", p: 10 }}
                              >
                                No Units Found
                              </Box>
                            )}
                            <IconButton
                              sx={{
                                m: "auto",
                                border: "1px solid #E6E6E6",
                                p: { xs: 1, md: 1.5 },
                              }}
                              onClick={() => {
                                setOpenEditorChapterId(Number(chapter?.id));
                              }}
                            >
                              <AddRoundedIcon
                                sx={{
                                  color: "#4D4D4D",
                                  fontSize: { xs: 20, md: 24 },
                                }}
                              />
                            </IconButton>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </SortableChapter>
                ))}
              </SortableContext>
            </DndContext>
          )}
          <Box
                      sx={{
                        m: "auto",
                        display: "flex",
                        gap: { xs: "12px", md: "24px" },
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      <ReusablePopper
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        arrowPlacement="right"
                        content={
                          <Box
                            sx={{ display: "flex", gap: "16px", flexDirection: "column" }}
                          >
                            <AddLessonPopperItem
                              icon={<FileAddIcon />}
                              title="Import Lessons"
                              description="Import lessons from other courses"
                            />
                            <AddLessonPopperItem
                              icon={<FileUploadIcon />}
                              title="Add Lesson"
                              description="Add another lesson"
                              onClickCallBack={openChapterModal}
                            />
                          </Box>
                        }
                        trigger={
                          <Button
                            startIcon={<AddRoundedIcon />}
                            endIcon={<KeyboardArrowDownRoundedIcon />}
                            fullWidth={isSmallScreen}
                            sx={{
                              fontSize: { xs: "14px", md: "16px" },
                              px: { xs: 2, md: 3 },
                              py: { xs: 1, md: 1.5 },
                              minHeight: { xs: 40, md: "auto" },
                            }}
                          >
                            Add Lesson
                          </Button>
                        }
                      />
                    </Box>
                  </Fragment>
                )}
                {openEditorChapterId !== null && (
                  <AddUnitForm
                    chapterId={openEditorChapterId}
                    onClose={() => setOpenEditorChapterId(null)}
                    onUnitAdded={onUnitAdded}
                  />
                )}
                {/* Add Content Dropdown */}
                <Menu
                  anchorEl={addContentAnchor?.anchorEl || null}
                  open={!!addContentAnchor}
                  onClose={() => setAddContentAnchor(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    sx: {
                      p: 2,
                      borderRadius: 3,
                      minWidth: 320,
                      maxWidth: 420,
                      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.12), 0px 4px 8px rgba(0, 0, 0, 0.06)",
                      border: "1px solid #EDEDED",
                    },
                  }}
                >
                  <Box sx={{ mb: 1.5, px: 0.5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "15px", color: "#1A1A1A" }}>
                      Add Content
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                      Select the type of content to add to this lesson
                    </Typography>
                  </Box>

                  {isLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 4 }}>
                      <CircularProgress size={28} />
                    </Box>
                  ) : !contentTypes || contentTypes.length === 0 ? (
                    <Box sx={{ py: 3, textAlign: "center" }}>
                      <Typography sx={{ fontSize: 13, color: "#888" }}>
                        No content types available
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                        gap: 1.5,
                      }}
                    >
                      {contentTypes.map((opt: ContentTypeConfig) => {
                        const IconComp = getIconComponent(opt.icon, opt.name);

                        return (
                          <Box
                            key={opt.id}
                            onClick={() => {
                              const currentLessonId = addContentAnchor?.lessonId;
                              const targetCourseId = courseData?.id || courseId || addContentAnchor?.chapterId;
                              setAddContentAnchor(null);
                              navigate(
                                `/courses/edit/${targetCourseId}/${currentLessonId}/questions`,
                                {
                                  state: {
                                    type: opt.name,
                                    parentContentType: opt.name,
                                    contentTypeId: opt.id,
                                  },
                                }
                              );
                            }}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              p: 1.5,
                              borderRadius: 2.5,
                              cursor: "pointer",
                              background: "#F8F9FA",
                              border: "1px solid #EEEEEE",
                              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                              "&:hover": {
                                background: "#F3EEFF",
                                borderColor: "#6A42AB",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 12px rgba(106, 66, 171, 0.15)",
                                "& .content-type-icon": {
                                  color: "#6A42AB",
                                  transform: "scale(1.1)",
                                },
                                "& .content-type-title": {
                                  color: "#6A42AB",
                                  fontWeight: 600,
                                },
                              },
                            }}
                          >
                            <Box
                              className="content-type-icon"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                bgcolor: "#FFFFFF",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                                color: "primary.main",
                                transition: "all 0.2s ease",
                                mb: 1,
                              }}
                            >
                              <IconComp sx={{ fontSize: 26 }} />
                            </Box>

                            <Typography
                              className="content-type-title"
                              sx={{
                                fontSize: 13,
                                fontWeight: 500,
                                textAlign: "center",
                                color: "#333",
                                transition: "color 0.2s ease",
                              }}
                            >
                              {opt.name}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                </Menu>
                <AddChapterModal
                  onClose={closeChapterModal}
                  open={isChapterModalOpen}
                  onChapterAdded={onChapterAdded}
                />
              </Box>
              );
}
