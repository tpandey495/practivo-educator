import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useFieldArray } from "react-hook-form";
import { ContentFieldsProps } from "../types/ContentFields.types";

export default function TestCases(props: ContentFieldsProps) {
  const { control, errors, clearErrors } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testCases",
  });

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#101828",
              mb: 0.5,
            }}
          >
            Test Cases
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#667085",
            }}
          >
            Add multiple input and output combinations to validate the solution. Input should be provided as a string (line breaks will be preserved as \n).
          </Typography>
        </Box>

        <Button
          startIcon={<AddIcon />}
          onClick={() =>
            append({
              input: "",
              expectedOutput: "",
              sampleTestCase: false,
            })
          }
          variant="contained"
        >
          Add Test Case
        </Button>
      </Box>

      {/* Test Case List */}
      {fields.map((field, index) => (
        <Paper key={field.id} sx={{ p: 2, mb: 2, borderRadius: "8px" }}>
          <Grid container spacing={2}>
            {/* Input */}
            <Grid item xs={12} md={5}>
              <Controller
                control={control}
                name={`testCases.${index}.input`}
                rules={{
                  required: "Input is required",
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Input"
                      multiline
                      rows={6}
                      fullWidth
                      placeholder="e.g., hello world"
                      error={!!errors?.testCases?.[index]?.input}
                      helperText={
                        errors?.testCases?.[index]?.input?.message ||
                        "Input string for the program (new lines supported)"
                      }
                      onChange={(e) => {
                        clearErrors(`testCases.${index}.input`);
                        field.onChange(e.target.value);
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#FFFFFF",
                          borderRadius: "8px",
                          fontFamily: "'Fira Code', 'Roboto Mono', monospace",
                          "& fieldset": {
                            borderColor: errors?.testCases?.[index]?.input ? "#D92D20" : "#D0D5DD",
                          },
                          "&:hover fieldset": {
                            borderColor: errors?.testCases?.[index]?.input ? "#D92D20" : "#98A2B3",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: errors?.testCases?.[index]?.input ? "#D92D20" : "#4F39F6",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "13px",
                          lineHeight: 1.6,
                        },
                      }}
                    />
                  );
                }}
              />
            </Grid>

            {/* Expected Output */}
            <Grid item xs={12} md={5}>
              <Controller
                control={control}
                name={`testCases.${index}.expectedOutput`}
                rules={{ required: "Expected output is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expected Output"
                    multiline
                    rows={6}
                    fullWidth
                    placeholder="Expected result"
                    error={!!errors?.testCases?.[index]?.expectedOutput}
                    helperText={
                      errors?.testCases?.[index]?.expectedOutput?.message ||
                      "Expected output for this test case (new lines supported)"
                    }
                    onChange={(e) => {
                      clearErrors(`testCases.${index}.expectedOutput`);
                      field.onChange(e.target.value);
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        fontFamily: "'Fira Code', 'Roboto Mono', monospace",
                        "& fieldset": {
                          borderColor: errors?.testCases?.[index]?.expectedOutput ? "#D92D20" : "#D0D5DD",
                        },
                        "&:hover fieldset": {
                          borderColor: errors?.testCases?.[index]?.expectedOutput ? "#D92D20" : "#98A2B3",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: errors?.testCases?.[index]?.expectedOutput ? "#D92D20" : "#4F39F6",
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "13px",
                        lineHeight: 1.6,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* Sample Test Case */}
            <Grid item xs={12}>
              <Controller
                control={control}
                name={`testCases.${index}.sampleTestCase`}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          color: "#D0D5DD",
                          "&.Mui-checked": {
                            color: "#4F39F6",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "14px", color: "#344054" }}>
                        Is this a sample test case?
                      </Typography>
                    }
                  />
                )}
              />
            </Grid>

            {/* Delete */}
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <IconButton
                color="error"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}
