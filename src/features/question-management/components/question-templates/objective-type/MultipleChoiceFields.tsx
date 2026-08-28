import { Box, Button, IconButton, TextField, Typography, Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "../types/ContentFields.types";

export default function MultipleChoiceFields(props: ContentFieldsProps) {
    const { control, errors, clearErrors, watch, fields, append, remove } = props;

    return (
        <Box>
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
                    Answer Options
                </Typography>
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: "#667085",
                        mb: 2,
                    }}
                >
                    Add multiple options and select all correct answers. At least one option must be marked as correct.
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {(fields || []).map((field: any, idx: number) => {
                    const isCorrect = watch(`options.${idx}.isCorrect`);
                    const hasError = !!errors?.options?.[idx]?.text || !!errors?.options?.[idx]?.isCorrect;

                    return (
                        <Box
                            key={field.id}
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 2,
                                p: 2.5,
                                backgroundColor: isCorrect ? "#F0F9FF" : "#FFFFFF",
                                border: hasError
                                    ? "2px solid #D92D20"
                                    : isCorrect
                                        ? "2px solid #4F39F6"
                                        : "1px solid #EAECF0",
                                borderRadius: "12px",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    borderColor: hasError ? "#D92D20" : isCorrect ? "#4330D9" : "#D0D5DD",
                                    boxShadow: "0px 2px 4px rgba(16, 24, 40, 0.08)",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: "40px", pt: 0.5 }}>
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        color: "#667085",
                                        minWidth: "24px",
                                    }}
                                >
                                    {String.fromCharCode(65 + idx)}
                                </Typography>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Controller
                                    control={control}
                                    name={`options.${idx}.text`}
                                    rules={{
                                        required: "Option text is required",
                                        minLength: { value: 1, message: "Option cannot be empty" },
                                        validate: {
                                            unique: (value: string) => {
                                                const options = watch('options');
                                                const duplicates = options.filter((opt: any, i: number) =>
                                                    opt.text === value && i !== idx
                                                );
                                                return duplicates.length === 0 || "Duplicate options are not allowed";
                                            }
                                        }
                                    }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            placeholder={`Enter option ${idx + 1} text`}
                                            fullWidth
                                            variant="outlined"
                                            error={!!errors?.options?.[idx]?.text}
                                            helperText={errors?.options?.[idx]?.text?.message}
                                            onChange={(e) => {
                                                clearErrors(`options.${idx}.text`);
                                                clearErrors(`options.${idx}.isCorrect`);
                                                field.onChange(e.target.value);
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    backgroundColor: "#FFFFFF",
                                                    borderRadius: "8px",
                                                    "& fieldset": {
                                                        borderColor: errors?.options?.[idx]?.text ? "#D92D20" : "#D0D5DD",
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: errors?.options?.[idx]?.text ? "#D92D20" : "#98A2B3",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: errors?.options?.[idx]?.text ? "#D92D20" : "#4F39F6",
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

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Controller
                                    control={control}
                                    name={`options.${idx}.isCorrect`}
                                    render={({ field }: any) => (
                                        <Tooltip title={field.value ? "Mark as incorrect" : "Mark as correct"}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={field.value}
                                                        onChange={(e) => {
                                                            clearErrors(`options.${idx}.isCorrect`);
                                                            field.onChange(e.target.checked);
                                                        }}
                                                        icon={<RadioButtonUncheckedIcon sx={{ color: "#98A2B3" }} />}
                                                        checkedIcon={<CheckCircleIcon sx={{ color: "#4F39F6" }} />}
                                                        sx={{
                                                            "&.Mui-checked": {
                                                                color: "#4F39F6",
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography
                                                        sx={{
                                                            fontSize: "13px",
                                                            fontWeight: 500,
                                                            color: field.value ? "#4F39F6" : "#667085",
                                                        }}
                                                    >
                                                        {field.value ? "Correct" : "Mark correct"}
                                                    </Typography>
                                                }
                                                sx={{ m: 0 }}
                                            />
                                        </Tooltip>
                                    )}
                                />

                                {(fields && fields.length > 2 && remove) && (
                                    <Tooltip title="Remove option">
                                        <IconButton
                                            size="small"
                                            onClick={() => remove(idx)}
                                            sx={{
                                                color: "#667085",
                                                "&:hover": {
                                                    backgroundColor: "#FEF3F2",
                                                    color: "#D92D20",
                                                },
                                            }}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Button
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={() => append && append({ text: "", isCorrect: false })}
                sx={{
                    mt: 2,
                    height: "40px",
                    borderRadius: "8px",
                    borderColor: "#D0D5DD",
                    color: "#344054",
                    fontWeight: 500,
                    fontSize: "14px",
                    textTransform: "none",
                    "&:hover": {
                        borderColor: "#4F39F6",
                        backgroundColor: "#F9FAFB",
                        color: "#4F39F6",
                    },
                }}
            >
                Add Another Option
            </Button>

            {errors?.options && typeof errors.options === "object" &&
                Object.values(errors.options).some((opt: any) => opt?.isCorrect) && (
                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: "13px",
                            color: "#D92D20",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                        }}
                    >
                        ⚠️ At least one option must be marked as correct
                    </Typography>
                )}
        </Box>
    );
}


