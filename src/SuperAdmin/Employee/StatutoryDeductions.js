// // import React, { useState ,useEffect,useContext} from 'react';
// // import {
// //   Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
// //   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
// //   Paper, Button, Grid
// // } from '@mui/material';
// // import { EmployeeContext } from './EmployeeContext';
// // import  axiosInstance from  "../../utils/axiosInstance"; 

// // const StatutoryDeductions = () => {
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     amount: '',
   
// //     amount_option: '',
// //   });

// //   const [allowances, setAllowances] = useState([]);
// //  const { employeeId } = useContext(EmployeeContext);
// //    useEffect(() => {
// //       console.log("employee id from context in StatutoryDeduction :", employeeId);
// //      }, [employeeId]);
  

// //   const fetchAllowanceDetails = async () => {
// //   try {
// //     const response = await axiosInstance.post('/api/contract_details/', {
// //       user_id: employeeId,
// //       type: 4,
// //     });

// //     const { contract_details } = response.data;

// //     const formattedAllowance = {
// //       title: contract_details.title || '',
// //       amount: contract_details.amount || '',
     
// //       amount_option: contract_details.amount_option?.toString() || '0',
// //     };

// //     setFormData(formattedAllowance);
// //     setAllowances([formattedAllowance]);
// //   } catch (error) {
// //     console.error('Error fetching allowance details:', error);
// //   }
// // };

// // useEffect(() => {
// //   if ( employeeId) {
// //     fetchAllowanceDetails();
// //   }
// // }, [ employeeId]);

// // const updateAllowanceDetails = async () => {
// //   try {
// //     await axiosInstance.patch('/api/contract_details/', {
// //       user_id: employeeId,
// //       type: 4,
// //       title: formData.title,
// //       amount: parseFloat(formData.amount),
     
// //       amount_option: parseInt(formData.amount_option, 10),
// //     });
// //     alert('Updated successfully!');
// //   } catch (error) {
// //     console.error('Error updating allowance details:', error);
// //   }
// // };

// // const handleSave = () => {
// //   if (formData.title && formData.amount && employeeId) {
// //     updateAllowanceDetails();
// //     setAllowances(prev => [...prev, formData]);
// //     setFormData({ title: '', amount: '',  amount_option: '' });
// //   } else {
// //     alert("Please fill in all fields and user ID.");
// //   }
// // };
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

 

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Typography variant="h6" gutterBottom>List All Comissions</Typography>

// //       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// //         <FormControl size="small">
// //           <Select defaultValue="10">
// //             <MenuItem value="10">10</MenuItem>
// //             <MenuItem value="100">100</MenuItem>
// //           </Select>
// //         </FormControl>
// //         <TextField size="small" placeholder="Search" />
// //       </Box>
// // {employeeId && (
// //       <TableContainer component={Paper} sx={{ mb: 3 }}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell><strong>TITLE</strong></TableCell>
// //               <TableCell><strong>AMOUNT</strong></TableCell>
          
// //               <TableCell><strong>AMOUNT OPTION</strong></TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {allowances.length === 0 ? (
// //               <TableRow>
// //                 <TableCell colSpan={4} align="center">No records available</TableCell>
// //               </TableRow>
// //             ) : (
// //               allowances.map((row, index) => (
// //                 <TableRow key={index}>
// //                   <TableCell>{row.title}</TableCell>
// //                   <TableCell>{row.amount}</TableCell>
                
// //      <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
// //                 </TableRow>
// //               ))
// //             )}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// // )}
// //       <Box display="flex" justifyContent="space-between" mb={3}>
// //         <Typography variant="body2">No records available</Typography>
// //         <Box>
// //           <Button variant="outlined" size="small" sx={{ mr: 1 }}>Previous</Button>
// //           <Button variant="outlined" size="small">Next</Button>
// //         </Box>
// //       </Box>

// //       <Grid container spacing={2}>
// //   {/* Row 1: Allowance Option + Amount Option */}


// // <Grid item xs={12} sm={6}>
// //   <FormControl fullWidth size="small" required>
// //     <InputLabel>Amount Option</InputLabel>
// //     <Select
// //       name="amount_option"
// //        value={formData.amount_option ?? ''}
// //       label="Amount Option"
// //       onChange={handleChange}
// //     >
// //       <MenuItem value={0}>Fixed</MenuItem>
// //       <MenuItem value={1}>Percentage</MenuItem>
// //     </Select>
// //   </FormControl>
// // </Grid>


// //   {/* Row 2: Title + Amount */}
// //   <Grid item xs={12} sm={6}>
// //     <TextField
// //       fullWidth
// //       size="small"
// //       label="Title"
// //       name="title"
// //       value={formData.title}
// //       onChange={handleChange}
// //       required
// //     />
// //   </Grid>

// //   <Grid item xs={12} sm={6}>
// //     <Box display="flex" alignItems="center">
// //       <Typography sx={{ mr: 1 }}>INR</Typography>
// //       <TextField
// //         fullWidth
// //         size="small"
// //         label="Amount"
// //         name="amount"
// //         value={formData.amount}
// //         onChange={handleChange}
// //         required
// //       />
// //     </Box>
// //   </Grid>

// //   {/* Save Button */}
// //   <Grid item xs={12}>
// //     <Box display="flex" justifyContent="flex-end">
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         sx={{ textTransform: 'none', px: 4 }}
// //         onClick={handleSave}
// //       >
// //         Save
// //       </Button>
// //     </Box>
// //   </Grid>
// // </Grid>

// //     </Box>
// //   );
// // };

// // export default StatutoryDeductions;


// import React, { useState, useContext, useEffect } from 'react';
// import {
//   Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Grid, IconButton
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from '../../utils/axiosInstance';
// import { useCallback } from 'react';

// const StatutoryDeductions = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     allowance_option: '',
//     amount_option: '',
//   });

//   const [allowances, setAllowances] = useState([]);
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');



// // Inside your component:
// const fetchAllowances = useCallback(async () => {
//   try {
//     const res = await axiosInstance.post('/api/contract_details/', {
//       user_id: employeeId,
//       type: 4,
//     });

//     const details = res.data.contract_details;
//     setAllowances(Array.isArray(details) ? details : []);
//   } catch (error) {
//     console.error('Error fetching allowances:', error);
//     setAllowances([]);
//   }
// }, [employeeId]); // ✅ include dependency

// useEffect(() => {
//   if (employeeId) fetchAllowances();
// }, [employeeId, fetchAllowances]); // ✅ include both


//   const handleSave = async () => {
//     if (!formData.title || !formData.amount) {
//       alert('Please fill all fields');
//       return;
//     }

//     const payload = {
//       user_id: employeeId,
//       type: 4,
//       pay_title: formData.title,
//       pay_amount: formData.amount,
//       is_taxable: formData.allowance_option,
//       is_fixed: formData.amount_option,
//       salary_month: '01'
//     };

//     if (editingId !== null) {
//       payload.pay_id = editingId;
//     }

//     try {
//       await axiosInstance.patch('/api/contract_details/', payload);
//       fetchAllowances();
//       setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
//       setEditingId(null);
//     } catch (error) {
//       console.error('Error saving record:', error);
//     }
//   };

//   const handleEdit = (row) => {
//     setFormData({
//       title: row.title,
//       amount: row.amount,
//       allowance_option: row.allowance_option,
//       amount_option: row.amount_option.toString(),
//     });
//     setEditingId(row.id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axiosInstance.delete('/api/contract_details/', {
//         data: { pay_id: id, type: 4 },
//       });
//       fetchAllowances();
//     } catch (error) {
//       console.error('Error deleting record:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredAllowances.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   const filteredAllowances = allowances.filter(row =>
//     row.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pageCount = Math.ceil(filteredAllowances.length / rowsPerPage);
//   const currentRows = filteredAllowances.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>List All Allowances</Typography>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//         <FormControl size="small" sx={{ minWidth: 80 }}>
//           <InputLabel sx={{ fontSize: '0.75rem' }}>Rows</InputLabel>
//           <Select
//             value={rowsPerPage}
//             label="Rows"
//             onChange={handleRowsPerPageChange}
//             sx={{ fontSize: '0.75rem', height: '32px' }}
//           >
//             {[5, 10, 25, 50].map(num => (
//               <MenuItem key={num} value={num} sx={{ fontSize: '0.75rem' }}>{num}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField
//           size="small"
//           placeholder="Search Title"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: 150, '& .MuiInputBase-input': { fontSize: '0.75rem', height: '0.9em' } }}
//         />
//       </Box>

//       {employeeId && (
//         <TableContainer component={Paper} sx={{ mb: 1 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><strong>TITLE</strong></TableCell>
//                 <TableCell><strong>AMOUNT</strong></TableCell>
//                 <TableCell><strong>ALLOWANCE OPTION</strong></TableCell>
//                 <TableCell><strong>AMOUNT OPTION</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentRows.length === 0 ? (
//                 <TableRow><TableCell colSpan={4} align="center">No records found</TableCell></TableRow>
//               ) : (
//                 currentRows.map((row, index) => {
//                   const actualIndex = (currentPage - 1) * rowsPerPage + index;
//                   return (
//                     <TableRow
//                       key={row.id || actualIndex}
//                       onMouseEnter={() => setHoveredRow(actualIndex)}
//                       onMouseLeave={() => setHoveredRow(null)}
//                     >
//                       <TableCell>
//                         {hoveredRow === actualIndex ? (
//                           <>
//                             <IconButton size="small" color="primary" onClick={() => handleEdit(row)}>
//                               <Edit fontSize="small" />
//                             </IconButton>
//                             <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
//                               <Delete fontSize="small" />
//                             </IconButton>
//                           </>
//                         ) : row.title}
//                       </TableCell>
//                       <TableCell>{row.amount}</TableCell>
//                       <TableCell>{row.allowance_option}</TableCell>
//                       <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
//                     </TableRow>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Right-Aligned Pagination */}
//       <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1} gap={1}>
//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>

//         <Typography sx={{ fontSize: '0.75rem', minWidth: '100px', textAlign: 'center' }}>
//           Page {currentPage} of {pageCount || 1}
//         </Typography>

//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === pageCount || pageCount === 0}
//         >
//           Next
//         </Button>
//       </Box>

//       {/* Form */}
//       <Grid container spacing={2} mt={3}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Allowance Option</InputLabel>
//             <Select
//               name="allowance_option"
//               value={formData.allowance_option ?? ''}
//               label="Allowance Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//               <MenuItem value="Fully">Fully Taxable</MenuItem>
//               <MenuItem value="Partial">Partially Taxable</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Amount Option</InputLabel>
//             <Select
//               name="amount_option"
//               value={formData.amount_option ?? ''}
//               label="Amount Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="0">Fixed</MenuItem>
//               <MenuItem value="1">Percentage</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box display="flex" alignItems="center">
//             <Typography sx={{ mr: 1 }}>INR</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               label="Amount"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//             />
//           </Box>
//         </Grid>

//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{ textTransform: 'none', px: 4 }}
//               onClick={handleSave}
//             >
//               {editingId !== null ? 'Update' : 'Save'}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StatutoryDeductions;








// import React, { useState, useContext, useEffect, useCallback } from 'react';
// import {
//   Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Grid, IconButton
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from '../../utils/axiosInstance';
// // 1. Import SweetAlert2
// import Swal from 'sweetalert2';

// const StatutoryDeductions = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     allowance_option: '', // Corresponds to is_taxable
//     amount_option: '',    // Corresponds to is_fixed
//   });

//   // Renamed for clarity
//   const [deductions, setDeductions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Renamed for clarity
//   const fetchDeductions = useCallback(async () => {
//     try {
//       const res = await axiosInstance.post('/api/contract_details/', {
//         user_id: employeeId,
//         type: 4, // Type 4 for Statutory Deductions
//       });

//       const details = res.data.contract_details;
//       setDeductions(Array.isArray(details) ? details : []);
//     } catch (error)      {
//       console.error('Error fetching deductions:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not load statutory deductions. Please try refreshing the page.'
//       });
//       setDeductions([]);
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     if (employeeId) fetchDeductions();
//   }, [employeeId, fetchDeductions]);


//   const handleSave = async () => {
//     // 2. Use Swal for validation
//     if (!formData.title || !formData.amount || !formData.allowance_option || !formData.amount_option) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill out all the required fields before saving.',
//       });
//       return;
//     }

//     const payload = {
//       user_id: employeeId,
//       type: 4,
//       pay_title: formData.title,
//       pay_amount: parseFloat(formData.amount),
//       is_taxable: formData.allowance_option,
//       is_fixed: formData.amount_option,
//       salary_month: '01'
//     };

//     const action = editingId !== null ? 'Updating' : 'Saving';

//     // 3. Add loading state with Swal
//     Swal.fire({
//       title: `${action} Deduction...`,
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     if (editingId !== null) {
//       payload.pay_id = editingId;
//     }

//     try {
//       await axiosInstance.patch('/api/contract_details/', payload);
//       await fetchDeductions();

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: `Deduction has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
//       });

//       setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
//       setEditingId(null);
//     } catch (error) {
//       console.error('Error saving record:', error);
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Operation Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   const handleEdit = (row) => {
//     setFormData({
//       title: row.title,
//       amount: row.amount,
//       allowance_option: row.allowance_option,
//       amount_option: row.amount_option !== null ? row.amount_option.toString() : '',
//     });
//     setEditingId(row.id);
//   };

//   const handleDelete = async (id) => {
//     // 4. Add confirmation dialog before deleting
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to delete this deduction. You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete('/api/contract_details/', {
//             data: { pay_id: id, type: 4 },
//           });
//           await fetchDeductions();
//           Swal.fire(
//             'Deleted!',
//             'The deduction has been deleted.',
//             'success'
//           );
//         } catch (error) {
//           console.error('Error deleting record:', error);
//           const errorMessage = error.response?.data?.message || 'Failed to delete the record.';
//           Swal.fire(
//             'Error!',
//             errorMessage,
//             'error'
//           );
//         }
//       }
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredDeductions.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   // Renamed for clarity
//   const filteredDeductions = deductions.filter(row =>
//     String(row.title).toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pageCount = Math.ceil(filteredDeductions.length / rowsPerPage);
//   const currentRows = filteredDeductions.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>List All Statutory = Deductions</Typography>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//         <FormControl size="small" sx={{ minWidth: 80 }}>
//           <InputLabel sx={{ fontSize: '0.75rem' }}>Rows</InputLabel>
//           <Select
//             value={rowsPerPage}
//             label="Rows"
//             onChange={handleRowsPerPageChange}
//             sx={{ fontSize: '0.75rem', height: '32px' }}
//           >
//             {[5, 10, 25, 50].map(num => (
//               <MenuItem key={num} value={num} sx={{ fontSize: '0.75rem' }}>{num}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField
//           size="small"
//           placeholder="Search Title"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: 150, '& .MuiInputBase-input': { fontSize: '0.75rem', height: '0.9em' } }}
//         />
//       </Box>

//       {employeeId && (
//         <TableContainer component={Paper} sx={{ mb: 1 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><strong>TITLE</strong></TableCell>
//                 <TableCell><strong>AMOUNT</strong></TableCell>
              
//                 <TableCell><strong>AMOUNT OPTION</strong></TableCell>
//                 <TableCell align="right"><strong>ACTIONS</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentRows.length === 0 ? (
//                 <TableRow><TableCell colSpan={5} align="center">No records found</TableCell></TableRow>
//               ) : (
//                 currentRows.map((row) => (
//                     <TableRow key={row.id}>
//                       <TableCell>{row.title}</TableCell>
//                       <TableCell>{row.amount}</TableCell>
//                       <TableCell>{row.allowance_option}</TableCell>
//                       <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
//                       <TableCell align="right">
//                           <IconButton size="small" color="primary" onClick={() => handleEdit(row)}>
//                             <Edit fontSize="small" />
//                           </IconButton>
//                           <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
//                             <Delete fontSize="small" />
//                           </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1} gap={1}>
//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>

//         <Typography sx={{ fontSize: '0.75rem', minWidth: '100px', textAlign: 'center' }}>
//           Page {currentPage} of {pageCount || 1}
//         </Typography>

//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === pageCount || pageCount === 0}
//         >
//           Next
//         </Button>
//       </Box>

//       <Grid container spacing={2} mt={3}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Deduction Option</InputLabel>
//             <Select
//               name="allowance_option"
//               value={formData.allowance_option ?? ''}
//               label="Deduction Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//               <MenuItem value="Fully">Fully Taxable</MenuItem>
//               <MenuItem value="Partial">Partially Taxable</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Amount Option</InputLabel>
//             <Select
//               name="amount_option"
//               value={formData.amount_option ?? ''}
//               label="Amount Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="0">Fixed</MenuItem>
//               <MenuItem value="1">Percentage</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box display="flex" alignItems="center">
//             <Typography sx={{ mr: 1 }}>INR</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               label="Amount"
//               name="amount"
//               type="number"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//             />
//           </Box>
//         </Grid>

//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{ textTransform: 'none', px: 4 }}
//               onClick={handleSave}
//             >
//               {editingId !== null ? 'Update' : 'Save'}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StatutoryDeductions;














// import React, { useState, useContext, useEffect, useCallback } from 'react';
// import {
//   Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Grid, IconButton
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from '../../utils/axiosInstance';
// // 1. Import SweetAlert2
// import Swal from 'sweetalert2';

// const StatutoryDeductions = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     allowance_option: '', // Corresponds to is_taxable
//     amount_option: '',    // Corresponds to is_fixed
//   });

//   // Renamed for clarity
//   const [deductions, setDeductions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Renamed for clarity
//   const fetchDeductions = useCallback(async () => {
//     try {
//       const res = await axiosInstance.post('/api/contract_details/', {
//         user_id: employeeId,
//         type: 4, // Type 4 for Statutory Deductions
//       });

//       const details = res.data.contract_details;
//       setDeductions(Array.isArray(details) ? details : []);
//     } catch (error)      {
//       console.error('Error fetching deductions:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not load statutory deductions. Please try refreshing the page.'
//       });
//       setDeductions([]);
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     if (employeeId) fetchDeductions();
//   }, [employeeId, fetchDeductions]);


//   const handleSave = async () => {
//     // 2. Use Swal for validation
//     if (!formData.title || !formData.amount || !formData.allowance_option || !formData.amount_option) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill out all the required fields before saving.',
//       });
//       return;
//     }

//     const payload = {
//       user_id: employeeId,
//       type: 4,
//       pay_title: formData.title,
//       pay_amount: parseFloat(formData.amount),
//       is_taxable: formData.allowance_option,
//       is_fixed: formData.amount_option,
//       salary_month: '01'
//     };

//     const action = editingId !== null ? 'Updating' : 'Saving';

//     // 3. Add loading state with Swal
//     Swal.fire({
//       title: `${action} Deduction...`,
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     if (editingId !== null) {
//       payload.pay_id = editingId;
//     }

//     try {
//       await axiosInstance.patch('/api/contract_details/', payload);
//       await fetchDeductions();

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: `Deduction has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
//       });

//       setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
//       setEditingId(null);
//     } catch (error) {
//       console.error('Error saving record:', error);
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Operation Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   const handleEdit = (row) => {
//     setFormData({
//       title: row.title,
//       amount: row.amount,
//       allowance_option: row.allowance_option,
//       // FIX: Use loose inequality (!=) to check for both null and undefined.
//       // This prevents the '.toString()' of undefined error.
//       amount_option: row.amount_option != null ? row.amount_option.toString() : '',
//     });
//     setEditingId(row.id);
//   };


//   const handleDelete = async (id) => {
//     // 4. Add confirmation dialog before deleting
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to delete this deduction. You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete('/api/contract_details/', {
//             data: { pay_id: id, type: 4 },
//           });
//           await fetchDeductions();
//           Swal.fire(
//             'Deleted!',
//             'The deduction has been deleted.',
//             'success'
//           );
//         } catch (error) {
//           console.error('Error deleting record:', error);
//           const errorMessage = error.response?.data?.message || 'Failed to delete the record.';
//           Swal.fire(
//             'Error!',
//             errorMessage,
//             'error'
//           );
//         }
//       }
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredDeductions.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   // Renamed for clarity
//   const filteredDeductions = deductions.filter(row =>
//     String(row.title).toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pageCount = Math.ceil(filteredDeductions.length / rowsPerPage);
//   const currentRows = filteredDeductions.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>List All Statutory Deductions</Typography>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//         <FormControl size="small" sx={{ minWidth: 80 }}>
//           <InputLabel sx={{ fontSize: '0.75rem' }}>Rows</InputLabel>
//           <Select
//             value={rowsPerPage}
//             label="Rows"
//             onChange={handleRowsPerPageChange}
//             sx={{ fontSize: '0.75rem', height: '32px' }}
//           >
//             {[5, 10, 25, 50].map(num => (
//               <MenuItem key={num} value={num} sx={{ fontSize: '0.75rem' }}>{num}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField
//           size="small"
//           placeholder="Search Title"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: 150, '& .MuiInputBase-input': { fontSize: '0.75rem', height: '0.9em' } }}
//         />
//       </Box>

//       {employeeId && (
//         <TableContainer component={Paper} sx={{ mb: 1 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><strong>TITLE</strong></TableCell>
//                 <TableCell><strong>AMOUNT</strong></TableCell>
//                 {/* FIX: Added missing header for the 'allowance_option' column to fix alignment */}
//                 <TableCell><strong>DEDUCTION OPTION</strong></TableCell>
//                 <TableCell><strong>AMOUNT OPTION</strong></TableCell>
//                 <TableCell align="right"><strong>ACTIONS</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentRows.length === 0 ? (
//                 <TableRow><TableCell colSpan={5} align="center">No records found</TableCell></TableRow>
//               ) : (
//                 currentRows.map((row) => (
//                     <TableRow key={row.id}>
//                       <TableCell>{row.title}</TableCell>
//                       <TableCell>{row.amount}</TableCell>
//                       <TableCell>{row.allowance_option}</TableCell>
//                       <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
//                       <TableCell align="right">
//                           <IconButton size="small" color="primary" onClick={() => handleEdit(row)}>
//                             <Edit fontSize="small" />
//                           </IconButton>
//                           <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
//                             <Delete fontSize="small" />
//                           </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1} gap={1}>
//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>

//         <Typography sx={{ fontSize: '0.75rem', minWidth: '100px', textAlign: 'center' }}>
//           Page {currentPage} of {pageCount || 1}
//         </Typography>

//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === pageCount || pageCount === 0}
//         >
//           Next
//         </Button>
//       </Box>

//       <Grid container spacing={2} mt={3}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Deduction Option</InputLabel>
//             <Select
//               name="allowance_option"
//               value={formData.allowance_option ?? ''}
//               label="Deduction Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//               <MenuItem value="Fully">Fully Taxable</MenuItem>
//               <MenuItem value="Partial">Partially Taxable</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Amount Option</InputLabel>
//             <Select
//               name="amount_option"
//               value={formData.amount_option ?? ''}
//               label="Amount Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="0">Fixed</MenuItem>
//               <MenuItem value="1">Percentage</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box display="flex" alignItems="center">
//             <Typography sx={{ mr: 1 }}>INR</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               label="Amount"
//               name="amount"
//               type="number"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//             />
//           </Box>
//         </Grid>

//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{ textTransform: 'none', px: 4 }}
//               onClick={handleSave}
//             >
//               {editingId !== null ? 'Update' : 'Save'}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StatutoryDeductions;














// import React, { useState, useContext, useEffect, useCallback } from 'react';
// import {
//   Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Grid, IconButton
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from '../../utils/axiosInstance';
// import Swal from 'sweetalert2';

// const StatutoryDeductions = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     allowance_option: '', // Corresponds to is_taxable
//     amount_option: '',    // Corresponds to is_fixed (0 or 1)
//   });

//   const [deductions, setDeductions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchDeductions = useCallback(async () => {
//     if (!employeeId) return;
//     try {
//       const res = await axiosInstance.post('/api/contract_details/', {
//         user_id: employeeId,
//         type: 4, // Type 4 for Statutory Deductions
//       });

//       const details = res.data.contract_details;
//       setDeductions(Array.isArray(details) ? details : []);
//     } catch (error)      {
//       console.error('Error fetching deductions:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not load statutory deductions. Please try refreshing the page.'
//       });
//       setDeductions([]);
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     fetchDeductions();
//   }, [employeeId, fetchDeductions]);


//   const handleSave = async () => {
//     if (!formData.title || !formData.amount || !formData.allowance_option || !formData.amount_option) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill out all the required fields before saving.',
//       });
//       return;
//     }

//     // The payload sent to the API remains the same as per the original structure
//     const payload = {
//       user_id: employeeId,
//       type: 4,
//       pay_title: formData.title,
//       pay_amount: parseFloat(formData.amount),
//       is_taxable: formData.allowance_option,
//       is_fixed: formData.amount_option,
//       salary_month: '01'
//     };

//     const action = editingId !== null ? 'Updating' : 'Saving';

//     Swal.fire({
//       title: `${action} Deduction...`,
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     if (editingId !== null) {
//       payload.pay_id = editingId;
//     }

//     try {
//       await axiosInstance.patch('/api/contract_details/', payload);
//       await fetchDeductions();

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: `Deduction has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
//       });

//       setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
//       setEditingId(null);
//     } catch (error) {
//       console.error('Error saving record:', error);
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Operation Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   // UPDATED: handleEdit now maps the new API response fields to the form state
//   const handleEdit = (row) => {
//     setFormData({
//       title: row.title,
//       amount: row.amount,
//       // The new API response does not provide a taxability option ('allowance_option'),
//       // so we set it to empty. The user will have to re-select it if they want to update it.
//       allowance_option: '', 
//       // Map the API's 'deduction_option' to the form's 'amount_option'
//       amount_option: row.deduction_option != null ? row.deduction_option.toString() : '',
//     });
//     setEditingId(row.id);
//   };


//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to delete this deduction. You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete('/api/contract_details/', {
//             data: { pay_id: id, type: 4 },
//           });
//           await fetchDeductions();
//           Swal.fire(
//             'Deleted!',
//             'The deduction has been deleted.',
//             'success'
//           );
//         } catch (error) {
//           console.error('Error deleting record:', error);
//           const errorMessage = error.response?.data?.message || 'Failed to delete the record.';
//           Swal.fire(
//             'Error!',
//             errorMessage,
//             'error'
//           );
//         }
//       }
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredDeductions.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   const filteredDeductions = deductions.filter(row =>
//     String(row.title).toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pageCount = Math.ceil(filteredDeductions.length / rowsPerPage);
//   const currentRows = filteredDeductions.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>List All Statutory Deductions</Typography>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//         <FormControl size="small" sx={{ minWidth: 80 }}>
//           <InputLabel sx={{ fontSize: '0.75rem' }}>Rows</InputLabel>
//           <Select
//             value={rowsPerPage}
//             label="Rows"
//             onChange={handleRowsPerPageChange}
//             sx={{ fontSize: '0.75rem', height: '32px' }}
//           >
//             {[5, 10, 25, 50].map(num => (
//               <MenuItem key={num} value={num} sx={{ fontSize: '0.75rem' }}>{num}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField
//           size="small"
//           placeholder="Search Title"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: 150, '& .MuiInputBase-input': { fontSize: '0.75rem', height: '0.9em' } }}
//         />
//       </Box>

//       {employeeId && (
//         <TableContainer component={Paper} sx={{ mb: 1 }}>
//           <Table>
//             {/* UPDATED: Table Head with Sr.No. and removed Deduction Option */}
//             <TableHead>
//               <TableRow>
//                 <TableCell><strong>SR.NO.</strong></TableCell>
//                 <TableCell><strong>TITLE</strong></TableCell>
//                 <TableCell><strong>AMOUNT</strong></TableCell>
//                 <TableCell><strong>AMOUNT OPTION</strong></TableCell>
//                 <TableCell align="right"><strong>ACTIONS</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentRows.length === 0 ? (
//                 // UPDATED: colSpan to match new number of columns (5)
//                 <TableRow><TableCell colSpan={5} align="center">No records found</TableCell></TableRow>
//               ) : (
//                 // UPDATED: Table rows now map the new API response structure
//                 currentRows.map((row, index) => (
//                     <TableRow key={row.id}>
//                       <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.title}</TableCell>
//                       <TableCell>{row.amount}</TableCell>
//                       <TableCell>{row.deduction_option === 0 ? 'Fixed' : row.deduction_option === 1 ? 'Percentage' : 'N/A'}</TableCell>
//                       <TableCell align="right">
//                           <IconButton size="small" color="primary" onClick={() => handleEdit(row)}>
//                             <Edit fontSize="small" />
//                           </IconButton>
//                           <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
//                             <Delete fontSize="small" />
//                           </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1} gap={1}>
//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>

//         <Typography sx={{ fontSize: '0.75rem', minWidth: '100px', textAlign: 'center' }}>
//           Page {currentPage} of {pageCount || 1}
//         </Typography>

//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === pageCount || pageCount === 0}
//         >
//           Next
//         </Button>
//       </Box>

//       <Grid container spacing={2} mt={3}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Deduction Option</InputLabel>
//             <Select
//               name="allowance_option"
//               value={formData.allowance_option ?? ''}
//               label="Deduction Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//               <MenuItem value="Fully">Fully Taxable</MenuItem>
//               <MenuItem value="Partial">Partially Taxable</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Amount Option</InputLabel>
//             <Select
//               name="amount_option"
//               value={formData.amount_option ?? ''}
//               label="Amount Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="0">Fixed</MenuItem>
//               <MenuItem value="1">Percentage</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box display="flex" alignItems="center">
//             <Typography sx={{ mr: 1 }}>INR</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               label="Amount"
//               name="amount"
//               type="number"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//             />
//           </Box>
//         </Grid>

//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{ textTransform: 'none', px: 4 }}
//               onClick={handleSave}
//             >
//               {editingId !== null ? 'Update' : 'Save'}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StatutoryDeductions;



// import React, { useState, useContext, useEffect, useCallback } from 'react';
// import {
//   Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Grid, IconButton
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from '../../utils/axiosInstance';
// import Swal from 'sweetalert2';

// const StatutoryDeductions = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     allowance_option: '', // Corresponds to is_taxable
//     amount_option: '',    // Corresponds to is_fixed (0 or 1)
//   });

//   const [deductions, setDeductions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   // UPDATED: Default rows per page is now 10
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchDeductions = useCallback(async () => {
//     if (!employeeId) return;
//     try {
//       const res = await axiosInstance.post('/api/contract_details/', {
//         user_id: employeeId,
//         type: 4, // Type 4 for Statutory Deductions
//       });

//       const details = res.data.contract_details;
//       setDeductions(Array.isArray(details) ? details : []);
//     } catch (error)      {
//       console.error('Error fetching deductions:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not load statutory deductions. Please try refreshing the page.'
//       });
//       setDeductions([]);
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     fetchDeductions();
//   }, [employeeId, fetchDeductions]);


//   const handleSave = async () => {
//     if (!formData.title || !formData.amount || !formData.allowance_option || !formData.amount_option) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill out all the required fields before saving.',
//       });
//       return;
//     }

//     const payload = {
//       user_id: employeeId,
//       type: 4,
//       pay_title: formData.title,
//       pay_amount: parseFloat(formData.amount),
//       is_taxable: formData.allowance_option,
//       is_fixed: formData.amount_option,
//       salary_month: '01'
//     };

//     const action = editingId !== null ? 'Updating' : 'Saving';

//     Swal.fire({
//       title: `${action} Deduction...`,
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     if (editingId !== null) {
//       payload.pay_id = editingId;
//     }

//     try {
//       await axiosInstance.patch('/api/contract_details/', payload);
//       await fetchDeductions();

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: `Deduction has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
//       });

//       setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
//       setEditingId(null);
//     } catch (error) {
//       console.error('Error saving record:', error);
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Operation Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   const handleEdit = (row) => {
//     setFormData({
//       title: row.title,
//       amount: row.amount,
//       allowance_option: '',
//       amount_option: row.deduction_option != null ? row.deduction_option.toString() : '',
//     });
//     setEditingId(row.id);
//   };


//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to delete this deduction. You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete('/api/contract_details/', {
//             data: { pay_id: id, type: 4 },
//           });
//           await fetchDeductions();
//           Swal.fire(
//             'Deleted!',
//             'The deduction has been deleted.',
//             'success'
//           );
//         } catch (error) {
//           console.error('Error deleting record:', error);
//           const errorMessage = error.response?.data?.message || 'Failed to delete the record.';
//           Swal.fire(
//             'Error!',
//             errorMessage,
//             'error'
//           );
//         }
//       }
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(parseInt(e.target.value, 10));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredDeductions.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   const filteredDeductions = deductions.filter(row =>
//     String(row.title).toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pageCount = Math.ceil(filteredDeductions.length / rowsPerPage);
//   const currentRows = filteredDeductions.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom fontWeight="bold" color="#8C257C">List All Statutory Deductions</Typography>

//       {/* NEW: Search bar on the top-right */}
//       <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
//         <TextField
//           size="small"
//           placeholder="Search Title"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: 250 }}
//         />
//       </Box>

//       {employeeId && (
//         <TableContainer component={Paper}>
//           <Table>
//             {/* UPDATED: Table Head with custom background and text color */}
//             <TableHead sx={{ backgroundColor: '#8C257C' }}>
//               <TableRow>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR.NO.</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TITLE</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AMOUNT</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AMOUNT OPTION</TableCell>
//                 <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentRows.length === 0 ? (
//                 <TableRow>
//                     <TableCell colSpan={5} align="center">No records found</TableCell>
//                 </TableRow>
//               ) : (
//                 currentRows.map((row, index) => (
//                     <TableRow key={row.id}>
//                       <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.title}</TableCell>
//                       <TableCell>{row.amount}</TableCell>
//                       <TableCell>{row.deduction_option === 0 ? 'Fixed' : row.deduction_option === 1 ? 'Percentage' : 'N/A'}</TableCell>
//                       <TableCell align="right">
//                           {/* UPDATED: Edit icon styled with primary color */}
//                           <IconButton size="small" onClick={() => handleEdit(row)} sx={{ color: '#8C257C' }}>
//                             <Edit fontSize="small" />
//                           </IconButton>
//                           <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
//                             <Delete fontSize="small" />
//                           </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* NEW: Standardized table footer with Rows per page and Pagination */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//         {/* Left side: Rows per page */}
//         <FormControl size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Rows per page</InputLabel>
//             <Select
//                 value={rowsPerPage}
//                 label="Rows per page"
//                 onChange={handleRowsPerPageChange}
//             >
//                 {[10, 25, 50, 100].map(num => (
//                     <MenuItem key={num} value={num}>{num}</MenuItem>
//                 ))}
//             </Select>
//         </FormControl>

//         {/* Right side: Pagination */}
//         <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
//             <Typography sx={{ fontSize: '0.875rem' }}>
//                 Page {currentPage} of {pageCount || 1}
//             </Typography>
//             <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 sx={{
//                     color: '#8C257C',
//                     borderColor: '#8C257C',
//                     '&:hover': {
//                         borderColor: '#701e63',
//                         backgroundColor: 'rgba(140, 37, 124, 0.04)'
//                     }
//                 }}
//             >
//                 Previous
//             </Button>
//             <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === pageCount || pageCount === 0}
//                 sx={{
//                     color: '#8C257C',
//                     borderColor: '#8C257C',
//                     '&:hover': {
//                         borderColor: '#701e63',
//                         backgroundColor: 'rgba(140, 37, 124, 0.04)'
//                     }
//                 }}
//             >
//                 Next
//             </Button>
//         </Box>
//       </Box>

//       <Grid container spacing={2} mt={3}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Deduction Option</InputLabel>
//             <Select
//               name="allowance_option"
//               value={formData.allowance_option ?? ''}
//               label="Deduction Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//               <MenuItem value="Fully">Fully Taxable</MenuItem>
//               <MenuItem value="Partial">Partially Taxable</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Amount Option</InputLabel>
//             <Select
//               name="amount_option"
//               value={formData.amount_option ?? ''}
//               label="Amount Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="0">Fixed</MenuItem>
//               <MenuItem value="1">Percentage</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box display="flex" alignItems="center">
//             <TextField
//               fullWidth
//               size="small"
//               label="INR Amount"
//               name="amount"
//               type="number"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//             />
//           </Box>
//         </Grid>

//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             {/* UPDATED: Save/Update button styled with primary color */}
//             <Button
//               variant="contained"
//               sx={{
//                 textTransform: 'none',
//                 px: 4,
//                 backgroundColor: '#8C257C',
//                 '&:hover': {
//                     backgroundColor: '#701e63' // A darker shade for hover
//                 }
//               }}
//               onClick={handleSave}
//             >
//               {editingId !== null ? 'Update' : 'Save'}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StatutoryDeductions;





// import React, { useState, useContext, useEffect, useCallback } from 'react';
// import {
//   Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Grid, IconButton, Pagination, Skeleton, CircularProgress
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from '../../utils/axiosInstance';
// import Swal from 'sweetalert2';


// const PRIMARY_COLOR = "#8C257C";
// const PRIMARY_DARK_COLOR = "#6d1d60";
// const SECONDARY_COLOR = "#F58E35";

// const StatutoryDeductions = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     allowance_option: '', // Corresponds to is_taxable
//     amount_option: '',    // Corresponds to is_fixed (0 or 1)
//   });

//   const [deductions, setDeductions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   const fetchDeductions = useCallback(async () => {
//     if (!employeeId) {
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axiosInstance.post('/api/contract_details/', {
//         user_id: employeeId,
//         type: 4, // Type 4 for Statutory Deductions
//       });

//       const details = res.data.contract_details;
//       setDeductions(Array.isArray(details) ? details : []);
//     } catch (error)      {
//       console.error('Error fetching deductions:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not load statutory deductions. Please try refreshing the page.'
//       });
//       setDeductions([]);
//     } finally {
//         setLoading(false);
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     fetchDeductions();
//   }, [employeeId, fetchDeductions]);


//   const handleSave = async () => {
//     if (!formData.title || !formData.amount || !formData.allowance_option || !formData.amount_option) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill out all the required fields before saving.',
//       });
//       return;
//     }

//     const payload = {
//       user_id: employeeId,
//       type: 4,
//       pay_title: formData.title,
//       pay_amount: parseFloat(formData.amount),
//       is_taxable: formData.allowance_option,
//       is_fixed: formData.amount_option,
//       salary_month: '01'
//     };

//     const action = editingId !== null ? 'Updating' : 'Saving';

//     Swal.fire({
//       title: `${action} Deduction...`,
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     if (editingId !== null) {
//       payload.pay_id = editingId;
//     }

//     try {
//       await axiosInstance.patch('/api/contract_details/', payload);
//       await fetchDeductions();

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: `Deduction has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
//       });

//       setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
//       setEditingId(null);
//     } catch (error) {
//       console.error('Error saving record:', error);
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Operation Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   const handleEdit = (row) => {
//     setFormData({
//       title: row.title,
//       amount: row.amount,
//       // Assuming you want to map these back when editing
//       allowance_option: row.allowance_option || '',
//       amount_option: row.deduction_option !== null ? row.deduction_option.toString() : '',
//     });
//     setEditingId(row.id);
//   };


//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to delete this deduction. You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete('/api/contract_details/', {
//             data: { pay_id: id, type: 4 },
//           });
//           await fetchDeductions();
//           Swal.fire(
//             'Deleted!',
//             'The deduction has been deleted.',
//             'success'
//           );
//         } catch (error) {
//           console.error('Error deleting record:', error);
//           const errorMessage = error.response?.data?.message || 'Failed to delete the record.';
//           Swal.fire(
//             'Error!',
//             errorMessage,
//             'error'
//           );
//         }
//       }
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const filteredDeductions = deductions.filter(row =>
//     String(row.title).toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const paginatedRows = filteredDeductions.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const startEntry = filteredDeductions.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredDeductions.length);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" gutterBottom fontWeight="bold" color={PRIMARY_COLOR}>List All Statutory Deductions</Typography>
        
//         <Box display="flex" justifyContent="flex-end" alignItems="center">
//             <TextField
//               size="small"
//               placeholder="Search Title"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ width: 250 }}
//             />
//         </Box>
//       </Box>

//       {employeeId && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: PRIMARY_COLOR }}>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR.NO.</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TITLE</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AMOUNT</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AMOUNT OPTION</TableCell>
//                 <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                  <TableRow>
//                   <TableCell colSpan={5} align="center" sx={{ p: 4 }}>
//                     <CircularProgress sx={{ color: PRIMARY_COLOR }} />
//                   </TableCell>
//                 </TableRow>
//               ) : paginatedRows.length === 0 ? (
//                 <TableRow>
//                     <TableCell colSpan={5} align="center">No records found</TableCell>
//                 </TableRow>
//               ) : (
//                 paginatedRows.map((row, index) => (
//                     <TableRow key={row.id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.title}</TableCell>
//                       <TableCell>{row.amount}</TableCell>
//                       <TableCell>{row.deduction_option === 0 ? 'Fixed' : row.deduction_option === 1 ? 'Percentage' : 'N/A'}</TableCell>
//                       <TableCell align="right">
//                           <IconButton size="small" onClick={() => handleEdit(row)} sx={{ color: PRIMARY_COLOR }}>
//                             <Edit fontSize="small" />
//                           </IconButton>
//                           <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
//                             <Delete fontSize="small" />
//                           </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* NEW: Standardized table footer with Rows per page and Pagination */}
//       <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//           {loading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Skeleton variant="text" width={200} />
//                   <Skeleton variant="rectangular" width={300} height={40} />
//               </Box>
//           ) : (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                       <FormControl variant="outlined" size="small">
//                           <Select
//                               value={rowsPerPage}
//                               onChange={handleChangeRowsPerPage}
//                               sx={{
//                                   backgroundColor: PRIMARY_COLOR,
//                                   color: 'white',
//                                   borderRadius: '4px',
//                                   '&:hover': { backgroundColor: PRIMARY_DARK_COLOR },
//                                   '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                   '& .MuiSvgIcon-root': { color: 'white' },
//                               }}
//                           >
//                               {[5, 10, 15, 25].map((value) => (
//                                   <MenuItem key={value} value={value}>{value}</MenuItem>
//                               ))}
//                           </Select>
//                       </FormControl>
//                       <Typography variant="body2" color="text.secondary">
//                          {`Showing ${startEntry} to ${endEntry} of ${filteredDeductions.length} results`}
//                       </Typography>
//                   </Box>

//                   <Pagination
//                       count={Math.ceil(filteredDeductions.length / rowsPerPage)}
//                       page={page + 1}
//                       onChange={handlePaginationChange}
//                       showFirstButton
//                       showLastButton
//                       sx={{
//                           '& .MuiPaginationItem-root': {
//                               '&:hover': { backgroundColor: SECONDARY_COLOR, color: 'white' }
//                           },
//                           '& .MuiPaginationItem-page':{
//                               color: PRIMARY_COLOR,
//                               '&.Mui-selected': {
//                                   backgroundColor: PRIMARY_COLOR,
//                                   color: 'white',
//                                   '&:hover': { backgroundColor: SECONDARY_COLOR }
//                               },
//                           },
//                            '& .MuiPaginationItem-icon': { color: PRIMARY_COLOR }
//                       }}
//                   />
//               </Box>
//           )}
//       </Box>

//       <Grid container spacing={2} mt={3}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Deduction Option</InputLabel>
//             <Select
//               name="allowance_option"
//               value={formData.allowance_option ?? ''}
//               label="Deduction Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//               <MenuItem value="Fully">Fully Taxable</MenuItem>
//               <MenuItem value="Partial">Partially Taxable</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Amount Option</InputLabel>
//             <Select
//               name="amount_option"
//               value={formData.amount_option ?? ''}
//               label="Amount Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="0">Fixed</MenuItem>
//               <MenuItem value="1">Percentage</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box display="flex" alignItems="center">
//             <TextField
//               fullWidth
//               size="small"
//               label="INR Amount"
//               name="amount"
//               type="number"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//             />
//           </Box>
//         </Grid>

//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               sx={{
//                 textTransform: 'none',
//                 px: 4,
//                 backgroundColor: PRIMARY_COLOR,
//                 '&:hover': {
//                     backgroundColor: PRIMARY_DARK_COLOR
//                 }
//               }}
//               onClick={handleSave}
//             >
//               {editingId !== null ? 'Update' : 'Save'}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StatutoryDeductions;







import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Grid, IconButton, Pagination, Skeleton, CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { EmployeeContext } from './EmployeeContext';
import axiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';


const PRIMARY_COLOR = "#8C257C";
const PRIMARY_DARK_COLOR = "#6d1d60";
const SECONDARY_COLOR = "#F58E35";

const StatutoryDeductions = () => {
  const { employeeId } = useContext(EmployeeContext);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    allowance_option: '',
    amount_option: '',
  });

  const [deductions, setDeductions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDeductions = useCallback(async () => {
    if (!employeeId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/contract_details/', {
        user_id: employeeId,
        type: 4,
      });

      const details = res.data.contract_details;
      setDeductions(Array.isArray(details) ? details : []);
    } catch (error)      {
      console.error('Error fetching deductions:', error);
      Swal.fire({
        icon: 'error',
        title: 'Fetch Error',
        text: 'Could not load statutory deductions. Please try refreshing the page.'
      });
      setDeductions([]);
    } finally {
        setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchDeductions();
  }, [employeeId, fetchDeductions]);


  const handleSave = async () => {
    if (!formData.title || !formData.amount || !formData.allowance_option || !formData.amount_option) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill out all the required fields before saving.',
      });
      return;
    }

    const payload = {
      user_id: employeeId,
      type: 4,
      pay_title: formData.title,
      pay_amount: parseFloat(formData.amount),
      is_taxable: String(formData.allowance_option),
      is_fixed: String(formData.amount_option),
      salary_month: '01'
    };

    const action = editingId !== null ? 'Updating' : 'Saving';

    Swal.fire({
      title: `${action} Deduction...`,
      text: 'Please wait.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (editingId !== null) {
      payload.pay_id = editingId;
    }

    try {
      await axiosInstance.patch('/api/contract_details/', payload);
      await fetchDeductions();

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Deduction has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
      });

      setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving record:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text: errorMessage,
      });
    }
  };

  const handleEdit = (row) => {
    setFormData({
      title: row.title,
      amount: row.amount,
      allowance_option: row.allowance_option || '',
      amount_option: row.deduction_option !== null ? row.deduction_option.toString() : '',
    });
    setEditingId(row.id);
  };


  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this deduction. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete('/api/contract_details/', {
            data: { pay_id: id, type: 4 },
          });
          await fetchDeductions();
          Swal.fire(
            'Deleted!',
            'The deduction has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting record:', error);
          const errorMessage = error.response?.data?.message || 'Failed to delete the record.';
          Swal.fire(
            'Error!',
            errorMessage,
            'error'
          );
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredDeductions = deductions.filter(row =>
    String(row.title).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedRows = filteredDeductions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startEntry = filteredDeductions.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredDeductions.length);

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" gutterBottom fontWeight="bold" color={PRIMARY_COLOR}>List All Statutory Deductions</Typography>
        
        <Box display="flex" justifyContent="flex-end" alignItems="center">
            <TextField
              size="small"
              placeholder="Search Title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 250 }}
            />
        </Box>
      </Box>

      {employeeId && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: PRIMARY_COLOR }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR.NO.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TITLE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AMOUNT</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AMOUNT OPTION</TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                 <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ p: 4 }}>
                    <CircularProgress sx={{ color: PRIMARY_COLOR }} />
                  </TableCell>
                </TableRow>
              ) : paginatedRows.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} align="center">No records found</TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row, index) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.deduction_option === 0 ? 'Fixed' : row.deduction_option === 1 ? 'Percentage' : 'N/A'}</TableCell>
                      <TableCell align="right">
                          <IconButton size="small" onClick={() => handleEdit(row)} sx={{ color: PRIMARY_COLOR }}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                            <Delete fontSize="small" />
                          </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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
                                  backgroundColor: PRIMARY_COLOR,
                                  color: 'white',
                                  borderRadius: '4px',
                                  '&:hover': { backgroundColor: PRIMARY_DARK_COLOR },
                                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                  '& .MuiSvgIcon-root': { color: 'white' },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => (
                                  <MenuItem key={value} value={value}>{value}</MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                         {`Showing ${startEntry} to ${endEntry} of ${filteredDeductions.length} results`}
                      </Typography>
                  </Box>

                  <Pagination
                      count={Math.ceil(filteredDeductions.length / rowsPerPage)}
                      page={page + 1}
                      onChange={handlePaginationChange}
                      showFirstButton
                      showLastButton
                      sx={{
                          '& .MuiPaginationItem-root': {
                              '&:hover': { backgroundColor: SECONDARY_COLOR, color: 'white' }
                          },
                          '& .MuiPaginationItem-page':{
                              color: PRIMARY_COLOR,
                              '&.Mui-selected': {
                                  backgroundColor: PRIMARY_COLOR,
                                  color: 'white',
                                  '&:hover': { backgroundColor: SECONDARY_COLOR }
                              },
                          },
                           '& .MuiPaginationItem-icon': { color: PRIMARY_COLOR }
                      }}
                  />
              </Box>
          )}
      </Box>

      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small" required>
            <InputLabel>Deduction Option</InputLabel>
            <Select
              name="allowance_option"
              value={formData.allowance_option ?? ''}
              label="Deduction Option"
              onChange={handleChange}
            >
              <MenuItem value="Non Taxable">Non Taxable</MenuItem>
              <MenuItem value="Fully">Fully Taxable</MenuItem>
              <MenuItem value="Partial">Partially Taxable</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small" required>
            <InputLabel>Amount Option</InputLabel>
            <Select
              name="amount_option"
              value={formData.amount_option ?? ''}
              label="Amount Option"
              onChange={handleChange}
            >
              <MenuItem value="0">Fixed</MenuItem>
              <MenuItem value="1">Percentage</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <TextField
              fullWidth
              size="small"
              label="INR Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{
                textTransform: 'none',
                px: 4,
                backgroundColor: PRIMARY_COLOR,
                '&:hover': {
                    backgroundColor: PRIMARY_DARK_COLOR
                }
              }}
              onClick={handleSave}
            >
              {editingId !== null ? 'Update' : 'Save'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatutoryDeductions;