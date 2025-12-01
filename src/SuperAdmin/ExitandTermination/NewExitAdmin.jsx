// import React, { useState, useEffect, useCallback, useMemo } from 'react';

// import {

//   ThemeProvider,

//   createTheme,

//   Box,

//   Paper,

//   Typography,

//   Button,

//   IconButton,

//   TextField,

//   Select,

//   MenuItem,

//   InputLabel,

//   FormControl,

//   Dialog,

//   DialogTitle,

//   DialogContent,

//   DialogActions,

//   Table,

//   TableBody,

//   TableCell,

//   TableContainer,

//   TableHead,

//   TableRow,

//   Grid,

//   Chip,

//   Divider,

//   CssBaseline,

//   InputAdornment,

//   CircularProgress,

//   TableSortLabel,

//   useMediaQuery,

//   Card,

//   CardContent,

//   CardActions,

//   Stack,

//   Tooltip,

// } from '@mui/material';

// import AddIcon from '@mui/icons-material/Add';

// import EditIcon from '@mui/icons-material/Edit';

// import DeleteIcon from '@mui/icons-material/Delete';

// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// import PersonIcon from '@mui/icons-material/Person';

// import FileDownloadIcon from '@mui/icons-material/FileDownload';

// import axiosInstance from '../../utils/axiosInstance';



// // API Configuration

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';

// const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;

// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';



// // Create theme based on the OfficeShifts component

// const theme = createTheme({

//   palette: {

//     primary: {

//       main: '#7c4dff', // Purple color

//     },

//     success: {

//       main: '#4caf50', // Green for export button

//     },

//     warning: {

//       main: '#ff9800',

//     },

//     error: {

//       main: '#f44336',

//     },

//     background: {

//       default: '#f5f5f9', // Light grey background

//       paper: '#ffffff',

//     },

//   },

//   breakpoints: {

//     values: {

//       xs: 0,

//       sm: 600,

//       md: 900, // Breakpoint for switching to card view

//       lg: 1200,

//       xl: 1536,

//     },

//   },

// });



// // Utility function for formatting date

// const formatDate = (dateString) => {

//   if (!dateString) return 'N/A';

//   try {

//     const date = new Date(dateString);

//     if (isNaN(date.getTime())) return dateString;

//     const day = String(date.getDate()).padStart(2, '0');

//     const month = String(date.getMonth() + 1).padStart(2, '0');

//     const year = date.getFullYear();

//     return `${day}/${month}/${year}`;

//   } catch (error) {

//     return dateString;

//   }

// };



// // Helper function to capitalize strings

// const capitalize = (s) => {

//   if (typeof s !== 'string' || !s) return '';

//   return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

// };



// // Helper function for Status Chip

// const getStatusChip = (statusValue) => {

//   const statusText = capitalize(statusValue || 'Pending');

//   let color = 'default';

//   if (statusText === 'Approved') color = 'success';

//   else if (statusText === 'Pending') color = 'warning';

//   else if (statusText === 'Rejected') color = 'error';

//   return <Chip label={statusText} color={color} size="small" />;

// };



// function NewExitAdmin() {

//   const [exitTypes, setExitTypes] = useState([]);

//   const [loadingExitTypes, setLoadingExitTypes] = useState(true);

//   const [exitTypesError, setExitTypesError] = useState(null);

//   const [submittingExitType, setSubmittingExitType] = useState(false);

//   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);

//   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });



//   const [employeesDropdownData, setEmployeesDropdownData] = useState([]);

//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);

//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);



//   const [employeeExits, setEmployeeExits] = useState([]);

//   const [loadingExits, setLoadingExits] = useState(true);

//   const [exitError, setExitError] = useState(null);



//   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);

//   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);



//   const [page, setPage] = useState(0);

//   const [rowsPerPage, setRowsPerPage] = useState(10);



//   const [exitTypePage, setExitTypePage] = useState(0);

//   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);



//   const [searchTerm, setSearchTerm] = useState('');

//   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');



//   const initialEmployeeExitState = {

//     employeeId: '', exitDate: '', exitTypeId: '',

//     exitInterview: 'Yes', disableAccount: 'Yes',

//     description: '', file: null, currentEditingId: null,

//   };



//   const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);

//   const [newExitType, setNewExitType] = useState('');

//   const [editingExitType, setEditingExitType] = useState(null);

//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));



//   const fetchExitTypes = useCallback(async () => {

//     setLoadingExitTypes(true);

//     setExitTypesError(null);

//     try {

//       const response = await axiosInstance.get(EXIT_TYPE_API_URL);

//       const transformedData = response.data.map(item => ({

//         id: item.value, name: item.label, createdAt: formatDate(item.created_at),

//       }));

//       setExitTypes(transformedData);

//     } catch (error) {

//       console.error("Failed to fetch exit types:", error);

//       setExitTypesError("Failed to load exit types.");

//     } finally {

//       setLoadingExitTypes(false);

//     }

//   }, []);



//   const fetchEmployeesDropdown = useCallback(async () => {

//     setLoadingEmployeesDropdown(true);

//     setEmployeesDropdownError(null);

//     try {

//       const response = await axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL);

//       setEmployeesDropdownData(response.data || []);

//     } catch (error) {

//       console.error("Failed to fetch employees dropdown:", error);

//       setEmployeesDropdownError("Failed to load employee list.");

//     } finally {

//       setLoadingEmployeesDropdown(false);

//     }

//   }, []);



//   const fetchEmployeeExits = useCallback(async () => {

//     setLoadingExits(true);

//     try {

//       const response = await axiosInstance.get('/employee-exits/');

//       setEmployeeExits(response.data);

//       setExitError(null);

//     } catch (error) {

//       console.error("Error fetching employee exits:", error);

//       setExitError('Failed to load employee exits');

//     } finally {

//       setLoadingExits(false);

//     }

//   }, []);



//   useEffect(() => {

//     fetchExitTypes();

//     fetchEmployeesDropdown();

//     fetchEmployeeExits();

//   }, [fetchExitTypes, fetchEmployeesDropdown, fetchEmployeeExits]);



//   const handleOpenEditDialog = (exitToEdit) => {

//     setNewEmployeeExit({

//       employeeId: exitToEdit.employee_id?.toString() || '',

//       exitDate: exitToEdit.exit_date ? exitToEdit.exit_date.split('T')[0] : '',

//       exitTypeId: exitToEdit.exit_type_id?.toString() || '',

//       exitInterview: capitalize(exitToEdit.exit_interview) || 'Yes',

//       disableAccount: capitalize(exitToEdit.is_inactivate_account) || 'Yes',

//       description: exitToEdit.reason || '',

//       file: null, currentEditingId: exitToEdit.exit_id,

//     });

//     setOpenAddExitDialog(true);

//   };



//   const handleSubmitEmployeeExit = async () => {

//     const isEditMode = !!newEmployeeExit.currentEditingId;

//     if (!isEditMode && !newEmployeeExit.employeeId) { alert('Please select an Employee.'); return; }

//     if (!newEmployeeExit.exitDate) { alert('Please select an Exit Date.'); return; }

//     if (!newEmployeeExit.exitTypeId) { alert('Please select an Exit Type.'); return; }



//     const selectedExitType = exitTypes.find(type => type.id.toString() === newEmployeeExit.exitTypeId.toString());

//     const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';



//     if (isEditMode) {

//       const updatePayload = {

//         exit_date: newEmployeeExit.exitDate,

//         exit_type_id: parseInt(newEmployeeExit.exitTypeId),

//         exit_type_name: exitTypeNameForPayload,

//         reason: newEmployeeExit.description,

//         accountability_to: "0",

//         exit_interview: newEmployeeExit.exitInterview.toLowerCase(),

//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),

//       };

//       try {

//         await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);

//         alert('Employee Exit updated successfully.');

//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();

//       } catch (error) {

//         console.error('Error updating employee exit:', error.response?.data || error.message);

//         alert(`Failed to update employee exit. ${error.response?.data?.detail || error.message || ''}`);

//       }

//     } else {

//       const createPayload = {

//         employee_id: parseInt(newEmployeeExit.employeeId), exit_date: newEmployeeExit.exitDate,

//         exit_type_id: parseInt(newEmployeeExit.exitTypeId), exit_type_name: exitTypeNameForPayload,

//         sub_exit_type_id: null, exit_interview: newEmployeeExit.exitInterview.toLowerCase(),

//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),

//         reason: newEmployeeExit.description, accountability_to: "0", added_by: 2

//       };

//       try {

//         await axiosInstance.post('/employee-exits/', createPayload);

//         alert('Employee Exit added successfully.');

//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();

//       } catch (error) {

//         console.error('Error adding employee exit:', error.response?.data || error.message);

//         alert(`Failed to add employee exit. ${error.response?.data?.detail || error.message || ''}`);

//       }

//     }

//   };



//   const handleDeleteExit = async (exitId) => {

//     if (window.confirm('Are you sure you want to delete this employee exit?')) {

//       try {

//         await axiosInstance.delete(`/employee-exits/${exitId}/`);

//         alert("Employee exit deleted successfully!");

//         fetchEmployeeExits(); // Refresh list

//       } catch (error) {

//         console.error("Failed to delete exit:", error);

//         alert("Failed to delete exit.");

//       }

//     }

//   };



//   const handleSubmitExitType = async () => {

//     if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }

//     setSubmittingExitType(true); setSubmitExitTypeError(null);

//     try {

//       await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });

//       alert('Exit type added successfully!');

//       setNewExitType('');

//       fetchExitTypes();

//     } catch (error) {

//       console.error("Failed to submit exit type:", error.response?.data || error.message);

//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to add exit type.");

//     } finally { setSubmittingExitType(false); }

//   };



//   const handleEditExitType = (type) => {

//     setNewExitType(type.name);

//     setEditingExitType(type);

//   };



//   const handleUpdateExitType = async () => {

//     if (!newExitType.trim()) { setSubmitExitTypeError("Exit Type name is required."); return; }

//     setSubmittingExitType(true); setSubmitExitTypeError(null);

//     try {

//       await axiosInstance.patch(`${EXIT_TYPE_API_URL}${editingExitType.id}/`, {

//         category_name: newExitType.trim(),

//       });

//       alert("Exit type updated successfully!");

//       setNewExitType("");

//       setEditingExitType(null);

//       fetchExitTypes();

//     } catch (error) {

//       console.error("Failed to update exit type:", error.response?.data || error.message);

//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to update exit type.");

//     } finally {

//       setSubmittingExitType(false);

//     }

//   };



//   const handleDeleteExitType = async (id) => {

//     if (window.confirm("Are you sure you want to delete this exit type?")) {

//       try {

//         await axiosInstance.delete(`${EXIT_TYPE_API_URL}${id}/`);

//         alert("Exit type deleted successfully!");

//         fetchExitTypes();

//       } catch (error) {

//         console.error("Failed to delete exit type:", error.response?.data || error.message);

//         alert("Failed to delete exit type.");

//       }

//     }

//   };



//   const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };

//   const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setEditingExitType(null); setSubmitExitTypeError(null); };

//   const handleResetEmployeeExitForm = () => setNewEmployeeExit(initialEmployeeExitState);

//   const handleFileUpload = (e) => {

//     const file = e.target.files[0];

//     if (file) {

//       if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {

//         if (file.size <= 2 * 1024 * 1024) { setNewEmployeeExit(prev => ({ ...prev, file: file })); }

//         else { alert('File size exceeds 2MB limit.'); e.target.value = null; }

//       } else { alert('Please upload only .gif, .png, .jpg, .jpeg files'); e.target.value = null; }

//     }

//   };



//   const filteredEmployeeExits = useMemo(() => employeeExits.filter(exit =>

//     (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||

//     (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase()))

//   ), [employeeExits, searchTerm]);



//   const sortedAndFilteredExitTypes = useMemo(() => {

//     let items = [...exitTypes];

//     if (exitTypeSearchTerm) {

//       items = items.filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));

//     }

//     if (exitTypeSortConfig.key) {

//       items.sort((a, b) => {

//         const valA = a[exitTypeSortConfig.key] || ''; const valB = b[exitTypeSortConfig.key] || '';

//         if (valA < valB) return exitTypeSortConfig.direction === 'asc' ? -1 : 1;

//         if (valA > valB) return exitTypeSortConfig.direction === 'asc' ? 1 : -1;

//         return 0;

//       });

//     }

//     return items;

//   }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);



//   const paginatedEmployeeExits = filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const totalPages = Math.ceil(filteredEmployeeExits.length / rowsPerPage);

//   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage);

//   const totalExitTypePages = Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage);

//   const handleExitTypeSort = (key) => {

//     let direction = 'asc';

//     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }

//     setExitTypeSortConfig({ key, direction });

//   };



//   // Card component for mobile view

//   const ExitCard = ({ exit, index }) => (

//     <Card sx={{ mb: 2 }} elevation={2}>

//       <Box sx={{ p: 2, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>

//             {exit.employee_name}

//           </Typography>

//           <Chip label={`Sr. No: ${page * rowsPerPage + index + 1}`} size="small" variant="outlined" />

//         </Box>

//       </Box>

//       <CardContent>

//         <Stack spacing={1.5}>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

//             <Typography variant="body2" color="text.secondary">Exit Type</Typography>

//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{exit.exit_type_name}</Typography>

//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

//             <Typography variant="body2" color="text.secondary">Exit Date</Typography>

//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exit.exit_date)}</Typography>

//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

//             <Typography variant="body2" color="text.secondary">Exit Interview</Typography>

//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.exit_interview)}</Typography>

//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

//             <Typography variant="body2" color="text.secondary">Disable Account</Typography>

//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.is_inactivate_account)}</Typography>

//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

//             <Typography variant="body2" color="text.secondary">Status</Typography>

//             {getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}

//           </Box>

//         </Stack>

//       </CardContent>

//       <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>

//         <Button startIcon={<EditIcon />} onClick={() => handleOpenEditDialog(exit)} color="primary" variant="text">

//           Edit

//         </Button>

//         <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteExit(exit.exit_id)} color="error" variant="text">

//           Delete

//         </Button>

//       </CardActions>

//     </Card>

//   );



//   return (

//     <ThemeProvider theme={theme}>

//       <CssBaseline />

//       <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>

//         <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>

//           {/* --- HORIZONTAL BUTTON HEADER --- */}

//           <Box sx={{

//             display: 'flex',

//             flexDirection: { xs: 'column', sm: 'row' },

//             justifyContent: 'space-between',

//             alignItems: { xs: 'flex-start', sm: 'center' },

//             mb: 3,

//             gap: 2,

//           }}>

//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>

//               List All Employee Exit

//             </Typography>

//             <Stack

//               direction={{ xs: 'column', sm: 'row' }}

//               spacing={1}

//               sx={{ width: { xs: '100%', sm: 'auto' } }}

//             >

//               <Button variant="contained" onClick={() => setOpenAddExitTypeDialog(true)}>

//                 + Exit Type

//               </Button>

//               <Button variant="contained" color="success" startIcon={<FileDownloadIcon />} onClick={() => { /* handleExport */ }}>

//                 Export Employees

//               </Button>

//               <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddExitDialog(true)}>

//                 Add New Exit

//               </Button>

//             </Stack>

//           </Box>



//         <Box
//   sx={{
//     display: "flex",
//     flexDirection: { xs: "column", sm: "row" },
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 2,
//     mb: 2,
//   }}
// >
//   {/* Dropdown on the left */}
//   <FormControl size="small" sx={{ width: { xs: "100%", sm: "auto" } }}>
//     <Stack direction="row" alignItems="center" spacing={1}>
//       <Typography variant="body2" color="text.secondary">Show</Typography>
//       <Select
//         value={rowsPerPage}
//         onChange={(e) => {
//           setRowsPerPage(parseInt(e.target.value, 10));
//           setPage(0);
//         }}
//       >
//         <MenuItem value={5}>5</MenuItem>
//         <MenuItem value={10}>10</MenuItem>
//         <MenuItem value={25}>25</MenuItem>
//       </Select>
//       <Typography variant="body2" color="text.secondary">entries</Typography>
//     </Stack>
//   </FormControl>

//   {/* Search box on the right */}
//   <TextField
//     size="small"
//     placeholder="Search exits..."
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//     sx={{ width: { xs: "100%", sm: 300 } }}
//   />
// </Box>



//           {isMobile ? (

//             // MOBILE CARD VIEW

//             <Box sx={{ mt: 3 }}>

//               {loadingExits ? <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box> : paginatedEmployeeExits.length > 0 ? (

//                 paginatedEmployeeExits.map((exit, index) => (

//                   <ExitCard key={exit.exit_id} exit={exit} index={index} />

//                 ))

//               ) : (

//                 <Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No employee exits found.</Typography>

//               )}

//             </Box>

//           ) : (

//             // DESKTOP TABLE VIEW

//             <TableContainer>

//               <Table>

//                 <TableHead>

//                   <TableRow sx={{ bgcolor: 'action.hover' }}>

//                     <TableCell sx={{ fontWeight: 'bold' }}>SR. NO.</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}><PersonIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} fontSize="small" />EMPLOYEE</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}>EXIT TYPE</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}><CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} fontSize="small" />EXIT DATE</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}>EXIT INTERVIEW</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}>DISABLE ACCOUNT</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }} align="right">ACTIONS</TableCell>

//                   </TableRow>

//                 </TableHead>

//                 <TableBody>

//                   {loadingExits ? (<TableRow><TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow>

//                   ) : exitError ? (<TableRow><TableCell colSpan={8} align="center" sx={{ color: 'error.main' }}>{exitError}</TableCell></TableRow>

//                   ) : paginatedEmployeeExits.length > 0 ? (

//                     paginatedEmployeeExits.map((exit, index) => (

//                       <TableRow key={exit.exit_id} hover>

//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>

//                         <TableCell>{exit.employee_name}</TableCell>

//                         <TableCell>{exit.exit_type_name}</TableCell>

//                         <TableCell>{formatDate(exit.exit_date)}</TableCell>

//                         <TableCell>{capitalize(exit.exit_interview)}</TableCell>

//                         <TableCell>{capitalize(exit.is_inactivate_account)}</TableCell>

//                         <TableCell>{getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}</TableCell>

//                         <TableCell align="right">

//                           <Tooltip title="Edit">

//                             <IconButton size="small" onClick={() => handleOpenEditDialog(exit)} color="primary"><EditIcon /></IconButton>

//                           </Tooltip>

//                           <Tooltip title="Delete">

//                             <IconButton size="small" onClick={() => handleDeleteExit(exit.exit_id)} color="error"><DeleteIcon /></IconButton>

//                           </Tooltip>

//                         </TableCell>

//                       </TableRow>

//                     ))

//                   ) : (<TableRow><TableCell colSpan={8} align="center">No employee exits found.</TableCell></TableRow>)}

//                 </TableBody>

//               </Table>

//             </TableContainer>

//           )}



//           {/* PAGINATION */}

//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, gap: 2 }}>

//             <Typography variant="body2" color="text.secondary">

//               Showing {paginatedEmployeeExits.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredEmployeeExits.length)} of {filteredEmployeeExits.length} entries

//             </Typography>

//             <Box sx={{ display: 'flex', gap: 1 }}>

//               <Button variant="outlined" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>

//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>

//             </Box>

//           </Box>

//         </Paper>



//         {/* DIALOG for Adding/Editing Employee Exit */}

//         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>

//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

//             <Typography variant="h6">{newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}</Typography>

//             <Button variant="outlined" onClick={handleCloseEmployeeExitDialog}>Close</Button>

//           </DialogTitle>

//           <Divider />

//           <DialogContent>

//             <Grid container spacing={3}>

//               <Grid item xs={12} md={8}>

//                 <Grid container spacing={2}>

//                   <Grid item xs={12} md={6}>

//                     <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>

//                       <InputLabel id="employee-label">Employee</InputLabel>

//                       <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, employeeId: e.target.value }))}>

//                         <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading..." : employeesDropdownError || "Select Employee"}</em></MenuItem>

//                         {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>))}

//                       </Select>

//                     </FormControl>

//                   </Grid>

//                   <Grid item xs={12} md={6}>

//                     <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))} InputProps={{ endAdornment: (<InputAdornment position="end"><CalendarTodayIcon /></InputAdornment>) }} />

//                   </Grid>

//                   <Grid item xs={12} md={4}>

//                     <FormControl fullWidth required disabled={loadingExitTypes}>

//                       <InputLabel id="exit-type-label">Exit Type</InputLabel>

//                       <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>

//                         <MenuItem value=""><em>{loadingExitTypes ? "Loading..." : exitTypesError || "Select Exit Type"}</em></MenuItem>

//                         {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}

//                       </Select>

//                     </FormControl>

//                   </Grid>

//                   <Grid item xs={12} md={4}>

//                     <FormControl fullWidth required>

//                       <InputLabel id="exit-interview-label">Exit Interview</InputLabel>

//                       <Select labelId="exit-interview-label" label="Exit Interview" value={newEmployeeExit.exitInterview} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitInterview: e.target.value }))}>

//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>

//                       </Select>

//                     </FormControl>

//                   </Grid>

//                   <Grid item xs={12} md={4}>

//                     <FormControl fullWidth required>

//                       <InputLabel id="disable-account-label">Disable Account</InputLabel>

//                       <Select labelId="disable-account-label" label="Disable Account" value={newEmployeeExit.disableAccount} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, disableAccount: e.target.value }))}>

//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>

//                       </Select>

//                     </FormControl>

//                   </Grid>

//                   <Grid item xs={12}>

//                     <TextField label="Description / Reason" fullWidth multiline rows={3} placeholder="Enter description or reason for exit..." value={newEmployeeExit.description} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, description: e.target.value }))} />

//                   </Grid>

//                 </Grid>

//               </Grid>

//               <Grid item xs={12} md={4}>

//                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>

//                   <Typography variant="subtitle1" gutterBottom>Exit Contract / Attachment</Typography>

//                   <TextField fullWidth disabled size="small" placeholder="No file chosen" value={newEmployeeExit.file ? newEmployeeExit.file.name : ''} sx={{ mb: 1 }} />

//                   <Button variant="outlined" component="label" fullWidth>Browse File<input type="file" hidden onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif" /></Button>

//                   <Typography variant="caption" color="textSecondary" display="block" mt={1}>Allowed: GIF, PNG, JPG, JPEG. Max 2MB.</Typography>

//                 </Paper>

//               </Grid>

//             </Grid>

//           </DialogContent>

//           <Divider />

//           <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>

//             <Button onClick={handleResetEmployeeExitForm} sx={{ mr: 1, color: 'text.secondary', borderColor: 'divider' }} variant="outlined">Reset</Button>

//             <Button variant="contained" onClick={handleSubmitEmployeeExit}>{newEmployeeExit.currentEditingId ? 'Update' : 'Save'}</Button>

//           </DialogActions>

//         </Dialog>



//         {/* DIALOG for Managing Exit Types */}

//         <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>

//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Manage Exit Types<Button onClick={handleCloseExitTypeDialog} variant="outlined">Close</Button></DialogTitle>

//           <DialogContent dividers sx={{ p: 0 }}>

//             <Grid container>

//               <Grid item xs={12} md={4} sx={{ borderRight: { md: '1px solid #eee' } }}>

//                 <Box sx={{ p: 3 }}>

//                   <Typography variant="h6" sx={{ mb: 2 }}>{editingExitType ? 'Edit Exit Type' : 'Add New Exit Type'}</Typography>

//                   <FormControl fullWidth sx={{ mb: 2 }}>

//                     <TextField required label="Exit Type Name" placeholder="Enter exit type name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError} />

//                   </FormControl>

//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

//                     <Button variant="contained" onClick={editingExitType ? handleUpdateExitType : handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>

//                       {submittingExitType ? <CircularProgress size={24} color="inherit" /> : editingExitType ? "Update" : "Save"}

//                     </Button>

//                   </Box>

//                 </Box>

//               </Grid>

//               <Grid item xs={12} md={8}>

//                 <Box sx={{ p: 3 }}>

//                   <Typography variant="h6" sx={{ mb: 2 }}>List All Exit Types</Typography>

//                   {loadingExitTypes ? (<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>

//                   ) : exitTypesError ? (<Typography color="error" sx={{ p: 2 }}>Error: {exitTypesError} <Button onClick={fetchExitTypes} size="small">Retry</Button></Typography>

//                   ) : (

//                     <>

//                       <TableContainer component={Paper} variant="outlined">

//                         <Table size="small">

//                           <TableHead>

//                             <TableRow>

//                               <TableCell>

//                                 <TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('name')}>EXIT TYPE</TableSortLabel>

//                               </TableCell>

//                               <TableCell>

//                                 <TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('createdAt')}>CREATED AT</TableSortLabel>

//                               </TableCell>

//                               <TableCell>Actions</TableCell>

//                             </TableRow>

//                           </TableHead>

//                           <TableBody>

//                             {paginatedExitTypes.length > 0 ? (

//                               paginatedExitTypes.map((type) => (

//                                 <TableRow key={type.id} hover>

//                                   <TableCell>{type.name}</TableCell>

//                                   <TableCell>{type.createdAt}</TableCell>

//                                   <TableCell>

//                                     <IconButton size="small" onClick={() => handleEditExitType(type)} color="primary"><EditIcon fontSize="small" /></IconButton>

//                                     <IconButton size="small" color="error" onClick={() => handleDeleteExitType(type.id)}><DeleteIcon fontSize="small" /></IconButton>

//                                   </TableCell>

//                                 </TableRow>

//                               ))

//                             ) : (

//                               <TableRow><TableCell colSpan={3} align="center">No exit types found.</TableCell></TableRow>

//                             )}

//                           </TableBody>

//                         </Table>

//                       </TableContainer>

//                       {sortedAndFilteredExitTypes.length > 0 && (

//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>

//                           <Button size="small" disabled={exitTypePage === 0} onClick={() => setExitTypePage(p => p - 1)} sx={{ border: '1px solid #ddd' }}>Previous</Button>

//                           <Typography variant="body2">Page {exitTypePage + 1} of {totalExitTypePages}</Typography>

//                           <Button size="small" disabled={exitTypePage >= totalExitTypePages - 1} onClick={() => setExitTypePage(p => p + 1)} sx={{ border: '1px solid #ddd' }}>Next</Button>

//                         </Box>

//                       )}

//                     </>

//                   )}

//                 </Box>

//               </Grid>

//             </Grid>

//           </DialogContent>

//         </Dialog>

//       </Box>

//     </ThemeProvider>

//   );

// };



// export default NewExitAdmin;
















// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import {
//   ThemeProvider,
//   createTheme,
//   Box,
//   Paper,
//   Typography,
//   Button,
//   IconButton,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   Chip,
//   Divider,
//   CssBaseline,
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack,
//   Tooltip,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import PersonIcon from '@mui/icons-material/Person';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import axiosInstance from '../../utils/axiosInstance';

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;
// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// // Create theme based on the OfficeShifts component
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#7c4dff', // Purple color
//     },
//     success: {
//       main: '#4caf50', // Green for export button
//     },
//     warning: {
//       main: '#ff9800',
//     },
//     error: {
//       main: '#f44336',
//     },
//     background: {
//       default: '#f5f5f9', // Light grey background
//       paper: '#ffffff',
//     },
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900, // Breakpoint for switching to card view
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// // Utility function for formatting date
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return dateString;
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     return dateString;
//   }
// };

// // Helper function to capitalize strings
// const capitalize = (s) => {
//   if (typeof s !== 'string' || !s) return '';
//   return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
// };

// // Helper function for Status Chip
// const getStatusChip = (statusValue) => {
//   const statusText = capitalize(statusValue || 'Pending');
//   let color = 'default';
//   if (statusText === 'Approved') color = 'success';
//   else if (statusText === 'Pending') color = 'warning';
//   else if (statusText === 'Rejected') color = 'error';
//   return <Chip label={statusText} color={color} size="small" />;
// };

// function NewExitAdmin() {
//   const [exitTypes, setExitTypes] = useState([]);
//   const [loadingExitTypes, setLoadingExitTypes] = useState(true);
//   const [exitTypesError, setExitTypesError] = useState(null);
//   const [submittingExitType, setSubmittingExitType] = useState(false);
//   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
//   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });

//   const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

//   const [employeeExits, setEmployeeExits] = useState([]);
//   const [loadingExits, setLoadingExits] = useState(true);
//   const [exitError, setExitError] = useState(null);

//   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
//   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [exitTypePage, setExitTypePage] = useState(0);
//   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

//   const initialEmployeeExitState = {
//     employeeId: '', exitDate: '', exitTypeId: '',
//     exitInterview: 'Yes', disableAccount: 'Yes',
//     description: '', file: null, currentEditingId: null,
//   };

//   const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);
//   const [newExitType, setNewExitType] = useState('');
//   const [editingExitType, setEditingExitType] = useState(null);
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const fetchExitTypes = useCallback(async () => {
//     setLoadingExitTypes(true);
//     setExitTypesError(null);
//     try {
//       const response = await axiosInstance.get(EXIT_TYPE_API_URL);
//       const transformedData = response.data.map(item => ({
//         id: item.value, name: item.label, createdAt: formatDate(item.created_at),
//       }));
//       setExitTypes(transformedData);
//     } catch (error) {
//       console.error("Failed to fetch exit types:", error);
//       setExitTypesError("Failed to load exit types.");
//     } finally {
//       setLoadingExitTypes(false);
//     }
//   }, []);

//   const fetchEmployeesDropdown = useCallback(async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL);
//       setEmployeesDropdownData(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employee list.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   }, []);

//   const fetchEmployeeExits = useCallback(async () => {
//     setLoadingExits(true);
//     try {
//       const response = await axiosInstance.get('/employee-exits/');
//       setEmployeeExits(response.data);
//       setExitError(null);
//     } catch (error) {
//       console.error("Error fetching employee exits:", error);
//       setExitError('Failed to load employee exits');
//     } finally {
//       setLoadingExits(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchExitTypes();
//     fetchEmployeesDropdown();
//     fetchEmployeeExits();
//   }, [fetchExitTypes, fetchEmployeesDropdown, fetchEmployeeExits]);

//   const handleOpenEditDialog = (exitToEdit) => {
//     setNewEmployeeExit({
//       employeeId: exitToEdit.employee_id?.toString() || '',
//       exitDate: exitToEdit.exit_date ? exitToEdit.exit_date.split('T')[0] : '',
//       exitTypeId: exitToEdit.exit_type_id?.toString() || '',
//       exitInterview: capitalize(exitToEdit.exit_interview) || 'Yes',
//       disableAccount: capitalize(exitToEdit.is_inactivate_account) || 'Yes',
//       description: exitToEdit.reason || '',
//       file: null, currentEditingId: exitToEdit.exit_id,
//     });
//     setOpenAddExitDialog(true);
//   };

//   const handleSubmitEmployeeExit = async () => {
//     const isEditMode = !!newEmployeeExit.currentEditingId;
//     if (!isEditMode && !newEmployeeExit.employeeId) { alert('Please select an Employee.'); return; }
//     if (!newEmployeeExit.exitDate) { alert('Please select an Exit Date.'); return; }
//     if (!newEmployeeExit.exitTypeId) { alert('Please select an Exit Type.'); return; }

//     const selectedExitType = exitTypes.find(type => String(type.id) === String(newEmployeeExit.exitTypeId));
//     const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';

//     if (isEditMode) {
//       const updatePayload = {
//         exit_date: newEmployeeExit.exitDate,
//         exit_type_id: parseInt(newEmployeeExit.exitTypeId),
//         exit_type_name: exitTypeNameForPayload,
//         reason: newEmployeeExit.description,
//         accountability_to: "0",
//         exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
//       };
//       try {
//         await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);
//         alert('Employee Exit updated successfully.');
//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();
//       } catch (error) {
//         console.error('Error updating employee exit:', error.response?.data || error.message);
//         alert(`Failed to update employee exit. ${error.response?.data?.detail || error.message || ''}`);
//       }
//     } else {
//       const createPayload = {
//         employee_id: parseInt(newEmployeeExit.employeeId), exit_date: newEmployeeExit.exitDate,
//         exit_type_id: parseInt(newEmployeeExit.exitTypeId), exit_type_name: exitTypeNameForPayload,
//         sub_exit_type_id: null, exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
//         reason: newEmployeeExit.description, accountability_to: "0", added_by: 2
//       };
//       try {
//         await axiosInstance.post('/employee-exits/', createPayload);
//         alert('Employee Exit added successfully.');
//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();
//       } catch (error) {
//         console.error('Error adding employee exit:', error.response?.data || error.message);
//         alert(`Failed to add employee exit. ${error.response?.data?.detail || error.message || ''}`);
//       }
//     }
//   };

//   const handleDeleteExit = async (exitId) => {
//     if (window.confirm('Are you sure you want to delete this employee exit?')) {
//       try {
//         await axiosInstance.delete(`/employee-exits/${exitId}/`);
//         alert("Employee exit deleted successfully!");
//         fetchEmployeeExits(); // Refresh list
//       } catch (error) {
//         console.error("Failed to delete exit:", error);
//         alert("Failed to delete exit.");
//       }
//     }
//   };

//   const handleSubmitExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });
//       alert('Exit type added successfully!');
//       setNewExitType('');
//       fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to submit exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to add exit type.");
//     } finally { setSubmittingExitType(false); }
//   };

//   const handleEditExitType = (type) => {
//     setNewExitType(type.name);
//     setEditingExitType(type);
//   };

//   const handleUpdateExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError("Exit Type name is required."); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.patch(`${EXIT_TYPE_API_URL}${editingExitType.id}/`, {
//         category_name: newExitType.trim(),
//       });
//       alert("Exit type updated successfully!");
//       setNewExitType("");
//       setEditingExitType(null);
//       fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to update exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to update exit type.");
//     } finally {
//       setSubmittingExitType(false);
//     }
//   };

//   const handleDeleteExitType = async (id) => {
//     if (window.confirm("Are you sure you want to delete this exit type?")) {
//       try {
//         await axiosInstance.delete(`${EXIT_TYPE_API_URL}${id}/`);
//         alert("Exit type deleted successfully!");
//         fetchExitTypes();
//       } catch (error) {
//         console.error("Failed to delete exit type:", error.response?.data || error.message);
//         alert("Failed to delete exit type.");
//       }
//     }
//   };

//   const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };
//   const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setEditingExitType(null); setSubmitExitTypeError(null); };
//   const handleResetEmployeeExitForm = () => setNewEmployeeExit(initialEmployeeExitState);
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
//         if (file.size <= 2 * 1024 * 1024) { setNewEmployeeExit(prev => ({ ...prev, file: file })); }
//         else { alert('File size exceeds 2MB limit.'); e.target.value = null; }
//       } else { alert('Please upload only .gif, .png, .jpg, .jpeg files'); e.target.value = null; }
//     }
//   };

//   const filteredEmployeeExits = useMemo(() => employeeExits.filter(exit =>
//     (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase()))
//   ), [employeeExits, searchTerm]);

//   const sortedAndFilteredExitTypes = useMemo(() => {
//     let items = [...exitTypes];
//     if (exitTypeSearchTerm) {
//       items = items.filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));
//     }
//     if (exitTypeSortConfig.key) {
//       items.sort((a, b) => {
//         const valA = a[exitTypeSortConfig.key] || ''; const valB = b[exitTypeSortConfig.key] || '';
//         if (valA < valB) return exitTypeSortConfig.direction === 'asc' ? -1 : 1;
//         if (valA > valB) return exitTypeSortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return items;
//   }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);

//   const paginatedEmployeeExits = filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(filteredEmployeeExits.length / rowsPerPage);
//   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage);
//   const totalExitTypePages = Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage);
//   const handleExitTypeSort = (key) => {
//     let direction = 'asc';
//     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }
//     setExitTypeSortConfig({ key, direction });
//   };

//   // Card component for mobile view
//   const ExitCard = ({ exit, index }) => (
//     <Card sx={{ mb: 2 }} elevation={2}>
//       <Box sx={{ p: 2, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//             {exit.employee_name}
//           </Typography>
//           <Chip label={`Sr. No: ${page * rowsPerPage + index + 1}`} size="small" variant="outlined" />
//         </Box>
//       </Box>
//       <CardContent>
//         <Stack spacing={1.5}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Type</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{exit.exit_type_name}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Date</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exit.exit_date)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Interview</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.exit_interview)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Disable Account</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.is_inactivate_account)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="body2" color="text.secondary">Status</Typography>
//             {getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}
//           </Box>
//         </Stack>
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
//         <Button startIcon={<EditIcon />} onClick={() => handleOpenEditDialog(exit)} color="primary" variant="text">
//           Edit
//         </Button>
//         <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteExit(exit.exit_id)} color="error" variant="text">
//           Delete
//         </Button>
//       </CardActions>
//     </Card>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//         <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
//           {/* --- HORIZONTAL BUTTON HEADER --- */}
//           <Box sx={{
//             display: 'flex',
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: 'space-between',
//             alignItems: { xs: 'flex-start', sm: 'center' },
//             mb: 3,
//             gap: 2,
//           }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//               List All Employee Exit
//             </Typography>
//             <Stack
//               direction={{ xs: 'column', sm: 'row' }}
//               spacing={1}
//               sx={{ width: { xs: '100%', sm: 'auto' } }}
//             >
//               <Button variant="contained" onClick={() => setOpenAddExitTypeDialog(true)}>
//                 + Exit Type
//               </Button>
//               <Button variant="contained" color="success" startIcon={<FileDownloadIcon />} onClick={() => { /* handleExport */ }}>
//                 Export Employees
//               </Button>
//               <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddExitDialog(true)}>
//                 Add New Exit
//               </Button>
//             </Stack>
//           </Box>

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           {/* Dropdown on the left */}
//           <FormControl size="small" sx={{ width: { xs: "100%", sm: "auto" } }}>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <Typography variant="body2" color="text.secondary">Show</Typography>
//               <Select
//                 value={rowsPerPage}
//                 onChange={(e) => {
//                   setRowsPerPage(parseInt(e.target.value, 10));
//                   setPage(0);
//                 }}
//               >
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//               </Select>
//               <Typography variant="body2" color="text.secondary">entries</Typography>
//             </Stack>
//           </FormControl>

//           {/* Search box on the right */}
//           <TextField
//             size="small"
//             placeholder="Search exits..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ width: { xs: "100%", sm: 300 } }}
//           />
//         </Box>

//           {isMobile ? (
//             // MOBILE CARD VIEW
//             <Box sx={{ mt: 3 }}>
//               {loadingExits ? <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box> : paginatedEmployeeExits.length > 0 ? (
//                 paginatedEmployeeExits.map((exit, index) => (
//                   <ExitCard key={exit.exit_id} exit={exit} index={index} />
//                 ))
//               ) : (
//                 <Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No employee exits found.</Typography>
//               )}
//             </Box>
//           ) : (
//             // DESKTOP TABLE VIEW
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: 'action.hover' }}>
//                     <TableCell sx={{ fontWeight: 'bold' }}>SR. NO.</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}><PersonIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} fontSize="small" />EMPLOYEE</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>EXIT TYPE</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}><CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} fontSize="small" />EXIT DATE</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>EXIT INTERVIEW</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>DISABLE ACCOUNT</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }} align="right">ACTIONS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loadingExits ? (<TableRow><TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow>
//                   ) : exitError ? (<TableRow><TableCell colSpan={8} align="center" sx={{ color: 'error.main' }}>{exitError}</TableCell></TableRow>
//                   ) : paginatedEmployeeExits.length > 0 ? (
//                     paginatedEmployeeExits.map((exit, index) => (
//                       <TableRow key={exit.exit_id} hover>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{exit.employee_name}</TableCell>
//                         <TableCell>{exit.exit_type_name}</TableCell>
//                         <TableCell>{formatDate(exit.exit_date)}</TableCell>
//                         <TableCell>{capitalize(exit.exit_interview)}</TableCell>
//                         <TableCell>{capitalize(exit.is_inactivate_account)}</TableCell>
//                         <TableCell>{getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}</TableCell>
//                         <TableCell align="right">
//                           <Tooltip title="Edit">
//                             <IconButton size="small" onClick={() => handleOpenEditDialog(exit)} color="primary"><EditIcon /></IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete">
//                             <IconButton size="small" onClick={() => handleDeleteExit(exit.exit_id)} color="error"><DeleteIcon /></IconButton>
//                           </Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (<TableRow><TableCell colSpan={8} align="center">No employee exits found.</TableCell></TableRow>)}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           {/* PAGINATION */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, gap: 2 }}>
//             <Typography variant="body2" color="text.secondary">
//               Showing {paginatedEmployeeExits.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredEmployeeExits.length)} of {filteredEmployeeExits.length} entries
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button variant="outlined" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>

//         {/* DIALOG for Adding/Editing Employee Exit */}
//         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}</Typography>
//             <Button variant="outlined" onClick={handleCloseEmployeeExitDialog}>Close</Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>
//                       <InputLabel id="employee-label">Employee</InputLabel>
//                       <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, employeeId: e.target.value }))}>
//                         <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading..." : employeesDropdownError || "Select Employee"}</em></MenuItem>
//                         {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData
//                           .filter(emp => emp.value != null) // FIX: Filter out null values
//                           .map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))} InputProps={{ endAdornment: (<InputAdornment position="end"><CalendarTodayIcon /></InputAdornment>) }} />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required disabled={loadingExitTypes}>
//                       <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                       <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>
//                         <MenuItem value=""><em>{loadingExitTypes ? "Loading..." : exitTypesError || "Select Exit Type"}</em></MenuItem>
//                         {!loadingExitTypes && !exitTypesError && exitTypes
//                           .filter(type => type.id != null) // FIX: Filter out null values
//                           .map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="exit-interview-label">Exit Interview</InputLabel>
//                       <Select labelId="exit-interview-label" label="Exit Interview" value={newEmployeeExit.exitInterview} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitInterview: e.target.value }))}>
//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="disable-account-label">Disable Account</InputLabel>
//                       <Select labelId="disable-account-label" label="Disable Account" value={newEmployeeExit.disableAccount} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, disableAccount: e.target.value }))}>
//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField label="Description / Reason" fullWidth multiline rows={3} placeholder="Enter description or reason for exit..." value={newEmployeeExit.description} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, description: e.target.value }))} />
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
//                   <Typography variant="subtitle1" gutterBottom>Exit Contract / Attachment</Typography>
//                   <TextField fullWidth disabled size="small" placeholder="No file chosen" value={newEmployeeExit.file ? newEmployeeExit.file.name : ''} sx={{ mb: 1 }} />
//                   <Button variant="outlined" component="label" fullWidth>Browse File<input type="file" hidden onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif" /></Button>
//                   <Typography variant="caption" color="textSecondary" display="block" mt={1}>Allowed: GIF, PNG, JPG, JPEG. Max 2MB.</Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <Divider />
//           <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
//             <Button onClick={handleResetEmployeeExitForm} sx={{ mr: 1, color: 'text.secondary', borderColor: 'divider' }} variant="outlined">Reset</Button>
//             <Button variant="contained" onClick={handleSubmitEmployeeExit}>{newEmployeeExit.currentEditingId ? 'Update' : 'Save'}</Button>
//           </DialogActions>
//         </Dialog>

//         {/* DIALOG for Managing Exit Types */}
//         <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Manage Exit Types<Button onClick={handleCloseExitTypeDialog} variant="outlined">Close</Button></DialogTitle>
//           <DialogContent dividers sx={{ p: 0 }}>
//             <Grid container>
//               <Grid item xs={12} md={4} sx={{ borderRight: { md: '1px solid #eee' } }}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>{editingExitType ? 'Edit Exit Type' : 'Add New Exit Type'}</Typography>
//                   <FormControl fullWidth sx={{ mb: 2 }}>
//                     <TextField required label="Exit Type Name" placeholder="Enter exit type name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError} />
//                   </FormControl>
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button variant="contained" onClick={editingExitType ? handleUpdateExitType : handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>
//                       {submittingExitType ? <CircularProgress size={24} color="inherit" /> : editingExitType ? "Update" : "Save"}
//                     </Button>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={8}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>List All Exit Types</Typography>
//                   {loadingExitTypes ? (<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>
//                   ) : exitTypesError ? (<Typography color="error" sx={{ p: 2 }}>Error: {exitTypesError} <Button onClick={fetchExitTypes} size="small">Retry</Button></Typography>
//                   ) : (
//                     <>
//                       <TableContainer component={Paper} variant="outlined">
//                         <Table size="small">
//                           <TableHead>
//                             <TableRow>
//                               <TableCell>
//                                 <TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('name')}>EXIT TYPE</TableSortLabel>
//                               </TableCell>
//                               <TableCell>
//                                 <TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('createdAt')}>CREATED AT</TableSortLabel>
//                               </TableCell>
//                               <TableCell>Actions</TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {paginatedExitTypes.length > 0 ? (
//                               paginatedExitTypes.map((type) => (
//                                 <TableRow key={type.id} hover>
//                                   <TableCell>{type.name}</TableCell>
//                                   <TableCell>{type.createdAt}</TableCell>
//                                   <TableCell>
//                                     <IconButton size="small" onClick={() => handleEditExitType(type)} color="primary"><EditIcon fontSize="small" /></IconButton>
//                                     <IconButton size="small" color="error" onClick={() => handleDeleteExitType(type.id)}><DeleteIcon fontSize="small" /></IconButton>
//                                   </TableCell>
//                                 </TableRow>
//                               ))
//                             ) : (
//                               <TableRow><TableCell colSpan={3} align="center">No exit types found.</TableCell></TableRow>
//                             )}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                       {sortedAndFilteredExitTypes.length > 0 && (
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>
//                           <Button size="small" disabled={exitTypePage === 0} onClick={() => setExitTypePage(p => p - 1)} sx={{ border: '1px solid #ddd' }}>Previous</Button>
//                           <Typography variant="body2">Page {exitTypePage + 1} of {totalExitTypePages}</Typography>
//                           <Button size="small" disabled={exitTypePage >= totalExitTypePages - 1} onClick={() => setExitTypePage(p => p + 1)} sx={{ border: '1px solid #ddd' }}>Next</Button>
//                         </Box>
//                       )}
//                     </>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default NewExitAdmin;








import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ThemeProvider,
  createTheme,
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Chip,
  Divider,
  CssBaseline,
  InputAdornment,
  CircularProgress,
  useMediaQuery,
  Stack,
  Tooltip,
  Skeleton,
  TablePagination,
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';

// API Configuration
const EXIT_TYPE_API_URL = '/exit-type/';
const EMPLOYEE_DROPDOWN_API_URL = '/employee-dropdown/';
const EMPLOYEE_EXITS_API_URL = '/employee-exits/';

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
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#FFFFFF',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        },
        body: {
          fontSize: '0.95rem',
        },
      },
    },
  },
});

// Utility function for formatting date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('en-GB').format(date);
};

// Helper function to capitalize strings
const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '');

// Helper function for Status Chip
const getStatusChip = (statusValue) => {
  const statusText = capitalize(statusValue || 'Pending');
  let color = 'default';
  if (statusText === 'Approved') color = 'success';
  else if (statusText === 'Pending') color = 'warning';
  else if (statusText === 'Rejected') color = 'error';
  return <Chip label={statusText} color={color} size="small" />;
};

function NewExitAdmin() {
  const [exitTypes, setExitTypes] = useState([]);
  const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
  const [employeeExits, setEmployeeExits] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
  const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const initialEmployeeExitState = {
    employeeId: '', exitDate: '', exitTypeId: '',
    exitInterview: 'Yes', disableAccount: 'Yes',
    description: '', file: null, currentEditingId: null,
  };

  const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);
  const [newExitType, setNewExitType] = useState('');
  const [editingExitType, setEditingExitType] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [exitsRes, typesRes, employeesRes] = await Promise.all([
        axiosInstance.get(EMPLOYEE_EXITS_API_URL),
        axiosInstance.get(EXIT_TYPE_API_URL),
        axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL),
      ]);
      setEmployeeExits(exitsRes.data);
      setExitTypes(typesRes.data.map(item => ({ id: item.value, name: item.label })));
      setEmployeesDropdownData(employeesRes.data || []);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Fetch Data',
        text: 'Could not load necessary data. Please try again.',
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleOpenEditDialog = (exitToEdit) => {
    setNewEmployeeExit({
      employeeId: exitToEdit.employee_id?.toString() || '',
      exitDate: exitToEdit.exit_date ? new Date(exitToEdit.exit_date).toISOString().split('T')[0] : '',
      exitTypeId: exitToEdit.exit_type_id?.toString() || '',
      exitInterview: capitalize(exitToEdit.exit_interview) || 'Yes',
      disableAccount: capitalize(exitToEdit.is_inactivate_account) || 'Yes',
      description: exitToEdit.reason || '',
      file: null, 
      currentEditingId: exitToEdit.exit_id,
    });
    setOpenAddExitDialog(true);
  };
  
  const handleSubmitEmployeeExit = async () => {
    const isEditMode = !!newEmployeeExit.currentEditingId;
    const { employeeId, exitDate, exitTypeId, description, exitInterview, disableAccount, currentEditingId } = newEmployeeExit;

    if (!isEditMode && !employeeId) {
        Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select an Employee.', timer: 3000, showConfirmButton: false });
        return;
    }
    if (!exitDate || !exitTypeId) {
        Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Exit Date and Exit Type are required.', timer: 3000, showConfirmButton: false });
        return;
    }

    setIsSubmitting(true);
    const payload = {
      exit_date: exitDate,
      exit_type_id: parseInt(exitTypeId),
      reason: description,
      exit_interview: exitInterview.toLowerCase(),
      is_inactivate_account: disableAccount.toLowerCase(),
    };
    if (!isEditMode) {
      payload.employee_id = parseInt(employeeId);
    }
    
    try {
      if (isEditMode) {
        await axiosInstance.patch(`${EMPLOYEE_EXITS_API_URL}${currentEditingId}/`, payload);
      } else {
        await axiosInstance.post(EMPLOYEE_EXITS_API_URL, payload);
      }
      Swal.fire({ icon: 'success', title: `Employee Exit ${isEditMode ? 'Updated' : 'Added'}!`, timer: 3000, showConfirmButton: false });
      fetchData();
      handleCloseEmployeeExitDialog();
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'An unexpected error occurred.';
      Swal.fire({ icon: 'error', title: 'Submission Failed', text: errorMsg, timer: 3000, showConfirmButton: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExit = (exitId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8C257C',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`${EMPLOYEE_EXITS_API_URL}${exitId}/`);
          Swal.fire({ title: 'Deleted!', text: 'The employee exit has been deleted.', icon: 'success', timer: 3000, showConfirmButton: false });
          fetchData();
        } catch (error) {
          Swal.fire({ title: 'Failed!', text: 'Could not delete the employee exit.', icon: 'error', timer: 3000, showConfirmButton: false });
        }
      }
    });
  };

  const handleSubmitExitType = async () => {
    if (!newExitType.trim()) {
        Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Exit Type name is required.', timer: 3000, showConfirmButton: false });
        return;
    }
    setIsSubmitting(true);
    try {
        const payload = { category_name: newExitType.trim() };
        if (editingExitType) {
            await axiosInstance.patch(`${EXIT_TYPE_API_URL}${editingExitType.id}/`, payload);
        } else {
            await axiosInstance.post(EXIT_TYPE_API_URL, payload);
        }
        Swal.fire({ icon: 'success', title: `Exit Type ${editingExitType ? 'Updated' : 'Saved'}!`, timer: 3000, showConfirmButton: false });
        setNewExitType('');
        setEditingExitType(null);
        fetchData(); // Refetch all data to update dropdowns
    } catch (error) {
        const errorMsg = error.response?.data?.category_name?.[0] || 'An unexpected error occurred.';
        Swal.fire({ icon: 'error', title: 'Submission Failed', text: errorMsg, timer: 3000, showConfirmButton: false });
    } finally {
        setIsSubmitting(false);
    }
};

const handleDeleteExitType = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "This will permanently delete the exit type!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8C257C',
        cancelButtonColor: '#757575',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axiosInstance.delete(`${EXIT_TYPE_API_URL}${id}/`);
                Swal.fire({ title: 'Deleted!', text: 'The exit type has been removed.', icon: 'success', timer: 3000, showConfirmButton: false });
                fetchData();
            } catch (error) {
                Swal.fire({ title: 'Failed!', text: 'Could not delete the exit type.', icon: 'error', timer: 3000, showConfirmButton: false });
            }
        }
    });
};

  const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };
  const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setEditingExitType(null); };
  
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredEmployeeExits = useMemo(() => employeeExits.filter(exit =>
    (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [employeeExits, searchTerm]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={3}>
        <Box component={Paper} p={3}>
          <Typography variant="h5" mb={2}>Employee Exit Management</Typography>
          
          <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems={isMobile ? 'stretch' : 'center'} spacing={2} mb={2}>
            <Stack direction="row" spacing={1}>
                <Button variant="contained" startIcon={<Add />} onClick={() => setOpenAddExitDialog(true)}>Add New</Button>
                <Button variant="outlined" onClick={() => setOpenAddExitTypeDialog(true)}>Manage Types</Button>
                <Button variant="outlined" color="secondary" startIcon={<FileDownloadIcon />}>Export</Button>
            </Stack>
            <TextField
              size="small"
              placeholder="Search ..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: isMobile ? '100%' : 'auto' }}
              InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
            />
          </Stack>

          <TableContainer>
            <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
              <TableHead>
                <TableRow>
                  <TableCell>SR. NO.</TableCell>
                  <TableCell>EMPLOYEE</TableCell>
                  <TableCell>EXIT TYPE</TableCell>
                  <TableCell>EXIT DATE</TableCell>
                  <TableCell>EXIT INTERVIEW</TableCell>
                  <TableCell>ACCOUNT DISABLED</TableCell>
                  <TableCell>STATUS</TableCell>
                  <TableCell align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  Array.from(new Array(rowsPerPage)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="text" width="80px" /></TableCell>
                      <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
                    </TableRow>
                  ))
                ) : filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((exit, index) => (
                  <TableRow key={exit.exit_id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{exit.employee_name}</TableCell>
                    <TableCell>{exit.exit_type_name}</TableCell>
                    <TableCell>{formatDate(exit.exit_date)}</TableCell>
                    <TableCell>{capitalize(exit.exit_interview)}</TableCell>
                    <TableCell>{capitalize(exit.is_inactivate_account)}</TableCell>
                    <TableCell>{getStatusChip(exit.status)}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleOpenEditDialog(exit)} color="primary"><EditIcon /></IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={() => handleDeleteExit(exit.exit_id)} color="secondary"><DeleteIcon /></IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 2,
                gap: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredEmployeeExits.length)} of {filteredEmployeeExits.length} results
              </Typography>
              <TablePagination
                component="div"
                count={filteredEmployeeExits.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 15, 25]}
              />
            </Box>
        </Box>

        {/* DIALOG for Adding/Editing Employee Exit */}
        <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} fullWidth maxWidth="sm">
          <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}
          </DialogTitle>
          <Divider/>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required disabled={!!newEmployeeExit.currentEditingId}>
                  <InputLabel>Employee</InputLabel>
                  <Select label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, employeeId: e.target.value }))}>
                    {employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Exit Type</InputLabel>
                  <Select label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>
                    {exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Exit Interview</InputLabel>
                  <Select label="Exit Interview" value={newEmployeeExit.exitInterview} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitInterview: e.target.value }))}>
                    <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Disable Account</InputLabel>
                  <Select label="Disable Account" value={newEmployeeExit.disableAccount} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, disableAccount: e.target.value }))}>
                    <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Description / Reason" fullWidth multiline rows={3} value={newEmployeeExit.description} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, description: e.target.value }))}/>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: '16px 24px' }}>
            <Button onClick={handleCloseEmployeeExitDialog} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)'} }}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmitEmployeeExit} disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG for Managing Exit Types */}
        <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} fullWidth maxWidth="sm">
            <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>Manage Exit Types</DialogTitle>
            <Divider/>
            <DialogContent>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>{editingExitType ? 'Edit Exit Type' : 'Add New Exit Type'}</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 3 }} alignItems="flex-start">
                    <TextField fullWidth size="small" label="Exit Type Name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={isSubmitting}/>
                    <Button variant="contained" onClick={handleSubmitExitType} disabled={isSubmitting || !newExitType.trim()} sx={{ flexShrink: 0, height: '40px' }}>
                        {isSubmitting ? <CircularProgress size={24} /> : (editingExitType ? "Update" : "Save")}
                    </Button>
                </Stack>
                <Divider sx={{ mb: 2 }}/>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Existing Types</Typography>
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>EXIT TYPE</TableCell>
                                <TableCell align="right">ACTIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exitTypes.map((type) => (
                                <TableRow key={type.id} hover>
                                    <TableCell>{type.name}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => { setNewExitType(type.name); setEditingExitType(type); }} color="primary"><EditIcon fontSize="small" /></IconButton>
                                        <IconButton size="small" color="secondary" onClick={() => handleDeleteExitType(type.id)}><DeleteIcon fontSize="small" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
             <DialogActions sx={{ p: '16px 24px' }}>
                <Button onClick={handleCloseExitTypeDialog} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)'} }}>Close</Button>
            </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default NewExitAdmin;