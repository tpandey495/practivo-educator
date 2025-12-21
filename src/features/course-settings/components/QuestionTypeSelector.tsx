import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
    RadioButtonChecked as RadioIcon,
    CheckBox as CheckBoxIcon,
    ShortText as ShortTextIcon
} from '@mui/icons-material';

type QuestionType = 'multiple_choice' | 'single_choice' | 'fill_up';

interface QuestionTypeSelectorProps {
    onSelect: (type: QuestionType) => void;
}

export const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = ({ onSelect }) => {
    const types = [
        {
            type: 'multiple_choice' as QuestionType,
            icon: <CheckBoxIcon sx={{ fontSize: 48, color: '#7e22ce' }} />,
            title: 'Multiple Choice',
            description: 'Allow students to select multiple correct answers'
        },
        {
            type: 'single_choice' as QuestionType,
            icon: <RadioIcon sx={{ fontSize: 48, color: '#7e22ce' }} />,
            title: 'Single Choice',
            description: 'Students can select only one correct answer'
        },
        {
            type: 'fill_up' as QuestionType,
            icon: <ShortTextIcon sx={{ fontSize: 48, color: '#7e22ce' }} />,
            title: 'Fill in the Blank',
            description: 'Students type in their answer'
        }
    ];

    return (
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <Typography variant="h6" gutterBottom align="center">
                Select Question Type
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                {types.map((item) => (
                    <Paper
                        key={item.type}
                        elevation={0}
                        onClick={() => onSelect(item.type)}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            cursor: "pointer",
                            border: "1px solid #e0e0e0",
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            transition: "all 0.2s",
                            "&:hover": {
                                borderColor: "#7e22ce",
                                bgcolor: "#faf5ff",
                                transform: "translateY(-2px)"
                            }
                        }}
                    >
                        {item.icon}
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                {item.title}
                            </Typography>
                            <Typography color="text.secondary">
                                {item.description}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};
