import { Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "./ContentFields.types";

export default function Problem(props: ContentFieldsProps) {
  const { control, errors, clearErrors } = props;

  return (
    <Box>
      {/* Heading */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#101828",
            mb: 0.5,
          }}
        >
          Problem Details
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#667085",
            mb: 2,
          }}
        >
          Define the problem title and scoring criteria.
        </Typography>
      </Box>

      {/* Title */}
      <Controller
        control={control}
        name="title"
        rules={{
          required: "Problem title is required",
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title?.message}
            onChange={(e) => {
              clearErrors("title");
              field.onChange(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: errors.title ? "#D92D20" : "#D0D5DD",
                },
                "&:hover fieldset": {
                  borderColor: errors.title ? "#D92D20" : "#98A2B3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.title ? "#D92D20" : "#4F39F6",
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

      {/* Score */}
      <Controller
        control={control}
        name="score"
        rules={{
          required: "Score is required",
          min: { value: 1, message: "Score must be at least 1" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Score"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.score}
            helperText={
              errors.score?.message ||
              "Total points awarded for solving this problem"
            }
            onChange={(e) => {
              clearErrors("score");
              field.onChange(Number(e.target.value));
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: errors.score ? "#D92D20" : "#D0D5DD",
                },
                "&:hover fieldset": {
                  borderColor: errors.score ? "#D92D20" : "#98A2B3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.score ? "#D92D20" : "#4F39F6",
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
