import {
  Box,
  Typography,
  Modal,
  Button,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
  alpha,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useState } from "react";

// Stub types and hooks - course-browse not in tiiron-for-business
type ICartItem = any;
type SingleEnrollmentRequest = any;
const useInitiateCheckoutMutation = () => [() => Promise.resolve({}), { isLoading: false }];
const useGetCartQuery = () => ({ data: null });
const useRemoveFromCartServerMutation = () => [() => Promise.resolve({}), { isLoading: false }];
import { useNavigate } from "react-router-dom";
import { UPLOADS } from "../../../constants/constants";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 480 },
  maxWidth: 480,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow:
    "0 20px 60px rgba(15,23,42,0.12), 0 8px 24px rgba(15,23,42,0.08)",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  outline: "none",
};

// --- Single Cart Item Component ---
interface CartItemProps {
  item: ICartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [removeFromCartServer, { isLoading: isRemoving }] =
    useRemoveFromCartServerMutation();

  const title = item.course.title;
  const price = item.course.price ?? 0;
  const thumbnail = item.course.image;
  const cartItemId = item.id;

  const handleRemove = async () => {
    try {
      await removeFromCartServer({ cartItemId: cartItemId }).unwrap();
    } catch (error) {
      console.error("Failed to remove item from server cart:", error);
    }
  };

  const thumbnailUrl = thumbnail ? `${UPLOADS}${thumbnail}` : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        borderRadius: "12px",
        bgcolor: "#FAFAFA",
        border: "1px solid rgba(148,163,184,0.12)",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "#F5F5F5",
          borderColor: "rgba(148,163,184,0.2)",
        },
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: "10px",
          overflow: "hidden",
          bgcolor: "#EEF2FF",
          border: "1px solid rgba(148,163,184,0.1)",
        }}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#EEF2FF",
              color: "#4338CA",
            }}
          >
            <ShoppingBagOutlinedIcon sx={{ fontSize: 32 }} />
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            fontSize: "15px",
            color: "#0f172a",
            lineHeight: 1.4,
            mb: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#4F39F6",
            fontWeight: 700,
            fontSize: "16px",
            mt: 0.5,
          }}
        >
          ${price.toFixed(2)}
        </Typography>
      </Box>

      {/* Remove Button */}
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={handleRemove}
        disabled={isRemoving}
        sx={{
          color: "#64748b",
          "&:hover": {
            color: "#ef4444",
            bgcolor: alpha("#ef4444", 0.1),
          },
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
      >
        {isRemoving ? (
          <CircularProgress size={20} />
        ) : (
          <DeleteIcon sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Box>
  );
};

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const {
    data: cartData,
    isFetching: isCartFetching,
    isError: isCartError,
  } = useGetCartQuery(undefined, {
    skip: !isOpen, // Only fetch when modal is open
  });

  const cartItems = cartData?.data?.items || [];
  const cartTotal = cartData?.data?.total || 0;
  const isCartEmpty = cartItems.length === 0;

  const [initiateCheckout, { isLoading: isCheckingOut }] =
    useInitiateCheckoutMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, SetSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // --- LOOPING CHECKOUT HANDLER ---
  const handleCheckout = async () => {
    if (isCartEmpty || isCheckingOut || isCartFetching) return;

    SetSnackbarMessage("Starting enrollment process...");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);

    const isFree = cartTotal === 0;
    const paymentStatus = isFree ? "free" : "pending";

    const successfullyEnrolledIds: number[] = [];
    const enrolledCourseIds: number[] = [];

    try {
      for (const item of cartItems) {
        const courseId = item.course?.id;

        if (!courseId || typeof courseId !== "number") {
          console.error("Skipping item, missing course ID:", item);
          continue;
        }

        const payload: SingleEnrollmentRequest = {
          courseId: courseId,
          status: "active",
          payment_status: paymentStatus,
        };

        const response = await initiateCheckout(payload).unwrap();
        if (response.success) {
          successfullyEnrolledIds.push(item.id);
        }
      }

      // --- Final Success Check ---
      if (successfullyEnrolledIds.length > 0) {
        if (isFree) {
          if (successfullyEnrolledIds.length == 1) {
            const courseIdToRedirect = enrolledCourseIds[0];

            SetSnackbarMessage(
              `Successfully enrolled! Redirecting to course...`
            );
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            onClose();
            navigate(`/course-practice/${courseIdToRedirect}`);
          } else {
            // API (invalidatesTags) will refetch the cart, making it empty
            SetSnackbarMessage(
              `Successfully enrolled in ${successfullyEnrolledIds.length} FREE course(s).`
            );
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setTimeout(onClose, 2000);
          }

          // ... (Payment Gateway logic) ...
        } else {
          SetSnackbarMessage(
            `Enrollment successful for ${successfullyEnrolledIds.length} paid course(s).`
          );
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setTimeout(onClose, 3000);
        }
      } else {
        throw new Error(
          "Checkout failed. No courses were successfully enrolled."
        );
      }
    } catch (error: any) {
      // ... (Error handling logic remains the same) ...
      let errorMessage = "Checkout failed due to a server or network error.";
      let severity: "success" | "error" | "info" | "warning" = "error";

      const serverMessage =
        error?.data?.errors?.[0]?.message || error?.data?.message;

      if (serverMessage) {
        if (serverMessage.toLowerCase().includes("enrolled")) {
          errorMessage =
            "You are already enrolled in this course. Cannot enroll again.";
          severity = "warning";
        } else {
          errorMessage = serverMessage;
          severity = "error";
        }
      }

      setSnackbarSeverity(severity);
      SetSnackbarMessage(errorMessage);
      setSnackbarOpen(true);

      console.error("Checkout Error:", error);
    }
  };

  const isContentLoading = isCartFetching && !cartData;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="cart-modal-title"
      aria-describedby="cart-modal-description"
      sx={{
        backdropFilter: "blur(4px)",
        "& .MuiBackdrop-root": {
          bgcolor: alpha("#000", 0.5),
        },
      }}
    >
      <Box sx={modalStyle}>
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            pb: 2.5,
            borderBottom: "1px solid rgba(148,163,184,0.12)",
            bgcolor: "#FFFFFF",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "#EEF2FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 22, color: "#4F39F6" }} />
            </Box>
            <Box>
              <Typography
                id="cart-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#0f172a",
                  lineHeight: 1.2,
                }}
              >
                Your Cart
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "13px",
                  color: "#64748b",
                  mt: 0.25,
                }}
              >
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            disabled={isCheckingOut}
            sx={{
              color: "#64748b",
              "&:hover": {
                bgcolor: alpha("#64748b", 0.1),
                color: "#0f172a",
              },
              transition: "all 0.2s ease",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Cart Content - Scrollable */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            bgcolor: "#FFFFFF",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: alpha("#64748b", 0.3),
              borderRadius: "10px",
              "&:hover": {
                bgcolor: alpha("#64748b", 0.5),
              },
            },
          }}
        >
          {/* Cart Items List */}
          {isCartError ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 6,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#ef4444", fontWeight: 600, mb: 1 }}
              >
                Error Loading Cart
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                Please try again later.
              </Typography>
            </Box>
          ) : isContentLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 6,
              }}
            >
              <CircularProgress sx={{ color: "#4F39F6" }} />
            </Box>
          ) : isCartEmpty ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 6,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "#EEF2FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2.5,
                }}
              >
                <ShoppingBagOutlinedIcon
                  sx={{ fontSize: 40, color: "#4F39F6" }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#0f172a",
                  mb: 1,
                }}
              >
                Your cart is empty
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#64748b",
                  fontSize: "14px",
                  maxWidth: "280px",
                }}
              >
                Start adding courses to your cart to continue learning
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Box>
          )}
        </Box>

        {/* Footer with Total and Checkout */}
        {!isCartEmpty && !isCartError && !isContentLoading && (
          <Box
            sx={{
              p: 3,
              pt: 2.5,
              borderTop: "1px solid rgba(148,163,184,0.12)",
              bgcolor: "#FFFFFF",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            {/* Total */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#0f172a",
                }}
              >
                Total
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: "24px",
                  color: cartTotal > 0 ? "#4F39F6" : "#10b981",
                }}
              >
                {cartTotal === 0 ? "FREE" : `$${cartTotal.toFixed(2)}`}
              </Typography>
            </Box>

            {/* Checkout Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
              disabled={isCheckingOut || isCartEmpty}
              sx={{
                bgcolor: "#4F39F6",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "15px",
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                boxShadow:
                  "0 4px 12px rgba(79,57,246,0.3), 0 2px 4px rgba(79,57,246,0.2)",
                "&:hover": {
                  bgcolor: "#3E2DC4",
                  boxShadow:
                    "0 6px 16px rgba(79,57,246,0.4), 0 4px 8px rgba(79,57,246,0.3)",
                  transform: "translateY(-1px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
                "&:disabled": {
                  bgcolor: alpha("#4F39F6", 0.5),
                  color: "#FFFFFF",
                  boxShadow: "none",
                },
                transition: "all 0.2s ease",
              }}
            >
              {isCheckingOut ? (
                <CircularProgress size={24} color="inherit" />
              ) : cartTotal === 0 ? (
                "Enroll Now (FREE)"
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
          </Box>
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{
              width: "100%",
              borderRadius: "12px",
              boxShadow:
                "0 4px 12px rgba(15,23,42,0.1), 0 2px 4px rgba(15,23,42,0.06)",
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};
