// import React, { useState } from 'react';
// import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
// import { Assignment as AssignmentIcon } from '@mui/icons-material';

// export default function TasksView() {
//   const [entries, setEntries] = useState('10');
//   const [searchTerm, setSearchTerm] = useState('');

//   const taskStats = [
//     { title: "TOTAL COMPLETED", count: 0, color: "success.main" },
//     { title: "TOTAL IN PROGRESS", count: 0, color: "primary.main" },
//     { title: "TOTAL NOT STARTED", count: 0, color: "warning.main" },
//     { title: "TOTAL ON HOLD", count: 0, color: "error.main" },
//   ];

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>Tasks</Typography>
//       <Grid container spacing={2}>
//         {taskStats.map((stat, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//               <Typography variant="subtitle2" color="text.secondary">{stat.title}</Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                 <Typography variant="h4" color={stat.color}>{stat.count}</Typography>
//                 <Box sx={{ ml: 1, color: 'text.secondary' }}>
//                   <AssignmentIcon />
//                 </Box>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//       <Paper sx={{ mt: 2, p: 2 }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>List of all Tasks</Typography>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <FormControl sx={{ minWidth: 120 }}>
//             <InputLabel id="entries-select-label">Show entries</InputLabel>
//             <Select
//               labelId="entries-select-label"
//               id="entries-select"
//               value={entries}
//               label="Show entries"
//               onChange={(e) => setEntries(e.target.value)}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
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
//               <TableRow>
//                 <TableCell>TITLE</TableCell>
//                 <TableCell>TEAM</TableCell>
//                 <TableCell>START DATE</TableCell>
//                 <TableCell>END DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>PROGRESS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell colSpan={6} align="center">No records available</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//           <Button variant="outlined" sx={{ mr: 1 }}>Previous</Button>
//           <Button variant="outlined">Next</Button>
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
  Button,
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
  useTheme,
  useMediaQuery,
  LinearProgress
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Add as AddIcon,
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
const dummyTasks = [
    { id: 1, title: 'Deploy New HR Module', team: 'Tech Ops', startDate: '2023-10-01', endDate: '2023-10-15', status: 'Completed', progress: 100 },
    { id: 2, title: 'Marketing Campaign for Q4', team: 'Marketing', startDate: '2023-10-05', endDate: '2023-11-05', status: 'In Progress', progress: 60 },
    { id: 3, title: 'Finalize Annual Budget', team: 'Finance', startDate: '2023-10-10', endDate: '2023-10-25', status: 'In Progress', progress: 85 },
    { id: 4, title: 'Plan Office Renovation', team: 'Admin', startDate: '2023-11-01', endDate: '2023-12-01', status: 'Not Started', progress: 0 },
    { id: 5, title: 'Server Maintenance', team: 'IT Support', startDate: '2023-10-20', endDate: '2023-10-22', status: 'On Hold', progress: 20 },
    { id: 6, title: 'Recruitment Drive Phase 2', team: 'Human Resources', startDate: '2023-10-15', endDate: '2023-11-15', status: 'In Progress', progress: 40 },
    { id: 7, title: 'Client Onboarding - Acme Corp', team: 'Customer Success', startDate: '2023-10-18', endDate: '2023-10-30', status: 'Completed', progress: 100 },
    { id: 8, title: 'Update Website UI/UX', team: 'Web Dev', startDate: '2023-11-05', endDate: '2023-12-05', status: 'Not Started', progress: 0 },
];

export default function TasksView() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setTimeout(() => {
      setTasks(dummyTasks);
      setLoading(false);
    }, 1500);
  }, []);

  const taskStats = [
    { title: "TOTAL COMPLETED", count: tasks.filter(t => t.status === 'Completed').length, color: "success.main" },
    { title: "TOTAL IN PROGRESS", count: tasks.filter(t => t.status === 'In Progress').length, color: "#8C257C" },
    { title: "TOTAL NOT STARTED", count: tasks.filter(t => t.status === 'Not Started').length, color: "warning.main" },
    { title: "TOTAL ON HOLD", count: tasks.filter(t => t.status === 'On Hold').length, color: "error.main" },
  ];

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddNewClick = () => { console.log("Add New Task clicked"); };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h5" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 2 }}>Tasks</Typography>
      
       <Grid container spacing={2} mb={3}>
        {taskStats.map((stat, index) => (
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
          <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} sx={{ width: isMobile ? '100%' : 'auto' }} />
        </Stack>

        <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#8C257C' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR. NO.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TITLE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TEAM</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>START DATE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>END DATE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>STATUS</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>PROGRESS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? ([...Array(rowsPerPage)].map((_, index) => (<TableRow key={index}><TableCell><Skeleton variant="text" width={40} /></TableCell><TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell><TableCell><Skeleton variant="text" width={80} /></TableCell><TableCell><Skeleton /></TableCell></TableRow>))) : 
               filteredTasks.length === 0 ? <TableRow><TableCell colSpan={7} align="center">No records available</TableCell></TableRow> : 
               (filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
                  <TableRow key={task.id} hover>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{task.title}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{task.team}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{formatDateForDisplay(task.startDate)}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{formatDateForDisplay(task.endDate)}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{task.status}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}><Box display="flex" alignItems="center"><Box width="100%" mr={1}><LinearProgress variant="determinate" value={task.progress} /></Box><Box minWidth={35}><Typography variant="body2" color="text.secondary">{`${task.progress}%`}</Typography></Box></Box></TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination rowsPerPageOptions={[5, 10, 15, 25]} component="div" count={filteredTasks.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>
    </Box>
  );
}