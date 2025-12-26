import { Box, Typography, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "./ContentFields.types";

export default function CodeTemplate(props: ContentFieldsProps) {
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
          Code Template
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#667085",
            mb: 2,
          }}
        >
          Provide starter code that will be shown to students when they begin solving.
        </Typography>
      </Box>

      {/* Code Template Field */}
      <Controller
        control={control}
        name="codeTemplate"
        rules={{
          required: "Code template is required",
          minLength: {
            value: 5,
            message: "Code template cannot be empty",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            rows={6}
            fullWidth
            placeholder={`<html>
  <body>
  </body>
</html>`}
            variant="outlined"
            error={!!errors.codeTemplate}
            helperText={
              errors.codeTemplate?.message ||
              "This code will be pre-filled in the editor for students"
            }
            onChange={(e) => {
              clearErrors("codeTemplate");
              field.onChange(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                fontFamily: "monospace",
                "& fieldset": {
                  borderColor: errors.codeTemplate ? "#D92D20" : "#D0D5DD",
                },
                "&:hover fieldset": {
                  borderColor: errors.codeTemplate ? "#D92D20" : "#98A2B3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.codeTemplate ? "#D92D20" : "#4F39F6",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputBase-input": {
                fontSize: "13px",
                lineHeight: 1.6,
                padding: "12px 14px",
              },
            }}
          />
        )}
      />
    </Box>
  );
}
