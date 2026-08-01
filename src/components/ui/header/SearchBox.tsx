import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputAdornment,
  TextField,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import SearchIcon from "@icons/SearchIcon";
// Search query stub - course-browse not in practivo-creator
const useSearchCoursesQuery = () => ({ data: null, isLoading: false, isFetching: false });
import { ICourse } from "../../../types/course.types";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounce input by 200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch all courses (we'll filter client-side)
  const {
    data: searchData,
    isLoading,
    isFetching,
  } = useSearchCoursesQuery(
    { page: 1, limit: 100 },
    { skip: !debouncedQuery.trim() }
  );

  // Extract all courses from response
  const allCourses: ICourse[] =
    (searchData as { data?: { courses?: ICourse[] } })?.data?.courses || [];

  // Filter courses client-side based on search query and limit to 10 for dropdown
  const courses: ICourse[] = debouncedQuery.trim()
    ? allCourses
      .filter((course) =>
        course.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      .slice(0, 10)
    : [];

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);

    // Hide suggestions if input is cleared
    if (!value.trim()) {
      setShowSuggestions(false);
    }
  };

  // Handle course click
  const handleCourseClick = useCallback(
    (courseId: number) => {
      setShowSuggestions(false);
      setQuery("");
      navigate(`/course-glossary/${courseId}`);
    },
    [navigate]
  );

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selectedIndex >= 0 && courses[selectedIndex]) {
        // Navigate to selected course
        handleCourseClick(courses[selectedIndex].id);
      } else if (query.trim()) {
        // Navigate to search results page
        setShowSuggestions(false);
        navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < courses.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show suggestions only when there's a query and results
  const shouldShowSuggestions =
    showSuggestions &&
    debouncedQuery.trim() &&
    (isLoading || isFetching || courses.length > 0);

  return (
    <Box
      ref={searchBoxRef}
      sx={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        maxWidth: "100%",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="What do you want to learn?"
        size="small"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (debouncedQuery.trim()) {
            setShowSuggestions(true);
          }
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            background: "#fff",
            borderRadius: { xs: "8px", sm: "10px" },
            padding: { xs: "4px", sm: "6px" },
            height: { xs: "40px", sm: "44px" },
            "& fieldset": {
              border: "1px solid rgba(230, 230, 230, 1)",
              borderRadius: { xs: "8px", sm: "10px" },
              overflow: "hidden",
            },
            "&:hover fieldset": {
              borderColor: "#bdbdbd",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(79, 57, 246, 1)",
            },
            "& .MuiInputBase-input": {
              padding: { xs: "6px 10px", sm: "8px 12px" },
              fontSize: { xs: "13px", sm: "14px" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(158, 158, 158, 1)",
              opacity: 1,
              fontSize: { xs: "13px", sm: "14px" },
            },
            "& .MuiInputAdornment-root": {
              padding: { xs: "0 6px", sm: "0 8px" },
              "& svg": {
                color: "rgba(158, 158, 158, 1)",
                fontSize: { xs: "18px", sm: "20px" },
              },
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (isLoading || isFetching) && debouncedQuery.trim() ? (
            <InputAdornment position="end">
              <CircularProgress size={20} sx={{ color: "rgba(79, 57, 246, 1)" }} />
            </InputAdornment>
          ) : null,
        }}
      />

      {/* Suggestions Dropdown */}
      {shouldShowSuggestions && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            maxHeight: "400px",
            overflow: "auto",
            zIndex: 1300,
            borderRadius: "12px",
            border: "1px solid rgba(230, 230, 230, 1)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isLoading || isFetching ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 3,
              }}
            >
              <CircularProgress size={24} sx={{ color: "rgba(79, 57, 246, 1)" }} />
              <Typography
                sx={{
                  ml: 2,
                  color: "rgba(158, 158, 158, 1)",
                  fontSize: "14px",
                }}
              >
                Loading...
              </Typography>
            </Box>
          ) : courses.length > 0 ? (
            <List sx={{ py: 0 }}>
              {courses.map((course, index) => (
                <ListItem
                  key={course.id}
                  disablePadding
                  sx={{
                    borderBottom:
                      index < courses.length - 1
                        ? "1px solid rgba(230, 230, 230, 0.5)"
                        : "none",
                  }}
                >
                  <ListItemButton
                    onClick={() => handleCourseClick(course.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    sx={{
                      py: 1.5,
                      px: 2,
                      backgroundColor:
                        selectedIndex === index
                          ? "rgba(79, 57, 246, 0.08)"
                          : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(79, 57, 246, 0.08)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "rgba(33, 33, 33, 1)",
                        fontWeight: selectedIndex === index ? 500 : 400,
                      }}
                    >
                      {course.title}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : debouncedQuery.trim() ? (
            <Box
              sx={{
                py: 3,
                px: 2,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(158, 158, 158, 1)",
                  fontSize: "14px",
                }}
              >
                No courses found
              </Typography>
            </Box>
          ) : null}
        </Paper>
      )}
    </Box>
  );
};

export default SearchBox;
