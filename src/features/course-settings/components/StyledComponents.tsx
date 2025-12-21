import { Box, AccordionProps, AccordionSummaryProps, accordionSummaryClasses, styled } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

export const Accordion = styled((props: AccordionProps) => (<MuiAccordion disableGutters elevation={0} {...props} />))(() => ({
    borderRadius: "16px",
    backgroundColor: "#F9FAFA",
    overflow: "hidden",
    borderTop: "1px solid #F2F2F2",
    borderBottom: "1px solid #F2F2F2",
    padding: "4px",
    "&::before": {
        display: "none",
    },
    "&:first-of-type": {
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
    },
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => {
    const { children, ...other } = props;
    return (
        <MuiAccordionSummary
            {...other}
            expandIcon={null}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                <DragIndicatorIcon sx={{ color: "#999" }} />
                <ArrowForwardIosSharpIcon
                    sx={{
                        fontWeight: 600,
                        color: "#000",
                        fontSize: "0.9rem",
                        transition: "transform 0.3s",
                        transform: props["aria-expanded"] ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                    className="custom-expand-icon"
                />
                {children}
            </Box>
        </MuiAccordionSummary>
    );
})(({ theme }) => ({
    backgroundColor: "inherit",
    flexDirection: "row",
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    [`& .custom-expand-icon`]: {
        transition: "transform 0.3s",
    },
    [`&.Mui-expanded .custom-expand-icon`]: {
        transform: "rotate(90deg)",
    },
}));

export const LessonItem = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    border: "1px solid #F2F2F2",
    borderRadius: "8px",
    padding: "16px",
}));
