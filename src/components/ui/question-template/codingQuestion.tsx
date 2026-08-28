'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, Chip, IconButton, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

// ─── Types ─────────────────────────────────────────────────────────────────

export type CodingDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface CodingQuestionProps {
    title: string;
    difficulty?: CodingDifficulty | string;
    category?: string;
    description?: string;
    points?: number | string;
    isStarred?: boolean;
    onStarToggle?: () => void;
    onSolve?: () => void;
}

// ─── Helper: get difficulty badge style ────────────────────────────────────

const getDifficultyStyle = (difficulty: string) => {
    const norm = difficulty.toLowerCase();
    if (norm === 'easy') {
        return { bgcolor: 'rgba(76,175,80,0.1)', color: '#4caf50', borderColor: 'rgba(76,175,80,0.2)' };
    }
    if (norm === 'medium') {
        return { bgcolor: 'rgba(255,152,0,0.1)', color: '#ff9800', borderColor: 'rgba(255,152,0,0.2)' };
    }
    if (norm === 'hard') {
        return { bgcolor: 'rgba(244,67,54,0.1)', color: '#f44336', borderColor: 'rgba(244,67,54,0.2)' };
    }
    return { bgcolor: 'rgba(33,150,243,0.1)', color: '#2196f3', borderColor: 'rgba(33,150,243,0.2)' };
};

// ─── Component ─────────────────────────────────────────────────────────────

const CodingQuestion: React.FC<CodingQuestionProps> = ({
    title,
    difficulty = 'Easy',
    category = 'Algorithms',
    points = '10 Points',
    description,
    isStarred: propIsStarred,
    onStarToggle,
    onSolve,
}) => {
    const [internalStarred, setInternalStarred] = useState(false);

    const isStarred = propIsStarred !== undefined ? propIsStarred : internalStarred;

    const handleStarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onStarToggle) {
            onStarToggle();
        } else {
            setInternalStarred(!internalStarred);
        }
    };

    const handleSolveClick = () => {
        if (onSolve) {
            onSolve();
        }
    };

    const diffStyle = getDifficultyStyle(difficulty);

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 4,
                borderColor: 'divider',
                bgcolor: 'background.default',
                p: 4,
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'stretch', lg: 'center' },
                justifyContent: 'space-between',
                gap: 4,
                transition: 'all 0.3s',
                '&:hover': { borderColor: 'rgba(0,67,235,0.2)' },
                boxShadow: 1
            }}
        >
            {/* Info Area */}
            <Box flex={1}>
                <Typography
                    variant="h5"
                    component="h4"
                    sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        color: 'text.primary',
                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                >
                    {title}
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1.5}>
                    {/* Difficulty Badge */}
                    <Chip
                        label={difficulty}
                        size="small"
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: '0.625rem',
                            border: '1px solid',
                            ...diffStyle
                        }}
                    />
                    {/* Category Badge */}
                    <Chip
                        label={category}
                        size="small"
                        sx={{
                            bgcolor: 'action.selected',
                            color: 'text.secondary',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: '0.625rem'
                        }}
                    />
                    {/* Points Badge */}
                    <Chip
                        label={typeof points === 'number' ? `${points} Points` : points}
                        size="small"
                        sx={{
                            bgcolor: 'action.selected',
                            color: 'text.secondary',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: '0.625rem'
                        }}
                    />
                </Box>
            </Box>

            {/* Action Buttons */}
            <Box
                display="flex"
                alignItems="center"
                gap={2}
                width={{ xs: '100%', lg: 'auto' }}
            >
                {/* Star Button */}
                <IconButton
                    onClick={handleStarClick}
                    aria-label="Star question"
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 4,
                        bgcolor: 'action.selected',
                        color: isStarred ? '#ff6b2c' : 'text.secondary',
                        transition: 'colors 0.3s',
                        '&:hover': {
                            color: '#ff6b2c',
                            bgcolor: 'action.hover'
                        },
                        '&:active': { transform: 'scale(0.95)' }
                    }}
                >
                    <StarIcon fontSize="medium" />
                </IconButton>

                {/* Solve Button */}
                <Button
                    onClick={handleSolveClick}
                    variant="contained"
                    sx={{
                        flex: { xs: 1, lg: 'none' },
                        px: 6,
                        height: 56,
                        bgcolor: '#0043eb',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: 4,
                        textTransform: 'none',
                        fontSize: '1rem',
                        boxShadow: 'none',
                        transition: 'all 0.2s',
                        '&:hover': {
                            bgcolor: '#003bbd',
                            boxShadow: '0 4px 12px rgba(0,67,235,0.3)'
                        },
                        '&:active': { transform: 'scale(0.95)' }
                    }}
                >
                    Solve Challenge
                </Button>
            </Box>
        </Card>
    );
};

export default CodingQuestion;
