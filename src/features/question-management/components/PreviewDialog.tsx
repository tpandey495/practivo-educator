import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MCQTemplate from "../../../components/ui/question-template/mcqTemplate";
import CodingQuestion from "../../../components/ui/question-template/codingQuestion";

interface PreviewDialogProps {
  open: boolean;
  onClose: () => void;
  questions: any[];
}

export const PreviewDialog: React.FC<PreviewDialogProps> = ({ open, onClose, questions }) => {

  console.log(questions);

  if (!questions || questions.length === 0) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Preview Questions
          <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>No questions available to preview.</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { minHeight: '60vh', maxHeight: '90vh', borderRadius: 4 } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">Question Preview</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {questions.map((currentQuestion, index) => {
          const typeId = currentQuestion?.queTypeId || currentQuestion?.questiontypecon?.id;
          const mappedType = typeId === 7 ? "code" : (typeId === 1 || typeId === 2 ? "mcq" : "mcq");

          return (
            <Box key={currentQuestion.id || index} sx={{ flex: 1 }}>
              {mappedType === "code" ? (
                <CodingQuestion
                  title={currentQuestion?.title || "Coding Challenge"}
                  difficulty={currentQuestion?.difficulty || "Medium"}
                  description={typeof currentQuestion?.description === 'string' ? currentQuestion.description : ""}
                  points={currentQuestion?.score || 10}
                />
              ) : (() => {
                const opts = currentQuestion?.mcq?.options || currentQuestion?.options || [];
                const correctOpt = opts.find((o: any) => o.isCorrect);
                return (
                  <MCQTemplate
                    questionNumber={index + 1}
                    questionTitle={currentQuestion?.title || currentQuestion?.content?.question || "Question"}
                    questionDescription={typeof currentQuestion?.description === 'string' ? currentQuestion.description : undefined}
                    options={opts.map((opt: any) => ({ id: String(opt.id), text: opt.text }))}
                    score={currentQuestion?.score || 10}
                    correctOptionId={correctOpt ? String(correctOpt.id) : undefined}
                    isSubmitted={true}
                  />
                );
              })()}
            </Box>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
