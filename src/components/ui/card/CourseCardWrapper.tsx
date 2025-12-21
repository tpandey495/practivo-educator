import { Snackbar, Alert } from "@mui/material";
import { ICourseCardProps } from "types/course.types";
import { useState, ComponentType } from "react";
import CourseCard from "./index";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
}

interface CourseCardWrapperProps extends ICourseCardProps {
  price?: number;
  navigatePath?: (id: number) => string;
  DeleteModalComponent?: ComponentType<DeleteModalProps>;
  isCourseInCart?: boolean;
  onAddToCart?: (courseId: number) => Promise<void>;
  isLoadingCart?: boolean;
  onCardClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
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
}

export default function CourseCardWrapper({
  thumbnailSrc,
  tags,
  title,
  chapters,
  rating,
  id,
  price = 0,
  navigatePath,
  DeleteModalComponent,
  isCourseInCart = false,
  onAddToCart,
  isLoadingCart = false,
  onCardClick,
  onDeleteClick,
  instructor,
  reviewCount,
  progress,
  learnerRating,
  variant = "browse",
  onStartCourse,
  onShare,
  onFavorite,
  onArchive,
  isFavorite = false,
}: CourseCardWrapperProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Card click handler - use parent's handler or navigatePath
  const handleCardClick = () => {
    if (variant === "my-course" && onStartCourse) {
      // For my-course variant, START COURSE button handles navigation
      return;
    }
    if (onCardClick) {
      onCardClick(id);
    } else if (navigatePath) {
      window.location.href = navigatePath(id);
    }
  };

  // Handler for START COURSE button
  const handleStartCourse = (courseId: number) => {
    if (onStartCourse) {
      onStartCourse(courseId);
    } else if (navigatePath) {
      window.location.href = navigatePath(courseId);
    } else if (onCardClick) {
      onCardClick(courseId);
    }
  };

  // Delete click handler - use parent's handler or open modal
  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(id);
    } else if (DeleteModalComponent) {
      setIsDeleteModalOpen(true);
    }
  };

  // Add to cart handler - always uses parent's function
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!id || typeof id !== "number") {
      setSnackbarMessage("Error: Cannot add course. Course ID is missing.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!onAddToCart) {
      setSnackbarMessage("Error: Add to cart functionality is not available.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (isCourseInCart) {
      setSnackbarMessage("Course already exists in your cart.");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
      return;
    }

    try {
      await onAddToCart(id);
      setSnackbarMessage(`"${title}" successfully added to your cart!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error: any) {
      let errorMessage = "Failed to add course to cart.";
      let severity: "success" | "error" | "info" | "warning" = "error";

      const serverMessage =
        error?.data?.errors?.[0]?.message || error?.data?.message;

      if (serverMessage) {
        if (serverMessage.toLowerCase().includes("already in cart")) {
          errorMessage = "This course is already in your cart.";
          severity = "warning";
        } else {
          errorMessage = serverMessage;
          severity = "error";
        }
      }

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <CourseCard
        id={id}
        thumbnailSrc={thumbnailSrc}
        tags={tags}
        title={title}
        chapters={chapters}
        rating={rating}
        price={price}
        isInCart={isCourseInCart}
        isLoadingCart={isLoadingCart}
        allowDelete={!!(onDeleteClick || DeleteModalComponent)}
        onCardClick={handleCardClick}
        onDeleteClick={handleDeleteClick}
        onAddToCartClick={onAddToCart ? handleAddToCart : undefined}
        instructor={instructor}
        reviewCount={reviewCount}
        progress={progress}
        learnerRating={learnerRating}
        variant={variant}
        onStartCourse={handleStartCourse}
        onShare={onShare}
        onFavorite={onFavorite}
        onArchive={onArchive}
        isFavorite={isFavorite}
      />
      {DeleteModalComponent && (
        <DeleteModalComponent
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          id={id}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
