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
          <Typography color="error" variant="h6" textAlign="center">
            Error loading question banks. Please try again later.
          </Typography>
        </PageToolbarLayout>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout title="Question Bank">
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
        </Box>
      </PageToolbarLayout>
    </Box>
  );
}
