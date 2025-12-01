// import React, { useEffect, useState, useContext } from 'react';
// import {
//   ThemeProvider,
//   createTheme,
//   Paper,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Box,
//   Select,
//   MenuItem,
//   FormControl,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   IconButton,
//   Divider,
//   Chip,
//   InputAdornment,
//   FormHelperText,
//   CssBaseline,
//   Switch,
//   FormControlLabel,
//   InputLabel,
//   Tooltip, // Added for tooltips
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit'; // Added Edit Icon
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import axiosInstance from '../../utils/axiosInstance';
// import dayjs from 'dayjs';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#7c4dff',
//     },
//     background: {
//       default: '#f5f5f9',
//     },
//   },
// });

// const getInitialNewShiftState = () => ({
//   company_id: 2,
//   name: '',
//   employee_hub_id: '',
//   times: {
//     monday: { in: '', out: '' },
//     tuesday: { in: '', out: '' },
//     wednesday: { in: '', out: '' },
//     thursday: { in: '', out: '' },
//     friday: { in: '', out: '' },
//     saturday: { in: '', out: '' },
//     sunday: { in: '', out: '' }
//   },
//   weekendSettings: {
//     saturday: false,
//     sunday: false
//   }
// });

// function OfficeShifts() {
//   const [shifts, setShifts] = useState([]);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [newShift, setNewShift] = useState(getInitialNewShiftState());
//   const [employeeHubs, setEmployeeHubs] = useState([]);
  
//   // --- New State for Editing ---
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingShiftId, setEditingShiftId] = useState(null);

//   const fetchShifts = async () => {
//     try {
//       const response = await axiosInstance.get('shifts/');
//       setShifts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch shifts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchShifts();
//     const fetchEmployeeHubs = async () => {
//       try {
//         const response = await axiosInstance.get('api/employee_hub/');
//         if (response.data.status === 'success') {
//           setEmployeeHubs(response.data.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch employee hubs:', error);
//       }
//     };
//     fetchEmployeeHubs();
//   }, []);

//   useEffect(() => { setPage(0); }, [rowsPerPage, searchTerm]);

//   const handleTimeChange = (day, type, value) => {
//     setNewShift(prev => ({ ...prev, times: { ...prev.times, [day]: { ...prev.times[day], [type]: value }}}));
//   };
  
//   const handleWeekendToggle = (day) => {
//     setNewShift(prev => {
//       const isNowHoliday = !prev.weekendSettings[day];
//       return { ...prev, weekendSettings: { ...prev.weekendSettings, [day]: isNowHoliday },
//                times: { ...prev.times, [day]: { in: isNowHoliday ? 'Holiday' : '', out: isNowHoliday ? 'Holiday' : '' }}};
//     });
//   };

//   const handleClearTime = (day, type) => { handleTimeChange(day, type, ''); };

//   // --- MODIFIED: Handles both Add (POST) and Edit (PUT) ---
//   const handleSubmit = async () => {
//     if (!newShift.name || !newShift.employee_hub_id) {
//       alert("Shift Name and Employee Hub are required.");
//       return;
//     }
    
//     // Base payload for both add and edit
//     const basePayload = {
//       shift_name: newShift.name,
//       employee_hub_id: newShift.employee_hub_id,
//       monday_in_time: newShift.times.monday.in, monday_out_time: newShift.times.monday.out,
//       tuesday_in_time: newShift.times.tuesday.in, tuesday_out_time: newShift.times.tuesday.out,
//       wednesday_in_time: newShift.times.wednesday.in, wednesday_out_time: newShift.times.wednesday.out,
//       thursday_in_time: newShift.times.thursday.in, thursday_out_time: newShift.times.thursday.out,
//       friday_in_time: newShift.times.friday.in, friday_out_time: newShift.times.friday.out,
//       saturday_in_time: newShift.times.saturday.in, saturday_out_time: newShift.times.saturday.out,
//       sunday_in_time: newShift.times.sunday.in, sunday_out_time: newShift.times.sunday.out
//     };

//     try {
//       if (isEditMode) {
//         const payload = { ...basePayload, shift_id: editingShiftId };
//         await axiosInstance.put(`shifts/${editingShiftId}/`, payload);
//       } else {
//         const payload = { ...basePayload, company_id: newShift.company_id, created_at: dayjs().format('YYYY-MM-DD HH:mm:ss') };
//         await axiosInstance.post('shifts/', payload);
//       }
//       fetchShifts();
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving shift:', error.response?.data || error.message);
//     }
//   };
  
//   // --- NEW: Function to handle opening the dialog for editing ---
//   const handleEdit = (shiftToEdit) => {
//     setIsEditMode(true);
//     setEditingShiftId(shiftToEdit.office_shift_id);

//     const isSaturdayHoliday = shiftToEdit.saturday_in_time === 'Holiday';
//     const isSundayHoliday = shiftToEdit.sunday_in_time === 'Holiday';
    
//     setNewShift({
//       company_id: shiftToEdit.company_id || 2,
//       name: shiftToEdit.shift_name,
//       employee_hub_id: shiftToEdit.employee_hub_id,
//       times: {
//         monday: { in: shiftToEdit.monday_in_time, out: shiftToEdit.monday_out_time },
//         tuesday: { in: shiftToEdit.tuesday_in_time, out: shiftToEdit.tuesday_out_time },
//         wednesday: { in: shiftToEdit.wednesday_in_time, out: shiftToEdit.wednesday_out_time },
//         thursday: { in: shiftToEdit.thursday_in_time, out: shiftToEdit.thursday_out_time },
//         friday: { in: shiftToEdit.friday_in_time, out: shiftToEdit.friday_out_time },
//         saturday: { in: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_in_time, out: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_out_time },
//         sunday: { in: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_in_time, out: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_out_time },
//       },
//       weekendSettings: {
//         saturday: isSaturdayHoliday,
//         sunday: isSundayHoliday,
//       }
//     });
//     setOpenAddDialog(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this shift?')) {
//       try {
//         await axiosInstance.delete(`shifts/${id}/`);
//         fetchShifts();
//       } catch (error) {
//         console.error('Failed to delete shift:', error);
//       }
//     }
//   };

//   const handleReset = () => { setNewShift(getInitialNewShiftState()); };

//   const handleCloseDialog = () => {
//     setOpenAddDialog(false);
//     setIsEditMode(false); // Reset edit mode
//     setEditingShiftId(null); // Clear editing ID
//     handleReset();
//   };
  
//   const handleChangePage = (newPage) => { setPage(newPage); };
  
//   const renderTimeInput = (day, type) => (
//     <TextField
//       fullWidth type="time" value={newShift.times[day][type]}
//       onChange={(e) => handleTimeChange(day, type, e.target.value)}
//       disabled={newShift.weekendSettings[day] === true}
//       InputProps={{
//         startAdornment: (<InputAdornment position="start"><AccessTimeIcon /></InputAdornment>),
//         endAdornment: newShift.times[day][type] ? (<InputAdornment position="end"><IconButton onClick={() => handleClearTime(day, type)} edge="end" size="small"><DeleteIcon fontSize="small" /></IconButton></InputAdornment>) : null,
//       }}
//       sx={{ bgcolor: 'background.paper' }}
//     />
//   );
  
//   const filteredShifts = shifts.filter(shift => shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase()));
//   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(filteredShifts.length / rowsPerPage);
//   const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: 3 }}>
//         <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All Office Shifts</Typography>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)}>Add New</Button>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <FormControl size="small" sx={{ minWidth: 120 }}>
//               <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
//                 <MenuItem value={5}>5</MenuItem> <MenuItem value={10}>10</MenuItem> <MenuItem value={20}>20</MenuItem>
//               </Select>
//               <FormHelperText>Entries per page</FormHelperText>
//             </FormControl>
//             <TextField size="small" placeholder="Search by Shift Name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: '250px' }} />
//           </Box>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: 'action.hover' }}>
//                   <TableCell>SHIFT</TableCell>
//                   {daysOfWeek.map(day => (<TableCell key={day}>{day.toUpperCase()}</TableCell>))}
//                   <TableCell align="right">ACTION</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedShifts.length > 0 ? paginatedShifts.map((shift) => (
//                   <TableRow key={shift.office_shift_id} hover>
//                     <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
//                     {daysOfWeek.map(day => (
//                       <TableCell key={day}>
//                         {shift[`${day}_in_time`] === 'Holiday' ? <Chip label="Holiday" color="success" size="small" /> : `${shift[`${day}_in_time`] || '--:--'} To ${shift[`${day}_out_time`] || '--:--'}`}
//                       </TableCell>
//                     ))}
//                     <TableCell align="right">
//                       {/* --- Added Edit Button --- */}
//                       <Tooltip title="Edit Shift">
//                         <IconButton onClick={() => handleEdit(shift)} color="primary" aria-label="edit shift">
//                           <EditIcon />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete Shift">
//                         <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="error" aria-label="delete shift">
//                           <DeleteIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 )) : (
//                   <TableRow><TableCell colSpan={9} align="center">No shifts found.</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1 }}>
//             <Typography variant="body2" color="text.secondary">Showing {paginatedShifts.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredShifts.length)} of {filteredShifts.length} entries</Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button variant="outlined" disabled={page === 0} onClick={() => handleChangePage(page - 1)}>Previous</Button>
//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => handleChangePage(page + 1)}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>
//         <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{isEditMode ? "Edit Office Shift" : "Add New Office Shift"}</Typography>
//             <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Hide</Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>
//                   Shift Name <span style={{ color: 'red' }}>*</span>
//                 </Typography>
//                 <TextField fullWidth placeholder="e.g. Morning Shift" value={newShift.name}
//                   onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))} required />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>
//                   Employee Hub <span style={{ color: 'red' }}>*</span>
//                 </Typography>
//                 <FormControl fullWidth>
//                   <InputLabel id="employee-hub-label">Select Hub</InputLabel>
//                   <Select labelId="employee-hub-label" label="Select Hub"
//                     value={newShift.employee_hub_id}
//                     onChange={(e) => setNewShift(prev => ({ ...prev, employee_hub_id: e.target.value }))}
//                     required >
//                     {employeeHubs.map((hub) => (
//                       <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>
//                         {hub.employee_hub_name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               {daysOfWeek.map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'in')}</Grid>
//                     <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Typography color="text.secondary">To</Typography></Grid>
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'out')}</Grid>
//                     {(day === "saturday" || day === "sunday") && (
//                       <Grid item xs={12}>
//                         <FormControlLabel control={<Switch checked={newShift.weekendSettings[day]} onChange={() => handleWeekendToggle(day)} color="primary"/>} label={`Mark as holiday`} />
//                       </Grid>
//                     )}
//                   </Grid>
//                   {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContent>
//           <DialogActions sx={{ p: '16px 24px' }}>
//             <Button onClick={handleReset} color="secondary" variant="outlined">Reset</Button>
//             <Button variant="contained" onClick={handleSubmit}>Save</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default OfficeShifts;

// // import React, { useState, useEffect } from 'react';
// // import {
// //   ThemeProvider,
// //   createTheme,
// //   Paper,
// //   Typography,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TextField,
// //   Box,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Grid,
// //   IconButton,
// //   Divider,
// //   Chip,
// //   InputAdornment,
// //   FormHelperText,
// //   CssBaseline,
// //   Switch,
// //   FormControlLabel
// // } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // import axiosInstance from '../../utils/axiosInstance';
// // import dayjs from 'dayjs';

// // const theme = createTheme({
// //   palette: {
// //     primary: {
// //       main: '#7c4dff',
// //     },
// //     background: {
// //       default: '#f5f5f9',
// //     },
// //   },
// // });

// // function OfficeShifts() {
// //   const [shifts, setShifts] = useState([]);
// //   const [openAddDialog, setOpenAddDialog] = useState(false);
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
// //   const [searchTerm, setSearchTerm] = useState('');

// //   const [newShift, setNewShift] = useState({
// //     company_id: '',
// //     name: '',
// //     times: {
// //       monday: { in: '', out: '' },
// //       tuesday: { in: '', out: '' },
// //       wednesday: { in: '', out: '' },
// //       thursday: { in: '', out: '' },
// //       friday: { in: '', out: '' },
// //       saturday: { in: '', out: '' },
// //       sunday: { in: '', out: '' }
// //     },
// //     weekendSettings: {
// //       saturday: false,
// //       sunday: false
// //     }
// //   });

// //   const fetchShifts = async () => {
// //     try {
// //       const response = await axiosInstance.get('shifts/');
// //       setShifts(response.data);
// //     } catch (error) {
// //       console.error('Failed to fetch shifts:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchShifts();
// //   }, []);

// //   useEffect(() => {
// //     setPage(0);
// //   }, [rowsPerPage, searchTerm]);

// //   const handleTimeChange = (day, type, value) => {
// //     setNewShift(prev => ({
// //       ...prev,
// //       times: {
// //         ...prev.times,
// //         [day]: {
// //           ...prev.times[day],
// //           [type]: value
// //         }
// //       }
// //     }));
// //   };

// //   const handleWeekendToggle = (day) => {
// //     setNewShift(prev => ({
// //       ...prev,
// //       weekendSettings: {
// //         ...prev.weekendSettings,
// //         [day]: !prev.weekendSettings[day]
// //       },
// //       times: {
// //         ...prev.times,
// //         [day]: {
// //           in: !prev.weekendSettings[day] ? 'Holiday' : '',
// //           out: !prev.weekendSettings[day] ? 'Holiday' : ''
// //         }
// //       }
// //     }));
// //   };

// //   const handleClearTime = (day, type) => {
// //     handleTimeChange(day, type, '');
// //   };

// //   const handleSubmit = async () => {
// //     if (!newShift.name || !newShift.company_id) {
      
// //       return;
// //     }

// //     const payload = {
// //       shift_name: newShift.name,
// //       company_id: newShift.company_id,
// //       created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
// //       monday_in_time: newShift.times.monday.in,
// //       monday_out_time: newShift.times.monday.out,
// //       tuesday_in_time: newShift.times.tuesday.in,
// //       tuesday_out_time: newShift.times.tuesday.out,
// //       wednesday_in_time: newShift.times.wednesday.in,
// //       wednesday_out_time: newShift.times.wednesday.out,
// //       thursday_in_time: newShift.times.thursday.in,
// //       thursday_out_time: newShift.times.thursday.out,
// //       friday_in_time: newShift.times.friday.in,
// //       friday_out_time: newShift.times.friday.out,
// //       saturday_in_time: newShift.times.saturday.in,
// //       saturday_out_time: newShift.times.saturday.out,
// //       sunday_in_time: newShift.times.sunday.in,
// //       sunday_out_time: newShift.times.sunday.out
// //     };

// //     try {
// //       await axiosInstance.post('shifts/', payload);
// //       fetchShifts();
// //       handleCloseDialog();
// //     } catch (error) {
// //       console.error('Error saving shift:', error);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await axiosInstance.delete(`shifts/${id}/`);
// //       fetchShifts();
// //     } catch (error) {
// //       console.error('Failed to delete shift:', error);
// //     }
// //   };

// //   const handleReset = () => {
// //     setNewShift({
// //       company_id: '',
// //       name: '',
// //       times: {
// //         monday: { in: '', out: '' },
// //         tuesday: { in: '', out: '' },
// //         wednesday: { in: '', out: '' },
// //         thursday: { in: '', out: '' },
// //         friday: { in: '', out: '' },
// //         saturday: { in: '', out: '' },
// //         sunday: { in: '', out: '' }
// //       },
// //       weekendSettings: {
// //         saturday: false,
// //         sunday: false
// //       }
// //     });
// //   };

// //   const handleCloseDialog = () => {
// //     setOpenAddDialog(false);
// //     handleReset();
// //   };

// //   const handleChangePage = (newPage) => {
// //     setPage(newPage);
// //   };

// //   const renderTimeInput = (day, type) => (
// //     <TextField
// //       fullWidth
// //       type="time"
// //       value={newShift.times[day][type]}
// //       onChange={(e) => handleTimeChange(day, type, e.target.value)}
// //       disabled={newShift.weekendSettings[day]}
// //       InputProps={{
// //         startAdornment: (
// //           <InputAdornment position="start">
// //             <AccessTimeIcon />
// //           </InputAdornment>
// //         ),
// //         endAdornment: (
// //           <InputAdornment position="end">
// //             <IconButton onClick={() => handleClearTime(day, type)} edge="end" size="small">
// //               <DeleteIcon />
// //             </IconButton>
// //           </InputAdornment>
// //         )
// //       }}
// //       sx={{ bgcolor: 'background.paper' }}
// //     />
// //   );

// //   const filteredShifts = shifts.filter(shift =>
// //     shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// //   const totalPages = Math.ceil(filteredShifts.length / rowsPerPage);

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <CssBaseline />
// //       <Box sx={{ p: 3 }}>
// //         <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All Office Shifts</Typography>
// //             <Button
// //               variant="contained"
// //               startIcon={<AddIcon />}
// //               onClick={() => setOpenAddDialog(true)}
// //               sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}
// //             >
// //               Add New
// //             </Button>
// //           </Box>

// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
// //             <FormControl size="small" sx={{ minWidth: 120 }}>
// //               <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
// //                 <MenuItem value={5}>5</MenuItem>
// //                 <MenuItem value={10}>10</MenuItem>
// //                 <MenuItem value={20}>20</MenuItem>
// //               </Select>
// //               <FormHelperText>Entries per page</FormHelperText>
// //             </FormControl>

// //             <TextField
// //               size="small"
// //               placeholder="Search"
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //           </Box>

// //           <TableContainer>
// //             <Table>
// //               <TableHead>
// //                 <TableRow sx={{ bgcolor: '#f5f5f5' }}>
// //                   <TableCell>SHIFT</TableCell>
// //                   <TableCell>MONDAY</TableCell>
// //                   <TableCell>TUESDAY</TableCell>
// //                   <TableCell>WEDNESDAY</TableCell>
// //                   <TableCell>THURSDAY</TableCell>
// //                   <TableCell>FRIDAY</TableCell>
// //                   <TableCell>SATURDAY</TableCell>
// //                   <TableCell>SUNDAY</TableCell>
// //                   <TableCell>ACTION</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {paginatedShifts.map((shift) => (
// //                   <TableRow key={shift.office_shift_id}>
// //                     <TableCell>{shift.shift_name}</TableCell>
// //                     {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(day => (
// //                       <TableCell key={day}>
// //                         {shift[`${day}_in_time`] === 'Holiday'
// //                           ? <Chip label="Holiday" color="success" size="small" />
// //                           : `${shift[`${day}_in_time`]} To ${shift[`${day}_out_time`]}`}
// //                       </TableCell>
// //                     ))}
// //                     <TableCell>
// //                       <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="error">
// //                         <DeleteIcon />
// //                       </IconButton>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>

// //           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
// //             <Button variant="outlined" disabled={page === 0} onClick={() => handleChangePage(page - 1)}>Previous</Button>
// //             <Typography variant="body2" sx={{ alignSelf: 'center' }}>
// //               Page {page + 1} of {totalPages}
// //             </Typography>
// //             <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => handleChangePage(page + 1)}>Next</Button>
// //           </Box>
// //         </Paper>

// //         {/* Add Shift Dialog */}
// //         <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
// //           <DialogTitle>
// //             <Typography variant="h6">Add New Office Shift</Typography>
// //             <Button
// //               variant="contained"
// //               onClick={handleCloseDialog}
// //               sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' }, mt: 1 }}
// //             >
// //               Hide
// //             </Button>
// //           </DialogTitle>
// //           <Divider />
// //           <DialogContent>
// //             <Grid container spacing={3}>
// //               <Grid item xs={12}>
// //                 <Typography variant="subtitle1" sx={{ mb: 1 }}>
// //                   Company ID <span style={{ color: 'red' }}>*</span>
// //                 </Typography>
// //                 <TextField
// //                   fullWidth
// //                   placeholder="Company ID"
// //                   value={newShift.company_id}
// //                   onChange={(e) => setNewShift(prev => ({ ...prev, company_id: e.target.value }))}
// //                 />
// //               </Grid>
// //               <Grid item xs={12}>
// //                 <Typography variant="subtitle1" sx={{ mb: 1 }}>
// //                   Shift Name <span style={{ color: 'red' }}>*</span>
// //                 </Typography>
// //                 <TextField
// //                   fullWidth
// //                   placeholder="Shift Name"
// //                   value={newShift.name}
// //                   onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))}
// //                 />
// //               </Grid>

// //               {["monday", "tuesday", "wednesday", "thursday", "friday"].map(day => (
// //                 <Grid item xs={12} key={day}>
// //                   <Grid container spacing={2}>
// //                     <Grid item xs={12} sm={6}>
// //                       <Typography variant="subtitle1" sx={{ mb: 1 }}>
// //                         {day.charAt(0).toUpperCase() + day.slice(1)} In Time
// //                       </Typography>
// //                       {renderTimeInput(day, 'in')}
// //                     </Grid>
// //                     <Grid item xs={12} sm={6}>
// //                       <Typography variant="subtitle1" sx={{ mb: 1 }}>
// //                         {day.charAt(0).toUpperCase() + day.slice(1)} Out Time
// //                       </Typography>
// //                       {renderTimeInput(day, 'out')}
// //                     </Grid>
// //                   </Grid>
// //                 </Grid>
// //               ))}

// //               {["saturday", "sunday"].map(day => (
// //                 <Grid item xs={12} key={day}>
// //                   <Grid container spacing={2}>
// //                     <Grid item xs={12} sm={6}>
// //                       <Typography variant="subtitle1" sx={{ mb: 1 }}>
// //                         {day.charAt(0).toUpperCase() + day.slice(1)} In Time
// //                       </Typography>
// //                       {renderTimeInput(day, 'in')}
// //                     </Grid>
// //                     <Grid item xs={12} sm={6}>
// //                       <Typography variant="subtitle1" sx={{ mb: 1 }}>
// //                         {day.charAt(0).toUpperCase() + day.slice(1)} Out Time
// //                       </Typography>
// //                       {renderTimeInput(day, 'out')}
// //                     </Grid>
// //                     <Grid item xs={12}>
// //                       <FormControlLabel
// //                         control={
// //                           <Switch
// //                             checked={newShift.weekendSettings[day]}
// //                             onChange={() => handleWeekendToggle(day)}
// //                             color="primary"
// //                           />
// //                         }
// //                         label={`Mark ${day.charAt(0).toUpperCase() + day.slice(1)} as holiday`}
// //                       />
// //                     </Grid>
// //                   </Grid>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={handleReset} sx={{ color: '#666', border: '1px solid #ddd', mr: 1 }}>Reset</Button>
// //             <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}>
// //               Save
// //             </Button>
// //           </DialogActions>
// //         </Dialog>
// //       </Box>
// //     </ThemeProvider>
// //   );
// // }

// // export default OfficeShifts;


// // import React, { useState, useEffect } from 'react';
// // import {
// //   ThemeProvider,
// //   createTheme,
// //   Paper,
// //   Typography,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TextField,
// //   Box,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Grid,
// //   IconButton,
// //   Divider,
// //   Chip,
// //   InputAdornment,
// //   FormHelperText,
// //   CssBaseline,
// //   Switch,
// //   FormControlLabel
// // } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // import axiosInstance from '../../utils/axiosInstance'; // Assuming this path is correct
// // import dayjs from 'dayjs';

// // // Theme setup for consistent styling
// // const theme = createTheme({
// //   palette: {
// //     primary: {
// //       main: '#7c4dff',
// //     },
// //     background: {
// //       default: '#f5f5f9',
// //     },
// //   },
// // });

// // // Initial state for a new shift, with company_id defaulted to 2
// // const getInitialNewShiftState = () => ({
// //   company_id: 2, // Default company ID
// //   name: '',
// //   times: {
// //     monday: { in: '', out: '' },
// //     tuesday: { in: '', out: '' },
// //     wednesday: { in: '', out: '' },
// //     thursday: { in: '', out: '' },
// //     friday: { in: '', out: '' },
// //     saturday: { in: '', out: '' },
// //     sunday: { in: '', out: '' }
// //   },
// //   weekendSettings: {
// //     saturday: false,
// //     sunday: false
// //   }
// // });


// // function OfficeShifts() {
// //   const [shifts, setShifts] = useState([]);
// //   const [openAddDialog, setOpenAddDialog] = useState(false);
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [newShift, setNewShift] = useState(getInitialNewShiftState());

// //   // Fetches all office shifts from the API
// //   const fetchShifts = async () => {
// //     try {
// //       const response = await axiosInstance.get('shifts/');
// //       setShifts(response.data);
// //     } catch (error) {
// //       console.error('Failed to fetch shifts:', error);
// //     }
// //   };

// //   // Initial data fetch on component mount
// //   useEffect(() => {
// //     fetchShifts();
// //   }, []);

// //   // Reset page to 0 when search term or rows per page changes
// //   useEffect(() => {
// //     setPage(0);
// //   }, [rowsPerPage, searchTerm]);

// //   // Handles changes to time inputs in the new shift form
// //   const handleTimeChange = (day, type, value) => {
// //     setNewShift(prev => ({
// //       ...prev,
// //       times: {
// //         ...prev.times,
// //         [day]: {
// //           ...prev.times[day],
// //           [type]: value
// //         }
// //       }
// //     }));
// //   };
  
// //   // Toggles weekend days as holidays
// //   const handleWeekendToggle = (day) => {
// //     setNewShift(prev => {
// //       const isNowHoliday = !prev.weekendSettings[day];
// //       return {
// //         ...prev,
// //         weekendSettings: {
// //           ...prev.weekendSettings,
// //           [day]: isNowHoliday
// //         },
// //         times: {
// //           ...prev.times,
// //           [day]: {
// //             in: isNowHoliday ? 'Holiday' : '',
// //             out: isNowHoliday ? 'Holiday' : ''
// //           }
// //         }
// //       };
// //     });
// //   };

// //   // Clears a specific time input
// //   const handleClearTime = (day, type) => {
// //     handleTimeChange(day, type, '');
// //   };

// //   // Handles form submission to create a new shift
// //   const handleSubmit = async () => {
// //     // Basic validation
// //     if (!newShift.name) {
// //       // Consider adding user feedback here (e.g., a toast notification or inline error)
// //       console.error("Shift name is required.");
// //       return;
// //     }

// //     // Format payload for the API
// //     const payload = {
// //       shift_name: newShift.name,
// //       company_id: newShift.company_id,
// //       created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
// //       monday_in_time: newShift.times.monday.in,
// //       monday_out_time: newShift.times.monday.out,
// //       tuesday_in_time: newShift.times.tuesday.in,
// //       tuesday_out_time: newShift.times.tuesday.out,
// //       wednesday_in_time: newShift.times.wednesday.in,
// //       wednesday_out_time: newShift.times.wednesday.out,
// //       thursday_in_time: newShift.times.thursday.in,
// //       thursday_out_time: newShift.times.thursday.out,
// //       friday_in_time: newShift.times.friday.in,
// //       friday_out_time: newShift.times.friday.out,
// //       saturday_in_time: newShift.times.saturday.in,
// //       saturday_out_time: newShift.times.saturday.out,
// //       sunday_in_time: newShift.times.sunday.in,
// //       sunday_out_time: newShift.times.sunday.out
// //     };

// //     try {
// //       await axiosInstance.post('shifts/', payload);
// //       fetchShifts(); // Refresh the list
// //       handleCloseDialog(); // Close dialog on success
// //     } catch (error) {
// //       console.error('Error saving shift:', error);
// //       // Consider adding user feedback for the error
// //     }
// //   };

// //   // Handles deletion of a shift
// //   const handleDelete = async (id) => {
// //     // Optional: Add a confirmation dialog before deleting
// //     if (window.confirm('Are you sure you want to delete this shift?')) {
// //       try {
// //         await axiosInstance.delete(`shifts/${id}/`);
// //         fetchShifts(); // Refresh the list
// //       } catch (error) {
// //         console.error('Failed to delete shift:', error);
// //       }
// //     }
// //   };

// //   // Resets the new shift form to its initial state
// //   const handleReset = () => {
// //     setNewShift(getInitialNewShiftState());
// //   };

// //   // Closes the dialog and resets the form
// //   const handleCloseDialog = () => {
// //     setOpenAddDialog(false);
// //     handleReset();
// //   };
  
// //   // Handles page changes for pagination
// //   const handleChangePage = (newPage) => {
// //     setPage(newPage);
// //   };
  
// //   // Component to render a time input field
// //   const renderTimeInput = (day, type) => (
// //     <TextField
// //       fullWidth
// //       type="time"
// //       value={newShift.times[day][type]}
// //       onChange={(e) => handleTimeChange(day, type, e.target.value)}
// //       disabled={newShift.weekendSettings[day] === true}
// //       InputProps={{
// //         startAdornment: (
// //           <InputAdornment position="start">
// //             <AccessTimeIcon />
// //           </InputAdornment>
// //         ),
// //         endAdornment: newShift.times[day][type] ? (
// //           <InputAdornment position="end">
// //             <IconButton onClick={() => handleClearTime(day, type)} edge="end" size="small">
// //               <DeleteIcon fontSize="small" />
// //             </IconButton>
// //           </InputAdornment>
// //         ) : null,
// //       }}
// //       sx={{ bgcolor: 'background.paper' }}
// //     />
// //   );
  
// //   // Filter shifts based on the search term
// //   const filteredShifts = shifts.filter(shift =>
// //     shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );
  
// //   // Paginate the filtered results
// //   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// //   const totalPages = Math.ceil(filteredShifts.length / rowsPerPage);

// //   const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <CssBaseline />
// //       <Box sx={{ p: 3 }}>
// //         <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All Office Shifts</Typography>
// //             <Button
// //               variant="contained"
// //               startIcon={<AddIcon />}
// //               onClick={() => setOpenAddDialog(true)}
// //             >
// //               Add New
// //             </Button>
// //           </Box>

// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //             <FormControl size="small" sx={{ minWidth: 120 }}>
// //               <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
// //                 <MenuItem value={5}>5</MenuItem>
// //                 <MenuItem value={10}>10</MenuItem>
// //                 <MenuItem value={20}>20</MenuItem>
// //               </Select>
// //               <FormHelperText>Entries per page</FormHelperText>
// //             </FormControl>

// //             <TextField
// //               size="small"
// //               placeholder="Search by Shift Name..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               sx={{ width: '250px' }}
// //             />
// //           </Box>

// //           <TableContainer>
// //             <Table>
// //               <TableHead>
// //                 <TableRow sx={{ bgcolor: 'action.hover' }}>
// //                   <TableCell>SHIFT</TableCell>
// //                   {daysOfWeek.map(day => (
// //                      <TableCell key={day}>{day.toUpperCase()}</TableCell>
// //                   ))}
// //                   <TableCell align="right">ACTION</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {paginatedShifts.length > 0 ? paginatedShifts.map((shift) => (
// //                   <TableRow key={shift.office_shift_id} hover>
// //                     <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
// //                     {daysOfWeek.map(day => (
// //                       <TableCell key={day}>
// //                         {shift[`${day}_in_time`] === 'Holiday'
// //                           ? <Chip label="Holiday" color="success" size="small" />
// //                           : `${shift[`${day}_in_time`] || '--:--'} To ${shift[`${day}_out_time`] || '--:--'}`}
// //                       </TableCell>
// //                     ))}
// //                     <TableCell align="right">
// //                       <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="error" aria-label="delete shift">
// //                         <DeleteIcon />
// //                       </IconButton>
// //                     </TableCell>
// //                   </TableRow>
// //                 )) : (
// //                   <TableRow>
// //                     <TableCell colSpan={9} align="center">No shifts found.</TableCell>
// //                   </TableRow>
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>

// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1 }}>
// //              <Typography variant="body2" color="text.secondary">
// //               Showing {paginatedShifts.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredShifts.length)} of {filteredShifts.length} entries
// //             </Typography>
// //             <Box sx={{ display: 'flex', gap: 1 }}>
// //               <Button variant="outlined" disabled={page === 0} onClick={() => handleChangePage(page - 1)}>Previous</Button>
// //               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => handleChangePage(page + 1)}>Next</Button>
// //             </Box>
// //           </Box>
// //         </Paper>

// //         {/* Add Shift Dialog */}
// //         <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
// //           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //             <Typography variant="h6">Add New Office Shift</Typography>
// //             <Button
// //               onClick={handleCloseDialog}
// //               sx={{ color: 'text.secondary' }}
// //             >
// //               Hide
// //             </Button>
// //           </DialogTitle>
// //           <Divider />
// //           <DialogContent>
// //             <Grid container spacing={3}>
// //               <Grid item xs={12}>
// //                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>
// //                   Shift Name <span style={{ color: 'red' }}>*</span>
// //                 </Typography>
// //                 <TextField
// //                   fullWidth
// //                   placeholder="e.g. Morning Shift"
// //                   value={newShift.name}
// //                   onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))}
// //                   required
// //                 />
// //               </Grid>

// //               {daysOfWeek.map(day => (
// //                 <Grid item xs={12} key={day}>
// //                   <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
// //                   <Grid container spacing={2} alignItems="center">
// //                     <Grid item xs={12} sm={5}>
// //                       {renderTimeInput(day, 'in')}
// //                     </Grid>
// //                     <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
// //                       <Typography color="text.secondary">To</Typography>
// //                     </Grid>
// //                     <Grid item xs={12} sm={5}>
// //                       {renderTimeInput(day, 'out')}
// //                     </Grid>
// //                     {(day === "saturday" || day === "sunday") && (
// //                       <Grid item xs={12}>
// //                         <FormControlLabel
// //                           control={
// //                             <Switch
// //                               checked={newShift.weekendSettings[day]}
// //                               onChange={() => handleWeekendToggle(day)}
// //                               color="primary"
// //                             />
// //                           }
// //                           label={`Mark as holiday`}
// //                         />
// //                       </Grid>
// //                     )}
// //                   </Grid>
// //                   {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           </DialogContent>
// //           <DialogActions sx={{ p: '16px 24px' }}>
// //             <Button onClick={handleReset} color="secondary" variant="outlined">Reset</Button>
// //             <Button variant="contained" onClick={handleSubmit}>Save</Button>
// //           </DialogActions>
// //         </Dialog>
// //       </Box>
// //     </ThemeProvider>
// //   );
// // }

// // export default OfficeShifts;


// import React, { useEffect, useState } from 'react';
// import {
//   ThemeProvider,
//   createTheme,
//   Paper,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Box,
//   Select,
//   MenuItem,
//   FormControl,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   IconButton,
//   Divider,
//   Chip,
//   InputAdornment,
//   FormHelperText,
//   CssBaseline,
//   Switch,
//   FormControlLabel,
//   InputLabel,
//   Tooltip,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack, // Using Stack for cleaner vertical layouts
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import axiosInstance from '../../utils/axiosInstance'; // Assuming this path is correct
// import dayjs from 'dayjs';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#7c4dff',
//     },
//     background: {
//       default: '#f5f5f9',
//       paper: '#ffffff',
//     },
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900, // Breakpoint for switching between table and card view
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// const getInitialNewShiftState = () => ({
//   company_id: 2,
//   name: '',
//   employee_hub_id: '',
//   times: {
//     monday: { in: '', out: '' },
//     tuesday: { in: '', out: '' },
//     wednesday: { in: '', out: '' },
//     thursday: { in: '', out: '' },
//     friday: { in: '', out: '' },
//     saturday: { in: '', out: '' },
//     sunday: { in: '', out: '' }
//   },
//   weekendSettings: {
//     saturday: false,
//     sunday: false
//   }
// });

// // Helper function to format time string from HH:mm:ss to HH:mm
// const formatTimeDisplay = (timeStr) => {
//   if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
//     return '--:--';
//   }
//   const parts = timeStr.split(':');
//   return `${parts[0]}:${parts[1]}`; // Returns only HH:mm
// };

// function OfficeShifts() {
//   const [shifts, setShifts] = useState([]);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [newShift, setNewShift] = useState(getInitialNewShiftState());
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingShiftId, setEditingShiftId] = useState(null);

//   // Hook to detect if the screen is mobile-sized (below 'md' breakpoint)
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const fetchShifts = async () => {
//     try {
//       const response = await axiosInstance.get('shifts/');
//       setShifts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch shifts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchShifts();
//     const fetchEmployeeHubs = async () => {
//       try {
//         const response = await axiosInstance.get('api/employee_hub/');
//         if (response.data.status === 'success') {
//           setEmployeeHubs(response.data.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch employee hubs:', error);
//       }
//     };
//     fetchEmployeeHubs();
//   }, []);

//   useEffect(() => {
//     setPage(0);
//   }, [rowsPerPage, searchTerm]);

//   const handleTimeChange = (day, type, value) => {
//     setNewShift(prev => ({ ...prev, times: { ...prev.times, [day]: { ...prev.times[day], [type]: value } } }));
//   };

//   const handleWeekendToggle = (day) => {
//     setNewShift(prev => {
//       const isNowHoliday = !prev.weekendSettings[day];
//       return {
//         ...prev,
//         weekendSettings: { ...prev.weekendSettings, [day]: isNowHoliday },
//         times: { ...prev.times, [day]: { in: isNowHoliday ? 'Holiday' : '', out: isNowHoliday ? 'Holiday' : '' } }
//       };
//     });
//   };

//   const handleClearTime = (day, type) => {
//     handleTimeChange(day, type, '');
//   };

//   const handleSubmit = async () => {
//     if (!newShift.name || !newShift.employee_hub_id) {
//       alert("Shift Name and Employee Hub are required.");
//       return;
//     }

//     const basePayload = {
//       shift_name: newShift.name,
//       employee_hub_id: newShift.employee_hub_id,
//       monday_in_time: newShift.times.monday.in, monday_out_time: newShift.times.monday.out,
//       tuesday_in_time: newShift.times.tuesday.in, tuesday_out_time: newShift.times.tuesday.out,
//       wednesday_in_time: newShift.times.wednesday.in, wednesday_out_time: newShift.times.wednesday.out,
//       thursday_in_time: newShift.times.thursday.in, thursday_out_time: newShift.times.thursday.out,
//       friday_in_time: newShift.times.friday.in, friday_out_time: newShift.times.friday.out,
//       saturday_in_time: newShift.times.saturday.in, saturday_out_time: newShift.times.saturday.out,
//       sunday_in_time: newShift.times.sunday.in, sunday_out_time: newShift.times.sunday.out
//     };

//     try {
//       if (isEditMode) {
//         const payload = { ...basePayload, shift_id: editingShiftId };
//         await axiosInstance.put(`shifts/${editingShiftId}/`, payload);
//       } else {
//         const payload = { ...basePayload, company_id: newShift.company_id, created_at: dayjs().format('YYYY-MM-DD HH:mm:ss') };
//         await axiosInstance.post('shifts/', payload);
//       }
//       fetchShifts();
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving shift:', error.response?.data || error.message);
//     }
//   };

//   const handleEdit = (shiftToEdit) => {
//     setIsEditMode(true);
//     setEditingShiftId(shiftToEdit.office_shift_id);
//     const isSaturdayHoliday = shiftToEdit.saturday_in_time === 'Holiday';
//     const isSundayHoliday = shiftToEdit.sunday_in_time === 'Holiday';
//     setNewShift({
//       company_id: shiftToEdit.company_id || 2,
//       name: shiftToEdit.shift_name,
//       employee_hub_id: shiftToEdit.employee_hub_id,
//       times: {
//         monday: { in: shiftToEdit.monday_in_time, out: shiftToEdit.monday_out_time },
//         tuesday: { in: shiftToEdit.tuesday_in_time, out: shiftToEdit.tuesday_out_time },
//         wednesday: { in: shiftToEdit.wednesday_in_time, out: shiftToEdit.wednesday_out_time },
//         thursday: { in: shiftToEdit.thursday_in_time, out: shiftToEdit.thursday_out_time },
//         friday: { in: shiftToEdit.friday_in_time, out: shiftToEdit.friday_out_time },
//         saturday: { in: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_in_time, out: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_out_time },
//         sunday: { in: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_in_time, out: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_out_time },
//       },
//       weekendSettings: { saturday: isSaturdayHoliday, sunday: isSundayHoliday }
//     });
//     setOpenAddDialog(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this shift?')) {
//       try {
//         await axiosInstance.delete(`shifts/${id}/`);
//         fetchShifts();
//       } catch (error) {
//         console.error('Failed to delete shift:', error);
//       }
//     }
//   };

//   const handleReset = () => { setNewShift(getInitialNewShiftState()); };

//   const handleCloseDialog = () => {
//     setOpenAddDialog(false);
//     setIsEditMode(false);
//     setEditingShiftId(null);
//     handleReset();
//   };

//   const handleChangePage = (newPage) => { setPage(newPage); };

//   const renderTimeInput = (day, type) => (
//     <TextField
//       fullWidth type="time" value={newShift.times[day][type]}
//       onChange={(e) => handleTimeChange(day, type, e.target.value)}
//       disabled={newShift.weekendSettings[day] === true}
//       InputProps={{
//         startAdornment: (<InputAdornment position="start"><AccessTimeIcon /></InputAdornment>),
//         endAdornment: newShift.times[day][type] ? (<InputAdornment position="end"><IconButton onClick={() => handleClearTime(day, type)} edge="end" size="small"><DeleteIcon fontSize="small" /></IconButton></InputAdornment>) : null,
//       }}
//       sx={{ bgcolor: 'background.paper' }}
//     />
//   );

//   const filteredShifts = shifts.filter(shift => shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase()));
//   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(filteredShifts.length / rowsPerPage);
//   const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

//   // Component to render a single shift as a Card for the mobile view
//   const ShiftCard = ({ shift, index }) => (
//     <Card sx={{ mb: 2 }} elevation={2}>
//       <Box sx={{ p: 2, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//             {shift.shift_name}
//           </Typography>
//           <Chip label={`Sr. No: ${page * rowsPerPage + index + 1}`} size="small" variant="outlined" />
//         </Box>
//       </Box>
//       <CardContent>
//         <Stack spacing={1.5}>
//           {daysOfWeek.map(day => (
//             <Box key={day} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
//                 {day}
//               </Typography>
//               {shift[`${day}_in_time`] === 'Holiday' ? (
//                 <Chip label="Holiday" color="success" size="small" />
//               ) : (
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {`${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`}
//                 </Typography>
//               )}
//             </Box>
//           ))}
//         </Stack>
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
//         <Tooltip title="Edit Shift">
//           <Button startIcon={<EditIcon />} onClick={() => handleEdit(shift)} color="primary" variant="text">
//             Edit
//           </Button>
//         </Tooltip>
//         <Tooltip title="Delete Shift">
//           <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(shift.office_shift_id)} color="error" variant="text">
//             Delete
//           </Button>
//         </Tooltip>
//       </CardActions>
//     </Card>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//         <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
//           {/* Header and Controls */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', width: '100%' }}>List All Office Shifts</Typography>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)} sx={{ flexShrink: 0 }}>Add New</Button>
//           </Box>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2, mb: 2 }}>
//             <FormControl size="small" sx={{ minWidth: 120 }}>
//               <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
//                 <MenuItem value={5}>5</MenuItem> <MenuItem value={10}>10</MenuItem> <MenuItem value={20}>20</MenuItem>
//               </Select>
//               <FormHelperText>Entries per page</FormHelperText>
//             </FormControl>
//             <TextField size="small" placeholder="Search by Shift Name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: { xs: '100%', md: '300px' } }} />
//           </Box>

//           {/* --- RESPONSIVE CONTENT AREA --- */}
//           {isMobile ? (
//             // MOBILE VIEW: Render a list of cards
//             <Box sx={{ mt: 3 }}>
//               {paginatedShifts.length > 0 ? (
//                 paginatedShifts.map((shift, index) => (
//                   <ShiftCard key={shift.office_shift_id} shift={shift} index={index} />
//                 ))
//               ) : (
//                 <Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No shifts found.</Typography>
//               )}
//             </Box>
//           ) : (
//             // DESKTOP VIEW: Render the table
//             <TableContainer>
//               <Table sx={{ minWidth: 900 }}>
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: 'action.hover' }}>
//                     <TableCell sx={{ fontWeight: 'bold' }}>SR. NO.</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>SHIFT</TableCell>
//                     {daysOfWeek.map(day => (<TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} key={day}>{day}</TableCell>))}
//                     <TableCell sx={{ fontWeight: 'bold' }} align="right">ACTION</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedShifts.length > 0 ? paginatedShifts.map((shift, index) => (
//                     <TableRow key={shift.office_shift_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
//                       {daysOfWeek.map(day => (
//                         <TableCell key={day}>
//                           {shift[`${day}_in_time`] === 'Holiday'
//                             ? <Chip label="Holiday" color="success" size="small" />
//                             : `${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`
//                           }
//                         </TableCell>
//                       ))}
//                       <TableCell align="right">
//                         <Tooltip title="Edit Shift">
//                           <IconButton onClick={() => handleEdit(shift)} color="primary"><EditIcon /></IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete Shift">
//                           <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="error"><DeleteIcon /></IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   )) : (
//                     <TableRow><TableCell colSpan={10} align="center">No shifts found.</TableCell></TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           {/* PAGINATION (shared for both views) */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, gap: 2 }}>
//             <Typography variant="body2" color="text.secondary">
//               Showing {paginatedShifts.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredShifts.length)} of {filteredShifts.length} entries
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button variant="outlined" disabled={page === 0} onClick={() => handleChangePage(page - 1)}>Previous</Button>
//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => handleChangePage(page + 1)}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>

//         {/* DIALOG for Add/Edit */}
//         <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{isEditMode ? "Edit Office Shift" : "Add New Office Shift"}</Typography>
//             <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Hide</Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>Shift Name <span style={{ color: 'red' }}>*</span></Typography>
//                 <TextField fullWidth placeholder="e.g. Morning Shift" value={newShift.name} onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))} required />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>Employee Hub <span style={{ color: 'red' }}>*</span></Typography>
//                 <FormControl fullWidth required>
//                   <InputLabel id="employee-hub-label">Select Hub</InputLabel>
//                   <Select labelId="employee-hub-label" label="Select Hub" value={newShift.employee_hub_id} onChange={(e) => setNewShift(prev => ({ ...prev, employee_hub_id: e.target.value }))}>
//                     {employeeHubs.map((hub) => (
//                       <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               {daysOfWeek.map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'in')}</Grid>
//                     <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Typography color="text.secondary">To</Typography></Grid>
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'out')}</Grid>
//                     {(day === "saturday" || day === "sunday") && (
//                       <Grid item xs={12}><FormControlLabel control={<Switch checked={newShift.weekendSettings[day]} onChange={() => handleWeekendToggle(day)} color="primary" />} label={`Mark as holiday`} /></Grid>
//                     )}
//                   </Grid>
//                   {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContent>
//           <DialogActions sx={{ p: '16px 24px' }}>
//             <Button onClick={handleReset} color="secondary" variant="outlined">Reset</Button>
//             <Button variant="contained" onClick={handleSubmit}>Save</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default OfficeShifts;   /////////  
















// import React, { useEffect, useState } from 'react';
// import {
//   ThemeProvider,
//   createTheme,
//   Paper,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Box,
//   Select,
//   MenuItem,
//   FormControl,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   IconButton,
//   Divider,
//   Chip,
//   InputAdornment,
//   CssBaseline,
//   Switch,
//   FormControlLabel,
//   InputLabel,
//   Tooltip,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack, // Using Stack for cleaner vertical layouts
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import axiosInstance from '../../utils/axiosInstance'; // Assuming this path is correct
// import dayjs from 'dayjs';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#7c4dff',
//     },
//     background: {
//       default: '#f5f5f9',
//       paper: '#ffffff',
//     },
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900, // Breakpoint for switching between table and card view
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// const getInitialNewShiftState = () => ({
//   company_id: 2,
//   name: '',
//   employee_hub_id: '',
//   times: {
//     monday: { in: '', out: '' },
//     tuesday: { in: '', out: '' },
//     wednesday: { in: '', out: '' },
//     thursday: { in: '', out: '' },
//     friday: { in: '', out: '' },
//     saturday: { in: '', out: '' },
//     sunday: { in: '', out: '' }
//   },
//   weekendSettings: {
//     saturday: false,
//     sunday: false
//   }
// });

// // Helper function to format time string from HH:mm:ss to HH:mm
// const formatTimeDisplay = (timeStr) => {
//   if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
//     return '--:--';
//   }
//   const parts = timeStr.split(':');
//   return `${parts[0]}:${parts[1]}`; // Returns only HH:mm
// };

// function OfficeShifts() {
//   const [shifts, setShifts] = useState([]);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [newShift, setNewShift] = useState(getInitialNewShiftState());
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingShiftId, setEditingShiftId] = useState(null);

//   // Hook to detect if the screen is mobile-sized (below 'md' breakpoint)
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const fetchShifts = async () => {
//     try {
//       const response = await axiosInstance.get('shifts/');
//       setShifts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch shifts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchShifts();
//     const fetchEmployeeHubs = async () => {
//       try {
//         const response = await axiosInstance.get('api/employee_hub/');
//         if (response.data.status === 'success') {
//           setEmployeeHubs(response.data.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch employee hubs:', error);
//       }
//     };
//     fetchEmployeeHubs();
//   }, []);

//   useEffect(() => {
//     setPage(0);
//   }, [rowsPerPage, searchTerm]);

//   const handleTimeChange = (day, type, value) => {
//     setNewShift(prev => ({ ...prev, times: { ...prev.times, [day]: { ...prev.times[day], [type]: value } } }));
//   };

//   const handleWeekendToggle = (day) => {
//     setNewShift(prev => {
//       const isNowHoliday = !prev.weekendSettings[day];
//       return {
//         ...prev,
//         weekendSettings: { ...prev.weekendSettings, [day]: isNowHoliday },
//         times: { ...prev.times, [day]: { in: isNowHoliday ? 'Holiday' : '', out: isNowHoliday ? 'Holiday' : '' } }
//       };
//     });
//   };

//   const handleClearTime = (day, type) => {
//     handleTimeChange(day, type, '');
//   };

//   const handleSubmit = async () => {
//     if (!newShift.name || !newShift.employee_hub_id) {
//       alert("Shift Name and Employee Hub are required.");
//       return;
//     }

//     const basePayload = {
//       shift_name: newShift.name,
//       employee_hub_id: newShift.employee_hub_id,
//       monday_in_time: newShift.times.monday.in, monday_out_time: newShift.times.monday.out,
//       tuesday_in_time: newShift.times.tuesday.in, tuesday_out_time: newShift.times.tuesday.out,
//       wednesday_in_time: newShift.times.wednesday.in, wednesday_out_time: newShift.times.wednesday.out,
//       thursday_in_time: newShift.times.thursday.in, thursday_out_time: newShift.times.thursday.out,
//       friday_in_time: newShift.times.friday.in, friday_out_time: newShift.times.friday.out,
//       saturday_in_time: newShift.times.saturday.in, saturday_out_time: newShift.times.saturday.out,
//       sunday_in_time: newShift.times.sunday.in, sunday_out_time: newShift.times.sunday.out
//     };

//     try {
//       if (isEditMode) {
//         const payload = { ...basePayload, shift_id: editingShiftId };
//         await axiosInstance.put(`shifts/${editingShiftId}/`, payload);
//       } else {
//         const payload = { ...basePayload, company_id: newShift.company_id, created_at: dayjs().format('YYYY-MM-DD HH:mm:ss') };
//         await axiosInstance.post('shifts/', payload);
//       }
//       fetchShifts();
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving shift:', error.response?.data || error.message);
//     }
//   };

//   const handleEdit = (shiftToEdit) => {
//     setIsEditMode(true);
//     setEditingShiftId(shiftToEdit.office_shift_id);
//     const isSaturdayHoliday = shiftToEdit.saturday_in_time === 'Holiday';
//     const isSundayHoliday = shiftToEdit.sunday_in_time === 'Holiday';
//     setNewShift({
//       company_id: shiftToEdit.company_id || 2,
//       name: shiftToEdit.shift_name,
//       employee_hub_id: shiftToEdit.employee_hub_id,
//       times: {
//         monday: { in: shiftToEdit.monday_in_time, out: shiftToEdit.monday_out_time },
//         tuesday: { in: shiftToEdit.tuesday_in_time, out: shiftToEdit.tuesday_out_time },
//         wednesday: { in: shiftToEdit.wednesday_in_time, out: shiftToEdit.wednesday_out_time },
//         thursday: { in: shiftToEdit.thursday_in_time, out: shiftToEdit.thursday_out_time },
//         friday: { in: shiftToEdit.friday_in_time, out: shiftToEdit.friday_out_time },
//         saturday: { in: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_in_time, out: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_out_time },
//         sunday: { in: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_in_time, out: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_out_time },
//       },
//       weekendSettings: { saturday: isSaturdayHoliday, sunday: isSundayHoliday }
//     });
//     setOpenAddDialog(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this shift?')) {
//       try {
//         await axiosInstance.delete(`shifts/${id}/`);
//         fetchShifts();
//       } catch (error) {
//         console.error('Failed to delete shift:', error);
//       }
//     }
//   };

//   const handleReset = () => { setNewShift(getInitialNewShiftState()); };

//   const handleCloseDialog = () => {
//     setOpenAddDialog(false);
//     setIsEditMode(false);
//     setEditingShiftId(null);
//     handleReset();
//   };

//   const handleChangePage = (newPage) => { setPage(newPage); };

//   const renderTimeInput = (day, type) => (
//     <TextField
//       fullWidth type="time" value={newShift.times[day][type]}
//       onChange={(e) => handleTimeChange(day, type, e.target.value)}
//       disabled={newShift.weekendSettings[day] === true}
//       InputProps={{
//         startAdornment: (<InputAdornment position="start"><AccessTimeIcon /></InputAdornment>),
//         endAdornment: newShift.times[day][type] ? (<InputAdornment position="end"><IconButton onClick={() => handleClearTime(day, type)} edge="end" size="small"><DeleteIcon fontSize="small" /></IconButton></InputAdornment>) : null,
//       }}
//       sx={{ bgcolor: 'background.paper' }}
//     />
//   );

//   const filteredShifts = shifts.filter(shift => shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase()));
//   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(filteredShifts.length / rowsPerPage);
//   const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

//   // Component to render a single shift as a Card for the mobile view
//   const ShiftCard = ({ shift, index }) => (
//     <Card sx={{ mb: 2 }} elevation={2}>
//       <Box sx={{ p: 2, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//             {shift.shift_name}
//           </Typography>
//           <Chip label={`Sr. No: ${page * rowsPerPage + index + 1}`} size="small" variant="outlined" />
//         </Box>
//       </Box>
//       <CardContent>
//         <Stack spacing={1.5}>
//           {daysOfWeek.map(day => (
//             <Box key={day} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
//                 {day}
//               </Typography>
//               {shift[`${day}_in_time`] === 'Holiday' ? (
//                 <Chip label="Holiday" color="success" size="small" />
//               ) : (
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {`${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`}
//                 </Typography>
//               )}
//             </Box>
//           ))}
//         </Stack>
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
//         <Tooltip title="Edit Shift">
//           <Button startIcon={<EditIcon />} onClick={() => handleEdit(shift)} color="primary" variant="text">
//             Edit
//           </Button>
//         </Tooltip>
//         <Tooltip title="Delete Shift">
//           <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(shift.office_shift_id)} color="error" variant="text">
//             Delete
//           </Button>
//         </Tooltip>
//       </CardActions>
//     </Card>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//         <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
//           {/* Header and Controls */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', width: '100%' }}>List All Office Shifts</Typography>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)} sx={{ flexShrink: 0 }}>Add New</Button>
//           </Box>
//           {/* --- MODIFIED SEARCH AND ROWS CONTROLS --- */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on tablet and up
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: 2,
//               mb: 2,
//             }}
//           >



//             {/* Search Input */}
//             <TextField
//               size="small"
//               placeholder="Search by Shift Name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{
//                 width: { xs: "100%", sm: 300 }, // Full width on mobile, fixed width on larger screens
//               }}
//             />
//             {/* Rows per Page Dropdown */}
//             <FormControl
//               size="small"
//               sx={{
//                 width: { xs: "40%", sm: 120 }, // Full width on mobile, compact on larger screens
//               }}
//             >
//               <InputLabel id="rows-per-page-label">Rows</InputLabel>
//               <Select
//                 labelId="rows-per-page-label"
//                 label="Rows"
//                 value={rowsPerPage}
//                 onChange={(e) => setRowsPerPage(Number(e.target.value))}
//               >
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={20}>20</MenuItem>
//               </Select>
//             </FormControl>

//           </Box>

//           {/* --- RESPONSIVE CONTENT AREA --- */}
//           {isMobile ? (
//             // MOBILE VIEW: Render a list of cards
//             <Box sx={{ mt: 3 }}>
//               {paginatedShifts.length > 0 ? (
//                 paginatedShifts.map((shift, index) => (
//                   <ShiftCard key={shift.office_shift_id} shift={shift} index={index} />
//                 ))
//               ) : (
//                 <Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No shifts found.</Typography>
//               )}
//             </Box>
//           ) : (
//             // DESKTOP VIEW: Render the table
//             <TableContainer>
//               <Table sx={{ minWidth: 900 }}>
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: 'action.hover' }}>
//                     <TableCell sx={{ fontWeight: 'bold' }}>SR. NO.</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>SHIFT</TableCell>
//                     {daysOfWeek.map(day => (<TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} key={day}>{day}</TableCell>))}
//                     <TableCell sx={{ fontWeight: 'bold' }} align="right">ACTION</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedShifts.length > 0 ? paginatedShifts.map((shift, index) => (
//                     <TableRow key={shift.office_shift_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
//                       {daysOfWeek.map(day => (
//                         <TableCell key={day}>
//                           {shift[`${day}_in_time`] === 'Holiday'
//                             ? <Chip label="Holiday" color="success" size="small" />
//                             : `${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`
//                           }
//                         </TableCell>
//                       ))}
//                       <TableCell align="right">
//                         <Tooltip title="Edit Shift">
//                           <IconButton onClick={() => handleEdit(shift)} color="primary"><EditIcon /></IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete Shift">
//                           <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="error"><DeleteIcon /></IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   )) : (
//                     <TableRow><TableCell colSpan={10} align="center">No shifts found.</TableCell></TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           {/* PAGINATION (shared for both views) */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, gap: 2 }}>
//             <Typography variant="body2" color="text.secondary">
//               Showing {paginatedShifts.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredShifts.length)} of {filteredShifts.length} entries
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button variant="outlined" disabled={page === 0} onClick={() => handleChangePage(page - 1)}>Previous</Button>
//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => handleChangePage(page + 1)}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>

//         {/* DIALOG for Add/Edit */}
//         <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{isEditMode ? "Edit Office Shift" : "Add New Office Shift"}</Typography>
//             <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Hide</Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>Shift Name <span style={{ color: 'red' }}>*</span></Typography>
//                 <TextField fullWidth placeholder="e.g. Morning Shift" value={newShift.name} onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))} required />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>Employee Hub <span style={{ color: 'red' }}>*</span></Typography>
//                 <FormControl fullWidth required>
//                   <InputLabel id="employee-hub-label">Select Hub</InputLabel>
//                   <Select labelId="employee-hub-label" label="Select Hub" value={newShift.employee_hub_id} onChange={(e) => setNewShift(prev => ({ ...prev, employee_hub_id: e.target.value }))}>
//                     {employeeHubs.map((hub) => (
//                       <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               {daysOfWeek.map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'in')}</Grid>
//                     <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Typography color="text.secondary">To</Typography></Grid>
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'out')}</Grid>
//                     {(day === "saturday" || day === "sunday") && (
//                       <Grid item xs={12}><FormControlLabel control={<Switch checked={newShift.weekendSettings[day]} onChange={() => handleWeekendToggle(day)} color="primary" />} label={`Mark as holiday`} /></Grid>
//                     )}
//                   </Grid>
//                   {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContent>
//           <DialogActions sx={{ p: '16px 24px' }}>
//             <Button onClick={handleReset} color="secondary" variant="outlined">Reset</Button>
//             <Button variant="contained" onClick={handleSubmit}>Save</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default OfficeShifts;












// import React, { useEffect, useState } from 'react';
// import {
//   ThemeProvider,
//   createTheme,
//   Paper,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Box,
//   Select,
//   MenuItem,
//   FormControl,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   IconButton,
//   Divider,
//   Chip,
//   InputAdornment,
//   CssBaseline,
//   Switch,
//   FormControlLabel,
//   InputLabel,
//   Tooltip,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack,
//   Autocomplete, // Import Autocomplete for the combo box
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import axiosInstance from '../../utils/axiosInstance';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2'; // Import SweetAlert2
 
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#7c4dff',
//     },
//     background: {
//       default: '#f5f5f9',
//       paper: '#ffffff',
//     },
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });
 
// const getInitialNewShiftState = () => ({
//   company_id: 2,
//   name: '',
//   employee_hub_id: '',
//   times: {
//     monday: { in: '', out: '' },
//     tuesday: { in: '', out: '' },
//     wednesday: { in: '', out: '' },
//     thursday: { in: '', out: '' },
//     friday: { in: '', out: '' },
//     saturday: { in: '', out: '' },
//     sunday: { in: '', out: '' }
//   },
//   weekendSettings: {
//     saturday: false,
//     sunday: false
//   }
// });
 
// const formatTimeDisplay = (timeStr) => {
//   if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
//     return '--:--';
//   }
//   const parts = timeStr.split(':');
//   return `${parts[0]}:${parts[1]}`;
// };
 
// function OfficeShifts() {
//   const [shifts, setShifts] = useState([]);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [newShift, setNewShift] = useState(getInitialNewShiftState());
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingShiftId, setEditingShiftId] = useState(null);
 
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
 
//   const fetchShifts = async () => {
//     try {
//       const response = await axiosInstance.get('shifts/');
//       setShifts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch shifts:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not fetch the office shifts.',
//       });
//     }
//   };
 
//   useEffect(() => {
//     fetchShifts();
//     const fetchEmployeeHubs = async () => {
//       try {
//         const response = await axiosInstance.get('api/employee_hub/');
//         if (response.data.status === 'success') {
//           setEmployeeHubs(response.data.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch employee hubs:', error);
//       }
//     };
//     fetchEmployeeHubs();
//   }, []);
 
//   useEffect(() => {
//     setPage(0);
//   }, [rowsPerPage, searchTerm]);
 
//   const handleTimeChange = (day, type, value) => {
//     setNewShift(prev => ({ ...prev, times: { ...prev.times, [day]: { ...prev.times[day], [type]: value } } }));
//   };
 
//   const handleWeekendToggle = (day) => {
//     setNewShift(prev => {
//       const isNowHoliday = !prev.weekendSettings[day];
//       return {
//         ...prev,
//         weekendSettings: { ...prev.weekendSettings, [day]: isNowHoliday },
//         times: { ...prev.times, [day]: { in: isNowHoliday ? 'Holiday' : '', out: isNowHoliday ? 'Holiday' : '' } }
//       };
//     });
//   };
 
//   const handleClearTime = (day, type) => {
//     handleTimeChange(day, type, '');
//   };
 
//   const handleSubmit = async () => {
//     if (!newShift.name || !newShift.employee_hub_id) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Information',
//         text: 'Shift Name and Employee Hub are required.',
//       });
//       return;
//     }
 
//     const basePayload = {
//       shift_name: newShift.name,
//       employee_hub_id: newShift.employee_hub_id,
//       monday_in_time: newShift.times.monday.in, monday_out_time: newShift.times.monday.out,
//       tuesday_in_time: newShift.times.tuesday.in, tuesday_out_time: newShift.times.tuesday.out,
//       wednesday_in_time: newShift.times.wednesday.in, wednesday_out_time: newShift.times.wednesday.out,
//       thursday_in_time: newShift.times.thursday.in, thursday_out_time: newShift.times.thursday.out,
//       friday_in_time: newShift.times.friday.in, friday_out_time: newShift.times.friday.out,
//       saturday_in_time: newShift.times.saturday.in, saturday_out_time: newShift.times.saturday.out,
//       sunday_in_time: newShift.times.sunday.in, sunday_out_time: newShift.times.sunday.out
//     };
 
//     try {
//       if (isEditMode) {
//         const payload = { ...basePayload, shift_id: editingShiftId };
//         await axiosInstance.put(`shifts/${editingShiftId}/`, payload);
//         Swal.fire({
//           icon: 'success',
//           title: 'Shift Updated!',
//           showConfirmButton: false,
//           timer: 1500
//         });
//       } else {
//         const payload = { ...basePayload, company_id: newShift.company_id, created_at: dayjs().format('YYYY-MM-DD HH:mm:ss') };
//         await axiosInstance.post('shifts/', payload);
//         Swal.fire({
//           icon: 'success',
//           title: 'Shift Added!',
//           showConfirmButton: false,
//           timer: 1500
//         });
//       }
//       fetchShifts();
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving shift:', error.response?.data || error.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Save Failed',
//         text: error.response?.data?.message || 'An unexpected error occurred.',
//       });
//     }
//   };
 
//   const handleEdit = (shiftToEdit) => {
//     setIsEditMode(true);
//     setEditingShiftId(shiftToEdit.office_shift_id);
//     const isSaturdayHoliday = shiftToEdit.saturday_in_time === 'Holiday';
//     const isSundayHoliday = shiftToEdit.sunday_in_time === 'Holiday';
//     setNewShift({
//       company_id: shiftToEdit.company_id || 2,
//       name: shiftToEdit.shift_name,
//       employee_hub_id: shiftToEdit.employee_hub_id,
//       times: {
//         monday: { in: shiftToEdit.monday_in_time, out: shiftToEdit.monday_out_time },
//         tuesday: { in: shiftToEdit.tuesday_in_time, out: shiftToEdit.tuesday_out_time },
//         wednesday: { in: shiftToEdit.wednesday_in_time, out: shiftToEdit.wednesday_out_time },
//         thursday: { in: shiftToEdit.thursday_in_time, out: shiftToEdit.thursday_out_time },
//         friday: { in: shiftToEdit.friday_in_time, out: shiftToEdit.friday_out_time },
//         saturday: { in: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_in_time, out: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_out_time },
//         sunday: { in: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_in_time, out: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_out_time },
//       },
//       weekendSettings: { saturday: isSaturdayHoliday, sunday: isSundayHoliday }
//     });
//     setOpenAddDialog(true);
//   };
 
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#7c4dff',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`shifts/${id}/`);
//           fetchShifts();
//           Swal.fire(
//             'Deleted!',
//             'The shift has been deleted.',
//             'success'
//           );
//         } catch (error) {
//           console.error('Failed to delete shift:', error);
//           Swal.fire(
//             'Failed!',
//             'Could not delete the shift.',
//             'error'
//           );
//         }
//       }
//     });
//   };
 
//   const handleReset = () => { setNewShift(getInitialNewShiftState()); };
 
//   const handleCloseDialog = () => {
//     setOpenAddDialog(false);
//     setIsEditMode(false);
//     setEditingShiftId(null);
//     handleReset();
//   };
 
//   const handleChangePage = (newPage) => { setPage(newPage); };
 
//   const renderTimeInput = (day, type) => (
//     <TextField
//       fullWidth type="time" value={newShift.times[day][type]}
//       onChange={(e) => handleTimeChange(day, type, e.target.value)}
//       disabled={newShift.weekendSettings[day] === true}
//       InputProps={{
//         startAdornment: (<InputAdornment position="start"><AccessTimeIcon /></InputAdornment>),
//         endAdornment: newShift.times[day][type] ? (<InputAdornment position="end"><IconButton onClick={() => handleClearTime(day, type)} edge="end" size="small"><DeleteIcon fontSize="small" /></IconButton></InputAdornment>) : null,
//       }}
//       sx={{ bgcolor: 'background.paper' }}
//     />
//   );
 
//   const filteredShifts = shifts.filter(shift => shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase()));
//   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(filteredShifts.length / rowsPerPage);
//   const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
 
//   const ShiftCard = ({ shift, index }) => (
//     <Card sx={{ mb: 2 }} elevation={2}>
//       <Box sx={{ p: 2, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//             {shift.shift_name}
//           </Typography>
//           <Chip label={`Sr. No: ${page * rowsPerPage + index + 1}`} size="small" variant="outlined" />
//         </Box>
//       </Box>
//       <CardContent>
//         <Stack spacing={1.5}>
//           {daysOfWeek.map(day => (
//             <Box key={day} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
//                 {day}
//               </Typography>
//               {shift[`${day}_in_time`] === 'Holiday' ? (
//                 <Chip label="Holiday" color="success" size="small" />
//               ) : (
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {`${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`}
//                 </Typography>
//               )}
//             </Box>
//           ))}
//         </Stack>
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
//         <Tooltip title="Edit Shift">
//           <Button startIcon={<EditIcon />} onClick={() => handleEdit(shift)} color="primary" variant="text">
//             Edit
//           </Button>
//         </Tooltip>
//         <Tooltip title="Delete Shift">
//           <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(shift.office_shift_id)} color="error" variant="text">
//             Delete
//           </Button>
//         </Tooltip>
//       </CardActions>
//     </Card>
//   );
 
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//         <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', width: '100%' }}>List All Office Shifts</Typography>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)} sx={{ flexShrink: 0 }}>Add New</Button>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: 2,
//               mb: 2,
//             }}
//           >
//             <TextField
//               size="small"
//               placeholder="Search by Shift Name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{
//                 width: { xs: "100%", sm: 300 },
//               }}
//             />
//             <FormControl
//               size="small"
//               sx={{
//                 width: { xs: "40%", sm: 120 },
//               }}
//             >
//               <InputLabel id="rows-per-page-label">Rows</InputLabel>
//               <Select
//                 labelId="rows-per-page-label"
//                 label="Rows"
//                 value={rowsPerPage}
//                 onChange={(e) => setRowsPerPage(Number(e.target.value))}
//               >
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={20}>20</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
 
//           {isMobile ? (
//             <Box sx={{ mt: 3 }}>
//               {paginatedShifts.length > 0 ? (
//                 paginatedShifts.map((shift, index) => (
//                   <ShiftCard key={shift.office_shift_id} shift={shift} index={index} />
//                 ))
//               ) : (
//                 <Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No shifts found.</Typography>
//               )}
//             </Box>
//           ) : (
//             <TableContainer>
//               <Table sx={{ minWidth: 900 }}>
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: 'action.hover' }}>
//                     <TableCell sx={{ fontWeight: 'bold' }}>SR. NO.</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>SHIFT</TableCell>
//                     {daysOfWeek.map(day => (<TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} key={day}>{day}</TableCell>))}
//                     <TableCell sx={{ fontWeight: 'bold' }} align="right">ACTION</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedShifts.length > 0 ? paginatedShifts.map((shift, index) => (
//                     <TableRow key={shift.office_shift_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
//                       {daysOfWeek.map(day => (
//                         <TableCell key={day}>
//                           {shift[`${day}_in_time`] === 'Holiday'
//                             ? <Chip label="Holiday" color="success" size="small" />
//                             : `${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`
//                           }
//                         </TableCell>
//                       ))}
//                       <TableCell align="right">
//                         <Tooltip title="Edit Shift">
//                           <IconButton onClick={() => handleEdit(shift)} color="primary"><EditIcon /></IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete Shift">
//                           <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="error"><DeleteIcon /></IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   )) : (
//                     <TableRow><TableCell colSpan={10} align="center">No shifts found.</TableCell></TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
 
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, gap: 2 }}>
//             <Typography variant="body2" color="text.secondary">
//               Showing {paginatedShifts.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredShifts.length)} of {filteredShifts.length} entries
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button variant="outlined" disabled={page === 0} onClick={() => handleChangePage(page - 1)}>Previous</Button>
//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => handleChangePage(page + 1)}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>
 
//         <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{isEditMode ? "Edit Office Shift" : "Add New Office Shift"}</Typography>
//             <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Hide</Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>Shift Name <span style={{ color: 'red' }}>*</span></Typography>
//                 <TextField fullWidth placeholder="e.g. Morning Shift" value={newShift.name} onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))} required />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>Employee Hub <span style={{ color: 'red' }}>*</span></Typography>
//                 <Autocomplete
//                   fullWidth
//                   options={employeeHubs}
//                   getOptionLabel={(option) => option.employee_hub_name}
//                   value={employeeHubs.find(hub => hub.employee_hub_id === newShift.employee_hub_id) || null}
//                   onChange={(event, newValue) => {
//                     setNewShift(prev => ({ ...prev, employee_hub_id: newValue ? newValue.employee_hub_id : '' }));
//                   }}
//                   renderInput={(params) => <TextField {...params} label="Select Hub" required />}
//                 />
//               </Grid>
//               {daysOfWeek.map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'in')}</Grid>
//                     <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Typography color="text.secondary">To</Typography></Grid>
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'out')}</Grid>
//                     {(day === "saturday" || day === "sunday") && (
//                       <Grid item xs={12}><FormControlLabel control={<Switch checked={newShift.weekendSettings[day]} onChange={() => handleWeekendToggle(day)} color="primary" />} label={`Mark as holiday`} /></Grid>
//                     )}
//                   </Grid>
//                   {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContent>
//           <DialogActions sx={{ p: '16px 24px' }}>
//             <Button onClick={handleReset} color="secondary" variant="outlined">Reset</Button>
//             <Button variant="contained" onClick={handleSubmit}>Save</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }
 
// export default OfficeShifts;













// import React, { useEffect, useState } from 'react';
// import {
//   ThemeProvider,
//   createTheme,
//   Paper,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Box,
//   Select,
//   MenuItem,
//   FormControl,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   IconButton,
//   Divider,
//   Chip,
//   InputAdornment,
//   CssBaseline,
//   Switch,
//   FormControlLabel,
//   InputLabel,
//   Tooltip,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack,
//   Autocomplete,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon
// import axiosInstance from '../../utils/axiosInstance';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// // Updated theme with Purple and Orange color palette
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C', // Purple
//     },
//     secondary: {
//       main: '#F58E35', // Orange
//     },
//     background: {
//       default: '#f5f5f9',
//       paper: '#ffffff',
//     },
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// const getInitialNewShiftState = () => ({
//   company_id: 2,
//   name: '',
//   employee_hub_id: '',
//   times: {
//     monday: { in: '', out: '' },
//     tuesday: { in: '', out: '' },
//     wednesday: { in: '', out: '' },
//     thursday: { in: '', out: '' },
//     friday: { in: '', out: '' },
//     saturday: { in: '', out: '' },
//     sunday: { in: '', out: '' }
//   },
//   weekendSettings: {
//     saturday: false,
//     sunday: false
//   }
// });

// const formatTimeDisplay = (timeStr) => {
//   if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
//     return '--:--';
//   }
//   const parts = timeStr.split(':');
//   return `${parts[0]}:${parts[1]}`;
// };

// function OfficeShifts() {
//   const [shifts, setShifts] = useState([]);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Default set to 10
//   const [searchTerm, setSearchTerm] = useState('');
//   const [newShift, setNewShift] = useState(getInitialNewShiftState());
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingShiftId, setEditingShiftId] = useState(null);

//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const fetchShifts = async () => {
//     try {
//       const response = await axiosInstance.get('shifts/');
//       setShifts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch shifts:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not fetch the office shifts.',
//       });
//     }
//   };

//   useEffect(() => {
//     fetchShifts();
//     const fetchEmployeeHubs = async () => {
//       try {
//         const response = await axiosInstance.get('api/employee_hub/');
//         if (response.data.status === 'success') {
//           setEmployeeHubs(response.data.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch employee hubs:', error);
//       }
//     };
//     fetchEmployeeHubs();
//   }, []);

//   useEffect(() => {
//     setPage(0);
//   }, [rowsPerPage, searchTerm]);

//   const handleTimeChange = (day, type, value) => {
//     setNewShift(prev => ({ ...prev, times: { ...prev.times, [day]: { ...prev.times[day], [type]: value } } }));
//   };

//   const handleWeekendToggle = (day) => {
//     setNewShift(prev => {
//       const isNowHoliday = !prev.weekendSettings[day];
//       return {
//         ...prev,
//         weekendSettings: { ...prev.weekendSettings, [day]: isNowHoliday },
//         times: { ...prev.times, [day]: { in: isNowHoliday ? 'Holiday' : '', out: isNowHoliday ? 'Holiday' : '' } }
//       };
//     });
//   };

//   const handleClearTime = (day, type) => {
//     handleTimeChange(day, type, '');
//   };

//   const handleSubmit = async () => {
//     if (!newShift.name || !newShift.employee_hub_id) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Information',
//         text: 'Shift Name and Employee Hub are required.',
//       });
//       return;
//     }

//     const basePayload = {
//       shift_name: newShift.name,
//       employee_hub_id: newShift.employee_hub_id,
//       monday_in_time: newShift.times.monday.in, monday_out_time: newShift.times.monday.out,
//       tuesday_in_time: newShift.times.tuesday.in, tuesday_out_time: newShift.times.tuesday.out,
//       wednesday_in_time: newShift.times.wednesday.in, wednesday_out_time: newShift.times.wednesday.out,
//       thursday_in_time: newShift.times.thursday.in, thursday_out_time: newShift.times.thursday.out,
//       friday_in_time: newShift.times.friday.in, friday_out_time: newShift.times.friday.out,
//       saturday_in_time: newShift.times.saturday.in, saturday_out_time: newShift.times.saturday.out,
//       sunday_in_time: newShift.times.sunday.in, sunday_out_time: newShift.times.sunday.out
//     };

//     try {
//       if (isEditMode) {
//         const payload = { ...basePayload, shift_id: editingShiftId };
//         await axiosInstance.put(`shifts/${editingShiftId}/`, payload);
//         Swal.fire({
//           icon: 'success',
//           title: 'Shift Updated!',
//           showConfirmButton: false,
//           timer: 1500
//         });
//       } else {
//         const payload = { ...basePayload, company_id: newShift.company_id, created_at: dayjs().format('YYYY-MM-DD HH:mm:ss') };
//         await axiosInstance.post('shifts/', payload);
//         Swal.fire({
//           icon: 'success',
//           title: 'Shift Added!',
//           showConfirmButton: false,
//           timer: 1500
//         });
//       }
//       fetchShifts();
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving shift:', error.response?.data || error.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Save Failed',
//         text: error.response?.data?.message || 'An unexpected error occurred.',
//       });
//     }
//   };

//   const handleEdit = (shiftToEdit) => {
//     setIsEditMode(true);
//     setEditingShiftId(shiftToEdit.office_shift_id);
//     const isSaturdayHoliday = shiftToEdit.saturday_in_time === 'Holiday';
//     const isSundayHoliday = shiftToEdit.sunday_in_time === 'Holiday';
//     setNewShift({
//       company_id: shiftToEdit.company_id || 2,
//       name: shiftToEdit.shift_name,
//       employee_hub_id: shiftToEdit.employee_hub_id,
//       times: {
//         monday: { in: shiftToEdit.monday_in_time, out: shiftToEdit.monday_out_time },
//         tuesday: { in: shiftToEdit.tuesday_in_time, out: shiftToEdit.tuesday_out_time },
//         wednesday: { in: shiftToEdit.wednesday_in_time, out: shiftToEdit.wednesday_out_time },
//         thursday: { in: shiftToEdit.thursday_in_time, out: shiftToEdit.thursday_out_time },
//         friday: { in: shiftToEdit.friday_in_time, out: shiftToEdit.friday_out_time },
//         saturday: { in: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_in_time, out: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_out_time },
//         sunday: { in: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_in_time, out: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_out_time },
//       },
//       weekendSettings: { saturday: isSaturdayHoliday, sunday: isSundayHoliday }
//     });
//     setOpenAddDialog(true);
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C', // Purple
//       cancelButtonColor: '#F58E35',  // Orange
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`shifts/${id}/`);
//           fetchShifts();
//           Swal.fire(
//             'Deleted!',
//             'The shift has been deleted.',
//             'success'
//           );
//         } catch (error) {
//           console.error('Failed to delete shift:', error);
//           Swal.fire(
//             'Failed!',
//             'Could not delete the shift.',
//             'error'
//           );
//         }
//       }
//     });
//   };

//   const handleReset = () => { setNewShift(getInitialNewShiftState()); };

//   const handleCloseDialog = () => {
//     setOpenAddDialog(false);
//     setIsEditMode(false);
//     setEditingShiftId(null);
//     handleReset();
//   };

//   const handleChangePage = (newPage) => { setPage(newPage); };

//   const renderTimeInput = (day, type) => (
//     <TextField
//       fullWidth type="time" value={newShift.times[day][type]}
//       onChange={(e) => handleTimeChange(day, type, e.target.value)}
//       disabled={newShift.weekendSettings[day] === true}
//       InputProps={{
//         startAdornment: (<InputAdornment position="start"><AccessTimeIcon /></InputAdornment>),
//         endAdornment: newShift.times[day][type] ? (<InputAdornment position="end"><IconButton onClick={() => handleClearTime(day, type)} edge="end" size="small"><DeleteIcon fontSize="small" color="secondary" /></IconButton></InputAdornment>) : null,
//       }}
//       sx={{ bgcolor: 'background.paper' }}
//     />
//   );

//   const filteredShifts = shifts.filter(shift => shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase()));
//   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(filteredShifts.length / rowsPerPage);
//   const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
//   const headerCellStyle = {
//     bgcolor: 'primary.main',
//     color: 'common.white',
//     fontWeight: 'bold',
//   };

//   const ShiftCard = ({ shift, index }) => (
//     <Card sx={{ mb: 2 }} elevation={2}>
//       <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'common.white' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//             {shift.shift_name}
//           </Typography>
//           <Chip label={`Sr. No: ${page * rowsPerPage + index + 1}`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'common.white' }} />
//         </Box>
//       </Box>
//       <CardContent>
//         <Stack spacing={1.5}>
//           {daysOfWeek.map(day => (
//             <Box key={day} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
//                 {day}
//               </Typography>
//               {shift[`${day}_in_time`] === 'Holiday' ? (
//                 <Chip label="Holiday" color="success" size="small" />
//               ) : (
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {`${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`}
//                 </Typography>
//               )}
//             </Box>
//           ))}
//         </Stack>
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
//         <Tooltip title="Edit Shift">
//           <Button startIcon={<EditIcon />} onClick={() => handleEdit(shift)} color="primary" variant="text">
//             Edit
//           </Button>
//         </Tooltip>
//         <Tooltip title="Delete Shift">
//           <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(shift.office_shift_id)} color="secondary" variant="text">
//             Delete
//           </Button>
//         </Tooltip>
//       </CardActions>
//     </Card>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//         <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
//           {/* Top section: Title and Add New button */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All Office Shifts</Typography>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)} sx={{ flexShrink: 0 }}>Add New</Button>
//           </Box>
          
//           {/* Search bar on top right of the table */}
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//             <TextField
//               size="small"
//               placeholder="Search by Shift Name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ width: { xs: "100%", sm: 300 } }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           {isMobile ? (
//             <Box sx={{ mt: 3 }}>
//               {paginatedShifts.length > 0 ? (
//                 paginatedShifts.map((shift, index) => (
//                   <ShiftCard key={shift.office_shift_id} shift={shift} index={index} />
//                 ))
//               ) : (
//                 <Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No shifts found.</Typography>
//               )}
//             </Box>
//           ) : (
//             <TableContainer>
//               <Table sx={{ minWidth: 900 }}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={headerCellStyle}>SR. NO.</TableCell>
//                     <TableCell sx={headerCellStyle}>SHIFT</TableCell>
//                     {daysOfWeek.map(day => (<TableCell sx={{...headerCellStyle, textTransform: 'uppercase'}} key={day}>{day}</TableCell>))}
//                     <TableCell sx={headerCellStyle} align="right">ACTION</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedShifts.length > 0 ? paginatedShifts.map((shift, index) => (
//                     <TableRow key={shift.office_shift_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
//                       {daysOfWeek.map(day => (
//                         <TableCell key={day}>
//                           {shift[`${day}_in_time`] === 'Holiday'
//                             ? <Chip label="Holiday" color="success" size="small" />
//                             : `${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`
//                           }
//                         </TableCell>
//                       ))}
//                       <TableCell align="right">
//                         <Tooltip title="Edit Shift">
//                           <IconButton onClick={() => handleEdit(shift)} color="primary"><EditIcon /></IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete Shift">
//                           <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="secondary"><DeleteIcon /></IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   )) : (
//                     <TableRow><TableCell colSpan={10} align="center">No shifts found.</TableCell></TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           {/* Bottom Section: Total Rows on Left, Pagination on Right */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, gap: 2 }}>
//             <Stack direction="row" spacing={2} alignItems="center">
//                 <FormControl size="small" sx={{ minWidth: 70 }}>
//                     <InputLabel id="rows-per-page-label">Rows</InputLabel>
//                     <Select
//                         labelId="rows-per-page-label"
//                         label="Rows"
//                         value={rowsPerPage}
//                         onChange={(e) => setRowsPerPage(Number(e.target.value))}
//                     >
//                         <MenuItem value={5}>5</MenuItem>
//                         <MenuItem value={10}>10</MenuItem>
//                         <MenuItem value={20}>20</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <Typography variant="body2" color="text.secondary">
//                     Showing {paginatedShifts.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredShifts.length)} of {filteredShifts.length} entries
//                 </Typography>
//             </Stack>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button variant="outlined" disabled={page === 0} onClick={() => handleChangePage(page - 1)}>Previous</Button>
//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => handleChangePage(page + 1)}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>

//         <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{isEditMode ? "Edit Office Shift" : "Add New Office Shift"}</Typography>
//             <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Hide</Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>Shift Name <span style={{ color: 'red' }}>*</span></Typography>
//                 <TextField fullWidth placeholder="e.g. Morning Shift" value={newShift.name} onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))} required />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>Employee Hub <span style={{ color: 'red' }}>*</span></Typography>
//                 <Autocomplete
//                   fullWidth
//                   options={employeeHubs}
//                   getOptionLabel={(option) => option.employee_hub_name}
//                   value={employeeHubs.find(hub => hub.employee_hub_id === newShift.employee_hub_id) || null}
//                   onChange={(event, newValue) => {
//                     setNewShift(prev => ({ ...prev, employee_hub_id: newValue ? newValue.employee_hub_id : '' }));
//                   }}
//                   renderInput={(params) => <TextField {...params} label="Select Hub" required />}
//                 />
//               </Grid>
//               {daysOfWeek.map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'in')}</Grid>
//                     <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Typography color="text.secondary">To</Typography></Grid>
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'out')}</Grid>
//                     {(day === "saturday" || day === "sunday") && (
//                       <Grid item xs={12}><FormControlLabel control={<Switch checked={newShift.weekendSettings[day]} onChange={() => handleWeekendToggle(day)} color="primary" />} label={`Mark as holiday`} /></Grid>
//                     )}
//                   </Grid>
//                   {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContent>
//           <DialogActions sx={{ p: '16px 24px' }}>
//             <Button onClick={handleReset} color="secondary" variant="outlined">Reset</Button>
//             <Button variant="contained" onClick={handleSubmit}>Save</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default OfficeShifts;





// import React, { useEffect, useState } from 'react';
// import {
//   ThemeProvider,
//   createTheme,
//   Paper,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   IconButton,
//   Divider,
//   Chip,
//   InputAdornment,
//   CssBaseline,
//   Switch,
//   FormControlLabel,
//   Tooltip,
//   useMediaQuery,
//   Stack,
//   Autocomplete,
//   Skeleton,
//   TablePagination,
//   CircularProgress
// } from '@mui/material';
// import Add from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import SearchIcon from '@mui/icons-material/Search';
// import axiosInstance from '../../utils/axiosInstance';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// // 🎨 Color & Theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//       dark: '#6d1d60',
//     },
//     secondary: {
//       main: '#F58E35',
//     },
//     background: {
//       default: '#f5f5f9',
//       paper: '#ffffff',
//     },
//   },
//   typography: {
//     h5: {
//       fontWeight: 'bold',
//       color: '#8C257C',
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: '#FFFFFF',
//           '&:hover': {
//             backgroundColor: '#6d1d60',
//           },
//         },
//       },
//     },
//     MuiTableHead: {
//         styleOverrides: {
//             root: {
//                 backgroundColor: '#8C257C',
//             }
//         }
//     },
//     MuiTableCell: {
//         styleOverrides: {
//             head: {
//                 color: '#FFFFFF',
//                 fontWeight: 'bold',
//             },
//             body: {
//                 fontSize: '0.95rem'
//             }
//         }
//     }
//   },
// });

// const getInitialNewShiftState = () => ({
//   company_id: 2,
//   name: '',
//   employee_hub_id: '',
//   times: {
//     monday: { in: '', out: '' },
//     tuesday: { in: '', out: '' },
//     wednesday: { in: '', out: '' },
//     thursday: { in: '', out: '' },
//     friday: { in: '', out: '' },
//     saturday: { in: '', out: '' },
//     sunday: { in: '', out: '' }
//   },
//   weekendSettings: {
//     saturday: false,
//     sunday: false
//   }
// });

// const formatTimeDisplay = (timeStr) => {
//   if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
//     return '--:--';
//   }
//   const parts = timeStr.split(':');
//   return `${parts[0]}:${parts[1]}`;
// };

// function OfficeShifts() {
//   const [shifts, setShifts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [newShift, setNewShift] = useState(getInitialNewShiftState());
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingShiftId, setEditingShiftId] = useState(null);

//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const fetchShifts = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get('shifts/');
//       setShifts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch shifts:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not fetch the office shifts.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployeeHubs = async () => {
//     try {
//       const response = await axiosInstance.get('api/employee_hub/');
//       if (response.data.status === 'success') {
//         setEmployeeHubs(response.data.data);
//       }
//     } catch (error) {
//       console.error('Failed to fetch employee hubs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchShifts();
//     fetchEmployeeHubs();
//   }, []);

//   const handleTimeChange = (day, type, value) => {
//     setNewShift(prev => ({ ...prev, times: { ...prev.times, [day]: { ...prev.times[day], [type]: value } } }));
//   };

//   const handleWeekendToggle = (day) => {
//     setNewShift(prev => {
//       const isNowHoliday = !prev.weekendSettings[day];
//       return {
//         ...prev,
//         weekendSettings: { ...prev.weekendSettings, [day]: isNowHoliday },
//         times: { ...prev.times, [day]: { in: isNowHoliday ? 'Holiday' : '', out: isNowHoliday ? 'Holiday' : '' } }
//       };
//     });
//   };

//   const handleSubmit = async () => {
//     if (!newShift.name || !newShift.employee_hub_id) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Information',
//         text: 'Shift Name and Employee Hub are required.',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     const basePayload = {
//       shift_name: newShift.name,
//       employee_hub_id: newShift.employee_hub_id,
//       monday_in_time: newShift.times.monday.in, monday_out_time: newShift.times.monday.out,
//       tuesday_in_time: newShift.times.tuesday.in, tuesday_out_time: newShift.times.tuesday.out,
//       wednesday_in_time: newShift.times.wednesday.in, wednesday_out_time: newShift.times.wednesday.out,
//       thursday_in_time: newShift.times.thursday.in, thursday_out_time: newShift.times.thursday.out,
//       friday_in_time: newShift.times.friday.in, friday_out_time: newShift.times.friday.out,
//       saturday_in_time: newShift.times.saturday.in, saturday_out_time: newShift.times.saturday.out,
//       sunday_in_time: newShift.times.sunday.in, sunday_out_time: newShift.times.sunday.out
//     };

//     try {
//       if (isEditMode) {
//         const payload = { ...basePayload, shift_id: editingShiftId };
//         await axiosInstance.put(`shifts/${editingShiftId}/`, payload);
//         Swal.fire({ icon: 'success', title: 'Shift Updated!', showConfirmButton: false, timer: 3000 });
//       } else {
//         const payload = { ...basePayload, company_id: newShift.company_id, created_at: dayjs().format('YYYY-MM-DD HH:mm:ss') };
//         await axiosInstance.post('shifts/', payload);
//         Swal.fire({ icon: 'success', title: 'Shift Added!', showConfirmButton: false, timer: 3000 });
//       }
//       fetchShifts();
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving shift:', error.response?.data || error.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Save Failed',
//         text: error.response?.data?.message || 'An unexpected error occurred.',
//         timer: 3000,
//         showConfirmButton: false
//       });
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//   const handleEdit = (shiftToEdit) => {
//     setIsEditMode(true);
//     setEditingShiftId(shiftToEdit.office_shift_id);
//     const isSaturdayHoliday = shiftToEdit.saturday_in_time === 'Holiday';
//     const isSundayHoliday = shiftToEdit.sunday_in_time === 'Holiday';
//     setNewShift({
//       company_id: shiftToEdit.company_id || 2,
//       name: shiftToEdit.shift_name,
//       employee_hub_id: shiftToEdit.employee_hub_id,
//       times: {
//         monday: { in: shiftToEdit.monday_in_time, out: shiftToEdit.monday_out_time },
//         tuesday: { in: shiftToEdit.tuesday_in_time, out: shiftToEdit.tuesday_out_time },
//         wednesday: { in: shiftToEdit.wednesday_in_time, out: shiftToEdit.wednesday_out_time },
//         thursday: { in: shiftToEdit.thursday_in_time, out: shiftToEdit.thursday_out_time },
//         friday: { in: shiftToEdit.friday_in_time, out: shiftToEdit.friday_out_time },
//         saturday: { in: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_in_time, out: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_out_time },
//         sunday: { in: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_in_time, out: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_out_time },
//       },
//       weekendSettings: { saturday: isSaturdayHoliday, sunday: isSundayHoliday }
//     });
//     setOpenAddDialog(true);
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#F58E35',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`shifts/${id}/`);
//           fetchShifts();
//           Swal.fire({ title: 'Deleted!', text: 'The shift has been deleted.', icon: 'success', timer: 3000, showConfirmButton: false });
//         } catch (error) {
//           console.error('Failed to delete shift:', error);
//           Swal.fire({ title: 'Failed!', text: 'Could not delete the shift.', icon: 'error', timer: 3000, showConfirmButton: false });
//         }
//       }
//     });
//   };

//   const handleReset = () => { setNewShift(getInitialNewShiftState()); };

//   const handleCloseDialog = () => {
//     setOpenAddDialog(false);
//     setIsEditMode(false);
//     setEditingShiftId(null);
//     handleReset();
//   };
  
//   const handleChangePage = (event, newPage) => { setPage(newPage); };
  
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const renderTimeInput = (day, type) => (
//     <TextField
//       fullWidth type="time" value={newShift.times[day][type]}
//       onChange={(e) => handleTimeChange(day, type, e.target.value)}
//       disabled={newShift.weekendSettings[day]}
//       InputLabelProps={{ shrink: true }}
//       InputProps={{
//         startAdornment: (<InputAdornment position="start"><AccessTimeIcon /></InputAdornment>),
//       }}
//       sx={{ bgcolor: 'background.paper' }}
//     />
//   );
  
//   const filteredShifts = shifts.filter(shift => 
//       shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box p={3}>
//         <Box component={Paper} p={3}>
//           <Typography variant="h4" mb={2}sx={{ color: "#8C257C ", fontWeight: "bold", mb: 5 }}>
//              Shifts & Scheduling
//           </Typography>
          
//           <Stack
//             direction={isMobile ? 'column' : 'row'}
//             justifyContent="space-between"
//             alignItems={isMobile ? 'stretch' : 'center'}
//             spacing={2}
//             mb={2}
//           >
//             <Button
//               variant="contained"
//               startIcon={<Add />}
//               onClick={() => {
//                 setIsEditMode(false);
//                 setNewShift(getInitialNewShiftState());
//                 setOpenAddDialog(true);
//               }}
//             >
//               Add New
//             </Button>
//             <TextField
//               size="small"
//               placeholder="Search ..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               sx={{ width: isMobile ? "100%" : 'auto' }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Stack>

//           <TableContainer>
//             <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>SR. NO.</TableCell>
//                   <TableCell>SHIFT</TableCell>
//                   {daysOfWeek.map(day => (<TableCell key={day} sx={{textTransform: 'uppercase'}}>{day}</TableCell>))}
//                   <TableCell align="center">ACTION</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   Array.from(new Array(rowsPerPage)).map((_, index) => (
//                     <TableRow key={index}>
//                       <TableCell><Skeleton variant="text" /></TableCell>
//                       <TableCell><Skeleton variant="text" /></TableCell>
//                       {daysOfWeek.map(day => (<TableCell key={day}><Skeleton variant="text" /></TableCell>))}
//                       <TableCell align="center">
//                         <Skeleton variant="rectangular" width={80} height={30} sx={{ margin: 'auto' }} />
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : paginatedShifts.length > 0 ? (
//                   paginatedShifts.map((shift, index) => (
//                     <TableRow key={shift.office_shift_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
//                       {daysOfWeek.map(day => (
//                         <TableCell key={day}>
//                           {shift[`${day}_in_time`] === 'Holiday'
//                             ? <Chip label="Holiday" color="success" size="small" />
//                             : `${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`
//                           }
//                         </TableCell>
//                       ))}
//                       <TableCell>
//                         <Box display="flex" justifyContent="center" gap={0.5}>
//                           <Tooltip title="Edit Shift">
//                             <IconButton onClick={() => handleEdit(shift)} color="primary"><EditIcon /></IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete Shift">
//                             <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="secondary"><DeleteIcon /></IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={10} align="center">No shifts found.</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: isMobile ? 'column-reverse' : 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               pt: 2,
//               gap: 2
//             }}
//           >
//             <Typography variant="body2" color="text.secondary">
//               Showing {paginatedShifts.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredShifts.length)} of {filteredShifts.length} results
//             </Typography>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 15, 25]}
//               component="div"
//               count={filteredShifts.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </Box>
//         </Box>
        
//         <Dialog open={openAddDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//           <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//             {isEditMode ? "Edit Office Shift" : "Add New Office Shift"}
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12}>
//                 <TextField 
//                   fullWidth 
//                   label="Shift Name"
//                   placeholder="e.g. Morning Shift" 
//                   value={newShift.name} 
//                   onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))} 
//                   required 
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Autocomplete
//                   fullWidth
//                   options={employeeHubs}
//                   getOptionLabel={(option) => option.employee_hub_name}
//                   value={employeeHubs.find(hub => hub.employee_hub_id === newShift.employee_hub_id) || null}
//                   onChange={(_, newValue) => {
//                     setNewShift(prev => ({ ...prev, employee_hub_id: newValue ? newValue.employee_hub_id : '' }));
//                   }}
//                   renderInput={(params) => <TextField {...params} label="Employee Hub" required />}
//                 />
//               </Grid>
//               {daysOfWeek.map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'in')}</Grid>
//                     <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Typography color="text.secondary">To</Typography></Grid>
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'out')}</Grid>
//                     {(day === "saturday" || day === "sunday") && (
//                       <Grid item xs={12}>
//                         <FormControlLabel control={<Switch checked={newShift.weekendSettings[day] || false} onChange={() => handleWeekendToggle(day)} />} label="Mark as holiday" />
//                       </Grid>
//                     )}
//                   </Grid>
//                   {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContent>
//           <DialogActions sx={{ p: '16px 24px' }}>
//             <Button 
//                 onClick={handleCloseDialog} 
//                 sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)'} }}
//             >
//                 Cancel
//             </Button>
//             <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
//               {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default OfficeShifts;





// import React, { useEffect, useState } from 'react';
// import {
//   ThemeProvider,
//   createTheme,
//   Paper,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   IconButton,
//   Divider,
//   Chip,
//   InputAdornment,
//   CssBaseline,
//   Switch,
//   FormControlLabel,
//   Tooltip,
//   useMediaQuery,
//   Stack,
//   Autocomplete,
//   Skeleton,
//   CircularProgress,
//   FormControl, // Added import
//   Select,      // Added import
//   MenuItem,    // Added import
//   Pagination   // Added import
// } from '@mui/material';
// import Add from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import SearchIcon from '@mui/icons-material/Search';
// import axiosInstance from '../../utils/axiosInstance';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// // 🎨 Color & Theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//       dark: '#6d1d60',
//     },
//     secondary: {
//       main: '#F58E35',
//     },
//     background: {
//       default: '#f5f5f9',
//       paper: '#ffffff',
//     },
//   },
//   typography: {
//     h5: {
//       fontWeight: 'bold',
//       color: '#8C257C',
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: '#FFFFFF',
//           '&:hover': {
//             backgroundColor: '#6d1d60',
//           },
//         },
//       },
//     },
//     MuiTableHead: {
//         styleOverrides: {
//             root: {
//                 backgroundColor: '#8C257C',
//             }
//         }
//     },
//     MuiTableCell: {
//         styleOverrides: {
//             head: {
//                 color: '#FFFFFF',
//                 fontWeight: 'bold',
//             },
//             body: {
//                 fontSize: '0.95rem'
//             }
//         }
//     }
//   },
// });

// const getInitialNewShiftState = () => ({
//   // ... (function remains the same)
//   company_id: 2,
//   name: '',
//   employee_hub_id: '',
//   times: {
//     monday: { in: '', out: '' },
//     tuesday: { in: '', out: '' },
//     wednesday: { in: '', out: '' },
//     thursday: { in: '', out: '' },
//     friday: { in: '', out: '' },
//     saturday: { in: '', out: '' },
//     sunday: { in: '', out: '' }
//   },
//   weekendSettings: {
//     saturday: false,
//     sunday: false
//   }
// });

// const formatTimeDisplay = (timeStr) => {
//   // ... (function remains the same)
//   if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
//     return '--:--';
//   }
//   const parts = timeStr.split(':');
//   return `${parts[0]}:${parts[1]}`;
// };

// function OfficeShifts() {
//   const [shifts, setShifts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [newShift, setNewShift] = useState(getInitialNewShiftState());
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingShiftId, setEditingShiftId] = useState(null);

//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const fetchShifts = async () => {
//     // ... (function remains the same)
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get('shifts/');
//       setShifts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch shifts:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not fetch the office shifts.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployeeHubs = async () => {
//     // ... (function remains the same)
//      try {
//       const response = await axiosInstance.get('api/employee_hub/');
//       if (response.data.status === 'success') {
//         setEmployeeHubs(response.data.data);
//       }
//     } catch (error) {
//       console.error('Failed to fetch holiday hubs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchShifts();
//     fetchEmployeeHubs();
//   }, []);

//   const handleTimeChange = (day, type, value) => {
//     // ... (function remains the same)
//     setNewShift(prev => ({ ...prev, times: { ...prev.times, [day]: { ...prev.times[day], [type]: value } } }));
//   };

//   const handleWeekendToggle = (day) => {
//     // ... (function remains the same)
//     setNewShift(prev => {
//       const isNowHoliday = !prev.weekendSettings[day];
//       return {
//         ...prev,
//         weekendSettings: { ...prev.weekendSettings, [day]: isNowHoliday },
//         times: { ...prev.times, [day]: { in: isNowHoliday ? 'Holiday' : '', out: isNowHoliday ? 'Holiday' : '' } }
//       };
//     });
//   };

//   const handleSubmit = async () => {
//     // ... (function remains the same)
//      if (!newShift.name || !newShift.employee_hub_id) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Information',
//         text: 'Shift Name and holiday Hub are required.',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     const basePayload = {
//       shift_name: newShift.name,
//       employee_hub_id: newShift.employee_hub_id,
//       monday_in_time: newShift.times.monday.in, monday_out_time: newShift.times.monday.out,
//       tuesday_in_time: newShift.times.tuesday.in, tuesday_out_time: newShift.times.tuesday.out,
//       wednesday_in_time: newShift.times.wednesday.in, wednesday_out_time: newShift.times.wednesday.out,
//       thursday_in_time: newShift.times.thursday.in, thursday_out_time: newShift.times.thursday.out,
//       friday_in_time: newShift.times.friday.in, friday_out_time: newShift.times.friday.out,
//       saturday_in_time: newShift.times.saturday.in, saturday_out_time: newShift.times.saturday.out,
//       sunday_in_time: newShift.times.sunday.in, sunday_out_time: newShift.times.sunday.out
//     };

//     try {
//       if (isEditMode) {
//         const payload = { ...basePayload, shift_id: editingShiftId };
//         await axiosInstance.put(`shifts/${editingShiftId}/`, payload);
//         Swal.fire({ icon: 'success', title: 'Shift Updated!', showConfirmButton: false, timer: 3000 });
//       } else {
//         const payload = { ...basePayload, company_id: newShift.company_id, created_at: dayjs().format('YYYY-MM-DD HH:mm:ss') };
//         await axiosInstance.post('shifts/', payload);
//         Swal.fire({ icon: 'success', title: 'Shift Added!', showConfirmButton: false, timer: 3000 });
//       }
//       fetchShifts();
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving shift:', error.response?.data || error.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Save Failed',
//         text: error.response?.data?.message || 'An unexpected error occurred.',
//         timer: 3000,
//         showConfirmButton: false
//       });
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//   const handleEdit = (shiftToEdit) => {
//     // ... (function remains the same)
//     setIsEditMode(true);
//     setEditingShiftId(shiftToEdit.office_shift_id);
//     const isSaturdayHoliday = shiftToEdit.saturday_in_time === 'Holiday';
//     const isSundayHoliday = shiftToEdit.sunday_in_time === 'Holiday';
//     setNewShift({
//       company_id: shiftToEdit.company_id || 2,
//       name: shiftToEdit.shift_name,
//       employee_hub_id: shiftToEdit.employee_hub_id,
//       times: {
//         monday: { in: shiftToEdit.monday_in_time, out: shiftToEdit.monday_out_time },
//         tuesday: { in: shiftToEdit.tuesday_in_time, out: shiftToEdit.tuesday_out_time },
//         wednesday: { in: shiftToEdit.wednesday_in_time, out: shiftToEdit.wednesday_out_time },
//         thursday: { in: shiftToEdit.thursday_in_time, out: shiftToEdit.thursday_out_time },
//         friday: { in: shiftToEdit.friday_in_time, out: shiftToEdit.friday_out_time },
//         saturday: { in: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_in_time, out: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_out_time },
//         sunday: { in: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_in_time, out: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_out_time },
//       },
//       weekendSettings: { saturday: isSaturdayHoliday, sunday: isSundayHoliday }
//     });
//     setOpenAddDialog(true);
//   };

//   const handleDelete = (id) => {
//     // ... (function remains the same)
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#F58E35',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`shifts/${id}/`);
//           fetchShifts();
//           Swal.fire({ title: 'Deleted!', text: 'The shift has been deleted.', icon: 'success', timer: 3000, showConfirmButton: false });
//         } catch (error) {
//           console.error('Failed to delete shift:', error);
//           Swal.fire({ title: 'Failed!', text: 'Could not delete the shift.', icon: 'error', timer: 3000, showConfirmButton: false });
//         }
//       }
//     });
//   };

//   const handleReset = () => { setNewShift(getInitialNewShiftState()); };

//   const handleCloseDialog = () => {
//     setOpenAddDialog(false);
//     setIsEditMode(false);
//     setEditingShiftId(null);
//     handleReset();
//   };
  
//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };
  
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const renderTimeInput = (day, type) => (
//     <TextField
//       fullWidth type="time" value={newShift.times[day][type]}
//       onChange={(e) => handleTimeChange(day, type, e.target.value)}
//       disabled={newShift.weekendSettings[day]}
//       InputLabelProps={{ shrink: true }}
//       InputProps={{
//         startAdornment: (<InputAdornment position="start"><AccessTimeIcon /></InputAdornment>),
//       }}
//       sx={{ bgcolor: 'background.paper' }}
//     />
//   );
  
//   const filteredShifts = shifts.filter(shift => 
//       shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
//   const startEntry = filteredShifts.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredShifts.length);

//   const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box p={3}>
//         <Box component={Paper} p={3}>
//           {/* ... (Header and search bar remain the same) */}
//           <Typography variant="h4" mb={2}sx={{ color: "#8C257C ", fontWeight: "bold", mb: 5 }}>
//              Shifts & Scheduling
//           </Typography>
//           <Stack
//             direction={isMobile ? 'column' : 'row'}
//             justifyContent="space-between"
//             alignItems={isMobile ? 'stretch' : 'center'}
//             spacing={2}
//             mb={2}
//           >
//             <Button
//               variant="contained"
//               startIcon={<Add />}
//               onClick={() => {
//                 setIsEditMode(false);
//                 setNewShift(getInitialNewShiftState());
//                 setOpenAddDialog(true);
//               }}
//             >
//               Add New
//             </Button>
//             <TextField
//               size="small"
//               placeholder="Search ..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               sx={{ width: isMobile ? "100%" : 'auto' }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Stack>

//           <TableContainer>
//             {/* ... (Table remains the same) */}
//             <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>SR. NO.</TableCell>
//                   <TableCell>SHIFT</TableCell>
//                   {daysOfWeek.map(day => (<TableCell key={day} sx={{textTransform: 'uppercase'}}>{day}</TableCell>))}
//                   <TableCell align="center">ACTION</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   Array.from(new Array(rowsPerPage)).map((_, index) => (
//                     <TableRow key={index}>
//                       <TableCell><Skeleton variant="text" /></TableCell>
//                       <TableCell><Skeleton variant="text" /></TableCell>
//                       {daysOfWeek.map(day => (<TableCell key={day}><Skeleton variant="text" /></TableCell>))}
//                       <TableCell align="center">
//                         <Skeleton variant="rectangular" width={80} height={30} sx={{ margin: 'auto' }} />
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : paginatedShifts.length > 0 ? (
//                   paginatedShifts.map((shift, index) => (
//                     <TableRow key={shift.office_shift_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
//                       {daysOfWeek.map(day => (
//                         <TableCell key={day}>
//                           {shift[`${day}_in_time`] === 'Holiday'
//                             ? <Chip label="Holiday" color="success" size="small" />
//                             : `${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`
//                           }
//                         </TableCell>
//                       ))}
//                       <TableCell>
//                         <Box display="flex" justifyContent="center" gap={0.5}>
//                           <Tooltip title="Edit Shift">
//                             <IconButton onClick={() => handleEdit(shift)} color="primary"><EditIcon /></IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete Shift">
//                             <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="secondary"><DeleteIcon /></IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={10} align="center">No shifts found.</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//           {/* --- START: New Styled Pagination --- */}
//           <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//               {loading ? (
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Skeleton variant="text" width={200} />
//                       <Skeleton variant="rectangular" width={300} height={40} />
//                   </Box>
//               ) : (
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                           <FormControl variant="outlined" size="small">
//                               <Select
//                                   value={rowsPerPage}
//                                   onChange={handleChangeRowsPerPage}
//                                   sx={{
//                                       backgroundColor: 'primary.main',
//                                       color: 'white',
//                                       borderRadius: '4px',
//                                       transition: 'background-color 0.3s',
//                                       '&:hover': {
//                                           backgroundColor: 'primary.dark',
//                                       },
//                                       '& .MuiOutlinedInput-notchedOutline': {
//                                           border: 'none',
//                                       },
//                                       '& .MuiSvgIcon-root': {
//                                           color: 'white',
//                                       },
//                                   }}
//                               >
//                                   {[5, 10, 15, 25].map((value) => (
//                                       <MenuItem key={value} value={value}>{value}</MenuItem>
//                                   ))}
//                               </Select>
//                           </FormControl>
//                           <Typography variant="body2" color="text.secondary">
//                              {`Showing ${startEntry} to ${endEntry} of ${filteredShifts.length} results`}
//                           </Typography>
//                       </Box>
//                       <Pagination
//                           count={Math.ceil(filteredShifts.length / rowsPerPage)}
//                           page={page + 1}
//                           onChange={handlePaginationChange}
//                           showFirstButton
//                           showLastButton
//                           sx={{
//                               '& .MuiPaginationItem-root': {
//                                   borderRadius: '4px',
//                                   transition: 'background-color 0.3s, color 0.3s',
//                                   '&:hover': {
//                                       backgroundColor: 'secondary.main',
//                                       color: 'white',
//                                   }
//                               },
//                               '& .MuiPaginationItem-page': {
//                                   color: 'primary.main',
//                                   '&.Mui-selected': {
//                                       backgroundColor: 'primary.main',
//                                       color: 'white',
//                                       '&:hover': {
//                                           backgroundColor: 'secondary.main',
//                                       }
//                                   },
//                               },
//                                '& .MuiPaginationItem-icon': {
//                                   color: 'primary.main',
//                               }
//                           }}
//                       />
//                   </Box>
//               )}
//           </Box>
//           {/* --- END: New Styled Pagination --- */}
//         </Box>
        
//         <Dialog open={openAddDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//           {/* ... (Dialog content remains the same) */}
//           <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//             {isEditMode ? "Edit Office Shift" : "Add New Office Shift"}
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12}>
//                 <TextField 
//                   fullWidth 
//                   label="Shift Name"
//                   placeholder="e.g. Morning Shift" 
//                   value={newShift.name} 
//                   onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))} 
//                   required 
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Autocomplete
//                   fullWidth
//                   options={employeeHubs}
//                   getOptionLabel={(option) => option.employee_hub_name}
//                   value={employeeHubs.find(hub => hub.employee_hub_id === newShift.employee_hub_id) || null}
//                   onChange={(_, newValue) => {
//                     setNewShift(prev => ({ ...prev, employee_hub_id: newValue ? newValue.employee_hub_id : '' }));
//                   }}
//                   renderInput={(params) => <TextField {...params} label="holiday Hub" required />}
//                 />
//               </Grid>
//               {daysOfWeek.map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'in')}</Grid>
//                     <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Typography color="text.secondary">To</Typography></Grid>
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'out')}</Grid>
//                     {(day === "saturday" || day === "sunday") && (
//                       <Grid item xs={12}>
//                         <FormControlLabel control={<Switch checked={newShift.weekendSettings[day] || false} onChange={() => handleWeekendToggle(day)} />} label="Mark as holiday" />
//                       </Grid>
//                     )}
//                   </Grid>
//                   {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContent>
//           <DialogActions sx={{ p: '16px 24px' }}>
//             <Button 
//                 onClick={handleCloseDialog} 
//                 sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)'} }}
//             >
//                 Cancel
//             </Button>
//             <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
//               {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default OfficeShifts;







// import React, { useEffect, useState } from 'react';
// import {
//   ThemeProvider,
//   createTheme,
//   Paper,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   IconButton,
//   Divider,
//   Chip,
//   InputAdornment,
//   CssBaseline,
//   Switch,
//   FormControlLabel,
//   Tooltip,
//   useMediaQuery,
//   Stack,
//   Autocomplete,
//   Skeleton,
//   CircularProgress,
//   FormControl,
//   Select,
//   MenuItem,
//   Pagination
// } from '@mui/material';
// import Add from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import SearchIcon from '@mui/icons-material/Search';
// import axiosInstance from '../../utils/axiosInstance';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// // 🎨 Color & Theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//       dark: '#6d1d60',
//     },
//     secondary: {
//       main: '#F58E35',
//     },
//     background: {
//       default: '#f5f5f9',
//       paper: '#ffffff',
//     },
//   },
//   typography: {
//     h5: {
//       fontWeight: 'bold',
//       color: '#8C257C',
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: '#FFFFFF',
//           '&:hover': {
//             backgroundColor: '#6d1d60',
//           },
//         },
//       },
//     },
//     MuiTableHead: {
//         styleOverrides: {
//             root: {
//                 backgroundColor: '#8C257C',
//             }
//         }
//     },
//     MuiTableCell: {
//         styleOverrides: {
//             head: {
//                 color: '#FFFFFF',
//                 fontWeight: 'bold',
//             },
//             body: {
//                 fontSize: '0.95rem'
//             }
//         }
//     }
//   },
// });

// const getInitialNewShiftState = () => ({
//   company_id: 2,
//   name: '',
//   employee_hub_id: '',
//   times: {
//     monday: { in: '', out: '' },
//     tuesday: { in: '', out: '' },
//     wednesday: { in: '', out: '' },
//     thursday: { in: '', out: '' },
//     friday: { in: '', out: '' },
//     saturday: { in: '', out: '' },
//     sunday: { in: '', out: '' }
//   },
//   holidaySettings: {
//     monday: false,
//     tuesday: false,
//     wednesday: false,
//     thursday: false,
//     friday: false,
//     saturday: false,
//     sunday: false
//   }
// });

// const formatTimeDisplay = (timeStr) => {
//   if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
//     return '--:--';
//   }
//   const parts = timeStr.split(':');
//   return `${parts[0]}:${parts[1]}`;
// };

// function OfficeShifts() {
//   const [shifts, setShifts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [newShift, setNewShift] = useState(getInitialNewShiftState());
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingShiftId, setEditingShiftId] = useState(null);

//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

//   const fetchShifts = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get('shifts/');
//       setShifts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch shifts:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not fetch the office shifts.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployeeHubs = async () => {
//      try {
//       const response = await axiosInstance.get('api/employee_hub/');
//       if (response.data.status === 'success') {
//         setEmployeeHubs(response.data.data);
//       }
//     } catch (error) {
//       console.error('Failed to fetch holiday hubs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchShifts();
//     fetchEmployeeHubs();
//   }, []);

//   const handleTimeChange = (day, type, value) => {
//     setNewShift(prev => ({ ...prev, times: { ...prev.times, [day]: { ...prev.times[day], [type]: value } } }));
//   };

//   const handleHolidayToggle = (day) => {
//     setNewShift(prev => {
//       const isNowHoliday = !prev.holidaySettings[day];
//       return {
//         ...prev,
//         holidaySettings: { ...prev.holidaySettings, [day]: isNowHoliday },
//         times: { ...prev.times, [day]: { in: isNowHoliday ? 'Holiday' : '', out: isNowHoliday ? 'Holiday' : '' } }
//       };
//     });
//   };

//   const handleSubmit = async () => {
//      if (!newShift.name || !newShift.employee_hub_id) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Information',
//         text: 'Shift Name and holiday Hub are required.',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     const basePayload = {
//       shift_name: newShift.name,
//       employee_hub_id: newShift.employee_hub_id,
//       monday_in_time: newShift.times.monday.in, monday_out_time: newShift.times.monday.out,
//       tuesday_in_time: newShift.times.tuesday.in, tuesday_out_time: newShift.times.tuesday.out,
//       wednesday_in_time: newShift.times.wednesday.in, wednesday_out_time: newShift.times.wednesday.out,
//       thursday_in_time: newShift.times.thursday.in, thursday_out_time: newShift.times.thursday.out,
//       friday_in_time: newShift.times.friday.in, friday_out_time: newShift.times.friday.out,
//       saturday_in_time: newShift.times.saturday.in, saturday_out_time: newShift.times.saturday.out,
//       sunday_in_time: newShift.times.sunday.in, sunday_out_time: newShift.times.sunday.out
//     };

//     try {
//       if (isEditMode) {
//         const payload = { ...basePayload, shift_id: editingShiftId };
//         await axiosInstance.put(`shifts/${editingShiftId}/`, payload);
//         Swal.fire({ icon: 'success', title: 'Shift Updated!', showConfirmButton: false, timer: 3000 });
//       } else {
//         const payload = { ...basePayload, company_id: newShift.company_id, created_at: dayjs().format('YYYY-MM-DD HH:mm:ss') };
//         await axiosInstance.post('shifts/', payload);
//         Swal.fire({ icon: 'success', title: 'Shift Added!', showConfirmButton: false, timer: 3000 });
//       }
//       fetchShifts();
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving shift:', error.response?.data || error.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Save Failed',
//         text: error.response?.data?.message || 'An unexpected error occurred.',
//         timer: 3000,
//         showConfirmButton: false
//       });
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//   const handleEdit = (shiftToEdit) => {
//     setIsEditMode(true);
//     setEditingShiftId(shiftToEdit.office_shift_id);
    
//     const holidaySettings = {};
//     const times = {};

//     daysOfWeek.forEach(day => {
//         const isInTimeHoliday = shiftToEdit[`${day}_in_time`] === 'Holiday';
//         holidaySettings[day] = isInTimeHoliday;
//         times[day] = {
//             in: isInTimeHoliday ? 'Holiday' : shiftToEdit[`${day}_in_time`],
//             out: isInTimeHoliday ? 'Holiday' : shiftToEdit[`${day}_out_time`]
//         };
//     });
    
//     setNewShift({
//       company_id: shiftToEdit.company_id || 2,
//       name: shiftToEdit.shift_name,
//       employee_hub_id: shiftToEdit.employee_hub_id,
//       times: times,
//       holidaySettings: holidaySettings
//     });
//     setOpenAddDialog(true);
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#F58E35',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`shifts/${id}/`);
//           fetchShifts();
//           Swal.fire({ title: 'Deleted!', text: 'The shift has been deleted.', icon: 'success', timer: 3000, showConfirmButton: false });
//         } catch (error) {
//           console.error('Failed to delete shift:', error);
//           Swal.fire({ title: 'Failed!', text: 'Could not delete the shift.', icon: 'error', timer: 3000, showConfirmButton: false });
//         }
//       }
//     });
//   };

//   const handleReset = () => { setNewShift(getInitialNewShiftState()); };

//   const handleCloseDialog = () => {
//     setOpenAddDialog(false);
//     setIsEditMode(false);
//     setEditingShiftId(null);
//     handleReset();
//   };
  
//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };
  
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const renderTimeInput = (day, type) => (
//     <TextField
//       fullWidth type="time" value={newShift.times[day][type]}
//       onChange={(e) => handleTimeChange(day, type, e.target.value)}
//       disabled={newShift.holidaySettings[day]}
//       InputLabelProps={{ shrink: true }}
//       InputProps={{
//         startAdornment: (<InputAdornment position="start"><AccessTimeIcon /></InputAdornment>),
//       }}
//       sx={{ bgcolor: 'background.paper' }}
//     />
//   );
  
//   const filteredShifts = shifts.filter(shift => 
//       shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
//   const startEntry = filteredShifts.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredShifts.length);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box p={3}>
//         <Box component={Paper} p={3}>
//           <Typography variant="h4" mb={2}sx={{ color: "#8C257C ", fontWeight: "bold", mb: 5 }}>
//              Shifts & Scheduling
//           </Typography>
//           <Stack
//             direction={isMobile ? 'column' : 'row'}
//             justifyContent="space-between"
//             alignItems={isMobile ? 'stretch' : 'center'}
//             spacing={2}
//             mb={2}
//           >
//             <Button
//               variant="contained"
//               startIcon={<Add />}
//               onClick={() => {
//                 setIsEditMode(false);
//                 setNewShift(getInitialNewShiftState());
//                 setOpenAddDialog(true);
//               }}
//             >
//               Add New
//             </Button>
//             <TextField
//               size="small"
//               placeholder="Search ..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               sx={{ width: isMobile ? "100%" : 'auto' }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Stack>

//           <TableContainer>
//             <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>SR. NO.</TableCell>
//                   <TableCell>SHIFT</TableCell>
//                   {daysOfWeek.map(day => (<TableCell key={day} sx={{textTransform: 'uppercase'}}>{day}</TableCell>))}
//                   <TableCell align="center">ACTION</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   Array.from(new Array(rowsPerPage)).map((_, index) => (
//                     <TableRow key={index}>
//                       <TableCell><Skeleton variant="text" /></TableCell>
//                       <TableCell><Skeleton variant="text" /></TableCell>
//                       {daysOfWeek.map(day => (<TableCell key={day}><Skeleton variant="text" /></TableCell>))}
//                       <TableCell align="center">
//                         <Skeleton variant="rectangular" width={80} height={30} sx={{ margin: 'auto' }} />
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : paginatedShifts.length > 0 ? (
//                   paginatedShifts.map((shift, index) => (
//                     <TableRow key={shift.office_shift_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
//                       {daysOfWeek.map(day => (
//                         <TableCell key={day}>
//                           {shift[`${day}_in_time`] === 'Holiday'
//                             ? <Chip label="Holiday" color="success" size="small" />
//                             : `${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`
//                           }
//                         </TableCell>
//                       ))}
//                       <TableCell>
//                         <Box display="flex" justifyContent="center" gap={0.5}>
//                           <Tooltip title="Edit Shift">
//                             <IconButton onClick={() => handleEdit(shift)} color="primary"><EditIcon /></IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete Shift">
//                             <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="secondary"><DeleteIcon /></IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={10} align="center">No shifts found.</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//           <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//               {loading ? (
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Skeleton variant="text" width={200} />
//                       <Skeleton variant="rectangular" width={300} height={40} />
//                   </Box>
//               ) : (
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                           <FormControl variant="outlined" size="small">
//                               <Select
//                                   value={rowsPerPage}
//                                   onChange={handleChangeRowsPerPage}
//                                   sx={{
//                                       backgroundColor: 'primary.main',
//                                       color: 'white',
//                                       borderRadius: '4px',
//                                       transition: 'background-color 0.3s',
//                                       '&:hover': {
//                                           backgroundColor: 'primary.dark',
//                                       },
//                                       '& .MuiOutlinedInput-notchedOutline': {
//                                           border: 'none',
//                                       },
//                                       '& .MuiSvgIcon-root': {
//                                           color: 'white',
//                                       },
//                                   }}
//                               >
//                                   {[5, 10, 15, 25].map((value) => (
//                                       <MenuItem key={value} value={value}>{value}</MenuItem>
//                                   ))}
//                               </Select>
//                           </FormControl>
//                           <Typography variant="body2" color="text.secondary">
//                              {`Showing ${startEntry} to ${endEntry} of ${filteredShifts.length} results`}
//                           </Typography>
//                       </Box>
//                       <Pagination
//                           count={Math.ceil(filteredShifts.length / rowsPerPage)}
//                           page={page + 1}
//                           onChange={handlePaginationChange}
//                           showFirstButton
//                           showLastButton
//                           sx={{
//                               '& .MuiPaginationItem-root': {
//                                   borderRadius: '4px',
//                                   transition: 'background-color 0.3s, color 0.3s',
//                                   '&:hover': {
//                                       backgroundColor: 'secondary.main',
//                                       color: 'white',
//                                   }
//                               },
//                               '& .MuiPaginationItem-page': {
//                                   color: 'primary.main',
//                                   '&.Mui-selected': {
//                                       backgroundColor: 'primary.main',
//                                       color: 'white',
//                                       '&:hover': {
//                                           backgroundColor: 'secondary.main',
//                                       }
//                                   },
//                               },
//                                '& .MuiPaginationItem-icon': {
//                                   color: 'primary.main',
//                               }
//                           }}
//                       />
//                   </Box>
//               )}
//           </Box>
//         </Box>
        
//         <Dialog open={openAddDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//           <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//             {isEditMode ? "Edit Office Shift" : "Add New Office Shift"}
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12}>
//                 <TextField 
//                   fullWidth 
//                   label="Shift Name"
//                   placeholder="e.g. Morning Shift" 
//                   value={newShift.name} 
//                   onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))} 
//                   required 
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Autocomplete
//                   fullWidth
//                   options={employeeHubs}
//                   getOptionLabel={(option) => option.employee_hub_name}
//                   value={employeeHubs.find(hub => hub.employee_hub_id === newShift.employee_hub_id) || null}
//                   onChange={(_, newValue) => {
//                     setNewShift(prev => ({ ...prev, employee_hub_id: newValue ? newValue.employee_hub_id : '' }));
//                   }}
//                   renderInput={(params) => <TextField {...params} label="holiday Hub" required />}
//                 />
//               </Grid>
//               {daysOfWeek.map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'in')}</Grid>
//                     <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Typography color="text.secondary">To</Typography></Grid>
//                     <Grid item xs={12} sm={5}>{renderTimeInput(day, 'out')}</Grid>
//                     <Grid item xs={12}>
//                       <FormControlLabel 
//                         control={<Switch checked={newShift.holidaySettings[day] || false} onChange={() => handleHolidayToggle(day)} />} 
//                         label="Mark as holiday" 
//                       />
//                     </Grid>
//                   </Grid>
//                   {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContent>
//           <DialogActions sx={{ p: '16px 24px' }}>
//             <Button 
//                 onClick={handleCloseDialog} 
//                 sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)'} }}
//             >
//                 Cancel
//             </Button>
//             <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
//               {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default OfficeShifts;


import React, { useEffect, useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Divider,
  Chip,
  InputAdornment,
  CssBaseline,
  Switch,
  FormControlLabel,
  Tooltip,
  useMediaQuery,
  Stack,
  Autocomplete,
  Skeleton,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Pagination
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import axiosInstance from '../../utils/axiosInstance';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

// 🎨 Color & Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8C257C',
      dark: '#6d1d60',
    },
    secondary: {
      main: '#F58E35',
    },
    background: {
      default: '#f5f5f9',
      paper: '#ffffff',
    },
  },
  typography: {
    h5: {
      fontWeight: 'bold',
      color: '#8C257C',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#6d1d60',
          },
        },
      },
    },
    MuiTableHead: {
        styleOverrides: {
            root: {
                backgroundColor: '#8C257C',
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                color: '#FFFFFF',
                fontWeight: 'bold',
            },
            body: {
                fontSize: '0.95rem'
            }
        }
    }
  },
});

const getInitialNewShiftState = () => ({
  company_id: 2,
  name: '',
  state_id: '', 
  employee_hub_id: '',
  times: {
    monday: { in: '', out: '' },
    tuesday: { in: '', out: '' },
    wednesday: { in: '', out: '' },
    thursday: { in: '', out: '' },
    friday: { in: '', out: '' },
    saturday: { in: '', out: '' },
    sunday: { in: '', out: '' }
  },
  holidaySettings: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  }
});

const formatTimeDisplay = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
    return '--:--';
  }
  const parts = timeStr.split(':');
  return `${parts[0]}:${parts[1]}`;
};

function OfficeShifts() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [newShift, setNewShift] = useState(getInitialNewShiftState());
  
  // States for Dropdowns
  const [states, setStates] = useState([]); // List of States
  const [employeeHubs, setEmployeeHubs] = useState([]); // List of Hubs
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingShiftId, setEditingShiftId] = useState(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  // Fetch Table Data
  const fetchShifts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('shifts/');
      setShifts(response.data);
    } catch (error) {
      console.error('Failed to fetch shifts:', error);
      Swal.fire({
        icon: 'error',
        title: 'Fetch Error',
        text: 'Could not fetch the office shifts.',
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch States List (Fixed Country: India)
  const fetchStates = async () => {
    try {
      const response = await axiosInstance.get('https://tdtlworld.com/hrms-backend/api/states/?country_name=India');
      if (response.data.status === 'success') {
        setStates(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch states:', error);
    }
  };

  // Fetch Hubs based on State ID
  const fetchHubsByState = async (stateId) => {
    if (!stateId) {
        setEmployeeHubs([]);
        return;
    }
    try {
      const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${stateId}/`);
      if (response.data.status === 'success') {
        setEmployeeHubs(response.data.data);
      } else {
        setEmployeeHubs([]);
      }
    } catch (error) {
      console.error('Failed to fetch hubs:', error);
      setEmployeeHubs([]);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchShifts();
    fetchStates();
  }, []);

  const handleTimeChange = (day, type, value) => {
    setNewShift(prev => ({ ...prev, times: { ...prev.times, [day]: { ...prev.times[day], [type]: value } } }));
  };

  const handleHolidayToggle = (day) => {
    setNewShift(prev => {
      const isNowHoliday = !prev.holidaySettings[day];
      return {
        ...prev,
        holidaySettings: { ...prev.holidaySettings, [day]: isNowHoliday },
        times: { ...prev.times, [day]: { in: isNowHoliday ? 'Holiday' : '', out: isNowHoliday ? 'Holiday' : '' } }
      };
    });
  };

  const handleSubmit = async () => {
    // Validation: Added check for state_id as well since it is mandatory
     if (!newShift.name || !newShift.employee_hub_id || !newShift.state_id) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Shift Name, State, and Holiday Hub are required.',
      });
      return;
    }
    setIsSubmitting(true);
    const basePayload = {
      shift_name: newShift.name,
      employee_hub_id: newShift.employee_hub_id,
      monday_in_time: newShift.times.monday.in, monday_out_time: newShift.times.monday.out,
      tuesday_in_time: newShift.times.tuesday.in, tuesday_out_time: newShift.times.tuesday.out,
      wednesday_in_time: newShift.times.wednesday.in, wednesday_out_time: newShift.times.wednesday.out,
      thursday_in_time: newShift.times.thursday.in, thursday_out_time: newShift.times.thursday.out,
      friday_in_time: newShift.times.friday.in, friday_out_time: newShift.times.friday.out,
      saturday_in_time: newShift.times.saturday.in, saturday_out_time: newShift.times.saturday.out,
      sunday_in_time: newShift.times.sunday.in, sunday_out_time: newShift.times.sunday.out
    };

    try {
      if (isEditMode) {
        const payload = { ...basePayload, shift_id: editingShiftId };
        await axiosInstance.put(`shifts/${editingShiftId}/`, payload);
        Swal.fire({ icon: 'success', title: 'Shift Updated!', showConfirmButton: false, timer: 3000 });
      } else {
        const payload = { ...basePayload, company_id: newShift.company_id, created_at: dayjs().format('YYYY-MM-DD HH:mm:ss') };
        await axiosInstance.post('shifts/', payload);
        Swal.fire({ icon: 'success', title: 'Shift Added!', showConfirmButton: false, timer: 3000 });
      }
      fetchShifts();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving shift:', error.response?.data || error.message);
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: error.response?.data?.message || 'An unexpected error occurred.',
        timer: 3000,
        showConfirmButton: false
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleEdit = (shiftToEdit) => {
    setIsEditMode(true);
    setEditingShiftId(shiftToEdit.office_shift_id);
    
    const holidaySettings = {};
    const times = {};

    daysOfWeek.forEach(day => {
        const isInTimeHoliday = shiftToEdit[`${day}_in_time`] === 'Holiday';
        holidaySettings[day] = isInTimeHoliday;
        times[day] = {
            in: isInTimeHoliday ? 'Holiday' : shiftToEdit[`${day}_in_time`],
            out: isInTimeHoliday ? 'Holiday' : shiftToEdit[`${day}_out_time`]
        };
    });
    
    setNewShift({
      company_id: shiftToEdit.company_id || 2,
      name: shiftToEdit.shift_name,
      state_id: '', // Will remain empty until logic to find state from hub is added (backend dependency)
      employee_hub_id: shiftToEdit.employee_hub_id,
      times: times,
      holidaySettings: holidaySettings
    });

    setEmployeeHubs([]); 
    
    setOpenAddDialog(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8C257C',
      cancelButtonColor: '#F58E35',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`shifts/${id}/`);
          fetchShifts();
          Swal.fire({ title: 'Deleted!', text: 'The shift has been deleted.', icon: 'success', timer: 3000, showConfirmButton: false });
        } catch (error) {
          console.error('Failed to delete shift:', error);
          Swal.fire({ title: 'Failed!', text: 'Could not delete the shift.', icon: 'error', timer: 3000, showConfirmButton: false });
        }
      }
    });
  };

  const handleReset = () => { setNewShift(getInitialNewShiftState()); setEmployeeHubs([]); };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setIsEditMode(false);
    setEditingShiftId(null);
    handleReset();
  };
  
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const renderTimeInput = (day, type) => (
    <TextField
      fullWidth type="time" value={newShift.times[day][type]}
      onChange={(e) => handleTimeChange(day, type, e.target.value)}
      disabled={newShift.holidaySettings[day]}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        startAdornment: (<InputAdornment position="start"><AccessTimeIcon /></InputAdornment>),
      }}
      sx={{ bgcolor: 'background.paper' }}
    />
  );
  
  const filteredShifts = shifts.filter(shift => 
      shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  const startEntry = filteredShifts.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredShifts.length);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={3}>
        <Box component={Paper} p={3}>
          <Typography variant="h4" mb={2}sx={{ color: "#8C257C ", fontWeight: "bold", mb: 5 }}>
             Shifts & Scheduling
          </Typography>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems={isMobile ? 'stretch' : 'center'}
            spacing={2}
            mb={2}
          >
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setIsEditMode(false);
                setNewShift(getInitialNewShiftState());
                setEmployeeHubs([]); // Reset hubs
                setOpenAddDialog(true);
              }}
            >
              Add New
            </Button>
            <TextField
              size="small"
              placeholder="Search ..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: isMobile ? "100%" : 'auto' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <TableContainer>
            <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
              <TableHead>
                <TableRow>
                  <TableCell>SR. NO.</TableCell>
                  <TableCell>SHIFT</TableCell>
                  {daysOfWeek.map(day => (<TableCell key={day} sx={{textTransform: 'uppercase'}}>{day}</TableCell>))}
                  <TableCell align="center">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  Array.from(new Array(rowsPerPage)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      {daysOfWeek.map(day => (<TableCell key={day}><Skeleton variant="text" /></TableCell>))}
                      <TableCell align="center">
                        <Skeleton variant="rectangular" width={80} height={30} sx={{ margin: 'auto' }} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : paginatedShifts.length > 0 ? (
                  paginatedShifts.map((shift, index) => (
                    <TableRow key={shift.office_shift_id} hover>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
                      {daysOfWeek.map(day => (
                        <TableCell key={day}>
                          {shift[`${day}_in_time`] === 'Holiday'
                            ? <Chip label="Holiday" color="success" size="small" />
                            : `${formatTimeDisplay(shift[`${day}_in_time`])} To ${formatTimeDisplay(shift[`${day}_out_time`])}`
                          }
                        </TableCell>
                      ))}
                      <TableCell>
                        <Box display="flex" justifyContent="center" gap={0.5}>
                          <Tooltip title="Edit Shift">
                            <IconButton onClick={() => handleEdit(shift)} color="primary"><EditIcon /></IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Shift">
                            <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="secondary"><DeleteIcon /></IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={10} align="center">No shifts found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
              {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Skeleton variant="text" width={200} />
                      <Skeleton variant="rectangular" width={300} height={40} />
                  </Box>
              ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <FormControl variant="outlined" size="small">
                              <Select
                                  value={rowsPerPage}
                                  onChange={handleChangeRowsPerPage}
                                  sx={{
                                      backgroundColor: 'primary.main',
                                      color: 'white',
                                      borderRadius: '4px',
                                      transition: 'background-color 0.3s',
                                      '&:hover': {
                                          backgroundColor: 'primary.dark',
                                      },
                                      '& .MuiOutlinedInput-notchedOutline': {
                                          border: 'none',
                                      },
                                      '& .MuiSvgIcon-root': {
                                          color: 'white',
                                      },
                                  }}
                              >
                                  {[5, 10, 15, 25].map((value) => (
                                      <MenuItem key={value} value={value}>{value}</MenuItem>
                                  ))}
                              </Select>
                          </FormControl>
                          <Typography variant="body2" color="text.secondary">
                             {`Showing ${startEntry} to ${endEntry} of ${filteredShifts.length} results`}
                          </Typography>
                      </Box>
                      <Pagination
                          count={Math.ceil(filteredShifts.length / rowsPerPage)}
                          page={page + 1}
                          onChange={handlePaginationChange}
                          showFirstButton
                          showLastButton
                          sx={{
                              '& .MuiPaginationItem-root': {
                                  borderRadius: '4px',
                                  transition: 'background-color 0.3s, color 0.3s',
                                  '&:hover': {
                                      backgroundColor: 'secondary.main',
                                      color: 'white',
                                  }
                              },
                              '& .MuiPaginationItem-page': {
                                  color: 'primary.main',
                                  '&.Mui-selected': {
                                      backgroundColor: 'primary.main',
                                      color: 'white',
                                      '&:hover': {
                                          backgroundColor: 'secondary.main',
                                      }
                                  },
                              },
                               '& .MuiPaginationItem-icon': {
                                  color: 'primary.main',
                              }
                          }}
                      />
                  </Box>
              )}
          </Box>
        </Box>
        
        <Dialog open={openAddDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {isEditMode ? "Edit Office Shift" : "Add New Office Shift"}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField 
                  fullWidth 
                  label="Shift Name"
                  placeholder="e.g. Morning Shift" 
                  value={newShift.name} 
                  onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))} 
                  required 
                />
              </Grid>

              {/* State Dropdown (Modified) */}
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  options={states}
                  getOptionLabel={(option) => option.state_name}
                  value={states.find(s => s.state_id === newShift.state_id) || null}
                  onChange={(_, newValue) => {
                    if (newValue) {
                        setNewShift(prev => ({ 
                            ...prev, 
                            state_id: newValue.state_id,
                            employee_hub_id: '' // Clear hub when state changes
                        }));
                        fetchHubsByState(newValue.state_id);
                    } else {
                        setNewShift(prev => ({ 
                            ...prev, 
                            state_id: '',
                            employee_hub_id: '' 
                        }));
                        setEmployeeHubs([]);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="State" required />}
                />
              </Grid>

              {/* Hub Dropdown */}
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  options={employeeHubs}
                  getOptionLabel={(option) => option.employee_hub_name}
                  value={employeeHubs.find(hub => hub.employee_hub_id === newShift.employee_hub_id) || null}
                  onChange={(_, newValue) => {
                    setNewShift(prev => ({ ...prev, employee_hub_id: newValue ? newValue.employee_hub_id : '' }));
                  }}
                  disabled={!newShift.state_id && !isEditMode} // Disable if no state selected (unless editing)
                  renderInput={(params) => <TextField {...params} label="Holiday Hub" required />}
                  noOptionsText={!newShift.state_id ? "Please select a state first" : "No hubs found"}
                />
              </Grid>

              {daysOfWeek.map(day => (
                <Grid item xs={12} key={day}>
                  <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>{renderTimeInput(day, 'in')}</Grid>
                    <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Typography color="text.secondary">To</Typography></Grid>
                    <Grid item xs={12} sm={5}>{renderTimeInput(day, 'out')}</Grid>
                    <Grid item xs={12}>
                      <FormControlLabel 
                        control={<Switch checked={newShift.holidaySettings[day] || false} onChange={() => handleHolidayToggle(day)} />} 
                        label="Mark as holiday" 
                      />
                    </Grid>
                  </Grid>
                  {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: '16px 24px' }}>
            <Button 
                onClick={handleCloseDialog} 
                sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)'} }}
            >
                Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default OfficeShifts;