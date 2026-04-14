import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import AddNewQuestionCard from "./AddNewQuestionCard";
import QuestionCard from "./QuestionCard";
import { useGetQuestionBanksQuery } from "../api/questionBankApi";
import { QuestionBank as QuestionBankType } from '../types';

interface IQuestionBank {
  id: number;
  name: string;
  description: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  orgCode: string;
  createdBy: string;
  _count: {
    questions: number;
  };
}

export default function QuestionBank() {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("Add Question Bank");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [page] = useState(1);
  const [limit] = useState(10);

  // upcoming features flag
  const isUpcommimg = true;

  // Fetch question banks from API
  const { data: questionBanksResponse, isLoading, error } = useGetQuestionBanksQuery({ page, limit });

  const questionBanks: IQuestionBank[] = questionBanksResponse?.data || [];

  // Generate colors for tags
  const getTagColors = (index: number) => {
    const colors = [
      { color: "#702DFF", bgColor: "#702DFF34" },
      { color: "#FF6B35", bgColor: "#FF6B3534" },
      { color: "#4CAF50", bgColor: "#4CAF5034" },
      { color: "#2196F3", bgColor: "#2196F334" },
      { color: "#FF9800", bgColor: "#FF980034" },
    ];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <Box sx={{ padding: "24px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "24px" }}>
        <PageToolbarLayout title="Question Bank">
          {isUpcommimg ? (
            // <Typography color="primary" variant="h6" textAlign="center">
            //   Upcoming feature: Add Question Bank. Stay tuned!
            // </Typography>
            <Box
              sx={{
                height: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  px: 4,
                  py: 6,
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #F5F3FF 0%, #FFFFFF 100%)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  border: "1px solid #eee",
                  maxWidth: "500px",
                  width: "100%",
                }}
              >
                {/* Badge */}
                <Box
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: "4px",
                    borderRadius: "999px",
                    background: "#EEF2FF",
                    color: "#4F39F6",
                    fontSize: "12px",
                    fontWeight: 600,
                    mb: 2,
                    letterSpacing: "0.5px",
                  }}
                >
                  COMING SOON
                </Box>

                {/* Title */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#111827",
                    mb: 1,
                  }}
                >
                  Question Bank
                </Typography>

                {/* Subtitle */}
                <Typography
                  sx={{
                    color: "#6B7280",
                    fontSize: "15px",
                    mb: 3,
                  }}
                >
                  We're building something powerful for managing and organizing your questions.
                  Stay tuned — it's almost ready.
                </Typography>

                {/* Decorative Line */}
                <Box
                  sx={{
                    width: "60px",
                    height: "4px",
                    background: "linear-gradient(90deg, #4F39F6, #7C3AED)",
                    borderRadius: "10px",
                    mx: "auto",
                  }}
                />
              </Box>
            </Box>
          ) : (
            <Typography color="error" variant="h6" textAlign="center">
              Error loading question banks. Please try again later.
            </Typography>
          )}
        </PageToolbarLayout>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout title="Question Bank">

        {isUpcommimg ? (
          // <Typography color="primary" variant="h6" textAlign="center" mb={2}>
          //   Upcoming feature: Add Question Bank. Stay tuned!
          // </Typography>
          <Box
            sx={{
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                px: 4,
                py: 6,
                borderRadius: "20px",
                background: "linear-gradient(135deg, #F5F3FF 0%, #FFFFFF 100%)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                border: "1px solid #eee",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              {/* Badge */}
              <Box
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: "4px",
                  borderRadius: "999px",
                  background: "#EEF2FF",
                  color: "#4F39F6",
                  fontSize: "12px",
                  fontWeight: 600,
                  mb: 2,
                  letterSpacing: "0.5px",
                }}
              >
                COMING SOON
              </Box>

              {/* Title */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#111827",
                  mb: 1,
                }}
              >
                Question Bank
              </Typography>

              {/* Subtitle */}
              <Typography
                sx={{
                  color: "#6B7280",
                  fontSize: "15px",
                  mb: 3,
                }}
              >
                We're building something powerful for managing and organizing your questions.
                Stay tuned — it's almost ready.
              </Typography>

              {/* Decorative Line */}
              <Box
                sx={{
                  width: "60px",
                  height: "4px",
                  background: "linear-gradient(90deg, #4F39F6, #7C3AED)",
                  borderRadius: "10px",
                  mx: "auto",
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <AddNewQuestionCard
              image={image}
              setImage={setImage}
              title={title}
              setTitle={setTitle}
              tags={tags}
              setTags={setTags}
              tagInput={tagInput}
              setTagInput={setTagInput} />
            {questionBanks.map((questionBank, index) => {
              const tagColors = getTagColors(index);
              return (
                <QuestionCard
                  key={questionBank.id}
                  id={questionBank.id}
                  thumbnailSrc="" // No thumbnail from API
                  tags={questionBank.tags}
                  title={questionBank.name}
                  description={questionBank.description}
                  name={questionBank.createdBy}
                  rating={questionBank._count.questions} // Using question count as rating
                  backgroundColor={tagColors.bgColor}
                  totalQuestions={questionBank._count.questions}
                  color={tagColors.color} />
              );
            })}
          </Box>)}
      </PageToolbarLayout>
    </Box>
  );
}
