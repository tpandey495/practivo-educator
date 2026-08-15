import {
  Box,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "./ContentFields.types";
import { useGetCodeLanguagesQuery } from "../api/contentApi";

export default function CodeTemplate(props: ContentFieldsProps) {
  const { control, errors, clearErrors, watch } = props;

  // Fetch languages from API
  const {
    data: languagesData,
    isLoading: isLoadingLanguages,
    isError: isErrorLanguages,
    error: languagesError,
  } = useGetCodeLanguagesQuery();

  // Extract languages from API response (handle different response structures)
  const extractLanguages = (res: any): Array<{ id: number; name: string; value: string }> => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.languages)) return res.languages;
    if (res?.data && Array.isArray(res.data.languages)) return res.data.languages;
    return [];
  };

  const programmingLanguages = extractLanguages(languagesData);

  const watchedLanguages = Array.isArray(watch("allowedLanguage"))
    ? watch("allowedLanguage")
    : [];

  // Handle loading state
  if (isLoadingLanguages) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Handle error state
  if (isErrorLanguages) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load programming languages. Please try again.
          {languagesError && 'data' in languagesError && typeof languagesError.data === 'object' && languagesError.data !== null && 'message' in languagesError.data
            ? ` ${(languagesError.data as { message: string }).message}`
            : ''}
        </Alert>
      </Box>
    );
  }

  // Handle empty languages
  if (!programmingLanguages || programmingLanguages.length === 0) {
    return (
      <Box>
        <Alert severity="warning" sx={{ mb: 2 }}>
          No programming languages available. Please contact support.
        </Alert>
      </Box>
    );
  }

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
            validate: (value) =>
              (Array.isArray(value) && value.length > 0) || "At least one language must be selected",
          }}
          render={({ field }) => {
            const currentVal = Array.isArray(field.value) ? field.value : [];

            return (
              <TextField
                select
                value={currentVal}
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) => {
                    const selArray = Array.isArray(selected) ? (selected as number[]) : [];
                    return (
                      selArray
                        .map((id) => programmingLanguages.find((lang) => Number(lang.id) === Number(id))?.name)
                        .filter(Boolean)
                        .join(", ") || ""
                    );
                  },
                }}
                fullWidth
                variant="outlined"
                error={!!errors.allowedLanguage}
                helperText={errors.allowedLanguage?.message || "Select languages that students can use"}
                onChange={(e) => {
                  clearErrors("allowedLanguage");
                  const rawVal = e.target.value;
                  const numArr = Array.isArray(rawVal)
                    ? rawVal.map((v) => Number(v)).filter((v) => !isNaN(v))
                    : typeof rawVal === "string"
                    ? rawVal.split(",").map(Number).filter((v) => !isNaN(v))
                    : [];
                  field.onChange(numArr);
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                  },
                }}
              >
                {programmingLanguages.map((lang) => (
                  <MenuItem key={lang.id} value={lang.id}>
                    {lang.name}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
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
          const language = programmingLanguages.find((l) => Number(l.id) === Number(langId));
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
