import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Subjective type does not need additional per-option fields
// Base form already captures question, score, and description
export default function SubjectiveFields() {
    return (
        <Box
            sx={{
                p: 3,
                backgroundColor: "#F0F9FF",
                borderRadius: "12px",
                border: "1px solid #B2DDFF",
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
            }}
        >
            <CheckCircleIcon
                sx={{
                    color: "#4F39F6",
                    fontSize: "24px",
                    mt: 0.5,
                }}
            />
            <Box>
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#101828",
                        mb: 0.5,
                    }}
                >
                    Subjective Question Ready
                </Typography>
                <Typography
                    sx={{
                        fontSize: "13px",
                        color: "#667085",
                    }}
                >
                    All required information has been captured. The question title, description, and score are sufficient for a subjective question. Students will provide their answers in a text format.
                </Typography>
            </Box>
        </Box>
    );
}


