import React,{ Fragment, useState,useEffect,useRef } from "react";
import {
  AccordionDetails,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Menu,
  TextField
  // MenuItem // not needed
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CodeIcon from "@mui/icons-material/Code";
import QuizIcon from "@mui/icons-material/Quiz";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArticleIcon from "@mui/icons-material/Article";
import FileAddIcon from "../../../assets/icons/FileAddIcon";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Loader from "../../../components/ui/Spinner";
import {
  Accordion,
  AccordionSummary,
  LessonItem,
} from "../../course-settings/components/StyledComponents";
import { ReusablePopper } from "../../../components/ui/popper/ReusablePopper";
import { AddLessonPopperItem } from "./AddLessonPopperItem";
import { useModal } from "../../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { AddChapterModal } from "./AddChapterModal";
import { AddUnitForm } from "./AddUnitForm";
import { Chapter, CourseData } from "../types";
//ADD THIS IMPORT FOR EDIT CHAPTER 
import {
  useUpdateChapterMutation, useDeleteChapterMutation, useUpdateUnitMutation,
  useDeleteUnitMutation, useGetContentTypesQuery
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

import { useReorderChaptersMutation, useReorderUnitsMutation } from "../api/chapterApi";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


interface LessonsProps {
  courseData?: CourseData;
  chaptersData?: Chapter[];
  onChapterAdded?: () => void;
  onUnitAdded?: () => void;
}
// 
const iconMap: Record<string, any> = {
  "@mui/icons-material/OndemandVideo": OndemandVideoIcon,
  "@mui/icons-material/Quiz": QuizIcon,
  "@mui/icons-material/Assignment": AssignmentIcon,
  "@mui/icons-material/Code": CodeIcon,
  "@mui/icons-material/Article": ArticleIcon,
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
// sortable unit components
function SortableUnit({ unit, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: unit.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms ease",
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
    chapterId: string;
    unitId: string;
  } | null>(null);
  const navigate = useNavigate();
  // EDIT CHAPTER STATE
  const [editChapterId, setEditChapterId] = useState<number | null>(null);

  const [editTitle, setEditTitle] = useState("");
  // dropdown 
  const { data: contentTypes = [], isLoading } = useGetContentTypesQuery();
  // PDATE CHAPTER API HOOK
  const [updateChapter] = useUpdateChapterMutation();
  // delete hook
  const [deleteChapter] = useDeleteChapterMutation();
  // reorder chapter hook
  const [reorderChapters] = useReorderChaptersMutation();

  // // UNIT EDIT STATE
  const [editUnitId, setEditUnitId] = useState<number | null>(null);
  const [editUnitTitle, setEditUnitTitle] = useState("");

  // API hooks
  const [updateUnit] = useUpdateUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();
  // unit reorder hooks 
  const [unitItems, setUnitItems] = useState<Record<number, any[]>>({});
  const [reorderUnits] = useReorderUnitsMutation();
  // const [reorderUnits] = useReorderUnitsMutation();

 const [items, setItems] = useState<Chapter[]>([]);

// unit reorder useeffect 

useEffect(() => {
  if (!chaptersData) return;

  setUnitItems((prev) => {
    const updated: Record<number, any[]> = { ...prev };

    chaptersData.forEach((chapter) => {
      const prevUnits = prev[chapter.id];
      const freshUnits = chapter.units || [];

      if (!prevUnits || prevUnits.length === 0) {
        // Pehli baar set karo
        updated[chapter.id] = freshUnits;
      } else {
        const freshIds = new Set(freshUnits.map((u: any) => u.id));

        // Purana order rakho, sirf data update karo
        const preserved = prevUnits
          .filter((u) => freshIds.has(u.id))
          .map((u) => {
            const fresh = freshUnits.find((fu: any) => fu.id === u.id);
            return fresh ? { ...u, ...fresh } : u;
          });

        // Naye units add karo end mein
        const newUnits = freshUnits.filter(
          (u: any) => !prevUnits.some((pu) => pu.id === u.id)
        );

        updated[chapter.id] = [...preserved, ...newUnits];
      }
    });

    return updated;
  });
}, [chaptersData]);


// chapter useeffect 
 useEffect(() => {
  if (!chaptersData) return;

  setItems((prev) => {
    if (prev.length === 0) return chaptersData;

    // Naye ya delete hue chapters sync karo, lekin order preserve karo
    const prevIds = new Set(prev.map((c) => c.id));
    const newIds = new Set(chaptersData.map((c) => c.id));

    // Sirf existing chapters ko update karo (title etc.), order mat badlo
    const updated = prev
      .filter((c) => newIds.has(c.id)) // deleted chapters hata do
      .map((c) => {
        const fresh = chaptersData.find((ch) => ch.id === c.id);
        return { ...c, title: fresh.title };
      });

    // Naye chapters jo pehle nahi the, unhe end mein add karo
    const added = chaptersData.filter((c) => !prevIds.has(c.id));

    return [...updated, ...added];
  });
}, [chaptersData]);
 
  const handleUnitEditClick = (unit: any) => {
    setEditUnitId(unit.id);
    setEditUnitTitle(unit.title);
  };

  const handleEditClick = (chapter: any) => {
    setEditChapterId(chapter.id);
    setEditTitle(chapter.title);
  };

  // unit debouncing 
  const unitDebounceRef = useRef<any>(null);
const unitPendingRef = useRef<Record<number, any[]>>({});


  // delte handler 
  const handleDelete = async (chapterId: number) => {
    if (!courseData?.id) {
      alert("Course ID missing");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this chapter?");
    if (!confirmDelete) return;

    try {
      console.log(chapterId);
      await deleteChapter({
        courseId: courseData.id,
        chapterId,
      }).unwrap();

      alert("Chapter deleted successfully");
      onChapterAdded?.();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };
  // update unit 
  const handleUnitUpdate = async (unitId: number) => {
    try {
      await updateUnit({
        unitId,
        title: editUnitTitle,
      }).unwrap();

      alert("Unit updated successfully");
      setEditUnitId(null);
      onUnitAdded?.();
    } catch (err) {
      alert("Update failed");
    }
  };
  const handleUnitDelete = async (unitId: number) => {
    const confirmDelete = window.confirm("Delete this unit?");
    if (!confirmDelete) return;

    try {
      await deleteUnit({ unitId }).unwrap();

      alert("Unit deleted");
      onUnitAdded?.();
    } catch (err) {
      alert("Delete failed");
    }
  };

  //  UPDATE API CALL
  const handleUpdate = async (chapterId: number) => {
    try {
      await updateChapter({
        courseId: courseData?.id,
        chapterId,
        title: editTitle,
      }).unwrap();

      alert("Chapter updated successfully");
      setEditChapterId(null);
      onChapterAdded?.();
    } catch (err) {
      alert("Update failed");
    }
  };

  // drag and drop unit handler 
const handleUnitDragEnd = (chapterId: number, event: any) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const currentUnits = unitItems[chapterId] || [];

  const oldIndex = currentUnits.findIndex((u) => u.id === active.id);
  const newIndex = currentUnits.findIndex((u) => u.id === over.id);

  if (oldIndex === -1 || newIndex === -1) return;

  const newOrder = arrayMove(currentUnits, oldIndex, newIndex);

  // ✅ UI update instantly
  setUnitItems((prev) => ({
    ...prev,
    [chapterId]: newOrder,
  }));

  const payload = newOrder.map((item, index) => ({
    id: item.id,
    order: index + 1,
  }));

  // ✅ store latest order per chapter
  unitPendingRef.current[chapterId] = payload;

  // ❌ clear previous timer
  if (unitDebounceRef.current) {
    clearTimeout(unitDebounceRef.current);
  }

  // ⏳ debounce API call
  unitDebounceRef.current = setTimeout(async () => {
    try {
      await reorderUnits({
        chapterId,
        units: unitPendingRef.current[chapterId],
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  }, 800); 
};
  // drag and drop handle 
const pendingOrderRef = React.useRef<any[]>([]);
const debounceRef = React.useRef<any>(null);

const handleDragEnd = (event: any) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const oldIndex = items.findIndex((c) => c.id === active.id);
  const newIndex = items.findIndex((c) => c.id === over.id);

  const newOrder = arrayMove(items, oldIndex, newIndex);

 
  setItems(newOrder);

  const payload = newOrder.map((item, index) => ({
    id: item.id,
    order: index + 1,
  }));

  pendingOrderRef.current = payload;

  
  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  debounceRef.current = setTimeout(async () => {
    try {
      await reorderChapters({
        courseId: courseData?.id,
        chapters: pendingOrderRef.current,
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  }, 800 ); 
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
                            onClick={(e) => e.stopPropagation()}
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
                          {(unitItems[chapter.id] || []).length > 0 ? (
                              <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={(event) => handleUnitDragEnd(chapter.id, event)}
                              >
                                <SortableContext
                                  items={(unitItems[chapter.id] || []).map((u: any) => u.id)}
                                  strategy={verticalListSortingStrategy}
                                >
                                  {(unitItems[chapter.id] || []).map((unit: any) => (
                                    <SortableUnit key={unit.id} unit={unit}>
                                      {({ attributes, listeners }: any) => (
                                        <LessonItem>
                                          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>

                                            {/* DRAG HANDLE */}
                                            <DragIndicatorIcon
                                              {...attributes}
                                              {...listeners}
                                              sx={{ cursor: "move", mr: 1 }}
                                            />
                                            {editUnitId === unit.id ? (
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
                                                  onClick={() => setEditUnitId(null)}
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
                                                  unitId: unit.id,
                                                });
                                              }}
                                            >
                                              Add Content
                                            </Button>
                                          </Box>
                                        </LessonItem>
                                        // ))
                                      )}
                                    </SortableUnit>
                                  ))}
                                </SortableContext>
                              </DndContext>
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
        PaperProps={{ sx: { p: 2, borderRadius: 2, minWidth: 320, maxWidth: 400 } }}
      >
        <Box
          sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, p: 1 }}
        >
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            contentTypes.map((opt) => {
              const IconComp = iconMap[opt.icon] || OndemandVideoIcon;

              return (
                <Box
                  key={opt.id}
                  onClick={() => {
                    setAddContentAnchor(null);
                    navigate(
                      `/courses/edit/${addContentAnchor?.chapterId}/${addContentAnchor?.unitId}/questions`,
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
                    p: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    background: "#f5f5f5",
                    "&:hover": { background: "#ede7f6", boxShadow: 2 },
                    minWidth: 80,
                    minHeight: 80,
                  }}
                >
                  <IconComp sx={{ fontSize: 32, color: "primary.main" }} />

                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: 14,
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    {opt.name}
                  </Typography>
                </Box>
              );
            })
          )}
        </Box>
      </Menu>
      <AddChapterModal
        onClose={closeChapterModal}
        open={isChapterModalOpen}
        onChapterAdded={onChapterAdded}
      />
    </Box>
  );
}
