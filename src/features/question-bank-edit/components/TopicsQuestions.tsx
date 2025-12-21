import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CollapseRightIcon from "@icons/CollapseRightIcon";
import FileEditIcon from "@icons/FileEditIcon";
import AddQuestionForm from "./AddQuestionForm";

const TopicsQuestions = ({
  selectedId,
  setSwitchView,
  formType,
  setFormType
}: {
  formType: "multiple_choice" | "single_choice" | "fill_up" | null;
  setFormType: (type: "multiple_choice" | "single_choice" | "fill_up" | null) => void;
  selectedId: number;
  setSwitchView?: (view: string) => void;
}) => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "16px",
          p: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "24px",
        }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: "600", fontSize: "16px", color: "#000" }}
          >
            Bank Name
          </Typography>
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: "16px",
              color: "#000",
              mt: "6px",
            }}
          >
            2 Question
          </Typography>
        </Box>
        <Box sx={{ height: "fit-content" }}>
          <Button
            variant="outlined"
            sx={{ p: "16px 24px", height: "fit-content" }}
            startIcon={<CollapseRightIcon />}
          >
            Collapse All
          </Button>
          <Button
            sx={{ ml: "16px", p: "16px 24px", height: "fit-content" }}
            onClick={() => setSwitchView && setSwitchView("question-edit")}
          >
            Edit Questions
          </Button>
        </Box>
      </Box>
      {formType && (
        <AddQuestionForm
          type={formType}
          questionBankId={selectedId}
          onClose={() => setFormType(null)}
        />
      )}
    </>
  );
};

export default TopicsQuestions;
const items = [
  "Enclose the answer of your fill - in - the - blank questions within square bucket ([])",
  "You can give miltiple answers for a single blank by separation them with a comma (,) inside square brackets.",
  "The words within the brackets will appear as black spaces for the learners.",
];
export const QuestionEditMain = () => {
  return (
    <Box>
      <Box
        sx={{
          padding: "16px",
          borderRadius: "16px",
          bgcolor: "#fff",
          border: "1px solid #E6E6E6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Typography
            sx={{ color: "#4F39F6", fontSize: "24px", fontWeight: "600" }}
          >
            02
          </Typography>
          <Divider orientation="vertical" color="#cccccc" flexItem />
          <Typography
            sx={{ color: "#000000", fontSize: "18px", fontWeight: "600" }}
          >
            Question 1 is [()], [()]
          </Typography>
        </Box>
        <FileEditIcon />
      </Box>
      <Box
        sx={{
          borderRadius: "16px",
          bgcolor: "#F9FAFA",
          border: "1px solid #E6E6E6",
          mt: "16px",
        }}
      >
        <Box
          sx={{
            padding: "16px",
            border: "1px solid #D9D9D9",
            bgcolor: "#fff",
            width: "fit-content",
            borderRadius: "16px",
          }}
        >
          Answer 1
        </Box>
      </Box>
      <Box
        sx={{
          padding: "16px",
          border: "1px solid #759FFF",
          bgcolor: "#F5F8FF",
          borderRadius: "16px",
          mt: "16px",
        }}
      >
        <List sx={{ p: 0 }}>
          {items.map((item, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "flex-start", p: 0 }}
            >
              <span
                style={{ marginRight: 8, fontSize: "1.2rem", lineHeight: 1.5 }}
              >
                •
              </span>
              <ListItemText primary={item} sx={{ color: "#000" }} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          mt: "46px",
        }}
      >
        <Typography
          sx={{ fontSize: "18px", fontWeight: "600", color: "#000000" }}
        >
          Optional Settings
        </Typography>
        {/* <Box sx={{ display: "flex", flexDirection: "column", gap: "24px", mt: `16px` }}>
          <SettingsTab
            title="Custom Feedback"
            subTitle="Provide a feedback to the learner on answering this questions"
            icon={<MessageIcon />}
            iconBgColor="#ECFDF8"
          >
            Custom Feedback
          </SettingsTab>
          <SettingsTab
            title="Question Time Limit"
            subTitle="Set a countdown timer for this question"
            icon={<TimerIcon color="#E47934" size="25" />}
            iconBgColor="#FEECE1"
          >
            Question Time Limit
          </SettingsTab>
          <SettingsTab
            title="Question Score"
            subTitle="Set a score for this question"
            icon={<ClipboardIcon />}
            iconBgColor="#EBF0FF"
          >
            Question Score
          </SettingsTab>
        </Box> */}
      </Box>
    </Box>
  );
};
