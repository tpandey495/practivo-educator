import {
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Rating,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import DocumentIcon from "@icons/DocumentIcon";
import DeleteIcon from "@icons/DeleteIcon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit"; // Added Edit Icon
import { UPLOADS } from "../../../constants/constants";
import { ICourseCardProps } from "types/course.types";

interface ReusableCourseCardProps extends ICourseCardProps {
  price?: number;
  isInCart?: boolean;
  allowDelete?: boolean;
  allowEdit?: boolean; // New Prop
  isLoadingCart?: boolean;
  instructor?: string;
  reviewCount?: number;
  progress?: number;
  learnerRating?: number;
  variant?: "browse" | "my-course";
  onStartCourse?: (courseId: number) => void;
  onShare?: (courseId: number) => void;
  onFavorite?: (courseId: number) => void;
  onArchive?: (courseId: number) => void;
  isFavorite?: boolean;

  onCardClick?: () => void;
  onDeleteClick?: () => void;
  onEditClick?: (e: React.MouseEvent) => void; // New Prop
  onAddToCartClick?: (e: React.MouseEvent) => void;
}

export default function CourseCard({
  thumbnailSrc,
  tags,
  title,
  chapters,
  rating = 0,
  price = 0,
  allowDelete = false,
  allowEdit = false, // Default to false
  isInCart = false,
  isLoadingCart = false,
  instructor,
  reviewCount = 0,
  progress = 0,
  learnerRating = 0,
  variant = "browse",
  onStartCourse,
  onShare,
  onFavorite,
  onArchive,
  isFavorite = false,
  onAddToCartClick,
  onCardClick,
  onDeleteClick,
  onEditClick,
  id,
}: ReusableCourseCardProps) {
  const displayRating = rating > 0 ? rating.toFixed(1) : "0.0";
  const displayLearnerRating =
    learnerRating > 0 ? learnerRating.toFixed(1) : "0.0";
  const formattedReviewCount =
    reviewCount > 0
      ? reviewCount >= 1000
        ? `${(reviewCount / 1000).toFixed(1)}k`
        : reviewCount.toString()
      : "0";

  const handleStartCourse = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStartCourse && id) {
      onStartCourse(id);
    } else if (onCardClick) {
      onCardClick();
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare && id) {
      onShare(id);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavorite && id) {
      onFavorite(id);
    }
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onArchive && id) {
      onArchive(id);
    }
  };

  // Reusable Overlay Actions (Edit/Delete)
  const OverlayActions = () => (
    <Box
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        display: "flex",
        gap: 1,
        zIndex: 2,
      }}
    >
      {allowEdit && (
        <Tooltip title="Edit Course">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick?.(e);
            }}
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              color: "#4F39F6",
              "&:hover": { bgcolor: "#fff", color: "#3E2DC4" },
            }}
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      )}
      {allowDelete && (
        <Tooltip title="Delete Course">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick?.();
            }}
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              "&:hover": { bgcolor: "#fff", color: "#e11d48" },
            }}
          >
            <DeleteIcon width={16} height={18} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  // My Course Variant
  if (variant === "my-course") {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 320,
          minHeight: 360,
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
          border: "1px solid rgba(148,163,184,0.18)",
          boxShadow:
            "0 4px 12px rgba(15,23,42,0.06), 0 12px 28px rgba(15,23,42,0.08)",
          transition: "transform 0.35s ease, box-shadow 0.35s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow:
              "0 6px 16px rgba(15,23,42,0.07), 0 14px 36px rgba(15,23,42,0.1)",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 150,
            position: "relative",
            overflow: "hidden",
            borderBottom: "1px solid rgba(148,163,184,0.12)",
          }}
        >
          {thumbnailSrc ? (
            <img
              src={UPLOADS + thumbnailSrc}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
              className="hover:scale-105"
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                bgcolor: "#EEF2FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4338CA",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              No Image
            </Box>
          )}
          <OverlayActions />
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}>
          <Box sx={{ mb: 0.6 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "15px",
                color: "#0f172a",
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mb: 0.25,
              }}
            >
              {title}
            </Typography>
            {instructor && (
              <Typography
                sx={{ fontSize: "12.5px", color: "#64748b", fontWeight: 500 }}
              >
                {instructor}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 1.2, mb: 1.6 }}>
            <Typography
              sx={{ fontSize: "12px", color: "#64748b", fontWeight: 500, mb: 0.4 }}
            >
              Course Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: "999px",
                backgroundColor: "rgba(79,57,246,0.14)",
                "& .MuiLinearProgress-bar": {
                  background:
                    "linear-gradient(90deg, #4F39F6 0%, #8B5FD4 50%, #A87BEC 100%)",
                  borderRadius: "999px",
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", mb: 1.8, mt: 0.5 }}>
            <Button
              variant="contained"
              onClick={handleStartCourse}
              sx={{
                width: "54%",
                backgroundColor: "#4F39F6",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13.5px",
                borderRadius: "10px",
                boxShadow: "0 6px 16px rgba(79,57,246,0.25)",
                "&:hover": { backgroundColor: "#3E2DC4" },
              }}
            >
              Start Course
            </Button>
          </Box>

          <Box
            sx={{
              mt: "auto",
              pt: 1,
              borderTop: "1px solid rgba(148,163,184,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {learnerRating > 0 ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                <Typography
                  sx={{ fontSize: "12px", fontWeight: 700, color: "#b4690e" }}
                >
                  {displayLearnerRating}
                </Typography>
                <Rating
                  value={learnerRating}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{ fontSize: "15px", "& .MuiRating-iconFilled": { color: "#b4690e" } }}
                />
              </Box>
            ) : (
              <Typography sx={{ fontSize: "12px", color: "#94a3b8" }}>
                No Rating
              </Typography>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
              <ShareIcon
                onClick={handleShare}
                sx={{ fontSize: 18, color: "#64748b", cursor: "pointer", "&:hover": { color: "#6366f1" } }}
              />
              {isFavorite ? (
                <FavoriteIcon onClick={handleFavorite} sx={{ fontSize: 18, color: "#e11d48", cursor: "pointer" }} />
              ) : (
                <FavoriteBorderIcon onClick={handleFavorite} sx={{ fontSize: 18, color: "#64748b", cursor: "pointer", "&:hover": { color: "#6366f1" } }} />
              )}
              <ArchiveIcon onClick={handleArchive} sx={{ fontSize: 18, color: "#64748b", cursor: "pointer", "&:hover": { color: "#6366f1" } }} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // Default Variant
  return (
    <Box
      onClick={onCardClick}
      sx={{
        width: "100%",
        maxWidth: 350,
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: "18px",
        overflow: "hidden",
        background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
        border: "1px solid rgba(148,163,184,0.18)",
        boxShadow: "0 4px 12px rgba(15,23,42,0.06), 0 12px 28px rgba(15,23,42,0.08)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: onCardClick ? "pointer" : "default",
        "&:hover": { transform: "translateY(-8px)" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 180,
          overflow: "hidden",
          borderBottom: "1px solid rgba(148,163,184,0.12)",
        }}
      >
        {thumbnailSrc ? (
          <img
            src={UPLOADS + thumbnailSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              height: "100%",
              bgcolor: "#EEF2FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4338CA",
              fontWeight: 600,
            }}
          >
            No Image
          </Box>
        )}
        <OverlayActions />
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2.5 }}>
        {tags?.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 1 }}>
            {tags.slice(0, 2).map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                size="small"
                sx={{
                  fontSize: "11px",
                  height: "22px",
                  bgcolor: idx === 0 ? "rgba(99,102,241,0.12)" : "rgba(14,165,233,0.12)",
                  color: idx === 0 ? "#4338CA" : "#0369A1",
                  fontWeight: 500,
                  borderRadius: "8px",
                }}
              />
            ))}
          </Box>
        )}

        <Typography
          sx={{ fontWeight: 700, fontSize: "16px", lineHeight: 1.4, color: "#0f172a", mb: 0.6 }}
        >
          {title}
        </Typography>

        {instructor && (
          <Typography sx={{ fontSize: "13px", color: "#64748b", mb: 1 }}>
            {instructor}
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#b4690e" }}>
            {displayRating}
          </Typography>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          {reviewCount > 0 && (
            <Typography sx={{ fontSize: "12px", color: "#6b7280", ml: 0.4 }}>
              ({formattedReviewCount})
            </Typography>
          )}
        </Box>

        {chapters !== undefined && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 2 }}>
            <DocumentIcon strokeColor="#64748b" width={18} height={18} />
            <Typography sx={{ fontSize: "12.5px", color: "#6b7280" }}>
              {chapters} {chapters === 1 ? "Chapter" : "Chapters"}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 1.2,
            borderTop: "1px solid rgba(148,163,184,0.12)",
          }}
        >
          <Typography
            sx={{ fontWeight: 700, fontSize: "18px", color: price > 0 ? "#1e293b" : "#64748b" }}
          >
            {price === 0 ? "FREE" : `$${price.toFixed(0)}`}
          </Typography>

          {onAddToCartClick && (
            <Button
              variant="contained"
              disabled={isInCart || isLoadingCart}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCartClick(e);
              }}
              startIcon={!isLoadingCart && <ShoppingCartIcon />}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                backgroundColor: "#4F39F6",
                "&:hover": { backgroundColor: "#3E2DC4" },
              }}
            >
              {isLoadingCart ? "Adding..." : isInCart ? "In Cart" : "Add to Cart"}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}