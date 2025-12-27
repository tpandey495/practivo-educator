import {
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "./ContentFields.types";

const PROGRAMMING_LANGUAGES = [
  { id: 1, name: "JavaScript", value: "javascript" },
  { id: 2, name: "Python", value: "python" },
  { id: 3, name: "Java", value: "java" },
];

export default function CodeTemplate(props: ContentFieldsProps) {
  const { control, errors, clearErrors, watch } = props;

  const watchedLanguages = watch("allowedLanguage") || [];

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
          Provide starter code templates for different programming languages that will be shown to students when they begin solving.
        </Typography>
      </Box>

      {/* Allowed Languages */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#344054",
            mb: 1,
          }}
        >
          Allowed Languages <span style={{ color: "#D92D20" }}>*</span>
        </Typography>
        <Controller
          control={control}
          name="allowedLanguage"
          rules={{
            required: "At least one language must be selected",
            validate: (value) => value?.length > 0 || "At least one language must be selected",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              SelectProps={{
                multiple: true,
                renderValue: (selected: number[]) =>
                  selected
                    ?.map((id) => PROGRAMMING_LANGUAGES.find((lang) => lang.id === id)?.name)
                    .filter(Boolean)
                    .join(", ") || "",
              }}
              fullWidth
              variant="outlined"
              error={!!errors.allowedLanguage}
              helperText={errors.allowedLanguage?.message || "Select languages that students can use"}
              onChange={(e) => {
                clearErrors("allowedLanguage");
                field.onChange(e.target.value);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                },
              }}
            >
              {PROGRAMMING_LANGUAGES.map((lang) => (
                <MenuItem key={lang.id} value={lang.id}>
                  {lang.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      {/* Language-specific Templates */}
      <Box>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#344054",
            mb: 2,
          }}
        >
          Code Templates by Language <span style={{ color: "#D92D20" }}>*</span>
        </Typography>

        {watchedLanguages.map((langId: number) => {
          const language = PROGRAMMING_LANGUAGES.find((l) => l.id === langId);
          if (!language) return null;

          return (
            <Box key={langId} sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#344054",
                  mb: 1,
                }}
              >
                {language.name} Template
              </Typography>
              <Controller
                control={control}
                name={`codeTemplate.template.${language.value}`}
                rules={{ required: `${language.name} template is required` }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={8}
                    fullWidth
                    variant="outlined"
                    placeholder={`Enter ${language.name} code template...`}
                    error={!!errors.codeTemplate?.template?.[language.value]}
                    helperText={
                      errors.codeTemplate?.template?.[language.value]?.message ||
                      `This template will be pre-filled for ${language.name}`
                    }
                    onChange={(e) => {
                      clearErrors(`codeTemplate.template.${language.value}`);
                      field.onChange(e.target.value);
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        fontFamily: "monospace",
                        "& fieldset": {
                          borderColor: errors.codeTemplate?.template?.[language.value]
                            ? "#D92D20"
                            : "#D0D5DD",
                        },
                        "&:hover fieldset": {
                          borderColor: errors.codeTemplate?.template?.[language.value]
                            ? "#D92D20"
                            : "#98A2B3",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: errors.codeTemplate?.template?.[language.value]
                            ? "#D92D20"
                            : "#4F39F6",
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
        })}
      </Box>
    </Box>
  );
}
