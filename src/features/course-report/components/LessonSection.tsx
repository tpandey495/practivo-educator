import React from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FilterIcon from "@icons/FilterIcon";
import ListChecklistIcon from "@icons/ListChecklistIcon";
import { lessonReportData } from "../utils/mockData";

const LessonSection = () => {
  return (
    <Box sx={{
      bgcolor: "#fff",
      borderRadius: "16px",
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0'
    }}>
      <Box
        sx={{
          p: { xs: "12px", md: "16px" },
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: "space-between",
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Button
          variant="text"
          sx={{
            border: "1px solid #E6E6E6",
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'flex-start', sm: 'center' }
          }}
          startIcon={<ListChecklistIcon color="#666666" />}
          endIcon={<KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />}
        ></Button>
        <Box sx={{
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 1, sm: 2 }
        }}>
          <Button
            variant="text"
            sx={{
              border: "1px solid #E6E6E6",
              color: "#666666",
              fontSize: { xs: '14px', sm: '16px' },
              px: { xs: 2, sm: 3 }
            }}
            startIcon={<FilterIcon color="#666666" size={18} />}
            endIcon={<KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />}
          >
            All
          </Button>
          <Button
            sx={{
              fontSize: { xs: '14px', sm: '16px' },
              px: { xs: 2, sm: 3 }
            }}
          >
            Export as CSV
          </Button>
        </Box>
      </Box>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: { xs: 600, md: 'auto' } }}>
            <TableHead sx={{ bgcolor: "#F7F7F8" }}>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#000000",
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  S.No
                </TableCell>
                <TableCell
                  sx={{
                    color: "#000000",
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  Lessons
                </TableCell>
                <TableCell
                  sx={{
                    color: "#000000",
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  Yet to Start
                </TableCell>
                <TableCell
                  sx={{
                    color: "#000000",
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  In Progress
                </TableCell>
                <TableCell
                  sx={{
                    color: "#000000",
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  Completed
                </TableCell>
                <TableCell
                  sx={{
                    color: "#000000",
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  Time Spent
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{
              minHeight: { xs: "200px", md: "300px" }
            }}>
              {lessonReportData.length > 0 ? lessonReportData.map((lesson, index) => (
                <TableRow key={lesson.id}>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {lesson.lessonName}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {lesson.yetToStart}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {lesson.inProgress}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {lesson.completed}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {lesson.timeSpent}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{
                      textAlign: 'center',
                      py: 4,
                      color: '#666666',
                      fontSize: { xs: '14px', md: '16px' }
                    }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default LessonSection;


