import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ContentFieldsProps } from "../../../types/ContentFields.types";

export default function BlogFields(props: ContentFieldsProps) {
    const { control, errors, clearErrors } = props;
    const [tagInput, setTagInput] = useState("");

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
                    Blog Tags
                </Typography>
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: "#667085",
                        mb: 2,
                    }}
                >
                    Add relevant tags to help categorize and organize your blog content. Press Enter to add each tag.
                </Typography>
            </Box>

            <Controller
                name="blogTags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <Box>
                        <TextField
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && tagInput.trim()) {
                                    const trimmedTag = tagInput.trim();
                                    if (!field.value || !field.value.includes(trimmedTag)) {
                                        const next = Array.from(new Set([...(field.value || []), trimmedTag]));
                                        field.onChange(next);
                                        setTagInput("");
                                    } else {
                                        setTagInput("");
                                    }
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Type a tag and press Enter to add"
                            fullWidth
                            variant="outlined"
                            helperText="Press Enter to add a tag. Tags help with content organization and searchability."
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: "8px",
                                    "& fieldset": {
                                        borderColor: "#D0D5DD",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#98A2B3",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#4F39F6",
                                        borderWidth: "2px",
                                    },
                                },
                                "& .MuiInputBase-input": {
                                    fontSize: "14px",
                                    padding: "10px 14px",
                                },
                            }}
                        />

                        {(field.value || []).length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography
                                    sx={{
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        color: "#667085",
                                        mb: 1.5,
                                    }}
                                >
                                    Added Tags ({(field.value || []).length})
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        flexWrap: 'wrap',
                                        gap: 1,
                                    }}
                                >
                                    {(field.value || []).map((t: string) => (
                                        <Chip
                                            key={t}
                                            label={t}
                                            onDelete={() => {
                                                field.onChange((field.value || []).filter((x: string) => x !== t));
                                            }}
                                            deleteIcon={
                                                <CloseIcon
                                                    sx={{
                                                        fontSize: "18px",
                                                        color: "#667085",
                                                        "&:hover": {
                                                            color: "#D92D20",
                                                        },
                                                    }}
                                                />
                                            }
                                            sx={{
                                                height: "32px",
                                                backgroundColor: "#F2F4F7",
                                                color: "#344054",
                                                fontWeight: 500,
                                                fontSize: "13px",
                                                borderRadius: "6px",
                                                "& .MuiChip-label": {
                                                    padding: "0 8px",
                                                },
                                                "&:hover": {
                                                    backgroundColor: "#EAECF0",
                                                },
                                                "& .MuiChip-deleteIcon": {
                                                    marginLeft: "4px",
                                                    marginRight: "4px",
                                                },
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Box>
                )}
            />
        </Box>
    );
}


