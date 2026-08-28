'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, Chip, ButtonBase } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface MCQOption {
    id: string;
    text: string;
}

export interface AlreadyPracticed {
    isCorrect: boolean;
    selectedOptionId: string | number;
}

export interface MCQTemplateProps {
    questionNumber?: number;
    questionTitle: string;
    questionDescription?: string;
    options: MCQOption[];
    selectedOptionId?: string | null;
    onSelect?: (optionId: string) => void;
    isSubmitted?: boolean;
    correctOptionId?: string;
    alreadyPracticed?: AlreadyPracticed | null;
    score?: number;
}

// ─── Component ─────────────────────────────────────────────────────────────

const MCQTemplate: React.FC<MCQTemplateProps> = ({
    questionNumber = 1,
    questionTitle,
    questionDescription,
    options,
    selectedOptionId,
    onSelect,
    isSubmitted = false,
    correctOptionId,
    alreadyPracticed,
    score,
}) => {
    const [internalSelected, setInternalSelected] = useState<string | null>(null);

    // alreadyPracticed locks the question and pre-selects the previous answer
    const locked = isSubmitted || !!alreadyPracticed;
    const activeSelected =
        alreadyPracticed
            ? String(alreadyPracticed.selectedOptionId)
            : selectedOptionId != null
                ? selectedOptionId
                : internalSelected;

    const handleSelect = (id: string) => {
        if (locked) return;
        onSelect ? onSelect(id) : setInternalSelected(id);
    };

    const getOptionState = (id: string): 'idle' | 'selected' | 'correct' | 'incorrect' => {
        if (!locked) return activeSelected === id ? 'selected' : 'idle';
        if (id === correctOptionId) return 'correct';
        if (id === activeSelected && id !== correctOptionId) return 'incorrect';
        return 'idle';
    };

    const getOptionStyles = (state: 'idle' | 'selected' | 'correct' | 'incorrect') => {
        switch (state) {
            case 'selected':
                return {
                    wrapper: { borderColor: '#ff6b2c', bgcolor: 'rgba(255,107,44,0.07)' },
                    badge: { bgcolor: 'rgba(255,107,44,0.15)', color: '#ff6b2c' },
                    radio: { borderColor: '#ff6b2c' },
                    dot: { opacity: 1, bgcolor: '#ff6b2c' },
                    label: { color: 'text.primary' },
                };
            case 'correct':
                return {
                    wrapper: { borderColor: '#4caf50', bgcolor: 'rgba(76,175,80,0.1)' },
                    badge: { bgcolor: 'rgba(76,175,80,0.15)', color: '#4caf50' },
                    radio: { borderColor: '#4caf50' },
                    dot: { opacity: 1, bgcolor: '#4caf50' },
                    label: { color: '#4caf50' },
                };
            case 'incorrect':
                return {
                    wrapper: { borderColor: '#f44336', bgcolor: 'rgba(244,67,54,0.1)' },
                    badge: { bgcolor: 'rgba(244,67,54,0.15)', color: '#f44336' },
                    radio: { borderColor: '#f44336' },
                    dot: { opacity: 1, bgcolor: '#f44336' },
                    label: { color: '#f44336' },
                };
            case 'idle':
            default:
                return {
                    wrapper: { borderColor: 'divider', bgcolor: 'background.paper', '&:hover': { borderColor: 'rgba(255,107,44,0.4)', bgcolor: 'rgba(255,107,44,0.03)' } },
                    badge: { bgcolor: 'action.hover', color: 'text.secondary' },
                    radio: { borderColor: 'divider' },
                    dot: { opacity: 0, bgcolor: '#ff6b2c' },
                    label: { color: 'text.secondary' },
                };
        }
    };

    const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 4,
                borderColor: 'divider',
                '&:hover': { borderColor: 'rgba(255,107,44,0.2)' },
                transition: 'all 0.3s',
                boxShadow: 1,
                p: 3,
                bgcolor: 'background.default'
            }}
        >
            {/* ── Question Header ── */}
            <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                <Box>
                    <Typography
                        variant="overline"
                        sx={{
                            fontWeight: 'bold',
                            letterSpacing: '0.2em',
                            mb: 0.5,
                            display: 'block',
                            color: '#ff6b2c',
                            fontSize: '0.625rem'
                        }}
                    >
                        Question {questionNumber}
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                            fontWeight: 'bold',
                            color: 'text.primary',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            lineHeight: 1.3
                        }}
                    >
                        {questionTitle}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} ml={2} mt={0.5} flexShrink={0}>
                    {score != null && (
                        <Chip
                            label={`${score} ${score === 1 ? 'POINT' : 'POINTS'}`}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255,107,44,0.12)',
                                color: '#ff6b2c',
                                border: '1px solid rgba(255,107,44,0.25)',
                                fontWeight: 'bold',
                                fontSize: '0.625rem',
                                letterSpacing: '0.05em'
                            }}
                        />
                    )}
                    <Chip
                        label="Multiple Choice"
                        size="small"
                        sx={{
                            bgcolor: 'action.selected',
                            color: 'text.secondary',
                            fontWeight: 'bold',
                            fontSize: '0.625rem',
                            letterSpacing: '0.05em'
                        }}
                    />
                </Box>
            </Box>

            {/* ── Description ── */}
            {questionDescription && (
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        mb: 3,
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1.6
                    }}
                    dangerouslySetInnerHTML={{ __html: questionDescription }}
                />
            )}

            {/* ── Options Grid ── */}
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={1.5}>
                {options.map((option, index) => {
                    const state = getOptionState(option.id);
                    const s = getOptionStyles(state);

                    return (
                        <ButtonBase
                            key={option.id}
                            disabled={locked}
                            onClick={() => handleSelect(option.id)}
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                width: '100%',
                                textAlign: 'left',
                                p: 2,
                                borderRadius: 3,
                                border: '1px solid',
                                transition: 'all 0.2s',
                                cursor: locked ? 'default' : 'pointer',
                                '&:active': !locked ? { transform: 'scale(0.98)' } : {},
                                ...s.wrapper
                            }}
                        >
                            {/* Letter badge */}
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    flexShrink: 0,
                                    transition: 'all 0.2s',
                                    ...s.badge
                                }}
                            >
                                {optionLetters[index] ?? index + 1}
                            </Box>

                            {/* Radio circle */}
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    border: '2px solid',
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s',
                                    ...s.radio
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        transition: 'all 0.2s',
                                        ...s.dot
                                    }}
                                />
                            </Box>

                            {/* Option text */}
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    transition: 'color 0.2s',
                                    lineHeight: 1.3,
                                    flex: 1,
                                    fontFamily: "'Inter', sans-serif",
                                    ...s.label
                                }}
                            >
                                {option.text}
                            </Typography>

                            {/* Result icon */}
                            {locked && state === 'correct' && (
                                <CheckCircleIcon sx={{ color: '#4caf50', fontSize: '1rem', flexShrink: 0 }} />
                            )}
                            {locked && state === 'incorrect' && (
                                <CancelIcon sx={{ color: '#f44336', fontSize: '1rem', flexShrink: 0 }} />
                            )}
                        </ButtonBase>
                    );
                })}
            </Box>

            {/* ── Feedback banner ── */}
            {locked && (correctOptionId || alreadyPracticed) && (() => {
                const isCorrect = activeSelected === correctOptionId || !!alreadyPracticed?.isCorrect;
                
                if (!isCorrect) return null;

                return (
                    <Box
                        sx={{
                            mt: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            px: 2,
                            py: 1.5,
                            borderRadius: 3,
                            border: '1px solid',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            bgcolor: 'rgba(76,175,80,0.1)',
                            borderColor: 'rgba(76,175,80,0.3)',
                            color: '#4caf50'
                        }}
                    >
                        <CheckCircleIcon fontSize="small" />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Correct!
                        </Typography>
                    </Box>
                );
            })()}
        </Card>
    );
};

export default MCQTemplate;