// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   Paper,
// //   TextField,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   IconButton,
// //   Grid,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// // } from '@mui/material';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// // import {
// //   Add as AddIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// // } from '@mui/icons-material';

// // export default function ResignationManagement() {
// //   const [resignations, setResignations] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [entriesPerPage, setEntriesPerPage] = useState(10);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [formData, setFormData] = useState({
// //     employeeName: '',
// //     department: '',
// //     resignationDate: null,
// //     noticeDate: null,
// //     resignationReason: '',
// //   });
// //   const [editingId, setEditingId] = useState(null);
// //   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
// //   const [resignationToDelete, setResignationToDelete] = useState(null);

// //   const departments = ['Integrated Technology Services', 'Human Resources', 'Finance', 'Marketing', 'Operations'];

// //   const handleInputChange = (field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };

// //   const handleReset = () => {
// //     setFormData({
// //       employeeName: '',
// //       department: '',
// //       resignationDate: null,
// //       noticeDate: null,
// //       resignationReason: '',
// //     });
// //     setEditingId(null);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!formData.employeeName || !formData.department || !formData.resignationDate || !formData.noticeDate || !formData.resignationReason) {
// //       alert('Please fill in all required fields');
// //       return;
// //     }
    
// //     if (editingId) {
// //       setResignations(resignations.map(resignation => 
// //         resignation.id === editingId ? { ...resignation, ...formData } : resignation
// //       ));
// //     } else {
// //       const newResignation = {
// //         id: Date.now(),
// //         ...formData,
// //       };
// //       setResignations([...resignations, newResignation]);
// //     }
    
// //     handleReset();
// //     setShowForm(false);
// //   };

// //   const handleEdit = (resignation) => {
// //     setFormData({
// //       employeeName: resignation.employeeName,
// //       department: resignation.department,
// //       resignationDate: resignation.resignationDate,
// //       noticeDate: resignation.noticeDate,
// //       resignationReason: resignation.resignationReason,
// //     });
// //     setEditingId(resignation.id);
// //     setShowForm(true);
// //   };

// //   const handleDelete = (resignation) => {
// //     setResignationToDelete(resignation);
// //     setDeleteConfirmOpen(true);
// //   };

// //   const confirmDelete = () => {
// //     setResignations(resignations.filter(resignation => resignation.id !== resignationToDelete.id));
// //     setDeleteConfirmOpen(false);
// //   };

// //   const filteredResignations = resignations.filter(resignation =>
// //     Object.values(resignation).some(value =>
// //       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
// //     )
// //   );

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //       <Box sx={{ p: 3 }}>
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// //           <Typography variant="h5">Resignation  =  Management</Typography>
// //           <Button
// //             variant="contained"
// //             startIcon={<AddIcon />}
// //             onClick={() => {
// //               setShowForm(!showForm);
// //               handleReset();
// //             }}
// //           >
// //             {showForm ? 'Hide Form' : 'Add Resignation'}
// //           </Button>
// //         </Box>

// //         {showForm && (
// //           <Paper sx={{ p: 3, mb: 3 }}>
// //             <Typography variant="h6" gutterBottom>{editingId ? 'Edit Resignation' : 'Submit Resignation'}</Typography>
// //             <form onSubmit={handleSubmit}>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12} md={6}>
// //                   <TextField
// //                     fullWidth
// //                     required
// //                     label="Employee Name"
// //                     value={formData.employeeName}
// //                     onChange={(e) => handleInputChange('employeeName', e.target.value)}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} md={6}>
// //                   <FormControl fullWidth required>
// //                     <InputLabel>Department</InputLabel>
// //                     <Select
// //                       value={formData.department}
// //                       onChange={(e) => handleInputChange('department', e.target.value)}
// //                       label="Department"
// //                     >
// //                       {departments.map((dept) => (
// //                         <MenuItem key={dept} value={dept}>{dept}</MenuItem>
// //                       ))}
// //                     </Select>
// //                   </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} md={6}>
// //                   <DatePicker
// //                     label="Resignation Date"
// //                     value={formData.resignationDate}
// //                     onChange={(date) => handleInputChange('resignationDate', date)}
// //                     renderInput={(params) => <TextField {...params} fullWidth required />}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} md={6}>
// //                   <DatePicker
// //                     label="Notice Date"
// //                     value={formData.noticeDate}
// //                     onChange={(date) => handleInputChange('noticeDate', date)}
// //                     renderInput={(params) => <TextField {...params} fullWidth required />}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     required
// //                     label="Resignation Reason"
// //                     multiline
// //                     rows={4}
// //                     value={formData.resignationReason}
// //                     onChange={(e) => handleInputChange('resignationReason', e.target.value)}
// //                   />
// //                 </Grid>
// //               </Grid>
// //               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
// //                 <Button onClick={handleReset}>Reset</Button>
// //                 <Button type="submit" variant="contained">{editingId ? 'Update' : 'Submit'}</Button>
// //               </Box>
// //             </form>
// //           </Paper>
// //         )}

// //         <Paper sx={{ p: 3 }}>
// //           <Typography variant="h6" gutterBottom>Resignation List</Typography>
// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
// //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
// //               <Select
// //                 size="small"
// //                 value={entriesPerPage}
// //                 onChange={(e) => setEntriesPerPage(e.target.value)}
// //               >
// //                 <MenuItem value={10}>10</MenuItem>
// //                 <MenuItem value={25}>25</MenuItem>
// //                 <MenuItem value={50}>50</MenuItem>
// //               </Select>
// //               <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
// //             </Box>
// //             <TextField
// //               size="small"
// //               placeholder="Search..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //           </Box>

// //           <TableContainer>
// //             <Table>
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell>EMPLOYEE NAME</TableCell>
// //                   <TableCell>DEPARTMENT</TableCell>
// //                   <TableCell>RESIGNATION DATE</TableCell>
// //                   <TableCell>NOTICE DATE</TableCell>
// //                   <TableCell>REASON</TableCell>
// //                   <TableCell>ACTIONS</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {filteredResignations.length === 0 ? (
// //                   <TableRow>
// //                     <TableCell colSpan={6} align="center">No records available</TableCell>
// //                   </TableRow>
// //                 ) : (
// //                   filteredResignations.slice(0, entriesPerPage).map((resignation) => (
// //                     <TableRow key={resignation.id}>
// //                       <TableCell>{resignation.employeeName}</TableCell>
// //                       <TableCell>{resignation.department}</TableCell>
// //                       <TableCell>{resignation.resignationDate.toLocaleDateString()}</TableCell>
// //                       <TableCell>{resignation.noticeDate.toLocaleDateString()}</TableCell>
// //                       <TableCell>{resignation.resignationReason}</TableCell>
// //                       <TableCell>
// //                         <IconButton onClick={() => handleEdit(resignation)} size="small">
// //                           <EditIcon />
// //                         </IconButton>
// //                         <IconButton onClick={() => handleDelete(resignation)} size="small">
// //                           <DeleteIcon />
// //                         </IconButton>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
          
// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
// //             <Typography variant="body2">
// //               Showing {Math.min(filteredResignations.length, entriesPerPage)} of {resignations.length} entries
// //             </Typography>
// //             <Box sx={{ display: 'flex', gap: 1 }}>
// //               <Button disabled={true}>Previous</Button>
// //               <Button disabled={true}>Next</Button>
// //             </Box>
// //           </Box>
// //         </Paper>

// //         <Dialog
// //           open={deleteConfirmOpen}
// //           onClose={() => setDeleteConfirmOpen(false)}
// //         >
// //           <DialogTitle>Confirm Delete</DialogTitle>
// //           <DialogContent>
// //             Are you sure you want to delete this resignation record?
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
// //             <Button onClick={confirmDelete} color="error">Delete</Button>
// //           </DialogActions>
// //         </Dialog>
// //       </Box>
// //     </LocalizationProvider>
// //   );
// // }





// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import {
// //   Box,
// //   Typography,
// //   Paper,
// //   TextField,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Grid,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   CircularProgress,
// //   Chip, // Import Chip component for status display
// //   Stack, // Import Stack for action buttons
// // } from '@mui/material';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// // import { Add as AddIcon } from '@mui/icons-material';

// // // Helper function to parse inconsistent date formats from the API
// // const parseDate = (dateString) => {
// //   if (!dateString) return null;
// //   // Check for DD-MM-YYYY format
// //   if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
// //     const [day, month, year] = dateString.split('-');
// //     return new Date(year, month - 1, day);
// //   }
// //   // Assume YYYY-MM-DD or other standard formats parsable by new Date()
// //   const date = new Date(dateString);
// //   return isNaN(date.getTime()) ? null : date;
// // };

// // export default function ResignationManagement() {
// //   const [resignations, setResignations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showForm, setShowForm] = useState(false);
// //   const [entriesPerPage, setEntriesPerPage] = useState(10);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [formData, setFormData] = useState({
// //     employeeName: '',
// //     department: '',
// //     resignationDate: null,
// //     noticeDate: null,
// //     resignationReason: '',
// //   });

// //   // State for the new approve dialog
// //   const [approveDialogOpen, setApproveDialogOpen] = useState(false);
// //   const [resignationToApprove, setResignationToApprove] = useState(null);
// //   const [lastWorkingDate, setLastWorkingDate] = useState(null);

// //   // Expanded list of departments based on API response
// //   const departments = ['Integrated Technology Services', 'Human Resources', 'Finance', 'Marketing', 'Operations', 'Account and Finance', 'Human Resource'];

// //   useEffect(() => {
// //     const fetchResignations = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);
// //         const response = await axios.get('https://tdtlworld.com/hrms-backend/resignations/');
        
// //         const transformedData = response.data.map(res => ({
// //           id: res.resignation_id,
// //           employeeName: res.employee_name || 'N/A',
// //           department: res.department_name || 'N/A',
// //           resignationDate: parseDate(res.resignation_date),
// //           noticeDate: parseDate(res.notice_date),
// //           resignationReason: res.reason || '',
// //           status: res.status || 'Pending', // Capture the status
// //         }));
        
// //         setResignations(transformedData);
// //       } catch (err) {
// //         setError('Failed to fetch data. Please try again later.');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchResignations();
// //   }, []);

// //   const handleInputChange = (field, value) => {
// //     setFormData(prev => ({ ...prev, [field]: value }));
// //   };

// //   const handleReset = () => {
// //     setFormData({
// //       employeeName: '',
// //       department: '',
// //       resignationDate: null,
// //       noticeDate: null,
// //       resignationReason: '',
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!formData.employeeName || !formData.department || !formData.resignationDate || !formData.noticeDate || !formData.resignationReason) {
// //       alert('Please fill in all required fields');
// //       return;
// //     }
    
// //     // NOTE: This only adds to local state. A POST API call would be needed here.
// //     const newResignation = {
// //       id: Date.now(),
// //       ...formData,
// //       status: 'Pending', // New resignations are pending by default
// //     };
// //     setResignations([newResignation, ...resignations]);
    
// //     handleReset();
// //     setShowForm(false);
// //   };

// //   // Handler for clicking the 'Approve' button
// //   const handleApproveClick = (resignation) => {
// //     setResignationToApprove(resignation);
// //     setApproveDialogOpen(true);
// //   };
  
// //   // Handler for confirming the approval in the dialog
// //   const handleConfirmApproval = () => {
// //     if (!lastWorkingDate) {
// //       alert('Please select a last working date.');
// //       return;
// //     }
// //     // NOTE: This only updates local state. A PUT/PATCH API call would be needed here.
// //     setResignations(resignations.map(res => 
// //       res.id === resignationToApprove.id ? { ...res, status: 'Approved', lastWorkingDate } : res
// //     ));
// //     setApproveDialogOpen(false);
// //     setResignationToApprove(null);
// //     setLastWorkingDate(null);
// //   };

// //   // Handler for clicking the 'Reject' button
// //   const handleReject = (resignationId) => {
// //     // NOTE: This only updates local state. A PUT/PATCH API call would be needed here.
// //     setResignations(resignations.map(res => 
// //       res.id === resignationId ? { ...res, status: 'Rejected' } : res
// //     ));
// //   };

// //   const filteredResignations = resignations.filter(resignation =>
// //     Object.values(resignation).some(value =>
// //       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
// //     )
// //   );

// //   const getStatusChip = (status) => {
// //     let color;
// //     switch (status) {
// //       case 'Approved':
// //         color = 'success';
// //         break;
// //       case 'Rejected':
// //         color = 'error';
// //         break;
// //       case 'Pending':
// //       default:
// //         color = 'warning';
// //         break;
// //     }
// //     return <Chip label={status} color={color} size="small" />;
// //   };

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //       <Box sx={{ p: 3 }}>
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// //           <Typography variant="h5">Resignation = Management</Typography>
// //           <Button
// //             variant="contained"
// //             startIcon={<AddIcon />}
// //             onClick={() => {
// //               setShowForm(!showForm);
// //               handleReset();
// //             }}
// //           >
// //             {showForm ? 'Hide Form' : 'Add Resignation'}
// //           </Button>
// //         </Box>

// //         {showForm && (
// //           <Paper sx={{ p: 3, mb: 3 }}>
// //             <Typography variant="h6" gutterBottom>Submit Resignation</Typography>
// //             <form onSubmit={handleSubmit}>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12} md={6}>
// //                   <TextField fullWidth required label="Employee Name" value={formData.employeeName} onChange={(e) => handleInputChange('employeeName', e.target.value)} />
// //                 </Grid>
// //                 <Grid item xs={12} md={6}>
// //                   <FormControl fullWidth required>
// //                     <InputLabel>Department</InputLabel>
// //                     <Select value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} label="Department">
// //                       {departments.map((dept) => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)}
// //                     </Select>
// //                   </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} md={6}>
// //                   <DatePicker label="Resignation Date" value={formData.resignationDate} onChange={(date) => handleInputChange('resignationDate', date)} renderInput={(params) => <TextField {...params} fullWidth required />} />
// //                 </Grid>
// //                 <Grid item xs={12} md={6}>
// //                   <DatePicker label="Notice Date" value={formData.noticeDate} onChange={(date) => handleInputChange('noticeDate', date)} renderInput={(params) => <TextField {...params} fullWidth required />} />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <TextField fullWidth required label="Resignation Reason" multiline rows={4} value={formData.resignationReason} onChange={(e) => handleInputChange('resignationReason', e.target.value)} />
// //                 </Grid>
// //               </Grid>
// //               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
// //                 <Button onClick={handleReset}>Reset</Button>
// //                 <Button type="submit" variant="contained">Submit</Button>
// //               </Box>
// //             </form>
// //           </Paper>
// //         )}

// //         <Paper sx={{ p: 3 }}>
// //           <Typography variant="h6" gutterBottom>Resignation List</Typography>
// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
// //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
// //               <Select size="small" value={entriesPerPage} onChange={(e) => setEntriesPerPage(e.target.value)}>
// //                 <MenuItem value={10}>10</MenuItem>
// //                 <MenuItem value={25}>25</MenuItem>
// //                 <MenuItem value={50}>50</MenuItem>
// //               </Select>
// //               <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
// //             </Box>
// //             <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// //           </Box>

// //           <TableContainer>
// //             <Table>
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell>SR. NO.</TableCell>
// //                   <TableCell>EMPLOYEE NAME</TableCell>
// //                   <TableCell>DEPARTMENT</TableCell>
// //                   <TableCell>RESIGNATION DATE</TableCell>
// //                   <TableCell>NOTICE DATE</TableCell>
// //                   <TableCell>STATUS</TableCell>
// //                   <TableCell align="center">ACTIONS</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {loading ? (
// //                   <TableRow>
// //                     <TableCell colSpan={7} align="center"><CircularProgress /></TableCell>
// //                   </TableRow>
// //                 ) : error ? (
// //                    <TableRow>
// //                     <TableCell colSpan={7} align="center" sx={{ color: 'red' }}>{error}</TableCell>
// //                   </TableRow>
// //                 ) : filteredResignations.length === 0 ? (
// //                   <TableRow>
// //                     <TableCell colSpan={7} align="center">No records available</TableCell>
// //                   </TableRow>
// //                 ) : (
// //                   filteredResignations.slice(0, entriesPerPage).map((resignation, index) => (
// //                     <TableRow key={resignation.id}>
// //                       <TableCell>{index + 1}</TableCell>
// //                       <TableCell>{resignation.employeeName}</TableCell>
// //                       <TableCell>{resignation.department}</TableCell>
// //                       <TableCell>{resignation.resignationDate ? resignation.resignationDate.toLocaleDateString() : 'N/A'}</TableCell>
// //                       <TableCell>{resignation.noticeDate ? resignation.noticeDate.toLocaleDateString() : 'N/A'}</TableCell>
// //                       <TableCell>{getStatusChip(resignation.status)}</TableCell>
// //                       <TableCell align="center">
// //                         {resignation.status === 'Pending' ? (
// //                           <Stack direction="row" spacing={1} justifyContent="center">
// //                             <Button variant="contained" color="success" size="small" onClick={() => handleApproveClick(resignation)}>Approve</Button>
// //                             <Button variant="contained" color="error" size="small" onClick={() => handleReject(resignation.id)}>Reject</Button>
// //                           </Stack>
// //                         ) : (
// //                           <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
// //                             Action Taken
// //                           </Typography>
// //                         )}
// //                       </TableCell>
// //                     </TableRow>
// //                   ))
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
          
// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
// //             <Typography variant="body2">
// //               Showing {Math.min(filteredResignations.slice(0, entriesPerPage).length, filteredResignations.length)} of {filteredResignations.length} entries
// //             </Typography>
// //             <Box sx={{ display: 'flex', gap: 1 }}>
// //               <Button disabled>Previous</Button>
// //               <Button disabled>Next</Button>
// //             </Box>
// //           </Box>
// //         </Paper>

// //         {/* Approve Confirmation Dialog */}
// //         <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)}>
// //           <DialogTitle>Confirm Approval</DialogTitle>
// //           <DialogContent sx={{ pt: '20px !important' }}>
// //             <DatePicker
// //               label="Select Last Working Date"
// //               value={lastWorkingDate}
// //               onChange={(date) => setLastWorkingDate(date)}
// //               renderInput={(params) => <TextField {...params} fullWidth />}
// //             />
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={() => setApproveDialogOpen(false)}>Cancel</Button>
// //             <Button onClick={handleConfirmApproval} variant="contained" color="success">Confirm & Approve</Button>
// //           </DialogActions>
// //         </Dialog>
// //       </Box>
// //     </LocalizationProvider>
// //   );
// // }










// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
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
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Chip,
//   Stack,
//   Snackbar, // Import Snackbar for notifications
//   Alert,    // Import Alert for Snackbar content
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Add as AddIcon } from '@mui/icons-material';

// // --- Helper Functions ---

// // Parses inconsistent date formats from the API (DD-MM-YYYY, YYYY-MM-DD, etc.)
// const parseDate = (dateString) => {
//   if (!dateString) return null;
//   if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
//     const [day, month, year] = dateString.split('-');
//     return new Date(year, month - 1, day);
//   }
//   const date = new Date(dateString);
//   return isNaN(date.getTime()) ? null : date;
// };

// // Formats a Date object into 'YYYY-MM-DD' for API submission
// const formatDateForAPI = (date) => {
//   if (!date) return null;
//   return date.toISOString().split('T')[0];
// };

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false); // For loading states on buttons

//   const [formData, setFormData] = useState({
//     employeeName: '',
//     department: '',
//     resignationDate: null,
//     noticeDate: null,
//     resignationReason: '',
//   });

//   // State for the approve dialog
//   const [approveDialogOpen, setApproveDialogOpen] = useState(false);
//   const [resignationToApprove, setResignationToApprove] = useState(null);
//   const [lastWorkingDate, setLastWorkingDate] = useState(null);

//   // State for Snackbar notifications
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
//   const departments = ['Integrated Technology Services', 'Human Resources', 'Finance', 'Marketing', 'Operations', 'Account and Finance', 'Human Resource'];

//   // --- Data Fetching ---
//   const fetchResignations = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get('https://tdtlworld.com/hrms-backend/resignations/');
      
//       const transformedData = response.data.map(res => ({
//         id: res.resignation_id,
//         employeeName: res.employee_name || 'N/A',
//         department: res.department_name || 'N/A',
//         resignationDate: parseDate(res.resignation_date),
//         noticeDate: parseDate(res.notice_date),
//         resignationReason: res.reason || '',
//         status: res.status || 'Pending',
//       }));
      
//       setResignations(transformedData);
//     } catch (err) {
//       setError('Failed to fetch data. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchResignations();
//   }, [fetchResignations]);

//   // --- Handlers ---
//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleReset = () => {
//     setFormData({ employeeName: '', department: '', resignationDate: null, noticeDate: null, resignationReason: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.employeeName || !formData.department || !formData.resignationDate || !formData.noticeDate || !formData.resignationReason) {
//       setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
//       return;
//     }

//     setIsSubmitting(true);
//     const payload = {
//       employee_name: formData.employeeName,
//       department_name: formData.department,
//       resignation_date: formatDateForAPI(formData.resignationDate),
//       notice_date: formatDateForAPI(formData.noticeDate),
//       reason: formData.resignationReason,
//       status: 'Pending',
//     };

//     try {
//       await axios.post('https://tdtlworld.com/hrms-backend/resignations/', payload);
//       setSnackbar({ open: true, message: 'Resignation submitted successfully!', severity: 'success' });
//       setShowForm(false);
//       handleReset();
//       fetchResignations(); // Refetch data to include the new entry
//     } catch (err) {
//       console.error("Failed to submit resignation:", err);
//       setSnackbar({ open: true, message: 'Failed to submit resignation. Please try again.', severity: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApproveClick = (resignation) => {
//     setResignationToApprove(resignation);
//     setLastWorkingDate(null); // Reset date each time dialog opens
//     setApproveDialogOpen(true);
//   };
  
//   const handleConfirmApproval = async () => {
//     if (!lastWorkingDate) {
//       setSnackbar({ open: true, message: 'Please select a last working date.', severity: 'error' });
//       return;
//     }
    
//     setIsSubmitting(true);
//     const payload = {
//       status: "approved",
//       last_working_day: formatDateForAPI(lastWorkingDate),
//     };

//     try {
//       await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${resignationToApprove.id}/`, payload);
      
//       // Optimistic UI update
//       setResignations(resignations.map(res => 
//         res.id === resignationToApprove.id ? { ...res, status: 'Approved' } : res
//       ));

//       setSnackbar({ open: true, message: 'Resignation approved successfully!', severity: 'success' });
//       setApproveDialogOpen(false);
//       setResignationToApprove(null);
//     } catch (err) {
//       console.error("Failed to approve resignation:", err);
//       setSnackbar({ open: true, message: 'Failed to approve resignation. Please try again.', severity: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleReject = async (resignationId) => {
//     if (window.confirm('Are you sure you want to reject this resignation?')) {
//       const payload = { status: 'rejected' };
//       try {
//         await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${resignationId}/`, payload);
        
//         // Optimistic UI update
//         setResignations(resignations.map(res => 
//           res.id === resignationId ? { ...res, status: 'Rejected' } : res
//         ));
        
//         setSnackbar({ open: true, message: 'Resignation rejected.', severity: 'success' });
//       } catch (err) {
//         console.error("Failed to reject resignation:", err);
//         setSnackbar({ open: true, message: 'Failed to reject resignation. Please try again.', severity: 'error' });
//       }
//     }
//   };

//   const filteredResignations = resignations.filter(resignation =>
//     Object.values(resignation).some(value =>
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const getStatusChip = (status) => {
//     const normalizedStatus = status ? status.toLowerCase() : 'pending';
//     let color;
//     switch (normalizedStatus) {
//       case 'approved': color = 'success'; break;
//       case 'rejected': color = 'error'; break;
//       case 'pending': default: color = 'warning'; break;
//     }
//     return <Chip label={status} color={color} size="small" />;
//   };

//   const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h5">Resignation = Management</Typography>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setShowForm(!showForm); handleReset(); }}>
//             {showForm ? 'Hide Form' : 'Add Resignation'}
//           </Button>
//         </Box>

//         {showForm && (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>Submit Resignation</Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}><TextField fullWidth required label="Employee Name" value={formData.employeeName} onChange={(e) => handleInputChange('employeeName', e.target.value)} /></Grid>
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth required>
//                     <InputLabel>Department</InputLabel>
//                     <Select value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} label="Department">
//                       {departments.map((dept) => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={6}><DatePicker label="Resignation Date" value={formData.resignationDate} onChange={(date) => handleInputChange('resignationDate', date)} renderInput={(params) => <TextField {...params} fullWidth required />} /></Grid>
//                 <Grid item xs={12} md={6}><DatePicker label="Notice Date" value={formData.noticeDate} onChange={(date) => handleInputChange('noticeDate', date)} renderInput={(params) => <TextField {...params} fullWidth required />} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth required label="Resignation Reason" multiline rows={4} value={formData.resignationReason} onChange={(e) => handleInputChange('resignationReason', e.target.value)} /></Grid>
//               </Grid>
//               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//                 <Button onClick={handleReset} disabled={isSubmitting}>Reset</Button>
//                 <Button type="submit" variant="contained" disabled={isSubmitting}>
//                   {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
//                 </Button>
//               </Box>
//             </form>
//           </Paper>
//         )}

//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" gutterBottom>Resignation List</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//               <Select size="small" value={entriesPerPage} onChange={(e) => setEntriesPerPage(e.target.value)}><MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem><MenuItem value={50}>50</MenuItem></Select>
//               <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//             </Box>
//             <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead><TableRow><TableCell>SR. NO.</TableCell><TableCell>EMPLOYEE NAME</TableCell><TableCell>DEPARTMENT</TableCell><TableCell>RESIGNATION DATE</TableCell><TableCell>NOTICE DATE</TableCell><TableCell>STATUS</TableCell><TableCell align="center">ACTIONS</TableCell></TableRow></TableHead>
//               <TableBody>
//                 {loading ? <TableRow><TableCell colSpan={7} align="center"><CircularProgress /></TableCell></TableRow> : 
//                  error ? <TableRow><TableCell colSpan={7} align="center" sx={{ color: 'red' }}>{error}</TableCell></TableRow> : 
//                  filteredResignations.length === 0 ? <TableRow><TableCell colSpan={7} align="center">No records available</TableCell></TableRow> : 
//                  (filteredResignations.slice(0, entriesPerPage).map((resignation, index) => (
//                     <TableRow key={resignation.id}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{resignation.employeeName}</TableCell>
//                       <TableCell>{resignation.department}</TableCell>
//                       <TableCell>{resignation.resignationDate ? resignation.resignationDate.toLocaleDateString() : 'N/A'}</TableCell>
//                       <TableCell>{resignation.noticeDate ? resignation.noticeDate.toLocaleDateString() : 'N/A'}</TableCell>
//                       <TableCell>{getStatusChip(resignation.status)}</TableCell>
//                       <TableCell align="center">
//                         {resignation.status.toLowerCase() === 'pending' ? (
//                           <Stack direction="row" spacing={1} justifyContent="center">
//                             <Button variant="contained" color="success" size="small" onClick={() => handleApproveClick(resignation)}>Approve</Button>
//                             <Button variant="contained" color="error" size="small" onClick={() => handleReject(resignation.id)}>Reject</Button>
//                           </Stack>
//                         ) : ( <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>Action Taken</Typography> )}
//                       </TableCell>
//                     </TableRow>
//                   )))
//                 }
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Typography variant="body2">Showing {Math.min(filteredResignations.slice(0, entriesPerPage).length, filteredResignations.length)} of {filteredResignations.length} entries</Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}><Button disabled>Previous</Button><Button disabled>Next</Button></Box>
//           </Box>
//         </Paper>

//         <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)}>
//           <DialogTitle>Confirm Approval</DialogTitle>
//           <DialogContent sx={{ pt: '20px !important' }}>
//             <DatePicker label="Select Last Working Date" value={lastWorkingDate} onChange={(date) => setLastWorkingDate(date)} renderInput={(params) => <TextField {...params} fullWidth />} />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setApproveDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
//             <Button onClick={handleConfirmApproval} variant="contained" color="success" disabled={isSubmitting}>
//               {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Confirm & Approve'}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//           <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </LocalizationProvider>
//   );
// }














// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
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
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Chip,
//   Stack,
//   Snackbar,
//   Alert,
//   useTheme, // To use theme for responsiveness
//   useMediaQuery, // For responsive design
//   InputAdornment, // For search icon
//   Skeleton,      // For loading state
//   TablePagination, // For new pagination
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

// // --- Helper Functions ---

// // Parses inconsistent date formats from the API (DD-MM-YYYY, YYYY-MM-DD, etc.)
// const parseDate = (dateString) => {
//   if (!dateString) return null;
//   if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
//     const [day, month, year] = dateString.split('-');
//     return new Date(year, month - 1, day);
//   }
//   const date = new Date(dateString);
//   return isNaN(date.getTime()) ? null : date;
// };

// // Formats a Date object into 'YYYY-MM-DD' for API submission
// const formatDateForAPI = (date) => {
//   if (!date) return null;
//   return date.toISOString().split('T')[0];
// };

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showFormDialog, setShowFormDialog] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [formData, setFormData] = useState({
//     employeeName: '',
//     department: '',
//     resignationDate: null,
//     noticeDate: null,
//     resignationReason: '',
//   });

//   // State for the approve dialog
//   const [approveDialogOpen, setApproveDialogOpen] = useState(false);
//   const [resignationToApprove, setResignationToApprove] = useState(null);
//   const [lastWorkingDate, setLastWorkingDate] = useState(null);

//   // State for Snackbar notifications
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
//   const departments = ['Integrated Technology Services', 'Human Resources', 'Finance', 'Marketing', 'Operations', 'Account and Finance', 'Human Resource'];

//   // Responsive design helpers
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // --- Data Fetching ---
//   const fetchResignations = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get('https://tdtlworld.com/hrms-backend/resignations/');
      
//       const transformedData = response.data.map(res => ({
//         id: res.resignation_id,
//         employeeName: res.employee_name || 'N/A',
//         department: res.department_name || 'N/A',
//         resignationDate: parseDate(res.resignation_date),
//         noticeDate: parseDate(res.notice_date),
//         resignationReason: res.reason || '',
//         status: res.status || 'Pending',
//       }));
      
//       setResignations(transformedData);
//     } catch (err) {
//       setError('Failed to fetch data. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchResignations();
//   }, [fetchResignations]);

//   // --- Handlers ---
//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleReset = () => {
//     setFormData({ employeeName: '', department: '', resignationDate: null, noticeDate: null, resignationReason: '' });
//   };

//   const handleAddNewClick = () => {
//     handleReset();
//     setShowFormDialog(true);
//   };
  
//   const handleCloseFormDialog = () => {
//     if (isSubmitting) return; // Prevent closing while submitting
//     setShowFormDialog(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.employeeName || !formData.department || !formData.resignationDate || !formData.noticeDate || !formData.resignationReason) {
//       setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
//       return;
//     }

//     setIsSubmitting(true);
//     const payload = {
//       employee_name: formData.employeeName,
//       department_name: formData.department,
//       resignation_date: formatDateForAPI(formData.resignationDate),
//       notice_date: formatDateForAPI(formData.noticeDate),
//       reason: formData.resignationReason,
//       status: 'Pending',
//     };

//     try {
//       await axios.post('https://tdtlworld.com/hrms-backend/resignations/', payload);
//       setSnackbar({ open: true, message: 'Resignation submitted successfully!', severity: 'success' });
//       setShowFormDialog(false);
//       fetchResignations();
//     } catch (err) {
//       console.error("Failed to submit resignation:", err);
//       setSnackbar({ open: true, message: 'Failed to submit resignation. Please try again.', severity: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApproveClick = (resignation) => {
//     setResignationToApprove(resignation);
//     setLastWorkingDate(null);
//     setApproveDialogOpen(true);
//   };
  
//   const handleConfirmApproval = async () => {
//     if (!lastWorkingDate) {
//       setSnackbar({ open: true, message: 'Please select a last working date.', severity: 'error' });
//       return;
//     }
    
//     setIsSubmitting(true);
//     const payload = {
//       status: "approved",
//       last_working_day: formatDateForAPI(lastWorkingDate),
//     };

//     try {
//       await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${resignationToApprove.id}/`, payload);
//       setResignations(resignations.map(res => 
//         res.id === resignationToApprove.id ? { ...res, status: 'Approved' } : res
//       ));
//       setSnackbar({ open: true, message: 'Resignation approved successfully!', severity: 'success' });
//       setApproveDialogOpen(false);
//     } catch (err) {
//       console.error("Failed to approve resignation:", err);
//       setSnackbar({ open: true, message: 'Failed to approve resignation. Please try again.', severity: 'error' });
//     } finally {
//       setIsSubmitting(false);
//       setResignationToApprove(null);
//     }
//   };

//   const handleReject = async (resignationId) => {
//     // A simple confirmation for better UX than window.confirm
//     if (!window.confirm('Are you sure you want to reject this resignation?')) return;
//       const payload = { status: 'rejected' };
//       try {
//         await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${resignationId}/`, payload);
//         setResignations(resignations.map(res => 
//           res.id === resignationId ? { ...res, status: 'Rejected' } : res
//         ));
//         setSnackbar({ open: true, message: 'Resignation rejected.', severity: 'success' });
//       } catch (err) {
//         console.error("Failed to reject resignation:", err);
//         setSnackbar({ open: true, message: 'Failed to reject resignation. Please try again.', severity: 'error' });
//       }
//   };

//   // --- Pagination Handlers ---
//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredResignations = resignations.filter(resignation =>
//     Object.values(resignation).some(value =>
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );
  
//   const getStatusChip = (status) => {
//     const normalizedStatus = status ? status.toLowerCase() : 'pending';
//     let color;
//     switch (normalizedStatus) {
//       case 'approved': color = 'success'; break;
//       case 'rejected': color = 'error'; break;
//       case 'pending': default: color = 'warning'; break;
//     }
//     return <Chip label={status} color={color} size="small" />;
//   };

//   const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

//   // --- Render ---
//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box component={Paper} p={3}>
//         <Typography variant="h5" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 2 }}>
//           Resignation 
//         </Typography>

//         <Stack
//           direction={isMobile ? 'column' : 'row'}
//           justifyContent="space-between"
//           alignItems={isMobile ? 'stretch' : 'center'}
//           spacing={2}
//           mb={3}
//         >
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleAddNewClick}
//             sx={{
//               backgroundColor: '#8C257C',
//               color: 'white',
//               '&:hover': { backgroundColor: '#6d1d60' },
//             }}
//           >
//             Add New
//           </Button>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Stack>

//         <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <Table>
//             <TableHead sx={{ backgroundColor: '#8C257C' }}>
//               <TableRow>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EMPLOYEE NAME</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DEPARTMENT</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>RESIGNATION DATE</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>NOTICE DATE</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>STATUS</TableCell>
//                 <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 [...Array(rowsPerPage)].map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" width={80} /></TableCell>
//                     <TableCell align="center"><Skeleton variant="rectangular" width={120} height={30} /></TableCell>
//                   </TableRow>
//                 ))
//               ) : error ? (
//                 <TableRow><TableCell colSpan={7} align="center" sx={{ color: 'red' }}>{error}</TableCell></TableRow>
//               ) : filteredResignations.length === 0 ? (
//                 <TableRow><TableCell colSpan={7} align="center">No records available</TableCell></TableRow>
//               ) : (
//                 filteredResignations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((resignation, index) => (
//                   <TableRow key={resignation.id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{resignation.employeeName}</TableCell>
//                     <TableCell>{resignation.department}</TableCell>
//                     <TableCell>{resignation.resignationDate ? resignation.resignationDate.toLocaleDateString() : 'N/A'}</TableCell>
//                     <TableCell>{resignation.noticeDate ? resignation.noticeDate.toLocaleDateString() : 'N/A'}</TableCell>
//                     <TableCell>{getStatusChip(resignation.status)}</TableCell>
//                     <TableCell align="center">
//                       {resignation.status.toLowerCase() === 'pending' ? (
//                         <Box display="flex" justifyContent="center" gap={0.5}>
//                           <Button variant="contained" color="success" size="small" onClick={() => handleApproveClick(resignation)}>Approve</Button>
//                           <Button variant="contained" color="error" size="small" onClick={() => handleReject(resignation.id)}>Reject</Button>
//                         </Box>
//                       ) : (
//                         <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>Action Taken</Typography>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
        
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           component="div"
//           count={filteredResignations.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />

//         {/* Add Resignation Dialog */}
//         <Dialog open={showFormDialog} onClose={handleCloseFormDialog} fullWidth maxWidth="sm">
//           <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//             Submit Resignation
//           </DialogTitle>
//           <DialogContent>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} md={6}><TextField fullWidth required label="Employee Name" value={formData.employeeName} onChange={(e) => handleInputChange('employeeName', e.target.value)} /></Grid>
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth required>
//                     <InputLabel>Department</InputLabel>
//                     <Select value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} label="Department">
//                       {departments.map((dept) => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={6}><DatePicker label="Resignation Date" value={formData.resignationDate} onChange={(date) => handleInputChange('resignationDate', date)} renderInput={(params) => <TextField {...params} fullWidth required />} /></Grid>
//                 <Grid item xs={12} md={6}><DatePicker label="Notice Date" value={formData.noticeDate} onChange={(date) => handleInputChange('noticeDate', date)} renderInput={(params) => <TextField {...params} fullWidth required />} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth required label="Resignation Reason" multiline rows={4} value={formData.resignationReason} onChange={(e) => handleInputChange('resignationReason', e.target.value)} /></Grid>
//               </Grid>
//             </form>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseFormDialog} sx={{ color: '#757575' }} disabled={isSubmitting}>Cancel</Button>
//             <Button onClick={handleSubmit} variant="contained" disabled={isSubmitting} sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' }, color: 'white' }}>
//               {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Approve Resignation Dialog */}
//         <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)}>
//           <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//             Confirm Approval
//           </DialogTitle>
//           <DialogContent sx={{ pt: '20px !important' }}>
//             <DatePicker label="Select Last Working Date" value={lastWorkingDate} onChange={(date) => setLastWorkingDate(date)} renderInput={(params) => <TextField {...params} fullWidth />} />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setApproveDialogOpen(false)} sx={{ color: '#757575' }} disabled={isSubmitting}>Cancel</Button>
//             <Button onClick={handleConfirmApproval} variant="contained" disabled={isSubmitting} sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' }, color: 'white' }}>
//               {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Confirm & Approve'}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//           <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </LocalizationProvider>
//   );
// }




// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
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
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Chip,
//   Stack,
//   Snackbar,
//   Alert,
//   useTheme, // To use theme for responsiveness
//   useMediaQuery, // For responsive design
//   InputAdornment, // For search icon
//   Skeleton,      // For loading state
//   TablePagination, // For new pagination
//   DialogContentText,
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Add as AddIcon, Search as SearchIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

// // --- Helper Functions ---

// // Parses inconsistent date formats from the API (DD-MM-YYYY, YYYY-MM-DD, etc.)
// const parseDate = (dateString) => {
//   if (!dateString) return null;
//   if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
//     const [day, month, year] = dateString.split('-');
//     return new Date(year, month - 1, day);
//   }
//   const date = new Date(dateString);
//   return isNaN(date.getTime()) ? null : date;
// };

// // Formats a Date object into 'YYYY-MM-DD' for API submission
// const formatDateForAPI = (date) => {
//   if (!date) return null;
//   return date.toISOString().split('T')[0];
// };

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showFormDialog, setShowFormDialog] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [formData, setFormData] = useState({
//     employeeName: '',
//     department: '',
//     resignationDate: null,
//     noticeDate: null,
//     resignationReason: '',
//   });

//   // State for the approve dialog
//   const [approveDialogOpen, setApproveDialogOpen] = useState(false);
//   const [resignationToApprove, setResignationToApprove] = useState(null);
//   const [lastWorkingDate, setLastWorkingDate] = useState(null);

//   // State for View Dialog
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);
//   const [selectedResignation, setSelectedResignation] = useState(null);

//   // State for Snackbar notifications
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   const departments = ['Integrated Technology Services', 'Human Resources', 'Finance', 'Marketing', 'Operations', 'Account and Finance', 'Human Resource'];

//   // Responsive design helpers
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // --- Data Fetching ---
//   const fetchResignations = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get('https://tdtlworld.com/hrms-backend/resignations/');

//       const transformedData = response.data.map(res => ({
//         id: res.resignation_id,
//         company_id: res.company_id,
//         employee_id: res.employee_id,
//         employeeName: res.employee_name || 'N/A',
//         department: res.department_name || 'N/A',
//         resignationDate: parseDate(res.resignation_date),
//         noticeDate: parseDate(res.last_working_day),
//         resignationReason: res.reason || '',
//         status: res.status || 'Pending',
//         created_at: res.created_at,
//       }));

//       setResignations(transformedData);
//     } catch (err) {
//       setError('Failed to fetch data. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchResignations();
//   }, [fetchResignations]);

//   // --- Handlers ---
//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleReset = () => {
//     setFormData({ employeeName: '', department: '', resignationDate: null, noticeDate: null, resignationReason: '' });
//   };

//   const handleAddNewClick = () => {
//     handleReset();
//     setShowFormDialog(true);
//   };

//   const handleCloseFormDialog = () => {
//     if (isSubmitting) return; // Prevent closing while submitting
//     setShowFormDialog(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.employeeName || !formData.department || !formData.resignationDate || !formData.noticeDate || !formData.resignationReason) {
//       setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
//       return;
//     }

//     setIsSubmitting(true);
//     const payload = {
//       employee_name: formData.employeeName,
//       department_name: formData.department,
//       resignation_date: formatDateForAPI(formData.resignationDate),
//       last_working_day: formatDateForAPI(formData.noticeDate),
//       reason: formData.resignationReason,
//       status: 'Pending',
//     };

//     try {
//       await axios.post('https://tdtlworld.com/hrms-backend/resignations/', payload);
//       setSnackbar({ open: true, message: 'Resignation submitted successfully!', severity: 'success' });
//       setShowFormDialog(false);
//       fetchResignations();
//     } catch (err) {
//       console.error("Failed to submit resignation:", err);
//       setSnackbar({ open: true, message: 'Failed to submit resignation. Please try again.', severity: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleApproveClick = (resignation) => {
//     setResignationToApprove(resignation);
//     setLastWorkingDate(null);
//     setApproveDialogOpen(true);
//   };

//   const handleConfirmApproval = async () => {
//     if (!lastWorkingDate) {
//       setSnackbar({ open: true, message: 'Please select a last working date.', severity: 'error' });
//       return;
//     }

//     setIsSubmitting(true);
//     const payload = {
//       status: "approved",
//       last_working_day: formatDateForAPI(lastWorkingDate),
//     };

//     try {
//       await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${resignationToApprove.id}/`, payload);
//       setResignations(resignations.map(res =>
//         res.id === resignationToApprove.id ? { ...res, status: 'Approved', noticeDate: lastWorkingDate } : res
//       ));
//       setSnackbar({ open: true, message: 'Resignation approved successfully!', severity: 'success' });
//       setApproveDialogOpen(false);
//     } catch (err) {
//       console.error("Failed to approve resignation:", err);
//       setSnackbar({ open: true, message: 'Failed to approve resignation. Please try again.', severity: 'error' });
//     } finally {
//       setIsSubmitting(false);
//       setResignationToApprove(null);
//     }
//   };

//   const handleReject = async (resignationId) => {
//     if (!window.confirm('Are you sure you want to reject this resignation?')) return;
//     const payload = { status: 'rejected' };
//     try {
//       await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${resignationId}/`, payload);
//       setResignations(resignations.map(res =>
//         res.id === resignationId ? { ...res, status: 'Rejected' } : res
//       ));
//       setSnackbar({ open: true, message: 'Resignation rejected.', severity: 'success' });
//     } catch (err) {
//       console.error("Failed to reject resignation:", err);
//       setSnackbar({ open: true, message: 'Failed to reject resignation. Please try again.', severity: 'error' });
//     }
//   };

//   const handleViewClick = (resignation) => {
//     setSelectedResignation(resignation);
//     setViewDialogOpen(true);
//   };

//   // --- Pagination Handlers ---
//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredResignations = resignations.filter(resignation =>
//     Object.values(resignation).some(value =>
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const getStatusChip = (status) => {
//     const normalizedStatus = status ? status.toLowerCase() : 'pending';
//     let color;
//     switch (normalizedStatus) {
//       case 'approved': color = 'success'; break;
//       case 'rejected': color = 'error'; break;
//       case 'pending': default: color = 'warning'; break;
//     }
//     return <Chip label={status} color={color} size="small" />;
//   };

//   const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

//   // --- Render ---
//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 2 }}>
//           Resignation
//         </Typography>

//         <Stack
//           direction={isMobile ? 'column' : 'row'}
//           justifyContent="space-between"
//           alignItems={isMobile ? 'stretch' : 'center'}
//           spacing={2}
//           mb={3}
//         >
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleAddNewClick}
//             sx={{
//               backgroundColor: '#8C257C',
//               color: 'white',
//               '&:hover': { backgroundColor: '#6d1d60' },
//             }}
//           >
//             Add New
//           </Button>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Stack>

//         <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <Table>
//             <TableHead sx={{ backgroundColor: '#8C257C' }}>
//               <TableRow>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EMPLOYEE NAME</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DEPARTMENT</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>RESIGNATION DATE</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>NOTICE DATE</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>STATUS</TableCell>
//                 <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 [...Array(rowsPerPage)].map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" width={80} /></TableCell>
//                     <TableCell align="center"><Skeleton variant="rectangular" width={180} height={30} /></TableCell>
//                   </TableRow>
//                 ))
//               ) : error ? (
//                 <TableRow><TableCell colSpan={7} align="center" sx={{ color: 'red' }}>{error}</TableCell></TableRow>
//               ) : filteredResignations.length === 0 ? (
//                 <TableRow><TableCell colSpan={7} align="center">No records available</TableCell></TableRow>
//               ) : (
//                 filteredResignations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((resignation, index) => (
//                   <TableRow key={resignation.id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{resignation.employeeName}</TableCell>
//                     <TableCell>{resignation.department}</TableCell>
//                     <TableCell>{resignation.resignationDate ? resignation.resignationDate.toLocaleDateString() : 'N/A'}</TableCell>
//                     <TableCell>{resignation.noticeDate ? resignation.noticeDate.toLocaleDateString() : 'N/A'}</TableCell>
//                     <TableCell>{getStatusChip(resignation.status)}</TableCell>
//                     <TableCell align="center">
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <Button
//                           variant="contained"
//                           size="small"
//                           onClick={() => handleViewClick(resignation)}
//                           startIcon={<VisibilityIcon />}
//                           sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }}
//                         >
//                           View
//                         </Button>
//                         {resignation.status.toLowerCase() === 'pending' && (
//                           <>
//                             <Button
//                               variant="contained"
//                               size="small"
//                               onClick={() => handleApproveClick(resignation)}
//                               sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }}
//                             >
//                               Approve
//                             </Button>
//                             <Button variant="contained" color="error" size="small" onClick={() => handleReject(resignation.id)}>Reject</Button>
//                           </>
//                         )}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           component="div"
//           count={filteredResignations.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />

//         {/* Add Resignation Dialog */}
//         <Dialog open={showFormDialog} onClose={handleCloseFormDialog} fullWidth maxWidth="sm">
//           <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//             Submit Resignation
//           </DialogTitle>
//           <DialogContent>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} md={6}><TextField fullWidth required label="Employee Name" value={formData.employeeName} onChange={(e) => handleInputChange('employeeName', e.target.value)} /></Grid>
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth required>
//                     <InputLabel>Department</InputLabel>
//                     <Select value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} label="Department">
//                       {departments.map((dept) => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={6}><DatePicker label="Resignation Date" value={formData.resignationDate} onChange={(date) => handleInputChange('resignationDate', date)} renderInput={(params) => <TextField {...params} fullWidth required />} /></Grid>
//                 <Grid item xs={12} md={6}><DatePicker label="Notice Date" value={formData.noticeDate} onChange={(date) => handleInputChange('noticeDate', date)} renderInput={(params) => <TextField {...params} fullWidth required />} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth required label="Resignation Reason" multiline rows={4} value={formData.resignationReason} onChange={(e) => handleInputChange('resignationReason', e.target.value)} /></Grid>
//               </Grid>
//             </form>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseFormDialog} sx={{ color: '#757575' }} disabled={isSubmitting}>Cancel</Button>
//             <Button onClick={handleSubmit} variant="contained" disabled={isSubmitting} sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' }, color: 'white' }}>
//               {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Approve Resignation Dialog */}
//         <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)}>
//           <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//             Confirm Approval
//           </DialogTitle>
//           <DialogContent sx={{ pt: '20px !important' }}>
//             <DatePicker label="Select Last Working Date" value={lastWorkingDate} onChange={(date) => setLastWorkingDate(date)} renderInput={(params) => <TextField {...params} fullWidth />} />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setApproveDialogOpen(false)} sx={{ color: '#757575' }} disabled={isSubmitting}>Cancel</Button>
//             <Button onClick={handleConfirmApproval} variant="contained" disabled={isSubmitting} sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' }, color: 'white' }}>
//               {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Confirm & Approve'}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* View Resignation Details Dialog */}
//         <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} fullWidth maxWidth="sm">
//           <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//             Resignation Details
//           </DialogTitle>
//           <DialogContent>
//             {selectedResignation && (
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} sm={6}><DialogContentText><strong>Employee ID:</strong> {selectedResignation.employee_id}</DialogContentText></Grid>
//                 <Grid item xs={12} sm={6}><DialogContentText><strong>Employee Name:</strong> {selectedResignation.employeeName}</DialogContentText></Grid>
//                 <Grid item xs={12} sm={6}><DialogContentText><strong>Department:</strong> {selectedResignation.department}</DialogContentText></Grid>
//                 <Grid item xs={12} sm={6}><DialogContentText><strong>Resignation Date:</strong> {selectedResignation.resignationDate ? selectedResignation.resignationDate.toLocaleDateString() : 'N/A'}</DialogContentText></Grid>
//                 <Grid item xs={12} sm={6}><DialogContentText><strong>Last Working Day:</strong> {selectedResignation.noticeDate ? selectedResignation.noticeDate.toLocaleDateString() : 'N/A'}</DialogContentText></Grid>
//                 <Grid item xs={12} sm={6}><DialogContentText><strong>Status:</strong> {getStatusChip(selectedResignation.status)}</DialogContentText></Grid>
//                 <Grid item xs={12}><DialogContentText><strong>Created At:</strong> {new Date(selectedResignation.created_at).toLocaleString()}</DialogContentText></Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Reason:</Typography>
//                   <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1, backgroundColor: 'rgba(140, 37, 124, 0.05)' }}>
//                     <Typography variant="body2">{selectedResignation.resignationReason}</Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setViewDialogOpen(false)} sx={{color: '#8C257C' }}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//           <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </LocalizationProvider>
//   );
// }



import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
  Stack,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Skeleton,
  TablePagination,
  DialogContentText,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Add as AddIcon, Search as SearchIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

const parseDate = (dateString) => {
  if (!dateString) return null;
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split('-');
    return new Date(year, month - 1, day);
  }
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

const formatDateForAPI = (date) => {
  if (!date) return null;
  return date.toISOString().split('T')[0];
};

export default function ResignationManagement() {
  const [resignations, setResignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    resignationDate: null,
    noticeDate: null,
    resignationReason: '',
  });

  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [resignationToApprove, setResignationToApprove] = useState(null);
  const [lastWorkingDate, setLastWorkingDate] = useState(null);

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedResignation, setSelectedResignation] = useState(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const departments = ['Integrated Technology Services', 'Human Resources', 'Finance', 'Marketing', 'Operations', 'Account and Finance', 'Human Resource'];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchResignations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://tdtlworld.com/hrms-backend/resignations/');

      const transformedData = response.data.map(res => ({
        id: res.resignation_id,
        company_id: res.company_id,
        employee_id: res.employee_id,
        employeeName: res.employee_name || 'N/A',
        department: res.department_name || 'N/A',
        resignationDate: parseDate(res.resignation_date),
        noticeDate: parseDate(res.last_working_day),
        resignationReason: res.reason || '',
        status: res.status || 'Pending',
        created_at: res.created_at,
      }));

      setResignations(transformedData);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResignations();
  }, [fetchResignations]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({ employeeName: '', department: '', resignationDate: null, noticeDate: null, resignationReason: '' });
  };

  const handleAddNewClick = () => {
    handleReset();
    setShowFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    if (isSubmitting) return;
    setShowFormDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employeeName || !formData.department || !formData.resignationDate || !formData.noticeDate || !formData.resignationReason) {
      setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
      return;
    }

    setIsSubmitting(true);
    const payload = {
      employee_name: formData.employeeName,
      department_name: formData.department,
      resignation_date: formatDateForAPI(formData.resignationDate),
      last_working_day: formatDateForAPI(formData.noticeDate),
      reason: formData.resignationReason,
      status: 'Pending',
    };

    try {
      await axios.post('https://tdtlworld.com/hrms-backend/resignations/', payload);
      setSnackbar({ open: true, message: 'Resignation submitted successfully!', severity: 'success' });
      setShowFormDialog(false);
      fetchResignations();
    } catch (err) {
      console.error("Failed to submit resignation:", err);
      setSnackbar({ open: true, message: 'Failed to submit resignation. Please try again.', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveClick = (resignation) => {
    setResignationToApprove(resignation);
    setLastWorkingDate(null);
    setApproveDialogOpen(true);
  };

  const handleConfirmApproval = async () => {
    if (!lastWorkingDate) {
      setSnackbar({ open: true, message: 'Please select a last working date.', severity: 'error' });
      return;
    }

    setIsSubmitting(true);
    const payload = {
      status: "approved",
      last_working_day: formatDateForAPI(lastWorkingDate),
    };

    try {
      await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${resignationToApprove.id}/`, payload);
      setResignations(resignations.map(res =>
        res.id === resignationToApprove.id ? { ...res, status: 'Approved', noticeDate: lastWorkingDate } : res
      ));
      setSnackbar({ open: true, message: 'Resignation approved successfully!', severity: 'success' });
      setApproveDialogOpen(false);
    } catch (err) {
      console.error("Failed to approve resignation:", err);
      setSnackbar({ open: true, message: 'Failed to approve resignation. Please try again.', severity: 'error' });
    } finally {
      setIsSubmitting(false);
      setResignationToApprove(null);
    }
  };

  const handleReject = async (resignationId) => {
    if (!window.confirm('Are you sure you want to reject this resignation?')) return;
    const payload = { status: 'rejected' };
    try {
      await axios.patch(`https://tdtlworld.com/hrms-backend/resignations/${resignationId}/`, payload);
      setResignations(resignations.map(res =>
        res.id === resignationId ? { ...res, status: 'Rejected' } : res
      ));
      setSnackbar({ open: true, message: 'Resignation rejected.', severity: 'success' });
    } catch (err) {
      console.error("Failed to reject resignation:", err);
      setSnackbar({ open: true, message: 'Failed to reject resignation. Please try again.', severity: 'error' });
    }
  };

  const handleViewClick = (resignation) => {
    setSelectedResignation(resignation);
    setViewDialogOpen(true);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredResignations = resignations.filter(resignation =>
    Object.values(resignation).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusChip = (status) => {
    const normalizedStatus = status ? status.toLowerCase() : 'pending';
    let color;
    switch (normalizedStatus) {
      case 'approved':
      case 'accepted':
        color = 'success';
        break;
      case 'rejected':
        color = 'error';
        break;
      case 'pending':
      default:
        color = 'warning';
        break;
    }
    return <Chip label={status} color={color} size="small" />;
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component={Paper} p={3}>
        <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 2 }}>
          Resignation
        </Typography>

        <Stack
          direction={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems={isMobile ? 'stretch' : 'center'}
          spacing={2}
          mb={3}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNewClick}
            sx={{
              backgroundColor: '#8C257C',
              color: 'white',
              '&:hover': { backgroundColor: '#6d1d60' },
            }}
          >
            Add New
          </Button>
          <TextField
            size="small"
            placeholder="Search..."
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
        </Stack>

        <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#8C257C' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR. NO.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EMPLOYEE NAME</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DEPARTMENT</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>RESIGNATION DATE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>NOTICE DATE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>STATUS</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                [...Array(rowsPerPage)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" width={80} /></TableCell>
                    <TableCell align="center"><Skeleton variant="rectangular" width={180} height={30} /></TableCell>
                  </TableRow>
                ))
              ) : error ? (
                <TableRow><TableCell colSpan={7} align="center" sx={{ color: 'red' }}>{error}</TableCell></TableRow>
              ) : filteredResignations.length === 0 ? (
                <TableRow><TableCell colSpan={7} align="center">No records available</TableCell></TableRow>
              ) : (
                filteredResignations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((resignation, index) => (
                  <TableRow key={resignation.id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{resignation.employeeName}</TableCell>
                    <TableCell>{resignation.department}</TableCell>
                    <TableCell>{resignation.resignationDate ? resignation.resignationDate.toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>{resignation.noticeDate ? resignation.noticeDate.toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>{getStatusChip(resignation.status)}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleViewClick(resignation)}
                          startIcon={<VisibilityIcon />}
                          sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }}
                        >
                          View
                        </Button>
                        {resignation.status.toLowerCase() === 'pending' && (
                          <>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleApproveClick(resignation)}
                              sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }}
                            >
                              Approve
                            </Button>
                            <Button variant="contained" color="error" size="small" onClick={() => handleReject(resignation.id)}>Reject</Button>
                          </>
                        )}
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
          count={filteredResignations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog open={showFormDialog} onClose={handleCloseFormDialog} fullWidth maxWidth="sm">
          <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
            Submit Resignation
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}><TextField fullWidth required label="Employee Name" value={formData.employeeName} onChange={(e) => handleInputChange('employeeName', e.target.value)} /></Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Department</InputLabel>
                    <Select value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} label="Department">
                      {departments.map((dept) => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}><DatePicker label="Resignation Date" value={formData.resignationDate} onChange={(date) => handleInputChange('resignationDate', date)} renderInput={(params) => <TextField {...params} fullWidth required />} /></Grid>
                <Grid item xs={12} md={6}><DatePicker label="Notice Date" value={formData.noticeDate} onChange={(date) => handleInputChange('noticeDate', date)} renderInput={(params) => <TextField {...params} fullWidth required />} /></Grid>
                <Grid item xs={12}><TextField fullWidth required label="Resignation Reason" multiline rows={4} value={formData.resignationReason} onChange={(e) => handleInputChange('resignationReason', e.target.value)} /></Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFormDialog} sx={{ color: '#757575' }} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={isSubmitting} sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' }, color: 'white' }}>
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)}>
          <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
            Confirm Approval
          </DialogTitle>
          <DialogContent sx={{ pt: '20px !important' }}>
            <DatePicker label="Select Last Working Date" value={lastWorkingDate} onChange={(date) => setLastWorkingDate(date)} renderInput={(params) => <TextField {...params} fullWidth />} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setApproveDialogOpen(false)} sx={{ color: '#757575' }} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleConfirmApproval} variant="contained" disabled={isSubmitting} sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' }, color: 'white' }}>
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Confirm & Approve'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
            Resignation Details
          </DialogTitle>
          <DialogContent>
            {selectedResignation && (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}><DialogContentText><strong>Employee ID:</strong> {selectedResignation.employee_id}</DialogContentText></Grid>
                <Grid item xs={12} sm={6}><DialogContentText><strong>Employee Name:</strong> {selectedResignation.employeeName}</DialogContentText></Grid>
                <Grid item xs={12} sm={6}><DialogContentText><strong>Department:</strong> {selectedResignation.department}</DialogContentText></Grid>
                <Grid item xs={12} sm={6}><DialogContentText><strong>Resignation Date:</strong> {selectedResignation.resignationDate ? selectedResignation.resignationDate.toLocaleDateString() : 'N/A'}</DialogContentText></Grid>
                <Grid item xs={12} sm={6}><DialogContentText><strong>Last Working Day:</strong> {selectedResignation.noticeDate ? selectedResignation.noticeDate.toLocaleDateString() : 'N/A'}</DialogContentText></Grid>
                <Grid item xs={12} sm={6}><DialogContentText><strong>Status:</strong> {getStatusChip(selectedResignation.status)}</DialogContentText></Grid>
                <Grid item xs={12}><DialogContentText><strong>Created At:</strong> {new Date(selectedResignation.created_at).toLocaleString()}</DialogContentText></Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Reason:</Typography>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1, backgroundColor: 'rgba(140, 37, 124, 0.05)' }}>
                    <Typography variant="body2">{selectedResignation.resignationReason}</Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)} sx={{color: '#8C257C' }}>Close</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}