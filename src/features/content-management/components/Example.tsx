import { Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "../types/ContentFields.types";
import RichTextEditor from "../../../components/ui/RichTextEditor";

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
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: errors.description ? "2px solid #D92D20" : "1px solid #D0D5DD",
              "&:hover": {
                borderColor: errors.description ? "#D92D20" : "#98A2B3",
              },
              "&:focus-within": {
                borderColor: errors.description ? "#D92D20" : "#4F39F6",
                borderWidth: "2px",
              },
            }}
          >
            <RichTextEditor
              value={field.value || ""}
              onChange={(value) => {
                clearErrors("description");
                field.onChange(value);
              }}
              placeholder="Write problem description or example..."
            />
            {errors.description && (
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#D92D20",
                  mt: 1,
                  px: 2,
                  pb: 1,
                }}
              >
                {errors.description.message}
              </Typography>
            )}
          </Box>
        )}
      />
    </Box>
  );
}
