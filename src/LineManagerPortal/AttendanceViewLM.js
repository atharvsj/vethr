// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios'; // Ensure you have axios installed
// // // // // import {
// // // // //   Box, Typography, Button, Paper, Table, TableBody, TableCell,
// // // // //   TableContainer, TableHead, TableRow, TextField, Select, MenuItem,
// // // // // } from '@mui/material';

// // // // // export default function IntegratedAttendanceSystem() {
// // // // //   const [attendanceData, setAttendanceData] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     const fetchAttendance = async () => {
// // // // //       try {
// // // // //         setLoading(true);
// // // // //         const response = await axios.get('http://192.168.29.113:8000/today-attendence/');
// // // // //         setAttendanceData(response.data);
// // // // //         setLoading(false);
// // // // //       } catch (err) {
// // // // //         console.error('Error fetching attendance data:', err);
// // // // //         setError('Failed to fetch attendance data.');
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchAttendance();
// // // // //   }, []);

// // // // //   if (loading) return <Typography>Loading attendance data...</Typography>;
// // // // //   if (error) return <Typography color="error">{error}</Typography>;

// // // // //   return (
// // // // //     <Box sx={{ mt: 2 }}>
// // // // //       <Typography variant="h4">Attendance</Typography>
// // // // //       <Paper sx={{ width: '100%', mt: 2 }}>
// // // // //         <TableContainer>
// // // // //           <Table>
// // // // //             <TableHead>
// // // // //               <TableRow>
// // // // //                 <TableCell>Employee Name</TableCell>
// // // // //                 <TableCell>Email</TableCell>
// // // // //                 <TableCell>Date</TableCell>
// // // // //                 <TableCell>Status</TableCell>
// // // // //                 <TableCell>Clock In</TableCell>
// // // // //                 <TableCell>Clock Out</TableCell>
// // // // //               </TableRow>
// // // // //             </TableHead>
// // // // //             <TableBody>
// // // // //               {attendanceData.map((row) => (
// // // // //                 <TableRow key={row.id}>
// // // // //                   <TableCell>{row.name}</TableCell>
// // // // //                   <TableCell>{row.email}</TableCell>
// // // // //                   <TableCell>{row.date}</TableCell>
// // // // //                   <TableCell>{row.status}</TableCell>
// // // // //                   <TableCell>{row.clockIn}</TableCell>
// // // // //                   <TableCell>{row.clockOut}</TableCell>
// // // // //                 </TableRow>
// // // // //               ))}
// // // // //             </TableBody>
// // // // //           </Table>
// // // // //         </TableContainer>
// // // // //       </Paper>
// // // // //     </Box>
// // // // //   );
// // // // // }




// // // // import React, { useState } from 'react';
// // // // import { 
// // // //   Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, 
// // // //   TableHead, TableRow, Dialog, DialogTitle, DialogContent, Grid, TextField, 
// // // //   FormControl, InputLabel, Select, MenuItem, FormHelperText, IconButton,
// // // //   Avatar, Chip
// // // // } from '@mui/material';
// // // // import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// // // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // // import CloseIcon from '@mui/icons-material/Close';
// // // // import AddIcon from '@mui/icons-material/Add';
// // // // import RemoveIcon from '@mui/icons-material/Remove';

// // // // const initialOnDutyReportData = [
// // // //   {
// // // //     id: 1,
// // // //     name: 'Sarthak Shilwant',
// // // //     email: 'sarthak.shilwant@tdtl.world',
// // // //     date: '2024-10-30',
// // // //     inTime: '09:57:21',
// // // //     outTime: '',
// // // //     reason: '',
// // // //     wfh: 'Kothrud',
// // // //     status: 'Pending',
// // // //     avatar: '/placeholder.svg?height=40&width=40'
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     name: 'Ashish Shinde',
// // // //     email: 'ashish.shinde@thedatatechlabs.com',
// // // //     date: '2024-10-30',
// // // //     inTime: '00:00:00',
// // // //     outTime: '00:00:00',
// // // //     reason: '',
// // // //     wfh: 'No',
// // // //     status: 'Absent',
// // // //     avatar: '/placeholder.svg?height=40&width=40'
// // // //   },
// // // //   // ... (other data entries)
// // // // ];

// // // // export default function IntegratedAttendanceSystem() {
// // // //   const [showOnDutyReport, setShowOnDutyReport] = useState(false);
// // // //   const [entries, setEntries] = useState(10);
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [onDutyReportData, setOnDutyReportData] = useState(initialOnDutyReportData);

// // // //   const [openOnDutyRequestDialog, setOpenOnDutyRequestDialog] = useState(false);
// // // //   const [openOnDutyReportDialog, setOpenOnDutyReportDialog] = useState(false);
// // // //   const [onDutyRequestFormData, setOnDutyRequestFormData] = useState({
// // // //     employeeName: 'Prasad Shinde',
// // // //     date: null,
// // // //     outTime: null,
// // // //     odFrom: '',
// // // //     reason: ''
// // // //   });
// // // //   const [onDutyReportFormData, setOnDutyReportFormData] = useState({
// // // //     employeeName: 'Prasad Shinde',
// // // //     date: null,
// // // //     fromTime: null,
// // // //     toTime: null,
// // // //     reason: ''
// // // //   });
// // // //   const [tasks, setTasks] = useState([{ task: '', approvedBy: '', startTime: '', endTime: '' }]);
// // // //   const [errors, setErrors] = useState({});

// // // //   const attendanceData = [
// // // //     { id: 1, name: 'Prasad Shinde', email: 'prasad.shinde@tdtl.world', date: '2024-10-08', status: 'Present', clockIn: '09:28', clockOut: '00:00', late: '00:00', earlyLeaving: '00:00', totalWork: '00:00' },
// // // //     { id: 2, name: 'Anagha Dolase', email: 'angha.dolase@tdtl.world', date: '2024-10-08', status: 'Present', clockIn: '09:36', clockOut: '00:00', late: '00:00', earlyLeaving: '00:00', totalWork: '00:00' },
// // // //     { id: 3, name: 'QADIRULLA HUSSAINI SYED', email: 'qadirulla.hussaini@tdtl.world', date: '2024-10-08', status: 'Present', clockIn: '09:39', clockOut: '00:00', late: '00:00', earlyLeaving: '00:00', totalWork: '00:00' },
// // // //   ];

// // // //   const handleOpenOnDutyRequestDialog = () => {
// // // //     setOpenOnDutyRequestDialog(true);
// // // //   };

// // // //   const handleCloseOnDutyRequestDialog = () => {
// // // //     setOpenOnDutyRequestDialog(false);
// // // //     setOnDutyRequestFormData({
// // // //       employeeName: 'John Doe',
// // // //       date: null,
// // // //       outTime: null,
// // // //       odFrom: '',
// // // //       reason: ''
// // // //     });
// // // //     setTasks([{ task: '', approvedBy: '', startTime: '', endTime: '' }]);
// // // //     setErrors({});
// // // //   };

// // // //   const handleOpenOnDutyReportDialog = () => {
// // // //     setOpenOnDutyReportDialog(true);
// // // //   };

// // // //   const handleCloseOnDutyReportDialog = () => {
// // // //     setOpenOnDutyReportDialog(false);
// // // //     setOnDutyReportFormData({
// // // //       employeeName: 'John Doe',
// // // //       date: null,
// // // //       fromTime: null,
// // // //       toTime: null,
// // // //       reason: ''
// // // //     });
// // // //     setErrors({});
// // // //   };

// // // //   const handleOnDutyRequestInputChange = (field, value) => {
// // // //     setOnDutyRequestFormData(prevData => ({
// // // //       ...prevData,
// // // //       [field]: value
// // // //     }));
// // // //     if (errors[field]) {
// // // //       setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
// // // //     }
// // // //   };

// // // //   const handleOnDutyReportInputChange = (field, value) => {
// // // //     setOnDutyReportFormData(prevData => ({
// // // //       ...prevData,
// // // //       [field]: value
// // // //     }));
// // // //     if (errors[field]) {
// // // //       setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
// // // //     }
// // // //   };

// // // //   const handleTaskChange = (index, field, value) => {
// // // //     const newTasks = [...tasks];
// // // //     newTasks[index][field] = value;
// // // //     setTasks(newTasks);
// // // //     if (errors.tasks) {
// // // //       setErrors(prevErrors => ({ ...prevErrors, tasks: null }));
// // // //     }
// // // //   };

// // // //   const handleAddMore = () => {
// // // //     setTasks([...tasks, { task: '', approvedBy: '', startTime: '', endTime: '' }]);
// // // //   };

// // // //   const handleRemove = (index) => {
// // // //     const newTasks = tasks.filter((_, i) => i !== index);
// // // //     setTasks(newTasks);
// // // //   };

// // // //   const validateOnDutyRequestForm = () => {
// // // //     const newErrors = {};
// // // //     if (!onDutyRequestFormData.date) newErrors.date = 'Date is required';
// // // //     if (!onDutyRequestFormData.outTime) newErrors.outTime = 'Out Time is required';
// // // //     if (!onDutyRequestFormData.odFrom) newErrors.odFrom = 'OD From is required';
// // // //     if (!onDutyRequestFormData.reason) newErrors.reason = 'Reason is required';
// // // //     if (tasks.some(task => !task.task || !task.approvedBy || !task.startTime || !task.endTime)) {
// // // //       newErrors.tasks = 'All task fields are required';
// // // //     }
// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   const validateOnDutyReportForm = () => {
// // // //     const newErrors = {};
// // // //     if (!onDutyReportFormData.date) newErrors.date = 'Date is required';
// // // //     if (!onDutyReportFormData.fromTime) newErrors.fromTime = 'From Time is required';
// // // //     if (!onDutyReportFormData.toTime) newErrors.toTime = 'To Time is required';
// // // //     if (!onDutyReportFormData.reason) newErrors.reason = 'Reason is required';
// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   const handleSaveOnDutyRequest = () => {
// // // //     if (validateOnDutyRequestForm()) {
// // // //       console.log('On Duty Request Form Data:', onDutyRequestFormData);
// // // //       console.log('Tasks:', tasks);
// // // //       handleCloseOnDutyRequestDialog();
// // // //     }
// // // //   };

// // // //   const handleSaveOnDutyReport = () => {
// // // //     if (validateOnDutyReportForm()) {
// // // //       console.log('On Duty Report Form Data:', onDutyReportFormData);
// // // //       handleCloseOnDutyReportDialog();
// // // //     }
// // // //   };

// // // //   const filteredData = onDutyReportData.filter((item) =>
// // // //     Object.values(item).some((value) =>
// // // //       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
// // // //     )
// // // //   );

// // // //   const startIndex = (currentPage - 1) * entries;
// // // //   const paginatedData = filteredData.slice(startIndex, startIndex + entries);
// // // //   const totalPages = Math.ceil(filteredData.length / entries);

// // // //   return (
// // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // //       <Box sx={{ mt: 2 }}>
// // // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // // //           <Typography variant="h4">Attendance</Typography>
// // // //           <Box>
// // // //             <Button variant="outlined" sx={{ mr: 1 }} onClick={handleOpenOnDutyRequestDialog}>On Duty Request</Button>
// // // //             <Button variant="outlined" onClick={() => setShowOnDutyReport(!showOnDutyReport)}>
// // // //               {showOnDutyReport ? 'Show Attendance' : 'On Duty Report'}
// // // //             </Button>
// // // //           </Box>
// // // //         </Box>

// // // //         {!showOnDutyReport ? (
// // // //           <Paper sx={{ width: '100%', mb: 2 }}>
// // // //             <TableContainer>
// // // //               <Table>
// // // //                 <TableHead>
// // // //                   <TableRow>
// // // //                     <TableCell>EMPLOYEE</TableCell>
// // // //                     <TableCell>DATE</TableCell>
// // // //                     <TableCell>STATUS</TableCell>
// // // //                     <TableCell>CLOCK IN</TableCell>
// // // //                     <TableCell>CLOCK OUT</TableCell>
// // // //                     <TableCell>LATE</TableCell>
// // // //                     <TableCell>EARLY LEAVING</TableCell>
// // // //                     <TableCell>TOTAL WORK</TableCell>
// // // //                   </TableRow>
// // // //                 </TableHead>
// // // //                 <TableBody>
// // // //                   {attendanceData.map((row) => (
// // // //                     <TableRow key={row.id}>
// // // //                       <TableCell>
// // // //                         <Typography variant="body1">{row.name}</Typography>
// // // //                         <Typography variant="body2" color="textSecondary">{row.email}</Typography>
// // // //                       </TableCell>
// // // //                       <TableCell>{row.date}</TableCell>
// // // //                       <TableCell>
// // // //                         <Box sx={{ bgcolor: 'success.main', color: 'white', px: 1, py: 0.5, borderRadius: '16px', display: 'inline-block' }}>
// // // //                           {row.status}
// // // //                         </Box>
// // // //                       </TableCell>
// // // //                       <TableCell>{row.clockIn}</TableCell>
// // // //                       <TableCell>{row.clockOut}</TableCell>
// // // //                       <TableCell>{row.late}</TableCell>
// // // //                       <TableCell>{row.earlyLeaving}</TableCell>
// // // //                       <TableCell>{row.totalWork}</TableCell>
// // // //                     </TableRow>
// // // //                   ))}
// // // //                 </TableBody>
// // // //               </Table>
// // // //             </TableContainer>
// // // //           </Paper>
// // // //         ) : (
// // // //           <Box>
// // // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // // //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // // //                 <Typography>Show</Typography>
// // // //                 <Select
// // // //                   size="small"
// // // //                   value={entries}
// // // //                   onChange={(e) => setEntries(Number(e.target.value))}
// // // //                   sx={{ minWidth: 80 }}
// // // //                 >
// // // //                   <MenuItem value={2}>2</MenuItem>
// // // //                   <MenuItem value={5}>5</MenuItem>
// // // //                   <MenuItem value={10}>10</MenuItem>
// // // //                 </Select>
// // // //                 <Typography>entries</Typography>
// // // //               </Box>
// // // //               <TextField
// // // //                 size="small"
// // // //                 placeholder="Search..."
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //             </Box>

// // // //             <TableContainer component={Paper}>
// // // //               <Table>
// // // //                 <TableHead>
// // // //                   <TableRow>
// // // //                     <TableCell>EMPLOYEE</TableCell>
// // // //                     <TableCell>DATE</TableCell>
// // // //                     <TableCell>IN-TIME</TableCell>
// // // //                     <TableCell>OUT-TIME</TableCell>
// // // //                     <TableCell>REASON</TableCell>
// // // //                     <TableCell>WFH</TableCell>
// // // //                     <TableCell>STATUS</TableCell>
// // // //                   </TableRow>
// // // //                 </TableHead>
// // // //                 <TableBody>
// // // //                   {paginatedData.map((row) => (
// // // //                     <TableRow key={row.id}>
// // // //                       <TableCell>
// // // //                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // // //                           <Avatar src={row.avatar} alt={row.name} />
// // // //                           <Box>
// // // //                             <Typography variant="body1">{row.name}</Typography>
// // // //                             <Typography variant="body2" color="textSecondary">
// // // //                               {row.email}
// // // //                             </Typography>
// // // //                           </Box>
// // // //                         </Box>
// // // //                       </TableCell>
// // // //                       <TableCell>{row.date}</TableCell>
// // // //                       <TableCell>{row.inTime}</TableCell>
// // // //                       <TableCell>{row.outTime}</TableCell>
// // // //                       <TableCell>{row.reason}</TableCell>
// // // //                       <TableCell>{row.wfh}</TableCell>
// // // //                       <TableCell>
// // // //                         <Chip
// // // //                           label={row.status}
// // // //                           color="warning"
// // // //                           size="small"
// // // //                           sx={{
// // // //                             backgroundColor: '#ff9800',
// // // //                             color: 'white',
// // // //                             borderRadius: '16px',
// // // //                             fontSize: '0.75rem',
// // // //                           }}
// // // //                         />
// // // //                       </TableCell>
// // // //                     </TableRow>
// // // //                   ))}
// // // //                 </TableBody>
// // // //               </Table>
// // // //             </TableContainer>

// // // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
// // // //               <Button
// // // //                 variant="outlined"
// // // //                 disabled={currentPage === 1}
// // // //                 onClick={() => setCurrentPage((prev) => prev - 1)}
// // // //               >
// // // //                 Previous
// // // //               </Button>
// // // //               <Typography>
// // // //                 Page {currentPage} of {totalPages}
// // // //               </Typography>
// // // //               <Button
// // // //                 variant="outlined"
// // // //                 disabled={currentPage === totalPages}
// // // //                 onClick={() => setCurrentPage((prev) => prev + 1)}
// // // //               >
// // // //                 Next
// // // //               </Button>
// // // //             </Box>
// // // //           </Box>
// // // //         )}

// // // //         {/* On Duty Request Dialog */}
// // // //         <Dialog open={openOnDutyRequestDialog} onClose={handleCloseOnDutyRequestDialog} maxWidth="md" fullWidth>
// // // //           <DialogTitle>
// // // //             <Box display="flex" justifyContent="space-between" alignItems="center">
// // // //               <Typography variant="h6">Add On Duty Attendance</Typography>
// // // //               <IconButton onClick={handleCloseOnDutyRequestDialog} size="small">
// // // //                 <CloseIcon />
// // // //               </IconButton>
// // // //             </Box>
// // // //           </DialogTitle>
// // // //           <DialogContent>
// // // //             <Grid container spacing={3}>
// // // //               <Grid item xs={12}>
// // // //                 <TextField
// // // //                   fullWidth
// // // //                   label="Employee Name"
// // // //                   value={onDutyRequestFormData.employeeName}
// // // //                   disabled
// // // //                   margin="normal"
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={6}>
// // // //                 <DatePicker
// // // //                   label="Date"
// // // //                   value={onDutyRequestFormData.date}
// // // //                   onChange={(newDate) => handleOnDutyRequestInputChange('date', newDate)}
// // // //                   renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.date} helperText={errors.date} />}
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={6}>
// // // //                 <TimePicker
// // // //                   label="Out Time"
// // // //                   value={onDutyRequestFormData.outTime}
// // // //                   onChange={(newTime) => handleOnDutyRequestInputChange('outTime', newTime)}
// // // //                   renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.outTime} helperText={errors.outTime} />}
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={12}>
// // // //                 <FormControl fullWidth error={!!errors.odFrom}>
// // // //                   <InputLabel>OD From</InputLabel>
// // // //                   <Select
// // // //                     value={onDutyRequestFormData.odFrom}
// // // //                     onChange={(e) => handleOnDutyRequestInputChange('odFrom', e.target.value)}
// // // //                     label="OD From"
// // // //                   >
// // // //                     <MenuItem value="office">Office</MenuItem>
// // // //                     <MenuItem value="client">Client Location</MenuItem>
// // // //                     <MenuItem value="WOF">Work From Office</MenuItem>             
// // // //                     <MenuItem value="WOH">Work From Home</MenuItem>
// // // //                   </Select>
// // // //                   {errors.odFrom && <FormHelperText>{errors.odFrom}</FormHelperText>}
// // // //                 </FormControl>
// // // //               </Grid>
// // // //               <Grid item xs={12}>
// // // //                 <TextField
// // // //                   fullWidth
// // // //                   label="Reason"
// // // //                   value={onDutyRequestFormData.reason}
// // // //                   onChange={(e) => handleOnDutyRequestInputChange('reason', e.target.value)}
// // // //                   error={!!errors.reason}
// // // //                   helperText={errors.reason}
// // // //                   multiline
// // // //                   rows={2}
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={12}>
// // // //                 <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
// // // //                   Note: This should match with microsoft planner task.
// // // //                 </Typography>
// // // //               </Grid>
// // // //               {tasks.map((task, index) => (
// // // //                 <Grid item xs={12} key={index} container spacing={2}>
// // // //                   <Grid item xs={12}>
// // // //                     <TextField
// // // //                       fullWidth
// // // //                       label="Task"
// // // //                       value={task.task}
// // // //                       onChange={(e) => handleTaskChange(index, 'task', e.target.value)}
// // // //                       multiline
// // // //                       rows={2}
// // // //                     />
// // // //                   </Grid>
// // // //                   <Grid item xs={4}>
// // // //                     <TextField
// // // //                       fullWidth
// // // //                       label="Task to be Approved By"
// // // //                       value={task.approvedBy}
// // // //                       onChange={(e) => handleTaskChange(index, 'approvedBy', e.target.value)}
// // // //                     />
// // // //                   </Grid>
// // // //                   <Grid item xs={4}>
// // // //                     <TextField
// // // //                       fullWidth
// // // //                       label="Start Time"
// // // //                       value={task.startTime}
// // // //                       onChange={(e) => handleTaskChange(index, 'startTime', e.target.value)}
// // // //                     />
// // // //                   </Grid>
// // // //                   <Grid item xs={4}>
// // // //                     <TextField
// // // //                       fullWidth
// // // //                       label="End Time"
// // // //                       value={task.endTime}
// // // //                       onChange={(e) => handleTaskChange(index, 'endTime', e.target.value)}
// // // //                     />
// // // //                   </Grid>
// // // //                   {index > 0 && (
// // // //                     <Grid item xs={12}>
// // // //                       <Button
// // // //                         variant="outlined"
// // // //                         color="error"
// // // //                         startIcon={<RemoveIcon />}
// // // //                         onClick={() => handleRemove(index)}
// // // //                       >
// // // //                         Remove
// // // //                       </Button>
// // // //                     </Grid>
// // // //                   )}
// // // //                 </Grid>
// // // //               ))}
// // // //               {errors.tasks && (
// // // //                 <Grid item xs={12}>
// // // //                   <Typography color="error" variant="caption">
// // // //                     {errors.tasks}
// // // //                   </Typography>
// // // //                 </Grid>
// // // //               )}
// // // //               <Grid item xs={12}>
// // // //                 <Box display="flex" gap={2}>
// // // //                   <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleAddMore}>
// // // //                     Add More
// // // //                   </Button>
// // // //                   <Button variant="contained" color="primary" onClick={handleSaveOnDutyRequest}>
// // // //                     Save
// // // //                   </Button>
// // // //                 </Box>
// // // //               </Grid>
// // // //             </Grid>
// // // //           </DialogContent>
// // // //         </Dialog>

// // // //         {/* On Duty Report Dialog */}
// // // //         <Dialog open={openOnDutyReportDialog} onClose={handleCloseOnDutyReportDialog} maxWidth="sm" fullWidth>
// // // //           <DialogTitle>
// // // //             <Box display="flex" justifyContent="space-between" alignItems="center">
// // // //               <Typography variant="h6">Add Outdoor Duty Attendance</Typography>
// // // //               <IconButton onClick={handleCloseOnDutyReportDialog} size="small">
// // // //                 <CloseIcon />
// // // //               </IconButton>
// // // //             </Box>
// // // //           </DialogTitle>
// // // //           <DialogContent>
// // // //             <Grid container spacing={3}>
// // // //               <Grid item xs={12}>
// // // //                 <TextField
// // // //                   fullWidth
// // // //                   label="Employee Name"
// // // //                   value={onDutyReportFormData.employeeName}
// // // //                   disabled
// // // //                   margin="normal"
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={12}>
// // // //                 <DatePicker
// // // //                   label="Date"
// // // //                   value={onDutyReportFormData.date}
// // // //                   onChange={(newDate) => handleOnDutyReportInputChange('date', newDate)}
// // // //                   renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.date} helperText={errors.date} />}
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={6}>
// // // //                 <TimePicker
// // // //                   label="From Time"
// // // //                   value={onDutyReportFormData.fromTime}
// // // //                   onChange={(newTime) => handleOnDutyReportInputChange('fromTime', newTime)}
// // // //                   renderInput={(params) => 
// // // //                     <TextField 
// // // //                       {...params} 
// // // //                       fullWidth 
// // // //                       margin="normal"
// // // //                       error={!!errors.fromTime}
// // // //                       helperText={errors.fromTime}
// // // //                     />
// // // //                   }
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={6}>
// // // //                 <TimePicker
// // // //                   label="To Time"
// // // //                   value={onDutyReportFormData.toTime}
// // // //                   onChange={(newTime) => handleOnDutyReportInputChange('toTime', newTime)}
// // // //                   renderInput={(params) => 
// // // //                     <TextField 
// // // //                       {...params} 
// // // //                       fullWidth 
// // // //                       margin="normal"
// // // //                       error={!!errors.toTime}
// // // //                       helperText={errors.toTime}
// // // //                     />
// // // //                   }
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={12}>
// // // //                 <TextField
// // // //                   fullWidth
// // // //                   label="Reason"
// // // //                   value={onDutyReportFormData.reason}
// // // //                   onChange={(e) => handleOnDutyReportInputChange('reason', e.target.value)}
// // // //                   error={!!errors.reason}
// // // //                   helperText={errors.reason}
// // // //                   multiline
// // // //                   rows={3}
// // // //                   margin="normal"
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={12}>
// // // //                 <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
// // // //                   <Button variant="contained" color="primary" onClick={handleSaveOnDutyReport}>
// // // //                     Save
// // // //                   </Button>
// // // //                   <Button variant="outlined" onClick={handleCloseOnDutyReportDialog}>
// // // //                     Close
// // // //                   </Button>
// // // //                 </Box>
// // // //               </Grid>
// // // //             </Grid>
// // // //           </DialogContent>
// // // //         </Dialog>
// // // //       </Box>
// // // //     </LocalizationProvider>
// // // //   );
// // // // }







// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import {
// // // // //   Box,
// // // // //   Typography,
// // // // //   Button,
// // // // //   Paper,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   CircularProgress
// // // // // } from '@mui/material';

// // // // // export default function AttendanceReport() {
// // // // //   const [attendanceData, setAttendanceData] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const fetchAttendanceData = async () => {
// // // // //       setLoading(true);
// // // // //       try {
// // // // //         const response = await axios.get('https://tdtlworld.com/hrms-backend/today-attendence/', {
// // // // //           headers: {
// // // // //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4NzUyNjk5LCJpYXQiOjE3Mzg3NTA4OTksImp0aSI6Ijc5MGZmY2QxNDYxMjQ2YjhiYzAxOTg0OTM4OGI3NTkwIiwidXNlcl9pZCI6NDg5fQ.U7QQXaXuRvTi_3bX_gliheFRO2Catmr390zxuo8kNT8`
// // // // //           }
// // // // //         });
// // // // //         setAttendanceData(response.data);
// // // // //       } catch (error) {
// // // // //         console.error('Error fetching attendance data:', error);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchAttendanceData();
// // // // //   }, []);

// // // // //   return (
// // // // //     <Box sx={{ p: 3 }}>
// // // // //       <Typography variant="h5" sx={{ mb: 4 }}>Today's Attendance Report</Typography>
// // // // //       {loading ? (
// // // // //         <CircularProgress />
// // // // //       ) : (
// // // // //         <TableContainer component={Paper}>
// // // // //           <Table>
// // // // //             <TableHead>
// // // // //               <TableRow>
// // // // //                 <TableCell>EMPLOYEE</TableCell>
// // // // //                 <TableCell>DATE</TableCell>
// // // // //                 <TableCell>STATUS</TableCell>
// // // // //                 <TableCell>CLOCK IN</TableCell>
// // // // //                 <TableCell>CLOCK OUT</TableCell>
// // // // //                 <TableCell>LATE</TableCell>
// // // // //                 <TableCell>EARLY LEAVING</TableCell>
// // // // //                 <TableCell>TOTAL WORK</TableCell>
// // // // //               </TableRow>
// // // // //             </TableHead>
// // // // //             <TableBody>
// // // // //               {attendanceData.map((row, index) => (
// // // // //                 <TableRow key={index}>
// // // // //                   <TableCell>{row.name}</TableCell>
// // // // //                   <TableCell>{row.date}</TableCell>
// // // // //                   <TableCell>{row.status}</TableCell>
// // // // //                   <TableCell>{row.clockIn || 'N/A'}</TableCell>
// // // // //                   <TableCell>{row.clockOut || 'N/A'}</TableCell>
// // // // //                   <TableCell>{row.late || 'N/A'}</TableCell>
// // // // //                   <TableCell>{row.earlyLeaving || 'N/A'}</TableCell>
// // // // //                   <TableCell>{row.totalWork || 'N/A'}</TableCell>
// // // // //                 </TableRow>
// // // // //               ))}
// // // // //             </TableBody>
// // // // //           </Table>
// // // // //         </TableContainer>
// // // // //       )}
// // // // //     </Box>
// // // // //   );
// // // // // }


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import {
// // // // //   Box,
// // // // //   Typography,
// // // // //   Paper,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   CircularProgress
// // // // // } from '@mui/material';

// // // // // export default function AttendanceReport() {
// // // // //   const [attendanceData, setAttendanceData] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const fetchAttendanceData = async () => {
// // // // //       setLoading(true);
// // // // //       try {
// // // // //         const accessToken = localStorage.getItem('accessToken'); // Get token from local storage
// // // // //         if (!accessToken) {
// // // // //           throw new Error('Access token not found');
// // // // //         }

// // // // //         const response = await axios.get('https://tdtlworld.com/hrms-backend/today-attendence/', {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${accessToken}`
// // // // //           }
// // // // //         });

// // // // //         setAttendanceData(response.data);
// // // // //       } catch (error) {
// // // // //         console.error('Error fetching attendance data:', error);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
    
// // // // //     fetchAttendanceData();
// // // // //   }, []);

// // // // //   return (
// // // // //     <Box sx={{ p: 3 }}>
// // // // //       <Typography variant="h5" sx={{ mb: 4 }}>Today's Attendance Report</Typography>
// // // // //       {loading ? (
// // // // //         <CircularProgress />
// // // // //       ) : (
// // // // //         <TableContainer component={Paper}>
// // // // //           <Table>
// // // // //             <TableHead>
// // // // //               <TableRow>
// // // // //                 <TableCell>EMPLOYEE</TableCell>
// // // // //                 <TableCell>DATE</TableCell>
// // // // //                 <TableCell>STATUS</TableCell>
// // // // //                 <TableCell>CLOCK IN</TableCell>
// // // // //                 <TableCell>CLOCK OUT</TableCell>
// // // // //                 <TableCell>LATE</TableCell>
// // // // //                 <TableCell>EARLY LEAVING</TableCell>
// // // // //                 <TableCell>TOTAL WORK</TableCell>
// // // // //               </TableRow>
// // // // //             </TableHead>
// // // // //             <TableBody>
// // // // //               {attendanceData.map((row, index) => (
// // // // //                 <TableRow key={index}>
// // // // //                   <TableCell>{row.name}</TableCell>
// // // // //                   <TableCell>{row.date}</TableCell>
// // // // //                   <TableCell>{row.status}</TableCell>
// // // // //                   <TableCell>{row.clockIn || 'N/A'}</TableCell>
// // // // //                   <TableCell>{row.clockOut || 'N/A'}</TableCell>
// // // // //                   <TableCell>{row.late || 'N/A'}</TableCell>
// // // // //                   <TableCell>{row.earlyLeaving || 'N/A'}</TableCell>
// // // // //                   <TableCell>{row.totalWork || 'N/A'}</TableCell>
// // // // //                 </TableRow>
// // // // //               ))}
// // // // //             </TableBody>
// // // // //           </Table>
// // // // //         </TableContainer>
// // // // //       )}
// // // // //     </Box>
// // // // //   );
// // // // // }







// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import {
// // // // //   Box,
// // // // //   Typography,
// // // // //   Paper,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   CircularProgress,
// // // // //   Alert
// // // // // } from '@mui/material';

// // // // // export default function AttendanceReport() {
// // // // //   const [attendanceData, setAttendanceData] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     const fetchAttendanceData = async () => {
// // // // //       setLoading(true);
// // // // //       setError(null);
// // // // //       try {
// // // // //         const accessToken = localStorage.getItem('accessToken'); // Retrieve access token
// // // // //         if (!accessToken) {
// // // // //           throw new Error('Access token not found. Please log in again.');
// // // // //         }

// // // // //         const response = await axios.get('https://tdtlworld.com/hrms-backend/today-attendence/', {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${accessToken}`,
// // // // //           },
// // // // //         });

// // // // //         setAttendanceData(response.data);
// // // // //       } catch (error) {
// // // // //         console.error('Error fetching attendance data:', error);
// // // // //         setError(error.message || 'An error occurred while fetching data.');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchAttendanceData();
// // // // //   }, []);

// // // // //   return (
// // // // //     <Box sx={{ p: 3 }}>
// // // // //       <Typography variant="h5" sx={{ mb: 3 }}>Today's Attendance Report</Typography>
// // // // //       {loading && <CircularProgress />}
// // // // //       {error && <Alert severity="error">{error}</Alert>}
// // // // //       {!loading && !error && (
// // // // //         <TableContainer component={Paper}>
// // // // //           <Table>
// // // // //             <TableHead>
// // // // //               <TableRow>
// // // // //                 <TableCell>EMPLOYEE</TableCell>
// // // // //                 <TableCell>DATE</TableCell>
// // // // //                 <TableCell>STATUS</TableCell>
// // // // //                 <TableCell>CLOCK IN</TableCell>
// // // // //                 <TableCell>CLOCK OUT</TableCell>
// // // // //                 <TableCell>LATE</TableCell>
// // // // //                 <TableCell>EARLY LEAVING</TableCell>
// // // // //                 <TableCell>TOTAL WORK</TableCell>
// // // // //                 <TableCell>OVERTIME</TableCell>
// // // // //                 <TableCell>SHIFT</TableCell>
// // // // //               </TableRow>
// // // // //             </TableHead>
// // // // //             <TableBody>
// // // // //               {attendanceData.length > 0 ? (
// // // // //                 attendanceData.map((row, index) => (
// // // // //                   <TableRow key={index}>
// // // // //                     <TableCell>{row.name || 'N/A'}</TableCell>
// // // // //                     <TableCell>{row.date || 'N/A'}</TableCell>
// // // // //                     <TableCell>{row.status || 'N/A'}</TableCell>
// // // // //                     <TableCell>{row.clockIn || 'N/A'}</TableCell>
// // // // //                     <TableCell>{row.clockOut || 'N/A'}</TableCell>
// // // // //                     <TableCell>{row.late || 'N/A'}</TableCell>
// // // // //                     <TableCell>{row.earlyLeaving || 'N/A'}</TableCell>
// // // // //                     <TableCell>{row.totalWork || 'N/A'}</TableCell>
// // // // //                     <TableCell>{row.overtime || 'N/A'}</TableCell>
// // // // //                     <TableCell>{row.shift || 'N/A'}</TableCell>
// // // // //                   </TableRow>
// // // // //                 ))
// // // // //               ) : (
// // // // //                 <TableRow>
// // // // //                   <TableCell colSpan={10} align="center">
// // // // //                     No attendance records available.
// // // // //                   </TableCell>
// // // // //                 </TableRow>
// // // // //               )}
// // // // //             </TableBody>
// // // // //           </Table>
// // // // //         </TableContainer>
// // // // //       )}
// // // // //     </Box>
// // // // //   );
// // // // // }



// // // // // import React, { useState, useEffect } from 'react';
// // // // // import {
// // // // //   Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer,
// // // // //   TableHead, TableRow, Dialog, DialogTitle, DialogContent, Grid, TextField,
// // // // //   FormControl, InputLabel, Select, MenuItem, FormHelperText, IconButton,
// // // // //   Avatar, Chip, CircularProgress
// // // // // } from '@mui/material';
// // // // // import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// // // // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // // // import CloseIcon from '@mui/icons-material/Close';
// // // // // import AddIcon from '@mui/icons-material/Add';
// // // // // import RemoveIcon from '@mui/icons-material/Remove';
// // // // // import axios from 'axios';


// // // // // const initialOnDutyReportData = [
// // // // //   {
// // // // //     id: 1,
// // // // //     name: 'Anagha Dolase',
// // // // //     email: 'anagha.dolase@tdtl.world',
// // // // //     date: '2024-10-30',
// // // // //     inTime: '09:57:21',
// // // // //     outTime: '',
// // // // //     reason: '',
// // // // //     wfh: '',
// // // // //     status: 'Pending',
// // // // //     avatar: '/placeholder.svg?height=40&width=40'
// // // // //   },
// // // // //   {
// // // // //     id: 2,
// // // // //     name: 'Gauri Shirole',
// // // // //     email: 'gauri.shirole@thedatatechlabs.com',
// // // // //     date: '2024-10-30',
// // // // //     inTime: '09:27:34',
// // // // //     outTime: '13:13:51',
// // // // //     reason: 'As per Office Diwali Festival',
// // // // //     wfh: 'Yes',
// // // // //     status: 'Pending',
// // // // //     avatar: '/placeholder.svg?height=40&width=40'
// // // // //   },
// // // // //   // ... (other data entries)
// // // // // ];


// // // // // export default function IntegratedAttendanceSystem() {
// // // // //   const [attendanceData, setAttendanceData] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [openOnDutyRequestDialog, setOpenOnDutyRequestDialog] = useState(false);
// // // // //   const [onDutyRequestFormData, setOnDutyRequestFormData] = useState({
// // // // //     employeeName: '',
// // // // //     date: null,
// // // // //     outTime: null,
// // // // //     odFrom: '',
// // // // //     reason: ''
// // // // //   });

// // // // //     const [onDutyReportFormData, setOnDutyReportFormData] = useState({
// // // // //     employeeName: 'John Doe',
// // // // //     date: null,
// // // // //     fromTime: null,
// // // // //     toTime: null,
// // // // //     reason: ''
// // // // //   });

// // // // //     const [showOnDutyReport, setShowOnDutyReport] = useState(false);
// // // // //   const [tasks, setTasks] = useState([{ task: '', approvedBy: '', startTime: '', endTime: '' }]);
// // // // //   const [errors, setErrors] = useState({});
// // // // //   const [onDutyReportData, setOnDutyReportData] = useState(initialOnDutyReportData);  
// // // // //   const [openOnDutyReportDialog, setOpenOnDutyReportDialog] = useState(false);
  
// // // // //   const token = localStorage.getItem('access_token');

// // // // //   useEffect(() => {
// // // // //     fetchAttendanceData();
// // // // //   }, []);

// // // // //   const fetchAttendanceData = async () => {
// // // // //     try {
// // // // //       const response = await axios.get('https://tdtlworld.com/hrms-backend/today-attendence/', {
// // // // //         headers: { Authorization: `Bearer ${token}` }
// // // // //       });
// // // // //       setAttendanceData(response.data);
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching attendance data:', error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleOpenOnDutyRequestDialog = () => {
// // // // //     setOpenOnDutyRequestDialog(true);
// // // // //   };

// // // // //   const handleCloseOnDutyRequestDialog = () => {
// // // // //     setOpenOnDutyRequestDialog(false);
// // // // //     setOnDutyRequestFormData({ employeeName: '', date: null, outTime: null, odFrom: '', reason: '' });
// // // // //     setErrors({});
// // // // //   };

// // // // //   const handleOnDutyRequestInputChange = (field, value) => {
// // // // //     setOnDutyRequestFormData(prevData => ({ ...prevData, [field]: value }));
// // // // //     if (errors[field]) setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
// // // // //   };

// // // // //   const validateOnDutyRequestForm = () => {
// // // // //     const newErrors = {};
// // // // //     if (!onDutyRequestFormData.date) newErrors.date = 'Date is required';
// // // // //     if (!onDutyRequestFormData.outTime) newErrors.outTime = 'Out Time is required';
// // // // //     if (!onDutyRequestFormData.odFrom) newErrors.odFrom = 'OD From is required';
// // // // //     if (!onDutyRequestFormData.reason) newErrors.reason = 'Reason is required';
// // // // //     setErrors(newErrors);
// // // // //     return Object.keys(newErrors).length === 0;
// // // // //   };

// // // // //   const handleSaveOnDutyRequest = async () => {
// // // // //     if (validateOnDutyRequestForm()) {
// // // // //       try {
// // // // //         await axios.post('https://tdtlworld.com/hrms-backend/on-duty-request/', onDutyRequestFormData, {
// // // // //           headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
// // // // //         });
// // // // //         alert('On Duty Request Submitted Successfully');
// // // // //         handleCloseOnDutyRequestDialog();
// // // // //       } catch (error) {
// // // // //         console.error('Error submitting on duty request:', error);
// // // // //       }
// // // // //     }
// // // // //   };


// // // // //     const handleTaskChange = (index, field, value) => {
// // // // //     const newTasks = [...tasks];
// // // // //     newTasks[index][field] = value;
// // // // //     setTasks(newTasks);
// // // // //     if (errors.tasks) {
// // // // //       setErrors(prevErrors => ({ ...prevErrors, tasks: null }));
// // // // //     }
// // // // //   };

// // // // //     const handleAddMore = () => {
// // // // //     setTasks([...tasks, { task: '', approvedBy: '', startTime: '', endTime: '' }]);
// // // // //   };

// // // // //   const handleRemove = (index) => {
// // // // //     const newTasks = tasks.filter((_, i) => i !== index);
// // // // //     setTasks(newTasks);
// // // // //   };

// // // // //     const handleOpenOnDutyReportDialog = () => {
// // // // //     setOpenOnDutyReportDialog(true);
// // // // //   };

// // // // //   const handleCloseOnDutyReportDialog = () => {
// // // // //         setOpenOnDutyReportDialog(false);
// // // // //         setOnDutyReportFormData({
// // // // //           employeeName: 'John Doe',
// // // // //           date: null,
// // // // //           fromTime: null,
// // // // //           toTime: null,
// // // // //           reason: ''
// // // // //         });
// // // // //         setErrors({});
// // // // //       };


// // // // //       const handleOnDutyReportInputChange = (field, value) => {
// // // // //       setOnDutyReportFormData(prevData => ({
// // // // //       ...prevData,
// // // // //       [field]: value
// // // // //     }));
// // // // //     if (errors[field]) {
// // // // //       setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
// // // // //     }
// // // // //   };

// // // // //     const validateOnDutyReportForm = () => {
// // // // //     const newErrors = {};
// // // // //     if (!onDutyReportFormData.date) newErrors.date = 'Date is required';
// // // // //     if (!onDutyReportFormData.fromTime) newErrors.fromTime = 'From Time is required';
// // // // //     if (!onDutyReportFormData.toTime) newErrors.toTime = 'To Time is required';
// // // // //     if (!onDutyReportFormData.reason) newErrors.reason = 'Reason is required';
// // // // //     setErrors(newErrors);
// // // // //     return Object.keys(newErrors).length === 0;
// // // // //   };

// // // // //   const handleSaveOnDutyReport = () => {
// // // // //     if (validateOnDutyReportForm()) {
// // // // //       console.log('On Duty Report Form Data:', onDutyReportFormData);
// // // // //       handleCloseOnDutyReportDialog();
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // // //       <Box sx={{ mt: 2 }}>
// // // // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // // // //           <Typography variant="h4">Attendance</Typography>
// // // // //           <Button variant="outlined" sx={{ mr: 1 }}  onClick={handleOpenOnDutyRequestDialog}>On Duty Request</Button>
// // // // //           <Button variant="outlined" onClick={() => setShowOnDutyReport(!showOnDutyReport)}>
// // // // //               {showOnDutyReport ? 'Show Attendance' : 'On Duty Report'}
// // // // //              </Button>

// // // // //         </Box>

// // // // //         {loading ? (
// // // // //           <CircularProgress />
// // // // //         ) : (
// // // // //           <Paper sx={{ width: '100%', mb: 2 }}>


// // // // //             <TableContainer component={Paper}>
// // // // //               <Table>
// // // // //                 <TableHead>
// // // // //                   <TableRow>
// // // // //                     <TableCell>EMPLOYEE</TableCell>
// // // // //                     <TableCell>DATE</TableCell>
// // // // //                     <TableCell>STATUS</TableCell>
// // // // //                     <TableCell>CLOCK IN</TableCell>
// // // // //                     <TableCell>CLOCK OUT</TableCell>
// // // // //                     <TableCell>LATE</TableCell>
// // // // //                     <TableCell>EARLY LEAVING</TableCell>
// // // // //                     <TableCell>TOTAL WORK</TableCell>
// // // // //                   </TableRow>
// // // // //                 </TableHead>
// // // // //                 <TableBody>
// // // // //                   {attendanceData.map(row => (
// // // // //                     <TableRow key={row.id}>
// // // // //                       <TableCell>{row.name}</TableCell>
// // // // //                       <TableCell>{row.date}</TableCell>
// // // // //                       <TableCell>{row.status}</TableCell>
// // // // //                       <TableCell>{row.clockIn}</TableCell>
// // // // //                       <TableCell>{row.clockOut}</TableCell>
// // // // //                       <TableCell>{row.late}</TableCell>
// // // // //                       <TableCell>{row.earlyLeaving}</TableCell>
// // // // //                       <TableCell>{row.totalWork}</TableCell>
// // // // //                     </TableRow>
// // // // //                   ))}
// // // // //                 </TableBody>
// // // // //               </Table>
// // // // //             </TableContainer>
// // // // //           </Paper>
// // // // //         )}
// // // // //  {/* On Duty Request Dialog */}
// // // // //         <Dialog open={openOnDutyRequestDialog} onClose={handleCloseOnDutyRequestDialog} maxWidth="md" fullWidth>
// // // // //           <DialogTitle>
// // // // //             <Box display="flex" justifyContent="space-between" alignItems="center">
// // // // //               <Typography variant="h6">Add On Duty Attendance</Typography>
// // // // //               <IconButton onClick={handleCloseOnDutyRequestDialog} size="small">
// // // // //                 <CloseIcon />
// // // // //               </IconButton>
// // // // //             </Box>
// // // // //           </DialogTitle>
// // // // //           <DialogContent>
// // // // //             <Grid container spacing={3}>
// // // // //               <Grid item xs={12}>
// // // // //                 <TextField fullWidth label="Employee Name" value={onDutyRequestFormData.employeeName} disabled margin="normal" />
// // // // //               </Grid>
// // // // //               <Grid item xs={6}>
// // // // //                 <DatePicker label="Date" value={onDutyRequestFormData.date} onChange={(newDate) => handleOnDutyRequestInputChange('date', newDate)} renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.date} helperText={errors.date} />} />
// // // // //               </Grid>
// // // // //               <Grid item xs={6}>
// // // // //                 <TimePicker label="Out Time" value={onDutyRequestFormData.outTime} onChange={(newTime) => handleOnDutyRequestInputChange('outTime', newTime)} renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.outTime} helperText={errors.outTime} />} />
// // // // //               </Grid>

// // // // //               <Grid item xs={12}>
// // // // //                 <FormControl fullWidth error={!!errors.odFrom}>
// // // // //                    <InputLabel>OD From</InputLabel>
// // // // //                    <Select
// // // // //                     value={onDutyRequestFormData.odFrom}
// // // // //                     onChange={(e) => handleOnDutyRequestInputChange('odFrom', e.target.value)}
// // // // //                     label="OD From"
// // // // //                   >
// // // // //                     <MenuItem value="office">Remote Working</MenuItem>
// // // // //                     <MenuItem value="client">Client Location</MenuItem>
// // // // //                     <MenuItem value="WOF">Work From Office</MenuItem>             
// // // // //                     <MenuItem value="WOH">Work From Home</MenuItem>
// // // // //                   </Select>
// // // // //                   {errors.odFrom && <FormHelperText>{errors.odFrom}</FormHelperText>}
// // // // //                 </FormControl>
// // // // //               </Grid>
              
// // // // //               <Grid item xs={12}>
// // // // //                 <TextField fullWidth label="Reason"
// // // // //                  value={onDutyRequestFormData.reason}
// // // // //                   onChange={(e) => handleOnDutyRequestInputChange('reason', e.target.value)} error={!!errors.reason} helperText={errors.reason}
// // // // //                    multiline rows={2} />
// // // // //               </Grid>


// // // // //               <Grid item xs={12}>
// // // // //                  <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
// // // // //                    Note: This should match with microsoft planner task.
// // // // //                 </Typography>
// // // // //                </Grid>
// // // // //               {tasks.map((task, index) => (
// // // // //                 <Grid item xs={12} key={index} container spacing={2}>
// // // // //                   <Grid item xs={12}>
// // // // //                     <TextField
// // // // //                       fullWidth
// // // // //                       label="Task"
// // // // //                       value={task.task}
// // // // //                       onChange={(e) => handleTaskChange(index, 'task', e.target.value)}
// // // // //                       multiline
// // // // //                       rows={2}
// // // // //                     />
// // // // //                   </Grid>
// // // // //                   <Grid item xs={4}>
// // // // //                     <TextField
// // // // //                       fullWidth
// // // // //                       label="Task to be Approved By"
// // // // //                       value={task.approvedBy}
// // // // //                       onChange={(e) => handleTaskChange(index, 'approvedBy', e.target.value)}
// // // // //                     />
// // // // //                   </Grid>
// // // // //                   <Grid item xs={4}>
// // // // //                     <TextField
// // // // //                       fullWidth
// // // // //                       label="Start Time"
// // // // //                       value={task.startTime}
// // // // //                       onChange={(e) => handleTaskChange(index, 'startTime', e.target.value)}
// // // // //                     />
// // // // //                   </Grid>
// // // // //                   <Grid item xs={4}>
// // // // //                     <TextField
// // // // //                       fullWidth
// // // // //                       label="End Time"
// // // // //                       value={task.endTime}
// // // // //                       onChange={(e) => handleTaskChange(index, 'endTime', e.target.value)}
// // // // //                     />
// // // // //                   </Grid>
// // // // //                   {index > 0 && (
// // // // //                     <Grid item xs={12}>
// // // // //                       <Button
// // // // //                         variant="outlined"
// // // // //                         color="error"
// // // // //                         startIcon={<RemoveIcon />}
// // // // //                         onClick={() => handleRemove(index)}
// // // // //                       >
// // // // //                         Remove
// // // // //                       </Button>
// // // // //                     </Grid>
// // // // //                   )}
// // // // //                 </Grid>
// // // // //               ))}
// // // // //               {errors.tasks && (
// // // // //                 <Grid item xs={12}>
// // // // //                   <Typography color="error" variant="caption">
// // // // //                     {errors.tasks}
// // // // //                   </Typography>
// // // // //                 </Grid>
// // // // //               )}
// // // // //               <Grid item xs={12}>
// // // // //                 <Box display="flex" gap={2}>
// // // // //                   <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleAddMore}>
// // // // //                     Add More
// // // // //                   </Button>
// // // // //                   <Button variant="contained" color="primary" onClick={handleSaveOnDutyRequest}>
// // // // //                     Save
// // // // //                   </Button>
// // // // //                 </Box>
// // // // //               </Grid>
// // // // //             </Grid>
// // // // //           </DialogContent>
// // // // //         </Dialog>


// // // // //  {/* On Duty Report Dialog */}
// // // // //           <Dialog open={openOnDutyReportDialog} onClose={handleCloseOnDutyReportDialog} maxWidth="sm" fullWidth>
// // // // //            <DialogTitle>
// // // // //              <Box display="flex" justifyContent="space-between" alignItems="center">
// // // // //                <Typography variant="h6">Add Outdoor Duty Attendance</Typography>
// // // // //                <IconButton onClick={handleCloseOnDutyReportDialog} size="small">
// // // // //                  <CloseIcon />
// // // // //                </IconButton>
// // // // //             </Box>
// // // // //            </DialogTitle>
// // // // //            <DialogContent>
// // // // //              <Grid container spacing={3}>
// // // // //               <Grid item xs={12}>
// // // // //                  <TextField
// // // // //                   fullWidth
// // // // //                   label="Employee Name"
// // // // //                   value={onDutyReportFormData.employeeName}
// // // // //                   disabled
// // // // //                   margin="normal"
// // // // //                 />
// // // // //               </Grid>
// // // // //               <Grid item xs={12}>
// // // // //                 <DatePicker
// // // // //                   label="Date"
// // // // //                   value={onDutyReportFormData.date}
// // // // //                   onChange={(newDate) => handleOnDutyReportInputChange('date', newDate)}
// // // // //                   renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={!!errors.date} helperText={errors.date} />}
// // // // //                 />
// // // // //               </Grid>
// // // // //               <Grid item xs={6}>
// // // // //                 <TimePicker
// // // // //                   label="From Time"
// // // // //                   value={onDutyReportFormData.fromTime}
// // // // //                   onChange={(newTime) => handleOnDutyReportInputChange('fromTime', newTime)}
// // // // //                   renderInput={(params) => 
// // // // //                     <TextField 
// // // // //                       {...params} 
// // // // //                       fullWidth 
// // // // //                       margin="normal"
// // // // //                       error={!!errors.fromTime}
// // // // //                       helperText={errors.fromTime}
// // // // //                     />
// // // // //                   }
// // // // //                 />
// // // // //               </Grid>
// // // // //               <Grid item xs={6}>
// // // // //                 <TimePicker
// // // // //                   label="To Time"
// // // // //                   value={onDutyReportFormData.toTime}
// // // // //                   onChange={(newTime) => handleOnDutyReportInputChange('toTime', newTime)}
// // // // //                   renderInput={(params) => 
// // // // //                     <TextField 
// // // // //                       {...params} 
// // // // //                       fullWidth 
// // // // //                       margin="normal"
// // // // //                       error={!!errors.toTime}
// // // // //                       helperText={errors.toTime}
// // // // //                     />
// // // // //                   }
// // // // //                 />
// // // // //               </Grid>
// // // // //               <Grid item xs={12}>
// // // // //                 <TextField
// // // // //                   fullWidth
// // // // //                   label="Reason"
// // // // //                   value={onDutyReportFormData.reason}
// // // // //                   onChange={(e) => handleOnDutyReportInputChange('reason', e.target.value)}
// // // // //                   error={!!errors.reason}
// // // // //                   helperText={errors.reason}
// // // // //                   multiline
// // // // //                   rows={3}
// // // // //                   margin="normal"
// // // // //                 />
// // // // //               </Grid>
// // // // //               <Grid item xs={12}>
// // // // //                 <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
// // // // //                   <Button variant="contained" color="primary" onClick={handleSaveOnDutyReport}>
// // // // //                     Save
// // // // //                   </Button>
// // // // //                   <Button variant="outlined" onClick={handleCloseOnDutyReportDialog}>
// // // // //                     Close
// // // // //                   </Button>
// // // // //                 </Box>
// // // // //               </Grid>
// // // // //             </Grid>
// // // // //           </DialogContent>
// // // // //         </Dialog>


// // // // //             {/* </Grid>
// // // // //             <Button variant="contained" color="primary" onClick={handleSaveOnDutyRequest}>Submit</Button>
// // // // //           </DialogContent>
// // // // //         </Dialog> */}
// // // // //       </Box>
// // // // //     </LocalizationProvider>
// // // // //   );
// // // // // }




// // // // // import React, { useState, useEffect } from 'react';
// // // // // import {
// // // // //   Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer,
// // // // //   TableHead, TableRow, Dialog, DialogTitle, DialogContent, Grid, TextField,
// // // // //   FormControl, InputLabel, Select, MenuItem, FormHelperText, IconButton,
// // // // //   Avatar, Chip, CircularProgress
// // // // // } from '@mui/material';
// // // // // import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// // // // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // // // import CloseIcon from '@mui/icons-material/Close';
// // // // // import AddIcon from '@mui/icons-material/Add';
// // // // // import RemoveIcon from '@mui/icons-material/Remove';
// // // // // import axios from 'axios';

// // // // // export default function IntegratedAttendanceSystem() {
// // // // //   const [attendanceData, setAttendanceData] = useState([]);
// // // // //   const [onDutyReportData, setOnDutyReportData] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [openOnDutyRequestDialog, setOpenOnDutyRequestDialog] = useState(false);
// // // // //   const [openOnDutyReportDialog, setOpenOnDutyReportDialog] = useState(false);
// // // // //   const [onDutyRequestFormData, setOnDutyRequestFormData] = useState({
// // // // //     employeeName: '',
// // // // //     date: null,
// // // // //     outTime: null,
// // // // //     odFrom: '',
// // // // //     reason: ''
// // // // //   });
// // // // //   const [onDutyReportFormData, setOnDutyReportFormData] = useState({
// // // // //     employeeName: '',
// // // // //     date: null,
// // // // //     fromTime: null,
// // // // //     toTime: null,
// // // // //     reason: ''
// // // // //   });
// // // // //   const [errors, setErrors] = useState({});
// // // // //   const token = localStorage.getItem('access_token');

// // // // //   useEffect(() => {
// // // // //     fetchAttendanceData();
// // // // //     fetchOnDutyReportData();
// // // // //   }, []);

// // // // //   const fetchAttendanceData = async () => {
// // // // //     try {
// // // // //       const response = await axios.get('https://tdtlworld.com/hrms-backend/today-attendence/', {
// // // // //         headers: { Authorization: `Bearer ${token}` }
// // // // //       });
// // // // //       setAttendanceData(response.data);
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching attendance data:', error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const fetchOnDutyReportData = async () => {
// // // // //     try {
// // // // //       const response = await axios.get('https://tdtlworld.com/hrms-backend/on-duty-report/', {
// // // // //         headers: { Authorization: `Bearer ${token}` }
// // // // //       });
// // // // //       setOnDutyReportData(response.data);
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching on duty report data:', error);
// // // // //     }
// // // // //   };

// // // // //   const handleOpenOnDutyRequestDialog = () => {
// // // // //     setOpenOnDutyRequestDialog(true);
// // // // //   };

// // // // //   const handleCloseOnDutyRequestDialog = () => {
// // // // //     setOpenOnDutyRequestDialog(false);
// // // // //     setOnDutyRequestFormData({ employeeName: '', date: null, outTime: null, odFrom: '', reason: '' });
// // // // //     setErrors({});
// // // // //   };

// // // // //   const handleOpenOnDutyReportDialog = () => {
// // // // //     setOpenOnDutyReportDialog(true);
// // // // //   };

// // // // //   const handleCloseOnDutyReportDialog = () => {
// // // // //     setOpenOnDutyReportDialog(false);
// // // // //     setOnDutyReportFormData({ employeeName: '', date: null, fromTime: null, toTime: null, reason: '' });
// // // // //     setErrors({});
// // // // //   };

// // // // //   return (
// // // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // // //       <Box sx={{ mt: 2 }}>
// // // // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // // // //           <Typography variant="h4">Attendance</Typography>
// // // // //           <Box>
// // // // //             <Button variant="outlined" sx={{ mr: 1 }} onClick={handleOpenOnDutyRequestDialog}>On Duty Request</Button>
// // // // //             <Button variant="outlined" onClick={handleOpenOnDutyReportDialog}>On Duty Report</Button>
// // // // //           </Box>
// // // // //         </Box>

// // // // //         {loading ? (
// // // // //           <CircularProgress />
// // // // //         ) : (
// // // // //           <Paper sx={{ width: '100%', mb: 2 }}>
// // // // //             <TableContainer>
// // // // //               <Table>
// // // // //                 <TableHead>
// // // // //                   <TableRow>
// // // // //                     <TableCell>EMPLOYEE</TableCell>
// // // // //                     <TableCell>DATE</TableCell>
// // // // //                     <TableCell>STATUS</TableCell>
// // // // //                     <TableCell>CLOCK IN</TableCell>
// // // // //                     <TableCell>CLOCK OUT</TableCell>
// // // // //                     <TableCell>LATE</TableCell>
// // // // //                     <TableCell>EARLY LEAVING</TableCell>
// // // // //                     <TableCell>TOTAL WORK</TableCell>
// // // // //                   </TableRow>
// // // // //                 </TableHead>
// // // // //                 <TableBody>
// // // // //                   {attendanceData.map(row => (
// // // // //                     <TableRow key={row.id}>
// // // // //                       <TableCell>{row.name}</TableCell>
// // // // //                       <TableCell>{row.date}</TableCell>
// // // // //                       <TableCell>{row.status}</TableCell>
// // // // //                       <TableCell>{row.clockIn}</TableCell>
// // // // //                       <TableCell>{row.clockOut}</TableCell>
// // // // //                       <TableCell>{row.late}</TableCell>
// // // // //                       <TableCell>{row.earlyLeaving}</TableCell>
// // // // //                       <TableCell>{row.totalWork}</TableCell>
// // // // //                     </TableRow>
// // // // //                   ))}
// // // // //                 </TableBody>
// // // // //               </Table>
// // // // //             </TableContainer>
// // // // //           </Paper>
// // // // //         )}
// // // // //       </Box>
// // // // //     </LocalizationProvider>
// // // // //   );
// // // // // }

// // // "use client"

// // // import { useState } from "react"
// // // import {
// // //   Box,
// // //   Typography,
// // //   Button,
// // //   Paper,
// // //   Grid,
// // //   useTheme,
// // //   Icon,
// // // } from "@mui/material"
// // // import { styled } from "@mui/material/styles"
// // // import {
// // //   PieChart,
// // //   Pie,
// // //   Cell,
// // //   ResponsiveContainer,
// // //   LineChart,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // // } from "recharts"
// // // import { useNavigate } from "react-router-dom"

// // // import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// // // import StorageIcon from "@mui/icons-material/Storage"
// // // import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
// // // import SpeedIcon from "@mui/icons-material/Speed"
// // // import LabelIcon from "@mui/icons-material/Label"
// // // import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

// // // const CardPaper = styled(Paper)(({ theme }) => ({
// // //   padding: theme.spacing(2),
// // //   display: "flex",
// // //   flexDirection: "column",
// // //   justifyContent: "space-between",
// // //   height: "100%",
// // //   borderRadius: "8px",
// // //   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// // // }))

// // // const InfoCard = ({ title, value, icon, bgColor, textColor }) => {
// // //   const theme = useTheme()
// // //   const defaultBgColor = theme.palette.background.paper
// // //   const defaultTextColor = theme.palette.text.primary

// // //   return (
// // //     <CardPaper sx={{ backgroundColor: bgColor || defaultBgColor }}>
// // //       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // //         <Box>
// // //           <Typography variant="subtitle1" sx={{ color: textColor || defaultTextColor }}>
// // //             {title}
// // //           </Typography>
// // //           <Typography variant="h4" component="p" sx={{ fontWeight: "bold", color: textColor || defaultTextColor }}>
// // //             {value}
// // //           </Typography>
// // //         </Box>
// // //         <Icon sx={{ fontSize: 32, color: textColor || "primary" }}>{icon}</Icon>
// // //       </Box>
// // //     </CardPaper>
// // //   )
// // // }

// // // const StatusLegend = ({ items }) => (
// // //   <Box>
// // //     {items.map((item, index) => (
// // //       <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
// // //         <Box
// // //           sx={{
// // //             width: 12,
// // //             height: 12,
// // //             borderRadius: "50%",
// // //             backgroundColor: item.color,
// // //             mr: 1,
// // //           }}
// // //         />
// // //         <Typography variant="body2" color="text.secondary">
// // //           {item.label}
// // //         </Typography>
// // //       </Box>
// // //     ))}
// // //   </Box>
// // // )

// // // const ticketPriorityData = [
// // //   { name: "Low", value: 50.0 },
// // //   { name: "Medium", value: 50.0 },
// // // ]
// // // const TICKET_COLORS = ["#FFB74D", "#FFA726"]

// // // const taskStatusItems = [
// // //   { color: "#7E57C2", label: "Not Started" },
// // //   { color: "#5C6BC0", label: "In Progress" },
// // //   { color: "#66BB6A", label: "Completed" },
// // //   { color: "#BDBDBD", label: "Cancelled" },
// // //   { color: "#FFCA28", label: "On Hold" },
// // // ]

// // // const projectStatusItems = [
// // //   { color: "#66BB6A", label: "Not Started" },
// // //   { color: "#42A5F5", label: "In Progress" },
// // //   { color: "#26A69A", label: "Completed" },
// // //   { color: "#EF5350", label: "Cancelled" },
// // //   { color: "#FF7043", label: "On Hold" },
// // // ]

// // // const ticketLegendItems = [
// // //   { color: "#FFA726", label: "Low" },
// // //   { color: "#FFB74D", label: "Medium" },
// // //   { color: "#FF7043", label: "High" },
// // //   { color: "#FFEE58", label: "Critical" },
// // // ]

// // // const payrollChartData = [
// // //   { name: "Jul 2024", value: null }, { name: "Aug 2024", value: null },
// // //   { name: "Sep 2024", value: null }, { name: "Oct 2024", value: null },
// // //   { name: "Nov 2024", value: null }, { name: "Dec 2024", value: null },
// // //   { name: "Jan 2025", value: null }, { name: "Feb 2025", value: null },
// // //   { name: "Mar 2025", value: null }, { name: "Apr 2025", value: null },
// // //   { name: "May 2025", value: null }, { name: "Jun 2025", value: null },
// // // ]

// // // export default function Dashboard() {
// // //   const blueColor = "#1976D2"
// // //   const [userName] = useState("Prasad Shinde")
// // //   const navigate = useNavigate()

// // //   return (
// // //     <Box sx={{ p: { xs: 2, md: 3 } }}>
// // //       <Grid container spacing={3}>
// // //         <Grid item xs={12} lg={7}>
// // //           <Grid container spacing={3}>
// // //             {/* Welcome Header */}
// // //             <Grid item xs={12}>
// // //               <Paper sx={{ p: 2, borderRadius: "8px" }}>
// // //                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // //                   <Box>
// // //                     <Typography variant="h6">Welcome {userName}</Typography>
// // //                     <Typography variant="body2" color="text.secondary">
// // //                       My Shift: 09:00 am To 06:00 pm
// // //                     </Typography>
// // //                   </Box>
// // //                   <Box sx={{ display: "flex", gap: 2 }}>
// // //                     <Button
// // //                       variant="contained"
// // //                       sx={{
// // //                         backgroundColor: "#4CAF50",
// // //                         color: "white",
// // //                         textTransform: "none",
// // //                         "&:hover": { backgroundColor: "#43A047" },

// // //                       }}
// // //                       onClick={() => alert("✅ Punch In successful! Your attendance has been recorded.")}

// // //                     >
// // //                       Punch In
// // //                     </Button>
// // //                     <Button
// // //                       variant="contained"
// // //                       sx={{
// // //                         backgroundColor: "#F44336",
// // //                         color: "white",
// // //                         textTransform: "none",
// // //                         "&:hover": { backgroundColor: "#E53935" },
// // //                       }}
// // //                       onClick={() => alert("✅ Punch Out successful! Your working hours for the day have been recorded.")}
// // //                     >
// // //                       Punch Out
// // //                     </Button>
// // //                   </Box>
// // //                 </Box>
// // //               </Paper>
// // //             </Grid>

// // //             {/* My Attendance */}
// // //             <Grid item xs={12}>
// // //               <Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: blueColor, color: "white", borderRadius: "8px" }}>
// // //                 <Button
// // //                   sx={{ color: "white", textTransform: "none" }}
// // //                   endIcon={<ArrowForwardIcon />}
// // //                   onClick={() => navigate('/hrms/dashboard/attendance')}
// // //                 >
// // //                   My Attendance
// // //                 </Button>
// // //                 <Box />
// // //               </Paper>
// // //             </Grid>

// // //             <Grid item xs={12} sm={6}>
// // //               <InfoCard title="Overtime Request" value="0" icon={<CalendarTodayIcon />} />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <InfoCard title="Travel Request" value="0" icon={<StorageIcon />} bgColor={blueColor} textColor="white" />
// // //             </Grid>

// // //             <Grid item xs={12}>
// // //               <CardPaper>
// // //                 <Typography variant="h6" gutterBottom>Tasks Status</Typography>
// // //                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1, minHeight: 100 }}>
// // //                   <Box sx={{ width: "70%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} />
// // //                   <StatusLegend items={taskStatusItems} />
// // //                 </Box>
// // //               </CardPaper>
// // //             </Grid>

// // //             <Grid item xs={12} sm={6}>
// // //               <InfoCard title="My Awards" value="0" icon={<AttachMoneyIcon />} bgColor={blueColor} textColor="white" />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <InfoCard title="Total Assets" value="0" icon={<SpeedIcon />} />
// // //             </Grid>

// // //             <Grid item xs={12}>
// // //               <CardPaper>
// // //                 <Typography variant="h6" gutterBottom>Ticket Priority</Typography>
// // //                 <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
// // //                   <Box sx={{ width: 150, height: 150 }}>
// // //                     <ResponsiveContainer>
// // //                       <PieChart>
// // //                         <Pie
// // //                           data={ticketPriorityData}
// // //                           cx="50%"
// // //                           cy="50%"
// // //                           innerRadius={40}
// // //                           outerRadius={60}
// // //                           dataKey="value"
// // //                           label={({ value }) => `${value}%`}
// // //                           labelLine={false}
// // //                         >
// // //                           {ticketPriorityData.map((entry, index) => (
// // //                             <Cell key={`cell-${index}`} fill={TICKET_COLORS[index % TICKET_COLORS.length]} />
// // //                           ))}
// // //                         </Pie>
// // //                       </PieChart>
// // //                     </ResponsiveContainer>
// // //                   </Box>
// // //                   <Box sx={{ ml: 4 }}>
// // //                     <StatusLegend items={ticketLegendItems} />
// // //                   </Box>
// // //                 </Box>
// // //               </CardPaper>
// // //             </Grid>
// // //           </Grid>
// // //         </Grid>

// // //         {/* Right Column */}
// // //         <Grid item xs={12} lg={5}>
// // //           <Grid container spacing={3}>
// // //             <Grid item xs={12} sm={6} lg={12}>
// // //               <InfoCard title="Expense Claim" value="₹0.00" icon={<AttachMoneyIcon />} bgColor={blueColor} textColor="white" />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} lg={12}>
// // //               <InfoCard title="My Leave" value="0" icon={<LabelIcon />} />
// // //             </Grid>

// // //             <Grid item xs={12}>
// // //               <CardPaper>
// // //                 <Typography variant="h6">My Payroll monthly report</Typography>
// // //                 <Box sx={{ display: "flex", gap: 4, my: 2 }}>
// // //                   <Box>
// // //                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography>
// // //                     <Typography variant="body2" color="text.secondary">Total</Typography>
// // //                   </Box>
// // //                   <Box>
// // //                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography>
// // //                     <Typography variant="body2" color="text.secondary">This Month</Typography>
// // //                   </Box>
// // //                 </Box>
// // //                 <Box sx={{ height: 250, width: "100%", mt: 2, ".recharts-wrapper": { ml: -1 } }}>
// // //                   <ResponsiveContainer>
// // //                     <LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
// // //                       <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
// // //                       <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} />
// // //                       <YAxis
// // //                         domain={[0, 5]}
// // //                         ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]}
// // //                         tickFormatter={(tick) => tick.toFixed(1)}
// // //                         tick={{ fontSize: 12, fill: '#666' }}
// // //                         axisLine={false}
// // //                         tickLine={false}
// // //                       />
// // //                     </LineChart>
// // //                   </ResponsiveContainer>
// // //                 </Box>
// // //               </CardPaper>
// // //             </Grid>

// // //             <Grid item xs={12}>
// // //               <CardPaper>
// // //                 <Typography variant="h6" gutterBottom>Projects Status</Typography>
// // //                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1, minHeight: 100 }}>
// // //                   <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "70%" }}>
// // //                     <Box sx={{ textAlign: "center" }}>
// // //                       <Typography variant="body1" color="text.secondary">Total</Typography>
// // //                       <Typography variant="h4" sx={{ fontWeight: "bold" }}>0</Typography>
// // //                     </Box>
// // //                   </Box>
// // //                   <StatusLegend items={projectStatusItems} />
// // //                 </Box>
// // //               </CardPaper>
// // //             </Grid>
// // //           </Grid>
// // //         </Grid>



// // //       </Grid>
// // //     </Box>
// // //   )
// // // }


// // // import React, { useState } from 'react'
// // // import {
// // //   Box, Typography, Button, Paper, Table, TableBody,
// // //   TableCell, TableContainer, TableHead, TableRow, Select,
// // //   MenuItem, TextField
// // // } from '@mui/material'

// // // export default function IntegratedAttendanceSystem() {
// // //   const [entries, setEntries] = useState(10)
// // //   const [searchTerm, setSearchTerm] = useState('')
// // //   const [currentPage, setCurrentPage] = useState(1)

// // //   const attendanceData = [
// // //     {
// // //       id: 1,
// // //       name: 'Prasad Shinde',
// // //       email: 'prasad.shinde@tdtl.world',
// // //       date: '2024-10-08',
// // //       status: 'Present',
// // //       clockIn: '09:28',
// // //       clockOut: '00:00',
// // //       late: '00:00',
// // //       earlyLeaving: '00:00',
// // //       totalWork: '00:00'
// // //     },
// // //     {
// // //       id: 2,
// // //       name: 'Anagha Dolase',
// // //       email: 'angha.dolase@tdtl.world',
// // //       date: '2024-10-08',
// // //       status: 'Present',
// // //       clockIn: '09:36',
// // //       clockOut: '00:00',
// // //       late: '00:00',
// // //       earlyLeaving: '00:00',
// // //       totalWork: '00:00'
// // //     },
// // //     {
// // //       id: 3,
// // //       name: 'QADIRULLA HUSSAINI SYED',
// // //       email: 'qadirulla.hussaini@tdtl.world',
// // //       date: '2024-10-08',
// // //       status: 'Present',
// // //       clockIn: '09:39',
// // //       clockOut: '00:00',
// // //       late: '00:00',
// // //       earlyLeaving: '00:00',
// // //       totalWork: '00:00'
// // //     },
// // //   ]

// // //   const filteredData = attendanceData.filter((item) =>
// // //     Object.values(item).some((value) =>
// // //       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
// // //     )
// // //   )

// // //   const startIndex = (currentPage - 1) * entries
// // //   const paginatedData = filteredData.slice(startIndex, startIndex + entries)
// // //   const totalPages = Math.ceil(filteredData.length / entries)

// // //   return (
// // //     <Box sx={{ mt: 2 }}>
// // //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // //         <Typography variant="h4">Attendance</Typography>
// // //       </Box>

// // //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography>Show</Typography>
// // //           <Select
// // //             size="small"
// // //             value={entries}
// // //             onChange={(e) => setEntries(Number(e.target.value))}
// // //             sx={{ minWidth: 80 }}
// // //           >
// // //             <MenuItem value={2}>2</MenuItem>
// // //             <MenuItem value={5}>5</MenuItem>
// // //             <MenuItem value={10}>10</MenuItem>
// // //           </Select>
// // //           <Typography>entries</Typography>
// // //         </Box>
// // //         <TextField
// // //           size="small"
// // //           placeholder="Search..."
// // //           value={searchTerm}
// // //           onChange={(e) => setSearchTerm(e.target.value)}
// // //         />
// // //       </Box>

// // //       <Paper sx={{ width: '100%', mb: 2 }}>
// // //         <TableContainer>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow>
// // //                 <TableCell>EMPLOYEE</TableCell>
// // //                 <TableCell>DATE</TableCell>
// // //                 <TableCell>STATUS</TableCell>
// // //                 <TableCell>CLOCK IN</TableCell>
// // //                 <TableCell>CLOCK OUT</TableCell>
// // //                 <TableCell>LATE</TableCell>
// // //                 <TableCell>EARLY LEAVING</TableCell>
// // //                 <TableCell>TOTAL WORK</TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {paginatedData.map((row) => (
// // //                 <TableRow key={row.id}>
// // //                   <TableCell>
// // //                     <Typography variant="body1">{row.name}</Typography>
// // //                     <Typography variant="body2" color="textSecondary">{row.email}</Typography>
// // //                   </TableCell>
// // //                   <TableCell>{row.date}</TableCell>
// // //                   <TableCell>
// // //                     <Box sx={{
// // //                       bgcolor: 'success.main',
// // //                       color: 'white',
// // //                       px: 1,
// // //                       py: 0.5,
// // //                       borderRadius: '16px',
// // //                       display: 'inline-block'
// // //                     }}>
// // //                       {row.status}
// // //                     </Box>
// // //                   </TableCell>
// // //                   <TableCell>{row.clockIn}</TableCell>
// // //                   <TableCell>{row.clockOut}</TableCell>
// // //                   <TableCell>{row.late}</TableCell>
// // //                   <TableCell>{row.earlyLeaving}</TableCell>
// // //                   <TableCell>{row.totalWork}</TableCell>
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       </Paper>

// // //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
// // //         <Button
// // //           variant="outlined"
// // //           disabled={currentPage === 1}
// // //           onClick={() => setCurrentPage((prev) => prev - 1)}
// // //         >
// // //           Previous
// // //         </Button>
// // //         <Typography>
// // //           Page {currentPage} of {totalPages}
// // //         </Typography>
// // //         <Button
// // //           variant="outlined"
// // //           disabled={currentPage === totalPages}
// // //           onClick={() => setCurrentPage((prev) => prev + 1)}
// // //         >
// // //           Next
// // //         </Button>
// // //       </Box>
// // //     </Box>
// // //   )
// // // }




// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Typography, Button, Paper, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow, Select,
//   MenuItem, TextField, CircularProgress, Alert
// } from '@mui/material';

// // Helper function to determine the color of the status badge
// const getStatusStyle = (status) => {
//   switch (status?.toLowerCase()) {
//     case 'present':
//       return { bgcolor: 'success.main', color: 'white' };
//     case 'absent':
//       return { bgcolor: 'error.main', color: 'white' };
//     case 'on leave':
//       return { bgcolor: 'info.main', color: 'white' };
//     default:
//       return { bgcolor: 'grey.500', color: 'white' };
//   }
// };

// export default function IntegratedAttendanceSystemLM() {
//   // State for API data, loading, and errors
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for table controls
//   const [entries, setEntries] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch data on component mount using the new authenticated pattern
//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // 1. Get user ID and access token from local storage
//         const loggedInUserId = localStorage.getItem('loggedInUser'); // Or 'employee_id' if that's the correct key
//         const accessToken = localStorage.getItem('accessToken');

//         // 2. Validate that credentials exist
//         if (!loggedInUserId || !accessToken) {
//           throw new Error("User session details not found. Please log in again.");
//         }

//         // 3. Construct the API URL and Headers
//         const apiUrl = `https://tdtlworld.com/hrms-backend/my_attendance/${loggedInUserId}/`;
//         const headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//         };
        
//         // 4. Fetch data from the API with authorization
//         const response = await fetch(apiUrl, { method: 'GET', headers });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch attendance data. Server responded with status ${response.status}.`);
//         }
        
//         const data = await response.json();

//         // Assuming the data is in an "attendance" key
//         if (data && Array.isArray(data.attendance)) {
//           setAttendanceData(data.attendance);
//         } else {
//           setAttendanceData([]);
//           console.warn("API response did not contain a valid 'attendance' array:", data);
//         }
//       } catch (err) {
//         console.error("Error fetching attendance data:", err);
//         setError(err.message || 'An unexpected error occurred.');
//         setAttendanceData([]); // Clear data on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   // Memoized filtering and pagination logic for performance
//   const filteredData = useMemo(() => {
//     return attendanceData.filter((item) =>
//       Object.values(item).some((value) =>
//         value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [attendanceData, searchTerm]);
  
//   const totalPages = Math.ceil(filteredData.length / entries);

//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * entries;
//     return filteredData.slice(startIndex, startIndex + entries);
//   }, [filteredData, currentPage, entries]);

//   // Reset to page 1 if filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, entries]);

//   const renderTableContent = () => {
//     if (loading) {
//       return (
//         <TableRow>
//             <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
//                 <CircularProgress />
//             </TableCell>
//         </TableRow>
//       );
//     }

//     if (error) {
//         return (
//             <TableRow>
//                 <TableCell colSpan={8}>
//                     <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
//                 </TableCell>
//             </TableRow>
//         );
//     }
    
//     if (paginatedData.length === 0) {
//         return (
//             <TableRow>
//                 <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
//                     <Typography>No attendance records found.</Typography>
//                 </TableCell>
//             </TableRow>
//         );
//     }

//     return (
//       <TableBody>
//         {paginatedData.map((row) => (
//           <TableRow key={row.id}>
//             <TableCell>
//               <Typography variant="body1">{row.employee_name}</Typography>
//               <Typography variant="body2" color="textSecondary">{row.employee_email}</Typography>
//             </TableCell>
//             <TableCell>{row.date}</TableCell>
//             <TableCell>
//               <Box sx={{
//                 ...getStatusStyle(row.status),
//                 px: 1.5,
//                 py: 0.5,
//                 borderRadius: '16px',
//                 display: 'inline-block',
//                 textAlign: 'center',
//                 minWidth: '70px'
//               }}>
//                 {row.status}
//               </Box>
//             </TableCell>
//             <TableCell>{row.clock_in}</TableCell>
//             <TableCell>{row.clock_out}</TableCell>
//             <TableCell>{row.late_by}</TableCell>
//             <TableCell>{row.early_leaving_by}</TableCell>
//             <TableCell>{row.total_work_duration}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     );
//   };

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h4">Today's Attendance</Typography>
//       </Box>

//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography>Show</Typography>
//           <Select
//             size="small"
//             value={entries}
//             onChange={(e) => setEntries(Number(e.target.value))}
//             sx={{ minWidth: 80 }}
//           >
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//           <Typography>entries</Typography>
//         </Box>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </Box>

//       <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 'bold' } }}>
//                 <TableCell>EMPLOYEE</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>CLOCK IN</TableCell>
//                 <TableCell>CLOCK OUT</TableCell>
//                 <TableCell>LATE</TableCell>
//                 <TableCell>EARLY LEAVING</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             {renderTableContent()}
//           </Table>
//         </TableContainer>
//       </Paper>

//       {!loading && !error && filteredData.length > 0 && (
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
//           <Typography>
//             Showing {Math.min((currentPage - 1) * entries + 1, filteredData.length)} to {Math.min(currentPage * entries, filteredData.length)} of {filteredData.length} entries
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             <Button
//               variant="outlined"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outlined"
//               disabled={currentPage === totalPages || totalPages === 0}
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// }


// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Typography, Button, Paper, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow, Select,
//   MenuItem, TextField, CircularProgress, Alert
// } from '@mui/material';

// // Helper function to determine the color of the status badge
// const getStatusStyle = (status) => {
//   switch (status?.toLowerCase()) {
//     case 'present':
//       return { bgcolor: 'success.main', color: 'white' };
//     case 'absent':
//       return { bgcolor: 'error.main', color: 'white' };
//     case 'on leave':
//       return { bgcolor: 'info.main', color: 'white' };
//     default:
//       return { bgcolor: 'grey.500', color: 'white' };
//   }
// };

// export default function IntegratedAttendanceSystem() {
//   // State for API data, loading, and errors
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for table controls
//   const [entries, setEntries] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch data on component mount using the new authenticated pattern
//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // 1. Get user ID and access token from local storage
//         const loggedInUserId = localStorage.getItem('loggedInUser'); // Or 'employee_id' if that's the correct key
//         const accessToken = localStorage.getItem('accessToken');

//         // 2. Validate that credentials exist
//         if (!loggedInUserId || !accessToken) {
//           throw new Error("User session details not found. Please log in again.");
//         }

//         // 3. Construct the API URL and Headers
//         const apiUrl = `https://tdtlworld.com/hrms-backend/my_attendance/${loggedInUserId}/`;
//         const headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//         };

//         // 4. Fetch data from the API with authorization
//         const response = await fetch(apiUrl, { method: 'GET', headers });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch attendance data. Server responded with status ${response.status}.`);
//         }

//         const data = await response.json();

//         // Assuming the data is in an "attendance" key
//         if (data && Array.isArray(data.attendance)) {
//           setAttendanceData(data.attendance);
//         } else {
//           setAttendanceData([]);
//           console.warn("API response did not contain a valid 'attendance' array:", data);
//         }
//       } catch (err) {
//         console.error("Error fetching attendance data:", err);
//         setError(err.message || 'An unexpected error occurred.');
//         setAttendanceData([]); // Clear data on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   // Memoized filtering and pagination logic for performance
//   const filteredData = useMemo(() => {
//     return attendanceData.filter((item) =>
//       Object.values(item).some((value) =>
//         value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [attendanceData, searchTerm]);

//   const totalPages = Math.ceil(filteredData.length / entries);

//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * entries;
//     return filteredData.slice(startIndex, startIndex + entries);
//   }, [filteredData, currentPage, entries]);

//   // Reset to page 1 if filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, entries]);

//   const renderTableContent = () => {
//     if (loading) {
//       return (
//         <TableRow>
//           <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
//             <CircularProgress />
//           </TableCell>
//         </TableRow>
//       );
//     }

//     if (error) {
//       return (
//         <TableRow>
//           <TableCell colSpan={8}>
//             <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
//           </TableCell>
//         </TableRow>
//       );
//     }

//     if (paginatedData.length === 0) {
//       return (
//         <TableRow>
//           <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
//             <Typography>No attendance records found.</Typography>
//           </TableCell>
//         </TableRow>
//       );
//     }

//     return (
//       <TableBody>
//         {paginatedData.map((row) => (
//           <TableRow key={row.id}>
//             <TableCell>
//               <Typography variant="body1">{row.employee_name}</Typography>
//               <Typography variant="body2" color="textSecondary">{row.employee_email}</Typography>
//             </TableCell>
//             <TableCell>{row.attendance_date}</TableCell>
//             <TableCell>
//               <Box sx={{
//                 ...getStatusStyle(row.status),
//                 px: 1.5,
//                 py: 0.5,
//                 borderRadius: '16px',
//                 display: 'inline-block',
//                 textAlign: 'center',
//                 minWidth: '70px'
//               }}>
//                 {row.status}
//               </Box>
//             </TableCell>
//             {/* <TableCell>{row.clock_in.toLocaleTimeString()}</TableCell>
//             <TableCell>{row.clock_out.toLocaleTimeString()}</TableCell> */}
//             <TableCell>{new Date(Date.UTC(
//               new Date().getFullYear(),
//               new Date().getMonth(),
//               new Date().getDate(),
//               ...row.clock_in.split(':').map(Number)
//             )).toLocaleTimeString()}</TableCell>
//             <TableCell>{new Date(Date.UTC(
//               new Date().getFullYear(),
//               new Date().getMonth(),
//               new Date().getDate(),
//               ...row.clock_out.split(':').map(Number)
//             )).toLocaleTimeString()}</TableCell>
//             <TableCell>{row.late_mark}</TableCell>
//             <TableCell>{row.early_mark}</TableCell>
//             <TableCell>{row.total_work}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     );
//   };

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h4">Today's Attendance</Typography>
//       </Box>

//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography>Show</Typography>
//           <Select
//             size="small"
//             value={entries}
//             onChange={(e) => setEntries(Number(e.target.value))}
//             sx={{ minWidth: 80 }}
//           >
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//           <Typography>entries</Typography>
//         </Box>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </Box>

//       <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 'bold' } }}>
//                 <TableCell>EMPLOYEE</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>CLOCK IN</TableCell>
//                 <TableCell>CLOCK OUT</TableCell>
//                 <TableCell>LATE</TableCell>
//                 <TableCell>EARLY LEAVING</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             {renderTableContent()}
//           </Table>
//         </TableContainer>
//       </Paper>

//       {!loading && !error && filteredData.length > 0 && (
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
//           <Typography>
//             Showing {Math.min((currentPage - 1) * entries + 1, filteredData.length)} to {Math.min(currentPage * entries, filteredData.length)} of {filteredData.length} entries
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             <Button
//               variant="outlined"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outlined"
//               disabled={currentPage === totalPages || totalPages === 0}
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// }   ///






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

// Helper function to format time to 12-hour AM/PM and handle '00:00'
const formatTime = (timeString) => {
  // If time is null, '00:00:00', or '00:00', return a dash
  if (!timeString || timeString === '00:00:00' || timeString === '00:00') {
    return '-';
  }

  try {
    const today = new Date();
    const [hours, minutes] = timeString.split(':');
    today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

    return today.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  } catch (error) {
    console.error("Could not format time:", timeString, error);
    return '-'; // Return dash on any formatting error
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
            {/* Using the new formatTime helper function */}
            <TableCell>{formatTime(row.clock_in)}</TableCell>
            <TableCell>{formatTime(row.clock_out)}</TableCell>
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
              {/* Renamed headers */}
              <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 'bold' } }}>
                <TableCell>EMPLOYEE</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>PUNCH IN</TableCell>
                <TableCell>PUNCH OUT</TableCell>
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