// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import {
//   Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Select, MenuItem, Grid, Tooltip, IconButton, Dialog,
//   DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Chip,
//   ThemeProvider, createTheme, Divider
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
 
// // --- THEME DEFINITION ---
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#7C3AED',
//       dark: '#6D28D9',
//     },
//     warning: {
//       main: '#f59e0b',
//     },
//     error: {
//       main: '#ef4444',
//     },
//     background: {
//       default: '#f4f6f8',
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: 'white',
//         }
//       }
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           fontWeight: '600',
//           backgroundColor: '#f9fafb',
//           color: '#374151',
//           textTransform: 'uppercase',
//           fontSize: '0.75rem',
//         },
//       },
//     },
//     MuiPaper: {
//         styleOverrides: {
//             root: {
//                 borderRadius: '8px',
//             }
//         }
//     }
//   }
// });
 
// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ resignationDate: null, resignationReason: '' });
//   const [refreshKey, setRefreshKey] = useState(0);
 
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedResignation, setSelectedResignation] = useState(null);
//   const [newStatus, setNewStatus] = useState("");
 
//   const employeeId = localStorage.getItem("loggedInUser");
 
//   // === DATA FETCHING ===
//   const fetchAllResignations = useCallback(() => {
//     axios.get("https://tdtlworld.com/hrms-backend/resignations/")
//       .then(res => setResignations(Array.isArray(res.data) ? res.data : []))
//       .catch(err => { console.error("Error fetching all resignations:", err); setResignations([]); });
//   }, []);
 
//   useEffect(() => { fetchAllResignations(); }, [fetchAllResignations, refreshKey]);
 
//   // === FORM LOGIC ===
//   const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
//   const handleResetForm = () => setFormData({ resignationDate: null, resignationReason: '' });
 
//   const handleSubmitNewResignation = async (e) => {
//     e.preventDefault();
//     if (!formData.resignationDate || !formData.resignationReason) {
//       alert("Please fill in all required fields.");
//       return;
//     }
 
//     const payload = {
//       employee_id: employeeId,
//       resignation_date: formData.resignationDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
//       reason: formData.resignationReason,
//       status: "Pending" // Default status for new resignation
//     };
 
//     try {
//       await axios.post("https://tdtlworld.com/hrms-backend/resignations/", payload);
//       alert("Resignation submitted successfully!");
//       handleResetForm();
//       setShowForm(false);
//       setRefreshKey(prev => prev + 1); // Trigger re-fetch
//     } catch (err) {
//       console.error("Error submitting resignation:", err);
//       alert("Failed to submit resignation. Please try again.");
//     }
//   };
 
//   // === DIALOG LOGIC ===
//   const handleEditClick = (resignation) => {
//     setSelectedResignation(resignation);
//     setNewStatus(resignation.status || "");
//     setIsDialogOpen(true);
//   };
 
//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedResignation(null);
//     setNewStatus("");
//   };
 
//   const handleUpdateStatus = async () => {
//     if (!selectedResignation || !newStatus) return;
 
//     try {
//       await axios.put(`https://tdtlworld.com/hrms-backend/resignations/${selectedResignation.resignation_id}/`, {
//         ...selectedResignation, // Send existing data
//         status: newStatus, // Update only the status
//         // Ensure date is in correct format if you're sending back the full object
//         resignation_date: selectedResignation.resignation_date || selectedResignation.notice_date,
//       });
//       alert("Resignation status updated successfully!");
//       handleCloseDialog();
//       setRefreshKey(prev => prev + 1); // Trigger re-fetch
//     } catch (err) {
//       console.error("Error updating resignation status:", err);
//       alert("Failed to update status. Please try again.");
//     }
//   };
 
//   // Helper to get styling for status Chips
//   const getStatusChipProps = (status) => {
//     const s = status?.toLowerCase();
//     const props = { label: status || 'N/A', size: 'small' };
//     if (s === "approved") {
//       props.sx = { backgroundColor: '#7C3AED', color: 'white', fontWeight: 'bold' };
//     } else if (s === "pending") {
//       props.color = "warning";
//       props.variant = "outlined";
//     } else if (s === "reject" || s === "rejected") {
//       props.color = "error";
//     } else {
//       props.color = "default";
//       props.variant = "outlined";
//     }
//     return props;
//   };
 
//   // Logic for disabling the "Add My Resignation" button
//   const isAddButtonDisabled = resignations.some(r =>
//     String(r.employee_id) === String(employeeId) &&
//     (r.status?.toLowerCase() === 'pending' || r.status?.toLowerCase() === 'approved')
//   );
 
//   return (
//     <ThemeProvider theme={theme}>
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'background.default', minHeight: '100vh' }}>
//           <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
//             {/* Header with Add Button */}
//             <Box sx={{
//               display: 'flex',
//               flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens, row on larger
//               justifyContent: 'space-between',
//               alignItems: { xs: 'flex-start', sm: 'center' }, // Align items
//               mb: 3,
//               gap: { xs: 2, sm: 0 } // Space between items when stacked
//             }}>
//               <Typography variant="h5" fontWeight="bold">Resignation Management</Typography>
//               <Tooltip title={isAddButtonDisabled ? "You cannot submit a new resignation while one is pending or approved." : "Submit your resignation"}>
//                 <span>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<AddIcon />}
//                     onClick={() => {
//                       setShowForm(!showForm);
//                       handleResetForm();
//                     }}
//                     disabled={isAddButtonDisabled}
//                     sx={{ width: { xs: '100%', sm: 'auto' } }} // Full width on small screens
//                   >
//                     {showForm ? 'Cancel' : 'Add My Resignation'}
//                   </Button>
//                 </span>
//               </Tooltip>
//             </Box>
 
//             {/* Resignation Submission Form */}
//             {showForm && (
//               <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 3, backgroundColor: '#fdfdfd' }}>
//                 <Typography variant="h6" gutterBottom>Submit My Resignation</Typography>
//                 <form onSubmit={handleSubmitNewResignation}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} md={6}> {/* DatePicker takes full width on small, half on medium+ */}
//                       <DatePicker
//                         label="Resignation Date"
//                         value={formData.resignationDate}
//                         onChange={(date) => handleInputChange('resignationDate', date)}
//                         renderInput={(params) => <TextField {...params} fullWidth required />}
//                       />
//                     </Grid>
//                     <Grid item xs={12}> {/* Reason TextField always takes full width */}
//                       <TextField fullWidth required label="Resignation Reason" multiline rows={4} value={formData.resignationReason} onChange={(e) => handleInputChange('resignationReason', e.target.value)} />
//                     </Grid>
//                   </Grid>
//                   <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//                     <Button onClick={handleResetForm} color="inherit">Reset</Button>
//                     <Button type="submit" variant="contained" color="primary">Submit</Button>
//                   </Box>
//                 </form>
//               </Paper>
//             )}
 
//             {/* All Resignation Requests Table */}
//             <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>All Resignation Requests</Typography>
//             <TableContainer component={Paper} elevation={1}> {/* Use paper for table container elevation */}
//               <Table aria-label="resignation requests table">
//                 <TableHead>
//                   <TableRow>
//                     {/* Adjust TableCell widths if needed or let them flow naturally */}
//                     <TableCell>Employee Name</TableCell>
//                     <TableCell>Notice Date</TableCell>
//                     <TableCell>Reason</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell align="center">Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {resignations.length === 0 ? (
//                     <TableRow><TableCell colSpan={5} align="center" sx={{py: 4}}>No resignation requests found.</TableCell></TableRow>
//                   ) : (
//                     resignations.map((resignation) => (
//                       <TableRow key={resignation.resignation_id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                         <TableCell>{resignation.employee_name || "N/A"}</TableCell>
//                         <TableCell>{resignation.notice_date || resignation.resignation_date}</TableCell>
//                         <TableCell>{resignation.reason}</TableCell>
//                         <TableCell>
//                           <Chip {...getStatusChipProps(resignation.status)} />
//                         </TableCell>
//                         <TableCell align="center">
//                           <Tooltip title="Update Status">
//                             <IconButton onClick={() => handleEditClick(resignation)} color="primary" size="small">
//                               <EditIcon />
//                             </IconButton>
//                           </Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
 
//           {/* === ADMIN EDIT DIALOG === */}
//           <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="xs">
//             <DialogTitle fontWeight="bold">Update Resignation Status</DialogTitle>
//             <Divider />
//             <DialogContent>
//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <InputLabel>Status</InputLabel>
//                 <Select label="Status" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
//                   <MenuItem value="Approved">Approved</MenuItem>
//                   <MenuItem value="Pending">Pending</MenuItem>
//                   <MenuItem value="Reject">Rejected</MenuItem>
//                 </Select>
//               </FormControl>
//             </DialogContent>
//             <DialogActions sx={{ p: 2 }}>
//               <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
//               <Button variant="contained" color="primary" onClick={handleUpdateStatus}>Update</Button>
//             </DialogActions>
//           </Dialog>
//         </Box>
//       </LocalizationProvider>
//     </ThemeProvider>
//   );
// }









//  import React, { useState, useEffect, useCallback } from 'react';

// import axios from 'axios';

// import Swal from 'sweetalert2'; // Import SweetAlert2

// import {

//   Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,

//   TableHead, TableRow, Select, MenuItem, Grid, Tooltip, IconButton, Dialog,

//   DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Chip,

//   ThemeProvider, createTheme, Divider, TablePagination

// } from '@mui/material';

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

// import { Add as AddIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';

 

// // --- THEME DEFINITION ---

// const theme = createTheme({

//   palette: {

//     primary: {

//       main: '#7C3AED',

//       dark: '#6D28D9',

//     },

//     warning: {

//       main: '#f59e0b',

//     },

//     error: {

//       main: '#ef4444',

//     },

//     background: {

//       default: '#f4f6f8',

//     },

//   },

//   components: {

//     MuiButton: {

//       styleOverrides: {

//         containedPrimary: {

//           color: 'white',

//         }

//       }

//     },

//     MuiTableCell: {

//       styleOverrides: {

//         head: {

//           fontWeight: '600',

//           backgroundColor: '#f9fafb',

//           color: '#374151',

//           textTransform: 'uppercase',

//           fontSize: '0.75rem',

//         },

//       },

//     },

//     MuiPaper: {

//       styleOverrides: {

//         root: {

//           borderRadius: '8px',

//         }

//       }

//     },

//     MuiTablePagination: {

//       styleOverrides: {

//         toolbar: {

//           // Adjust padding and justify content for responsiveness

//           paddingLeft: '16px',

//           paddingRight: '16px',

//           '@media (max-width:600px)': {

//             flexDirection: 'column',

//             alignItems: 'center',

//             '& > *': {

//               marginBottom: '8px', // Add space between elements when stacked

//             },

//           },

//         },

//         // Hide the default select and its label entirely if we're using a custom one

//         selectLabel: {

//           display: 'none',

//         },

//         select: {

//           display: 'none',

//         },

//         actions: {

//           '@media (max-width:600px)': {

//             marginLeft: 'auto', // Keep pagination controls to the right on small screens if possible

//             marginRight: 'auto',

//           },

//         },

//       },

//     },

//   }

// });

 

// export default function ResignationManagement() {

//   const [resignations, setResignations] = useState([]);

//   const [showForm, setShowForm] = useState(false);

//   const [formData, setFormData] = useState({ resignationDate: null, resignationReason: '' });

//   const [refreshKey, setRefreshKey] = useState(0);

 

//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const [selectedResignation, setSelectedResignation] = useState(null);

//   const [newStatus, setNewStatus] = useState("");

 

//   // Pagination and Search State

//   const [page, setPage] = useState(0);

//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [searchTerm, setSearchTerm] = useState('');

 

//   const employeeId = localStorage.getItem("loggedInUser");

 

//   // === DATA FETCHING ===

//   const fetchAllResignations = useCallback(() => {

//     axios.get("https://tdtlworld.com/hrms-backend/resignations/")

//       .then(res => setResignations(Array.isArray(res.data) ? res.data : []))

//       .catch(err => { console.error("Error fetching all resignations:", err); setResignations([]); });

//   }, []);

 

//   useEffect(() => { fetchAllResignations(); }, [fetchAllResignations, refreshKey]);

 

//   // === FORM LOGIC ===

//   const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

//   const handleResetForm = () => setFormData({ resignationDate: null, resignationReason: '' });

 

//   const handleSubmitNewResignation = async (e) => {

//     e.preventDefault();

//     if (!formData.resignationDate || !formData.resignationReason) {

//       Swal.fire({

//         icon: 'warning',

//         title: 'Missing Information',

//         text: 'Please fill in both the resignation date and reason.',

//       });

//       return;

//     }

 

//     const payload = {

//       employee_id: employeeId,

//       resignation_date: formData.resignationDate.toISOString().split('T')[0], // Format to YYYY-MM-DD

//       reason: formData.resignationReason,

//       status: "Pending" // Default status for new resignation

//     };

 

//     try {

//       await axios.post("https://tdtlworld.com/hrms-backend/resignations/", payload);

//       Swal.fire({

//         icon: 'success',

//         title: 'Resignation Submitted!',

//         text: 'Your resignation request has been successfully submitted and is awaiting approval.',

//         showConfirmButton: false,

//         timer: 2000

//       });

//       handleResetForm();

//       setShowForm(false);

//       setRefreshKey(prev => prev + 1); // Trigger re-fetch

//     } catch (err) {

//       console.error("Error submitting resignation:", err);

//       Swal.fire({

//         icon: 'error',

//         title: 'Submission Failed',

//         text: 'Failed to submit resignation. Please try again or contact support.',

//       });

//     }

//   };

 

//   // === DIALOG LOGIC ===

//   const handleEditClick = (resignation) => {

//     setSelectedResignation(resignation);

//     setNewStatus(resignation.status || "");

//     setIsDialogOpen(true);

//   };

 

//   const handleCloseDialog = () => {

//     setIsDialogOpen(false);

//     setSelectedResignation(null);

//     setNewStatus("");

//   };

 

//   const handleUpdateStatus = async () => {

//     if (!selectedResignation || !newStatus) {

//       Swal.fire({

//         icon: 'warning',

//         title: 'No Status Selected',

//         text: 'Please select a new status to update.',

//       });

//       return;

//     }

 

//     try {

//       await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${selectedResignation.resignation_id}/`, {

//         ...selectedResignation, // Send existing data

//         status: newStatus, // Update only the status

//         // Ensure date is in correct format if you're sending back the full object

//         resignation_date: selectedResignation.resignation_date || selectedResignation.notice_date,

//       });

//       Swal.fire({

//         icon: 'success',

//         title: 'Status Updated!',

//         text: 'Resignation status has been successfully updated.',

//         showConfirmButton: false,

//         timer: 2000

//       });

//       handleCloseDialog();

//       setRefreshKey(prev => prev + 1); // Trigger re-fetch

//     } catch (err) {

//       console.error("Error updating resignation status:", err);

//       Swal.fire({

//         icon: 'error',

//         title: 'Update Failed',

//         text: 'Failed to update resignation status. Please try again or contact support.',

//       });

//     }

//   };

 

//   // Helper to get styling for status Chips

//   const getStatusChipProps = (status) => {

//     const s = status?.toLowerCase();

//     const props = { label: status || 'N/A', size: 'small' };

//     if (s === "approved") {

//       props.sx = { backgroundColor: '#7C3AED', color: 'white', fontWeight: 'bold' };

//     } else if (s === "pending") {

//       props.color = "warning";

//       props.variant = "outlined";

//     } else if (s === "reject" || s === "rejected") {

//       props.color = "error";

//     } else {

//       props.color = "default";

//       props.variant = "outlined";

//     }

//     return props;

//   };

 

//   // Logic for disabling the "Add My Resignation" button

//   const isAddButtonDisabled = resignations.some(r =>

//     String(r.employee_id) === String(employeeId) &&

//     (r.status?.toLowerCase() === 'pending' || r.status?.toLowerCase() === 'approved')

//   );

 

//   // === SEARCH & PAGINATION LOGIC ===

//   const filteredResignations = resignations.filter(resignation => {

//     const searchLower = searchTerm.toLowerCase();

//     return (

//       resignation.employee_name?.toLowerCase().includes(searchLower) ||

//       resignation.reason?.toLowerCase().includes(searchLower) ||

//       resignation.status?.toLowerCase().includes(searchLower) ||

//       resignation.notice_date?.toLowerCase().includes(searchLower) ||

//       resignation.resignation_date?.toLowerCase().includes(searchLower)

//     );

//   });

 

//   const handleChangePage = (event, newPage) => {

//     setPage(newPage);

//   };

 

//   const handleChangeRowsPerPage = (event) => {

//     setRowsPerPage(parseInt(event.target.value, 10));

//     setPage(0); // Reset to the first page when rows per page changes

//   };

 

//   // Slice the filtered resignations array for the current page

//   const paginatedResignations = filteredResignations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

 

//   return (

//     <ThemeProvider theme={theme}>

//       <LocalizationProvider dateAdapter={AdapterDateFns}>

//         <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'background.default', minHeight: '100vh' }}>

//           <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>

//             {/* Header with Add Button */}

//             <Box sx={{

//               display: 'flex',

//               flexDirection: { xs: 'column', sm: 'row' },

//               justifyContent: 'space-between',

//               alignItems: { xs: 'flex-start', sm: 'center' },

//               mb: 3,

//               gap: { xs: 2, sm: 0 }

//             }}>

//               <Typography variant="h5" fontWeight="bold">Resignation Management</Typography>

//               <Tooltip title={isAddButtonDisabled ? "You cannot submit a new resignation while one is pending or approved." : "Submit your resignation"}>

//                 <span>

//                   <Button

//                     variant="contained"

//                     color="primary"

//                     startIcon={<AddIcon />}

//                     onClick={() => {

//                       setShowForm(!showForm);

//                       handleResetForm();

//                     }}

//                     disabled={isAddButtonDisabled}

//                     sx={{ width: { xs: '100%', sm: 'auto' } }}

//                   >

//                     {showForm ? 'Cancel' : 'Add My Resignation'}

//                   </Button>

//                 </span>

//               </Tooltip>

//             </Box>

 

//             {/* Resignation Submission Form */}

//             {showForm && (

//               <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 3, backgroundColor: '#fdfdfd' }}>

//                 <Typography variant="h6" gutterBottom>Submit My Resignation</Typography>

//                 <form onSubmit={handleSubmitNewResignation}>

//                   <Grid container spacing={2}>

//                     <Grid item xs={12} md={6}> {/* Full width on small screens, half on medium+ */}

//                       <DatePicker

//                         label="Resignation Date"

//                         value={formData.resignationDate}

//                         onChange={(date) => handleInputChange('resignationDate', date)}

//                         renderInput={(params) => <TextField {...params} fullWidth required />}

//                       />

//                     </Grid>

//                     <Grid item xs={12}>

//                       <TextField fullWidth required label="Resignation Reason" multiline rows={4} value={formData.resignationReason} onChange={(e) => handleInputChange('resignationReason', e.target.value)} />

//                     </Grid>

//                   </Grid>

//                   <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>

//                     <Button onClick={handleResetForm} color="inherit">Reset</Button>

//                     <Button type="submit" variant="contained" color="primary">Submit</Button>

//                   </Box>

//                 </form>

//               </Paper>

//             )}

 

//             {/* All Resignation Requests Table */}

//             <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>All Resignation Requests</Typography>

 

//             {/* Top Bar for Search and Show Entries */}

//             <Box sx={{

//               display: 'flex',

//               flexDirection: { xs: 'column', sm: 'row' },

//               justifyContent: 'space-between',

//               alignItems: { xs: 'flex-start', sm: 'center' },

//               mb: 2,

//               gap: { xs: 2, sm: 0 }

//             }}>

//               {/* Show Entries Dropdown */}

//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

//                 <Typography variant="body2" color="textSecondary">Show</Typography>

//                 <FormControl size="small" sx={{ minWidth: 70 }}>

//                   <Select

//                     value={rowsPerPage}

//                     onChange={handleChangeRowsPerPage}

//                     displayEmpty

//                     inputProps={{ 'aria-label': 'rows per page' }}

//                   >

//                     <MenuItem value={5}>5</MenuItem>

//                     <MenuItem value={10}>10</MenuItem>

//                     <MenuItem value={25}>25</MenuItem>

//                     <MenuItem value={50}>50</MenuItem>

//                   </Select>

//                 </FormControl>

//                 <Typography variant="body2" color="textSecondary">entries</Typography>

//               </Box>

//               {/* Search Input */}

//               <TextField

//                 size="small"

//                 placeholder="Search employees..."

//                 value={searchTerm}

//                 onChange={(e) => {

//                   setSearchTerm(e.target.value);

//                   setPage(0); // Reset page to 0 on search

//                 }}

//                 InputProps={{

//                   startAdornment: (

//                     <SearchIcon color="action" sx={{ mr: 1 }} />

//                   ),

//                 }}

//                 sx={{ width: { xs: '100%', sm: '200px' } }}

//               />

//             </Box>

 

//             <TableContainer component={Paper} elevation={1}>

//               <Table aria-label="resignation requests table">

//                 <TableHead>

//                   <TableRow>

//                     <TableCell sx={{ width: { xs: 'auto', sm: '50px' } }}>Sr. No.</TableCell> {/* Responsive width */}

//                     <TableCell>Employee Name</TableCell>

//                     <TableCell>Notice Date</TableCell>

//                     <TableCell>Reason</TableCell>

//                     <TableCell>Status</TableCell>

//                     <TableCell align="center">Action</TableCell>

//                   </TableRow>

//                 </TableHead>

//                 <TableBody>

//                   {paginatedResignations.length === 0 && filteredResignations.length === 0 ? (

//                     <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4 }}>No resignation requests found.</TableCell></TableRow>

//                   ) : paginatedResignations.length === 0 ? (

//                     <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4 }}>No matching resignations found for your search.</TableCell></TableRow>

//                   ) : (

//                     paginatedResignations.map((resignation, index) => (

//                       <TableRow key={resignation.resignation_id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>

//                         <TableCell>{resignation.employee_name || "N/A"}</TableCell>

//                         <TableCell>{resignation.notice_date || resignation.resignation_date}</TableCell>

//                         <TableCell>{resignation.reason}</TableCell>

//                         <TableCell>

//                           <Chip {...getStatusChipProps(resignation.status)} />

//                         </TableCell>

//                         <TableCell align="center">

//                           <Tooltip title="Update Status">

//                             <IconButton onClick={() => handleEditClick(resignation)} color="primary" size="small">

//                               <EditIcon />

//                             </IconButton>

//                           </Tooltip>

//                         </TableCell>

//                       </TableRow>

//                     ))

//                   )}

//                 </TableBody>

//               </Table>

//             </TableContainer>

 

//             {/* Custom Pagination Display at the bottom */}

//             <Box sx={{

//               display: 'flex',

//               flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens

//               justifyContent: 'space-between',

//               alignItems: { xs: 'flex-start', sm: 'center' }, // Align items to start on small screens

//               mt: 2,

//               gap: { xs: 2, sm: 0 }

//             }}>

//               <Typography variant="body2" color="textSecondary" sx={{ ml: { xs: 0, sm: 2 } }}>

//                 Showing {page * rowsPerPage + (paginatedResignations.length > 0 ? 1 : 0)} to {page * rowsPerPage + paginatedResignations.length} of {filteredResignations.length} records

//               </Typography>

//               <TablePagination

//                 rowsPerPageOptions={[]} // Hide rows per page dropdown here as we have it at the top

//                 component="div"

//                 count={filteredResignations.length}

//                 rowsPerPage={rowsPerPage}

//                 page={page}

//                 onPageChange={handleChangePage}

//                 labelDisplayedRows={() => ''} // Hide the default "X-Y of Z" text

//                 sx={{

//                   '& .MuiTablePagination-toolbar': {

//                     paddingLeft: { xs: 0, sm: 2 },

//                     paddingRight: { xs: 0, sm: 2 },

//                     justifyContent: { xs: 'center', sm: 'flex-end' }, // Center on xs, right on sm+

//                   },

//                   '& .MuiTablePagination-selectLabel, & .MuiTablePagination-select': {

//                     display: 'none', // Hide the select and its label entirely for cleaner separation

//                   },

//                   flexShrink: 0, // Prevent pagination from shrinking on small screens

//                 }}

//               />

//             </Box>

//           </Paper>

 

//           {/* === ADMIN EDIT DIALOG === */}

//           <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="xs">

//             <DialogTitle fontWeight="bold">Update Resignation Status</DialogTitle>

//             <Divider />

//             <DialogContent>

//               <FormControl fullWidth sx={{ mt: 2 }}>

//                 <InputLabel>Status</InputLabel>

//                 <Select label="Status" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>

//                   <MenuItem value="Approved">Approved</MenuItem>

//                   <MenuItem value="Pending">Pending</MenuItem>

//                   <MenuItem value="Reject">Rejected</MenuItem>

//                 </Select>

//               </FormControl>

//             </DialogContent>

//             <DialogActions sx={{ p: 2 }}>

//               <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>

//               <Button variant="contained" color="primary" onClick={handleUpdateStatus}>Update</Button>

//             </DialogActions>

//           </Dialog>

//         </Box>

//       </LocalizationProvider>

//     </ThemeProvider>

//   );

// }














// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import {
//   Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Select, MenuItem, Grid, Tooltip, IconButton, Dialog,
//   DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Chip,
//   ThemeProvider, createTheme, Divider, TablePagination, Skeleton, useMediaQuery, CircularProgress
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Add as AddIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';

// // --- THEME DEFINITION ---
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//       dark: '#6d1d60',
//     },
//     secondary: {
//       main: '#F58E35',
//     },
//     text: {
//       primary: '#333333',
//       secondary: '#666666',
//     },
//     background: {
//       default: '#f4f6f8',
//       paper: '#ffffff',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//     h5: {
//       fontWeight: 'bold',
//       color: '#8C257C',
//     },
//     body2: {
//       fontSize: '0.95rem',
//     }
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
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           backgroundColor: '#8C257C',
//           color: '#FFFFFF',
//           fontWeight: 'bold',
//         },
//       },
//     },
//     MuiTablePagination: {
//         styleOverrides: {
//             selectIcon: {
//                 color: '#8C257C',
//             },
//             actions: {
//                 color: '#8C257C',
//             }
//         }
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: '8px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//         },
//       },
//     },
//   },
// });

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ resignationDate: null, resignationReason: '' });
//   const [refreshKey, setRefreshKey] = useState(0);

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedResignation, setSelectedResignation] = useState(null);
//   const [newStatus, setNewStatus] = useState("");
//   const [isUpdating, setIsUpdating] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   const employeeId = localStorage.getItem("loggedInUser");
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const fetchAllResignations = useCallback(() => {
//     setLoading(true);
//     axios.get("https://tdtlworld.com/hrms-backend/resignations/")
//       .then(res => {
//         setResignations(Array.isArray(res.data) ? res.data : []);
//       })
//       .catch(err => {
//         console.error("Error fetching all resignations:", err);
//         setResignations([]);
//         Swal.fire({
//             icon: 'error',
//             title: 'Fetch Failed',
//             text: 'Could not fetch resignation data from the server.',
//             timer: 3000,
//             showConfirmButton: false,
//         });
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     fetchAllResignations();
//   }, [fetchAllResignations, refreshKey]);

//   const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
//   const handleResetForm = () => setFormData({ resignationDate: null, resignationReason: '' });

//   const handleSubmitNewResignation = async (e) => {
//     e.preventDefault();
//     if (!formData.resignationDate || !formData.resignationReason) {
//       Swal.fire({ icon: 'warning', title: 'Missing Information', text: 'Please fill in both the resignation date and reason.' });
//       return;
//     }

//     const payload = {
//       employee_id: employeeId,
//       resignation_date: formData.resignationDate.toISOString().split('T')[0],
//       reason: formData.resignationReason,
//       status: "Pending"
//     };

//     try {
//       await axios.post("https://tdtlworld.com/hrms-backend/resignations/", payload);
//       Swal.fire({
//         icon: 'success', title: 'Resignation Submitted!',
//         text: 'Your resignation request has been successfully submitted.',
//         timer: 3000, showConfirmButton: false
//       });
//       handleResetForm();
//       setShowForm(false);
//       setRefreshKey(prev => prev + 1);
//     } catch (err) {
//       console.error("Error submitting resignation:", err);
//       Swal.fire({
//         icon: 'error', title: 'Submission Failed',
//         text: 'Failed to submit resignation. Please try again.',
//         timer: 3000, showConfirmButton: false
//       });
//     }
//   };

//   const handleEditClick = (resignation) => {
//     setSelectedResignation(resignation);
//     setNewStatus(resignation.status || "");
//     setIsDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedResignation(null);
//     setNewStatus("");
//   };

//   const handleUpdateStatus = async () => {
//     if (!selectedResignation || !newStatus) {
//       Swal.fire({ icon: 'warning', title: 'No Status Selected', text: 'Please select a new status to update.' });
//       return;
//     }
//     setIsUpdating(true);
//     try {
//       await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${selectedResignation.resignation_id}/`, {
//         status: newStatus,
//       });
//       Swal.fire({
//         icon: 'success', title: 'Status Updated!',
//         text: 'Resignation status has been successfully updated.',
//         timer: 3000, showConfirmButton: false
//       });
//       handleCloseDialog();
//       setRefreshKey(prev => prev + 1);
//     } catch (err) {
//       console.error("Error updating resignation status:", err);
//       Swal.fire({
//         icon: 'error', title: 'Update Failed',
//         text: 'Failed to update resignation status. Please try again.',
//         timer: 3000, showConfirmButton: false
//       });
//     } finally {
//         setIsUpdating(false);
//     }
//   };

//   const getStatusChipProps = (status) => {
//     const s = status?.toLowerCase();
//     const props = { label: status || 'N/A', size: 'small' };
//     if (s === "approved") {
//       props.sx = { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' };
//     } else if (s === "pending") {
//       props.color = "secondary";
//       props.variant = "outlined";
//     } else if (s === "reject" || s === "rejected") {
//       props.color = "error";
//     } else {
//       props.color = "default";
//     }
//     return props;
//   };

//   const isAddButtonDisabled = resignations.some(r =>
//     String(r.employee_id) === String(employeeId) &&
//     (r.status?.toLowerCase() === 'pending' || r.status?.toLowerCase() === 'approved')
//   );

//   const filteredResignations = resignations.filter(resignation => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       resignation.employee_name?.toLowerCase().includes(searchLower) ||
//       resignation.reason?.toLowerCase().includes(searchLower) ||
//       resignation.status?.toLowerCase().includes(searchLower) ||
//       (resignation.notice_date || resignation.resignation_date)?.toLowerCase().includes(searchLower)
//     );
//   });

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const paginatedResignations = filteredResignations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <ThemeProvider theme={theme}>
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Box component={Paper} p={3}>
//             <Typography variant="h4" fontWeight="bold" color="#8C257C" mb={5}>Resignation </Typography>

//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: isMobile ? 'column' : 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 gap: 2,
//                 mb: 2,
//               }}
//             >
//               <Tooltip title={isAddButtonDisabled ? "You cannot submit a new resignation while one is pending or approved." : "Submit your resignation"}>
//                 <span>
//                   <Button
//                     variant="contained"
//                     startIcon={<AddIcon />}
//                     onClick={() => {
//                       setShowForm(!showForm);
//                       handleResetForm();
//                     }}
//                     disabled={isAddButtonDisabled}
//                     sx={{ width: isMobile ? '100%' : 'auto' }}
//                   >
//                     {showForm ? 'Cancel' : 'Add My Resignation'}
//                   </Button>
//                 </span>
//               </Tooltip>
//               <TextField
//                 size="small"
//                 placeholder="Search ..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setPage(0);
//                 }}
//                 InputProps={{ startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> }}
//                 sx={{ width: isMobile ? '100%' : 'auto' }}
//               />
//             </Box>

//             {showForm && (
//               <Paper variant="outlined" sx={{ p: 3, mb: 3, backgroundColor: '#fafafa' }}>
//                 <Typography variant="h6" gutterBottom color="primary">Submit My Resignation</Typography>
//                 <form onSubmit={handleSubmitNewResignation}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} md={6}>
//                       <DatePicker
//                         label="Resignation Date"
//                         value={formData.resignationDate}
//                         onChange={(date) => handleInputChange('resignationDate', date)}
//                         renderInput={(params) => <TextField {...params} fullWidth required />}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField fullWidth required label="Resignation Reason" multiline rows={4} value={formData.resignationReason} onChange={(e) => handleInputChange('resignationReason', e.target.value)} />
//                     </Grid>
//                   </Grid>
//                   <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//                     <Button onClick={handleResetForm} sx={{ color: '#757575' }}>Reset</Button>
//                     <Button type="submit" variant="contained">Submit</Button>
//                   </Box>
//                 </form>
//               </Paper>
//             )}

//             <TableContainer sx={{ whiteSpace: 'nowrap' }}>
//               <Table sx={{ minWidth: '100%' }}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>SR. NO.</TableCell>
//                     <TableCell>EMPLOYEE NAME</TableCell>
//                     <TableCell>NOTICE DATE</TableCell>
//                     <TableCell>REASON</TableCell>
//                     <TableCell>STATUS</TableCell>
//                     <TableCell align="center">ACTION</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                     Array.from(new Array(rowsPerPage)).map((_, index) => (
//                       <TableRow key={index}>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//                       </TableRow>
//                     ))
//                   ) : paginatedResignations.length > 0 ? (
//                     paginatedResignations.map((resignation, index) => (
//                       <TableRow key={resignation.resignation_id} hover>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{resignation.employee_name || "N/A"}</TableCell>
//                         <TableCell>{resignation.notice_date || resignation.resignation_date}</TableCell>
//                         <TableCell>{resignation.reason}</TableCell>
//                         <TableCell><Chip {...getStatusChipProps(resignation.status)} /></TableCell>
//                         <TableCell>
//                            <Box display="flex" justifyContent="center" gap={0.5}>
//                             <Tooltip title="Update Status">
//                                 <IconButton onClick={() => handleEditClick(resignation)} color="primary" size="small">
//                                 <EditIcon />
//                                 </IconButton>
//                             </Tooltip>
//                            </Box>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
//                         <Typography>
//                             {searchTerm ? "No matching resignations found." : "No resignation requests found."}
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: isMobile ? 'column' : 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 mt: 2,
//                 gap: isMobile ? 2 : 0,
//               }}
//             >
//               <Typography variant="body2" color="text.secondary">
//                 Showing {page * rowsPerPage + (paginatedResignations.length > 0 ? 1 : 0)} to {page * rowsPerPage + paginatedResignations.length} of {filteredResignations.length} results
//               </Typography>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredResignations.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </Box>
//           </Box>

//           <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//             <DialogTitle fontWeight="bold" color="primary">Update Resignation Status</DialogTitle>
//             <Divider />
//             <DialogContent>
//               <FormControl fullWidth sx={{ mt: 2 }}>
//                 <InputLabel>Status</InputLabel>
//                 <Select label="Status" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
//                   <MenuItem value="Approved">Approved</MenuItem>
//                   <MenuItem value="Pending">Pending</MenuItem>
//                   <MenuItem value="Reject">Rejected</MenuItem>
//                 </Select>
//               </FormControl>
//             </DialogContent>
//             <DialogActions sx={{ p: '16px 24px' }}>
//               <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>Cancel</Button>
//               <Button
//                 variant="contained"
//                 onClick={handleUpdateStatus}
//                 disabled={isUpdating}
//                 sx={{ minWidth: '80px' }}
//                 >
//                  {isUpdating ? <CircularProgress size={24} color="inherit" /> : "Update"}
//               </Button>
//             </DialogActions>
//           </Dialog>
//       </LocalizationProvider>
//     </ThemeProvider>
//   );
// }








import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Select, MenuItem, Grid, Tooltip, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Chip,
  ThemeProvider, createTheme, Divider, TablePagination, Skeleton, useMediaQuery, CircularProgress
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Add as AddIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';

// --- THEME DEFINITION ---
const theme = createTheme({
  palette: {
    primary: {
      main: '#8C257C',
      dark: '#6d1d60',
    },
    secondary: {
      main: '#F58E35',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 'bold',
      color: '#8C257C',
    },
    body2: {
      fontSize: '0.95rem',
    }
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
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#8C257C',
          color: '#FFFFFF',
          fontWeight: 'bold',
        },
      },
    },
    MuiTablePagination: {
        styleOverrides: {
            selectIcon: {
                color: '#8C257C',
            },
            actions: {
                color: '#8C257C',
            }
        }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default function ResignationManagement() {
  const [resignations, setResignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ resignationDate: null, resignationReason: '' });
  const [refreshKey, setRefreshKey] = useState(0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedResignation, setSelectedResignation] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const employeeId = localStorage.getItem("loggedInUser");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchAllResignations = useCallback(() => {
    setLoading(true);
    axios.get("https://tdtlworld.com/hrms-backend/resignations/")
      .then(res => {
        setResignations(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Error fetching all resignations:", err);
        setResignations([]);
        Swal.fire({
            icon: 'error',
            title: 'Fetch Failed',
            text: 'Could not fetch resignation data from the server.',
            timer: 3000,
            showConfirmButton: false,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAllResignations();
  }, [fetchAllResignations, refreshKey]);

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleResetForm = () => setFormData({ resignationDate: null, resignationReason: '' });

  const handleSubmitNewResignation = async (e) => {
    e.preventDefault();
    if (!formData.resignationDate || !formData.resignationReason) {
      Swal.fire({ icon: 'warning', title: 'Missing Information', text: 'Please fill in both the resignation date and reason.' });
      return;
    }

    const payload = {
      employee_id: employeeId,
      resignation_date: formData.resignationDate.toISOString().split('T')[0],
      reason: formData.resignationReason,
      status: "Pending"
    };

    try {
      await axios.post("https://tdtlworld.com/hrms-backend/resignations/", payload);
      Swal.fire({
        icon: 'success', title: 'Resignation Submitted!',
        text: 'Your resignation request has been successfully submitted.',
        timer: 3000, showConfirmButton: false
      });
      handleResetForm();
      setShowForm(false);
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error("Error submitting resignation:", err);
      Swal.fire({
        icon: 'error', title: 'Submission Failed',
        text: 'Failed to submit resignation. Please try again.',
        timer: 3000, showConfirmButton: false
      });
    }
  };

  const handleEditClick = (resignation) => {
    setSelectedResignation(resignation);
    setNewStatus(resignation.status || "");
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedResignation(null);
    setNewStatus("");
  };

  const handleUpdateStatus = async () => {
    if (!selectedResignation || !newStatus) {
      Swal.fire({ icon: 'warning', title: 'No Status Selected', text: 'Please select a new status to update.' });
      return;
    }
    setIsUpdating(true);
    try {
      await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${selectedResignation.resignation_id}/`, {
        status: newStatus,
      });
      Swal.fire({
        icon: 'success', title: 'Status Updated!',
        text: 'Resignation status has been successfully updated.',
        timer: 3000, showConfirmButton: false
      });
      handleCloseDialog();
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error("Error updating resignation status:", err);
      Swal.fire({
        icon: 'error', title: 'Update Failed',
        text: 'Failed to update resignation status. Please try again.',
        timer: 3000, showConfirmButton: false
      });
    } finally {
        setIsUpdating(false);
    }
  };

  const getStatusChipProps = (status) => {
    const s = status?.toLowerCase();
    const props = { label: status || 'N/A', size: 'small' };
    if (s === "approved") {
      props.sx = { backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold' }; // Changed to green
    } else if (s === "pending") {
      props.color = "secondary";
      props.variant = "outlined";
    } else if (s === "reject" || s === "rejected") {
      props.color = "error";
    } else {
      props.color = "default";
    }
    return props;
  };

  const isAddButtonDisabled = resignations.some(r =>
    String(r.employee_id) === String(employeeId) &&
    (r.status?.toLowerCase() === 'pending' || r.status?.toLowerCase() === 'approved')
  );

  const filteredResignations = resignations.filter(resignation => {
    const searchLower = searchTerm.toLowerCase();
    return (
      resignation.employee_name?.toLowerCase().includes(searchLower) ||
      resignation.reason?.toLowerCase().includes(searchLower) ||
      resignation.status?.toLowerCase().includes(searchLower) ||
      (resignation.notice_date || resignation.resignation_date)?.toLowerCase().includes(searchLower)
    );
  });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedResignations = filteredResignations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box component={Paper} p={3}>
            <Typography variant="h4" fontWeight="bold" color="#8C257C" mb={5}>Resignation </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                mb: 2,
              }}
            >
              <Tooltip title={isAddButtonDisabled ? "You cannot submit a new resignation while one is pending or approved." : "Submit your resignation"}>
                <span>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setShowForm(!showForm);
                      handleResetForm();
                    }}
                    disabled={isAddButtonDisabled}
                    sx={{ width: isMobile ? '100%' : 'auto' }}
                  >
                    {showForm ? 'Cancel' : 'Add New'}
                  </Button>
                </span>
              </Tooltip>
              <TextField
                size="small"
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0);
                }}
                InputProps={{ startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> }}
                sx={{ width: isMobile ? '100%' : 'auto' }}
              />
            </Box>

            {showForm && (
              <Paper variant="outlined" sx={{ p: 3, mb: 3, backgroundColor: '#fafafa' }}>
                <Typography variant="h5" gutterBottom color="primary" sx={{mb: 4}}>Submit My Resignation</Typography>
                <form onSubmit={handleSubmitNewResignation}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <DatePicker
                        label="Resignation Date"
                        value={formData.resignationDate}
                        onChange={(date) => handleInputChange('resignationDate', date)}
                        renderInput={(params) => <TextField {...params} fullWidth required />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth required label="Resignation Reason" multiline rows={4} value={formData.resignationReason} onChange={(e) => handleInputChange('resignationReason', e.target.value)} />
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={handleResetForm} sx={{ color: '#757575' }}>Reset</Button>
                    <Button type="submit" variant="contained">Submit</Button>
                  </Box>
                </form>
              </Paper>
            )}

            <TableContainer sx={{ whiteSpace: 'nowrap' }}>
              <Table sx={{ minWidth: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>SR. NO.</TableCell>
                    <TableCell>EMPLOYEE NAME</TableCell>
                    <TableCell>NOTICE DATE</TableCell>
                    <TableCell>REASON</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell align="center">ACTION</TableCell>
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
                        <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
                      </TableRow>
                    ))
                  ) : paginatedResignations.length > 0 ? (
                    paginatedResignations.map((resignation, index) => (
                      <TableRow key={resignation.resignation_id} hover>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{resignation.employee_name || "N/A"}</TableCell>
                        <TableCell>{resignation.notice_date || resignation.resignation_date}</TableCell>
                        <TableCell>{resignation.reason}</TableCell>
                        <TableCell><Chip {...getStatusChipProps(resignation.status)} /></TableCell>
                        <TableCell>
                           <Box display="flex" justifyContent="center" gap={0.5}>
                            <Tooltip title="Update Status">
                                <IconButton onClick={() => handleEditClick(resignation)} color="primary" size="small">
                                <EditIcon />
                                </IconButton>
                            </Tooltip>
                           </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography>
                            {searchTerm ? "No matching resignations found." : "No resignation requests found."}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                gap: isMobile ? 2 : 0,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Showing {page * rowsPerPage + (paginatedResignations.length > 0 ? 1 : 0)} to {page * rowsPerPage + paginatedResignations.length} of {filteredResignations.length} results
              </Typography>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25]}
                component="div"
                count={filteredResignations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Box>

          <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold" color="primary">Update Resignation Status</DialogTitle>
            <Divider />
            <DialogContent>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select label="Status" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Reject">Rejected</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
              <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleUpdateStatus}
                disabled={isUpdating}
                sx={{ minWidth: '80px' }}
                >
                 {isUpdating ? <CircularProgress size={24} color="inherit" /> : "Update"}
              </Button>
            </DialogActions>
          </Dialog>
      </LocalizationProvider>
    </ThemeProvider>
  );
}