import React from "react";
import {
  Box,
  Typography,
  Menu,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ContentTypeConfig, CourseData } from "../../types";
import { useGetContentTypesQuery } from "../../api/chapterApi";
import CodeIcon from "@mui/icons-material/Code";
import QuizIcon from "@mui/icons-material/Quiz";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArticleIcon from "@mui/icons-material/Article";

const iconMap: Record<string, React.ElementType> = {
  "@mui/icons-material/OndemandVideo": OndemandVideoIcon,
  "@mui/icons-material/Quiz": QuizIcon,
  "@mui/icons-material/Assignment": AssignmentIcon,
  "@mui/icons-material/Code": CodeIcon,
  "@mui/icons-material/Article": ArticleIcon,
  OndemandVideo: OndemandVideoIcon,
  Quiz: QuizIcon,
  Assignment: AssignmentIcon,
  Code: CodeIcon,
  Article: ArticleIcon,
  Video: OndemandVideoIcon,
  Blog: ArticleIcon,
};

const getIconComponent = (icon?: string, name?: string): React.ElementType => {
  if (icon && iconMap[icon]) return iconMap[icon];
  if (name && iconMap[name]) return iconMap[name];
  if (name && iconMap[name.toLowerCase()]) return iconMap[name.toLowerCase()];
  return OndemandVideoIcon;
};

interface AddContentMenuProps {
  addContentAnchor: {
    anchorEl: HTMLElement | null;
    chapterId: string | number;
    lessonId: string | number;
  } | null;
  setAddContentAnchor: React.Dispatch<React.SetStateAction<any>>;
  courseData?: CourseData;
}

export const AddContentMenu: React.FC<AddContentMenuProps> = ({
  addContentAnchor,
  setAddContentAnchor,
  courseData,
}) => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { data: contentTypes = [], isLoading } = useGetContentTypesQuery();

  return (
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
                  const targetCourseId =
                    courseData?.id || courseId || addContentAnchor?.chapterId;
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
  );
};
