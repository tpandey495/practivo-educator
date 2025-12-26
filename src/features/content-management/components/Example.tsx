import { Box, Typography, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "./ContentFields.types";

export default function Example(props: ContentFieldsProps) {
  const { control, errors, clearErrors } = props;

  return (
    <Box>
      {/* Heading */}
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
          Description / Example
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#667085",
            mb: 2,
          }}
        >
          Provide a clear problem description or an example to help students understand the question.
        </Typography>
      </Box>

      {/* Description Field */}
      <Controller
        control={control}
        name="description"
        rules={{
          required: "Description is required",
          minLength: {
            value: 10,
            message: "Description must be at least 10 characters",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            rows={6}
            fullWidth
            placeholder="Write problem description or example..."
            variant="outlined"
            error={!!errors.description}
            helperText={
              errors.description?.message ||
              "This description will be visible to students"
            }
            onChange={(e) => {
              clearErrors("description");
              field.onChange(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: errors.description ? "#D92D20" : "#D0D5DD",
                },
                "&:hover fieldset": {
                  borderColor: errors.description ? "#D92D20" : "#98A2B3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.description ? "#D92D20" : "#4F39F6",
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
