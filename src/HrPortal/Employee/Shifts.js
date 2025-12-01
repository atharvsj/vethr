import React, { useEffect, useState, useContext } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Divider,
  Chip,
  InputAdornment,
  FormHelperText,
  CssBaseline,
  Switch,
  FormControlLabel,
  InputLabel,
  Tooltip, // Added for tooltips
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // Added Edit Icon
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axiosInstance from '../../utils/axiosInstance';
import dayjs from 'dayjs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7c4dff',
    },
    background: {
      default: '#f5f5f9',
    },
  },
});

const getInitialNewShiftState = () => ({
  company_id: 2,
  name: '',
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
  weekendSettings: {
    saturday: false,
    sunday: false
  }
});

function OfficeShifts() {
  const [shifts, setShifts] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [newShift, setNewShift] = useState(getInitialNewShiftState());
  const [employeeHubs, setEmployeeHubs] = useState([]);
  
  // --- New State for Editing ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingShiftId, setEditingShiftId] = useState(null);

  const fetchShifts = async () => {
    try {
      const response = await axiosInstance.get('shifts/');
      setShifts(response.data);
    } catch (error) {
      console.error('Failed to fetch shifts:', error);
    }
  };

  useEffect(() => {
    fetchShifts();
    const fetchEmployeeHubs = async () => {
      try {
        const response = await axiosInstance.get('api/employee_hub/');
        if (response.data.status === 'success') {
          setEmployeeHubs(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch holiday hubs:', error);
      }
    };
    fetchEmployeeHubs();
  }, []);

  useEffect(() => { setPage(0); }, [rowsPerPage, searchTerm]);

  const handleTimeChange = (day, type, value) => {
    setNewShift(prev => ({ ...prev, times: { ...prev.times, [day]: { ...prev.times[day], [type]: value }}}));
  };
  
  const handleWeekendToggle = (day) => {
    setNewShift(prev => {
      const isNowHoliday = !prev.weekendSettings[day];
      return { ...prev, weekendSettings: { ...prev.weekendSettings, [day]: isNowHoliday },
               times: { ...prev.times, [day]: { in: isNowHoliday ? 'Holiday' : '', out: isNowHoliday ? 'Holiday' : '' }}};
    });
  };

  const handleClearTime = (day, type) => { handleTimeChange(day, type, ''); };

  // --- MODIFIED: Handles both Add (POST) and Edit (PUT) ---
  const handleSubmit = async () => {
    if (!newShift.name || !newShift.employee_hub_id) {
      alert("Shift Name and holiday Hub are required.");
      return;
    }
    
    // Base payload for both add and edit
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
      } else {
        const payload = { ...basePayload, company_id: newShift.company_id, created_at: dayjs().format('YYYY-MM-DD HH:mm:ss') };
        await axiosInstance.post('shifts/', payload);
      }
      fetchShifts();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving shift:', error.response?.data || error.message);
    }
  };
  
  // --- NEW: Function to handle opening the dialog for editing ---
  const handleEdit = (shiftToEdit) => {
    setIsEditMode(true);
    setEditingShiftId(shiftToEdit.office_shift_id);

    const isSaturdayHoliday = shiftToEdit.saturday_in_time === 'Holiday';
    const isSundayHoliday = shiftToEdit.sunday_in_time === 'Holiday';
    
    setNewShift({
      company_id: shiftToEdit.company_id || 2,
      name: shiftToEdit.shift_name,
      employee_hub_id: shiftToEdit.employee_hub_id,
      times: {
        monday: { in: shiftToEdit.monday_in_time, out: shiftToEdit.monday_out_time },
        tuesday: { in: shiftToEdit.tuesday_in_time, out: shiftToEdit.tuesday_out_time },
        wednesday: { in: shiftToEdit.wednesday_in_time, out: shiftToEdit.wednesday_out_time },
        thursday: { in: shiftToEdit.thursday_in_time, out: shiftToEdit.thursday_out_time },
        friday: { in: shiftToEdit.friday_in_time, out: shiftToEdit.friday_out_time },
        saturday: { in: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_in_time, out: isSaturdayHoliday ? 'Holiday' : shiftToEdit.saturday_out_time },
        sunday: { in: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_in_time, out: isSundayHoliday ? 'Holiday' : shiftToEdit.sunday_out_time },
      },
      weekendSettings: {
        saturday: isSaturdayHoliday,
        sunday: isSundayHoliday,
      }
    });
    setOpenAddDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      try {
        await axiosInstance.delete(`shifts/${id}/`);
        fetchShifts();
      } catch (error) {
        console.error('Failed to delete shift:', error);
      }
    }
  };

  const handleReset = () => { setNewShift(getInitialNewShiftState()); };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setIsEditMode(false); // Reset edit mode
    setEditingShiftId(null); // Clear editing ID
    handleReset();
  };
  
  const handleChangePage = (newPage) => { setPage(newPage); };
  
  const renderTimeInput = (day, type) => (
    <TextField
      fullWidth type="time" value={newShift.times[day][type]}
      onChange={(e) => handleTimeChange(day, type, e.target.value)}
      disabled={newShift.weekendSettings[day] === true}
      InputProps={{
        startAdornment: (<InputAdornment position="start"><AccessTimeIcon /></InputAdornment>),
        endAdornment: newShift.times[day][type] ? (<InputAdornment position="end"><IconButton onClick={() => handleClearTime(day, type)} edge="end" size="small"><DeleteIcon fontSize="small" /></IconButton></InputAdornment>) : null,
      }}
      sx={{ bgcolor: 'background.paper' }}
    />
  );
  
  const filteredShifts = shifts.filter(shift => shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase()));
  const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(filteredShifts.length / rowsPerPage);
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All Office Shifts</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)}>Add New</Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                <MenuItem value={5}>5</MenuItem> <MenuItem value={10}>10</MenuItem> <MenuItem value={20}>20</MenuItem>
              </Select>
              <FormHelperText>Entries per page</FormHelperText>
            </FormControl>
            <TextField size="small" placeholder="Search by Shift Name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: '250px' }} />
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell>SHIFT</TableCell>
                  {daysOfWeek.map(day => (<TableCell key={day}>{day.toUpperCase()}</TableCell>))}
                  <TableCell align="right">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedShifts.length > 0 ? paginatedShifts.map((shift) => (
                  <TableRow key={shift.office_shift_id} hover>
                    <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
                    {daysOfWeek.map(day => (
                      <TableCell key={day}>
                        {shift[`${day}_in_time`] === 'Holiday' ? <Chip label="Holiday" color="success" size="small" /> : `${shift[`${day}_in_time`] || '--:--'} To ${shift[`${day}_out_time`] || '--:--'}`}
                      </TableCell>
                    ))}
                    <TableCell align="right">
                      {/* --- Added Edit Button --- */}
                      <Tooltip title="Edit Shift">
                        <IconButton onClick={() => handleEdit(shift)} color="primary" aria-label="edit shift">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Shift">
                        <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="error" aria-label="delete shift">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={9} align="center">No shifts found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1 }}>
            <Typography variant="body2" color="text.secondary">Showing {paginatedShifts.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredShifts.length)} of {filteredShifts.length} entries</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" disabled={page === 0} onClick={() => handleChangePage(page - 1)}>Previous</Button>
              <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => handleChangePage(page + 1)}>Next</Button>
            </Box>
          </Box>
        </Paper>
        <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{isEditMode ? "Edit Office Shift" : "Add New Office Shift"}</Typography>
            <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Hide</Button>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>
                  Shift Name <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField fullWidth placeholder="e.g. Morning Shift" value={newShift.name}
                  onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>
                  Holiday Hub <span style={{ color: 'red' }}>*</span>
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="employee-hub-label">Select Hub</InputLabel>
                  <Select labelId="employee-hub-label" label="Select Hub"
                    value={newShift.employee_hub_id}
                    onChange={(e) => setNewShift(prev => ({ ...prev, employee_hub_id: e.target.value }))}
                    required >
                    {employeeHubs.map((hub) => (
                      <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>
                        {hub.employee_hub_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {daysOfWeek.map(day => (
                <Grid item xs={12} key={day}>
                  <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>{renderTimeInput(day, 'in')}</Grid>
                    <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Typography color="text.secondary">To</Typography></Grid>
                    <Grid item xs={12} sm={5}>{renderTimeInput(day, 'out')}</Grid>
                    {(day === "saturday" || day === "sunday") && (
                      <Grid item xs={12}>
                        <FormControlLabel control={<Switch checked={newShift.weekendSettings[day]} onChange={() => handleWeekendToggle(day)} color="primary"/>} label={`Mark as holiday`} />
                      </Grid>
                    )}
                  </Grid>
                  {day !== "sunday" && <Divider sx={{ mt: 2 }} />}
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: '16px 24px' }}>
            <Button onClick={handleReset} color="secondary" variant="outlined">Reset</Button>
            <Button variant="contained" onClick={handleSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default OfficeShifts;

// import React, { useState, useEffect } from 'react';
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
//   FormControlLabel
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
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

// function OfficeShifts() {
//   const [shifts, setShifts] = useState([]);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   const [newShift, setNewShift] = useState({
//     company_id: '',
//     name: '',
//     times: {
//       monday: { in: '', out: '' },
//       tuesday: { in: '', out: '' },
//       wednesday: { in: '', out: '' },
//       thursday: { in: '', out: '' },
//       friday: { in: '', out: '' },
//       saturday: { in: '', out: '' },
//       sunday: { in: '', out: '' }
//     },
//     weekendSettings: {
//       saturday: false,
//       sunday: false
//     }
//   });

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
//   }, []);

//   useEffect(() => {
//     setPage(0);
//   }, [rowsPerPage, searchTerm]);

//   const handleTimeChange = (day, type, value) => {
//     setNewShift(prev => ({
//       ...prev,
//       times: {
//         ...prev.times,
//         [day]: {
//           ...prev.times[day],
//           [type]: value
//         }
//       }
//     }));
//   };

//   const handleWeekendToggle = (day) => {
//     setNewShift(prev => ({
//       ...prev,
//       weekendSettings: {
//         ...prev.weekendSettings,
//         [day]: !prev.weekendSettings[day]
//       },
//       times: {
//         ...prev.times,
//         [day]: {
//           in: !prev.weekendSettings[day] ? 'Holiday' : '',
//           out: !prev.weekendSettings[day] ? 'Holiday' : ''
//         }
//       }
//     }));
//   };

//   const handleClearTime = (day, type) => {
//     handleTimeChange(day, type, '');
//   };

//   const handleSubmit = async () => {
//     if (!newShift.name || !newShift.company_id) {
      
//       return;
//     }

//     const payload = {
//       shift_name: newShift.name,
//       company_id: newShift.company_id,
//       created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
//       monday_in_time: newShift.times.monday.in,
//       monday_out_time: newShift.times.monday.out,
//       tuesday_in_time: newShift.times.tuesday.in,
//       tuesday_out_time: newShift.times.tuesday.out,
//       wednesday_in_time: newShift.times.wednesday.in,
//       wednesday_out_time: newShift.times.wednesday.out,
//       thursday_in_time: newShift.times.thursday.in,
//       thursday_out_time: newShift.times.thursday.out,
//       friday_in_time: newShift.times.friday.in,
//       friday_out_time: newShift.times.friday.out,
//       saturday_in_time: newShift.times.saturday.in,
//       saturday_out_time: newShift.times.saturday.out,
//       sunday_in_time: newShift.times.sunday.in,
//       sunday_out_time: newShift.times.sunday.out
//     };

//     try {
//       await axiosInstance.post('shifts/', payload);
//       fetchShifts();
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving shift:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axiosInstance.delete(`shifts/${id}/`);
//       fetchShifts();
//     } catch (error) {
//       console.error('Failed to delete shift:', error);
//     }
//   };

//   const handleReset = () => {
//     setNewShift({
//       company_id: '',
//       name: '',
//       times: {
//         monday: { in: '', out: '' },
//         tuesday: { in: '', out: '' },
//         wednesday: { in: '', out: '' },
//         thursday: { in: '', out: '' },
//         friday: { in: '', out: '' },
//         saturday: { in: '', out: '' },
//         sunday: { in: '', out: '' }
//       },
//       weekendSettings: {
//         saturday: false,
//         sunday: false
//       }
//     });
//   };

//   const handleCloseDialog = () => {
//     setOpenAddDialog(false);
//     handleReset();
//   };

//   const handleChangePage = (newPage) => {
//     setPage(newPage);
//   };

//   const renderTimeInput = (day, type) => (
//     <TextField
//       fullWidth
//       type="time"
//       value={newShift.times[day][type]}
//       onChange={(e) => handleTimeChange(day, type, e.target.value)}
//       disabled={newShift.weekendSettings[day]}
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             <AccessTimeIcon />
//           </InputAdornment>
//         ),
//         endAdornment: (
//           <InputAdornment position="end">
//             <IconButton onClick={() => handleClearTime(day, type)} edge="end" size="small">
//               <DeleteIcon />
//             </IconButton>
//           </InputAdornment>
//         )
//       }}
//       sx={{ bgcolor: 'background.paper' }}
//     />
//   );

//   const filteredShifts = shifts.filter(shift =>
//     shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedShifts = filteredShifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(filteredShifts.length / rowsPerPage);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: 3 }}>
//         <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All Office Shifts</Typography>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => setOpenAddDialog(true)}
//               sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}
//             >
//               Add New
//             </Button>
//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <FormControl size="small" sx={{ minWidth: 120 }}>
//               <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={20}>20</MenuItem>
//               </Select>
//               <FormHelperText>Entries per page</FormHelperText>
//             </FormControl>

//             <TextField
//               size="small"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#f5f5f5' }}>
//                   <TableCell>SHIFT</TableCell>
//                   <TableCell>MONDAY</TableCell>
//                   <TableCell>TUESDAY</TableCell>
//                   <TableCell>WEDNESDAY</TableCell>
//                   <TableCell>THURSDAY</TableCell>
//                   <TableCell>FRIDAY</TableCell>
//                   <TableCell>SATURDAY</TableCell>
//                   <TableCell>SUNDAY</TableCell>
//                   <TableCell>ACTION</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedShifts.map((shift) => (
//                   <TableRow key={shift.office_shift_id}>
//                     <TableCell>{shift.shift_name}</TableCell>
//                     {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(day => (
//                       <TableCell key={day}>
//                         {shift[`${day}_in_time`] === 'Holiday'
//                           ? <Chip label="Holiday" color="success" size="small" />
//                           : `${shift[`${day}_in_time`]} To ${shift[`${day}_out_time`]}`}
//                       </TableCell>
//                     ))}
//                     <TableCell>
//                       <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="error">
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
//             <Button variant="outlined" disabled={page === 0} onClick={() => handleChangePage(page - 1)}>Previous</Button>
//             <Typography variant="body2" sx={{ alignSelf: 'center' }}>
//               Page {page + 1} of {totalPages}
//             </Typography>
//             <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => handleChangePage(page + 1)}>Next</Button>
//           </Box>
//         </Paper>

//         {/* Add Shift Dialog */}
//         <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle>
//             <Typography variant="h6">Add New Office Shift</Typography>
//             <Button
//               variant="contained"
//               onClick={handleCloseDialog}
//               sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' }, mt: 1 }}
//             >
//               Hide
//             </Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                   Company ID <span style={{ color: 'red' }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Company ID"
//                   value={newShift.company_id}
//                   onChange={(e) => setNewShift(prev => ({ ...prev, company_id: e.target.value }))}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                   Shift Name <span style={{ color: 'red' }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Shift Name"
//                   value={newShift.name}
//                   onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))}
//                 />
//               </Grid>

//               {["monday", "tuesday", "wednesday", "thursday", "friday"].map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                         {day.charAt(0).toUpperCase() + day.slice(1)} In Time
//                       </Typography>
//                       {renderTimeInput(day, 'in')}
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                         {day.charAt(0).toUpperCase() + day.slice(1)} Out Time
//                       </Typography>
//                       {renderTimeInput(day, 'out')}
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               ))}

//               {["saturday", "sunday"].map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                         {day.charAt(0).toUpperCase() + day.slice(1)} In Time
//                       </Typography>
//                       {renderTimeInput(day, 'in')}
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                         {day.charAt(0).toUpperCase() + day.slice(1)} Out Time
//                       </Typography>
//                       {renderTimeInput(day, 'out')}
//                     </Grid>
//                     <Grid item xs={12}>
//                       <FormControlLabel
//                         control={
//                           <Switch
//                             checked={newShift.weekendSettings[day]}
//                             onChange={() => handleWeekendToggle(day)}
//                             color="primary"
//                           />
//                         }
//                         label={`Mark ${day.charAt(0).toUpperCase() + day.slice(1)} as holiday`}
//                       />
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               ))}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleReset} sx={{ color: '#666', border: '1px solid #ddd', mr: 1 }}>Reset</Button>
//             <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}>
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default OfficeShifts;


// import React, { useState, useEffect } from 'react';
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
//   FormControlLabel
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import axiosInstance from '../../utils/axiosInstance'; // Assuming this path is correct
// import dayjs from 'dayjs';

// // Theme setup for consistent styling
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

// // Initial state for a new shift, with company_id defaulted to 2
// const getInitialNewShiftState = () => ({
//   company_id: 2, // Default company ID
//   name: '',
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

//   // Fetches all office shifts from the API
//   const fetchShifts = async () => {
//     try {
//       const response = await axiosInstance.get('shifts/');
//       setShifts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch shifts:', error);
//     }
//   };

//   // Initial data fetch on component mount
//   useEffect(() => {
//     fetchShifts();
//   }, []);

//   // Reset page to 0 when search term or rows per page changes
//   useEffect(() => {
//     setPage(0);
//   }, [rowsPerPage, searchTerm]);

//   // Handles changes to time inputs in the new shift form
//   const handleTimeChange = (day, type, value) => {
//     setNewShift(prev => ({
//       ...prev,
//       times: {
//         ...prev.times,
//         [day]: {
//           ...prev.times[day],
//           [type]: value
//         }
//       }
//     }));
//   };
  
//   // Toggles weekend days as holidays
//   const handleWeekendToggle = (day) => {
//     setNewShift(prev => {
//       const isNowHoliday = !prev.weekendSettings[day];
//       return {
//         ...prev,
//         weekendSettings: {
//           ...prev.weekendSettings,
//           [day]: isNowHoliday
//         },
//         times: {
//           ...prev.times,
//           [day]: {
//             in: isNowHoliday ? 'Holiday' : '',
//             out: isNowHoliday ? 'Holiday' : ''
//           }
//         }
//       };
//     });
//   };

//   // Clears a specific time input
//   const handleClearTime = (day, type) => {
//     handleTimeChange(day, type, '');
//   };

//   // Handles form submission to create a new shift
//   const handleSubmit = async () => {
//     // Basic validation
//     if (!newShift.name) {
//       // Consider adding user feedback here (e.g., a toast notification or inline error)
//       console.error("Shift name is required.");
//       return;
//     }

//     // Format payload for the API
//     const payload = {
//       shift_name: newShift.name,
//       company_id: newShift.company_id,
//       created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
//       monday_in_time: newShift.times.monday.in,
//       monday_out_time: newShift.times.monday.out,
//       tuesday_in_time: newShift.times.tuesday.in,
//       tuesday_out_time: newShift.times.tuesday.out,
//       wednesday_in_time: newShift.times.wednesday.in,
//       wednesday_out_time: newShift.times.wednesday.out,
//       thursday_in_time: newShift.times.thursday.in,
//       thursday_out_time: newShift.times.thursday.out,
//       friday_in_time: newShift.times.friday.in,
//       friday_out_time: newShift.times.friday.out,
//       saturday_in_time: newShift.times.saturday.in,
//       saturday_out_time: newShift.times.saturday.out,
//       sunday_in_time: newShift.times.sunday.in,
//       sunday_out_time: newShift.times.sunday.out
//     };

//     try {
//       await axiosInstance.post('shifts/', payload);
//       fetchShifts(); // Refresh the list
//       handleCloseDialog(); // Close dialog on success
//     } catch (error) {
//       console.error('Error saving shift:', error);
//       // Consider adding user feedback for the error
//     }
//   };

//   // Handles deletion of a shift
//   const handleDelete = async (id) => {
//     // Optional: Add a confirmation dialog before deleting
//     if (window.confirm('Are you sure you want to delete this shift?')) {
//       try {
//         await axiosInstance.delete(`shifts/${id}/`);
//         fetchShifts(); // Refresh the list
//       } catch (error) {
//         console.error('Failed to delete shift:', error);
//       }
//     }
//   };

//   // Resets the new shift form to its initial state
//   const handleReset = () => {
//     setNewShift(getInitialNewShiftState());
//   };

//   // Closes the dialog and resets the form
//   const handleCloseDialog = () => {
//     setOpenAddDialog(false);
//     handleReset();
//   };
  
//   // Handles page changes for pagination
//   const handleChangePage = (newPage) => {
//     setPage(newPage);
//   };
  
//   // Component to render a time input field
//   const renderTimeInput = (day, type) => (
//     <TextField
//       fullWidth
//       type="time"
//       value={newShift.times[day][type]}
//       onChange={(e) => handleTimeChange(day, type, e.target.value)}
//       disabled={newShift.weekendSettings[day] === true}
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             <AccessTimeIcon />
//           </InputAdornment>
//         ),
//         endAdornment: newShift.times[day][type] ? (
//           <InputAdornment position="end">
//             <IconButton onClick={() => handleClearTime(day, type)} edge="end" size="small">
//               <DeleteIcon fontSize="small" />
//             </IconButton>
//           </InputAdornment>
//         ) : null,
//       }}
//       sx={{ bgcolor: 'background.paper' }}
//     />
//   );
  
//   // Filter shifts based on the search term
//   const filteredShifts = shifts.filter(shift =>
//     shift.shift_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   // Paginate the filtered results
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
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => setOpenAddDialog(true)}
//             >
//               Add New
//             </Button>
//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <FormControl size="small" sx={{ minWidth: 120 }}>
//               <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={20}>20</MenuItem>
//               </Select>
//               <FormHelperText>Entries per page</FormHelperText>
//             </FormControl>

//             <TextField
//               size="small"
//               placeholder="Search by Shift Name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ width: '250px' }}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: 'action.hover' }}>
//                   <TableCell>SHIFT</TableCell>
//                   {daysOfWeek.map(day => (
//                      <TableCell key={day}>{day.toUpperCase()}</TableCell>
//                   ))}
//                   <TableCell align="right">ACTION</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedShifts.length > 0 ? paginatedShifts.map((shift) => (
//                   <TableRow key={shift.office_shift_id} hover>
//                     <TableCell sx={{ fontWeight: 'medium' }}>{shift.shift_name}</TableCell>
//                     {daysOfWeek.map(day => (
//                       <TableCell key={day}>
//                         {shift[`${day}_in_time`] === 'Holiday'
//                           ? <Chip label="Holiday" color="success" size="small" />
//                           : `${shift[`${day}_in_time`] || '--:--'} To ${shift[`${day}_out_time`] || '--:--'}`}
//                       </TableCell>
//                     ))}
//                     <TableCell align="right">
//                       <IconButton onClick={() => handleDelete(shift.office_shift_id)} color="error" aria-label="delete shift">
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 )) : (
//                   <TableRow>
//                     <TableCell colSpan={9} align="center">No shifts found.</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1 }}>
//              <Typography variant="body2" color="text.secondary">
//               Showing {paginatedShifts.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredShifts.length)} of {filteredShifts.length} entries
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button variant="outlined" disabled={page === 0} onClick={() => handleChangePage(page - 1)}>Previous</Button>
//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => handleChangePage(page + 1)}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>

//         {/* Add Shift Dialog */}
//         <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">Add New Office Shift</Typography>
//             <Button
//               onClick={handleCloseDialog}
//               sx={{ color: 'text.secondary' }}
//             >
//               Hide
//             </Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1" component="label" sx={{ mb: 1, display: 'block' }}>
//                   Shift Name <span style={{ color: 'red' }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="e.g. Morning Shift"
//                   value={newShift.name}
//                   onChange={(e) => setNewShift(prev => ({ ...prev, name: e.target.value }))}
//                   required
//                 />
//               </Grid>

//               {daysOfWeek.map(day => (
//                 <Grid item xs={12} key={day}>
//                   <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 1 }}>{day}</Typography>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={5}>
//                       {renderTimeInput(day, 'in')}
//                     </Grid>
//                     <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
//                       <Typography color="text.secondary">To</Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={5}>
//                       {renderTimeInput(day, 'out')}
//                     </Grid>
//                     {(day === "saturday" || day === "sunday") && (
//                       <Grid item xs={12}>
//                         <FormControlLabel
//                           control={
//                             <Switch
//                               checked={newShift.weekendSettings[day]}
//                               onChange={() => handleWeekendToggle(day)}
//                               color="primary"
//                             />
//                           }
//                           label={`Mark as holiday`}
//                         />
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