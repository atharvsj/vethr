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

// import axiosInstance from '../utils/axiosInstance'; // Ensure this path is correct



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



// function NewExit() {

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



// export default NewExit;

















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
// import axiosInstance from '../utils/axiosInstance'; // Ensure this path is correct

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

// function NewExit() {
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
//         sub_exit_type_id: null,
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
//                     <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }} align="right">ACTIONS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loadingExits ? (<TableRow><TableCell colSpan={6} align="center"><CircularProgress /></TableCell></TableRow>
//                   ) : exitError ? (<TableRow><TableCell colSpan={6} align="center" sx={{ color: 'error.main' }}>{exitError}</TableCell></TableRow>
//                   ) : paginatedEmployeeExits.length > 0 ? (
//                     paginatedEmployeeExits.map((exit, index) => (
//                       <TableRow key={exit.exit_id} hover>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{exit.employee_name}</TableCell>
//                         <TableCell>{exit.exit_type_name}</TableCell>
//                         <TableCell>{formatDate(exit.exit_date)}</TableCell>
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
//                   ) : (<TableRow><TableCell colSpan={6} align="center">No employee exits found.</TableCell></TableRow>)}
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
//                         {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))} InputProps={{ endAdornment: (<InputAdornment position="end"><CalendarTodayIcon /></InputAdornment>) }} />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth required disabled={loadingExitTypes}>
//                       <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                       <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>
//                         <MenuItem value=""><em>{loadingExitTypes ? "Loading..." : exitTypesError || "Select Exit Type"}</em></MenuItem>
//                         {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}
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

// export default NewExit;






// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import {
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
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
//   useTheme,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack,
//   Tooltip,
//   Pagination,
//   Skeleton,
// } from '@mui/material';
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Close as CloseIcon,
//   Download as DownloadIcon,
//   Search as SearchIcon,
//   CalendarToday as CalendarTodayIcon,
//   Person as PersonIcon,
// } from '@mui/icons-material';
// import axiosInstance from '../utils/axiosInstance'; // Ensure this path is correct
// import Swal from 'sweetalert2';

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;
// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// // Utility function for formatting date
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     if (isNaN(day)) return dateString.split('T')[0];
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

// function NewExit() {
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

//   // Theme colors and styles from EmployeesView
//   const themePurple = '#8C257C';
//   const themePurpleHover = '#6d1d60';
//   const themeOrange = '#F58E35';

//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: 'white',
//     '&:hover': {
//       backgroundColor: themePurpleHover,
//     },
//   };

//   const cancelButtonSx = {
//     color: '#757575',
//     '&:hover': {
//       backgroundColor: 'rgba(0, 0, 0, 0.04)'
//     }
//   };

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

//   const [isSubmittingEmployeeExit, setIsSubmittingEmployeeExit] = useState(false);

//   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
//   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [exitTypePage, setExitTypePage] = useState(0);
//   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(5);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

//   const initialEmployeeExitState = {
//     employeeId: '', exitDate: '', exitTypeId: '',
//     description: '', file: null, currentEditingId: null,
//   };

//   const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);
//   const [newExitType, setNewExitType] = useState('');
//   const [editingExitType, setEditingExitType] = useState(null);

//   // Helper function for Status Chip, adapted from EmployeesView style
//   const getStatusChip = (statusValue) => {
//     const statusText = capitalize(statusValue || 'Pending');
//     let bgColor = '#9e9e9e'; // Default grey for unknown status
//     if (statusText === 'Approved') bgColor = '#4caf50';
//     else if (statusText === 'Pending') bgColor = themeOrange;
//     else if (statusText === 'Rejected') bgColor = '#f44336';
    
//     return <Chip label={statusText} size="small" sx={{ 
//       bgcolor: bgColor, 
//       color: 'white',
//       borderRadius: '16px',
//       height: '24px',
//       fontWeight: 500 
//     }} />;
//   };
  
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
//       setEmployeeExits(Array.isArray(response.data) ? response.data : []);
//       setExitError(null);
//     } catch (error) {
//       console.error("Error fetching employee exits:", error);
//       setExitError('Failed to load employee exits');
//       setEmployeeExits([]);
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
//       description: exitToEdit.reason || '',
//       file: null, currentEditingId: exitToEdit.exit_id,
//     });
//     setOpenAddExitDialog(true);
//   };

//   const handleSubmitEmployeeExit = async () => {
//     const isEditMode = !!newEmployeeExit.currentEditingId;
//     if (!isEditMode && !newEmployeeExit.employeeId) { Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select an Employee.'}); return; }
//     if (!newEmployeeExit.exitDate) { Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select an Exit Date.'}); return; }
//     if (!newEmployeeExit.exitTypeId) { Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select an Exit Type.'}); return; }

//     const selectedExitType = exitTypes.find(type => type.id.toString() === newEmployeeExit.exitTypeId.toString());
//     const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';
    
//     setIsSubmittingEmployeeExit(true);
//     try {
//       if (isEditMode) {
//         const updatePayload = {
//           exit_date: newEmployeeExit.exitDate,
//           exit_type_id: parseInt(newEmployeeExit.exitTypeId),
//           exit_type_name: exitTypeNameForPayload,
//           reason: newEmployeeExit.description,
//           accountability_to: "0",
//         };
//         await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);
//       } else {
//         const createPayload = {
//           employee_id: parseInt(newEmployeeExit.employeeId), exit_date: newEmployeeExit.exitDate,
//           exit_type_id: parseInt(newEmployeeExit.exitTypeId), exit_type_name: exitTypeNameForPayload,
//           sub_exit_type_id: null, reason: newEmployeeExit.description,
//           accountability_to: "0", added_by: 2
//         };
//         await axiosInstance.post('/employee-exits/', createPayload);
//       }
//       fetchEmployeeExits();
//       handleCloseEmployeeExitDialog();
//       Swal.fire({ icon: 'success', title: 'Success', text: `Employee Exit ${isEditMode ? 'updated' : 'added'} successfully!`, timer: 2000, showConfirmButton: false });
//     } catch (error) {
//       const errorMessage = error.response?.data?.detail || error.message || (isEditMode ? 'Failed to update employee exit.' : 'Failed to add employee exit.');
//       console.error(`Error ${isEditMode ? 'updating' : 'adding'} employee exit:`, error.response?.data || error.message);
//       Swal.fire({ icon: 'error', title: 'Operation Failed', text: errorMessage });
//     } finally {
//       setIsSubmittingEmployeeExit(false);
//     }
//   };

//   const handleDeleteExit = (exitId) => {
//     Swal.fire({
//       title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/employee-exits/${exitId}/`);
//           Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee exit has been deleted.', timer: 2000, showConfirmButton: false });
//           fetchEmployeeExits();
//         } catch (error) {
//           console.error("Failed to delete exit:", error);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete employee exit.' });
//         }
//       }
//     });
//   };

//   const handleSubmitExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });
//       Swal.fire({ icon: 'success', title: 'Success', text: 'Exit type added successfully!', timer: 2000, showConfirmButton: false });
//       setNewExitType('');
//       fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to submit exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || "Failed to add exit type.");
//     } finally { setSubmittingExitType(false); }
//   };

//   const handleEditExitType = (type) => { setNewExitType(type.name); setEditingExitType(type); };
  
//   const handleUpdateExitType = async () => {
//     if (!newExitType.trim() || !editingExitType) { return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.patch(`${EXIT_TYPE_API_URL}${editingExitType.id}/`, { category_name: newExitType.trim() });
//       Swal.fire({ icon: 'success', title: 'Success', text: 'Exit type updated successfully!', timer: 2000, showConfirmButton: false });
//       setNewExitType("");
//       setEditingExitType(null);
//       fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to update exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || "Failed to update exit type.");
//     } finally {
//       setSubmittingExitType(false);
//     }
//   };

//   const handleDeleteExitType = (id) => {
//     Swal.fire({
//       title: 'Are you sure?', text: 'This will delete the exit type.', icon: 'warning',
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`${EXIT_TYPE_API_URL}${id}/`);
//           Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The exit type has been deleted.', timer: 2000, showConfirmButton: false });
//           fetchExitTypes();
//         } catch (error) {
//           console.error("Failed to delete exit type:", error.response?.data || error.message);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete exit type.' });
//         }
//       }
//     });
//   };
  
//   const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };
//   const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setEditingExitType(null); setSubmitExitTypeError(null); };
  
//   const filteredEmployeeExits = useMemo(() => employeeExits.filter(exit =>
//     (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase()))
//   ), [employeeExits, searchTerm]);

//   const sortedAndFilteredExitTypes = useMemo(() => {
//     let items = [...exitTypes]
//       .filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));
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

//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
  
//   const handleExitTypeSort = (key) => {
//     let direction = 'asc';
//     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }
//     setExitTypeSortConfig({ key, direction });
//   };
  
//   const ExitCard = ({ exit, index }) => (
//     <Card sx={{ mb: 2 }} elevation={2}>
//       <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
//         <Stack spacing={2}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//               {exit.employee_name}
//             </Typography>
//             {getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}
//           </Box>
//           <Divider />
//           <Box>
//             <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
//               <Typography variant="body2" color="text.secondary">Sr. No:</Typography>
//               <Typography variant="body2" sx={{ fontWeight: 500 }}>{page * rowsPerPage + index + 1}</Typography>
//             </Stack>
//             <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
//               <Typography variant="body2" color="text.secondary">Exit Type:</Typography>
//               <Typography variant="body2" sx={{ fontWeight: 500 }}>{exit.exit_type_name}</Typography>
//             </Stack>
//             <Stack direction="row" justifyContent="space-between">
//               <Typography variant="body2" color="text.secondary">Exit Date:</Typography>
//               <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exit.exit_date)}</Typography>
//             </Stack>
//           </Box>
//         </Stack>
//       </CardContent>
//       <Divider />
//       <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
//         <Tooltip title="Edit"><IconButton onClick={() => handleOpenEditDialog(exit)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//         <Tooltip title="Delete"><IconButton onClick={() => handleDeleteExit(exit.exit_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//       </CardActions>
//     </Card>
//   );

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//         Employee Exits
//       </Typography>

//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
//         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//           <Button variant="contained" onClick={() => { setOpenAddExitDialog(true); setNewEmployeeExit(initialEmployeeExitState); }} sx={purpleButtonSx} startIcon={<AddIcon />}>Add New Exit</Button>
//           <Button variant="contained" onClick={() => { /* Handle Export */ }} sx={purpleButtonSx} startIcon={<DownloadIcon />}>Export</Button>
//           <Button variant="contained" onClick={() => setOpenAddExitTypeDialog(true)} sx={purpleButtonSx}>Manage Exit Types</Button>
//         </Box>
//         <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: isMobile ? "100%" : "auto" }}
//           InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
//         />
//       </Box>

//       {isMobile ? (
//         <Box>
//           {loadingExits ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : (
//             (rowsPerPage > 0 ? filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredEmployeeExits)
//             .map((exit, index) => <ExitCard key={exit.exit_id} exit={exit} index={index} />)
//           )}
//           {filteredEmployeeExits.length === 0 && !loadingExits && (
//               <Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No employee exits found.</Typography>
//           )}
//         </Box>
//       ) : (
//         <TableContainer>
//           <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//             <TableHead>
//               <TableRow sx={{ bgcolor: themePurple }}>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><PersonIcon sx={{ verticalAlign: 'middle', mr: 0.5, fontSize: '1.1rem' }} />EMPLOYEE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EXIT TYPE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 0.5, fontSize: '1.1rem' }} />EXIT DATE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loadingExits ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                     <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                     <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                   </TableRow>
//                 ))
//               ) : exitError ? (<TableRow><TableCell colSpan={6} align="center" sx={{ color: 'error.main', p: 4 }}>{exitError}</TableCell></TableRow>
//               ) : (rowsPerPage > 0 ? filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredEmployeeExits)
//               .map((exit, index) => (
//                 <TableRow key={exit.exit_id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{exit.employee_name}</TableCell>
//                   <TableCell>{exit.exit_type_name}</TableCell>
//                   <TableCell>{formatDate(exit.exit_date)}</TableCell>
//                   <TableCell>{getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}</TableCell>
//                   <TableCell>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <Tooltip title="Edit"><IconButton onClick={() => handleOpenEditDialog(exit)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                       <Tooltip title="Delete"><IconButton onClick={() => handleDeleteExit(exit.exit_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {filteredEmployeeExits.length === 0 && !loadingExits && (
//                 <TableRow><TableCell colSpan={6} align="center" sx={{ p: 4 }}>No employee exits found.</TableCell></TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <FormControl variant="outlined" size="small">
//                 <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: themePurple, color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: themePurpleHover }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
//                   {[10, 25, 50, 100].map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
//                 </Select>
//               </FormControl>
//               <Typography variant="body2" color="text.secondary">
//                 {`Showing ${filteredEmployeeExits.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filteredEmployeeExits.length)} of ${filteredEmployeeExits.length} entries`}
//               </Typography>
//             </Box>

//             <Pagination
//               count={Math.ceil(filteredEmployeeExits.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton
//               sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: themeOrange, color: 'white' }}, '& .MuiPaginationItem-page': { color: themePurple, '&.Mui-selected': { backgroundColor: themePurple, color: 'white', '&:hover': { backgroundColor: themeOrange }}}, '& .MuiPaginationItem-icon': { color: themePurple }}}
//             />
//           </Box>
//       </Box>

//       <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ color: themePurple, fontWeight: "bold", fontSize: '2rem' }}>
//           {newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}
//           <IconButton onClick={handleCloseEmployeeExitDialog} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={3} sx={{ pt: 1 }}>
//             <Grid item xs={12}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>
//                     <InputLabel id="employee-label">Employee</InputLabel>
//                     <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, employeeId: e.target.value }))}>
//                       <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading..." : employeesDropdownError || "Select Employee"}</em></MenuItem>
//                       {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth required disabled={loadingExitTypes}>
//                     <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                     <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>
//                       <MenuItem value=""><em>{loadingExitTypes ? "Loading..." : exitTypesError || "Select Exit Type"}</em></MenuItem>
//                       {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField label="Description / Reason" fullWidth multiline rows={4} placeholder="Enter description..." value={newEmployeeExit.description} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, description: e.target.value }))} />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseEmployeeExitDialog} disabled={isSubmittingEmployeeExit} sx={cancelButtonSx}>Cancel</Button>
//           <Button onClick={handleSubmitEmployeeExit} variant="contained" disabled={isSubmittingEmployeeExit} sx={purpleButtonSx}>
//             {isSubmittingEmployeeExit ? <CircularProgress size={24} color="inherit" /> : newEmployeeExit.currentEditingId ? 'Update' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
//         <DialogTitle sx={{ color: themePurple, fontWeight: "bold", fontSize: '2rem' }}>
//           Manage Exit Types
//           <IconButton onClick={handleCloseExitTypeDialog} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={3} sx={{ mt: 0.1 }}>
//             <Grid item xs={12} md={4}>
//               <Typography variant="h6" sx={{ mb: 2 }}>{editingExitType ? 'Edit Exit Type' : 'Add New Exit Type'}</Typography>
//               <TextField required fullWidth label="Exit Type Name" placeholder="Enter name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError} sx={{ mb: 2 }} />
//               <Stack direction="row" spacing={1} justifyContent="flex-end">
//                 {editingExitType && <Button sx={cancelButtonSx} onClick={() => { setEditingExitType(null); setNewExitType(''); setSubmitExitTypeError(null);}}>Cancel</Button>}
//                 <Button sx={purpleButtonSx} variant="contained" onClick={editingExitType ? handleUpdateExitType : handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>
//                   {submittingExitType ? <CircularProgress size={24} color="inherit" /> : editingExitType ? "Update" : "Save"}
//                 </Button>
//               </Stack>
//             </Grid>
//             <Grid item xs={12} md={8}>
//               <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{sm: 'center'}} spacing={2} sx={{ mb: 2 }}>
//                 <Typography variant="h6">Existing Exit Types</Typography>
//                 <TextField size="small" placeholder="Search types..." value={exitTypeSearchTerm} onChange={e => setExitTypeSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }} sx={{ width: { xs: "100%", sm: 250 } }}/>
//               </Stack>
//               <TableContainer component={Paper} variant="outlined">
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: themePurple }}>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
//                         <TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.direction} onClick={() => handleExitTypeSort('name')} sx={{ '& .MuiTableSortLabel-icon': { color: 'white !important' }}}>EXIT TYPE</TableSortLabel>
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
//                         <TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.direction} onClick={() => handleExitTypeSort('createdAt')} sx={{ '& .MuiTableSortLabel-icon': { color: 'white !important' }}}>CREATED AT</TableSortLabel>
//                       </TableCell>
//                       <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {loadingExitTypes ? Array.from(new Array(5)).map((_, i) => <TableRow key={i}><TableCell colSpan={3}><Skeleton/></TableCell></TableRow>)
//                       : sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage)
//                       .map((type) => (
//                         <TableRow key={type.id} hover>
//                           <TableCell>{type.name}</TableCell>
//                           <TableCell>{type.createdAt}</TableCell>
//                           <TableCell align="right">
//                             <Tooltip title="Edit"><IconButton size="small" onClick={() => handleEditExitType(type)} sx={{ color: themePurple }}><EditIcon fontSize="small" /></IconButton></Tooltip>
//                             <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDeleteExitType(type.id)} sx={{ color: themeOrange }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     }
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Grid>
//           </Grid>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default NewExit;









// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import {
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
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
//   useTheme,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack,
//   Tooltip,
//   Pagination,
//   Skeleton,
// } from '@mui/material';
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Close as CloseIcon,
//   Download as DownloadIcon,
//   Search as SearchIcon,
//   CalendarToday as CalendarTodayIcon,
//   Person as PersonIcon,
// } from '@mui/icons-material';
// import axiosInstance from '../utils/axiosInstance'; // Ensure this path is correct
// import Swal from 'sweetalert2';

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;
// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// // Utility function for formatting date
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     if (isNaN(day)) return dateString.split('T')[0];
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

// function NewExit() {
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

//   // Theme colors and styles from EmployeesView
//   const themePurple = '#8C257C';
//   const themePurpleHover = '#6d1d60';
//   const themeOrange = '#F58E35';

//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: 'white',
//     '&:hover': {
//       backgroundColor: themePurpleHover,
//     },
//   };

//   const cancelButtonSx = {
//     color: '#757575',
//     '&:hover': {
//       backgroundColor: 'rgba(0, 0, 0, 0.04)'
//     }
//   };

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

//   const [isSubmittingEmployeeExit, setIsSubmittingEmployeeExit] = useState(false);

//   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
//   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [exitTypePage, setExitTypePage] = useState(0);
//   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(5);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

//   const initialEmployeeExitState = {
//     employeeId: '', exitDate: '', exitTypeId: '',
//     description: '', file: null, currentEditingId: null,
//   };

//   const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);
//   const [newExitType, setNewExitType] = useState('');
//   const [editingExitType, setEditingExitType] = useState(null);

//   // Helper function for Status Chip, adapted from EmployeesView style
//   const getStatusChip = (statusValue) => {
//     const statusText = capitalize(statusValue || 'Pending');
//     let bgColor = '#9e9e9e'; // Default grey for unknown status
//     if (statusText === 'Approved') bgColor = '#4caf50';
//     else if (statusText === 'Pending') bgColor = themeOrange;
//     else if (statusText === 'Rejected') bgColor = '#f44336';
    
//     return <Chip label={statusText} size="small" sx={{ 
//       bgcolor: bgColor, 
//       color: 'white',
//       borderRadius: '16px',
//       height: '24px',
//       fontWeight: 500 
//     }} />;
//   };
  
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
//       setEmployeeExits(Array.isArray(response.data) ? response.data : []);
//       setExitError(null);
//     } catch (error) {
//       console.error("Error fetching employee exits:", error);
//       setExitError('Failed to load employee exits');
//       setEmployeeExits([]);
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
//       description: exitToEdit.reason || '',
//       file: null, currentEditingId: exitToEdit.exit_id,
//     });
//     setOpenAddExitDialog(true);
//   };

//   const handleSubmitEmployeeExit = async () => {
//     const isEditMode = !!newEmployeeExit.currentEditingId;
//     if (!isEditMode && !newEmployeeExit.employeeId) { Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select an Employee.'}); return; }
//     if (!newEmployeeExit.exitDate) { Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select an Exit Date.'}); return; }
//     if (!newEmployeeExit.exitTypeId) { Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select an Exit Type.'}); return; }

//     const selectedExitType = exitTypes.find(type => type.id.toString() === newEmployeeExit.exitTypeId.toString());
//     const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';
    
//     setIsSubmittingEmployeeExit(true);
//     try {
//       if (isEditMode) {
//         const updatePayload = {
//           exit_date: newEmployeeExit.exitDate,
//           exit_type_id: parseInt(newEmployeeExit.exitTypeId),
//           exit_type_name: exitTypeNameForPayload,
//           reason: newEmployeeExit.description,
//           accountability_to: "0",
//         };
//         await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);
//       } else {
//         const createPayload = {
//           employee_id: parseInt(newEmployeeExit.employeeId), exit_date: newEmployeeExit.exitDate,
//           exit_type_id: parseInt(newEmployeeExit.exitTypeId), exit_type_name: exitTypeNameForPayload,
//           sub_exit_type_id: null, reason: newEmployeeExit.description,
//           accountability_to: "0", added_by: 2
//         };
//         await axiosInstance.post('/employee-exits/', createPayload);
//       }
//       fetchEmployeeExits();
//       handleCloseEmployeeExitDialog();
//       Swal.fire({ icon: 'success', title: 'Success', text: `Employee Exit ${isEditMode ? 'updated' : 'added'} successfully!`, timer: 2000, showConfirmButton: false });
//     } catch (error) {
//       const errorMessage = error.response?.data?.detail || error.message || (isEditMode ? 'Failed to update employee exit.' : 'Failed to add employee exit.');
//       console.error(`Error ${isEditMode ? 'updating' : 'adding'} employee exit:`, error.response?.data || error.message);
//       Swal.fire({ icon: 'error', title: 'Operation Failed', text: errorMessage });
//     } finally {
//       setIsSubmittingEmployeeExit(false);
//     }
//   };

//   const handleDeleteExit = (exitId) => {
//     Swal.fire({
//       title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/employee-exits/${exitId}/`);
//           Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee exit has been deleted.', timer: 2000, showConfirmButton: false });
//           fetchEmployeeExits();
//         } catch (error) {
//           console.error("Failed to delete exit:", error);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete employee exit.' });
//         }
//       }
//     });
//   };

//   const handleSubmitExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });
//       Swal.fire({ icon: 'success', title: 'Success', text: 'Exit type added successfully!', timer: 2000, showConfirmButton: false });
//       setNewExitType('');
//       fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to submit exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || "Failed to add exit type.");
//     } finally { setSubmittingExitType(false); }
//   };

//   const handleEditExitType = (type) => { setNewExitType(type.name); setEditingExitType(type); };
  
//   const handleUpdateExitType = async () => {
//     if (!newExitType.trim() || !editingExitType) { return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.patch(`${EXIT_TYPE_API_URL}${editingExitType.id}/`, { category_name: newExitType.trim() });
//       Swal.fire({ icon: 'success', title: 'Success', text: 'Exit type updated successfully!', timer: 2000, showConfirmButton: false });
//       setNewExitType("");
//       setEditingExitType(null);
//       fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to update exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || "Failed to update exit type.");
//     } finally {
//       setSubmittingExitType(false);
//     }
//   };

//   const handleDeleteExitType = (id) => {
//     Swal.fire({
//       title: 'Are you sure?', text: 'This will delete the exit type.', icon: 'warning',
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`${EXIT_TYPE_API_URL}${id}/`);
//           Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The exit type has been deleted.', timer: 2000, showConfirmButton: false });
//           fetchExitTypes();
//         } catch (error) {
//           console.error("Failed to delete exit type:", error.response?.data || error.message);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete exit type.' });
//         }
//       }
//     });
//   };
  
//   const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };
//   const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setEditingExitType(null); setSubmitExitTypeError(null); };
  
//   const filteredEmployeeExits = useMemo(() => employeeExits.filter(exit =>
//     (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase()))
//   ), [employeeExits, searchTerm]);

//   const sortedAndFilteredExitTypes = useMemo(() => {
//     let items = [...exitTypes]
//       .filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));
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

//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
  
//   const handleExitTypeSort = (key) => {
//     let direction = 'asc';
//     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }
//     setExitTypeSortConfig({ key, direction });
//   };
  
//   const ExitCard = ({ exit, index }) => (
//     <Card sx={{ mb: 2 }} elevation={2}>
//       <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
//         <Stack spacing={2}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//               {exit.employee_name}
//             </Typography>
//             {getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}
//           </Box>
//           <Divider />
//           <Box>
//             <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
//               <Typography variant="body2" color="text.secondary">Sr. No:</Typography>
//               <Typography variant="body2" sx={{ fontWeight: 500 }}>{page * rowsPerPage + index + 1}</Typography>
//             </Stack>
//             <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
//               <Typography variant="body2" color="text.secondary">Exit Type:</Typography>
//               <Typography variant="body2" sx={{ fontWeight: 500 }}>{exit.exit_type_name}</Typography>
//             </Stack>
//             <Stack direction="row" justifyContent="space-between">
//               <Typography variant="body2" color="text.secondary">Exit Date:</Typography>
//               <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exit.exit_date)}</Typography>
//             </Stack>
//           </Box>
//         </Stack>
//       </CardContent>
//       <Divider />
//       <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
//         <Tooltip title="Edit"><IconButton onClick={() => handleOpenEditDialog(exit)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//         <Tooltip title="Delete"><IconButton onClick={() => handleDeleteExit(exit.exit_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//       </CardActions>
//     </Card>
//   );

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//         Employee Exits
//       </Typography>

//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
//         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//           <Button variant="contained" onClick={() => { setOpenAddExitDialog(true); setNewEmployeeExit(initialEmployeeExitState); }} sx={purpleButtonSx} startIcon={<AddIcon />}>Add New Exit</Button>
//           <Button variant="contained" onClick={() => { /* Handle Export */ }} sx={purpleButtonSx} startIcon={<DownloadIcon />}>Export</Button>
//           <Button variant="contained" onClick={() => setOpenAddExitTypeDialog(true)} sx={purpleButtonSx}>Create Exit Types</Button>
//         </Box>
//         <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: isMobile ? "100%" : "auto" }}
//           InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
//         />
//       </Box>

//       {isMobile ? (
//         <Box>
//           {loadingExits ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : (
//             (rowsPerPage > 0 ? filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredEmployeeExits)
//             .map((exit, index) => <ExitCard key={exit.exit_id} exit={exit} index={index} />)
//           )}
//           {filteredEmployeeExits.length === 0 && !loadingExits && (
//               <Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No employee exits found.</Typography>
//           )}
//         </Box>
//       ) : (
//         <TableContainer>
//           <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//             <TableHead>
//               <TableRow sx={{ bgcolor: themePurple }}>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><PersonIcon sx={{ verticalAlign: 'middle', mr: 0.5, fontSize: '1.1rem' }} />EMPLOYEE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EXIT TYPE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 0.5, fontSize: '1.1rem' }} />EXIT DATE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loadingExits ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                     <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                     <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                   </TableRow>
//                 ))
//               ) : exitError ? (<TableRow><TableCell colSpan={6} align="center" sx={{ color: 'error.main', p: 4 }}>{exitError}</TableCell></TableRow>
//               ) : (rowsPerPage > 0 ? filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredEmployeeExits)
//               .map((exit, index) => (
//                 <TableRow key={exit.exit_id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{exit.employee_name}</TableCell>
//                   <TableCell>{exit.exit_type_name}</TableCell>
//                   <TableCell>{formatDate(exit.exit_date)}</TableCell>
//                   <TableCell>{getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}</TableCell>
//                   <TableCell>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <Tooltip title="Edit"><IconButton onClick={() => handleOpenEditDialog(exit)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                       <Tooltip title="Delete"><IconButton onClick={() => handleDeleteExit(exit.exit_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {filteredEmployeeExits.length === 0 && !loadingExits && (
//                 <TableRow><TableCell colSpan={6} align="center" sx={{ p: 4 }}>No employee exits found.</TableCell></TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <FormControl variant="outlined" size="small">
//                 <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: themePurple, color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: themePurpleHover }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
//                   {[10, 25, 50, 100].map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
//                 </Select>
//               </FormControl>
//               <Typography variant="body2" color="text.secondary">
//                 {`Showing ${filteredEmployeeExits.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filteredEmployeeExits.length)} of ${filteredEmployeeExits.length} entries`}
//               </Typography>
//             </Box>

//             <Pagination
//               count={Math.ceil(filteredEmployeeExits.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton
//               sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: themeOrange, color: 'white' }}, '& .MuiPaginationItem-page': { color: themePurple, '&.Mui-selected': { backgroundColor: themePurple, color: 'white', '&:hover': { backgroundColor: themeOrange }}}, '& .MuiPaginationItem-icon': { color: themePurple }}}
//             />
//           </Box>
//       </Box>

//       <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ color: themePurple, fontWeight: "bold", fontSize: '2rem' }}>
//           {newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}
//           <IconButton onClick={handleCloseEmployeeExitDialog} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={3} sx={{ pt: 1 }}>
//             <Grid item xs={12}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>
//                     <InputLabel id="employee-label">Employee</InputLabel>
//                     <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, employeeId: e.target.value }))}>
//                       <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading..." : employeesDropdownError || "Select Employee"}</em></MenuItem>
//                       {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth required disabled={loadingExitTypes}>
//                     <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                     <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>
//                       <MenuItem value=""><em>{loadingExitTypes ? "Loading..." : exitTypesError || "Select Exit Type"}</em></MenuItem>
//                       {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField label="Description / Reason" fullWidth multiline rows={4} placeholder="Enter description..." value={newEmployeeExit.description} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, description: e.target.value }))} />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseEmployeeExitDialog} disabled={isSubmittingEmployeeExit} sx={cancelButtonSx}>Cancel</Button>
//           <Button onClick={handleSubmitEmployeeExit} variant="contained" disabled={isSubmittingEmployeeExit} sx={purpleButtonSx}>
//             {isSubmittingEmployeeExit ? <CircularProgress size={24} color="inherit" /> : newEmployeeExit.currentEditingId ? 'Update' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
//         <DialogTitle sx={{ color: themePurple, fontWeight: "bold", fontSize: '2rem' }}>
//           Create Exit Types
//           <IconButton onClick={handleCloseExitTypeDialog} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={3} sx={{ mt: 0.1 }}>
//             <Grid item xs={12} md={4}>
//               <Typography variant="h6" sx={{ mb: 2 }}>{editingExitType ? 'Edit Exit Type' : 'Add New Exit Type'}</Typography>
//               <TextField required fullWidth label="Exit Type Name" placeholder="Enter name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError} sx={{ mb: 2 }} />
//               <Stack direction="row" spacing={1} justifyContent="flex-end">
//                 {editingExitType && <Button sx={cancelButtonSx} onClick={() => { setEditingExitType(null); setNewExitType(''); setSubmitExitTypeError(null);}}>Cancel</Button>}
//                 <Button sx={purpleButtonSx} variant="contained" onClick={editingExitType ? handleUpdateExitType : handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>
//                   {submittingExitType ? <CircularProgress size={24} color="inherit" /> : editingExitType ? "Update" : "Save"}
//                 </Button>
//               </Stack>
//             </Grid>
//             <Grid item xs={12} md={8}>
//               <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{sm: 'center'}} spacing={2} sx={{ mb: 2 }}>
//                 <Typography variant="h6">Existing Exit Types</Typography>
//                 <TextField size="small" placeholder="Search types..." value={exitTypeSearchTerm} onChange={e => setExitTypeSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }} sx={{ width: { xs: "100%", sm: 250 } }}/>
//               </Stack>
//               <TableContainer component={Paper} variant="outlined">
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: themePurple }}>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
//                         <TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.direction} onClick={() => handleExitTypeSort('name')} sx={{ '& .MuiTableSortLabel-icon': { color: 'white !important' }}}>EXIT TYPE</TableSortLabel>
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
//                         <TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.direction} onClick={() => handleExitTypeSort('createdAt')} sx={{ '& .MuiTableSortLabel-icon': { color: 'white !important' }}}>CREATED AT</TableSortLabel>
//                       </TableCell>
//                       <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {loadingExitTypes ? Array.from(new Array(5)).map((_, i) => <TableRow key={i}><TableCell colSpan={3}><Skeleton/></TableCell></TableRow>)
//                       : sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage)
//                       .map((type) => (
//                         <TableRow key={type.id} hover>
//                           <TableCell>{type.name}</TableCell>
//                           <TableCell>{type.createdAt}</TableCell>
//                           <TableCell align="right">
//                             <Tooltip title="Edit"><IconButton size="small" onClick={() => handleEditExitType(type)} sx={{ color: themePurple }}><EditIcon fontSize="small" /></IconButton></Tooltip>
//                             <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDeleteExitType(type.id)} sx={{ color: themeOrange }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     }
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Grid>
//           </Grid>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default NewExit;


import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
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
  InputAdornment,
  CircularProgress,
  TableSortLabel,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Stack,
  Tooltip,
  Pagination,
  Skeleton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import axiosInstance from '../utils/axiosInstance';
import Swal from 'sweetalert2';

const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;
const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    if (isNaN(day)) return dateString.split('T')[0];
    return `${day}/${month}/${year}`;
  } catch (error) {
    return dateString;
  }
};

const capitalize = (s) => {
  if (typeof s !== 'string' || !s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

function NewExit() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const themePurple = '#8C257C';
  const themePurpleHover = '#6d1d60';
  const themeOrange = '#F58E35';

  const purpleButtonSx = {
    backgroundColor: themePurple,
    color: 'white',
    '&:hover': {
      backgroundColor: themePurpleHover,
    },
  };

  const cancelButtonSx = {
    color: '#757575',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  };

  const [exitTypes, setExitTypes] = useState([]);
  const [loadingExitTypes, setLoadingExitTypes] = useState(true);
  const [exitTypesError, setExitTypesError] = useState(null);
  const [submittingExitType, setSubmittingExitType] = useState(false);
  const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
  const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });

  const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
  const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
  const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

  const [employeeExits, setEmployeeExits] = useState([]);
  const [loadingExits, setLoadingExits] = useState(true);
  const [exitError, setExitError] = useState(null);

  const [isSubmittingEmployeeExit, setIsSubmittingEmployeeExit] = useState(false);

  const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
  const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [exitTypePage, setExitTypePage] = useState(0);
  const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(5);

  const [searchTerm, setSearchTerm] = useState('');
  const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

  const initialEmployeeExitState = {
    employeeId: '', exitDate: '', exitTypeId: '',
    description: '', file: null, currentEditingId: null,
  };

  const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);
  const [newExitType, setNewExitType] = useState('');
  const [editingExitType, setEditingExitType] = useState(null);

  const getStatusChip = (statusValue) => {
    const statusText = capitalize(statusValue || 'Pending');
    let bgColor = '#9e9e9e';
    if (statusText === 'Approved') bgColor = '#4caf50';
    else if (statusText === 'Pending') bgColor = themeOrange;
    else if (statusText === 'Rejected') bgColor = '#f44336';
    
    return <Chip label={statusText} size="small" sx={{ 
      bgcolor: bgColor, 
      color: 'white',
      borderRadius: '16px',
      height: '24px',
      fontWeight: 500 
    }} />;
  };
  
  const fetchExitTypes = useCallback(async () => {
    setLoadingExitTypes(true);
    setExitTypesError(null);
    try {
      const response = await axiosInstance.get(EXIT_TYPE_API_URL);
      const transformedData = response.data.map(item => ({
        id: item.value, name: item.label, createdAt: formatDate(item.created_at),
      }));
      setExitTypes(transformedData);
    } catch (error) {
      console.error("Failed to fetch exit types:", error);
      setExitTypesError("Failed to load exit types.");
    } finally {
      setLoadingExitTypes(false);
    }
  }, []);

  const fetchEmployeesDropdown = useCallback(async () => {
    setLoadingEmployeesDropdown(true);
    setEmployeesDropdownError(null);
    try {
      const response = await axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL);
      setEmployeesDropdownData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch employees dropdown:", error);
      setEmployeesDropdownError("Failed to load employee list.");
    } finally {
      setLoadingEmployeesDropdown(false);
    }
  }, []);

  const fetchEmployeeExits = useCallback(async () => {
    setLoadingExits(true);
    try {
      const response = await axiosInstance.get('/employee-exits/');
      setEmployeeExits(Array.isArray(response.data) ? response.data : []);
      setExitError(null);
    } catch (error) {
      console.error("Error fetching employee exits:", error);
      setExitError('Failed to load employee exits');
      setEmployeeExits([]);
    } finally {
      setLoadingExits(false);
    }
  }, []);

  useEffect(() => {
    fetchExitTypes();
    fetchEmployeesDropdown();
    fetchEmployeeExits();
  }, [fetchExitTypes, fetchEmployeesDropdown, fetchEmployeeExits]);
  
  const handleOpenEditDialog = (exitToEdit) => {
    setNewEmployeeExit({
      employeeId: exitToEdit.employee_id?.toString() || '',
      exitDate: exitToEdit.exit_date ? exitToEdit.exit_date.split('T')[0] : '',
      exitTypeId: exitToEdit.exit_type_id?.toString() || '',
      description: exitToEdit.reason || '',
      file: null, currentEditingId: exitToEdit.exit_id,
    });
    setOpenAddExitDialog(true);
  };

  const handleSubmitEmployeeExit = async () => {
    const isEditMode = !!newEmployeeExit.currentEditingId;
    if (!isEditMode && !newEmployeeExit.employeeId) { Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select an Employee.'}); return; }
    if (!newEmployeeExit.exitDate) { Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select an Exit Date.'}); return; }
    if (!newEmployeeExit.exitTypeId) { Swal.fire({ icon: 'warning', title: 'Validation Error', text: 'Please select an Exit Type.'}); return; }

    const selectedExitType = exitTypes.find(type => type.id.toString() === newEmployeeExit.exitTypeId.toString());
    const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';
    
    setIsSubmittingEmployeeExit(true);
    try {
      if (isEditMode) {
        const updatePayload = {
          exit_date: newEmployeeExit.exitDate,
          exit_type_id: parseInt(newEmployeeExit.exitTypeId),
          exit_type_name: exitTypeNameForPayload,
          reason: newEmployeeExit.description,
          accountability_to: "0",
        };
        await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);
      } else {
        // Find the full employee object to get the emp_id (e.g. "V0575")
        const selectedEmployee = employeesDropdownData.find(emp => emp.value.toString() === newEmployeeExit.employeeId.toString());
        // Use emp_id if available, otherwise fallback to the value (though emp_id is expected)
        const empIdToSend = selectedEmployee ? selectedEmployee.emp_id : newEmployeeExit.employeeId;

        const createPayload = {
          employee_id: empIdToSend,
          exit_date: newEmployeeExit.exitDate,
          exit_type_id: parseInt(newEmployeeExit.exitTypeId),
          exit_type_name: exitTypeNameForPayload,
          sub_exit_type_id: null,
          reason: newEmployeeExit.description,
          accountability_to: "0",
          added_by: 2
        };
        await axiosInstance.post('/employee-exits/', createPayload);
      }
      fetchEmployeeExits();
      handleCloseEmployeeExitDialog();
      Swal.fire({ icon: 'success', title: 'Success', text: `Employee Exit ${isEditMode ? 'updated' : 'added'} successfully!`, timer: 2000, showConfirmButton: false });
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message || (isEditMode ? 'Failed to update employee exit.' : 'Failed to add employee exit.');
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} employee exit:`, error.response?.data || error.message);
      Swal.fire({ icon: 'error', title: 'Operation Failed', text: errorMessage });
    } finally {
      setIsSubmittingEmployeeExit(false);
    }
  };

  const handleDeleteExit = (exitId) => {
    Swal.fire({
      title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
      showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/employee-exits/${exitId}/`);
          Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee exit has been deleted.', timer: 2000, showConfirmButton: false });
          fetchEmployeeExits();
        } catch (error) {
          console.error("Failed to delete exit:", error);
          Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete employee exit.' });
        }
      }
    });
  };

  const handleSubmitExitType = async () => {
    if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }
    setSubmittingExitType(true); setSubmitExitTypeError(null);
    try {
      await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });
      Swal.fire({ icon: 'success', title: 'Success', text: 'Exit type added successfully!', timer: 2000, showConfirmButton: false });
      setNewExitType('');
      fetchExitTypes();
    } catch (error) {
      console.error("Failed to submit exit type:", error.response?.data || error.message);
      setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || "Failed to add exit type.");
    } finally { setSubmittingExitType(false); }
  };

  const handleEditExitType = (type) => { setNewExitType(type.name); setEditingExitType(type); };
  
  const handleUpdateExitType = async () => {
    if (!newExitType.trim() || !editingExitType) { return; }
    setSubmittingExitType(true); setSubmitExitTypeError(null);
    try {
      await axiosInstance.patch(`${EXIT_TYPE_API_URL}${editingExitType.id}/`, { category_name: newExitType.trim() });
      Swal.fire({ icon: 'success', title: 'Success', text: 'Exit type updated successfully!', timer: 2000, showConfirmButton: false });
      setNewExitType("");
      setEditingExitType(null);
      fetchExitTypes();
    } catch (error) {
      console.error("Failed to update exit type:", error.response?.data || error.message);
      setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || "Failed to update exit type.");
    } finally {
      setSubmittingExitType(false);
    }
  };

  const handleDeleteExitType = (id) => {
    Swal.fire({
      title: 'Are you sure?', text: 'This will delete the exit type.', icon: 'warning',
      showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`${EXIT_TYPE_API_URL}${id}/`);
          Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The exit type has been deleted.', timer: 2000, showConfirmButton: false });
          fetchExitTypes();
        } catch (error) {
          console.error("Failed to delete exit type:", error.response?.data || error.message);
          Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete exit type.' });
        }
      }
    });
  };
  
  const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };
  const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setEditingExitType(null); setSubmitExitTypeError(null); };
  
  const filteredEmployeeExits = useMemo(() => employeeExits.filter(exit =>
    (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [employeeExits, searchTerm]);

  const sortedAndFilteredExitTypes = useMemo(() => {
    let items = [...exitTypes]
      .filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));
    if (exitTypeSortConfig.key) {
      items.sort((a, b) => {
        const valA = a[exitTypeSortConfig.key] || ''; const valB = b[exitTypeSortConfig.key] || '';
        if (valA < valB) return exitTypeSortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return exitTypeSortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleExitTypeSort = (key) => {
    let direction = 'asc';
    if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }
    setExitTypeSortConfig({ key, direction });
  };
  
  const ExitCard = ({ exit, index }) => (
    <Card sx={{ mb: 2 }} elevation={2}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {exit.employee_name}
            </Typography>
            {getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}
          </Box>
          <Divider />
          <Box>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Sr. No:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{page * rowsPerPage + index + 1}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Exit Type:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{exit.exit_type_name}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Exit Date:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exit.exit_date)}</Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
        <Tooltip title="Edit"><IconButton onClick={() => handleOpenEditDialog(exit)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
        <Tooltip title="Delete"><IconButton onClick={() => handleDeleteExit(exit.exit_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
      </CardActions>
    </Card>
  );

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
        Employee Exits
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button variant="contained" onClick={() => { setOpenAddExitDialog(true); setNewEmployeeExit(initialEmployeeExitState); }} sx={purpleButtonSx} startIcon={<AddIcon />}>Add New Exit</Button>
          <Button variant="contained" onClick={() => { }} sx={purpleButtonSx} startIcon={<DownloadIcon />}>Export</Button>
          <Button variant="contained" onClick={() => setOpenAddExitTypeDialog(true)} sx={purpleButtonSx}>Create Exit Types</Button>
        </Box>
        <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: isMobile ? "100%" : "auto" }}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
        />
      </Box>

      {isMobile ? (
        <Box>
          {loadingExits ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : (
            (rowsPerPage > 0 ? filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredEmployeeExits)
            .map((exit, index) => <ExitCard key={exit.exit_id} exit={exit} index={index} />)
          )}
          {filteredEmployeeExits.length === 0 && !loadingExits && (
              <Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No employee exits found.</Typography>
          )}
        </Box>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow sx={{ bgcolor: themePurple }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><PersonIcon sx={{ verticalAlign: 'middle', mr: 0.5, fontSize: '1.1rem' }} />EMPLOYEE</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EXIT TYPE</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 0.5, fontSize: '1.1rem' }} />EXIT DATE</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingExits ? (
                Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
                  </TableRow>
                ))
              ) : exitError ? (<TableRow><TableCell colSpan={6} align="center" sx={{ color: 'error.main', p: 4 }}>{exitError}</TableCell></TableRow>
              ) : (rowsPerPage > 0 ? filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredEmployeeExits)
              .map((exit, index) => (
                <TableRow key={exit.exit_id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{exit.employee_name}</TableCell>
                  <TableCell>{exit.exit_type_name}</TableCell>
                  <TableCell>{formatDate(exit.exit_date)}</TableCell>
                  <TableCell>{getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      <Tooltip title="Edit"><IconButton onClick={() => handleOpenEditDialog(exit)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton onClick={() => handleDeleteExit(exit.exit_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEmployeeExits.length === 0 && !loadingExits && (
                <TableRow><TableCell colSpan={6} align="center" sx={{ p: 4 }}>No employee exits found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControl variant="outlined" size="small">
                <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: themePurple, color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: themePurpleHover }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                  {[10, 25, 50, 100].map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
                </Select>
              </FormControl>
              <Typography variant="body2" color="text.secondary">
                {`Showing ${filteredEmployeeExits.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filteredEmployeeExits.length)} of ${filteredEmployeeExits.length} entries`}
              </Typography>
            </Box>

            <Pagination
              count={Math.ceil(filteredEmployeeExits.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton
              sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: themeOrange, color: 'white' }}, '& .MuiPaginationItem-page': { color: themePurple, '&.Mui-selected': { backgroundColor: themePurple, color: 'white', '&:hover': { backgroundColor: themeOrange }}}, '& .MuiPaginationItem-icon': { color: themePurple }}}
            />
          </Box>
      </Box>

      <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: themePurple, fontWeight: "bold", fontSize: '2rem' }}>
          {newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}
          <IconButton onClick={handleCloseEmployeeExitDialog} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>
                    <InputLabel id="employee-label">Employee</InputLabel>
                    <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, employeeId: e.target.value }))}>
                      <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading..." : employeesDropdownError || "Select Employee"}</em></MenuItem>
                      {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required disabled={loadingExitTypes}>
                    <InputLabel id="exit-type-label">Exit Type</InputLabel>
                    <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>
                      <MenuItem value=""><em>{loadingExitTypes ? "Loading..." : exitTypesError || "Select Exit Type"}</em></MenuItem>
                      {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Description / Reason" fullWidth multiline rows={4} placeholder="Enter description..." value={newEmployeeExit.description} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, description: e.target.value }))} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseEmployeeExitDialog} disabled={isSubmittingEmployeeExit} sx={cancelButtonSx}>Cancel</Button>
          <Button onClick={handleSubmitEmployeeExit} variant="contained" disabled={isSubmittingEmployeeExit} sx={purpleButtonSx}>
            {isSubmittingEmployeeExit ? <CircularProgress size={24} color="inherit" /> : newEmployeeExit.currentEditingId ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: themePurple, fontWeight: "bold", fontSize: '2rem' }}>
          Create Exit Types
          <IconButton onClick={handleCloseExitTypeDialog} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ mt: 0.1 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>{editingExitType ? 'Edit Exit Type' : 'Add New Exit Type'}</Typography>
              <TextField required fullWidth label="Exit Type Name" placeholder="Enter name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError} sx={{ mb: 2 }} />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                {editingExitType && <Button sx={cancelButtonSx} onClick={() => { setEditingExitType(null); setNewExitType(''); setSubmitExitTypeError(null);}}>Cancel</Button>}
                <Button sx={purpleButtonSx} variant="contained" onClick={editingExitType ? handleUpdateExitType : handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>
                  {submittingExitType ? <CircularProgress size={24} color="inherit" /> : editingExitType ? "Update" : "Save"}
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{sm: 'center'}} spacing={2} sx={{ mb: 2 }}>
                <Typography variant="h6">Existing Exit Types</Typography>
                <TextField size="small" placeholder="Search types..." value={exitTypeSearchTerm} onChange={e => setExitTypeSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }} sx={{ width: { xs: "100%", sm: 250 } }}/>
              </Stack>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: themePurple }}>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                        <TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.direction} onClick={() => handleExitTypeSort('name')} sx={{ '& .MuiTableSortLabel-icon': { color: 'white !important' }}}>EXIT TYPE</TableSortLabel>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                        <TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.direction} onClick={() => handleExitTypeSort('createdAt')} sx={{ '& .MuiTableSortLabel-icon': { color: 'white !important' }}}>CREATED AT</TableSortLabel>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loadingExitTypes ? Array.from(new Array(5)).map((_, i) => <TableRow key={i}><TableCell colSpan={3}><Skeleton/></TableCell></TableRow>)
                      : sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage)
                      .map((type) => (
                        <TableRow key={type.id} hover>
                          <TableCell>{type.name}</TableCell>
                          <TableCell>{type.createdAt}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Edit"><IconButton size="small" onClick={() => handleEditExitType(type)} sx={{ color: themePurple }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                            <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDeleteExitType(type.id)} sx={{ color: themeOrange }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NewExit;