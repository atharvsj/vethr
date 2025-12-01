// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   IconButton,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
// } from '@mui/icons-material';

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     employeeName: '',
//     department: '',
//     resignationDate: null,
//     noticeDate: null,
//     resignationReason: '',
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [resignationToDelete, setResignationToDelete] = useState(null);

//   const departments = ['Integrated Technology Services', 'Human Resources', 'Finance', 'Marketing', 'Operations'];

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleReset = () => {
//     setFormData({
//       employeeName: '',
//       department: '',
//       resignationDate: null,
//       noticeDate: null,
//       resignationReason: '',
//     });
//     setEditingId(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.employeeName || !formData.department || !formData.resignationDate || !formData.noticeDate || !formData.resignationReason) {
//       alert('Please fill in all required fields');
//       return;
//     }
    
//     if (editingId) {
//       setResignations(resignations.map(resignation => 
//         resignation.id === editingId ? { ...resignation, ...formData } : resignation
//       ));
//     } else {
//       const newResignation = {
//         id: Date.now(),
//         ...formData,
//       };
//       setResignations([...resignations, newResignation]);
//     }
    
//     handleReset();
//     setShowForm(false);
//   };

//   const handleEdit = (resignation) => {
//     setFormData({
//       employeeName: resignation.employeeName,
//       department: resignation.department,
//       resignationDate: resignation.resignationDate,
//       noticeDate: resignation.noticeDate,
//       resignationReason: resignation.resignationReason,
//     });
//     setEditingId(resignation.id);
//     setShowForm(true);
//   };

//   const handleDelete = (resignation) => {
//     setResignationToDelete(resignation);
//     setDeleteConfirmOpen(true);
//   };

//   const confirmDelete = () => {
//     setResignations(resignations.filter(resignation => resignation.id !== resignationToDelete.id));
//     setDeleteConfirmOpen(false);
//   };

//   const filteredResignations = resignations.filter(resignation =>
//     Object.values(resignation).some(value =>
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h5">Resignation Management</Typography>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => {
//               setShowForm(!showForm);
//               handleReset();
//             }}
//           >
//             {showForm ? 'Hide Form' : 'Add Resignation'}
//           </Button>
//         </Box>

//         {showForm && (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>{editingId ? 'Edit Resignation' : 'Submit Resignation'}</Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     required
//                     label="Employee Name"
//                     value={formData.employeeName}
//                     onChange={(e) => handleInputChange('employeeName', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth required>
//                     <InputLabel>Department</InputLabel>
//                     <Select
//                       value={formData.department}
//                       onChange={(e) => handleInputChange('department', e.target.value)}
//                       label="Department"
//                     >
//                       {departments.map((dept) => (
//                         <MenuItem key={dept} value={dept}>{dept}</MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <DatePicker
//                     label="Resignation Date"
//                     value={formData.resignationDate}
//                     onChange={(date) => handleInputChange('resignationDate', date)}
//                     renderInput={(params) => <TextField {...params} fullWidth required />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <DatePicker
//                     label="Notice Date"
//                     value={formData.noticeDate}
//                     onChange={(date) => handleInputChange('noticeDate', date)}
//                     renderInput={(params) => <TextField {...params} fullWidth required />}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     required
//                     label="Resignation Reason"
//                     multiline
//                     rows={4}
//                     value={formData.resignationReason}
//                     onChange={(e) => handleInputChange('resignationReason', e.target.value)}
//                   />
//                 </Grid>
//               </Grid>
//               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//                 <Button onClick={handleReset}>Reset</Button>
//                 <Button type="submit" variant="contained">{editingId ? 'Update' : 'Submit'}</Button>
//               </Box>
//             </form>
//           </Paper>
//         )}

//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" gutterBottom>Resignation List</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//               <Select
//                 size="small"
//                 value={entriesPerPage}
//                 onChange={(e) => setEntriesPerPage(e.target.value)}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//               <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//             </Box>
//             <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>EMPLOYEE NAME</TableCell>
//                   <TableCell>DEPARTMENT</TableCell>
//                   <TableCell>RESIGNATION DATE</TableCell>
//                   <TableCell>NOTICE DATE</TableCell>
//                   <TableCell>REASON</TableCell>
//                   <TableCell>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredResignations.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={6} align="center">No records available</TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredResignations.slice(0, entriesPerPage).map((resignation) => (
//                     <TableRow key={resignation.id}>
//                       <TableCell>{resignation.employeeName}</TableCell>
//                       <TableCell>{resignation.department}</TableCell>
//                       <TableCell>{resignation.resignationDate.toLocaleDateString()}</TableCell>
//                       <TableCell>{resignation.noticeDate.toLocaleDateString()}</TableCell>
//                       <TableCell>{resignation.resignationReason}</TableCell>
//                       <TableCell>
//                         <IconButton onClick={() => handleEdit(resignation)} size="small">
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton onClick={() => handleDelete(resignation)} size="small">
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Typography variant="body2">
//               Showing {Math.min(filteredResignations.length, entriesPerPage)} of {resignations.length} entries
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button disabled={true}>Previous</Button>
//               <Button disabled={true}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>

//         <Dialog
//           open={deleteConfirmOpen}
//           onClose={() => setDeleteConfirmOpen(false)}
//         >
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             Are you sure you want to delete this resignation record?
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
//             <Button onClick={confirmDelete} color="error">Delete</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </LocalizationProvider>
//   );
// }












// import React, { useState, useEffect, useCallback } from 'react'; // === CHANGE 1: Import useCallback ===
// import {
//   Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Select, MenuItem, Grid, Tooltip
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Add as AddIcon } from '@mui/icons-material';
// import axios from 'axios';

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     resignationDate: null,
//     resignationReason: '',
//   });

//   // === CHANGE 2: Add a "refresh trigger" state ===
//   // We will change this state to force the useEffect to re-run and fetch data.
//   const [refreshKey, setRefreshKey] = useState(0);

//   const employeeId = localStorage.getItem("loggedInUser");

//   // === CHANGE 3: Centralize the data fetching logic into its own function ===
//   // useCallback ensures this function isn't recreated on every render, which is good practice.
//   const fetchResignations = useCallback(() => {
//     if (!employeeId) return;

//     axios.get(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`)
//       .then(res => {
//         // Ensure we always work with an array, even if the API returns a single object
//         const apiData = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);

//         const transformed = apiData.map((item, idx) => ({
//           // Using item.id from the backend is better if available, otherwise fallback
//           id: item.id || Date.now() + idx,
//           // Properly handle potential invalid dates from API
//           resignationDate: new Date(item.resignation_date.split('-').reverse().join('-')),
//           resignationReason: item.reason,
//           status: item.status || 'Pending'
//         }));
//         setResignations(transformed);
//       })
//       .catch(err => {
//         console.error("Fetch error:", err);
//         // If the fetch fails (e.g., 404 for no resignations), set to an empty array
//         setResignations([]);
//       });
//   }, [employeeId]); // This function depends on employeeId

//   // === CHANGE 4: Update useEffect to use the centralized function and the refresh key ===
//   useEffect(() => {
//     fetchResignations();
//   }, [fetchResignations, refreshKey]); // Re-runs when employeeId changes or when we trigger a refresh

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleReset = () => {
//     setFormData({
//       resignationDate: null,
//       resignationReason: '',
//     });
//   };

//   // === CHANGE 5: Simplify the handleSubmit function ===
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { resignationDate, resignationReason } = formData;

//     if (!resignationDate || !resignationReason) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     // Format date from Date object to 'dd-mm-yyyy' string
//     const formattedDate = resignationDate.toLocaleDateString('en-GB').split('/').join('-');

//     try {
//       await axios.post(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`, {
//         reason: resignationReason,
//         resignation_date: formattedDate,
//       });

//       alert("Resignation submitted successfully.");
//       handleReset();
//       setShowForm(false);

//       // Instead of manually re-fetching, just trigger the useEffect to run again!
//       setRefreshKey(prevKey => prevKey + 1);

//     } catch (error) {
//       console.error("Submit error:", error);
//       alert("Failed to submit resignation.");
//     }
//   };

//   const filteredResignations = resignations.filter(resignation =>
//     Object.values(resignation).some(value =>
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // ✅ CORRECT LOGIC: Disable Add button if ANY status is "Pending" or "Approved"
//   const isAddButtonDisabled = resignations.some(resignation => {
//     const status = resignation.status?.toLowerCase();
//     return status === 'pending' || status === 'approved';
//   });

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h5">Resignation Management</Typography>

//           <Tooltip title={isAddButtonDisabled ? "You cannot add a new resignation while one is pending or approved." : ""}>
//             <span>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => {
//                   setShowForm(!showForm);
//                   handleReset();
//                 }}
//                 disabled={isAddButtonDisabled}
//               >
//                 {showForm ? 'Hide Form' : 'Add Resignation'}
//               </Button>
//             </span>
//           </Tooltip>
//         </Box>

//         {showForm && (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>Submit Resignation</Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <DatePicker
//                     label="Resignation Date"
//                     value={formData.resignationDate}
//                     onChange={(date) => handleInputChange('resignationDate', date)}
//                     renderInput={(params) => <TextField {...params} fullWidth required />}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth required label="Resignation Reason"
//                     multiline rows={4}
//                     value={formData.resignationReason}
//                     onChange={(e) => handleInputChange('resignationReason', e.target.value)}
//                   />
//                 </Grid>
//               </Grid>
//               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//                 <Button onClick={handleReset}>Reset</Button>
//                 <Button type="submit" variant="contained">Submit</Button>
//               </Box>
//             </form>
//           </Paper>
//         )}

//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" gutterBottom>Resignation List</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//               <Select size="small" value={entriesPerPage} onChange={(e) => setEntriesPerPage(e.target.value)}>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//               <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//             </Box>
//             <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Resignation Date</TableCell>
//                   <TableCell>Reason</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredResignations.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">No records available</TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredResignations.slice(0, entriesPerPage).map((resignation) => (
//                     <TableRow key={resignation.id}>
//                       <TableCell>
//                         {resignation.resignationDate instanceof Date
//                           ? resignation.resignationDate.toLocaleDateString('en-GB')
//                           : 'Invalid Date'}
//                       </TableCell>
//                       <TableCell>{resignation.resignationReason}</TableCell>
//                       <TableCell>{resignation.status}</TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Typography variant="body2">
//               Showing {Math.min(filteredResignations.length, entriesPerPage)} of {filteredResignations.length} entries
//             </Typography>
//             {/* Note: Pagination logic is not implemented, just showing disabled buttons */}
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button disabled>Previous</Button>
//               <Button disabled>Next</Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </LocalizationProvider>
//   );
// }













// import React, { useState, useEffect, useCallback } from 'react'; // === CHANGE 1: Import useCallback ===
// import {
//   Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Select, MenuItem, Grid, Tooltip
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Add as AddIcon } from '@mui/icons-material';
// import axios from 'axios';

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     resignationDate: null,
//     resignationReason: '',
//   });

//   // === CHANGE 2: Add a "refresh trigger" state ===
//   // We will change this state to force the useEffect to re-run and fetch data.
//   const [refreshKey, setRefreshKey] = useState(0);

//   const employeeId = localStorage.getItem("loggedInUser");

//   // === CHANGE 3: Centralize the data fetching logic into its own function ===
//   // useCallback ensures this function isn't recreated on every render, which is good practice.
//   const fetchResignations = useCallback(() => {
//     if (!employeeId) return;

//     axios.get(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`)
//       .then(res => {
//         // Ensure we always work with an array, even if the API returns a single object
//         const apiData = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);

//         const transformed = apiData.map((item, idx) => ({
//           // Using item.id from the backend is better if available, otherwise fallback
//           id: item.id || Date.now() + idx,
//           // Properly handle potential invalid dates from API
//           resignationDate: new Date(item.resignation_date.split('-').reverse().join('-')),
//           resignationReason: item.reason,
//           status: item.status || 'Pending'
//         }));
//         setResignations(transformed);
//       })
//       .catch(err => {
//         console.error("Fetch error:", err);
//         // If the fetch fails (e.g., 404 for no resignations), set to an empty array
//         setResignations([]);
//       });
//   }, [employeeId]); // This function depends on employeeId

//   // === CHANGE 4: Update useEffect to use the centralized function and the refresh key ===
//   useEffect(() => {
//     fetchResignations();
//   }, [fetchResignations, refreshKey]); // Re-runs when employeeId changes or when we trigger a refresh

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleReset = () => {
//     setFormData({
//       resignationDate: null,
//       resignationReason: '',
//     });
//   };

//   // === CHANGE 5: Simplify the handleSubmit function ===
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { resignationDate, resignationReason } = formData;

//     if (!resignationDate || !resignationReason) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     // Format date from Date object to 'dd-mm-yyyy' string
//     const formattedDate = resignationDate.toLocaleDateString('en-GB').split('/').join('-');

//     try {
//       await axios.post(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`, {
//         reason: resignationReason,
//         resignation_date: formattedDate,
//       });

//       alert("Resignation submitted successfully.");
//       handleReset();
//       setShowForm(false);

//       // Instead of manually re-fetching, just trigger the useEffect to run again!
//       setRefreshKey(prevKey => prevKey + 1);

//     } catch (error) {
//       console.error("Submit error:", error);
//       alert("Failed to submit resignation.");
//     }
//   };

//   const filteredResignations = resignations.filter(resignation =>
//     Object.values(resignation).some(value =>
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // ✅ CORRECT LOGIC: Disable Add button if ANY status is "Pending" or "Approved"
//   const isAddButtonDisabled = resignations.some(resignation => {
//     const status = resignation.status?.toLowerCase();
//     return status === 'pending' || status === 'approved';
//   });

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h5">Resignation Management</Typography>

//           <Tooltip title={isAddButtonDisabled ? "You cannot add a new resignation while one is pending or approved." : ""}>
//             <span>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => {
//                   setShowForm(!showForm);
//                   handleReset();
//                 }}
//                 disabled={isAddButtonDisabled}
//               >
//                 {showForm ? 'Hide Form' : 'Add Resignation'}
//               </Button>
//             </span>
//           </Tooltip>
//         </Box>

//         {showForm && (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>Submit Resignation</Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
               
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth required label="Resignation Reason"
//                     multiline rows={4}
//                     value={formData.resignationReason}
//                     onChange={(e) => handleInputChange('resignationReason', e.target.value)}
//                   />
//                 </Grid>
//               </Grid>
//               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//                 <Button onClick={handleReset}>Reset</Button>
//                 <Button type="submit" variant="contained">Submit</Button>
//               </Box>
//             </form>
//           </Paper>
//         )}

//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" gutterBottom>Resignation List</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//               <Select size="small" value={entriesPerPage} onChange={(e) => setEntriesPerPage(e.target.value)}>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//               <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//             </Box>
//             <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Resignation Date</TableCell>
//                   <TableCell>Reason</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredResignations.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">No records available</TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredResignations.slice(0, entriesPerPage).map((resignation) => (
//                     <TableRow key={resignation.id}>
//                       <TableCell>
//                         {resignation.resignationDate instanceof Date
//                           ? resignation.resignationDate.toLocaleDateString('en-GB')
//                           : 'Invalid Date'}
//                       </TableCell>
//                       <TableCell>{resignation.resignationReason}</TableCell>
//                       <TableCell>{resignation.status}</TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Typography variant="body2">
//               Showing {Math.min(filteredResignations.length, entriesPerPage)} of {filteredResignations.length} entries
//             </Typography>
//             {/* Note: Pagination logic is not implemented, just showing disabled buttons */}
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button disabled>Previous</Button>
//               <Button disabled>Next</Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </LocalizationProvider>
//   );
// }








// import React, { useState, useEffect, useCallback } from 'react'; // === CHANGE 1: Import useCallback ===
// import {
//   Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Select, MenuItem, Grid, Tooltip
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Add as AddIcon } from '@mui/icons-material';
// import axios from 'axios';

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     resignationDate: null,
//     resignationReason: '',
//   });

//   // === CHANGE 2: Add a "refresh trigger" state ===
//   // We will change this state to force the useEffect to re-run and fetch data.
//   const [refreshKey, setRefreshKey] = useState(0);

//   const employeeId = localStorage.getItem("loggedInUser");

//   // === CHANGE 3: Centralize the data fetching logic into its own function ===
//   // useCallback ensures this function isn't recreated on every render, which is good practice.
//   const fetchResignations = useCallback(() => {
//     if (!employeeId) return;

//     axios.get(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`)
//       .then(res => {
//         // Ensure we always work with an array, even if the API returns a single object
//         const apiData = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);

//         const transformed = apiData.map((item, idx) => ({
//           // Using item.id from the backend is better if available, otherwise fallback
//           id: item.id || Date.now() + idx,
//           // Properly handle potential invalid dates from API
//           resignationDate: new Date(item.resignation_date.split('-').reverse().join('-')),
//           resignationReason: item.reason,
//           status: item.status || 'Pending'
//         }));
//         setResignations(transformed);
//       })
//       .catch(err => {
//         console.error("Fetch error:", err);
//         // If the fetch fails (e.g., 404 for no resignations), set to an empty array
//         setResignations([]);
//       });
//   }, [employeeId]); // This function depends on employeeId

//   // === CHANGE 4: Update useEffect to use the centralized function and the refresh key ===
//   useEffect(() => {
//     fetchResignations();
//   }, [fetchResignations, refreshKey]); // Re-runs when employeeId changes or when we trigger a refresh

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleReset = () => {
//     setFormData({
//       resignationDate: null,
//       resignationReason: '',
//     });
//   };

//   // === CHANGE 5: Simplify the handleSubmit function ===
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { resignationDate, resignationReason } = formData;

//     if (!resignationDate || !resignationReason) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     // Format date from Date object to 'dd-mm-yyyy' string
//     const formattedDate = resignationDate.toLocaleDateString('en-GB').split('/').join('-');

//     try {
//       await axios.post(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`, {
//         reason: resignationReason,
//         resignation_date: formattedDate,
//       });

//       alert("Resignation submitted successfully.");
//       handleReset();
//       setShowForm(false);

//       // Instead of manually re-fetching, just trigger the useEffect to run again!
//       setRefreshKey(prevKey => prevKey + 1);

//     } catch (error) {
//       console.error("Submit error:", error);
//       alert("Failed to submit resignation.");
//     }
//   };

//   const filteredResignations = resignations.filter(resignation =>
//     Object.values(resignation).some(value =>
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // ✅ CORRECT LOGIC: Disable Add button if ANY status is "Pending" or "Approved"
//   const isAddButtonDisabled = resignations.some(resignation => {
//     const status = resignation.status?.toLowerCase();
//     return status === 'pending' || status === 'approved';
//   });

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h5">Resignation Management</Typography>

//           <Tooltip title={isAddButtonDisabled ? "You cannot add a new resignation while one is pending or approved." : ""}>
//             <span>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => {
//                   setShowForm(!showForm);
//                   handleReset();
//                 }}
//                 disabled={isAddButtonDisabled}
//               >
//                 {showForm ? 'Hide Form' : 'Add Resignation'}
//               </Button>
//             </span>
//           </Tooltip>
//         </Box>

//         {showForm && (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>Submit Resignation</Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 {/* <Grid item xs={12} md={6}>
//                   <DatePicker
//                     label="Resignation Date"
//                     value={formData.resignationDate}
//                     onChange={(date) => handleInputChange('resignationDate', date)}
//                     renderInput={(params) => <TextField {...params} fullWidth required />}
//                   />
//                 </Grid> */}
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth required label="Resignation Reason"
//                     multiline rows={4}
//                     value={formData.resignationReason}
//                     onChange={(e) => handleInputChange('resignationReason', e.target.value)}
//                   />
//                 </Grid>
//               </Grid>
//               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//                 <Button onClick={handleReset}>Reset</Button>
//                 <Button type="submit" variant="contained">Submit</Button>
//               </Box>
//             </form>
//           </Paper>
//         )}

//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" gutterBottom>Resignation List</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//               <Select size="small" value={entriesPerPage} onChange={(e) => setEntriesPerPage(e.target.value)}>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//               <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//             </Box>
//             <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Resignation Date</TableCell>
//                   <TableCell>Reason</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredResignations.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">No records available</TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredResignations.slice(0, entriesPerPage).map((resignation) => (
//                     <TableRow key={resignation.id}>
//                       <TableCell>
//                         {resignation.resignationDate instanceof Date
//                           ? resignation.resignationDate.toLocaleDateString('en-GB')
//                           : 'Invalid Date'}
//                       </TableCell>
//                       <TableCell>{resignation.resignationReason}</TableCell>
//                       <TableCell>{resignation.status}</TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Typography variant="body2">
//               Showing {Math.min(filteredResignations.length, entriesPerPage)} of {filteredResignations.length} entries
//             </Typography>
//             {/* Note: Pagination logic is not implemented, just showing disabled buttons */}
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button disabled>Previous</Button>
//               <Button disabled>Next</Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </LocalizationProvider>
//   );
// }





// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Select, MenuItem, Grid, Tooltip
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Add as AddIcon } from '@mui/icons-material';
// import axios from 'axios';

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     resignationDate: null,
//     resignationReason: '',
//   });

//   const [refreshKey, setRefreshKey] = useState(0);

//   // This correctly gets the employee ID (EmID) from local storage
//   const employeeId = localStorage.getItem("loggedInUser");

//   const fetchResignations = useCallback(() => {
//     if (!employeeId) return;

//     // The URL correctly uses the employeeId from local storage
//     axios.get(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`)
//       .then(res => {
//         // === KEY CHANGE IS HERE ===
//         // The API now returns a single object, not an array.
//         // We check if res.data exists and, if so, wrap it in an array.
//         // This ensures the rest of the component, which expects an array, works correctly.
//         const apiData = res.data ? [res.data] : [];

//         const transformed = apiData.map((item, idx) => ({
//           // Using a stable identifier is better, but this is a fallback
//           id: item.employee_id || Date.now() + idx,
//           // Properly handle the 'dd-mm-yyyy' date format from the API
//           resignationDate: new Date(item.resignation_date.split('-').reverse().join('-')),
//           resignationReason: item.reason,
//           status: item.status || 'Pending'
//         }));
//         setResignations(transformed);
//       })
//       .catch(err => {
//         console.error("Fetch error:", err);
//         // If the API returns a 404 (Not Found) or other error, it's caught here.
//         // We correctly set the resignations to an empty array.
//         setResignations([]);
//       });
//   }, [employeeId]); // Dependency array is correct

//   useEffect(() => {
//     fetchResignations();
//   }, [fetchResignations, refreshKey]);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleReset = () => {
//     setFormData({
//       resignationDate: null,
//       resignationReason: '',
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { resignationReason } = formData; // resignationDate is now removed from form

//     if (!resignationReason) {
//       alert('Please fill in the resignation reason');
//       return;
//     }

//     // The backend likely uses the submission date, so we only send the reason
//     // If you need to send a date, re-enable the DatePicker and formatting logic
//     try {
//       // The POST request is assumed to be to the same endpoint
//       await axios.post(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`, {
//         reason: resignationReason,
//         // If the API requires a date on POST, you would add it here
//         // resignation_date: 'some-formatted-date',
//       });

//       alert("Resignation submitted successfully.");
//       handleReset();
//       setShowForm(false);
//       setRefreshKey(prevKey => prevKey + 1);

//     } catch (error) {
//       console.error("Submit error:", error);
//       alert("Failed to submit resignation.");
//     }
//   };

//   const filteredResignations = resignations.filter(resignation =>
//     Object.values(resignation).some(value =>
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const isAddButtonDisabled = resignations.some(resignation => {
//     const status = resignation.status?.toLowerCase();
//     return status === 'pending' || status === 'approved';
//   });

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h5">Resignation Management</Typography>

//           <Tooltip title={isAddButtonDisabled ? "You cannot add a new resignation while one is pending or approved." : ""}>
//             <span>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => {
//                   setShowForm(!showForm);
//                   handleReset();
//                 }}
//                 disabled={isAddButtonDisabled}
//               >
//                 {showForm ? 'Hide Form' : 'Add Resignation'}
//               </Button>
//             </span>
//           </Tooltip>
//         </Box>

//         {showForm && (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>Submit Resignation</Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth required label="Resignation Reason"
//                     multiline rows={4}
//                     value={formData.resignationReason}
//                     onChange={(e) => handleInputChange('resignationReason', e.target.value)}
//                   />
//                 </Grid>
//               </Grid>
//               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//                 <Button onClick={handleReset}>Reset</Button>
//                 <Button type="submit" variant="contained">Submit</Button>
//               </Box>
//             </form>
//           </Paper>
//         )}

//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" gutterBottom>Resignation List</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//               <Select size="small" value={entriesPerPage} onChange={(e) => setEntriesPerPage(e.target.value)}>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//               <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//             </Box>
//             <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Resignation Date</TableCell>
//                   <TableCell>Reason</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredResignations.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">No records available</TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredResignations.slice(0, entriesPerPage).map((resignation) => (
//                     <TableRow key={resignation.id}>
//                       <TableCell>
//                         {resignation.resignationDate instanceof Date && !isNaN(resignation.resignationDate)
//                           ? resignation.resignationDate.toLocaleDateString('en-GB')
//                           : 'Invalid Date'}
//                       </TableCell>
//                       <TableCell>{resignation.resignationReason}</TableCell>
//                       <TableCell>{resignation.status}</TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Typography variant="body2">
//               Showing {Math.min(filteredResignations.length, entriesPerPage)} of {filteredResignations.length} entries
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button disabled>Previous</Button>
//               <Button disabled>Next</Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </LocalizationProvider>
//   );
// }









// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Select, MenuItem, Grid, Tooltip
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { Add as AddIcon } from '@mui/icons-material';
// import axios from 'axios';

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     resignationReason: '',
//   });

//   const [refreshKey, setRefreshKey] = useState(0);

//   const employeeId = localStorage.getItem("loggedInUser");

//   const fetchResignations = useCallback(() => {
//     if (!employeeId) return;

//     axios.get(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`)
//       .then(res => {
//         // === CHANGE 1: Handle direct array response from API ===
//         // The API now returns an array directly, so we ensure we're working with one.
//         const apiData = Array.isArray(res.data) ? res.data : [];

//         const transformed = apiData.map((item, idx) => ({
//           // Using a stable ID from the backend is best, but employee_id + index works as a fallback key
//           id: item.employee_id + idx,
//           // === CHANGE 2: Handle 'YYYY-MM-DD' date format ===
//           // This format can be passed directly to the Date constructor.
//           resignationDate: new Date(item.resignation_date),
//           resignationReason: item.reason,
//           status: item.status || 'Pending'
//         }));
//         setResignations(transformed);
//       })
//       .catch(err => {
//         console.error("Fetch error:", err);
//         // If the fetch fails (e.g., 404), correctly set to an empty array
//         setResignations([]);
//       });
//   }, [employeeId]);

//   useEffect(() => {
//     fetchResignations();
//   }, [fetchResignations, refreshKey]);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleReset = () => {
//     setFormData({
//       resignationReason: '',
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { resignationReason } = formData;

//     if (!resignationReason) {
//       alert('Please fill in the resignation reason');
//       return;
//     }
    
//     try {
//       await axios.post(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`, {
//         reason: resignationReason,
//       });

//       alert("Resignation submitted successfully.");
//       handleReset();
//       setShowForm(false);
//       setRefreshKey(prevKey => prevKey + 1);

//     } catch (error) {
//       console.error("Submit error:", error);
//       alert("Failed to submit resignation.");
//     }
//   };

//   const filteredResignations = resignations.filter(resignation =>
//     Object.values(resignation).some(value =>
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const isAddButtonDisabled = resignations.some(resignation => {
//     const status = resignation.status?.toLowerCase();
//     return status === 'pending' || status === 'approved';
//   });

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h5">Resignation Management</Typography>
//           <Tooltip title={isAddButtonDisabled ? "You cannot add a new resignation while one is pending or approved." : ""}>
//             <span>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => {
//                   setShowForm(!showForm);
//                   handleReset();
//                 }}
//                 disabled={isAddButtonDisabled}
//               >
//                 {showForm ? 'Hide Form' : 'Add Resignation'}
//               </Button>
//             </span>
//           </Tooltip>
//         </Box>

//         {showForm && (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>Submit Resignation</Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth required label="Resignation Reason"
//                     multiline rows={4}
//                     value={formData.resignationReason}
//                     onChange={(e) => handleInputChange('resignationReason', e.target.value)}
//                   />
//                 </Grid>
//               </Grid>
//               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//                 <Button onClick={handleReset}>Reset</Button>
//                 <Button type="submit" variant="contained">Submit</Button>
//               </Box>
//             </form>
//           </Paper>
//         )}

//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" gutterBottom>Resignation List</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//               <Select size="small" value={entriesPerPage} onChange={(e) => setEntriesPerPage(e.target.value)}>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//               <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//             </Box>
//             <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   {/* === CHANGE 3: Add Sr. No. column header === */}
//                   <TableCell>Sr. No.</TableCell>
//                   <TableCell>Resignation Date</TableCell>
//                   <TableCell>Reason</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredResignations.length === 0 ? (
//                   <TableRow>
//                     {/* === CHANGE 4: Update colSpan for the new column === */}
//                     <TableCell colSpan={4} align="center">No records available</TableCell>
//                   </TableRow>
//                 ) : (
//                   // === CHANGE 5: Get the index from .map() for the Sr. No. ===
//                   filteredResignations.slice(0, entriesPerPage).map((resignation, index) => (
//                     <TableRow key={resignation.id}>
//                       {/* === CHANGE 6: Display the Sr. No. (index + 1) === */}
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>
//                         {resignation.resignationDate instanceof Date && !isNaN(resignation.resignationDate)
//                           ? resignation.resignationDate.toLocaleDateString('en-GB')
//                           : 'Invalid Date'}
//                       </TableCell>
//                       <TableCell>{resignation.resignationReason}</TableCell>
//                       <TableCell>{resignation.status}</TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Typography variant="body2">
//               Showing {Math.min(filteredResignations.length, entriesPerPage)} of {filteredResignations.length} entries
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button disabled>Previous</Button>
//               <Button disabled>Next</Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </LocalizationProvider>
//   );
// }













import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Grid, Tooltip, useTheme, useMediaQuery, InputAdornment,
  TablePagination, Skeleton, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ResignationManagement() {
  const [resignations, setResignations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    resignationReason: '',
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const employeeId = localStorage.getItem("loggedInUser");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchResignations = useCallback(() => {
    if (!employeeId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    axios.get(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`)
      .then(res => {
        const apiData = Array.isArray(res.data) ? res.data : [];
        const transformed = apiData.map((item, idx) => ({
          id: item.id || `${item.employee_id}-${idx}`,
          resignationDate: new Date(item.resignation_date),
          resignationReason: item.reason,
          status: item.status || 'Pending'
        }));
        setResignations(transformed);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setResignations([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [employeeId]);

  useEffect(() => {
    fetchResignations();
  }, [fetchResignations, refreshKey]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      resignationReason: '',
    });
  };

  const handleOpenForm = () => {
    handleReset();
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { resignationReason } = formData;

    if (!resignationReason) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in the resignation reason.',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await axios.post(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`, {
        reason: resignationReason,
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Resignation submitted successfully.',
        timer: 3000,
        showConfirmButton: false
      });

      handleCloseForm();
      setRefreshKey(prevKey => prevKey + 1);

    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Failed to submit resignation. Please try again.',
        timer: 3000,
        showConfirmButton: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredResignations = resignations.filter(resignation =>
    Object.values(resignation).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const isAddButtonDisabled = resignations.some(resignation => {
    const status = resignation.status?.toLowerCase();
    return status === 'pending' || status === 'approved';
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component={Paper} p={3}>
        <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 5 }}>
          Resignation 
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
          }}
        >
          <Tooltip title={isAddButtonDisabled ? "You cannot add a new resignation while one is pending or approved." : "Add New Resignation"}>
            <span>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenForm}
                disabled={isAddButtonDisabled}
                sx={{
                  backgroundColor: '#8C257C',
                  color: 'white',
                  '&:hover': { backgroundColor: '#6d1d60' },
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                Add New
              </Button>
            </span>
          </Tooltip>
          <TextField
            size="small"
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
        </Box>

        <Dialog open={showForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
          <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
            Submit Resignation
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth required label="Resignation Reason"
                    multiline rows={4}
                    value={formData.resignationReason}
                    onChange={(e) => handleInputChange('resignationReason', e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm} sx={{ color: '#757575' }}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: '#8C257C',
                color: 'white',
                '&:hover': { backgroundColor: '#6d1d60' },
              }}
            >
              {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#8C257C' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sr. No.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Resignation Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reason</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
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
                  </TableRow>
                ))
              ) : filteredResignations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">No records available</TableCell>
                </TableRow>
              ) : (
                filteredResignations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((resignation, index) => (
                  <TableRow key={resignation.id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      {resignation.resignationDate instanceof Date && !isNaN(resignation.resignationDate)
                        ? resignation.resignationDate.toLocaleDateString('en-GB')
                        : 'Invalid Date'}
                    </TableCell>
                    <TableCell>{resignation.resignationReason}</TableCell>
                    <TableCell>{resignation.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {Math.min(rowsPerPage, filteredResignations.length)} to {Math.min((page + 1) * rowsPerPage, filteredResignations.length)} of {filteredResignations.length} results
          </Typography>
          <TablePagination
            component="div"
            count={filteredResignations.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15, 25]}
            sx={{
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                  color: 'text.secondary',
              },
              '& .MuiSvgIcon-root': {
                  color: '#8C257C',
              },
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}