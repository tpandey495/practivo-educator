import { Box, Typography, Paper } from '@mui/material';
import { ReactNode, useCallback } from 'react';
export default function UploadBox({ icon, coloredTitle, title, description, onFilesDropped }: { icon: ReactNode; coloredTitle: ReactNode; description: ReactNode; title: ReactNode; onFilesDropped?: (files: FileList) => void; }) {
    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();

            const files = event.dataTransfer.files;
            onFilesDropped && onFilesDropped(files);
        },
        [onFilesDropped]
    );

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = false;
        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.files) {
                onFilesDropped && onFilesDropped(target.files);
            }
        };
        input.click();
    };

    return (
        <Paper
            elevation={0}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
                border: '1px dashed #D0D5DD',
                borderRadius: 3,
                backgroundColor: '#fff',
                padding: '40px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    bgcolor: '#f3f4f6',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                }}
            >
                {icon}
            </Box>

            <Typography>
                <Typography
                    component="span"
                    sx={{ color: '#7e22ce', fontWeight: 500, display: 'inline' }}
                >
                    {coloredTitle}
                </Typography>{' '}
                {title}
            </Typography>

            <Typography sx={{ mt: 1, color: '#667085', fontSize: 13 }}>
                {description}
            </Typography>
        </Paper>
    );
};