import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    IconButton,
    InputBase,
    Button,
    Chip,
    MenuItem,
    Select,
    Tabs,
    Tab,
    TableContainer,
    useTheme,
    useMediaQuery,
    Stack,
    Card,
    CardContent,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useParams } from 'react-router-dom';
import { useGetCourseLearnersQuery } from '../api/api';


interface Learner {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    completion: string;
    status: string;
    totalScore: number;
}

export function LearnersTab() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { courseId } = useParams();

    const { data, isLoading, error } = useGetCourseLearnersQuery(courseId!, {
        skip: !courseId,
    });
    // learner apis  
    const learners: Learner[] = (data?.data?.students || []).map((item: any, index: number) => ({
        id: index + 1,
        name: item.userName,
        email: item.userEmail,
        avatar: '', // API me nahi hai
        role: item.roleId === 0 ? "Learner" : "Admin",
        completion: `${item.progressPercent || 0}%`,
        status: item.completionStatus === "pending" ? "Inactive" : "Active",
        totalScore: item.totalScore || 0,
    }));

    const MobileLearnerCard = ({ learner }: { learner: Learner }) => (
        <Card sx={{ mb: 2, borderRadius: 3, border: '1px solid #f0f0f0' }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" gap={1}>
                        <Avatar src={learner.avatar} />
                        <Box>
                            <Typography fontWeight={600}>{learner.name}</Typography>
                            <Typography fontSize="12px">{learner.role}</Typography>
                        </Box>
                    </Box>
                    <IconButton><MoreVertIcon /></IconButton>
                </Box>

                <Typography mt={1}>{learner.email}</Typography>

                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography>{learner.completion}</Typography>
                    <Chip label={learner.status} size="small" />
                </Box>
            </CardContent>
        </Card>
    );

    //  Loading
    if (isLoading) return <Typography>Loading learners...</Typography>;

    // err
    if (error) return <Typography>Error loading learners</Typography>;

    return (
        <Paper sx={{ borderRadius: 3, p: 2 }}>

            {/* TOP BAR */}
            <Box display="flex" justifyContent="space-between" mb={2} flexWrap="wrap" gap={2}>

                <Box display="flex" gap={1}>
                    <IconButton>
                        <FilterListIcon />
                        <ArrowDropDownIcon />
                    </IconButton>

                    <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={3} px={1}>
                        <SearchIcon />
                        <InputBase placeholder="Search learners..." />
                    </Box>
                </Box>

                <Box display="flex" gap={1}>
                    <Select defaultValue="direct" size="small">
                        <MenuItem value="direct">
                            <FilterAltIcon /> Direct Learner
                        </MenuItem>
                    </Select>

                    <Button variant="contained" startIcon={<AddIcon />}>
                        Add Learners
                    </Button>
                </Box>
            </Box>

            {/* EMPTY */}
            {learners.length === 0 && (
                <Typography>No learners found</Typography>
            )}

            {/* MOBILE */}
            {isMobile ? (
                learners.map((learner) => (
                    <MobileLearnerCard key={learner.id} learner={learner} />
                ))
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Learner</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Completion</TableCell>
                                <TableCell> Score</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {learners.map((learner, index) => (
                                <TableRow key={learner.id}>
                                    <TableCell>{index + 1}</TableCell>

                                    <TableCell>
                                        <Box display="flex" gap={1}>
                                            <Avatar src={learner.avatar} />
                                            <Box>
                                                <Typography fontWeight={600}>{learner.name}</Typography>
                                                <Typography fontSize="12px">{learner.role}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>

                                    <TableCell>{learner.email}</TableCell>
                                    <TableCell>{learner.completion}</TableCell>
                                    <TableCell>{learner.totalScore}</TableCell>
                                    <TableCell>
                                        <Chip label={learner.status} />
                                    </TableCell>

                                    <TableCell>
                                        <IconButton><MoreVertIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
}

// MAIN
export default function Learners() {
    return (
        <Box sx={{ width: '100%', p: { xs: 1, sm: 0 } }}>
            <LearnersTab />
        </Box>
    );
}