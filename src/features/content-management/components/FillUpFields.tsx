import { TextField, Typography, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "./ContentFields.types";

export default function FillUpFields(props: ContentFieldsProps) {
    const { control, errors, clearErrors } = props;

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#101828",
                        mb: 0.5,
                    }}
                >
                    Correct Answer
                </Typography>
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: "#667085",
                        mb: 2,
                    }}
                >
                    Enter the correct answer that students should provide to fill in the blank.
                </Typography>
            </Box>

            <Controller
                control={control}
                name="correctAnswer"
                rules={{
                    required: "Correct answer is required",
                    minLength: { value: 1, message: "Answer cannot be empty" }
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        placeholder="Enter the correct answer"
                        fullWidth
                        variant="outlined"
                        error={!!errors.correctAnswer}
                        helperText={errors.correctAnswer?.message || "This answer will be used to evaluate student responses"}
                        onChange={(e) => {
                            clearErrors("correctAnswer");
                            field.onChange(e.target.value);
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#FFFFFF",
                                borderRadius: "8px",
                                "& fieldset": {
                                    borderColor: errors.correctAnswer ? "#D92D20" : "#D0D5DD",
                                },
                                "&:hover fieldset": {
                                    borderColor: errors.correctAnswer ? "#D92D20" : "#98A2B3",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: errors.correctAnswer ? "#D92D20" : "#4F39F6",
                                    borderWidth: "2px",
                                },
                            },
                            "& .MuiInputBase-input": {
                                fontSize: "14px",
                                padding: "10px 14px",
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
}


