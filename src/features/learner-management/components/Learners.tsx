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
import React from 'react';

import { Learner } from '../types';
import { mockLearners } from '../utils/mockData';

export function LearnersTab() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Mobile card view component
    const MobileLearnerCard = ({ learner }: { learner: Learner }) => (
        <Card
            sx={{
                mb: 2,
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0'
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center" gap={1.5} flex={1}>
                        <Avatar
                            src={learner.avatar}
                            sx={{ width: 40, height: 40 }}
                        />
                        <Box>
                            <Typography fontWeight={600} fontSize="14px" color="#1a1a1a">
                                {learner.name}
                            </Typography>
                            <Typography fontSize="12px" color="#664700">
                                {learner.role}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton size="small">
                        <MoreVertIcon />
                    </IconButton>
                </Box>

                <Stack spacing={1.5}>
                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Email
                        </Typography>
                        <Typography fontSize="14px" fontWeight={500}>
                            {learner.email}
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                                Completion
                            </Typography>
                            <Typography fontSize="14px" fontWeight={600}>
                                {learner.completion}
                            </Typography>
                        </Box>

                        <Chip
                            label={learner.status}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255, 167, 45, 0.15)',
                                color: '#FFA72D',
                                fontWeight: 600,
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                borderRadius: '8px',
                                px: '8px',
                                py: '4px',
                                height: 'auto',
                            }}
                        />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                p: 2,
            }}
        >
            {/* Top Filter/Search/Add Buttons Row */}
            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'stretch', md: 'center' }}
                justifyContent="space-between"
                gap={{ xs: 2, md: 2 }}
                mb={3}
            >
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                    gap={{ xs: 1.5, sm: 1 }}
                    width={{ xs: '100%', md: 'auto' }}
                >
                    {/* Filter Dropdown Icon */}
                    <IconButton
                        sx={{
                            border: '1px solid #E0E0E0',
                            borderRadius: 2,
                            p: 1,
                            minWidth: 40,
                            alignSelf: { xs: 'flex-start', sm: 'center' },
                            width: { xs: 'fit-content', sm: 'auto' }
                        }}
                    >
                        <FilterListIcon fontSize="small" />
                        <ArrowDropDownIcon fontSize="small" />
                    </IconButton>

                    {/* Search Box */}
                    <Box
                        display="flex"
                        alignItems="center"
                        border="1px solid #E0E0E0"
                        borderRadius={4}
                        px={1.5}
                        py={0.75}
                        bgcolor="#fff"
                        width={{ xs: '100%', sm: 'auto' }}
                        minWidth={{ sm: 250 }}
                    >
                        <SearchIcon sx={{ color: '#999', mr: 1 }} />
                        <InputBase
                            placeholder="Search learners..."
                            fullWidth
                            sx={{ fontSize: { xs: '14px', sm: '16px' } }}
                        />
                    </Box>
                </Box>

                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                    gap={{ xs: 1.5, sm: 1 }}
                    width={{ xs: '100%', md: 'auto' }}
                >
                    {/* Learner Type Dropdown */}
                    <Select
                        defaultValue="direct"
                        displayEmpty
                        size={isSmallScreen ? 'medium' : 'small'}
                        sx={{
                            borderRadius: 2,
                            bgcolor: '#fff',
                            minWidth: { xs: '100%', sm: 160 },
                            '.MuiSelect-select': {
                                py: isSmallScreen ? 1.2 : 0.8,
                                px: 2,
                                fontSize: { xs: '14px', sm: '16px' }
                            },
                        }}
                        IconComponent={ArrowDropDownIcon}
                    >
                        <MenuItem value="direct">
                            <Box display="flex" alignItems="center" gap={1}>
                                <FilterAltIcon sx={{ fontSize: 18, color: '#666666' }} />
                                <Typography color="#666666" fontSize={{ xs: '14px', sm: '16px' }}>
                                    Direct Learner
                                </Typography>
                            </Box>
                        </MenuItem>
                    </Select>

                    {/* Add Learners Button */}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        fullWidth={isSmallScreen}
                        sx={{
                            textTransform: 'none',
                            bgcolor: '#4F39F6',
                            color: '#FFFFFF',
                            borderRadius: 2,
                            px: { xs: 2, sm: 2.5 },
                            py: { xs: 1.2, sm: 1 },
                            whiteSpace: 'nowrap',
                            fontSize: { xs: '14px', sm: '16px' },
                            minHeight: { xs: 44, sm: 'auto' },
                            '&:hover': {
                                bgcolor: '#3E2DC4',
                                color: '#FFFFFF',
                            },
                        }}
                    >
                        Add Learners
                    </Button>
                </Box>
            </Box>

            {/* Conditional Rendering: Mobile Cards or Desktop Table */}
            {isMobile ? (
                <Box>
                    {mockLearners.map((learner) => (
                        <MobileLearnerCard key={learner.id} learner={learner} />
                    ))}
                </Box>
            ) : (
                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: 3,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #f0f0f0'
                    }}
                >
                    <Table
                        sx={{
                            minWidth: 650,
                            bgcolor: '#fff',
                            '& .MuiTableCell-root': {
                                borderBottom: '1px solid #f5f5f5',
                                py: 2,
                            },
                        }}
                    >
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#F7F7F8' }}>
                                <TableCell sx={{ fontWeight: 600, color: '#666', fontSize: '14px' }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#666', fontSize: '14px' }}>Learner</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#666', fontSize: '14px' }}>Email Address</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#666', fontSize: '14px' }}>Completion</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#666', fontSize: '14px' }}>Status</TableCell>
                                <TableCell align="right" sx={{ width: 60 }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockLearners.map((learner, index) => (
                                <TableRow
                                    key={learner.id}
                                    hover
                                    sx={{
                                        '&:hover': {
                                            bgcolor: '#fafafa'
                                        }
                                    }}
                                >
                                    <TableCell sx={{ fontSize: '14px' }}>{index + 1}</TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <Avatar
                                                src={learner.avatar}
                                                sx={{ width: 36, height: 36 }}
                                            />
                                            <Box>
                                                <Typography fontWeight={600} fontSize="14px" color="#1a1a1a">
                                                    {learner.name}
                                                </Typography>
                                                <Typography fontSize="13px" color="#664700">
                                                    {learner.role}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight={500} fontSize="14px">
                                            {learner.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight={600} fontSize="14px">
                                            {learner.completion}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={learner.status}
                                            size="small"
                                            sx={{
                                                bgcolor: 'rgba(255, 167, 45, 0.15)',
                                                color: '#FFA72D',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                borderRadius: '8px',
                                                px: '12px',
                                                py: '4px',
                                                height: 'auto',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small">
                                            <MoreVertIcon />
                                        </IconButton>
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

export default function Learners() {
    const [value, setValue] = React.useState('users');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            width: '100%',
            display: "grid",
            gap: { xs: "8px", sm: "12px" },
            p: { xs: 1, sm: 0 }
        }}>
            <Box
                sx={{
                    borderRadius: 3,
                    p: { xs: "2px", sm: "6px", md: "5px" },
                    bgcolor: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="learners tabs"
                    variant={isMobile ? "fullWidth" : "standard"}
                    sx={{
                        '& .MuiTabs-flexContainer': {
                            gap: { xs: 0, sm: 2 },
                            justifyContent: 'flex-start'
                        }
                    }}
                >
                    <Tab
                        value="users"
                        label="Users"
                        sx={{
                            fontSize: { xs: '14px', sm: '16px' },
                            color: '#9499A1',
                            textTransform: 'none',
                            fontWeight: 500,
                            minHeight: { xs: 40, sm: 48 },
                            '&.Mui-selected': {
                                color: '#4F39F6',
                                fontWeight: 600
                            },
                        }}
                    />
                    <Tab
                        value="spaces"
                        label="Spaces"
                        sx={{
                            fontSize: { xs: '14px', sm: '16px' },
                            color: '#9499A1',
                            textTransform: 'none',
                            fontWeight: 500,
                            minHeight: { xs: 40, sm: 48 },
                            '&.Mui-selected': {
                                color: '#4F39F6',
                                fontWeight: 600
                            },
                        }}
                    />
                </Tabs>
            </Box>
            <LearnersTab />
        </Box>
    );
}
