import { Fragment, useState } from "react";
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
import { useUpdateChapterMutation ,useDeleteChapterMutation , useUpdateUnitMutation, 
  useDeleteUnitMutation } from "../api/chapterApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface LessonsProps {
  courseData?: CourseData;
  chaptersData?: Chapter[];
  onChapterAdded?: () => void;
  onUnitAdded?: () => void;
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

// PDATE CHAPTER API HOOK
const [updateChapter] = useUpdateChapterMutation();
// delete hook
const [deleteChapter] = useDeleteChapterMutation();

// // UNIT EDIT STATE
const [editUnitId, setEditUnitId] = useState<number | null>(null);
const [editUnitTitle, setEditUnitTitle] = useState("");

// API hooks
const [updateUnit] = useUpdateUnitMutation();
const [deleteUnit] = useDeleteUnitMutation();

  //  EDIT CLICK ch
  const handleUnitEditClick = (unit: any) => {
  setEditUnitId(unit.id);
  setEditUnitTitle(unit.title);
};

const handleEditClick = (chapter: any) => {
  setEditChapterId(chapter.id);
  setEditTitle(chapter.title);
};
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
            chaptersData.map((chapter: Chapter) => (
              <Accordion key={chapter.id}>
                <AccordionSummary
                  aria-controls={`panel${chapter?.id}-content`}
                  id={`panel${chapter?.id}-header`}
                >
                  {/* <Typography
                    component="span"
                    sx={{ color: "#000", fontWeight: 600 }}
                  >
                    {chapter?.title}
                  </Typography> */}

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
                    {chapter?.units?.length > 0 ? (
                      chapter?.units.map((unit: any) => (
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
            ))
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 2,
            borderRadius: 2,
            minWidth: 320,
            maxWidth: 400,
            mt: 1.5, // margin from button
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            p: 1,
            minWidth: 300,
            maxWidth: 400,
          }}
        >
          {[
            { value: "video", label: "Video", icon: OndemandVideoIcon },
            { value: "quiz", label: "Quiz", icon: QuizIcon },
            { value: "assignment", label: "Assignment", icon: AssignmentIcon },
            { value: "code", label: "Code", icon: CodeIcon },
            { value: "blog", label: "Blog", icon: ArticleIcon },
          ].map((opt) => {
            const IconComp = opt.icon;
            return (
              <Box
                key={opt.value}
                onClick={() => {
                  setAddContentAnchor(null);
                  navigate(
                    `/courses/edit/${addContentAnchor?.chapterId}/${addContentAnchor?.unitId}/questions`,
                    {
                      state: {
                        type: opt.value,
                        parentContentType: opt.value, // Pass parent content type
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
                  transition: "background 0.2s, box-shadow 0.2s",
                  boxShadow: 0,
                  "&:hover": {
                    background: "#ede7f6",
                    boxShadow: 2,
                  },
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
                  {opt.label}
                </Typography>
              </Box>
            );
          })}
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
