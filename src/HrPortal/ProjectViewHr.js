// import React, { useState } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Button, 
//   Paper, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer,
//   TableHead, 
//   TableRow, 
//   TextField, 
//   FormControl, 
//   Select, 
//   MenuItem, 
//   Grid 
// } from '@mui/material';
// import { Work as WorkIcon } from '@mui/icons-material';

// // Define theme colors for easy reuse
// const themeColors = {
//   primary: '#8C257C', // Purple
//   secondary: '#F58E35', // Orange
// };

// export default function ProjectsView() {
//   const [entries, setEntries] = useState('10');
//   const [searchTerm, setSearchTerm] = useState('');

//   const projectStats = [
//     { title: "TOTAL COMPLETED", count: 0, color: "success.main" },
//     { title: "TOTAL IN PROGRESS", count: 0, color: "primary.main" },
//     { title: "TOTAL NOT STARTED", count: 0, color: "warning.main" },
//     { title: "TOTAL ON HOLD", count: 0, color: "error.main" },
//   ];

//   // Placeholder data for total rows count
//   const totalRecords = 0; 

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>Set Up Projects </Typography>
//       <Grid container spacing={2}>
//         {projectStats.map((stat, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//               <Typography variant="subtitle2" color="text.secondary">{stat.title}</Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                 <Typography variant="h4" color={stat.color}>{stat.count}</Typography>
//                 <Box sx={{ ml: 1, color: 'text.secondary' }}>
//                   <WorkIcon />
//                 </Box>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//       <Paper sx={{ mt: 2, p: 2, overflow: 'hidden' }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>List of all Projects</Typography>
        
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//             <FormControl sx={{ minWidth: 70 }} size="small">
//               <Select
//                 value={entries}
//                 onChange={(e) => setEntries(e.target.value)}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//             <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//           </Box>
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Box>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ 
//                 '& th': { 
//                   backgroundColor: themeColors.primary, 
//                   color: 'white',
//                   fontWeight: 'bold',
//                 } 
//               }}>
//                 {/* --- ADDED: Sr No. column --- */}
//                 <TableCell>SR NO.</TableCell> 
//                 <TableCell>PROJECTS</TableCell>
//                 <TableCell>CLIENT</TableCell>
//                 <TableCell>START DATE</TableCell>
//                 <TableCell>END DATE</TableCell>
//                 <TableCell>TEAM</TableCell>
//                 <TableCell>PRIORITY</TableCell>
//                 <TableCell>PROGRESS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 {/* --- CHANGED: Updated colSpan to 8 to account for new column --- */}
//                 <TableCell colSpan={8} align="center">No records available</TableCell>
//               </TableRow>
//               {/* 
//                 When you map over your data, your row would look something like this:
                
//                 yourData.map((row, index) => (
//                   <TableRow key={row.id}>
//                     <TableCell>{index + 1}</TableCell>  // This would be the Sr. No.
//                     <TableCell>{row.projectName}</TableCell>
//                     <TableCell>{row.clientName}</TableCell>
//                     ...and so on
//                   </TableRow>
//                 ))
//               */}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1 }}>
//           <Typography variant="body2" color="text.secondary">
//             Showing 0 to {totalRecords} of {totalRecords} entries
//           </Typography>
//           <Box>
//             <Button 
//               variant="outlined" 
//               sx={{ 
//                 mr: 1,
//                 borderColor: themeColors.primary,
//                 color: themeColors.primary,
//                 '&:hover': {
//                   borderColor: themeColors.primary,
//                   backgroundColor: 'rgba(140, 37, 124, 0.04)'
//                 }
//               }}
//             >
//               Previous
//             </Button>
//             <Button 
//               variant="outlined"
//               sx={{
//                 borderColor: themeColors.primary,
//                 color: themeColors.primary,
//                 '&:hover': {
//                   borderColor: themeColors.primary,
//                   backgroundColor: 'rgba(140, 37, 124, 0.04)'
//                 }
//               }}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }










import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'; // Import the format function
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Stack,
  InputAdornment,
  TablePagination,
  Skeleton,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Search as SearchIcon
} from '@mui/icons-material';

// --- Helper Function ---
// Formats a Date object or string into 'dd/MM/yyyy' for display purposes.
const formatDateForDisplay = (date) => {
  if (!date) return 'N/A';
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'N/A'; // Invalid date check
    return format(dateObj, 'dd/MM/yyyy');
  } catch (error) {
    return 'Invalid Date';
  }
};

// Dummy data for demonstration
const dummyProjects = [
    { id: 1, name: 'E-commerce Platform', client: 'Global Retail Inc.', startDate: '2023-09-01', endDate: '2024-03-01', team: 'Web Dev', priority: 'High', progress: 75 },
    { id: 2, name: 'Mobile Banking App', client: 'Secure Bank', startDate: '2023-10-15', endDate: '2024-05-15', team: 'Mobile Team', priority: 'High', progress: 45 },
    { id: 3, name: 'Data Analytics Dashboard', client: 'Insight Corp', startDate: '2023-11-01', endDate: '2024-02-01', team: 'Data Science', priority: 'Medium', progress: 90 },
    { id: 4, name: 'Cloud Migration', client: 'Legacy Systems', startDate: '2023-08-20', endDate: '2023-12-20', team: 'Tech Ops', priority: 'Low', progress: 100 },
    { id: 5, name: 'CRM Integration', client: 'Connect All', startDate: '2024-01-10', endDate: '2024-04-10', team: 'Integrations', priority: 'Medium', progress: 15 },
    { id: 6, name: 'Website Redesign', client: 'Creative Solutions', startDate: '2023-12-01', endDate: '2024-03-01', team: 'UI/UX', priority: 'High', progress: 0 },
    { id: 7, name: 'API Development', client: 'App Builders', startDate: '2023-11-25', endDate: '2024-02-25', team: 'Backend', priority: 'Medium', progress: 60 },
];


export default function ProjectsView() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(dummyProjects);
      setLoading(false);
    }, 1500);
  }, []);

  const projectStats = [
    { title: "TOTAL COMPLETED", count: projects.filter(p => p.progress === 100).length, color: "success.main" },
    { title: "TOTAL IN PROGRESS", count: projects.filter(p => p.progress > 0 && p.progress < 100).length, color: "#8C257C" },
    { title: "TOTAL NOT STARTED", count: projects.filter(p => p.progress === 0).length, color: "warning.main" },
    { title: "TOTAL ON HOLD", count: projects.filter(p => p.priority === 'Low').length, color: "error.main" }, // Example logic for on hold
  ];

  const handleChangePage = (event, newPage) => setPage(newPage);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 5 }}> Projects</Typography>
      
       <Grid container spacing={2} mb={3}>
        {projectStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">{stat.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="h4" color={stat.color} sx={{ fontWeight: 'bold' }}>{stat.count}</Typography>
                <Box sx={{ ml: 1.5, color: 'text.secondary' }}><AssignmentIcon fontSize="large" /></Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Paper elevation={2} sx={{ p: 2 }}>
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems={isMobile ? 'stretch' : 'center'} spacing={2} mb={2}>
          <TextField size="small" placeholder="Search Projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} sx={{ width: isMobile ? '100%' : 'auto' }} />
        </Stack>

        <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#8C257C' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR. NO.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>PROJECTS</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CLIENT</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>START DATE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>END DATE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TEAM</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>PRIORITY</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>PROGRESS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                [...Array(rowsPerPage)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton variant="text" width={40} /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton variant="text" width={80} /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                  </TableRow>
                ))
              ) : filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">No records available</TableCell>
                </TableRow>
              ) : (
                filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project, index) => (
                  <TableRow key={project.id} hover>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{project.name}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{project.client}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{formatDateForDisplay(project.startDate)}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{formatDateForDisplay(project.endDate)}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{project.team}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{project.priority}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>
                      <Box display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                          <LinearProgress variant="determinate" value={project.progress} />
                        </Box>
                        <Box minWidth={35}>
                          <Typography variant="body2" color="text.secondary">{`${project.progress}%`}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination 
          rowsPerPageOptions={[5, 10, 15, 25]} 
          component="div" 
          count={filteredProjects.length} 
          rowsPerPage={rowsPerPage} 
          page={page} 
          onPageChange={handleChangePage} 
          onRowsPerPageChange={handleChangeRowsPerPage} 
        />
      </Paper>
    </Box>
  );
}