import { Box, Typography } from "@mui/material";
import ToolBar from "../../course-settings/components/index";
import MoreButton from "../../../components/ui/MoreButton";
import PublishButton from "../../../components/ui/PublishButton";
import CreateContentLayout from "../../content-management/layout/CreateContentLayout";
import Topics from "./Topics";
import TopicsQuestions from "./TopicsQuestions";
import { useState } from "react";
import QuestionEdit from "./QuestionEdit";
import { useGetAllQuestionsQuery, useGetQuestionBankByIdQuery, useGetQuestionBankQuestionsQuery } from "../../question-bank/api/questionBankApi";
import Loader from "@components/ui/Spinner";
import { useParams } from "react-router-dom";
import { Question, Topic } from '../types';

export interface AnswerOption {
  optionId: number;
  option: string;
}

export default function QuestionBankEdit() {
  const { questionBankId } = useParams<{ questionBankId: string }>();

  // Use specific endpoint for question bank questions, fallback to all questions for create mode
  const { data, isFetching, isError } = questionBankId 
    ? useGetQuestionBankQuestionsQuery({ id: Number(questionBankId), page: 1, limit: 100 })
    : useGetAllQuestionsQuery({ page: 1, limit: 100 });

  const [selectedId, setSelectedId] = useState(data?.data[0]?.id);
  const [switchView, setSwitchView] = useState("topic-edit");
  const [formType, setFormType] = useState<null | "multiple_choice" | "single_choice" | "fill_up">(null);
  const { data: questionBank } = useGetQuestionBankByIdQuery({ id: Number(questionBankId) });
  
  return switchView === "topic-edit" ? (
    <Box>
      <ToolBar previousPage="/question-bank" courseName={questionBank?.data?.name}>
        <RightSideTools />
      </ToolBar>
      <Box sx={{ display: "flex", height: "100vh", p: "24px" }}>
        {isFetching ? <Loader /> : isError ? <Box>Some Error occured...</Box> : data?.data && <CreateContentLayout
          heading="Questions"
          mainContent={<>
            <TopicsQuestions
              setFormType={setFormType}
              formType={formType}
              selectedId={questionBankId ? Number(questionBankId) : selectedId}
              setSwitchView={setSwitchView} />
          </>}
          sidebarContent={<Topics
            setFormType={setFormType}
            TopicsData={data?.data}
            selectedId={selectedId}
            setSelectedId={setSelectedId} />} />}
      </Box>
    </Box>
  ) : (
    <QuestionEdit
      QuestionData={(data?.data.find((t: any) => t.topicId === selectedId)?.question ??
        []) as any[]} />
  );
}

export const RightSideTools = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "48px",
      }}
    >
      <PublishButton />
      <MoreButton />
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography>2</Typography>
        <Typography>Lessons</Typography>
      </Box>
      <Typography sx={{ color: "#000000" }}>/</Typography>
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography>2</Typography>
        <Typography>Learners</Typography>
      </Box>
    </Box>
  );
};
