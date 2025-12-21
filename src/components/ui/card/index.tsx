import {
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Rating,
  LinearProgress,
} from "@mui/material";
import DocumentIcon from "@icons/DocumentIcon";
import DeleteIcon from "@icons/DeleteIcon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArchiveIcon from "@mui/icons-material/Archive";
import { UPLOADS } from "../../../constants/constants";
import { ICourseCardProps } from "types/course.types";

interface ReusableCourseCardProps extends ICourseCardProps {
  price?: number;
  isInCart?: boolean;
  allowDelete?: boolean;
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
  id,
}: ReusableCourseCardProps) {
  const displayRating = rating > 0 ? rating.toFixed(1) : "0.0";
  const displayLearnerRating = learnerRating > 0 ? learnerRating.toFixed(1) : "0.0";
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

  // My Course Variant — Final Product-Grade Card
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
        {/* Thumbnail */}
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

          {/* Delete Button */}
          {allowDelete && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick?.();
              }}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                "&:hover": { bgcolor: "#fff" },
              }}
            >
              <DeleteIcon width={16} height={18} />
            </IconButton>
          )}
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          {/* Title & Instructor */}
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
                sx={{
                  fontSize: "12.5px",
                  color: "#64748b",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {instructor}
              </Typography>
            )}
          </Box>

          {/* Progress */}
          <Box sx={{ mt: 1.2, mb: 1.6 }}>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#64748b",
                fontWeight: 500,
                mb: 0.4,
              }}
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
                  boxShadow: "0 2px 6px rgba(138,92,212,0.35)",
                },
              }}
            />
          </Box>

          {/* CTA Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              mb: 1.8,
              mt: 0.5,
            }}
          >
            <Button
              variant="contained"
              onClick={handleStartCourse}
              sx={{
                width: "54%", // slightly reduced width
                backgroundColor: "#4F39F6",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13.5px",
                py: 0.5,
                borderRadius: "10px",
                border: "1px solid #4F39F6",
                boxShadow: "0 6px 16px rgba(79,57,246,0.25)",
                "&:hover": {
                  backgroundColor: "#3E2DC4",
                  borderColor: "#3E2DC4",
                  boxShadow: "0 8px 20px rgba(79,57,246,0.35)",
                },
                transition:
                  "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              Start Course
            </Button>
          </Box>

          {/* Rating + Actions */}
          <Box
            sx={{
              mt: 1.2,
              pt: 1,
              borderTop: "1px solid rgba(148,163,184,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Rating */}
            {learnerRating > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.4,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#b4690e",
                  }}
                >
                  {displayLearnerRating}
                </Typography>
                <Rating
                  value={learnerRating}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{
                    fontSize: "15px",
                    "& .MuiRating-iconFilled": { color: "#b4690e" },
                    "& .MuiRating-iconEmpty": { color: "#d1d1d1" },
                  }}
                />
              </Box>
            ) : (
              <Typography sx={{ fontSize: "12px", color: "#94a3b8" }}>
                No Rating
              </Typography>
            )}

            {/* Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
              <ShareIcon
                onClick={handleShare}
                sx={{
                  fontSize: 18,
                  color: "#64748b",
                  cursor: "pointer",
                  "&:hover": { color: "#6366f1" },
                }}
              />
              {isFavorite ? (
                <FavoriteIcon
                  onClick={handleFavorite}
                  sx={{
                    fontSize: 18,
                    color: "#e11d48",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={handleFavorite}
                  sx={{
                    fontSize: 18,
                    color: "#64748b",
                    cursor: "pointer",
                    "&:hover": { color: "#6366f1" },
                  }}
                />
              )}
              <ArchiveIcon
                onClick={handleArchive}
                sx={{
                  fontSize: 18,
                  color: "#64748b",
                  cursor: "pointer",
                  "&:hover": { color: "#6366f1" },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }




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
        boxShadow:
          "0 4px 12px rgba(15,23,42,0.06), 0 12px 28px rgba(15,23,42,0.08)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: onCardClick ? "pointer" : "default",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow:
            "0 8px 18px rgba(15,23,42,0.08), 0 16px 40px rgba(15,23,42,0.1)",
        },
      }}
    >
      {/* Thumbnail */}
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
            }}
          >
            No Image
          </Box>
        )}

        {/* Delete Button */}
        {allowDelete && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick?.();
            }}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            <DeleteIcon width={16} height={18} />
          </IconButton>
        )}
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2.5,
        }}
      >
        {/* Tags */}
        {tags?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.6,
              mb: 1,
            }}
          >
            {tags.slice(0, 2).map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                size="small"
                sx={{
                  fontSize: "11px",
                  height: "22px",
                  bgcolor:
                    idx === 0
                      ? "rgba(99,102,241,0.12)"
                      : "rgba(14,165,233,0.12)",
                  color: idx === 0 ? "#4338CA" : "#0369A1",
                  fontWeight: 500,
                  borderRadius: "8px",
                }}
              />
            ))}
          </Box>
        )}

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: 1.4,
            color: "#0f172a",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 0.6,
          }}
        >
          {title}
        </Typography>

        {/* Instructor */}
        {instructor && (
          <Typography
            sx={{
              fontSize: "13px",
              color: "#64748b",
              mb: 1,
            }}
          >
            {instructor}
          </Typography>
        )}

        {/* Rating */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#b4690e",
            }}
          >
            {displayRating}
          </Typography>
          <Rating
            value={rating}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": { color: "#b4690e" },
              "& .MuiRating-iconEmpty": { color: "#d1d1d1" },
              fontSize: "16px",
            }}
          />
          {reviewCount > 0 && (
            <Typography
              sx={{
                fontSize: "12px",
                color: "#6b7280",
                ml: 0.4,
              }}
            >
              ({formattedReviewCount})
            </Typography>
          )}
        </Box>

        {/* Chapters */}
        {chapters !== undefined && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.6,
              mb: 2,
            }}
          >
            <DocumentIcon strokeColor="#64748b" width={18} height={18} />
            <Typography sx={{ fontSize: "12.5px", color: "#6b7280" }}>
              {chapters} {chapters === 1 ? "Chapter" : "Chapters"}
            </Typography>
          </Box>
        )}

        {/* Price + Cart */}
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
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              color: price > 0 ? "#1e293b" : "#64748b",
            }}
          >
            {price === 0 ? "FREE" : `$${price.toFixed(0)}`}
          </Typography>

          {onAddToCartClick && (
            <Button
              variant="contained"
              size="small"
              startIcon={
                !isLoadingCart && (
                  <ShoppingCartIcon
                    sx={{
                      color: isInCart ? "#94A3B8" : "#FFFFFF",
                      transition: "color 0.2s ease",
                    }}
                  />
                )
              }
              disabled={isInCart || isLoadingCart}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCartClick(e);
              }}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                px: 2.4,
                py: 0.8,
                fontSize: "13.5px",
                fontWeight: 600,
                color: isInCart ? "#94A3B8" : "#FFFFFF",
                backgroundColor: "#4F39F6",
                border: "1px solid #4F39F6",
                boxShadow: "0 6px 16px rgba(79,57,246,0.25)",
                transition:
                  "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
                "&:hover": {
                  backgroundColor: "#3E2DC4",
                  borderColor: "#3E2DC4",
                  color: "#FFFFFF",
                  boxShadow: "0 8px 20px rgba(79,57,246,0.35)",
                },
                "&:disabled": {
                  backgroundColor: "#F1F5F9",
                  borderColor: "rgba(148,163,184,0.4)",
                  color: "#94A3B8",
                  boxShadow: "none",
                },
              }}
            >
              {isLoadingCart
                ? "Adding..."
                : isInCart
                  ? "In Cart"
                  : "Add to Cart"}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );

}
