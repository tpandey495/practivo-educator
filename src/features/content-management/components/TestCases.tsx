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
            Add multiple input and output combinations to validate the solution.
          </Typography>
        </Box>

        <Button
          startIcon={<AddIcon />}
          onClick={() => append({ input: "", output: "" })}
          variant="contained"
        >
          Add
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
                rules={{ required: "Input is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Input"
                    multiline
                    rows={3}
                    fullWidth
                    error={!!errors?.testCases?.[index]?.input}
                    helperText={
                      errors?.testCases?.[index]?.input?.message ||
                      "Provide test input"
                    }
                    onChange={(e) => {
                      clearErrors(`testCases.${index}.input`);
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

            {/* Output */}
            <Grid item xs={12} md={5}>
              <Controller
                control={control}
                name={`testCases.${index}.output`}
                rules={{ required: "Output is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Output"
                    multiline
                    rows={3}
                    fullWidth
                    error={!!errors?.testCases?.[index]?.output}
                    helperText={
                      errors?.testCases?.[index]?.output?.message ||
                      "Expected output"
                    }
                    onChange={(e) => {
                      clearErrors(`testCases.${index}.output`);
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
              md={2}
              display="flex"
              justifyContent="center"
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
