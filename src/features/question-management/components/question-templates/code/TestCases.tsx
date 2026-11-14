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
  Alert,
} from "@mui/material";
import { useRef, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useFieldArray } from "react-hook-form";
import { ContentFieldsProps } from "../../../types/ContentFields.types";

type TestCaseRow = {
  input: string;
  expectedOutput: string;
  sampleTestCase: boolean;
};

// RFC 4180 CSV parser: supports quoted fields, escaped quotes ("") and
// newlines inside quoted fields (needed for multi-line input/output).
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, "");

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

const normalizeHeader = (h: string) => h.toLowerCase().replace(/[^a-z]/g, "");

function csvToTestCases(text: string): TestCaseRow[] {
  const rows = parseCsv(text);
  if (rows.length < 2) {
    throw new Error("CSV must contain a header row and at least one test case.");
  }

  const headers = rows[0].map(normalizeHeader);
  const inputIdx = headers.findIndex((h) => h === "input");
  const outputIdx = headers.findIndex((h) =>
    ["expectedoutput", "output", "expected"].includes(h)
  );
  const sampleIdx = headers.findIndex((h) =>
    ["sampletestcase", "sample", "issample"].includes(h)
  );

  if (inputIdx === -1 || outputIdx === -1) {
    throw new Error('CSV header must include "input" and "expectedOutput" columns.');
  }

  return rows.slice(1).map((r, i) => {
    const input = r[inputIdx] ?? "";
    const expectedOutput = r[outputIdx] ?? "";
    if (input.trim() === "" || expectedOutput.trim() === "") {
      throw new Error(`Row ${i + 2}: input and expectedOutput are required.`);
    }
    const sampleRaw = (sampleIdx !== -1 ? r[sampleIdx] ?? "" : "").trim().toLowerCase();
    return {
      input,
      expectedOutput,
      sampleTestCase: ["true", "yes", "1", "y"].includes(sampleRaw),
    };
  });
}

const CSV_TEMPLATE =
  'input,expectedOutput,sampleTestCase\n' +
  '"hello world","HELLO WORLD",true\n' +
  '"3\n1 2 3","6",false\n';

function downloadTemplate() {
  const blob = new Blob([CSV_TEMPLATE], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "test-cases-template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function TestCases(props: ContentFieldsProps) {
  const { control, errors, clearErrors } = props;

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "testCases",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvStatus, setCsvStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-uploading the same file
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setCsvStatus({ type: "error", message: "Please upload a .csv file." });
      return;
    }

    try {
      const imported = csvToTestCases(await file.text());
      const current = (fields as unknown as TestCaseRow[]) ?? [];
      const hasOnlyEmpty = current.every(
        (tc) => !tc.input?.trim() && !tc.expectedOutput?.trim()
      );

      if (hasOnlyEmpty) {
        replace(imported);
      } else {
        append(imported);
      }
      clearErrors("testCases");
      setCsvStatus({
        type: "success",
        message: `Imported ${imported.length} test case${imported.length === 1 ? "" : "s"} from ${file.name}.`,
      });
    } catch (err) {
      setCsvStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to parse CSV file.",
      });
    }
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
            Add multiple input and output combinations to validate the solution. Input should be provided as a string (line breaks will be preserved as \n).
          </Typography>
        </Box>

        <Box display="flex" gap={1} flexShrink={0} flexWrap="wrap" justifyContent="flex-end">
        <Button
          startIcon={<DownloadIcon />}
          onClick={downloadTemplate}
          variant="text"
        >
          CSV Template
        </Button>
        <Button
          startIcon={<UploadFileIcon />}
          onClick={() => fileInputRef.current?.click()}
          variant="outlined"
        >
          Upload CSV
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          hidden
          onChange={handleCsvUpload}
        />
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
      </Box>

      {csvStatus && (
        <Alert
          severity={csvStatus.type}
          onClose={() => setCsvStatus(null)}
          sx={{ mb: 2 }}
        >
          {csvStatus.message}
        </Alert>
      )}

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
