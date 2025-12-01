// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   Button,
// //   Card,
// //   FormControl,
// //   Grid,
// //   IconButton,
// //   InputLabel,
// //   MenuItem,
// //   Paper,
// //   Select,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TextField,
// //   Typography,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// // } from '@mui/material';
// // import {
// //   Add as AddIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Close as CloseIcon,
// // } from '@mui/icons-material';

// // const departments = [
// //   'Integrated Technology Services',
// //   'Human Resources',
// //   'Finance',
// //   'Operations'
// // ];

// // export default function DocumentManagement() {
// //   const [documents, setDocuments] = useState([]);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [editIndex, setEditIndex] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [entriesPerPage, setEntriesPerPage] = useState(10);
// //   const [formData, setFormData] = useState({
// //     department: '',
// //     documentName: '',
// //     documentType: '',
// //     documentFile: null
// //   });
// //   const [errors, setErrors] = useState({});

// //   const handleInputChange = (field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //     // Clear error when user types
// //     if (errors[field]) {
// //       setErrors(prev => ({ ...prev, [field]: '' }));
// //     }
// //   };

// //   const handleFileChange = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
// //       if (allowedTypes.includes(file.type)) {
// //         setFormData(prev => ({ ...prev, documentFile: file }));
// //         if (errors.documentFile) {
// //           setErrors(prev => ({ ...prev, documentFile: '' }));
// //         }
// //       } else {
// //         setErrors(prev => ({ ...prev, documentFile: 'Invalid file type' }));
// //       }
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.department) newErrors.department = 'Department is required';
// //     if (!formData.documentName) newErrors.documentName = 'Document name is required';
// //     if (!formData.documentType) newErrors.documentType = 'Document type is required';
// //     if (!formData.documentFile && !editIndex) newErrors.documentFile = 'Document file is required';
    
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = () => {
// //     if (validateForm()) {
// //       if (editIndex !== null) {
// //         // Update existing document
// //         const updatedDocuments = [...documents];
// //         updatedDocuments[editIndex] = {
// //           ...formData,
// //           documentFile: formData.documentFile || updatedDocuments[editIndex].documentFile
// //         };
// //         setDocuments(updatedDocuments);
// //       } else {
// //         // Add new document
// //         setDocuments(prev => [...prev, { ...formData }]);
// //       }
// //       handleCloseDialog();
// //     }
// //   };

// //   const handleOpenDialog = (index = null) => {
// //     if (index !== null) {
// //       setFormData(documents[index]);
// //       setEditIndex(index);
// //     } else {
// //       setFormData({
// //         department: '',
// //         documentName: '',
// //         documentType: '',
// //         documentFile: null
// //       });
// //       setEditIndex(null);
// //     }
// //     setOpenDialog(true);
// //   };

// //   const handleCloseDialog = () => {
// //     setOpenDialog(false);
// //     setFormData({
// //       department: '',
// //       documentName: '',
// //       documentType: '',
// //       documentFile: null
// //     });
// //     setEditIndex(null);
// //     setErrors({});
// //   };

// //   const handleDelete = (index) => {
// //     const updatedDocuments = documents.filter((_, i) => i !== index);
// //     setDocuments(updatedDocuments);
// //   };

// //   const filteredDocuments = documents.filter(doc =>
// //     Object.values(doc).some(value => 
// //       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
// //     )
// //   );

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Card sx={{ mb: 3 }}>
// //         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //           <Typography variant="h6">List All Events</Typography>
// //           {/* <Button
// //             variant="contained"
// //             color="primary"
// //             startIcon={<AddIcon />}
// //             onClick={() => handleOpenDialog()}
// //           >
// //             Add New
// //           </Button> */}
// //         </Box>
        
// //         <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //             <Typography>Show</Typography>
// //             <Select
// //               value={entriesPerPage}
// //               onChange={(e) => setEntriesPerPage(e.target.value)}
// //               size="small"
// //             >
// //               <MenuItem value={10}>10</MenuItem>
// //               <MenuItem value={25}>25</MenuItem>
// //               <MenuItem value={50}>50</MenuItem>
// //             </Select>
// //             <Typography>entries</Typography>
// //           </Box>
// //           <TextField
// //             placeholder="Search..."
// //             size="small"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </Box>

// //         <TableContainer component={Paper} sx={{ m: 2 }}>
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell>EVENT TITLE</TableCell>
// //                 <TableCell>EMPLOYEES</TableCell>
// //                 <TableCell>EVENT DATE</TableCell>
// //                 <TableCell>EVENT TIME</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {filteredDocuments.length === 0 ? (
// //                 <TableRow>
// //                   <TableCell colSpan={5} align="center">No records available</TableCell>
// //                 </TableRow>
// //               ) : (
// //                 filteredDocuments.map((doc, index) => (
// //                   <TableRow key={index}>
// //                     <TableCell>{doc.department}</TableCell>
// //                     <TableCell>{doc.documentName}</TableCell>
// //                     <TableCell>{doc.documentType}</TableCell>
// //                     <TableCell>{doc.documentFile?.name}</TableCell>
// //                     <TableCell>
// //                       <IconButton color="primary" onClick={() => handleOpenDialog(index)}>
// //                         <EditIcon />
// //                       </IconButton>
// //                       <IconButton color="error" onClick={() => handleDelete(index)}>
// //                         <DeleteIcon />
// //                       </IconButton>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Card>

// //       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
// //         <DialogTitle>
// //           <Box display="flex" justifyContent="space-between" alignItems="center">
// //             <Typography variant="h6">
// //               {editIndex !== null ? 'Edit Document' : 'Add New Document'}
// //             </Typography>
// //             <IconButton onClick={handleCloseDialog} size="small">
// //               <CloseIcon />
// //             </IconButton>
// //           </Box>
// //         </DialogTitle>
// //         <DialogContent>
// //           <Grid container spacing={2} sx={{ mt: 1 }}>
// //             <Grid item xs={12}>
// //               <FormControl fullWidth error={!!errors.department}>
// //                 <InputLabel>Department</InputLabel>
// //                 <Select
// //                   value={formData.department}
// //                   onChange={(e) => handleInputChange('department', e.target.value)}
// //                   label="Department"
// //                 >
// //                   {departments.map((dept) => (
// //                     <MenuItem key={dept} value={dept}>
// //                       {dept}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //                 {errors.department && (
// //                   <Typography color="error" variant="caption">
// //                     {errors.department}
// //                   </Typography>
// //                 )}
// //               </FormControl>
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Document Name"
// //                 value={formData.documentName}
// //                 onChange={(e) => handleInputChange('documentName', e.target.value)}
// //                 error={!!errors.documentName}
// //                 helperText={errors.documentName}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Document Type"
// //                 value={formData.documentType}
// //                 onChange={(e) => handleInputChange('documentType', e.target.value)}
// //                 error={!!errors.documentType}
// //                 helperText={errors.documentType}
// //                 placeholder="E.g. Payslip"
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <input
// //                 accept=".png,.jpg,.jpeg,.gif,.pdf,.doc,.docx"
// //                 style={{ display: 'none' }}
// //                 id="document-file"
// //                 type="file"
// //                 onChange={handleFileChange}
// //               />
// //               <label htmlFor="document-file">
// //                 <Button variant="outlined" component="span" fullWidth>
// //                   Choose File
// //                 </Button>
// //               </label>
// //               {formData.documentFile && (
// //                 <Typography variant="caption" display="block" sx={{ mt: 1 }}>
// //                   Selected: {formData.documentFile.name}
// //                 </Typography>
// //               )}
// //               {errors.documentFile && (
// //                 <Typography color="error" variant="caption">
// //                   {errors.documentFile}
// //                 </Typography>
// //               )}
// //               <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
// //                 Upload files only: png, jpg, jpeg, gif, pdf, doc, docx
// //               </Typography>
// //             </Grid>
// //           </Grid>
// //         </DialogContent>
// //         <DialogActions sx={{ p: 2 }}>
// //           <Button onClick={handleCloseDialog} variant="outlined">
// //             Reset
// //           </Button>
// //           <Button onClick={handleSubmit} variant="contained" color="primary">
// //             Save
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // }

// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography
// } from '@mui/material';

// export default function DocumentManagement() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [entriesPerPage, setEntriesPerPage] = useState(10);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Card sx={{ mb: 3 }}>
//         <Box
//           sx={{
//             p: 2,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}
//         >
//           <Typography variant="h6">List All Events</Typography>
//         </Box>

//         <Box
//           sx={{
//             px: 2,
//             py: 1,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Typography>Show</Typography>
//             <Select
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(e.target.value)}
//               size="small"
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//             <Typography>entries</Typography>
//           </Box>
//           <TextField
//             placeholder="Search..."
//             size="small"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Box>

//         <TableContainer component={Paper} sx={{ m: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>EVENT TITLE</TableCell>
//                 <TableCell>EMPLOYEES</TableCell>
//                 <TableCell>EVENT DATE</TableCell>
//                 <TableCell>EVENT TIME</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No records available
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>
//     </Box>
//   );
// }











// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   CircularProgress // Added for loading indicator
// } from '@mui/material';
 
// export default function DocumentManagement() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 
//   useEffect(() => {
//     const fetchEvents = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const employee_id = localStorage.getItem("EmID");
//         const accessToken = localStorage.getItem("accessToken");
 
//         if (!employee_id) {
//           setError("Employee ID not found in local storage.");
//           setLoading(false);
//           return;
//         }
 
//         if (!accessToken) {
//           setError("Access Token not found in local storage.");
//           setLoading(false);
//           return;
//         }
 
//         const url = `https://tdtlworld.com/hrms-backend/employee_events/${employee_id}/`;
 
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         });
 
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
 
//         const data = await response.json();
//         setEvents(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     fetchEvents();
//   }, []); // Empty dependency array means this effect runs once after the initial render
 
//   // Filter and paginate events based on search term and entriesPerPage
//   const filteredEvents = events.filter(event =>
//     event.event_title.toLowerCase().includes(searchTerm.toLowerCase())
//   );
 
//   const paginatedEvents = filteredEvents.slice(0, entriesPerPage);
 
//   return (
//     <Box sx={{ p: 3 }}>
//       <Card sx={{ mb: 3 }}>
//         <Box
//           sx={{
//             p: 2,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}
//         >
//           <Typography variant="h6">List All Events</Typography>
//         </Box>
 
//         <Box
//           sx={{
//             px: 2,
//             py: 1,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Typography>Show</Typography>
//             <Select
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(e.target.value)}
//               size="small"
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//             <Typography>entries</Typography>
//           </Box>
//           <TextField
//             placeholder="Search..."
//             size="small"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Box>
 
//         <TableContainer component={Paper} sx={{ m: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>EVENT TITLE</TableCell>
//                 {/* <TableCell>EMPLOYEES</TableCell> */}
//                 <TableCell>EVENT DATE</TableCell>
//                 <TableCell>EVENT TIME</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center">
//                     <CircularProgress size={24} />
//                   </TableCell>
//                 </TableRow>
//               ) : error ? (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center" sx={{ color: 'red' }}>
//                     Error: {error}
//                   </TableCell>
//                 </TableRow>
//               ) : paginatedEvents.length > 0 ? (
//                 paginatedEvents.map((event, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{event.event_title}</TableCell>
//                     {/* <TableCell> */}
//                       {/* Assuming 'employees' field might be an array or string. Adjust as per actual API response */}
//                       {/* {event.employees || 'N/A'}
//                     </TableCell> */}
//                     <TableCell>{event.event_date}</TableCell>
//                     <TableCell>{event.event_time}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center">
//                     No records available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>
//     </Box>
//   );
// }











  // import React, { useState, useEffect } from 'react';
  // import {
  //   Box,
  //   Button,
  //   Card,
  //   CircularProgress,
  //   Dialog,
  //   DialogActions,
  //   DialogContent,
  //   DialogTitle,
  //   InputAdornment,
  //   MenuItem,
  //   Paper,
  //   Select,
  //   Skeleton,
  //   Stack,
  //   Table,
  //   TableBody,
  //   TableCell,
  //   TableContainer,
  //   TableHead,
  //   TablePagination,
  //   TableRow,
  //   TextField,
  //   Typography,
  //   useMediaQuery,
  //   useTheme,
  // } from '@mui/material';
  // import { Add, Search as SearchIcon } from '@mui/icons-material';
  // import Swal from 'sweetalert2';

  // export default function DocumentManagement() {
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [events, setEvents] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(5);
  //   const [openDialog, setOpenDialog] = useState(false);
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  //   const theme = useTheme();
  //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  //   useEffect(() => {
  //     const fetchEvents = async () => {
  //       setLoading(true);
  //       setError(null);
  //       try {
  //         const employee_id = localStorage.getItem('EmID');
  //         const accessToken = localStorage.getItem('accessToken');

  //         if (!employee_id || !accessToken) {
  //           setError('User authentication details not found.');
  //           setLoading(false);
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Authentication Error',
  //             text: 'Employee ID or Access Token not found.',
  //             timer: 3000,
  //             showConfirmButton: false,
  //           });
  //           return;
  //         }

  //         const url = `https://tdtlworld.com/hrms-backend/employee_events/${employee_id}/`;
  //         const response = await fetch(url, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }

  //         const data = await response.json();
  //         setEvents(data);
  //       } catch (err) {
  //         setError(err.message);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Failed to Fetch Events',
  //           text: err.message,
  //           timer: 3000,
  //           showConfirmButton: false,
  //         });
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchEvents();
  //   }, []);

  //   const handleSearchChange = (event) => {
  //     setSearchTerm(event.target.value);
  //     setPage(0);
  //   };

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };

  //   const handleOpenDialog = () => setOpenDialog(true);
  //   const handleCloseDialog = () => setOpenDialog(false);

  //   const handleFormSubmit = async (event) => {
  //     event.preventDefault();
  //     setIsSubmitting(true);
  //     // Mock API call
  //     setTimeout(() => {
  //       setIsSubmitting(false);
  //       handleCloseDialog();
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Event Added!',
  //         text: 'The new event has been saved successfully.',
  //         timer: 3000,
  //         showConfirmButton: false,
  //       });
  //     }, 2000);
  //   };

  //   const filteredEvents = events.filter((event) =>
  //     event.event_title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   const paginatedEvents = filteredEvents.slice(
  //     page * rowsPerPage,
  //     page * rowsPerPage + rowsPerPage
  //   );

  //   const emptyRows =
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredEvents.length) : 0;

  //   return (
  //     <Box component={Paper} p={3}>
  //       <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 5 }}>
  //       Events
  //       </Typography>

  //       <Stack
  //         direction={isMobile ? 'column' : 'row'}
  //         justifyContent="space-between"
  //         alignItems={isMobile ? 'stretch' : 'center'}
  //         spacing={2}
  //         mb={2}
  //       >
  //         <Button
  //           variant="contained"
  //           startIcon={<Add />}
  //           onClick={handleOpenDialog}
  //           sx={{
  //             backgroundColor: '#8C257C',
  //             color: 'white',
  //             '&:hover': { backgroundColor: '#6d1d60' },
  //           }}
  //         >
  //           Add New
  //         </Button>
  //         <TextField
  //           size="small"
  //           placeholder="Search ..."
  //           value={searchTerm}
  //           onChange={handleSearchChange}
  //           InputProps={{
  //             startAdornment: (
  //               <InputAdornment position="start">
  //                 <SearchIcon />
  //               </InputAdornment>
  //             ),
  //           }}
  //           sx={{ width: isMobile ? '100%' : 'auto' }}
  //         />
  //       </Stack>

  //       <TableContainer>
  //         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
  //           <TableHead sx={{ backgroundColor: '#8C257C' }}>
  //             <TableRow>
  //               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EVENT TITLE</TableCell>
  //               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EVENT DATE</TableCell>
  //               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EVENT TIME</TableCell>
  //               <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ACTIONS</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {loading ? (
  //               Array.from(new Array(rowsPerPage)).map((_, index) => (
  //                 <TableRow key={index}>
  //                   <TableCell><Skeleton variant="text" /></TableCell>
  //                   <TableCell><Skeleton variant="text" /></TableCell>
  //                   <TableCell><Skeleton variant="text" /></TableCell>
  //                   <TableCell align="center">
  //                     <Skeleton variant="rectangular" width={120} height={30} />
  //                   </TableCell>
  //                 </TableRow>
  //               ))
  //             ) : error ? (
  //               <TableRow>
  //                 <TableCell colSpan={4} align="center" sx={{ color: 'red' }}>
  //                   Error: {error}
  //                 </TableCell>
  //               </TableRow>
  //             ) : paginatedEvents.length > 0 ? (
  //               paginatedEvents.map((event, index) => (
  //                 <TableRow key={index} hover>
  //                   <TableCell sx={{ fontSize: '0.95rem' }}>{event.event_title}</TableCell>
  //                   <TableCell sx={{ fontSize: '0.95rem' }}>{event.event_date}</TableCell>
  //                   <TableCell sx={{ fontSize: '0.95rem' }}>{event.event_time}</TableCell>
  //                   <TableCell>
  //                     <Box display="flex" justifyContent="center" gap={0.5}>
  //                       {/* Action buttons would go here */}
  //                     </Box>
  //                   </TableCell>
  //                 </TableRow>
  //               ))
  //             ) : (
  //               <TableRow>
  //                 <TableCell colSpan={4} align="center">
  //                   No records available
  //                 </TableCell>
  //               </TableRow>
  //             )}
  //             {emptyRows > 0 && (
  //               <TableRow style={{ height: 53 * emptyRows }}>
  //                 <TableCell colSpan={4} />
  //               </TableRow>
  //             )}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>

  //       <Box
  //         sx={{
  //           p: 2,
  //           display: 'flex',
  //           flexDirection: isMobile ? 'column' : 'row',
  //           justifyContent: 'space-between',
  //           alignItems: 'center',
  //           gap: 2,
  //         }}
  //       >
  //         <Typography variant="body2" color="text.secondary">
  //           Showing {Math.min(rowsPerPage, paginatedEvents.length)} of {filteredEvents.length} results
  //         </Typography>
  //         <TablePagination
  //           rowsPerPageOptions={[5, 10, 15, 25]}
  //           component="div"
  //           count={filteredEvents.length}
  //           rowsPerPage={rowsPerPage}
  //           page={page}
  //           onPageChange={handleChangePage}
  //           onRowsPerPageChange={handleChangeRowsPerPage}
  //           sx={{
  //             '& .MuiTablePagination-selectIcon, & .MuiTablePagination-actions': {
  //               color: '#8C257C',
  //             },
  //           }}
  //         />
  //       </Box>

  //       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
  //         <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
  //           Add New Event
  //         </DialogTitle>
  //         <DialogContent>
  //           <form onSubmit={handleFormSubmit}>
  //             <Stack spacing={2} sx={{ mt: 2 }}>
  //               <TextField label="Event Title" fullWidth required />
  //               <TextField label="Event Description" fullWidth multiline rows={4} />
  //               <TextField type="file" inputProps={{ accept: '.pdf' }} helperText="Please upload PDF files only." />
  //             </Stack>
  //           </form>
  //         </DialogContent>
  //         <DialogActions sx={{ p: '16px 24px' }}>
  //           <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>
  //             Cancel
  //           </Button>
  //           <Button
  //             type="submit"
  //             onClick={handleFormSubmit}
  //             variant="contained"
  //             disabled={isSubmitting}
  //             sx={{
  //               backgroundColor: '#8C257C',
  //               color: 'white',
  //               '&:hover': { backgroundColor: '#6d1d60' },
  //             }}
  //           >
  //             {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save'}
  //           </Button>
  //         </DialogActions>
  //       </Dialog>
  //     </Box>
  //   );
  // }








  
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Add, Search as SearchIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';

export default function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const employee_id = localStorage.getItem('EmID');
        const accessToken = localStorage.getItem('accessToken');

        if (!employee_id || !accessToken) {
          setError('User authentication details not found.');
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: 'Employee ID or Access Token not found.',
            timer: 3000,
            showConfirmButton: false,
          });
          return;
        }

        const url = `https://tdtlworld.com/hrms-backend/employee_events/${employee_id}/`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Fetch Events',
          text: err.message,
          timer: 3000,
          showConfirmButton: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // This function is no longer called by a button but is kept for potential future use
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      handleCloseDialog();
      Swal.fire({
        icon: 'success',
        title: 'Event Added!',
        text: 'The new event has been saved successfully.',
        timer: 3000,
        showConfirmButton: false,
      });
    }, 2000);
  };

  const filteredEvents = events.filter((event) =>
    event.event_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedEvents = filteredEvents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredEvents.length) : 0;

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 5 }}>
       Events
      </Typography>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        justifyContent="flex-end" // Changed from "space-between" to move content to the right
        alignItems={isMobile ? 'stretch' : 'center'}
        spacing={2}
        mb={2}
      >
        {/* The "Add New" button has been removed */}
        <TextField
          size="small"
          placeholder="Search ..."
          value={searchTerm}
          onChange={handleSearchChange}
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

      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <TableHead sx={{ backgroundColor: '#8C257C' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EVENT TITLE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EVENT DATE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EVENT TIME</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell align="center">
                    <Skeleton variant="rectangular" width={120} height={30} />
                  </TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ color: 'red' }}>
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : paginatedEvents.length > 0 ? (
              paginatedEvents.map((event, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{event.event_title}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{event.event_date}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{event.event_time}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      {/* Action buttons would go here */}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No records available
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {Math.min(rowsPerPage, paginatedEvents.length)} of {filteredEvents.length} results
        </Typography>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25]}
          component="div"
          count={filteredEvents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-selectIcon, & .MuiTablePagination-actions': {
              color: '#8C257C',
            },
          }}
        />
      </Box>

      {/* The Dialog component remains in the code but cannot be opened from the UI */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
          Add New Event
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField label="Event Title" fullWidth required />
              <TextField label="Event Description" fullWidth multiline rows={4} />
              <TextField type="file" inputProps={{ accept: '.pdf' }} helperText="Please upload PDF files only." />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleFormSubmit}
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: '#8C257C',
              color: 'white',
              '&:hover': { backgroundColor: '#6d1d60' },
            }}
          >
            {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

