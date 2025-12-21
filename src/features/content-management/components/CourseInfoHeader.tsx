import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";
import ToolBar from "../../course-settings/components/index";
import MoreButton from "../../../components/ui/MoreButton";
import PublishButton from "../../../components/ui/PublishButton";

const RightSideTools = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                height: "48px",
            }}
        >
            <PublishButton />
            <MoreButton />
            <Box sx={{ textAlign: "center", color: "#000000" }}>
                <Typography>2</Typography>
                <Typography>Lessons</Typography>
            </Box>
            <Typography sx={{ color: "#000000" }}>/</Typography>
            <Box sx={{ textAlign: "center", color: "#000000" }}>
                <Typography>2</Typography>
                <Typography>Learners</Typography>
            </Box>
        </Box>
    );
};

export default RightSideTools;