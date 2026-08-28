import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import RichTextEditor from "../../../../components/ui/RichTextEditor";
import { useCreateLessonMutation } from "../../api/chapterApi";
import { useSnackbar } from '../../../../components/ui';


interface AddLessonFormProps {
    chapterId: number;
    onClose: () => void;
    onLessonAdded?: () => void;
}

interface LessonFormData {
    title: string;
    content: string;
}

export const AddLessonForm: React.FC<AddLessonFormProps> = ({
    chapterId,
    onClose,
    onLessonAdded,
}) => {
    const { showSnackbar } = useSnackbar();
    const [createLesson, { isLoading }] = useCreateLessonMutation();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<LessonFormData>();

    const onSubmit: SubmitHandler<LessonFormData> = async (data) => {
        try {
            const response = await createLesson({
                body: {
                    title: data.title,
                    content: data.content,
                    chapterId: chapterId,
                }
            }).unwrap();
            showSnackbar({ message: response?.message || "Lesson created successfully", severity: "success" });
            reset();
            onClose();
            // Notify parent component that a lesson was added
            onLessonAdded?.();
        } catch (err: any) {
            const errorMessage =
                err?.data?.errors?.map((e: any) => e.message).join(", ") ||
                "Something went wrong!";
            showSnackbar({ message: errorMessage, severity: "error" });
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                mt: 2,
                p: 3,
                backgroundColor: "#f9f9f9",
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}
        >
            <TextField
                fullWidth
                label="Topic"
                placeholder="Enter the Name of Lesson"
                variant="outlined"
                {...register("title", {
                    required: "Title is required",
                    minLength: { value: 2, message: "Minimum 2 characters required" },
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
                InputLabelProps={{ shrink: true }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: "12px",
                    },
                }}
            />

            <Box>
                <Controller
                    name="content"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Content is required",
                        minLength: {
                            value: 10,
                            message: "Minimum 10 characters required",
                        },
                    }}
                    render={({ field }) => (
                        <RichTextEditor value={field.value} onChange={field.onChange} />
                    )}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 3,
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                    sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                >
                    {isLoading ? "Saving..." : "Save"}
                </Button>
            </Box>
        </Box>
    );
};
