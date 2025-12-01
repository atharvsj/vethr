// import React from 'react';
// import {
//     Box,
//     Typography,
//     Paper,
//     Grid,
//     TextField,
//     Button,
//     Card,
//     CardContent,
//     Chip,
//     Avatar,
//     AvatarGroup,
//     LinearProgress,
//     InputAdornment,
//     IconButton,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem
// } from '@mui/material';
// import {
//     WorkOutline,
//     PeopleAltOutlined,
//     EventAvailableOutlined,
//     Search,
//     FilterList,
//     Add as AddIcon
// } from '@mui/icons-material';

// // --- Mock Data ---
// // In a real application, this data would come from an API
// const statCardsData = [
//     {
//         title: 'Active Openings',
//         value: '12',
//         icon: <WorkOutline sx={{ fontSize: 40 }} color="primary" />,
//         color: '#e3f2fd',
//     },
//     {
//         title: 'New Candidates (Last 7d)',
//         value: '45',
//         icon: <PeopleAltOutlined sx={{ fontSize: 40 }} color="success" />,
//         color: '#e8f5e9',
//     },
//     {
//         title: 'Interviews Scheduled',
//         value: '28',
//         icon: <EventAvailableOutlined sx={{ fontSize: 40 }} color="warning" />,
//         color: '#fff8e1',
//     },
// ];

// const jobOpeningsData = [
//     {
//         id: 1,
//         title: 'Senior Frontend Developer',
//         department: 'Technology',
//         status: 'Open',
//         priority: 'High',
//         candidates: { applied: 25, interviewing: 5, offer: 1 },
//         postedDate: '2023-10-15',
//     },
//     {
//         id: 2,
//         title: 'Product Manager',
//         department: 'Product',
//         status: 'Open',
//         priority: 'Medium',
//         candidates: { applied: 32, interviewing: 8, offer: 0 },
//         postedDate: '2023-10-20',
//     },
//     {
//         id: 3,
//         title: 'UX/UI Designer',
//         department: 'Design',
//         status: 'Interviewing',
//         priority: 'High',
//         candidates: { applied: 18, interviewing: 4, offer: 2 },
//         postedDate: '2023-09-28',
//     },
//     {
//         id: 4,
//         title: 'Backend Engineer (Go)',
//         department: 'Technology',
//         status: 'Closed',
//         priority: 'Low',
//         candidates: { applied: 40, interviewing: 3, offer: 1 },
//         postedDate: '2023-09-10',
//     },
//     {
//         id: 5,
//         title: 'HR Business Partner',
//         department: 'Human Resources',
//         status: 'On Hold',
//         priority: 'Medium',
//         candidates: { applied: 15, interviewing: 2, offer: 0 },
//         postedDate: '2023-10-05',
//     },
// ];

// // --- Helper Components ---

// // StatCard Component for the top metrics
// const StatCard = ({ title, value, icon, color }) => (
//     <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2 }} elevation={2}>
//         <Avatar sx={{ bgcolor: color, width: 60, height: 60, mr: 2 }}>{icon}</Avatar>
//         <Box>
//             <Typography variant="h6" fontWeight="bold">{value}</Typography>
//             <Typography variant="body2" color="text.secondary">{title}</Typography>
//         </Box>
//     </Card>
// );

// // Custom Chip for status and priority
// const StatusChip = ({ label, type }) => {
//     const chipStyles = {
//         Open: { backgroundColor: '#dcfce7', color: '#166534' },
//         Interviewing: { backgroundColor: '#fef9c3', color: '#854d0e' },
//         'On Hold': { backgroundColor: '#ffedd5', color: '#9a3412' },
//         Closed: { backgroundColor: '#f1f5f9', color: '#334155' },
//         High: { backgroundColor: '#fee2e2', color: '#991b1b' },
//         Medium: { backgroundColor: '#ffedd5', color: '#9a3412' },
//         Low: { backgroundColor: '#f0f9ff', color: '#0c4a6e' },
//     };
//     return <Chip label={label} size="small" sx={{ ...chipStyles[type], fontWeight: 'bold' }} />;
// };


// // --- Main Component ---

// function RecruitmentTracker() {
//     return (
//         <Box sx={{ p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
//             {/* Header Section */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Typography variant="h4" fontWeight="bold" color="text.primary">
//                     Recruitment Tracker
//                 </Typography>
//                 <Button variant="contained" startIcon={<AddIcon />} sx={{ textTransform: 'none', fontWeight: 'bold' }}>
//                     Add New Opening
//                 </Button>
//             </Box>

//             {/* Stat Cards Section */}
//             <Grid container spacing={3} mb={4}>
//                 {statCardsData.map((card, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <StatCard {...card} />
//                     </Grid>
//                 ))}
//             </Grid>

//             {/* Main Content: Job Openings Table */}
//             <Paper sx={{ p: 2, borderRadius: 2 }} elevation={2}>
//                 {/* Toolbar for Search and Filters */}
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
//                     <TextField
//                         variant="outlined"
//                         size="small"
//                         placeholder="Search by job title..."
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <Search />
//                                 </InputAdornment>
//                             ),
//                         }}
//                         sx={{ minWidth: '300px' }}
//                     />
//                     <Box sx={{ display: 'flex', gap: 2 }}>
//                         <FormControl size="small" sx={{ minWidth: 150 }}>
//                             <InputLabel>Department</InputLabel>
//                             <Select label="Department">
//                                 <MenuItem value="All">All</MenuItem>
//                                 <MenuItem value="Technology">Technology</MenuItem>
//                                 <MenuItem value="Product">Product</MenuItem>
//                                 <MenuItem value="Design">Design</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <Button variant="outlined" startIcon={<FilterList />}>
//                             Filters
//                         </Button>
//                     </Box>
//                 </Box>

//                 {/* Job Openings List (Table-like structure using Grid) */}
//                 <Box>
//                     {/* Table Header */}
//                     <Grid container sx={{ p: 2, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa', borderRadius: '4px 4px 0 0' }}>
//                         <Grid item xs={3}><Typography variant="subtitle2" fontWeight="bold">JOB TITLE</Typography></Grid>
//                         <Grid item xs={2}><Typography variant="subtitle2" fontWeight="bold">STATUS</Typography></Grid>
//                         <Grid item xs={2}><Typography variant="subtitle2" fontWeight="bold">PRIORITY</Typography></Grid>
//                         <Grid item xs={3}><Typography variant="subtitle2" fontWeight="bold">CANDIDATES</Typography></Grid>
//                         <Grid item xs={2}><Typography variant="subtitle2" fontWeight="bold">ACTIONS</Typography></Grid>
//                     </Grid>

//                     {/* Table Body */}
//                     {jobOpeningsData.map((job) => {
//                         const totalCandidates = job.candidates.applied + job.candidates.interviewing + job.candidates.offer;
//                         const progress = totalCandidates > 0 ? ((job.candidates.interviewing + job.candidates.offer) / totalCandidates) * 100 : 0;
//                         return (
//                             <Grid container key={job.id} sx={{ p: 2, borderBottom: '1px solid #e0e0e0', alignItems: 'center', '&:hover': { backgroundColor: '#f5f5f5' } }}>
//                                 <Grid item xs={3}>
//                                     <Typography variant="body1" fontWeight="500">{job.title}</Typography>
//                                     <Typography variant="body2" color="text.secondary">in {job.department}</Typography>
//                                 </Grid>
//                                 <Grid item xs={2}><StatusChip label={job.status} type={job.status} /></Grid>
//                                 <Grid item xs={2}><StatusChip label={job.priority} type={job.priority} /></Grid>
//                                 <Grid item xs={3}>
//                                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                         <AvatarGroup max={4} sx={{ mr: 1 }}>
//                                             <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//                                             <Avatar sx={{ width: 32, height: 32 }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//                                             <Avatar sx={{ width: 32, height: 32 }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//                                         </AvatarGroup>
//                                         <Box sx={{ width: '100%' }}>
//                                             <Typography variant="body2" fontWeight="bold">{totalCandidates} Total</Typography>
//                                             <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 5 }} />
//                                         </Box>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={2}>
//                                     <Button variant="text" size="small">View Candidates</Button>
//                                 </Grid>
//                             </Grid>
//                         );
//                     })}
//                 </Box>
//             </Paper>
//         </Box>
//     );
// }

// export default RecruitmentTracker;






import React from 'react';
import {
    Box, Typography, Paper, Grid, TextField, Button,
    Card, Chip, Avatar, AvatarGroup,
    LinearProgress, FormControl, InputLabel, Select, MenuItem,
    useTheme, useMediaQuery, Stack
} from '@mui/material';
import {
    WorkOutline, PeopleAltOutlined, EventAvailableOutlined,
    Add as AddIcon, FilterList as FilterListIcon
} from '@mui/icons-material';

// --- Mock Data (No Change) ---
const statCardsData = [
    { title: 'Active Openings', value: '12', icon: <WorkOutline sx={{ fontSize: 40 }} color="primary" />, color: '#e3f2fd' },
    { title: 'New Candidates (Last 7d)', value: '45', icon: <PeopleAltOutlined sx={{ fontSize: 40 }} color="success" />, color: '#e8f5e9' },
    { title: 'Interviews Scheduled', value: '28', icon: <EventAvailableOutlined sx={{ fontSize: 40 }} color="warning" />, color: '#fff8e1' },
];
const jobOpeningsData = [
    { id: 1, title: 'Senior Frontend Developer', department: 'Technology', status: 'Open', priority: 'High', candidates: { applied: 25, interviewing: 5, offer: 1 }, postedDate: '2023-10-15' },
    { id: 2, title: 'Product Manager', department: 'Product', status: 'Open', priority: 'Medium', candidates: { applied: 32, interviewing: 8, offer: 0 }, postedDate: '2023-10-20' },
    { id: 3, title: 'UX/UI Designer', department: 'Design', status: 'Interviewing', priority: 'High', candidates: { applied: 18, interviewing: 4, offer: 2 }, postedDate: '2023-09-28' },
    { id: 4, title: 'Backend Engineer (Go)', department: 'Technology', status: 'Closed', priority: 'Low', candidates: { applied: 40, interviewing: 3, offer: 1 }, postedDate: '2023-09-10' },
    { id: 5, title: 'HR Business Partner', department: 'Human Resources', status: 'On Hold', priority: 'Medium', candidates: { applied: 15, interviewing: 2, offer: 0 }, postedDate: '2023-10-05' },
];

// --- Helper Components (No Change) ---
const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2 }} elevation={2}>
        <Avatar sx={{ bgcolor: color, width: 60, height: 60, mr: 2 }}>{icon}</Avatar>
        <Box>
            <Typography variant="h6" fontWeight="bold">{value}</Typography>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
        </Box>
    </Card>
);

const StatusChip = ({ label, type }) => {
    const chipStyles = {
        Open: { backgroundColor: '#dcfce7', color: '#166534' },
        Interviewing: { backgroundColor: '#fef9c3', color: '#854d0e' },
        'On Hold': { backgroundColor: '#ffedd5', color: '#9a3412' },
        Closed: { backgroundColor: '#f1f5f9', color: '#334155' },
        High: { backgroundColor: '#fee2e2', color: '#991b1b' },
        Medium: { backgroundColor: '#ffedd5', color: '#9a3412' },
        Low: { backgroundColor: '#f0f9ff', color: '#0c4a6e' },
    };
    return <Chip label={label} size="small" sx={{ ...chipStyles[type], fontWeight: 'bold' }} />;
};

// --- Main Component ---
function RecruitmentTracker() {
    // --- Hooks for Theme and Responsiveness ---
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    
    // Style for the list header
    const headerCellStyle = {
        fontWeight: 'bold',
        color: 'white',
        p: 1.5,
    };

    return (
        <Box sx={{ p: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color={primaryColor}>
                    Recruitment Tracker
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}
                >
                    Add New Opening
                </Button>
            </Box>

            {/* Stat Cards Section */}
            <Grid container spacing={3} mb={4}>
                {statCardsData.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <StatCard {...card} />
                    </Grid>
                ))}
            </Grid>

            {/* Control Panel for Filters and Search */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Department</InputLabel>
                            <Select label="Department" defaultValue="All">
                                <MenuItem value="All">All Departments</MenuItem>
                                <MenuItem value="Technology">Technology</MenuItem>
                                <MenuItem value="Product">Product</MenuItem>
                                <MenuItem value="Design">Design</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="outlined" startIcon={<FilterListIcon />}>
                            Filters
                        </Button>
                    </Stack>
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Search by job title..."
                        sx={{ width: isMobile ? '100%' : 'auto' }}
                    />
                </Stack>
            </Paper>

            {/* Main Content: Job Openings List */}
            <Paper elevation={2}>
                {/* List Header */}
                <Grid container sx={{ backgroundColor: primaryColor, borderRadius: '4px 4px 0 0' }}>
                    <Grid item xs={1}><Typography sx={{...headerCellStyle, textAlign: 'center'}}>SR. NO.</Typography></Grid>
                    <Grid item xs={3}><Typography sx={headerCellStyle}>JOB TITLE</Typography></Grid>
                    <Grid item xs={1.5}><Typography sx={headerCellStyle}>STATUS</Typography></Grid>
                    <Grid item xs={1.5}><Typography sx={headerCellStyle}>PRIORITY</Typography></Grid>
                    <Grid item xs={3}><Typography sx={headerCellStyle}>CANDIDATES</Typography></Grid>
                    <Grid item xs={2}><Typography sx={headerCellStyle}>ACTIONS</Typography></Grid>
                </Grid>

                {/* List Body */}
                <Box>
                    {jobOpeningsData.map((job, index) => {
                        const totalCandidates = job.candidates.applied + job.candidates.interviewing + job.candidates.offer;
                        const progress = totalCandidates > 0 ? ((job.candidates.interviewing + job.candidates.offer) / totalCandidates) * 100 : 0;
                        return (
                            <Grid container key={job.id} sx={{ p: 2, borderBottom: '1px solid #e0e0e0', alignItems: 'center', '&:hover': { backgroundColor: '#f5f5f5' } }}>
                                <Grid item xs={1} sx={{ textAlign: 'center' }}>
                                    <Typography variant="body1" fontWeight="500">{index + 1}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" fontWeight="500">{job.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">in {job.department}</Typography>
                                </Grid>
                                <Grid item xs={1.5}><StatusChip label={job.status} type={job.status} /></Grid>
                                <Grid item xs={1.5}><StatusChip label={job.priority} type={job.priority} /></Grid>
                                <Grid item xs={3}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AvatarGroup max={4} sx={{ mr: 1 }}>
                                            <Avatar sx={{ width: 32, height: 32 }} />
                                            <Avatar sx={{ width: 32, height: 32 }} />
                                            <Avatar sx={{ width: 32, height: 32 }} />
                                        </AvatarGroup>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography variant="body2" fontWeight="bold">{totalCandidates} Total</Typography>
                                            <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 5 }} />
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="text" size="small" sx={{ color: primaryColor }}>View Candidates</Button>
                                </Grid>
                            </Grid>
                        );
                    })}
                </Box>
            </Paper>
        </Box>
    );
}

export default RecruitmentTracker;