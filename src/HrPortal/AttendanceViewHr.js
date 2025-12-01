// import React, { useState } from 'react';
// import { 
//   Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, 
//   TableHead, TableRow, Dialog, DialogTitle, DialogContent, Grid, TextField, 
//   FormControl, InputLabel, Select, MenuItem, FormHelperText, IconButton,
//   Avatar, Chip
// } from '@mui/material';
// import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import CloseIcon from '@mui/icons-material/Close';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';



// const initialOnDutyReportData = [
//   {
//     id: 1,
//     name: 'Anagha Dolase',
//     email: 'anagha.dolase@tdtl.world',
//     date: '2024-10-30',
//     inTime: '09:57:21',
//     outTime: '',
//     reason: '',
//     wfh: '',
//     status: 'Pending',
//     avatar: '/placeholder.svg?height=40&width=40'
//   },
//   {
//     id: 2,
//     name: 'Gauri Shirole',
//     email: 'gauri.shirole@thedatatechlabs.com',
//     date: '2024-10-30',
//     inTime: '09:27:34',
//     outTime: '13:13:51',
//     reason: 'As per Office Diwali Festival',
//     wfh: 'Yes',
//     status: 'Pending',
//     avatar: '/placeholder.svg?height=40&width=40'
//   },
//   // ... (other data entries)
// ];

// export default function IntegratedAttendanceSystem() {
//   const [showOnDutyReport, setShowOnDutyReport] = useState(false);
//   const [entries, setEntries] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [onDutyReportData, setOnDutyReportData] = useState(initialOnDutyReportData);

//   const [openOnDutyRequestDialog, setOpenOnDutyRequestDialog] = useState(false);
//   const [openOnDutyReportDialog, setOpenOnDutyReportDialog] = useState(false);
//   const [onDutyRequestFormData, setOnDutyRequestFormData] = useState({
//     employeeName: 'John Doe',
//     date: null,
//     outTime: null,
//     odFrom: '',
//     reason: ''
//   });
//   const [onDutyReportFormData, setOnDutyReportFormData] = useState({
//     employeeName: 'John Doe',
//     date: null,
//     fromTime: null,
//     toTime: null,
//     reason: ''
//   });
//   const [tasks, setTasks] = useState([{ task: '', approvedBy: '', startTime: '', endTime: '' }]);
//   const [errors, setErrors] = useState({});

//   const attendanceData = [
//     { id: 1, name: 'Prasad Shinde', email: 'prasad.shinde@tdtl.world', date: '2024-10-08', status: 'Present', clockIn: '00:00', clockOut: '00:00', late: '00:00', earlyLeaving: '00:00', totalWork: '00:00' },
//   ];



//   const handleOpenOnDutyRequestDialog = () => {
//     setOpenOnDutyRequestDialog(true);
//   };


//   const handleCloseOnDutyRequestDialog = () => {
//     setOpenOnDutyRequestDialog(false);
//     setOnDutyRequestFormData({
//       employeeName: 'John Doe',
//       date: null,
//       outTime: null,
//       odFrom: '',
//       reason: ''
//     });
//     setTasks([{ task: '', approvedBy: '', startTime: '', endTime: '' }]);
//     setErrors({});
//   };


//   const handleOpenOnDutyReportDialog = () => {
//     setOpenOnDutyReportDialog(true);
//   };


//   const handleCloseOnDutyReportDialog = () => {
//     setOpenOnDutyReportDialog(false);
//     setOnDutyReportFormData({
//       employeeName: 'John Doe',
//       date: null,
//       fromTime: null,
//       toTime: null,
//       reason: ''
//     });
//     setErrors({});
//   };




//   const handleOnDutyRequestInputChange = (field, value) => {
//     setOnDutyRequestFormData(prevData => ({
//       ...prevData,
//       [field]: value
//     }));
//     if (errors[field]) {
//       setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
//     }
//   };



//   const handleOnDutyReportInputChange = (field, value) => {
//     setOnDutyReportFormData(prevData => ({
//       ...prevData,
//       [field]: value
//     }));
//     if (errors[field]) {
//       setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
//     }
//   };



//   const handleTaskChange = (index, field, value) => {
//     const newTasks = [...tasks];
//     newTasks[index][field] = value;
//     setTasks(newTasks);
//     if (errors.tasks) {
//       setErrors(prevErrors => ({ ...prevErrors, tasks: null }));
//     }
//   };



//   const handleAddMore = () => {
//     setTasks([...tasks, { task: '', approvedBy: '', startTime: '', endTime: '' }]);
//   };


//   const handleRemove = (index) => {
//     const newTasks = tasks.filter((_, i) => i !== index);
//     setTasks(newTasks);
//   };



//   const validateOnDutyRequestForm = () => {
//     const newErrors = {};
//     if (!onDutyRequestFormData.date) newErrors.date = 'Date is required';
//     if (!onDutyRequestFormData.outTime) newErrors.outTime = 'Out Time is required';
//     if (!onDutyRequestFormData.odFrom) newErrors.odFrom = 'OD From is required';
//     if (!onDutyRequestFormData.reason) newErrors.reason = 'Reason is required';
//     if (tasks.some(task => !task.task || !task.approvedBy || !task.startTime || !task.endTime)) {
//       newErrors.tasks = 'All task fields are required';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

  
//   const validateOnDutyReportForm = () => {
//     const newErrors = {};
//     if (!onDutyReportFormData.date) newErrors.date = 'Date is required';
//     if (!onDutyReportFormData.fromTime) newErrors.fromTime = 'From Time is required';
//     if (!onDutyReportFormData.toTime) newErrors.toTime = 'To Time is required';
//     if (!onDutyReportFormData.reason) newErrors.reason = 'Reason is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveOnDutyRequest = () => {
//     if (validateOnDutyRequestForm()) {
//       console.log('On Duty Request Form Data:', onDutyRequestFormData);
//       console.log('Tasks:', tasks);
//       handleCloseOnDutyRequestDialog();
//     }
//   };

//   const handleSaveOnDutyReport = () => {
//     if (validateOnDutyReportForm()) {
//       console.log('On Duty Report Form Data:', onDutyReportFormData);
//       handleCloseOnDutyReportDialog();
//     }
//   };


//   const filteredData = onDutyReportData.filter((item) =>
//     Object.values(item).some((value) =>
//       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const startIndex = (currentPage - 1) * entries;
//   const paginatedData = filteredData.slice(startIndex, startIndex + entries);
//   const totalPages = Math.ceil(filteredData.length / entries);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ mt: 2 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h4">Attendance</Typography>
//           <Box>
//             <Button variant="outlined" sx={{ mr: 1 }} onClick={handleOpenOnDutyRequestDialog}>On Duty Request</Button>
//             <Button variant="outlined" onClick={() => setShowOnDutyReport(!showOnDutyReport)}>
//               {showOnDutyReport ? 'Show Attendance' : 'On Duty Report'}
//             </Button>
//           </Box>
//         </Box>

//         {!showOnDutyReport ? (
//           <Paper sx={{ width: '100%', mb: 2 }}>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>EMPLOYEE</TableCell>
//                     <TableCell>DATE</TableCell>
//                     <TableCell>STATUS</TableCell>
//                     <TableCell>CLOCK IN</TableCell>
//                     <TableCell>CLOCK OUT</TableCell>
//                     <TableCell>LATE</TableCell>
//                     <TableCell>EARLY LEAVING</TableCell>
//                     <TableCell>TOTAL WORK</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {attendanceData.map((row) => (
//                     <TableRow key={row.id}>
//                       <TableCell>
//                         <Typography variant="body1">{row.name}</Typography>
//                         <Typography variant="body2" color="textSecondary">{row.email}</Typography>
//                       </TableCell>
//                       <TableCell>{row.date}</TableCell>
//                       <TableCell>
//                         <Box sx={{ bgcolor: 'success.main', color: 'white', px: 1, py: 0.5, borderRadius: '16px', display: 'inline-block' }}>
//                           {row.status}
//                         </Box>
//                       </TableCell>
//                       <TableCell>{row.clockIn}</TableCell>
//                       <TableCell>{row.clockOut}</TableCell>
//                       <TableCell>{row.late}</TableCell>
//                       <TableCell>{row.earlyLeaving}</TableCell>
//                       <TableCell>{row.totalWork}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         ) : (
//           <Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography>Show</Typography>
//                 <Select
//                   size="small"
//                   value={entries}
//                   onChange={(e) => setEntries(Number(e.target.value))}
//                   sx={{ minWidth: 80 }}
//                 >
//                   <MenuItem value={2}>2</MenuItem>
//                   <MenuItem value={5}>5</MenuItem>
//                   <MenuItem value={10}>10</MenuItem>
//                 </Select>
//                 <Typography>entries</Typography>
//               </Box>
//               <TextField
//                 size="small"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </Box>

//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>EMPLOYEE</TableCell>
//                     <TableCell>DATE</TableCell>
//                     <TableCell>IN-TIME</TableCell>
//                     <TableCell>OUT-TIME</TableCell>
//                     <TableCell>REASON</TableCell>
//                     <TableCell>WFH</TableCell>
//                     <TableCell>STATUS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedData.map((row) => (
//                     <TableRow key={row.id}>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                           <Avatar src={row.avatar} alt={row.name} />
//                           <Box>
//                             <Typography variant="body1">{row.name}</Typography>
//                             <Typography variant="body2" color="textSecondary">
//                               {row.email}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>{row.date}</TableCell>
//                       <TableCell>{row.inTime}</TableCell>
//                       <TableCell>{row.outTime}</TableCell>
//                       <TableCell>{row.reason}</TableCell>
//                       <TableCell>{row.wfh}</TableCell>
//                       <TableCell>
//                         <Chip
//                           label={row.status}
//                           color="warning"
//                           size="small"
//                           sx={{
//                             backgroundColor: '#ff9800',
//                             color: 'white',
//                             borderRadius: '16px',
//                             fontSize: '0.75rem',
//                           }}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
//               <Button
//                 variant="outlined"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((prev) => prev - 1)}
//               >
//                 Previous
//               </Button>
//               <Typography>
//                 Page {currentPage} of {totalPages}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage((prev) => prev + 1)}
//               >
//                 Next
//               </Button>
//             </Box>
//           </Box>
//         )}

//         {/* On Duty Request Dialog */}
//         <Dialog open={openOnDutyRequestDialog} onClose={handleCloseOnDutyRequestDialog} maxWidth="md" fullWidth>
//           <DialogTitle>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="h6">Add On Duty Attendance</Typography>
//               <IconButton onClick={handleCloseOnDutyRequestDialog} size="small">
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Employee Name"
//                   value={onDutyRequestFormData.employeeName}
//                   disabled
//                   margin="normal"
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <DatePicker
//                   label="Date"
//                   value={onDutyRequestFormData.date}
//                   onChange={(newDate) => handleOnDutyRequestInputChange('date', newDate)}
//                   renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.date} helperText={errors.date} />}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TimePicker
//                   label="Out Time"
//                   value={onDutyRequestFormData.outTime}
//                   onChange={(newTime) => handleOnDutyRequestInputChange('outTime', newTime)}
//                   renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.outTime} helperText={errors.outTime} />}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth error={!!errors.odFrom}>
//                   <InputLabel>OD From</InputLabel>
//                   <Select
//                     value={onDutyRequestFormData.odFrom}
//                     onChange={(e) => handleOnDutyRequestInputChange('odFrom', e.target.value)}
//                     label="OD From"
//                   >
//                     <MenuItem value="office">Office</MenuItem>
//                     <MenuItem value="client">Client Location</MenuItem>
//                     <MenuItem value="WOF">Work From Office</MenuItem>             
//                     <MenuItem value="WOH">Work From Home</MenuItem>
//                   </Select>
//                   {errors.odFrom && <FormHelperText>{errors.odFrom}</FormHelperText>}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Reason"
//                   value={onDutyRequestFormData.reason}
//                   onChange={(e) => handleOnDutyRequestInputChange('reason', e.target.value)}
//                   error={!!errors.reason}
//                   helperText={errors.reason}
//                   multiline
//                   rows={2}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
//                   Note: This should match with microsoft planner task.
//                 </Typography>
//               </Grid>
//               {tasks.map((task, index) => (
//                 <Grid item xs={12} key={index} container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Task"
//                       value={task.task}
//                       onChange={(e) => handleTaskChange(index, 'task', e.target.value)}
//                       multiline
//                       rows={2}
//                     />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <TextField
//                       fullWidth
//                       label="Task to be Approved By"
//                       value={task.approvedBy}
//                       onChange={(e) => handleTaskChange(index, 'approvedBy', e.target.value)}
//                     />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <TextField
//                       fullWidth
//                       label="Start Time"
//                       value={task.startTime}
//                       onChange={(e) => handleTaskChange(index, 'startTime', e.target.value)}
//                     />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <TextField
//                       fullWidth
//                       label="End Time"
//                       value={task.endTime}
//                       onChange={(e) => handleTaskChange(index, 'endTime', e.target.value)}
//                     />
//                   </Grid>
//                   {index > 0 && (
//                     <Grid item xs={12}>
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         startIcon={<RemoveIcon />}
//                         onClick={() => handleRemove(index)}
//                       >
//                         Remove
//                       </Button>
//                     </Grid>
//                   )}
//                 </Grid>
//               ))}
//               {errors.tasks && (
//                 <Grid item xs={12}>
//                   <Typography color="error" variant="caption">
//                     {errors.tasks}
//                   </Typography>
//                 </Grid>
//               )}
//               <Grid item xs={12}>
//                 <Box display="flex" gap={2}>
//                   <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleAddMore}>
//                     Add More
//                   </Button>
//                   <Button variant="contained" color="primary" onClick={handleSaveOnDutyRequest}>
//                     Save
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//         </Dialog>

//         {/* On Duty Report Dialog */}
//         <Dialog open={openOnDutyReportDialog} onClose={handleCloseOnDutyReportDialog} maxWidth="sm" fullWidth>
//           <DialogTitle>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="h6">Add Outdoor Duty Attendance</Typography>
//               <IconButton onClick={handleCloseOnDutyReportDialog} size="small">
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Employee Name"
//                   value={onDutyReportFormData.employeeName}
//                   disabled
//                   margin="normal"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <DatePicker
//                   label="Date"
//                   value={onDutyReportFormData.date}
//                   onChange={(newDate) => handleOnDutyReportInputChange('date', newDate)}
//                   renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.date} helperText={errors.date} />}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TimePicker
//                   label="From Time"
//                   value={onDutyReportFormData.fromTime}
//                   onChange={(newTime) => handleOnDutyReportInputChange('fromTime', newTime)}
//                   renderInput={(params) => 
//                     <TextField 
//                       {...params} 
//                       fullWidth 
//                       margin="normal"
//                       error={!!errors.fromTime}
//                       helperText={errors.fromTime}
//                     />
//                   }
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TimePicker
//                   label="To Time"
//                   value={onDutyReportFormData.toTime}
//                   onChange={(newTime) => handleOnDutyReportInputChange('toTime', newTime)}
//                   renderInput={(params) => 
//                     <TextField 
//                       {...params} 
//                       fullWidth 
//                       margin="normal"
//                       error={!!errors.toTime}
//                       helperText={errors.toTime}
//                     />
//                   }
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Reason"
//                   value={onDutyReportFormData.reason}
//                   onChange={(e) => handleOnDutyReportInputChange('reason', e.target.value)}
//                   error={!!errors.reason}
//                   helperText={errors.reason}
//                   multiline
//                   rows={3}
//                   margin="normal"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
//                   <Button variant="contained" color="primary" onClick={handleSaveOnDutyReport}>
//                     Save
//                   </Button>
//                   <Button variant="outlined" onClick={handleCloseOnDutyReportDialog}>
//                     Close
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </LocalizationProvider>
//   );
// }


import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Select,
  MenuItem, TextField, CircularProgress, Alert
} from '@mui/material';

// Helper function to determine the color of the status badge
const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'present':
      return { bgcolor: 'success.main', color: 'white' };
    case 'absent':
      return { bgcolor: 'error.main', color: 'white' };
    case 'on leave':
      return { bgcolor: 'info.main', color: 'white' };
    default:
      return { bgcolor: 'grey.500', color: 'white' };
  }
};

export default function IntegratedAttendanceSystem() {
  // State for API data, loading, and errors
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for table controls
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data on component mount using the new authenticated pattern
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Get user ID and access token from local storage
        const loggedInUserId = localStorage.getItem('loggedInUser'); // Or 'employee_id' if that's the correct key
        const accessToken = localStorage.getItem('accessToken');

        // 2. Validate that credentials exist
        if (!loggedInUserId || !accessToken) {
          throw new Error("User session details not found. Please log in again.");
        }

        // 3. Construct the API URL and Headers
        const apiUrl = `https://tdtlworld.com/hrms-backend/my_attendance/${loggedInUserId}/`;
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        };

        // 4. Fetch data from the API with authorization
        const response = await fetch(apiUrl, { method: 'GET', headers });

        if (!response.ok) {
          throw new Error(`Failed to fetch attendance data. Server responded with status ${response.status}.`);
        }

        const data = await response.json();

        // Assuming the data is in an "attendance" key
        if (data && Array.isArray(data.attendance)) {
          setAttendanceData(data.attendance);
        } else {
          setAttendanceData([]);
          console.warn("API response did not contain a valid 'attendance' array:", data);
        }
      } catch (err) {
        console.error("Error fetching attendance data:", err);
        setError(err.message || 'An unexpected error occurred.');
        setAttendanceData([]); // Clear data on error
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Memoized filtering and pagination logic for performance
  const filteredData = useMemo(() => {
    return attendanceData.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [attendanceData, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / entries);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entries;
    return filteredData.slice(startIndex, startIndex + entries);
  }, [filteredData, currentPage, entries]);

  // Reset to page 1 if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entries]);

  const renderTableContent = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={8}>
            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
          </TableCell>
        </TableRow>
      );
    }

    if (paginatedData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
            <Typography>No attendance records found.</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableBody>
        {paginatedData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Typography variant="body1">{row.employee_name}</Typography>
              <Typography variant="body2" color="textSecondary">{row.employee_email}</Typography>
            </TableCell>
            <TableCell>{row.attendance_date}</TableCell>
            <TableCell>
              <Box sx={{
                ...getStatusStyle(row.status),
                px: 1.5,
                py: 0.5,
                borderRadius: '16px',
                display: 'inline-block',
                textAlign: 'center',
                minWidth: '70px'
              }}>
                {row.status}
              </Box>
            </TableCell>
            {/* <TableCell>{row.clock_in.toLocaleTimeString()}</TableCell>
            <TableCell>{row.clock_out.toLocaleTimeString()}</TableCell> */}
            <TableCell>{new Date(Date.UTC(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
              ...row.clock_in.split(':').map(Number)
            )).toLocaleTimeString()}</TableCell>
            <TableCell>{new Date(Date.UTC(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
              ...row.clock_out.split(':').map(Number)
            )).toLocaleTimeString()}</TableCell>
            <TableCell>{row.late_mark}</TableCell>
            <TableCell>{row.early_mark}</TableCell>
            <TableCell>{row.total_work}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Today's Attendance</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography>Show</Typography>
          <Select
            size="small"
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            sx={{ minWidth: 80 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <Typography>entries</Typography>
        </Box>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 'bold' } }}>
                <TableCell>EMPLOYEE</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>CLOCK IN</TableCell>
                <TableCell>CLOCK OUT</TableCell>
                <TableCell>LATE</TableCell>
                <TableCell>EARLY LEAVING</TableCell>
                <TableCell>TOTAL WORK</TableCell>
              </TableRow>
            </TableHead>
            {renderTableContent()}
          </Table>
        </TableContainer>
      </Paper>

      {!loading && !error && filteredData.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography>
            Showing {Math.min((currentPage - 1) * entries + 1, filteredData.length)} to {Math.min(currentPage * entries, filteredData.length)} of {filteredData.length} entries
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}