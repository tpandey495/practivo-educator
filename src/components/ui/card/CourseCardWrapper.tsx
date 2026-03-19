import { Snackbar, Alert } from "@mui/material";
import { ICourseCardProps } from "types/course.types";
import { useState, ComponentType } from "react";
import CourseCard from "./index";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
}

interface CourseCardWrapperProps extends ICourseCardProps {
  price?: number;
  navigatePath?: (id: number) => string;
  DeleteModalComponent?: ComponentType<DeleteModalProps>;
  EditModalComponent?: ComponentType<EditModalProps>;
  isCourseInCart?: boolean;
  onAddToCart?: (courseId: number) => Promise<void>;
  isLoadingCart?: boolean;
  onCardClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
  onEditClick?: (id: number) => void; 
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
  EditModalComponent,
  isCourseInCart = false,
  onAddToCart,
  isLoadingCart = false,
  onCardClick,
  onDeleteClick,
  onEditClick,
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
  // Snackbar State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  
  // Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // --- HANDLERS ---

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(id);
    } else if (navigatePath) {
      // If you are using a router like react-router-dom, 
      // you'd call navigate(navigatePath(id)) here.
      window.location.href = navigatePath(id);
    }
  };

  const handleStartCourse = (courseId: number) => {
    if (onStartCourse) {
      onStartCourse(courseId);
    }
  };

  const handleDeleteClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (onDeleteClick) {
      onDeleteClick(id);
    } else if (DeleteModalComponent) {
      setIsDeleteModalOpen(true);
    }
  };

  const handleEditClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (onEditClick) {
      onEditClick(id);
    } else if (EditModalComponent) {
      setIsEditModalOpen(true);
    }
  };

  const handleAddToCart = async (courseId: number) => {
    if (!onAddToCart) return;
    try {
      await onAddToCart(courseId);
      setSnackbarSeverity("success");
      setSnackbarMessage("Course added to cart!");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to add course to cart.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
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
        allowEdit={!!(onEditClick || EditModalComponent)}
        onEditClick={handleEditClick}
        onCardClick={handleCardClick}
        onDeleteClick={handleDeleteClick}
        onAddToCartClick={onAddToCart ? handleAddToCart : undefined}
        instructor={instructor}
        reviewCount={reviewCount}
        progress={progress}
        learnerRating={learnerRating}
        variant={variant}
        onStartCourse={() => handleStartCourse(id)}
        onShare={onShare}
        onFavorite={onFavorite}
        onArchive={onArchive}
        isFavorite={isFavorite}
      />

      {/* Delete Modal Injection */}
      {DeleteModalComponent && (
        <DeleteModalComponent
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          id={id}
        />
      )}

      {/* Edit Modal Injection */}
      {EditModalComponent && (
        <EditModalComponent
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          id={id}
        />
      )}

      {/* Notification Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}