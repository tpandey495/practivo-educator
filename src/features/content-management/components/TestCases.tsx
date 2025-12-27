import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useFieldArray } from "react-hook-form";
import { ContentFieldsProps } from "./ContentFields.types";

export default function TestCases(props: ContentFieldsProps) {
  const { control, errors, clearErrors, watch } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testCases",
  });

  const getDefaultInput = () => {
    return {};
  };

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
            Add multiple input and output combinations to validate the solution. Input should be a JSON object matching function parameters.
          </Typography>
        </Box>

        <Button
          startIcon={<AddIcon />}
          onClick={() =>
            append({
              input: getDefaultInput(),
              expectedOutput: "",
              description: "",
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
            {/* Input (as JSON object) */}
            <Grid item xs={12} md={5}>
              <Controller
                control={control}
                name={`testCases.${index}.input`}
                rules={{
                  required: "Input is required",
                  validate: (value) => {
                    if (typeof value === "string") {
                      try {
                        JSON.parse(value);
                        return true;
                      } catch {
                        return "Input must be valid JSON";
                      }
                    }
                    return true;
                  },
                }}
                render={({ field }) => {
                  const displayValue =
                    typeof field.value === "object"
                      ? JSON.stringify(field.value, null, 2)
                      : field.value || "";
                  return (
                    <TextField
                      {...field}
                      value={displayValue}
                      label="Input (JSON)"
                      multiline
                      rows={4}
                      fullWidth
                      placeholder='{"str": "hello"}'
                      error={!!errors?.testCases?.[index]?.input}
                      helperText={
                        errors?.testCases?.[index]?.input?.message ||
                        "JSON object with parameter names as keys"
                      }
                      onChange={(e) => {
                        clearErrors(`testCases.${index}.input`);
                        try {
                          const parsed = JSON.parse(e.target.value);
                          field.onChange(parsed);
                        } catch {
                          field.onChange(e.target.value);
                        }
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#FFFFFF",
                          borderRadius: "8px",
                          fontFamily: "monospace",
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
                    rows={4}
                    fullWidth
                    placeholder="Expected result"
                    error={!!errors?.testCases?.[index]?.expectedOutput}
                    helperText={
                      errors?.testCases?.[index]?.expectedOutput?.message ||
                      "Expected output for this test case"
                    }
                    onChange={(e) => {
                      clearErrors(`testCases.${index}.expectedOutput`);
                      field.onChange(e.target.value);
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Controller
                control={control}
                name={`testCases.${index}.description`}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description (Optional)"
                    fullWidth
                    placeholder="e.g., Basic string reversal"
                    error={!!errors?.testCases?.[index]?.description}
                    helperText={
                      errors?.testCases?.[index]?.description?.message ||
                      "Brief description of what this test case validates"
                    }
                    onChange={(e) => {
                      clearErrors(`testCases.${index}.description`);
                      field.onChange(e.target.value);
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                      },
                    }}
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
