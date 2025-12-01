// import React, { useState ,useEffect,useContext} from 'react';
// import {
//   Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Grid
// } from '@mui/material';
// import { EmployeeContext } from './EmployeeContext';
// import  axiosInstance from  "../../utils/axiosInstance"; 

// const  Reimbursements = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     reimbursement_option: '',
//     amount_option: '',
//   });

//   const [allowances, setAllowances] = useState([]);
//  const { employeeId } = useContext(EmployeeContext);
//    useEffect(() => {
//       console.log("employee id from context in Reimbursements:", employeeId);
//      }, [employeeId]);
  

//   const fetchAllowanceDetails = async () => {
//   try {
//     const response = await axiosInstance.post('/api/contract_details/', {
//       user_id: employeeId,
//       type: 5,
//     });

//     const { contract_details } = response.data;

//     const formattedAllowance = {
//       title: contract_details.title || '',
//       amount: contract_details.amount || '',
//       reimbursement_option: contract_details.reimbursement_option || 'Non Taxable',
//       amount_option: contract_details.amount_option?.toString() || '0',
//     };

//     setFormData(formattedAllowance);
//     setAllowances([formattedAllowance]);
//   } catch (error) {
//     console.error('Error fetching allowance details:', error);
//   }
// };

// useEffect(() => {
//   if ( employeeId) {
//     fetchAllowanceDetails();
//   }
// }, [ employeeId]);

// const updateAllowanceDetails = async () => {
//   try {
//     await axiosInstance.patch('/api/contract_details/', {
//       user_id: employeeId,
//       type: 5,
//       title: formData.title,
//       amount: parseFloat(formData.amount),
//       is_taxable: formData.reimbursement_option,
//       amount_option: parseInt(formData.amount_option, 10),
//     });
//     alert('Updated successfully!');
//   } catch (error) {
//     console.error('Error updating allowance details:', error);
//   }
// };

// const handleSave = () => {
//   if (formData.title && formData.amount && employeeId) {
//     updateAllowanceDetails();
//     setAllowances(prev => [...prev, formData]);
//     setFormData({ title: '', amount: '', reimbursement_option: '', amount_option: '' });
//   } else {
//     alert("Please fill in all fields and user ID.");
//   }
// };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

 

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>List All Reimbursements</Typography>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <FormControl size="small">
//           <Select defaultValue="10">
//             <MenuItem value="10">10</MenuItem>
//             <MenuItem value="100">100</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField size="small" placeholder="Search" />
//       </Box>
// {employeeId && (
//       <TableContainer component={Paper} sx={{ mb: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>TITLE</strong></TableCell>
//               <TableCell><strong>AMOUNT</strong></TableCell>
//               <TableCell><strong>Reimbursements OPTION</strong></TableCell>
//               <TableCell><strong>AMOUNT OPTION</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {allowances.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No records available</TableCell>
//               </TableRow>
//             ) : (
//               allowances.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{row.title}</TableCell>
//                   <TableCell>{row.amount}</TableCell>
//                  <TableCell>{row.reimbursement_option}</TableCell> 
//       <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell> 
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
// )}
//       <Box display="flex" justifyContent="space-between" mb={3}>
//         <Typography variant="body2">No records available</Typography>
//         <Box>
//           <Button variant="outlined" size="small" sx={{ mr: 1 }}>Previous</Button>
//           <Button variant="outlined" size="small">Next</Button>
//         </Box>
//       </Box>

//       <Grid container spacing={2}>
//   {/* Row 1: Allowance Option + Amount Option */}
//  <Grid item xs={12} sm={6}>
//   <FormControl fullWidth size="small" required>
//     <InputLabel>Reimbursment Option</InputLabel>
//     <Select
//       name="reimbursement_option"
//      value={formData.reimbursement_option ?? ''}
//       label="Reimbursements Option"
//       onChange={handleChange}
//     >
//        <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//             <MenuItem value="Fully Taxable">Fully Taxable</MenuItem>
//             <MenuItem value="Partially Taxable">Partially Taxable</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>

// <Grid item xs={12} sm={6}>
//   <FormControl fullWidth size="small" required>
//     <InputLabel>Amount Option</InputLabel>
//     <Select
//       name="amount_option"
//        value={formData.amount_option ?? ''}
//       label="Amount Option"
//       onChange={handleChange}
//     >
//       <MenuItem value={0}>Fixed</MenuItem>
//       <MenuItem value={1}>Percentage</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>


//   {/* Row 2: Title + Amount */}
//   <Grid item xs={12} sm={6}>
//     <TextField
//       fullWidth
//       size="small"
//       label="Title"
//       name="title"
//       value={formData.title}
//       onChange={handleChange}
//       required
//     />
//   </Grid>

//   <Grid item xs={12} sm={6}>
//     <Box display="flex" alignItems="center">
//       <Typography sx={{ mr: 1 }}>INR</Typography>
//       <TextField
//         fullWidth
//         size="small"
//         label="Amount"
//         name="amount"
//         value={formData.amount}
//         onChange={handleChange}
//         required
//       />
//     </Box>
//   </Grid>

//   {/* Save Button */}
//   <Grid item xs={12}>
//     <Box display="flex" justifyContent="flex-end">
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ textTransform: 'none', px: 4 }}
//         onClick={handleSave}
//       >
//         Save
//       </Button>
//     </Box>
//   </Grid>
// </Grid>

//     </Box>
//   );
// };

// export default Reimbursements;









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

// const Reimbursements = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     reimbursement_option: '', // Corresponds to is_taxable
//     amount_option: '',        // Corresponds to is_fixed
//   });

//   const [reimbursements, setReimbursements] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchReimbursements = useCallback(async () => {
//     try {
//       const res = await axiosInstance.post('/api/contract_details/', {
//         user_id: employeeId,
//         type: 5, // Type 5 for Reimbursements
//       });

//       const details = res.data.contract_details;
//       setReimbursements(Array.isArray(details) ? details : []);
//     } catch (error) {
//       console.error('Error fetching reimbursements:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not load reimbursements. Please try refreshing the page.'
//       });
//       setReimbursements([]);
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     if (employeeId) fetchReimbursements();
//   }, [employeeId, fetchReimbursements]);

//   const handleSave = async () => {
//     // 2. Use Swal for validation
//     if (!formData.title || !formData.amount || !formData.reimbursement_option || !formData.amount_option) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill out all the required fields before saving.',
//       });
//       return;
//     }

//     const payload = {
//       user_id: employeeId,
//       type: 5,
//       pay_title: formData.title,
//       pay_amount: parseFloat(formData.amount),
//       is_taxable: formData.reimbursement_option,
//       is_fixed: formData.amount_option,
//       salary_month: '01'
//     };

//     const action = editingId !== null ? 'Updating' : 'Saving';

//     // 3. Add loading state with Swal
//     Swal.fire({
//       title: `${action} Reimbursement...`,
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
//       await fetchReimbursements();

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: `Reimbursement has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
//       });

//       setFormData({ title: '', amount: '', reimbursement_option: '', amount_option: '' });
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
//       reimbursement_option: row.reimbursement_option,
//       amount_option: row.amount_option !== null ? row.amount_option.toString() : '',
//     });
//     setEditingId(row.id);
//   };

//   const handleDelete = async (id) => {
//     // 4. Add confirmation dialog before deleting
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to delete this reimbursement. You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete('/api/contract_details/', {
//             data: { pay_id: id, type: 5 },
//           });
//           await fetchReimbursements();
//           Swal.fire(
//             'Deleted!',
//             'The reimbursement has been deleted.',
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
//     if (newPage > 0 && newPage <= Math.ceil(filteredReimbursements.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   const filteredReimbursements = reimbursements.filter(row =>
//     String(row.title).toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pageCount = Math.ceil(filteredReimbursements.length / rowsPerPage);
//   const currentRows = filteredReimbursements.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>List All Reimbursements</Typography>

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
//                 <TableCell><strong>REIMBURSEMENT OPTION</strong></TableCell>
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
//                       <TableCell>{row.reimbursement_option}</TableCell>
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
//             <InputLabel>Reimbursement Option</InputLabel>
//             <Select
//               name="reimbursement_option"
//               value={formData.reimbursement_option ?? ''}
//               label="Reimbursement Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//               <MenuItem value="Fully Taxable">Fully Taxable</MenuItem>
//               <MenuItem value="Partially Taxable">Partially Taxable</MenuItem>
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

// export default Reimbursements;









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

// const Reimbursements = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     reimbursement_option: '', // Corresponds to is_taxable
//     amount_option: '',        // Corresponds to is_fixed
//   });

//   const [reimbursements, setReimbursements] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Standardized to 10 rows
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchReimbursements = useCallback(async () => {
//     try {
//       const res = await axiosInstance.post('/api/contract_details/', {
//         user_id: employeeId,
//         type: 5, // Type 5 for Reimbursements
//       });

//       const details = res.data.contract_details;
//       setReimbursements(Array.isArray(details) ? details : []);
//     } catch (error) {
//       console.error('Error fetching reimbursements:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not load reimbursements. Please try refreshing the page.'
//       });
//       setReimbursements([]);
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     if (employeeId) fetchReimbursements();
//   }, [employeeId, fetchReimbursements]);

//   const handleSave = async () => {
//     if (!formData.title || !formData.amount || !formData.reimbursement_option || !formData.amount_option) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill out all the required fields before saving.',
//       });
//       return;
//     }

//     const payload = {
//       user_id: employeeId,
//       type: 5,
//       pay_title: formData.title,
//       pay_amount: parseFloat(formData.amount),
//       is_taxable: formData.reimbursement_option,
//       is_fixed: formData.amount_option,
//       salary_month: '01'
//     };

//     const action = editingId !== null ? 'Updating' : 'Saving';

//     Swal.fire({
//       title: `${action} Reimbursement...`,
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
//       await fetchReimbursements();

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: `Reimbursement has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
//       });

//       setFormData({ title: '', amount: '', reimbursement_option: '', amount_option: '' });
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
//       reimbursement_option: row.reimbursement_option,
//       amount_option: row.amount_option !== null ? row.amount_option.toString() : '',
//     });
//     setEditingId(row.id);
//   };

//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to delete this reimbursement. You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete('/api/contract_details/', {
//             data: { pay_id: id, type: 5 },
//           });
//           await fetchReimbursements();
//           Swal.fire(
//             'Deleted!',
//             'The reimbursement has been deleted.',
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
  
//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredReimbursements.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   const filteredReimbursements = reimbursements.filter(row =>
//     String(row.title).toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pageCount = Math.ceil(filteredReimbursements.length / rowsPerPage);
//   const currentRows = filteredReimbursements.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom fontWeight="bold" color="#8C257C">List All Reimbursements</Typography>
      
//       <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
//         <TextField
//           size="small"
//           placeholder="Search Title..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1); // Reset to first page on search
//           }}
//           sx={{ width: 250 }}
//         />
//       </Box>

//       {employeeId && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: '#8C257C' }}>
//               <TableRow>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '60px' }}>SR NO.</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TITLE</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AMOUNT</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>REIMBURSEMENT OPTION</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AMOUNT OPTION</TableCell>
//                 <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentRows.length === 0 ? (
//                 <TableRow><TableCell colSpan={6} align="center">No records found</TableCell></TableRow>
//               ) : (
//                 currentRows.map((row, index) => (
//                     <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
//                       <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.title}</TableCell>
//                       <TableCell>₹{row.amount}</TableCell>
//                       <TableCell>{row.reimbursement_option}</TableCell>
//                       <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
//                       <TableCell align="right">
//                           <IconButton size="small" onClick={() => handleEdit(row)} sx={{ color: '#F58E35' }}>
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

//       <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//         <Typography variant="body2" color="textSecondary">
//           Total Rows: {filteredReimbursements.length}
//         </Typography>

//         <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             sx={{ color: '#8C257C', borderColor: '#8C257C' }}
//           >
//             Previous
//           </Button>

//           <Typography sx={{ fontSize: '0.875rem' }}>
//             Page {currentPage} of {pageCount || 1}
//           </Typography>

//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === pageCount || filteredReimbursements.length === 0}
//             sx={{ color: '#8C257C', borderColor: '#8C257C' }}
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>

//       <Grid container spacing={2} mt={3}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Reimbursement Option</InputLabel>
//             <Select
//               name="reimbursement_option"
//               value={formData.reimbursement_option ?? ''}
//               label="Reimbursement Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//               <MenuItem value="Fully Taxable">Fully Taxable</MenuItem>
//               <MenuItem value="Partially Taxable">Partially Taxable</MenuItem>
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
//             <TextField
//               fullWidth
//               size="small"
//               label="Amount"
//               name="amount"
//               type="number"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
//               }}
//             />
//         </Grid>

//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               onClick={handleSave}
//               sx={{
//                 textTransform: 'none',
//                 px: 4,
//                 backgroundColor: '#8C257C',
//                 '&:hover': { backgroundColor: '#7a1f6b' }
//               }}
//             >
//               {editingId !== null ? 'Update' : 'Save'}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Reimbursements;






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

const Reimbursements = () => {
  const { employeeId } = useContext(EmployeeContext);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    reimbursement_option: '',
    amount_option: '',
  });

  const [reimbursements, setReimbursements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchReimbursements = useCallback(async () => {
    if (!employeeId) {
        setLoading(false);
        return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/contract_details/', {
        user_id: employeeId,
        type: 5, // Type 5 for Reimbursements
      });

      const details = res.data.contract_details;
      setReimbursements(Array.isArray(details) ? details : []);
    } catch (error) {
      console.error('Error fetching reimbursements:', error);
      Swal.fire({
        icon: 'error',
        title: 'Fetch Error',
        text: 'Could not load reimbursements. Please try refreshing the page.'
      });
      setReimbursements([]);
    } finally {
        setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchReimbursements();
  }, [employeeId, fetchReimbursements]);

  const handleSave = async () => {
    if (!formData.title || !formData.amount || !formData.reimbursement_option || !formData.amount_option) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill out all the required fields before saving.',
      });
      return;
    }

    const payload = {
      user_id: employeeId,
      type: 5,
      pay_title: formData.title,
      pay_amount: parseFloat(formData.amount),
      is_taxable: formData.reimbursement_option,
      is_fixed: formData.amount_option,
      salary_month: '01'
    };

    const action = editingId !== null ? 'Updating' : 'Saving';

    Swal.fire({
      title: `${action} Reimbursement...`,
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
      await fetchReimbursements();

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Reimbursement has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
      });

      setFormData({ title: '', amount: '', reimbursement_option: '', amount_option: '' });
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
      reimbursement_option: row.reimbursement_option || '',
      amount_option: row.amount_option !== null ? row.amount_option.toString() : '',
    });
    setEditingId(row.id);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this reimbursement. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete('/api/contract_details/', {
            data: { pay_id: id, type: 5 },
          });
          await fetchReimbursements();
          Swal.fire(
            'Deleted!',
            'The reimbursement has been deleted.',
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
  
  const filteredReimbursements = reimbursements.filter(row =>
    String(row.title).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedRows = filteredReimbursements.slice(
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
  
  const startEntry = filteredReimbursements.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredReimbursements.length);

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" gutterBottom fontWeight="bold" color={PRIMARY_COLOR}>List All Reimbursements</Typography>
        
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
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>REIMBURSEMENT OPTION</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AMOUNT OPTION</TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ p: 4 }}>
                    <CircularProgress sx={{ color: PRIMARY_COLOR }} />
                  </TableCell>
                </TableRow>
              ) : paginatedRows.length === 0 ? (
                <TableRow><TableCell colSpan={6} align="center">No records found</TableCell></TableRow>
              ) : (
                paginatedRows.map((row, index) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.reimbursement_option}</TableCell>
                      <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
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
                         {`Showing ${startEntry} to ${endEntry} of ${filteredReimbursements.length} results`}
                      </Typography>
                  </Box>

                  <Pagination
                      count={Math.ceil(filteredReimbursements.length / rowsPerPage)}
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
            <InputLabel>Reimbursement Option</InputLabel>
            <Select
              name="reimbursement_option"
              value={formData.reimbursement_option ?? ''}
              label="Reimbursement Option"
              onChange={handleChange}
            >
              <MenuItem value="Non Taxable">Non Taxable</MenuItem>
              <MenuItem value="Fully Taxable">Fully Taxable</MenuItem>
              <MenuItem value="Partially Taxable">Partially Taxable</MenuItem>
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
            <TextField
              fullWidth
              size="small"
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
            />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                textTransform: 'none',
                px: 4,
                backgroundColor: PRIMARY_COLOR,
                '&:hover': { backgroundColor: PRIMARY_DARK_COLOR }
              }}
            >
              {editingId !== null ? 'Update' : 'Save'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reimbursements;